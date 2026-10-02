"use client";

import React from "react";
import {
  TICKER_LINES,
  IMAGES,
  PARTNERS,
  HeroTickerAndGalleryProps,
  HeroIntro,
  TickerColumn,
  DraggableGallery,
  PartnersGrid,
} from "./hero";

export function HeroTickerAndGallery({
  tickerLines = TICKER_LINES,
  images = IMAGES,
  partners = PARTNERS,
  className = "",
}: HeroTickerAndGalleryProps) {
  return (
    <section
      className={`relative w-full bg-white px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 py-12 sm:py-16 lg:py-20 overflow-hidden ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Upper Section (Font: Oakes Grotesk) */}
        <div className="font-oakes grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Description & Services Pill */}
          <HeroIntro />

          {/* Right Column: 3 Stacked Lines with Individual Slot Animations */}
          <TickerColumn lines={tickerLines} />
        </div>

        {/* Draggable Carousel with Inertia & Cursor Follower */}
        <DraggableGallery images={images} />

        {/* Partners Row */}
        <PartnersGrid partners={partners} />
      </div>
    </section>
  );
}

export * from "./hero";
