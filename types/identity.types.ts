import type { EventTemplate, VerifiedEvent } from "nostr-tools/pure";

export type IdentityKind = "local" | "wallet";

export interface StoredIdentity {
  kind: IdentityKind;
  secret: string;
  address?: string;
}

export interface Identity {
  kind: IdentityKind;
  pubkey: string;
  npub: string;
  short: string;
  address?: string;
}

export type IdentityError = "generic" | "noWallet" | "rejected" | "backup" | "password";

export interface IdentityStore {
  ready: boolean;
  identity: Identity | null;
  busy: boolean;
  error: IdentityError | null;
  hasWallet: boolean;
  createLocal: () => void;
  connectWallet: () => Promise<void>;
  restore: (backup: string, password: string) => void;
  exportBackup: (password: string) => string | null;
  signOut: () => void;
  clearError: () => void;
  wrap: (recipient: string, template: EventTemplate, expiresAt: number) => VerifiedEvent | null;
  sign: (template: EventTemplate) => VerifiedEvent | null;
}

export interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}
