import { MarketCurrency } from "@/types/market.types";

export const fill = (template: string, n: number | string) =>
  template.replace("{n}", String(n));

export const formatPrice = (price: number, currency: MarketCurrency, htmlLang: string) => {
  if (currency === "USD") {
    return new Intl.NumberFormat(htmlLang, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price);
  }
  const amount = new Intl.NumberFormat(htmlLang, {
    maximumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
  return `${amount} ${currency}`;
};
