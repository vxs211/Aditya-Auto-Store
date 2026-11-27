import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import {
  CheckList,
  HelpBand,
  PageHero,
  PolicyCard,
  PRIMARY_PILL,
  WHITE_PILL,
  WhatsAppIcon,
} from "@/components/ui/page-cards";
import {
  PremiumBagIcon,
  PremiumChatIcon,
  PremiumCheckIcon,
  PremiumShieldIcon,
  PremiumTruckIcon,
  PremiumUndoIcon,
} from "@/components/ui/premium-icons";
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
    icon: PremiumUndoIcon,
    points: [
      "Returns are accepted within 3 days of delivery.",
      "The item must be unused, in its original condition and in its original packing.",
      "Proof of purchase (invoice or order number) is required for every return.",
    ],
  },
  {
    heading: "Items that cannot be returned",
    icon: PremiumShieldIcon,
    points: [
      "Parts that are used or damaged by incorrect fitting.",
      "Customised or special-order items.",
      "Electrical parts once unpacked or fitted.",
    ],
  },
  {
    heading: "Old model vehicle accessories",
    icon: PremiumTruckIcon,
    points: [
      "Accessories for old model vehicles cannot be cancelled, refunded or returned, whether the order was paid on delivery (COD) or prepaid.",
      "If there is a manufacturing defect, or the part was damaged in transit, we will replace it after checking it.",
    ],
  },
  {
    heading: "Refunds",
    icon: PremiumBagIcon,
    points: [
      "Once we receive and inspect the returned item, we will tell you the status of your refund.",
      "If approved, the refund goes to your original payment method within 7 to 10 business days.",
      "Shipping charges are not refundable.",
    ],
  },
  {
    heading: "Exchanges",
    icon: PremiumCheckIcon,
    points: [
      "We exchange only parts that are defective or were delivered wrongly.",
      "To ask for an exchange, contact us within 48 hours of delivery with your order details and photos of the part.",
    ],
  },
  {
    heading: "How to start a return or refund",
    icon: PremiumChatIcon,
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
      <PageHero eyebrow="Policy" title="Return and refund">
        If something is not right with your order, here is how we fix it.
      </PageHero>

      <section className="bg-white pb-12 sm:pb-16 lg:pb-24">
        <Container className="grid gap-8 sm:gap-10">
          <div className="mx-auto grid w-full max-w-3xl gap-3">
            {SECTIONS.map(({ heading, icon, points }) => (
              <PolicyCard heading={heading} icon={icon} key={heading}>
                <CheckList points={points} />
              </PolicyCard>
            ))}
            <p className="px-2 pt-2 text-small text-pretty text-muted-foreground" data-reveal>
              {shopConfig.site.name} may refuse a return or refund if the item does not meet the
              conditions above.
            </p>
          </div>

          <HelpBand
            body="Monday to Saturday, 10:00am to 6:00pm. Have your order ID ready."
            title="Need to return something?"
          >
            {whatsapp && (
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
            )}
            {phone && (
              <Button
                className={WHITE_PILL}
                render={<a href={`tel:${phone.replace(/[^\d+]/g, "")}`} />}
                size="lg"
                variant="secondary"
              >
                Call us
              </Button>
            )}
            <Button
              className={WHITE_PILL}
              render={<Link href="/contact" />}
              size="lg"
              variant="secondary"
            >
              Contact us
            </Button>
          </HelpBand>
        </Container>
      </section>
    </Page>
  );
}
