"use client";

import Image from "next/image";
import { KeyboardEvent, useEffect, useState } from "react";
import SitioHeadline from "@/modules/SitioHeadline";
import { SITIO_COPY, SITIO_COPY_BOX, SITIO_RATIO, SITIO_SHIFT } from "@/hooks/sitioImages";
import { BASE_SIZE, SITIO_HEADLINES } from "@/hooks/sitioHeadlines";
import { useFitText } from "@/hooks/useFitText";
import { SitioBlockProps } from "@/types/parallax.types";

const AUTO_MS = 10000;
const ACCENT = "#E9672B";
const COPY_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const GPU_COLOR = "#d8caff";

export default function SitioBlock({ images }: SitioBlockProps) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const copyRefs = useFitText(SITIO_COPY.length);

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % SITIO_HEADLINES.length);
    }, AUTO_MS);
    return () => clearInterval(timer);
  }, [auto]);

  const select = (option: number) => {
    setAuto(false);
    setActive(option);
  };

  const onKey = (option: number) => (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(option);
    }
  };

  const backdrop = images.find((image) => image.stretch);
  const equipment = images.find((image) => !image.stretch && image.option === undefined);
  const options = images.filter((image) => image.option !== undefined);

  return (
    <>
      <div
        className="hidden md:flex relative flex-col w-full max-w-[1100px]"
        style={{ aspectRatio: SITIO_RATIO, containerType: "inline-size" }}
      >
        <SitioHeadline active={active} size={BASE_SIZE} className="absolute left-0 top-[1.19%] w-full" />
        <div
          className="flex absolute top-0 w-full h-full"
          style={{ left: `${-SITIO_SHIFT}%` }}
        >
          {images.map((image, i) => {
            const clickable = image.option !== undefined;
            const selected = image.option === active;
            return (
              <div
                key={`${image.src}-${i}`}
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                aria-pressed={clickable ? selected : undefined}
                onClick={clickable ? () => select(image.option as number) : undefined}
                onKeyDown={clickable ? onKey(image.option as number) : undefined}
                className={`flex absolute ${clickable ? "cursor-pointer" : ""}`}
                style={{
                  left: `${image.left}%`,
                  top: `${image.top}%`,
                  width: `${image.width}%`,
                  aspectRatio: image.ratio,
                  outline: clickable ? `1px solid ${selected ? ACCENT : "transparent"}` : undefined,
                  transition: clickable ? "outline-color 300ms ease" : undefined,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  sizes="(min-width: 1100px) 1100px, 100vw"
                  draggable={false}
                  className={`${image.stretch ? "object-fill" : "object-contain"} select-none`}
                />
              </div>
            );
          })}
          {SITIO_COPY.map((copy, i) => (
            <div
              key={copy.option}
              role="button"
              tabIndex={0}
              aria-pressed={copy.option === active}
              onClick={() => select(copy.option)}
              onKeyDown={onKey(copy.option)}
              className="flex absolute items-center cursor-pointer"
              style={{
                left: `${SITIO_COPY_BOX.left}%`,
                top: `${copy.top}%`,
                width: `${SITIO_COPY_BOX.width}%`,
                height: `${SITIO_COPY_BOX.height}%`,
              }}
            >
              <p
                ref={(el) => {
                  copyRefs.current[i] = el;
                }}
                className="relative w-full"
                style={{
                  fontFamily: COPY_FONT,
                  fontWeight: 700,
                  fontSize: "1.05cqw",
                  lineHeight: 1.18,
                  color: ACCENT,
                  textAlign: "justify",
                  textAlignLast: "left",
                  hyphens: "auto",
                }}
              >
                {copy.text}
              </p>
            </div>
          ))}
          <div
            className="flex absolute left-[93.49%] top-[92.81%] -translate-x-1/2 flex-col items-center text-center whitespace-nowrap font-industria"
            style={{ fontSize: "2.55cqw", lineHeight: "2.55cqw", color: GPU_COLOR }}
          >
            <span>Keep your gpus</span>
            <span>in tip top</span>
            <span>computing condition.</span>
          </div>
        </div>
      </div>

      <div
        className="flex md:hidden relative flex-col items-center w-full"
        style={{ containerType: "inline-size" }}
      >
        <SitioHeadline active={active} size={8.6} className="relative w-full" />
        {backdrop && (
          <div
            className="flex relative w-full mt-[7cqw]"
            style={{ aspectRatio: 1155 / 502 }}
          >
            <Image
              src={backdrop.src}
              alt={backdrop.alt}
              fill
              unoptimized
              sizes="100vw"
              draggable={false}
              className="object-cover select-none"
            />
          </div>
        )}
        <div className="flex relative flex-col w-full gap-3 mt-4">
          {options.map((image) => {
            const option = image.option as number;
            const copy = SITIO_COPY.find((item) => item.option === option);
            const selected = option === active;
            return (
              <div
                key={image.src}
                role="button"
                tabIndex={0}
                aria-pressed={selected}
                onClick={() => select(option)}
                onKeyDown={onKey(option)}
                className="flex relative flex-row items-center gap-3 w-full cursor-pointer"
              >
                <div
                  className="flex relative shrink-0 w-[38%]"
                  style={{
                    aspectRatio: image.ratio,
                    outline: `1px solid ${selected ? ACCENT : "transparent"}`,
                    transition: "outline-color 300ms ease",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    unoptimized
                    sizes="40vw"
                    draggable={false}
                    className="object-cover select-none"
                  />
                </div>
                <p
                  className="relative flex-1"
                  style={{
                    fontFamily: COPY_FONT,
                    fontWeight: 700,
                    fontSize: "clamp(10px, 3.3cqw, 14px)",
                    lineHeight: 1.18,
                    color: ACCENT,
                    textAlign: "justify",
                    textAlignLast: "left",
                    hyphens: "auto",
                  }}
                >
                  {copy?.text}
                </p>
              </div>
            );
          })}
        </div>
        {equipment && (
          <div
            className="flex relative w-[88%] mt-6"
            style={{ aspectRatio: equipment.ratio }}
          >
            <Image
              src={equipment.src}
              alt={equipment.alt}
              fill
              unoptimized
              sizes="90vw"
              draggable={false}
              className="object-contain select-none"
            />
          </div>
        )}
        <div
          className="flex relative flex-col items-center self-end mt-3 text-center whitespace-nowrap font-industria"
          style={{ fontSize: "4.6cqw", lineHeight: "4.6cqw", color: GPU_COLOR }}
        >
          <span>Keep your gpus</span>
          <span>in tip top</span>
          <span>computing condition.</span>
        </div>
      </div>
    </>
  );
}
