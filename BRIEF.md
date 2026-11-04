# Headless Shopify Storefront — Project Brief

Status: v2 · 2026-11-04 · separate repo, not part of Stonks

**Stack decision: LOCKED** — Next.js (App Router) on Vercel, Hydrogen 2026-10 as a library, Shopify-hosted checkout. Confirmed by Varshil, 2026-11-04. Section 4 is settled; everything in section 1 is still open.

---

## 1. Open questions (need answers before build)

| #   | Question                                                      | Answer |
| --- | ------------------------------------------------------------- | ------ |
| 1   | Business name / brand                                         | _TBD_  |
| 2   | What are we selling (category, rough SKU count)               | _TBD_  |
| 3   | Custom domain for the storefront                              | _TBD_  |
| 4   | Markets: India only, or international?                        | _TBD_  |
| 5   | Currency + whether multi-currency is needed                   | _TBD_  |
| 6   | Payment providers (Shopify Payments / Razorpay / COD)         | _TBD_  |
| 7   | Who edits content day to day (you, or a non-technical person) | _TBD_  |
| 8   | Target launch date                                            | _TBD_  |

---

## 2. Goals

- A React storefront on our own custom domain, not a Shopify Liquid theme.
- No backend for us to run, patch, or scale.
- Product, inventory, order, and customer data stay in Shopify admin — single source of truth.
- Content on marketing pages editable from Shopify admin without a code deploy.
- Fast, SEO-indexable product and collection pages.

## 3. Non-goals (v1)

- Custom checkout UI. Shopify's checkout is not replaceable outside Shopify Plus; we hand off to it.
- Mobile apps.
- Multi-vendor / marketplace features.
- A separate headless CMS. Start with Shopify metaobjects; add a CMS only if editors outgrow them.

---

## 4. Architecture

```
  yourdomain.com                     Shopify (managed)
  ┌──────────────────────┐           ┌─────────────────────────┐
  │ Next.js App Router   │  GraphQL  │ Storefront API          │
  │ + Hydrogen (library) │ ────────► │ products, collections,  │
  │                      │           │ cart, metaobjects       │
  │ home / collections / │           ├─────────────────────────┤
  │ product / cart /     │  redirect │ Shopify Checkout        │
  │ search / account     │ ────────► │ checkout.yourdomain.com │
  └──────────────────────┘           ├─────────────────────────┤
        hosted on Vercel             │ Customer Account API    │
                                     │ Admin, orders, inventory│
                                     └─────────────────────────┘
```

**Stack**

- **Next.js (App Router) + React** — server components for SEO-critical pages, client components for cart and interactivity.
- **Hydrogen 2026-10 as a library** — as of the 2026-10 release Hydrogen is a toolkit you add to your framework rather than a framework of its own, and Next.js is supported. We get Shopify's cart handlers, Storefront API client, analytics, and SEO helpers without adopting their whole framework or their host.
- **TypeScript**, strict. GraphQL codegen for typed Storefront API responses.
- **Tailwind** for styling.
- **Vercel** for hosting + the custom domain. Shopify's Oxygen (free, Cloudflare-workerd based) stays a fallback — the self-hosting guide covers Vercel, Netlify, and Cloudflare Workers, so we are not locked in either direction.

**Why not the alternatives**

- _Liquid theme_: no React, which rules it out.
- _Hydrogen as a framework on Oxygen_: ties hosting to Shopify and the storefront to React Router. Fine, but gives up the portability we asked for, and 2026-10 made the library route the better default.
- _Vite SPA_: product pages would be client-rendered. Bad for a store that needs to rank.

---

## 5. The content-editing tradeoff — read this

Shopify's drag-and-drop **theme editor only works on Liquid themes**. A headless React storefront does not get it. That is the one real cost of going headless, and there's no way around it.

How we cover it instead:

1. **Shopify metaobjects** (chosen default) — we define content models in Shopify admin (hero banner, homepage sections, FAQ, size guide, lookbook). They appear as editable entries in the normal Shopify admin UI; the storefront queries them through the Storefront API and renders them as real server-rendered HTML. Editing copy, swapping a hero image, reordering sections = no deploy.
2. **Hydrogen Visual Editor** — Shopify announced a first-party visual editor for headless storefronts in Summer '24, code-as-source-of-truth with changes syncing to GitHub. Its current status for 2026-10 needs verifying before we count on it.
3. **A headless CMS or a third-party visual layer** — only if metaobjects prove too rigid for whoever is editing.

