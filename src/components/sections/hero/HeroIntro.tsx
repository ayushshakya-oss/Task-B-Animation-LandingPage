import React from "react";

interface HeroIntroProps {
  description?: string;
  badgeText?: string;
  onBadgeClick?: () => void;
  className?: string;
}

export function HeroIntro({
  description = "Experience our expert solutions tailored to enhance your business with top-tier design, development, and animation.",
  badgeText = "Services",
  onBadgeClick,
  className = "",
}: HeroIntroProps) {
  return (
    <div className={className}>
      <p className="max-w-md font-oakes text-lg sm:text-2xl lg:text-[28px] font-normal leading-[1.35] tracking-tight text-slate-900 md:max-w-lg">
        {description}
      </p>
      <div className="mt-6 sm:mt-8">
        <span
          onClick={onBadgeClick}
          className="inline-flex items-center rounded-full bg-[#1A56DB] px-5 py-2 sm:px-6 font-oakes text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 cursor-pointer"
        >
          {badgeText}
        </span>
      </div>
    </div>
  );
}
