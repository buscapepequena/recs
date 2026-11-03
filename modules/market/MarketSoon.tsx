import Image from "next/image";
import { HELVETICA, MARKET_COLORS, MARKET_IMAGES } from "@/hooks/marketTheme";
import { MarketSoonProps } from "@/types/market.types";

export default function MarketSoon({ text, tab }: MarketSoonProps) {
  const content = tab === 0 ? text.soon.mod : text.soon.installation;
  const sign = tab === 0 ? MARKET_IMAGES.soonMod : MARKET_IMAGES.soonInstallation;

  return (
    <div className="flex relative flex-col items-center justify-center gap-[1.1em] w-full min-h-full py-[1.5em] text-center">
      <div className="flex relative w-[min(26em,80%)] aspect-[3/2]">
        <Image
          src={sign}
          alt={content.title}
          fill
          unoptimized
          sizes="420px"
          draggable={false}
          className="object-contain select-none"
        />
      </div>
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
