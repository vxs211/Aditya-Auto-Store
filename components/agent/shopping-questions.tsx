"use client";

import { cn } from "cn";
import Image from "next/image";
import { type ReactNode, useState } from "react";

import { ChevronRightIcon, MessageSquareTextIcon, SearchIcon } from "@/components/ui/icon";
import { Link } from "@/components/ui/link";

const BRAND_LOGOS: Partial<Record<string, string>> = {
  "bajaj-chetak-accessories": "bajaj",
  honda: "honda",
  "suzuki-accessories": "suzuki",
  "tvs-accessories": "tvs",
  "yamaha-accessories": "yamaha",
};

const ENTER =
  "animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both motion-reduce:animate-none";
const stagger = (i: number) => ({ animationDelay: `${Math.min(i, 8) * 45}ms` });

const TILE_CLASS =
  "group flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-border bg-background p-3 text-left text-sm font-medium shadow-sm transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5 hover:border-primary hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50";

function BotBubble({ children }: { children: ReactNode }) {
  return (
    <div className={`flex items-end gap-2 ${ENTER}`}>
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white">
        <MessageSquareTextIcon className="size-4" />
      </span>
      <p
        aria-live="polite"
        className="max-w-[85%] rounded-2xl rounded-bl-sm bg-background px-3.5 py-2.5 text-sm font-medium shadow-sm"
      >
        {children}
      </p>
    </div>
  );
}

function UserBubble({ children }: { children: ReactNode }) {
  return (
    <p
      className={`ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-foreground px-3.5 py-2 text-sm text-white ${ENTER}`}
    >
      {children}
    </p>
  );
}

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
  const step = brand ? 3 : searching ? 2 : 1;
  const backClass =
    "w-fit rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";
  return (
    <div className="grid gap-3">
      <div aria-hidden className="h-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-(--ease-out-soft) motion-reduce:transition-none"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
      <BotBubble>
        {brand
          ? "Which vehicle do you have?"
          : searching
            ? "Which brand are you shopping for?"
            : "What are you looking for?"}
      </BotBubble>
      {searching && <UserBubble>Search your brand</UserBubble>}
      {brand && <UserBubble>{brand.title}</UserBubble>}
      <div className={cn("grid gap-2", searching && !brand ? "grid-cols-2" : "")}>
        {!searching ? (
          <button
            className={cn(TILE_CLASS, "justify-between p-3.5 ", ENTER)}
            disabled={brands.length === 0}
            onClick={() => setSearching(true)}
            type="button"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <SearchIcon className="size-4" />
              </span>
              Search your brand
            </span>
            <ChevronRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : brand ? (
          <div className="flex flex-wrap gap-2">
            {brand.models.map((vehicle, i) => (
              <Link
                className={cn(
                  "rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium shadow-sm transition-[transform,box-shadow,border-color,color] duration-150 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md",
                  ENTER,
                )}
                href={`/collections/${vehicle.handle}`}
                key={vehicle.handle}
                onNavigate={onVehicleSelect}
                style={stagger(i)}
              >
                {vehicle.title}
              </Link>
            ))}
          </div>
        ) : (
          brands.map((item, i) => (
            <Link
              className={cn(TILE_CLASS, ENTER)}
              href={`/collections/${item.handle}`}
              key={item.handle}
              onNavigate={() => setBrand(item)}
              style={stagger(i)}
            >
              {BRAND_LOGOS[item.handle] && (
                <Image
                  alt=""
                  className="size-7 shrink-0 object-contain"
                  height={28}
                  sizes="100vw"
                  src={`/brand/manufacturers/${BRAND_LOGOS[item.handle]}.svg`}
                  width={28}
                />
              )}
              <span className="min-w-0 truncate">{item.title}</span>
            </Link>
          ))
        )}
      </div>
      {searching && (
        <>
          {brand ? (
            <Link className={backClass} href="/collections" onNavigate={() => setBrand(undefined)}>
              ← Back
            </Link>
          ) : (
            <button className={backClass} onClick={() => setSearching(false)} type="button">
              ← Back
            </button>
          )}
        </>
      )}
    </div>
  );
}
