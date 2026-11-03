import { MARKET_COLORS } from "@/hooks/marketTheme";
import { MarkTextProps } from "@/types/market.types";

export default function MarkText({ lead, mark, tail = "", className = "" }: MarkTextProps) {
  return (
    <span
      className={`flex relative isolate flex-row flex-wrap items-baseline font-souvenir ${className}`}
      style={{ color: MARKET_COLORS.text }}
    >
      {lead && <span className="font-light whitespace-pre">{lead}</span>}
      <span
        className="relative font-medium whitespace-pre"
        style={{ paddingInline: "0.08em", color: "#fff" }}
      >
        <span
          aria-hidden
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "50%",
            height: "1.08em",
            transform: "translateY(calc(-50% - 0.02em))",
            backgroundColor: MARKET_COLORS.red,
            zIndex: -1,
          }}
        />
        {mark}
      </span>
      {tail && <span className="font-light whitespace-pre">{tail}</span>}
    </span>
  );
}
