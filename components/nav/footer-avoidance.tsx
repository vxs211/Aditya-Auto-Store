"use client";

import { useEffect } from "react";

export function FooterAvoidance() {
  useEffect(() => {
    const nav = document.getElementById("nav-outer");
    const footer = document.querySelector("footer");
    if (!nav || !footer) return;

    let frame = 0;
    function update() {
      frame = 0;
      const height = nav!.offsetHeight;
      const offset = Math.max(-height, Math.min(0, footer!.getBoundingClientRect().top - height));
      nav!.style.transform = `translateY(${offset}px)`;
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    const observer = new ResizeObserver(schedule);
    observer.observe(nav);
    observer.observe(footer);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      nav.style.removeProperty("transform");
    };
  }, []);
  return null;
}
