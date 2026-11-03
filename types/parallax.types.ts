import type { RefObject } from "react";

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
  src: string;
  alt: string;
  depth: number;
  drift?: ParallaxDrift;
  floor?: string;
  offset?: number;
}

export interface CornerMarkProps {
  src: string;
}

export interface GpuSectionProps {
  src: string;
}

export interface SitioImage {
  src: string;
  alt: string;
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
  text: string;
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
  active: number;
  size: number;
  className?: string;
}

export interface SitioBlockProps {
  images: SitioImage[];
}

export interface CityParallaxProps {
  layers: ParallaxLayer[];
}

export interface ParallaxRefs {
  sectionRef: RefObject<HTMLDivElement | null>;
  layerRefs: RefObject<(HTMLDivElement | null)[]>;
  driftRefs: RefObject<(HTMLDivElement | null)[]>;
}
