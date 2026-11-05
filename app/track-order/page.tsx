import type { Metadata } from "next";

import { TrackOrderForm } from "@/components/track-order/form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const TITLE = "Track your order";
const DESCRIPTION =
  "Ask Aditya Auto Accessories where your scooter accessories order is. Send your order number and we will reply with its status.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/track-order" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: TITLE,
    type: "website",
    url: "/track-order",
  }),
};

const STEPS = [
  {
    body: "It is in your order confirmation, and looks like #1001.",
    title: "Find your order number",
  },
  {
    body: "Enter it below. WhatsApp opens with the message already written.",
    title: "Send it to us",
  },
  {
    body: "We will reply with where your order is. We are available Monday to Saturday, 10:00am to 6:00pm.",
    title: "We reply with the status",
  },
];

export default function TrackOrderPage() {
  const { phone, whatsapp } = shopConfig.contact;
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-foreground text-background">
        <Container className="grid gap-4 py-12 md:py-20">
          <h1 className="text-display max-w-3xl">
            Where is my <Highlight>order</Highlight>?
          </h1>
          <p className="max-w-2xl text-silver">
            Send us your order number and we will tell you where it is.
          </p>
        </Container>
      </section>

      <Container>
        <Sections className="gap-20 py-16 md:gap-28 md:py-20">
          <section className="grid gap-10 md:grid-cols-2 md:gap-16" data-reveal>
            <div className="grid content-start gap-5">
              <SectionHeading title="Ask about your order" />
              {whatsapp ? (
                <TrackOrderForm siteName={shopConfig.site.name} whatsapp={whatsapp} />
              ) : (
                <p className="text-muted-foreground">
                  Call us with your order number and we will tell you where it is.
                </p>
              )}
              {telHref && (
                <p className="text-muted-foreground">
                  Prefer to talk? Call{" "}
                  <a className="text-foreground underline underline-offset-4" href={telHref}>
                    {phone}
                  </a>
                  .
                </p>
              )}
            </div>
            <div className="grid content-start gap-5">
              <SectionHeading title="How it works" />
              <dl className="grid gap-6">
                {STEPS.map(({ body, title }) => (
                  <div key={title}>
                    <dt className="text-h4">{title}</dt>
                    <dd className="mt-1 text-muted-foreground">{body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section
            className="grid gap-5 bg-muted p-8 md:flex md:items-center md:justify-between md:p-14"
            data-reveal
          >
            <div>
              <h2 className="text-h3">Something wrong with your order?</h2>
              <p className="text-muted-foreground">
                If a part arrived damaged or does not fit, see our questions or message us.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/faq" />}>Read the FAQ</Button>
              <Button render={<Link href="/contact" />} variant="outline">
                Contact us
              </Button>
            </div>
          </section>
        </Sections>
      </Container>
    </Page>
  );
}
