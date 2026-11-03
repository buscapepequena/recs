export const RELAY_URL = process.env.NEXT_PUBLIC_RELAY_URL || "";

export const BLOSSOM_URL = (process.env.NEXT_PUBLIC_BLOSSOM_URL || "").replace(/\/$/, "");

export const REMOTE = Boolean(RELAY_URL && BLOSSOM_URL);

export const LISTING_KIND = 30402;

export const DELETE_KIND = 5;

export const BLOSSOM_AUTH_KIND = 24242;

export const WORKSHOP_PUBKEY = (process.env.NEXT_PUBLIC_WORKSHOP_PUBKEY || "").trim().toLowerCase();

export const REQUESTS_OPEN = REMOTE && /^[0-9a-f]{64}$/.test(WORKSHOP_PUBKEY);

export const WRAP_KIND = 1059;

export const REQUEST_KIND = 14;

export const REQUEST_SUBJECT = "recomp-request";

export const REQUEST_DAYS = 30;

export const MARKET_TAG = "recomp-market";

export const ARCHIVE_TAG = "recomp-archive";
