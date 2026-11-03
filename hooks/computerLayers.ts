import { ComputerLayer } from "@/types/parallax.types";

export const COMPUTER_RATIO = 1 / 0.72;

export const MONITOR_SIZE = { width: 1536, height: 1024 };

export const COMPUTER_SCREEN = {
  left: 12,
  top: 16.6,
  width: 77.2,
  height: 67.4,
  radius: "1.6% / 2.4%",
};

export const COMPUTER_LAYERS: ComputerLayer[] = [
  {
    key: "monitor",
    src: "/images/ordenador1.png",
    left: 0,
    top: 0,
    width: 100,
    ratio: 1536 / 1024,
    depth: 0.012,
  },
  {
    key: "tamagotchi",
    src: "/images/tamagotchi.png",
    left: 1.29,
    top: 82.44,
    width: 12.66,
    ratio: 275 / 243,
    depth: 0.036,
    rotate: 3,
    interactive: true,
  },
  {
    key: "star",
    src: "/images/estrella.png",
    left: 14.73,
    top: 91.93,
    width: 5.52,
    ratio: 120 / 95,
    depth: 0.044,
    rotate: -7,
    interactive: true,
  },
  {
    key: "keyboard",
    src: "/images/teclas.png",
    left: 20.17,
    top: 79.35,
    width: 50.64,
    ratio: 1100 / 300,
    depth: 0.03,
    rotate: 0.4,
    interactive: true,
  },
  {
    key: "book",
    src: "/images/librohardware.png",
    left: 79.93,
    top: 83.18,
    width: 18.65,
    ratio: 405 / 245,
    depth: 0.026,
    rotate: 1.6,
    interactive: true,
  },
  {
    key: "mouse",
    src: "/images/raton.png",
    left: 70.2,
    top: 88.24,
    width: 10.82,
    ratio: 235 / 150,
    depth: 0.034,
    rotate: -2.5,
    interactive: true,
  },
];
