import {
  Listing,
  MarketCategory,
  MarketCondition,
  MarketCurrency,
} from "@/types/market.types";

export const LISTING_DAYS = 30;

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

export const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "rtx-4090-flashed",
    title: "RTX 4090 — flashed BIOS, custom water block",
    description:
      "Founders Edition with a full-cover water block and a stable +180 MHz core overclock. Thermals never pass 52 °C under load. Original air cooler and box included. Benchmarks on request.",
    price: 1650,
    currency: "USD",
    category: "gpu",
    condition: "likeNew",
    location: "Accra",
    photos: ["/images/mod.png", "/images/equipment.png"],
    seller: "silicon_surgeon",
    ageDays: 1,
  },
  {
    id: "rtx-6000-ada",
    title: "RTX 6000 Ada 48 GB — sealed",
    description:
      "Brand new, factory sealed workstation card. 48 GB ECC memory, perfect for local LLMs and rendering. Pickup or insured shipping.",
    price: 6800,
    currency: "USDT",
    category: "gpu",
    condition: "new",
    location: "Kumasi",
    photos: ["/images/rtx6000.png"],
    seller: "kumasi_compute",
    ageDays: 4,
  },
  {
    id: "monster-lan-rig",
    title: "Monster LAN rig — 4 full stations",
    description:
      "Four matched gaming stations from our last tournament. Each one with RGB loop cooling, 32 GB RAM and a 27\" monitor. Sold together only.",
    price: 4200,
    currency: "USDT",
    category: "rig",
    condition: "used",
    location: "São Paulo",
    photos: ["/images/monsterlan.png", "/images/installation.png"],
    seller: "lan_monsters",
    ageDays: 6,
  },
  {
    id: "gpu-rack-loop",
    title: "Custom loop GPU rack, 4 × slots",
    description:
      "Open frame rack with a dual-radiator loop, quick disconnects and a PSU for four cards. Cards not included. Tested and leak-free.",
    price: 2800,
    currency: "USD",
    category: "cooling",
    condition: "used",
    location: "Milano",
    photos: ["/images/equipment.png"],
    seller: "loop_lab",
    ageDays: 12,
  },
  {
    id: "streaming-den-kit",
    title: "Streaming den install kit",
    description:
      "Desk, capture card, key light, boom arm and acoustic panels. Everything you need to turn a spare room into a streaming den.",
    price: 950,
    currency: "USD",
    category: "peripheral",
    condition: "new",
    location: "Madrid",
    photos: ["/images/installation.png"],
    seller: "den_builder",
    ageDays: 2,
  },
  {
    id: "clock-and-cash",
    title: "Retro desk clock (set prop)",
    description:
      "Vintage desk clock used as a set prop for our market shoot. Still ticks. Banknotes not included, sorry.",
    price: 40,
    currency: "USD",
    category: "other",
    condition: "used",
    location: "Lisboa",
    photos: ["/images/market.png"],
    seller: "prop_shop",
    ageDays: 27,
  },
];
