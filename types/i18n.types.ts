import type { HeadlineLine } from "@/types/parallax.types";

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
}

export interface LanguageSwitcherProps {
  current: Locale;
  label: string;
}

export interface IssueSectionProps {
  date: string;
  computerSrc: string;
  computerAlt: string;
}
