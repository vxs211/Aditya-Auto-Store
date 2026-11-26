import { Inter_Tight } from "next/font/google";
import Image from "next/image";
import type { ReactNode } from "react";

import { CollectionBrowseFrame } from "@/components/collections/collection-browse-provider";
import { CollectionShopHeader } from "@/components/collections/collection-header";
import { BreadcrumbSchema } from "@/components/schema/breadcrumb-schema";
import { CollectionSchema } from "@/components/schema/collection-schema";
import { Container } from "@/components/ui/container";
import { ArrowRIcon } from "@/components/ui/icon";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { modelDisplayName } from "@/lib/collections";
import type { Collection, CollectionFitment } from "@/lib/collections/types";
import { shopConfig } from "@/lib/config";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

interface FitmentLayoutProps {
  children?: ReactNode;
  collection: Collection;
  fitment: CollectionFitment;
  productCount?: number;
}

// Brand pages list their models; model pages show the product grid passed as children, with no filters or sorting.
export function FitmentLayout({
  children,
  collection,
  fitment,
  productCount,
}: FitmentLayoutProps) {
  const { handle, title, updatedAt } = collection;
  const { body, brand, models } = fitment;
  const visibleModels =
    handle === "bajaj-chetak-accessories"
      ? models.filter(
          (model) =>
            model.handle !== "chetak-black-accessories" &&
            model.handle !== "chetak-c2501-black-accessories",
        )
      : models;
  // The banner metafield is rarely set; the collection image is a real picture of this scooter.
  const banner = fitment.banner ?? collection.image ?? null;
  const crumbs = [
    { name: "Home", path: "/" },
    ...(brand ? [{ name: brand.title, path: `/collections/${brand.handle}` }] : []),
    { name: brand ? modelDisplayName(title, handle) : title, path: `/collections/${handle}` },
  ];
  const compatibleWith = brand ? `${brand.title} ${title}` : title;
  // Model product pages get the compact shop header; brand tiles keep the banner layout.
  const isModelPage = models.length === 0;

  return (
    <Page className="pt-0 md:pt-0">
      <BreadcrumbSchema items={crumbs} />
      <CollectionSchema
        collection={{ description: collection.description, handle, title, updatedAt }}
      />
      <div aria-hidden="true" className="h-10 bg-[#F66101] sm:h-14" />
      <div
        aria-hidden="true"
        className="h-14 bg-[linear-gradient(180deg,#F66101_0%,#ff8a4d_45%,#ffe3d1_85%,#ffffff_100%)] sm:h-20"
      />
      {!isModelPage && (
        <section>
          <Container
            className={
              banner
                ? "grid items-center gap-8 py-10 md:grid-cols-2 md:py-14"
                : "grid gap-5 py-12 md:py-16"
            }
          >
            {banner && (
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-black/10 bg-white p-1.5 shadow-soft">
                <div className="relative size-full overflow-hidden rounded-[1.15rem]">
                  <Image
                    alt={banner.altText}
                    className="absolute inset-0 size-full object-cover"
                    fill
                    priority
                    sizes="100vw"
                    src={banner.url}
                  />
                </div>
              </div>
            )}
            <div className="grid justify-items-start gap-3">
              <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Collection
              </p>
              <h1 className={`${interTight.className} text-display font-semibold text-primary`}>
                {title}
              </h1>
              <p className="text-muted-foreground">Accessories made to fit {compatibleWith}</p>
            </div>
          </Container>
        </section>
      )}
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
            <ModelTiles models={visibleModels} />
          ) : (
            <div className="grid gap-4">
              <CollectionShopHeader count={productCount} title={modelDisplayName(title, handle)} />
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
    <ul
      className={`grid gap-4 sm:grid-cols-2 lg:gap-6${models.length > 2 ? " lg:grid-cols-3" : ""}`}
      data-reveal
    >
      {models.map(({ handle, image, productCount, title }) => (
        <li className="min-w-0" key={handle}>
          <Link
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-1.5 shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
            href={`/collections/${handle}`}
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-[1.15rem] bg-white sm:aspect-video">
              {image ? (
                <Image
                  alt={image.altText}
                  className="object-contain p-2"
                  fill
                  sizes="100vw"
                  src={image.url}
                />
              ) : (
                <ImagePlaceholder className="size-full" />
              )}
            </div>
            <div className="flex flex-1 flex-wrap items-end justify-between gap-4 p-5">
              <div className="grid min-w-0 gap-1">
                <h2
                  className={`${interTight.className} text-xl font-normal leading-tight wrap-anywhere text-foreground`}
                >
                  {modelDisplayName(title, handle)}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {productCount} {productCount === 1 ? "product" : "products"}
                </p>
              </div>
              <span className="inline-flex h-10 items-center gap-2 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] pl-3 pr-1 text-sm font-medium text-white shadow-md ring-1 ring-inset ring-white/25">
                View
                <span className="flex size-8 items-center justify-center rounded-full bg-white text-foreground transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
                  <ArrowRIcon aria-hidden="true" className="size-4" />
                </span>
              </span>
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
    <section
      className="grid gap-6 rounded-3xl border border-black/10 bg-[linear-gradient(135deg,#fff4ed_0%,#ffe6d7_48%,#ffffff_100%)] p-6 shadow-soft md:grid-cols-[1fr_2fr] md:p-10"
      data-reveal
    >
      <h2 className={`${interTight.className} text-h3`}>About {title}</h2>
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
      className="grid gap-5 rounded-3xl border border-primary-hover bg-[linear-gradient(135deg,#F66101_0%,#ff8a4d_55%,#ffb27a_100%)] p-8 text-white md:flex md:items-center md:justify-between md:p-12"
      data-reveal
    >
      <div>
        <h2 className="text-h3">Can't find your scooter?</h2>
        <p className="text-white/85">Message us the model and year and we'll help you choose.</p>
      </div>
      {whatsapp && (
        <Link
          className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-primary shadow-md"
          href={`https://wa.me/${whatsapp}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Chat on WhatsApp
        </Link>
      )}
    </section>
  );
}
