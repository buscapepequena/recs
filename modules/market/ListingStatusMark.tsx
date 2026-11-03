import Image from "next/image";
import { MARKET_COLORS, MARKET_IMAGES } from "@/hooks/marketTheme";
import { ListingStatusMarkProps } from "@/types/market.types";

export default function ListingStatusMark({ status, text }: ListingStatusMarkProps) {
  if (status === "sold") {
    return (
      <div
        className="flex absolute inset-0 items-center justify-center pointer-events-none"
        style={{ backgroundColor: "rgba(27, 16, 64, 0.38)" }}
      >
        <div className="flex relative w-[78%] aspect-[3/2] -rotate-[10deg]">
          <Image
            src={MARKET_IMAGES.sold}
            alt={text.status.sold}
            fill
            unoptimized
            sizes="320px"
            draggable={false}
            className="object-contain select-none"
          />
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div
        className="flex absolute left-0 right-0 bottom-[8%] justify-center py-[0.25em] font-industria uppercase pointer-events-none -rotate-[3deg] scale-x-110"
        style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff" }}
      >
        {text.status.pending}
      </div>
    );
  }

  return null;
}
