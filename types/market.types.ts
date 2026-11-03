import type { Dictionary } from "@/types/i18n.types";

export type MarketCategory = "gpu" | "memory" | "cpu" | "cooling" | "rig" | "peripheral" | "other";

export type MarketCondition = "new" | "likeNew" | "used" | "parts";

export type MarketCurrency = "USD" | "USDT";

export type MarketSort = "newest" | "priceLow" | "priceHigh";

export type MarketTab = 0 | 1 | 2;

export type MarketView =
  | { name: "browse" }
  | { name: "detail"; id: string }
  | { name: "create" };

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: MarketCurrency;
  category: MarketCategory;
  condition: MarketCondition;
  location: string;
  photos: string[];
  seller: string;
  ageDays?: number;
  createdAt?: number;
  mine?: boolean;
}

export interface ListingDraft {
  title: string;
  description: string;
  price: number;
  currency: MarketCurrency;
  category: MarketCategory;
  condition: MarketCondition;
  location: string;
  photos: string[];
}

export type MarketText = Dictionary["market"];

export interface MarketStore {
  ready: boolean;
  view: MarketView;
  setView: (view: MarketView) => void;
  query: string;
  setQuery: (query: string) => void;
  category: MarketCategory | "all";
  setCategory: (category: MarketCategory | "all") => void;
  sort: MarketSort;
  setSort: (sort: MarketSort) => void;
  visible: Listing[];
  find: (id: string) => Listing | undefined;
  ageOf: (listing: Listing) => number;
  add: (draft: ListingDraft) => void;
  remove: (id: string) => void;
}

export interface MarketScreenProps {
  text: MarketText;
  htmlLang: string;
}

export interface MarketAppProps {
  store: MarketStore;
  text: MarketText;
  htmlLang: string;
  tab: MarketTab;
  onTab: (tab: MarketTab) => void;
  variant: "screen" | "modal";
  onExpand: () => void;
  onClose: () => void;
}

export interface MarketViewProps {
  store: MarketStore;
  text: MarketText;
  htmlLang: string;
}

export type MarketFormErrors = Partial<
  Record<"title" | "price" | "location" | "description" | "photos", string>
>;

export interface MarketDetailProps extends MarketViewProps {
  id: string;
}

export interface MarketBackProps {
  label: string;
  onBack: () => void;
}

export interface MarketSoonProps {
  text: MarketText;
  tab: 0 | 1;
}

export interface MarkTextProps {
  lead: string;
  mark: string;
  tail?: string;
  className?: string;
}

export interface PriceBurstProps {
  label: string;
  className?: string;
}

export interface ListingCardProps {
  listing: Listing;
  text: MarketText;
  htmlLang: string;
  age: number;
  onOpen: () => void;
}
