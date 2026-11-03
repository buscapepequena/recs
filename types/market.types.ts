import type { Dictionary } from "@/types/i18n.types";
import type { IdentityStore } from "@/types/identity.types";
import type { ContactMethod } from "@/types/requests.types";

export type MarketCategory =
  | "gpu"
  | "memory"
  | "cpu"
  | "cooling"
  | "rig"
  | "peripheral"
  | "security"
  | "confidential"
  | "boards"
  | "other";

export type MarketCondition = "new" | "likeNew" | "used" | "parts";

export type MarketCurrency = "USD" | "USDT";

export type MarketSort = "newest" | "priceLow" | "priceHigh";

export type MarketTab = 0 | 1 | 2;

export type ListingStatus = "available" | "pending" | "sold";

export type PaymentMethod = "crypto" | "cash" | "ach";

export type SaleMethod = "otc" | "otcCash" | "crypto" | "cash" | "ach";

export interface ListingAttributes {
  make?: string;
  model?: string;
  size?: string;
}

export interface ListingOptions {
  crypto?: boolean;
  delivery?: boolean;
  obo?: boolean;
}

export interface ListingContact {
  method: ContactMethod;
  handle: string;
}

export interface ListingSale {
  price: number;
  currency: MarketCurrency;
  method: SaleMethod;
  date: string;
}

export type MarketView =
  | { name: "browse" }
  | { name: "detail"; id: string }
  | { name: "create" }
  | { name: "identity"; next?: "create" };

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: MarketCurrency;
  category: MarketCategory;
  condition: MarketCondition;
  location: string;
  locationKind?: "delivery";
  photos: string[];
  seller: string;
  sellerKey?: string;
  status?: ListingStatus;
  attributes?: ListingAttributes;
  options?: ListingOptions;
  payments?: PaymentMethod[];
  sale?: ListingSale;
  contact?: ListingContact;
  archived?: boolean;
  dTag?: string;
  eventId?: string;
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
  contact: ListingContact;
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
  seller: string | null;
  setSeller: (seller: string | null) => void;
  countBySeller: (seller: string) => number;
  visible: Listing[];
  find: (id: string) => Listing | undefined;
  ageOf: (listing: Listing) => number;
  isExpired: (listing: Listing) => boolean;
  graceLeft: (listing: Listing) => number;
  remote: boolean;
  add: (draft: ListingDraft) => Promise<boolean>;
  republish: (id: string) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
  freeze: (id: string) => Promise<boolean>;
}

export interface MarketScreenProps {
  text: MarketText;
  htmlLang: string;
}

export interface MarketAppProps {
  store: MarketStore;
  identity: IdentityStore;
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
  identity: IdentityStore;
  text: MarketText;
  htmlLang: string;
}

export type MarketFormErrors = Partial<
  Record<"title" | "price" | "location" | "description" | "photos" | "contact", string>
>;

export interface MarketIdentityProps extends MarketViewProps {
  next?: "create";
}

export interface MarketDetailProps extends MarketViewProps {
  id: string;
}

export interface MarketBackProps {
  label: string;
  onBack: () => void;
}

export interface MarketSelectOption<T extends string> {
  value: T;
  label: string;
}

export interface MarketSelectProps<T extends string> {
  value: T;
  options: MarketSelectOption<T>[];
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

export interface ListingStatusMarkProps {
  status?: ListingStatus;
  text: MarketText;
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
  expired: boolean;
  onOpen: () => void;
}
