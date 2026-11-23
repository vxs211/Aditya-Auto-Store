import localFont from "next/font/local";
import Image from "next/image";

import { BlogThumb, formatPostDate } from "@/components/blog/blog-thumb";
import { ProductCard } from "@/components/product-card/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRIcon, CheckIcon, SparklesIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollection, getCollectionResults, getFitmentBrands } from "@/lib/collections/server";
import { GUIDES } from "@/lib/guides";
import { pickGuidePhotos } from "@/lib/guides/photos";

import { FeatureCarousel } from "./feature-carousel";
import { HeroReveal } from "./hero-reveal";
import { PartHotspots } from "./part-hotspots";
import { VehicleScroll } from "./vehicle-scroll";

const might = localFont({
  src: "../../app/fonts/Might.ttf",
  display: "swap",
});

// shortcut: home imagery is the scooter photos already on the Shopify model collections; swap in the owner's own
// shots (lifestyle, workshop, close-ups) when they arrive.
async function collectionImage(handle: string) {
  const image = (await getCollection({ handle }))?.image;
  return image ? { alt: image.altText || handle, url: image.url } : null;
}

// Small uppercase eyebrow above a section title (DESIGN.md caption token).
function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export function HomeHero() {
  return (
    <section className="relative h-[calc(100dvh-5rem)] min-h-[32rem] overflow-hidden bg-[linear-gradient(180deg,#F66101_0%,#ffffff_100%)]">
      <HeroReveal>
        <div
          aria-hidden="true"
          data-hero-text
          className={`${might.className} pointer-events-none absolute inset-x-0 top-[max(1.5rem,calc(50%-35vw))] lg:landscape:top-6 lg:landscape:bottom-auto grid justify-items-center text-white select-none`}
        >
          <p className="flex w-2/3 items-center justify-center gap-4 text-[min(8vw,9dvh)] leading-none">
            <span className="h-0.5 flex-1 bg-white" />
            <span className="shrink-0">2 WHEELER</span>
            <span className="h-0.5 flex-1 bg-white" />
          </p>
          <p className="text-[30.44vw] leading-[0.85] tracking-[-0.02em]">ACCESSORIES</p>
        </div>
        <div className="absolute inset-0" data-hero-vehicles>
          <Image
            alt=""
            className="object-contain object-center lg:landscape:translate-y-24 lg:landscape:object-bottom"
            fill
            preload
            sizes="100vw"
            src="/finalbg.png"
          />
        </div>
      </HeroReveal>
      <div className="absolute inset-x-0 bottom-44 z-10 mx-auto grid w-full max-w-md grid-cols-2 gap-3 px-4 lg:landscape:bottom-8">
        <Button className="h-12 px-3 text-sm" render={<Link href="/collections" />} size="lg">
          Shop by scooter
        </Button>
        <Button
          className="h-12 border border-foreground bg-background px-3 text-sm text-foreground hover:bg-foreground hover:text-background"
          render={<Link href="/collections/all" />}
          size="lg"
          variant="outline"
        >
          See all parts
        </Button>
      </div>
    </section>
  );
}

const BRANDS = [
  { handle: "honda", name: "Honda" },
  { handle: "tvs-accessories", name: "TVS" },
  { handle: "suzuki-accessories", name: "Suzuki" },
  { handle: "hero-two-wheeler-accessories", name: "Hero" },
  { handle: "yamaha-accessories", name: "Yamaha" },
  { handle: "bajaj-chetak-accessories", name: "Bajaj Chetak" },
  { handle: "ola-s1-steel", name: "Ola Electric" },
  { handle: "vida", name: "Vida" },
  { handle: "ampere", name: "Ampere" },
  { handle: "mahindra-two-wheeler-accessories", name: "Mahindra" },
];

