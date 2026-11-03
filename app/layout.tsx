import type { Metadata } from "next";
import "./globals.css";
import { industria, souvenir } from "@/hooks/fonts";

export const metadata: Metadata = {
  title: "recs",
  description: "Recomputational Swaps. Recomprable Swaps. Recompetitive Swaps.",
  creator: "Buscape Pequena",
  publisher: "Buscape Pequena",
  metadataBase: new URL("https://recs.dx.computer/"),
  twitter: {
    description:
      "Recomputational Swaps. Recomprable Swaps. Recompetitive Swaps.",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${souvenir.variable} ${industria.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
