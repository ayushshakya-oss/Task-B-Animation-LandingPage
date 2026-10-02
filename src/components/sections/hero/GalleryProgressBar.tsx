import React, { forwardRef } from "react";

interface GalleryProgressBarProps {
  scrollProgress: number;
  onTrackClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  thumbRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export const GalleryProgressBar = forwardRef<
  HTMLDivElement,
  GalleryProgressBarProps
>(function GalleryProgressBar(
  { scrollProgress, onTrackClick, thumbRef, className = "" },
  ref,
) {
  return (
    <div
      ref={ref}
      onClick={onTrackClick}
      className={`group/track relative mx-auto mt-6 sm:mt-8 h-1.5 sm:h-2 w-full max-w-7xl cursor-pointer rounded-full bg-slate-100 p-0.5 ${className}`}
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
  );
});
