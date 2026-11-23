"use client";

import { useEffect, useRef } from "react";

export function CursorFollower() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!pointer.matches) return;
    const element = dot.current;
    if (!element) return;
    let frame = 0;

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      element!.style.transform = `translate3d(${event.clientX + 14}px, ${event.clientY + 14}px, 0)`;
      if (element!.style.opacity !== "1") {
        element!.style.transition = "none";
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          element!.style.transition = "transform 120ms ease-out";
        });
      }
      element!.style.opacity = "1";
    }
    function hide() {
      element!.style.opacity = "0";
    }
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0"
    >
      <span className="block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
    </div>
  );
}
