import React from "react";
import { ArrowRight } from "lucide-react";
import { CardItem } from "./types";

interface InactiveCardContentProps {
  card: CardItem;
}

export function InactiveCardContent({ card }: InactiveCardContentProps) {
  return (
    <>
      {/* Mobile / Tablet Horizontal Collapsed View */}
      <div className="flex lg:hidden relative z-10 items-center justify-between w-full h-full px-2 sm:px-4">
        <div className="flex items-center gap-3 min-[450px]:gap-5 sm:gap-6">
          <div className="flex items-start font-nohemi select-none shrink-0">
            <span className="card-text-color font-bold text-3xl min-[450px]:text-4xl md:text-5xl leading-none text-[#BF2837]">
              {card.number}
            </span>
            <span className="card-text-color font-bold text-lg min-[450px]:text-2xl md:text-3xl leading-none text-[#BF2837] ml-0.5">
              +
            </span>
          </div>
          <div className="flex flex-col font-outfit text-left">
            <span className="card-text-color font-bold text-base min-[450px]:text-lg sm:text-xl md:text-2xl text-[#BF2837] leading-snug">
              {card.title}
            </span>
            <span className="card-text-color text-xs min-[450px]:text-sm md:text-base text-[#BF2837]/80 line-clamp-1">
              {card.subtitle}
            </span>
          </div>
        </div>
        <div className="text-[#BF2837] opacity-60 shrink-0 ml-2">
          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 -rotate-45" />
        </div>
      </div>

      {/* Desktop Vertical Spine + Bottom Number */}
      <div className="hidden lg:flex relative z-10 flex-1 flex-col items-center justify-end w-full mt-0">
        {/* Vertical Rotated Spine Text utilizing full height */}
        <div className="w-[120px] h-[240px] flex items-center justify-center relative mb-5 lg:mb-6">
          <div className="vertical-text-wrapper w-[240px] h-[110px] -rotate-90 select-none flex flex-col items-start justify-start text-left font-outfit">
            <div
              className="card-text-color font-bold text-2xl lg:text-[28px] xl:text-[32px] leading-none text-[#BF2837]"
              style={{
                width: card.title.length > 12 ? "150px" : "240px",
              }}
            >
              {card.title}
            </div>
            <div className="card-text-color font-normal text-sm lg:text-[15px] xl:text-[18px] leading-[1.25] mt-2.5 text-[#BF2837]/90 w-[240px]">
              {card.subtitle}
            </div>
          </div>
        </div>

        {/* Inactive Metric Number with Superscript + */}
        <div className="flex items-start justify-center select-none w-full font-nohemi">
          <span className="card-text-color font-bold text-[90px] lg:text-[110px] xl:text-[150px] leading-[0.82] text-center text-[#BF2837]">
            {card.number}
          </span>
          <span className="card-text-color font-bold text-3xl lg:text-4xl xl:text-[44px] leading-none ml-1 -mt-2 lg:-mt-3 text-[#BF2837]">
            +
          </span>
        </div>
      </div>
    </>
  );
}
