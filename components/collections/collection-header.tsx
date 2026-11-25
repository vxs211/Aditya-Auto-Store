import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "500", "600"] });

// Compact header used on shop / model collection pages: eyebrow + live product
// count on one row, then a large display title and a hairline divider.
export function CollectionShopHeader({
  count,
  subtitle,
  title,
}: {
  count?: number;
  subtitle?: string;
  title: string;
}) {
  return (
    <div className="border-b border-black/10 pb-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label font-medium tracking-[0.16em] text-primary uppercase">
          Shop the collection
        </p>
        {typeof count === "number" && (
          <p className="text-sm text-muted-foreground">
            {count} {count === 1 ? "product" : "products"}
          </p>
        )}
      </div>
      <h1 className={`${interTight.className} mt-3 text-h1 font-medium text-foreground`}>
        {title}
      </h1>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
