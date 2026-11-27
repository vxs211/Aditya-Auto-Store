// Centred header used on shop and model collection pages: a small label, the title, and the live product count.
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
    <div className="grid justify-items-center gap-3 text-center">
      <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Shop the collection
      </p>
      <h1 className="font-heading text-h2">{title}</h1>
      {subtitle ? (
        <p className="max-w-xl text-body text-pretty text-muted-foreground">{subtitle}</p>
      ) : null}
      {typeof count === "number" && (
        <p className="rounded-full bg-white px-4 py-1.5 text-small text-muted-foreground shadow-card tabular-nums">
          {count} {count === 1 ? "product" : "products"}
        </p>
      )}
    </div>
  );
}
