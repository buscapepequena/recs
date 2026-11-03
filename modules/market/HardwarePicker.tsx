import { HARDWARE } from "@/hooks/modCatalog";
import { HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { HardwarePickerProps } from "@/types/requests.types";

export default function HardwarePicker({ text, selected, onToggle }: HardwarePickerProps) {
  const copy = text.requests;

  return (
    <div className="flex relative flex-col gap-[0.4em] w-full">
      <span className="font-industria uppercase" style={{ color: MARKET_COLORS.muted }}>
        {copy.hardwareLabel}
      </span>
      <span style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted, fontSize: "0.9em" }}>
        {copy.hardwareHint}
      </span>
      <div className="flex relative flex-row flex-wrap gap-[0.5em]">
        {HARDWARE.map((id) => {
          const active = selected.includes(id);
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(id)}
              className="flex relative flex-row items-center gap-[0.4em] px-[0.6em] py-[0.3em] font-industria uppercase cursor-pointer transition-transform duration-150 hover:-translate-y-[0.08em]"
              style={{
                backgroundColor: active ? MARKET_COLORS.yellow : MARKET_COLORS.cream,
                color: MARKET_COLORS.purple,
                border: `0.12em solid ${active ? MARKET_COLORS.orange : MARKET_COLORS.purple}`,
                fontSize: "0.9em",
              }}
            >
              <span
                aria-hidden
                className="flex relative shrink-0 items-center justify-center w-[1.1em] h-[1.1em]"
                style={{
                  border: `0.12em solid ${MARKET_COLORS.purple}`,
                  backgroundColor: active ? MARKET_COLORS.orange : "transparent",
                  color: "#fff",
                }}
              >
                {active ? "✓" : ""}
              </span>
              {copy.hardware[id]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
