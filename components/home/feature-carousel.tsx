"use client";

import { Inter_Tight } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const interTight = Inter_Tight({ subsets: ["latin"], weight: "400" });

export interface FeatureSlide {
  caption: string;
  image: { alt: string; url: string };
}

export function FeatureCarousel({ slides }: { slides: FeatureSlide[] }) {
  const [active, setActive] = useState(Math.floor(slides.length / 2));
  const go = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <div className="grid gap-3 sm:gap-4">
      <div className="flex items-center justify-center gap-3" aria-label="Choose a feature">
        <div className="flex items-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.caption}
              type="button"
              aria-label={`Show ${slide.caption}`}
              aria-pressed={index === active}
              onClick={() => go(index)}
              className={`h-2 cursor-pointer rounded-full transition-all motion-reduce:transition-none ${index === active ? "w-7 bg-primary" : "w-2 bg-black/20 hover:bg-black/40"}`}
            />
          ))}
        </div>
      </div>
      <div className="relative h-[22rem] overflow-hidden sm:h-[27rem] lg:h-[29rem]">
        {slides.map((slide, index) => {
          const half = Math.floor(slides.length / 2);
          const offset = ((index - active + slides.length + half) % slides.length) - half;
          const distance = Math.abs(offset);
          return (
            <button
              aria-label={`Browse features, currently ${slide.caption}. Use left or right arrow keys.`}
              className={`absolute bottom-2 left-1/2 w-[min(65vw,20rem)] cursor-pointer rounded-[1.75rem] text-left transition-[transform,opacity,box-shadow] duration-700 ease-out motion-reduce:transition-none sm:w-[20rem] lg:w-[22rem] ${offset === 0 ? "bg-[linear-gradient(to_bottom,#F66101_0%,#F66101_50%,transparent_50%)] p-2 pb-0 shadow-[0_20px_60px_rgba(246,97,1,0.3)]" : "shadow-xl"}`}
              key={slide.caption}
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                go(
                  active +
                    (event.detail === 0 || event.clientX >= rect.left + rect.width / 2 ? 1 : -1),
                );
              }}
              onPointerMove={(event) => {
                if (event.pointerType !== "mouse") return;
                const rect = event.currentTarget.getBoundingClientRect();
                const direction = event.clientX < rect.left + rect.width / 2 ? "left" : "right";
                event.currentTarget.style.cursor = `url(/cursor-carousel-${direction}.svg) 16 16, pointer`;
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  go(active + (event.key === "ArrowLeft" ? -1 : 1));
                }
              }}
              style={{
                opacity: distance > 2 ? 0 : 1,
                transform: `translateX(calc(-50% + ${offset * 96}%)) scale(${1 - distance * 0.22})`,
                transformOrigin: "bottom center",
                zIndex: 10 - distance,
              }}
              tabIndex={distance > 2 ? -1 : 0}
              type="button"
            >
              <span className="relative block aspect-[4/5] overflow-hidden rounded-[1.3rem] bg-muted">
                <Image
                  alt={slide.image.alt}
                  className="object-cover"
                  fill
                  sizes="100vw"
                  src={slide.image.url}
                />
                {offset === 0 && (
                  <>
                    <span className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black via-black/60 to-transparent" />
                    <span
                      className={`${interTight.className} absolute inset-x-0 bottom-0 p-5 text-lg leading-tight font-normal text-white`}
                    >
                      {slide.caption}
                    </span>
                  </>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
