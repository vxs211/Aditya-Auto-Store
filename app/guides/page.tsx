import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import Image from "next/image";
import { Suspense } from "react";

import { formatPostDate } from "@/components/blog/blog-thumb";
import { Container } from "@/components/ui/container";
import { ArrowRIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFitmentBrands } from "@/lib/collections/server";
import { GUIDES } from "@/lib/guides";
import { pickGuidePhotos } from "@/lib/guides/photos";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const TITLE = "Blog: scooter accessory guides";
const DESCRIPTION =
  "Guides to choosing, fitting and looking after scooter accessories, with real parts and prices, from Aditya Auto Accessories in Ahmedabad.";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/guides" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: TITLE,
    type: "website",
    url: "/guides",
  }),
};

export default function GuidesPage() {
  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-white pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-24 lg:pb-12">
        <Container className="grid justify-items-center gap-3 text-center">
          <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
            The journal
          </p>
          <SectionHeading align="center" title="Parts, fitment and care" />
          <p className="max-w-xl text-body text-pretty text-muted-foreground">
            Guides to choosing, fitting and looking after scooter accessories, from the people who
            make them.
          </p>
        </Container>
      </section>

      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <Suspense fallback={null}>
          <Posts />
        </Suspense>
      </section>
    </Page>
  );
}

async function Posts() {
  const photos = pickGuidePhotos(GUIDES, await getFitmentBrands());
  return (
    <Container>
      <section data-reveal>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide, index) => {
            const photo = photos.get(guide.slug);
            return (
              <li key={guide.slug}>
                <Link
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card p-3 transition-shadow hover:shadow-card-hover sm:p-4"
                  href={`/guides/${guide.slug}`}
                >
                  <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-[#fff1e8]">
                    {photo && (
                      <Image
                        alt={photo.alt}
                        className="object-contain object-center mix-blend-multiply transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
                        fill
                        priority={index < 3}
                        sizes="100vw"
                        src={photo.url}
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 pt-3">
                    <time
                      className="text-xs font-medium text-muted-foreground tabular-nums"
                      dateTime={guide.published}
                    >
                      {formatPostDate(guide.published)}
                    </time>
                    <h3
                      className={`${interTight.className} text-xl leading-tight font-semibold text-balance text-foreground`}
                    >
                      {guide.title}
                    </h3>
                    <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#F66101] py-0.5 pr-0.5 pl-3 text-xs font-medium text-white">
                      Read article
                      <span className="flex size-6 items-center justify-center rounded-full bg-white text-foreground">
                        <ArrowRIcon
                          aria-hidden="true"
                          className="size-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                        />
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}
