import { KittenFace } from "@/types/parallax.types";

export const KITTEN_LID = { width: 16, height: 16, color: "#faf8f9", line: "#1f1c1e" };

export const KITTEN_FACES: KittenFace[] = [
  { key: "cat", eyes: [[1307, 87], [1351, 87]], duration: 4.6, delay: 0.4 },
  { key: "kitty", eyes: [[48, 387], [88, 387]], duration: 5.8, delay: 1.9 },
  { key: "bunny-top", eyes: [[606, 89], [638, 89]], duration: 6.7, delay: 3.1 },
  { key: "bunny-bottom", eyes: [[293, 928], [328, 928]], duration: 5.2, delay: 2.4 },
];
