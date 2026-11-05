"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ReactNode, useRef } from "react";

// A row of review cards that snaps card by card, with arrows to step through it.
export function ReviewCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);

  function step(direction: 1 | -1) {
    const element = track.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    const width = (card?.offsetWidth ?? element.clientWidth) + 16;
    element.scrollBy({ behavior: "smooth", left: direction * width });
  }

  return (
    <div className="relative">
      <ul
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={track}
      >
        {children}
      </ul>
      <button
        aria-label="Previous reviews"
        className="absolute top-1/2 left-0 hidden size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-background shadow-md transition-colors hover:bg-muted md:flex"
        onClick={() => step(-1)}
        type="button"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        aria-label="Next reviews"
        className="absolute top-1/2 right-0 hidden size-11 translate-x-1/2 -translate-y-1/2 items-center justify-center bg-background shadow-md transition-colors hover:bg-muted md:flex"
        onClick={() => step(1)}
        type="button"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
