import { Listing, MarketCurrency, MarketText } from "@/types/market.types";

export const listingLocation = (listing: Listing, text: MarketText) =>
  listing.locationKind === "delivery" ? text.locationDelivery : listing.location;

export const fill = (template: string, n: number | string) =>
  template.replace("{n}", String(n));

export const formatDate = (iso: string, htmlLang: string) =>
  new Intl.DateTimeFormat(htmlLang, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));

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
