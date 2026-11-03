"use client";

import Image from "next/image";
import { ChangeEvent, CSSProperties, FormEvent, useRef, useState } from "react";
import ModCatalog from "@/modules/market/ModCatalog";
import HardwarePicker from "@/modules/market/HardwarePicker";
import MarketSelect from "@/modules/market/MarketSelect";
import { compressImage } from "@/hooks/compressImage";
import { CONTACT_METHODS, MAX_REQUEST_PHOTOS, SPACES } from "@/hooks/modCatalog";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS, MARKET_IMAGES } from "@/hooks/marketTheme";
import { sendRequest } from "@/hooks/requestOutbox";
import { REQUESTS_OPEN } from "@/hooks/marketConfig";
import { ContactMethod, HardwareId, ModId, RequestFormProps, SpaceId } from "@/types/requests.types";

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
  color: MARKET_COLORS.red,
  fontSize: "0.9em",
};

type Errors = Partial<Record<"mods" | "custom" | "card" | "details" | "contact" | "failed", string>>;

export default function RequestForm({ kind, text, identity, onNeedIdentity }: RequestFormProps) {
  const copy = text.requests;
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [mods, setMods] = useState<ModId[]>([]);
  const [card, setCard] = useState("");
  const [customMod, setCustomMod] = useState("");
  const [space, setSpace] = useState<SpaceId>("personal");
  const [hardware, setHardware] = useState<HardwareId[]>([]);
  const [hardwareOther, setHardwareOther] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [method, setMethod] = useState<ContactMethod>("signal");
  const [handle, setHandle] = useState("");
  const [processing, setProcessing] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const toggleMod = (id: ModId) =>
    setMods((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const toggleHardware = (id: HardwareId) =>
    setHardware((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const onFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, MAX_REQUEST_PHOTOS - photos.length);
    event.target.value = "";
    if (!files.length) return;
    setProcessing(true);
    const prepared: string[] = [];
    for (const file of files) {
      try {
        prepared.push(await compressImage(file));
      } catch {
        console.log("requests: could not read photo", file.name);
      }
    }
    setPhotos((current) => [...current, ...prepared].slice(0, MAX_REQUEST_PHOTOS));
    setProcessing(false);
  };

  const reset = () => {
    setMods([]);
    setCard("");
    setCustomMod("");
    setHardware([]);
    setHardwareOther("");
    setBudget("");
    setDetails("");
    setPhotos([]);
    setHandle("");
    setErrors({});
    setSent(false);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (kind === "mod" && !mods.length) next.mods = copy.errors.needMod;
    if (kind === "mod" && mods.includes("custom") && !customMod.trim()) next.custom = copy.errors.needCustom;
    if (kind === "mod" && !card.trim()) next.card = copy.errors.needCard;
    if (!details.trim()) next.details = copy.errors.needDetails;
    if (!handle.trim()) next.contact = copy.errors.needContact;
    setErrors(next);
    if (Object.keys(next).length) return;
    if (!identity.identity) {
      onNeedIdentity();
      return;
    }
    if (!REQUESTS_OPEN) {
      setErrors({ failed: copy.errors.closed });
      return;
    }
    setSending(true);
    try {
      const budgetAmount = Number(budget.replace(",", "."));
      await sendRequest(
        {
          kind,
          mods: kind === "mod" ? mods : undefined,
          customMod: kind === "mod" && mods.includes("custom") ? customMod.trim() : undefined,
          card: kind === "mod" ? card.trim() : undefined,
          space: kind === "installation" ? space : undefined,
          hardware: kind === "installation" && hardware.length ? hardware : undefined,
          hardwareOther: kind === "installation" && hardwareOther.trim() ? hardwareOther.trim() : undefined,
          budget: budgetAmount > 0 ? budgetAmount : undefined,
          details: details.trim(),
          contact: { method, handle: handle.trim() },
        },
        photos,
        identity,
      );
      setSent(true);
    } catch (cause) {
      console.log("requests: sending failed", cause);
      setErrors({ failed: copy.errors.failed });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div
        role="status"
        className="flex relative flex-col gap-[0.6em] w-full p-[1em]"
        style={{ backgroundColor: MARKET_COLORS.yellow, color: MARKET_COLORS.purple, boxShadow: HARD_SHADOW(MARKET_COLORS.orange) }}
      >
        <span className="flex relative flex-row items-center gap-[0.35em] font-souvenir font-medium text-[1.5em] leading-none">
          <span aria-hidden className="flex relative shrink-0 w-[1em] h-[1em]">
            <Image src={MARKET_IMAGES.lock} alt="" fill unoptimized sizes="32px" draggable={false} className="object-contain select-none" />
          </span>
          {copy.sentTitle}
        </span>
        <p className="flex relative leading-[1.35]" style={{ fontFamily: HELVETICA, fontWeight: 700 }}>
          {copy.sentBody}
        </p>
        <button
          type="button"
          onClick={reset}
          className="flex relative self-start px-[0.9em] py-[0.45em] font-industria uppercase cursor-pointer"
          style={{ backgroundColor: MARKET_COLORS.purple, color: MARKET_COLORS.cream }}
        >
          {copy.another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex relative flex-col gap-[1em] w-full">
      {!identity.identity && (
        <div
          className="flex relative flex-row flex-wrap items-center justify-between gap-[0.6em] px-[0.8em] py-[0.55em]"
          style={{ backgroundColor: MARKET_COLORS.yellow, color: MARKET_COLORS.purple }}
        >
          <span style={{ fontFamily: HELVETICA, fontWeight: 700 }}>{copy.needIdentity}</span>
          <button
            type="button"
            onClick={onNeedIdentity}
            className="flex relative px-[0.8em] py-[0.35em] font-industria uppercase cursor-pointer"
            style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff" }}
          >
            {text.identity.signIn}
          </button>
        </div>
      )}
      {kind === "mod" ? (
        <>
          <ModCatalog text={text} selected={mods} onToggle={toggleMod} />
          {errors.mods && <span style={ERROR}>{errors.mods}</span>}
          {mods.includes("custom") && (
            <label className="flex relative flex-col gap-[0.3em]">
              <span className="font-industria uppercase" style={LABEL}>
                {copy.customModLabel}
              </span>
              <textarea
                value={customMod}
                onChange={(event) => setCustomMod(event.target.value)}
                maxLength={600}
                rows={2}
                placeholder={copy.customModPlaceholder}
                aria-invalid={Boolean(errors.custom)}
                className="flex relative w-full px-[0.7em] py-[0.5em] outline-none resize-y placeholder:opacity-60"
                style={{ ...FIELD, borderStyle: "dashed", borderColor: MARKET_COLORS.orange }}
              />
              {errors.custom && <span style={ERROR}>{errors.custom}</span>}
            </label>
          )}
          <label className="flex relative flex-col gap-[0.3em]">
            <span className="font-industria uppercase" style={LABEL}>
              {copy.cardLabel}
            </span>
            <input
              value={card}
              onChange={(event) => setCard(event.target.value)}
              maxLength={80}
              placeholder={copy.cardPlaceholder}
              className="flex relative w-full px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
              style={FIELD}
            />
            {errors.card && <span style={ERROR}>{errors.card}</span>}
          </label>
        </>
      ) : (
        <>
          <div className="flex relative flex-col gap-[0.3em] w-full @md:w-[60%]">
            <span className="font-industria uppercase" style={LABEL}>
              {copy.spaceLabel}
            </span>
            <MarketSelect<SpaceId>
              value={space}
              onChange={setSpace}
              label={copy.spaceLabel}
              options={SPACES.map((value) => ({ value, label: copy.spaces[value] }))}
              className="w-full"
            />
          </div>
          <HardwarePicker text={text} selected={hardware} onToggle={toggleHardware} />
          <label className="flex relative flex-col gap-[0.3em]">
            <span className="font-industria uppercase" style={LABEL}>
              {copy.hardwareOtherLabel}
            </span>
            <input
              value={hardwareOther}
              onChange={(event) => setHardwareOther(event.target.value)}
              maxLength={300}
              placeholder={copy.hardwareOtherPlaceholder}
              className="flex relative w-full px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
              style={FIELD}
            />
          </label>
        </>
      )}

      <label className="flex relative flex-col gap-[0.3em]">
        <span className="font-industria uppercase" style={LABEL}>
          {copy.budgetLabel}
        </span>
        <input
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          inputMode="decimal"
          placeholder="0"
          className="flex relative w-full @md:w-[40%] px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
          style={FIELD}
        />
      </label>

      <label className="flex relative flex-col gap-[0.3em]">
        <span className="flex relative flex-row justify-between font-industria uppercase" style={LABEL}>
          <span>{copy.detailsLabel}</span>
          <span style={{ opacity: 0.7 }}>{details.length}/2000</span>
        </span>
        <textarea
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          maxLength={2000}
          rows={5}
          placeholder={kind === "mod" ? copy.detailsPlaceholderMod : copy.detailsPlaceholderInstall}
          className="flex relative w-full px-[0.7em] py-[0.5em] outline-none resize-y placeholder:opacity-60"
          style={FIELD}
        />
        {errors.details && <span style={ERROR}>{errors.details}</span>}
      </label>

      <div className="flex relative flex-col gap-[0.5em]">
        <span className="font-industria uppercase" style={LABEL}>
          {copy.photosLabel}
        </span>
        <div className="flex relative flex-row flex-wrap gap-[0.6em]">
          {photos.map((src, i) => (
            <div
              key={src.slice(-24) + i}
              className="flex relative w-[6.5em] aspect-[4/3] overflow-hidden"
              style={{ border: `0.12em solid ${MARKET_COLORS.muted}` }}
            >
              <Image src={src} alt="" fill unoptimized sizes="120px" className="object-cover" />
              <button
                type="button"
                aria-label={copy.removePhoto}
                onClick={() => setPhotos((current) => current.filter((_, index) => index !== i))}
                className="flex absolute right-0 top-0 items-center justify-center w-[1.4em] h-[1.4em] cursor-pointer font-industria"
                style={{ backgroundColor: MARKET_COLORS.purple, color: MARKET_COLORS.cream }}
              >
                ×
              </button>
            </div>
          ))}
          {photos.length < MAX_REQUEST_PHOTOS && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={processing}
              className="flex relative items-center justify-center w-[6.5em] aspect-[4/3] px-[0.4em] text-center font-industria uppercase cursor-pointer disabled:cursor-wait"
              style={{ border: `0.12em dashed ${MARKET_COLORS.orange}`, color: MARKET_COLORS.orange, fontSize: "0.9em" }}
            >
              {processing ? copy.processing : copy.addPhotos}
            </button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={onFiles} className="hidden" />
      </div>

      <div className="flex relative flex-col gap-[0.3em]">
        <span className="font-industria uppercase" style={LABEL}>
          {copy.contactLabel}
        </span>
        <div className="flex relative flex-row @max-sm:flex-col gap-[0.6em]">
          <MarketSelect<ContactMethod>
            value={method}
            onChange={setMethod}
            label={copy.contactLabel}
            options={CONTACT_METHODS.map((value) => ({ value, label: copy.contactMethods[value] }))}
            className="w-[34%] @max-sm:w-full"
          />
          <input
            value={handle}
            onChange={(event) => setHandle(event.target.value)}
            maxLength={120}
            placeholder={method === "other" ? copy.contactOtherPlaceholder : copy.contactPlaceholder}
            autoComplete="off"
            className="flex relative flex-1 px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
            style={FIELD}
          />
        </div>
        <span style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted, fontSize: "0.9em" }}>
          {copy.contactHint}
        </span>
        {errors.contact && <span style={ERROR}>{errors.contact}</span>}
      </div>

      <p
        className="flex relative flex-row items-start gap-[0.5em] px-[0.7em] py-[0.45em]"
        style={{ fontFamily: HELVETICA, fontWeight: 700, backgroundColor: MARKET_COLORS.purple, color: MARKET_COLORS.cream }}
      >
        <span aria-hidden className="flex relative shrink-0 w-[1.3em] h-[1.3em]">
          <Image src={MARKET_IMAGES.lock} alt="" fill unoptimized sizes="32px" draggable={false} className="object-contain select-none" />
        </span>
        {copy.encryptedNote}
      </p>

      {errors.failed && <span style={ERROR}>{errors.failed}</span>}

      <button
        type="submit"
        disabled={processing || sending}
        className="flex relative self-start px-[1em] py-[0.55em] font-industria uppercase cursor-pointer transition-transform duration-150 hover:-translate-y-[0.1em] disabled:opacity-60 disabled:cursor-wait"
        style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff", boxShadow: HARD_SHADOW(MARKET_COLORS.yellow) }}
      >
        {sending ? copy.sending : copy.send}
      </button>
    </form>
  );
}
