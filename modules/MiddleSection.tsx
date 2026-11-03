import SitioBlock from "@/modules/SitioBlock";
import IssueSection from "@/modules/IssueSection";
import { SITIO_IMAGES } from "@/hooks/sitioImages";
import { COMPUTER_LAYERS } from "@/hooks/computerLayers";
import { versionSrc } from "@/hooks/imageVersions";
import { MiddleSectionProps } from "@/types/parallax.types";

const STARS_FADE =
  "linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.06) 5vw, rgba(0,0,0,0.2) 10vw, rgba(0,0,0,0.42) 15vw, rgba(0,0,0,0.68) 20vw, rgba(0,0,0,0.88) 25vw, black 30vw, black calc(100% - 42vw), rgba(0,0,0,0.5) calc(100% - 23vw), transparent calc(100% - 4vw))";

export default function MiddleSection({ text, issue }: MiddleSectionProps) {
  return (
    <div className="flex relative flex-col flex-1 items-center w-full -mt-[12vw] px-4 pb-[47vw]">
      <div
        className="flex absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${versionSrc("/images/estrellas.png")}")`,
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center top",
          maskImage: STARS_FADE,
          WebkitMaskImage: STARS_FADE,
        }}
      />
      <SitioBlock
        images={SITIO_IMAGES.map((image) => ({ ...image, src: versionSrc(image.src) }))}
        text={text}
      />
      <IssueSection
        date={issue.date}
        computerLayers={COMPUTER_LAYERS.map((layer) => ({ ...layer, src: versionSrc(layer.src) }))}
        computerAlt={issue.computer}
      />
    </div>
  );
}
