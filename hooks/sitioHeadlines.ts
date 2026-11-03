import { HeadlineLine } from "@/types/parallax.types";

const TIGHT = 40.45;
const LOOSE = 42.14;

export const BASE_SIZE = 7.26;

export const LEADING_TO_CQW = 6.05 / TIGHT;

export const SITIO_HEADLINES: HeadlineLine[][] = [
  [
    { leading: TIGHT, segments: [{ text: "We don't care", weight: "light" }] },
    {
      leading: TIGHT,
      segments: [
        { text: "which ", weight: "light" },
        { text: "mod", weight: "medium", highlight: true },
        { text: " you want.", weight: "light" },
      ],
    },
    { leading: TIGHT, segments: [] },
    {
      leading: LOOSE,
      segments: [
        { text: "We'll help ", weight: "light" },
        { text: "you", weight: "medium" },
      ],
    },
    {
      leading: LOOSE,
      segments: [
        { text: "get the ", weight: "light" },
        { text: "most out", weight: "bold" },
        { text: " of it.", weight: "light" },
      ],
    },
  ],
  [
    { leading: TIGHT, segments: [{ text: "Expert installation", weight: "light" }] },
    {
      leading: TIGHT,
      segments: [
        { text: "for ", weight: "light" },
        { text: "first time", weight: "medium", highlight: true },
        { text: " buyers.", weight: "light" },
      ],
    },
    { leading: TIGHT, segments: [] },
    {
      leading: LOOSE,
      segments: [
        { text: "And ", weight: "light" },
        { text: "pros", weight: "bold" },
        { text: "!", weight: "light" },
      ],
    },
    { leading: LOOSE, segments: [{ text: "Multimedia supershow.", weight: "light" }] },
  ],
  [
    { leading: TIGHT, segments: [{ text: "It's not how little it costs.", weight: "light" }] },
    { leading: TIGHT, segments: [] },
    {
      leading: TIGHT,
      segments: [
        { text: "It's ", weight: "light" },
        { text: "how much", weight: "medium", highlight: true },
        { text: " you get.", weight: "light" },
      ],
    },
    { leading: LOOSE, segments: [] },
    {
      leading: LOOSE,
      segments: [
        { text: "Can we ", weight: "light" },
        { text: "swap", weight: "bold" },
        { text: "?", weight: "light" },
      ],
    },
  ],
];
