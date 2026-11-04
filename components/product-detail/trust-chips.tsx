import { BadgeCheck, Factory, Ruler, ShieldCheck } from "lucide-react";

const CHIPS = [
  { Icon: Factory, label: "Made in our own factory" },
  { Icon: ShieldCheck, label: "Jindal 202 stainless steel" },
  { Icon: Ruler, label: "Made to fit this model" },
  { Icon: BadgeCheck, label: "Marked and dated" },
];

export function TrustChips() {
  return (
    <ul className="grid grid-cols-2 gap-3" data-slot="product-trust-chips">
      {CHIPS.map(({ Icon, label }) => (
        <li className="flex items-center gap-2 text-sm text-muted-foreground" key={label}>
          <Icon aria-hidden className="size-4 shrink-0 text-primary" />
          {label}
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
