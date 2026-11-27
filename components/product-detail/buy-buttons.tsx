"use client";

import { getShopPayButtonUrl } from "@shopify/hydrogen";
import { cn } from "cn";
import { useEffect, useId, useRef, useState } from "react";

import { useCartDrawer } from "@/components/cart/context";
import { Button } from "@/components/ui/button";
import {
  BagIcon,
  CheckIcon,
  LoaderIcon as Loader2,
  MinusIcon,
  PlusIcon,
} from "@/components/ui/icon";
import { IconSwap } from "@/components/ui/icon-swap";
import { formatPrice } from "@/lib/money";
import type { Money } from "@/lib/money/types";
import { getProductPurchaseOptions } from "@/lib/product";
import { useProductForm } from "@/lib/product/client";
import type { ProductFormVariant, SellingPlanAllocation } from "@/lib/product/types";

import { BuyWithShopLogo } from "./buy-with-shop-logo";

interface BuyButtonsProps {
  availableForSale?: boolean;
  buyWithShop?: boolean;
  fallbackVariant: ProductFormVariant | undefined;
  onAddToCart?: () => void;
  quantityPicker?: boolean;
}

export function BuyButtons({
  availableForSale = true,
  buyWithShop = true,
  fallbackVariant,
  onAddToCart,
  quantityPicker = true,
}: BuyButtonsProps) {
  const { formProps, pending, register, selectedVariant: storeVariant } = useProductForm();
  const selectedVariant = storeVariant ?? fallbackVariant;
  const isSelectionUnresolved = !storeVariant;
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [purchaseOption, setPurchaseOption] = useState("");
  const { plans, selectedPlan } = getProductPurchaseOptions(selectedVariant, purchaseOption);
  const missingRequiredPlan = Boolean(selectedVariant?.requiresSellingPlan && !selectedPlan);
  const { openOverlay } = useCartDrawer();
  const [justAdded, setJustAdded] = useState(false);
  const wasPending = useRef(false);

  // pending true -> false means the add finished: hold the success state briefly.
  useEffect(() => {
    if (wasPending.current && !pending) {
      setJustAdded(true);
      const timer = window.setTimeout(() => setJustAdded(false), 1800);
      wasPending.current = pending;
      return () => window.clearTimeout(timer);
    }
    wasPending.current = pending;
  }, [pending]);

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setIsBuyingNow(false);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);
  if (!selectedVariant) {
    return null;
  }
  const requiresBundleConfiguration = selectedVariant.requiresBundleConfiguration;
  const isOutOfStock = !selectedVariant.availableForSale;
  // Keep href while buying: removing it during the click cancels the anchor's navigation.
  const buyNowUrl = getShopPayButtonUrl({
    disabled: isSelectionUnresolved || isOutOfStock || requiresBundleConfiguration || pending,
    variants: [{ id: selectedVariant.id, quantity }],
  });
  const getButtonText = () => {
    if (pending) return "Adding...";
    if (justAdded) return "Added to cart";
    if (isSelectionUnresolved) return "Add to Cart";
    if (requiresBundleConfiguration) return "Choose bundle items";
    if (missingRequiredPlan) return "Subscription unavailable";
    if (isOutOfStock) return "Out of Stock";
    return "Add to Cart";
  };
  return (
    <form
      {...formProps({
        beforeSubmit: (event) => {
          if (
            isSelectionUnresolved ||
            isOutOfStock ||
            requiresBundleConfiguration ||
            missingRequiredPlan ||
            pending
          ) {
            event.preventDefault();
            return;
          }
          onAddToCart?.();
          openOverlay();
        },
      })}
      className="grid gap-2.5"
    >
      <PurchaseOptions
        disabled={pending || isSelectionUnresolved}
        onSelect={setPurchaseOption}
        plans={plans}
        price={selectedVariant.price}
        requiresSellingPlan={selectedVariant.requiresSellingPlan}
        selectedPlan={selectedPlan}
      />
      <input type="hidden" name="sellingPlanId" value={selectedPlan?.sellingPlan.id ?? ""} />
      <input type="hidden" {...register("merchandiseId", {})} />
      <input type="hidden" {...register("quantity", { value: quantity })} />
      <div className="flex flex-wrap gap-2.5">
        {quantityPicker ? (
          <div
            aria-label="Item quantity"
            className="grid h-12 w-32 shrink-0 grid-cols-[3rem_2rem_3rem] overflow-hidden rounded-lg bg-background ring-1 ring-border ring-inset transition-[width,margin,opacity,filter] duration-300 ease-(--ease-out-soft) motion-reduce:transition-none data-[collapsed=true]:pointer-events-none data-[collapsed=true]:-mr-2.5 data-[collapsed=true]:w-0 data-[collapsed=true]:opacity-0 data-[collapsed=true]:blur-sm"
            data-collapsed={justAdded}
            role="group"
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              className="flex size-12 cursor-pointer items-center justify-center p-0 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={quantity === 1}
              onClick={() => setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))}
            >
              <MinusIcon className="size-4 shrink-0" />
            </button>
            <span
              aria-live="polite"
              className="flex h-12 w-8 items-center justify-center text-sm font-medium tabular-nums"
              role="status"
            >
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="flex size-12 cursor-pointer items-center justify-center p-0 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={quantity === 99}
              onClick={() => setQuantity((currentQuantity) => Math.min(99, currentQuantity + 1))}
            >
              <PlusIcon className="size-4 shrink-0" />
            </button>
          </div>
        ) : null}
        <Button
          {...register("addToCart", {})}
          data-selection-unresolved={isSelectionUnresolved && !pending}
          disabled={
            isSelectionUnresolved ||
            isOutOfStock ||
            requiresBundleConfiguration ||
            missingRequiredPlan ||
            pending
          }
          data-added={justAdded}
          className="h-12 min-w-40 flex-1 justify-center duration-300 data-[added=true]:bg-success data-[added=true]:text-white data-[added=true]:hover:bg-success data-[selection-unresolved=true]:disabled:opacity-100"
        >
          <IconSwap
            active={justAdded}
            from={
              pending ? <Loader2 className="size-4 animate-spin" /> : <BagIcon className="size-4" />
            }
            to={<CheckIcon className="size-4" />}
          />
          <span aria-live="polite">{getButtonText()}</span>
        </Button>
      </div>
      {buyWithShop && !selectedPlan && !selectedVariant.requiresSellingPlan ? (
        <a
          aria-busy={isBuyingNow || undefined}
          aria-disabled={buyNowUrl ? undefined : true}
          aria-label="Buy with Shop Pay"
          className={cn(
            "flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-shop px-4 text-white transition-colors hover:bg-shop/85 aria-busy:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 data-[selection-unresolved=true]:aria-disabled:opacity-100",
            !availableForSale && "invisible",
          )}
          data-selection-unresolved={isSelectionUnresolved}
          href={buyNowUrl ?? undefined}
          onClick={(event) => {
            if (!buyNowUrl || isBuyingNow) {
              event.preventDefault();
              return;
            }
            setIsBuyingNow(true);
          }}
          rel="nofollow"
        >
          {isBuyingNow ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <span className="sr-only">Buy with</span>
              <BuyWithShopLogo aria-hidden="true" className="h-auto w-24.5" />
            </>
          )}
        </a>
      ) : null}
    </form>
  );
}

