"use client";

import { CSSProperties, FormEvent, useEffect, useMemo, useState } from "react";
import WorkshopRequestCard from "@/modules/market/WorkshopRequestCard";
import { REQUESTS_OPEN, WORKSHOP_PUBKEY, WRAP_KIND } from "@/hooks/marketConfig";
import { getPool, relays } from "@/hooks/nostrMarket";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { newWorkshopKey, openWrap, readWorkshopKey } from "@/hooks/workshopInbox";
import { InboxRequest, WorkshopInboxProps, WorkshopKey } from "@/types/workshop.types";

const TEXT: CSSProperties = { fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.text };

const FIELD: CSSProperties = {
  fontFamily: HELVETICA,
  fontWeight: 700,
  backgroundColor: MARKET_COLORS.cream,
  color: MARKET_COLORS.purple,
  border: `0.14em solid ${MARKET_COLORS.muted}`,
};

const BUTTON = "flex relative px-[0.9em] py-[0.45em] font-industria uppercase cursor-pointer disabled:opacity-60";

export default function WorkshopInbox({ text, htmlLang }: WorkshopInboxProps) {
  const [input, setInput] = useState("");
  const [key, setKey] = useState<WorkshopKey | null>(null);
  const [badKey, setBadKey] = useState(false);
  const [generated, setGenerated] = useState<{ nsec: string; pubkey: string } | null>(null);
  const [requests, setRequests] = useState<Record<string, InboxRequest>>({});
  const [unreadable, setUnreadable] = useState(0);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!key) return;
    setRequests({});
    setUnreadable(0);
    setSynced(false);
    const subscription = getPool().subscribeMany(
      relays(),
      { kinds: [WRAP_KIND], "#p": [key.pubkey] },
      {
        onevent: (event) => {
          const opened = openWrap(event, key.secret);
          if (!opened) {
            setUnreadable((count) => count + 1);
            return;
          }
          setRequests((current) => (current[opened.id] ? current : { ...current, [opened.id]: opened }));
        },
        oneose: () => setSynced(true),
      },
    );
    return () => subscription.close();
  }, [key]);

  const sorted = useMemo(
    () => Object.values(requests).sort((a, b) => b.sentAt - a.sentAt),
    [requests],
  );

  const unlock = (event: FormEvent) => {
    event.preventDefault();
    const next = readWorkshopKey(input);
    setBadKey(!next);
    if (!next) return;
    setKey(next);
    setInput("");
  };

  return (
    <main className="flex relative flex-col items-center w-full min-h-screen p-[2em]" style={{ backgroundColor: MARKET_COLORS.cream }}>
      <div className="flex relative flex-col gap-[1.2em] w-full max-w-[52em]">
        <h1 className="flex relative font-souvenir font-medium text-[2.2em] leading-none" style={{ color: MARKET_COLORS.text }}>
          Workshop inbox
        </h1>

        {!REQUESTS_OPEN && (
          <p className="flex relative px-[0.8em] py-[0.6em]" style={{ ...TEXT, backgroundColor: MARKET_COLORS.yellow }}>
            Requests are closed: NEXT_PUBLIC_RELAY_URL, NEXT_PUBLIC_BLOSSOM_URL or NEXT_PUBLIC_WORKSHOP_PUBKEY is missing.
          </p>
        )}

        {!key ? (
          <>
            <form
              onSubmit={unlock}
              className="flex relative flex-col gap-[0.6em] p-[0.9em]"
              style={{ backgroundColor: MARKET_COLORS.yellow, boxShadow: HARD_SHADOW(MARKET_COLORS.orange) }}
            >
              <span className="font-industria uppercase" style={{ color: MARKET_COLORS.text }}>
                Workshop key
              </span>
              <div className="flex relative flex-row @max-sm:flex-col gap-[0.6em]">
                <input
                  type="password"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="nsec1…"
                  autoComplete="off"
                  spellCheck={false}
                  className="flex relative flex-1 px-[0.7em] py-[0.5em] outline-none placeholder:opacity-60"
                  style={FIELD}
                />
                <button type="submit" className={BUTTON} style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff" }}>
                  Unlock
                </button>
              </div>
              {badKey && <span style={{ ...TEXT, color: MARKET_COLORS.red }}>Not a valid nsec.</span>}
              <span style={{ ...TEXT, color: MARKET_COLORS.muted, fontSize: "0.9em" }}>
                Held in memory only. Never stored, never sent. Closing the tab forgets it.
              </span>
            </form>

            <div className="flex relative flex-col gap-[0.6em] p-[0.9em]" style={{ border: `0.14em dashed ${MARKET_COLORS.text}` }}>
              <span className="font-industria uppercase" style={{ color: MARKET_COLORS.text }}>
                New workshop key
              </span>
              {generated ? (
                <div className="flex relative flex-col gap-[0.5em]">
                  <span style={{ ...TEXT, color: MARKET_COLORS.red }}>Private key. Save it offline. Shown once.</span>
                  <code className="flex relative break-all px-[0.6em] py-[0.4em]" style={{ ...FIELD, fontFamily: "monospace" }}>
                    {generated.nsec}
                  </code>
                  <span style={TEXT}>Public key (hex), for NEXT_PUBLIC_WORKSHOP_PUBKEY and the server WORKSHOP_PUBKEY:</span>
                  <code className="flex relative break-all px-[0.6em] py-[0.4em]" style={{ ...FIELD, fontFamily: "monospace" }}>
                    {generated.pubkey}
                  </code>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setGenerated(newWorkshopKey())}
                  className={`${BUTTON} self-start`}
                  style={{ backgroundColor: MARKET_COLORS.purple, color: MARKET_COLORS.cream }}
                >
                  Generate
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex relative flex-row flex-wrap items-center justify-between gap-[0.6em]">
              <span style={TEXT}>
                {synced ? `${sorted.length} request${sorted.length === 1 ? "" : "s"}` : "Loading…"}
                {unreadable > 0 ? ` · ${unreadable} unreadable` : ""}
              </span>
              <button
                type="button"
                onClick={() => setKey(null)}
                className={BUTTON}
                style={{ border: `0.14em solid ${MARKET_COLORS.text}`, color: MARKET_COLORS.text }}
              >
                Lock
              </button>
            </div>
            {WORKSHOP_PUBKEY && key.pubkey !== WORKSHOP_PUBKEY && (
              <p className="flex relative px-[0.8em] py-[0.6em]" style={{ ...TEXT, color: "#fff", backgroundColor: MARKET_COLORS.red }}>
                This key does not match NEXT_PUBLIC_WORKSHOP_PUBKEY. Requests are sealed for a different key.
              </p>
            )}
            {sorted.map((request) => (
              <WorkshopRequestCard key={request.id} request={request} text={text} htmlLang={htmlLang} />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
