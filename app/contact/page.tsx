import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import {
  type CardIcon,
  IconTile,
  InfoCard,
  PRIMARY_PILL,
  WHITE_PILL,
  WhatsAppIcon,
} from "@/components/ui/page-cards";
import {
  PremiumBagIcon,
  PremiumClockIcon,
  PremiumMapPinIcon,
  PremiumPhoneIcon,
  PremiumRulerIcon,
  PremiumShieldIcon,
  PremiumUserCheckIcon,
} from "@/components/ui/premium-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

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
    icon: PremiumRulerIcon,
    title: "Which part fits",
  },
  { body: "Fifty pieces or more. Ask us for pricing.", icon: PremiumBagIcon, title: "Bulk orders" },
  {
    body: "Questions about an order you have placed.",
    icon: PremiumUserCheckIcon,
    title: "Order support",
  },
  {
    body: "Something arrived damaged or does not fit.",
    icon: PremiumShieldIcon,
    title: "After the sale",
  },
];

function ContactRow({
  children,
  href,
  icon,
  label,
}: {
  children: string;
  href?: string;
  icon: CardIcon;
  label: string;
}) {
  return (
    <li className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card sm:p-5">
      <IconTile icon={icon} />
      <div className="grid min-w-0 gap-0.5">
        <p className="text-small text-muted-foreground">{label}</p>
        {href ? (
          <a
            className={`${interTight.className} text-xl leading-tight font-semibold tabular-nums hover:underline hover:underline-offset-4`}
            href={href}
          >
            {children}
          </a>
        ) : (
          <p className="text-body text-pretty text-foreground">{children}</p>
        )}
      </div>
    </li>
  );
}

export default function ContactPage() {
  const { address, phone, secondaryPhone, whatsapp } = shopConfig.contact;
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;

  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-white pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-24 lg:pb-12">
        <Container className="grid justify-items-center gap-6 text-center">
          <div className="grid justify-items-center gap-3">
            <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Contact us
            </p>
            <SectionHeading align="center" title="We're here to help" />
            <p className="max-w-xl text-body text-pretty text-muted-foreground">
              Message us about a part, a fitment, or a bulk order, and we will get back to you.
            </p>
          </div>
          {whatsapp && (
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                className={PRIMARY_PILL}
                render={
                  <a href={`https://wa.me/${whatsapp}`} rel="noopener noreferrer" target="_blank" />
                }
                size="lg"
              >
                <WhatsAppIcon className="size-5" />
                Chat on WhatsApp
              </Button>
              {telHref && (
                <Button
                  className={WHITE_PILL}
                  render={<a href={telHref} />}
                  size="lg"
                  variant="secondary"
                >
                  <PremiumPhoneIcon aria-hidden="true" className="size-5" />
                  Call us
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-white pb-12 sm:pb-16 lg:pb-24" data-reveal>
        <Container className="grid gap-8 sm:gap-10">
          <ul className="grid gap-3 sm:grid-cols-2">
            {phone && telHref && (
              <ContactRow href={telHref} icon={PremiumPhoneIcon} label="Phone">
                {phone}
              </ContactRow>
            )}
            {secondaryPhone && (
              <ContactRow
                href={`tel:${secondaryPhone.replace(/[^\d+]/g, "")}`}
                icon={PremiumPhoneIcon}
                label="Second number"
              >
                {secondaryPhone}
              </ContactRow>
            )}
            <ContactRow icon={PremiumClockIcon} label="Hours">
              Monday to Saturday, 10:00am to 6:00pm
            </ContactRow>
            <ContactRow icon={PremiumMapPinIcon} label="Where we are">
              {address ?? "Ahmedabad, Gujarat, India"}
            </ContactRow>
          </ul>
        </Container>
      </section>

      <section className="bg-white pb-12 sm:pb-16 lg:pb-24" data-reveal>
        <Container className="grid gap-8 sm:gap-10">
          <SectionHeading align="center" title="Ask us about" />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HELP.map((item) => (
              <InfoCard key={item.title} {...item} />
            ))}
          </ul>

          <div className="grid gap-5 rounded-2xl bg-white p-6 shadow-card sm:p-10 md:flex md:items-center md:justify-between">
            <div className="grid gap-2">
              <h2 className={`${interTight.className} text-2xl leading-tight font-semibold`}>
                Know the part you need?
              </h2>
              <p className="text-body text-muted-foreground">Find it by your scooter model.</p>
            </div>
            <Button className={PRIMARY_PILL} render={<Link href="/collections" />} size="lg">
              Shop by model
            </Button>
          </div>
        </Container>
      </section>
    </Page>
  );
}
