"use client";

import Image from "next/image";
import { useState } from "react";

import { XIcon as X } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";

export interface Hotspot {
  body: string;
  dotX: number;
  dotY: number;
  href: string;
  label: string;
  // Position on the photo, in percent of its width and height.
  x: number;
  y: number;
}

export function PartHotspots({
  hotspots,
  image,
}: {
  hotspots: Hotspot[];
  image: { alt: string; url: string };
}) {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : hotspots[active];

  return (
    <div className="relative mx-auto aspect-4/3 w-full max-w-3xl xl:h-full xl:max-h-full xl:w-auto">
      <Image
        alt={image.alt}
        className="object-contain"
        fill
        sizes="100vw"
        src={image.url}
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {hotspots.map((spot) => (
          <polyline
            key={spot.label}
            points={`${spot.dotX},${spot.dotY} ${(spot.dotX + spot.x) / 2},${spot.dotY} ${spot.x},${spot.y}`}
            fill="none"
            stroke="#F66101"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {hotspots.map((spot, index) => (
        <button
          aria-label={`About ${spot.label}`}
          aria-expanded={index === active}
          className="absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full"
          key={spot.label}
          onClick={() => setActive(index === active ? null : index)}
          style={{ left: `${spot.dotX}%`, top: `${spot.dotY}%` }}
          type="button"
        >
          <span className="absolute size-7 rounded-full bg-primary/30 motion-safe:animate-ping" />
          <span className="relative size-3.5 rounded-full bg-primary ring-4 ring-white/70" />
        </button>
      ))}
      {current && (
        <div
          key={current.label}
          className={`absolute z-20 grid w-[min(14rem,70vw)] gap-2 rounded-xl border border-hairline bg-background p-5 shadow-deep motion-safe:animate-[hotspot-reveal_0.45s_ease-out_both] ${current.dotX < 50 ? "left-0 xl:left-auto xl:right-[calc(93%+1rem)]" : "right-0 xl:right-auto xl:left-[calc(93%+1rem)]"}`}
          style={{
            top: `${Math.min(current.dotY + 6, 65)}%`,
          }}
        >
          <button
            type="button"
            aria-label="Close part details"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <X className="size-4" />
          </button>
          <p className="text-h4">{current.label}</p>
          <p className="text-small text-muted-foreground">{current.body}</p>
          <Link className="text-small font-medium text-link hover:underline" href={current.href}>
            Shop {current.label.toLowerCase()}s
          </Link>
        </div>
      )}
    </div>
  );
}
