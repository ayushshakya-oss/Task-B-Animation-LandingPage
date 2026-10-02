"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IMAGES } from "./constants";
import { GalleryCard } from "./GalleryCard";
import { GalleryProgressBar } from "./GalleryProgressBar";

interface DraggableGalleryProps {
  images?: string[];
  className?: string;
}

export function DraggableGallery({
  images = IMAGES,
  className = "",
}: DraggableGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Real-Time Progress Bar Synchronization
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
    <div ref={containerRef} className={`relative mt-12 sm:mt-16 lg:mt-20 ${className}`}>
      {/* Floating Drag Badge Follower (Desktop only) */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F4F6]/95 border border-slate-200/60 p-4 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-xl backdrop-blur-md select-none"
      >
        Drag
      </div>

      {/* Carousel list */}
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
        {images.map((src, i) => (
          <GalleryCard key={i} src={src} index={i} priority={i === 0} />
        ))}
      </div>

      {/* Horizontal Progress Track */}
      <GalleryProgressBar
        ref={trackRef}
        thumbRef={thumbRef}
        scrollProgress={scrollProgress}
        onTrackClick={handleTrackClick}
      />
    </div>
  );
}
