"use client";

import Image from "next/image";
import { useMemo } from "react";
import DeskPart from "@/modules/DeskPart";
import { COMPUTER_RATIO, COMPUTER_SCREEN } from "@/hooks/computerLayers";
import { useScrollLayers } from "@/hooks/useScrollLayers";
import { ComputerParallaxProps } from "@/types/parallax.types";

export default function ComputerParallax({ layers, alt, screen }: ComputerParallaxProps) {
  const depths = useMemo(() => layers.map((layer) => layer.depth), [layers]);
  const rotations = useMemo(() => layers.map((layer) => layer.rotate ?? 0), [layers]);
  const { boxRef, layerRefs } = useScrollLayers(depths, rotations);

  return (
    <div
      ref={boxRef}
      aria-label={alt}
      className="flex relative w-full"
      style={{ aspectRatio: COMPUTER_RATIO }}
    >
      {layers.map((layer, i) => {
        return (
          <div
            key={layer.key}
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
            {layer.interactive ? (
              <DeskPart src={layer.src} />
            ) : (
              <Image
                src={layer.src}
                alt=""
                fill
                unoptimized
                sizes="(min-width: 1100px) 1100px, 100vw"
                draggable={false}
                className="object-contain select-none"
              />
            )}
            {i === 0 && screen && (
              <div
                className="flex absolute overflow-hidden pointer-events-auto"
                style={{
                  left: `${COMPUTER_SCREEN.left}%`,
                  top: `${COMPUTER_SCREEN.top}%`,
                  width: `${COMPUTER_SCREEN.width}%`,
                  height: `${COMPUTER_SCREEN.height}%`,
                  borderRadius: COMPUTER_SCREEN.radius,
                }}
              >
                {screen}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
