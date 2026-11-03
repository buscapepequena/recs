"use client";

import Image from "next/image";
import { useState } from "react";
import { DeskPartProps } from "@/types/parallax.types";

export default function DeskPart({ src }: DeskPartProps) {
  const [boop, setBoop] = useState(0);

  return (
    <div
      className="flex absolute inset-0 pointer-events-auto cursor-pointer transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[6%] hover:scale-[1.05] active:scale-[0.95]"
      onClick={() => setBoop((count) => count + 1)}
    >
      <div
        key={boop}
        className={`flex relative w-full h-full ${boop ? "animate-[desk-boop_520ms_cubic-bezier(0.34,1.56,0.64,1)]" : ""}`}
      >
        <Image
          src={src}
          alt=""
          fill
          unoptimized
          sizes="(min-width: 1100px) 560px, 50vw"
          draggable={false}
          className="object-contain select-none"
        />
      </div>
    </div>
  );
}
