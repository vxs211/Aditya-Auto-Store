"use client";

import {
  type CollectionState,
  filterEquals,
  getFilterRemovalUrl,
  isFilterInputActive,
  serializeCollectionParams,
} from "@shopify/hydrogen";
import { useCollection, useCollectionActions } from "@shopify/hydrogen/react";
import {
  type KeyboardEvent,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";

import { CheckIcon, LoaderIcon as LoaderCircleIcon, XIcon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Swatch } from "@/components/ui/swatch";
import { parseFilterInput } from "@/lib/collections";
import { shopConfig } from "@/lib/config";
import { getActiveFilterBadges } from "@/lib/filters";
import type { Filter, PriceRange } from "@/lib/filters/types";
import { formatCurrencySymbol, formatPrice } from "@/lib/money";

import { usePublishedFacets } from "./collection-browse-provider";

interface FilterSheetProps {
  children: ReactNode;
  label: string;
  trigger: ReactElement;
}

export function FilterSheet({ children, label, trigger }: FilterSheetProps) {
  return (
    <Sheet>
      <SheetTrigger render={trigger} />
      <SheetContent
        side="left"
        className="scroll-fade-y gap-0 overflow-y-auto bg-white px-4 pb-6 sm:px-5"
      >
        <div className="flex h-20 shrink-0 items-center gap-2">
          <SheetTitle className="font-heading text-2xl font-semibold tracking-[-0.1px]">
            {label}
          </SheetTitle>
        </div>
        {children}
      </SheetContent>
    </Sheet>
  );
}

interface PublishedCollectionFiltersProps {
  fallback: ReactNode;
}

// The collection layout's filter sheet shows the facets of the last results a page rendered, so it keeps them while the next view loads.
export function PublishedCollectionFilters({ fallback }: PublishedCollectionFiltersProps) {
  const facets = usePublishedFacets();
  if (!facets) return fallback;
  return <CollectionFilterSidebar filters={facets.filters} priceRange={facets.priceRange} />;
}

interface CollectionFilterSidebarProps {
  filters: Filter[];
  priceRange?: PriceRange;
}

export function CollectionFilterSidebar({ filters, priceRange }: CollectionFilterSidebarProps) {
  const state = useCollection();
  const actions = useCollectionActions();
  const priceFilter = state.filters.find((filter) => filter.price)?.price;
  const priceMin = priceFilter?.min ?? null;
  const priceMax = priceFilter?.max ?? null;
  const priceKey = `${priceMin ?? ""}:${priceMax ?? ""}`;
  const [priceInputs, setPriceInputs] = useState({
    key: priceKey,
    max: priceMax?.toString() ?? "",
    min: priceMin?.toString() ?? "",
  });
  // Applied price changed (URL/back-forward), so discard unsubmitted input.
  if (priceInputs.key !== priceKey) {
    setPriceInputs({
      key: priceKey,
      max: priceMax?.toString() ?? "",
      min: priceMin?.toString() ?? "",
    });
  }
  const minInput = priceInputs.key === priceKey ? priceInputs.min : (priceMin?.toString() ?? "");
  const maxInput = priceInputs.key === priceKey ? priceInputs.max : (priceMax?.toString() ?? "");
  const currentParams = serializeCollectionParams(state);
  const isPending = state.status === "loading";
  const activeBadges = getActiveFilterBadges(filters, state.filters);
  const applyPrice = (min: number | null, max: number | null) => {
    const next = state.filters.filter((filter) => !filter.price);
    if (min !== null || max !== null) {
      next.push({
        price: {
          ...(max !== null ? { max } : {}),
          ...(min !== null ? { min } : {}),
        },
      });
    }
    actions.setFilters(next);
  };
  return (
    <div className="flex flex-col gap-3">
      {activeBadges.length > 0 || priceFilter ? (
        <div className="flex flex-wrap items-center gap-2">
          {activeBadges.map((badge) => {
            const filter = parseFilterInput(
              findFilterInput(filters, badge.paramKey, badge.value) ?? "",
            );
            return (
              <FilterBadge
                key={`${badge.paramKey}-${badge.value}`}
                href={filter ? getFilterRemovalUrl(currentParams, filter) : undefined}
                label={badge.label}
                onRemove={() => filter && actions.toggleFilter(filter)}
              />
            );
          })}
          {priceFilter ? (
            <FilterBadge
              href={getFilterRemovalUrl(currentParams, { price: priceFilter })}
              label={formatPriceRangeLabel(priceMin, priceMax, priceRange?.currencyCode)}
              onRemove={() => applyPrice(null, null)}
            />
          ) : null}
          <button
            className="inline-flex h-8 cursor-pointer items-center rounded-full px-3 text-xs font-semibold text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            onClick={() => actions.setFilters([])}
            type="button"
          >
            Clear all
          </button>
        </div>
      ) : null}

      {priceRange ? (
        <FilterSection title="Price">
          <div className="flex items-center gap-2">
            <PriceInput
              currencyCode={priceRange.currencyCode}
              label="Minimum price"
              onChange={(min) => setPriceInputs((prev) => ({ ...prev, min }))}
              placeholder="From"
              value={minInput}
            />
            <span className="text-muted-foreground" aria-hidden="true">
              –
            </span>
            <PriceInput
              currencyCode={priceRange.currencyCode}
              label="Maximum price"
              onChange={(max) => setPriceInputs((prev) => ({ ...prev, max }))}
              placeholder="To"
              value={maxInput}
            />
            <button
              aria-label="Apply price"
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] text-white shadow-md ring-1 ring-white/25 ring-inset transition-shadow hover:shadow-lg"
              onClick={() => applyPrice(parsePriceValue(minInput), parsePriceValue(maxInput))}
              type="button"
            >
              <CheckIcon className="size-5" />
            </button>
          </div>
        </FilterSection>
      ) : null}

      {filters.map((filter) =>
        filter.values.length === 0 ? null : (
          <FilterSection key={filter.id} title={filter.label}>
            {filter.presentation === "swatch" ? (
              <div className="flex flex-wrap gap-2.5">
                {filter.values.map((value) => {
                  const isSelected = isFilterInputActive(state.filters, value.input);
                  return (
                    <Link
                      key={value.id}
                      aria-label={`Filter by ${filter.label}: ${value.label}`}
                      aria-pressed={isSelected}
                      className="block cursor-pointer"
                      href={buildToggleHref(state, value.input)}
                      onKeyDown={pressOnSpace}
                      role="button"
                      scroll={false}
                      onClick={(event) => {
                        event.preventDefault();
                        actions.toggleFilterInput(value.input);
                      }}
                    >
                      <Swatch
                        color={value.swatch?.color}
                        image={value.swatch?.image}
                        label={value.label}
                        selected={isSelected}
                      />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {filter.values.map((value) => {
                  const isSelected = isFilterInputActive(state.filters, value.input);
                  return (
                    <FilterOption
                      key={value.id}
                      count={value.count}
                      href={buildToggleHref(state, value.input)}
                      label={value.label}
                      pending={isPending && isSelected}
                      selected={isSelected}
                      onClick={(event) => {
                        event.preventDefault();
                        actions.toggleFilterInput(value.input);
                      }}
                    />
                  );
                })}
              </div>
            )}
          </FilterSection>
        ),
      )}
    </div>
  );
}

interface FilterSectionProps {
  children: ReactNode;
  title: string;
}

function FilterSection({ children, title }: FilterSectionProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card">
      <span className="font-heading text-base font-semibold text-foreground">{title}</span>
      {children}
    </div>
  );
}

interface FilterBadgeProps {
  href?: string;
  label: string;
  onRemove: () => void;
}

function FilterBadge({ href, label, onRemove }: FilterBadgeProps) {
  const className =
    "inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full bg-[#fff1e8] px-3 text-xs font-semibold text-foreground transition-colors hover:bg-primary-tint-hover";
  const content = (
    <>
      {label}
      <XIcon className="size-3" />
    </>
  );
  const removeLabel = `Remove filter: ${label}`;
  if (!href) {
    return (
      <button aria-label={removeLabel} className={className} onClick={onRemove} type="button">
        {content}
      </button>
    );
  }
  return (
    <Link
      aria-label={removeLabel}
      className={className}
      href={href}
      scroll={false}
      onClick={(event) => {
        event.preventDefault();
        onRemove();
      }}
    >
      {content}
    </Link>
  );
}

interface FilterOptionProps {
  count?: number;
  href: string;
  label: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
  pending: boolean;
  selected: boolean;
}

function FilterOption({ count, href, label, onClick, pending, selected }: FilterOptionProps) {
  return (
    <Link
      aria-pressed={selected}
      href={href}
      onKeyDown={pressOnSpace}
      role="button"
      data-selected={selected}
      className="flex min-h-11 items-center gap-3 rounded-xl px-2 text-left text-sm text-foreground transition-colors hover:bg-[#fff1e8] data-[selected=true]:bg-[#fff1e8] data-[selected=true]:font-semibold"
      onClick={onClick}
    >
      <span
        aria-hidden="true"
        className="flex size-5 shrink-0 items-center justify-center rounded-md bg-white shadow-card data-[on=true]:bg-primary data-[on=true]:text-white"
        data-on={selected || pending}
      >
        {pending ? (
          <LoaderCircleIcon className="size-3.5 animate-spin" />
        ) : selected ? (
          <CheckIcon className="size-3.5" />
        ) : null}
      </span>
      <span className="min-w-0 flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs font-normal text-muted-foreground tabular-nums">{count}</span>
      )}
    </Link>
  );
}

interface PriceInputProps {
  currencyCode?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

function PriceInput({ currencyCode, label, onChange, placeholder, value }: PriceInputProps) {
  return (
    <div className="flex h-11 min-w-0 flex-1 items-center rounded-full bg-white px-3.5 shadow-card focus-within:ring-2 focus-within:ring-primary/40">
      <span className="text-base text-muted-foreground md:text-sm">
        {currencyCode ? formatCurrencySymbol(currencyCode) : null}
      </span>
      <Input
        aria-label={label}
        type="number"
        step="0.01"
        min="0"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-auto border-0 bg-transparent px-1 shadow-none outline-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

// Filter links toggle in place, so they take the button role that `aria-pressed` needs, and buttons answer Space.
function pressOnSpace(event: KeyboardEvent<HTMLAnchorElement>) {
  if (event.key !== " ") return;
  event.preventDefault();
  event.currentTarget.click();
}

function buildToggleHref(
  state: Pick<CollectionState, "filters" | "reverse" | "sortKey">,
  input: string,
): string {
  const filter = parseFilterInput(input);
  if (!filter) return "?";
  const params = serializeCollectionParams(state);
  if (state.filters.some((current) => filterEquals(current, filter))) {
    return getFilterRemovalUrl(params, filter);
  }
  const next = serializeCollectionParams({ ...state, filters: [...state.filters, filter] });
  const query = next.toString();
  return query ? `?${query}` : "?";
}

function findFilterInput(filters: Filter[], key: string, value: string): string | undefined {
  return filters
    .find((filter) => filter.paramKey === key)
    ?.values.find((item) => item.value === value)?.input;
}

function formatPriceRangeLabel(
  min: number | null,
  max: number | null,
  currencyCode: string | undefined,
): string {
  const format = (value: number) =>
    currencyCode
      ? formatPrice({ amount: String(value), currencyCode })
      : new Intl.NumberFormat(shopConfig.localization.locale).format(value);
  if (min !== null && max !== null) return `${format(min)} - ${format(max)}`;
  if (min !== null) return `From ${format(min)}`;
  return `Up to ${format(max ?? 0)}`;
}

function parsePriceValue(value: string): number | null {
  if (!value) return null;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) || parsed < 0 ? null : parsed;
}
