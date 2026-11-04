import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
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

const VALUES = [
  {
    body: "Jindal 202 stainless steel, with high resistance to heat and chemicals, so parts do not rust.",
    title: "Stainless steel, not coated",
  },
  {
    body: "Every part is listed under the scooter model it is made for, so it goes on without cutting or drilling.",
    title: "Made to fit one model",
  },
  {
    body: "Each part carries our manufacturing mark and the date it was made, so you can check what you received.",
    title: "Marked and dated",
  },
  {
    body: "Trained and experienced staff carry out every process and check the work as they go.",
    title: "Checked as it is made",
  },
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

export default function AboutPage() {
  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-foreground text-background">
        <Container className="grid gap-5 py-12 md:py-20">
          <h1 className="text-display max-w-3xl">Made in our own factory since 2006</h1>
          <p className="max-w-2xl text-silver">
            Aditya Auto Accessories manufactures two wheeler accessories in Ahmedabad, Gujarat. Our
            unit makes parts for scooters, motorcycles and electric vehicles.
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
          <section className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-10">
            <SectionHeading title="What we do" />
            <div className="grid gap-4 text-muted-foreground">
              <p>
                We manufacture stainless steel accessories with high resistance to heat and
                chemicals. Our range covers all round accessories, beading and front guard, bumpers,
                buzzer, ladies step, side stand and leg guard, across popular scooter and motorcycle
                models and electric scooters.
              </p>
              <p>
                Our focus is consistent quality and design, with regular evaluation and improvement,
                prompt delivery, and support after the sale. Every process is carried out by trained
                and experienced people who check the quality of what they produce.
              </p>
              <p>
                You can buy a single piece here, or order in bulk. Our parts are made to be durable,
                strong and rust free.
              </p>
            </div>
          </section>

          <section className="grid gap-8">
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

          <section className="grid gap-5">
            <SectionHeading title="How we build" />
            <dl className="grid gap-x-16 gap-y-8 md:grid-cols-2">
              {VALUES.map(({ body, title }) => (
                <div key={title}>
                  <dt className="text-h3">{title}</dt>
                  <dd className="mt-1 text-muted-foreground">{body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="bg-muted px-6 py-12 md:px-12 md:py-16">
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

          <section className="grid gap-4 bg-foreground p-8 text-background md:flex md:items-center md:justify-between md:p-14">
            <div>
              <h2 className="text-h2">Looking for parts for your scooter?</h2>
              <p className="text-silver">Pick your model and see what fits.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/collections" />}>Shop by model</Button>
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