interface PurchaseOptionsProps {
  disabled?: boolean;
  onSelect?: (id: string) => void;
  plans: SellingPlanAllocation[];
  price: Money;
  requiresSellingPlan: boolean;
  selectedPlan: SellingPlanAllocation | undefined;
}

export function PurchaseOptions({
  disabled = false,
  onSelect,
  plans,
  price,
  requiresSellingPlan,
  selectedPlan,
}: PurchaseOptionsProps) {
  const purchaseOptionId = useId();
  if (plans.length === 0) return null;

  return (
    <fieldset className="grid gap-2.5" disabled={disabled}>
      <legend className="pb-2.5 text-sm font-medium">Purchase options</legend>
      {[
        ...(!requiresSellingPlan ? [{ id: "", name: "One-time purchase", price }] : []),
        ...plans.map((allocation) => ({
          id: allocation.sellingPlan.id,
          name: allocation.sellingPlan.name,
          price: allocation.price,
        })),
      ].map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border p-4 has-checked:border-foreground has-disabled:cursor-not-allowed has-disabled:opacity-50"
        >
          <input
            type="radio"
            name={purchaseOptionId}
            value={option.id}
            checked={(selectedPlan?.sellingPlan.id ?? "") === option.id}
            onChange={onSelect ? () => onSelect(option.id) : undefined}
            readOnly={!onSelect}
            className="size-4 cursor-pointer accent-foreground disabled:cursor-not-allowed"
          />
          <span className="flex flex-1 flex-wrap items-center justify-between gap-2.5 text-sm">
            <span>{option.name}</span>
            <span className="tabular-nums">{formatPrice(option.price)}</span>
          </span>
        </label>
      ))}
      {selectedPlan ? (
        <p className="text-sm text-muted-foreground">
          Recurring purchase.{" "}
          {selectedPlan.sellingPlan.description || "Subscription details are shown at checkout."}
        </p>
      ) : null}
    </fieldset>
  );
}
