"use client";

import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { BASE, SKY_TOP } from "@/hooks/parallaxLayers";
import { CityParallaxProps } from "@/types/parallax.types";

export default function CityParallax({ layers }: CityParallaxProps) {
  const { sectionRef, layerRefs, driftRefs } = useParallax(layers);

  return (
    <div
      ref={sectionRef}
      className="flex relative flex-col w-full h-[300vh]"
      style={{ backgroundColor: BASE }}
    >
      <div
        className="flex flex-col w-full h-screen sticky top-0 overflow-hidden"
        style={{ background: SKY_TOP }}
      >
        {layers.map((layer, i) => (
          <div
            key={layer.src}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="flex absolute top-0 left-0 w-full aspect-[1774/887] will-change-transform"
          >
            <div
              className="flex relative w-full h-full"
              style={{ transform: `translateY(${(layer.offset ?? 0) * 100}%)` }}
            >
              <div
                ref={(el) => {
                  driftRefs.current[i] = el;
                }}
                className="flex relative w-full h-full will-change-transform"
              >
                <Image
                  src={layer.src}
                  alt={layer.alt}
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                  draggable={false}
                  className="object-fill select-none pointer-events-none"
                />
              </div>
              {layer.floor && (
                <>
                  <div
                    className="flex absolute left-0 bottom-0 w-full h-[30%] pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${layer.floor} 85%)`,
                    }}
                  />
                  <div
                    className="flex absolute left-0 top-full w-full h-[300vh] pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom, ${layer.floor} 0, ${BASE} 30vh, ${BASE} 100%)`,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
