"use client";

import { cn } from "cn";
import Image, { getImageProps } from "next/image";
import { type ReactNode, useEffect, useState } from "react";
import { preload } from "react-dom";

import { AutoPlayVideo } from "@/components/ui/auto-play-video";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icon";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import type { Image as ImageType, Video } from "@/lib/media/types";

import { Lightbox, LightboxTrigger } from "./lightbox";

type MediaItem =
  | { type: "image"; image: ImageType }
  | { type: "placeholder" }
  | { type: "video"; video: Video };

function mediaKey(item: MediaItem) {
  if (item.type === "image") return item.image.url;
  if (item.type === "video") return item.video.url;
  return "placeholder";
}

// `preload` alone does not set high fetch priority; other images stay lazy so the rail and mobile carousel never download up front.
const LCP_IMAGE_PROPS = { fetchPriority: "high", loading: "eager", preload: true } as const;

const LAZY_IMAGE_PROPS = { loading: "lazy" } as const;

// The desktop rail is above the fold, so preload every rail image while the lazy <img> keeps mobile from fetching them.
const DESKTOP_MEDIA = "(min-width: 1024px)";
const DESKTOP_RAIL_PRELOAD_COUNT = 4;

// The preload must share the <img>'s srcset and sizes, or the browser downloads the tile twice.
function preloadDesktopRailImage(image: ImageType) {
  const { props } = getImageProps({
    src: image.url,
    alt: "",
    fill: true,
    sizes: "100vw",
  });
  preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    media: DESKTOP_MEDIA,
  });
}

function MediaImage({
  item,
  title,
  idx,
  priority,
  className,
  fit = "cover",
}: {
  item: Extract<MediaItem, { type: "image" }>;
  title: string;
  idx: number;
  priority: boolean;
  className?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <Image
      src={item.image.url}
      alt={item.image.altText || `${title} image ${idx + 1}`}
      height={item.image.height}
      width={item.image.width}
      className={cn(
        "absolute inset-0 size-full",
        fit === "cover" ? "object-cover" : "object-contain",
        className,
      )}
      sizes="100vw"
      {...(priority ? LCP_IMAGE_PROPS : LAZY_IMAGE_PROPS)}
      draggable={false}
    />
  );
}

function MediaVideo({
  item,
  priority,
  className,
}: {
  item: Extract<MediaItem, { type: "video" }>;
  priority: boolean;
  className?: string;
}) {
  return (
    <AutoPlayVideo
      src={item.video.url}
      previewImage={
        item.video.previewImage
          ? {
              src: item.video.previewImage.url,
              alt: item.video.previewImage.altText || "",
            }
          : null
      }
      previewImageFetchPriority={priority ? "high" : "auto"}
      previewImageLoading={priority ? "eager" : "lazy"}
      className={cn("h-full w-full scale-[1.04] object-cover", className)}
    />
  );
}

function Tile({
  item,
  title,
  idx,
  priority,
  className,
  fit = "cover",
}: {
  item: MediaItem;
  title: string;
  idx: number;
  priority: boolean;
  className?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <div className={cn("relative overflow-hidden bg-wash", className)}>
      {item.type === "video" ? (
        <MediaVideo item={item} priority={priority} />
      ) : item.type === "placeholder" ? (
        <ImagePlaceholder className="size-full" />
      ) : (
        <LightboxTrigger image={item.image}>
          <MediaImage fit={fit} item={item} title={title} idx={idx} priority={priority} />
        </LightboxTrigger>
      )}
    </div>
  );
}

function GalleryArrows({ onStep }: { onStep: (direction: -1 | 1) => void }) {
  const className =
    "pointer-events-auto rounded-full bg-background text-foreground shadow-md ring-1 ring-border focus-visible:outline-2 focus-visible:outline-offset-2";
  return (
    <div className="pointer-events-none absolute inset-x-2 top-1/2 z-10 flex -translate-y-1/2 justify-between">
      <Button
        aria-label="Previous image"
        className={className}
        onClick={() => onStep(-1)}
        size="icon-lg"
        type="button"
        variant="inverse"
      >
        <ChevronLeftIcon aria-hidden="true" />
      </Button>
      <Button
        aria-label="Next image"
        className={className}
        onClick={() => onStep(1)}
        size="icon-lg"
        type="button"
        variant="inverse"
      >
        <ChevronRightIcon aria-hidden="true" />
      </Button>
    </div>
  );
}

function Rail({
  active,
  displayItems,
  mediaItems,
  title,
  onSelect,
}: {
  active: number;
  displayItems: MediaItem[];
  mediaItems: MediaItem[];
  title: string;
  onSelect: (index: number) => void;
}) {
  for (const [idx, item] of mediaItems.entries()) {
    if (idx >= DESKTOP_RAIL_PRELOAD_COUNT) break;
    // The first tile is the LCP image and already preloaded via next/image's `preload` prop.
    if (idx > 0 && item.type === "image") preloadDesktopRailImage(item.image);
  }
  return (
    <div className="flex flex-col gap-2.5">
      {displayItems.map((item, idx) => (
        <button
          type="button"
          key={mediaKey(item)}
          aria-label={`View image ${idx + 1}`}
          aria-pressed={idx === active}
          onClick={() => onSelect(idx)}
          className={cn(
            "relative aspect-square cursor-pointer overflow-hidden rounded-lg ring-1 transition-all",
            idx === active ? "ring-2 ring-foreground" : "ring-border opacity-70 hover:opacity-100",
          )}
        >
          {item.type === "video" ? (
            <MediaVideo item={item} priority={false} />
          ) : item.type === "placeholder" ? (
            <ImagePlaceholder className="size-full" />
          ) : (
            <MediaImage fit="contain" item={item} title={title} idx={idx} priority={false} />
          )}
        </button>
      ))}
    </div>
  );
}

