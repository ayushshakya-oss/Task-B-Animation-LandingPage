import React from "react";
import Image from "next/image";
import { PartnerItem } from "./types";
import { PARTNERS } from "./constants";

interface PartnersGridProps {
  title?: string;
  partners?: PartnerItem[];
  className?: string;
}

export function PartnersGrid({
  title = "Our Partners",
  partners = PARTNERS,
  className = "",
}: PartnersGridProps) {
  return (
    <div className={`mt-16 sm:mt-24 lg:mt-28 text-center ${className}`}>
      <h3 className="font-oakes text-sm sm:text-base md:text-lg font-medium text-slate-800 tracking-tight">
        {title}
      </h3>
      <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-items-center sm:justify-between gap-6 sm:gap-8 md:gap-12 px-4 sm:px-8 md:px-12 max-w-5xl">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex h-12 sm:h-16 items-center justify-center"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={150}
              height={90}
              className="max-h-8 sm:max-h-11 md:max-h-13 w-auto object-contain select-none pointer-events-none"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
