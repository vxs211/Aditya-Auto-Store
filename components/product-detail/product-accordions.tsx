import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Generic panels every product page shows; the product's own description is split into its own "Description" tab above.
const FIXED_PANELS = [
  {
    body: "Built from premium-grade materials selected to hold up on the road. Every accessory is tested for fit, finish and durability before it ships.",
    id: "materials",
    title: "Materials & Build",
  },
  {
    body: "Wipe down with a damp cloth after rides. Avoid harsh chemicals or abrasive cleaners. Store in a cool, dry place when not in use.",
    id: "care",
    title: "Care & Maintenance",
  },
  {
    body: "Dispatched within 1–2 business days. Free standard shipping on orders over ₹999. Unused items in original packaging can be returned within 7 days of delivery.",
    id: "shipping",
    title: "Shipping & Returns",
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
    </Accordion>
  );
}
