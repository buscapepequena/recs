import PriceBurst from "@/modules/market/PriceBurst";
import { HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { MarketSoonProps } from "@/types/market.types";

export default function MarketSoon({ text, tab }: MarketSoonProps) {
  const content = tab === 0 ? text.soon.mod : text.soon.installation;

  return (
    <div className="flex relative flex-col items-center justify-center gap-[1.1em] w-full min-h-full py-[1.5em] text-center">
      <PriceBurst label={text.soon.badge} className="relative w-[9em] text-[1.15em]" />
      <h3 className="flex relative font-souvenir font-medium text-[2.1em] leading-none text-[#231354]">
        {content.title}
      </h3>
      <p
        className="flex relative max-w-[30em] leading-[1.35]"
        style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted }}
      >
        {content.body}
      </p>
      <ul className="flex relative flex-col items-start gap-[0.4em]">
        {content.points.map((point) => (
          <li
            key={point}
            className="flex relative flex-row items-baseline gap-[0.5em] font-industria uppercase text-left"
            style={{ color: MARKET_COLORS.text }}
          >
            <span aria-hidden style={{ color: MARKET_COLORS.orange }}>
              ★
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
