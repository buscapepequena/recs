import { MarketCategory, MarketCondition, MarketCurrency } from "@/types/market.types";

export const LISTING_DAYS = 7;

export const GRACE_DAYS = 2;

export const MAX_PHOTOS = 6;

export const NEW_DAYS = 2;

export const MARKET_CATEGORIES: MarketCategory[] = [
  "gpu",
  "memory",
  "cpu",
  "cooling",
  "rig",
  "peripheral",
  "security",
  "confidential",
  "boards",
  "other",
];

export const MARKET_CONDITIONS: MarketCondition[] = ["new", "likeNew", "used", "parts"];

export const MARKET_CURRENCIES: MarketCurrency[] = ["USD", "USDT"];
