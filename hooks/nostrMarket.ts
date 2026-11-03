import { EventTemplate, NostrEvent } from "nostr-tools/pure";
import { npubEncode } from "nostr-tools/nip19";
import { SimplePool } from "nostr-tools/pool";
import { GRACE_DAYS, LISTING_DAYS, MARKET_CATEGORIES, MARKET_CONDITIONS } from "@/hooks/marketListings";
import {
  ARCHIVE_TAG,
  BLOSSOM_AUTH_KIND,
  BLOSSOM_URL,
  DELETE_KIND,
  LISTING_KIND,
  MARKET_TAG,
  RELAY_URL,
} from "@/hooks/marketConfig";
import {
  Listing,
  ListingStatus,
  MarketCategory,
  MarketCondition,
  MarketCurrency,
  PaymentMethod,
  SaleMethod,
} from "@/types/market.types";
import { ContactMethod } from "@/types/requests.types";
import { CONTACT_METHODS } from "@/hooks/modCatalog";

const DAY = 24 * 60 * 60;

const MAX_UPLOAD_BYTES = 1048576;

let pool: SimplePool | null = null;

export const getPool = () => {
  if (!pool) pool = new SimplePool();
  return pool;
};

export const relays = () => (RELAY_URL ? [RELAY_URL] : []);

export const nowSeconds = () => Math.floor(Date.now() / 1000);

export const shortNpub = (pubkey: string) => {
  const npub = npubEncode(pubkey);
  return `${npub.slice(0, 9)}…${npub.slice(-4)}`;
};

export const coordinate = (pubkey: string, d: string) => `${LISTING_KIND}:${pubkey}:${d}`;

const toHex = (bytes: Uint8Array) =>
  Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

export async function uploadToBlossom(
  dataUrl: string,
  sign: (template: EventTemplate) => NostrEvent | null,
): Promise<string> {
  const blob = await (await fetch(dataUrl)).blob();
  const bytes = new Uint8Array(await blob.arrayBuffer());
  if (bytes.length > MAX_UPLOAD_BYTES) throw new Error("photo too large");
  const hash = toHex(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)));
  const auth = sign({
    kind: BLOSSOM_AUTH_KIND,
    created_at: nowSeconds(),
    content: "Upload listing photo",
    tags: [
      ["t", "upload"],
      ["x", hash],
      ["expiration", String(nowSeconds() + 300)],
    ],
  });
  if (!auth) throw new Error("not signed in");
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 90000);
  try {
    const response = await fetch(`${BLOSSOM_URL}/upload`, {
      method: "PUT",
      headers: {
        Authorization: `Nostr ${btoa(JSON.stringify(auth))}`,
        "Content-Type": blob.type || "image/jpeg",
      },
      body: bytes,
      signal: controller.signal,
    });
    if (!response.ok) {
      const reason = response.headers.get("x-reason") ?? (await response.text().catch(() => ""));
      throw new Error(`blossom ${response.status} ${reason}`.trim());
    }
    return `${BLOSSOM_URL}/${hash}`;
  } catch (cause) {
    if (controller.signal.aborted) throw new Error(`blossom timeout (${Math.round(bytes.length / 1024)} KB)`);
    throw cause;
  } finally {
    window.clearTimeout(timer);
  }
}

