# Build prompt — fitment-first two-wheeler accessories storefront

> Paste everything below the line into Claude Code, opened at the root of this repo.
> Section 0 is filled from the Aditya brand package. Before pasting, replace every `TBD` in section 0 and answer the open questions in **0.2**.
> In the body, `{{KEY}}` means the value of that key in section 0. Anything still `TBD` ships as a visible placeholder, never an invented fact.

---

You are building the storefront for **{{BRAND_NAME}}**, an Indian two-wheeler accessories brand, in this repository. The repo is a **Vercel Shop** storefront: Next.js 16 App Router, Hydrogen 2026-10 used as a library, Shopify as the commerce backend, deployed to Vercel. It is already scaffolded, installed, and connected to a live Shopify store.

The site's **structure, layout, UX, and feature set** are modelled on a reference store that has been fully researched. The teardown is at `research/paragon-teardown.md`. **Read it in full before writing any code.** Its section numbers are cited throughout this prompt as "T§n".

Reproduce the reference's **architecture and behaviour** faithfully. Do **not** reproduce its brand: no logo, name, photography, video, copy, phone numbers, addresses, statistics, or certifications from the reference. All identity and content comes from section 0 or from Shopify. Where real content does not exist yet, use clearly marked placeholders — never invented facts about the business.

## Ground rules — read these first

1. **`AGENTS.md` is binding.** It defines three owners (Shopify owns commerce, Next.js owns the app, Eve owns the agent), file placement, caching rules, and code style. Every rule there overrides anything here that conflicts. Read it before starting.
2. **This is not the Next.js you know.** Read the relevant guide under `node_modules/next/dist/docs/` before writing Next.js code, as `AGENTS.md` instructs.
3. **Never guess Shopify schema.** The Shopify Dev MCP server is configured in `.mcp.json`. Use `learn_shopify_api`, then `validate`, for every GraphQL operation you add or change, against Storefront API **2026-10**. If a field you want does not exist, say so and choose an alternative — do not invent it.
4. **Use the bundled skills.** `.agents/skills/` contains `build-shop` (route workflows and audits), `shopify-graphql-reference` (operation placement), `enable-shopify-menus`, `enable-analytics`, and others. Use them where they apply.
5. **No tests** unless the user asks — this is the template's stated policy. Verify with `pnpm typecheck`, `pnpm lint`, `pnpm build`, and by looking at the running site in a browser.
6. **Run the dev server with `pnpm dev --port 3100`.** Port 3000 belongs to another project on this machine.
7. Work **phase by phase** (section 3). Finish, verify, and report each phase before starting the next. Say plainly what you verified, what you could not, and what is still a placeholder.

---

## 0. Business details

Source: `/Users/vxs/Brand Aditya Auto /aditya-brand-package` (README, FONTS-NOTE, logo set) plus `aditya-brand-guidelines-v1.pdf` and the type-specimen script. `TBD` means the brand package does not say. Ask the user. Never invent it.

