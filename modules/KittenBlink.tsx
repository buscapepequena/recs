import { KITTEN_FACES, KITTEN_LID } from "@/hooks/kittenEyes";
import { KittenBlinkProps } from "@/types/parallax.types";

export default function KittenBlink({ width, height }: KittenBlinkProps) {
  return (
    <div aria-hidden className="flex absolute inset-0 pointer-events-none">
      {KITTEN_FACES.map((face) =>
        face.eyes.map(([x, y], index) => (
          <span
            key={`${face.key}-${index}`}
            className="kitten-lid flex absolute"
            style={{
              left: `${((x - KITTEN_LID.width / 2) / width) * 100}%`,
              top: `${((y - KITTEN_LID.height / 2) / height) * 100}%`,
              width: `${(KITTEN_LID.width / width) * 100}%`,
              height: `${(KITTEN_LID.height / height) * 100}%`,
              backgroundColor: KITTEN_LID.color,
              borderRadius: "50%",
              animationDuration: `${face.duration}s`,
              animationDelay: `${face.delay}s`,
            }}
          >
            <span
              className="flex absolute left-[8%] right-[8%] top-[22%] h-[38%]"
              style={{
                borderBottom: `clamp(1px, 0.16vw, 2px) solid ${KITTEN_LID.line}`,
                borderRadius: "0 0 50% 50%",
              }}
            />
          </span>
        )),
      )}
    </div>
  );
}
