import { cn } from "cn";
import Image from "next/image";

import type { Guide } from "@/lib/guides";
import type { GuidePhoto } from "@/lib/guides/photos";

// The picture for a post: our logo, the headline and a scooter photograph, on the light brand field.
export function BlogThumb({
  guide,
  photo,
  priority,
  className,
  compact,
}: {
  compact?: boolean;
  className?: string;
  guide: Pick<Guide, "headline" | "title">;
  photo?: GuidePhoto;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        compact ? "aspect-3/2" : "aspect-16/10",
        className,
      )}
    >
      <Image
        alt=""
        className="absolute top-5 left-5 h-6 w-auto"
        height={24}
        src="/brand/aditya-logo-horizontal-orange-cropped.svg"
        unoptimized
        width={120}
      />
      <p
        className={cn(
          "absolute left-5 z-10 font-heading text-balance",
          compact
            ? "top-12 max-w-[48%] text-base leading-tight font-semibold"
            : "top-16 max-w-[52%] text-h3",
        )}
      >
        {guide.headline}
      </p>
      {photo && (
        <div className="absolute inset-y-0 right-0 w-[56%]">
          <Image
            alt={photo.alt}
            className="object-contain object-right-bottom mix-blend-multiply"
            fill
            priority={priority}
            sizes="100vw"
            src={photo.url}
          />
        </div>
      )}
    </div>
  );
}

export function formatPostDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  });
}
