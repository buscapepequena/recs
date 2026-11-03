import { ContactMethod, HardwareId, ModOption, SpaceId } from "@/types/requests.types";

export const MAX_REQUEST_PHOTOS = 3;

export const MOD_CATALOG: ModOption[] = [
  { id: "vram48", risk: "high" },
  { id: "vram22", risk: "high" },
  { id: "vram20", risk: "high" },
  { id: "bios", risk: "medium" },
  { id: "undervolt", risk: "low" },
  { id: "water", risk: "medium" },
  { id: "repaste", risk: "low" },
  { id: "custom", risk: "varies" },
];

export const SPACES: SpaceId[] = [
  "personal",
  "aiServer",
  "studio",
  "office",
  "event",
  "supershow",
  "esports",
  "other",
];

export const HARDWARE: HardwareId[] = [
  "workstations",
  "gpuServers",
  "displays",
  "ledWalls",
  "projection",
  "xr",
  "audio",
  "lighting",
  "streaming",
  "network",
  "power",
  "cooling",
  "racks",
];

export const CONTACT_METHODS: ContactMethod[] = ["signal", "other"];
