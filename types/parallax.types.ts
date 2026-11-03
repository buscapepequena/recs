import type { CSSProperties, RefObject } from "react";
import type { Dictionary, LayerKey, Locale, SitioImageKey } from "@/types/i18n.types";

export interface ParallaxDrift {
  x: number;
  y: number;
  duration: number;
  rotate?: number;
  scale?: number;
  glow?: number;
  origin?: string;
}

export interface ParallaxLayer {
  key: LayerKey;
  src: string;
  alt: string;
  depth: number;
  drift?: ParallaxDrift;
  floor?: string;
  offset?: number;
}

export interface CornerMarkProps {
  src: string;
  label: string;
  current: Locale;
  languageLabel: string;
}

export interface GpuSectionProps {
  src: string;
  alt: string;
  id: string;
}

export interface ComputerLayer {
  src: string;
  left: number;
  top: number;
  width: number;
  ratio: number;
  depth: number;
}

export interface ComputerParallaxProps {
  layers: ComputerLayer[];
  alt: string;
}

export interface PrivacyMarkProps {
  src: string;
  alt: string;
  targetId: string;
}

export interface SitioImage {
  key: SitioImageKey;
  src: string;
  left: number;
  top: number;
  width: number;
  ratio: number;
  stretch?: boolean;
  option?: number;
}

export interface SitioCopy {
  option: number;
  top: number;
}

export interface HeadlineSegment {
  text: string;
  weight: "light" | "medium" | "bold";
  highlight?: boolean;
}

export interface HeadlineLine {
  segments: HeadlineSegment[];
  leading: number;
}

export interface SitioHeadlineProps {
  lines: HeadlineLine[];
  active: number;
  size: number;
  className?: string;
}

export interface GpuNoteProps {
  lines: string[];
  size: number;
  className?: string;
  style?: CSSProperties;
}

export interface SitioBlockProps {
  images: SitioImage[];
  text: Dictionary["sitio"];
}

export interface MiddleSectionProps {
  text: Dictionary["sitio"];
  issue: Dictionary["issue"];
}

export interface CityParallaxProps {
  layers: ParallaxLayer[];
}

export interface ParallaxRefs {
  sectionRef: RefObject<HTMLDivElement | null>;
  layerRefs: RefObject<(HTMLDivElement | null)[]>;
  driftRefs: RefObject<(HTMLDivElement | null)[]>;
}
