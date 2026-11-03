import type { ComputerLayer, HeadlineLine } from "@/types/parallax.types";
import type { IdentityError } from "@/types/identity.types";
import type { ContactMethod, HardwareId, ModId, ModRisk, ModText, SpaceId } from "@/types/requests.types";
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
  locationDelivery: string;
  expired: string;
  markSold: string;
  freeze: string;
  freezeHint: string;
  freezeConfirm: string;
  soldChoice: string;
  soldDelete: string;
  soldDeleteHint: string;
  soldDeleteConfirm: string;
  archived: string;
  anonymous: string;
  publishing: string;
  publishFailed: string;
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
  contactTitle: string;
  contactOffPlatform: string;
  noContact: string;
  copy: string;
  copied: string;
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
    contact: string;
    contactHint: string;
    needContact: string;
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
  identity: IdentityText;
  requests: RequestsText;
}

export interface RequestsText {
  catalogTitle: string;
  catalogHint: string;
  riskLabel: string;
  risk: Record<ModRisk, string>;
  quote: string;
  mods: Record<ModId, ModText>;
  cardLabel: string;
  cardPlaceholder: string;
  spaceLabel: string;
  spaces: Record<SpaceId, string>;
  customModLabel: string;
  customModPlaceholder: string;
  hardwareLabel: string;
  hardwareHint: string;
  hardware: Record<HardwareId, string>;
  hardwareOtherLabel: string;
  hardwareOtherPlaceholder: string;
  budgetLabel: string;
  detailsLabel: string;
  detailsPlaceholderMod: string;
  detailsPlaceholderInstall: string;
  photosLabel: string;
  addPhotos: string;
  removePhoto: string;
  processing: string;
  contactLabel: string;
  contactHint: string;
  contactMethods: Record<ContactMethod, string>;
  contactPlaceholder: string;
  contactOtherPlaceholder: string;
  encryptedNote: string;
  needIdentity: string;
  send: string;
  sending: string;
  errors: {
    needMod: string;
    needCustom: string;
    needCard: string;
    needDetails: string;
    needContact: string;
    failed: string;
    closed: string;
  };
  sentTitle: string;
  sentBody: string;
  another: string;
}

export interface IdentityText {
  signIn: string;
  titleLead: string;
  titleMark: string;
  intro: string;
  walletTitle: string;
  walletBody: string;
  walletButton: string;
  localTitle: string;
  localBody: string;
  localButton: string;
  restoreTitle: string;
  restoreBody: string;
  restorePlaceholder: string;
  openFile: string;
  password: string;
  restoreButton: string;
  signedAs: string;
  kindWallet: string;
  kindLocal: string;
  backupTitle: string;
  backupBody: string;
  backupButton: string;
  signOut: string;
  signOutWarn: string;
  needIdentity: string;
  working: string;
  errors: Record<IdentityError, string>;
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
