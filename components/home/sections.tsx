import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";

import { formatPostDate } from "@/components/blog/blog-thumb";
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

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

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
          className={`${might.className} pointer-events-none absolute inset-x-0 top-[25%] sm:top-[max(1.5rem,calc(50%-35vw))] lg:landscape:top-6 lg:landscape:bottom-auto grid justify-items-center text-white select-none`}
        >
          <p className="flex w-[90%] items-center justify-center gap-4 text-[min(10vw,9dvh)] leading-none lg:w-2/3 lg:text-[min(8vw,9dvh)]">
            <span className="h-0.5 flex-1 bg-white" />
            <span className="shrink-0">2 WHEELER</span>
            <span className="h-0.5 flex-1 bg-white" />
          </p>
          <p className="whitespace-nowrap text-[34.25vw] leading-[0.85] tracking-[-0.02em] lg:text-[30.44vw]">
            ACCESSORIES
          </p>
        </div>
        <div className="absolute inset-0" data-hero-vehicles>
          <Image
            alt=""
            className="scale-[1.2825] object-contain object-center sm:scale-100 lg:landscape:translate-y-24 lg:landscape:object-bottom"
            fill
            preload
            sizes="100vw"
            src="/finalbg.png"
          />
        </div>
      </HeroReveal>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent via-white/45 to-white sm:h-40"
      />
      <div className="hero-button-entrance absolute inset-x-0 bottom-20 z-10 sm:bottom-44 mx-auto flex w-full max-w-lg flex-wrap items-center justify-center gap-3 px-4 lg:landscape:bottom-8">
        <Button
          className="group h-14 gap-4 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] pl-5 pr-2 text-sm text-white shadow-lg ring-1 ring-inset ring-white/25 hover:shadow-xl"
          render={<Link href="#shop-by-brand" />}
          size="lg"
        >
          Shop by brand
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform group-hover:translate-x-0.5">
            <ArrowRIcon aria-hidden="true" className="size-5" />
          </span>
        </Button>
      </div>
    </section>
  );
}

const BRANDS = [
  { handle: "honda", logo: "honda", name: "Honda" },
  { handle: "tvs-accessories", logo: "tvs", name: "TVS" },
  { handle: "suzuki-accessories", logo: "suzuki", name: "Suzuki" },
  { handle: "yamaha-accessories", logo: "yamaha", name: "Yamaha" },
  { handle: "bajaj-chetak-accessories", logo: "bajaj", name: "Bajaj Chetak" },
];

