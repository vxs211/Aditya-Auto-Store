# Teardown: paragontwowheeleraccessories.com

Researched 2026-11-04 by walking the live site in a browser (desktop 1024px and mobile 375px), reading its sitemap and public Shopify catalog JSON, and inspecting the DOM, computed styles, and loaded scripts. Every number below was observed, not estimated, unless marked otherwise.

This is a reference for **structure, UX, and features**. It deliberately does not reproduce Paragon's copy, photography, logo, or brand identity — see "What not to copy" at the end.

---

## 1. At a glance

|             |                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| Business    | Indian manufacturer of scooter / two-wheeler accessories (crash guards, floor mats, full accessory kits), Rajkot, Gujarat |
| Platform    | Shopify (`paragon-accessories-4054.myshopify.com`)                                                                        |
| Theme       | **Horizon 3.5.1** — Shopify's own free theme (theme store ID 2481) — plus 5+ custom-coded sections                        |
| Market      | India only · INR · English · "Taxes included" pricing                                                                     |
| Catalog     | **165 products**, 1 vendor, no product types, **every product single-variant**                                            |
| Collections | **66** — organised as Brand → Model                                                                                       |
| Pages       | 6 (About, Manufacturing, Events, Contact, My Account, Track Order)                                                        |
| Blog        | 2 blogs, **44 articles**, SEO-driven long-form guides                                                                     |
| Price range | ₹416 – ₹6,000, median ₹1,425                                                                                              |
| Discounts   | 53 of 165 products on sale via compare-at price; up to 66% off, typically 3–14%                                           |
| Images      | 627 total, ~3.8 per product; kits carry 8–11 images plus a video                                                          |

### The single most important insight

**This is a fitment store.** Shoppers do not browse by product type — they browse by _the scooter they own_. Every navigation path, collection, and product title is organised around vehicle brand and model:

```
Brand (Honda)  →  Model (Activa 6G)  →  Product (Activa 6G Accessories Kit)
```

Product titles always lead with the model name. Brand collection pages are not product grids — they are **model pickers**. Any rebuild that gets this wrong gets the whole store wrong.

---

## 2. Catalog structure

### Product mix (inferred from titles across all 165)

| Category                           | Count         | Notes                                                     |
| ---------------------------------- | ------------- | --------------------------------------------------------- |
| Accessory **kits** (full bundles)  | 72            | The hero product. Highest price, most images, carry video |
| Crash guards (front / side / rear) | ~100 mentions | Often "Right And Left Kit", "With Fitting", "With Jali"   |
| Floor mats                         | ~19           | Flat ₹461, often "With Lock", "(Colored)"                 |
| Mud-guard bumpers                  | ~26           |                                                           |
| Lighting (Single / Double Light)   | —             | Its own top-level menu entries                            |
| Leg guards (motorcycles)           | few           | Honda Shine, Unicorn                                      |

### Product data shape

- **One variant per product.** Option is Shopify's default `Title`. Colour or finish variants are separate products (e.g. "Ola S1 Rear Guard With Fitting – Black").
- **Pricing**: `price` plus `compare_at_price`. Discount % is computed and shown as "11% OFF".
- **Descriptions are short**: median 349 characters, plain HTML, no headings.
- **No tags used** for filtering on the main kits; ~20 products carry model-name tags as legacy.
- **The rich PDP content is not in the product description.** "Materials & Build Quality", "Care & Maintenance", "Shipping & Returns", the FAQ, "Why Paragon", and "Product Benefits" are **shared template content** — identical across products.

### Collection hierarchy (66)

**12 brands** in the main menu: Ampere, Honda, TVS, Hero, Yamaha, Bajaj Chetak, Suzuki, Hero Electric, Mahindra, Ola, plus two lighting collections (Single Light, Double Light).

**~50 model collections** beneath them, e.g.:

- Honda → Activa 6G · Activa 125 Next Gen 2025 · Activa 3G/4G/5G · Grazia BS4 · Shine SP · Shine 100 Leg Guard
- TVS → Jupiter 125 · Jupiter 113 Next Gen · Ntorq · iQube · Pep+ · Orbiter · Orbiter Black
- Suzuki → Access 125 · Access 125 (Old) · Burgman Street · Burgman Bull · Avenis BS6 · Bull Series Avenis
- Bajaj → Chetak · Chetak EV · Chetak C2501 · Chetak C2501 Black
- EVs → Ola S1 Steel / Black · Vida · Vida Black · Ampere Magnus · Hero Electric Optima / Photon

