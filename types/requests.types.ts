import type { IdentityStore } from "@/types/identity.types";
import type { MarketText } from "@/types/market.types";

export type ModId =
  | "vram48"
  | "vram22"
  | "vram20"
  | "bios"
  | "undervolt"
  | "water"
  | "repaste"
  | "custom";

export type ModRisk = "low" | "medium" | "high" | "varies";

export type SpaceId =
  | "personal"
  | "aiServer"
  | "studio"
  | "office"
  | "event"
  | "supershow"
  | "esports"
  | "other";

export type HardwareId =
  | "workstations"
  | "gpuServers"
  | "displays"
  | "ledWalls"
  | "projection"
  | "xr"
  | "audio"
  | "lighting"
  | "streaming"
  | "network"
  | "power"
  | "cooling"
  | "racks";

export type ContactMethod = "signal" | "other";

export type RequestKind = "mod" | "installation";

export interface ModOption {
  id: ModId;
  risk: ModRisk;
}

export interface ModText {
  name: string;
  cards: string;
  body: string;
}

export interface SealedPhoto {
  ref: string;
  key: string;
  iv: string;
  url: string;
}

export interface RequestPayload {
  kind: RequestKind;
  mods?: ModId[];
  customMod?: string;
  card?: string;
  space?: SpaceId;
  hardware?: HardwareId[];
  hardwareOther?: string;
  budget?: number;
  details: string;
  photos: SealedPhoto[];
  contact: { method: ContactMethod; handle: string };
  from: string;
  createdAt: number;
}

export type RequestDraft = Omit<RequestPayload, "photos" | "from" | "createdAt">;

export interface RequestFormProps {
  kind: RequestKind;
  text: MarketText;
  identity: IdentityStore;
  onNeedIdentity: () => void;
}

export interface ModCatalogProps {
  text: MarketText;
  selected: ModId[];
  onToggle: (id: ModId) => void;
}

export interface HardwarePickerProps {
  text: MarketText;
  selected: HardwareId[];
  onToggle: (id: HardwareId) => void;
}

export interface MarketServiceProps {
  text: MarketText;
  tab: 0 | 1;
  identity: IdentityStore;
  onNeedIdentity: () => void;
}
