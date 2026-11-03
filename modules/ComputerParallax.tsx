"use client";

import Image from "next/image";
import { useMemo } from "react";
import { COMPUTER_RATIO } from "@/hooks/computerLayers";
import { useScrollLayers } from "@/hooks/useScrollLayers";
import { ComputerParallaxProps } from "@/types/parallax.types";

export default function ComputerParallax({ layers, alt }: ComputerParallaxProps) {
  const depths = useMemo(() => layers.map((layer) => layer.depth), [layers]);
  const { boxRef, layerRefs } = useScrollLayers(depths);

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={alt}
      className="flex relative w-full"
      style={{ aspectRatio: COMPUTER_RATIO }}
    >
      {layers.map((layer, i) => (
        <div
          key={layer.src}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className="flex absolute will-change-transform pointer-events-none"
          style={{
            left: `${layer.left}%`,
            top: `${layer.top}%`,
            width: `${layer.width}%`,
            aspectRatio: layer.ratio,
          }}
        >
          <Image
            src={layer.src}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1100px) 1140px, 104vw"
            draggable={false}
            className="object-contain select-none"
          />
        </div>
      ))}
    </div>
  );
}
