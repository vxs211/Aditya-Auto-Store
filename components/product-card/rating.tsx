import { cn } from "cn";

import { StarIcon } from "@/components/ui/icon";

// Dummy review data until a reviews source (Shopify reviews app / metafield) is connected.
// Deterministic per product id so a card's rating stays stable across renders and pages.
export function getDummyRating(productId: string): { rating: number; reviewCount: number } {
  let h = 0;
  for (let i = 0; i < productId.length; i++) h = (h * 31 + productId.charCodeAt(i)) >>> 0;
  const rating = [4, 4.5, 4.5, 5, 5, 4.5][h % 6];
  const reviewCount = 3 + (h % 13);
  return { rating, reviewCount };
}

export function ProductCardRating({
  className,
  productId,
}: {
  className?: string;
  productId: string;
}) {
  const { rating, reviewCount } = getDummyRating(productId);
  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-1", className)}
      data-slot="product-card-rating"
    >
      <span aria-hidden className="flex shrink-0 gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            fill="currentColor"
            strokeWidth={0}
            className={cn(
              "size-3 sm:size-4",
              star <= Math.round(rating) ? "text-primary" : "text-border",
            )}
          />
        ))}
      </span>
      <span className="whitespace-nowrap text-xs text-muted-foreground">
        {reviewCount} sample reviews
      </span>
    </div>
  );
}
