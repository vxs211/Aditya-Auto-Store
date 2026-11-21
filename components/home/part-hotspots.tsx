"use client";

import Image from "next/image";
import { useState } from "react";

import { PlusIcon as Plus, XIcon as X } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";

export interface Hotspot {
  body: string;
  href: string;
  label: string;
  // Position on the photo, in percent of its width and height.
  x: number;
  y: number;
}

// Second Ride-style hotspots: dots on the scooter, one labelled at a time; its "+" opens a short note on the part.
export function PartHotspots({
  hotspots,
  image,
}: {
  hotspots: Hotspot[];
  image: { alt: string; url: string };
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const current = hotspots[active];

  return (
    <div className="relative mx-auto aspect-4/3 w-full max-w-4xl">
      <Image
        alt={image.alt}
        className="object-contain mix-blend-multiply"
        fill
        sizes="(min-width: 896px) 56rem, 100vw"
        src={image.url}
      />
      {hotspots.map((spot, index) =>
        index === active ? (
          <div
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-lg bg-foreground/85 p-1 pl-3 text-small font-medium text-background shadow-soft backdrop-blur-md"
            key={spot.label}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            {spot.label}
            <button
              aria-expanded={open}
              aria-label={open ? `Close ${spot.label}` : `About the ${spot.label}`}
              className="grid size-8 place-items-center rounded-sm bg-background/10 hover:bg-background/20"
              onClick={() => setOpen(!open)}
              type="button"
            >
              {open ? <X className="size-4" /> : <Plus className="size-4" />}
            </button>
          </div>
        ) : (
          <button
            aria-label={`Show ${spot.label}`}
            className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
            key={spot.label}
            onClick={() => {
              setActive(index);
              setOpen(false);
            }}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            type="button"
          >
            <span className="absolute size-7 rounded-full bg-primary/25 motion-safe:animate-ping" />
            <span className="relative size-3.5 rounded-full bg-primary ring-4 ring-primary/30" />
          </button>
        ),
      )}
      {open && current && (
        <div className="absolute inset-x-4 bottom-4 z-20 grid gap-2 rounded-xl border border-hairline bg-background p-6 shadow-soft sm:inset-x-auto sm:right-4 sm:w-80">
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
