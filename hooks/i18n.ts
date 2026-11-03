import { Dictionary, Locale } from "@/types/i18n.types";

const DICTIONARIES: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/hooks/dictionaries/en").then((module) => module.default),
  es: () => import("@/hooks/dictionaries/es").then((module) => module.default),
  "pt-br": () => import("@/hooks/dictionaries/ptBr").then((module) => module.default),
  it: () => import("@/hooks/dictionaries/it").then((module) => module.default),
  tw: () => import("@/hooks/dictionaries/tw").then((module) => module.default),
};

export const getDictionary = (locale: Locale) => DICTIONARIES[locale]();
