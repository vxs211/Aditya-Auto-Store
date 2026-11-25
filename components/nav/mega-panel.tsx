"use client";

import { cn } from "cn";
import { Inter_Tight } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { ArrowRIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import type { MenuItem } from "@/lib/menu/types";

import { MenuLink } from "./menu-link";

// The site's display face, so the menu reads with the rest of the nav.
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

// Slow, soft entrance; each piece sets its own delay so they arrive one after another.
const ENTER =
  "animate-[menu-in_900ms_cubic-bezier(0.16,1,0.3,1)_backwards] motion-reduce:animate-none";

export interface MegaCard {
  image: { altText: string; url: string };
  title: string;
  url: string;
}

export interface MegaDetail {
  caption: string;
  cards: MegaCard[];
  heading: string;
}

// The brand list on the left drives the heading and three model cards on the right. Hovering another brand
// fades the old set out quickly, then brings the new one in slowly, card by card.
export function MegaPanel({
  defaultId,
  details,
  entries,
}: {
  defaultId: string;
  details: Record<string, MegaDetail>;
  entries: MenuItem[];
}) {
  const root = useRef<HTMLDivElement>(null);
  // The last entry in the stack is current; the one before it stays underneath until the fade-in ends.
  const [stack, setStack] = useState([defaultId]);
  // Images load only once the menu has been hovered, so no page pays for them up front.
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const item = root.current?.closest("li");
    if (!item) return;
    const arm = () => setArmed(true);
    item.addEventListener("mouseenter", arm, { once: true });
    item.addEventListener("focusin", arm, { once: true });
    return () => {
      item.removeEventListener("mouseenter", arm);
      item.removeEventListener("focusin", arm);
    };
  }, []);

  const current = stack[stack.length - 1];

  // Once the new set has finished entering, drop the old one. A timer, not animationend, so it also works with
  // reduced motion.
  useEffect(() => {
    if (stack.length < 2) return;
    const timer = setTimeout(() => setStack((previous) => [previous[previous.length - 1]]), 1300);
    return () => clearTimeout(timer);
  }, [stack]);

  function activate(id: string) {
    if (!details[id]) return;
    setStack((previous) =>
      previous[previous.length - 1] === id ? previous : [previous[previous.length - 1], id],
    );
  }

  return (
    <Container className="grid grid-cols-[2fr_3fr] gap-16 pt-10 pb-12" ref={root}>
      <ul className="grid grid-cols-2 content-start gap-x-10">
        {entries.map((entry) => (
          <li
            key={entry.id}
            onFocus={() => activate(entry.id)}
            onMouseEnter={() => activate(entry.id)}
          >
            <MenuLink
              url={entry.url}
              // A plain string, not cn(): tailwind-merge reads text-link (a colour) and text-h4 (a size) as the same
              // group and would drop the size on the active link, shrinking it.
              className={`block py-3 text-h4 font-semibold transition-colors hover:text-link ${interTight.className}${entry.id === current ? " text-link" : ""}`}
            >
              {entry.title}
            </MenuLink>
          </li>
        ))}
      </ul>
      <div className="relative">
        {armed &&
          stack.map((id, index) => {
            const detail = details[id];
            if (!detail) return null;
            const stacked = stack.length > 1;
            const entering = stacked && index === stack.length - 1;
            const leaving = stacked && index === 0;
            return (
              <div
                className={cn(
                  "grid content-start gap-5",
                  entering && "absolute inset-0",
                  leaving &&
                    "pointer-events-none animate-[menu-out_140ms_ease-in_forwards] motion-reduce:animate-none",
                )}
                key={id}
              >
                <div
                  className={cn("flex items-baseline justify-between gap-4", entering && ENTER)}
                  style={entering ? { animationDelay: "120ms" } : undefined}
                >
                  <p className={`text-h3 ${interTight.className}`}>{detail.heading}</p>
                  <p className="text-small text-muted-foreground">{detail.caption}</p>
                </div>
                <ul className="grid grid-cols-3 gap-4">
                  {detail.cards.map((card, cardIndex) => (
                    <li
                      className={cn(entering && ENTER)}
                      key={card.url}
                      style={entering ? { animationDelay: `${180 + cardIndex * 90}ms` } : undefined}
                    >
                      <Link
                        className="group/card relative block aspect-4/5 overflow-hidden rounded-[1.15rem] bg-[linear-gradient(135deg,#fff4ed_0%,#ffe6d7_48%,#ff9d6c_100%)] ring-1 ring-black/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
                        href={card.url}
                      >
                        <Image
                          alt={card.image.altText || card.title}
                          className={cn(
                            "object-cover transition-transform duration-700 group-hover/card:scale-105",
                            entering &&
                              "animate-[menu-zoom_1400ms_cubic-bezier(0.16,1,0.3,1)_backwards] motion-reduce:animate-none",
                          )}
                          fill
                          sizes="100vw"
                          src={card.image.url}
                          style={
                            entering ? { animationDelay: `${180 + cardIndex * 90}ms` } : undefined
                          }
                        />
                        <span
                          className={`absolute right-3 bottom-3 left-3 flex items-center justify-between rounded-2xl bg-white/90 px-3.5 py-2 text-small font-medium text-foreground shadow-soft backdrop-blur-sm ${interTight.className}`}
                        >
                          {card.title}
                          <span
                            aria-hidden="true"
                            className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-white transition-transform group-hover/card:translate-x-0.5 motion-reduce:transform-none"
                          >
                            <ArrowRIcon className="size-3.5" />
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </Container>
  );
}