Plus merchandising collections: `best-sellers`, `ev-vehicle`.

Model collections are small (1–5 products), which is why they need **no filters and no sorting**.

---

## 3. Global chrome

### Announcement bar

- Full-width, **brand red `#E31E24`**, white text, centred.
- **Rotating** messages with ‹ › arrows: "Free Delivery all over India" · "Get Up to 29% Off on selected products".

### Header — desktop

- Logo left. Centred nav. Icons right: search, account, cart (with count badge).
- Nav, uppercase, Jost 400: **HOME · SHOP ▾ · BLOG · CONNECT ▾ · MY ACCOUNT · TRACK ORDER**. The active item is red.
- **SHOP ▾** dropdown: the 12 brand collections.
- **CONNECT ▾** dropdown: About, Contact Us, Manufacturing, Events.

### Header — mobile

- Hamburger and search on the left, logo centred, account and cart on the right.
- The drawer carries the same tree with expandable SHOP and CONNECT, plus "Sign in" and "Track Order" at the foot.

### Floating WhatsApp button

- Fixed bottom-right on every page, green circle, links to `wa.me/<number>`.

### Footer

- Background `#F5F5F5`, four columns:
  1. Logo, a one-paragraph tagline, **"FOLLOW <BRAND>"** with six red circular social icons (Facebook, Instagram, YouTube, X, LinkedIn, Pinterest)
  2. **QUICK LINKS**: Home, About Us, Manufacturing, Blog, Events, Contact Us
  3. **HELP**: My Account, Privacy Policy, Terms & Condition, Return & Refund Policy
  4. **Address card** (white rounded box): full postal address linking to Google Maps, plus **INQUIRY** email addresses
- Below the columns, a row of **three trust badges** (white cards, red icons): _Quality assured — Tested manufacturing_ · _Made in India — Precision engineered_ · _Customer support — Help when you need it_. Then a **red "Need help? Call us" card** with two tappable phone numbers.
- Bottom bar: brand red, white uppercase "© 2026 <BRAND>. ALL RIGHTS RESERVED."

---

## 4. Homepage — 17 sections, in order

| #     | Section                     | What it is                                                                                                                                                                                                                                                                                                                                    |
| ----- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Announcement bar            | See above                                                                                                                                                                                                                                                                                                                                     |
| 2     | Header                      | See above                                                                                                                                                                                                                                                                                                                                     |
| 3     | **Hero slideshow**          | 4 slides, **autoplay every 2.5s**, infinite loop. Min height 25rem mobile / 45rem desktop. Scooter photography on a diagonal colour band; headline left; black pill CTA ("Explore New Arrival", "See What's Trending", "Shop Best Seller"). **Separate portrait images for mobile.** Slides are swapped seasonally (a Diwali slide was live). |
| 4     | **Model card carousel**     | Auto-scrolling infinite strip (items duplicated for a seamless loop). Cards ~400×330: scooter cut-out on a light grey rounded card, small "SUITABLE FOR" label, model name. Links to model collections.                                                                                                                                       |
| 5     | **About intro**             | Pink pill eyebrow "ABOUT US", H2, two paragraphs. Image left with a caption overlay ("UPGRADE YOUR DAILY RIDE").                                                                                                                                                                                                                              |
| 6–7   | **Best sellers**            | Eyebrow "OUR MOST IN DEMAND", H2 "Best Selling …", then an 8-product grid of kits. 4 columns desktop.                                                                                                                                                                                                                                         |
| 8     | **Video banner**            | Full-bleed dark background video. Eyebrow, uppercase H2 "LEADING MANUFACTURER", two paragraphs, white "About Us" button.                                                                                                                                                                                                                      |
| 9–10  | **Shop By Category**        | Eyebrow "OUR MOST TRENDING". **Mosaic grid: one tall tile plus four smaller tiles**, one per brand (Bajaj Chetak, Suzuki, Honda, TVS, Yamaha). Brand name top-left in white over a scooter photo on a gradient.                                                                                                                               |
| 11    | **Marquee**                 | Grey band, uppercase slogan scrolling continuously.                                                                                                                                                                                                                                                                                           |
| 12    | **Product hotspots**        | Full-width banner (three scooters, giant outlined "ACCESSORIES" text behind) with **pulsing red hotspot dots**. Each opens a popover product card (image, title, price, add). Uses CSS anchor positioning.                                                                                                                                    |
| 13–14 | **Blog**                    | Eyebrow "BLOG'S", H2 "Our Blogs", 4 latest articles: image, title, date.                                                                                                                                                                                                                                                                      |
| 15    | **Google rating badge**     | Pill: Google logo, stars, "4.9 \| 71 reviews", stacked reviewer avatars.                                                                                                                                                                                                                                                                      |
| 16    | **Google reviews carousel** | Cards: avatar, name, relative date, stars, verified tick, text. Prev/next arrows. Black pill "Leave a review on Google".                                                                                                                                                                                                                      |
| 17    | **Instagram feed**          | H2 "Follow us on Instagram", subtitle, image grid (~60 images loaded), "Visit Instagram".                                                                                                                                                                                                                                                     |
| —     | Footer                      | See above                                                                                                                                                                                                                                                                                                                                     |

