import { statSync } from "fs";
import { join } from "path";
import { ParallaxLayer } from "@/types/parallax.types";

export const versionSrc = (src: string): string => {
  try {
    const { mtimeMs } = statSync(join(process.cwd(), "public", src));
    return `${src}?v=${Math.floor(mtimeMs)}`;
  } catch {
    return src;
  }
};

export const withImageVersions = (layers: ParallaxLayer[]): ParallaxLayer[] =>
  layers.map((layer) => ({ ...layer, src: versionSrc(layer.src) }));
