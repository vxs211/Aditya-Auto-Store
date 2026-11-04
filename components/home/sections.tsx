import Image from "next/image";

import { ProductCard } from "@/components/product-card/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { brandDisplayName } from "@/lib/collections";
import { getCollectionResults, getFitmentBrands } from "@/lib/collections/server";
import type { FitmentBrand } from "@/lib/collections/types";

export function HomeHero() {
  return (
    <section className="bg-foreground text-background">
      <Container className="grid gap-6 py-16 md:py-24">
        <Eyebrow className="text-background/70">Made in our own factory since 2006</Eyebrow>
        <h1 className="text-h1 max-w-4xl md:text-display">
          Footrests, bumpers, guards and matting, made to fit your scooter.
        </h1>
        <p className="max-w-xl text-silver">
          Stainless steel accessories for Honda, TVS, Suzuki, Hero, Yamaha, Bajaj Chetak and
          electric scooters. Buy one piece or order in bulk.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button render={<Link href="/collections" />} size="lg">
            Shop by model
          </Button>
          <Button render={<Link href="/collections/all" />} size="lg" variant="inverse">
            See all products
          </Button>
        </div>
      </Container>
    </section>
  );
}

export async function ModelStrip() {
  const brands = await getFitmentBrands();
  const models = brands.flatMap((brand) => brand.models).filter((model) => model.image);
  if (models.length === 0) return null;

  return (
    <section className="grid gap-5">
      <Container>
        <SectionHeading eyebrow="Suitable for" title="Find your scooter" />
      </Container>
      {/* A plain horizontal scroller: no autoplay, so it needs no motion preference handling. */}
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:px-6">
        {models.map(({ handle, image, title }) => (
          <li className="w-56 shrink-0 snap-start md:w-64" key={handle}>
            <Link className="group grid gap-2" href={`/collections/${handle}`}>
              <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-muted">
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
              <p className="text-sm font-semibold uppercase">{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function BestSellers() {
  const { products } = await getCollectionResults({ handle: "best-sellers" });
  if (products.length === 0) return null;

  return (
    <Container>
      <section className="grid gap-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <SectionHeading eyebrow="Our most in demand" title="Best sellers" />
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

export function AboutIntro() {
  return (
    <Container>
      <section className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-10">
        <SectionHeading eyebrow="About us" title="We make what we sell" />
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
      </section>
    </Container>
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
    .filter((brand) => brand.image)
    .sort((a, b) => b.models.length - a.models.length);
  if (brands.length === 0) return null;
  const [lead, ...rest] = brands as [FitmentBrand, ...FitmentBrand[]];

  return (
    <Container>
      <section className="grid gap-5">
        <SectionHeading eyebrow="Our most trending" title="Shop by brand" />
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
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

function BrandTile({
  brand,
  className,
  priority,
}: {
  brand: FitmentBrand;
  className?: string;
  priority?: boolean;
}) {
  const { handle, image, models, title } = brand;
  return (
    <Link
      className={`group relative flex min-h-56 overflow-hidden rounded-lg bg-muted ${className ?? ""}`}
      href={`/collections/${handle}`}
    >
      {image ? (
        <Image
          alt={image.altText}
          className="object-cover transition-transform group-hover:scale-105"
          fill
          priority={priority}
          sizes="100vw"
          src={image.url}
        />
      ) : (
        <ImagePlaceholder className="size-full" />
      )}
      <div className="relative z-10 flex w-full flex-col justify-end bg-linear-to-t from-foreground/80 to-transparent p-5 text-background">
        <h3 className="text-h3 uppercase">{brandDisplayName(title)}</h3>
        <p className="text-sm text-silver">
          {models.length} {models.length === 1 ? "model" : "models"}
        </p>
      </div>
    </Link>
  );
}

const MARQUEE = [
  "Made in our own factory",
  "Stainless steel",
  "Made to fit",
  "Single piece or bulk",
];

export function Marquee() {
  return (
    <section aria-label="What we stand for" className="border-y border-border bg-muted py-4">
      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-4">
        {MARQUEE.map((item) => (
          <li className="font-label text-label uppercase text-muted-foreground" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HomeContactBand() {
  return (
    <Container>
      <section className="grid gap-4 rounded-lg bg-foreground p-6 text-background md:flex md:items-center md:justify-between md:p-10">
        <div>
          <h2 className="text-h2">Not sure what fits?</h2>
          <p className="text-silver">Tell us your scooter and year, and we will help you choose.</p>
        </div>
        <Button render={<Link href="/contact" />}>Contact us</Button>
      </section>
    </Container>
  );
}
