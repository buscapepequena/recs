import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkshopInbox from "@/modules/market/WorkshopInbox";
import { getDictionary } from "@/hooks/i18n";
import { hasLocale, localeInfo } from "@/hooks/locales";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function Workshop({ params }: PageProps<"/[lang]/workshop">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <WorkshopInbox text={dict.market} htmlLang={localeInfo(lang).htmlLang} />;
}
