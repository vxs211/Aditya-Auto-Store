import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { shopConfig } from "@/lib/config";
import { GUIDES, getGuide } from "@/lib/guides";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const pathname = `/guides/${guide.slug}`;
  return {
    alternates: buildAlternates({ pathname }),
    description: guide.description,
    openGraph: buildOpenGraph({
      description: guide.description,
      title: guide.title,
      type: "article",
      url: pathname,
    }),
    title: guide.title,
  };
}

export default function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={null}>
      <GuideContent params={params} />
    </Suspense>
  );
}

async function GuideContent({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const url = `${shopConfig.site.url}/guides/${guide.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: { "@type": "Organization", name: shopConfig.site.name, url: shopConfig.site.url },
    dateModified: guide.published,
    datePublished: guide.published,
    description: guide.description,
    headline: guide.title,
    mainEntityOfPage: url,
    publisher: { "@type": "Organization", name: shopConfig.site.name, url: shopConfig.site.url },
  };
  const related = GUIDES.filter(({ slug }) => slug !== guide.slug);

  return (
    <Page className="pt-0 md:pt-0">
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ]}
      />
      <section className="bg-foreground text-background">
        <Container className="grid gap-4 py-12 md:py-20">
          <Link className="text-silver hover:text-background" href="/guides">
            All guides
          </Link>
          <h1 className="text-h1 max-w-3xl">{guide.title}</h1>
          <p className="max-w-2xl text-silver">{guide.description}</p>
        </Container>
      </section>

      <Container>
        <article className="grid max-w-3xl gap-12 py-16 md:py-20">
          {guide.sections.map(({ heading, paragraphs }) => (
            <section className="grid gap-4" key={heading}>
              <h2 className="font-heading text-h2">{heading}</h2>
              {paragraphs.map((paragraph) => (
                <p className="text-muted-foreground" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>

        <section className="mb-16 grid gap-5 bg-foreground p-8 text-background md:mb-24 md:flex md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="text-h2">Ready to find your parts?</h2>
            <p className="text-silver">Pick your scooter and see what is made for it.</p>
          </div>
          <Button render={<Link href="/collections" />}>Shop by model</Button>
        </section>

        {related.length > 0 && (
          <section className="mb-16 grid gap-4 md:mb-24">
            <h2 className="font-heading text-h3">More guides</h2>
            <ul className="grid gap-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link className="text-link" href={`/guides/${item.slug}`}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </Page>
  );
}
