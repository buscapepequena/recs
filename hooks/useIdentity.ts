"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { EventTemplate, finalizeEvent, generateSecretKey, getPublicKey } from "nostr-tools/pure";
import { decode, npubEncode } from "nostr-tools/nip19";
import { decrypt, encrypt } from "nostr-tools/nip49";
import { encrypt as encryptNip44, getConversationKey } from "nostr-tools/nip44";
import { createRumor, createSeal } from "nostr-tools/nip59";
import { bytesToHex, hexToBytes } from "nostr-tools/utils";
import {
  EthereumProvider,
  Identity,
  IdentityError,
  IdentityStore,
  StoredIdentity,
} from "@/types/identity.types";

const STORAGE_KEY = "recs-identity";
const MIN_PASSWORD = 8;

const IDENTITY_TYPES = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
  ],
  Identity: [
    { name: "purpose", type: "string" },
    { name: "account", type: "address" },
  ],
};

const ethereum = (): EthereumProvider | undefined =>
  typeof window === "undefined"
    ? undefined
    : (window as unknown as { ethereum?: EthereumProvider }).ethereum;

const describe = (stored: StoredIdentity): Identity => {
  const pubkey = getPublicKey(hexToBytes(stored.secret));
  const npub = npubEncode(pubkey);
  return {
    kind: stored.kind,
    pubkey,
    npub,
    short: `${npub.slice(0, 9)}…${npub.slice(-4)}`,
    address: stored.address,
  };
};

const read = (): StoredIdentity | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredIdentity) : null;
  } catch {
    return null;
  }
};

const write = (stored: StoredIdentity | null) => {
  try {
    if (stored) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.log("identity: kept in memory only");
  }
};

const secretFromSignature = async (signature: string) => {
  const digest = await crypto.subtle.digest("SHA-256", Uint8Array.from(hexToBytes(signature.replace(/^0x/, ""))));
  return new Uint8Array(digest);
};

export function useIdentity(): IdentityStore {
  const [stored, setStored] = useState<StoredIdentity | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<IdentityError | null>(null);
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    const saved = read();
    try {
      if (saved) describe(saved);
      setStored(saved);
    } catch {
      write(null);
    }
    setHasWallet(Boolean(ethereum()));
    setReady(true);
  }, []);

  const keep = useCallback((next: StoredIdentity) => {
    write(next);
    setStored(next);
    setError(null);
  }, []);

  const createLocal = useCallback(() => {
    keep({ kind: "local", secret: bytesToHex(generateSecretKey()) });
  }, [keep]);

  const connectWallet = useCallback(async () => {
    const provider = ethereum();
    if (!provider) {
      setError("noWallet");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      const account = accounts[0];
      const typedData = {
        types: IDENTITY_TYPES,
        primaryType: "Identity",
        domain: { name: "Recomp Market", version: "1" },
        message: {
          purpose: "Derive my Recomp Market key. This signature never leaves my browser.",
          account,
        },
      };
      const signature = (await provider.request({
        method: "eth_signTypedData_v4",
        params: [account, JSON.stringify(typedData)],
      })) as string;
      const secret = await secretFromSignature(signature);
      getPublicKey(secret);
      keep({ kind: "wallet", secret: bytesToHex(secret), address: account.toLowerCase() });
    } catch (cause) {
      const code = (cause as { code?: number }).code;
      setError(code === 4001 ? "rejected" : "generic");
      console.log("identity: wallet connection failed", cause);
    } finally {
      setBusy(false);
    }
  }, [keep]);

  const restore = useCallback(
    (backup: string, password: string) => {
      const value = backup.trim();
      try {
        let secret: Uint8Array;
        if (value.startsWith("ncryptsec")) {
          secret = decrypt(value, password);
        } else {
          const decoded = decode(value);
          if (decoded.type !== "nsec") throw new Error("not a secret key");
          secret = decoded.data;
        }
        getPublicKey(secret);
        keep({ kind: "local", secret: bytesToHex(secret) });
      } catch {
        setError("backup");
      }
    },
    [keep],
  );

  const exportBackup = useCallback(
    (password: string) => {
      if (!stored) return null;
      if (password.length < MIN_PASSWORD) {
        setError("password");
        return null;
      }
      setError(null);
      return encrypt(hexToBytes(stored.secret), password);
    },
    [stored],
  );

  const signOut = useCallback(() => {
    write(null);
    setStored(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const sign = useCallback(
    (template: EventTemplate) => (stored ? finalizeEvent(template, hexToBytes(stored.secret)) : null),
    [stored],
  );

  const wrap = useCallback(
    (recipient: string, template: EventTemplate, expiresAt: number) => {
      if (!stored) return null;
      const secret = hexToBytes(stored.secret);
      const seal = createSeal(createRumor(template, secret), secret, recipient);
      const wrapKey = generateSecretKey();
      const now = Math.floor(Date.now() / 1000);
      return finalizeEvent(
        {
          kind: 1059,
          created_at: now - Math.floor(Math.random() * 2 * 24 * 60 * 60),
          content: encryptNip44(JSON.stringify(seal), getConversationKey(wrapKey, recipient)),
          tags: [
            ["p", recipient],
            ["expiration", String(expiresAt)],
          ],
        },
        wrapKey,
      );
    },
    [stored],
  );

  const identity = useMemo(() => (stored ? describe(stored) : null), [stored]);

  return {
    ready,
    identity,
    busy,
    error,
    hasWallet,
    createLocal,
    connectWallet,
    restore,
    exportBackup,
    signOut,
    clearError,
    wrap,
    sign,
  };
}
