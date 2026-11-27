"use client";

import { cn } from "cn";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icon";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import type { Image as ProductImage } from "@/lib/media/types";

interface ProductImageCarouselProps {
  alt: string;
  children?: ReactNode;
  className?: string;
  images: ProductImage[];
  loading?: "eager" | "lazy";
  outOfStock?: boolean;
  outOfStockText?: string;
}

export function ProductImageCarousel({
  alt,
  children,
  className,
  images,
  loading = "lazy",
  outOfStock = false,
  outOfStockText,
}: ProductImageCarouselProps) {
  const [index, setIndex] = useState(0);
  // Reset when the product's image set changes (e.g. card reused for a different product).
  useEffect(() => {
    setIndex(0);
  }, [images]);

  const total = images.length;
  const current = images[Math.min(index, Math.max(0, total - 1))] ?? null;
  const hasMultiple = total > 1;

  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);

  return (
    <div
      data-slot="product-card-image"
      className={cn("relative aspect-square overflow-hidden rounded-2xl bg-white", className)}
    >
      {current ? (
        <Image
          key={current.url}
          alt={current.altText || alt}
          {...(current.width && current.height
            ? { width: current.width, height: current.height }
            : { fill: true })}
          className="absolute inset-0 size-full object-contain p-3 mix-blend-multiply"
          src={current.url}
          sizes="100vw"
        />
      ) : (
        <ImagePlaceholder className="size-full" />
      )}
      {outOfStock && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <span className="rounded bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
            {outOfStockText}
          </span>
        </div>
      )}
      {hasMultiple && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-1/2 items-center">
          <button
            aria-label="Previous image"
            className="pointer-events-auto ml-1 grid size-7 place-items-center rounded-full bg-white/90 text-foreground shadow-md ring-1 ring-inset ring-white/25 backdrop-blur-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => step(-1)}
            type="button"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
        </div>
      )}
      {hasMultiple && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-1/2 items-center justify-end">
          <button
            aria-label="Next image"
            className="pointer-events-auto mr-1 grid size-7 place-items-center rounded-full bg-white/90 text-foreground shadow-md ring-1 ring-inset ring-white/25 backdrop-blur-sm transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => step(1)}
            type="button"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      )}
      {children}
    </div>
  );
}
