import React, { forwardRef } from "react";
import Image from "next/image";
import { TechIconItem } from "./types";

interface TravellingIconsProps {
  icons: TechIconItem[];
  className?: string;
}

export const TravellingIcons = forwardRef<HTMLDivElement, TravellingIconsProps>(
  function TravellingIcons({ icons, className = "" }, ref) {
    return (
      <div
        ref={ref}
        className={`pointer-events-none absolute top-[160px] -translate-y-1/2 left-0 z-30 hidden lg:flex items-center gap-3 xl:gap-10 ${className}`}
      >
        {icons.map((icon, idx) => (
          <div
            key={idx}
            className="single-icon relative flex items-center justify-center transition-transform hover:scale-105 duration-200"
          >
            <Image
              src={icon.src}
              alt={icon.name}
              width={76}
              height={76}
              className="h-12 w-12 xl:h-[76px] xl:w-[76px] object-contain select-none pointer-events-none drop-shadow-md"
              priority
            />
          </div>
        ))}
      </div>
    );
  },
);
