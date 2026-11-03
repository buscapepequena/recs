"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MarketApp from "@/modules/market/MarketApp";
import MarkText from "@/modules/market/MarkText";
import { useMarketStore } from "@/hooks/useMarketStore";
import { useSitioSelection } from "@/hooks/sitioSelection";
import { MARKET_COLORS, SCANLINES, SILVER_SCREEN } from "@/hooks/marketTheme";
import { MarketScreenProps, MarketTab } from "@/types/market.types";

export default function MarketScreen({ text, htmlLang }: MarketScreenProps) {
  const store = useMarketStore();
  const { manual, select } = useSitioSelection();
  const tab = (manual ?? 2) as MarketTab;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const app = (variant: "screen" | "modal") => (
    <MarketApp
      store={store}
      text={text}
      htmlLang={htmlLang}
      tab={tab}
      onTab={(value) => select(value)}
      variant={variant}
      onExpand={() => setOpen(true)}
      onClose={() => setOpen(false)}
    />
  );

  return (
    <>
      <div className="@container flex relative w-full h-full overflow-hidden">
        {!open && (
          <div className="flex relative w-full h-full p-[1.8cqw] @max-xl:hidden">
            <div className="flex relative w-full h-full overflow-hidden rounded-[0.8cqw]">
              {app("screen")}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="hidden @max-xl:flex relative flex-col items-center justify-center gap-[0.6em] w-full h-full cursor-pointer"
        >
          <MarkText
            lead={text.titleLead}
            mark={text.titleMark}
            className="text-[clamp(14px,9cqw,30px)] leading-none"
          />
          <span
            className="flex relative font-industria uppercase animate-pulse"
            style={{ color: MARKET_COLORS.orange, fontSize: "clamp(10px, 5cqw, 16px)" }}
          >
            {text.tapToOpen}
          </span>
        </button>
        <div
          aria-hidden
          className="flex absolute inset-0 pointer-events-none"
          style={{ backgroundImage: SCANLINES }}
        />
      </div>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${text.titleLead}${text.titleMark}`}
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
            className="flex fixed inset-0 z-[80] items-center justify-center p-3 md:p-8 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(13, 7, 36, 0.86)" }}
          >
            <div
              className="@container flex relative w-full max-w-[1100px] h-[88vh] overflow-hidden"
              style={{
                background: SILVER_SCREEN,
                border: `0.2em solid ${MARKET_COLORS.cream}`,
                borderRadius: "1.2em",
                boxShadow: `0.5em 0.5em 0 ${MARKET_COLORS.orange}`,
              }}
            >
              {app("modal")}
              <div
                aria-hidden
                className="flex absolute inset-0 pointer-events-none"
                style={{ backgroundImage: SCANLINES }}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
