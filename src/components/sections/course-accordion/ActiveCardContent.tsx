import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CardItem, TechIconItem } from "./types";

interface ActiveCardContentProps {
  card: CardItem;
  icons: TechIconItem[];
  onViewAllClick?: () => void;
}

export function ActiveCardContent({
  card,
  icons,
  onViewAllClick,
}: ActiveCardContentProps) {
  return (
    <>
      {/* Top Utility Bar */}
      <div className="relative z-10 top-bar flex items-center justify-end w-full min-h-[28px]">
        <button
          type="button"
          onClick={onViewAllClick}
          className="view-all-btn flex items-center gap-1.5 min-[450px]:gap-2 sm:gap-2.5 text-xs min-[450px]:text-sm sm:text-base font-semibold text-white/95 hover:text-white transition-opacity font-outfit cursor-pointer"
        >
          <span>View all Courses</span>
          <ArrowRight className="h-3.5 w-3.5 min-[450px]:h-4 min-[450px]:w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Mobile & Tablet Floating Icons Slot */}
      <div className="relative z-10 flex lg:hidden items-center justify-center gap-5 min-[450px]:gap-7 min-[520px]:gap-10 sm:gap-10 md:gap-12 my-auto py-3 sm:py-6">
        {icons.map((icon, idx) => (
          <div
            key={idx}
            className="relative flex items-center justify-center"
          >
            <Image
              src={icon.src}
              alt={icon.name}
              width={80}
              height={80}
              className="h-12 w-12 min-[450px]:h-14 min-[450px]:w-14 min-[520px]:h-16 min-[520px]:w-16 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain select-none pointer-events-none drop-shadow-md"
            />
          </div>
        ))}
      </div>

      {/* Desktop Spacer for Travelling Icons */}
      <div className="hidden lg:block my-auto min-h-[76px]" />

      {/* Bottom Metric & Text Layout */}
      <div className="relative z-10 mt-auto w-full">
        <div className="flex items-start text-white w-full">
          {/* Big Metric Number & Superscript Plus */}
          <div className="flex items-start select-none font-nohemi shrink-0">
            <span className="card-text-color font-bold text-[64px] min-[380px]:text-[74px] min-[440px]:text-[88px] min-[520px]:text-[100px] md:text-[120px] lg:text-[110px] xl:text-[150px] leading-[0.82] tracking-normal text-white">
              {card.number}
            </span>
            <span className="card-text-color font-bold text-xl min-[380px]:text-2xl min-[440px]:text-3xl min-[520px]:text-4xl md:text-5xl lg:text-4xl xl:text-[44px] leading-none -mt-1 sm:-mt-2 lg:-mt-3 ml-0.5 sm:ml-1 text-white">
              +
            </span>
          </div>

          {/* Active Bouncy Text Wrapper */}
          <div
            className="active-text-wrapper flex flex-col ml-2.5 min-[380px]:ml-3.5 min-[440px]:ml-5 md:ml-6 pt-1 md:pt-2 font-outfit"
            style={{
              transformOrigin: "0% 100%",
              willChange: "transform, opacity",
            }}
          >
            <h3 className="card-text-color font-bold text-lg min-[380px]:text-[21px] min-[440px]:text-[26px] min-[520px]:text-3xl md:text-4xl lg:text-[26px] xl:text-[32px] leading-tight sm:leading-none text-white whitespace-nowrap">
              {card.title}
            </h3>
            <p className="card-text-color font-normal text-[11px] min-[380px]:text-xs min-[440px]:text-sm min-[520px]:text-base md:text-lg lg:text-[15px] xl:text-[18px] leading-[1.25] mt-1 min-[380px]:mt-1.5 sm:mt-2.5 lg:mt-2.5 text-white/90 max-w-[190px] min-[380px]:max-w-[230px] min-[440px]:max-w-sm min-[520px]:max-w-md md:max-w-xl lg:max-w-[280px] xl:max-w-[320px]">
              {card.subtitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
