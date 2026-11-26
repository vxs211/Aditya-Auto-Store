import { cn } from "cn";
import { Inter_Tight } from "next/font/google";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

import { DiscountBadge } from "@/components/product/discount-badge";
import { Price } from "@/components/product/price";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { getDiscountPercent } from "@/lib/product";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

function ProductCard({ className, children, ...props }: ComponentProps<"article">) {
  return (
    <article
      data-slot="product-card"
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-1.5 shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}

function ProductCardImageContainer({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="product-card-image-container"
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface ProductCardImageProps {
  alt: string;
  children?: ReactNode;
  className?: string;
  height?: number;
  loading?: "eager" | "lazy";
  outOfStock?: boolean;
  outOfStockText?: string;
  src?: string | null;
  width?: number;
}

function ProductCardImage({
  alt,
  children,
  className,
  height,
  loading = "lazy",
  outOfStock = false,
  outOfStockText,
  src,
  width,
}: ProductCardImageProps) {
  return (
    <div
      data-slot="product-card-image"
      // Catalogue shots are chrome on white; keep the tile plain so the part sits on a clean background.
      className={cn(
        "relative aspect-square overflow-hidden rounded-[1.15rem] bg-white",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          {...(width && height ? { height, width } : { fill: true })}
          className="absolute inset-0 size-full object-contain p-3"
          loading={loading}
          sizes="100vw"
        />
      ) : (
        <ImagePlaceholder className="size-full" />
      )}
      {outOfStock && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <span className="text-destructive-foreground font-medium text-xs px-2 py-1 bg-destructive rounded">
            {outOfStockText}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

function ProductCardContent({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="product-card-content"
      className={cn("flex flex-1 flex-col px-3 py-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ProductCardTitle({ className, children, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="product-card-title"
      className={cn(
        `${interTight.className} line-clamp-2 text-base/5 font-medium wrap-anywhere text-foreground`,
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

interface ProductCardPriceProps {
  amount: string;
  currencyCode: string;
  maxAmount?: string;
  compareAtAmount?: string;
  compareAtCurrencyCode?: string;
  className?: string;
}

function ProductCardPrice({
  amount,
  currencyCode,
  maxAmount,
  compareAtAmount,
  compareAtCurrencyCode,
  className,
}: ProductCardPriceProps) {
  const isRange = maxAmount != null && maxAmount !== amount;
  // A range's per-variant discounts differ, so a single compare-at would be misleading.
  const discountPercent = isRange ? null : getDiscountPercent(amount, compareAtAmount);
  return (
    <div data-slot="product-card-price" className={cn(className)}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="inline-flex flex-wrap items-baseline gap-x-1 text-sm font-medium text-foreground">
          <Price
            amount={amount}
            currencyCode={currencyCode}
            className={cn("text-sm whitespace-nowrap", discountPercent !== null ? "text-link" : "text-foreground")}
          />
          {isRange && (
            <>
              <span>–</span>
              <Price
                amount={maxAmount}
                currencyCode={currencyCode}
                className="text-sm whitespace-nowrap text-foreground"
              />
            </>
          )}
        </span>
        {discountPercent !== null && compareAtAmount && compareAtCurrencyCode ? (
          <>
            <Price
              amount={compareAtAmount}
              currencyCode={compareAtCurrencyCode}
              className="text-sm whitespace-nowrap text-muted-foreground line-through"
            />
            <DiscountBadge percent={discountPercent} />
          </>
        ) : null}
      </div>
    </div>
  );
}

function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="product-card-skeleton"
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-1.5 shadow-soft",
        className,
      )}
    >
      <div className="rounded-[1.15rem] bg-[#fff4ed]">
        <ImagePlaceholder className="aspect-square animate-pulse" />
      </div>
      <div className="grid h-16 box-content grid-rows-[auto_1fr] gap-2 p-4">
        <div className="h-4 w-full rounded bg-accent animate-pulse" />
        <div className="h-4 w-16 rounded bg-accent animate-pulse" />
      </div>
    </div>
  );
}

export {
  ProductCard,
  ProductCardContent,
  ProductCardImage,
  ProductCardImageContainer,
  ProductCardPrice,
  ProductCardSkeleton,
  ProductCardTitle,
};
