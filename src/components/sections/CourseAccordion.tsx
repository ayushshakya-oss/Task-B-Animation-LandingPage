'use client';

import React, { useState } from 'react';
import { ArrowRight, Flame, MousePointerClick } from 'lucide-react';

interface CardItem {
  id: string;
  badgeCount: string;
  title: string;
  subtitle: string;
}

const ACCORDION_DATA: CardItem[] = [
  {
    id: 'all',
    badgeCount: '23+',
    title: 'All Courses',
    subtitle: "courses you're powering through right now.",
  },
  {
    id: 'upcoming',
    badgeCount: '05+',
    title: 'Upcoming Courses',
    subtitle: 'exciting new courses waiting to boost your skills.',
  },
  {
    id: 'ongoing',
    badgeCount: '10+',
    title: 'Ongoing Courses',
    subtitle: "currently happening—don't miss out on the action!",
  },
];

export function CourseAccordion() {
  const [activeId, setActiveId] = useState<string>('all');

  return (
    <section className="w-full bg-white px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mb-12">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Explore our classes and master trending skills!
          </p>
          <h2 className="mt-2 flex items-center gap-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Dive Into <span className="text-[#059669]">What&apos;s Hot Right Now!</span>
            <Flame className="inline-block h-8 w-8 fill-amber-500 text-amber-500 animate-pulse" />
          </h2>
        </div>

        {/* Accordion Row */}
        <div className="flex flex-col gap-6 lg:h-[460px] lg:flex-row">
          {ACCORDION_DATA.map((card) => {
            const isActive = activeId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveId(card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveId(card.id);
                  }
                }}
                className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl p-8 transition-all duration-500 ease-out select-none outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${
                  isActive
                    ? 'lg:flex-[2.6] bg-[#BF2837] text-white shadow-2xl'
                    : 'lg:flex-[0.7] bg-[#FBEFEF] text-[#BF2837] hover:bg-[#fae1e1] hover:shadow-md'
                }`}
                style={{
                  flexGrow: isActive ? 2.6 : 0.7,
                }}
              >
                {isActive ? (
                  // ACTIVE EXPANDED STATE
                  <div className="flex h-full flex-col justify-between animate-fadeIn transition-opacity duration-500">
                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        className="group/btn flex items-center gap-2 text-xs font-semibold tracking-wide text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm"
                      >
                        View all Courses
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>

                    {/* Floating Tech Logos */}
                    <div className="my-8 flex flex-wrap items-center gap-4 sm:gap-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00D8FF] text-2xl font-bold text-white shadow-lg transition-transform hover:scale-110 hover:-translate-y-1 duration-200">
                        ⚛
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFB020] text-2xl font-bold text-white shadow-lg transition-transform hover:scale-110 hover:-translate-y-1 duration-200">
                        💬
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#41B883] text-2xl font-bold text-white shadow-lg transition-transform hover:scale-110 hover:-translate-y-1 duration-200">
                        V
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5C5C] text-2xl font-bold text-white shadow-lg transition-transform hover:scale-110 hover:-translate-y-1 duration-200">
                        🎨
                      </div>
                    </div>

                    {/* Bottom Metrics */}
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-4">
                        <span className="text-6xl font-black tracking-tight">{card.badgeCount}</span>
                        <span className="text-2xl font-bold tracking-tight">{card.title}</span>
                      </div>
                      <p className="mt-2 text-sm font-normal text-white/85 max-w-md">{card.subtitle}</p>
                    </div>
                  </div>
                ) : (
                  // INACTIVE VERTICAL SLOT
                  <div className="flex h-full flex-col justify-between">
                    {/* Subtle Click Me bounce hint */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#BF2837]/10 px-2.5 py-1 text-[11px] font-bold text-[#BF2837] animate-bounce shadow-xs">
                        <MousePointerClick className="h-3.5 w-3.5" />
                        <span>Click me!</span>
                      </div>
                    </div>

                    {/* Vertically Rotated Text */}
                    <div className="my-auto py-4">
                      <div className="flex flex-col items-start gap-2 [writing-mode:vertical-rl] rotate-180">
                        <span className="text-lg font-bold tracking-tight text-[#BF2837] whitespace-nowrap">
                          {card.title}
                        </span>
                        <span className="line-clamp-2 text-xs font-medium text-[#BF2837]/75">
                          {card.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Counter */}
                    <div className="mt-auto">
                      <span className="text-5xl font-black tracking-tight text-[#BF2837]">
                        {card.badgeCount}
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
