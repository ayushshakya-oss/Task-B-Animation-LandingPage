"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TickerLineItem } from "./types";
import { TICKER_LINES } from "./constants";

interface TickerColumnProps {
  lines?: TickerLineItem[];
  className?: string;
}

export function TickerColumn({
  lines = TICKER_LINES,
  className = "",
}: TickerColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Individual Line Slot-Machine Ticker Animation
  useGSAP(
    () => {
      const activeLines = lineRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (activeLines.length === 0) return;

      const totalSteps = 3;
      const tl = gsap.timeline({ repeat: -1 });

      for (let step = 1; step <= totalSteps; step++) {
        activeLines.forEach((lineEl, lineIndex) => {
          tl.to(
            lineEl,
            {
              yPercent: -(100 / 4) * step,
              duration: 0.75,
              ease: "power3.inOut",
            },
            lineIndex === 0 ? "+=1.6" : "<0.12",
          );
        });
      }

      tl.set(activeLines, { yPercent: 0 });
    },
    { dependencies: [lines], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-1 sm:gap-2 lg:gap-3 ${className}`}
    >
      {lines.map((line, lineIndex) => {
        const fullItems = [...line.items, line.items[0]];

        return (
          <div
            key={line.id}
            className="h-10 sm:h-14 md:h-16 lg:h-[76px] overflow-hidden relative"
          >
            <div
              ref={(el) => {
                lineRefs.current[lineIndex] = el;
              }}
              className="flex flex-col"
            >
              {fullItems.map((service, itemIdx) => (
                <div
                  key={itemIdx}
                  className="h-10 sm:h-14 md:h-16 lg:h-[76px] flex items-center font-oakes font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[68px] leading-none tracking-tight text-slate-900 select-none whitespace-nowrap"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
