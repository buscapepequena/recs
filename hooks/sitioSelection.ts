"use client";

import { createContext, useContext } from "react";
import { SitioSelectionValue } from "@/types/parallax.types";

export const SitioSelectionContext = createContext<SitioSelectionValue | null>(null);

export function useSitioSelection(): SitioSelectionValue {
  const value = useContext(SitioSelectionContext);
  if (!value) throw new Error("useSitioSelection needs SitioSelectionProvider");
  return value;
}
