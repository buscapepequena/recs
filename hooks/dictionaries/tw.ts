import { LOOSE, TIGHT, bold, light, line, mark, medium } from "@/hooks/sitioHeadlines";
import { Dictionary } from "@/types/i18n.types";

const tw: Dictionary = {
  meta: {
    title: "recs",
    description: "Recomputational Swaps. Recomprable Swaps. Recompetitive Swaps.",
  },
  languageLabel: "Kasa",
  layers: {
    sky: "Wim",
    suns: "Awia mmienu",
    logo: "Recomp Swaps",
    ship: "Wim hyɛn",
    farCity: "Kuropɔn a ɛwɔ akyiri",
    lowClouds: "Omununkum a ɛbɛn fam",
    bridge: "Twene a ɛwɔ mfimfini",
    midground: "Mfimfini",
    foreground: "Omununkum a ɛwɔ anim",
  },
  sitio: {
    images: {
      backdrop: "Abɔde kɛseɛ wɔ LAN apontoɔ ase",
      mod: "Graphics card a wɔasesa ho",
      installation: "Kɔmputa a wɔasi",
      market: "Dɔnhwerew a sika krataa atwa ho ahyia",
      equipment: "Ɔbenfoɔ a ɔresiesie GPU mfidie",
    },
    headlines: [
      [
        line(TIGHT, light("Ɛnyɛ yɛn asɛm")),
        line(TIGHT, mark("mod"), light(" biara a wopɛ.")),
        line(TIGHT),
        line(LOOSE, light("Yɛbɛboa "), medium("wo")),
        line(LOOSE, light("ama woanya mu "), bold("mfasoɔ kɛseɛ"), light(".")),
      ],
      [
        line(TIGHT, light("Abenfoɔ nsisie")),
        line(TIGHT, light("ma "), mark("wɔn a wɔretɔ no kan"), light(".")),
        line(TIGHT),
        line(LOOSE, light("Ne "), bold("abenfoɔ"), light(" nso!")),
        line(LOOSE, light("Multimedia agoprama kɛseɛ.")),
      ],
      [
        line(TIGHT, light("Ɛnyɛ sɛ ne boɔ yɛ fo.")),
        line(TIGHT),
        line(TIGHT, light("Ɛyɛ "), mark("sɛnea wonya"), light(" pii.")),
        line(LOOSE),
        line(LOOSE, bold("Yɛnsesa"), light(" anaa?")),
      ],
    ],
    copy: [
      "Adɛn nti na wo ani bɛsɔ ahoɔhare a efi adwumayɛbea hɔ, berɛ a wɔwoo wo RTX 4090 no SƐ ƐNHYE DADADA? Yɛn silicon dɔkotafoɔ bɛyɛ overclock, flash, na wɔde nsuo adwo wo hardware no kɔsi sɛ ɛbɛyɛ pɛpɛɛpɛ wɔ TURBO AHOƆDEN mu, na benchmark wɔ hɔ a ƐDA NO ADI!",
      "LAN apontoɔ? Akansie agorɔbea? Streaming dan? Ka wo baabi a wowɔ no kyerɛ yɛn kɛkɛ, na yɛbɛhyehyɛ, yɛasi, na yɛasɔ KƆMPUTA SUAHUNU A WƆAYƐ AMA WO NKUTOO no ano, na ɛbɛma w’ahɔhoɔ ano abue akɔ fam!",
      "Adetɔ ne nsesa beaeɛ a ƐSEN BIARA ma wɔn a wɔde kɔmputa yɛ adwuma kɛseɛ! Nya GPU a ɛyɛ foforɔ paa, memory, ne ABƆDE KƐSEƐ a wɔayɛ mod na wɔagye atom, wɔ boɔ a ɛbɛma wo motherboard apae. ƐREKƆ... ƐREKƆ... AKƆ!",
    ],
    gpu: ["Hwɛ wo GPU ahodoɔ so", "ma ɛnyɛ adwuma", "pɛpɛɛpɛ bere nyinaa."],
  },
  issue: {
    date: "AHINIME/OBUBUO 2026",
    computer: "Kɔmputa dada a wɔde nneɛma fɛfɛ ne stika asiesie ho",  },
  poster: "Recomputational swaps. Recomprable swaps. Recompetitive swaps. RTX 6000",
  privacy: "Obiara nni hɔ a ɔdwene kokoamsɛm ho bio. Yɛ no wo ankasa kɔmputa so.",
  cornerMark: "Buscape Pequena wɔ GitHub so",
};

export default tw;
