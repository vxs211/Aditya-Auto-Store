"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BuyButtons } from "@/components/product-detail/buy-buttons";
import { ProductFormPrice } from "@/components/product-detail/product-form";
import type { ProductFormVariant } from "@/lib/product/types";

interface StickyBuyBarProps {
  availableForSale: boolean;
  fallbackVariant: ProductFormVariant | undefined;
  image: { altText: string; url: string } | null;
  title: string;
}

// Shows once the real buy box has scrolled out of view; it reuses BuyButtons so both submit the same cart form.
export function StickyBuyBar({
  availableForSale,
  fallbackVariant,
  image,
  title,
}: StickyBuyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const buyBox = document.getElementById("buy-box");
    if (!buyBox) return;
    // Only once the buy box has scrolled off the top: appearing while it is still below would duplicate the button.
    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(Boolean(entry && !entry.isIntersecting && entry.boundingClientRect.bottom < 0)),
    );
    observer.observe(buyBox);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background transition-transform duration-200 data-[visible=false]:translate-y-full"
      data-visible={isVisible}
      inert={!isVisible}
    >
      <div className="mx-auto flex max-w-312 items-center gap-4 py-3 ps-4 pe-20 sm:pe-4 lg:px-6">
        {image && (
          <div className="relative hidden size-12 shrink-0 overflow-hidden rounded-lg bg-muted sm:block">
            <Image alt={image.altText} className="object-cover" fill sizes="48px" src={image.url} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{title}</p>
          {/* One line tall: the compare-at price and discount badge stay in the buy box above. */}
          <div className="[&_[data-slot=product-price]]:flex-nowrap [&_[data-slot=product-price]>*:not(:first-child)]:hidden [&_[data-slot=product-price]_*]:text-base">
            <ProductFormPrice fallbackVariant={fallbackVariant} />
          </div>
        </div>
        <div className="shrink-0">
          <BuyButtons
            availableForSale={availableForSale}
            buyWithShop={false}
            fallbackVariant={fallbackVariant}
            quantityPicker={false}
          />
        </div>
      </div>
    </div>
  );
}
