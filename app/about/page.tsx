import type { Metadata } from "next";
import Image from "next/image";
import { type ComponentProps, type ComponentType, type ReactNode, Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import {
  PremiumCheckIcon,
  PremiumFactoryIcon,
  PremiumHeadsetIcon,
  PremiumTruckIcon,
  PremiumWrenchIcon,
  PremiumGridIcon,
  PremiumMedalIcon,
  PremiumPackageIcon,
  PremiumPhoneIcon,
  PremiumRulerIcon,
  PremiumShieldIcon,
  PremiumUserCheckIcon,
} from "@/components/ui/premium-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollectionResults } from "@/lib/collections/server";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

type Icon = ComponentType<ComponentProps<"svg">>;

const TITLE = "About us";
const DESCRIPTION =
  "Aditya Auto Accessories manufactures stainless steel two wheeler accessories in Ahmedabad, Gujarat, for scooters, motorcycles and electric vehicles.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/about" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: TITLE,
    type: "website",
    url: "/about",
  }),
};

// Counts come from the catalogue in Shopify; keep them in step when the range changes.
const STATS = [
  { icon: PremiumMedalIcon, label: "Year founded", value: "2006" },
  { icon: PremiumGridIcon, label: "Products", value: "165" },
  { icon: PremiumRulerIcon, label: "Scooter models covered", value: "44" },
  { icon: PremiumTruckIcon, label: "Vehicle brands", value: "9" },
];

const RANGE = [
  "All round accessories",
  "Beading and front guard",
  "Bumpers in stainless steel",
  "Buzzer",
  "Ladies step",
  "Side stand",
  "Leg guard",
  "Floor matting",
  "Seat covers",
];

// Everything below is something we do or make; there are no certifications or awards claimed.
const VALUES = [
  {
    body: "Every part is shaped to one scooter model, so it goes on without cutting or drilling.",
    icon: PremiumRulerIcon,
    title: "Fit first",
  },
  {
    body: "Jindal 202 stainless steel resists heat, chemicals and rust, so parts keep their finish.",
    icon: PremiumShieldIcon,
    title: "Built to last",
  },
  {
    body: "Each part carries our manufacturing mark and the date it was made, so you can see what you received.",
    icon: PremiumMedalIcon,
    title: "Marked and dated",
  },
  {
    body: "Trained staff check the work at each stage, before anything is packed.",
    icon: PremiumUserCheckIcon,
    title: "Checked as it is made",
  },
];

const MISSION_POINTS = [
  "Our own manufacturing unit in Ahmedabad, Gujarat",
  "Checks at each stage of making a part",
  "One piece or a bulk order, with support after the sale",
];

const INFRASTRUCTURE = [
  {
    body: "Our own unit in Ahmedabad makes accessories for scooters, motorcycles and electric vehicles.",
    icon: PremiumFactoryIcon,
    title: "Manufacturing unit",
  },
  {
    body: "Jindal 202 stainless steel, chosen for strength and resistance to rust.",
    icon: PremiumShieldIcon,
    title: "Material",
  },
  {
    body: "Dies and fittings are made per model, so each part matches that scooter.",
    icon: PremiumWrenchIcon,
    title: "Model tooling",
  },
  {
    body: "Work is checked at each stage by the people doing it and before it is packed.",
    icon: PremiumCheckIcon,
    title: "Quality checks",
  },
  {
    body: "Non woven and plastic bags. A standard bundle holds 20 sets of three.",
    icon: PremiumPackageIcon,
    title: "Packing",
  },
  {
    body: "Call or message us about fitment, an order, or a part that arrived damaged.",
    icon: PremiumHeadsetIcon,
    title: "After the sale",
  },
];

