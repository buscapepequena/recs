import { generateSecretKey, getPublicKey, NostrEvent, verifyEvent } from "nostr-tools/pure";
import { decode, nsecEncode } from "nostr-tools/nip19";
import { decrypt, getConversationKey } from "nostr-tools/nip44";
import { REQUEST_KIND, REQUEST_SUBJECT } from "@/hooks/marketConfig";
import { RequestPayload, SealedPhoto } from "@/types/requests.types";
import { InboxRequest, WorkshopKey } from "@/types/workshop.types";

const SEAL_KIND = 13;

const fromBase64 = (value: string) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));

const toHex = (bytes: Uint8Array) =>
  Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

export function readWorkshopKey(value: string): WorkshopKey | null {
  try {
    const decoded = decode(value.trim());
    if (decoded.type !== "nsec") return null;
    return { secret: decoded.data, pubkey: getPublicKey(decoded.data) };
  } catch {
    return null;
  }
}

export function newWorkshopKey() {
  const secret = generateSecretKey();
  return { nsec: nsecEncode(secret), pubkey: getPublicKey(secret) };
}

export function openWrap(wrap: NostrEvent, secret: Uint8Array): InboxRequest | null {
  try {
    const seal = JSON.parse(decrypt(wrap.content, getConversationKey(secret, wrap.pubkey))) as NostrEvent;
    if (seal.kind !== SEAL_KIND || !verifyEvent(seal)) return null;
    const rumor = JSON.parse(decrypt(seal.content, getConversationKey(secret, seal.pubkey))) as {
      pubkey: string;
      kind: number;
      content: string;
      created_at: number;
      tags: string[][];
    };
    if (rumor.pubkey !== seal.pubkey || rumor.kind !== REQUEST_KIND) return null;
    if (!rumor.tags.some((tag) => tag[0] === "subject" && tag[1] === REQUEST_SUBJECT)) return null;
    const payload = JSON.parse(rumor.content) as RequestPayload;
    if (!payload || (payload.kind !== "mod" && payload.kind !== "installation")) return null;
    return { id: wrap.id, from: seal.pubkey, sentAt: rumor.created_at * 1000, payload };
  } catch {
    return null;
  }
}

export async function openPhoto(photo: SealedPhoto): Promise<string> {
  const response = await fetch(photo.url);
  if (!response.ok) throw new Error(`photo ${response.status}`);
  const cipher = new Uint8Array(await response.arrayBuffer());
  const hash = toHex(new Uint8Array(await crypto.subtle.digest("SHA-256", cipher)));
  if (hash !== photo.ref) throw new Error("photo tampered");
  const key = await crypto.subtle.importKey("raw", fromBase64(photo.key), { name: "AES-GCM" }, false, ["decrypt"]);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromBase64(photo.iv) }, key, cipher);
  return URL.createObjectURL(new Blob([plain], { type: "image/jpeg" }));
}
