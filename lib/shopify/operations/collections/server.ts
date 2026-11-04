import { flattenConnection, gql } from "@shopify/hydrogen";

import type {
  Collection,
  CollectionFitment,
  CollectionWithThumbnail,
  FitmentBrand,
} from "@/lib/collections/types";
import { shopConfig } from "@/lib/config";
import type { CommerceLocale } from "@/lib/config/types";
import { assertStorefrontOk } from "@/lib/shopify/errors/server";
import { COLLECTION_FIELDS_FRAGMENT } from "@/lib/shopify/fragments/collection";
import { storefront } from "@/lib/shopify/storefront/server";
import {
  transformShopifyCollection,
  transformShopifyCollections,
} from "@/lib/shopify/transforms/collection";

const GET_COLLECTION_QUERY = gql(
  `#graphql
  query getCollection($handle: String!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      ...CollectionFields
    }
  }
`,
  [COLLECTION_FIELDS_FRAGMENT],
);

const GET_COLLECTIONS_QUERY = gql(
  `#graphql
  query getCollections($first: Int!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionFields
        }
      }
    }
  }
`,
  [COLLECTION_FIELDS_FRAGMENT],
);

const GET_COLLECTIONS_WITH_FEATURED_IMAGE_QUERY = gql(
  `#graphql
  query getCollectionsWithFeaturedImage($first: Int!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionFields
          products(first: 1) {
            edges {
              node {
                id
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`,
  [COLLECTION_FIELDS_FRAGMENT],
);

const IMAGE_FIELDS = `url altText width height`;

const GET_COLLECTION_FITMENT_QUERY = gql(
  `#graphql
  query getCollectionFitment($handle: String!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      banner: metafield(namespace: "custom", key: "banner_image") {
        reference {
          ... on MediaImage {
            image { ${IMAGE_FIELDS} }
          }
        }
      }
      body: metafield(namespace: "custom", key: "seo_body") {
        value
      }
      brand: metafield(namespace: "custom", key: "vehicle_brand") {
        reference {
          ... on Collection {
            handle
            title
          }
        }
      }
      models: metafield(namespace: "custom", key: "vehicle_models") {
        references(first: 50) {
          nodes {
            ... on Collection {
              handle
              title
              image { ${IMAGE_FIELDS} }
              products(first: 250) {
                nodes { id }
              }
            }
          }
        }
      }
    }
  }
`,
);

export async function fetchCollectionFitment({
  handle,
  locale = shopConfig.localization,
}: {
  handle: string;
  locale?: CommerceLocale;
}): Promise<CollectionFitment> {
  const response = await storefront.request(GET_COLLECTION_FITMENT_QUERY, {
    locale,
    variables: { handle },
  });
  assertStorefrontOk(response, "getCollectionFitment");
  const collection = response.data.collection;

  const toImage = (
    raw:
      | { altText?: string | null; height?: number | null; url: string; width?: number | null }
      | null
      | undefined,
    alt: string,
  ) =>
    raw
      ? {
          altText: raw.altText ?? alt,
          height: raw.height ?? 0,
          url: raw.url,
          width: raw.width ?? 0,
        }
      : null;

  const brand = collection?.brand?.reference;
  const banner = collection?.banner?.reference;
  const models = (collection?.models?.references?.nodes ?? []).flatMap((node) =>
    node && "handle" in node
      ? [
          {
            handle: node.handle,
            image: toImage(node.image, node.title),
            productCount: node.products.nodes.length,
            title: node.title,
          },
        ]
      : [],
  );

  return {
    banner: toImage(banner && "image" in banner ? banner.image : null, handle),
    body: collection?.body?.value ?? null,
    brand: brand && "handle" in brand ? { handle: brand.handle, title: brand.title } : null,
    models,
  };
}

const GET_FITMENT_BRANDS_QUERY = gql(
  `#graphql
  query getFitmentBrands($first: Int!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    collections(first: $first) {
      nodes {
        handle
        title
        image { ${IMAGE_FIELDS} }
        models: metafield(namespace: "custom", key: "vehicle_models") {
          references(first: 50) {
            nodes {
              ... on Collection {
                handle
                title
                image { ${IMAGE_FIELDS} }
              }
            }
          }
        }
      }
    }
  }
`,
);

// A collection with `custom.vehicle_models` set is a brand; everything else is a model or merchandising.
export async function fetchFitmentBrands({
  locale = shopConfig.localization,
}: { locale?: CommerceLocale } = {}): Promise<FitmentBrand[]> {
  const response = await storefront.request(GET_FITMENT_BRANDS_QUERY, {
    locale,
    variables: { first: 250 },
  });
  assertStorefrontOk(response, "getFitmentBrands");

  const toImage = (
    raw:
      | { altText?: string | null; height?: number | null; url: string; width?: number | null }
      | null
      | undefined,
    alt: string,
  ) =>
    raw
      ? {
          altText: raw.altText ?? alt,
          height: raw.height ?? 0,
          url: raw.url,
          width: raw.width ?? 0,
        }
      : null;

  return response.data.collections.nodes.flatMap((node) => {
    const models = node.models?.references?.nodes ?? [];
    if (models.length === 0) return [];
    return [
      {
        handle: node.handle,
        image: toImage(node.image, node.title),
        models: models.flatMap((model) =>
          model && "handle" in model
            ? [
                {
                  handle: model.handle,
                  image: toImage(model.image, model.title),
                  title: model.title,
                },
              ]
            : [],
        ),
        title: node.title,
      },
    ];
  });
}

export async function fetchCollection({
  handle,
  locale = shopConfig.localization,
}: {
  handle: string;
  locale?: CommerceLocale;
}): Promise<Collection | undefined> {
  const response = await storefront.request(GET_COLLECTION_QUERY, {
    locale,
    variables: { handle },
  });
  assertStorefrontOk(response, "getCollection");
  const { data } = response;

  if (!data.collection) return undefined;
  return transformShopifyCollection(data.collection);
}

export async function fetchCollections({
  limit = 250,
  locale = shopConfig.localization,
}: {
  limit?: number;
  locale?: CommerceLocale;
} = {}): Promise<Collection[]> {
  const response = await storefront.request(GET_COLLECTIONS_QUERY, {
    locale,
    variables: { first: limit },
  });
  assertStorefrontOk(response, "getCollections");

  return transformShopifyCollections(flattenConnection(response.data.collections));
}

export async function fetchCollectionsListing({
  limit = 250,
  locale = shopConfig.localization,
}: {
  limit?: number;
  locale?: CommerceLocale;
} = {}): Promise<CollectionWithThumbnail[]> {
  const response = await storefront.request(GET_COLLECTIONS_WITH_FEATURED_IMAGE_QUERY, {
    locale,
    variables: { first: limit },
  });
  assertStorefrontOk(response, "getCollectionsListing");
  const { data } = response;

  return flattenConnection(data.collections).map((node) => {
    const firstProduct = node.products.edges[0]?.node;
    const raw = node.image ?? firstProduct?.featuredImage ?? null;
    return {
      ...transformShopifyCollection(node),
      thumbnail: raw
        ? {
            altText: raw.altText ?? node.title,
            height: raw.height ?? 0,
            url: raw.url,
            width: raw.width ?? 0,
          }
        : null,
      thumbnailProductId: firstProduct?.id ?? null,
    };
  });
}
