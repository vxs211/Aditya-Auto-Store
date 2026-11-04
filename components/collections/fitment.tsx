import Image from "next/image";
import type { ReactNode } from "react";

import { CollectionBrowseFrame } from "@/components/collections/collection-browse-provider";
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { CollectionSchema } from "@/components/schema/collection-schema";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import type { Collection, CollectionFitment } from "@/lib/collections/types";
import { shopConfig } from "@/lib/config";

interface FitmentLayoutProps {
  children?: ReactNode;
  collection: Collection;
  fitment: CollectionFitment;
}

// Brand pages list their models; model pages show the product grid passed as children, with no filters or sorting.
export function FitmentLayout({ children, collection, fitment }: FitmentLayoutProps) {
  const { handle, title, updatedAt } = collection;
  const { banner, body, brand, models } = fitment;
  const crumbs = [
    { name: "Home", path: "/" },
    ...(brand ? [{ name: brand.title, path: `/collections/${brand.handle}` }] : []),
    { name: title, path: `/collections/${handle}` },
  ];
  const compatibleWith = brand ? `${brand.title} ${title}` : title;

  return (
    <Page className="pt-0 md:pt-0">
      <BreadcrumbSchema items={crumbs} />
      <CollectionSchema
        collection={{ description: collection.description, handle, title, updatedAt }}
      />
      <section className="bg-foreground text-background">
        <Container className="grid items-center gap-6 py-8 md:grid-cols-2 md:py-12">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-white/10">
            {banner ? (
              <Image
                alt={banner.altText}
                className="object-cover"
                fill
                priority
                sizes="100vw"
                src={banner.url}
              />
            ) : (
              <ImagePlaceholder className="size-full" />
            )}
          </div>
          <div className="grid gap-3 md:text-right">
            <h1 className="text-display uppercase">{title}</h1>
            <p className="text-silver">Accessories made to fit {compatibleWith}</p>
          </div>
        </Container>
      </section>
      <Container>
        <Sections className="gap-8 pt-6 md:pt-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {crumbs.map(({ name, path }, index) => (
                <li className="flex items-center gap-2" key={path}>
                  {index > 0 && <span aria-hidden>/</span>}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-foreground">
                      {name}
                    </span>
                  ) : (
                    <Link className="hover:text-foreground" href={path}>
                      {name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {models.length > 0 ? (
            <ModelTiles models={models} />
          ) : (
            <div className="grid gap-4">
              {brand && (
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <Eyebrow className="text-link">Shop the collection</Eyebrow>
                    <h2 className="text-h2">{title}</h2>
                  </div>
                </div>
              )}
              <CollectionBrowseFrame handle={handle} path={`/collections/${handle}`}>
                {children}
              </CollectionBrowseFrame>
            </div>
          )}
          {body && <ContentCard body={body} title={title} />}
          <ContactBand />
        </Sections>
      </Container>
    </Page>
  );
}

function ModelTiles({ models }: { models: CollectionFitment["models"] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {models.map(({ handle, image, productCount, title }) => (
        <li key={handle}>
          <Link
            className="group grid overflow-hidden rounded-lg border border-border bg-background"
            href={`/collections/${handle}`}
          >
            <div className="relative aspect-4/3 overflow-hidden bg-muted">
              {image ? (
                <Image
                  alt={image.altText}
                  className="object-cover transition-transform group-hover:scale-105"
                  fill
                  sizes="100vw"
                  src={image.url}
                />
              ) : (
                <ImagePlaceholder className="size-full" />
              )}
            </div>
            <div className="grid gap-1 p-4">
              <h2 className="text-h4 uppercase">{title}</h2>
              <p className="text-sm text-muted-foreground">
                {productCount} {productCount === 1 ? "product" : "products"}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Rich text metafields arrive as JSON; only paragraphs and headings are rendered, as plain text.
function richTextParagraphs(value: string): string[] {
  type Node = { children?: Node[]; type?: string; value?: string };
  const text = (node: Node): string => node.value ?? (node.children ?? []).map(text).join("");
  try {
    const root = JSON.parse(value) as Node;
    return (root.children ?? []).map(text).filter(Boolean);
  } catch {
    return [];
  }
}

function ContentCard({ body, title }: { body: string; title: string }) {
  const paragraphs = richTextParagraphs(body);
  if (paragraphs.length === 0) return null;
  return (
    <section className="grid gap-4 rounded-lg border border-l-4 border-border border-l-primary p-6 md:grid-cols-[1fr_2fr] md:p-8">
      <h2 className="text-h3">About {title}</h2>
      <div className="grid gap-3 text-muted-foreground">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function ContactBand() {
  const { phone, whatsapp } = shopConfig.contact;
  if (!phone && !whatsapp) return null;
  return (
    <section className="grid gap-4 rounded-lg bg-foreground p-6 text-background md:flex md:items-center md:justify-between md:p-8">
      <div>
        <h2 className="text-h3">Can't find your scooter?</h2>
        <p className="text-silver">Message us the model and year and we'll help you choose.</p>
      </div>
      {whatsapp && (
        <Button
          render={
            <a href={`https://wa.me/${whatsapp}`} rel="noopener noreferrer" target="_blank" />
          }
        >
          Chat on WhatsApp
        </Button>
      )}
    </section>
  );
}
