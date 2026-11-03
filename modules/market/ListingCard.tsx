import Image from "next/image";
import PriceBurst from "@/modules/market/PriceBurst";
import ListingStatusMark from "@/modules/market/ListingStatusMark";
import { LISTING_DAYS, NEW_DAYS } from "@/hooks/marketListings";
import { fill, formatPrice } from "@/hooks/marketFormat";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { ListingCardProps } from "@/types/market.types";

const CARD_BOX = "/images/borderbox.png";

export default function ListingCard({
  listing,
  text,
  htmlLang,
  age,
  expired,
  onOpen,
}: ListingCardProps) {
  const left = LISTING_DAYS - age;
  const status = listing.status ?? "available";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex relative flex-col w-[calc((100%-2em)/3)] @max-xl:w-[calc((100%-1em)/2)] @max-xs:w-full text-left cursor-pointer transition-transform duration-150 hover:-translate-x-[0.12em] hover:-translate-y-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        backgroundImage: `url("${CARD_BOX}")`,
        backgroundSize: "100% 100%",
        backgroundColor: "#4a74d6",
        color: MARKET_COLORS.cream,
        padding: "0.55em",
        boxShadow: HARD_SHADOW(MARKET_COLORS.orange),
        outlineColor: MARKET_COLORS.yellow,
        opacity: expired ? 0.6 : 1,
        filter: expired ? "grayscale(0.6)" : undefined,
      }}
    >
      <div
        className="flex relative w-full aspect-[4/3] overflow-hidden"
        style={{
          backgroundColor: MARKET_COLORS.ink,
          border: `0.1em solid ${MARKET_COLORS.cream}`,
        }}
      >
        {listing.photos[0] && (
          <Image
            src={listing.photos[0]}
            alt={listing.title}
            fill
            unoptimized
            sizes="300px"
            draggable={false}
            className="object-cover select-none"
          />
        )}
        <ListingStatusMark status={listing.status} text={text} />
        {age <= NEW_DAYS && status === "available" && !expired && (
          <span
            className="flex absolute left-[0.5em] top-[0.5em] px-[0.4em] py-[0.1em] font-industria uppercase"
            style={{ backgroundColor: MARKET_COLORS.red, color: "#fff", fontSize: "0.85em" }}
          >
            {text.isNew}
          </span>
        )}
      </div>
      <PriceBurst
        label={
          listing.sale
            ? formatPrice(listing.sale.price, listing.sale.currency, htmlLang)
            : formatPrice(listing.price, listing.currency, htmlLang)
        }
        className="absolute -right-[1.1em] -top-[1em] w-[7.6em] text-[0.9em]"
      />
      <div className="flex relative flex-col gap-[0.4em] px-[0.6em] pt-[0.7em] pb-[0.6em]">
        <span
          className="relative leading-[1.15] line-clamp-2"
          style={{ fontFamily: HELVETICA, fontWeight: 700 }}
        >
          {listing.title}
        </span>
        <span
          className="flex relative flex-row flex-wrap justify-between gap-x-[0.6em] font-industria uppercase"
          style={{ fontSize: "0.85em", color: MARKET_COLORS.yellow }}
        >
          <span>{listing.location}</span>
          <span style={{ color: MARKET_COLORS.cream }}>
            {status === "sold"
              ? text.status.sold
              : expired
                ? text.expired
                : status === "pending"
                ? text.status.pending
                : left <= 1
                  ? text.lastDay
                  : fill(text.daysLeft, left)}
          </span>
        </span>
      </div>
    </button>
  );
}
