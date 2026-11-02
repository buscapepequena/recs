import { statSync } from "fs";
import { join } from "path";
import { ParallaxLayer } from "@/types/parallax.types";

export const withImageVersions = (layers: ParallaxLayer[]): ParallaxLayer[] =>
  layers.map((layer) => {
    try {
      const { mtimeMs } = statSync(join(process.cwd(), "public", layer.src));
      return { ...layer, src: `${layer.src}?v=${Math.floor(mtimeMs)}` };
    } catch {
      return layer;
    }
  });
