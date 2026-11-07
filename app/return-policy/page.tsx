import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/highlight";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const TITLE = "Return and refund policy";
const DESCRIPTION =
  "How returns, replacements and refunds work for scooter accessories from Aditya Auto Accessories.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/return-policy" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: TITLE,
    type: "website",
    url: "/return-policy",
  }),
};

// Adapted from the reference policy the owner supplied. Confirm the old model clause and add an email address if
// you want returns by email.
const SECTIONS = [
  {
    heading: "Returns",
    points: [
      "Returns are accepted within 3 days of delivery.",
      "The item must be unused, in its original condition and in its original packing.",
      "Proof of purchase (invoice or order number) is required for every return.",
    ],
  },
  {
    heading: "Items that cannot be returned",
    points: [
      "Parts that are used or damaged by incorrect fitting.",
      "Customised or special-order items.",
      "Electrical parts once unpacked or fitted.",
    ],
  },
  {
    heading: "Old model vehicle accessories",
    points: [
      "Accessories for old model vehicles cannot be cancelled, refunded or returned, whether the order was paid on delivery (COD) or prepaid.",
      "If there is a manufacturing defect, or the part was damaged in transit, we will replace it after checking it.",
    ],
  },
  {
    heading: "Refunds",
    points: [
      "Once we receive and inspect the returned item, we will tell you the status of your refund.",
      "If approved, the refund goes to your original payment method within 7 to 10 business days.",
      "Shipping charges are not refundable.",
    ],
  },
  {
    heading: "Exchanges",
    points: [
      "We exchange only parts that are defective or were delivered wrongly.",
      "To ask for an exchange, contact us within 48 hours of delivery with your order details and photos of the part.",
    ],
  },
  {
    heading: "How to start a return or refund",
    points: [
      "Call or message us on WhatsApp with your order ID, the product name, the reason for the return or refund, and clear photos if they apply.",
      "Our team will guide you through the next steps.",
    ],
  },
];

export default function ReturnPolicyPage() {
  const { phone, whatsapp } = shopConfig.contact;
  return (
    <Page className="pt-0 md:pt-0">
      <section className="bg-foreground text-background">
        <Container className="grid justify-items-center gap-4 py-12 text-center md:py-20">
          <h1 className="text-display max-w-3xl">
            Return and <Highlight>refund</Highlight>
          </h1>
          <p className="max-w-2xl text-silver">
            If something is not right with your order, here is how we fix it.
          </p>
        </Container>
      </section>

      <Container>
        <Sections className="gap-16 py-16 md:gap-20 md:py-20">
          <div className="mx-auto grid w-full max-w-3xl gap-12">
            {SECTIONS.map(({ heading, points }) => (
              <section className="grid gap-3" data-reveal key={heading}>
                <h2 className="text-h3">{heading}</h2>
                <ul className="grid gap-2 text-base text-muted-foreground">
                  {points.map((point) => (
                    <li className="flex gap-3" key={point}>
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <p className="text-small text-muted-foreground" data-reveal>
              {shopConfig.site.name} may refuse a return or refund if the item does not meet the
              conditions above.
            </p>
          </div>

          <section
            className="grid gap-5 bg-muted p-8 md:flex md:items-center md:justify-between md:p-14"
            data-reveal
          >
            <div>
              <h2 className="text-h3">Need to return something?</h2>
              <p className="text-muted-foreground">
                Monday to Saturday, 10:00am to 6:00pm. Have your order ID ready.
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