export function ShopByBrand() {
  return (
    <Container className="grid scroll-mt-20 gap-10 py-24" id="shop-by-brand">
      <div className="grid justify-items-center gap-3 text-center">
        <SectionHeading align="center" title="Scooter and EV accessories" />
        <p className="text-muted-foreground">Shop by brand</p>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {BRANDS.map(({ handle, logo, name }) => (
          <li key={handle}>
            <Link
              className="group flex h-72 flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-1.5 shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none sm:h-80"
              href={`/collections/${handle}`}
            >
              <span className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.15rem] bg-[linear-gradient(135deg,#fff4ed_0%,#ffe6d7_48%,#ff9d6c_100%)] px-5 py-6">
                <span
                  aria-hidden="true"
                  className="absolute -top-1/2 -left-1/3 size-[110%] rounded-full bg-white/60"
                />
                <span
                  aria-hidden="true"
                  className="absolute -right-1/2 -bottom-2/3 size-[120%] rounded-full border border-white/40 bg-white/25"
                />
                <Image
                  alt=""
                  className="relative h-auto max-h-14 w-full max-w-32 object-contain"
                  height={56}
                  sizes="100vw"
                  src={`/brand/manufacturers/${logo}.svg`}
                  width={128}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-b from-transparent to-white"
                />
              </span>
              <span className="grid grid-rows-[2.5rem_auto] items-center justify-items-center gap-2 px-3 py-4 text-center">
                <span
                  className={`${interTight.className} flex min-w-0 items-center justify-center text-xl leading-tight font-normal text-foreground`}
                >
                  {name}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-10 items-center gap-2 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] pl-3 pr-1 text-xs font-medium text-white shadow-md ring-1 ring-inset ring-white/25"
                >
                  Shop parts
                  <span className="grid size-7 place-items-center rounded-full bg-white text-foreground shadow-sm transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none">
                    <ArrowRIcon className="size-4" />
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

const VEHICLES = [
  {
    brand: "Honda",
    handle: "activa-6g",
    image: "/vehicles/activa.png",
    name: "Activa 6G",
  },
  {
    brand: "Bajaj",
    handle: "bajaj-chetak-ev-accessories",
    image: "/vehicles/Chetak.png",
    name: "Chetak ",
  },
  {
    brand: "Suzuki",
    handle: "suzuki-access-accessories",
    image: "/vehicles/Access.png",
    name: "Access",
  },
];

export function VehicleLineup() {
  return (
    <section className="grid gap-4 pt-24 md:gap-0">
      <div className="grid justify-items-center gap-3 px-4 text-center">
        <Eyebrow>Made in our unit</Eyebrow>
        <SectionHeading align="center" title="Best sellers trusted across India" />
      </div>
      <VehicleScroll
        nameFontClassName={might.className}
        vehicles={VEHICLES.map((vehicle) => ({
          brand: vehicle.brand,
          href: `/collections/${vehicle.handle}`,
          image: {
            alt: `${vehicle.brand} ${vehicle.name}`,
            url: vehicle.image,
          },
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
    body: "A floor mat helps keep the scooter floorboard clean during everyday rides.",
    href: "/search?q=floor%20mat",
    label: "Floor mat",
    dotX: 7,
    dotY: 80,
    x: 54,
    y: 67,
  },
  {
    body: "A seat cover helps protect the scooter seat from everyday wear.",
    href: "/search?q=seat%20cover",
    label: "Seat cover",
    dotX: 93,
    dotY: 22,
    x: 65,
    y: 38,
  },
  {
    body: "The center stand supports the scooter upright when parked.",
    href: "/search?q=center%20stand",
    label: "Center stand",
    dotX: 93,
    dotY: 88,
    x: 61,
    y: 79,
  },
  {
    body: "Front leg-area guard that takes the knock before your panels do.",
    href: "/search?q=bumper",
    label: "Bumper",
    dotX: 7,
    dotY: 62,
    x: 26,
    y: 64,
  },
  {
    body: "Side bar along the floorboard. Some dealers call it the SS guard or beading.",
    href: "/search?q=crash%20guard",
    label: "Crash guard",
    dotX: 7,
    dotY: 30,
    x: 46,
    y: 38,
  },
  {
    body: "Rear pillion footrest, plain or with a single or double step.",
    href: "/search?q=footrest",
    label: "Footrest",
    dotX: 93,
    dotY: 75,
    x: 67,
    y: 70,
  },
  {
    body: "The bolts and brackets that mount it all, made for the same model.",
    href: "/search?q=fitting%20kit",
    label: "Fitting kit",
    dotX: 93,
    dotY: 40,
    x: 81,
    y: 46,
  },
];

export function PartsTour() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none h-40 bg-[linear-gradient(180deg,#fff_0%,#fff8f3_15%,#ffe3d1_35%,#ffb98c_60%,#fb7930_82%,#F66101_100%)] sm:h-64"
      />
      <section className="bg-[linear-gradient(180deg,#F66101_0%,#ffad79_30%,#fff1e8_75%,#ffffff_100%)] py-8 xl:h-dvh xl:overflow-y-auto">
        <Container className="grid gap-6 xl:h-full xl:min-h-0 xl:grid-rows-[auto_minmax(0,1fr)_auto]">
          <div className="grid justify-items-center gap-3 text-center text-white [&_p]:text-white">
            <Eyebrow>What we make</Eyebrow>
            <SectionHeading align="center" title="Four parts, one fit" />
          </div>
          <PartHotspots
            hotspots={HOTSPOTS}
            image={{ alt: "Honda Activa 6G", url: "/vehicles/activa.png" }}
          />
          <div className="grid items-start gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-[2fr_1fr_1fr] xl:gap-8">
            <p className="max-w-lg text-black sm:col-span-2 xl:col-span-1">
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
              <p className="grid text-small text-black">
                <span className="font-semibold">Jindal 202</span>
                <span className="text-black">Stainless steel</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-lg bg-primary/10 text-foreground"
              >
                <CheckIcon className="size-5" />
              </span>
              <p className="grid text-small text-black">
                <span className="font-semibold">8 models</span>
                <span className="text-black">Made in house</span>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
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
  {
    caption: "Stainless steel",
    handle: "burgman-street-accessories",
  },
  {
    caption: "Precise fit",
    handle: "suzuki-access-accessories",
  },
  {
    caption: "Made in-house",
    handle: "activa-125-next-gen-2025",
  },
  {
    caption: "Flexible orders",
    handle: "tvs-ntorq-accessories",
  },
  { caption: "Petrol & electric", handle: "ola-s1-steel" },
];

export async function WhyAditya() {
  const images = await Promise.all(FEATURES.map(({ handle }) => collectionImage(handle)));
  const slides = FEATURES.flatMap(({ caption }, index) => {
    const image = images[index];
    return image ? [{ caption, image }] : [];
  });
  if (slides.length < 3) return null;

  return (
    <section className="grid gap-8 overflow-hidden bg-background py-16 sm:gap-10 sm:py-24">
      <div className="grid justify-items-center gap-5 px-4 text-center">
        <Eyebrow>Why Aditya</Eyebrow>
        <h2 className="text-h2 max-w-2xl">Built for Indian roads</h2>
        <Button
          className="group h-14 gap-4 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] pl-5 pr-2 text-sm text-white shadow-lg ring-1 ring-inset ring-white/25 hover:shadow-xl"
          render={<Link href="/about" />}
          size="lg"
        >
          About us
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform group-hover:translate-x-0.5">
            <ArrowRIcon aria-hidden="true" className="size-5" />
          </span>
        </Button>
      </div>
      <FeatureCarousel slides={slides} />
    </section>
  );
}

export async function BlogSection() {
  const photos = pickGuidePhotos(GUIDES, await getFitmentBrands());
  const latest = GUIDES.slice(0, 4);
  if (latest.length === 0) return null;

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <Container className="grid gap-6 sm:gap-8">
        <div className="grid justify-items-center gap-3 text-center">
          <SectionHeading title="From the blog" />
          <Button
            className="group h-14 gap-4 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] pl-5 pr-2 text-sm text-white shadow-lg ring-1 ring-inset ring-white/25 hover:shadow-xl"
            render={<Link href="/guides" />}
            size="lg"
          >
            View all
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform group-hover:translate-x-0.5">
              <ArrowRIcon aria-hidden="true" className="size-5" />
            </span>
          </Button>
        </div>
        <ul className="scroll-fade-x mx-auto flex w-full max-w-6xl snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {latest.map((guide, index) => {
            const photo = photos.get(guide.slug);
            const isCollection = guide.slug === "how-to-install-a-scooter-guard-at-home";
            return (
              <li
                key={guide.slug}
                className={`w-[85%] shrink-0 snap-start sm:w-auto ${
                  index === 0
                    ? "sm:col-span-2 lg:col-span-1 lg:row-span-2"
                    : index === 3
                      ? "sm:col-span-2 lg:col-span-2"
                      : ""
                }`}
              >
                <Link
                  className={`group flex h-full overflow-hidden rounded-2xl bg-muted p-3 sm:p-4 transition-shadow hover:shadow-lg ${index === 3 ? "flex-col sm:flex-row-reverse" : "flex-col"}`}
                  href={isCollection ? "/collections/all" : `/guides/${guide.slug}`}
                >
                  <span
                    className={`relative block shrink-0 overflow-hidden rounded-lg bg-[#fff1e8] ${index === 0 ? "aspect-[16/9] lg:aspect-square" : index === 3 ? "aspect-[16/9] sm:aspect-auto sm:w-2/5" : guide.slug === "how-to-install-a-scooter-guard-at-home" ? "aspect-[21/9]" : "aspect-[16/9]"}`}
                  >
                    {photo && (
                      <Image
                        alt={photo.alt}
                        className="object-contain object-center mix-blend-multiply transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                        fill
                        sizes="100vw"
                        src={photo.url}
                      />
                    )}
                  </span>
                  <span
                    className={`grid flex-1 content-start ${guide.slug === "how-to-install-a-scooter-guard-at-home" ? "gap-2 p-3 sm:p-4" : "gap-3 p-3 sm:p-4"}`}
                  >
                    {!isCollection && (
                      <span className="text-xs font-medium text-link">
                        {formatPostDate(guide.published)}
                      </span>
                    )}
                    <h3
                      className={`${interTight.className} text-xl font-semibold leading-tight sm:text-2xl text-foreground group-hover:text-link`}
                    >
                      {isCollection ? "Explore our collection" : guide.headline}
                    </h3>
                    <span
                      className={`${interTight.className} line-clamp-3 sm:line-clamp-2 text-base leading-relaxed font-normal text-muted-foreground`}
                    >
                      {isCollection
                        ? "Discover scooter accessories made for a precise fit."
                        : guide.description}
                    </span>
                    <span className="inline-flex w-fit items-center gap-3 rounded-full bg-[#F66101] py-1 pl-4 pr-1 text-sm font-medium text-white">
                      {isCollection ? "View collection" : "Read article"}{" "}
                      <span className="flex size-8 items-center justify-center rounded-full bg-white text-black">
                        <ArrowRIcon
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                        />
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function HomeContactBand() {
  return (
    <section className="bg-white">
      <div className="relative isolate h-[70svh] min-h-[30rem] overflow-hidden bg-foreground text-white sm:h-[80svh] sm:min-h-[36rem] lg:h-dvh">
        <Image
          alt="Two people riding a scooter along a road at sunset"
          className="object-cover object-[62%_center] sm:object-[65%_center] lg:object-[65%_center]"
          fill
          sizes="100vw"
          src="/Sunset Highway Scooter Journey.png"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-muted to-transparent sm:h-32"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent via-white/30 to-white sm:h-40"
        />
        <Container className="relative pt-20 pb-10 sm:pt-24 md:pt-36 md:pb-16">
          <div className="mx-auto grid max-w-xl justify-items-center gap-4 text-center">
            <p className="text-xs font-medium tracking-[0.16em] text-white uppercase sm:text-label sm:tracking-[0.2em]">
              Made in Ahmedabad since 2006
            </p>
            <h2 className="font-heading text-[clamp(2.5rem,10vw,4rem)] leading-[1.05] font-semibold text-white md:text-h1">
              Made to fit your scooter
            </h2>
          </div>
        </Container>
      </div>
      <Container className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-xl justify-items-center gap-6 text-center">
          <p className="max-w-lg text-base leading-relaxed text-foreground md:text-lg">
            Footrests, crash guards, bumpers and fitting kits we press in stainless steel, plus
            matting and seat covers for popular Indian scooters.
          </p>
          <div className="flex w-full flex-col items-center justify-center gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
            <Button
              className="group h-14 gap-4 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] pl-5 pr-2 text-sm text-white shadow-lg ring-1 ring-inset ring-white/25 hover:shadow-xl"
              render={<Link href="/collections" />}
              size="lg"
            >
              Shop by scooter
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform group-hover:translate-x-0.5">
                <ArrowRIcon aria-hidden="true" className="size-5" />
              </span>
            </Button>
            <Button
              className="group h-14 gap-4 rounded-full border border-white/70 bg-black/40 pl-5 pr-2 text-sm text-white backdrop-blur-sm hover:bg-black/65"
              render={<Link href="/collections/all" />}
              size="lg"
              variant="outline"
            >
              See all parts
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-foreground shadow-md transition-transform group-hover:translate-x-0.5">
                <ArrowRIcon aria-hidden="true" className="size-5" />
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
