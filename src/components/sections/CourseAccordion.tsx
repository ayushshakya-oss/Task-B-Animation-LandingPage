"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  TECH_ICONS,
  ACCORDION_DATA,
  CourseAccordionProps,
  CourseAccordionHeader,
  TravellingIcons,
  AccordionCard,
} from "./course-accordion";

export function CourseAccordion({
  items = ACCORDION_DATA,
  icons = TECH_ICONS,
  defaultActiveId = "upcoming",
  title,
  subtitle,
  className = "",
}: CourseAccordionProps) {
  const [activeId, setActiveId] = useState<string>(defaultActiveId);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const iconsRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Trigger GSAP animations whenever activeId changes
  useGSAP(
    () => {
      items.forEach((card) => {
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
          const activeIndex = items.findIndex((c) => c.id === activeId);
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
    { dependencies: [activeId, items], scope: containerRef },
  );

  // Keep travelling icons position updated on window resize
  useEffect(() => {
    const handleResize = () => {
      const iconsEl = iconsRef.current;
      const parentRow = containerRef.current?.querySelector(
        ".accordion-row",
      ) as HTMLElement | null;
      if (iconsEl && parentRow && window.innerWidth >= 1024) {
        const activeIndex = items.findIndex((c) => c.id === activeId);
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
  }, [activeId, items]);

  return (
    <section
      ref={containerRef}
      className={`w-full bg-white px-4 sm:px-6 md:px-10 lg:px-6 xl:px-8 2xl:px-20 py-12 sm:py-16 lg:py-20 font-outfit overflow-hidden ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <CourseAccordionHeader subtitle={subtitle} title={title} />

        {/* Accordion Row */}
        <div className="accordion-row relative flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-4 xl:gap-8 w-full lg:h-[461px] lg:justify-center items-stretch lg:items-center">
          {/* Shared Travelling Icons Absolute Tracker */}
          <TravellingIcons ref={iconsRef} icons={icons} />

          {items.map((card) => (
            <AccordionCard
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.id] = el;
              }}
              card={card}
              isActive={activeId === card.id}
              icons={icons}
              onSelect={(id) => {
                if (activeId !== id) {
                  setActiveId(id);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export * from "./course-accordion";
