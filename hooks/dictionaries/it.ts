import { LOOSE, TIGHT, bold, light, line, mark, medium } from "@/hooks/sitioHeadlines";
import { Dictionary } from "@/types/i18n.types";

const it: Dictionary = {
  meta: {
    title: "recs",
    description: "Recomputational Swaps. Recomprable Swaps. Recompetitive Swaps.",
  },
  languageLabel: "Lingua",
  layers: {
    sky: "Cielo",
    suns: "Soli",
    logo: "Recomp Swaps",
    ship: "Aeronave",
    farCity: "Città lontana",
    lowClouds: "Nuvole basse",
    bridge: "Ponte in secondo piano",
    midground: "Secondo piano",
    foreground: "Nuvole in primo piano",
  },
  sitio: {
    images: {
      backdrop: "Mostri a un LAN party",
      mod: "Schede video moddate",
      installation: "Postazione computer installata",
      market: "Orologio circondato da banconote",
      equipment: "Tecnica al lavoro su macchine con GPU",
    },
    headlines: [
      [
        line(TIGHT, light("Non ci importa")),
        line(TIGHT, light("quale "), mark("mod"), light(" vuoi.")),
        line(TIGHT),
        line(LOOSE, light("Aiutiamo "), medium("te")),
        line(LOOSE, light("a trarne il "), bold("massimo"), light(".")),
      ],
      [
        line(TIGHT, light("Installazione esperta")),
        line(TIGHT, light("per "), mark("nuovi"), light(" acquirenti.")),
        line(TIGHT),
        line(LOOSE, light("E per i "), bold("pro"), light("!")),
        line(LOOSE, light("Supershow multimediale.")),
      ],
      [
        line(TIGHT, light("Non è quanto poco costa.")),
        line(TIGHT),
        line(TIGHT, light("È "), mark("quanto"), light(" ottieni.")),
        line(LOOSE),
        line(LOOSE, bold("Scambiamo"), light("?")),
      ],
    ],
    copy: [
      "Perché accontentarti della velocità di fabbrica quando la tua RTX 4090 è NATA PER BRUCIARE? I nostri chirurghi del silicio fanno overclock, flash e raffreddamento a liquido al tuo hardware fino alla perfezione TURBOCOMPRESSA, con benchmark che lo DIMOSTRANO!",
      "LAN party? Arena per tornei? Tana per lo streaming? Dicci solo che spazio hai e noi progetteremo, costruiremo e accenderemo un’ESPERIENZA INFORMATICA SU MISURA che lascerà i tuoi ospiti a bocca aperta!",
      "Il punto di scambio DEFINITIVO per i power user! Accaparrati GPU all’avanguardia, memoria e MOSTRI moddati e certificati a prezzi che faranno saltare la tua scheda madre. E UNO... E DUE... AGGIUDICATO!",
    ],
    gpu: ["Mantieni le tue GPU", "in perfette", "condizioni di calcolo."],
  },
  issue: {
    date: "OTTOBRE/NOVEMBRE 2026",
    computer: "Computer d’epoca decorato con ciondoli e adesivi carini",  },
  poster: "Recomputational swaps. Recomprable swaps. Recompetitive swaps. RTX 6000",
  privacy: "A nessuno importa più della privacy. Esegui in locale.",
  cornerMark: "Buscape Pequena su GitHub",
};

export default it;
