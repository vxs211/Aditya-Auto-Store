import { cn } from "cn";
import Image from "next/image";

import { ArrowRIcon } from "@/components/ui/icon";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Link } from "@/components/ui/link";
import type { CollectionWithThumbnail } from "@/lib/collections/types";

export interface CollectionCardProps {
  className?: string;
  collection: CollectionWithThumbnail;
  viewCollectionLabel: string;
}

export function CollectionCard({
  className,
  collection,
  viewCollectionLabel,
}: CollectionCardProps) {
  const { handle, thumbnail, title } = collection;

  return (
    <Link
      aria-label={`${viewCollectionLabel}: ${title}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-1.5 shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
      href={`/collections/${handle}`}
    >
      <div
        data-slot="collection-card-image"
        className="relative aspect-4/3 overflow-hidden rounded-[1.15rem] bg-[linear-gradient(135deg,#fff4ed_0%,#ffe6d7_48%,#ff9d6c_100%)]"
      >
        <span
          aria-hidden="true"
          className="absolute -top-1/2 -left-1/3 size-[110%] rounded-full bg-white/60"
        />
        <span
          aria-hidden="true"
          className="absolute -right-1/2 -bottom-2/3 size-[120%] rounded-full border border-white/40 bg-white/25"
        />
        {thumbnail ? (
          <Image
            alt={thumbnail.altText || title}
            className="relative size-full object-cover"
            fill
            sizes="100vw"
            src={thumbnail.url}
          />
        ) : (
          <div className="relative grid size-full place-items-center">
            <ImagePlaceholder className="size-1/2" />
          </div>
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-b from-transparent to-white"
        />
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 px-3 py-4 text-center">
        <h2
          data-slot="collection-card-title"
          className="flex min-w-0 items-center justify-center text-base leading-[1.04] font-normal text-foreground sm:text-xl"
        >
          <span className="line-clamp-2">{title}</span>
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-auto flex h-8 w-fit max-w-full items-center justify-between gap-1.5 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] pl-3 pr-0.5 text-[11px] font-medium text-white shadow-md ring-1 ring-inset ring-white/25 sm:h-10 sm:justify-center sm:gap-2 sm:pl-3 sm:pr-1 sm:text-xs"
        >
          <span className="hidden sm:inline">
            {viewCollectionLabel === "View this collection"
              ? "View collection"
              : viewCollectionLabel}
          </span>
          <span className="sm:hidden">View</span>
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-foreground shadow-sm transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none sm:size-7">
            <ArrowRIcon className="size-4" />
          </span>
        </span>
      </div>
    </Link>
  );
}
