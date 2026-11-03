"use client";

import { useFitWidth } from "@/hooks/useFitWidth";
import { GpuNoteProps } from "@/types/parallax.types";

const GPU_COLOR = "#d8caff";

export default function GpuNote({ lines, size, className = "", style }: GpuNoteProps) {
  const boxRef = useFitWidth(size, lines.join("|"), 1);

  return (
    <div
      ref={boxRef}
      className={`flex flex-col items-center text-center font-industria ${className}`}
      style={{ fontSize: `${size}cqw`, lineHeight: 1, color: GPU_COLOR, ...style }}
    >
      {lines.map((line) => (
        <span key={line} className="flex relative whitespace-nowrap">
          {line}
        </span>
      ))}
    </div>
  );
}
