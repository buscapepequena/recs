import { LOOSE, TIGHT, bold, light, line, mark, medium } from "@/hooks/sitioHeadlines";
import { Dictionary } from "@/types/i18n.types";

const ptBr: Dictionary = {
  meta: {
    title: "recs",
    description: "Recomputational Swaps. Recomprable Swaps. Recompetitive Swaps.",
  },
  languageLabel: "Idioma",
  layers: {
    sky: "Céu",
    suns: "Sóis",
    logo: "Recomp Swaps",
    ship: "Aeronave",
    farCity: "Cidade distante",
    lowClouds: "Nuvens baixas",
    bridge: "Ponte no plano médio",
    midground: "Plano médio",
    foreground: "Nuvens em primeiro plano",
  },
  sitio: {
    images: {
      backdrop: "Monstros numa LAN party",
      mod: "Placas de vídeo modificadas",
      installation: "Setup de computador instalado",
      market: "Relógio cercado de notas de dinheiro",
      equipment: "Técnica fazendo manutenção em máquinas com GPUs",
    },
    headlines: [
      [
        line(TIGHT, light("Tanto faz pra gente")),
        line(TIGHT, light("qual "), mark("mod"), light(" você quer.")),
        line(TIGHT),
        line(LOOSE, light("A gente ajuda "), medium("você")),
        line(LOOSE, light("a tirar o "), bold("máximo"), light(" dele.")),
      ],
      [
        line(TIGHT, light("Instalação especializada")),
        line(TIGHT, light("para "), mark("compradores de primeira viagem"), light(".")),
        line(TIGHT),
        line(LOOSE, light("E para "), bold("profissionais"), light("!")),
        line(LOOSE, light("Supershow multimídia.")),
      ],
      [
        line(TIGHT, light("Não é o quão pouco custa.")),
        line(TIGHT),
        line(TIGHT, light("É "), mark("o quanto"), light(" você leva.")),
        line(LOOSE),
        line(LOOSE, light("Vamos "), bold("trocar"), light("?")),
      ],
    ],
    copy: [
      "Por que se contentar com a velocidade de fábrica se a sua RTX 4090 NASCEU PRA QUEIMAR? Nossos cirurgiões de silício fazem overclock, flash e refrigeração a água no seu hardware até a perfeição TURBINADA, com benchmarks que PROVAM!",
      "LAN party? Arena de torneio? Cantinho de streaming? É só dizer qual é o seu espaço que a gente projeta, monta e liga uma EXPERIÊNCIA COMPUTACIONAL SOB MEDIDA que vai deixar seus convidados de queixo caído!",
      "O ponto de troca DEFINITIVO para usuários avançados! Garanta GPUs de ponta, memória e MONSTROS modificados e certificados a preços de fritar a sua placa-mãe. DOU-LHE UMA... DOU-LHE DUAS... VENDIDO!",
    ],
    gpu: ["Mantenha suas GPUs", "em perfeito", "estado de computação."],
  },
  issue: {
    date: "OUTUBRO/NOVEMBRO 2026",
    computer: "Computador antigo decorado com chaveirinhos e adesivos fofos",  },
  poster: "Recomputational swaps. Recomprable swaps. Recompetitive swaps. RTX 6000",
  privacy: "Ninguém liga mais para privacidade. Rode local.",
  cornerMark: "Buscape Pequena no GitHub",
};

export default ptBr;