const REASONS = [
  {
    body: "We make our parts ourselves, so we know exactly how each one is built.",
    icon: PremiumFactoryIcon,
    title: "Made in our own factory",
  },
  {
    body: "Listed under the scooter it is made for, so you buy the part that fits.",
    icon: PremiumRulerIcon,
    title: "Made to fit your model",
  },
  {
    body: "Stainless steel throughout, not a coating over ordinary steel.",
    icon: PremiumShieldIcon,
    title: "Built to last",
  },
  {
    body: "Call or message us Monday to Saturday, 10:00am to 6:00pm and we will help you choose.",
    icon: PremiumPhoneIcon,
    title: "Help when you need it",
  },
];

function IconTile({ icon: Icon }: { icon: Icon }) {
  return (
    <span className="grid size-14 place-items-center rounded-2xl bg-[#fff1e8]">
      <Icon aria-hidden="true" className="size-8 text-primary" />
    </span>
  );
}

function InfoCard({ body, icon, title }: { body: string; icon: Icon; title: string }) {
  return (
    <li className="grid content-start gap-4 rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <IconTile icon={icon} />
      <div className="grid gap-1.5">
        <h3 className="text-xl leading-[1.29] font-medium tracking-normal">{title}</h3>
        <p className="text-body text-pretty text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

function Heading({ children, title }: { children?: ReactNode; title: string }) {
  return (
    <div className="grid justify-items-center gap-3 text-center">
      <SectionHeading align="center" title={title} />
      {children && (
        <p className="max-w-xl text-body text-pretty text-muted-foreground">{children}</p>
      )}
    </div>
  );
}

const SECTION = "bg-white py-12 sm:py-16 lg:py-24";
const GRID = "grid gap-8 sm:gap-10";

export default function AboutPage() {
  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-white pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-24 lg:pb-12">
        <Container className="grid justify-items-center gap-8 text-center sm:gap-10">
          <div className="grid justify-items-center gap-3">
            <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
              About us
            </p>
            <SectionHeading align="center" title="Built in Ahmedabad since 2006" />
            <p className="max-w-2xl text-body text-pretty text-muted-foreground">
              From our own unit in Ahmedabad, Gujarat, we make stainless steel parts for scooters,
              motorcycles and electric vehicles. Every part is made to fit one model and built to
              last.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              className="h-12 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] px-6 text-base text-white shadow-lg ring-1 ring-white/25 ring-inset hover:shadow-xl"
              render={<Link href="/collections/all" />}
              size="lg"
            >
              Shop now
            </Button>
            <Button
              className="h-12 rounded-full bg-white px-6 text-base text-foreground shadow-card hover:bg-white hover:shadow-card-hover"
              render={<Link href="/contact" />}
              size="lg"
              variant="secondary"
            >
              Contact us
            </Button>
          </div>
          <ul className="grid w-full max-w-5xl grid-cols-3 gap-3 rounded-2xl bg-white p-3 sm:gap-4 sm:p-6">
            {["activa", "Access", "Chetak"].map((name) => (
              <li className="relative aspect-4/3" key={name}>
                <Image
                  alt=""
                  className="object-contain mix-blend-multiply"
                  fill
                  sizes="(min-width: 1024px) 320px, 30vw"
                  src={`/vehicles/${name}.png`}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <Container>
          <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STATS.map(({ icon, label, value }) => (
              <div
                className="grid content-start gap-4 rounded-2xl bg-white p-4 shadow-card sm:p-6"
                key={label}
              >
                <IconTile icon={icon} />
                <div className="grid gap-1">
                  <dd className={`font-sans text-4xl leading-none font-semibold tabular-nums`}>
                    {value}
                  </dd>
                  <dt className="text-small text-muted-foreground">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className={SECTION} data-reveal>
        <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="grid gap-5">
            <SectionHeading title="Built for the ride" />
            <p className="text-body text-pretty text-muted-foreground">
              Aditya Auto Accessories was founded in 2006 in Ahmedabad, Gujarat, with a simple aim:
              parts for two wheelers that fit properly and last. We make them ourselves, in Jindal
              202 stainless steel, so a leg guard or a bumper does not rust where a coating would
              chip.
            </p>
            <p className="text-body text-pretty text-muted-foreground">
              Today the range covers 44 scooter models across nine brands, from Honda, TVS and
              Suzuki to Hero, Yamaha, Bajaj Chetak and electric scooters. Our people check the work
              as they make it, and you can buy a single piece or order in bulk.
            </p>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-white shadow-card">
            <Image
              alt="Aditya stainless steel accessories on a scooter"
              className="object-contain p-6 mix-blend-multiply"
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              src="/vehicles/activa.png"
            />
          </div>
        </Container>
      </section>

      <section className={SECTION} data-reveal>
        <Container className={GRID}>
          <Heading title="What we stand for" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <InfoCard key={value.title} {...value} />
            ))}
          </ul>
        </Container>
      </section>

      <section className={SECTION} data-reveal>
        <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="grid gap-5">
            <SectionHeading title="One part, made for one scooter" />
            <p className="text-body text-pretty text-muted-foreground">
              Our mission is simple: parts that fit your scooter the first time, made from a metal
              that lasts, available to every rider, one piece or in bulk.
            </p>
          </div>
          <ul className="grid gap-3">
            {MISSION_POINTS.map((point) => (
              <li
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card"
                key={point}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
                <span className="text-body text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={SECTION} data-reveal>
        <Container className={GRID}>
          <Heading title="What we manufacture" />
          <Suspense fallback={null}>
            <RangePictures />
          </Suspense>
          <ul className="flex flex-wrap justify-center gap-2">
            {RANGE.map((item) => (
              <li key={item}>
                <Badge className="px-4 py-2 text-small" variant="secondary">
                  {item}
                </Badge>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className={`${SECTION} scroll-mt-28`} data-reveal id="manufacturing">
        <Container className={GRID}>
          <Heading title="What it takes to make a part" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INFRASTRUCTURE.map((item) => (
              <InfoCard key={item.title} {...item} />
            ))}
          </ul>
        </Container>
      </section>

      <section className={SECTION} data-reveal>
        <Container className={GRID}>
          <Heading title="Why choose Aditya Auto?">
            Stainless steel accessories made for the way you ride.
          </Heading>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((reason) => (
              <InfoCard key={reason.title} {...reason} />
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white pb-12 sm:pb-16 lg:pb-24" data-reveal>
        <Container>
          <div className="grid gap-5 rounded-2xl bg-white p-6 text-center shadow-card sm:p-10 md:flex md:items-center md:justify-between md:text-left">
            <div className="grid gap-2">
              <h2 className="text-2xl">Ready to upgrade your ride?</h2>
              <p className="text-body text-muted-foreground">
                Pick your scooter and see the parts made for it.
              </p>
            </div>
            <Button
              className="h-12 justify-self-center rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] px-6 text-base text-white shadow-lg ring-1 ring-white/25 ring-inset hover:shadow-xl"
              render={<Link href="/collections/all" />}
              size="lg"
            >
              Shop now
            </Button>
          </div>
        </Container>
      </section>
    </Page>
  );
}

// Real parts from the catalogue, so the range is shown rather than only listed.
async function RangePictures() {
  const { products } = await getCollectionResults({ handle: "best-sellers" });
  const shown = products.filter((product) => product.featuredImage).slice(0, 4);
  if (shown.length === 0) return null;
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {shown.map((product) => (
        <li className="grid gap-3 rounded-2xl bg-white p-3 shadow-card sm:p-4" key={product.id}>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
            <Image
              alt={product.featuredImage?.altText ?? product.title}
              className="object-cover mix-blend-multiply"
              fill
              sizes="(min-width: 1024px) 280px, 50vw"
              src={product.featuredImage?.url ?? ""}
            />
          </div>
          <p className={`font-sans text-base leading-snug font-semibold text-pretty`}>
            {product.title}
          </p>
        </li>
      ))}
    </ul>
  );
}
