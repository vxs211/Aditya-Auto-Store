"use client";

import { cn } from "cn";
import gsap from "gsap";
import { type ReactNode, type RefObject, useEffect, useRef } from "react";

interface DropdownPanelProps {
  children: ReactNode;
  className?: string;
  host: RefObject<HTMLLIElement | null>;
}

// The menu is pointer-driven (li hover/focus), so the tween only plays the motion: a slow
// lift-and-fade in while a pointer arrives, a fast fade out when it leaves. A short grace
// timer keeps the panel from flickering while the cursor crosses the gap to the card.
export function DropdownPanel({ children, className, host }: DropdownPanelProps) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const li = host.current;
    const el = panel.current;
    if (!li || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(el, {
      opacity: 0,
      visibility: "hidden",
      y: 10,
      scale: 0.98,
      transformOrigin: "top center",
    });

    let grace: ReturnType<typeof setTimeout> | undefined;

    function show() {
      clearTimeout(grace);
      gsap.killTweensOf(el);
      gsap.set(el, { visibility: "visible" });
      if (reduced) return gsap.set(el, { opacity: 1, scale: 1, y: 0 });
      gsap.to(el, { duration: 0.5, ease: "power3.out", opacity: 1, scale: 1, y: 0 });
    }

    function hide() {
      clearTimeout(grace);
      gsap.killTweensOf(el);
      if (reduced) return gsap.set(el, { opacity: 0, visibility: "hidden" });
      grace = setTimeout(() => {
        gsap.to(el, {
          duration: 0.18,
          ease: "power2.in",
          opacity: 0,
          y: 4,
          scale: 0.99,
          onComplete: () => gsap.set(el, { visibility: "hidden" }),
        });
      }, 120);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") hide();
    }

    li.addEventListener("mouseenter", show);
    li.addEventListener("mouseleave", hide);
    li.addEventListener("focusin", show);
    li.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(grace);
      gsap.killTweensOf(el);
      li.removeEventListener("mouseenter", show);
      li.removeEventListener("mouseleave", hide);
      li.removeEventListener("focusin", show);
      li.removeEventListener("keydown", onKey);
    };
  }, [host]);

  return (
    <div ref={panel} className={cn("invisible", className)}>
      {children}
    </div>
  );
}