```
BRAND_NAME:            Aditya Auto Accessories      full name once, then "Aditya" (guidelines p.4). Never "ADITYA AUTO" or "Aditya Autos"
LEGAL_NAME:            TBD
TAGLINE:               Made to fit your scooter. Since 2006.   (store tagline, chosen for customers; "Trusted by dealers since 2006." stays for trade materials)
ABOUT_INTRO:           Aditya Auto Accessories makes footrests, bumpers, crash guards and fitting kits in its own factory for popular scooter models. We also supply matting, seat covers and leg guards. We have been making accessories since 2006.
BUSINESS_MODEL:        Retail, for customers. Single pieces, or bulk from 50 pieces. Decided by the owner, see 0.2
DOMAIN:                TBD. adityaauto.tech already serves the Stonks app, so the store needs its own (for example a subdomain)
LOGO:                  /Users/vxs/Brand Aditya Auto /aditya-brand-package/01-logos/svg/ . Copy into public/brand/ in Phase 1.
                       Header: aditya-logo-horizontal-no-tagline.svg. Footer: aditya-logo-horizontal-orange.svg.
                       Favicon and app icons: 02-icons-and-favicon/. Never retype or recolour the wordmark.
BRAND_ORANGE:          #F66101                      full palette and rules in 0.1
WHATSAPP_NUMBER:       +91 95583 94079 (confirmed by the owner 2026-11-04)
PHONE_PRIMARY:         +91 95583 94079 (confirmed by the owner 2026-11-04)
PHONE_SECONDARY:       TBD
EMAIL_SALES:           TBD
EMAIL_SUPPORT:         TBD
ADDRESS:               TBD. The guidelines only say "our own factory"; no postal address
GOOGLE_MAPS_URL:       TBD
SOCIAL:                TBD
FOUNDED_YEAR:          2006
STATS:                 none supplied. Usable fact: "since 2006" (guidelines: "Twenty years of honest dealing"). Do not invent counts
CERTIFICATIONS:        none supplied. Omit the section
SERVICE_AREA:          Gujarat, Goa, Maharashtra, Jharkhand and South India (guidelines p.3)
FREE_SHIPPING_MIN:     TBD. Owner will supply later. Hide the free-shipping bar until set
RETURN_WINDOW_DAYS:    TBD. Owner will supply later. Do not claim returns until set
COURIER_TRACKING_URL:  TBD. The guidelines' dispatch message says "share the transport details", which points to transport/LR numbers, not courier AWBs. Confirm before building Track Order
VEHICLE_BRANDS:        TBD. Hints only: guidelines name NTORQ, Activa 6G, Activa 125, iQube; Stonks code also names Chetak, Jupiter, Fascino, Burgman
```

### 0.1 Brand system (binding)

This overrides every colour, font, price format, nav label and copy line that came from the reference site (Paragon) in this prompt and in `research/paragon-teardown.md`. Wherever the prompt says "brand red", use the Aditya palette under these rules.

**Palette**

| Name          | Hex       | Use                                                              |
| ------------- | --------- | ---------------------------------------------------------------- |
| Aditya Orange | `#F66101` | Logo, buttons, one highlight per section. The only accent colour |
| Near Black    | `#111111` | Text, dark backgrounds, headers                                  |
| Steel Gray    | `#6B6B6B` | Secondary text on light                                          |
| Silver        | `#A3A3A3` | Secondary text on dark                                           |
| White         | `#FFFFFF` | Backgrounds, text on dark                                        |
| Cloud         | `#F4F4F2` | Section backgrounds                                              |
| Burnt Orange  | `#C2410C` | Small orange text and links on white                             |
| Mist          | `#E2E2E0` | Borders and dividers                                             |

- Light layout 60% white / 30% Near Black / 10% orange. Dark layout 60% Near Black / 30% white / 10% orange.
- Button labels on orange are always Near Black (6.0:1). White on orange (3.2:1) is for large text only and never for small text.
- Small orange text on white uses Burnt Orange (5.2:1). Steel Gray on Near Black is never used for small text (3.5:1).
- Gold is retired. No gold and no orange gradients. Red is for error states only. Gradients are Near Black to `#1E1E1E` only.

**Type.** Geist for display and headings, Inter for body, interface, prices and tables, Michroma for short uppercase labels only. Install with `npm i geist`; load Inter and Michroma through `next/font/google`. Saira is retired (kept in `archive/`); the PDF still names Saira, but the newer README, FONTS-NOTE and specimen script all say Geist.

| Style   | Font             | Size / line | Notes                                                      |
| ------- | ---------------- | ----------- | ---------------------------------------------------------- |
| Display | Geist Bold       | 52 / 56     | uppercase, tracking -1%                                    |
| H1      | Geist Bold       | 40 / 46     |                                                            |
| H2      | Geist SemiBold   | 30 / 36     |                                                            |
| H3      | Geist SemiBold   | 22 / 28     |                                                            |
| H4      | Inter SemiBold   | 20 / 28     |                                                            |
| Body    | Inter Regular    | 16 / 26     | Near Black on light, white on dark                         |
| Small   | Inter Regular    | 14 / 22     | Steel Gray                                                 |
| Label   | Michroma Regular | 12 / 16     | uppercase, +12% tracking, Steel Gray. Never for paragraphs |

**Layout and components.** Mobile first. 12 columns, 1200px max, 24px gutter on desktop. 4 columns with 16px margin and gutter on mobile. Spacing scale 4, 8, 16, 24, 32, 48, 64. Buttons 48px tall with 4px radius. Header 72px tall, sticky, one orange button. Icons on a 48px grid, 2px stroke, square corners, flat, one orange detail each. Favicon is the orange logo on a solid white square, never transparent.