export function ShopByBrand() {
  return (
    <Container className="grid gap-10 py-24">
      <div className="grid justify-items-center gap-3 text-center">
        <SectionHeading align="center" title="Scooter and EV accessories" />
        <p className="text-muted-foreground">Shop by brand</p>
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {BRANDS.map(({ handle, name }) => (
          <li key={handle}>
            <Link
              className="grid h-40 content-between rounded-xl border border-hairline bg-background p-6 transition-shadow hover:shadow-soft"
              href={`/collections/${handle}`}
            >
              <span className="text-h4">{name}</span>
              <span className="flex items-center gap-2 text-small font-medium text-link">
                Shop parts <ArrowRIcon className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

const VEHICLES = [
  { brand: "Honda", handle: "activa-6g", name: "Activa 6G" },
  { brand: "Bajaj", handle: "bajaj-chetak-ev-accessories", name: "Chetak 3501" },
  { brand: "Suzuki", handle: "suzuki-access-accessories", name: "Access" },
];

export async function VehicleLineup() {
  const images = await Promise.all(VEHICLES.map(({ handle }) => collectionImage(handle)));

  return (
    <section className="grid gap-4 pt-24 md:gap-0">
      <div className="grid justify-items-center gap-3 px-4 text-center">
        <Eyebrow>Made in our unit</Eyebrow>
        <SectionHeading align="center" title="Parts for the scooter you ride" />
      </div>
      <VehicleScroll
        vehicles={VEHICLES.map((vehicle, index) => ({
          brand: vehicle.brand,
          href: `/collections/${vehicle.handle}`,
          image: images[index] ?? null,
          name: vehicle.name,
          parts: "Footrest · Crash guard · Bumper · Fitting kit",
          tagline: `Pressed for the ${vehicle.name} frame, nothing to drill.`,
        }))}
      />
    </section>
  );
}

const HOTSPOTS = [
  {
    body: "Front leg-area guard that takes the knock before your panels do.",
    href: "/search?q=bumper",
    label: "Bumper",
    x: 26,
    y: 64,
  },
  {
    body: "Side bar along the floorboard. Some dealers call it the SS guard or beading.",
    href: "/search?q=crash%20guard",
    label: "Crash guard",
    x: 46,
    y: 38,
  },
  {
    body: "Rear pillion footrest, plain or with a single or double step.",
    href: "/search?q=footrest",
    label: "Footrest",
    x: 67,
    y: 70,
  },
  {
    body: "The bolts and brackets that mount it all, made for the same model.",
    href: "/search?q=fitting%20kit",
    label: "Fitting kit",
    x: 81,
    y: 46,
  },
];

export async function PartsTour() {
  const image = await collectionImage("activa-6g");
  if (!image) return null;

  return (
    <section className="bg-muted py-24">
      <Container className="grid gap-12">
        <div className="grid justify-items-center gap-3 text-center">
          <Eyebrow>What we make</Eyebrow>
          <SectionHeading align="center" title="Four parts, one fit" />
        </div>
        <PartHotspots hotspots={HOTSPOTS} image={image} />
        <div className="grid items-start gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <p className="max-w-lg text-muted-foreground">
            Every part is cut, bent and polished in our Ahmedabad unit for one model only, so it
            bolts onto the holes your scooter already has.
          </p>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-11 place-items-center rounded-lg bg-primary/10 text-foreground"
            >
              <SparklesIcon className="size-5" />
            </span>
            <p className="grid text-small">
              <span className="font-semibold">Jindal 202</span>
              <span className="text-muted-foreground">Stainless steel</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid size-11 place-items-center rounded-lg bg-primary/10 text-foreground"
            >
              <CheckIcon className="size-5" />
            </span>
            <p className="grid text-small">
              <span className="font-semibold">8 models</span>
              <span className="text-muted-foreground">Made in house</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export async function BestSellers() {
  const { products } = await getCollectionResults({ handle: "best-sellers" });
  if (products.length === 0) return null;

  return (
    <Container className="grid gap-8 py-24">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <SectionHeading title="Best sellers" />
        <Link
          className="text-small font-medium text-link hover:underline"
          href="/collections/best-sellers"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
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
    </Container>
  );
}

const FEATURES = [
  { caption: "Stainless steel that will not rust.", handle: "burgman-street-accessories" },
  { caption: "Made for one model, nothing to drill.", handle: "suzuki-access-accessories" },
  { caption: "Pressed in our own unit since 2006.", handle: "activa-125-next-gen-2025" },
  { caption: "One piece or a dealer's full batch.", handle: "tvs-ntorq-accessories" },
  { caption: "Fits petrol and electric scooters.", handle: "ola-s1-steel" },
];

export async function WhyAditya() {
  const images = await Promise.all(FEATURES.map(({ handle }) => collectionImage(handle)));
  const slides = FEATURES.flatMap(({ caption }, index) => {
    const image = images[index];
    return image ? [{ caption, image }] : [];
  });
  if (slides.length < 3) return null;

  return (
    <section className="grid gap-10 overflow-hidden py-24">
      <div className="grid justify-items-center gap-5 px-4 text-center">
        <Eyebrow>Why Aditya</Eyebrow>
        <h2 className="text-h2 max-w-2xl">Built for Indian roads</h2>
        <Button render={<Link href="/about" />}>About us</Button>
      </div>
      <FeatureCarousel slides={slides} />
    </section>
  );
}

// The newest posts as picture cards, the same as on the blog page.
export async function BlogSection() {
  const photos = pickGuidePhotos(GUIDES, await getFitmentBrands());
  const latest = GUIDES.slice(0, 4);
  if (latest.length === 0) return null;

  return (
    <section className="bg-muted py-24">
      <Container className="grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <SectionHeading title="From the blog" />
          <Link className="text-small font-medium text-link hover:underline" href="/guides">
            View all
          </Link>
        </div>
        <ul className="grid gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((guide) => (
            <li key={guide.slug}>
              <Link className="group grid gap-3" href={`/guides/${guide.slug}`}>
                <BlogThumb guide={guide} photo={photos.get(guide.slug)} />
                <h3 className="text-h4 group-hover:underline">{guide.title}</h3>
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

export function HomeContactBand() {
  return (
    <section className="w-full bg-foreground text-background">
      <Container className="grid justify-items-center gap-6 py-24 text-center">
        <p className="max-w-full rounded-sm border border-background/30 px-3 py-2 font-label text-[0.625rem] leading-relaxed tracking-wide uppercase sm:text-label">
          Made in Ahmedabad since 2006
        </p>
        <h1 className="text-h1 max-w-4xl font-heading font-bold">Made to fit your scooter</h1>
        <p className="max-w-2xl text-base leading-relaxed text-background/75 md:text-xl">
          Footrests, crash guards, bumpers and fitting kits we press in stainless steel, plus
          matting and seat covers for every popular Indian scooter.
        </p>
        <div className="flex w-full flex-col justify-center gap-2 sm:w-auto sm:flex-row">
          <Button render={<Link href="/collections" />} size="lg">
            Shop by scooter
          </Button>
          <Button
            className="border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background"
            render={<Link href="/collections/all" />}
            size="lg"
            variant="outline"
          >
            See all parts
          </Button>
        </div>
      </Container>
    </section>
  );
}
