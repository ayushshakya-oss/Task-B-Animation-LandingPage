import React from "react";
import Image from "next/image";

interface GalleryCardProps {
  src: string;
  index: number;
  priority?: boolean;
}

export function GalleryCard({
  src,
  index,
  priority = false,
}: GalleryCardProps) {
  return (
    <div className="group relative h-[210px] min-[380px]:h-[240px] sm:h-[300px] md:h-[380px] lg:h-[400px] w-[280px] min-[380px]:w-[320px] sm:w-[420px] md:w-[540px] lg:w-[620px] shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-100 shadow-md transition-transform duration-300">
      <Image
        src={src}
        alt={`Showcase item ${index + 1}`}
        fill
        sizes="(max-width: 640px) 320px, (max-width: 1024px) 540px, 620px"
        className="pointer-events-none object-cover select-none transition-transform duration-500 group-hover:scale-105"
        priority={priority}
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
    </div>
  );
}