**Graphic language.** The 60 degree slash (the angle of the A), a thin ring arc behind a product, two or three short speed lines. Faint diagonal slash pattern at 4 to 6% opacity on dark backgrounds only. Brushed steel texture inside product sections only. Soft contact shadow under products, never on the logo.

**Product photography.** Near Black `#111111` background with a soft `#1E1E1E` patch behind the product, centred, same scale and angle on every model. Michroma label, badge "Aditya Quality · Since 2006", four orange L-brackets as corner marks. Product galleries must work on dark images.

**Voice.** Confident, clear, respectful, professional. Call the audience "customers", never "riders". Short sentences, one idea each. Write exact model names (NTORQ, Activa 6G, iQube), never misspell or abbreviate them. Use facts and numbers ("Set of 3", "in stock", "since 2006"). Prices as `₹1,250`, never "Rs.1250/-". Avoid these words unless true and provable: genuine, original, best, cheapest, guaranteed, lifetime, 100%. That means the "100% Secure Payment" trust line from the reference must not ship, and "Best sellers" only when driven by real sales.

### 0.2 Decision: retail store, single pieces or bulk

The owner has decided this is a **retail store for customers**, selling single pieces or bulk quantities. It is not a dealer portal. The brand guidelines v1 are written for dealers (voice rules, a DEALER ENQUIRY header button, CHECK AVAILABILITY product cards), so those parts do **not** apply here. The Paragon reference is a retail store, so Phases 2 to 5 stand as written, with the Aditya styling from 0.1. In all copy the audience is "customers", never "riders".

| Surface                            | Default                                                                                                                                                                                                                                                                                                          |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buying                             | Add to cart, Buy it now and Shopify checkout, as in Phases 4 and 5. Any quantity can be bought with the quantity stepper                                                                                                                                                                                         |
| Bulk                               | **50 or more** of the same product earns a bulk discount through Shopify's own discounts. Show the break on the product page, for example "Buy 50 or more: X% off". For a very large order, a "Need a larger quantity?" link opens WhatsApp with a prefilled message (product, quantity). No form and no backend |
| Product cards and page             | Price, Add to cart and stock status. "Set of 3" style packs are separate products or variants, named exactly as in the guidelines                                                                                                                                                                                |
| Header                             | Logo, nav `Products · By scooter model · About · Contact`, search, account and cart icons. The guidelines allow one orange button; default label **Shop by model**, linking to the scooter-model picker                                                                                                          |
| Voice                              | The guidelines' tone (confident, clear, respectful, professional, facts and numbers), addressed to customers. The guidelines' rule against writing to individual buyers applies to the dealer business and is dropped for this store                                                                             |
| Tagline and About                  | Tagline "Made to fit your scooter. Since 2006." and the `ABOUT_INTRO` in section 0, both built only from facts in the guidelines                                                                                                                                                                                 |
| Track Order                        | Deferred until dispatch uses trackable numbers (see `COURIER_TRACKING_URL`)                                                                                                                                                                                                                                      |
| Reviews, Google reviews, Instagram | Unchanged: omit until real data exists                                                                                                                                                                                                                                                                           |

**Decided:** bulk starts at 50 pieces. Tagline and About copy are chosen (above).

**Waiting on the owner. Do not build around these, and do not invent values:**

1. **Bulk discount percentage.** The threshold is 50. The percentage is not set. Assumed to apply per product; confirm. Confirm that Shopify's automatic discounts on the owner's plan can do quantity breaks before promising them.
2. **Delivery and returns.** Owner will supply later: `FREE_SHIPPING_MIN`, `RETURN_WINDOW_DAYS`, delivery areas, freight on heavy bulk orders. Until then, omit the free-shipping progress bar in the cart and the "Free shipping" and "Easy returns" lines in the trust row. Shipped copy must not claim either.
3. **GST invoices.** Owner will decide later. Version 1 does not collect a GSTIN.

---

## 1. What makes this store work

This is a **fitment store** (T§1). Customers shop for the scooter they own:

```
Vehicle brand (Honda)  →  Vehicle model (Activa 6G)  →  Product (Activa 6G Accessories Kit)
```

