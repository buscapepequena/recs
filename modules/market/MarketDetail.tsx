"use client";

import Image from "next/image";
import { useState } from "react";
import MarketBack from "@/modules/market/MarketBack";
import PriceBurst from "@/modules/market/PriceBurst";
import ListingStatusMark from "@/modules/market/ListingStatusMark";
import { LISTING_DAYS } from "@/hooks/marketListings";
import { fill, formatDate, formatPrice } from "@/hooks/marketFormat";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { MarketDetailProps } from "@/types/market.types";

export default function MarketDetail({ store, text, htmlLang, id }: MarketDetailProps) {
  const listing = store.find(id);
  const [photo, setPhoto] = useState(0);
  const [note, setNote] = useState(false);
  const [confirming, setConfirming] = useState(false);

  if (!listing) {
    return (
      <div className="flex relative flex-col gap-[1em]">
        <MarketBack label={text.back} onBack={() => store.setView({ name: "browse" })} />
        <p style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted }}>
          {text.noResults}
        </p>
      </div>
    );
  }

  const age = store.ageOf(listing);
  const left = LISTING_DAYS - age;
  const status = listing.status ?? "available";
  const expired = store.isExpired(listing);
  const grace = store.graceLeft(listing);
  const sellerAds = listing.mine ? 0 : store.countBySeller(listing.seller);
  const rows: [string, string][] = [
    [text.details.condition, text.conditions[listing.condition]],
    [text.details.category, text.categories[listing.category]],
    [text.details.location, listing.location],
    [text.details.posted, age === 0 ? text.today : fill(text.postedAgo, age)],
    [
      text.details.expires,
      status === "sold"
        ? text.status.sold
        : expired
          ? text.expired
          : status === "pending"
          ? text.status.pending
          : left <= 1
            ? text.lastDay
            : fill(text.daysLeft, left),
    ],
    [text.details.seller, listing.mine ? text.you : `@${listing.seller}`],
  ];
  const extra: [string, string | undefined][] = [
    [text.details.make, listing.attributes?.make],
    [text.details.model, listing.attributes?.model],
    [text.details.size, listing.attributes?.size],
    [text.details.payment, listing.payments?.map((method) => text.payments[method]).join(" · ")],
  ];
  extra.forEach(([label, value]) => {
    if (value) rows.splice(rows.length - 1, 0, [label, value]);
  });
  const tags = [
    listing.options?.crypto ? text.options.crypto : null,
    listing.options?.delivery ? text.options.delivery : null,
  ].filter((tag): tag is string => Boolean(tag));

  return (
    <div className="flex relative flex-col gap-[1em] w-full">
      <MarketBack label={text.back} onBack={() => store.setView({ name: "browse" })} />

      <div className="flex relative flex-row @max-xl:flex-col gap-[1.4em] w-full">
        <div className="flex relative flex-col gap-[0.6em] w-[52%] @max-xl:w-full">
          <div
            className="flex relative w-full aspect-[4/3] overflow-hidden"
            style={{
              backgroundColor: MARKET_COLORS.ink,
              border: `0.14em solid ${MARKET_COLORS.text}`,
              boxShadow: HARD_SHADOW(MARKET_COLORS.orange),
            }}
          >
            {listing.photos[photo] && (
              <Image
                key={listing.photos[photo]}
                src={listing.photos[photo]}
                alt={listing.title}
                fill
                unoptimized
                sizes="600px"
                draggable={false}
                className="object-cover select-none"
              />
            )}
            <ListingStatusMark status={listing.status} text={text} />
          </div>
          {listing.photos.length > 1 && (
            <div className="flex relative flex-row flex-wrap gap-[0.5em]">
              {listing.photos.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  aria-label={fill(text.photoOf, i + 1)}
                  aria-pressed={photo === i}
                  onClick={() => setPhoto(i)}
                  className="flex relative w-[4.5em] aspect-[4/3] overflow-hidden cursor-pointer"
                  style={{
                    border: `0.12em solid ${photo === i ? MARKET_COLORS.orange : MARKET_COLORS.muted}`,
                    opacity: photo === i ? 1 : 0.75,
                  }}
                >
                  <Image src={src} alt="" fill unoptimized sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex relative flex-col gap-[0.9em] flex-1 min-w-0">
          <div className="flex relative flex-row items-start justify-between gap-[0.8em]">
            <h3 className="flex relative font-souvenir font-medium text-[1.7em] leading-[1.05] text-[#231354]">
              {listing.title}
            </h3>
            <PriceBurst
              label={formatPrice(listing.price, listing.currency, htmlLang)}
              className="relative shrink-0 w-[8em] text-[1em]"
            />
          </div>

          {(listing.mine || listing.options?.obo) && (
            <div className="flex relative flex-row flex-wrap gap-[0.5em]">
              {listing.mine && (
                <span
                  className="flex relative px-[0.5em] py-[0.15em] font-industria uppercase"
                  style={{ backgroundColor: MARKET_COLORS.red, color: "#fff" }}
                >
                  {text.yourListing}
                </span>
              )}
              {listing.options?.obo && (
                <span
                  className="flex relative px-[0.5em] py-[0.1em] font-industria uppercase"
                  style={{ border: `0.12em solid ${MARKET_COLORS.orange}`, color: MARKET_COLORS.orange }}
                >
                  {text.obo}
                </span>
              )}
            </div>
          )}

          {listing.mine && expired && (
            <div
              className="flex relative flex-row flex-wrap items-center justify-between gap-[0.6em] px-[0.8em] py-[0.55em]"
              style={{ backgroundColor: MARKET_COLORS.yellow, color: MARKET_COLORS.text }}
            >
              <span style={{ fontFamily: HELVETICA, fontWeight: 700 }}>
                {grace <= 1 ? text.republishToday : fill(text.republishWithin, grace)}
              </span>
              <button
                type="button"
                onClick={() => store.republish(listing.id)}
                className="flex relative px-[0.8em] py-[0.35em] font-industria uppercase cursor-pointer"
                style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff" }}
              >
                {text.republish}
              </button>
            </div>
          )}

          {listing.sale && (
            <div
              className="flex relative flex-col gap-[0.15em] px-[0.8em] py-[0.55em]"
              style={{
                backgroundColor: MARKET_COLORS.yellow,
                color: MARKET_COLORS.text,
                boxShadow: HARD_SHADOW(MARKET_COLORS.orange),
              }}
            >
              <span className="font-souvenir font-medium text-[1.25em] leading-none">
                {fill(text.soldFor, formatPrice(listing.sale.price, listing.sale.currency, htmlLang))}
              </span>
              <span className="font-industria uppercase">
                {text.saleMethods[listing.sale.method]} · {formatDate(listing.sale.date, htmlLang)}
              </span>
            </div>
          )}

          <div
            className="flex relative flex-col"
            style={{ borderTop: `0.1em solid ${MARKET_COLORS.line}` }}
          >
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="flex relative flex-row justify-between gap-[1em] py-[0.35em]"
                style={{ borderBottom: `0.1em solid ${MARKET_COLORS.line}` }}
              >
                <span className="font-industria uppercase" style={{ color: MARKET_COLORS.muted }}>
                  {label}
                </span>
                <span
                  className="text-right"
                  style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.text }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {tags.length > 0 && (
            <div className="flex relative flex-row flex-wrap gap-[0.45em]">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex relative px-[0.55em] py-[0.2em] font-industria uppercase"
                  style={{ backgroundColor: MARKET_COLORS.text, color: MARKET_COLORS.cream, fontSize: "0.9em" }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          )}

          <p
            className="flex relative whitespace-pre-line leading-[1.35]"
            style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.text }}
          >
            {listing.description}
          </p>

          <div className="flex relative flex-row flex-wrap gap-[0.7em]">
            {!listing.mine && status !== "sold" && (
              <button
                type="button"
                onClick={() => setNote(true)}
                className="flex relative px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer transition-transform duration-150 hover:-translate-y-[0.1em]"
                style={{
                  backgroundColor: MARKET_COLORS.orange,
                  color: "#fff",
                  boxShadow: HARD_SHADOW(MARKET_COLORS.yellow),
                }}
              >
                {text.messageSeller}
              </button>
            )}
            {sellerAds > 1 && (
              <button
                type="button"
                onClick={() => store.setSeller(listing.seller)}
                className="flex relative px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer"
                style={{ border: `0.14em solid ${MARKET_COLORS.text}`, color: MARKET_COLORS.text }}
              >
                {text.moreBySeller} ({sellerAds})
              </button>
            )}
            {listing.mine && (
              <button
                type="button"
                onClick={() => (confirming ? store.remove(listing.id) : setConfirming(true))}
                onBlur={() => setConfirming(false)}
                className="flex relative px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer"
                style={{
                  border: `0.14em solid ${MARKET_COLORS.red}`,
                  backgroundColor: confirming ? MARKET_COLORS.red : "transparent",
                  color: confirming ? "#fff" : MARKET_COLORS.red,
                }}
              >
                {confirming ? text.deleteConfirm : text.delete}
              </button>
            )}
          </div>

          {note && (
            <p
              role="status"
              className="flex relative px-[0.7em] py-[0.5em]"
              style={{
                fontFamily: HELVETICA,
                fontWeight: 700,
                backgroundColor: MARKET_COLORS.yellow,
                color: MARKET_COLORS.purple,
              }}
            >
              {text.messagesSoon}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
