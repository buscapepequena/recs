import { finalizeEvent, generateSecretKey, EventTemplate } from "nostr-tools/pure";
import {
  REQUEST_DAYS,
  REQUEST_KIND,
  REQUEST_SUBJECT,
  REQUESTS_OPEN,
  WORKSHOP_PUBKEY,
} from "@/hooks/marketConfig";
import { nowSeconds, publish, uploadToBlossom } from "@/hooks/nostrMarket";
import { IdentityStore } from "@/types/identity.types";
import { RequestDraft, RequestPayload, SealedPhoto } from "@/types/requests.types";

const toBase64 = (bytes: Uint8Array) => {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const toHex = (bytes: Uint8Array) =>
  Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const dataUrlBytes = async (dataUrl: string) =>
  new Uint8Array(await (await fetch(dataUrl)).arrayBuffer());

const sealPhoto = async (
  dataUrl: string,
  sign: (template: EventTemplate) => ReturnType<typeof finalizeEvent>,
): Promise<SealedPhoto> => {
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, await dataUrlBytes(dataUrl)),
  );
  const ref = toHex(new Uint8Array(await crypto.subtle.digest("SHA-256", cipher)));
  const raw = new Uint8Array(await crypto.subtle.exportKey("raw", key));
  const url = await uploadToBlossom(`data:application/octet-stream;base64,${toBase64(cipher)}`, sign);
  return { ref, key: toBase64(raw), iv: toBase64(iv), url };
};

export async function sendRequest(
  draft: RequestDraft,
  photos: string[],
  identity: IdentityStore,
): Promise<void> {
  const owner = identity.identity;
  if (!owner) throw new Error("not signed in");
  if (!REQUESTS_OPEN) throw new Error("requests closed");
  const secret = generateSecretKey();
  const signOnce = (template: EventTemplate) => finalizeEvent(template, secret);
  const sealed: SealedPhoto[] = [];
  for (const photo of photos) sealed.push(await sealPhoto(photo, signOnce));
  const payload: RequestPayload = {
    ...draft,
    photos: sealed,
    from: owner.pubkey,
    createdAt: Date.now(),
  };
  const event = identity.wrap(
    WORKSHOP_PUBKEY,
    {
      kind: REQUEST_KIND,
      created_at: nowSeconds(),
      content: JSON.stringify(payload),
      tags: [["subject", REQUEST_SUBJECT]],
    },
    nowSeconds() + REQUEST_DAYS * 24 * 60 * 60,
  );
  if (!event) throw new Error("not sealed");
  await publish(event);
}
