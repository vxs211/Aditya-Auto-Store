import Image from "next/image";
import type { ReactNode } from "react";

import { CollectionBrowseFrame } from "@/components/collections/collection-browse-provider";
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { CollectionSchema } from "@/components/schema/collection-schema";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { modelDisplayName } from "@/lib/collections";
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
  const { body, brand, models } = fitment;
  // The banner metafield is rarely set; the collection image is a real picture of this scooter.
  const banner = fitment.banner ?? collection.image ?? null;
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
        <Container
          className={
            banner
              ? "grid items-center gap-8 py-10 md:grid-cols-2 md:py-14"
              : "grid gap-5 py-14 md:py-20"
          }
        >
          {banner && (
            <div className="relative aspect-video overflow-hidden">
              <Image
                alt={banner.altText}
                className="object-cover"
                fill
                priority
                sizes="100vw"
                src={banner.url}
              />
            </div>
          )}
          <div className="grid gap-3">
            <h1 className="text-display uppercase">{title}</h1>
            <p className="text-silver">Accessories made to fit {compatibleWith}</p>
          </div>
        </Container>
      </section>
      <Container>
        <Sections className="gap-16 pt-6 md:gap-20 md:pt-8">
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
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6" data-reveal>
      {models.map(({ handle, image, productCount, title }) => (
        <li key={handle}>
          <Link className="group grid overflow-hidden bg-muted" href={`/collections/${handle}`}>
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
              <h2 className="text-h4 uppercase">{modelDisplayName(title)}</h2>
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
    <section className="grid gap-6 bg-muted p-6 md:grid-cols-[1fr_2fr] md:p-10" data-reveal>
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
    <section
      className="grid gap-5 bg-foreground p-8 text-background md:flex md:items-center md:justify-between md:p-12"
      data-reveal
    >
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
