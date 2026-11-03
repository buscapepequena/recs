import { ParallaxLayer } from "@/types/parallax.types";

export const FLOOR = "#bb8bc1";
export const BASE = "#766CB3";
export const POSTER_TOP = "#231354";
export const POSTER_BOTTOM = "#4630b4";
export const SKY_TOP =
  "linear-gradient(to right, #8571b5 0%, #c98bc3 25%, #9b80cb 50%, #bd8ecf 75%, #e99cce 100%)";

export const LAYERS: ParallaxLayer[] = [
  { key: "sky", src: "/images/00.png", alt: "Cielo", depth: 0.05 },
  {
    key: "suns",
    src: "/images/01.png",
    alt: "Soles",
    depth: 0.09,
    drift: {
      x: 0.5,
      y: 1.2,
      duration: 16,
      scale: 0.015,
      glow: 0.1,
      origin: "81% 22%",
    },
  },
  { key: "logo", src: "/images/recompswaps.png", alt: "Recomp Swaps", depth: 0.07 },
  {
    key: "ship",
    src: "/images/02.png",
    alt: "Nave",
    depth: 0.14,
    drift: {
      x: 1.4,
      y: 1.6,
      duration: 18,
      rotate: 0.4,
      origin: "73% 11%",
    },
  },
  { key: "farCity", src: "/images/03.png", alt: "Ciudad lejana", depth: 0.22 },
  { key: "lowClouds", src: "/images/04.png", alt: "Nubes bajas", depth: 0.34 },
  {
    key: "bridge",
    src: "/images/05.png",
    alt: "Puente plano medio",
    depth: 0.48,
    offset: 0.06,
  },
  { key: "midground", src: "/images/06.png", alt: "Plano medio", depth: 0.68, offset: 0.12 },
  {
    key: "foreground",
    src: "/images/07.png",
    alt: "Nubes primer plano",
    depth: 1,
    floor: FLOOR,
    offset: 0.38,
  },
];
