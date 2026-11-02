import CityParallax from "@/modules/CityParallax";
import { LAYERS } from "@/hooks/parallaxLayers";
import { withImageVersions } from "@/hooks/imageVersions";

export default function Home() {
  return (
    <div className="flex relative flex-col flex-1 w-full">
      <CityParallax layers={withImageVersions(LAYERS)} />
    </div>
  );
}
