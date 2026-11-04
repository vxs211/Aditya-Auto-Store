import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  CollectionDetailSkeleton,
  CollectionLayout,
} from "@/components/collections/collection-page";
import { FitmentLayout } from "@/components/collections/fitment";
import { getCollection, getCollectionFitment, getCollections } from "@/lib/collections/server";
import { PLACEHOLDER_HANDLE } from "@/lib/static-params";

export async function generateStaticParams() {
  try {
    const collections = await getCollections();
    return collections.length > 0
      ? collections.map(({ handle }) => ({ handle }))
      : [{ handle: PLACEHOLDER_HANDLE }];
  } catch {
    return [{ handle: PLACEHOLDER_HANDLE }];
  }
}

export default function CollectionHandleLayout({
  children,
  params,
}: LayoutProps<"/collections/[handle]">) {
  return (
    <Suspense fallback={<CollectionDetailSkeleton />}>
      <CollectionHandleLayoutContent params={params}>{children}</CollectionHandleLayoutContent>
    </Suspense>
  );
}

async function CollectionHandleLayoutContent({
  children,
  params,
}: Pick<LayoutProps<"/collections/[handle]">, "children" | "params">) {
  const { handle } = await params;
  if (handle === PLACEHOLDER_HANDLE) notFound();
  const [collection, fitment] = await Promise.all([
    getCollection({ handle }),
    getCollectionFitment({ handle }),
  ]);
  if (!collection) notFound();

  // A brand lists model tiles instead of products, so its default grid is not rendered.
  if (fitment.models.length > 0) return <FitmentLayout collection={collection} fitment={fitment} />;
  if (fitment.brand) {
    return (
      <FitmentLayout collection={collection} fitment={fitment}>
        {children}
      </FitmentLayout>
    );
  }

  return (
    <CollectionLayout collection={collection} handle={handle}>
      {children}
    </CollectionLayout>
  );
}
