import localFont from "next/font/local";

export const souvenir = localFont({
  src: [
    { path: "../public/fonts/ITC Souvenir Std Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/ITC Souvenir Std Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/ITC Souvenir Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-souvenir-face",
  display: "block",
  fallback: ["Georgia", "serif"],
});

export const helvetica = localFont({
  src: "../public/fonts/helvetica-bold.woff2",
  weight: "700",
  style: "normal",
  variable: "--font-helvetica-face",
  display: "block",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const industria = localFont({
  src: "../public/fonts/Industria Solid.otf",
  weight: "400",
  style: "normal",
  variable: "--font-industria-face",
  display: "block",
  fallback: ["Impact", "sans-serif"],
});
