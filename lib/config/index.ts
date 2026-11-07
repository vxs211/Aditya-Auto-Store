import type { ShopConfig } from "./types";

const defaultUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3100";

export const shopConfig = {
  agent: {
    isEnabled: false,
  },
  analytics: {
    shopify: {
      consent: {
        isEnabled: false,
        mode: "default-banner",
      },
      isEnabled: false,
    },
    speedInsights: {
      isEnabled: false,
    },
    vercel: {
      isEnabled: false,
    },
  },
  // TODO(owner): real announcements, for example a bulk-order offer once the discount is set.
  announcements: [],
  auth: {
    isEnabled: false,
  },
  botid: {
    checkLevel: "basic",
    isEnabled: false,
  },
  // TODO(owner): email and postal address. A section renders only when set.
  contact: {
    address:
      "Survey No. 136/B, Near Naklang Mahadev, Opp. Varsha Fashion Pvt. Ltd., Piplaj-Dholka Road, Paldi Kankaj, Taluka Daskroi, District Ahmedabad, Gujarat, India" as
        | string
        | null,
    email: null as string | null,
    phone: "+91 95583 94079" as string | null,
    secondaryPhone: "+91 93270 14498" as string | null,
    whatsapp: "919558394079" as string | null,
  },
  localization: {
    country: "IN",
    language: "EN",
    locale: "en-IN" as const,
  },
  pdp: {
    bundles: {
      isEnabled: true,
    },
    buyWithShop: {
      isEnabled: true,
    },
    complementaryProducts: {
      isEnabled: true,
    },
    quantityPicker: {
      isEnabled: true,
    },
    relatedProducts: {
      isEnabled: true,
    },
  },
  redirects: {
    shopifyNotFound: {
      isEnabled: false,
    },
  },
  search: {
    isEnabled: true,
  },
  shopify: {
    webmcp: {
      isEnabled: false,
    },
  },
  site: {
    description:
      "Footrests, bumpers, crash guards, matting and seat covers for popular scooter models. Made in our own factory since 2006.",
    name: "Aditya Auto Accessories",
    url: defaultUrl,
  },
  social: {
    facebook: "https://www.facebook.com/AdityaAutoAcce",
    instagram: "https://www.instagram.com/adityaautoaccessories/",
    linkedin: "https://www.linkedin.com/in/aditya-auto-accessories-621084229/",
    // TODO(owner): replace these three with the real profile links. Until then each opens a search for the
    // brand on that site, so the icon never leads to someone else's page.
    pinterest: "https://www.pinterest.com/search/pins/?q=Aditya%20Auto%20Accessories",
    x: "https://x.com/search?q=Aditya%20Auto%20Accessories",
    youtube: "https://www.youtube.com/results?search_query=Aditya+Auto+Accessories",
  },
} satisfies ShopConfig;

export const isShopifyScriptsEnabled =
  shopConfig.analytics.shopify.isEnabled ||
  shopConfig.analytics.shopify.consent.isEnabled ||
  shopConfig.shopify.webmcp.isEnabled;
