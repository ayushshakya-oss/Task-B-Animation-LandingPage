"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TICKER_LINES = [
  {
    id: "line-1",
    items: ["UI & UX", "Development", "Blockchain"],
  },
  {
    id: "line-2",
    items: ["Development", "Blockchain", "UI & UX"],
  },
  {
    id: "line-3",
    items: ["Blockchain", "UI & UX", "Development"],
  },
];

const IMAGES = [
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
];

const PARTNERS = [
  { name: "Cloud Education", src: "/Images/partner1.png" },
  { name: "CMC", src: "/Images/partner2.png" },
  { name: "IT SNP", src: "/Images/partner3.png" },
  { name: "Zebec", src: "/Images/partner4.png" },
];

export function HeroTickerAndGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number | null>(null);

  //Individual Line Slot-Machine Ticker Animation
  useGSAP(
    () => {
      const lines = lineRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (lines.length === 0) return;

      const totalSteps = 3;
      const tl = gsap.timeline({ repeat: -1 });

      for (let step = 1; step <= totalSteps; step++) {
        lines.forEach((lineEl, lineIndex) => {
          tl.to(
            lineEl,
            {
              yPercent: -(100 / 4) * step,
              duration: 0.75,
              ease: "power3.inOut",
            },
            lineIndex === 0 ? "+=1.6" : "<0.12",
          );
        });
      }

      tl.set(lines, { yPercent: 0 });
    },
    { scope: containerRef },
  );

  // Custom Cursor Follower
  useGSAP(
    () => {
      const carousel = carouselRef.current;
      const cursor = cursorRef.current;
      if (!carousel || !cursor) return;

      // Ensure cursor starts hidden
      gsap.set(cursor, { scale: 0, opacity: 0 });

      const xTo = gsap.quickTo(cursor, "x", {
        duration: 0.18,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(cursor, "y", {
        duration: 0.18,
        ease: "power3.out",
      });

      const onMouseMove = (e: MouseEvent) => {
        const rect = carousel.getBoundingClientRect();
        xTo(e.clientX - rect.left - 32);
        yTo(e.clientY - rect.top - 32);
      };

      const onMouseEnter = () => {
        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "back.out(1.7)",
        });
      };

      const onMouseLeave = () => {
        if (!isDragging.current) {
          gsap.to(cursor, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          });
        }
      };

      carousel.addEventListener("mousemove", onMouseMove);
      carousel.addEventListener("mouseenter", onMouseEnter);
      carousel.addEventListener("mouseleave", onMouseLeave);

      return () => {
        carousel.removeEventListener("mousemove", onMouseMove);
        carousel.removeEventListener("mouseenter", onMouseEnter);
        carousel.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    { scope: containerRef },
  );

  //Real-Time Progress Bar Synchronization
  const syncProgress = useCallback(() => {
    const el = carouselRef.current;
    const thumb = thumbRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0;

    if (thumb) {
      thumb.style.transform = `translateX(${ratio * 300}%)`;
    }
    setScrollProgress(ratio * 100);
  }, []);

  const handleScroll = () => {
    syncProgress();
  };

  // Smooth Inertia Dragging Mechanics
  const stopDragging = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (cursorRef.current) {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    }

    const el = carouselRef.current;
    if (!el) return;

    let vel = velocity.current * 1.5;
    const friction = 0.94;

    const runMomentum = () => {
      if (isDragging.current || !el) return;
      vel *= friction;
      if (Math.abs(vel) > 0.3) {
        el.scrollLeft -= vel;
        syncProgress();
        rafId.current = requestAnimationFrame(runMomentum);
      }
    };

    if (Math.abs(vel) > 0.8) {
      rafId.current = requestAnimationFrame(runMomentum);
    }
  }, [syncProgress]);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = carouselRef.current;
    if (!el) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);

    isDragging.current = true;
    startX.current = e.pageX;
    startScrollLeft.current = el.scrollLeft;
    lastX.current = e.pageX;
    velocity.current = 0;

    if (cursorRef.current) {
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.15 });
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !carouselRef.current) return;
      e.preventDefault();

      const currentX = e.pageX;
      const deltaX = currentX - lastX.current;
      velocity.current = deltaX;
      lastX.current = currentX;

      const walk = currentX - startX.current;
      carouselRef.current.scrollLeft = startScrollLeft.current - walk;
      syncProgress();
    };

    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        stopDragging();
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [stopDragging, syncProgress]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const el = carouselRef.current;
    if (!track || !el) return;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));
    const maxScroll = el.scrollWidth - el.clientWidth;

    el.scrollTo({
      left: ratio * maxScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Upper Section (Font: Oakes Grotesk) */}
        <div className="font-oakes grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Description & Services Pill */}
          <div>
            <p className="max-w-md font-oakes text-lg sm:text-2xl lg:text-[28px] font-normal leading-[1.35] tracking-tight text-slate-900 md:max-w-lg">
              Experience our expert solutions tailored to enhance your business
              with top-tier design, development, and animation.
            </p>
            <div className="mt-6 sm:mt-8">
              <span className="inline-flex items-center rounded-full bg-[#1A56DB] px-5 py-2 sm:px-6 font-oakes text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 cursor-pointer">
                Services
              </span>
            </div>
          </div>

          {/* Right Column: 3 Stacked Lines with Individual Slot Animations */}
          <div className="flex flex-col gap-1 sm:gap-2 lg:gap-3">
            {TICKER_LINES.map((line, lineIndex) => {
              const fullItems = [...line.items, line.items[0]];

              return (
                <div
                  key={line.id}
                  className="h-10 sm:h-14 md:h-16 lg:h-[76px] overflow-hidden relative"
                >
                  <div
                    ref={(el) => {
                      lineRefs.current[lineIndex] = el;
                    }}
                    className="flex flex-col"
                  >
                    {fullItems.map((service, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="h-10 sm:h-14 md:h-16 lg:h-[76px] flex items-center font-oakes font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[68px] leading-none tracking-tight text-slate-900 select-none whitespace-nowrap"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Draggable Carousel */}
        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          {/* Floating Drag Badge Follower (Desktop only) */}
          <div
            ref={cursorRef}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F4F6]/95 border border-slate-200/60 p-4 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-xl backdrop-blur-md select-none"
          >
            Drag
          </div>

          <div
            ref={carouselRef}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            className="flex cursor-grab select-none gap-4 sm:gap-6 overflow-x-auto pb-4 active:cursor-grabbing no-scrollbar will-change-scroll"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {IMAGES.map((src, i) => (
              <div
                key={i}
                className="group relative h-[210px] min-[380px]:h-[240px] sm:h-[300px] md:h-[380px] lg:h-[400px] w-[280px] min-[380px]:w-[320px] sm:w-[420px] md:w-[540px] lg:w-[620px] shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-100 shadow-md transition-transform duration-300"
              >
                <Image
                  src={src}
                  alt={`Showcase item ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 540px, 620px"
                  className="pointer-events-none object-cover select-none transition-transform duration-500 group-hover:scale-105"
                  priority={i === 0}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Horizontal Progress Track */}
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            className="group/track relative mx-auto mt-6 sm:mt-8 h-1.5 sm:h-2 w-full max-w-7xl cursor-pointer rounded-full bg-slate-100 p-0.5"
            title="Click to seek"
          >
            <div
              ref={thumbRef}
              className="h-full rounded-full bg-slate-400 group-hover/track:bg-slate-600 transition-colors duration-200"
              style={{
                width: "25%",
                transform: `translateX(${(scrollProgress * 300) / 100}%)`,
                willChange: "transform",
              }}
            />
          </div>
        </div>

        {/* Partners Row */}
        <div className="mt-16 sm:mt-24 lg:mt-28 text-center">
          <h3 className="font-oakes text-sm sm:text-base md:text-lg font-medium text-slate-800 tracking-tight">
            Our Partners
          </h3>
          <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-items-center sm:justify-between gap-6 sm:gap-8 md:gap-12 px-4 sm:px-8 md:px-12 max-w-5xl">
            {PARTNERS.map((partner, index) => (
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
      </div>
    </section>
  );
}
