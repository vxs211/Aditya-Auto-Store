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
import { PartHotspots } from "./part-hotspots";
import { VehicleScroll } from "./vehicle-scroll";

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

export async function HomeHero() {
  const [left, right] = await Promise.all([
    collectionImage("activa-6g"),
    collectionImage("tvs-iqube-accessories"),
  ]);

  return (
    <section className="flex min-h-screen min-h-dvh flex-col overflow-hidden bg-background text-foreground">
      <div className="grid min-h-[40dvh] w-full shrink-0 content-center justify-items-center gap-4 bg-foreground px-4 py-8 text-center text-background lg:px-6">
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
      </div>
      <div className="grid min-h-[40dvh] w-full flex-1 border-b-[10dvh] border-primary bg-background px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 md:gap-6">
          {[left, right].map(
            (image, index) =>
              image && (
                <div
                  className="relative min-h-40 overflow-hidden rounded-sm bg-background"
                  key={image.url}
                >
                  <Image
                    alt={image.alt}
                    className="object-contain mix-blend-multiply"
                    fill
                    preload={index === 0}
                    sizes="100vw"
                    src={image.url}
                  />
                </div>
              ),
          )}
        </div>
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
    <Container className="grid justify-items-center gap-6 py-24 text-center">
      <Eyebrow>Need help?</Eyebrow>
      <h2 className="text-h2 max-w-3xl">Not sure what fits?</h2>
      <p className="max-w-md text-muted-foreground">
        Tell us your scooter and year, and we will help you choose.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button render={<Link href="/contact" />}>Contact us</Button>
        <Button render={<Link href="/collections" />} variant="outline">
          Browse scooters
        </Button>
      </div>
    </Container>
  );
}
