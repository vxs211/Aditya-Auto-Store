# Graph Report - Aditya-Auto-Store  (2026-11-18)

## Corpus Check
- 341 files · ~114,757 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 3, .woff2 3, .example 1)

## Summary
- 1961 nodes · 5743 edges · 103 communities (102 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 124 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c162a589`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filters-client.tsx
- Container
- buildAlternates
- product/server.ts
- app/layout.tsx
- [shard]/route.ts
- shopping-results.tsx
- representation/index.ts
- Teardown: paragontwowheeleraccessories.com
- @shopify/hydrogen
- Button
- buy-buttons.tsx
- customer/server.ts
- products/[handle]/page.tsx
- next
- CollectionLayout
- collections/[handle]/page.tsx
- lib/product/types.ts
- customer/server.ts
- quick-shop.tsx
- lib/collections/server.ts
- Step-by-step
- Enable Shopify Markets
- product-media.tsx
- proxy.ts
- Headless Shopify Storefront — Project Brief
- agent-panel.tsx
- blogs/server.ts
- search-modal.tsx
- transforms/product/index.ts
- transforms/product/types.ts
- products/server.ts
- 3. Build phases
- browse.tsx
- link.tsx
- [id]/page.tsx
- products/index.ts
- Skeleton
- gift-card-purchase-form.tsx
- lib/product/index.ts
- @shopify/hydrogen
- compilerOptions
- cart/server.ts
- [slug]/page.tsx
- components.json
- address-book.tsx
- cart-bridge.tsx
- auth/request.ts
- Vercel Shop
- bottom-bar.tsx
- .oxlintrc.json
- Shopify setup
- tasks
- search/page.tsx
- Enable Analytics
- product-info.tsx
- [handle]/refine/page.tsx
- config/types.ts
- shopify-client.tsx
- package.json
- Enable i18n (next-intl, no Markets)
- auth/server.ts
- operations/pages/server.ts
- mobile-menu.tsx
- Enable Shopify Menus
- storefront/server.ts
- mega-panel.tsx
- Storefront Rendering and Data Architecture
- Build with Vercel Shop
- addresses/page.tsx
- collection-browse-provider.tsx
- footer/index.tsx
- audit-storefront.mjs
- collection-page.tsx
- product-detail-section.tsx
- Vercel Shop GraphQL Integration Reference
- Cache Components compatibility — read this first
- Collection and Search Routes
- cart.tsx
- lib/customer/types.ts
- fetchSearchIndexProducts
- 11. Verification
- Commerce Flows
- input-group.tsx
- scripts
- Update Vercel Shop
- Cart and Account Route Architecture
- Cart Provider and Bootstrap Contract
- Home and Marketing Route Architecture
- Connect an existing Shopify store
- nav/index.tsx
- Vercel Shop
- Product Detail Route Architecture
- cart-page.tsx
- eve.ts
- interface
- Integrate Shopify GraphQL
- shopify-dev-mcp
- runtime
- 4. Configure routing
- 8. Propagate locale through commerce
- 10. Strategy-specific SEO and sitemap behavior
- lenis

## God Nodes (most connected - your core abstractions)
1. `Link()` - 110 edges
2. `react` - 106 edges
3. `next` - 82 edges
4. `@shopify/hydrogen` - 79 edges
5. `shopConfig` - 73 edges
6. `Button()` - 69 edges
7. `Container()` - 69 edges
8. `Page()` - 50 edges
9. `cn` - 44 edges
10. `Sections()` - 41 edges

## Surprising Connections (you probably didn't know these)
- `Phase 3 — Fitment hierarchy (the core)` --references--> `CollectionLayout()`  [INFERRED]
  research/BUILD-PROMPT.md → components/collections/collection-page.tsx
- `Phase 1 (foundation and design system) — done 2026-11-04` --references--> `Button()`  [INFERRED]
  BRIEF.md → components/ui/button.tsx
- `Prefetch traffic` --references--> `Link()`  [INFERRED]
  .agents/skills/build-shop/references/plp-search.md → components/ui/link.tsx
- `Treat navigation as part of the architecture` --references--> `Link()`  [INFERRED]
  .agents/skills/build-shop/references/rendering-architecture.md → components/ui/link.tsx
- `E. Keep the template `Link`` --references--> `Link()`  [INFERRED]
  .agents/skills/enable-i18n/SKILL.md → components/ui/link.tsx

## Import Cycles
- None detected.

## Communities (103 total, 1 thin omitted)

### Community 0 - "filters-client.tsx"
Cohesion: 0.07
Nodes (44): usePublishedFacets(), buildToggleHref(), CollectionFilterSidebar(), CollectionFilterSidebarProps, FilterBadge(), FilterBadgeProps, FilterOption(), FilterOptionProps (+36 more)

### Community 1 - "Container"
Cohesion: 0.14
Nodes (31): Spacing, SignInFailedPage(), CollectionsPage(), ContactPage(), HELP, metadata, FAQ_SCHEMA, FaqPage() (+23 more)

### Community 2 - "buildAlternates"
Cohesion: 0.15
Nodes (23): BlogArticlePage(), BlogArticlePageContent(), generateMetadata(), generateStaticParams(), BlogPage(), BlogPageContent(), generateMetadata(), generateMetadata() (+15 more)

### Community 3 - "product/server.ts"
Cohesion: 0.17
Nodes (21): AgentProductCard(), ProductCard(), ProductCardContent(), ProductCardImage(), ProductCardImageContainer(), ProductCardImageProps, ProductCardPrice(), ProductCardPriceProps (+13 more)

### Community 4 - "app/layout.tsx"
Cohesion: 0.09
Nodes (21): ensureStatic, geistSans, inter, michroma, origin, RootLayout(), viewport, ActionBar() (+13 more)

### Community 5 - "[shard]/route.ts"
Cohesion: 0.10
Nodes (33): generateStaticParams(), escapeXml(), GET(), renderShard(), renderStatic(), toAbsoluteUrl(), urlsetWrap(), xmlResponse() (+25 more)

### Community 6 - "shopping-results.tsx"
Cohesion: 0.18
Nodes (21): AgentCartSummaryProps, AgentVariantPicker(), CartConfirmation, hasCompleteVariants(), isAgentProduct(), ShoppingResults(), ShoppingResultsProps, wantsOptions() (+13 more)

### Community 7 - "representation/index.ts"
Cohesion: 0.07
Nodes (39): Step 9: Locale-aware Markdown negotiation, Markdown negotiation, GET(), GET(), GET(), GET(), generateMetadata(), generateStaticParams() (+31 more)

### Community 8 - "Teardown: paragontwowheeleraccessories.com"
Cohesion: 0.05
Nodes (38): 10. Search — a centred modal, 11. Content pages, 12. Blog, 13. Apps, integrations, and tracking, 14. Design system, 15. SEO, 16. User flows, 17. What not to copy (+30 more)

### Community 9 - "@shopify/hydrogen"
Cohesion: 0.10
Nodes (38): AgentCartSummary(), MissingData(), CartDrawerContext, CartDrawerContextValue, CartDrawerProvider(), CartProviderWrapper(), CartProviderWrapperProps, useCartDrawer() (+30 more)

### Community 10 - "Button"
Cohesion: 0.09
Nodes (43): AboutPage(), INFRASTRUCTURE, metadata, MISSION_POINTS, RANGE, RangePictures(), REASONS, STATS (+35 more)

### Community 11 - "buy-buttons.tsx"
Cohesion: 0.24
Nodes (13): Product page (Phase 4, partial), BuyButtons(), BuyButtonsProps, PurchaseOptions(), PurchaseOptionsProps, BuyWithShopLogo(), BuyButtonsFallback(), StickyBuyBar() (+5 more)

### Community 12 - "customer/server.ts"
Cohesion: 0.19
Nodes (15): ADDRESS_FRAGMENT, CUSTOMER_PROFILE_FRAGMENT, ORDER_FRAGMENT, ORDER_SUMMARY_FRAGMENT, transformCustomerAddress(), transformLineItem(), transformMoney(), transformOrder() (+7 more)

### Community 13 - "products/[handle]/page.tsx"
Cohesion: 0.17
Nodes (21): Preserve shell coherence, buildProductMetadata(), generateMetadata(), generateStaticParams(), ProductPage(), ProductPageContent(), ProductCardSkeleton(), ProductDetailSection() (+13 more)

### Community 14 - "next"
Cohesion: 0.12
Nodes (18): metadata, metadata, Section, SECTIONS, CollectionHeader(), ContactBand(), ContentCard(), FitmentLayout() (+10 more)

### Community 15 - "CollectionLayout"
Cohesion: 0.21
Nodes (11): AllProductsLayout(), generateMetadata(), generateMetadata(), GET(), CollectionLayout(), describeCollection(), SEARCH_SORT_EXCLUDE, ALL_PRODUCTS_HANDLE (+3 more)

### Community 16 - "collections/[handle]/page.tsx"
Cohesion: 0.29
Nodes (11): Next.js layer, Keep the default view static, AllProductsPage(), CollectionPage(), DefaultCollectionResults(), CollectionBrowseBoundary(), SearchParamsProbe(), SearchParamsRead() (+3 more)

### Community 17 - "lib/product/types.ts"
Cohesion: 0.23
Nodes (11): RecentlyViewedRecorder(), AgentOptionValue, FilterValue, readRecentlyViewedProducts(), recordRecentlyViewedProduct(), OptionValueState, OptionValueSwatch, ProductFormInput (+3 more)

### Community 18 - "customer/server.ts"
Cohesion: 0.12
Nodes (24): customerAccountFetch(), isCustomerAccountUnauthorized(), CustomerAccountFetchOptions, CustomerAccountVariables, logShopifyDebug(), createCustomerAddress(), CUSTOMER_ADDRESS_CREATE_MUTATION, CUSTOMER_ADDRESS_DELETE_MUTATION (+16 more)

### Community 19 - "quick-shop.tsx"
Cohesion: 0.15
Nodes (26): QuickShop(), changeOpen(), closeForCart(), resolveSelection(), retrySelection(), selectVariant(), QuickShopDetails(), QuickShopDetailsLink() (+18 more)

### Community 20 - "lib/collections/server.ts"
Cohesion: 0.12
Nodes (29): POST(), verifyWebhook(), CollectionHandleLayout(), CollectionHandleLayoutContent(), generateStaticParams(), getCollection(), getCollectionFitment(), getCollections() (+21 more)

### Community 21 - "Step-by-step"
Cohesion: 0.17
Nodes (12): Step 10: Bare `/` and unknown locales, Step 11: `generateStaticParams` on the locale layout, Step 12: Add or adapt the language selector, Step 1: Routing config, Step 2: Move routes under `app/[locale]/`, Step 3: Create `lib/params/server.ts` for Server Component root params, Step 4: `lib/i18n/request/server.ts` loads messages by resolved locale, Step 5: Extend `proxy.ts` (+4 more)

### Community 22 - "Enable Shopify Markets"
Cohesion: 0.20
Nodes (9): 1. Ask for routing and locales, 2. Make regional locales the source of truth, 5. Move page routes under `app/[locale]/`, 6. Resolve locale from the root param, 7. Extend the proxy, 9. Switch locale and carry the market to the cart, Before editing, Currency rule (+1 more)

### Community 23 - "product-media.tsx"
Cohesion: 0.11
Nodes (29): Lightbox(), LightboxContext, LightboxTrigger(), Carousel(), ColorImageCarouselItems(), ColorImageGrid(), Grid(), GridItem() (+21 more)

### Community 24 - "proxy.ts"
Cohesion: 0.20
Nodes (13): createCustomerSessionManager(), forwardCustomerRefreshAttempt(), getCustomerRequestOrigin(), createCustomerCartHandlers(), isRefinedCollectionPath(), predictiveSearchHandlers, PRODUCT_FRAGMENT, QUERY_FRAGMENT (+5 more)

### Community 25 - "Headless Shopify Storefront — Project Brief"
Cohesion: 0.08
Nodes (24): 1. Open questions (need answers before build), 2. Goals, 3. Non-goals (v1), 4. Architecture, 5. The content-editing tradeoff — read this, 6. Scope — full store, v1, 7. Phases, 8. Risks (+16 more)

### Community 26 - "agent-panel.tsx"
Cohesion: 0.22
Nodes (17): AgentButton(), AgentPanel(), AgentPanelProps, prepareAgentSession(), AgentPanel, CartOverlay(), FilterSheet(), Sheet() (+9 more)

### Community 27 - "blogs/server.ts"
Cohesion: 0.17
Nodes (16): ArticleCardProps, ArticlePageProps, BlogIndexProps, Blog, BlogArticle, SearchParamsInput, SEO, ARTICLE_SUMMARY_FRAGMENT (+8 more)

### Community 28 - "search-modal.tsx"
Cohesion: 0.15
Nodes (17): LoadingSkeleton(), ProductResult(), SearchDialogContent(), handleKeyDown(), navigateToActiveItem(), SearchTrigger(), SuggestionChip(), DialogTrigger() (+9 more)

### Community 29 - "transforms/product/index.ts"
Cohesion: 0.16
Nodes (21): Category, OptionValue, ProductOption, fetchProduct(), extractMediaFromProduct(), hasUniformPriceRange(), transformBundleComponent(), transformCategory() (+13 more)

### Community 30 - "transforms/product/types.ts"
Cohesion: 0.15
Nodes (18): BUNDLE_COMPONENT_VARIANT_FRAGMENT, BUNDLE_RELATIONSHIPS_FRAGMENT, FILTERABLE_PRODUCT_CARD_FRAGMENT, PRODUCT_CARD_FRAGMENT, PRODUCT_FRAGMENT, PRODUCT_WITH_VARIANTS_FRAGMENT, TAXONOMY_CATEGORY_FRAGMENT, PRODUCT_VARIANT_FRAGMENT (+10 more)

### Community 31 - "products/server.ts"
Cohesion: 0.10
Nodes (25): ProductVariant, decodeShopifyId(), COLLECTION_PRODUCTS_QUERY, fetchProductsByIds(), GET_PRODUCT_BY_HANDLE_QUERY, GET_PRODUCT_BY_HANDLE_WITH_BUNDLES_QUERY, GET_PRODUCT_VARIANT_BY_SELECTED_OPTIONS_QUERY, GET_PRODUCT_VARIANT_QUERY (+17 more)

### Community 32 - "3. Build phases"
Cohesion: 0.09
Nodes (22): 0.1 Brand system (binding), 0.2 Decision: retail store, single pieces or bulk, 0. Business details, 1. What makes this store work, 2.1 Brand → model hierarchy, 2.2 Editable marketing content — metaobjects, 2. Data model in Shopify, 3. Build phases (+14 more)

### Community 33 - "browse.tsx"
Cohesion: 0.11
Nodes (30): One browse store for collections and search, Browse(), BrowseResultsFallback(), BrowseResultsGrid(), BrowseResultsGridProps, CollectionResults(), CollectionResultsProps, StreamedResultsGrid() (+22 more)

### Community 34 - "link.tsx"
Cohesion: 0.10
Nodes (26): AccountError(), RootError(), NotFoundError(), PopularBrands(), ShopifyNotFoundRedirect(), AccountTab, MobileTabsClient(), AnnouncementBar() (+18 more)

### Community 35 - "[id]/page.tsx"
Cohesion: 0.24
Nodes (17): OrderDetailContent(), OrderDetailPage(), OrderDetailSkeleton(), OrderLineItemRow(), SummaryRow(), OrdersContent(), OrdersPage(), OrdersSkeleton() (+9 more)

### Community 36 - "products/index.ts"
Cohesion: 0.05
Nodes (55): cartHandlers, getCart(), getSessionCartId(), mutateCart(), formatCatalogMoney(), matchingProducts(), productHandleSchema, productOptionsSchema (+47 more)

### Community 37 - "Skeleton"
Cohesion: 0.22
Nodes (10): AccountGate(), AccountLabelSkeleton(), AccountLayout(), SidebarSkeleton(), ACCOUNT_LINKS, AccountMobileTabs(), AccountSidebar(), AccountSidebarLink (+2 more)

### Community 38 - "gift-card-purchase-form.tsx"
Cohesion: 0.25
Nodes (11): ProfileForm(), ProfileFormLabels, GiftCardPurchaseForm(), GiftCardPurchaseFormFallback(), TrackOrderForm(), Input(), Label(), Switch() (+3 more)

### Community 39 - "lib/product/index.ts"
Cohesion: 0.23
Nodes (13): ProductMediaArea(), ResolvedColorImageCarousel(), ResolvedColorImageGrid(), QUICK_SHOP_INPUT, findColorOption(), getSelectedColorImage(), getSharedImages(), hasColorImagePartitioning() (+5 more)

### Community 40 - "@shopify/hydrogen"
Cohesion: 0.21
Nodes (8): register(), CART_FRAGMENT, configureShopifyLogging(), CONSOLE_METHODS, DEBUG_SHOPIFY, shopifyLogger, WritableLogLevel, @shopify/hydrogen

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 42 - "cart/server.ts"
Cohesion: 0.28
Nodes (12): POST(), createCustomerRequestContext(), cartHandlers, createEmptyCart(), getCartById(), getCartData(), getCartIdFromCookie(), getHandlerContext() (+4 more)

### Community 43 - "[slug]/page.tsx"
Cohesion: 0.27
Nodes (13): metadata, Posts(), GuideContent(), GuidePage(), BlogThumb(), formatPostDate(), InlineText(), BlogSection() (+5 more)

### Community 44 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 45 - "address-book.tsx"
Cohesion: 0.14
Nodes (29): AddressBook(), AddressForm(), DeleteDialog(), FormState, REQUIRED_FIELDS, TEXT_FIELDS, toFormValues(), Dialog() (+21 more)

### Community 46 - "cart-bridge.tsx"
Cohesion: 0.15
Nodes (20): AgentCartBridge(), CartRefresh, ChatMessage(), linkSafety, Markdown, AgentThinking(), Bubble(), BubbleContent() (+12 more)

### Community 47 - "auth/request.ts"
Cohesion: 0.26
Nodes (9): createSessionManager(), decryptSession(), encryptSession(), getSessionKey(), parseCookies(), readSession(), REFRESH_ATTEMPT_HEADER, REFRESH_ATTEMPT_PARAM (+1 more)

### Community 48 - "Vercel Shop"
Cohesion: 0.12
Nodes (16): Cart, Code Style, Comments, Customer accounts, Describe the product, not the change, Environment files, Files, GraphQL (+8 more)

### Community 49 - "bottom-bar.tsx"
Cohesion: 0.20
Nodes (13): BarLink(), ICONS, BarMotion(), onClick(), place(), BarRise(), ENTRANCE, SLIDE (+5 more)

### Community 50 - ".oxlintrc.json"
Cohesion: 0.12
Nodes (16): categories, correctness, suspicious, Image, Link, ignorePatterns, components, plugins (+8 more)

### Community 51 - "Shopify setup"
Cohesion: 0.12
Nodes (16): Connection log — 2026-11-04, Getting the Storefront token, Known cosmetic issues, both from unset config, Live — 2026-11-04, Manual fallback, Next, Remaining manual step, Route A — preview store (unblocks development today) (+8 more)

### Community 52 - "tasks"
Cohesion: 0.12
Nodes (16): outputs, cache, persistent, cache, globalDependencies, globalEnv, $schema, cache (+8 more)

### Community 53 - "search/page.tsx"
Cohesion: 0.38
Nodes (9): generateMetadata(), getParam(), SearchAnalyticsTracker(), SearchBrowse(), SearchPage(), SearchParams, SearchQueryLabel(), SearchResultCount() (+1 more)

### Community 54 - "Enable Analytics"
Cohesion: 0.12
Nodes (15): 1. Do you need to add or change Vercel Analytics and/or Vercel Speed Insights?, 2. Do you want Google Tag Manager?, A1. Install dependencies, B1. Install dependency, B2. Add environment variable, B3. Add GTM to `components/analytics/index.tsx`, Before you start, C1. Update `components/analytics/index.tsx` (+7 more)

### Community 55 - "product-info.tsx"
Cohesion: 0.23
Nodes (11): ColorPicker(), ColorPickerProps, OptionPicker(), OptionPickerProps, ProductInfoDescriptionProps, ProductInfoOptions(), ProductInfoOptionsProps, Swatch() (+3 more)

### Community 56 - "[handle]/refine/page.tsx"
Cohesion: 0.29
Nodes (9): generateMetadata(), generateMetadata(), RefinedCollectionPage(), RefinedCollectionResults(), browseMetadata(), fetchCollectionResults(), getCollectionMetadata(), readBrowseState() (+1 more)

### Community 57 - "config/types.ts"
Cohesion: 0.26
Nodes (10): Shop Agent boundaries, 3. Install next-intl and migrate copy, assertRequiredEnv(), resolveConfig(), withShopConfig(), NextConfigContext, NextConfigFactory, NextConfigInput (+2 more)

### Community 58 - "shopify-client.tsx"
Cohesion: 0.23
Nodes (11): AnalyticsComponents(), AnalyticsReady(), CartAnalyticsTracker(), ShopifyScriptsTracker(), ShopifyScriptsTrackerProps, subscribeNoop(), PageViewedTracker(), @vercel/analytics@2.0.1 (+3 more)

### Community 59 - "package.json"
Cohesion: 0.05
Nodes (52): dependencies, ai@7.0.157, babel-plugin-react-compiler@1.0.0, class-variance-authority@0.7.1, cn@0.5.1, eve@0.87.0, @gsap/react@^2.1.2, lucide-react@1.65.0 (+44 more)

### Community 60 - "Enable i18n (next-intl, no Markets)"
Cohesion: 0.29
Nodes (6): Create the locale source of truth, Enable i18n (next-intl, no Markets), Inspect and preserve the installation, Introduce next-intl and migrate copy, Verifying, What this skill turns on

### Community 61 - "auth/server.ts"
Cohesion: 0.35
Nodes (12): Boundary rules, AccountLabel(), getHydrogenCustomerSession(), getCustomerAccessToken, getReadonlyCustomerSessionManager, getReadonlyRequestContext, getRequestedPath(), isCustomerLoggedIn (+4 more)

### Community 62 - "operations/pages/server.ts"
Cohesion: 0.18
Nodes (12): Keep the Shopify boundary explicit, CommerceLocale, ContentPage, EMBED_DOMAINS, sanitizeShopifyHtml(), SHOPIFY_HTML_OPTIONS, fetchLocalizationCurrency(), GET_LOCALIZATION_CURRENCY_QUERY (+4 more)

### Community 63 - "mobile-menu.tsx"
Cohesion: 0.31
Nodes (12): MobileMenu(), MobileMenuList(), NestedItems(), FIXED_PANELS, ProductAccordions(), Accordion(), AccordionContent(), AccordionItem() (+4 more)

### Community 64 - "Enable Shopify Menus"
Cohesion: 0.17
Nodes (12): 1. Add the menu operation, 1. Which menus do you want to fetch from Shopify?, 2. Cache the menu, 2. What are the Shopify menu handles?, 3. Refresh menus after edits, 4. Wire the nav menu, 5. Wire the footer menu, Before you start (+4 more)

### Community 65 - "storefront/server.ts"
Cohesion: 0.43
Nodes (6): createRequestStorefrontClient(), customFetchApi(), getClient(), operationName(), SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_DOMAIN

### Community 66 - "mega-panel.tsx"
Cohesion: 0.31
Nodes (8): MegaCard, MegaDetail, MegaPanel(), MenuLink(), MenuLinkProps, MegaMenu, NavItem(), MenuItem

### Community 67 - "Storefront Rendering and Data Architecture"
Cohesion: 0.17
Nodes (11): Architect media and third parties, Choose cache ownership deliberately, Define client and mutation boundaries, Design the dependency graph, Keep responsibilities in layers, Pass request-time work down to a resolved leaf, Reference implementation, Shape the shell and streaming boundaries (+3 more)

### Community 68 - "Build with Vercel Shop"
Cohesion: 0.17
Nodes (11): Build with Vercel Shop, Copy and deployment defaults, Ground the work in source, Hydrogen ownership, Model the route, Organize code by domain and execution context, Prevent blocking, Route the work (+3 more)

### Community 69 - "addresses/page.tsx"
Cohesion: 0.28
Nodes (10): AddressesContent(), AddressesPage(), AddressesSkeleton(), ProfileContent(), ProfilePage(), ProfileSkeleton(), AccountPageHeader(), fetchCustomerAddresses() (+2 more)

### Community 70 - "collection-browse-provider.tsx"
Cohesion: 0.14
Nodes (18): BrowseProps, BrowsePublication, BrowsePublicationContext, BrowsePublicationStore, BrowsePublisherProps, BrowseStore(), BrowseStoreProps, CollectionBrowseFrame() (+10 more)

### Community 71 - "footer/index.tsx"
Cohesion: 0.22
Nodes (10): Footer(), FooterLink, FooterList(), QUICK_LINKS, TRUST, PLATFORM_LABELS, SocialIcon(), SocialLink (+2 more)

### Community 72 - "audit-storefront.mjs"
Cohesion: 0.18
Nodes (6): files, findings, root, sharedLinkFiles, sourceRoots, walk()

### Community 73 - "collection-page.tsx"
Cohesion: 0.14
Nodes (23): CollectionActiveFilterCountBadge(), CollectionCardProps, CollectionBrowseBoundaryProps, CollectionLayoutProps, FitmentLayoutProps, CollectionsSortSelect(), SORT_LABELS, BrowseFallback() (+15 more)

### Community 74 - "product-detail-section.tsx"
Cohesion: 0.15
Nodes (22): QuickShopLayout(), BundleComponents(), BundleComponentsProps, BundleListItem, BundleParents(), BundleParentsProps, BundleProductList(), BundleProductListProps (+14 more)

### Community 75 - "Vercel Shop GraphQL Integration Reference"
Cohesion: 0.18
Nodes (10): Choose cache behavior from the consumer, Completion checklist, Data flow, Deployment context versus copy locale, Documents, Invalidation, Key Vercel Shop files, Operation integration (+2 more)

### Community 76 - "Cache Components compatibility — read this first"
Cohesion: 0.29
Nodes (7): A. There must be no `app/layout.tsx` above `app/[locale]/`, B. Carry `ensureStatic` and give `locale` static params, C. Keep request reads behind Suspense, Cache Components compatibility — read this first, D. `setRequestLocale` is not used, E. Keep the template `Link`, F. Keep server redirects outside client navigation

### Community 77 - "Collection and Search Routes"
Cohesion: 0.33
Nodes (5): Collection and Search Routes, Images and pagination, Prefetch traffic, Reference implementation, Results and controls

### Community 78 - "cart.tsx"
Cohesion: 0.36
Nodes (7): CartIcon(), prepareCheckoutAction(), handleCheckout(), getCart(), isTransientError(), TRANSIENT_ERROR_CODES, withFallback()

### Community 79 - "lib/customer/types.ts"
Cohesion: 0.22
Nodes (11): ProductOpenGraph(), ProductOpenGraphProps, AccountActionResult, CustomerAddress, CustomerAddressInput, CustomerOrder, CustomerOrdersPage, CustomerOrderSummary (+3 more)

### Community 80 - "fetchSearchIndexProducts"
Cohesion: 0.30
Nodes (10): RefinedAllProductsPage(), RefinedAllProductsResults(), fetchSearchResults(), buildSearchQuery(), fetchCollectionProducts(), fetchSearchFacets(), fetchSearchIndexProducts(), toStorefrontFilters() (+2 more)

### Community 81 - "11. Verification"
Cohesion: 0.40
Nodes (5): 11. Verification, All strategies, Invisible cookie, Locale sub-path, Per-domain

### Community 82 - "Commerce Flows"
Cohesion: 0.22
Nodes (8): Cart and checkout handoff, Commerce Flows, Content lifecycle, Customer account, Discovery, Product selection, Reference implementation, Required end-to-end checks

### Community 83 - "input-group.tsx"
Cohesion: 0.42
Nodes (7): AgentComposer(), AgentComposerProps, AgentStatus, InputGroup(), InputGroupButton(), inputGroupButtonVariants, InputGroupTextarea()

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

### Community 90 - "nav/index.tsx"
Cohesion: 0.50
Nodes (6): Navigation, NavAccount(), NavAccountFallback(), CartIconFallback(), Nav(), modelDisplayName()

### Community 91 - "Vercel Shop"
Cohesion: 0.29
Nodes (6): Documentation, Features, Getting Started, License, Skills, Vercel Shop

### Community 92 - "Product Detail Route Architecture"
Cohesion: 0.33
Nodes (5): Primary media, Product Detail Route Architecture, Recommendations and secondary content, Reference implementation, Variant interaction

### Community 93 - "cart-page.tsx"
Cohesion: 0.20
Nodes (12): CartPage(), CartViewedTracker(), CollectionViewedTracker(), isAnalyticsCart(), ProductViewedTracker(), SearchViewedTracker(), CartPageContent(), CartPageLayoutProps (+4 more)

### Community 94 - "eve.ts"
Cohesion: 0.38
Nodes (5): anonymous, browserAuth(), isAgentInfoRequest(), botid@1.5.12, botid

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

### Community 99 - "4. Configure routing"
Cohesion: 0.50
Nodes (4): 4. Configure routing, Invisible cookie routing, Locale sub-path, Per-domain routing

### Community 100 - "8. Propagate locale through commerce"
Cohesion: 0.50
Nodes (4): 8. Propagate locale through commerce, Chat and agent API, Customer Account auth, Menus

### Community 101 - "10. Strategy-specific SEO and sitemap behavior"
Cohesion: 0.67
Nodes (3): 10. Strategy-specific SEO and sitemap behavior, Invisible cookie, Locale sub-path or per-domain

## Knowledge Gaps
- **3 isolated node(s):** `npx`, `@shopify/dev-mcp`, `OPT_OUT_INSTRUMENTATION`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 560 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@shopify/hydrogen` connect `@shopify/hydrogen` to `filters-client.tsx`, `[shard]/route.ts`, `representation/index.ts`, `@shopify/hydrogen`, `buy-buttons.tsx`, `customer/server.ts`, `products/[handle]/page.tsx`, `lib/product/types.ts`, `customer/server.ts`, `quick-shop.tsx`, `lib/collections/server.ts`, `proxy.ts`, `blogs/server.ts`, `search-modal.tsx`, `transforms/product/index.ts`, `transforms/product/types.ts`, `products/server.ts`, `browse.tsx`, `link.tsx`, `products/index.ts`, `lib/product/index.ts`, `cart/server.ts`, `auth/request.ts`, `bottom-bar.tsx`, `config/types.ts`, `shopify-client.tsx`, `package.json`, `auth/server.ts`, `operations/pages/server.ts`, `storefront/server.ts`, `collection-browse-provider.tsx`, `collection-page.tsx`, `cart.tsx`, `lib/customer/types.ts`, `nav/index.tsx`, `cart-page.tsx`, `eve.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `Link()` (e.g. with `Next.js layer` and `Prefetch traffic`) actually correct?**
  _`Link()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `npx`, `@shopify/dev-mcp`, `OPT_OUT_INSTRUMENTATION` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filters-client.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07215686274509804 - nodes in this community are weakly interconnected._
- **Why does `react` connect `product/server.ts` to `filters-client.tsx`, `Container`, `buildAlternates`, `app/layout.tsx`, `shopping-results.tsx`, `representation/index.ts`, `@shopify/hydrogen`, `Button`, `buy-buttons.tsx`, `products/[handle]/page.tsx`, `next`, `lib/product/types.ts`, `customer/server.ts`, `quick-shop.tsx`, `lib/collections/server.ts`, `product-media.tsx`, `agent-panel.tsx`, `search-modal.tsx`, `browse.tsx`, `link.tsx`, `[id]/page.tsx`, `Skeleton`, `gift-card-purchase-form.tsx`, `cart/server.ts`, `[slug]/page.tsx`, `address-book.tsx`, `cart-bridge.tsx`, `bottom-bar.tsx`, `search/page.tsx`, `product-info.tsx`, `shopify-client.tsx`, `package.json`, `auth/server.ts`, `mobile-menu.tsx`, `mega-panel.tsx`, `addresses/page.tsx`, `collection-browse-provider.tsx`, `footer/index.tsx`, `collection-page.tsx`, `product-detail-section.tsx`, `input-group.tsx`, `nav/index.tsx`, `cart-page.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `Container` be split into smaller, more focused modules?**
  _Cohesion score 0.1402439024390244 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `Container`, `buildAlternates`, `product/server.ts`, `app/layout.tsx`, `[shard]/route.ts`, `shopping-results.tsx`, `representation/index.ts`, `@shopify/hydrogen`, `Button`, `buy-buttons.tsx`, `products/[handle]/page.tsx`, `collections/[handle]/page.tsx`, `quick-shop.tsx`, `lib/collections/server.ts`, `product-media.tsx`, `proxy.ts`, `agent-panel.tsx`, `blogs/server.ts`, `search-modal.tsx`, `link.tsx`, `[id]/page.tsx`, `products/index.ts`, `Skeleton`, `cart/server.ts`, `[slug]/page.tsx`, `address-book.tsx`, `bottom-bar.tsx`, `search/page.tsx`, `product-info.tsx`, `[handle]/refine/page.tsx`, `config/types.ts`, `shopify-client.tsx`, `package.json`, `auth/server.ts`, `operations/pages/server.ts`, `mega-panel.tsx`, `collection-browse-provider.tsx`, `footer/index.tsx`, `product-detail-section.tsx`, `fetchSearchIndexProducts`, `nav/index.tsx`, `cart-page.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._