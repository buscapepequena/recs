"use client";

import { useEffect, useRef } from "react";
import { ParallaxLayer, ParallaxRefs } from "@/types/parallax.types";

const POINTER_Y = 24;
const SCROLL_LAG = 0.6;

export const useParallax = (layers: ParallaxLayer[]): ParallaxRefs => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const driftRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const target = { y: 0, s: 0 };
    const current = { y: 0, s: 0 };
    let frame = 0;

    const onPointerMove = (e: PointerEvent) => {
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onPointerLeave = () => {
      target.y = 0;
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      target.s = Math.min(rect.height, Math.max(0, -rect.top));
    };

    const render = (time: number) => {
      const seconds = time / 1000;
      layers.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (el) {
          const ty =
            -((current.y + 1) / 2) * layer.depth * POINTER_Y +
            current.s * (1 - layer.depth) * SCROLL_LAG;
          el.style.transform = `translate3d(0, ${ty}px, 0)`;
        }

        const drift = layer.drift;
        const driftEl = driftRefs.current[i];
        if (!drift || !driftEl) return;
        const phase = (seconds / drift.duration) * Math.PI * 2;
        const dx = Math.sin(phase) * drift.x;
        const dy = Math.sin(phase * 2) * drift.y * 0.5 - Math.cos(phase) * drift.y * 0.5;
        const rotate = Math.sin(phase) * (drift.rotate ?? 0);
        const scale = 1 + Math.sin(phase * 2) * (drift.scale ?? 0);
        const glow = 1 + (Math.sin(phase * 2) + 1) * 0.5 * (drift.glow ?? 0);
        driftEl.style.transformOrigin = drift.origin ?? "50% 50%";
        driftEl.style.transform = `translate3d(${dx}%, ${dy}%, 0) rotate(${rotate}deg) scale(${scale})`;
        driftEl.style.filter = drift.glow ? `brightness(${glow})` : "";
      });
    };

    const tick = (time: number) => {
      current.y += (target.y - current.y) * 0.06;
      current.s += (target.s - current.s) * 0.2;
      render(time);
      frame = requestAnimationFrame(tick);
    };

    onScroll();
    current.s = target.s;
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [layers]);

  return { sectionRef, layerRefs, driftRefs };
};
