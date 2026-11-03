"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SitioSelectionContext } from "@/hooks/sitioSelection";
import { SitioSelectionProviderProps } from "@/types/parallax.types";

const AUTO_MS = 10000;

export default function SitioSelectionProvider({ total, children }: SitioSelectionProviderProps) {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState<number | null>(null);

  useEffect(() => {
    if (manual !== null) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [manual, total]);

  const select = useCallback((option: number) => {
    setManual(option);
    setActive(option);
  }, []);

  const value = useMemo(() => ({ active, manual, select }), [active, manual, select]);

  return <SitioSelectionContext.Provider value={value}>{children}</SitioSelectionContext.Provider>;
}
