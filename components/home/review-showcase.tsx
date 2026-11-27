"use client";

import { cn } from "cn";
import { Inter_Tight } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/components/ui/icon";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

export interface ShowcaseReview {
  author: string;
  avatar?: string;
  photo?: string;
  rating: number;
  role: string;
  tags: string[];
  text: string;
}

// How big and how faded a profile picture is by its distance from the selected one.
const AVATAR_SCALE = [1, 0.85, 0.72, 0.6, 0.5];
const AVATAR_OPACITY = [1, 0.9, 0.7, 0.45, 0.25];

function Avatar({ review }: { review: ShowcaseReview }) {
  return review.avatar ? (
    // oxlint-disable-next-line nextjs/no-img-element
    <img alt="" className="size-full rounded-full object-cover" src={review.avatar} />
  ) : (
    <span className="grid size-full place-items-center rounded-full bg-[#fff1e8] font-semibold text-foreground">
      {review.author.charAt(0).toUpperCase()}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-2">
      <span aria-label={`${rating} out of 5 stars`} className="flex gap-0.5" role="img">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            className={cn("size-5", star <= Math.round(rating) ? "text-primary" : "text-border")}
            fill="currentColor"
            key={star}
          />
        ))}
      </span>
      <span className="text-small text-muted-foreground tabular-nums">{rating.toFixed(1)}</span>
    </span>
  );
}

// How many slots are drawn on each side of the selected one.
const SPAN = 6;

const SLIDE =
  "transition-transform duration-700 ease-(--ease-out-soft) motion-reduce:transition-none";

// Profile pictures on top pick the review. Both rows slide together with the same motion, so the chosen
// picture and the chosen card always stay centred over each other.
export function ReviewShowcase({ reviews }: { reviews: ShowcaseReview[] }) {
  // `position` counts slots and never wraps: it can run past either end, and each slot shows review
  // (slot mod n). That keeps the carousel endless in both directions with one continuous slide.
  const total = reviews.length;
  const [position, setPosition] = useState(Math.min(4, Math.floor((total - 1) / 2)));
  const index = position;
  const go = (next: number) => setPosition(next);
  const slots = Array.from({ length: 2 * SPAN + 1 }, (_, offset) => position - SPAN + offset);
  const reviewAt = (slot: number) => reviews[((slot % total) + total) % total];

  return (
    <div
      className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10"
      onKeyDown={(e) =>
        e.key === "ArrowLeft" ? go(index - 1) : e.key === "ArrowRight" ? go(index + 1) : null
      }
    >
      <div
        aria-label="Choose a review"
        className="relative h-[calc(var(--pitch)*1.15)] overflow-hidden [--pitch:4.25rem] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:[--pitch:6.75rem]"
        role="tablist"
      >
        <ul
          className={cn("absolute top-0 left-1/2 h-full w-0", SLIDE)}
          style={{ transform: `translateX(calc(var(--pitch) * ${-index - 0.5}))` }}
        >
          {slots.map((i) => {
            const review = reviewAt(i);
            const distance = Math.abs(i - index);
            const near = Math.min(distance, 4);
            return (
              <li
                className="absolute top-0 grid h-full place-items-center"
                key={i}
                style={{ left: `calc(var(--pitch) * ${i})`, width: "var(--pitch)" }}
              >
                <button
                  aria-label={review.author}
                  aria-selected={i === index}
                  className={cn(
                    "size-[calc(var(--pitch)*0.95)] cursor-pointer rounded-full p-0.5 transition-[scale,opacity,box-shadow] duration-700 ease-(--ease-out-soft) motion-reduce:transition-none",
                    i === index
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-white"
                      : "ring-0 ring-primary/0",
                  )}
                  onClick={() => go(i)}
                  role="tab"
                  style={{
                    opacity: distance > 4 ? 0 : AVATAR_OPACITY[near],
                    scale: AVATAR_SCALE[near],
                  }}
                  tabIndex={i === index ? 0 : -1}
                  type="button"
                >
                  <Avatar review={review} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        aria-live="polite"
        className="relative -my-8 h-[27rem] overflow-hidden [--g:1.5rem] [--w:min(32rem,86vw)] [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] max-sm:h-[24rem]"
      >
        <ul
          className={cn("absolute inset-y-8 left-1/2 w-0", SLIDE)}
          style={{
            transform: `translateX(calc(var(--w) / -2 - ${index} * (var(--w) + var(--g))))`,
          }}
        >
          {slots.map((i) => {
            const review = reviewAt(i);
            const active = i === index;
            return (
              <li
                aria-hidden={!active}
                className={cn(
                  "absolute top-0 bottom-0 grid w-(--w) grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-3 rounded-2xl border p-3 transition-[opacity,border-color,background-color,box-shadow,scale] duration-700 ease-(--ease-out-soft) max-sm:grid-cols-1 max-sm:grid-rows-[auto_1fr] motion-reduce:transition-none",
                  active
                    ? "border-primary bg-muted shadow-xl"
                    : "scale-[0.97] border-transparent bg-muted opacity-50 shadow-sm",
                )}
                key={i}
                style={{ left: `calc((var(--w) + var(--g)) * ${i})` }}
              >
                <div className="flex min-h-0 flex-col gap-3 p-3 max-sm:flex-row max-sm:flex-wrap max-sm:items-center max-sm:gap-2 max-sm:p-1">
                  <p className="flex items-center gap-2 text-small font-medium text-foreground max-sm:basis-full">
                    <svg
                      aria-hidden
                      className="size-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
                    </svg>
                    Purchased
                  </p>
                  {review.photo ? (
                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-[#fff1e8] max-sm:size-14 max-sm:flex-none">
                      <Image
                        alt={`${review.author}'s scooter`}
                        className="object-contain object-center p-2 mix-blend-multiply"
                        fill
                        sizes="(min-width: 640px) 200px, 60vw"
                        src={review.photo}
                      />
                    </div>
                  ) : (
                    <div className="flex-1 max-sm:hidden" />
                  )}
                  <div className="flex flex-wrap gap-2 max-sm:min-w-0 max-sm:flex-1">
                    {review.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex min-w-0 flex-col justify-between gap-4 rounded-lg bg-white p-5 max-sm:justify-start max-sm:gap-3 max-sm:p-4">
                  <div className="flex items-center gap-3">
                    <span className="size-12 shrink-0">
                      <Avatar review={review} />
                    </span>
                    <span className="grid min-w-0">
                      <span
                        className={`${interTight.className} truncate text-lg leading-tight font-semibold text-foreground`}
                      >
                        {review.author}
                      </span>
                      <span className="truncate text-small text-muted-foreground">
                        {review.role}
                      </span>
                    </span>
                  </div>
                  <Stars rating={review.rating} />
                  <p className="text-body leading-relaxed text-foreground">“{review.text}”</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex justify-center gap-3">
        {[
          { icon: ChevronLeftIcon, label: "Previous review", next: index - 1 },
          { icon: ChevronRightIcon, label: "Next review", next: index + 1 },
        ].map(({ icon: Icon, label, next }) => (
          <Button
            aria-label={label}
            className="size-12 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] text-white shadow-lg ring-1 ring-white/25 ring-inset hover:shadow-xl"
            key={label}
            onClick={() => go(next)}
            size="icon-lg"
          >
            <Icon aria-hidden="true" className="size-5" />
          </Button>
        ))}
      </div>
    </div>
  );
}
