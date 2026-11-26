"use client";

import Image from "next/image";
import { useState } from "react";

import { Link } from "@/components/ui/link";

const BRAND_LOGOS: Partial<Record<string, string>> = {
  "bajaj-chetak-accessories": "bajaj",
  honda: "honda",
  "suzuki-accessories": "suzuki",
  "tvs-accessories": "tvs",
  "yamaha-accessories": "yamaha",
};

const CHOICE_CLASS =
  "cursor-pointer rounded-full border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50";

interface ShoppingModel {
  handle: string;
  title: string;
}

export interface ShoppingBrand extends ShoppingModel {
  models: ShoppingModel[];
}

interface ShoppingQuestionsProps {
  brands: ShoppingBrand[];
  onVehicleSelect: () => void;
}

export function ShoppingQuestions({ brands, onVehicleSelect }: ShoppingQuestionsProps) {
  const [searching, setSearching] = useState(false);
  const [brand, setBrand] = useState<ShoppingBrand>();
  return (
    <div className="grid gap-4 rounded-2xl bg-muted p-3">
      <p aria-live="polite" className="font-semibold">
        {brand
          ? "Which vehicle do you have?"
          : searching
            ? "Which brand are you shopping for?"
            : "What are you looking for?"}
      </p>
      <div className="flex flex-wrap gap-2">
        {!searching ? (
          <button
            className={CHOICE_CLASS}
            disabled={brands.length === 0}
            onClick={() => setSearching(true)}
            type="button"
          >
            Search your brand
          </button>
        ) : brand ? (
          brand.models.map((vehicle) => (
            <Link
              className={CHOICE_CLASS}
              href={`/collections/${vehicle.handle}`}
              key={vehicle.handle}
              onNavigate={onVehicleSelect}
            >
              {vehicle.title}
            </Link>
          ))
        ) : (
          brands.map((item) => (
            <Link
              className={CHOICE_CLASS}
              href={`/collections/${item.handle}`}
              key={item.handle}
              onNavigate={() => setBrand(item)}
            >
              <span className="inline-flex items-center gap-2">
                {BRAND_LOGOS[item.handle] && (
                  <Image
                    alt=""
                    className="size-8 object-contain sm:size-5"
                    height={20}
                    sizes="100vw"
                    src={`/brand/manufacturers/${BRAND_LOGOS[item.handle]}.svg`}
                    width={20}
                  />
                )}
                {item.title}
              </span>
            </Link>
          ))
        )}
      </div>
      {searching && (
        <>
          {brand ? (
            <Link
              className="w-fit text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              href="/collections"
              onNavigate={() => setBrand(undefined)}
            >
              Back
            </Link>
          ) : (
            <button
              className="w-fit text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
              onClick={() => setSearching(false)}
              type="button"
            >
              Back
            </button>
          )}
        </>
      )}
    </div>
  );
}
