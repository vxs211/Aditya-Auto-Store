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
      y: 6,
      scale: 0.92,
      transformOrigin: "top center",
    });

    // Grow out of the trigger: the scale origin is the trigger's horizontal centre.
    function originFromTrigger() {
      const parent = el!.offsetParent as HTMLElement | null;
      if (!li || !parent) return;
      const trigger = li.getBoundingClientRect();
      const x =
        trigger.left + trigger.width / 2 - parent.getBoundingClientRect().left - el!.offsetLeft;
      gsap.set(el, { transformOrigin: `${x}px 0px` });
    }

    let grace: ReturnType<typeof setTimeout> | undefined;
    // `open` stops focusin events from restarting the tween; `quietUntil` stops Escape's refocus from reopening it.
    let open = false;
    let quietUntil = 0;

    function show() {
      clearTimeout(grace);
      if (open || Date.now() < quietUntil) return;
      open = true;
      gsap.killTweensOf(el);
      originFromTrigger();
      gsap.set(el, { visibility: "visible" });
      if (reduced) return gsap.set(el, { opacity: 1, scale: 1, y: 0 });
      gsap.to(el, { duration: 0.45, ease: "power4.out", opacity: 1, scale: 1, y: 0 });
    }

    function hide() {
      clearTimeout(grace);
      open = false;
      gsap.killTweensOf(el);
      if (reduced) return gsap.set(el, { opacity: 0, visibility: "hidden" });
      grace = setTimeout(() => {
        gsap.to(el, {
          duration: 0.18,
          ease: "power2.out",
          opacity: 0,
          y: 4,
          scale: 0.96,
          onComplete: () => gsap.set(el, { visibility: "hidden" }),
        });
      }, 120);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      quietUntil = Date.now() + 400;
      li?.querySelector<HTMLElement>("a, button")?.focus();
      hide();
    }

    // Tabbing out of the menu closes it.
    function onFocusOut(event: FocusEvent) {
      if (!li?.contains(event.relatedTarget as Node | null)) hide();
    }

    // Following a link closes it straight away, so it never sits open over the next page.
    function closeNow() {
      clearTimeout(grace);
      open = false;
      quietUntil = Date.now() + 400;
      gsap.killTweensOf(el);
      gsap.set(el, { opacity: 0, visibility: "hidden" });
    }
    function onClick(event: MouseEvent) {
      if ((event.target as HTMLElement).closest("a")) closeNow();
    }

    li.addEventListener("mouseenter", show);
    li.addEventListener("mouseleave", hide);
    li.addEventListener("focusin", show);
    li.addEventListener("click", onClick);
    li.addEventListener("keydown", onKey);
    li.addEventListener("focusout", onFocusOut);
    return () => {
      clearTimeout(grace);
      gsap.killTweensOf(el);
      li.removeEventListener("mouseenter", show);
      li.removeEventListener("mouseleave", hide);
      li.removeEventListener("focusin", show);
      li.removeEventListener("click", onClick);
      li.removeEventListener("keydown", onKey);
      li.removeEventListener("focusout", onFocusOut);
    };
  }, [host]);

  return (
    <div ref={panel} className={cn("invisible", className)}>
      {children}
    </div>
  );
}
