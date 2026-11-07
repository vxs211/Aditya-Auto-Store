"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const TWEEN = { duration: 0.5, ease: "power3.out" };

// A fact card that turns orange and tightens on hover. Mouse only: touch screens keep the white card.
export function ProofCard({ body, index, title }: { body: string; index: number; title: string }) {
  const card = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const text = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      // Resolve theme variables to rgb, which gsap can blend.
      const probe = document.createElement("span");
      el.append(probe);
      const rgb = (value: string) => {
        probe.style.color = value;
        return getComputedStyle(probe).color;
      };
      const on = rgb("var(--background)"); // white on the orange fill, as in the reference
      const fill = rgb("var(--primary)");
      const base = {
        bg: rgb("var(--background)"),
        body: rgb("var(--muted-foreground)"),
        ink: getComputedStyle(el).color,
        number: rgb("var(--primary)"),
        size: getComputedStyle(number.current as Element).fontSize,
      };
      probe.remove();

      const enter = () => {
        gsap.to(el, { backgroundColor: fill, color: on, ...TWEEN });
        gsap.to(number.current, { color: on, fontSize: "0.625rem", ...TWEEN });
        gsap.to(text.current, { color: on, opacity: 0.8, ...TWEEN });
      };
      const leave = () => {
        gsap.to(el, { backgroundColor: base.bg, color: base.ink, ...TWEEN });
        gsap.to(number.current, { color: base.number, fontSize: base.size, ...TWEEN });
        gsap.to(text.current, { color: base.body, opacity: 1, ...TWEEN });
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="grid gap-9 bg-background p-6 md:gap-14 md:p-7" ref={card}>
      <span aria-hidden className="font-label text-h3 text-primary" ref={number}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <dt className="text-h3">{title}</dt>
        <dd className="mt-2 text-muted-foreground" ref={text}>
          {body}
        </dd>
      </div>
    </div>
  );
}
