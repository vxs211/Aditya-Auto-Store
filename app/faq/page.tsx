import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";
import { Page } from "@/components/ui/page";
import {
  HelpBand,
  PageHero,
  PRIMARY_PILL,
  WHITE_PILL,
  WhatsAppIcon,
} from "@/components/ui/page-cards";
import { shopConfig } from "@/lib/config";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

const TITLE = "Frequently asked questions";
const DESCRIPTION =
  "Answers about fitment, stainless steel scooter accessories, bulk orders and support from Aditya Auto Accessories in Ahmedabad.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: buildAlternates({ pathname: "/faq" }),
  openGraph: buildOpenGraph({
    description: DESCRIPTION,
    title: TITLE,
    type: "website",
    url: "/faq",
  }),
};

// Only answers we can stand behind. Delivery time, shipping cost and returns are left out until the owner sets them.
const FAQS = [
  {
    answer:
      "Every part is made for one scooter model and listed under that model. Open Shop by model, pick your brand and then your scooter, and you will only see parts made for it. If your model or year is not listed, or two versions look alike, message us your scooter and its year and we will tell you what fits.",
    question: "Will it fit my scooter?",
  },
  {
    answer:
      "Go to Shop by model, choose the brand, then the model. Models are named with their generation, for example Activa 6G and Activa 125 Next Gen 2025, because parts differ between versions. Check the name matches your scooter.",
    question: "How do I find the parts for my scooter?",
  },
  {
    answer:
      "Our accessories are made from Jindal 202 stainless steel, chosen for strength and high resistance to heat and chemicals.",
    question: "What are the parts made of?",
  },
  {
    answer:
      "Stainless steel resists rust, which is why we use it rather than coated metal. Like any metal that lives outdoors, it keeps its finish longest if you rinse off mud and wipe it dry now and then.",
    question: "Will they rust?",
  },
  {
    answer:
      "No. Parts are made to the shape of one model, so they go on without cutting or drilling.",
    question: "Do I need to cut or drill anything to fit them?",
  },
  {
    answer:
      "Yes. You can buy a single piece from the store, or order in bulk. For fifty pieces or more, message us for pricing.",
    question: "Can I buy just one piece, or in bulk?",
  },
  {
    answer:
      "Parts are packed in non woven and plastic bags. A standard bundle holds 20 sets of three.",
    question: "How are the parts packed?",
  },
  {
    answer:
      "Each part carries our manufacturing mark and the date it was made, so you can check what you received.",
    question: "How can I tell the part is genuine?",
  },
  {
    answer:
      "Call or message us on WhatsApp with your order number and what is wrong, and we will help. Photos of the part make it quicker.",
    question: "Something arrived damaged or does not fit. What do I do?",
  },
  {
    answer:
      "Use the Track your order page. Send us your order number and we will tell you where it is.",
    question: "Where is my order?",
  },
  {
    answer:
      "We make the parts in our own unit in Ahmedabad, Gujarat, and have done since 2006. You can reach us Monday to Saturday, 10:00am to 6:00pm.",
    question: "Where are you based, and when can I reach you?",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ answer, question }) => ({
    "@type": "Question",
    acceptedAnswer: { "@type": "Answer", text: answer },
    name: question,
  })),
};

export default function FaqPage() {
  const { phone, whatsapp } = shopConfig.contact;
  return (
    <Page className="pt-0 md:pt-0">
      <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      <PageHero eyebrow="FAQ" title="Questions, answered">
        Fitment, material, bulk orders and support. If yours is not here, message us.
      </PageHero>

      <section className="bg-white pb-12 sm:pb-16 lg:pb-24" data-reveal>
        <Container className="grid gap-8 sm:gap-10">
          <Accordion className="mx-auto grid w-full max-w-3xl gap-3">
            {FAQS.map(({ answer, question }) => (
              <AccordionItem
                className="rounded-2xl border-b-0 bg-white px-5 shadow-card transition-shadow hover:shadow-card-hover sm:px-6"
                key={question}
                value={question}
              >
                <AccordionTrigger className={`${interTight.className} text-lg font-semibold hover:no-underline`}>
                  {question}
                </AccordionTrigger>
                <AccordionContent className="max-w-prose text-base/relaxed text-pretty text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <HelpBand body="Tell us your scooter and we will say what fits." title="Still not sure?">
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
              render={<Link href="/collections" />}
              size="lg"
              variant="secondary"
            >
              Shop by model
            </Button>
          </HelpBand>
        </Container>
      </section>
    </Page>
  );
}
