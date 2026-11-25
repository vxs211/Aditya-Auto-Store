import type { ProductDetails, ProductVariant, SelectedOption } from "@/lib/product/types";

// Dev-only placeholder product so the PDP design can be reviewed without live Shopify data.
// Guarded behind NODE_ENV === "development" in lib/shopify/operations/products/server.ts; never served in production.
export const DUMMY_PRODUCT_HANDLE = "demo-scooter";

const INR = "INR";
const money = (amount: number) => ({ amount: String(amount), currencyCode: INR });

interface VariantDef {
  id: string;
  price: number;
  compareAtPrice?: number;
  color: string;
  colorName: string;
  edition: "Base" | "Sport";
  image: string;
  altText: string;
}

const variantDefs: VariantDef[] = [
  {
    altText: "Demo scooter, blue, base edition",
    color: "#1e3a8a",
    colorName: "Blue",
    edition: "Base",
    id: "1001",
    image: "activa.png",
    price: 104900,
  },
  {
    altText: "Demo scooter, blue, sport edition",
    color: "#1e3a8a",
    colorName: "Blue",
    edition: "Sport",
    id: "1002",
    image: "activa.png",
    price: 114900,
  },
  {
    altText: "Demo scooter, black, base edition",
    color: "#111827",
    colorName: "Black",
    edition: "Base",
    id: "1003",
    image: "Access.png",
    price: 104900,
  },
  {
    altText: "Demo scooter, black, sport edition",
    color: "#111827",
    colorName: "Black",
    edition: "Sport",
    id: "1004",
    image: "Access.png",
    compareAtPrice: 129900,
    price: 114900,
  },
];

const gallery = [
  { altText: "Demo scooter, side view", image: "activa.png" },
  { altText: "Demo scooter, front view", image: "Access.png" },
  { altText: "Demo scooter, rear view", image: "Chetak.png" },
];

function variantFor(def: VariantDef, index: number): ProductVariant {
  return {
    availableForSale: true,
    bundleParents: [],
    components: [],
    compareAtPrice: def.compareAtPrice ? money(def.compareAtPrice) : undefined,
    id: `gid://shopify/ProductVariant/${def.id}`,
    image: { altText: def.altText, height: 1440, url: `/vehicles/${def.image}`, width: 1920 },
    price: money(def.price),
    productHandle: DUMMY_PRODUCT_HANDLE,
    productTitle: "Demo 110 Scooter",
    requiresComponents: false,
    requiresSellingPlan: false,
    selectedOptions: [
      { name: "Color", value: def.colorName },
      { name: "Edition", value: def.edition },
    ],
    sellingPlanAllocations: [],
    title: `Demo 110 Scooter - ${def.colorName} ${def.edition}`,
  };
}

