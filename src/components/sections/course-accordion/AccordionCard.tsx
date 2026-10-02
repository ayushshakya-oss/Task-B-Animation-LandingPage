import React, { forwardRef } from "react";
import { CardItem, TechIconItem } from "./types";
import { ActiveCardContent } from "./ActiveCardContent";
import { InactiveCardContent } from "./InactiveCardContent";

interface AccordionCardProps {
  card: CardItem;
  isActive: boolean;
  icons: TechIconItem[];
  onSelect: (id: string) => void;
  onViewAllClick?: () => void;
}

export const AccordionCard = forwardRef<HTMLDivElement, AccordionCardProps>(
  function AccordionCard(
    { card, isActive, icons, onSelect, onViewAllClick },
    ref,
  ) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(card.id);
      }
    };

    return (
      <div
        ref={ref}
        onClick={() => onSelect(card.id)}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
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
          <ActiveCardContent
            card={card}
            icons={icons}
            onViewAllClick={onViewAllClick}
          />
        ) : (
          <InactiveCardContent card={card} />
        )}
      </div>
    );
  },
);
