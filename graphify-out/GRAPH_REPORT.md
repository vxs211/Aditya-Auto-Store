# Graph Report - Aditya-Auto-Store  (2026-11-27)

## Corpus Check
- 393 files · ~207,098 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: (none) 3, .woff2 3, .toml 1)

## Summary
- 2443 nodes · 6459 edges · 154 communities (130 shown, 24 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 146 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cebe42ed`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- transforms/product/index.ts
- buildAlternates
- about/page.tsx
- product-card.tsx
- app/layout.tsx
- assertStorefrontOk
- chat-message.tsx
- CommerceLocale
- Teardown: paragontwowheeleraccessories.com
- cart/server.ts
- Page
- product-detail-section.tsx
- customer/server.ts
- products/[handle]/page.tsx
- collection-page.tsx
- react
- collections/[handle]/page.tsx
- Button
- logging/server.ts
- quick-shop.tsx
- lib/collections/server.ts
- Step-by-step
- Enable Shopify Markets
- product-media.tsx
- Vercel Shop
- Headless Shopify Storefront — Project Brief
- collections/index.ts
- address-book.tsx
- search-modal.tsx
- Prompt: Leon Vasari, VHS filmography shelf hero
- transforms/product/types.ts
- products/server.ts
- 3. Build phases
- lib/product/types.ts
- config/index.ts
- [id]/page.tsx
- products/index.ts
- Skeleton
- nav/index.tsx
- icon.tsx
- line-item.tsx
- compilerOptions
- transforms/filters/index.ts
- next
- components.json
- Prompt: Folio, 3D bookshop hero with a rising row of books
- operations/policies/server.ts
- Haldoren — "Laptop Dive" Portfolio Hero: Build Brief
- Blendy — smoothie flavour slider hero: exact recreation prompt
- bottom-bar.tsx
- .oxlintrc.json
- Shopify setup
- tasks
- Mossline: Floating Moss Island Scroll Fly-In (exact recreation prompt)
- Enable Analytics
- product-info.tsx
- gift-card-purchase-form.tsx
- config/types.ts
- browse.tsx
- package.json
- product-story.tsx
- ShoppingResults
- dependencies
- Type & text motion
- Skeleton
- product-price.tsx
- mega-panel.tsx
- Storefront Rendering and Data Architecture
- Vercel Shop GraphQL Integration Reference
- config/types.ts
- proxy.ts
- auth/server.ts
- build-csv.mjs
- collection-page.tsx
- bundle-components.tsx
- products-grid.tsx
- Layout & UI patterns
- search/page.tsx
- Step-by-step
- customerFetch
- filters-client.tsx
- agent-wave.md
- Commerce Flows
- input-group.tsx
- scripts
- Update Vercel Shop
- Cart and Account Route Architecture
- Cart Provider and Bootstrap Contract
- Home and Marketing Route Architecture
- Connect an existing Shopify store
- AXON — Motion research hub: recreation brief
- Vercel Shop
- Product Detail Route Architecture
- blogs/server.ts
- shoot.py
- interface
- Integrate Shopify GraphQL
- shopify-dev-mcp
- runtime
- Workflow
- Enable Shopify Menus
- auth/request.ts
- representation/index.ts
- cart.tsx
- lenis
- Prompt: Orvante branding-agency page (three sections)
- ai@7.0.157
- babel-plugin-react-compiler@1.0.0
- class-variance-authority
- lucide-react@1.65.0
- oxfmt@0.75.0
- oxlint@1.90.0
- sanitize-html
- Maison Vell — Runway Depth Lookbook (exact recreation prompt)
- tailwindcss@4.3.3
- turbo@2.11.10
- tw-animate-css@1.4.0
- Prompt: Wild pill hero
- typescript@7.0.2
- Video & media
- @vercel/speed-insights
- storefront/server.ts
- Prompt: freight scroll hero ("Logistics that works as hard as you do.")
- Lumen Roof — Morning / Night Fog Hero (exact recreation prompt)
- Craft: the taste rules
- Depth & interaction
- Surfaces & buttons
- error-boundary-content.tsx
- Prompt: Reelmark hero
- Scroll
- Prompt: Facet "Designed in glass" hero
- product/server.ts
- blog/types.ts
- auto-play-video.tsx
- Media: sourcing, generating, preparing
- The build spec
- Look-and-fix review
- filters.tsx
- leg-guard-references/sources.md
- 3D & WebGL
- Technique library: index
- dummy.ts
- StarIcon
- examples/INDEX.md
- MEDIA.md
- builders.md
- react-dom
- @tailwindcss/turbopack@4.3.3
- @tailwindcss/typography@0.5.20
- @types/react-dom@19.3.0
- [shard]/route.ts
- AlertCircleIcon

## God Nodes (most connected - your core abstractions)
1. `Link()` - 119 edges
2. `react` - 118 edges
3. `next` - 91 edges
4. `@shopify/hydrogen` - 79 edges
5. `shopConfig` - 72 edges
6. `Button()` - 68 edges
7. `Container()` - 66 edges
8. `Page()` - 50 edges
9. `cn` - 47 edges
10. `Icon()` - 45 edges

## Surprising Connections (you probably didn't know these)
- `2.1 Brand → model hierarchy` --references--> `Collection`  [INFERRED]
  research/BUILD-PROMPT.md → lib/collections/types.ts
- `How the images are used` --references--> `Image`  [INFERRED]
  .agents/skills/motionsites-web-builder/examples/vasari-vhs-hero.md → lib/media/types.ts
- `Documents` --references--> `CommerceLocale`  [INFERRED]
  .agents/skills/shopify-graphql-reference/references/REFERENCE.md → lib/config/types.ts
- `Phase 3 — Fitment hierarchy (the core)` --references--> `CollectionLayout()`  [INFERRED]
  research/BUILD-PROMPT.md → components/collections/collection-page.tsx
- `Reference implementation` --references--> `getRefinedCollectionPath()`  [INFERRED]
  .agents/skills/build-shop/references/plp-search.md → lib/collections/index.ts

## Import Cycles
- None detected.

## Communities (154 total, 24 thin omitted)

### Community 0 - "transforms/product/index.ts"
Cohesion: 0.17
Nodes (20): Category, OptionValue, extractMediaFromProduct(), hasUniformPriceRange(), transformBundleComponent(), transformCategory(), transformFilteredShopifyProductCard(), transformImage() (+12 more)

### Community 1 - "buildAlternates"
Cohesion: 0.14
Nodes (27): BlogArticlePage(), BlogArticlePageContent(), generateMetadata(), generateStaticParams(), BlogPage(), BlogPageContent(), generateMetadata(), generateMetadata() (+19 more)

### Community 2 - "about/page.tsx"
Cohesion: 0.22
Nodes (10): AboutPage(), INFRASTRUCTURE, metadata, MISSION_POINTS, RANGE, RangePictures(), REASONS, STATS (+2 more)

### Community 3 - "product-card.tsx"
Cohesion: 0.15
Nodes (26): AgentCartSummaryProps, AgentProductCard(), AgentProductCardProps, AgentVariantPicker(), AgentVariantPickerProps, CartConfirmation, MissingData(), ShoppingResultsProps (+18 more)

### Community 4 - "app/layout.tsx"
Cohesion: 0.06
Nodes (38): ensureStatic, geist, inter, michroma, RootLayout(), viewport, ActionBar(), ActionBarProps (+30 more)

### Community 5 - "assertStorefrontOk"
Cohesion: 0.20
Nodes (17): generateStaticParams(), escapeXml(), GET(), getArticleSitemapPage(), getShopifySitemapPage(), getShopifySitemapPagesCount(), sitemapCacheTags(), tagSitemapResources() (+9 more)

### Community 6 - "chat-message.tsx"
Cohesion: 0.14
Nodes (21): AgentCartBridge(), CartRefresh, ChatMessage(), linkSafety, Markdown, AgentThinking(), Bubble(), BubbleContent() (+13 more)

### Community 7 - "CommerceLocale"
Cohesion: 0.24
Nodes (9): Keep the Shopify boundary explicit, CommerceLocale, ContentPage, EMBED_DOMAINS, sanitizeShopifyHtml(), SHOPIFY_HTML_OPTIONS, fetchPage(), GET_PAGE_QUERY (+1 more)

### Community 8 - "Teardown: paragontwowheeleraccessories.com"
Cohesion: 0.05
Nodes (38): 10. Search — a centred modal, 11. Content pages, 12. Blog, 13. Apps, integrations, and tracking, 14. Design system, 15. SEO, 16. User flows, 17. What not to copy (+30 more)

### Community 9 - "cart/server.ts"
Cohesion: 0.23
Nodes (13): POST(), createCustomerRequestContext(), cartHandlers, createCustomerCartHandlers(), createEmptyCart(), getCartById(), getCartData(), getCartIdFromCookie() (+5 more)

### Community 10 - "Page"
Cohesion: 0.12
Nodes (35): Spacing, AccountLandingPage(), AREAS, loginHref(), metadata, SendSignedInCustomerOn(), TileText(), metadata (+27 more)

### Community 11 - "product-detail-section.tsx"
Cohesion: 0.13
Nodes (30): Product page (Phase 4, partial), BuyButtons(), BuyButtonsProps, PurchaseOptions(), BuyWithShopLogo(), ProductOpenGraph(), ProductOpenGraphProps, BreadcrumbRow() (+22 more)

### Community 12 - "customer/server.ts"
Cohesion: 0.11
Nodes (30): CustomerAddress, CustomerAddressInput, CustomerOrder, CustomerOrdersPage, CustomerOrderSummary, CustomerProfile, PageInfo, ADDRESS_FRAGMENT (+22 more)

### Community 13 - "products/[handle]/page.tsx"
Cohesion: 0.15
Nodes (25): Preserve shell coherence, buildProductMetadata(), generateMetadata(), ProductPage(), ProductPageContent(), ProductDetailSkeleton(), ProductMediaArea(), ProductReviews() (+17 more)

### Community 14 - "collection-page.tsx"
Cohesion: 0.14
Nodes (23): CollectionCardProps, CollectionShopHeader(), interTight, CollectionBrowseBoundaryProps, CollectionHeader(), CollectionLayoutProps, ContactBand(), ContentCard() (+15 more)

### Community 15 - "react"
Cohesion: 0.12
Nodes (24): CollectionsPage(), interTight, AccountSidebarLink, SidebarClient(), ArticleCard(), CollectionCard(), interTight, Hotspot (+16 more)

### Community 16 - "collections/[handle]/page.tsx"
Cohesion: 0.12
Nodes (27): Next.js layer, AllProductsPage(), generateMetadata(), generateMetadata(), RefinedAllProductsPage(), RefinedAllProductsResults(), CollectionPage(), DefaultCollectionResults() (+19 more)

### Community 17 - "Button"
Cohesion: 0.10
Nodes (38): HomePage(), metadata, FeatureCarousel(), FeatureSlide, interTight, GoogleG(), GoogleReviews(), SAMPLE_REVIEWS (+30 more)

### Community 18 - "logging/server.ts"
Cohesion: 0.13
Nodes (18): register(), customerAccountFetch(), isCustomerAccountUnauthorized(), CustomerAccountFetchOptions, CustomerAccountVariables, isTransientError(), TRANSIENT_ERROR_CODES, configureShopifyLogging() (+10 more)

### Community 19 - "quick-shop.tsx"
Cohesion: 0.14
Nodes (26): QuickShop(), changeOpen(), closeForCart(), load(), resolveSelection(), retrySelection(), selectVariant(), QuickShopDetails() (+18 more)

### Community 20 - "lib/collections/server.ts"
Cohesion: 0.11
Nodes (31): CollectionHandleLayout(), CollectionHandleLayoutContent(), generateStaticParams(), Phase 3 build log: fitment hierarchy, CollectionDetailSkeleton(), getCollection(), getCollectionFitment(), getCollectionProductCount() (+23 more)

### Community 21 - "Step-by-step"
Cohesion: 0.14
Nodes (13): A. There must be no `app/layout.tsx` above `app/[locale]/`, B. Carry `ensureStatic` and give `locale` static params, C. Keep request reads behind Suspense, Cache Components compatibility — read this first, Create the locale source of truth, D. `setRequestLocale` is not used, E. Keep the template `Link`, Enable i18n (next-intl, no Markets) (+5 more)

### Community 22 - "Enable Shopify Markets"
Cohesion: 0.08
Nodes (25): 10. Strategy-specific SEO and sitemap behavior, 11. Verification, 1. Ask for routing and locales, 2. Make regional locales the source of truth, 4. Configure routing, 5. Move page routes under `app/[locale]/`, 6. Resolve locale from the root param, 7. Extend the proxy (+17 more)

### Community 23 - "product-media.tsx"
Cohesion: 0.23
Nodes (17): Lightbox(), LightboxContext, LightboxTrigger(), Carousel(), LAZY_IMAGE_PROPS, LCP_IMAGE_PROPS, MediaImage(), MediaItem (+9 more)

### Community 24 - "Vercel Shop"
Cohesion: 0.12
Nodes (16): Cart, Code Style, Comments, Customer accounts, Describe the product, not the change, Environment files, Files, GraphQL (+8 more)

### Community 25 - "Headless Shopify Storefront — Project Brief"
Cohesion: 0.09
Nodes (22): 1. Open questions (need answers before build), 2. Goals, 3. Non-goals (v1), 4. Architecture, 5. The content-editing tradeoff — read this, 6. Scope — full store, v1, 7. Phases, 8. Risks (+14 more)

### Community 26 - "collections/index.ts"
Cohesion: 0.18
Nodes (14): AllProductsLayout(), CollectionLayout(), InfiniteProductGridProps, EMPTY_PAGE, LOAD_MORE_INPUT, getBrowseSearch(), getBrowseSort(), getRefinedCollectionPath() (+6 more)

### Community 27 - "address-book.tsx"
Cohesion: 0.13
Nodes (30): AddressBook(), AddressForm(), DeleteDialog(), FormState, REQUIRED_FIELDS, TEXT_FIELDS, toFormValues(), Dialog() (+22 more)

### Community 28 - "search-modal.tsx"
Cohesion: 0.12
Nodes (20): LoadingSkeleton(), ProductResult(), SearchDialogContent(), handleKeyDown(), navigateToActiveItem(), SearchTrigger(), SuggestionChip(), RecentlyViewedRecorder() (+12 more)

### Community 29 - "Prompt: Leon Vasari, VHS filmography shelf hero"
Cohesion: 0.06
Nodes (33): 1. Top bar, 2. Decade tabs, 3. The shelf (3D stage), 4. Play ring, 5. Caption, 6. Arrows, 7. Footer, 8. Custom cursor (+25 more)

### Community 30 - "transforms/product/types.ts"
Cohesion: 0.15
Nodes (18): BUNDLE_COMPONENT_VARIANT_FRAGMENT, BUNDLE_RELATIONSHIPS_FRAGMENT, FILTERABLE_PRODUCT_CARD_FRAGMENT, PRODUCT_CARD_FRAGMENT, PRODUCT_FRAGMENT, PRODUCT_WITH_VARIANTS_FRAGMENT, TAXONOMY_CATEGORY_FRAGMENT, PRODUCT_VARIANT_FRAGMENT (+10 more)

### Community 31 - "products/server.ts"
Cohesion: 0.10
Nodes (27): ProductPage, decodeShopifyId(), COLLECTION_PRODUCTS_QUERY, fetchProduct(), fetchProductRecommendations(), fetchProductsByIds(), GET_PRODUCT_BY_HANDLE_QUERY, GET_PRODUCT_BY_HANDLE_WITH_BUNDLES_QUERY (+19 more)

### Community 32 - "3. Build phases"
Cohesion: 0.09
Nodes (22): 0.1 Brand system (binding), 0.2 Decision: retail store, single pieces or bulk, 0. Business details, 1. What makes this store work, 2.1 Brand → model hierarchy, 2.2 Editable marketing content — metaobjects, 2. Data model in Shopify, 3. Build phases (+14 more)

### Community 33 - "lib/product/types.ts"
Cohesion: 0.17
Nodes (23): PurchaseOptionsProps, ProductSchemaData, ProductSchemaProps, toAgentVariant(), toDiscountPrice(), AgentOptionValue, AgentProduct, AgentProductDetails (+15 more)

### Community 34 - "config/index.ts"
Cohesion: 0.09
Nodes (28): agentProfile, agentProfileUrl(), GET(), GET(), GET(), GET(), GET(), FooterLink (+20 more)

### Community 35 - "[id]/page.tsx"
Cohesion: 0.23
Nodes (18): OrderDetailContent(), OrderDetailPage(), OrderDetailSkeleton(), OrderLineItemRow(), SummaryRow(), OrdersContent(), OrdersPage(), OrdersSkeleton() (+10 more)

### Community 36 - "products/index.ts"
Cohesion: 0.06
Nodes (47): cartHandlers, getCart(), getSessionCartId(), mutateCart(), formatCatalogMoney(), matchingProducts(), productHandleSchema, productOptionsSchema (+39 more)

### Community 37 - "Skeleton"
Cohesion: 0.21
Nodes (11): AccountGate(), AccountLabel(), AccountLabelSkeleton(), AccountLayout(), SidebarSkeleton(), ACCOUNT_LINKS, AccountMobileTabs(), AccountTab (+3 more)

### Community 38 - "nav/index.tsx"
Cohesion: 0.27
Nodes (12): 4. Wire the nav menu, StoreAssistant(), Navigation, NavAccount(), NavAccountFallback(), FooterAvoidance(), schedule(), update() (+4 more)

### Community 39 - "icon.tsx"
Cohesion: 0.16
Nodes (26): MobileMenu(), CHIPS, GUARANTEES, ServiceGuarantees(), TrustChips(), AlertTriangleIcon(), ArrowLIcon(), AwardIcon() (+18 more)

### Community 40 - "line-item.tsx"
Cohesion: 0.06
Nodes (62): CartPage(), AgentButton(), AgentPanel(), AgentPanelProps, AgentPanel, BRAND_LOGOS, ShoppingBrand, ShoppingModel (+54 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 42 - "transforms/filters/index.ts"
Cohesion: 0.15
Nodes (21): FILTER_FRAGMENT, fetchCollectionProducts(), toCollectionSort(), extractPriceRange(), getParamKeyFromShopifyId(), getSelectedColorFilterLabel(), isColorKey(), mapShopifyFilterPresentation() (+13 more)

### Community 43 - "next"
Cohesion: 0.12
Nodes (25): metadata, Posts(), generateMetadata(), GuideContent(), GuidePage(), NotFoundError(), PopularBrands(), ShopifyNotFoundRedirect() (+17 more)

### Community 44 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 45 - "Prompt: Folio, 3D bookshop hero with a rising row of books"
Cohesion: 0.09
Nodes (22): Books, Camera, Canvas (z 2), Fonts and colour, Intro, Layout (all fixed, the page never scrolls), Lighting, Link row (z 1) (+14 more)

### Community 46 - "operations/policies/server.ts"
Cohesion: 0.26
Nodes (8): generateStaticParams(), getShopPolicies(), ShopPolicy, SHOP_POLICY_FRAGMENT, fetchPolicyAnswers(), fetchShopPolicies(), GET_SHOP_POLICIES_QUERY, POLICY_TYPES

### Community 47 - "Haldoren — "Laptop Dive" Portfolio Hero: Build Brief"
Cohesion: 0.09
Nodes (21): 10. Arrive in case mode (`arriveCase`), 11. Switching cases, 12. Back to the hero (`toHero`), 13. Small screens (≤ 820px), 14. Reduced motion, 15. Copy and brand notes, 1. Assets (use these exact URLs — do not download, re-host, crop or re-encode), 2. Fonts (+13 more)

### Community 48 - "Blendy — smoothie flavour slider hero: exact recreation prompt"
Cohesion: 0.10
Nodes (19): 10. Tablet and mobile, 11. Reduced motion, 12. Acceptance checklist, 1. Assets, 2. Fonts, 3. Head and colour tokens, 4. Scaling system, 5.1 The flavour word (word layer) (+11 more)

### Community 49 - "bottom-bar.tsx"
Cohesion: 0.19
Nodes (14): BarLink(), ICONS, BarMotion(), onClick(), place(), BarRise(), ENTRANCE, SLIDE (+6 more)

### Community 50 - ".oxlintrc.json"
Cohesion: 0.12
Nodes (16): categories, correctness, suspicious, Image, Link, ignorePatterns, components, plugins (+8 more)

### Community 51 - "Shopify setup"
Cohesion: 0.12
Nodes (16): Connection log — 2026-11-04, Getting the Storefront token, Known cosmetic issues, both from unset config, Live — 2026-11-04, Manual fallback, Next, Remaining manual step, Route A — preview store (unblocks development today) (+8 more)

### Community 52 - "tasks"
Cohesion: 0.12
Nodes (16): outputs, cache, persistent, cache, globalDependencies, globalEnv, $schema, cache (+8 more)

### Community 53 - "Mossline: Floating Moss Island Scroll Fly-In (exact recreation prompt)"
Cohesion: 0.12
Nodes (15): 10. Accounting and hotspots (L3), 11. Station (L4), 12. Per-frame scroll controller, 13. Solutions section, 14. Responsive (≤820px), 1. Page basics, 2. Assets (all URLs exact), 3. Navigation (fixed) (+7 more)

### Community 54 - "Enable Analytics"
Cohesion: 0.12
Nodes (15): 1. Do you need to add or change Vercel Analytics and/or Vercel Speed Insights?, 2. Do you want Google Tag Manager?, A1. Install dependencies, B1. Install dependency, B2. Add environment variable, B3. Add GTM to `components/analytics/index.tsx`, Before you start, C1. Update `components/analytics/index.tsx` (+7 more)

### Community 55 - "product-info.tsx"
Cohesion: 0.19
Nodes (14): DropdownPanelProps, ColorPicker(), ColorPickerProps, OptionPicker(), OptionPickerProps, ProductInfoDescriptionProps, ProductInfoOptions(), ProductInfoOptionsProps (+6 more)

### Community 56 - "gift-card-purchase-form.tsx"
Cohesion: 0.25
Nodes (11): ProfileForm(), ProfileFormLabels, useCartDrawer(), GiftCardPurchaseForm(), GiftCardPurchaseFormFallback(), TrackOrderForm(), Input(), Label() (+3 more)

### Community 57 - "config/types.ts"
Cohesion: 0.17
Nodes (11): Build with Vercel Shop, Copy and deployment defaults, Ground the work in source, Hydrogen ownership, Model the route, Organize code by domain and execution context, Prevent blocking, Route the work (+3 more)

### Community 58 - "browse.tsx"
Cohesion: 0.11
Nodes (29): Collection and Search Routes, Images and pagination, Keep the default view static, One browse store for collections and search, Prefetch traffic, Reference implementation, Results and controls, Browse() (+21 more)

### Community 59 - "package.json"
Cohesion: 0.13
Nodes (14): @base-ui/react@1.9.0, streamdown@2.7.1, @types/node@26.6.6, @types/react@19.3.0, engines, node, name, packageManager (+6 more)

### Community 60 - "product-story.tsx"
Cohesion: 0.29
Nodes (13): FAQ_SCHEMA, FaqPage(), FAQS, metadata, FIXED_PANELS, ProductAccordions(), FAQS, ProductFaq() (+5 more)

### Community 61 - "ShoppingResults"
Cohesion: 0.15
Nodes (17): hasCompleteVariants(), isAgentProduct(), ShoppingResults(), wantsOptions(), ReviewCarousel(), ProductImageCarousel(), ProductImageCarouselProps, GalleryArrows() (+9 more)

### Community 62 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, botid@1.5.12, cn@0.5.1, eve@0.87.0, gsap@^3.15.0, @gsap/react@^2.1.2, next@16.4.3, react@19.3.1 (+6 more)

### Community 63 - "Type & text motion"
Cohesion: 0.13
Nodes (14): 10. Scroll-linked word-by-word (or char-by-char) opacity reveal, 11. Giant display type as image (ghost word behind subject · edge-to-edge wordmark · watermark · scattered words), 12. Geometric SVG wordmark assembly, 13. Count-up statistics & counter preloader, 1. Staggered blur-rise load choreography (+ settle-zoom media), 2. Fail-safe entrance system with a motion vocabulary, 3. Word-by-word blur-in headline, 4. Split-text headline entrances (masked line/word pull-up · soft word rise · per-character cascade) (+6 more)

### Community 64 - "Skeleton"
Cohesion: 0.28
Nodes (11): AddressesContent(), AddressesPage(), AddressesSkeleton(), ProfileContent(), ProfilePage(), ProfileSkeleton(), AccountPageHeader(), Skeleton() (+3 more)

### Community 65 - "product-price.tsx"
Cohesion: 0.24
Nodes (10): ComplementaryProducts(), ProductPrice(), ProductPriceProps, DiscountBadge(), DiscountBadgeProps, Price(), PriceProps, priceLine() (+2 more)

### Community 66 - "mega-panel.tsx"
Cohesion: 0.17
Nodes (14): FooterList(), DropdownPanel(), hide(), onKey(), interTight, MegaCard, MegaDetail, MegaPanel() (+6 more)

### Community 67 - "Storefront Rendering and Data Architecture"
Cohesion: 0.17
Nodes (11): Architect media and third parties, Choose cache ownership deliberately, Define client and mutation boundaries, Design the dependency graph, Keep responsibilities in layers, Pass request-time work down to a resolved leaf, Reference implementation, Shape the shell and streaming boundaries (+3 more)

### Community 68 - "Vercel Shop GraphQL Integration Reference"
Cohesion: 0.18
Nodes (10): Choose cache behavior from the consumer, Completion checklist, Data flow, Deployment context versus copy locale, Documents, Invalidation, Key Vercel Shop files, Operation integration (+2 more)

### Community 69 - "config/types.ts"
Cohesion: 0.15
Nodes (15): anonymous, browserAuth(), isAgentInfoRequest(), Shop Agent boundaries, 3. Install next-intl and migrate copy, assertRequiredEnv(), resolveConfig(), withShopConfig() (+7 more)

### Community 70 - "proxy.ts"
Cohesion: 0.24
Nodes (11): createCustomerSessionManager(), forwardCustomerRefreshAttempt(), getCustomerRequestOrigin(), isRefinedCollectionPath(), predictiveSearchHandlers, PRODUCT_FRAGMENT, QUERY_FRAGMENT, AUTH_PATHS (+3 more)

### Community 71 - "auth/server.ts"
Cohesion: 0.38
Nodes (11): Boundary rules, getHydrogenCustomerSession(), getCustomerAccessToken, getReadonlyCustomerSessionManager, getReadonlyRequestContext, getRequestedPath(), isCustomerLoggedIn, redirectToCustomerLogin() (+3 more)

### Community 72 - "build-csv.mjs"
Cohesion: 0.08
Nodes (19): files, findings, root, sharedLinkFiles, sourceRoots, walk(), add(), cap() (+11 more)

### Community 73 - "collection-page.tsx"
Cohesion: 0.17
Nodes (19): CollectionActiveFilterCountBadge(), CollectionsSortSelect(), SORT_LABELS, BrowseFallback(), BrowseFallbackProps, BrowseToolbar(), BrowseToolbarProps, ToolbarLayout() (+11 more)

### Community 74 - "bundle-components.tsx"
Cohesion: 0.29
Nodes (10): BundleComponents(), BundleComponentsProps, BundleListItem, BundleParents(), BundleParentsProps, BundleProductList(), BundleProductListProps, BundleRelationships() (+2 more)

### Community 75 - "products-grid.tsx"
Cohesion: 0.27
Nodes (9): ProductCardSkeleton(), ProductsGrid(), ProductsGridContent(), ProductsGridProps, ProductsGridSkeletonProps, RelatedProductsSection(), RelatedProductsSectionSkeleton(), Render() (+1 more)

### Community 76 - "Layout & UI patterns"
Cohesion: 0.15
Nodes (12): 10. Seamless infinite marquee (logos, image strip, giant text) with edge-fade mask, 11. Infinite looping card slider (triple clone + instant re-centre), 1. Hero composition patterns, 2. Viewport-locked single-frame hero (height-based design units), 3. Floating pill navigation, 4. Expanding glass capsule menu, 5. Mobile menu: burger morph + staggered overlay / drawer / bottom sheet, 6. Overlapping avatar trust cluster with pill (+4 more)

### Community 77 - "search/page.tsx"
Cohesion: 0.42
Nodes (9): generateMetadata(), getParam(), SearchAnalyticsTracker(), SearchBrowse(), SearchPage(), SearchParams, SearchQueryLabel(), SearchResultCount() (+1 more)

### Community 78 - "Step-by-step"
Cohesion: 0.17
Nodes (12): Step 10: Bare `/` and unknown locales, Step 11: `generateStaticParams` on the locale layout, Step 12: Add or adapt the language selector, Step 1: Routing config, Step 2: Move routes under `app/[locale]/`, Step 3: Create `lib/params/server.ts` for Server Component root params, Step 4: `lib/i18n/request/server.ts` loads messages by resolved locale, Step 5: Extend `proxy.ts` (+4 more)

### Community 79 - "customerFetch"
Cohesion: 0.48
Nodes (7): createCustomerAddress(), customerFetch(), deleteCustomerAddress(), toShopifyAddressInput(), toUserErrors(), updateCustomerAddress(), updateCustomerProfile()

### Community 80 - "filters-client.tsx"
Cohesion: 0.11
Nodes (28): usePublishedFacets(), buildToggleHref(), CollectionFilterSidebar(), CollectionFilterSidebarProps, FilterBadge(), FilterBadgeProps, FilterOption(), FilterOptionProps (+20 more)

### Community 81 - "agent-wave.md"
Cohesion: 0.17
Nodes (11): Buttons (shared liquid-glass language), Entrance motion (exact), Fonts (exact), Header — 3-column grid, Hero (bottom-centered, NOT vertically centered), Image / asset URLs (exact — there are only these), JS (only this), Layer stack (back → front) (+3 more)

### Community 82 - "Commerce Flows"
Cohesion: 0.22
Nodes (8): Cart and checkout handoff, Commerce Flows, Content lifecycle, Customer account, Discovery, Product selection, Reference implementation, Required end-to-end checks

### Community 83 - "input-group.tsx"
Cohesion: 0.35
Nodes (9): AgentComposer(), AgentComposerProps, AgentStatus, CornerDownLeftIcon(), SquareIcon(), InputGroup(), InputGroupButton(), inputGroupButtonVariants (+1 more)

### Community 84 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, build:agent, dev, dev:portless, format, lint, start (+1 more)

### Community 85 - "Update Vercel Shop"
Cohesion: 0.25
Nodes (7): Apply and report, Audit and plan, Find the base and target releases, Inspect the project, Pick a mode, Read the release notes, Update Vercel Shop

### Community 86 - "Cart and Account Route Architecture"
Cohesion: 0.29
Nodes (6): Cart and Account Route Architecture, Client boundaries, Mutations and transitions, Never share personalized data, Reference implementation, Shared shell

### Community 87 - "Cart Provider and Bootstrap Contract"
Cohesion: 0.29
Nodes (6): Acceptance checks, Bootstrap and live reads, Cart Provider and Bootstrap Contract, Mutations, Ownership, Reference implementation

### Community 88 - "Home and Marketing Route Architecture"
Cohesion: 0.29
Nodes (6): Hero and LCP, Home and Marketing Route Architecture, Marketing content, Product sections, Reference implementation, Rendering contract

### Community 89 - "Connect an existing Shopify store"
Cohesion: 0.29
Nodes (5): Authenticate, Connect an existing Shopify store, Fallback, Reuse or create a token, Initialize Vercel Shop

### Community 90 - "AXON — Motion research hub: recreation brief"
Cohesion: 0.17
Nodes (11): 10. Acceptance checklist, 1. Media, 2. Fonts, 3. Head and tokens, 4. Layers, 5. UI DOM, in order, desktop measurements, 6. Responsive, 7. Particle system (the hero) (+3 more)

### Community 91 - "Vercel Shop"
Cohesion: 0.29
Nodes (6): Documentation, Features, Getting Started, License, Skills, Vercel Shop

### Community 92 - "Product Detail Route Architecture"
Cohesion: 0.33
Nodes (5): Primary media, Product Detail Route Architecture, Recommendations and secondary content, Reference implementation, Variant interaction

### Community 93 - "blogs/server.ts"
Cohesion: 0.27
Nodes (10): assertStorefrontOk(), ARTICLE_SUMMARY_FRAGMENT, BLOG_FRAGMENT, fetchBlog(), fetchBlogArticle(), GET_BLOG_ARTICLE_QUERY, GET_BLOG_QUERY, transformArticle() (+2 more)

### Community 95 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 96 - "Integrate Shopify GraphQL"
Cohesion: 0.40
Nodes (4): Apply the Vercel Shop conventions, Delegate Shopify facts first, Integrate Shopify GraphQL, Revalidate both boundaries

### Community 97 - "shopify-dev-mcp"
Cohesion: 0.40
Nodes (4): OPT_OUT_INSTRUMENTATION, npx, shopify-dev-mcp, @shopify/dev-mcp

### Community 98 - "runtime"
Cohesion: 0.40
Nodes (5): devEngines, runtime, name, onFail, version

### Community 99 - "Workflow"
Cohesion: 0.17
Nodes (11): 1. Read the brief (decide, don't interrogate), 2. Pick ONE reference design, 3. Make it theirs, 4. Build, 5. Look once, fix what matters, 6. Deliver, Files, MotionSites Web Builder (+3 more)

### Community 100 - "Enable Shopify Menus"
Cohesion: 0.18
Nodes (10): 1. Add the menu operation, 1. Which menus do you want to fetch from Shopify?, 2. Cache the menu, 2. What are the Shopify menu handles?, 3. Refresh menus after edits, 5. Wire the footer menu, Before you start, Enable Shopify Menus (+2 more)

### Community 101 - "auth/request.ts"
Cohesion: 0.26
Nodes (9): createSessionManager(), decryptSession(), encryptSession(), getSessionKey(), parseCookies(), readSession(), REFRESH_ATTEMPT_HEADER, REFRESH_ATTEMPT_PARAM (+1 more)

### Community 102 - "representation/index.ts"
Cohesion: 0.25
Nodes (12): Step 9: Locale-aware Markdown negotiation, Markdown negotiation, appendVaryAccept(), getMarkdownMirrorPath(), getMarkdownPath(), getMarkdownRewritePath(), matches(), parseAccept() (+4 more)

### Community 103 - "cart.tsx"
Cohesion: 0.33
Nodes (8): CartIcon(), CartIconClient(), CartIconClientProps, BagIcon(), prepareCheckoutAction(), handleCheckout(), getCart(), withFallback()

### Community 105 - "Prompt: Orvante branding-agency page (three sections)"
Cohesion: 0.18
Nodes (10): Acceptance check (1440 wide), Bar and statement, Colours and type, Hero (1440 × 938u), Media (exact URLs, all on Higgsfield CloudFront), Motion, Phone (≤ 760px), Prompt: Orvante branding-agency page (three sections) (+2 more)

### Community 113 - "Maison Vell — Runway Depth Lookbook (exact recreation prompt)"
Cohesion: 0.18
Nodes (10): 1. Page basics, 2. Images (use these exact URLs), 3. Header, 4. Stage, 5. Depth table, 6. Interaction, 7. Product rail, 8. Phones (820px and below) (+2 more)

### Community 117 - "Prompt: Wild pill hero"
Cohesion: 0.18
Nodes (10): Acceptance check (1440×960), Interaction, Layout, Media, Motion: the reveal, Phone (≤ 720 px), Prompt: Wild pill hero, Recording mode (`?rec=1`) (+2 more)

### Community 119 - "Video & media"
Cohesion: 0.18
Nodes (10): 1. Cinematic background video layer (autoplay, HLS, off-screen pause, settle-in), 2. Seamless video loop with rAF opacity fades (manual loop, optional playlist), 3. Background-video framing & art direction, 4. Edge-blend scrims & text protection over video, 5. Progressive bottom blur (masked backdrop-filter), 6. Cursor-scrubbed video (delta scrub · split dual-video), 7. Scroll-scrubbed video with canvas frame cache, 8. Boomerang (ping-pong) video loop (+2 more)

### Community 121 - "storefront/server.ts"
Cohesion: 0.24
Nodes (8): fetchLocalizationCurrency(), GET_LOCALIZATION_CURRENCY_QUERY, customFetchApi(), getClient(), operationName(), SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN, storefront

### Community 122 - "Prompt: freight scroll hero ("Logistics that works as hard as you do.")"
Cohesion: 0.20
Nodes (9): Acceptance check (1440×960), After the clouds: testimonial section (text only), Media, Portrait (≤ 609px wide, or any portrait aspect), Prompt: freight scroll hero ("Logistics that works as hard as you do."), Scale and structure, Scroll → clip mapping (JS), Scrolling blocks (desktop, positions from the top of the track) (+1 more)

### Community 123 - "Lumen Roof — Morning / Night Fog Hero (exact recreation prompt)"
Cohesion: 0.20
Nodes (9): 1. Page basics, 2. Images (use these exact URLs), 3. Layer stack, bottom to top, 4. Content, 5. The switch, 6. Fog shader, 7. Phones (820px and below), Complete code (+1 more)

### Community 124 - "Craft: the taste rules"
Cohesion: 0.20
Nodes (9): Colour, Composition, Copy, Craft: the taste rules, Extra craft details (values), Failure modes to design against, Motion, Surfaces and components (+1 more)

### Community 125 - "Depth & interaction"
Cohesion: 0.20
Nodes (9): 1. Depth carousel with role slots and background-colour crossfade, 2. Magnetic hover (element drifts toward the cursor), 3. Pointer parallax depth layers, 4. Cursor-following spotlight reveal mask, 5. Cursor image trail, 6. Exclusion-blend overlay UI & custom cursor, 7. Orbit rings with counter-rotating avatars, 8. Sand-dissolve image transition (SVG turbulence) + auto-cycling index list (+1 more)

### Community 126 - "Surfaces & buttons"
Cohesion: 0.20
Nodes (9): 1. Liquid-glass surface (gradient hairline rim), 2. Frosted glass UI kit over video (chips, accent badge, numbered panel, contact card), 3. Premium button finishes (liquid-metal + sweep shine, halo pill, jewel pill), 4. Text-roll button with rotating arrow chip, 5. Sliding-fill buttons (+ hard offset shadow), 6. Animated gradient border ring (@property conic spin · hover ring), 7. Media card hover: icon-to-label pill, zoom, frosted veil, 8. Texture overlays: film grain, noise inside type, halftone, dot grid (+1 more)

### Community 127 - "error-boundary-content.tsx"
Cohesion: 0.60
Nodes (3): AccountError(), RootError(), ErrorBoundaryContent()

### Community 128 - "Prompt: Reelmark hero"
Cohesion: 0.22
Nodes (8): Acceptance check (1440×1080), Card media (one video for all ten), Frame, Layout (1440×1080), Motion (UI), Phones (≤ 820px), Prompt: Reelmark hero, Type

### Community 129 - "Scroll"
Cohesion: 0.22
Nodes (8): 1. Viewport-triggered staggered reveal (+ directional corner decor), 2. Sticky cinematic stage with CSS-variable choreography (scroll windows, split-frame parting, depth-of-field, tint), 3. Panel slide-over hero + viewport-scaled scattered gallery + blend outro, 4. Pinned heading with counter-drifting parallax columns (+ single-element parallax), 5. Sticky stacking cards that scale down, 6. Scroll-linked opposing marquee rows, 7. 3D tilted text crawl on scroll (spring-smoothed), Scroll

### Community 130 - "Prompt: Facet "Designed in glass" hero"
Cohesion: 0.25
Nodes (7): Acceptance check (1440×960), Content printed on the glass, Interaction, Prompt: Facet "Designed in glass" hero, Scene and scale, The cut pattern (live), The glass

### Community 131 - "product/server.ts"
Cohesion: 0.39
Nodes (6): POST(), verifyWebhook(), generateStaticParams(), getSearchIndexProducts(), tagProducts(), getNumericShopifyId()

### Community 132 - "blog/types.ts"
Cohesion: 0.31
Nodes (7): ArticleCardProps, ArticlePageProps, BlogIndexProps, Blog, BlogArticle, SearchParamsInput, SEO

### Community 133 - "auto-play-video.tsx"
Cohesion: 0.39
Nodes (7): AutoPlayVideo(), AutoPlayVideoPreviewImage, AutoPlayVideoProps, prefersReducedMotion(), subscribeToReducedMotion(), PauseIcon(), PlayIcon()

### Community 134 - "Media: sourcing, generating, preparing"
Cohesion: 0.29
Nodes (6): Generating media (when you have a generation tool), Media: sourcing, generating, preparing, Order of preference, Placing media, Preparing video for the web (ffmpeg), What makes hero media work

### Community 135 - "The build spec"
Cohesion: 0.33
Nodes (5): Add-on modules, Consistency pass (before building), Precision rules, Template, The build spec

### Community 136 - "Look-and-fix review"
Cohesion: 0.40
Nodes (4): Fix immediately (blocking), Fix loop, Look-and-fix review, Score 1–10 on each

### Community 137 - "filters.tsx"
Cohesion: 0.33
Nodes (8): BrowsePublication, BrowsePublisherProps, CollectionFilters(), CollectionFiltersProps, CollectionFiltersSkeleton(), ResolvedCollectionFilters(), ResolvedCollectionFiltersProps, Facets

### Community 138 - "leg-guard-references/sources.md"
Cohesion: 0.40
Nodes (3): Leg guard reference sources, Seat cover photo references, Vehicle photos

### Community 139 - "3D & WebGL"
Cohesion: 0.50
Nodes (3): 1. Real 3D model hero (Three.js + GLB), 2. Animated shader backdrop (swirl + pointer chroma blob + fluted glass + grain), 3D & WebGL

### Community 140 - "Technique library: index"
Cohesion: 0.50
Nodes (3): How to choose a signature, Technique library: index, Techniques

### Community 141 - "dummy.ts"
Cohesion: 0.33
Nodes (8): DUMMY_PRODUCT_HANDLE, dummyProduct(), dummyVariant(), gallery, money(), VariantDef, variantDefs, variantFor()

### Community 142 - "StarIcon"
Cohesion: 0.83
Nodes (3): getDummyRating(), ProductCardRating(), StarIcon()

### Community 152 - "[shard]/route.ts"
Cohesion: 0.61
Nodes (7): escapeXml(), GET(), renderShard(), renderStatic(), toAbsoluteUrl(), urlsetWrap(), xmlResponse()

## Knowledge Gaps
- **3 isolated node(s):** `OPT_OUT_INSTRUMENTATION`, `npx`, `@shopify/dev-mcp`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 899 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `product-info.tsx` to `buildAlternates`, `about/page.tsx`, `product-card.tsx`, `app/layout.tsx`, `auto-play-video.tsx`, `chat-message.tsx`, `filters.tsx`, `Page`, `product-detail-section.tsx`, `cart/server.ts`, `products/[handle]/page.tsx`, `collection-page.tsx`, `react`, `customer/server.ts`, `Button`, `quick-shop.tsx`, `lib/collections/server.ts`, `product-media.tsx`, `collections/index.ts`, `address-book.tsx`, `search-modal.tsx`, `[id]/page.tsx`, `Skeleton`, `nav/index.tsx`, `icon.tsx`, `line-item.tsx`, `next`, `bottom-bar.tsx`, `gift-card-purchase-form.tsx`, `browse.tsx`, `package.json`, `ShoppingResults`, `dependencies`, `Skeleton`, `product-price.tsx`, `mega-panel.tsx`, `auth/server.ts`, `collection-page.tsx`, `products-grid.tsx`, `search/page.tsx`, `filters-client.tsx`, `input-group.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `Link()` (e.g. with `Next.js layer` and `Prefetch traffic`) actually correct?**
  _`Link()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `OPT_OUT_INSTRUMENTATION`, `npx`, `@shopify/dev-mcp` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `buildAlternates` be split into smaller, more focused modules?**
  _Cohesion score 0.1443850267379679 - nodes in this community are weakly interconnected._
- **Why does `@shopify/hydrogen` connect `logging/server.ts` to `transforms/product/index.ts`, `product/server.ts`, `app/layout.tsx`, `assertStorefrontOk`, `CommerceLocale`, `cart/server.ts`, `product-detail-section.tsx`, `customer/server.ts`, `products/[handle]/page.tsx`, `collection-page.tsx`, `quick-shop.tsx`, `lib/collections/server.ts`, `collections/index.ts`, `search-modal.tsx`, `transforms/product/types.ts`, `products/server.ts`, `lib/product/types.ts`, `config/index.ts`, `products/index.ts`, `nav/index.tsx`, `line-item.tsx`, `transforms/filters/index.ts`, `next`, `operations/policies/server.ts`, `bottom-bar.tsx`, `browse.tsx`, `package.json`, `dependencies`, `config/types.ts`, `proxy.ts`, `auth/server.ts`, `collection-page.tsx`, `filters-client.tsx`, `blogs/server.ts`, `auth/request.ts`, `storefront/server.ts`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `app/layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05868118572292801 - nodes in this community are weakly interconnected._
- **Why does `next` connect `react` to `buildAlternates`, `about/page.tsx`, `product/server.ts`, `app/layout.tsx`, `product-card.tsx`, `auto-play-video.tsx`, `CommerceLocale`, `assertStorefrontOk`, `cart/server.ts`, `Page`, `product-detail-section.tsx`, `products/[handle]/page.tsx`, `collection-page.tsx`, `collections/[handle]/page.tsx`, `Button`, `quick-shop.tsx`, `lib/collections/server.ts`, `product-media.tsx`, `[shard]/route.ts`, `address-book.tsx`, `search-modal.tsx`, `config/index.ts`, `[id]/page.tsx`, `products/index.ts`, `Skeleton`, `nav/index.tsx`, `line-item.tsx`, `next`, `operations/policies/server.ts`, `bottom-bar.tsx`, `product-info.tsx`, `browse.tsx`, `package.json`, `product-story.tsx`, `ShoppingResults`, `dependencies`, `product-price.tsx`, `mega-panel.tsx`, `config/types.ts`, `proxy.ts`, `auth/server.ts`, `bundle-components.tsx`, `search/page.tsx`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._