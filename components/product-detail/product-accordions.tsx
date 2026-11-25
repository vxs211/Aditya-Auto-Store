import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/components/ui/link";

// Generic panels every product page shows; the product's own description is split into its own "Description" tab above.
const FIXED_PANELS = [
  {
    body: "Wipe down with a damp cloth after rides. Avoid harsh chemicals or abrasive cleaners. Store in a cool, dry place when not in use.",
    id: "care",
    title: "Care & Maintenance",
  },
];

export function ProductAccordions({ descriptionHtml }: { descriptionHtml: string }) {
  return (
    <Accordion className="w-full" data-slot="product-accordions" multiple>
      {descriptionHtml ? (
        <AccordionItem value="description">
          <AccordionTrigger className="py-4 text-base">Description</AccordionTrigger>
          <AccordionContent>
            <div
              className="prose prose-sm text-foreground/80"
              // oxlint-disable-next-line react/no-danger -- Product descriptions pass through sanitizeShopifyHtml when fetched.
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </AccordionContent>
        </AccordionItem>
      ) : null}
      {FIXED_PANELS.map(({ body, id, title }) => (
        <AccordionItem key={id} value={id}>
          <AccordionTrigger className="py-4 text-base">{title}</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">{body}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
      <AccordionItem value="fitment">
        <AccordionTrigger className="py-4 text-base">Fitment help</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          Check the product description for compatible models and years. If you are unsure,{" "}
          <Link className="underline underline-offset-4" href="/contact">
            contact us
          </Link>{" "}
          with your scooter model and year before ordering.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="shipping">
        <AccordionTrigger className="py-4 text-base">Shipping &amp; returns</AccordionTrigger>
        <AccordionContent className="text-sm text-muted-foreground">
          Shipping costs are shown at checkout. Returns are subject to eligibility and conditions in
          our{" "}
          <Link className="underline underline-offset-4" href="/return-policy">
            return policy
          </Link>
          .
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
