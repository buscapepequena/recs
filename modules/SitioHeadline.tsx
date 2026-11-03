import { BASE_SIZE, LEADING_TO_CQW, SITIO_HEADLINES } from "@/hooks/sitioHeadlines";
import { SitioHeadlineProps } from "@/types/parallax.types";

const WEIGHTS = {
  light: "font-light",
  medium: "font-medium",
  bold: "font-bold",
};

export default function SitioHeadline({ active, size, className = "" }: SitioHeadlineProps) {
  const scale = size / BASE_SIZE;

  return (
    <div
      key={active}
      className={`flex flex-col items-center text-center text-white font-souvenir font-light animate-[headline-in_450ms_ease-out] ${className}`}
      style={{ fontSize: `${size}cqw` }}
    >
      {SITIO_HEADLINES[active].map((line, i) => {
        const lead = `${line.leading * LEADING_TO_CQW * scale}cqw`;
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
            {line.segments.map((segment, j) => (
              <span
                key={j}
                className={WEIGHTS[segment.weight]}
                style={
                  segment.highlight
                    ? {
                        backgroundColor: "#fd2710",
                        paddingInline: "0.08em",
                        paddingTop: "0.05em",
                        paddingBottom: "0.02em",
                        boxDecorationBreak: "clone",
                        WebkitBoxDecorationBreak: "clone",
                      }
                    : undefined
                }
              >
                {segment.text}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
}
