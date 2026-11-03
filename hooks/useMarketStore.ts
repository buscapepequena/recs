"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { EventTemplate, finalizeEvent, generateSecretKey, NostrEvent } from "nostr-tools/pure";
import { GRACE_DAYS, LISTING_DAYS } from "@/hooks/marketListings";
import { ARCHIVE_TAG, DELETE_KIND, LISTING_KIND, MARKET_TAG, REMOTE } from "@/hooks/marketConfig";
import {
  deleteFromBlossom,
  deleteTemplate,
  eventToListing,
  getPool,
  listingTemplate,
  nowSeconds,
  publish,
  relays,
  uploadToBlossom,
} from "@/hooks/nostrMarket";
import { IdentityStore } from "@/types/identity.types";
import {
  Listing,
  ListingDraft,
  MarketCategory,
  MarketSort,
  MarketStore,
  MarketView,
} from "@/types/market.types";

const STORAGE_KEY = "recs-market-mine";
const DAY = 24 * 60 * 60 * 1000;
const LIFE_SECONDS = (LISTING_DAYS + GRACE_DAYS) * 24 * 60 * 60;

const readMine = (): Listing[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Listing[]) : [];
  } catch {
    return [];
  }
};

const writeMine = (listings: Listing[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch {
    console.log("market: listing kept in memory only");
  }
};

const randomId = () =>
  Array.from(crypto.getRandomValues(new Uint8Array(12)))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const anonymize = (listing: Listing): Listing => ({
  ...listing,
  archived: true,
  mine: false,
  seller: "",
  sellerKey: undefined,
  location: "",
  locationKind: undefined,
  description: "",
  options: undefined,
  payments: undefined,
  contact: undefined,
});

const eventKey = (event: NostrEvent) => {
  const d = event.tags.find((tag) => tag[0] === "d")?.[1] ?? event.id;
  return `${event.pubkey}:${d}`;
};

export function useMarketStore(identity: IdentityStore): MarketStore {
  const [mine, setMine] = useState<Listing[]>([]);
  const [events, setEvents] = useState<Record<string, NostrEvent>>({});
  const [now, setNow] = useState<number | null>(null);
  const [view, setView] = useState<MarketView>({ name: "browse" });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MarketCategory | "all">("all");
  const [sort, setSort] = useState<MarketSort>("newest");
  const [seller, setSellerState] = useState<string | null>(null);
  const myPubkey = identity.identity?.pubkey ?? null;

  const ageOf = useCallback(
    (listing: Listing) => {
      if (listing.createdAt && now) return Math.max(0, Math.floor((now - listing.createdAt) / DAY));
      return listing.ageDays ?? 0;
    },
    [now],
  );

  useEffect(() => {
    const current = Date.now();
    setNow(current);
    if (REMOTE) return;
    const stored = readMine();
    const alive = stored.filter(
      (listing) =>
        listing.archived ||
        !listing.createdAt ||
        (current - listing.createdAt) / DAY < LISTING_DAYS + GRACE_DAYS,
    );
    if (alive.length !== stored.length) writeMine(alive);
    setMine(alive);
  }, []);

  const keep = useCallback((event: NostrEvent) => {
    setEvents((current) => {
      const key = eventKey(event);
      const existing = current[key];
      if (existing && existing.created_at >= event.created_at) return current;
      return { ...current, [key]: event };
    });
  }, []);

  const drop = useCallback((key: string) => {
    setEvents((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }, []);

  useEffect(() => {
    if (!REMOTE) return;
    const since = nowSeconds() - LIFE_SECONDS;
    const pool = getPool();
    const active = pool.subscribeMany(
      relays(),
      { kinds: [LISTING_KIND], "#t": [MARKET_TAG], since },
      { onevent: keep },
    );
    const archive = pool.subscribeMany(
      relays(),
      { kinds: [LISTING_KIND], "#t": [ARCHIVE_TAG] },
      { onevent: keep },
    );
    const deletions = pool.subscribeMany(
      relays(),
      { kinds: [DELETE_KIND], "#k": [String(LISTING_KIND)], since },
      {
        onevent: (event) => {
          event.tags
            .filter((tag) => tag[0] === "a")
            .forEach((tag) => {
              const [, pubkey, d] = tag[1].split(":");
              if (pubkey === event.pubkey) drop(`${pubkey}:${d}`);
            });
        },
      },
    );
    return () => {
      active.close();
      archive.close();
      deletions.close();
    };
  }, [keep, drop]);

  const remote = useMemo(
    () =>
      Object.values(events)
        .map((event) => eventToListing(event, myPubkey))
        .filter((listing): listing is Listing => Boolean(listing)),
    [events, myPubkey],
  );

  const isExpired = useCallback(
    (listing: Listing) => !listing.archived && ageOf(listing) >= LISTING_DAYS,
    [ageOf],
  );

  const graceLeft = useCallback(
    (listing: Listing) => Math.max(0, LISTING_DAYS + GRACE_DAYS - ageOf(listing)),
    [ageOf],
  );

  const all = useMemo(
    () =>
      (REMOTE ? remote : mine).filter((listing) => {
        if (listing.archived) return true;
        const age = ageOf(listing);
        if (age < LISTING_DAYS) return true;
        return Boolean(listing.mine) && age < LISTING_DAYS + GRACE_DAYS;
      }),
    [remote, mine, ageOf],
  );

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = all.filter((listing) => {
      if (seller && listing.seller !== seller) return false;
      if (category !== "all" && listing.category !== category) return false;
      if (!term) return true;
      return [listing.title, listing.description, listing.location]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
    return [...filtered].sort((a, b) => {
      const doneA = a.status === "sold" || a.archived ? 1 : 0;
      const doneB = b.status === "sold" || b.archived ? 1 : 0;
      if (doneA !== doneB) return doneA - doneB;
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      return ageOf(a) - ageOf(b);
    });
  }, [all, query, category, sort, seller, ageOf]);

  const find = useCallback((id: string) => all.find((listing) => listing.id === id), [all]);

  const countBySeller = useCallback(
    (name: string) => all.filter((listing) => listing.seller && listing.seller === name).length,
    [all],
  );

  const setSeller = useCallback((name: string | null) => {
    setSellerState(name);
    if (name) {
      setQuery("");
      setCategory("all");
      setView({ name: "browse" });
    }
  }, []);

  const updateMine = useCallback((change: (current: Listing[]) => Listing[]) => {
    setMine((current) => {
      const next = change(current);
      writeMine(next);
      return next;
    });
  }, []);

  const publishListing = useCallback(
    async (listing: Listing, d: string, publishedAt: number) => {
      const event = identity.sign(listingTemplate(listing, d, publishedAt));
      if (!event) return false;
      await publish(event);
      keep(event);
      return true;
    },
    [identity, keep],
  );

  const add = useCallback(
    async (draft: ListingDraft) => {
      const owner = identity.identity;
      if (!owner) return false;
      const createdAt = Date.now();
      try {
        if (REMOTE) {
          const photos: string[] = [];
          for (const photo of draft.photos) photos.push(await uploadToBlossom(photo, identity.sign));
          const d = randomId();
          const listing: Listing = { ...draft, photos, id: `${owner.pubkey}:${d}`, seller: owner.short };
          await publishListing(listing, d, Math.floor(createdAt / 1000));
          setNow(createdAt);
          setView({ name: "detail", id: listing.id });
          return true;
        }
        const listing: Listing = {
          ...draft,
          id: `mine-${createdAt}`,
          seller: owner.short,
          sellerKey: owner.pubkey,
          createdAt,
          mine: true,
        };
        updateMine((current) => [listing, ...current]);
        setNow(createdAt);
        setView({ name: "detail", id: listing.id });
        return true;
      } catch (cause) {
        console.log("market: publish failed", cause);
        return false;
      }
    },
    [identity, publishListing, updateMine],
  );

  const republish = useCallback(
    async (id: string) => {
      const listing = all.find((item) => item.id === id);
      if (!listing?.mine) return false;
      const createdAt = Date.now();
      try {
        if (REMOTE && listing.dTag) {
          await publishListing(listing, listing.dTag, Math.floor(createdAt / 1000));
        } else {
          updateMine((current) => current.map((item) => (item.id === id ? { ...item, createdAt } : item)));
        }
        setNow(createdAt);
        return true;
      } catch (cause) {
        console.log("market: republish failed", cause);
        return false;
      }
    },
    [all, publishListing, updateMine],
  );

  const remove = useCallback(
    async (id: string) => {
      const listing = all.find((item) => item.id === id);
      if (!listing?.mine) return false;
      try {
        if (REMOTE && myPubkey) {
          const event = identity.sign(deleteTemplate(listing, myPubkey));
          if (!event) return false;
          await publish(event);
          drop(id);
          for (const photo of listing.photos) {
            try {
              await deleteFromBlossom(photo, identity.sign);
            } catch (cause) {
              console.log("market: photo delete failed", cause);
            }
          }
        } else {
          updateMine((current) => current.filter((item) => item.id !== id));
        }
        setView({ name: "browse" });
        return true;
      } catch (cause) {
        console.log("market: remove failed", cause);
        return false;
      }
    },
    [all, identity, myPubkey, drop, updateMine],
  );

  const freeze = useCallback(
    async (id: string) => {
      const listing = all.find((item) => item.id === id);
      if (!listing?.mine) return false;
      const copy: Listing = { ...anonymize(listing), status: "sold" };
      const day = Math.floor(Date.now() / DAY) * DAY;
      try {
        if (REMOTE && myPubkey) {
          const secret = generateSecretKey();
          const signOnce = (template: EventTemplate) => finalizeEvent(template, secret);
          const adopted: string[] = [];
          for (const photo of listing.photos) {
            try {
              await uploadToBlossom(photo, signOnce);
              adopted.push(photo);
            } catch (cause) {
              console.log("market: photo kept with seller", cause);
            }
          }
          const archived = signOnce(listingTemplate(copy, randomId(), Math.floor(day / 1000)));
          await publish(archived);
          keep(archived);
          const removal = identity.sign(deleteTemplate(listing, myPubkey));
          if (removal) await publish(removal);
          drop(id);
          for (const photo of adopted) {
            try {
              await deleteFromBlossom(photo, identity.sign);
            } catch (cause) {
              console.log("market: photo release failed", cause);
            }
          }
        } else {
          const frozen: Listing = { ...copy, id: `archive-${randomId()}`, createdAt: day };
          updateMine((current) => [frozen, ...current.filter((item) => item.id !== id)]);
        }
        setView({ name: "browse" });
        return true;
      } catch (cause) {
        console.log("market: freeze failed", cause);
        return false;
      }
    },
    [all, identity, myPubkey, keep, drop, updateMine],
  );

  return {
    ready: now !== null,
    remote: REMOTE,
    view,
    setView,
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    seller,
    setSeller,
    countBySeller,
    visible,
    find,
    ageOf,
    isExpired,
    graceLeft,
    add,
    republish,
    remove,
    freeze,
  };
}
