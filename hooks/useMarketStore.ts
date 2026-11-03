"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LISTING_DAYS, SAMPLE_LISTINGS } from "@/hooks/marketListings";
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

  useEffect(() => {
    setNow(Date.now());
    setMine(readMine());
  }, []);

  const ageOf = useCallback(
    (listing: Listing) => {
      if (listing.createdAt && now) return Math.max(0, Math.floor((now - listing.createdAt) / DAY));
      return listing.ageDays ?? 0;
    },
    [now],
  );

  const all = useMemo(
    () => [...mine, ...SAMPLE_LISTINGS].filter((listing) => ageOf(listing) < LISTING_DAYS),
    [mine, ageOf],
  );

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = all.filter((listing) => {
      if (category !== "all" && listing.category !== category) return false;
      if (!term) return true;
      return [listing.title, listing.description, listing.location]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
    return [...filtered].sort((a, b) => {
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      return ageOf(a) - ageOf(b);
    });
  }, [all, query, category, sort, ageOf]);

  const find = useCallback((id: string) => all.find((listing) => listing.id === id), [all]);

  const add = useCallback(
    (draft: ListingDraft) => {
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
    },
    [],
  );

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
    visible,
    find,
    ageOf,
    add,
    remove,
  };
}
