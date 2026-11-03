import { MARKET_COLORS } from "@/hooks/marketTheme";
import { MarketBackProps } from "@/types/market.types";

export default function MarketBack({ label, onBack }: MarketBackProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="flex relative self-start font-industria uppercase cursor-pointer transition-colors duration-150 hover:text-[#231354]"
      style={{ color: MARKET_COLORS.orange, fontSize: "1.05em" }}
    >
      {label}
    </button>
  );
}
