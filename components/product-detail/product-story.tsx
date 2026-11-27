import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StarIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";
import {
  PremiumChatIcon,
  PremiumMedalIcon,
  PremiumRulerIcon,
  PremiumShieldIcon,
} from "@/components/ui/premium-icons";
import { SectionHeading } from "@/components/ui/section-heading";

const VALUES = [
  {
    Icon: PremiumRulerIcon,
    title: "Made for your model",
    text: "Find accessories by scooter model and check the product details before you order.",
  },
  {
    Icon: PremiumShieldIcon,
    title: "Ready for the road",
    text: "Explore accessories chosen for the demands of everyday riding.",
  },
  {
    Icon: PremiumMedalIcon,
    title: "Experience since 2006",
    text: "Aditya Auto Accessories makes scooter parts in Ahmedabad, Gujarat.",
  },
  {
    Icon: PremiumChatIcon,
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
    <section className="grid gap-8 py-12 sm:gap-10 md:py-16">
      <div className="grid gap-3 text-center">
        <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Why Aditya Auto
        </p>
        <SectionHeading align="center" title="Made for the way you ride" />
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map(({ Icon, text, title }) => (
          <li
            className="grid content-start gap-4 rounded-2xl bg-white p-5 shadow-card sm:p-6"
            key={title}
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-[#fff1e8]">
              <Icon aria-hidden className="size-8 text-primary" />
            </span>
            <div className="grid gap-1.5">
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="text-body text-pretty text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProductReviews() {
  return (
    <section className="grid gap-6 py-12 md:py-16">
      <div className="grid gap-2 text-center">
        <SectionHeading align="center" title="Customer reviews" />
        <p className="text-body text-muted-foreground">Sample reviews for preview only.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { author: "Amit P.", text: "The accessory looks neat and feels solid on my scooter." },
          { author: "Priya S.", text: "The team helped me choose the right part for my model." },
          { author: "Rahul M.", text: "Well packed and a nice finish for everyday use." },
        ].map(({ author, text }) => (
          <article
            key={author}
            className="grid content-start gap-4 rounded-2xl bg-white p-5 shadow-card sm:p-6"
          >
            <span aria-label="5 out of 5 stars" className="flex gap-1" role="img">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} className="size-4 text-primary" fill="currentColor" />
              ))}
            </span>
            <p className="text-body leading-relaxed text-pretty">{text}</p>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-[#fff1e8] font-semibold text-foreground">
                {author.charAt(0)}
              </span>
              <p className="grid text-sm font-semibold leading-tight">
                {author}
                <span className="font-normal text-muted-foreground">Sample review</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductFaq() {
  return (
    <section className="mx-auto grid w-full max-w-3xl gap-6 py-8 md:py-12">
      <div className="grid justify-items-center gap-3 text-center">
        <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Good to know
        </p>
        <SectionHeading align="center" title="Frequently asked questions" />
        <p className="text-muted-foreground">
          Answers to common questions about choosing and caring for your accessories.
        </p>
      </div>
      <Accordion className="grid gap-3">
        {FAQS.map(({ answer, question }) => (
          <AccordionItem
            className="rounded-2xl border-b-0 bg-white px-5 shadow-card transition-shadow hover:shadow-card-hover sm:px-6"
            key={question}
            value={question}
          >
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Link className="mx-auto w-fit text-sm font-medium underline underline-offset-4" href="/faq">
        See all FAQs
      </Link>
    </section>
  );
}
