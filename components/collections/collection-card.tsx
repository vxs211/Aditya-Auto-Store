import { cn } from "cn";
import { Inter_Tight } from "next/font/google";
import Image from "next/image";

import { ArrowRIcon } from "@/components/ui/icon";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Link } from "@/components/ui/link";
import type { CollectionWithThumbnail } from "@/lib/collections/types";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

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
      <div className="grid grid-rows-[2.5rem_auto] items-center justify-items-center gap-2 px-3 py-4 text-center">
        <h2
          data-slot="collection-card-title"
          className={`${interTight.className} flex min-w-0 items-center justify-center text-xl leading-tight font-normal text-foreground`}
        >
          <span className="line-clamp-1">{title}</span>
        </h2>
        <span
          aria-hidden="true"
          className="flex h-10 items-center gap-2 rounded-full border border-primary-hover bg-linear-to-b from-primary from-65% to-[#ffae78] pl-3 pr-1 text-xs font-medium text-white shadow-md ring-1 ring-inset ring-white/25"
        >
          {viewCollectionLabel === "View this collection" ? "View collection" : viewCollectionLabel}
          <span className="grid size-7 place-items-center rounded-full bg-white text-foreground shadow-sm transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none">
            <ArrowRIcon className="size-4" />
          </span>
        </span>
      </div>
    </Link>
  );
}
