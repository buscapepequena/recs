"use client";

import { LEADING_TO_EM } from "@/hooks/sitioHeadlines";
import { useFitWidth } from "@/hooks/useFitWidth";
import { SitioHeadlineProps } from "@/types/parallax.types";

const WEIGHTS = {
  light: "font-light",
  medium: "font-medium",
  bold: "font-bold",
};

const HIGHLIGHT = "#fd2710";
const HIGHLIGHT_PAD = "0.08em";
const HIGHLIGHT_HEIGHT = "1.08em";

export default function SitioHeadline({ lines, active, size, className = "" }: SitioHeadlineProps) {
  const signature = `${active}:${lines
    .map((line) => line.segments.map((segment) => segment.text).join(""))
    .join("|")}`;
  const boxRef = useFitWidth(size, signature);

  return (
    <div
      key={active}
      ref={boxRef}
      className={`flex isolate flex-col items-center text-center text-white font-souvenir font-light animate-[headline-in_450ms_ease-out] ${className}`}
      style={{ fontSize: `${size}cqw` }}
    >
      {lines.map((line, i) => {
        const lead = `${line.leading * LEADING_TO_EM}em`;
        const highlighted = line.segments.some((segment) => segment.highlight);
        return (
          <span
            key={i}
            className="flex relative flex-row items-baseline justify-center whitespace-pre"
            style={{
              lineHeight: lead,
              minHeight: lead,
              marginTop: highlighted && i > 0 ? "0.14em" : undefined,
            }}
          >
            {line.segments.map((segment, j) =>
              segment.highlight ? (
                <span
                  key={j}
                  className={`relative ${WEIGHTS[segment.weight]}`}
                  style={{ paddingInline: HIGHLIGHT_PAD }}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 pointer-events-none"
                    style={{
                      top: "50%",
                      height: HIGHLIGHT_HEIGHT,
                      transform: "translateY(calc(-50% - 0.02em))",
                      backgroundColor: HIGHLIGHT,
                      zIndex: -1,
                    }}
                  />
                  {segment.text}
                </span>
              ) : (
                <span key={j} className={WEIGHTS[segment.weight]}>
                  {segment.text}
                </span>
              ),
            )}
          </span>
        );
      })}
    </div>
  );
}
