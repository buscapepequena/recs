"use client";

import { useEffect, useRef } from "react";

const EASE = 0.12;

export function useScrollLayers(depths: number[]) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    let target = 0;
    let current = 0;
    let frame = 0;

    const measure = () => {
      const rect = box.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const progress = (center - window.innerHeight / 2) / window.innerHeight;
      target = Math.max(-1, Math.min(1, progress));
    };

    const render = () => {
      current += (target - current) * EASE;
      const width = box.clientWidth;
      layerRefs.current.forEach((layer, i) => {
        if (layer) layer.style.transform = `translate3d(0, ${current * depths[i] * width}px, 0)`;
      });
      frame = requestAnimationFrame(render);
    };

    measure();
    current = target;
    frame = requestAnimationFrame(render);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [depths]);

  return { boxRef, layerRefs };
}
