import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Only facts the shop can stand behind: delivery and returns wait until those policies are set.
const FIXED_PANELS = [
  {
    body: "Jindal 202 stainless steel, which resists heat, chemicals and rust. Every part carries our manufacturing mark and the date it was made.",
    id: "materials",
    title: "Materials",
  },
  {
    body: "Packed in non woven and plastic bags. A standard bulk bundle holds 20 sets of three.",
    id: "packing",
    title: "Packing",
  },
  {
    body: "Wipe with a damp cloth. Do not use abrasive cleaners or polish that can scratch the finish.",
    id: "care",
    title: "Care",
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
