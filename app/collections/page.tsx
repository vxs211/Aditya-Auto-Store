import type { Metadata } from "next";

import { CollectionCard } from "@/components/collections/collection-card";
import { Container } from "@/components/ui/container";
import { Page } from "@/components/ui/page";
import { getCollectionsListing } from "@/lib/collections/server";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

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
  // "Home page" only features products on the home page; the Honda and TVS brand cards are not listed here.
  const collections = (await getCollectionsListing({})).filter(
    ({ handle, title }) =>
      handle !== "frontpage" && !["home page", "honda", "tvs"].includes(title.trim().toLowerCase()),
  );
  const viewCollectionLabel = "View this collection";
  return (
    <Page className="gap-0 bg-white pt-0 md:pt-0">
      <Container className="grid gap-10 py-12 sm:py-16 lg:py-24">
        <div className="grid justify-items-center gap-3 text-center">
          <h1 className="font-heading text-h2 text-balance">Collections</h1>
          <p className="text-body text-muted-foreground">Every brand and fitment in one place</p>
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
      </Container>
    </Page>
  );
}
