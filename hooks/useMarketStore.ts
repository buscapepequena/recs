"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { GRACE_DAYS, LISTING_DAYS, SAMPLE_LISTINGS } from "@/hooks/marketListings";
import {
  Listing,
  ListingDraft,
  MarketCategory,
  MarketSort,
  MarketStore,
  MarketView,
} from "@/types/market.types";

const STORAGE_KEY = "recs-market-mine";
const DAY = 24 * 60 * 60 * 1000;

const readMine = (): Listing[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Listing[]) : [];
  } catch {
    return [];
  }
};

const writeMine = (listings: Listing[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch {
    console.log("market: listing kept in memory only");
  }
};

export function useMarketStore(): MarketStore {
  const [mine, setMine] = useState<Listing[]>([]);
  const [now, setNow] = useState<number | null>(null);
  const [view, setView] = useState<MarketView>({ name: "browse" });
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MarketCategory | "all">("all");
  const [sort, setSort] = useState<MarketSort>("newest");
  const [seller, setSellerState] = useState<string | null>(null);

  const ageOf = useCallback(
    (listing: Listing) => {
      if (listing.createdAt && now) return Math.max(0, Math.floor((now - listing.createdAt) / DAY));
      return listing.ageDays ?? 0;
    },
    [now],
  );

  useEffect(() => {
    const current = Date.now();
    setNow(current);
    const stored = readMine();
    const alive = stored.filter(
      (listing) =>
        listing.status === "sold" ||
        !listing.createdAt ||
        (current - listing.createdAt) / DAY < LISTING_DAYS + GRACE_DAYS,
    );
    if (alive.length !== stored.length) writeMine(alive);
    setMine(alive);
  }, []);

  const isExpired = useCallback(
    (listing: Listing) => listing.status !== "sold" && ageOf(listing) >= LISTING_DAYS,
    [ageOf],
  );

  const graceLeft = useCallback(
    (listing: Listing) => Math.max(0, LISTING_DAYS + GRACE_DAYS - ageOf(listing)),
    [ageOf],
  );

  const all = useMemo(
    () =>
      [...mine, ...SAMPLE_LISTINGS].filter((listing) => {
        if (listing.status === "sold") return true;
        const age = ageOf(listing);
        if (age < LISTING_DAYS) return true;
        return Boolean(listing.mine) && age < LISTING_DAYS + GRACE_DAYS;
      }),
    [mine, ageOf],
  );

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = all.filter((listing) => {
      if (seller && listing.seller !== seller) return false;
      if (category !== "all" && listing.category !== category) return false;
      if (!term) return true;
      return [listing.title, listing.description, listing.location]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
    return [...filtered].sort((a, b) => {
      const soldA = a.status === "sold" ? 1 : 0;
      const soldB = b.status === "sold" ? 1 : 0;
      if (soldA !== soldB) return soldA - soldB;
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      return ageOf(a) - ageOf(b);
    });
  }, [all, query, category, sort, seller, ageOf]);

  const find = useCallback((id: string) => all.find((listing) => listing.id === id), [all]);

  const countBySeller = useCallback(
    (name: string) => all.filter((listing) => listing.seller === name).length,
    [all],
  );

  const setSeller = useCallback((name: string | null) => {
    setSellerState(name);
    if (name) {
      setQuery("");
      setCategory("all");
      setView({ name: "browse" });
    }
  }, []);

  const add = useCallback((draft: ListingDraft) => {
    const createdAt = Date.now();
    const listing: Listing = {
      ...draft,
      id: `mine-${createdAt}`,
      seller: "you",
      createdAt,
      mine: true,
    };
    setMine((current) => {
      const next = [listing, ...current];
      writeMine(next);
      return next;
    });
    setNow(createdAt);
    setView({ name: "detail", id: listing.id });
  }, []);

  const republish = useCallback((id: string) => {
    const createdAt = Date.now();
    setMine((current) => {
      const next = current.map((listing) => (listing.id === id ? { ...listing, createdAt } : listing));
      writeMine(next);
      return next;
    });
    setNow(createdAt);
  }, []);

  const remove = useCallback((id: string) => {
    setMine((current) => {
      const next = current.filter((listing) => listing.id !== id);
      writeMine(next);
      return next;
    });
    setView({ name: "browse" });
  }, []);

  return {
    ready: now !== null,
    view,
    setView,
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    seller,
    setSeller,
    countBySeller,
    visible,
    find,
    ageOf,
    isExpired,
    graceLeft,
    add,
    republish,
    remove,
  };
}
