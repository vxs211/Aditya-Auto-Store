import type { Metadata } from "next";
import { Suspense } from "react";

import { BlogThumb, formatPostDate } from "@/components/blog/blog-thumb";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { SectionHeading } from "@/components/ui/section-heading";
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
      <section className="bg-foreground text-background">
        <Container className="grid gap-4 py-12 md:py-20">
          <h1 className="text-display max-w-4xl">
            Parts, fitment and <Highlight>care</Highlight>
          </h1>
          <p className="max-w-2xl text-silver">
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
        <SectionHeading title="All posts" />
        <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide, index) => (
            <li key={guide.slug}>
              <Link className="group grid gap-4" href={`/guides/${guide.slug}`}>
                <div className="overflow-hidden">
                  <div className="transition-transform duration-700 group-hover:scale-[1.03]">
                    <BlogThumb guide={guide} photo={photos.get(guide.slug)} priority={index < 3} />
                  </div>
                </div>
                <h2 className="font-heading text-h4 transition-colors group-hover:text-link">
                  {guide.title}
                </h2>
                <p className="text-small text-muted-foreground">
                  {formatPostDate(guide.published)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
