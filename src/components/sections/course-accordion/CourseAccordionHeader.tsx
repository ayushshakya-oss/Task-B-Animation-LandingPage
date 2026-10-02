import React from "react";
import { Flame } from "lucide-react";

interface CourseAccordionHeaderProps {
  subtitle?: string;
  title?: React.ReactNode;
}

export function CourseAccordionHeader({
  subtitle = "Explore our classes and master trending skills!",
  title,
}: CourseAccordionHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10 lg:mb-12 ml-0 sm:ml-4 lg:ml-7">
      <p className="text-base sm:text-xl lg:text-[24px] font-outfit font-normal text-slate-700">
        {subtitle}
      </p>
      <h2 className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-2xl sm:text-3xl lg:text-[32px] xl:text-4xl font-bold tracking-tight text-[#2B2B2B]">
        {title ? (
          title
        ) : (
          <>
            <span>Dive Into</span>{" "}
            <span className="text-[#1DA077]">What&apos;s Hot Right Now!</span>
            <Flame className="inline-block h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 fill-amber-500 text-amber-500 shrink-0" />
          </>
        )}
      </h2>
    </div>
  );
}
