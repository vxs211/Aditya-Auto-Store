"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ScrollVehicle {
  brand: string;
  href: string;
  image: { alt: string; url: string } | null;
  name: string;
  parts: string;
  tagline: string;
}

// Rivian-style line-up: the section pins and the scooters slide past, each over its own oversized name. Without
// motion (reduced motion or small screens) it falls back to a plain snap scroller.
export function VehicleScroll({ vehicles }: { vehicles: ScrollVehicle[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const list = track.current;
        if (!list) return;
        const distance = () => list.scrollWidth - window.innerWidth;
        gsap.to(list, {
          ease: "none",
          scrollTrigger: {
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            pin: true,
            scrub: 0.6,
            snap: { delay: 0.05, duration: 0.5, snapTo: 1 / (vehicles.length - 1) },
            trigger: section.current,
          },
          x: () => -distance(),
        });
      });
      return () => mm.revert();
    },
    { dependencies: [vehicles.length], scope: section },
  );

  return (
    <section aria-label="Scooters we make parts for" className="overflow-hidden" ref={section}>
      <ul
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide md:snap-none md:overflow-visible"
        ref={track}
      >
        {vehicles.map((vehicle) => (
          <li
            className="relative grid w-screen shrink-0 snap-center content-center justify-items-center gap-8 px-4 py-20 md:h-dvh md:py-0 md:pt-20"
            key={vehicle.href}
          >
            <div className="relative grid w-full max-w-5xl justify-items-center">
              <p
                aria-hidden
                className="pointer-events-none absolute top-0 text-[clamp(4.5rem,15vw,13rem)] leading-none font-semibold tracking-[-0.048em] whitespace-nowrap select-none"
              >
                {vehicle.name}
              </p>
              {vehicle.image ? (
                <div className="relative mt-[clamp(2.5rem,7vw,6rem)] aspect-4/3 w-full max-w-2xl">
                  <Image
                    alt={vehicle.image.alt}
                    className="object-contain mix-blend-multiply"
                    fill
                    sizes="(min-width: 768px) 42rem, 100vw"
                    src={vehicle.image.url}
                  />
                </div>
              ) : (
                <div className="mt-[clamp(2.5rem,7vw,6rem)] aspect-4/3 w-full max-w-2xl" />
              )}
            </div>
            <div className="grid max-w-xl justify-items-center gap-2 text-center">
              <h3 className="text-h3">{vehicle.tagline}</h3>
              <p className="text-muted-foreground">
                {vehicle.brand} {vehicle.name} · {vehicle.parts}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button render={<Link href={vehicle.href} />}>Shop parts</Button>
                <Button render={<Link href="/collections" />} variant="outline">
                  All scooters
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
