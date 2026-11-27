import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BlogThumb, formatPostDate } from "@/components/blog/blog-thumb";
import { InlineText } from "@/components/blog/inline-text";
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { Container } from "@/components/ui/container";
import { ArrowRIcon, ChevronLeftIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { getFitmentBrands } from "@/lib/collections/server";
import { shopConfig } from "@/lib/config";
import { GUIDES, getGuide } from "@/lib/guides";
import { pickGuidePhotos } from "@/lib/guides/photos";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

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
        <Link
          className="inline-flex w-fit items-center gap-1 text-body font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
          href="/guides"
        >
          <ChevronLeftIcon aria-hidden="true" className="size-4" />
          All posts
        </Link>
        <h1 className="max-w-3xl text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.12] font-semibold tracking-[-0.1px] text-balance">
          {guide.title}
        </h1>
        <p className="text-small text-muted-foreground tabular-nums">
          {formatPostDate(guide.published)}
        </p>
        <BlogThumb guide={guide} photo={photos.get(guide.slug)} priority />
      </Container>

      <Container className="max-w-4xl">
        <article className="grid gap-12 py-12 md:py-16">
          {guide.sections.map(({ heading, paragraphs, steps }) => (
            <section className="grid max-w-[68ch] gap-4" key={heading}>
              <h2 className="font-heading text-3xl! leading-tight! tracking-[-0.1px] text-balance md:text-4xl!">
                {heading}
              </h2>
              {paragraphs.map((paragraph) => (
                <p className="text-lg leading-8 text-pretty text-foreground/80" key={paragraph}>
                  <InlineText text={paragraph} />
                </p>
              ))}
              {steps && (
                <ol className="grid gap-4">
                  {steps.map((step, index) => (
                    <li className="flex gap-4" key={step}>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-heading font-semibold text-primary-foreground tabular-nums">
                        {index + 1}
                      </span>
                      <span className="pt-0.5 text-lg leading-8 text-pretty text-foreground/80">
                        <InlineText text={step} />
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}

          {guide.faqs && (
            <section className="grid max-w-[68ch] gap-6">
              <h2 className="font-heading text-3xl! leading-tight! tracking-[-0.1px] text-balance md:text-4xl!">
                Questions
              </h2>
              {guide.faqs.map(({ answer, question }) => (
                <div className="grid gap-2" key={question}>
                  <h3 className="font-heading text-h4 text-balance">{question}</h3>
                  <p className="text-lg leading-8 text-pretty text-foreground/80">
                    <InlineText text={answer} />
                  </p>
                </div>
              ))}
            </section>
          )}
        </article>
      </Container>

      <Container>
        <section className="mb-16 grid gap-8 md:mb-24">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="font-heading text-3xl! leading-tight! tracking-[-0.1px] md:text-4xl!">
              Recent posts
            </h2>
            <Link
              className="text-sm font-medium text-foreground underline underline-offset-4"
              href="/guides"
            >
              View all posts
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((item) => (
              <li key={item.slug}>
                <Link
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card p-3 transition-shadow hover:shadow-card-hover sm:p-4"
                  href={`/guides/${item.slug}`}
                >
                  <BlogThumb
                    className="rounded-2xl bg-[#fff1e8]"
                    compact
                    guide={item}
                    photo={photos.get(item.slug)}
                  />
                  <span className="flex flex-1 flex-col gap-3 pt-3">
                    <span className="text-xs font-medium text-muted-foreground tabular-nums">
                      {formatPostDate(item.published)}
                    </span>
                    <h3
                      className={`${interTight.className} text-lg! leading-snug! font-semibold text-balance text-foreground`}
                    >
                      {item.title}
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
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Page>
  );
}
