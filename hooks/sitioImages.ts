import { SitioCopy, SitioImage } from "@/types/parallax.types";

export const SITIO_RATIO = 1306 / 1600;

const MONSTERLAN_LEFT = 6.51;
const MONSTERLAN_RIGHT = 100;
const MONSTERLAN_WIDTH = MONSTERLAN_RIGHT - MONSTERLAN_LEFT;
const MONSTERLAN_TOP = 31.07;
const MONSTERLAN_RATIO = (1155 / 502) * (MONSTERLAN_WIDTH / 88.44);
const MONSTERLAN_BOTTOM = MONSTERLAN_TOP + (MONSTERLAN_WIDTH * SITIO_RATIO) / MONSTERLAN_RATIO;

const ROW_WIDTH = 14;
const ROW_RATIO = 1699 / 926;
const ROW_HEIGHT = (ROW_WIDTH * SITIO_RATIO) / ROW_RATIO;
const ROW_GAP = 1.4;
const rowTop = (row: number) => MONSTERLAN_BOTTOM + ROW_GAP + row * (ROW_HEIGHT + ROW_GAP);

export const SITIO_SHIFT = (MONSTERLAN_LEFT + MONSTERLAN_RIGHT) / 2 - 50;

export const SITIO_IMAGES: SitioImage[] = [
  { src: "/images/monsterlan.png", alt: "Calle de ciudad", left: MONSTERLAN_LEFT, top: MONSTERLAN_TOP, width: MONSTERLAN_WIDTH, ratio: MONSTERLAN_RATIO, stretch: true },
  { src: "/images/mod.png", alt: "Mod", left: MONSTERLAN_LEFT, top: rowTop(0), width: ROW_WIDTH, ratio: ROW_RATIO, option: 0 },
  { src: "/images/installation.png", alt: "Installation", left: MONSTERLAN_LEFT, top: rowTop(1), width: ROW_WIDTH, ratio: ROW_RATIO, option: 1 },
  { src: "/images/market.png", alt: "Market", left: MONSTERLAN_LEFT, top: rowTop(2), width: ROW_WIDTH, ratio: ROW_RATIO, option: 2 },
  { src: "/images/equipment.png", alt: "Equipo", left: 47.47, top: 51.31, width: 50.15, ratio: 655 / 694 },
];

export const SITIO_COPY_BOX = { left: 22.3, width: 25, height: ROW_HEIGHT };

export const SITIO_COPY: SitioCopy[] = [
  {
    option: 0,
    top: rowTop(0),
    text: "Why settle for factory speed when your RTX 4090 was BORN TO BURN? Our silicon surgeons overclock, flash, and water-cool your hardware to TURBO-CHARGED perfection, with benchmarks to PROVE IT!",
  },
  {
    option: 1,
    top: rowTop(1),
    text: "LAN party? Tournament arena? Streaming den? Just tell us your space and we’ll design, build, and power up a CUSTOM COMPUTING EXPERIENCE that’ll make your guests’ jaws hit the floor!",
  },
  {
    option: 2,
    top: rowTop(2),
    text: "The ULTIMATE trading post for power users! Score cutting-edge GPUs, memory, and certified-modded MONSTERS at prices that’ll blow your motherboard. GOING... GOING... GONE!",
  },
];
