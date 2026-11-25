import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";

import { CollectionCard } from "@/components/collections/collection-card";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { Sections } from "@/components/ui/sections";
import { getCollectionsListing } from "@/lib/collections/server";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const interTight = Inter_Tight({ subsets: ["latin"], weight: ["400", "600"] });

export async function generateMetadata(): Promise<Metadata> {
  const title = "Collections";
  const description = "Browse products by collection.";
  return {
    title,
    description,
    alternates: buildAlternates({
      pathname: "/collections",
    }),
    openGraph: buildOpenGraph({
      title,
      description,
      url: "/collections",
      type: "website",
    }),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-default.png"],
    },
  };
}

export default async function CollectionsPage() {
  const collections = await getCollectionsListing({});
  const viewCollectionLabel = "View this collection";
  return (
    <Page className="gap-0 pt-0">
      <div aria-hidden="true" className="h-10 bg-[#F66101] sm:h-14" />
      <div
        aria-hidden="true"
        className="h-14 bg-[linear-gradient(180deg,#F66101_0%,#ff8a4d_45%,#ffe3d1_85%,#ffffff_100%)] sm:h-20"
      />
      <Container>
        <Sections className="gap-5">
          <div className="grid justify-items-center gap-2 text-center">
            <p className="text-label font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Browse
            </p>
            <h1
              className={`${interTight.className} text-2xl font-semibold text-primary sm:text-3xl`}
            >
              Collections
            </h1>
            <p className="text-sm text-muted-foreground">Every brand and fitment in one place</p>
          </div>

          {collections.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.handle}
                  collection={collection}
                  viewCollectionLabel={viewCollectionLabel}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No collections found.</p>
          )}
        </Sections>
      </Container>
    </Page>
  );
}
