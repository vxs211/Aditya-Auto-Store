import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sections } from "@/components/ui/sections";
import { getCollectionResults } from "@/lib/collections/server";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

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
  { label: "Year founded", value: "2006" },
  { label: "Products", value: "165" },
  { label: "Scooter models covered", value: "44" },
  { label: "Vehicle brands", value: "9" },
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
    title: "Fit first",
  },
  {
    body: "Jindal 202 stainless steel resists heat, chemicals and rust, so parts keep their finish.",
    title: "Built to last",
  },
  {
    body: "Each part carries our manufacturing mark and the date it was made, so you can see what you received.",
    title: "Marked and dated",
  },
  {
    body: "Trained staff check the work at each stage, before anything is packed.",
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
    title: "Manufacturing unit",
  },
  {
    body: "Jindal 202 stainless steel, chosen for strength and resistance to rust.",
    title: "Material",
  },
  {
    body: "Dies and fittings are made per model, so each part matches that scooter.",
    title: "Model tooling",
  },
  {
    body: "Work is checked at each stage by the people doing it and before it is packed.",
    title: "Quality checks",
  },
  {
    body: "Non woven and plastic bags. A standard bundle holds 20 sets of three.",
    title: "Packing",
  },
  {
    body: "Call or message us about fitment, an order, or a part that arrived damaged.",
    title: "After the sale",
  },
];

const REASONS = [
  {
    body: "We make our parts ourselves, so we know exactly how each one is built.",
    title: "Made in our own factory",
  },
  {
    body: "Listed under the scooter it is made for, so you buy the part that fits.",
    title: "Made to fit your model",
  },
  {
    body: "Stainless steel throughout, not a coating over ordinary steel.",
    title: "Built to last",
  },
  {
    body: "Call or message us Monday to Saturday, 10:00am to 6:00pm and we will help you choose.",
    title: "Help when you need it",
  },
];

export default function AboutPage() {
  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-foreground text-background">
        <Container className="grid gap-5 py-12 md:py-20">
          <h1 className="text-display max-w-5xl">
            Built in Ahmedabad since <Highlight>2006</Highlight>
          </h1>
          <p className="max-w-2xl text-silver">
            From our own unit in Ahmedabad, Gujarat, we make stainless steel parts for scooters,
            motorcycles and electric vehicles. Every part is made to fit one model and built to
            last.
          </p>
        </Container>
      </section>

      <section className="border-b border-border bg-muted">
        <Container>
          <dl className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
            {STATS.map(({ label, value }) => (
              <div className="grid gap-1" key={label}>
                <dt className="text-small text-muted-foreground">{label}</dt>
                <dd className="text-h1">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container>
        <Sections className="gap-20 py-16 md:gap-28 md:py-20">
          <section className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-10" data-reveal>
            <SectionHeading title="Built for the ride" />
            <div className="grid gap-4 text-muted-foreground">
              <p>
                Aditya Auto Accessories was founded in 2006 in Ahmedabad, Gujarat, with a simple
                aim: parts for two wheelers that fit properly and last. We make them ourselves, in
                Jindal 202 stainless steel, so a leg guard or a bumper does not rust where a coating
                would chip.
              </p>
              <p>
                Today the range covers 44 scooter models across nine brands, from Honda, TVS and
                Suzuki to Hero, Yamaha, Bajaj Chetak and electric scooters. Our people check the
                work as they make it, and you can buy a single piece or order in bulk.
              </p>
            </div>
          </section>

          <section className="grid gap-5" data-reveal>
            <SectionHeading title="What we stand for" />
            <dl className="grid gap-x-16 gap-y-8 md:grid-cols-2">
              {VALUES.map(({ body, title }) => (
                <div key={title}>
                  <dt className="text-h3">{title}</dt>
                  <dd className="mt-1 text-muted-foreground">{body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-10" data-reveal>
            <SectionHeading title="One part, made for one scooter" />
            <div className="grid gap-5">
              <p className="text-muted-foreground">
                Our mission is simple: parts that fit your scooter the first time, made from a metal
                that lasts, available to every rider, one piece or in bulk.
              </p>
              <ul className="grid gap-2">
                {MISSION_POINTS.map((point) => (
                  <li className="flex gap-3" key={point}>
                    <span aria-hidden className="mt-2.5 size-2 shrink-0 bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-8" data-reveal>
            <SectionHeading title="What we manufacture" />
            <Suspense fallback={null}>
              <RangePictures />
            </Suspense>
            <ul className="grid gap-x-12 gap-y-2 text-h3 sm:grid-cols-2 lg:grid-cols-3">
              {RANGE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section
            className="scroll-mt-28 bg-muted px-6 py-12 md:px-12 md:py-16"
            data-reveal
            id="manufacturing"
          >
            <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
              <SectionHeading title="What it takes to make a part" />
              <dl className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
                {INFRASTRUCTURE.map(({ body, title }) => (
                  <div key={title}>
                    <dt className="text-h4">{title}</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">{body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="grid gap-8" data-reveal>
            <div className="grid gap-2">
              <SectionHeading title="Why choose Aditya Auto?" />
              <p className="text-muted-foreground">
                Stainless steel accessories made for the way you ride.
              </p>
            </div>
            <dl className="grid gap-x-16 gap-y-8 md:grid-cols-2">
              {REASONS.map(({ body, title }) => (
                <div key={title}>
                  <dt className="text-h3">{title}</dt>
                  <dd className="mt-1 text-muted-foreground">{body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            className="grid gap-4 bg-foreground p-8 text-background md:flex md:items-center md:justify-between md:p-14"
            data-reveal
          >
            <div>
              <h2 className="text-h2">Ready to upgrade your ride?</h2>
              <p className="text-silver">Pick your scooter and see the parts made for it.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/collections/all" />}>Shop now</Button>
              <Button render={<Link href="/contact" />} variant="inverse">
                Contact us
              </Button>
            </div>
          </section>
        </Sections>
      </Container>
    </Page>
  );
}

// Real parts from the catalogue, so the range is shown rather than only listed.
async function RangePictures() {
  const { products } = await getCollectionResults({ handle: "best-sellers" });
  const shown = products.filter((product) => product.featuredImage).slice(0, 4);
  if (shown.length === 0) return null;
  return (
    <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {shown.map((product) => (
        <li key={product.id}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              alt={product.featuredImage?.altText ?? product.title}
              className="object-cover"
              fill
              sizes="100vw"
              src={product.featuredImage?.url ?? ""}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{product.title}</p>
        </li>
      ))}
    </ul>
  );
}
