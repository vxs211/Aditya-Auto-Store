# Shopify setup

Everything needed to get the storefront talking to a real Shopify store.

Tooling already present on this machine: **Shopify CLI 4.7.0** (`store auth`, `store execute`, `store create preview` all available), Node 26.13.0, pnpm 12.16.1.

---

## Two routes

### Route A — preview store (unblocks development today)

A preview store is a disposable Shopify store with sample data. It exists so a storefront can be built and tested before the real business store is ready. Swapping to the real store later means changing three environment variables; no code changes.

    shopify store create preview --name "Aditya Store" --country IN

Requires a Shopify login — the CLI opens a browser and **you** sign in. Then the token steps below run against it.

### Route B — the real store

1. Create the store at shopify.com and choose a plan. **Yours to do**: I don't create accounts or enter sign-up credentials.
2. Add products — even three or four is enough to build against.
3. Run the token steps below.

Routes are not exclusive. Starting on A and moving to B later is the normal path, and nothing is wasted.

---

## Getting the Storefront token

Once a store exists, this is automated — no secret ever gets pasted into a chat window.

    shopify store auth --store <handle>.myshopify.com --scopes <scopes>

The CLI opens a browser; you approve. After that I can run `shopify store execute` to read the shop ID and reuse or create a public Storefront access token titled `Vercel Shop`, then write all three values into `.env.local` (gitignored) myself.

### Scopes

Required:

| Scope                                   | Enables                                        |
| --------------------------------------- | ---------------------------------------------- |
| `unauthenticated_read_product_listings` | products, collections, search, recommendations |
| `unauthenticated_read_selling_plans`    | subscription and selling-plan options          |
| `unauthenticated_write_checkouts`       | cart operations and checkout                   |
| `unauthenticated_read_content`          | pages, blogs, articles                         |

Optional — grant only when the related feature is wanted:

| Scope                                    | Enables                                                                             |
| ---------------------------------------- | ----------------------------------------------------------------------------------- |
| `unauthenticated_read_product_inventory` | exact stock counts (`quantityAvailable`); default in-stock indicators don't need it |
| `unauthenticated_read_product_tags`      | the `tags` field; tag _filters_ work without it                                     |
| `unauthenticated_read_metaobjects`       | **the editable content models from the brief**                                      |

Customer sign-in uses the separate Customer Account API, not these scopes.

### Manual fallback

If the CLI route hits `ACCESS_DENIED`: Shopify admin → **Settings → Apps and sales channels → Headless** → install the channel → create a storefront → copy the public Storefront access token. Then into `.env.local`:

    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN="<handle>.myshopify.com"
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN="..."
    NEXT_PUBLIC_SHOPIFY_SHOP_ID="<numeric part of gid://shopify/Shop/123456789>"

Note: the template sends `X-Shopify-Storefront-Access-Token`, so it needs a **public** Storefront token — not a Headless _private_ token and not an Admin token.

---

## Store name and description are not env vars

`shop.name` and `shop.description` become the `site.name` and `site.description` literals in `lib/config/index.ts`.

---

## Still blocked

- `pnpm install` has never run — awaiting approval. Nothing builds until it does.
- Brand name, product category, and domain are still unanswered (BRIEF.md section 1).

---

## Connection log — 2026-11-04

Store found and authenticated. `shopify store list` showed one store on organization "My Store":

|         |                                      |
| ------- | ------------------------------------ |
| Domain  | `tg4p2u-7s.myshopify.com`            |
| Shop ID | `80100655187`                        |
| Name    | My Store (still the Shopify default) |
| Created | 2026-11-04                           |

Authenticated with:

    shopify store auth --store tg4p2u-7s.myshopify.com \
      --scopes unauthenticated_read_product_listings,unauthenticated_read_selling_plans,\
    unauthenticated_write_checkouts,unauthenticated_read_content,\
    unauthenticated_read_metaobjects,read_products

All six scopes granted (plus `unauthenticated_read_checkouts`, which Shopify added itself).

**The automated token flow does not work on this store.** `shop.storefrontAccessTokens` returns `ACCESS_DENIED`; the CLI's app is not permitted to read or create Storefront tokens here. This is the fallback case the template's own `storefront-token.md` anticipates, not a misconfiguration.

So `.env.local` now holds the two values that could be read directly, and the token is the one remaining gap:

| Variable                                      | Value                                  |
| --------------------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`            | set                                    |
| `NEXT_PUBLIC_SHOPIFY_SHOP_ID`                 | set                                    |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | **empty — needs the Headless channel** |

### Remaining manual step

Shopify admin → **Settings → Apps and sales channels → Headless** → install the channel → create a storefront → copy the **public** Storefront API token → paste it into `.env.local` as `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`. Not into chat.

Also worth doing in admin: rename the store from "My Store", and add a few products so there is something to render.

### Verified along the way

The Dev MCP server validated both token operations against the live Admin schema, API version 2026-10: `VercelShopStorefrontTokenCreate` and `VercelShopStorefrontTokens` both returned VALID.

---

## Verification log — 2026-11-04

Dependencies installed and the toolchain confirmed working end to end:

| Check                  | Result                                         |
| ---------------------- | ---------------------------------------------- |
| `pnpm install`         | ✅ Next 16.4.3, Hydrogen 2026.10.2 resolved    |
| `pnpm typecheck`       | ✅ route types generated, `tsc --noEmit` clean |
| `pnpm lint` (oxlint)   | ✅ no issues                                   |
| `pnpm format` (oxfmt)  | ✅ 283 files conform                           |
| `pnpm dev --port 3100` | ⛔ boots, then exits by design                 |

The dev server starts Next 16.4.3 with Turbopack, reads `.env.local`, reports `Ready in 162ms`, then stops:

    Error: Missing required Shopify environment variables:
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN. See .env.example.
        at assertRequiredEnv (lib/config/server.ts:27:15)

That is the template refusing to run half-configured rather than failing obscurely later. **The Storefront token is the only thing standing between here and a running store.**

Note: `.claude/launch.json` names this server `aditya-storefront` on port 3100, but the preview tooling in this session resolves launch names against the Stonks project, so it must be started directly:

    pnpm dev --port 3100

---

## Live — 2026-11-04

Token saved (32 characters, public). The storefront runs and is connected to Shopify.

Direct Storefront API probe against `tg4p2u-7s.myshopify.com/api/2026-10/graphql.json`:

    HTTP 200
    { "data": { "shop": { "name": "My Store",
                          "primaryDomain": { "url": "https://tg4p2u-7s.myshopify.com" } },
                "products": { "nodes": [] } } }

Authenticated, not a 401 — the public token is correct.

| Route              | Status |
| ------------------ | ------ |
| `/`                | 200    |
| `/collections/all` | 200    |
| `/llms.txt`        | 200    |

Browser console: no errors. The home page renders header, hero, a **Products** section, and footer. The products section is empty because the catalog is empty.

### Known cosmetic issues, both from unset config

1. Title reads **"Home | Vercel Shop"** and the hero says "A Storefront Built on Vercel Shop". These are `site.name` and `site.description` literals in `lib/config/index.ts`, waiting on the real brand name.
2. `/llms.txt` emits absolute URLs on **port 3000**, not 3100. A site-URL default; harmless locally, must be right before deploy.

### Next

- Add products in Shopify admin — nothing renders without them.
- Decide the brand name, then set `site.name` / `site.description` and rename the store in admin.
