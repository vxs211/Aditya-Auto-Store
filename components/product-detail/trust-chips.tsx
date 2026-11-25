import {
  AwardIcon,
  CheckIcon,
  LockIcon,
  RulerIcon,
  ShieldCheckIcon,
  TruckIcon,
  UndoIcon,
} from "@/components/ui/icon";

const CHIPS = [
  { Icon: AwardIcon, label: "Premium\nquality" },
  { Icon: CheckIcon, label: "Vehicle\ncompatible" },
  { Icon: ShieldCheckIcon, label: "Strong &\nDurable" },
  { Icon: RulerIcon, label: "Precision\nFit" },
];

const GUARANTEES = [
  { Icon: TruckIcon, label: "Shipping at\ncheckout" },
  { Icon: UndoIcon, label: "Returns subject\nto policy" },
  { Icon: LockIcon, label: "Shopify\ncheckout" },
];

export function TrustChips() {
  return (
    <ul className="grid grid-cols-4 gap-x-4 gap-y-3" data-slot="product-trust-chips">
      {CHIPS.map(({ Icon, label }) => (
        <li className="flex flex-col items-center gap-1.5 text-center" key={label}>
          <span className="flex size-10 items-center justify-center rounded-full border border-border">
            <Icon aria-hidden className="size-4 text-primary" />
          </span>
          <span className="whitespace-pre-line text-xs leading-tight text-muted-foreground">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceGuarantees() {
  return (
    <ul className="grid grid-cols-3 gap-3" data-slot="product-service-guarantees">
      {GUARANTEES.map(({ Icon, label }) => (
        <li className="flex flex-col items-center gap-1.5 text-center" key={label}>
          <span className="flex size-10 items-center justify-center rounded-full border border-border">
            <Icon aria-hidden className="size-4 text-primary" />
          </span>
          <span className="whitespace-pre-line text-xs leading-tight text-muted-foreground">
            {label}
          </span>
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
