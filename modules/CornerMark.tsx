import Image from "next/image";
import LanguageSwitcher from "@/modules/LanguageSwitcher";
import { CornerMarkProps } from "@/types/parallax.types";

export default function CornerMark({ src, label, current, languageLabel }: CornerMarkProps) {
  return (
    <div className="flex fixed left-3 bottom-3 z-50 flex-col items-start gap-2 w-[clamp(110px,12vw,190px)]">
      <a
        href="https://github.com/buscapepequena/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="flex relative w-full aspect-[1502/1047] cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        <Image
          src={src}
          alt="Buscape Pequena"
          fill
          unoptimized
          sizes="190px"
          draggable={false}
          className="object-contain select-none"
        />
      </a>
      <LanguageSwitcher current={current} label={languageLabel} />
    </div>
  );
}
