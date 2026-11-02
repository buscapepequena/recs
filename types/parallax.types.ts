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

export interface CityParallaxProps {
  layers: ParallaxLayer[];
}

export interface ParallaxRefs {
  sectionRef: RefObject<HTMLDivElement | null>;
  layerRefs: RefObject<(HTMLDivElement | null)[]>;
  driftRefs: RefObject<(HTMLDivElement | null)[]>;
}
