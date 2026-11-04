import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const TITLE = "Contact us";
const DESCRIPTION =
  "Call or message Aditya Auto Accessories in Ahmedabad, Gujarat about scooter and motorcycle accessories, single pieces or bulk orders.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/contact" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: TITLE,
    type: "website",
    url: "/contact",
  }),
};

const HELP = [
  {
    body: "Tell us your scooter and its year and we will say what fits.",
    title: "Which part fits",
  },
  { body: "Fifty pieces or more. Ask us for pricing.", title: "Bulk orders" },
  { body: "Questions about an order you have placed.", title: "Order support" },
  { body: "Something arrived damaged or does not fit.", title: "After the sale" },
];

export default function ContactPage() {
  const { phone, whatsapp } = shopConfig.contact;
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-foreground text-background">
        <Container className="grid gap-4 py-12 md:py-20">
          <Eyebrow className="text-background/70">Contact</Eyebrow>
          <h1 className="text-display">We're here to help</h1>
          <p className="max-w-2xl text-silver">
            Message us about a part, a fitment, or a bulk order, and we will get back to you.
          </p>
        </Container>
      </section>

      <Container>
        <Sections className="py-12 md:py-16">
          <section className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="grid gap-5">
              <SectionHeading eyebrow="Reach us" title="Talk to us" />
              <dl className="grid gap-5">
                {phone && telHref && (
                  <div className="grid gap-1">
                    <dt className="text-label font-label uppercase text-muted-foreground">Phone</dt>
                    <dd>
                      <a className="text-h3 hover:text-link" href={telHref}>
                        {phone}
                      </a>
                    </dd>
                  </div>
                )}
                <div className="grid gap-1">
                  <dt className="text-label font-label uppercase text-muted-foreground">Hours</dt>
                  <dd>Monday to Saturday, 10:00am to 6:00pm</dd>
                </div>
                <div className="grid gap-1">
                  <dt className="text-label font-label uppercase text-muted-foreground">
                    Where we are
                  </dt>
                  <dd>Ahmedabad, Gujarat, India</dd>
                </div>
              </dl>
              {whatsapp && (
                <div className="flex flex-wrap gap-3">
                  <Button
                    render={
                      <a
                        href={`https://wa.me/${whatsapp}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      />
                    }
                  >
                    Chat on WhatsApp
                  </Button>
                  {telHref && (
                    <Button render={<a href={telHref} />} variant="outline">
                      Call us
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-5">
              <SectionHeading eyebrow="What we can help with" title="Ask us about" />
              <ul className="grid gap-4 sm:grid-cols-2">
                {HELP.map(({ body, title }) => (
                  <li className="rounded-lg border border-border p-5" key={title}>
                    <h3 className="text-h4">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-4 rounded-lg bg-muted p-6 md:flex md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="text-h3">Know the part you need?</h2>
              <p className="text-muted-foreground">Find it by your scooter model.</p>
            </div>
            <Button render={<Link href="/collections" />}>Shop by model</Button>
          </section>
        </Sections>
      </Container>
    </Page>
  );
}
