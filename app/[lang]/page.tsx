import { notFound } from "next/navigation";
import CityParallax from "@/modules/CityParallax";
import CornerMark from "@/modules/CornerMark";
import MiddleSection from "@/modules/MiddleSection";
import GpuSection from "@/modules/GpuSection";
import PrivacyMark from "@/modules/PrivacyMark";
import { LAYERS, POSTER_TOP } from "@/hooks/parallaxLayers";
import { versionSrc, withImageVersions } from "@/hooks/imageVersions";
import { getDictionary } from "@/hooks/i18n";
import { hasLocale, localeInfo } from "@/hooks/locales";

const POSTER_ID = "rtx-poster";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const layers = withImageVersions(LAYERS).map((layer) => ({
    ...layer,
    alt: dict.layers[layer.key] ?? layer.alt,
  }));

  return (
    <div
      className="flex relative flex-col flex-1 w-full min-h-screen"
      style={{ backgroundColor: POSTER_TOP }}
    >
      <CityParallax layers={layers} />
      <MiddleSection
        text={dict.sitio}
        issue={dict.issue}
        market={dict.market}
        htmlLang={localeInfo(lang).htmlLang}
      />
      <GpuSection id={POSTER_ID} src={versionSrc("/images/rtx6000.png")} alt={dict.poster} />
      <PrivacyMark src={versionSrc("/images/privacy.png")} alt={dict.privacy} targetId={POSTER_ID} />
      <CornerMark
        src={versionSrc("/images/quena.png")}
        label={dict.cornerMark}
        current={lang}
        languageLabel={dict.languageLabel}
      />
    </div>
  );
}
