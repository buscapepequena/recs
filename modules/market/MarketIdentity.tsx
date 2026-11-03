"use client";

import { ChangeEvent, CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import MarketBack from "@/modules/market/MarketBack";
import MarkText from "@/modules/market/MarkText";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { MarketIdentityProps } from "@/types/market.types";

const BODY: CSSProperties = { fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted };

const FIELD: CSSProperties = {
  fontFamily: HELVETICA,
  fontWeight: 700,
  backgroundColor: MARKET_COLORS.cream,
  color: MARKET_COLORS.purple,
  border: `0.14em solid ${MARKET_COLORS.muted}`,
};

const PRIMARY: CSSProperties = {
  backgroundColor: MARKET_COLORS.orange,
  color: "#fff",
  boxShadow: HARD_SHADOW(MARKET_COLORS.yellow),
};

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      className="flex relative flex-col gap-[0.6em] p-[0.9em]"
      style={{ border: `0.14em solid ${MARKET_COLORS.text}`, backgroundColor: "rgba(241, 234, 210, 0.35)" }}
    >
      <h3 className="flex relative font-industria uppercase text-[1.1em]" style={{ color: MARKET_COLORS.text }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function MarketIdentity({ store, identity, text, next }: MarketIdentityProps) {
  const copy = text.identity;
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [backup, setBackup] = useState("");
  const [password, setPassword] = useState("");
  const [exportPassword, setExportPassword] = useState("");
  const [confirmOut, setConfirmOut] = useState(false);
  const current = identity.identity;

  useEffect(() => {
    if (current && next === "create") store.setView({ name: "create" });
  }, [current, next, store]);

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBackup((await file.text()).trim());
  };

  const download = () => {
    const encrypted = identity.exportBackup(exportPassword);
    if (!encrypted) return;
    const blob = new Blob([`${encrypted}\n`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "recomp-market-key.txt";
    link.click();
    URL.revokeObjectURL(url);
    setExportPassword("");
  };

  const error = identity.error ? (
    <p role="alert" className="flex relative px-[0.7em] py-[0.4em]" style={{ ...BODY, color: "#fff", backgroundColor: MARKET_COLORS.red }}>
      {copy.errors[identity.error]}
    </p>
  ) : null;

  return (
    <div className="flex relative flex-col gap-[1em] w-full max-w-[44em]">
      <MarketBack label={text.back} onBack={() => store.setView({ name: "browse" })} />
      <MarkText lead={copy.titleLead} mark={copy.titleMark} className="text-[2em] leading-none" />
      <p className="flex relative leading-[1.35]" style={BODY}>
        {copy.intro}
      </p>
      {next === "create" && !current && (
        <p
          className="flex relative self-start px-[0.7em] py-[0.4em]"
          style={{ ...BODY, color: MARKET_COLORS.purple, backgroundColor: MARKET_COLORS.yellow }}
        >
          {copy.needIdentity}
        </p>
      )}
      {error}

      {current ? (
        <>
          <Panel title={copy.signedAs}>
            <span className="flex relative font-industria uppercase" style={{ color: MARKET_COLORS.orange }}>
              {current.kind === "wallet" ? copy.kindWallet : copy.kindLocal}
            </span>
            <span className="flex relative break-all leading-[1.3]" style={{ ...BODY, color: MARKET_COLORS.text }}>
              {current.npub}
            </span>
            {current.address && (
              <span className="flex relative break-all" style={BODY}>
                {`${current.address.slice(0, 6)}…${current.address.slice(-4)}`}
              </span>
            )}
          </Panel>

          <Panel title={copy.backupTitle}>
            <p className="flex relative leading-[1.35]" style={BODY}>
              {copy.backupBody}
            </p>
            <div className="flex relative flex-row flex-wrap gap-[0.6em]">
              <input
                type="password"
                value={exportPassword}
                onChange={(event) => setExportPassword(event.target.value)}
                placeholder={copy.password}
                autoComplete="new-password"
                className="flex relative flex-1 min-w-[12em] px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
                style={FIELD}
              />
              <button
                type="button"
                onClick={download}
                className="flex relative px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer"
                style={PRIMARY}
              >
                {copy.backupButton}
              </button>
            </div>
          </Panel>

          <div className="flex relative flex-col gap-[0.5em]">
            {current.kind === "local" && (
              <p className="flex relative" style={{ ...BODY, color: MARKET_COLORS.red }}>
                {copy.signOutWarn}
              </p>
            )}
            <button
              type="button"
              onClick={() => (confirmOut ? identity.signOut() : setConfirmOut(true))}
              onBlur={() => setConfirmOut(false)}
              className="flex relative self-start px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer"
              style={{
                border: `0.14em solid ${MARKET_COLORS.red}`,
                backgroundColor: confirmOut ? MARKET_COLORS.red : "transparent",
                color: confirmOut ? "#fff" : MARKET_COLORS.red,
              }}
            >
              {confirmOut ? `${copy.signOut}?` : copy.signOut}
            </button>
          </div>
        </>
      ) : (
        <>
          <Panel title={copy.walletTitle}>
            <p className="flex relative leading-[1.35]" style={BODY}>
              {copy.walletBody}
            </p>
            <button
              type="button"
              onClick={() => identity.connectWallet()}
              disabled={identity.busy || !identity.hasWallet}
              className="flex relative self-start px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              style={PRIMARY}
            >
              {identity.busy ? copy.working : copy.walletButton}
            </button>
            {!identity.hasWallet && (
              <span className="flex relative" style={BODY}>
                {copy.errors.noWallet}
              </span>
            )}
          </Panel>

          <Panel title={copy.localTitle}>
            <p className="flex relative leading-[1.35]" style={BODY}>
              {copy.localBody}
            </p>
            <button
              type="button"
              onClick={() => identity.createLocal()}
              className="flex relative self-start px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer"
              style={PRIMARY}
            >
              {copy.localButton}
            </button>
          </Panel>

          <Panel title={copy.restoreTitle}>
            <p className="flex relative leading-[1.35]" style={BODY}>
              {copy.restoreBody}
            </p>
            <textarea
              value={backup}
              onChange={(event) => setBackup(event.target.value)}
              placeholder={copy.restorePlaceholder}
              rows={2}
              spellCheck={false}
              autoComplete="off"
              className="flex relative w-full px-[0.7em] py-[0.5em] outline-none resize-none break-all placeholder:opacity-60"
              style={FIELD}
            />
            <div className="flex relative flex-row flex-wrap gap-[0.6em]">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.password}
                autoComplete="current-password"
                className="flex relative flex-1 min-w-[12em] px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
                style={FIELD}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex relative px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer"
                style={{ border: `0.14em solid ${MARKET_COLORS.text}`, color: MARKET_COLORS.text }}
              >
                {copy.openFile}
              </button>
              <button
                type="button"
                onClick={() => identity.restore(backup, password)}
                disabled={!backup.trim()}
                className="flex relative px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                style={PRIMARY}
              >
                {copy.restoreButton}
              </button>
            </div>
            <input ref={fileRef} type="file" accept=".txt,text/plain" onChange={onFile} className="hidden" />
          </Panel>
        </>
      )}
    </div>
  );
}
