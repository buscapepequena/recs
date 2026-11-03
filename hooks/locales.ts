import { Locale, LocaleInfo } from "@/types/i18n.types";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "lang";

export const LOCALES: LocaleInfo[] = [
  { code: "en", htmlLang: "en", short: "EN", name: "English" },
  { code: "es", htmlLang: "es-ES", short: "ES", name: "Español" },
  { code: "pt-br", htmlLang: "pt-BR", short: "PT", name: "Português (Brasil)" },
  { code: "it", htmlLang: "it", short: "IT", name: "Italiano" },
  { code: "tw", htmlLang: "tw", short: "TW", name: "Asante Twi" },
];

export const hasLocale = (value: string): value is Locale =>
  LOCALES.some((locale) => locale.code === value);

export const localeInfo = (code: Locale): LocaleInfo =>
  LOCALES.find((locale) => locale.code === code) ?? LOCALES[0];

export const matchLocale = (header: string | null): Locale => {
  if (!header) return DEFAULT_LOCALE;
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: quality ? Number(quality) : 1 };
    })
    .filter((entry) => entry.tag && entry.tag !== "*")
    .sort((a, b) => b.q - a.q);
  for (const { tag } of tags) {
    if (hasLocale(tag)) return tag;
    const base = tag.split("-")[0];
    if (base === "pt") return "pt-br";
    if (base === "ak" || base === "twi") return "tw";
    if (hasLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
};
