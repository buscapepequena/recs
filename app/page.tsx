import CityParallax from "@/modules/CityParallax";
import CornerMark from "@/modules/CornerMark";
import MiddleSection from "@/modules/MiddleSection";
import GpuSection from "@/modules/GpuSection";
import { LAYERS, POSTER_TOP } from "@/hooks/parallaxLayers";
import { versionSrc, withImageVersions } from "@/hooks/imageVersions";

export default function Home() {
  return (
    <div
      className="flex relative flex-col flex-1 w-full min-h-screen"
      style={{ backgroundColor: POSTER_TOP }}
    >
      <CityParallax layers={withImageVersions(LAYERS)} />
      <MiddleSection />
      <GpuSection src={versionSrc("/images/rtx6000.png")} />
      <CornerMark src={versionSrc("/images/quena.png")} />
    </div>
  );
}
