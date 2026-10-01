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
          if (typeof window !== "undefined" && window.innerWidth < 1024) return;
          const activeIndex = ACCORDION_DATA.findIndex(
            (c) => c.id === activeId,
          );
          const isLgOnly =
            window.innerWidth >= 1024 && window.innerWidth < 1280;
          const wActive = isLgOnly ? 460 : 592;
          const wInactive = isLgOnly ? 220 : 280;
          const gap = isLgOnly ? 16 : 32;
          const totalWidth = wActive + 2 * wInactive + 2 * gap;
          const rowWidth = parentRow.clientWidth || totalWidth;
          const rowStart = Math.max(0, (rowWidth - totalWidth) / 2);
          const activeCardOffsetLeft =
            rowStart + activeIndex * (wInactive + gap);
          const clusterWidth = iconsEl.offsetWidth || 340;
          const targetX = activeCardOffsetLeft + (wActive - clusterWidth) / 2;

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
        const isLgOnly = window.innerWidth >= 1024 && window.innerWidth < 1280;
        const wActive = isLgOnly ? 460 : 592;
        const wInactive = isLgOnly ? 220 : 280;
        const gap = isLgOnly ? 16 : 32;
        const totalWidth = wActive + 2 * wInactive + 2 * gap;
        const rowWidth = parentRow.clientWidth || totalWidth;
        const rowStart = Math.max(0, (rowWidth - totalWidth) / 2);
        const activeCardOffsetLeft = rowStart + activeIndex * (wInactive + gap);
        const clusterWidth = iconsEl.offsetWidth || 340;
        const targetX = activeCardOffsetLeft + (wActive - clusterWidth) / 2;
        gsap.set(iconsEl, { x: targetX });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeId]);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white px-4 sm:px-6 md:px-10 lg:px-6 xl:px-8 2xl:px-20 py-12 sm:py-16 lg:py-20 font-outfit overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mb-8 sm:mb-10 lg:mb-12 ml-0 sm:ml-4 lg:ml-7">
          <p className="text-base sm:text-xl lg:text-[24px] font-outfit font-normal text-slate-700">
            Explore our classes and master trending skills!
          </p>
          <h2 className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-2xl sm:text-3xl lg:text-[32px] xl:text-4xl font-bold tracking-tight text-[#2B2B2B]">
            <span>Dive Into</span>{" "}
            <span className="text-[#1DA077]">What&apos;s Hot Right Now!</span>
            <Flame className="inline-block h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 fill-amber-500 text-amber-500 shrink-0" />
          </h2>
        </div>

        {/* Accordion Row */}
        <div className="accordion-row relative flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-4 xl:gap-8 w-full lg:h-[461px] lg:justify-center items-stretch lg:items-center">
          {/* Shared Travelling Icons Absolute Tracker */}
          <div
            ref={iconsRef}
            className="pointer-events-none absolute top-[160px] -translate-y-1/2 left-0 z-30 hidden lg:flex items-center gap-3 xl:gap-10"
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
                  className="h-12 w-12 xl:h-[76px] xl:w-[76px] object-contain select-none pointer-events-none drop-shadow-md"
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
                className={`accordion-card relative flex cursor-pointer flex-col justify-between rounded-[24px] sm:rounded-[32px] select-none outline-none overflow-hidden bg-[#FBEFEF] transition-[width,height,background-color,box-shadow] duration-[650ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
                  isActive
                    ? "w-full min-h-[400px] min-[480px]:min-h-[440px] md:min-h-[480px] lg:h-[461px] lg:w-[460px] xl:w-[592px] lg:flex-none shadow-xl p-6 min-[480px]:p-8 sm:p-10 md:p-12 lg:p-8 xl:p-11"
                    : "w-full h-[90px] min-[480px]:h-[100px] sm:h-[104px] md:h-[116px] lg:h-[461px] lg:w-[220px] xl:w-[280px] lg:flex-none hover:bg-[#fae2e2] p-4 min-[480px]:px-6 sm:px-8 md:px-10 lg:px-4 lg:pt-8 lg:pb-8 xl:px-6"
                }`}
                style={{ transform: "none" }} // Strictly locks card rotation to 0
              >
                {/* Top-Right Radial Expanding Overlay */}
                <div
                  className="red-reveal-layer pointer-events-none absolute inset-0 z-0 bg-[#BF2837] rounded-[24px] sm:rounded-[32px] overflow-hidden"
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
                        className="view-all-btn flex items-center gap-1.5 min-[450px]:gap-2 sm:gap-2.5 text-xs min-[450px]:text-sm sm:text-base font-semibold text-white/95 hover:text-white transition-opacity font-outfit"
                      >
                        <span>View all Courses</span>
                        <ArrowRight className="h-3.5 w-3.5 min-[450px]:h-4 min-[450px]:w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>

                    {/* Mobile & Tablet Floating Icons Slot */}
                    <div className="relative z-10 flex lg:hidden items-center justify-center gap-5 min-[450px]:gap-7 min-[520px]:gap-10 sm:gap-10 md:gap-12 my-auto py-3 sm:py-6">
                      {TECH_ICONS.map((icon, idx) => (
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
                ) : (
                  // INACTIVE CARD LAYOUT
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
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
