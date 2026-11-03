"use client";

import { Fragment } from "react";
import { LOCALES, LOCALE_COOKIE } from "@/hooks/locales";
import { LanguageSwitcherProps } from "@/types/i18n.types";

const IDLE = "#d8caff";
const ACTIVE = "#E9672B";

export default function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  return (
    <nav
      aria-label={label}
      className="flex relative flex-row flex-wrap items-baseline w-full font-industria select-none"
      style={{ fontSize: "clamp(12px, 1.1vw, 16px)", lineHeight: 1, color: IDLE }}
    >
      {LOCALES.map((locale, i) => {
        const selected = locale.code === current;
        return (
          <Fragment key={locale.code}>
            {i > 0 && (
              <span aria-hidden className="flex relative px-[0.35em] opacity-60">
                /
              </span>
            )}
            <a
              href={`/${locale.code}`}
              hrefLang={locale.htmlLang}
              lang={locale.htmlLang}
              title={locale.name}
              aria-current={selected ? "page" : undefined}
              onClick={() => {
                document.cookie = `${LOCALE_COOKIE}=${locale.code}; path=/; max-age=31536000; samesite=lax`;
              }}
              className="flex relative transition-colors duration-200 hover:text-white"
              style={selected ? { color: ACTIVE } : undefined}
            >
              {locale.short}
            </a>
          </Fragment>
        );
      })}
    </nav>
  );
}
