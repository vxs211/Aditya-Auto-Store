import type { Metadata } from "next";

import { TrackOrderForm } from "@/components/track-order/form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SearchIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { InfoCard, PRIMARY_PILL, WHITE_PILL } from "@/components/ui/page-cards";
import { PremiumChatIcon, PremiumPhoneIcon, PremiumTruckIcon } from "@/components/ui/premium-icons";
import { SectionHeading } from "@/components/ui/section-heading";
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
    icon: SearchIcon,
    title: "Find your order number",
  },
  {
    body: "Enter it above. WhatsApp opens with the message already written.",
    icon: PremiumChatIcon,
    title: "Send it to us",
  },
  {
    body: "We will reply with where your order is. We are available Monday to Saturday, 10:00am to 6:00pm.",
    icon: PremiumTruckIcon,
    title: "We reply with the status",
  },
];

export default function TrackOrderPage() {
  const { phone, whatsapp } = shopConfig.contact;
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-white pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-24 lg:pb-12">
        <Container className="grid justify-items-center gap-3 text-center">
          <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Track order
          </p>
          <SectionHeading align="center" title="Where is my order?" />
          <p className="max-w-xl text-body text-pretty text-muted-foreground">
            Send us your order number and we will tell you where it is.
          </p>
        </Container>
      </section>

      <section className="bg-white pb-12 sm:pb-16 lg:pb-24" data-reveal>
        <Container className="grid gap-8 sm:gap-10">
          <div className="mx-auto grid w-full max-w-2xl gap-5 rounded-2xl bg-white p-6 shadow-card sm:p-10">
            <div className="grid gap-1">
              <h2 className="text-2xl">
                Ask about your order
              </h2>
              <p className="text-body text-muted-foreground">We check it and reply on WhatsApp.</p>
            </div>
            {whatsapp ? (
              <TrackOrderForm siteName={shopConfig.site.name} whatsapp={whatsapp} />
            ) : (
              <p className="text-muted-foreground">
                Call us with your order number and we will tell you where it is.
              </p>
            )}
            {telHref && (
              <p className="flex items-center gap-2 text-body text-muted-foreground">
                <PremiumPhoneIcon aria-hidden="true" className="size-4 text-primary" />
                Prefer to talk? Call{" "}
                <a className="text-foreground underline underline-offset-4" href={telHref}>
                  {phone}
                </a>
              </p>
            )}
          </div>

          <ul className="grid gap-3 md:grid-cols-3">
            {STEPS.map((step) => (
              <InfoCard key={step.title} {...step} />
            ))}
          </ul>

          <div className="grid gap-5 rounded-2xl bg-white p-6 shadow-card sm:p-10 md:flex md:items-center md:justify-between">
            <div className="grid gap-2">
              <h2 className="text-2xl">
                Something wrong with your order?
              </h2>
              <p className="text-body text-pretty text-muted-foreground">
                If a part arrived damaged or does not fit, see our questions or message us.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className={PRIMARY_PILL} render={<Link href="/faq" />} size="lg">
                Read the FAQ
              </Button>
              <Button
                className={WHITE_PILL}
                render={<Link href="/contact" />}
                size="lg"
                variant="secondary"
              >
                Contact us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Page>
  );
}
