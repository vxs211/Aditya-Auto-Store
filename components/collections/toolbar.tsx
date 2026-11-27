import type { ReactNode } from "react";

import { ProductsGridSkeleton } from "@/components/product/products-grid";
import { ChevronDownIcon, SlidersHorizontalIcon } from "@/components/ui/icon";
import { PRODUCTS_PER_PAGE } from "@/lib/collections";
import type { SortValue } from "@/lib/collections/types";

import { CollectionActiveFilterCountBadge } from "./collection-browse-provider";
import { FilterSheet } from "./filters-client";
import { CollectionsSortSelect } from "./sort-select";

interface BrowseToolbarProps {
  filters: ReactNode;
  resultCount?: ReactNode;
  sortExclude?: SortValue[];
}

export function BrowseToolbar({ filters, resultCount, sortExclude }: BrowseToolbarProps) {
  return (
    <ToolbarLayout
      filterSheet={
        <FilterSheet
          label="Filters"
          trigger={
            <button
              type="button"
              className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-sm font-medium shadow-card transition-shadow hover:shadow-card-hover"
            >
              <SlidersHorizontalIcon className="size-4" />
              <span>Filters</span>
              <CollectionActiveFilterCountBadge />
            </button>
          }
        >
          {filters}
        </FilterSheet>
      }
      resultCount={resultCount}
      sortSelect={<CollectionsSortSelect exclude={sortExclude} />}
    />
  );
}

interface BrowseFallbackProps {
  resultCount?: ReactNode;
}

export function BrowseFallback({ resultCount }: BrowseFallbackProps) {
  return (
    <>
      <ToolbarLayout
        filterSheet={
          <button
            type="button"
            className="flex h-10 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-sm font-medium shadow-card transition-shadow hover:shadow-card-hover"
          >
            <SlidersHorizontalIcon className="size-4" />
            <span>Filters</span>
          </button>
        }
        resultCount={resultCount}
        sortSelect={
          <div className="flex h-10 w-fit items-center justify-between gap-2 rounded-full bg-white px-4 text-sm whitespace-nowrap shadow-card">
            <span>Sort</span>
            <ChevronDownIcon className="size-4 text-muted-foreground opacity-50" />
          </div>
        }
      />
      <ProductsGridSkeleton
        count={PRODUCTS_PER_PAGE}
        className="sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      />
    </>
  );
}

interface ToolbarLayoutProps {
  filterSheet: ReactNode;
  resultCount?: ReactNode;
  sortSelect: ReactNode;
}

function ToolbarLayout({ filterSheet, resultCount, sortSelect }: ToolbarLayoutProps) {
  return (
    <div className="flex items-center gap-5">
      {filterSheet}
      <div className="ml-auto flex items-center gap-5">
        {resultCount !== undefined && (
          <div className="hidden items-center text-sm text-muted-foreground sm:flex">
            {resultCount}
          </div>
        )}
        {sortSelect}
      </div>
    </div>
  );
}
