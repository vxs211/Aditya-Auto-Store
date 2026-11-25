import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AwardIcon,
  MessageCircleIcon,
  RulerIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/ui/section-heading";

const VALUES = [
  {
    Icon: RulerIcon,
    title: "Made for your model",
    text: "Find accessories by scooter model and check the product details before you order.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "Ready for the road",
    text: "Explore accessories chosen for the demands of everyday riding.",
  },
  {
    Icon: AwardIcon,
    title: "Experience since 2006",
    text: "Aditya Auto Accessories makes scooter parts in Ahmedabad, Gujarat.",
  },
  {
    Icon: MessageCircleIcon,
    title: "Here to help",
    text: "Not sure about fitment? Get in touch with your scooter model and year.",
  },
];

const FAQS = [
  {
    question: "Will this fit my scooter?",
    answer:
      "Check the product description against your scooter model and year. If you are unsure, contact us before ordering and we can help you find the right part.",
  },
  {
    question: "How do I find parts for my model?",
    answer:
      "Choose your scooter brand and model under Shop by model. Check the generation and year, as parts can differ between versions.",
  },
  {
    question: "How do I care for my accessories?",
    answer:
      "Wipe the part with a damp cloth and avoid abrasive cleaners. Rinse off mud and dry it to help keep the finish looking its best.",
  },
  {
    question: "What if my order arrives damaged or does not fit?",
    answer: "Contact us with your order number and photos of the part so we can help.",
  },
];

export function ProductStory() {
  return (
    <section className="grid gap-10 rounded-3xl bg-muted px-6 py-12 md:px-12 md:py-16">
      <div className="grid gap-3 text-center">
        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
          Why Aditya Auto
        </p>
        <SectionHeading align="center" title="Made for the way you ride" />
      </div>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map(({ Icon, text, title }) => (
          <li className="grid content-start justify-items-center gap-3 text-center" key={title}>
            <Icon aria-hidden className="size-7.5 text-primary" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProductReviews() {
  return (
    <section className="grid gap-6 border-y border-border py-12 md:py-16">
      <SectionHeading title="Customer reviews" />
      <p className="text-sm text-muted-foreground">Sample reviews for preview only.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { author: "Amit P.", text: "The accessory looks neat and feels solid on my scooter." },
          { author: "Priya S.", text: "The team helped me choose the right part for my model." },
          { author: "Rahul M.", text: "Well packed and a nice finish for everyday use." },
        ].map(({ author, text }) => (
          <article key={author} className="grid content-start gap-4 rounded-2xl bg-muted p-6">
            <span aria-label="5 out of 5 stars" className="flex gap-1" role="img">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} className="size-4 text-primary" fill="currentColor" />
              ))}
            </span>
            <p className="text-sm leading-relaxed">{text}</p>
            <p className="text-sm font-semibold">
              {author} <span className="font-normal text-muted-foreground">· Sample review</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductFaq() {
  return (
    <section className="mx-auto grid w-full max-w-3xl gap-6 py-8 md:py-12">
      <div className="grid gap-3">
        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
          Good to know
        </p>
        <SectionHeading title="Frequently asked questions" />
        <p className="text-muted-foreground">
          Answers to common questions about choosing and caring for your accessories.
        </p>
      </div>
      <Accordion>
        {FAQS.map(({ answer, question }) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger className="text-base">{question}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Link className="w-fit text-sm font-medium underline underline-offset-4" href="/faq">
        See all FAQs
      </Link>
    </section>
  );
}
