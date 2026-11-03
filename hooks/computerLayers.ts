import { ComputerLayer } from "@/types/parallax.types";

export const COMPUTER_RATIO = 1 / 0.72;

export const COMPUTER_SCREEN = {
  left: 12,
  top: 16.6,
  width: 77.2,
  height: 67.4,
  radius: "1.6% / 2.4%",
};

export const COMPUTER_LAYERS: ComputerLayer[] = [
  { src: "/images/ordenador1.png", left: 0, top: 0, width: 100, ratio: 1536 / 1024, depth: 0.012 },
  { src: "/images/ordenador2.png", left: 0, top: 55.5, width: 100, ratio: 2172 / 724, depth: 0.03 },
];
