import { MOD_CATALOG } from "@/hooks/modCatalog";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { ModCatalogProps, ModRisk } from "@/types/requests.types";

const RISK_COLORS: Record<ModRisk, string> = {
  low: "#3f8f5a",
  medium: MARKET_COLORS.orange,
  high: MARKET_COLORS.red,
  varies: MARKET_COLORS.muted,
};

export default function ModCatalog({ text, selected, onToggle }: ModCatalogProps) {
  const copy = text.requests;

  return (
    <div className="flex relative flex-col gap-[0.6em] w-full">
      <h3 className="flex relative font-industria uppercase text-[1.15em]" style={{ color: MARKET_COLORS.text }}>
        {copy.catalogTitle}
      </h3>
      <p className="flex relative" style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted }}>
        {copy.catalogHint}
      </p>
      <div className="flex relative flex-row flex-wrap gap-[0.8em]">
        {MOD_CATALOG.map((mod) => {
          const active = selected.includes(mod.id);
          const info = copy.mods[mod.id];
          return (
            <button
              key={mod.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(mod.id)}
              className="flex relative flex-col gap-[0.4em] w-[calc((100%-1.6em)/3)] @max-xl:w-[calc((100%-0.8em)/2)] @max-xs:w-full p-[0.75em] text-left cursor-pointer transition-transform duration-150 hover:-translate-y-[0.1em]"
              style={{
                backgroundColor: active ? MARKET_COLORS.yellow : MARKET_COLORS.cream,
                color: MARKET_COLORS.purple,
                border: `0.14em ${mod.id === "custom" ? "dashed" : "solid"} ${active ? MARKET_COLORS.orange : MARKET_COLORS.purple}`,
                boxShadow: HARD_SHADOW(active ? MARKET_COLORS.orange : MARKET_COLORS.muted),
              }}
            >
              <span className="flex relative flex-row items-start justify-between gap-[0.5em]">
                <span className="flex relative font-souvenir font-medium text-[1.1em] leading-[1.1]">
                  {info.name}
                </span>
                <span
                  aria-hidden
                  className="flex relative shrink-0 items-center justify-center w-[1.3em] h-[1.3em] font-industria"
                  style={{
                    border: `0.12em solid ${MARKET_COLORS.purple}`,
                    backgroundColor: active ? MARKET_COLORS.orange : "transparent",
                    color: "#fff",
                  }}
                >
                  {active ? "✓" : ""}
                </span>
              </span>
              <span className="flex relative font-industria uppercase" style={{ color: MARKET_COLORS.orange }}>
                {info.cards}
              </span>
              <span className="flex relative leading-[1.3]" style={{ fontFamily: HELVETICA, fontWeight: 700, fontSize: "0.9em" }}>
                {info.body}
              </span>
              <span className="flex relative flex-row flex-wrap justify-between gap-x-[0.6em] font-industria uppercase" style={{ fontSize: "0.85em" }}>
                <span style={{ color: RISK_COLORS[mod.risk] }}>
                  {copy.riskLabel}: {copy.risk[mod.risk]}
                </span>
                <span style={{ color: MARKET_COLORS.muted }}>{copy.quote}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
