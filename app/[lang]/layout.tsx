import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { helvetica, industria, souvenir } from "@/hooks/fonts";
import { getDictionary } from "@/hooks/i18n";
import { LOCALES, hasLocale, localeInfo } from "@/hooks/locales";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ lang: locale.code }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    creator: "Buscape Pequena",
    publisher: "Buscape Pequena",
    metadataBase: new URL("https://recs.dx.computer/"),
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale.htmlLang, `/${locale.code}`]),
      ),
    },
    openGraph: {
      locale: localeInfo(lang).htmlLang.replace("-", "_"),
    },
    twitter: {
      description: dict.meta.description,
      creator: "@digitalax_",
      site: "@digitalax_",
      card: "summary_large_image",
    },
    robots: {
      googleBot: {
        index: true,
        follow: true,
      },
    },
    keywords: [
      "Web3",
      "Web3 Fashion",
      "Moda Web3",
      "Open Source",
      "CC0",
      "Open Source LLMs",
      "DIGITALAX",
      "DX.COMPUTER",
      "digitalax.xyz",
      "dx.computer",
    ],
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={localeInfo(lang).htmlLang}
      className={`h-full antialiased ${souvenir.variable} ${industria.variable} ${helvetica.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