export function dummyProduct(handle: string): ProductDetails | undefined {
  if (handle !== DUMMY_PRODUCT_HANDLE) return undefined;
  const first = variantDefs[0];
  const prices = variantDefs.map((v) => v.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minCompare = Math.min(
    ...variantDefs.filter((v) => v.compareAtPrice).map((v) => v.compareAtPrice!),
  );
  return {
    adjacentVariants: [],
    allVariantsInStock: true,
    availableForSale: true,
    category: {
      ancestors: [],
      id: "gid://shopify/ProductCategory/1",
      name: "Demo",
    },
    compareAtPriceRange: {
      maxVariantPrice: money(minCompare),
      minVariantPrice: money(minCompare),
    },
    currencyCode: INR,
    defaultVariant: variantFor(first, 0),
    defaultVariantSelectedOptions: [
      { name: "Color", value: first.colorName },
      { name: "Edition", value: first.edition },
    ],
    defaultVariantSku: "DEMO-110-BLUE",
    description:
      "A dependable commuter scooter with a wide deck, an upright riding position and a 5 L under-seat storage tray. The 110 cc air-cooled engine is mated to a CVT transmission.",
    descriptionHtml: [
      "<h3>Overview</h3>",
      "<p>A dependable commuter scooter with a wide deck, upright riding position and a 5&nbsp;L under-seat storage tray. The 110&nbsp;cc air-cooled engine is mated to a CVT transmission, so there is nothing to shift on a packed morning.</p>",
      "<h3>Highlights</h3>",
      "<ul>",
      "<li>110&nbsp;cc air-cooled single-cylinder engine</li>",
      "<li>Digital speedometer with mileage and fuel indicators</li>",
      "<li>Front disc and rear drum braking</li>",
      "<li>LED headlamp and indicator lamps</li>",
      "</ul>",
      "<h3>Specifications</h3>",
      "<p>55&nbsp;L tank · 72&nbsp;km/L certified mileage · 106&nbsp;kg kerb weight · 13&nbsp;mm ground clearance · service interval 6,000&nbsp;km.</p>",
    ].join("\n"),
    // No `v1_`-encoded stock string: Hydrogen then falls back to each variant's own availableForSale flag.
    encodedVariantAvailability: undefined,
    encodedVariantExistence: undefined,
    featuredImage: {
      altText: gallery[0].altText,
      height: 1440,
      url: `/vehicles/${gallery[0].image}`,
      width: 1920,
    },
    handle: DUMMY_PRODUCT_HANDLE,
    hasUniformPricing: false,
    id: "gid://shopify/Product/1000",
    images: gallery.map((g) => ({
      altText: g.altText,
      height: 1440,
      url: `/vehicles/${g.image}`,
      width: 1920,
    })),
    isGiftCard: false,
    maxPrice: money(maxPrice),
    options: [
      {
        id: "gid://shopify/ProductOption/1",
        name: "Color",
        values: [
          {
            firstSelectableVariant: variantFor(variantDefs[0], 0),
            id: "gid://shopify/OptionValue/1",
            name: "Blue",
            swatch: { color: variantDefs[0].color, image: `/vehicles/${variantDefs[0].image}` },
          },
          {
            firstSelectableVariant: variantFor(variantDefs[2], 2),
            id: "gid://shopify/OptionValue/2",
            name: "Black",
            swatch: { color: variantDefs[2].color, image: `/vehicles/${variantDefs[2].image}` },
          },
        ],
      },
      {
        id: "gid://shopify/ProductOption/2",
        name: "Edition",
        values: [
          {
            firstSelectableVariant: variantFor(variantDefs[0], 0),
            id: "gid://shopify/OptionValue/3",
            name: "Base",
          },
          {
            firstSelectableVariant: variantFor(variantDefs[1], 1),
            id: "gid://shopify/OptionValue/4",
            name: "Sport",
          },
        ],
      },
    ],
    price: money(minPrice),
    priceRange: { maxVariantPrice: money(maxPrice), minVariantPrice: money(minPrice) },
    seo: {
      description: "Demo 110 cc commuter scooter — placeholder product for design review.",
      title: "Demo 110 Scooter - Aditya Auto (Demo)",
    },
    title: "Demo 110 Scooter",
    updatedAt: new Date().toISOString(),
    vendor: "Aditya Demo",
    variants: variantDefs.map((v, i) => variantFor(v, i)),
    variantsComplete: true,
    variantsCount: variantDefs.length,
    videos: [],
  };
}

export function dummyVariant(
  handle: string,
  selectedOptions: SelectedOption[],
): ProductVariant | undefined {
  if (handle !== DUMMY_PRODUCT_HANDLE) return undefined;
  const color = selectedOptions.find((o) => o.name === "Color")?.value ?? "Blue";
  const edition = selectedOptions.find((o) => o.name === "Edition")?.value ?? "Base";
  const def =
    variantDefs.find((v) => v.colorName === color && v.edition === edition) ?? variantDefs[0];
  return variantFor(def, variantDefs.indexOf(def));
}
