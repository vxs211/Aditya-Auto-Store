import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { formatPostDate } from "@/components/blog/blog-thumb";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { getFitmentBrands } from "@/lib/collections/server";
import { GUIDES } from "@/lib/guides";
import { pickGuidePhotos } from "@/lib/guides/photos";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const TITLE = "Blog: scooter accessory guides";
const DESCRIPTION =
  "Guides to choosing, fitting and looking after scooter accessories, with real parts and prices, from Aditya Auto Accessories in Ahmedabad.";

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
      <section className="relative overflow-hidden bg-linear-to-br from-primary-tint via-white to-muted">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-32 size-96 rounded-full bg-primary/20 blur-3xl"
        />
        <Container className="relative grid gap-5 py-16 md:py-24">
          <span className="font-label text-xs uppercase tracking-widest text-link">
            Aditya Auto Accessories / The journal
          </span>
          <h1 className="text-display max-w-4xl">
            Parts, fitment and <Highlight>care</Highlight>
          </h1>
          <p className="max-w-2xl text-ink-soft sm:text-lg">
            Guides to choosing, fitting and looking after scooter accessories, from the people who
            make them.
          </p>
        </Container>
      </section>

      <Sections className="gap-20 py-16 md:gap-28 md:py-20">
        <Suspense fallback={null}>
          <Posts />
        </Suspense>
      </Sections>
    </Page>
  );
}

async function Posts() {
  const photos = pickGuidePhotos(GUIDES, await getFitmentBrands());
  return (
    <Container>
      <section className="grid gap-8" data-reveal>
        <div className="flex items-end justify-between gap-4 border-b border-hairline pb-5">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Latest stories
          </h2>
          <span className="font-label text-xs uppercase tracking-wider text-muted-foreground">
            The journal
          </span>
        </div>
        <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide, index) => {
            const photo = photos.get(guide.slug);
            return (
              <li key={guide.slug}>
                <Link
                  className="group grid h-full content-start gap-5"
                  href={`/guides/${guide.slug}`}
                >
                  <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-muted">
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
                  <div className="grid gap-3 border-b border-hairline pb-6">
                    <time
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      dateTime={guide.published}
                    >
                      {formatPostDate(guide.published)}
                    </time>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-link">
                        {guide.title}
                      </h3>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-5 shrink-0 text-link transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none"
                      />
                    </div>
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
