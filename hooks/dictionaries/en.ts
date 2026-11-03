import { SITIO_HEADLINES } from "@/hooks/sitioHeadlines";
import market from "@/hooks/dictionaries/market/en";
import { Dictionary } from "@/types/i18n.types";

const en: Dictionary = {
  meta: {
    title: "recs",
    description: "Recomputational Swaps. Recomprable Swaps. Recompetitive Swaps.",
  },
  languageLabel: "Language",
  layers: {
    sky: "Sky",
    suns: "Suns",
    logo: "Recomp Swaps",
    ship: "Airship",
    farCity: "Distant city",
    lowClouds: "Low clouds",
    bridge: "Midground bridge",
    midground: "Midground",
    foreground: "Foreground clouds",
  },
  sitio: {
    images: {
      backdrop: "Monsters at a LAN party",
      mod: "Modded graphics cards",
      installation: "Installed computer setup",
      market: "Clock surrounded by banknotes",
      equipment: "Technician servicing GPU rigs",
    },
    headlines: SITIO_HEADLINES,
    copy: [
      "Why settle for factory speed when your RTX 4090 was BORN TO BURN? Our silicon surgeons overclock, flash, and water-cool your hardware to TURBO-CHARGED perfection, with benchmarks to PROVE IT!",
      "LAN party? Tournament arena? Streaming den? Just tell us your space and we’ll design, build, and power up a CUSTOM COMPUTING EXPERIENCE that’ll make your guests’ jaws hit the floor!",
      "The ULTIMATE trading post for power users! Score cutting-edge GPUs, memory, and certified-modded MONSTERS at prices that’ll blow your motherboard. GOING... GOING... GONE!",
    ],
    gpu: ["Keep your gpus", "in tip top", "computing condition."],
  },
  issue: {
    date: "OCTOBER/NOVEMBER 2026",
    computer: "Vintage computer decorated with cute charms and stickers",  },
  poster: "Recomputational swaps. Recomprable swaps. Recompetitive swaps. RTX 6000",
  privacy: "Nobody cares about privacy anymore. Run local.",
  cornerMark: "Buscape Pequena on GitHub",
  market,
};

export default en;
