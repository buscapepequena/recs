import { NextRequest, NextResponse } from "next/server";
import { LOCALES, LOCALE_COOKIE, hasLocale, matchLocale } from "@/hooks/locales";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = LOCALES.some(
    (locale) => pathname === `/${locale.code}` || pathname.startsWith(`/${locale.code}/`),
  );
  if (hasPrefix) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    saved && hasLocale(saved) ? saved : matchLocale(request.headers.get("accept-language"));
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|images|fonts|favicon.ico|opengraph-image|.*\\..*).*)"],
};
