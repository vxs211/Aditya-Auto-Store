"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type ReactNode, useRef } from "react";

gsap.registerPlugin(useGSAP);

interface HeroRevealProps {
  children: ReactNode;
}

export function HeroReveal({ children }: HeroRevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-hero-text]",
          { maskImage: "radial-gradient(circle at center, #000 0%, transparent 45%)", opacity: 0 },
          {
            clearProps: "maskImage,opacity",
            duration: 2.8,
            ease: "sine.inOut",
            maskImage: "radial-gradient(circle at center, #000 100%, transparent 145%)",
            opacity: 1,
          },
        );
        gsap.fromTo(
          "[data-hero-vehicles]",
          { opacity: 0, y: 64 },
          {
            clearProps: "transform,opacity",
            delay: 0.2,
            duration: 2.6,
            ease: "power3.out",
            opacity: 1,
            y: 0,
          },
        );
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div className="absolute inset-0" ref={root}>
      {children}
    </div>
  );
}
