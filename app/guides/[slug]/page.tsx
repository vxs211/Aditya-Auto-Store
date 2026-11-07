import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BlogThumb, formatPostDate } from "@/components/blog/blog-thumb";
import { InlineText } from "@/components/blog/inline-text";
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { getFitmentBrands } from "@/lib/collections/server";
import { shopConfig } from "@/lib/config";
import { GUIDES, getGuide } from "@/lib/guides";
import { pickGuidePhotos } from "@/lib/guides/photos";
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

  const photos = pickGuidePhotos(GUIDES, await getFitmentBrands());
  const url = `${shopConfig.site.url}/guides/${guide.slug}`;
  const organization = {
    "@type": "Organization",
    name: shopConfig.site.name,
    url: shopConfig.site.url,
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: organization,
    dateModified: guide.published,
    datePublished: guide.published,
    description: guide.description,
    headline: guide.title,
    mainEntityOfPage: url,
    publisher: organization,
  };
  const faqSchema = guide.faqs && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map(({ answer, question }) => ({
      "@type": "Question",
      acceptedAnswer: { "@type": "Answer", text: answer },
      name: question,
    })),
  };
  const recent = GUIDES.filter(({ slug }) => slug !== guide.slug).slice(0, 4);

  return (
    <Page className="pt-0 md:pt-0">
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ]}
      />

      <Container className="grid max-w-4xl gap-6 pt-10 md:pt-16">
        <Link className="text-link hover:underline" href="/guides">
          All posts
        </Link>
        <h1 className="text-h1 text-balance">{guide.title}</h1>
        <p className="text-small text-muted-foreground">{formatPostDate(guide.published)}</p>
        <BlogThumb guide={guide} photo={photos.get(guide.slug)} priority />
      </Container>

      <Container className="max-w-3xl">
        <article className="grid gap-12 py-12 md:py-16">
          {guide.sections.map(({ heading, paragraphs, steps }) => (
            <section className="grid gap-4" key={heading}>
              <h2 className="font-heading text-h2">{heading}</h2>
              {paragraphs.map((paragraph) => (
                <p className="text-muted-foreground" key={paragraph}>
                  <InlineText text={paragraph} />
                </p>
              ))}
              {steps && (
                <ol className="grid gap-4">
                  {steps.map((step, index) => (
                    <li className="flex gap-4" key={step}>
                      <span className="flex size-8 shrink-0 items-center justify-center bg-primary font-heading font-semibold text-primary-foreground">
                        {index + 1}
                      </span>
                      <span className="pt-1 text-muted-foreground">
                        <InlineText text={step} />
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}

          {guide.faqs && (
            <section className="grid gap-6">
              <h2 className="font-heading text-h2">Questions</h2>
              {guide.faqs.map(({ answer, question }) => (
                <div className="grid gap-2" key={question}>
                  <h3 className="font-heading text-h4">{question}</h3>
                  <p className="text-muted-foreground">{answer}</p>
                </div>
              ))}
            </section>
          )}
        </article>
      </Container>

      <Container>
        <section className="mb-16 grid gap-5 bg-foreground p-8 text-background md:mb-24 md:flex md:items-center md:justify-between md:p-14">
          <div>
            <h2 className="text-h2">Ready to find your parts?</h2>
            <p className="text-silver">Pick your scooter and see what is made for it.</p>
          </div>
          <Button render={<Link href="/collections" />}>Shop by model</Button>
        </section>

        <section className="mb-16 grid gap-8 md:mb-24">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="font-heading text-h2">Recent posts</h2>
            <Link className="text-sm text-link hover:underline" href="/guides">
              View all posts
            </Link>
          </div>
          <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((item) => (
              <li key={item.slug}>
                <Link className="group grid gap-3" href={`/guides/${item.slug}`}>
                  <BlogThumb guide={item} photo={photos.get(item.slug)} />
                  <h3 className="font-heading text-h4 transition-colors group-hover:text-link">
                    {item.title}
                  </h3>
                  <p className="text-small text-muted-foreground">
                    {formatPostDate(item.published)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Page>
  );
}
