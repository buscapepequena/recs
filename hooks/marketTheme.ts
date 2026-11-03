export const MARKET_COLORS = {
  deep: "#150a36",
  purple: "#231354",
  ink: "#1b1040",
  lilac: "#d8caff",
  orange: "#E9672B",
  red: "#fd2710",
  yellow: "#f3d13e",
  cream: "#f1ead2",
  text: "#231354",
  muted: "#54477f",
  line: "rgba(35, 19, 84, 0.3)",
};

export const SILVER_SCREEN = "linear-gradient(180deg, #dcdae0 0%, #c4c1c9 55%, #b3b0b9 100%)";

export const HELVETICA = "var(--font-helvetica-face)";

const starPoints = (spikes: number, inner: number) =>
  Array.from({ length: spikes * 2 }, (_, i) => {
    const radius = i % 2 === 0 ? 50 : inner;
    const angle = (Math.PI * i) / spikes - Math.PI / 2;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  }).join(", ");

export const STARBURST = `polygon(${starPoints(14, 40)})`;

export const SCANLINES =
  "repeating-linear-gradient(to bottom, rgba(35,19,84,0.035) 0px, rgba(35,19,84,0.035) 1px, transparent 1px, transparent 3px)";

export const HARD_SHADOW = (color: string) => `0.28em 0.28em 0 ${color}`;
