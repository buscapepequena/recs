import Image from "next/image";
import { MARKET_IMAGES } from "@/hooks/marketTheme";
import { PriceBurstProps } from "@/types/market.types";

export default function PriceBurst({ label, className = "" }: PriceBurstProps) {
  return (
    <div
      className={`flex items-center justify-center aspect-[3/2] -rotate-[4deg] pointer-events-none ${className}`}
    >
      <Image
        src={MARKET_IMAGES.priceBox}
        alt=""
        fill
        unoptimized
        sizes="160px"
        draggable={false}
        className="object-contain select-none"
      />
      <span
        className="flex relative px-[1.1em] text-center leading-[0.95] font-industria"
        style={{ color: "#141414" }}
      >
        {label}
      </span>
    </div>
  );
}
