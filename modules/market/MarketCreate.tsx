"use client";

import Image from "next/image";
import { ChangeEvent, CSSProperties, FormEvent, useRef, useState } from "react";
import MarketBack from "@/modules/market/MarketBack";
import MarkText from "@/modules/market/MarkText";
import { compressImage } from "@/hooks/compressImage";
import {
  MARKET_CATEGORIES,
  MARKET_CONDITIONS,
  MARKET_CURRENCIES,
  MAX_PHOTOS,
} from "@/hooks/marketListings";
import { fill } from "@/hooks/marketFormat";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import {
  MarketCategory,
  MarketCondition,
  MarketCurrency,
  MarketFormErrors,
  MarketViewProps,
} from "@/types/market.types";

const FIELD: CSSProperties = {
  fontFamily: HELVETICA,
  fontWeight: 700,
  backgroundColor: MARKET_COLORS.cream,
  color: MARKET_COLORS.purple,
  border: `0.14em solid ${MARKET_COLORS.muted}`,
};

const LABEL: CSSProperties = { color: MARKET_COLORS.muted };

const ERROR: CSSProperties = {
  fontFamily: HELVETICA,
  fontWeight: 700,
  color: MARKET_COLORS.orange,
  fontSize: "0.9em",
};

export default function MarketCreate({ store, text }: MarketViewProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState<MarketCurrency>("USD");
  const [category, setCategory] = useState<MarketCategory>("gpu");
  const [condition, setCondition] = useState<MarketCondition>("used");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<MarketFormErrors>({});
  const form = text.form;

  const onFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, MAX_PHOTOS - photos.length);
    event.target.value = "";
    if (!files.length) return;
    setProcessing(true);
    const prepared: string[] = [];
    for (const file of files) {
      try {
        prepared.push(await compressImage(file));
      } catch {
        console.log("market: could not read photo", file.name);
      }
    }
    setPhotos((current) => [...current, ...prepared].slice(0, MAX_PHOTOS));
    setProcessing(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const amount = Number(price.replace(",", "."));
    const next: MarketFormErrors = {};
    if (!title.trim()) next.title = form.required;
    if (!price.trim() || !Number.isFinite(amount) || amount <= 0) next.price = form.invalidPrice;
    if (!location.trim()) next.location = form.required;
    if (!description.trim()) next.description = form.required;
    if (!photos.length) next.photos = form.needPhoto;
    setErrors(next);
    if (Object.keys(next).length) return;
    store.add({
      title: title.trim(),
      price: Math.round(amount * 100) / 100,
      currency,
      category,
      condition,
      location: location.trim(),
      description: description.trim(),
      photos,
    });
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex relative flex-col gap-[1em] w-full pb-[0.6em]">
      <MarketBack label={text.back} onBack={() => store.setView({ name: "browse" })} />

      <MarkText
        lead={form.headingLead}
        mark={form.headingMark}
        tail={form.headingTail}
        className="text-[2em] leading-none"
      />

      <label className="flex relative flex-col gap-[0.3em]">
        <span className="font-industria uppercase" style={LABEL}>
          {form.title}
        </span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={90}
          placeholder={form.titlePlaceholder}
          aria-invalid={Boolean(errors.title)}
          className="flex relative w-full px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
          style={FIELD}
        />
        {errors.title && <span style={ERROR}>{errors.title}</span>}
      </label>

      <div className="flex relative flex-row @max-sm:flex-col gap-[0.8em]">
        <label className="flex relative flex-col gap-[0.3em] flex-1">
          <span className="font-industria uppercase" style={LABEL}>
            {form.price}
          </span>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            inputMode="decimal"
            placeholder="0"
            aria-invalid={Boolean(errors.price)}
            className="flex relative w-full px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
            style={FIELD}
          />
          {errors.price && <span style={ERROR}>{errors.price}</span>}
        </label>
        <label className="flex relative flex-col gap-[0.3em] w-[30%] @max-sm:w-full">
          <span className="font-industria uppercase" style={LABEL}>
            {form.currency}
          </span>
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value as MarketCurrency)}
            className="flex relative w-full px-[0.5em] py-[0.5em] outline-none cursor-pointer"
            style={FIELD}
          >
            {MARKET_CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex relative flex-row @max-sm:flex-col gap-[0.8em]">
        <label className="flex relative flex-col gap-[0.3em] flex-1">
          <span className="font-industria uppercase" style={LABEL}>
            {form.category}
          </span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as MarketCategory)}
            className="flex relative w-full px-[0.5em] py-[0.5em] outline-none cursor-pointer"
            style={FIELD}
          >
            {MARKET_CATEGORIES.map((value) => (
              <option key={value} value={value}>
                {text.categories[value]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex relative flex-col gap-[0.3em] flex-1">
          <span className="font-industria uppercase" style={LABEL}>
            {form.condition}
          </span>
          <select
            value={condition}
            onChange={(event) => setCondition(event.target.value as MarketCondition)}
            className="flex relative w-full px-[0.5em] py-[0.5em] outline-none cursor-pointer"
            style={FIELD}
          >
            {MARKET_CONDITIONS.map((value) => (
              <option key={value} value={value}>
                {text.conditions[value]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex relative flex-col gap-[0.3em]">
        <span className="font-industria uppercase" style={LABEL}>
          {form.location}
        </span>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          maxLength={60}
          placeholder={form.locationPlaceholder}
          aria-invalid={Boolean(errors.location)}
          className="flex relative w-full px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
          style={FIELD}
        />
        {errors.location && <span style={ERROR}>{errors.location}</span>}
      </label>

      <label className="flex relative flex-col gap-[0.3em]">
        <span className="flex relative flex-row justify-between font-industria uppercase" style={LABEL}>
          <span>{form.description}</span>
          <span style={{ opacity: 0.7 }}>{description.length}/2000</span>
        </span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={2000}
          rows={5}
          placeholder={form.descriptionPlaceholder}
          aria-invalid={Boolean(errors.description)}
          className="flex relative w-full px-[0.7em] py-[0.5em] outline-none resize-y placeholder:opacity-60"
          style={FIELD}
        />
        {errors.description && <span style={ERROR}>{errors.description}</span>}
      </label>

      <div className="flex relative flex-col gap-[0.5em]">
        <span className="font-industria uppercase" style={LABEL}>
          {form.photos}
        </span>
        <div className="flex relative flex-row flex-wrap gap-[0.6em]">
          {photos.map((src, i) => (
            <div
              key={src.slice(-24) + i}
              className="flex relative w-[6.5em] aspect-[4/3] overflow-hidden"
              style={{ border: `0.12em solid ${i === 0 ? MARKET_COLORS.orange : MARKET_COLORS.muted}` }}
            >
              <Image src={src} alt="" fill unoptimized sizes="120px" className="object-cover" />
              {i === 0 && (
                <span
                  className="flex absolute left-0 bottom-0 px-[0.35em] font-industria uppercase"
                  style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff", fontSize: "0.75em" }}
                >
                  {form.cover}
                </span>
              )}
              <button
                type="button"
                aria-label={form.removePhoto}
                onClick={() => setPhotos((current) => current.filter((_, index) => index !== i))}
                className="flex absolute right-0 top-0 items-center justify-center w-[1.4em] h-[1.4em] cursor-pointer font-industria"
                style={{ backgroundColor: MARKET_COLORS.purple, color: MARKET_COLORS.cream }}
              >
                ×
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={processing}
              className="flex relative items-center justify-center w-[6.5em] aspect-[4/3] px-[0.4em] text-center font-industria uppercase cursor-pointer disabled:cursor-wait"
              style={{
                border: `0.12em dashed ${MARKET_COLORS.orange}`,
                color: MARKET_COLORS.orange,
                fontSize: "0.9em",
              }}
            >
              {processing ? form.processing : form.addPhotos}
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onFiles}
          className="hidden"
        />
        <span style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted, fontSize: "0.9em" }}>
          {fill(form.photosHint, MAX_PHOTOS)}
        </span>
        {errors.photos && <span style={ERROR}>{errors.photos}</span>}
      </div>

      <p
        className="flex relative px-[0.7em] py-[0.45em] self-start"
        style={{ fontFamily: HELVETICA, fontWeight: 700, backgroundColor: MARKET_COLORS.yellow, color: MARKET_COLORS.purple }}
      >
        {form.lasts}
      </p>

      <div className="flex relative flex-row flex-wrap gap-[0.7em]">
        <button
          type="submit"
          disabled={processing}
          className="flex relative px-[1em] py-[0.55em] font-industria uppercase cursor-pointer transition-transform duration-150 hover:-translate-y-[0.1em] disabled:opacity-60"
          style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff", boxShadow: HARD_SHADOW(MARKET_COLORS.yellow) }}
        >
          {form.publish}
        </button>
        <button
          type="button"
          onClick={() => store.setView({ name: "browse" })}
          className="flex relative px-[1em] py-[0.55em] font-industria uppercase cursor-pointer"
          style={{ border: `0.14em solid ${MARKET_COLORS.muted}`, color: MARKET_COLORS.muted }}
        >
          {form.cancel}
        </button>
      </div>
    </form>
  );
}