### The repeated section-header pattern

Nearly every section opens with: a **small pill eyebrow** (pink background — red at ~15% opacity — dark text, uppercase, ~12px), then an **H2 in Jost 400 at ~32px**, left-aligned or centred. This one pattern accounts for much of the site's visual consistency.

---

## 5. Brand collection page (`/collections/honda`)

1. **Banner hero** (~220px): scooter image left; brand name huge and right-aligned ("HONDA"); subline "Premium Quality Accessories Compatible for HONDA"; light-grey base band.
2. Breadcrumb: `Home → HONDA`
3. **Model grid**: 3 columns. Each tile is an image card, the model name uppercase, and **"N products"** beneath.
4. No product grid.
5. **Content card**: white card with a **red left border**, red icon, H2 "Designed for Every Ride" left, SEO paragraph right.
6. **CTA band**: centred H2, short copy, black pill "CONTACT US NOW".

## 6. Model collection page (`/collections/activa-6g`)

Same template; the model grid is empty and hidden.

1. Banner hero
2. Breadcrumb, **three levels**: `Home → HONDA → Activa 6G`
3. Red uppercase micro-eyebrow "SHOP THE COLLECTION", H1 model name, product count right-aligned
4. **Product grid**, 3 columns at 1024px, 4 at wider widths. **No filters, no sort, no pagination.**
5. Same content card and CTA band.

---

## 7. Product card (used everywhere)

- White card, 1px light border, ~12px radius
- Product image on white
- Top-left: **discount badge pill** "11% off", pink background, red text. "Sold out" variant in grey
- Top-right: small brand-mark watermark
- **Star rating** (gold), then "N reviews"
- Title, 2 lines
- Price row: ~~Rs. 3,999.00~~ (grey, struck) **Rs. 3,552.00** (red) | **11% OFF** (red)
- Quick add: an "Add" button for single-variant products, "Choose" otherwise

**Price format: `Rs. 3,552.00`** — the "Rs." prefix, two decimals, Indian digit grouping.

---

## 8. Product page (`/products/activa-6g-accessories-kit`)

### Buy box (two columns desktop; stacked mobile)

**Left — gallery**: a vertical thumbnail rail on desktop, main image with ‹ › arrows; 10 slides including a video. Mobile: full-width, swipeable, dot indicators, no rail.

**Right, top to bottom:**

1. Breadcrumb: `Home → <Model collection> → <Product>`
2. Pink pill eyebrow "PREMIUM BIKE ACCESSORY"
3. H1 title
4. Stars + "7 reviews" (anchors to the reviews section)
5. Price: struck compare-at, red sale price, "| 11% OFF"
6. "Taxes included."
7. **Four icon chips**: Premium quality · Vehicle compatible · Strong & Durable · Precision Fit
8. Stock indicator: green dot, "In stock"
9. Quantity stepper (− 1 +) beside a black **"Add to cart"** button with a cart icon
10. Full-width outlined **"Buy it now"**
11. **Trust row**: Free shipping · Easy 3-day returns · 100% Secure Payment
12. **Accordions**: Description · Materials & Build Quality · Care & Maintenance · Shipping & Returns

### Below the fold

