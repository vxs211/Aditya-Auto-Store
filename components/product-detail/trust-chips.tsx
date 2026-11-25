import {
  AwardIcon as BadgeCheck,
  RulerIcon as Ruler,
  ShieldCheckIcon as ShieldCheck,
  WorkflowIcon as Factory,
} from "@/components/ui/icon";

const CHIPS = [
  { Icon: Factory, label: "Made in our own factory" },
  { Icon: ShieldCheck, label: "Jindal 202 stainless steel" },
  { Icon: Ruler, label: "Made to fit this model" },
  { Icon: BadgeCheck, label: "Marked and dated" },
];

export function TrustChips() {
  return (
    <ul
      className="grid grid-cols-4 gap-x-4 gap-y-3"
      data-slot="product-trust-chips"
    >
      {CHIPS.map(({ Icon, label }) => (
        <li
          className="flex flex-col items-center gap-1.5 text-center"
          key={label}
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-border">
            <Icon aria-hidden className="size-4 text-primary" />
          </span>
          <span className="text-xs leading-tight text-muted-foreground">{label}</span>
        </li>
      ))}
    </ul>
  );
}

export function StockIndicator({ availableForSale }: { availableForSale: boolean }) {
  return (
    <p className="flex items-center gap-2 text-sm">
      <span
        aria-hidden
        className={`size-2 rounded-full ${availableForSale ? "bg-positive" : "bg-muted-foreground"}`}
      />
      {availableForSale ? "In stock" : "Sold out"}
    </p>
  );
}
