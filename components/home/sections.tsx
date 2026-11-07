import Image from "next/image";

import { BlogThumb, formatPostDate } from "@/components/blog/blog-thumb";
import { ProductCard } from "@/components/product-card/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandDisplayName, modelDisplayName } from "@/lib/collections";
import { getCollectionResults, getFitmentBrands } from "@/lib/collections/server";
import type { FitmentBrand } from "@/lib/collections/types";
import { shopConfig } from "@/lib/config";
import { GUIDES } from "@/lib/guides";
import { pickGuidePhotos } from "@/lib/guides/photos";

import { ProofCard } from "./proof-card";

export async function HomeHero() {
  // The lead brand's own photograph: a real scooter wearing the parts, not a stock picture.
  const lead = (await getFitmentBrands()).find((brand) => brand.image);

  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto grid max-w-312 items-center gap-8 px-4 pt-14 lg:grid-cols-2 lg:gap-10 lg:px-6 lg:pt-0">
        <div className="grid gap-7 lg:py-28">
          <h1 className="text-display">
            Made to fit your <Highlight>scooter</Highlight>.
          </h1>
          <p className="max-w-md text-silver">
            Footrests, bumpers, crash guards, matting and seat covers in stainless steel, for Honda,
            TVS, Suzuki, Hero, Yamaha, Bajaj Chetak and electric scooters. One piece or in bulk.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button render={<Link href="/collections" />} size="lg">
              Shop by model
            </Button>
            <Button render={<Link href="/collections/all" />} size="lg" variant="inverse">
              See all products
            </Button>
          </div>
        </div>
        {lead?.image && (
          <div
            className="relative -mx-4 aspect-4/3 lg:mx-0 lg:aspect-auto lg:h-[36rem]"
            data-reveal
          >
            <Image
              alt={lead.image.altText}
              className="object-cover"
              fill
              priority
              sizes="100vw"
              src={lead.image.url}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export async function ModelStrip() {
  const brands = await getFitmentBrands();
  const models = brands.flatMap((brand) => brand.models).filter((model) => model.image);
  if (models.length === 0) return null;

  return (
    <Container>
      <section className="grid gap-6" data-reveal>
        <SectionHeading
          title={
            <>
              Find your <Highlight>scooter</Highlight>
            </>
          }
        />
        {/* A plain scroller: no autoplay, so it needs no motion preference handling. */}
        <ul className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {models.map(({ handle, image, title }) => (
            <li className="w-56 shrink-0 snap-start md:w-64" key={handle}>
              <Link className="group grid gap-2" href={`/collections/${handle}`}>
                <div className="relative aspect-4/3 overflow-hidden bg-muted">
                  {image && (
                    <Image
                      alt={image.altText}
                      className="object-cover transition-transform group-hover:scale-105"
                      fill
                      sizes="100vw"
                      src={image.url}
                    />
                  )}
                </div>
                <p className="font-semibold">{modelDisplayName(title)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

export async function BestSellers() {
  const { products } = await getCollectionResults({ handle: "best-sellers" });
  if (products.length === 0) return null;

  return (
    <Container>
      <section className="grid gap-5" data-reveal>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <SectionHeading title="Best sellers" />
          <Link className="text-sm text-link hover:underline" href="/collections/best-sellers">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard
              key={product.id}
              loading={index < 4 ? "eager" : "lazy"}
              outOfStockText="Out of stock"
              product={product}
              quickShopText="Choose"
            />
          ))}
        </div>
      </section>
    </Container>
  );
}

// The newest posts as picture cards, the same as on the blog page.
export async function BlogSection() {
  const photos = pickGuidePhotos(GUIDES, await getFitmentBrands());
  const latest = GUIDES.slice(0, 4);
  if (latest.length === 0) return null;

  return (
    <section className="bg-muted py-14 md:py-20">
      <Container className="grid gap-8" data-reveal>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <SectionHeading
            title={
              <>
                Our <Highlight>blog</Highlight>
              </>
            }
          />
          <Link className="text-sm text-link hover:underline" href="/guides">
            View all
          </Link>
        </div>
        <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((guide) => (
            <li key={guide.slug}>
              <Link className="group grid gap-3" href={`/guides/${guide.slug}`}>
                <BlogThumb guide={guide} photo={photos.get(guide.slug)} />
                <h3 className="font-heading text-h4 transition-colors group-hover:text-link">
                  {guide.title}
                </h3>
                <p className="text-small text-muted-foreground">
                  {formatPostDate(guide.published)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// A grid of our scooter photographs that links to the Instagram page. These are catalogue pictures, not a live
// feed of posts; a real feed would need the Instagram API.
export async function InstagramFeed() {
  const url = shopConfig.social.instagram;
  if (!url) return null;
  // Scooter photographs from the model pages, one per brand in turn so the grid stays varied.
  const brands = await getFitmentBrands();
  const seen = new Set<string>();
  const pictures: { alt: string; src: string }[] = [];
  for (let round = 0; pictures.length < 9 && round < 6; round += 1) {
    for (const brand of brands) {
      const model = brand.models[round];
      if (model?.image && !seen.has(model.image.url) && pictures.length < 9) {
        seen.add(model.image.url);
        pictures.push({ alt: model.image.altText || model.title, src: model.image.url });
      }
    }
  }
  if (pictures.length < 9) return null;
  // The fifth picture is the big centre tile; the rest fill the squares around it.
  const [first, second, third, fourth, centre, ...rest] = pictures;
  const ordered = [centre, first, second, third, fourth, ...rest];

  return (
    <Container>
      <section className="grid gap-10" data-reveal>
        <div className="grid justify-items-center gap-3 text-center">
          <SectionHeading
            align="center"
            title={
              <>
                Follow us on <Highlight>Instagram</Highlight>
              </>
            }
          />
          <p className="max-w-xl text-muted-foreground">
            New parts, fitments and how they look on the scooter.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] md:grid-rows-2 md:gap-4">
          {ordered.map((picture, index) => (
            <li
              className={
                index === 0
                  ? "col-span-2 md:col-span-1 md:col-start-3 md:row-span-2 md:row-start-1"
                  : undefined
              }
              key={picture.src}
            >
              <a
                // The centre tile takes its height from the two rows beside it, so it must not also derive its width from it.
                className={`group relative block aspect-square overflow-hidden bg-muted md:h-full${index === 0 ? " md:aspect-auto" : ""}`}
                href={url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  alt={`${picture.alt} on Instagram`}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  fill
                  sizes="100vw"
                  src={picture.src}
                />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <Button render={<a href={url} rel="noopener noreferrer" target="_blank" />} size="lg">
            Visit Instagram
          </Button>
        </div>
      </section>
    </Container>
  );
}

export function AboutIntro() {
  return (
    <section className="bg-muted py-14 md:py-20">
      <Container className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-10" data-reveal>
        <SectionHeading title="We make what we sell" />
        <div className="grid gap-4 text-muted-foreground">
          <p>
            Aditya Auto Accessories manufactures two wheeler accessories in Ahmedabad, Gujarat. Our
            unit makes parts for scooters, motorcycles and electric vehicles, in Jindal 202
            stainless steel that resists heat, chemicals and rust.
          </p>
          <p>
            Every part is listed under the scooter it is made for, carries our manufacturing mark
            and the date it was made, and is checked by the people who build it.
          </p>
          <Button className="justify-self-start" render={<Link href="/about" />} variant="outline">
            About us
          </Button>
        </div>
      </Container>
    </section>
  );
}

// Collection titles carry suffixes like "Scooter Accessories"; tiles show the brand alone.
function brandName(title: string): string {
  return (
    title
      .replace(/\s*(bike and scooter|two wheeler[a-z]*|scooter|bike)?\s*accessories$/i, "")
      .trim() || title
  );
}

export async function BrandMosaic() {
  // Shopify returns collections alphabetically; lead with the brands that cover the most models.
  const brands = (await getFitmentBrands())
    .filter((brand) => brandPicture(brand))
    .sort((a, b) => b.models.length - a.models.length);
  if (brands.length === 0) return null;
  const [lead, ...rest] = brands as [FitmentBrand, ...FitmentBrand[]];

  return (
    <Container>
      <section className="grid gap-5" data-reveal>
        <SectionHeading
          title={
            <>
              Shop by <Highlight>category</Highlight>
            </>
          }
        />
        <div className="grid gap-4 md:auto-rows-[18rem] md:grid-cols-[3fr_2fr_2fr]">
          <BrandTile brand={lead} className="md:row-span-2" priority />
          {rest.slice(0, 4).map((brand) => (
            <BrandTile brand={brand} key={brand.handle} />
          ))}
        </div>
        {rest.length > 4 && (
          <ul className="flex flex-wrap gap-3">
            {rest.slice(4).map(({ handle, title }) => (
              <li key={handle}>
                <Button render={<Link href={`/collections/${handle}`} />} variant="outline">
                  {brandDisplayName(title)}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}

// The brand banner is often wide artwork with text on it, so the tile uses a clean scooter photograph from one of
// the brand's models, and falls back to the banner only when no model has a picture.
function brandPicture(brand: FitmentBrand) {
  return brand.models.find((model) => model.image)?.image ?? brand.image;
}

// A photo-led tile: the brand name sits top left and the scooter stands at the bottom. Multiply makes the white of
// the photograph take the tile colour, so there is no visible box around the scooter.
function BrandTile({
  brand,
  className,
  priority,
}: {
  brand: FitmentBrand;
  className?: string;
  priority?: boolean;
}) {
  const { handle, title } = brand;
  const image = brandPicture(brand);
  return (
    <Link
      className={`group relative block min-h-72 overflow-hidden bg-muted md:min-h-0 ${className ?? ""}`}
      href={`/collections/${handle}`}
    >
      {image ? (
        <Image
          alt={image.altText}
          className="object-contain object-bottom mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          fill
          priority={priority}
          sizes="100vw"
          src={image.url}
        />
      ) : (
        <ImagePlaceholder className="size-full" />
      )}
      <h3 className="relative z-10 p-6 font-heading text-h2">{brandDisplayName(title)}</h3>
    </Link>
  );
}

const FACTS = [
  {
    body: "Our own unit in Ahmedabad, since 2006. We make every part ourselves, start to finish.",
    title: "We make it",
  },
  {
    body: "Jindal 202, which resists heat and rust, so parts hold up in sun, rain and daily rides.",
    title: "Stainless steel",
  },
  {
    body: "Listed under the scooter it is made for. Pick your model and see only what fits.",
    title: "One model each",
  },
  {
    body: "Order a single piece or a full batch for your shop, and we will help you with the count.",
    title: "One piece or bulk",
  },
];

export function ProofBand() {
  return (
    <section className="bg-muted text-foreground">
      <Container className="grid gap-10 py-14 md:py-20" data-reveal>
        <div className="grid gap-6">
          <p className="flex items-center gap-2 font-label text-xxs tracking-widest text-muted-foreground uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            Why Aditya
          </p>
          <div className="grid items-end gap-6 md:grid-cols-2 md:gap-12">
            <h2 className="text-h2 max-w-xl">Parts from the people who press them.</h2>
            <p className="max-w-md text-muted-foreground md:justify-self-end">
              Every Aditya part is made in our own unit in Ahmedabad, so what you order is what we
              press.
            </p>
          </div>
        </div>
        <dl className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(({ body, title }, index) => (
            <ProofCard body={body} index={index} key={title} title={title} />
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function HomeContactBand() {
  return (
    <section className="bg-background text-foreground">
      <Container className="grid justify-items-center gap-6 py-20 text-center md:py-32" data-reveal>
        <p className="flex items-center gap-2 font-label text-xxs tracking-widest text-muted-foreground uppercase">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          Need help?
        </p>
        <h2 className="text-h1 max-w-3xl">Not sure what fits?</h2>
        <p className="max-w-md text-muted-foreground">
          Tell us your scooter and year, and we will help you choose.
        </p>
        <Button
          className="text-background hover:bg-foreground hover:text-background"
          render={<Link href="/collections" />}
          size="lg"
        >
          View collection
        </Button>
      </Container>
    </section>
  );
}
