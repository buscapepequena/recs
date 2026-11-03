import ListingCard from "@/modules/market/ListingCard";
import MarkText from "@/modules/market/MarkText";
import PriceBurst from "@/modules/market/PriceBurst";
import MarketSelect from "@/modules/market/MarketSelect";
import { MARKET_CATEGORIES } from "@/hooks/marketListings";
import { fill } from "@/hooks/marketFormat";
import { HARD_SHADOW, HELVETICA, MARKET_COLORS } from "@/hooks/marketTheme";
import { MarketCategory, MarketSort, MarketViewProps } from "@/types/market.types";

const SORTS: MarketSort[] = ["newest", "priceLow", "priceHigh"];

export default function MarketBrowse({ store, identity, text, htmlLang }: MarketViewProps) {
  const chips: (MarketCategory | "all")[] = ["all", ...MARKET_CATEGORIES];
  const count = store.visible.length;

  return (
    <div className="flex relative flex-col gap-[1em] w-full">
      <div className="flex relative flex-row flex-wrap items-center justify-between gap-[0.8em]">
        <div className="flex relative flex-row items-center gap-[0.8em]">
          <MarkText
            lead={text.titleLead}
            mark={text.titleMark}
            className="text-[2.2em] leading-none"
          />
          <PriceBurst label={text.burst} className="relative w-[7em] text-[0.85em]" />
        </div>
        <button
          type="button"
          onClick={() =>
            store.setView(identity.identity ? { name: "create" } : { name: "identity", next: "create" })
          }
          className="flex relative items-center px-[0.9em] py-[0.5em] font-industria uppercase cursor-pointer transition-transform duration-150 hover:-translate-y-[0.1em]"
          style={{
            backgroundColor: MARKET_COLORS.orange,
            color: "#fff",
            boxShadow: HARD_SHADOW(MARKET_COLORS.yellow),
            fontSize: "1.05em",
          }}
        >
          {text.newListing}
        </button>
      </div>

      <p
        className="flex relative"
        style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted }}
      >
        {text.tagline}
      </p>

      <div className="flex relative flex-row flex-wrap gap-[0.6em]">
        <label className="flex relative flex-1 min-w-[12em]">
          <span className="sr-only">{text.searchLabel}</span>
          <input
            type="search"
            value={store.query}
            onChange={(event) => store.setQuery(event.target.value)}
            placeholder={text.searchPlaceholder}
            className="flex relative w-full pl-[0.7em] pr-[2em] py-[0.5em] outline-none placeholder:opacity-60"
            style={{
              fontFamily: HELVETICA,
              fontWeight: 700,
              backgroundColor: MARKET_COLORS.cream,
              color: MARKET_COLORS.purple,
              border: `0.14em solid ${MARKET_COLORS.muted}`,
            }}
          />
          {store.query && (
            <button
              type="button"
              aria-label={text.close}
              onClick={() => store.setQuery("")}
              className="flex absolute right-[0.45em] top-1/2 -translate-y-1/2 items-center justify-center w-[1.3em] h-[1.3em] font-industria cursor-pointer"
              style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff" }}
            >
              ✕
            </button>
          )}
        </label>
        <div className="flex relative flex-row items-center gap-[0.5em]">
          <span className="font-industria uppercase" style={{ color: MARKET_COLORS.muted }}>
            {text.sortLabel}
          </span>
          <MarketSelect<MarketSort>
            value={store.sort}
            onChange={store.setSort}
            label={text.sortLabel}
            options={SORTS.map((sort) => ({ value: sort, label: text.sort[sort] }))}
            className="min-w-[12em]"
          />
        </div>
      </div>

      <div className="flex relative flex-row flex-wrap gap-[0.45em]">
        {chips.map((chip) => {
          const selected = store.category === chip;
          return (
            <button
              key={chip}
              type="button"
              aria-pressed={selected}
              onClick={() => store.setCategory(chip)}
              className="flex relative px-[0.6em] py-[0.25em] font-industria uppercase cursor-pointer transition-colors duration-150"
              style={{
                fontSize: "0.9em",
                border: `0.1em solid ${selected ? MARKET_COLORS.orange : MARKET_COLORS.muted}`,
                backgroundColor: selected ? MARKET_COLORS.orange : "transparent",
                color: selected ? "#fff" : MARKET_COLORS.muted,
              }}
            >
              {chip === "all" ? text.allCategories : text.categories[chip]}
            </button>
          );
        })}
      </div>

      {store.seller && (
        <div
          className="flex relative flex-row flex-wrap items-center justify-between gap-[0.6em] px-[0.8em] py-[0.5em]"
          style={{ backgroundColor: MARKET_COLORS.text, color: MARKET_COLORS.cream }}
        >
          <span className="font-industria uppercase">{fill(text.adsBy, store.seller)}</span>
          <button
            type="button"
            onClick={() => store.setSeller(null)}
            className="flex relative px-[0.6em] py-[0.15em] font-industria uppercase cursor-pointer"
            style={{ backgroundColor: MARKET_COLORS.orange, color: "#fff" }}
          >
            {text.showAll}
          </button>
        </div>
      )}

      <span className="flex relative font-industria uppercase" style={{ color: MARKET_COLORS.orange }}>
        {count === 1 ? text.resultsOne : fill(text.results, count)}
      </span>

      {count === 0 ? (
        <p
          className="flex relative py-[2em] justify-center text-center"
          style={{ fontFamily: HELVETICA, fontWeight: 700, color: MARKET_COLORS.muted }}
        >
          {text.noResults}
        </p>
      ) : (
        <div className="flex relative flex-row flex-wrap gap-[1em] pr-[0.6em] pt-[0.6em] pb-[0.8em]">
          {store.visible.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              text={text}
              htmlLang={htmlLang}
              age={store.ageOf(listing)}
              expired={store.isExpired(listing)}
              onOpen={() => store.setView({ name: "detail", id: listing.id })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