- **Brand pages are model pickers, not product grids.** They show model tiles with product counts.
- **Model pages are product grids** with no filters, sort, or pagination — they hold 1–10 products.
- Every product belongs to at least one **model collection**. Product titles lead with the model name.
- Products are **single-variant**. Colour and finish versions are separate products.

Get this hierarchy right first. Everything else hangs off it.

---

## 2. Data model in Shopify

All of these are created in Shopify admin and read through the Storefront API. The storefront token already has `unauthenticated_read_metaobjects`. Validate every field name with the Dev MCP before relying on it.

### 2.1 Brand → model hierarchy

- Every brand and every model is a **Shopify collection**.
- Model collections carry a metafield **`custom.vehicle_brand`** — a collection reference to their brand collection. This drives the three-level breadcrumb `Home → HONDA → Activa 6G` (T§6).
- Brand collections carry a metafield **`custom.vehicle_models`** — an ordered **list** of collection references to their model collections. This drives the model-tile grid (T§5).
- Both carry **`custom.banner_image`** (file reference) for the banner hero, and **`custom.seo_body`** (rich text) for the "content card" SEO paragraph.
- **Product counts on model tiles**: check with the Dev MCP whether the Storefront API exposes a product count on `Collection`. If it does not, fetch `products(first: 250) { nodes { id } }` per model inside the cached `get*` wrapper and count. Do not hard-code counts.
- A collection is a **brand** if `custom.vehicle_models` is set, a **model** if `custom.vehicle_brand` is set, and an ordinary merchandising collection (like Best Sellers) if neither. `/collections/[handle]` branches on that.

### 2.2 Editable marketing content — metaobjects

So that homepage content changes without a deploy (the decision recorded in `BRIEF.md` §5), define these **metaobject types** and read them through the Storefront API:

| Type                 | Fields                                                                                                                                                                                                  | Drives                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `announcement`       | `message` (text), `link` (url, optional)                                                                                                                                                                | Rotating announcement bar |
| `hero_slide`         | `heading`, `subheading`, `cta_label`, `cta_link`, `image_desktop`, `image_mobile`, `sort`                                                                                                               | Hero slideshow            |
| `model_card`         | `label` (default "SUITABLE FOR"), `model_name`, `image` (cut-out), `collection` (ref)                                                                                                                   | Model card carousel       |
| `category_tile`      | `title`, `image`, `collection` (ref), `sort`                                                                                                                                                            | "Shop by category" mosaic |
| `hotspot_banner`     | `image`, `heading`, list of `hotspot`                                                                                                                                                                   | Product hotspots          |
| `hotspot`            | `x_percent`, `y_percent`, `product` (ref)                                                                                                                                                               | One hotspot dot           |
| `pdp_shared_content` | `materials` (rich text), `care` (rich text), `shipping_returns` (rich text), `why_heading`, list of `feature`, `benefits_heading`, `benefits_intro`, `benefits_image`, list of `benefit`, list of `faq` | Shared PDP sections (T§8) |
| `feature`            | `icon` (file), `title`, `body`                                                                                                                                                                          | "Why us" columns          |
| `benefit`            | `title`, `body`                                                                                                                                                                                         | Red-dot benefit bullets   |
| `faq`                | `question`, `answer` (rich text)                                                                                                                                                                        | FAQ accordions            |

Section headings and eyebrows stay **inline in components** (`AGENTS.md` rule 6). Content the merchant will change seasonally or per campaign goes in metaobjects.

**Write the exact metaobject definitions out as a checklist in `research/SHOPIFY-CONTENT-SETUP.md`**, so they can be created in admin. If metaobjects are empty, every section must render nothing (or a clearly labelled placeholder in development) — never crash.

---

## 3. Build phases

### Phase 1 — Foundation and design system (DONE 2026-11-04)

Built on the template's existing shadcn-style semantic tokens, so every component already in the repo picks up the brand without per-component changes. Do not redo this phase.

