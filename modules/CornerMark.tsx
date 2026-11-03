import Image from "next/image";
import { CornerMarkProps } from "@/types/parallax.types";

export default function CornerMark({ src }: CornerMarkProps) {
  return (
    <a
      href="https://github.com/buscapepequena/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buscape Pequena en GitHub"
      className="flex fixed left-3 bottom-3 z-50 w-[clamp(110px,12vw,190px)] aspect-[1502/1047] cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="flex relative w-full h-full">
        <Image
          src={src}
          alt="Buscape Pequena"
          fill
          unoptimized
          sizes="190px"
          draggable={false}
          className="object-contain select-none"
        />
      </div>
    </a>
  );
}
