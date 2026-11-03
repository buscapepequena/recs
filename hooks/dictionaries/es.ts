import { LOOSE, TIGHT, bold, light, line, mark, medium } from "@/hooks/sitioHeadlines";
import { Dictionary } from "@/types/i18n.types";

const es: Dictionary = {
  meta: {
    title: "recs",
    description: "Recomputational Swaps. Recomprable Swaps. Recompetitive Swaps.",
  },
  languageLabel: "Idioma",
  layers: {
    sky: "Cielo",
    suns: "Soles",
    logo: "Recomp Swaps",
    ship: "Aeronave",
    farCity: "Ciudad lejana",
    lowClouds: "Nubes bajas",
    bridge: "Puente en plano medio",
    midground: "Plano medio",
    foreground: "Nubes en primer plano",
  },
  sitio: {
    images: {
      backdrop: "Monstruos en una fiesta LAN",
      mod: "Tarjetas gráficas modificadas",
      installation: "Equipo informático instalado",
      market: "Reloj rodeado de billetes",
      equipment: "Técnica reparando equipos con GPUs",
    },
    headlines: [
      [
        line(TIGHT, light("Nos da igual")),
        line(TIGHT, light("qué "), mark("mod"), light(" quieras.")),
        line(TIGHT),
        line(LOOSE, medium("Te"), light(" ayudamos")),
        line(LOOSE, light("a sacarle el "), bold("máximo"), light(" partido.")),
      ],
      [
        line(TIGHT, light("Instalación experta")),
        line(TIGHT, light("para "), mark("compradores primerizos"), light(".")),
        line(TIGHT),
        line(LOOSE, light("¡Y "), bold("profesionales"), light("!")),
        line(LOOSE, light("Supershow multimedia.")),
      ],
      [
        line(TIGHT, light("No es lo poco que cuesta.")),
        line(TIGHT),
        line(TIGHT, light("Es "), mark("cuánto"), light(" te llevas.")),
        line(LOOSE),
        line(LOOSE, light("¿"), bold("Cambiamos"), light("?")),
      ],
    ],
    copy: [
      "¿Por qué conformarte con la velocidad de fábrica si tu RTX 4090 NACIÓ PARA ARDER? Nuestros cirujanos del silicio hacen overclock, flashean y refrigeran por agua tu hardware hasta una perfección TURBOALIMENTADA, ¡con benchmarks que LO DEMUESTRAN!",
      "¿Fiesta LAN? ¿Arena de torneos? ¿Guarida de streaming? Dinos qué espacio tienes y diseñaremos, montaremos y pondremos en marcha una EXPERIENCIA INFORMÁTICA A MEDIDA que dejará a tus invitados con la boca abierta.",
      "¡El punto de intercambio DEFINITIVO para usuarios avanzados! Hazte con GPUs de última generación, memoria y MONSTRUOS con mods certificados a precios que te volarán la placa base. A LA UNA... A LAS DOS... ¡VENDIDO!",
    ],
    gpu: ["Mantén tus GPUs", "en perfecto", "estado de cómputo."],
  },
  issue: {
    date: "OCTUBRE/NOVIEMBRE 2026",
    computer: "Ordenador antiguo decorado con colgantes y pegatinas monas",  },
  poster: "Recomputational swaps. Recomprable swaps. Recompetitive swaps. RTX 6000",
  privacy: "A nadie le importa ya la privacidad. Ejecútalo en local.",
  cornerMark: "Buscape Pequena en GitHub",
};

export default es;
