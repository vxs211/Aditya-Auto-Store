"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

// Slow on purpose: the highlight glides to the tapped item and the bar rises in on load.
const SLIDE = { duration: 0.6, ease: "power3.inOut" };
const ENTRANCE = { duration: 1.2, ease: "power3.out" };

export function BarMotion({ children, className }: { children: ReactNode; className: string }) {
  const nav = useRef<HTMLElement>(null);
  const highlight = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);
  const pathname = usePathname();

  // The bar rises in once.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // fromTo, not from: a repeated effect run (dev strict mode) would otherwise read the hidden start as the end.
    const tween = gsap.fromTo(
      nav.current,
      { opacity: 0, y: 120 },
      { opacity: 1, y: 0, ...ENTRANCE },
    );
    return () => {
      tween.kill();
    };
  }, []);

  // The highlight follows the active link, and re-fits if the bar is resized.
  useEffect(() => {
    const bar = nav.current;
    const pill = highlight.current;
    if (!bar || !pill) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function place(animate: boolean) {
      const active = bar?.querySelector<HTMLElement>('[data-active="true"]');
      if (!bar || !pill) return;
      if (!active) {
        gsap.to(pill, { opacity: 0, duration: animate && !reduced ? 0.5 : 0 });
        return;
      }
      const from = bar.getBoundingClientRect();
      const to = active.getBoundingClientRect();
      // The light runs along the top edge, so only its position and width follow the item.
      gsap.to(pill, {
        opacity: 1,
        width: to.width,
        x: to.left - from.left,
        ...(animate && !reduced ? SLIDE : { duration: 0 }),
      });
    }

    place(placed.current);
    placed.current = true;
    // Start gliding on the tap itself, not when the new route commits, so the highlight never trails the page.
    function onClick(event: MouseEvent) {
      const link = (event.target as Element).closest<HTMLElement>("a[data-active]");
      if (!link || link.dataset.active === "true") return;
      bar?.querySelectorAll("a[data-active]").forEach((item) => {
        item.setAttribute("data-active", String(item === link));
      });
      place(true);
    }
    bar.addEventListener("click", onClick, true);
    const observer = new ResizeObserver(() => place(false));
    observer.observe(bar);
    return () => {
      bar.removeEventListener("click", onClick, true);
      observer.disconnect();
    };
    // oxlint-disable-next-line react/exhaustive-effect-dependencies -- pathname is the trigger: re-fit the highlight on every route change.
  }, [pathname]);

  return (
    <nav aria-label="Primary" className={className} ref={nav}>
      {/* A thin light on the top edge with a soft glow falling from it onto the active item. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 opacity-0"
        ref={highlight}
      >
        <span className="absolute inset-x-[12%] top-0 h-0.5 bg-[linear-gradient(90deg,transparent,#fff,transparent)]" />
        <span className="absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_50%_0%,rgba(255,255,255,0.22),transparent_70%)]" />
      </span>
      {children}
    </nav>
  );
}
