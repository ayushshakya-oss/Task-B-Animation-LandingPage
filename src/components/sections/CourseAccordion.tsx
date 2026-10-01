"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
  const [activeId, setActiveId] = useState<string>("upcoming");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const iconsRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Trigger GSAP animations whenever activeId changes
  useGSAP(
    () => {
      ACCORDION_DATA.forEach((card) => {
        const cardEl = cardRefs.current[card.id];
        if (!cardEl) return;

        const redOverlay = cardEl.querySelector(".red-reveal-layer");
        const textBlock = cardEl.querySelector(".active-text-wrapper");
        const verticalBlock = cardEl.querySelector(".vertical-text-wrapper");
        const textElements = cardEl.querySelectorAll(".card-text-color");
        const isActive = card.id === activeId;

        if (isActive) {
          if (isInitialMount.current) {
            gsap.set(redOverlay, { clipPath: "circle(150% at 90% 10%)" });
            gsap.set(textElements, { color: "#FFFFFF" });
            if (textBlock) {
              gsap.set(textBlock, {
                y: 0,
                rotation: 0,
                opacity: 1,
                transformOrigin: "0% 100%",
              });
            }
          } else {
            gsap.fromTo(
              redOverlay,
              { clipPath: "circle(0% at 90% 10%)" },
              {
                clipPath: "circle(150% at 90% 10%)",
                duration: 0.9,
                ease: "power2.out",
              },
            );

            if (textBlock) {
              gsap.killTweensOf(textBlock);

              gsap.set(textBlock, {
                y: -255,
                rotation: -90,
                opacity: 0,
                transformOrigin: "0% 100%",
                force3D: true,
              });

              const tl = gsap.timeline({ delay: 0.04 });

              tl.to(
                textBlock,
                {
                  opacity: 1,
                  duration: 0.2,
                  ease: "power1.out",
                },
                0,
              )
                .to(
                  textBlock,
                  {
                    y: 0,
                    duration: 0.82,
                    ease: "power3.out",
                  },
                  0,
                )
                .to(
                  textBlock,
                  {
                    rotation: 0,
                    duration: 0.85,
                    ease: "back.out(1.4)",
                    clearProps: "transformOrigin",
                  },
                  0,
                );
            }

            gsap.to(textElements, { color: "#FFFFFF", duration: 0.45 });
          }
        } else {
          if (isInitialMount.current) {
            gsap.set(redOverlay, { clipPath: "circle(0% at 90% 10%)" });
            gsap.set(textElements, { color: "#BF2837" });
          } else {
            gsap.to(redOverlay, {
              clipPath: "circle(0% at 90% 10%)",
              duration: 0.65,
              ease: "power2.inOut",
            });

            if (verticalBlock) {
              gsap.killTweensOf(verticalBlock);
              gsap.fromTo(
                verticalBlock,
                { opacity: 0, y: 25 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.45,
                  delay: 0.1,
                  ease: "power2.out",
                },
              );
            }

            gsap.to(textElements, { color: "#BF2837", duration: 0.45 });
          }
        }
      });

      const updateIconsPosition = () => {
        const activeCardEl = cardRefs.current[activeId];
        const iconsEl = iconsRef.current;
        const parentRow = containerRef.current?.querySelector(
          ".accordion-row",
        ) as HTMLElement | null;

        if (activeCardEl && iconsEl && parentRow) {
          const activeIndex = ACCORDION_DATA.findIndex(
            (c) => c.id === activeId,
          );
          const rowWidth = parentRow.clientWidth || 1200;
          const rowStart = Math.max(0, (rowWidth - 1200) / 2);
          const activeCardOffsetLeft = rowStart + activeIndex * (280 + 24);
          const clusterWidth = iconsEl.offsetWidth || 340;
          const targetX = activeCardOffsetLeft + (592 - clusterWidth) / 2;

          if (isInitialMount.current) {
            gsap.set(iconsEl, { x: targetX });
            isInitialMount.current = false;
          } else {
            // Animate icons cluster along X axis
            gsap.to(iconsEl, {
              x: targetX,
              duration: 0.65,
              ease: "power3.inOut",
            });

            // Stagger settle for individual icons
            gsap.fromTo(
              iconsEl.querySelectorAll(".single-icon"),
              { y: 6 },
              {
                y: 0,
                duration: 0.4,
                stagger: 0.04,
                ease: "back.out(1.5)",
              },
            );
          }
        }
      };

      updateIconsPosition();
    },
    { dependencies: [activeId], scope: containerRef },
  );

  // Keep travelling icons position updated on window resize
  useEffect(() => {
    const handleResize = () => {
      const iconsEl = iconsRef.current;
      const parentRow = containerRef.current?.querySelector(
        ".accordion-row",
      ) as HTMLElement | null;
      if (iconsEl && parentRow && window.innerWidth >= 1024) {
        const activeIndex = ACCORDION_DATA.findIndex((c) => c.id === activeId);
        const rowWidth = parentRow.clientWidth || 1200;
        const rowStart = Math.max(0, (rowWidth - 1200) / 2);
        const activeCardOffsetLeft = rowStart + activeIndex * (280 + 24);
        const clusterWidth = iconsEl.offsetWidth || 340;
        const targetX = activeCardOffsetLeft + (592 - clusterWidth) / 2;
        gsap.set(iconsEl, { x: targetX });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeId]);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white px-6 py-20 md:px-12 lg:px-20 font-outfit"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mb-12 ml-7">
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
        <div className="accordion-row relative flex flex-col lg:flex-row gap-8 lg:h-[461px] lg:justify-center items-center">
          {/* Shared Travelling Icons Absolute Tracker */}
          <div
            ref={iconsRef}
            className="pointer-events-none absolute top-[160px] -translate-y-1/2 left-0 z-30 hidden lg:flex items-center gap-4 sm:gap-8 lg:gap-10"
          >
            {TECH_ICONS.map((icon, idx) => (
              <div
                key={idx}
                className="single-icon relative flex items-center justify-center transition-transform hover:scale-105 duration-200"
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

          {ACCORDION_DATA.map((card) => {
            const isActive = activeId === card.id;

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[card.id] = el;
                }}
                onClick={() => {
                  if (activeId !== card.id) {
                    setActiveId(card.id);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    if (activeId !== card.id) {
                      setActiveId(card.id);
                    }
                  }
                }}
                className={`accordion-card relative flex cursor-pointer flex-col justify-between rounded-[32px] select-none outline-none overflow-hidden h-[461px] bg-[#FBEFEF] transition-[width,box-shadow] duration-[650ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
                  isActive
                    ? "w-full lg:w-[592px] lg:flex-none shadow-xl p-8 sm:p-10 lg:p-11"
                    : "w-full lg:w-[280px] lg:flex-none hover:bg-[#fae2e2] px-6 pt-8 pb-6 lg:pb-8"
                }`}
                style={{ transform: "none" }} // Strictly locks card rotation to 0
              >
                {/* 1. Top-Right Radial Expanding Overlay */}
                <div
                  className="red-reveal-layer pointer-events-none absolute inset-0 z-0 bg-[#BF2837] rounded-[32px] overflow-hidden"
                  style={{
                    clipPath: isActive
                      ? "circle(150% at 90% 10%)"
                      : "circle(0% at 90% 10%)",
                  }}
                />

                {isActive ? (
                  // ACTIVE CARD LAYOUT
                  <>
                    {/* Top Utility Bar */}
                    <div className="relative z-10 top-bar flex items-center justify-end w-full min-h-[28px]">
                      <button
                        type="button"
                        className="view-all-btn flex items-center gap-2 text-sm font-semibold text-white/95 hover:text-white transition-opacity font-outfit"
                      >
                        <span>View all Courses</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Spacer for Floating Icons Slot (Active Card only) */}
                    <div className="my-auto min-h-[76px]" />

                    {/* Bottom Metric & Text Layout */}
                    <div className="relative z-10 mt-auto w-full">
                      <div className="flex items-start text-white w-full">
                        {/* Big Metric Number & Superscript Plus */}
                        <div className="flex items-start select-none font-nohemi shrink-0">
                          <span className="card-text-color font-bold text-[90px] lg:text-[150px] leading-[0.82] tracking-normal text-white">
                            {card.number}
                          </span>
                          <span className="card-text-color font-bold text-3xl lg:text-[44px] leading-none -mt-2 lg:-mt-3 ml-1 text-white">
                            +
                          </span>
                        </div>

                        {/* Active Bouncy Text Wrapper */}
                        <div
                          className="active-text-wrapper flex flex-col ml-3 lg:ml-4 pt-1 font-outfit"
                          style={{
                            transformOrigin: "0% 100%",
                            willChange: "transform, opacity",
                          }}
                        >
                          <h3 className="card-text-color font-bold text-2xl lg:text-[32px] leading-none whitespace-nowrap text-white">
                            {card.title}
                          </h3>
                          <p className="card-text-color font-normal text-sm lg:text-[18px] leading-[1.25] mt-2 lg:mt-2.5 text-white/90 max-w-[280px]">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // INACTIVE CARD LAYOUT
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-end w-full mt-0">
                    {/* Vertical Rotated Spine Text utilizing full height */}
                    <div className="w-[120px] h-[240px] flex items-center justify-center relative mb-5 lg:mb-6">
                      <div className="vertical-text-wrapper w-[240px] h-[110px] -rotate-90 select-none flex flex-col items-start justify-start text-left font-outfit">
                        <div
                          className="card-text-color font-bold text-2xl lg:text-[32px] leading-none text-[#BF2837]"
                          style={{
                            width: card.title.length > 12 ? "150px" : "240px",
                          }}
                        >
                          {card.title}
                        </div>
                        <div className="card-text-color font-normal text-sm lg:text-[18px] leading-[1.25] mt-2.5 text-[#BF2837]/90 w-[240px]">
                          {card.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Inactive Metric Number with Superscript + */}
                    <div className="flex items-start justify-center select-none w-full font-nohemi">
                      <span className="card-text-color font-bold text-[90px] lg:text-[150px] leading-[0.82] text-center text-[#BF2837]">
                        {card.number}
                      </span>
                      <span className="card-text-color font-bold text-3xl lg:text-[44px] leading-none ml-1 -mt-2 lg:-mt-3 text-[#BF2837]">
                        +
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
