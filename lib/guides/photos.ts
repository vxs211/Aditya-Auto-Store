import type { FitmentBrand } from "@/lib/collections/types";

import type { Guide } from "./index";

export interface GuidePhoto {
  alt: string;
  url: string;
}

// Picks a scooter photograph for each post. A post can name a word (Activa, Jupiter) to get a matching model;
// the rest take photos from different brands in turn. A photo is not reused while an unused one remains.
export function pickGuidePhotos(guides: Guide[], brands: FitmentBrand[]): Map<string, GuidePhoto> {
  const photos = brands.flatMap((brand) =>
    brand.models.flatMap((model) =>
      model.image
        ? [
            {
              alt: model.image.altText || model.title,
              brand: brand.title,
              title: model.title,
              url: model.image.url,
            },
          ]
        : [],
    ),
  );
  const picked = new Map<string, GuidePhoto>();
  const used = new Set<string>();
  let cycle = 0;
  for (const guide of guides) {
    const word = guide.photo?.toLowerCase();
    const matches = word
      ? photos.filter((p) => `${p.title} ${p.brand}`.toLowerCase().includes(word))
      : [];
    let choice = matches.find((p) => !used.has(p.url)) ?? matches[0];
    if (!choice && photos.length > 0) {
      // Step across brands: the list is grouped by brand, so jump ahead by a prime to keep neighbours different.
      for (let tries = 0; tries < photos.length; tries += 1) {
        const candidate = photos[(cycle * 7 + tries) % photos.length];
        if (candidate && !used.has(candidate.url)) {
          choice = candidate;
          break;
        }
      }
      cycle += 1;
    }
    if (choice) {
      used.add(choice.url);
      picked.set(guide.slug, { alt: choice.alt, url: choice.url });
    }
  }
  return picked;
}
