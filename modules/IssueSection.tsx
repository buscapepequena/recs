import ComputerParallax from "@/modules/ComputerParallax";
import MarketScreen from "@/modules/market/MarketScreen";
import { IssueSectionProps } from "@/types/i18n.types";

const ISSUE_YELLOW = "#f3d13e";
const RULE = "#f1ead2";

export default function IssueSection({
  date,
  computerLayers,
  computerAlt,
  market,
  htmlLang,
}: IssueSectionProps) {
  return (
    <div className="flex relative flex-col items-center w-full max-w-[1100px] mt-20 md:mt-[8vw] pb-16 md:pb-[10vw]">
      <div className="flex relative flex-row justify-end w-full">
        <span
          className="flex relative whitespace-nowrap"
          style={{
            fontFamily: "var(--font-helvetica-face)",
            fontWeight: 700,
            fontSize: "clamp(12px, 1.9vw, 22px)",
            letterSpacing: "0.28em",
            marginRight: "-0.28em",
            color: ISSUE_YELLOW,
          }}
        >
          {date}
        </span>
      </div>
      <div
        className="flex relative w-full mt-2"
        style={{ height: "clamp(2px, 0.25vw, 3px)", backgroundColor: RULE }}
      />
      <div className="flex relative w-full mt-12 md:mt-[6vw]">
        <ComputerParallax
          layers={computerLayers}
          alt={computerAlt}
          screen={<MarketScreen text={market} htmlLang={htmlLang} />}
        />
      </div>
    </div>
  );
}