- **Config.** `site.name` "Aditya Auto Accessories", a facts-only `site.description`, localization `IN` / `EN` / `en-IN`, dev site URL `http://localhost:3100`. `pnpm dev` now runs on port 3100.
- **Assets.** 11 SVG logos in `public/brand/`. Favicon, `icon.svg`, Apple icon and the PWA icons in `public/icons/` are the Aditya set.
- **Fonts.** Geist (`font-heading`), Inter (`font-sans`, the body default) and Michroma (`font-label`), all through `next/font/google`. Geist Mono is removed. The template's Geist from `next/font/google` is kept instead of installing the `geist` package.
- **Colour tokens.** Palette mapped onto `--primary`, `--foreground`, `--muted-foreground`, `--secondary`, `--border`, `--ring`. New: `text-link` (Burnt Orange), `bg-primary-hover` (`#d45500`, derived so the Near Black label keeps 4.5:1), `text-silver`.
- **Type scale.** `text-display`, `text-h1` to `text-h4`, `text-body`, `text-small`, `text-label`, each with size, line height, weight and tracking from the brand specimen. Pair with `font-heading` (display, h1 to h3), `font-sans` (h4, body, small) or `font-label` (label). Existing template headings are not restyled globally, because `AGENTS.md` forbids global element rules. **Each page applies `font-heading` and the `text-h*` styles when it is rebuilt in Phases 2 to 6.**
- **Price format.** `formatPrice` in `lib/money/index.ts` gives `₹1,250`; paise show only when present. Prices render in Inter.
- **Primitives.** New `Eyebrow` (Michroma label) and `SectionHeading`. `Button` is 48px with 4px radius, uppercase labels, solid orange focus ring, and a new `inverse` variant (white outline on dark); `outline` is the guidelines' secondary (2px Near Black border). `Badge` and `DiscountBadge` are no longer pills; the discount badge is Burnt Orange on a faint tint. `Container` is 1200px content, 16px margin on mobile, 24px on desktop.
- **Reused, not duplicated.** The template already had `Price`, `ProductPrice` and `DiscountBadge`; they are restyled (sale price Burnt Orange, struck compare-at in Steel Gray) instead of adding a second `PriceRow`.
- **Deferred.** `StarRating` waits for Phase 4, when real review data exists. Building it now would be unused code.

**Not yet branded (belongs to later phases):** the home page copy ("A Storefront Built on Vercel Shop" and its meta description), the default social image `public/og-default.png`, the header and footer.

### Phase 2 — Global chrome (DONE 2026-11-04)

Adapted the template's existing nav, footer and layout. Do not redo this phase.

- **Announcement bar.** `components/announcement-bar/`. Near Black bar, white text, rotating with previous and next arrows, pauses on hover and focus, no autoplay under `prefers-reduced-motion`. It reads `shopConfig.announcements` (empty, so it renders nothing). The spec's metaobject source is deferred: no definitions exist in Shopify yet, and swapping the data source later changes one file.
- **Header.** Sticky, 72px, bottom border. Logo (`aditya-logo-horizontal-no-tagline.svg`), nav `Products · By scooter model · About · Contact` as inline items, search and cart. The orange **Shop by model** button (48px, links to `/collections`) is desktop only; on mobile it sits at the foot of the menu drawer. No account icon, because `shopConfig.auth.isEnabled` is false until the owner supplies the Customer Account credentials. Shopify-managed menus (`enable-shopify-menus`) were not used for four fixed links.
- **Footer.** Cloud background. Brand column (orange horizontal logo, tagline in the Michroma label style, `site.description`, then address, phone, email and social icons only when set), then Shop, Company and Help columns (Help lists the policies Shopify returns). Three trust cards written only from facts in the guidelines. Near Black bottom bar with the copyright line and no year, because reading the date breaks the template's static rendering.
- **WhatsApp button.** `components/whatsapp-button.tsx`. Fixed bottom right, Near Black circle with the WhatsApp glyph (brand-neutral; change to WhatsApp green if wanted), opens `wa.me` with a prefilled message. Renders nothing until `shopConfig.contact.whatsapp` is set. It is set to the owner's number.
- **Config.** `lib/config/index.ts` gains `announcements`, `contact` (address, email, phone, whatsapp) and `social`, all empty. **The owner supplies these; a section appears the moment its value is set.**

**Verified:** typecheck, lint and production build pass. In the browser with temporary test values (removed afterwards): header and footer at 1280px and 375px, the mobile drawer, the announcement arrows and wrap-around, the WhatsApp button, and the orange focus ring on the real button.

**Not yet true:** `/pages/about` is a not-found page until an "About" page exists in Shopify (Phase 8 builds it). The Help column shows only the policies Shopify has content for.

