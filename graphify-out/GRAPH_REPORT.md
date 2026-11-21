# Graph Report - Aditya-Auto-Store  (2026-11-20)

## Corpus Check
- 344 files · ~115,870 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 3, .woff2 3, .toml 1)

## Summary
- 1985 nodes · 5763 edges · 123 communities (106 shown, 17 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 126 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `97b84351`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filters-client.tsx
- Container
- buildAlternates
- product/server.ts
- app/layout.tsx
- assertStorefrontOk
- shopping-results.tsx
- operations/policies/server.ts
- Teardown: paragontwowheeleraccessories.com
- lucide-react
- Link
- product-detail-section.tsx
- customer/server.ts
- lib/product/index.ts
- collection-page.tsx
- lib/collections/server.ts
- collections/[handle]/page.tsx
- app/page.tsx
- logging/server.ts
- quick-shop.tsx
- operations/collections/server.ts
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
- lib/product/types.ts
- config/index.ts
- [id]/page.tsx
- products/index.ts
- Skeleton
- gift-card-purchase-form.tsx
- markdown/product/index.ts
- overlay.tsx
- compilerOptions
- cart/server.ts
- next
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
- line-item.tsx
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
- build-csv.mjs
- collection-page.tsx
- bundle-components.tsx
- Vercel Shop GraphQL Integration Reference
- Cache Components compatibility — read this first
- One browse store for collections and search
- dependencies
- customer/action.ts
- @shopify/hydrogen
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
- product/server.ts
- cart-page.tsx
- eve.ts
- interface
- Integrate Shopify GraphQL
- shopify-dev-mcp
- runtime
- 4. Configure routing
- 8. Propagate locale through commerce
- 10. Strategy-specific SEO and sitemap behavior
- representation/index.ts
- products/[handle]/route.ts
- lenis
- [shard]/route.ts
- session/route.ts
- ai@7.0.157
- babel-plugin-react-compiler@1.0.0
- gsap
- @gsap/react
- oxfmt@0.75.0
- oxlint@1.90.0
- react-dom
- sanitize-html
- tailwindcss@4.3.3
- @tailwindcss/turbopack@4.3.3
- @tailwindcss/typography@0.5.20
- turbo@2.11.10
- tw-animate-css@1.4.0
- @types/react-dom@19.3.0
- typescript@7.0.2
- @vercel/speed-insights

## God Nodes (most connected - your core abstractions)
1. `Link()` - 112 edges
2. `react` - 108 edges
3. `next` - 85 edges
4. `@shopify/hydrogen` - 79 edges
5. `shopConfig` - 72 edges
6. `Button()` - 69 edges
7. `Container()` - 66 edges
8. `Page()` - 50 edges
9. `cn` - 44 edges
10. `lucide-react` - 43 edges

## Surprising Connections (you probably didn't know these)
- `Look round one` --references--> `Eyebrow()`  [INFERRED]
  BRIEF.md → components/home/sections.tsx
- `Phase 1 (foundation and design system) — done 2026-11-04` --references--> `Button()`  [INFERRED]
  BRIEF.md → components/ui/button.tsx
- `Home page (Phase 6, partial)` --references--> `getFitmentBrands()`  [INFERRED]
  BRIEF.md → lib/collections/server.ts
- `Documents` --references--> `CommerceLocale`  [INFERRED]
  .agents/skills/shopify-graphql-reference/references/REFERENCE.md → lib/config/types.ts
- `2.1 Brand → model hierarchy` --references--> `Collection`  [INFERRED]
  research/BUILD-PROMPT.md → lib/collections/types.ts

## Import Cycles
- None detected.

## Communities (123 total, 17 thin omitted)

### Community 0 - "filters-client.tsx"
Cohesion: 0.08
Nodes (37): BrowsePublication, BrowsePublisherProps, usePublishedFacets(), buildToggleHref(), CollectionFilterSidebar(), CollectionFilterSidebarProps, FilterBadge(), FilterBadgeProps (+29 more)

### Community 1 - "Container"
Cohesion: 0.19
Nodes (18): metadata, SignInFailedPage(), NotFoundError(), PopularBrands(), ShopifyNotFoundRedirect(), ShopifyPage(), ShopifyPageContent(), ArticlePage() (+10 more)

### Community 2 - "buildAlternates"
Cohesion: 0.10
Nodes (32): BlogArticlePage(), BlogArticlePageContent(), generateMetadata(), BlogPage(), BlogPageContent(), generateMetadata(), CollectionsPage(), generateMetadata() (+24 more)

### Community 3 - "product/server.ts"
Cohesion: 0.11
Nodes (33): AgentProductCard(), MissingData(), ProductCard(), ProductCardContent(), ProductCardImage(), ProductCardImageContainer(), ProductCardImageProps, ProductCardPrice() (+25 more)

### Community 4 - "app/layout.tsx"
Cohesion: 0.12
Nodes (18): ensureStatic, inter, RootLayout(), serif, viewport, ActionBar(), ActionBarProps, AnnouncementBar() (+10 more)

### Community 5 - "assertStorefrontOk"
Cohesion: 0.14
Nodes (22): generateStaticParams(), generateStaticParams(), generateStaticParams(), getArticleSitemapPage(), getShopifySitemapPage(), sitemapCacheTags(), tagSitemapResources(), assertStorefrontOk() (+14 more)

### Community 6 - "shopping-results.tsx"
Cohesion: 0.13
Nodes (31): AgentCartSummaryProps, AgentProductCardProps, AgentVariantPicker(), AgentVariantPickerProps, CartConfirmation, hasCompleteVariants(), isAgentProduct(), ShoppingResults() (+23 more)

### Community 7 - "operations/policies/server.ts"
Cohesion: 0.21
Nodes (12): generateMetadata(), generateStaticParams(), PolicyPage(), PolicyPageContent(), getShopPolicies(), getShopPolicy(), ShopPolicy, SHOP_POLICY_FRAGMENT (+4 more)

### Community 8 - "Teardown: paragontwowheeleraccessories.com"
Cohesion: 0.05
Nodes (38): 10. Search — a centred modal, 11. Content pages, 12. Blog, 13. Apps, integrations, and tracking, 14. Design system, 15. SEO, 16. User flows, 17. What not to copy (+30 more)

### Community 9 - "lucide-react"
Cohesion: 0.14
Nodes (19): AgentCartSummary(), CartUI(), DiscountForm(), DiscountFormProps, CartNotifications(), CartCheckout(), CartCheckoutProps, CartSummary() (+11 more)

### Community 10 - "Link"
Cohesion: 0.07
Nodes (57): Spacing, AboutPage(), INFRASTRUCTURE, metadata, MISSION_POINTS, RANGE, RangePictures(), REASONS (+49 more)

### Community 11 - "product-detail-section.tsx"
Cohesion: 0.13
Nodes (32): Product page (Phase 4, partial), BuyButtons(), BuyButtonsProps, PurchaseOptions(), PurchaseOptionsProps, BuyWithShopLogo(), ProductOpenGraph(), BuyButtonsFallback() (+24 more)

### Community 12 - "customer/server.ts"
Cohesion: 0.11
Nodes (29): CustomerOrder, CustomerOrderSummary, CustomerProfile, OrderLineItem, ADDRESS_FRAGMENT, CUSTOMER_PROFILE_FRAGMENT, ORDER_FRAGMENT, ORDER_SUMMARY_FRAGMENT (+21 more)

### Community 13 - "lib/product/index.ts"
Cohesion: 0.22
Nodes (15): buildProductMetadata(), generateMetadata(), ProductPage(), ProductPageContent(), ProductDetailSkeleton(), QUICK_SHOP_INPUT, defaultSelectedOptions(), parseSelectedOptions() (+7 more)

### Community 14 - "collection-page.tsx"
Cohesion: 0.14
Nodes (24): Next.js layer, CollectionHandleLayout(), CollectionHandleLayoutContent(), generateStaticParams(), CollectionBrowseBoundaryProps, CollectionDetailSkeleton(), CollectionHeader(), CollectionLayout() (+16 more)

### Community 15 - "lib/collections/server.ts"
Cohesion: 0.23
Nodes (12): AllProductsLayout(), generateMetadata(), generateMetadata(), GET(), ALL_PRODUCTS_HANDLE, getAllProductsCollection(), getCollection(), getCollectionMetadata() (+4 more)

### Community 16 - "collections/[handle]/page.tsx"
Cohesion: 0.17
Nodes (22): Keep the default view static, AllProductsPage(), generateMetadata(), generateMetadata(), RefinedAllProductsPage(), RefinedAllProductsResults(), CollectionPage(), DefaultCollectionResults() (+14 more)

### Community 17 - "app/page.tsx"
Cohesion: 0.17
Nodes (19): HomePage(), metadata, GoogleG(), GoogleReviews(), Stars(), ReviewCarousel(), BestSellers(), collectionImage() (+11 more)

### Community 18 - "logging/server.ts"
Cohesion: 0.14
Nodes (13): register(), customerAccountFetch(), isCustomerAccountUnauthorized(), CustomerAccountFetchOptions, CustomerAccountVariables, configureShopifyLogging(), CONSOLE_METHODS, DEBUG_SHOPIFY (+5 more)

### Community 19 - "quick-shop.tsx"
Cohesion: 0.11
Nodes (31): Motion (GSAP), QuickShop(), changeOpen(), closeForCart(), load(), resolveSelection(), retrySelection(), selectVariant() (+23 more)

### Community 20 - "operations/collections/server.ts"
Cohesion: 0.14
Nodes (17): Phase 3 build log: fitment hierarchy, COLLECTION_FIELDS_FRAGMENT, fetchCollectionFitment(), fetchCollections(), fetchFitmentBrands(), fetchFitmentBrandsPage(), fetchProductCountPage(), GET_COLLECTION_FITMENT_QUERY (+9 more)

### Community 21 - "Step-by-step"
Cohesion: 0.17
Nodes (12): Step 10: Bare `/` and unknown locales, Step 11: `generateStaticParams` on the locale layout, Step 12: Add or adapt the language selector, Step 1: Routing config, Step 2: Move routes under `app/[locale]/`, Step 3: Create `lib/params/server.ts` for Server Component root params, Step 4: `lib/i18n/request/server.ts` loads messages by resolved locale, Step 5: Extend `proxy.ts` (+4 more)

### Community 22 - "Enable Shopify Markets"
Cohesion: 0.20
Nodes (9): 1. Ask for routing and locales, 2. Make regional locales the source of truth, 5. Move page routes under `app/[locale]/`, 6. Resolve locale from the root param, 7. Extend the proxy, 9. Switch locale and carry the market to the cart, Before editing, Currency rule (+1 more)

### Community 23 - "product-media.tsx"
Cohesion: 0.12
Nodes (26): Lightbox(), LightboxContext, LightboxTrigger(), Carousel(), ColorImageCarouselItems(), ColorImageGrid(), Grid(), GridItem() (+18 more)

### Community 24 - "proxy.ts"
Cohesion: 0.21
Nodes (12): createCustomerSessionManager(), forwardCustomerRefreshAttempt(), getCustomerRequestOrigin(), isRefinedCollectionPath(), predictiveSearchHandlers, PRODUCT_FRAGMENT, QUERY_FRAGMENT, SHOPIFY_ROUTE_TEMPLATES (+4 more)

### Community 25 - "Headless Shopify Storefront — Project Brief"
Cohesion: 0.09
Nodes (21): 1. Open questions (need answers before build), 2. Goals, 3. Non-goals (v1), 4. Architecture, 5. The content-editing tradeoff — read this, 6. Scope — full store, v1, 7. Phases, 8. Risks (+13 more)

### Community 26 - "agent-panel.tsx"
Cohesion: 0.33
Nodes (8): AgentButton(), AgentPanel(), AgentPanelProps, prepareAgentSession(), AgentPanel, readStoredChat(), StoredChat, writeStoredChat()

### Community 27 - "blogs/server.ts"
Cohesion: 0.30
Nodes (8): ARTICLE_SUMMARY_FRAGMENT, BLOG_FRAGMENT, fetchBlogArticle(), GET_BLOG_ARTICLE_QUERY, GET_BLOG_QUERY, transformArticle(), ShopifyArticle, ShopifyBlog

### Community 28 - "search-modal.tsx"
Cohesion: 0.14
Nodes (17): LoadingSkeleton(), ProductResult(), SearchDialogContent(), handleKeyDown(), navigateToActiveItem(), SearchModal(), SearchTrigger(), SuggestionChip() (+9 more)

### Community 29 - "transforms/product/index.ts"
Cohesion: 0.27
Nodes (15): BundleComponentsProps, ProductVariantComponent, extractMediaFromProduct(), hasUniformPriceRange(), transformBundleComponent(), transformCategory(), transformFilteredShopifyProductCard(), transformImage() (+7 more)

### Community 30 - "transforms/product/types.ts"
Cohesion: 0.11
Nodes (24): BUNDLE_COMPONENT_VARIANT_FRAGMENT, BUNDLE_RELATIONSHIPS_FRAGMENT, FILTERABLE_PRODUCT_CARD_FRAGMENT, PRODUCT_CARD_FRAGMENT, PRODUCT_FRAGMENT, PRODUCT_WITH_VARIANTS_FRAGMENT, TAXONOMY_CATEGORY_FRAGMENT, PRODUCT_VARIANT_FRAGMENT (+16 more)

### Community 31 - "products/server.ts"
Cohesion: 0.09
Nodes (30): ProductVariant, fetchSearchResults(), decodeShopifyId(), buildSearchQuery(), COLLECTION_PRODUCTS_QUERY, fetchProductsByIds(), fetchProductWithVariants(), fetchSearchFacets() (+22 more)

### Community 32 - "3. Build phases"
Cohesion: 0.09
Nodes (22): 0.1 Brand system (binding), 0.2 Decision: retail store, single pieces or bulk, 0. Business details, 1. What makes this store work, 2.1 Brand → model hierarchy, 2.2 Editable marketing content — metaobjects, 2. Data model in Shopify, 3. Build phases (+14 more)

### Community 33 - "lib/product/types.ts"
Cohesion: 0.17
Nodes (17): InfiniteProductGridProps, ProductCardProps, EMPTY_PAGE, LOAD_MORE_INPUT, BrowseSource, Video, PageInfo, Category (+9 more)

### Community 34 - "config/index.ts"
Cohesion: 0.14
Nodes (9): agentProfile, agentProfileUrl(), DESTINATIONS, SearchState, searchStateSchema, shopConfig, currencyDigits(), fromMinorUnits() (+1 more)

### Community 35 - "[id]/page.tsx"
Cohesion: 0.23
Nodes (18): OrderDetailContent(), OrderDetailPage(), OrderDetailSkeleton(), OrderLineItemRow(), SummaryRow(), OrdersContent(), OrdersPage(), OrdersSkeleton() (+10 more)

### Community 36 - "products/index.ts"
Cohesion: 0.07
Nodes (41): cartHandlers, getCart(), getSessionCartId(), mutateCart(), formatCatalogMoney(), matchingProducts(), productHandleSchema, productOptionsSchema (+33 more)

### Community 37 - "Skeleton"
Cohesion: 0.17
Nodes (13): AccountGate(), AccountLabelSkeleton(), AccountLayout(), SidebarSkeleton(), ACCOUNT_LINKS, AccountMobileTabs(), AccountTab, MobileTabsClient() (+5 more)

### Community 38 - "gift-card-purchase-form.tsx"
Cohesion: 0.17
Nodes (18): ProfileForm(), ProfileFormLabels, CartDrawerContext, CartDrawerContextValue, CartDrawerProvider(), CartProviderWrapper(), CartProviderWrapperProps, useCartDrawer() (+10 more)

### Community 39 - "markdown/product/index.ts"
Cohesion: 0.25
Nodes (12): GET(), GET(), describeCollection(), getCollections(), summarizeText(), collectionToMarkdown(), escapeMarkdown(), markdownFrontmatter() (+4 more)

### Community 40 - "overlay.tsx"
Cohesion: 0.29
Nodes (14): CartCountBadge(), CartOverlay(), CartOverlayProps, OverlayContent(), FilterSheet(), MobileMenu(), Sheet(), SheetClose() (+6 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 42 - "cart/server.ts"
Cohesion: 0.26
Nodes (10): cartHandlers, createCustomerCartHandlers(), getCart(), getCartData(), getHandlerContext(), getRequestContext, seedCartData, Cart (+2 more)

### Community 43 - "next"
Cohesion: 0.10
Nodes (33): GuidesPage(), metadata, Posts(), GuideContent(), GuidePage(), BlogThumb(), formatPostDate(), InlineText() (+25 more)

### Community 44 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 45 - "address-book.tsx"
Cohesion: 0.18
Nodes (20): AddressBook(), AddressForm(), DeleteDialog(), FormState, REQUIRED_FIELDS, TEXT_FIELDS, toFormValues(), Dialog() (+12 more)

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
Cohesion: 0.21
Nodes (11): BarLink(), ICONS, BarMotion(), onClick(), place(), BarRise(), ENTRANCE, SLIDE (+3 more)

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
Nodes (10): generateMetadata(), getParam(), SearchAnalyticsTracker(), SearchBrowse(), SearchPage(), SearchParams, SearchQueryLabel(), SearchResultCount() (+2 more)

### Community 54 - "Enable Analytics"
Cohesion: 0.12
Nodes (15): 1. Do you need to add or change Vercel Analytics and/or Vercel Speed Insights?, 2. Do you want Google Tag Manager?, A1. Install dependencies, B1. Install dependency, B2. Add environment variable, B3. Add GTM to `components/analytics/index.tsx`, Before you start, C1. Update `components/analytics/index.tsx` (+7 more)

### Community 55 - "product-info.tsx"
Cohesion: 0.23
Nodes (11): ColorPicker(), ColorPickerProps, OptionPicker(), OptionPickerProps, ProductInfoDescriptionProps, ProductInfoOptions(), ProductInfoOptionsProps, Swatch() (+3 more)

### Community 56 - "line-item.tsx"
Cohesion: 0.23
Nodes (12): CartLineForm(), CartLineFormProps, CartLineItem(), CartLineItemProps, CartLineItems(), CartLineItemsProps, getLineRowKeys(), CartWarningMessages() (+4 more)

### Community 57 - "config/types.ts"
Cohesion: 0.21
Nodes (12): Shop Agent boundaries, 3. Install next-intl and migrate copy, assertRequiredEnv(), resolveConfig(), withShopConfig(), NextConfigContext, NextConfigFactory, NextConfigInput (+4 more)

### Community 58 - "shopify-client.tsx"
Cohesion: 0.39
Nodes (7): AnalyticsComponents(), AnalyticsReady(), CartAnalyticsTracker(), ShopifyScriptsTracker(), ShopifyScriptsTrackerProps, subscribeNoop(), PageViewedTracker()

### Community 59 - "package.json"
Cohesion: 0.13
Nodes (14): class-variance-authority@0.7.1, streamdown@2.7.1, @types/node@26.6.6, @types/react@19.3.0, engines, node, name, packageManager (+6 more)

### Community 60 - "Enable i18n (next-intl, no Markets)"
Cohesion: 0.29
Nodes (6): Create the locale source of truth, Enable i18n (next-intl, no Markets), Inspect and preserve the installation, Introduce next-intl and migrate copy, Verifying, What this skill turns on

### Community 61 - "auth/server.ts"
Cohesion: 0.30
Nodes (13): Boundary rules, AccountLabel(), NavAccount(), getHydrogenCustomerSession(), getCustomerAccessToken, getReadonlyCustomerSessionManager, getReadonlyRequestContext, getRequestedPath() (+5 more)

### Community 62 - "operations/pages/server.ts"
Cohesion: 0.31
Nodes (7): CommerceLocale, ContentPage, EMBED_DOMAINS, sanitizeShopifyHtml(), SHOPIFY_HTML_OPTIONS, fetchPage(), GET_PAGE_QUERY

### Community 63 - "mobile-menu.tsx"
Cohesion: 0.49
Nodes (8): MobileMenuList(), NestedItems(), FIXED_PANELS, ProductAccordions(), Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger()

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
Cohesion: 0.15
Nodes (12): Build with Vercel Shop, Copy and deployment defaults, Ground the work in source, Hydrogen ownership, Keep the Shopify boundary explicit, Model the route, Organize code by domain and execution context, Prevent blocking (+4 more)

### Community 69 - "addresses/page.tsx"
Cohesion: 0.28
Nodes (10): AddressesContent(), AddressesPage(), AddressesSkeleton(), ProfileContent(), ProfilePage(), ProfileSkeleton(), AccountPageHeader(), fetchCustomerAddresses() (+2 more)

### Community 70 - "collection-browse-provider.tsx"
Cohesion: 0.18
Nodes (16): BrowseProps, BrowseResultsGrid(), BrowseResultsGridProps, CollectionResultsProps, StreamedResultsGrid(), BrowsePublicationContext, BrowsePublicationStore, BrowseStore() (+8 more)

### Community 71 - "footer/index.tsx"
Cohesion: 0.24
Nodes (10): Footer(), FooterLink, FooterList(), QUICK_LINKS, TRUST, PLATFORM_LABELS, SocialIcon(), SocialLink (+2 more)

### Community 72 - "build-csv.mjs"
Cohesion: 0.08
Nodes (19): files, findings, root, sharedLinkFiles, sourceRoots, walk(), add(), cap() (+11 more)

### Community 73 - "collection-page.tsx"
Cohesion: 0.15
Nodes (19): CollectionActiveFilterCountBadge(), CollectionsSortSelect(), SORT_LABELS, BrowseFallback(), BrowseFallbackProps, BrowseToolbar(), BrowseToolbarProps, ToolbarLayout() (+11 more)

### Community 74 - "bundle-components.tsx"
Cohesion: 0.36
Nodes (8): BundleComponents(), BundleListItem, BundleParents(), BundleParentsProps, BundleProductList(), BundleProductListProps, BundleRelationships(), ProductVariantReference

### Community 75 - "Vercel Shop GraphQL Integration Reference"
Cohesion: 0.18
Nodes (10): Choose cache behavior from the consumer, Completion checklist, Data flow, Deployment context versus copy locale, Documents, Invalidation, Key Vercel Shop files, Operation integration (+2 more)

### Community 76 - "Cache Components compatibility — read this first"
Cohesion: 0.29
Nodes (7): A. There must be no `app/layout.tsx` above `app/[locale]/`, B. Carry `ensureStatic` and give `locale` static params, C. Keep request reads behind Suspense, Cache Components compatibility — read this first, D. `setRequestLocale` is not used, E. Keep the template `Link`, F. Keep server redirects outside client navigation

### Community 77 - "One browse store for collections and search"
Cohesion: 0.23
Nodes (11): Collection and Search Routes, Images and pagination, One browse store for collections and search, Prefetch traffic, Reference implementation, Results and controls, InfiniteProductGrid(), loadMoreBrowseProductsAction() (+3 more)

### Community 78 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @base-ui/react@1.9.0, botid@1.5.12, cn@0.5.1, eve@0.87.0, lucide-react@1.65.0, next@16.4.3, react@19.3.1 (+6 more)

### Community 79 - "customer/action.ts"
Cohesion: 0.16
Nodes (22): ADDRESS_ID, ADDRESS_INPUT, ADDRESS_VALUE, buildAddressInput(), CREATE_ADDRESS_INPUT, createAddressAction(), deleteAddressAction(), mapUserErrors() (+14 more)

### Community 80 - "@shopify/hydrogen"
Cohesion: 0.16
Nodes (21): FILTER_FRAGMENT, fetchCollectionProducts(), extractPriceRange(), getParamKeyFromShopifyId(), getSelectedColorFilterLabel(), isColorKey(), mapShopifyFilterPresentation(), mapShopifyFilterType() (+13 more)

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
Cohesion: 0.42
Nodes (9): Navigation, NavAccountFallback(), BottomBar(), CartIcon(), CartIconFallback(), Nav(), brandDisplayName(), modelDisplayName() (+1 more)

### Community 91 - "Vercel Shop"
Cohesion: 0.29
Nodes (6): Documentation, Features, Getting Started, License, Skills, Vercel Shop

### Community 92 - "product/server.ts"
Cohesion: 0.15
Nodes (15): Preserve shell coherence, Primary media, Product Detail Route Architecture, Recommendations and secondary content, Reference implementation, Variant interaction, POST(), verifyWebhook() (+7 more)

### Community 93 - "cart-page.tsx"
Cohesion: 0.23
Nodes (10): CartPage(), CartViewedTracker(), CollectionViewedTracker(), isAnalyticsCart(), ProductViewedTracker(), SearchViewedTracker(), CartPageContent(), addAnalyticsDestination() (+2 more)

### Community 94 - "eve.ts"
Cohesion: 0.60
Nodes (3): anonymous, browserAuth(), isAgentInfoRequest()

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

### Community 102 - "representation/index.ts"
Cohesion: 0.28
Nodes (11): Step 9: Locale-aware Markdown negotiation, Markdown negotiation, getMarkdownMirrorPath(), getMarkdownPath(), getMarkdownRewritePath(), matches(), parseAccept(), prefersMarkdown() (+3 more)

### Community 103 - "products/[handle]/route.ts"
Cohesion: 0.26
Nodes (8): GET(), GET(), escapeRequestText(), notFoundMarkdown(), appendVaryAccept(), markdownHeaders(), normalizeSearchTerm(), searchToMarkdown()

### Community 105 - "[shard]/route.ts"
Cohesion: 0.36
Nodes (10): escapeXml(), GET(), renderShard(), renderStatic(), toAbsoluteUrl(), urlsetWrap(), xmlResponse(), escapeXml() (+2 more)

### Community 106 - "session/route.ts"
Cohesion: 0.60
Nodes (5): POST(), createCustomerRequestContext(), createEmptyCart(), getCartById(), getCartIdFromCookie()

## Knowledge Gaps
- **3 isolated node(s):** `OPT_OUT_INSTRUMENTATION`, `npx`, `@shopify/dev-mcp`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 572 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@shopify/hydrogen` connect `@shopify/hydrogen` to `filters-client.tsx`, `Container`, `assertStorefrontOk`, `operations/policies/server.ts`, `lucide-react`, `product-detail-section.tsx`, `customer/server.ts`, `lib/product/index.ts`, `logging/server.ts`, `quick-shop.tsx`, `operations/collections/server.ts`, `proxy.ts`, `blogs/server.ts`, `search-modal.tsx`, `transforms/product/index.ts`, `transforms/product/types.ts`, `products/server.ts`, `lib/product/types.ts`, `config/index.ts`, `products/index.ts`, `cart/server.ts`, `address-book.tsx`, `auth/request.ts`, `bottom-bar.tsx`, `line-item.tsx`, `config/types.ts`, `shopify-client.tsx`, `package.json`, `auth/server.ts`, `operations/pages/server.ts`, `storefront/server.ts`, `collection-browse-provider.tsx`, `collection-page.tsx`, `dependencies`, `nav/index.tsx`, `product/server.ts`, `cart-page.tsx`, `eve.ts`, `products/[handle]/route.ts`, `session/route.ts`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `Link()` (e.g. with `Next.js layer` and `Prefetch traffic`) actually correct?**
  _`Link()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `OPT_OUT_INSTRUMENTATION`, `npx`, `@shopify/dev-mcp` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filters-client.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08362369337979095 - nodes in this community are weakly interconnected._
- **Why does `react` connect `gift-card-purchase-form.tsx` to `filters-client.tsx`, `Container`, `buildAlternates`, `product/server.ts`, `app/layout.tsx`, `shopping-results.tsx`, `operations/policies/server.ts`, `lucide-react`, `Link`, `product-detail-section.tsx`, `customer/server.ts`, `lib/product/index.ts`, `collection-page.tsx`, `app/page.tsx`, `quick-shop.tsx`, `product-media.tsx`, `agent-panel.tsx`, `search-modal.tsx`, `lib/product/types.ts`, `[id]/page.tsx`, `Skeleton`, `overlay.tsx`, `cart/server.ts`, `next`, `address-book.tsx`, `cart-bridge.tsx`, `bottom-bar.tsx`, `search/page.tsx`, `product-info.tsx`, `line-item.tsx`, `shopify-client.tsx`, `package.json`, `auth/server.ts`, `mobile-menu.tsx`, `mega-panel.tsx`, `addresses/page.tsx`, `collection-browse-provider.tsx`, `collection-page.tsx`, `dependencies`, `input-group.tsx`, `nav/index.tsx`, `cart-page.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Should `buildAlternates` be split into smaller, more focused modules?**
  _Cohesion score 0.1048780487804878 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `Container`, `buildAlternates`, `product/server.ts`, `app/layout.tsx`, `assertStorefrontOk`, `shopping-results.tsx`, `operations/policies/server.ts`, `Link`, `product-detail-section.tsx`, `lib/product/index.ts`, `collection-page.tsx`, `lib/collections/server.ts`, `collections/[handle]/page.tsx`, `app/page.tsx`, `quick-shop.tsx`, `product-media.tsx`, `proxy.ts`, `agent-panel.tsx`, `search-modal.tsx`, `config/index.ts`, `[id]/page.tsx`, `products/index.ts`, `Skeleton`, `overlay.tsx`, `cart/server.ts`, `bottom-bar.tsx`, `search/page.tsx`, `product-info.tsx`, `line-item.tsx`, `config/types.ts`, `shopify-client.tsx`, `package.json`, `auth/server.ts`, `operations/pages/server.ts`, `mega-panel.tsx`, `collection-browse-provider.tsx`, `footer/index.tsx`, `bundle-components.tsx`, `dependencies`, `customer/action.ts`, `nav/index.tsx`, `product/server.ts`, `cart-page.tsx`, `[shard]/route.ts`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._