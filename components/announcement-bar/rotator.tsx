"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";

interface Announcement {
  href?: string;
  message: string;
}

const ROTATE_MS = 5000;

export function AnnouncementRotator({ items }: { items: Announcement[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [count, paused]);

  const step = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const item = items[index];
  const arrow =
    "flex size-8 items-center justify-center rounded-lg outline-none hover:bg-background/10 focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div
      aria-label="Announcements"
      aria-roledescription="carousel"
      className="bg-foreground text-background"
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
    >
      <Container className="flex h-10 items-center justify-between gap-4">
        {count > 1 ? (
          <button
            aria-label="Previous announcement"
            className={arrow}
            onClick={() => step(-1)}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>
        ) : (
          <span className="size-8" />
        )}
        <p aria-live={paused ? "polite" : "off"} className="text-small text-center">
          {item.href ? (
            <Link className="underline underline-offset-4" href={item.href}>
              {item.message}
            </Link>
          ) : (
            item.message
          )}
        </p>
        {count > 1 ? (
          <button
            aria-label="Next announcement"
            className={arrow}
            onClick={() => step(1)}
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        ) : (
          <span className="size-8" />
        )}
      </Container>
    </div>
  );
}
