import {
  Listing,
  MarketCategory,
  MarketCondition,
  MarketCurrency,
} from "@/types/market.types";

export const LISTING_DAYS = 7;

export const GRACE_DAYS = 2;

export const MAX_PHOTOS = 6;

export const NEW_DAYS = 2;

export const MARKET_CATEGORIES: MarketCategory[] = [
  "gpu",
  "memory",
  "cpu",
  "cooling",
  "rig",
  "peripheral",
  "other",
];

export const MARKET_CONDITIONS: MarketCondition[] = ["new", "likeNew", "used", "parts"];

export const MARKET_CURRENCIES: MarketCurrency[] = ["USD", "USDT"];

const NYC_PAYMENTS: Listing["payments"] = ["crypto", "cash", "ach"];

export const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "rezygcki",
    title: "Rezygcki",
    description:
      "An air-gapped hardware wallet (isolated from the network). An ESP32-S3 board with an NXP SE051 secure element generates and stores private keys that never leave the chip. Every signature is approved with a physical button on the device itself.",
    price: 60,
    currency: "USD",
    category: "other",
    condition: "new",
    location: "New York City",
    photos: ["/images/rezygcki.png"],
    seller: "recomp_nyc",
    ageDays: 0,
  },
  {
    id: "msi-rtx-4090-suprim-liquid-x",
    title: "MSI GeForce RTX 4090 SUPRIM LIQUID X 24G",
    description:
      "Selling my MSI GeForce RTX 4090 SUPRIM LIQUID X 24G graphics card, previously installed in an MSI Infinite RS 13th system.\n\n- Exact model on the label: GeForce RTX 4090 SUPRIM LIQUID X 24G\n- NVIDIA GeForce RTX 4090; 24GB GDDR6X VRAM\n- Factory liquid cooling with 240mm radiator, two radiator fans, and an integrated GPU fan\n- Actual photos plus a video showing the computer running are available\n- Includes the graphics card and its factory attached cooling assembly; case fans and CPU cooling shown in some system photos are not part of the sale\n\nUsed – Excellent Working Condition. Fully functional, carefully maintained, with no known operating issues. Video showing the GPU operating in the original computer is available.\n\nAsking $2,450 OBO. Based in New York City. Buyers should verify case/radiator clearance, power-supply capacity and compatible power connection before purchase.\n\nNYC local pickup available. Shipping available throughout at buyer's expense. Payment accepted via cryptocurrency, cash (in person), or direct bank transfer (ACH).",
    price: 2450,
    currency: "USD",
    category: "gpu",
    condition: "likeNew",
    location: "New York City",
    photos: ["/images/rtx4090.png"],
    seller: "recomp_nyc",
    status: "sold",
    attributes: {
      make: "MSI",
      model: "RTX 4090 SUPRIM LIQUID X 24G",
      size: "24GB GDDR6X, 240mm radiator",
    },
    options: { crypto: true, delivery: true, obo: true },
    payments: NYC_PAYMENTS,
    sale: { price: 2500, currency: "USD", method: "otcCash", date: "2026-10-29" },
    ageDays: 9,
  },
  {
    id: "corsair-dominator-platinum-128gb",
    title: "Corsair Dominator Platinum RGB 128GB DDR5-5200 CL40 (4x32GB)",
    description:
      "Selling four Corsair Dominator Platinum RGB black DDR5 desktop RAM modules, 32GB each (128GB total).\n\n- Exact model/kit part number on each module: CMT64GX5M2B5200C40\n- Four 32GB DDR5 UDIMMs, 128GB total\n- Rated speed: 5200 MT/s; CL40; primary timings 40-40-40-77; 1.25V\n- Version shown on labels: 3.43.01; RGB lighting\n- Each part number refers to a 64GB (2x32GB) kit specification\n- Windows screenshot shows all four Corsair modules detected at 5200 MT/s\n- Condition: Used – Like New / Excellent Condition. Fully functional, meticulously maintained, with no known operating issues.\n- Includes: four RAM modules (original retail packaging not promised)\n\nAsking $1,150 OBO. Based in New York City. Four-DIMM operation and achievable speed depend on motherboard/CPU compatibility.\n\nNYC local pickup available. Shipping available at buyer's expense. Payment accepted via cryptocurrency, cash (in person), or direct bank transfer (ACH).\n\nFull serial numbers may be obscured in photos as a precaution. Original photos, videos, and additional verification are available upon request for serious buyers.",
    price: 1150,
    currency: "USD",
    category: "memory",
    condition: "likeNew",
    location: "New York City",
    photos: ["/images/corsair.png"],
    seller: "recomp_nyc",
    status: "sold",
    attributes: {
      make: "Corsair",
      model: "CMT64GX5M2B5200C40",
      size: "128GB (4 x 32GB) DDR5",
    },
    options: { crypto: true, delivery: true, obo: true },
    payments: NYC_PAYMENTS,
    sale: { price: 1150, currency: "USD", method: "otc", date: "2026-10-30" },
    ageDays: 6,
  },
  {
    id: "kingston-fury-beast-64gb",
    title: "Kingston FURY Beast 64GB DDR5-5600 CL40 (2x32GB)",
    description:
      "Selling two Kingston FURY Beast black, non-RGB DDR5 desktop memory modules, 32GB each (64GB total).\n\n- Exact part number on BOTH modules: KF556C40BB-32\n- Capacity: 64GB total (2 x 32GB), DDR5 UDIMM\n- Rated speed: DDR5-5600 / 5600 MT/s (XMP profile)\n- CAS latency: CL40; rated XMP voltage: 1.25V\n- Black heat spreaders, no RGB\n- Both modules have matching part numbers\n- Used; fully functional, no known operating issues\n- Includes: two RAM modules (original retail packaging not promised)\n\nUsed – Like New / Excellent Condition. Fully functional, meticulously maintained, with no known operating issues.\n\nNYC local pickup available. Shipping available at buyer's expense. Payment accepted via cryptocurrency, cash (in person), or direct bank transfer (ACH).",
    price: 625,
    currency: "USD",
    category: "memory",
    condition: "likeNew",
    location: "New York City",
    photos: ["/images/kingston.png"],
    seller: "recomp_nyc",
    status: "sold",
    attributes: {
      make: "Kingston",
      model: "KF556C40BB-32",
      size: "64GB (2 x 32GB) DDR5 RAM",
    },
    options: { crypto: true, delivery: true },
    payments: NYC_PAYMENTS,
    sale: { price: 500, currency: "USD", method: "otcCash", date: "2026-10-24" },
    ageDays: 12,
  },
];
