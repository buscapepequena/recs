import Image from "next/image";
import RequestForm from "@/modules/market/RequestForm";
import { HELVETICA, MARKET_COLORS, MARKET_IMAGES } from "@/hooks/marketTheme";
import { MarketServiceProps } from "@/types/requests.types";

export default function MarketService({ text, tab, identity, onNeedIdentity }: MarketServiceProps) {
  const content = tab === 0 ? text.soon.mod : text.soon.installation;
  const sign = tab === 0 ? MARKET_IMAGES.soonMod : MARKET_IMAGES.soonInstallation;

  return (
    <div className="flex relative flex-col gap-[1.2em] w-full pb-[0.6em]">
      <div className="flex relative flex-row @max-xl:flex-col items-center gap-[1.2em]">
        <div className="flex relative shrink-0 w-[min(18em,42%)] @max-xl:w-[min(18em,80%)] aspect-[3/2]">
          <Image
            src={sign}
            alt={content.title}
            fill
            unoptimized
            sizes="320px"
            draggable={false}
            className="object-contain select-none"
          />
        </div>
        <div className="flex relative flex-col gap-[0.6em] flex-1 min-w-0">
          <p className="flex relative leading-[1.35]" style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted }}>
            {content.body}
          </p>
          <ul className="flex relative flex-col items-start gap-[0.35em]">
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
        {tab === 1 && (
          <div className="flex relative shrink-0 self-center w-[min(8em,18.667%)] aspect-[2/3] @max-xl:w-[min(6em,30%)] @max-xl:aspect-square">
            <div className="flex absolute bottom-0 right-0 w-full aspect-square">
              <Image
                src={MARKET_IMAGES.hammerhead}
                alt=""
                fill
                unoptimized
                sizes="160px"
                draggable={false}
                className="object-contain object-bottom select-none"
              />
            </div>
          </div>
        )}
      </div>
      <RequestForm
        key={tab}
        kind={tab === 0 ? "mod" : "installation"}
        text={text}
        identity={identity}
        onNeedIdentity={onNeedIdentity}
      />
    </div>
  );
}
