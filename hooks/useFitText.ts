"use client";

import { useEffect, useRef } from "react";

const LEADING = 1.18;

export function useFitText(count: number) {
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const fit = () => {
      textRefs.current.slice(0, count).forEach((text) => {
        const box = text?.parentElement;
        if (!text || !box) return;
        const target = box.clientHeight;
        let low = 2;
        let high = 64;
        text.style.lineHeight = String(LEADING);
        for (let i = 0; i < 18; i++) {
          const mid = (low + high) / 2;
          text.style.fontSize = `${mid}px`;
          if (text.scrollHeight <= target) low = mid;
          else high = mid;
        }
        text.style.fontSize = `${low}px`;
        const lines = Math.max(1, Math.round(text.scrollHeight / (low * LEADING)));
        text.style.lineHeight = `${target / lines}px`;
      });
    };

    fit();
    document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    textRefs.current.forEach((text) => text?.parentElement && observer.observe(text.parentElement));
    return () => observer.disconnect();
  }, [count]);

  return textRefs;
}
