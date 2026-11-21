"use client";

import Image from "next/image";
import { useState } from "react";

import { ArrowLIcon as ArrowLeft, ArrowRIcon as ArrowRight } from "@/components/ui/icon";

export interface FeatureSlide {
  caption: string;
  image: { alt: string; url: string };
}

// Second Ride-style fan of cards: the active one sits large in the middle with its caption, the rest step back on
// either side. Clicking a side card or the arrows moves the fan; nothing moves on its own.
export function FeatureCarousel({ slides }: { slides: FeatureSlide[] }) {
  const [active, setActive] = useState(Math.floor(slides.length / 2));
  const go = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <div className="grid gap-8">
      <div className="relative h-[26rem] md:h-[32rem]">
        {slides.map((slide, index) => {
          const offset = index - active;
          const distance = Math.abs(offset);
          return (
            <button
              aria-current={offset === 0}
              aria-label={offset === 0 ? slide.caption : `Show: ${slide.caption}`}
              className="absolute top-1/2 left-1/2 w-[min(72vw,22rem)] overflow-hidden rounded-xl bg-muted shadow-soft transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none md:w-[24rem]"
              key={slide.caption}
              onClick={() => go(index)}
              style={{
                opacity: distance > 2 ? 0 : 1,
                transform: `translate(calc(-50% + ${offset * 82}%), -50%) scale(${1 - distance * 0.16})`,
                zIndex: 10 - distance,
              }}
              tabIndex={distance > 2 ? -1 : 0}
              type="button"
            >
              <span className="relative block aspect-4/5">
                <Image
                  alt={slide.image.alt}
                  className="object-cover"
                  fill
                  sizes="24rem"
                  src={slide.image.url}
                />
              </span>
              {offset === 0 && (
                <span className="absolute inset-x-3 bottom-3 rounded-lg bg-foreground/80 px-4 py-3 text-left text-h4 text-background backdrop-blur-md">
                  {slide.caption}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          aria-label="Previous"
          className="grid size-11 place-items-center rounded-full bg-wash backdrop-blur-md hover:bg-hairline"
          onClick={() => go(active - 1)}
          type="button"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div aria-hidden className="flex gap-1.5">
          {slides.map((slide, index) => (
            <span
              className={`h-1.5 rounded-full transition-all ${index === active ? "w-6 bg-foreground" : "w-1.5 bg-hairline"}`}
              key={slide.caption}
            />
          ))}
        </div>
        <button
          aria-label="Next"
          className="grid size-11 place-items-center rounded-full bg-wash backdrop-blur-md hover:bg-hairline"
          onClick={() => go(active + 1)}
          type="button"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
