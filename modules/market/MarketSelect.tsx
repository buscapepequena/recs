"use client";

import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { MarketSelectProps } from "@/types/market.types";

export default function MarketSelect<T extends string>({
  value,
  options,
  onChange,
  label,
  className = "",
}: MarketSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listId = useId();
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        openList();
        return;
      }
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) => (current + step + options.length) % options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else openList();
    } else if (event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`flex relative ${className}`}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className="flex relative flex-row items-center justify-between gap-[0.6em] w-full px-[0.7em] py-[0.45em] text-left cursor-pointer"
        style={{
          fontFamily: HELVETICA,
          fontWeight: 700,
          backgroundColor: MARKET_COLORS.cream,
          color: MARKET_COLORS.purple,
          border: `0.14em solid ${open ? MARKET_COLORS.orange : MARKET_COLORS.muted}`,
        }}
      >
        <span className="flex relative truncate">{options[selectedIndex]?.label}</span>
        <span
          aria-hidden
          className="flex relative shrink-0 transition-transform duration-200"
          style={{ color: MARKET_COLORS.orange, transform: open ? "rotate(180deg)" : "none", fontSize: "0.8em" }}
        >
          ▼
        </span>
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="flex absolute left-0 top-[calc(100%+0.3em)] z-30 flex-col min-w-full py-[0.25em]"
          style={{
            backgroundColor: MARKET_COLORS.cream,
            border: `0.14em solid ${MARKET_COLORS.purple}`,
            boxShadow: HARD_SHADOW(MARKET_COLORS.orange),
          }}
        >
          {options.map((option, index) => {
            const selected = index === selectedIndex;
            const highlighted = index === active;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(index)}
                onClick={() => choose(index)}
                className="flex relative flex-row items-center gap-[0.5em] px-[0.7em] py-[0.35em] whitespace-nowrap cursor-pointer"
                style={{
                  fontFamily: HELVETICA,
                  fontWeight: 700,
                  backgroundColor: selected
                    ? MARKET_COLORS.orange
                    : highlighted
                      ? MARKET_COLORS.yellow
                      : "transparent",
                  color: selected ? "#fff" : MARKET_COLORS.purple,
                }}
              >
                <span aria-hidden className="flex relative w-[0.8em] font-industria">
                  {selected ? "★" : ""}
                </span>
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
