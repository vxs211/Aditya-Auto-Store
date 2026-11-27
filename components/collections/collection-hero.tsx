import localFont from "next/font/local";

import { HeroReveal } from "@/components/home/hero-reveal";

const might = localFont({
  src: "../../app/fonts/Might.ttf",
  display: "swap",
});

export function CollectionHero({ title, vehicle = false }: { title: string; vehicle?: boolean }) {
  return (
    <section className="relative flex h-dvh min-h-[32rem] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#F66101_0%,#ffffff_100%)]">
      <HeroReveal>
        <div
          className="absolute inset-0 flex items-center justify-center px-5 text-center"
          data-hero-text
        >
          {vehicle ? (
            <h1 className="text-white uppercase">
              <span
                className={`${might.className} whitespace-nowrap leading-[0.85] tracking-[-0.02em]`}
                style={{ fontSize: `min(${Math.min(30.44, 304.4 / title.length)}vw, 60dvh)` }}
              >
                {title}
              </span>
            </h1>
          ) : (
            <h1
              className={`${might.className} text-[clamp(3rem,12vw,12rem)] leading-[0.85] tracking-[-0.02em] text-white uppercase`}
            >
              {title}
            </h1>
          )}
        </div>
      </HeroReveal>
    </section>
  );
}