| Section                  | Content                                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product video            | Model-specific video when present                                                                                                                                                            |
| **Why <Brand>**          | Eyebrow, H2, **4 icon columns**: Performance Driven · Safety First · Sustainable Choice · Since 2010                                                                                         |
| **Product benefits**     | Factory image left; right: eyebrow, H2, intro, **5 red-dot bullets** (Precision Model Fit, All-Weather Durability, Complete Protection, Easy Installation, Brand Trusted)                    |
| **Customer reviews**     | Judge.me: average, count, "Verified", "Write a review", sort (Most Recent / Highest / Lowest / Only Pictures / Pictures First / Videos First / Most Helpful), photo reviews, 5 per page      |
| **FAQ**                  | Eyebrow "FAQ'S", H2, 5 questions: _Will this fit my vehicle model? · What material is it made of? · What is included in the package? · How long will delivery take? · Is installation easy?_ |
| **More From This Range** | Recommendations carousel                                                                                                                                                                     |

### Sticky add-to-cart bar

Appears once the buy box scrolls out of view: a floating pill at bottom centre with thumbnail, title, struck and sale price, % off, and a black cart button.

---

## 9. Cart — a right-side drawer

Adding to cart **does not open the drawer**; only the header badge updates. Clicking the cart icon opens it:

1. Header "Cart (1)" with a close button
2. **Free-shipping progress bar**, red: "You've unlocked free shipping on this order!" — **threshold ₹999**
3. Line item card: image, title, red sale price, struck compare-at, % off, quantity stepper, **trash button**
4. **"PAIR WITH YOUR ORDER — You may also like"**: horizontal upsell carousel with arrows
5. Trust row: Free shipping ₹999+ · 3-day returns · Secure checkout
6. **Order summary**: item count, Discount, Estimated total, "Duties and taxes included. Shipping is calculated at checkout."
7. **"Check out"** (black) and "Continue shopping"

The checkout button is intercepted by **GoKwik** (`gokwik-marge` class), so checkout is not Shopify's own. See section 13.

---

## 10. Search — a centred modal

- Opens over a dimmed page; input at top with clear and close
- **Empty state**: "Recently viewed" products, with a "Clear" link
- **While typing** ("activa"): result count ("9 search results found"), **query suggestion chips**, **Products** (up to 6 with price), **Collections** (with product counts), and "View all" to the full results page

---

## 11. Content pages

### About — 9 sections

Hero ("ABOUT <BRAND>", H1, subline) → **stats bar** (Year Founded · Products Designed · Brand Partners · Happy Riders) → story (image + text) → **values**, 4 icon cards → mission (image + text) → **infrastructure**, 6 cards (R&D, Production, QC, Packaging & Logistics, Support, Maintenance) → **certifications** logo row → **Why choose us**, 4 cards → CTA "Ready to Upgrade Your Ride?" + Shop Now

### Manufacturing — 7 sections

Hero → intro (image + text) → "How We Build" with **video** → **numbered process** (01 Design & prototyping, 02 Raw material sourcing, 03 Quality inspection…) → testing / quality assurance → certifications (ISO 9001:2015) → CTA

### Events — 6 sections

Video banner (feature story) → gallery story → "Latest Events" cards with video → exhibition gallery → video embed → CTA "Come be Part of It!"

### Contact — 4 sections

