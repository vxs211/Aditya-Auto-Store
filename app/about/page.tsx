import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sections } from "@/components/ui/sections";
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

const REASONS = [
  { body: "Made in our own factory, not bought in and relabelled.", title: "We make it" },
  { body: "Pick your scooter and see only what fits it.", title: "Easy to choose" },
  { body: "Buy a single piece, or 50 and more in bulk.", title: "One or many" },
  { body: "Ask us before you buy if you are unsure what fits.", title: "We will help" },
];

export default function AboutPage() {
  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-foreground text-background">
        <Container className="grid gap-5 py-12 md:py-20">
          <Eyebrow className="text-background/70">About Aditya Auto</Eyebrow>
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
                <dt className="text-label font-label uppercase text-muted-foreground">{label}</dt>
                <dd className="text-h1">{value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container>
        <Sections className="py-12 md:py-16">
          <section className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-10">
            <SectionHeading eyebrow="About us" title="What we do" />
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

          <section className="grid gap-5">
            <SectionHeading eyebrow="What we stand for" title="How we build" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map(({ body, title }) => (
                <li className="grid gap-1 border-l-4 border-l-primary pl-4" key={title}>
                  <h3 className="text-h4">{title}</h3>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-5">
            <SectionHeading eyebrow="Our infrastructure" title="What it takes to make a part" />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INFRASTRUCTURE.map(({ body, title }) => (
                <li className="grid gap-1 rounded-lg border border-border p-5" key={title}>
                  <h3 className="text-h4">{title}</h3>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-5">
            <SectionHeading eyebrow="Why Aditya Auto" title="Why buy from us" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {REASONS.map(({ body, title }) => (
                <li className="grid gap-1" key={title}>
                  <h3 className="text-h4">{title}</h3>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-4 rounded-lg bg-foreground p-6 text-background md:flex md:items-center md:justify-between md:p-10">
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
