import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const TITLE = "Terms of service";
const DESCRIPTION =
  "The terms for using the Aditya Auto Accessories website and buying scooter accessories from us.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/terms" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: TITLE,
    type: "website",
    url: "/terms",
  }),
};

// shortcut: the date is typed in, change it whenever the terms change.
const LAST_UPDATED = "5 November 2026";

// Adapted from the reference terms the owner supplied. TODO(owner): have these read once by whoever advises the
// business, and confirm the governing law and courts in section 11.
const NAME = shopConfig.site.name;

interface Section {
  heading: string;
  intro?: string;
  points?: string[];
}

const SECTIONS: Section[] = [
  {
    heading: "Acceptance of terms",
    intro: `By using this website you agree to follow these terms and conditions. If you do not agree with any part of them, please do not use our site.`,
  },
  {
    heading: "Changes to these terms",
    intro: `We may update these terms at any time without prior notice. If you keep using the website, you accept the changes. Please look over the terms from time to time.`,
  },
  {
    heading: "Your account",
    points: [
      "To use some features or place an order you may need an account. You are responsible for keeping your account details private and for everything done under your account.",
      "You agree to give accurate and complete information when you create an account or place an order.",
    ],
  },
  {
    heading: "Using the website",
    points: [
      "Do not do anything that could harm, disable or interfere with the website or other people's use of it.",
      "If you post or send us content through the website, you give us a non-exclusive, royalty-free, worldwide licence to use, copy and display it.",
    ],
  },
  {
    heading: "Product information",
    points: [
      "We take care to keep descriptions and prices correct, but they may sometimes contain mistakes. We may correct errors and update information when needed.",
      "All products depend on availability. We may limit quantities and refuse or cancel orders when necessary.",
    ],
  },
  {
    heading: "Orders and payments",
    points: [
      "After you place an order you will receive a confirmation. This confirmation does not mean we have accepted your order.",
      "Payments are processed through secure payment gateways. Please make sure your payment details are correct and up to date.",
    ],
  },
  {
    heading: "Shipping and delivery",
    points: [
      "If you have a problem with a delivery, call or message us and we will help.",
      "Please check your parcel when it arrives and tell us about any damage within the time given in our return and refund policy.",
    ],
  },
  {
    heading: "Returns and refunds",
    points: [
      "Our return and refund policy explains how returns, exchanges and refunds work.",
      "Approved refunds are paid to the original payment method within 7 to 10 business days of us receiving the returned item.",
    ],
  },
  {
    heading: "Limits on our responsibility",
    points: [
      "This website and its content are provided as they are. We do not promise that the information on it is accurate, reliable or complete.",
      `${NAME} is not responsible for indirect, incidental or consequential loss from your use of the website or the products you buy.`,
    ],
  },
  {
    heading: "Intellectual property",
    points: [
      `All content on this website, including text, images and logos, belongs to ${NAME} or its licensors and is protected by law.`,
      "You may not copy, distribute or make new works from our content without our written permission.",
    ],
  },
  {
    heading: "Governing law",
    intro:
      "These terms are governed by the laws of India. Any dispute will be decided by the courts at Ahmedabad, Gujarat.",
  },
  {
    heading: "Other terms",
    points: [
      "If any part of these terms is found invalid, the rest stays in force.",
      `These terms are the entire agreement between you and ${NAME}, and replace any earlier agreement.`,
    ],
  },
];

export default function TermsPage() {
  const { phone, whatsapp } = shopConfig.contact;
  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-foreground text-background">
        <Container className="grid justify-items-center gap-4 py-12 text-center md:py-20">
          <h1 className="text-display max-w-3xl">
            Terms of <Highlight>service</Highlight>
          </h1>
          <p className="max-w-2xl text-silver">Last updated {LAST_UPDATED}</p>
        </Container>
      </section>

      <Container>
        <Sections className="gap-16 py-16 md:gap-20 md:py-20">
          <div className="mx-auto grid w-full max-w-3xl gap-12">
            <p className="text-base text-muted-foreground" data-reveal>
              Welcome to {NAME}. By using our website you agree to the terms below. Please read them
              carefully.
            </p>
            {SECTIONS.map(({ heading, intro, points }, index) => (
              <section className="grid gap-3" data-reveal key={heading}>
                <h2 className="text-h3">
                  {index + 1}. {heading}
                </h2>
                {intro && <p className="text-base text-muted-foreground">{intro}</p>}
                {points && (
                  <ul className="grid gap-2 text-base text-muted-foreground">
                    {points.map((point) => (
                      <li className="flex gap-3" key={point}>
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section
            className="grid gap-5 bg-muted p-8 md:flex md:items-center md:justify-between md:p-14"
            data-reveal
          >
            <div>
              <h2 className="text-h3">Questions about these terms?</h2>
              <p className="text-muted-foreground">
                Monday to Saturday, 10:00am to 6:00pm. We are happy to help.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {whatsapp && (
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
              )}
              {phone && (
                <Button
                  render={<a href={`tel:${phone.replace(/[^\d+]/g, "")}`} />}
                  variant="outline"
                >
                  Call us
                </Button>
              )}
              <Button render={<Link href="/return-policy" />} variant="outline">
                Return policy
              </Button>
            </div>
          </section>
        </Sections>
      </Container>
    </Page>
  );
}