Hero ("We're Here to Help") → two columns: contact details (email, phone, address) and a **form** (Name, Email, Phone, Comment — Shopify's contact form) → **Google Maps embed** → "Support You Can Count On": 4 cards (Expert Advice, Order Support, Warranty Help, Bulk & OEM Enquiries)

### Track Order

Eyebrow "ORDER HELP", H1 "Track your order", one **AWB / tracking number** input, "Track order" button, helper text pointing to the dispatch SMS or email. The handler is custom JavaScript (form action is `#`) that most likely redirects to the courier's tracking page; the target courier was not visible without submitting.

### My Account

Links to **Shopify's hosted Customer Accounts** (`shopify.com/<shop-id>/account`) — not a custom page.

### Policies

Privacy, Terms of Service, Refund — standard Shopify policy pages.

---

## 12. Blog

- **Listing** (`/blogs/blog`): hero (pill eyebrow "<BRAND> BLOG", H1 "Unlocking Riding Secrets", subline), then a **3-column card grid** — image, title, date. All articles on one page, no pagination.
- **Article**: ~1,200 words. One H1, 5–6 H2s, H3 sub-steps, an **FAQ block at the end**, 1–2 inline product links, share control.
- **Topic strategy**: model-specific buying guides ("Activa 6G accessories guide"), how-tos ("How to install a bike safety guard"), comparisons, seasonal / festival posts (Dhanteras, monsoon), and brand posts. Content is aimed at long-tail search.
- Structured data: `BreadcrumbList`, `BlogPosting`, `Organization`.

---

## 13. Apps, integrations, and tracking

| Function           | Tool                                           | Rebuild note for a headless React storefront                                                                                                                                                                         |
| ------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Checkout / COD     | **GoKwik** (intercepts "Check out")            | Big one. India runs on COD. GoKwik replaces Shopify checkout for COD and RTO-risk scoring. Headless support must be confirmed with GoKwik — **do not assume**. Fallback: Shopify checkout with a COD payment method. |
| One-click checkout | **Razorpay Magic Checkout** + Shopify SSO      | Same caveat. Razorpay offers headless integrations; verify for this stack.                                                                                                                                           |
| Product reviews    | **Judge.me**                                   | Has a public/headless API. Note: it is configured to reward reviewers with a **10% coupon**.                                                                                                                         |
| Google reviews     | **Repocean** Google Reviews widget             | Rebuild with Google Places data, or a static curated set.                                                                                                                                                            |
| Instagram feed     | **GSC Instafeed**                              | Instagram Graph API, or a curated static gallery.                                                                                                                                                                    |
| Analytics          | **GTM**, **Meta Pixel**, **Microsoft Clarity** | The template's `enable-analytics` skill covers GTM.                                                                                                                                                                  |
| Agentic discovery  | `sitemap_agentic_discovery.xml`                | Shopify-generated. Vercel Shop already ships `/llms.txt` and Markdown pages.                                                                                                                                         |

---

## 14. Design system

| Token            | Value                                                                               |
| ---------------- | ----------------------------------------------------------------------------------- |
| Font             | **Jost**, weight 400 almost everywhere (headings too); uppercase for nav and labels |
| Brand red        | **`#E31E24`** — announcement bar, footer bar, sale prices, active nav, icons        |
| Red tint         | `#E31E24` at 15% (pill eyebrows, discount badges) and 7%                            |
| Text             | black at ~81% opacity for body; pure black for headings                             |
| Primary button   | black fill, white text, **pill** shape; hover `#333`                                |
| Secondary button | white with black border, **12px radius**, padding 16×24                             |
| Surfaces         | white; `#F5F5F5` for footer and marquee                                             |
| Cards            | white, 1px light border, ~12px radius                                               |
| H2               | ~32px, weight 400                                                                   |
| Body             | ~16–18px                                                                            |
| Imagery          | product cut-outs on pure white; lifestyle scooter shots on diagonal colour bands    |
| Motion           | autoplay slideshow (2.5s), infinite card strip, scrolling marquee, pulsing hotspots |

**Overall feel**: clean, white, lots of air, with red used sparingly as the only accent. Industrial-trust rather than lifestyle.

---

## 15. SEO

- Titles follow commercial-intent patterns: "Buy Honda Activa 6G Accessories Online | Best Prices", "Premium Honda Two Wheeler Accessories | Shop Now!"
- Each collection has a unique SEO paragraph in the content card
- PDP JSON-LD: `Product` with `offers` and `aggregateRating`, `BreadcrumbList`, `Organization`
- Full Open Graph, including `og:price:amount` and `og:price:currency`
- Canonicals on every page; meta descriptions ~300 characters
- 44 long-form articles cross-linking to products

---

## 16. User flows

1. **Fitment browse (primary)**: Home → _Shop ▾ Honda_ or the _Shop By Category_ tile → **brand page (pick model)** → **model page (pick product)** → PDP → add to cart → cart drawer → checkout
2. **Visual shortcut**: Home → model card carousel ("SUITABLE FOR Activa") → model page → PDP
3. **Search**: search modal → type the model name → model _collection_ or product directly
4. **Hotspot**: Home → tap a hotspot on the banner → popover product card → PDP or quick add
5. **Upsell**: cart drawer → "Pair with your order" → add a floor mat to a kit purchase
6. **Support**: WhatsApp floating button, phone numbers in the footer, Contact page, Track Order with an AWB
7. **Trust**: About / Manufacturing / Events → certifications, factory video → back to shop via CTA

---

## 17. What not to copy

Copy the **architecture, layout, flows, and feature set** — those are not anyone's property. Do **not** copy:

- Paragon's logo, name, or tagline
- Their product photography, lifestyle images, or videos
- Their written copy — about text, product descriptions, blog articles, FAQ answers
- Their phone numbers, emails, address, social links, or WhatsApp number
- Their certifications or statistics (founding year, "1M+ riders") — use your own, true numbers

Beyond copyright, a near-identical site in the same category, with the same city's competitors, invites confusion and complaints. Same _structure_, your own _identity_.
