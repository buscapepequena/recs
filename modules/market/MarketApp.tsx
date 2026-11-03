"use client";

import { useEffect, useRef } from "react";
import MarketBrowse from "@/modules/market/MarketBrowse";
import MarketCreate from "@/modules/market/MarketCreate";
import MarketDetail from "@/modules/market/MarketDetail";
import MarketService from "@/modules/market/MarketService";
import MarketIdentity from "@/modules/market/MarketIdentity";
import { MARKET_COLORS } from "@/hooks/marketTheme";
import { MarketAppProps, MarketTab } from "@/types/market.types";

const TABS: MarketTab[] = [0, 1, 2];

export default function MarketApp({
  store,
  identity,
  text,
  htmlLang,
  tab,
  onTab,
  variant,
  onExpand,
  onClose,
}: MarketAppProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const labels = [text.tabs.mod, text.tabs.installation, text.tabs.market];
  const viewKey = store.view.name === "detail" ? `detail-${store.view.id}` : store.view.name;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [viewKey, tab]);

  return (
    <div
      className="flex relative flex-col w-full h-full"
      style={{
        fontSize: variant === "screen" ? "clamp(9px, 1.55cqw, 15px)" : "clamp(13px, 1.5cqw, 16px)",
      }}
    >
      <div
        className="flex relative flex-row items-center justify-between gap-[0.6em] px-[1em] py-[0.55em] shrink-0"
        style={{ borderBottom: `0.12em solid ${MARKET_COLORS.line}` }}
      >
        <div role="tablist" className="flex relative flex-row flex-wrap gap-[0.3em]">
          {TABS.map((value) => {
            const selected = value === tab;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onTab(value)}
                className="flex relative px-[0.65em] py-[0.2em] font-industria uppercase cursor-pointer transition-colors duration-150"
                style={{
                  backgroundColor: selected ? MARKET_COLORS.orange : "transparent",
                  color: selected ? "#fff" : MARKET_COLORS.text,
                  border: `0.1em solid ${selected ? MARKET_COLORS.orange : MARKET_COLORS.text}`,
                }}
              >
                {labels[value]}
              </button>
            );
          })}
        </div>
        <div className="flex relative flex-row items-center gap-[0.4em]">
          <button
            type="button"
            onClick={() => store.setView({ name: "identity" })}
            className="flex relative items-center gap-[0.35em] px-[0.6em] h-[1.9em] font-industria uppercase cursor-pointer transition-colors duration-150"
            style={{
              backgroundColor: identity.identity ? MARKET_COLORS.text : "transparent",
              color: identity.identity ? MARKET_COLORS.cream : MARKET_COLORS.text,
              border: `0.1em solid ${MARKET_COLORS.text}`,
            }}
          >
            <span aria-hidden>{identity.identity ? "●" : "○"}</span>
            {identity.identity ? identity.identity.short : text.identity.signIn}
          </button>
          <button
            type="button"
            onClick={variant === "screen" ? onExpand : onClose}
            aria-label={variant === "screen" ? text.open : text.close}
            title={variant === "screen" ? text.open : text.close}
            className="flex relative items-center justify-center w-[1.9em] h-[1.9em] cursor-pointer font-industria transition-colors duration-150 hover:text-[#E9672B]"
            style={{ color: MARKET_COLORS.text, border: `0.1em solid ${MARKET_COLORS.text}`, fontSize: "1.05em" }}
          >
            {variant === "screen" ? "⤢" : "✕"}
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex relative flex-col flex-1 min-h-0 overflow-y-auto overscroll-contain px-[1.1em] py-[1em]"
      >
        {store.view.name === "identity" ? (
          <MarketIdentity
            store={store}
            identity={identity}
            text={text}
            htmlLang={htmlLang}
            next={store.view.next}
          />
        ) : tab !== 2 ? (
          <MarketService
            text={text}
            tab={tab}
            identity={identity}
            onNeedIdentity={() => store.setView({ name: "identity" })}
          />
        ) : store.view.name === "create" ? (
          <MarketCreate store={store} identity={identity} text={text} htmlLang={htmlLang} />
        ) : store.view.name === "detail" ? (
          <MarketDetail
            store={store}
            identity={identity}
            text={text}
            htmlLang={htmlLang}
            id={store.view.id}
          />
        ) : (
          <MarketBrowse store={store} identity={identity} text={text} htmlLang={htmlLang} />
        )}
      </div>
    </div>
  );
}
