"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Flame } from "lucide-react";

const TECH_ICONS = [
  { name: "React", src: "/Icons/icon1.svg" },
  { name: "Chat", src: "/Icons/icon2.svg" },
  { name: "Vue", src: "/Icons/icon3.svg" },
  { name: "Design", src: "/Icons/icon4.svg" },
];

interface CardItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}

const ACCORDION_DATA: CardItem[] = [
  {
    id: "all",
    number: "23",
    title: "All Courses",
    subtitle: "courses you're powering through right now.",
  },
  {
    id: "upcoming",
    number: "05",
    title: "Upcoming Courses",
    subtitle: "exciting new courses waiting to boost your skills.",
  },
  {
    id: "ongoing",
    number: "10",
    title: "Ongoing Courses",
    subtitle: "currently happening—don't miss out on the action!",
  },
];

export function CourseAccordion() {
  // Default to 'upcoming' (Card 2) to match the reference layout
  const [activeId, setActiveId] = useState<string>("upcoming");

  return (
    <section className="w-full bg-white px-6 py-20 md:px-12 lg:px-20 font-outfit">
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mb-12">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Explore our classes and master trending skills!
          </p>
          <h2 className="mt-2 flex items-center gap-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Dive Into{" "}
            <span className="text-[#059669]">What&apos;s Hot Right Now!</span>
            <Flame className="inline-block h-8 w-8 fill-amber-500 text-amber-500" />
          </h2>
        </div>

        {/* Accordion Row */}
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[461px] lg:justify-center">
          {ACCORDION_DATA.map((card) => {
            const isActive = activeId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveId(card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveId(card.id);
                  }
                }}
                className={`relative flex cursor-pointer flex-col justify-between rounded-[32px] p-8 sm:p-10 lg:p-11 select-none transition-all duration-500 ease-out outline-none overflow-hidden ${
                  isActive
                    ? "lg:w-[592px] lg:flex-none bg-[#C33241] text-white shadow-xl"
                    : "lg:w-[280px] lg:flex-none bg-[#F9EBEC] text-[#C33241] hover:bg-[#f1dedf]"
                }`}
              >
                {isActive ? (
                  // ACTIVE EXPANDED STATE
                  <>
                    {/* Top Bar: View All link */}
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        className="flex items-center gap-2 text-sm font-semibold text-white/95 hover:text-white transition-opacity font-outfit"
                      >
                        <span>View all Courses</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Middle: 4 Floating Tech Icons */}
                    <div className="my-auto flex items-center justify-center gap-4 sm:gap-8 lg:gap-10 py-4 w-full">
                      {TECH_ICONS.map((icon, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-center justify-center transition-transform hover:scale-105 duration-200"
                        >
                          <Image
                            src={icon.src}
                            alt={icon.name}
                            width={76}
                            height={76}
                            className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[76px] lg:w-[76px] object-contain select-none pointer-events-none drop-shadow-md"
                            priority
                          />
                        </div>
                      ))}
                    </div>

                    {/* Bottom: Number, Plus, and Text Block */}
                    <div className="mt-auto flex items-start text-white w-full">
                      {/* Big Metric Number & Superscript Plus */}
                      <div className="flex items-start select-none font-nohemi shrink-0">
                        <span className="font-bold text-[90px] lg:text-[150px] leading-[0.82] tracking-normal">
                          {card.number}
                        </span>
                        <span className="font-bold text-3xl lg:text-[44px] leading-none -mt-2 lg:-mt-3 ml-1">
                          +
                        </span>
                      </div>

                      {/* Title and Subtitle Block */}
                      <div className="flex flex-col ml-3 lg:ml-4 pt-1 font-outfit">
                        <h3 className="font-bold text-2xl lg:text-[32px] leading-none whitespace-nowrap">
                          {card.title}
                        </h3>
                        <p className="font-normal text-sm lg:text-[18px] leading-[1.25] mt-2 lg:mt-2.5 text-white/90 max-w-[280px]">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  // INACTIVE VERTICAL SPINE
                  <>
                    {/* Inactive Content - grouped at bottom */}
                    <div className="mt-auto flex flex-col items-center w-full">
                      {/* Vertical Rotated Spine Text */}
                      <div className="w-[120px] h-[230px] flex items-center justify-center relative mb-6 lg:mb-7">
                        <div className="w-[230px] h-[120px] -rotate-90 select-none flex flex-col items-start justify-start text-left font-outfit text-[#C33241]">
                          <div
                            className="font-bold text-2xl lg:text-[32px] leading-none"
                            style={{ width: card.title.length > 12 ? "150px" : "230px" }}
                          >
                            {card.title}
                          </div>
                          <div className="font-normal text-sm lg:text-[18px] leading-[1.25] mt-2.5 text-[#C33241]/90 w-[230px]">
                            {card.subtitle}
                          </div>
                        </div>
                      </div>

                      {/* Inactive Metric Number with Superscript + */}
                      <div className="flex items-start justify-center text-[#C33241] select-none w-full font-nohemi">
                        <span className="font-bold text-[90px] lg:text-[150px] leading-[0.82] text-center">
                          {card.number}
                        </span>
                        <span className="font-bold text-3xl lg:text-[44px] leading-none ml-1 -mt-2 lg:-mt-3">
                          +
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
