"use client";

import Image from "next/image";
import { PointerEvent, useRef } from "react";
import { DeskPartProps } from "@/types/parallax.types";

const SPRING = "transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1)";
const MAX_TILT = 14;

export default function DeskPart({ src }: DeskPartProps) {
  const pieceRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<{ x: number; y: number; id: number } | null>(null);

  const place = (x: number, y: number, lifted: boolean) => {
    const piece = pieceRef.current;
    if (!piece) return;
    const tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, x * 0.06));
    piece.style.transform = lifted
      ? `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg) scale(1.06)`
      : "translate3d(0, 0, 0) rotate(0deg) scale(1)";
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    startRef.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    if (pieceRef.current) {
      pieceRef.current.style.transition = "transform 120ms ease-out";
      pieceRef.current.style.cursor = "grabbing";
    }
    place(0, 0, true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = startRef.current;
    if (!start || start.id !== event.pointerId) return;
    if (pieceRef.current) pieceRef.current.style.transition = "none";
    place(event.clientX - start.x, event.clientY - start.y, true);
  };

  const release = (event: PointerEvent<HTMLDivElement>) => {
    const start = startRef.current;
    if (!start || start.id !== event.pointerId) return;
    startRef.current = null;
    if (pieceRef.current) {
      pieceRef.current.style.transition = SPRING;
      pieceRef.current.style.cursor = "grab";
    }
    place(0, 0, false);
  };

  return (
    <div
      ref={pieceRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      className="flex absolute inset-0 pointer-events-auto select-none touch-none will-change-transform"
      style={{ cursor: "grab", transition: SPRING }}
    >
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        sizes="(min-width: 1100px) 560px, 50vw"
        draggable={false}
        className="object-contain select-none pointer-events-none"
      />
    </div>
  );
}