function Carousel({
  mediaItems,
  title,
  hasColorSlot,
  children,
}: {
  mediaItems: MediaItem[];
  title: string;
  hasColorSlot: boolean;
  children?: ReactNode;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [itemCount, setItemCount] = useState(mediaItems.length);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const scrollToImage = (index: number) => {
    if (!container) return;
    container.scrollTo({
      left: index * container.offsetWidth,
      behavior: "smooth",
    });
    setSelectedIndex(index);
  };
  useEffect(() => {
    if (!container) return;

    // Variant/video items arrive via slot children, so count the rendered DOM, not just mediaItems.
    const sync = () => {
      const width = container.offsetWidth;
      if (width === 0) return;
      const total = Math.max(1, container.children.length);
      setItemCount(total);
      setSelectedIndex(Math.min(Math.max(0, Math.round(container.scrollLeft / width)), total - 1));
    };

    // New media set: snap back to the first slide before observers take over.
    container.scrollTo({ left: 0 });
    sync();

    container.addEventListener("scroll", sync, { passive: true });
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(container);
    const mutationObserver = new MutationObserver(sync);
    mutationObserver.observe(container, { childList: true });

    return () => {
      container.removeEventListener("scroll", sync);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [container]);
  return (
    <div className="grid gap-5">
      <div className="relative -mx-5">
        <div
          ref={setContainer}
          className="relative overflow-x-auto flex snap-x snap-mandatory overscroll-x-contain scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
          {mediaItems.map((item, idx) => {
            const priority = !hasColorSlot && idx === 0;
            return (
              <div
                key={mediaKey(item)}
                className="relative shrink-0 w-full snap-start snap-always overflow-hidden aspect-square bg-wash"
              >
                {item.type === "video" ? (
                  <MediaVideo item={item} priority={priority} />
                ) : item.type === "placeholder" ? (
                  <ImagePlaceholder className="size-full" />
                ) : (
                  <LightboxTrigger image={item.image}>
                    <MediaImage
                      fit="contain"
                      item={item}
                      title={title}
                      idx={idx}
                      priority={priority}
                    />
                  </LightboxTrigger>
                )}
              </div>
            );
          })}
        </div>
        {itemCount > 1 && (
          <GalleryArrows
            onStep={(direction) =>
              scrollToImage((selectedIndex + direction + itemCount) % itemCount)
            }
          />
        )}
      </div>

      {/* Dot indicators – reserve space but hide when there's only one image */}
      <div className={cn("flex justify-center gap-2", itemCount <= 1 && "invisible")}>
        {Array.from({ length: itemCount }, (_, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => scrollToImage(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              idx === selectedIndex
                ? "bg-foreground w-8"
                : "bg-muted-foreground/30 w-1.5 hover:bg-muted-foreground/50",
            )}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductMedia({
  colorImage,
  otherImages,
  videos,
  title,
  className,
}: {
  colorImage?: ImageType;
  otherImages: ImageType[];
  videos: Video[];
  title: string;
  className?: string;
}) {
  // Desktop: the rail picks the main image; a null color image means no partition.
  const [active, setActive] = useState(0);
  const sharedItems: MediaItem[] = [
    ...videos.map((video): MediaItem => ({ type: "video", video })),
    ...otherImages.map((image): MediaItem => ({ type: "image", image })),
  ];
  const displayItems: MediaItem[] = [
    ...(colorImage ? [{ type: "image" as const, image: colorImage }] : []),
    ...sharedItems,
  ];
  const isEmpty = displayItems.length === 0;
  const items: MediaItem[] = isEmpty ? [{ type: "placeholder" }] : displayItems;
  const clamped = Math.min(active, items.length - 1);
  useEffect(() => {
    if (active > clamped) setActive(clamped);
  }, [active, clamped]);

  return (
    <div className={className}>
      {/* Mobile keeps the carousel; the color image is its first slide when present. */}
      <div className="lg:hidden">
        <Carousel
          key={colorImage ? `color-${colorImage.url}` : "shared"}
          hasColorSlot={!!colorImage}
          mediaItems={
            sharedItems.length === 0 ? (isEmpty ? [{ type: "placeholder" }] : []) : sharedItems
          }
          title={title}
        >
          {colorImage ? (
            <div className="relative w-full shrink-0 snap-start snap-always overflow-hidden aspect-square bg-wash">
              <LightboxTrigger image={colorImage}>
                <MediaImage
                  fit="contain"
                  item={{ type: "image", image: colorImage }}
                  title={title}
                  idx={0}
                  priority
                />
              </LightboxTrigger>
            </div>
          ) : null}
        </Carousel>
      </div>

      {/* Desktop: main image with a clickable thumbnail rail on the left, the store's gallery treatment. */}
      <Lightbox label={title}>
        <div className="hidden lg:grid lg:grid-cols-[3.5rem_1fr] lg:gap-3">
          <Rail
            active={clamped}
            displayItems={displayItems}
            mediaItems={items}
            onSelect={setActive}
            title={title}
          />
          <div className="relative grid self-start">
            {items.map((item, idx) => (
              <Tile
                fit="contain"
                item={item}
                key={mediaKey(item)}
                title={title}
                idx={idx}
                priority={idx === 0}
                className={cn(
                  "aspect-square rounded-xl overflow-hidden",
                  idx !== clamped && "hidden",
                )}
              />
            ))}
            {items.length > 1 && (
              <GalleryArrows
                onStep={(direction) =>
                  setActive((clamped + direction + items.length) % items.length)
                }
              />
            )}
          </div>
        </div>
      </Lightbox>
    </div>
  );
}