### Phase 3 — Fitment hierarchy (the core)

1. Implement the data in section 2.1: operations under `lib/shopify/operations/**/server.ts` (uncached `fetch*`), cached `get*` wrappers in `lib/<domain>/server.ts` with `"use cache"`, `cacheLife` and `cacheTag`, exactly as `AGENTS.md` rule 3 prescribes.
2. **`/collections/[handle]`** branches by collection role:
   - **Brand** (T§5): banner hero (image left, huge brand name right, "Premium Quality Accessories Compatible for {BRAND}"), breadcrumb `Home → BRAND`, **3-column model tile grid** (image, uppercase model name, "N products"), content card (red left border, icon, heading left, `seo_body` right), contact CTA band.
   - **Model** (T§6): same banner, breadcrumb `Home → BRAND → Model`, red micro-eyebrow "SHOP THE COLLECTION", H1, product count right-aligned, **product grid with no filters, sort or pagination**, then content card and CTA band.
   - **Merchandising** (e.g. Best Sellers): keep the template's existing browse behaviour.
3. Preserve the template's existing collection caching, `refine` rewrite, and `CollectionLayout` boundaries for collections that still use browse — read the "Next.js layer" section of `AGENTS.md` before touching them.
4. **Product card** (T§7) used everywhere: white card, light border, ~12px radius, discount badge top-left, stars + review count, two-line title, `PriceRow`, quick add — "Add" for single-variant products.

**Done when**: from the home page you can reach any product in exactly three clicks via brand → model → product; breadcrumbs are correct at every level; brand pages show real per-model product counts; an empty `custom.vehicle_models` falls back gracefully.

### Phase 4 — Product page (T§8)

1. **Gallery**: desktop vertical thumbnail rail plus main image with arrows; mobile full-width swipe with dots. Supports product **video** media. LCP image preloaded, everything else lazy, `next/image` per `AGENTS.md`.
2. **Buy box**, top to bottom: breadcrumb (`Home → <model collection> → <product>`), pill eyebrow, H1, stars + review count (anchors to reviews), `PriceRow`, "Taxes included.", **four icon chips** (Premium quality · Vehicle compatible · Strong & Durable · Precision Fit), stock indicator (green dot "In stock" / grey "Sold out"), quantity stepper + black **Add to cart**, full-width outlined **Buy it now**, trust row (Free shipping · Easy `{{RETURN_WINDOW_DAYS}}`-day returns · 100% Secure Payment), accordions (Description from Shopify; Materials, Care and Shipping & Returns from `pdp_shared_content`).
3. **Below the fold**, in order: product video (if any) → **Why {{BRAND_NAME}}** 4 icon columns → **Product benefits** (image left, red-dot bullets right) → **Customer reviews** → **FAQ** accordions → **More From This Range** recommendations.
4. **Sticky add-to-cart bar**: when the buy box leaves the viewport, a floating pill appears bottom-centre — thumbnail, title, struck and sale price, % off, cart button. Uses the same Hydrogen cart form as the main button. Hidden while the buy box is visible.
5. All cart writes go through Hydrogen's `/api/cart` handlers and the template's `useProductForm` / `useCartForm` — **no Server Actions for cart**, per `AGENTS.md` rule 2.
6. JSON-LD `Product` with `offers` (INR) and, once reviews exist, `aggregateRating`; plus `BreadcrumbList`. Use the template's existing `components/schema/`.

