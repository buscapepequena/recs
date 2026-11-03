"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { formatPrice } from "@/hooks/marketFormat";
import { shortNpub } from "@/hooks/nostrMarket";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { openPhoto } from "@/hooks/workshopInbox";
import { WorkshopRequestCardProps } from "@/types/workshop.types";

const TEXT: CSSProperties = { fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.text };

const LABEL: CSSProperties = { color: MARKET_COLORS.muted };

export default function WorkshopRequestCard({ request, text, htmlLang }: WorkshopRequestCardProps) {
  const copy = text.requests;
  const { payload } = request;
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(
    () => () => {
      photos.forEach((url) => URL.revokeObjectURL(url));
    },
    [photos],
  );

  const loadPhotos = async () => {
    setLoading(true);
    setPhotoError("");
    try {
      const opened: string[] = [];
      for (const photo of payload.photos) opened.push(await openPhoto(photo));
      setPhotos(opened);
    } catch (cause) {
      console.log("workshop: photo failed", cause);
      setPhotoError(cause instanceof Error ? cause.message : String(cause));
    }
    setLoading(false);
  };

  const copyHandle = async () => {
    try {
      await navigator.clipboard.writeText(payload.contact.handle);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (cause) {
      console.log("workshop: copy failed", cause);
    }
  };

  const rows: [string, string | undefined][] = [
    [
      "Mods",
      payload.mods?.map((id) => copy.mods[id]?.name ?? id).join(" · "),
    ],
    [copy.customModLabel, payload.customMod],
    [copy.cardLabel, payload.card],
    [copy.spaceLabel, payload.space ? copy.spaces[payload.space] : undefined],
    [copy.hardwareLabel, payload.hardware?.map((id) => copy.hardware[id] ?? id).join(" · ")],
    [copy.hardwareOtherLabel, payload.hardwareOther],
    [copy.budgetLabel, payload.budget ? formatPrice(payload.budget, "USD", htmlLang) : undefined],
  ];

  return (
    <article
      className="flex relative flex-col gap-[0.8em] p-[1em]"
      style={{ backgroundColor: "#fff", border: `0.14em solid ${MARKET_COLORS.text}`, boxShadow: HARD_SHADOW(MARKET_COLORS.orange) }}
    >
      <header className="flex relative flex-row flex-wrap items-center justify-between gap-[0.6em]">
        <span
          className="flex relative px-[0.55em] py-[0.15em] font-industria uppercase"
          style={{ backgroundColor: payload.kind === "mod" ? MARKET_COLORS.orange : MARKET_COLORS.purple, color: "#fff" }}
        >
          {payload.kind === "mod" ? text.tabs.mod : text.tabs.installation}
        </span>
        <span className="font-industria uppercase" style={LABEL}>
          {new Intl.DateTimeFormat(htmlLang, { dateStyle: "medium", timeStyle: "short" }).format(new Date(request.sentAt))}
          {" · "}
          {shortNpub(request.from)}
        </span>
      </header>

      <div className="flex relative flex-col" style={{ borderTop: `0.1em solid ${MARKET_COLORS.line}` }}>
        {rows
          .filter(([, value]) => Boolean(value))
          .map(([label, value]) => (
            <div
              key={label}
              className="flex relative flex-row flex-wrap justify-between gap-x-[1em] py-[0.35em]"
              style={{ borderBottom: `0.1em solid ${MARKET_COLORS.line}` }}
            >
              <span className="font-industria uppercase" style={LABEL}>
                {label}
              </span>
              <span className="text-right" style={TEXT}>
                {value}
              </span>
            </div>
          ))}
      </div>

      <div className="flex relative flex-col gap-[0.3em]">
        <span className="font-industria uppercase" style={LABEL}>
          {copy.detailsLabel}
        </span>
        <p className="flex relative whitespace-pre-line leading-[1.35]" style={TEXT}>
          {payload.details}
        </p>
      </div>

      <div
        className="flex relative flex-row flex-wrap items-center gap-[0.6em] px-[0.8em] py-[0.5em]"
        style={{ backgroundColor: MARKET_COLORS.yellow }}
      >
        <span
          className="flex relative px-[0.5em] py-[0.1em] font-industria uppercase"
          style={{ backgroundColor: MARKET_COLORS.purple, color: MARKET_COLORS.cream }}
        >
          {copy.contactMethods[payload.contact.method] ?? payload.contact.method}
        </span>
        <span className="flex relative break-all" style={TEXT}>
          {payload.contact.handle}
        </span>
        <button
          type="button"
          onClick={copyHandle}
          className="flex relative px-[0.7em] py-[0.2em] font-industria uppercase cursor-pointer"
          style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff" }}
        >
          {copied ? text.copied : text.copy}
        </button>
      </div>

      {payload.photos.length > 0 && (
        <div className="flex relative flex-col gap-[0.5em]">
          {photos.length ? (
            <div className="flex relative flex-row flex-wrap gap-[0.6em]">
              {photos.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex relative w-[10em] aspect-[4/3] overflow-hidden"
                  style={{ border: `0.12em solid ${MARKET_COLORS.muted}` }}
                >
                  <Image src={url} alt="" fill unoptimized sizes="200px" className="object-cover" />
                </a>
              ))}
            </div>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={loadPhotos}
              className="flex relative self-start px-[0.9em] py-[0.45em] font-industria uppercase cursor-pointer disabled:opacity-60 disabled:cursor-wait"
              style={{ border: `0.14em solid ${MARKET_COLORS.text}`, color: MARKET_COLORS.text }}
            >
              {loading ? "Decrypting…" : `Decrypt photos (${payload.photos.length})`}
            </button>
          )}
          {photoError && (
            <span style={{ ...TEXT, color: MARKET_COLORS.red }}>{photoError}</span>
          )}
        </div>
      )}
    </article>
  );
}
