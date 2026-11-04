import { cn } from "cn";
import type { ComponentProps } from "react";

import { DiscountBadge } from "@/components/product/discount-badge";
import { Price } from "@/components/product/price";
import { getDiscountPercent, isMarkedDown } from "@/lib/product";

interface ProductPriceProps extends ComponentProps<"div"> {
  amount: string;
  currencyCode: string;
  compareAtAmount?: string;
}

export function ProductPrice({
  amount,
  currencyCode,
  compareAtAmount,
  className,
  ...props
}: ProductPriceProps) {
  const markedDown = isMarkedDown(amount, compareAtAmount);
  const discountPercent = getDiscountPercent(amount, compareAtAmount);
  return (
    <div
      className={cn("flex items-center gap-2.5 flex-wrap", className)}
      data-slot="product-price"
      {...props}
    >
      <Price
        amount={amount}
        currencyCode={currencyCode}
        className={cn("text-xl", markedDown && "text-link")}
      />
      {markedDown && (
        <Price
          amount={compareAtAmount}
          currencyCode={currencyCode}
          className="text-xl line-through text-muted-foreground"
        />
      )}
      {discountPercent !== null ? <DiscountBadge percent={discountPercent} /> : null}
    </div>
  );
}
