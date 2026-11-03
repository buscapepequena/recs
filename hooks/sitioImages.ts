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
  { key: "backdrop", src: "/images/monsterlan.png", left: MONSTERLAN_LEFT, top: MONSTERLAN_TOP, width: MONSTERLAN_WIDTH, ratio: MONSTERLAN_RATIO, stretch: true },
  { key: "mod", src: "/images/mod.png", left: MONSTERLAN_LEFT, top: rowTop(0), width: ROW_WIDTH, ratio: ROW_RATIO, option: 0 },
  { key: "installation", src: "/images/installation.png", left: MONSTERLAN_LEFT, top: rowTop(1), width: ROW_WIDTH, ratio: ROW_RATIO, option: 1 },
  { key: "market", src: "/images/market.png", left: MONSTERLAN_LEFT, top: rowTop(2), width: ROW_WIDTH, ratio: ROW_RATIO, option: 2 },
  { key: "equipment", src: "/images/equipment.png", left: 47.47, top: 51.31, width: 50.15, ratio: 655 / 694 },
];

export const SITIO_COPY_BOX = { left: 22.3, width: 25, height: ROW_HEIGHT };

export const SITIO_COPY: SitioCopy[] = [
  { option: 0, top: rowTop(0) },
  { option: 1, top: rowTop(1) },
  { option: 2, top: rowTop(2) },
];
