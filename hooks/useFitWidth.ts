"use client";

import { useLayoutEffect, useRef } from "react";

export function useFitWidth(size: number, signature: string, safe = 0.96) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const fit = () => {
      box.style.fontSize = `${size}cqw`;
      const available = box.clientWidth * safe;
      const widest = Math.max(
        0,
        ...Array.from(box.children).map((child) => (child as HTMLElement).scrollWidth),
      );
      if (widest > available && widest > 0) {
        box.style.fontSize = `${(size * available) / widest}cqw`;
      }
    };
    fit();
    document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [size, signature, safe]);

  return boxRef;
}
