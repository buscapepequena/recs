import { MARKET_COLORS, STARBURST } from "@/hooks/marketTheme";
import { PriceBurstProps } from "@/types/market.types";

export default function PriceBurst({ label, className = "" }: PriceBurstProps) {
  return (
    <div
      className={`flex items-center justify-center aspect-square -rotate-[8deg] ${className}`}
      style={{ filter: "drop-shadow(0.15em 0.15em 0 rgba(21,10,54,0.85))" }}
    >
      <div
        className="flex absolute inset-0"
        style={{ backgroundColor: MARKET_COLORS.yellow, clipPath: STARBURST }}
      />
      <span
        className="flex relative px-[0.9em] text-center leading-[0.95] font-industria"
        style={{ color: MARKET_COLORS.purple }}
      >
        {label}
      </span>
    </div>
  );
}
