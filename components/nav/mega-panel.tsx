"use client";

import { cn } from "cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { ArrowRIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import type { MenuItem } from "@/lib/menu/types";

import { MenuLink } from "./menu-link";

// The site's display face, so the menu reads with the rest of the nav.
// Slow, soft entrance; each piece sets its own delay so they arrive one after another.
const ENTER =
  "animate-[menu-in_900ms_cubic-bezier(0.16,1,0.3,1)_backwards] motion-reduce:animate-none";

// Brand logo files in /public/brand/manufacturers, matched by the collection handle in the entry URL.
const BRAND_LOGOS: Partial<Record<string, string>> = {
  "bajaj-chetak-accessories": "bajaj",
  honda: "honda",
  "suzuki-accessories": "suzuki",
  "tvs-accessories": "tvs",
  "yamaha-accessories": "yamaha",
};

function brandLogo(url: string) {
  const logo = BRAND_LOGOS[url.split("/").filter(Boolean).pop() ?? ""];
  return logo ? `/brand/manufacturers/${logo}.svg` : undefined;
}

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
    <Container className="grid grid-cols-[1.2fr_3fr] gap-10 pt-10 pb-8" ref={root}>
      <ul className="grid content-start gap-2">
        {entries.map((entry) => (
          <li
            key={entry.id}
            onFocus={() => activate(entry.id)}
            onMouseEnter={() => activate(entry.id)}
          >
            <MenuLink
              url={entry.url}
              className={`flex items-center justify-between gap-2 rounded-full px-4 py-3 text-base font-semibold transition-[background-color,box-shadow] font-sans ${entry.id === current ? "bg-white shadow-card" : "hover:bg-[#fff1e8]"}`}
            >
              <span className="flex min-w-0 items-center gap-3">
                {brandLogo(entry.url) && (
                  <Image
                    alt=""
                    className="h-7 w-14 shrink-0 object-contain object-left"
                    height={28}
                    src={brandLogo(entry.url) ?? ""}
                    width={56}
                  />
                )}
                <span className="truncate">{entry.title}</span>
              </span>
              <ArrowRIcon
                aria-hidden="true"
                className={`size-4 shrink-0 transition-opacity ${entry.id === current ? "opacity-100" : "opacity-0"}`}
              />
            </MenuLink>
          </li>
        ))}
      </ul>
      <div className="grid">
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
                  "grid content-start gap-5 [grid-area:1/1]",
                  leaving &&
                    "pointer-events-none animate-[menu-out_140ms_ease-in_forwards] motion-reduce:animate-none",
                )}
                inert={leaving}
                key={id}
              >
                <div
                  className={cn("flex items-center justify-between gap-4", entering && ENTER)}
                  style={entering ? { animationDelay: "120ms" } : undefined}
                >
                  <p className={`text-2xl leading-tight font-semibold font-sans`}>
                    {detail.heading}
                  </p>
                  <p className="rounded-full bg-[#fff1e8] px-3 py-1 text-small text-foreground tabular-nums">
                    {detail.caption}
                  </p>
                </div>
                <ul className="grid grid-cols-[repeat(3,minmax(0,1fr))] content-start gap-4">
                  {detail.cards.map((card, cardIndex) => (
                    <li
                      className={cn("h-full min-w-0", entering && ENTER)}
                      key={card.url}
                      style={entering ? { animationDelay: `${180 + cardIndex * 90}ms` } : undefined}
                    >
                      <Link
                        className="group/card grid h-full min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-3 rounded-2xl bg-white p-3 shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:transform-none motion-reduce:transition-none"
                        href={card.url}
                      >
                        <span className="relative block aspect-square overflow-hidden rounded-2xl bg-white">
                          <Image
                            alt={card.image.altText || card.title}
                            className={cn(
                              "object-contain p-1 transition-transform duration-700 group-hover/card:scale-105",
                              entering &&
                                "animate-[menu-zoom_1400ms_cubic-bezier(0.16,1,0.3,1)_backwards] motion-reduce:animate-none",
                            )}
                            fill
                            sizes="(min-width: 1024px) 260px, 100vw"
                            src={card.image.url}
                            style={
                              entering ? { animationDelay: `${180 + cardIndex * 90}ms` } : undefined
                            }
                          />
                        </span>
                        <span
                          className={`flex items-center justify-between gap-2 px-1 pb-0.5 text-small leading-tight font-semibold text-foreground font-sans`}
                        >
                          <span
                            className="line-clamp-2 min-h-[2lh] min-w-0 wrap-anywhere"
                            title={card.title}
                          >
                            {card.title}
                          </span>
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
