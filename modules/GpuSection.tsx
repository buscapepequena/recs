import Image from "next/image";
import { POSTER_TOP } from "@/hooks/parallaxLayers";
import { GpuSectionProps } from "@/types/parallax.types";

const FADE = "linear-gradient(to bottom, transparent 0%, black 5%, black 100%)";

export default function GpuSection({ src }: GpuSectionProps) {
  return (
    <div
      className="flex relative flex-col w-full -mt-px"
      style={{ backgroundColor: POSTER_TOP }}
    >
      <div
        className="flex relative w-full aspect-[1122/1402] md:aspect-[1122/1250]"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      >
        <Image
          src={src}
          alt="Recomputational swaps. Recomprable swaps. Recompetitive swaps. RTX 6000"
          fill
          unoptimized
          sizes="100vw"
          draggable={false}
          className="object-cover object-[50%_30%] select-none"
        />
      </div>
    </div>
  );
}
