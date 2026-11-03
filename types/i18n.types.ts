import type { ComputerLayer, HeadlineLine } from "@/types/parallax.types";
import type {
  MarketCategory,
  MarketCondition,
  MarketSort,
  PaymentMethod,
  SaleMethod,
} from "@/types/market.types";

export type Locale = "en" | "es" | "pt-br" | "it" | "tw";

export type LayerKey =
  | "sky"
  | "suns"
  | "logo"
  | "ship"
  | "farCity"
  | "lowClouds"
  | "bridge"
  | "midground"
  | "foreground";

export type SitioImageKey = "backdrop" | "mod" | "installation" | "market" | "equipment";

export interface LocaleInfo {
  code: Locale;
  htmlLang: string;
  short: string;
  name: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  languageLabel: string;
  layers: Record<LayerKey, string>;
  sitio: {
    images: Record<SitioImageKey, string>;
    headlines: HeadlineLine[][];
    copy: string[];
    gpu: string[];
  };
  issue: {
    date: string;
    computer: string;
  };
  poster: string;
  privacy: string;
  cornerMark: string;
  market: MarketDictionary;
}

export interface MarketSoonText {
  title: string;
  body: string;
  points: string[];
}

export interface MarketDictionary {
  tabs: { mod: string; installation: string; market: string };
  soon: { badge: string; mod: MarketSoonText; installation: MarketSoonText };
  titleLead: string;
  titleMark: string;
  burst: string;
  tagline: string;
  searchLabel: string;
  searchPlaceholder: string;
  allCategories: string;
  categories: Record<MarketCategory, string>;
  sortLabel: string;
  sort: Record<MarketSort, string>;
  results: string;
  resultsOne: string;
  noResults: string;
  daysLeft: string;
  lastDay: string;
  isNew: string;
  status: { pending: string; sold: string };
  newListing: string;
  back: string;
  details: {
    condition: string;
    category: string;
    location: string;
    posted: string;
    expires: string;
    seller: string;
    make: string;
    model: string;
    size: string;
    payment: string;
  };
  obo: string;
  options: { crypto: string; delivery: string };
  payments: Record<PaymentMethod, string>;
  saleMethods: Record<SaleMethod, string>;
  soldFor: string;
  expired: string;
  republish: string;
  republishWithin: string;
  republishToday: string;
  moreBySeller: string;
  adsBy: string;
  showAll: string;
  today: string;
  postedAgo: string;
  conditions: Record<MarketCondition, string>;
  messageSeller: string;
  messagesSoon: string;
  you: string;
  yourListing: string;
  delete: string;
  deleteConfirm: string;
  photoOf: string;
  form: {
    headingLead: string;
    headingMark: string;
    headingTail: string;
    title: string;
    titlePlaceholder: string;
    price: string;
    currency: string;
    category: string;
    condition: string;
    location: string;
    locationPlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    photos: string;
    addPhotos: string;
    photosHint: string;
    cover: string;
    removePhoto: string;
    processing: string;
    lasts: string;
    publish: string;
    cancel: string;
    required: string;
    invalidPrice: string;
    needPhoto: string;
  };
  open: string;
  close: string;
  tapToOpen: string;
}

export interface LanguageSwitcherProps {
  current: Locale;
  label: string;
}

export interface IssueSectionProps {
  date: string;
  computerLayers: ComputerLayer[];
  computerAlt: string;
  market: MarketDictionary;
  htmlLang: string;
}
