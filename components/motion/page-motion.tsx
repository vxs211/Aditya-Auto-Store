"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

// One motion layer for the whole site: anything marked data-reveal rises in as it enters.
// Marking is an attribute, so server components keep their markup and nothing is hidden when
// this script does not run.
export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let context: gsap.Context | undefined;
    let frame = 0;

    // Wait for load: streamed sections finish hydrating by then, so GSAP's inline styles never
    // land on markup React is still matching against the server HTML.
    const start = () => {
      frame = requestAnimationFrame(() => {
        context = gsap.context(() => {
          // Never touch the first screen: it is the LCP content, and animating it races with
          // hydration. Only what starts below the fold reveals.
          const revealed = gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .filter((element) => element.getBoundingClientRect().top > window.innerHeight * 0.9);
          if (revealed.length > 0) {
            // from(), never a pre-hide: an element is only touched once it enters, so a failed
            // or slow script leaves the page readable instead of blank.
            ScrollTrigger.batch(revealed, {
              once: true,
              onEnter: (batch) =>
                gsap.from(batch, {
                  duration: 0.65,
                  ease: "power2.out",
                  opacity: 0,
                  overwrite: true,
                  stagger: 0.08,
                  y: 28,
                }),
              start: "top 92%",
            });
          }

          // Late images still change the page height after the triggers are made.
          ScrollTrigger.refresh();
        });
      });
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      cancelAnimationFrame(frame);
      context?.revert();
    };
  }, [pathname]);

  return null;
}