**Done when**: add to cart works from the main button, the sticky bar, and product-card quick add; the cart badge updates; JSON-LD validates; the page works with JavaScript disabled up to adding to cart (the template's native-form behaviour).

### Phase 5 — Cart drawer (T§9)

Right-side drawer (keep the template's cart route as the no-JS fallback):

1. Header "Cart (n)" + close
2. **Free-shipping progress bar**: "Add ₹X more for free shipping" → "You've unlocked free shipping on this order!", against `{{FREE_SHIPPING_MIN}}`. Shopify's subtotal is the only input; the threshold is display messaging, not a price calculation.
3. Line items: image, title, `PriceRow`, quantity stepper, trash button
4. **"PAIR WITH YOUR ORDER — You may also like"**: horizontal upsell carousel with arrows, from Shopify product recommendations for the cart's lines
5. Trust row
6. Order summary: item count, discount, estimated total, "Duties and taxes included. Shipping is calculated at checkout."
7. Black **Check out** → Shopify checkout URL from the cart; "Continue shopping" closes the drawer

Behaviour to match the reference: adding to cart **updates the badge but does not auto-open the drawer**. Make this a single config flag, since auto-open often converts better.

**Done when**: quantities change and lines remove without a page reload; the progress bar updates live; checkout lands on Shopify checkout with the right lines; totals always equal Shopify's.

### Phase 6 — Home page (T§4)

Build in this order, each reading its metaobject (section 2.2) and rendering nothing when empty:

1. **Hero slideshow**: autoplay ~2.5s, infinite, pause on hover and focus, `prefers-reduced-motion` disables autoplay. Separate desktop and mobile images. Min height ~25rem mobile, ~45rem desktop. Headline left, black pill CTA. Only the first slide's image is the LCP preload.
2. **Model card carousel**: infinite auto-scrolling strip of `model_card`s ("SUITABLE FOR" + model name over a cut-out on a light-grey rounded card), pausable, linking to model collections.
3. **About intro**: pill eyebrow, H2, two paragraphs, image with caption overlay.
4. **Best sellers**: pill eyebrow, H2, 8 products from the `best-sellers` collection, 4 columns desktop.
5. **Video banner**: full-bleed muted looping background video, dark overlay, eyebrow, uppercase H2, copy, white "About Us" button. Poster image; no autoplay under reduced motion.
6. **Shop by category mosaic**: one tall tile + four smaller tiles from `category_tile`s, brand name top-left in white over the image.
7. **Marquee**: grey band, uppercase slogan scrolling continuously; reduced motion makes it static.
8. **Product hotspots**: banner with pulsing brand-red dots positioned by percentage; each opens an accessible popover card (image, title, price, quick add, link). Keyboard reachable, Escape closes, works on touch.
9. **Blog**: pill eyebrow, H2, 4 latest articles (image, title, date).
10. **Reviews**: rating badge pill + review carousel + "Leave a review on Google" button. **Source**: see section 4 — if no source is configured yet, omit the section rather than shipping fake reviews.
11. **Instagram**: heading, subtitle, image grid, "Visit Instagram". **Source**: see section 4.

**Done when**: every section renders from real metaobject data; deleting an entry in admin removes it from the page after revalidation; Lighthouse mobile performance ≥ 85 and CLS < 0.1; no autoplay motion under `prefers-reduced-motion`.

### Phase 7 — Search (T§10)

Extend the template's predictive search into the reference's centred modal:

- Empty state: **Recently viewed** products (client-side, stored in `localStorage`, guarded with try/catch) with "Clear"
- While typing: result count, **query suggestion chips**, **Products** (up to 6 with price), **Collections** (model and brand collections, with product counts), and "View all" to `/search`
- Searching a model name must surface its **model collection** — that is the most common query in a fitment store

**Done when**: typing "activa" (or any model you stock) shows the matching model collection and products; the modal is keyboard-navigable and closes on Escape.

### Phase 8 — Content pages (T§11)

Build reusable page sections and compose them per page through `app/pages/[handle]`. Content comes from Shopify **pages + metaobjects** or clearly marked placeholders. **No invented facts** — omit stats and certifications you do not have.

| Page                   | Sections                                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/pages/about`         | Hero → stats bar → story → 4 values → mission → infrastructure cards → certifications → why choose → CTA                                                                                          |
| `/pages/manufacturing` | Hero → intro → "how we build" with video → **numbered process steps** → quality testing → certifications → CTA                                                                                    |
| `/pages/events`        | Feature video banner → gallery story → latest events cards → gallery → video → CTA                                                                                                                |
| `/pages/contact`       | Hero → contact details + **form** (Name, Email, Phone, Comment) → Google Maps embed → 4 support cards                                                                                             |
| `/pages/track-order`   | Eyebrow, H1, **AWB input** → "Track order" opens `{{COURIER_TRACKING_URL}}` with the AWB substituted, in a new tab. Validate the input; never put personal data in the URL beyond the AWB itself. |

**Contact form**: Shopify's Storefront API has **no contact-form mutation** — verify with the Dev MCP. Implement a Next.js Route Handler that validates with `zod` (`z.strictObject`), is protected by BotID, and forwards to `{{EMAIL_SALES}}` through an email provider, or to the template's preferred mechanism. Ask before choosing a provider; it needs an API key the user must create.

**My Account**: use the template's Customer Account API support (`shopConfig.auth.isEnabled`) — the reference links out to Shopify-hosted accounts. Enabling it needs `CUSTOMER_ACCOUNT_SESSION_SECRET`, `SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID` and `SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_SECRET`, which the user must supply. Ask; do not invent values.

### Phase 9 — Blog (T§12)

- Listing: pill eyebrow, H1, subline, **3-column card grid** (image, title, date)
- Article: one H1, readable measure, H2/H3 hierarchy, inline product links that render as product cards, share control, related products, and `BlogPosting` + `BreadcrumbList` JSON-LD
- The home page "Blog" section reads from the same source

### Phase 10 — SEO, analytics, launch

- Per-route metadata with commercial-intent title patterns, such as "Buy {Model} Accessories Online | {{BRAND_NAME}}" for model collections and "Premium {Brand} Two Wheeler Accessories | {{BRAND_NAME}}" for brand collections
- Open Graph on every page, including `og:price:amount` and `og:price:currency` (INR) on products
- `Organization` JSON-LD with the real address, phone, and social profiles
- Sitemap and robots from the template; confirm `/llms.txt` emits the production domain
- Analytics through the `enable-analytics` skill (GTM). Meta Pixel and Microsoft Clarity through GTM, behind Shopify consent
- Custom domain on Vercel; checkout subdomain configured in Shopify so checkout stays on `checkout.{{DOMAIN}}`

---

## 4. Integrations — decide, don't assume

The reference uses Liquid-theme apps that **do not drop into a headless storefront**. For each, confirm feasibility before building, and **ask the user** where a choice or a paid account is involved.

| Need               | Reference used                  | Approach for this stack                                                                                                                                                                                                                                                                   |
| ------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **COD + checkout** | GoKwik, Razorpay Magic Checkout | **Highest-stakes decision.** COD dominates Indian e-commerce. Default: Shopify checkout with Cash on Delivery enabled as a manual payment method. GoKwik and Razorpay headless support must be confirmed with those vendors — do not wire either in without confirmation and credentials. |
| Product reviews    | Judge.me                        | Judge.me's headless/public API, server-fetched and cached. Requires a Judge.me account and token from the user. Until then, hide review UI entirely — **never render fabricated reviews or ratings**.                                                                                     |
| Google reviews     | Repocean widget                 | Google Places API (needs an API key), or a manually curated set of _real_ reviews. Omit until one exists.                                                                                                                                                                                 |
| Instagram feed     | GSC Instafeed                   | Instagram Graph API (needs a token), or a curated static gallery of the brand's own posts.                                                                                                                                                                                                |
| WhatsApp           | Floating link                   | Plain `wa.me` link — no integration needed.                                                                                                                                                                                                                                               |
| Analytics          | GTM, Meta Pixel, Clarity        | `enable-analytics` skill + GTM.                                                                                                                                                                                                                                                           |

---

## 5. Non-negotiables

- **Commerce facts come only from Shopify**: prices, compare-at prices, discounts, stock, cart totals. Discount percentages are computed from Shopify's prices, never typed in.
- **No fabricated social proof**: no invented reviews, ratings, review counts, customer numbers, or certifications. A section without real data is omitted.
- **Accessibility**: every carousel, drawer, modal, accordion, and hotspot is keyboard-operable with visible focus, correct ARIA, and Escape to close; all motion respects `prefers-reduced-motion`; images have meaningful alt text.
- **Performance**: product grids lazy below the first row; one LCP preload per page; no layout shift from the announcement bar, slideshow, or sticky bar.
- **Mobile first**: the reference's traffic is overwhelmingly mobile. Verify each phase at 375px before desktop.
- **No brand copying** from the reference — structure only.

## 6. How to report each phase

1. What was built, by owner (Shopify / Next.js / Eve)
2. What was verified, and how: typecheck, lint, build, and which pages were checked in the browser at which widths
3. What is still a placeholder or waiting on the user — content, credentials, or decisions
4. Any place where Shopify's real schema forced a change from this prompt
