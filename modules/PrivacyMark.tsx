"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PrivacyMarkProps } from "@/types/parallax.types";

export default function PrivacyMark({ src, alt, targetId }: PrivacyMarkProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { threshold: 0.12 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      aria-hidden={!visible}
      className={`flex fixed right-3 bottom-3 z-50 w-[clamp(120px,14vw,220px)] aspect-square pointer-events-none transition-[opacity,transform] duration-500 ease-out ${
        visible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-6"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="220px"
        draggable={false}
        className="object-contain select-none"
      />
    </div>
  );
}
