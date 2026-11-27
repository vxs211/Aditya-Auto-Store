"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

import { useCartDrawer } from "@/components/cart/context";
import { XIcon } from "@/components/ui/icon";

// The highlight is tied to the page load: a tap starts a slow glide toward the item (HOLD), and when the new
// route commits it finishes quickly (FINISH). A fast load snaps over almost at once; a slow load is tracked.
const HOLD = { duration: 4, ease: "power2.out" };
const FINISH = { duration: 0.3, ease: "power3.out" };
const SLIDE = { duration: 0.45, ease: "power3.out" };
const ENTRANCE = { duration: 1.2, ease: "power3.out" };

export function BarMotion({ children, className }: { children: ReactNode; className: string }) {
  const nav = useRef<HTMLElement>(null);
  const highlight = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);
  const pending = useRef(false);
  const pathname = usePathname();
  const { isOverlayOpen, menuOpen, setMenuOpen, setOverlayOpen } = useCartDrawer();
  // While the cart or menu card is open, the whole pill becomes one Close button.
  const closing = isOverlayOpen || menuOpen;

  // The bar rises in once.
  useEffect(() => {
    if (!playsEntrance()) return;
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

    function place(animate: boolean, timing: { duration: number; ease: string } = SLIDE) {
      const active = bar?.querySelector<HTMLElement>('[data-active="true"]');
      if (!bar || !pill) return;
      if (!active) {
        gsap.to(pill, { opacity: 0, duration: animate && !reduced ? 0.5 : 0 });
        return;
      }
      const from = bar.getBoundingClientRect();
      const to = active.getBoundingClientRect();
      gsap.to(pill, {
        height: to.height,
        opacity: 1,
        overwrite: "auto",
        width: to.width,
        x: to.left - from.left,
        y: to.top - from.top,
        ...(animate && !reduced ? timing : { duration: 0 }),
      });
    }

    // A tap that started a hold finishes now that the route has committed.
    place(placed.current, pending.current ? FINISH : SLIDE);
    pending.current = false;
    placed.current = true;
    // Start gliding on the tap itself, not when the new route commits, so the highlight never trails the page.
    function onClick(event: MouseEvent) {
      const link = (event.target as Element).closest<HTMLElement>("a[data-active]");
      if (!link || link.dataset.active === "true") return;
      bar?.querySelectorAll("a[data-active]").forEach((item) => {
        item.setAttribute("data-active", String(item === link));
      });
      pending.current = true;
      place(true, HOLD);
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
    <nav aria-label="Primary" className={className} data-closing={closing} ref={nav}>
      <button
        aria-label="Close"
        className="bar-round absolute inset-0 z-20 flex cursor-pointer items-center justify-center gap-2 bg-primary text-base font-semibold text-white opacity-0 blur-sm transition-[opacity,filter,scale] duration-300 ease-(--ease-out-soft) pointer-events-none active:scale-[0.98] data-[open=true]:pointer-events-auto data-[open=true]:opacity-100 data-[open=true]:blur-none motion-reduce:transition-none"
        data-open={closing}
        onClick={() => {
          setOverlayOpen(false);
          setMenuOpen(false);
        }}
        tabIndex={closing ? 0 : -1}
        type="button"
      >
        <XIcon className="size-5" />
        Close
      </button>
      {/* The capsule behind the active item. */}
      <span
        aria-hidden
        className="bar-round pointer-events-none absolute top-0 left-0 bg-primary opacity-0"
        ref={highlight}
      />
      {children}
    </nav>
  );
}

// The entrance plays only when the visit started on the home page.
function playsEntrance() {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    document.documentElement.dataset.firstHome === "1"
  );
}

// The round search button rises in with the same motion as the bar.
export function BarRise({ children, className }: { children: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!playsEntrance()) return;
    const tween = gsap.fromTo(
      box.current,
      { opacity: 0, y: 120 },
      { opacity: 1, y: 0, ...ENTRANCE },
    );
    return () => {
      tween.kill();
    };
  }, []);
  return (
    <div className={className} ref={box}>
      {children}
    </div>
  );
}