What stays fully native in Shopify admin regardless: products, variants, images, pricing, inventory, collections, discounts, orders, customers, shipping, taxes, and the entire checkout.

---

## 6. Scope — full store, v1

**Pages**

- Home — editable sections via metaobjects
- Collection listing + individual collection pages, with filtering and sorting
- Product detail — variants, image gallery, price, stock state, add to cart
- Cart — drawer + full page
- Search — with predictive/typeahead
- Customer account — login, order history, addresses (Customer Account API)
- Policy pages — shipping, returns, privacy, terms (pulled from Shopify)
- Contact / About

**Cross-cutting**

- SEO: per-page metadata, JSON-LD product schema, sitemap, robots
- Analytics: Shopify analytics + GA4, with cart and checkout events
- Accessibility: keyboard navigable, focus states, alt text enforced
- Responsive, mobile-first
- Core Web Vitals budget on product and collection pages

**Shopify admin setup (part of this project, since there's no store yet)**

- Create store, pick plan
- Products, variants, collections, inventory
- Shipping zones and rates, tax config
- Payment provider
- Checkout branding so the handoff doesn't look like a different company
- `checkout.yourdomain.com` subdomain so the URL stays ours
- Headless channel / Storefront API tokens
- Transactional email templates

---

## 7. Phases

| Phase | Work                                                               | Output                        |
| ----- | ------------------------------------------------------------------ | ----------------------------- |
| 0     | Shopify store created, products loaded, Storefront API access      | live data to build against    |
| 1     | Repo, Next.js + Hydrogen scaffold, codegen, Vercel preview deploys | a deployed shell              |
| 2     | Product + collection pages against real data                       | browsable catalog             |
| 3     | Cart + checkout handoff                                            | a working buy flow end to end |
| 4     | Home, search, accounts, policies                                   | full store                    |
| 5     | Metaobject content models + admin setup                            | editable without deploys      |
| 6     | SEO, analytics, performance, a11y pass                             | launch-ready                  |
| 7     | Custom domain cutover, checkout subdomain, test order              | live                          |

## 8. Risks

- **Editor expectations.** If whoever manages the store expects the Liquid theme customizer, metaobjects will feel like a step down. Worth agreeing on this before build, not after.
- **Shopify app ecosystem.** Many Shopify apps inject themselves into Liquid themes and simply do not work headless (reviews, upsells, popups). Each one needs a headless-compatible equivalent or a custom build. Decide which apps matter early.
- **Hydrogen 2026-10 is recent.** Library-mode Next.js support is new; expect thinner docs and fewer examples than the React Router path.
- **Checkout handoff.** Branding and domain must be configured or the transition feels like leaving the site.

---

## 9. Build log — where this actually stands

**Repo:** `/Users/vxs/Aditya Store Shopify` · git initialised, one commit from the scaffold.

**What was scaffolded.** Rather than hand-rolling Next.js + Hydrogen, we started from **Vercel Shop**, the official Shopify × Vercel template at `github.com/vercel/shop` — "an agent-native, fast-by-default Shopify storefront built on Next.js." It _is_ the stack we locked, already assembled:

|                 |                                                          |
| --------------- | -------------------------------------------------------- |
| Next.js         | 16.4.3, App Router                                       |
| Hydrogen        | 2026.10.2 (library mode, not the React Router framework) |
| React           | 19.3.1                                                   |
| Tailwind        | 4.3.3                                                    |
| TypeScript      | 7.0.2                                                    |
| Lint/format     | oxlint + oxfmt                                           |
| Package manager | pnpm 12.16.1 (required)                                  |
| Node            | 26 (required — `.nvmrc` pins it)                         |

Created with:

    pnpm create next-app@latest aditya-store --example https://github.com/vercel/shop

**Toolchain installed on this machine.** Node 26.13.0 via nvm, pnpm 12.16.1 via npm. Note: corepack could not activate pnpm 12 — the bundled corepack looks for `bin/pnpm.cjs` and pnpm 12 ships `bin/pnpm.mjs`. Corepack is disabled; pnpm is a global npm install instead.

**What comes with it, already built:** product and collection pages, cart via Hydrogen handlers at `/api/cart`, checkout handoff, predictive search, customer accounts (opt-in), policies, SEO and Schema.org, sitemap, robots, an answer-engine surface (`/llms.txt`, Markdown representations), and an optional AI shopping assistant ("Eve", off by default).

This front-loads most of phases 1–4 and parts of 6. Our work shifts from building a storefront to branding and shaping one.

**Template conventions.** `AGENTS.md` at the repo root is the template's own architecture contract — three owners (Shopify owns commerce, Next.js owns the app, Eve owns the agent), strict file-placement and styling rules. It also ships agent skills in `.agents/skills/`, including `init-vercel-shop`, `build-shop`, `enable-shopify-markets`, and `enable-analytics`. Follow it; it is well-specified.

### Blocked

- **`pnpm install` has not run.** Blocked by the sandbox safety classifier, since installing runs third-party package scripts. Needs your approval before anything can build or boot.

### Needs you (Shopify side)

Required in `.env.local` (already created from `.env.example`, currently placeholders; it is gitignored):

| Variable                                      | Where it comes from                                                  |
| --------------------------------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`            | your `*.myshopify.com` domain                                        |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Shopify admin → **Headless** sales channel → storefront access token |
| `NEXT_PUBLIC_SHOPIFY_SHOP_ID`                 | Shopify admin                                                        |

Steps that are yours, because I do not create accounts or enter credentials:

1. Create the Shopify store and pick a plan.
2. Install the **Headless** sales channel and create a storefront access token with the Storefront API permissions the template's reference lists.
3. Load a few real products, so there is something to render.

### Still open

Section 1's blanks remain — the big three are what we sell, the confirmed brand name, and the domain. `package.json` currently says `aditya-store`, taken from the folder name; change it once the brand is settled.

### Shopify Dev MCP — connected

`.mcp.json` at the repo root registers Shopify's Dev MCP server (`@shopify/dev-mcp`, v1.18.0 verified running). It gives the coding agent validated Shopify API knowledge; it holds **no store credentials and touches no store data**.

Tools it exposes: `learn_shopify_api`, `search_docs_chunks`, `validate`, `validate_theme`, `feedback`. The `validate` tool is what `AGENTS.md` means by never guessing GraphQL — operations get checked against the real Storefront API schema before they ship.

Telemetry is opted out via `OPT_OUT_INSTRUMENTATION=true` in the server's env block. By default this server reports tool inputs and results to `shopify.dev/mcp/usage`; remove that env line to allow it.

`.mcp.json` is committed, not gitignored — it is shared project config with no secrets in it.

### Access model — what "connecting to Shopify" actually means

There is no OAuth connector for Shopify. Access is three separate things:

| Access               | Grants                                               | Status                     |
| -------------------- | ---------------------------------------------------- | -------------------------- |
| Dev MCP              | API docs + schema validation. No store data.         | **done**                   |
| Storefront API token | Read catalog, cart, checkout. What the site runs on. | required, blocked on store |
| Admin API token      | Write products, collections, metaobjects from code.  | optional, decide later     |

Tokens belong in `.env.local` (gitignored), never in chat.

### Phase 1 (foundation and design system) — done 2026-11-04

Config, brand assets, fonts, colour tokens, type scale, `₹` price format and the shared primitives are in. See `research/BUILD-PROMPT.md`, Phase 1, for the exact list.

Verified: `pnpm typecheck`, `pnpm lint` and `pnpm build` pass. In the browser at `http://localhost:3100`: title "Home | Aditya Auto Accessories", `lang="en-IN"`, body in Inter / Near Black, Aditya favicon and app icons. A temporary specimen showed 48px buttons with 4px radius, Near Black labels on orange, the 2px secondary border, Geist / Inter / Michroma loading, and Burnt Orange sale prices. Compiled CSS for all eight text styles matches the brand specimen. The store currency is INR (Asia/Kolkata).

Not verified: a real `Button` with the orange focus ring (the empty store renders none yet; the CSS rules are present), and price rendering against real products (the catalogue is empty).

### Phase 2 (global chrome) — done 2026-11-04

Header, footer, announcement bar and WhatsApp button are in; see `research/BUILD-PROMPT.md`, Phase 2.

Phone and WhatsApp are set to `+91 95583 94079` (confirmed by the owner). Waiting on the owner: email, postal address, social profile URLs, any real announcements. Needs creating in Shopify admin: an "About" page (handle `about`).

## Phase 3 build log: fitment hierarchy

- `fetchCollectionFitment` (lib/shopify/operations/collections/server.ts) reads `custom.vehicle_brand`, `custom.vehicle_models`, `custom.banner_image`, `custom.seo_body`. The Storefront API has no product count on Collection, so counts come from `products(first: 250)` and cap at 250 per model.
- `app/collections/[handle]/layout.tsx` branches: brand (has models) shows model tiles; model (has brand) shows the product grid with no filters or sort; anything else keeps the template browse.
- Not yet verified against real data: the store has no brand or model collections or metafield definitions. Owner must create them (see Phase 3 data in research/BUILD-PROMPT.md 2.1).
- Not done: product card restyle (stars, quick add label) and pagination on model pages beyond the first page.

## Catalogue import (partner catalogue, owner confirmed rights)

Imported via Admin GraphQL with `shopify store auth` write scopes. Script and resume state:
`<scratchpad>/paragon/import.py` + `publish.py` (idempotent, keyed by handle).

- 4 collection metafield definitions: `custom.vehicle_brand`, `vehicle_models`, `banner_image`, `seo_body`, all with Storefront read.
- 66 collections, 165 products (all single-variant), 627 images.
- Vendor set to "Aditya Auto Accessories"; the partner brand name in 124 descriptions replaced with "Aditya Auto".
- Brand to model links set for Honda, TVS, Suzuki, Hero, Hero Electric, Yamaha, Bajaj Chetak, Ola, Ampere.
- All 231 items published to Online Store and the "Aditya Store" headless channel.
- One product (`address-125-floor-mat-with-lock`) belongs to no collection.
- Banner images and `seo_body` are not set on any collection: the owner adds those.

## Content pages

- `/about` and `/contact` are React routes, not Shopify pages: the CLI token has no `write_content` scope. Nav and footer link to them. Move them to Shopify pages if the owner wants to edit copy without a deploy.
- About follows the reference site's section order: hero, stats, story, values, infrastructure, why us, CTA. No certifications section, since none are known.
- Founding year is **2006**, confirmed by the owner 2026-11-04; the demo site's "since 2010" is wrong.
- About stats are counted from the catalogue (165 products, 44 models with products, 9 brands) and need updating when the range changes.
- Contact facts from demo.adityaautoaccessories.com: hours Mon-Sat 10:00-18:00, Ahmedabad Gujarat, socials. Still missing: street address, email, whether 98984 93946 / 93280 14498 should be listed.

## Home page (Phase 6, partial)

Built from real catalogue data only: hero (typographic, no photography available), model strip
(scroll, no autoplay), best sellers from the `best-sellers` collection, about intro, brand mosaic
(ordered by model count, titles stripped of "… Accessories"), slogan band, contact band.

Omitted for want of source material, not by design: hero slideshow with seasonal images, video
banner, product hotspot banner, blog section, Google reviews, Instagram feed. Add each once the
owner supplies images, video, a review source and an Instagram token.

`getFitmentBrands` (lib/collections/server.ts) reads every collection carrying `custom.vehicle_models`.

## Navigation

`Nav` is now async and builds its menu from `getFitmentBrands()`: "Shop by model" opens a mega menu
of the 9 brands with their models (desktop), and an accordion on mobile. `MAX_COLUMNS` in
`components/nav/quick-links.tsx` raised from 5 to 10 so 9 brands fit in two rows.
`brandDisplayName` / `modelDisplayName` (lib/collections/index.ts) drop the "… Accessories" suffix
the imported collection titles carry.

## Product page (Phase 4, partial)

- Buy box: stock dot, four trust chips (facts only), quantity, add to cart, Buy with Shop.
- Description, Materials, Packing and Care as accordions. No Shipping/Returns panel and no
  "free shipping" or "easy returns" claims until those policies exist.
- `StickyBuyBar` reuses `BuyButtons` inside the same `ProductForm`, so both submit one cart form.
  It appears only once `#buy-box` has scrolled off the top, which in practice means mobile:
  the desktop buy box is `lg:sticky` and never leaves the viewport.
- Cart lines no longer print Shopify's synthetic "Default Title" option.
- Not built: breadcrumb (needs the product's model collection), reviews, FAQ, benefits block,
  product video section.