export async function deleteFromBlossom(
  url: string,
  sign: (template: EventTemplate) => NostrEvent | null,
): Promise<void> {
  if (!BLOSSOM_URL || !url.startsWith(`${BLOSSOM_URL}/`)) return;
  const hash = url.slice(BLOSSOM_URL.length + 1).split(/[./?#]/)[0];
  if (!/^[0-9a-f]{64}$/.test(hash)) return;
  const auth = sign({
    kind: BLOSSOM_AUTH_KIND,
    created_at: nowSeconds(),
    content: "Delete listing photo",
    tags: [
      ["t", "delete"],
      ["x", hash],
      ["expiration", String(nowSeconds() + 300)],
    ],
  });
  if (!auth) throw new Error("not signed in");
  const response = await fetch(`${BLOSSOM_URL}/${hash}`, {
    method: "DELETE",
    headers: { Authorization: `Nostr ${btoa(JSON.stringify(auth))}` },
  });
  if (!response.ok && response.status !== 404) throw new Error(`blossom delete ${response.status}`);
}

export function listingTemplate(listing: Listing, d: string, publishedAt: number): EventTemplate {
  const archived = Boolean(listing.archived);
  const tags: string[][] = [
    ["d", d],
    ["title", listing.title],
    ["published_at", String(publishedAt)],
    ["price", String(listing.price), listing.currency],
    ["t", archived ? ARCHIVE_TAG : MARKET_TAG],
    ["category", listing.category],
    ["condition", listing.condition],
    ["status", listing.status ?? "available"],
    ...listing.photos.map((url) => ["image", url]),
  ];
  if (!archived) {
    tags.push(["expiration", String(publishedAt + (LISTING_DAYS + GRACE_DAYS) * DAY)]);
    if (listing.contact?.handle) tags.push(["contact", listing.contact.method, listing.contact.handle]);
  }
  if (listing.locationKind === "delivery") tags.push(["location_kind", "delivery"]);
  else if (listing.location) tags.push(["location", listing.location]);
  if (listing.options?.crypto) tags.push(["option", "crypto"]);
  if (listing.options?.delivery) tags.push(["option", "delivery"]);
  if (listing.options?.obo) tags.push(["option", "obo"]);
  listing.payments?.forEach((method) => tags.push(["payment", method]));
  if (listing.attributes?.make) tags.push(["make", listing.attributes.make]);
  if (listing.attributes?.model) tags.push(["model", listing.attributes.model]);
  if (listing.attributes?.size) tags.push(["size", listing.attributes.size]);
  if (listing.sale) {
    tags.push([
      "sale",
      String(listing.sale.price),
      listing.sale.currency,
      listing.sale.method,
      listing.sale.date,
    ]);
  }
  return {
    kind: LISTING_KIND,
    created_at: nowSeconds(),
    content: listing.description,
    tags,
  };
}

const first = (event: NostrEvent, name: string) => event.tags.find((tag) => tag[0] === name);

const all = (event: NostrEvent, name: string) =>
  event.tags.filter((tag) => tag[0] === name).map((tag) => tag[1]);

const oneOf = <T extends string>(value: string | undefined, allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback;

export function eventToListing(event: NostrEvent, myPubkey: string | null): Listing | null {
  const d = first(event, "d")?.[1];
  const title = first(event, "title")?.[1];
  const price = first(event, "price");
  if (!d || !title || !price) return null;
  const archived = all(event, "t").includes(ARCHIVE_TAG);
  const options = all(event, "option");
  const sale = first(event, "sale");
  const contact = first(event, "contact");
  const publishedAt = Number(first(event, "published_at")?.[1] ?? event.created_at);
  const payments = all(event, "payment").filter((method): method is PaymentMethod =>
    ["crypto", "cash", "ach"].includes(method),
  );
  return {
    id: `${event.pubkey}:${d}`,
    dTag: d,
    eventId: event.id,
    title,
    description: event.content,
    price: Number(price[1]) || 0,
    currency: oneOf<MarketCurrency>(price[2], ["USD", "USDT"], "USD"),
    category: oneOf<MarketCategory>(first(event, "category")?.[1], MARKET_CATEGORIES, "other"),
    condition: oneOf<MarketCondition>(first(event, "condition")?.[1], MARKET_CONDITIONS, "used"),
    location: first(event, "location")?.[1] ?? "",
    locationKind: first(event, "location_kind")?.[1] === "delivery" ? "delivery" : undefined,
    photos: all(event, "image"),
    seller: archived ? "" : shortNpub(event.pubkey),
    sellerKey: archived ? undefined : event.pubkey,
    status: oneOf<ListingStatus>(first(event, "status")?.[1], ["available", "pending", "sold"], "available"),
    attributes: {
      make: first(event, "make")?.[1],
      model: first(event, "model")?.[1],
      size: first(event, "size")?.[1],
    },
    options: {
      crypto: options.includes("crypto"),
      delivery: options.includes("delivery"),
      obo: options.includes("obo"),
    },
    payments: payments.length ? payments : undefined,
    sale: sale
      ? {
          price: Number(sale[1]) || 0,
          currency: oneOf<MarketCurrency>(sale[2], ["USD", "USDT"], "USD"),
          method: oneOf<SaleMethod>(sale[3], ["otc", "otcCash", "crypto", "cash", "ach"], "otc"),
          date: sale[4] ?? "",
        }
      : undefined,
    contact:
      !archived && contact?.[2]
        ? { method: oneOf<ContactMethod>(contact[1], CONTACT_METHODS, "other"), handle: contact[2].slice(0, 120) }
        : undefined,
    archived,
    createdAt: publishedAt * 1000,
    mine: !archived && myPubkey === event.pubkey,
  };
}

export function deleteTemplate(listing: Listing, pubkey: string): EventTemplate {
  const tags: string[][] = [["k", String(LISTING_KIND)]];
  if (listing.dTag) tags.push(["a", coordinate(pubkey, listing.dTag)]);
  if (listing.eventId) tags.push(["e", listing.eventId]);
  tags.push(["expiration", String(nowSeconds() + (LISTING_DAYS + GRACE_DAYS + 1) * DAY)]);
  return { kind: DELETE_KIND, created_at: nowSeconds(), content: "", tags };
}

export async function publish(event: NostrEvent) {
  const results = await Promise.allSettled(
    getPool()
      .publish(relays(), event)
      .map(
        (attempt) =>
          new Promise<string>((resolve, reject) => {
            const timer = window.setTimeout(() => reject(new Error("relay timeout")), 15000);
            attempt.then(
              (value) => {
                window.clearTimeout(timer);
                resolve(value);
              },
              (cause) => {
                window.clearTimeout(timer);
                reject(cause);
              },
            );
          }),
      ),
  );
  if (results.some((result) => result.status === "fulfilled")) return;
  const reasons = results
    .map((result) => (result.status === "rejected" ? String(result.reason?.message ?? result.reason) : ""))
    .filter(Boolean)
    .join(" · ");
  throw new Error(`relay: ${reasons || "not published"}`);
}
