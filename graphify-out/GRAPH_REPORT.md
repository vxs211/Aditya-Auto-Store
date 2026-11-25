# Graph Report - Aditya-Auto-Store  (2026-11-25)

## Corpus Check
- 353 files · ~123,326 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: (none) 3, .woff2 3, .toml 1)

## Summary
- 2069 nodes · 6066 edges · 121 communities (105 shown, 16 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 134 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5c44bf89`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lib/collections/server.ts
- buildAlternates
- about/page.tsx
- product-card.tsx
- app/layout.tsx
- assertStorefrontOk
- lib/cart/client.ts
- CommerceLocale
- Teardown: paragontwowheeleraccessories.com
- cart/server.ts
- Page
- react
- customer/server.ts
- lib/product/index.ts
- fitment.tsx
- react
- collections/[handle]/page.tsx
- Button
- logging/server.ts
- quick-shop.tsx
- collections/types.ts
- Step-by-step
- Enable Shopify Markets
- product-media.tsx
- proxy.ts
- Headless Shopify Storefront — Project Brief
- collections/index.ts
- address-book.tsx
- search-modal.tsx
- transforms/product/index.ts
- transforms/product/types.ts
- products/server.ts
- 3. Build phases
- Money
- config/index.ts
- [id]/page.tsx
- catalog.ts
- Skeleton
- auth/server.ts
- icon.tsx
- line-item.tsx
- compilerOptions
- update-cart.ts
- next
- components.json
- errors/server.ts
- AgentVariantPicker
- mcp/server.ts
- Vercel Shop
- bottom-bar.tsx
- .oxlintrc.json
- Shopify setup
- tasks
- operations/policies/server.ts
- Enable Analytics
- product-info.tsx
- gift-card-purchase-form.tsx
- config/types.ts
- products/[handle]/page.tsx
- package.json
- agent-panel.tsx
- shopping-results.tsx
- dependencies
- proxy.ts
- pages/[handle]/page.tsx
- product-price.tsx
- mega-panel.tsx
- Storefront Rendering and Data Architecture
- Vercel Shop GraphQL Integration Reference
- config/types.ts
- collection-browse-provider.tsx
- footer/index.tsx
- build-csv.mjs
- collection-page.tsx
- lib/product/types.ts
- dummy.ts
- [shard]/route.ts
- search/page.tsx
- product/server.ts
- customer/action.ts
- @shopify/hydrogen
- eve.ts
- Commerce Flows
- input-group.tsx
- scripts
- Update Vercel Shop
- Cart and Account Route Architecture
- Cart Provider and Bootstrap Contract
- Home and Marketing Route Architecture
- Connect an existing Shopify store
- auth/request.ts
- Vercel Shop
- Product Detail Route Architecture
- storefront/server.ts
- trackers.tsx
- interface
- Integrate Shopify GraphQL
- shopify-dev-mcp
- runtime
- cart-page.tsx
- policies/[handle]/page.tsx
- Collection and Search Routes
- representation/index.ts
- markdown/product/index.ts
- lenis
- revalidate/route.ts
- ai@7.0.157
- babel-plugin-react-compiler@1.0.0
- class-variance-authority
- lucide-react@1.65.0
- oxfmt@0.75.0
- oxlint@1.90.0
- sanitize-html
- streamdown
- tailwindcss@4.3.3
- turbo@2.11.10
- tw-animate-css@1.4.0
- @types/react@19.3.0
- typescript@7.0.2
- @vercel/analytics
- @vercel/speed-insights

## God Nodes (most connected - your core abstractions)
1. `react` - 115 edges
2. `Link()` - 113 edges
3. `next` - 89 edges
4. `@shopify/hydrogen` - 79 edges
5. `shopConfig` - 72 edges
6. `Button()` - 68 edges
7. `Container()` - 66 edges
8. `Page()` - 50 edges
9. `cn` - 45 edges
10. `Icon()` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Phase 3 — Fitment hierarchy (the core)` --references--> `CollectionLayout()`  [INFERRED]
  research/BUILD-PROMPT.md → components/collections/collection-page.tsx
- `Home page (Phase 6, partial)` --references--> `getFitmentBrands()`  [INFERRED]
  BRIEF.md → lib/collections/server.ts
- `Documents` --references--> `CommerceLocale`  [INFERRED]
  .agents/skills/shopify-graphql-reference/references/REFERENCE.md → lib/config/types.ts
- `2.1 Brand → model hierarchy` --references--> `Collection`  [INFERRED]
  research/BUILD-PROMPT.md → lib/collections/types.ts
- `Prefetch traffic` --references--> `Link()`  [INFERRED]
  .agents/skills/build-shop/references/plp-search.md → components/ui/link.tsx

## Import Cycles
- None detected.

## Communities (121 total, 16 thin omitted)

### Community 0 - "lib/collections/server.ts"
Cohesion: 0.17
Nodes (21): AllProductsLayout(), CollectionHandleLayout(), CollectionHandleLayoutContent(), generateStaticParams(), Phase 3 build log: fitment hierarchy, CollectionDetailSkeleton(), CollectionLayout(), SEARCH_SORT_EXCLUDE (+13 more)

### Community 1 - "buildAlternates"
Cohesion: 0.11
Nodes (33): BlogArticlePage(), BlogArticlePageContent(), generateMetadata(), generateStaticParams(), BlogPage(), BlogPageContent(), generateMetadata(), generateMetadata() (+25 more)

### Community 2 - "about/page.tsx"
Cohesion: 0.22
Nodes (9): INFRASTRUCTURE, metadata, MISSION_POINTS, RANGE, RangePictures(), REASONS, STATS, VALUES (+1 more)

### Community 3 - "product-card.tsx"
Cohesion: 0.14
Nodes (25): AgentProductCard(), MissingData(), interTight, ProductCard(), ProductCardContent(), ProductCardImage(), ProductCardImageContainer(), ProductCardImageProps (+17 more)

### Community 4 - "app/layout.tsx"
Cohesion: 0.09
Nodes (21): ensureStatic, geist, inter, michroma, RootLayout(), viewport, ActionBar(), ActionBarProps (+13 more)

### Community 5 - "assertStorefrontOk"
Cohesion: 0.22
Nodes (16): Key Vercel Shop files, generateStaticParams(), getArticleSitemapPage(), getShopifySitemapPage(), sitemapCacheTags(), tagSitemapResources(), assertStorefrontOk(), fetchArticleSitemapPage() (+8 more)

### Community 6 - "lib/cart/client.ts"
Cohesion: 0.17
Nodes (18): AgentCartBridge(), CartRefresh, ChatMessage(), linkSafety, Markdown, AgentThinking(), Bubble(), BubbleContent() (+10 more)

### Community 7 - "CommerceLocale"
Cohesion: 0.31
Nodes (7): CommerceLocale, ContentPage, EMBED_DOMAINS, sanitizeShopifyHtml(), SHOPIFY_HTML_OPTIONS, fetchPage(), GET_PAGE_QUERY

### Community 8 - "Teardown: paragontwowheeleraccessories.com"
Cohesion: 0.05
Nodes (38): 10. Search — a centred modal, 11. Content pages, 12. Blog, 13. Apps, integrations, and tracking, 14. Design system, 15. SEO, 16. User flows, 17. What not to copy (+30 more)

### Community 9 - "cart/server.ts"
Cohesion: 0.23
Nodes (16): POST(), createCustomerRequestContext(), getHydrogenCustomerSession(), getCustomerAccessToken, getReadonlyCustomerSessionManager, cartHandlers, createCustomerCartHandlers(), createEmptyCart() (+8 more)

### Community 10 - "Page"
Cohesion: 0.12
Nodes (36): Spacing, AboutPage(), AccountLandingPage(), AREAS, loginHref(), metadata, SendSignedInCustomerOn(), TileText() (+28 more)

### Community 11 - "react"
Cohesion: 0.14
Nodes (29): Product page (Phase 4, partial), BundleComponents(), BundleParents(), BundleProductList(), BuyButtons(), BuyButtonsProps, PurchaseOptions(), PurchaseOptionsProps (+21 more)

### Community 12 - "customer/server.ts"
Cohesion: 0.18
Nodes (16): ADDRESS_FRAGMENT, CUSTOMER_PROFILE_FRAGMENT, ORDER_FRAGMENT, ORDER_SUMMARY_FRAGMENT, transformCustomerAddress(), transformCustomerProfile(), transformLineItem(), transformMoney() (+8 more)

### Community 13 - "lib/product/index.ts"
Cohesion: 0.21
Nodes (15): load(), ProductMediaArea(), loadQuickShopProductAction(), QUICK_SHOP_INPUT, findColorOption(), getSelectedColorImage(), getSharedImages(), hasColorImagePartitioning() (+7 more)

### Community 14 - "fitment.tsx"
Cohesion: 0.20
Nodes (16): CollectionShopHeader(), interTight, CollectionBrowseBoundaryProps, CollectionHeader(), ContactBand(), ContentCard(), FitmentLayout(), interTight (+8 more)

### Community 15 - "react"
Cohesion: 0.11
Nodes (25): AccountError(), RootError(), NotFoundError(), PopularBrands(), ShopifyNotFoundRedirect(), InlineText(), CollectionCard(), interTight (+17 more)

### Community 16 - "collections/[handle]/page.tsx"
Cohesion: 0.16
Nodes (24): Keep the default view static, AllProductsPage(), generateMetadata(), generateMetadata(), RefinedAllProductsPage(), RefinedAllProductsResults(), CollectionPage(), DefaultCollectionResults() (+16 more)

### Community 17 - "Button"
Cohesion: 0.11
Nodes (36): HomePage(), metadata, FeatureCarousel(), GoogleG(), GoogleReviews(), SAMPLE_REVIEWS, Stars(), HeroReveal() (+28 more)

### Community 18 - "logging/server.ts"
Cohesion: 0.14
Nodes (13): register(), customerAccountFetch(), isCustomerAccountUnauthorized(), CustomerAccountFetchOptions, CustomerAccountVariables, configureShopifyLogging(), CONSOLE_METHODS, DEBUG_SHOPIFY (+5 more)

### Community 19 - "quick-shop.tsx"
Cohesion: 0.14
Nodes (28): QuickShop(), changeOpen(), closeForCart(), resolveSelection(), retrySelection(), selectVariant(), QuickShopDetails(), QuickShopDetailsLink() (+20 more)

### Community 20 - "collections/types.ts"
Cohesion: 0.14
Nodes (22): CollectionCardProps, FitmentLayoutProps, Collection, CollectionFitment, CollectionWithThumbnail, FitmentBrand, FitmentModel, Image (+14 more)

### Community 21 - "Step-by-step"
Cohesion: 0.08
Nodes (25): A. There must be no `app/layout.tsx` above `app/[locale]/`, B. Carry `ensureStatic` and give `locale` static params, C. Keep request reads behind Suspense, Cache Components compatibility — read this first, Create the locale source of truth, D. `setRequestLocale` is not used, E. Keep the template `Link`, Enable i18n (next-intl, no Markets) (+17 more)

### Community 22 - "Enable Shopify Markets"
Cohesion: 0.07
Nodes (26): 10. Strategy-specific SEO and sitemap behavior, 11. Verification, 1. Ask for routing and locales, 2. Make regional locales the source of truth, 3. Install next-intl and migrate copy, 4. Configure routing, 5. Move page routes under `app/[locale]/`, 6. Resolve locale from the root param (+18 more)

### Community 23 - "product-media.tsx"
Cohesion: 0.15
Nodes (24): Lightbox(), LightboxContext, LightboxTrigger(), Carousel(), LAZY_IMAGE_PROPS, LCP_IMAGE_PROPS, MediaImage(), MediaItem (+16 more)

### Community 24 - "proxy.ts"
Cohesion: 0.26
Nodes (9): AnalyticsComponents(), AnalyticsReady(), CartAnalyticsTracker(), ShopifyScriptsTracker(), ShopifyScriptsTrackerProps, subscribeNoop(), CART_FRAGMENT, SHOPIFY_ROUTE_TEMPLATES (+1 more)

### Community 25 - "Headless Shopify Storefront — Project Brief"
Cohesion: 0.09
Nodes (22): 1. Open questions (need answers before build), 2. Goals, 3. Non-goals (v1), 4. Architecture, 5. The content-editing tradeoff — read this, 6. Scope — full store, v1, 7. Phases, 8. Risks (+14 more)

### Community 26 - "collections/index.ts"
Cohesion: 0.17
Nodes (20): One browse store for collections and search, BrowseProps, BrowseResultsGrid(), BrowseResultsGridProps, CollectionResultsProps, StreamedResultsGrid(), CollectionLayoutProps, InfiniteProductGrid() (+12 more)

### Community 27 - "address-book.tsx"
Cohesion: 0.18
Nodes (22): AddressBook(), AddressForm(), DeleteDialog(), FormState, REQUIRED_FIELDS, TEXT_FIELDS, toFormValues(), Dialog() (+14 more)

### Community 28 - "search-modal.tsx"
Cohesion: 0.15
Nodes (16): LoadingSkeleton(), ProductResult(), SearchDialogContent(), handleKeyDown(), navigateToActiveItem(), SearchTrigger(), SuggestionChip(), DialogTrigger() (+8 more)

### Community 29 - "transforms/product/index.ts"
Cohesion: 0.33
Nodes (13): extractMediaFromProduct(), hasUniformPriceRange(), transformBundleComponent(), transformCategory(), transformFilteredShopifyProductCard(), transformImage(), transformOption(), transformProductCard() (+5 more)

### Community 30 - "transforms/product/types.ts"
Cohesion: 0.11
Nodes (24): BUNDLE_COMPONENT_VARIANT_FRAGMENT, BUNDLE_RELATIONSHIPS_FRAGMENT, FILTERABLE_PRODUCT_CARD_FRAGMENT, PRODUCT_CARD_FRAGMENT, PRODUCT_FRAGMENT, PRODUCT_WITH_VARIANTS_FRAGMENT, TAXONOMY_CATEGORY_FRAGMENT, PRODUCT_VARIANT_FRAGMENT (+16 more)

### Community 31 - "products/server.ts"
Cohesion: 0.11
Nodes (25): ProductPage, ProductVariant, decodeShopifyId(), COLLECTION_PRODUCTS_QUERY, fetchProductsByIds(), fetchProductWithVariants(), GET_PRODUCT_BY_HANDLE_QUERY, GET_PRODUCT_BY_HANDLE_WITH_BUNDLES_QUERY (+17 more)

### Community 32 - "3. Build phases"
Cohesion: 0.09
Nodes (22): 0.1 Brand system (binding), 0.2 Decision: retail store, single pieces or bulk, 0. Business details, 1. What makes this store work, 2.1 Brand → model hierarchy, 2.2 Editable marketing content — metaobjects, 2. Data model in Shopify, 3. Build phases (+14 more)

### Community 33 - "Money"
Cohesion: 0.18
Nodes (13): ProductOpenGraph(), ProductOpenGraphProps, ProductSchemaData, ProductSchemaProps, AccountActionResult, CustomerAddress, CustomerOrder, CustomerOrdersPage (+5 more)

### Community 34 - "config/index.ts"
Cohesion: 0.13
Nodes (11): agentProfile, agentProfileUrl(), DESTINATIONS, SearchState, searchStateSchema, botIdProtectedRoutes, isShopifyScriptsEnabled, shopConfig (+3 more)

### Community 35 - "[id]/page.tsx"
Cohesion: 0.18
Nodes (23): AddressesContent(), AddressesPage(), AddressesSkeleton(), OrderDetailContent(), OrderDetailPage(), OrderDetailSkeleton(), OrderLineItemRow(), SummaryRow() (+15 more)

### Community 36 - "catalog.ts"
Cohesion: 0.21
Nodes (17): formatCatalogMoney(), matchingProducts(), productHandleSchema, productOptionsSchema, toCatalogCandidate(), toModelProduct(), toModelProductDetails(), toModelProducts() (+9 more)

### Community 37 - "Skeleton"
Cohesion: 0.17
Nodes (14): AccountGate(), AccountLabel(), AccountLabelSkeleton(), AccountLayout(), SidebarSkeleton(), ACCOUNT_LINKS, AccountMobileTabs(), AccountTab (+6 more)

### Community 38 - "auth/server.ts"
Cohesion: 0.28
Nodes (11): Boundary rules, NavAccount(), REFRESH_ATTEMPT_HEADER, REFRESH_ATTEMPT_PARAM, getReadonlyRequestContext, getRequestedPath(), isCustomerLoggedIn, redirectToCustomerLogin() (+3 more)

### Community 39 - "icon.tsx"
Cohesion: 0.12
Nodes (26): GlobalError(), ReviewCarousel(), CHIPS, TrustChips(), AlertCircleIcon(), AlertTriangleIcon(), ArrowLIcon(), AwardIcon() (+18 more)

### Community 40 - "line-item.tsx"
Cohesion: 0.13
Nodes (30): AgentCartSummary(), CartUI(), DiscountForm(), DiscountFormProps, CartLineForm(), CartLineFormProps, CartLineItem(), CartLineItemProps (+22 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 42 - "update-cart.ts"
Cohesion: 0.20
Nodes (13): cartHandlers, getCart(), getSessionCartId(), mutateCart(), CartChange, changeDiscountCodes(), changeLineOptions(), changeSchema (+5 more)

### Community 43 - "next"
Cohesion: 0.16
Nodes (20): metadata, Posts(), GuideContent(), GuidePage(), BlogThumb(), formatPostDate(), getFitmentBrands(), getGuide() (+12 more)

### Community 44 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 45 - "errors/server.ts"
Cohesion: 0.14
Nodes (19): CartDrawerContext, CartDrawerContextValue, CartDrawerProvider(), CartProviderWrapper(), CartProviderWrapperProps, useCartDrawer(), CartIcon(), CartIconClient() (+11 more)

### Community 46 - "AgentVariantPicker"
Cohesion: 0.48
Nodes (7): AgentVariantPicker(), defaultAgentSelection(), findAgentVariant(), selectAgentOption(), toAgentOptionGroups(), toSelection(), toSelectedOptionList()

### Community 47 - "mcp/server.ts"
Cohesion: 0.18
Nodes (12): Eve layer, CatalogMoney, CatalogProduct, CatalogSearchResult, CatalogVariant, callShopifyMcpTool(), rpcPayload(), rpcResponseSchema (+4 more)

### Community 48 - "Vercel Shop"
Cohesion: 0.11
Nodes (17): Cart, Code Style, Comments, Customer accounts, Describe the product, not the change, Environment files, Files, GraphQL (+9 more)

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

### Community 53 - "operations/policies/server.ts"
Cohesion: 0.33
Nodes (5): ShopPolicy, SHOP_POLICY_FRAGMENT, fetchPolicyAnswers(), GET_SHOP_POLICIES_QUERY, POLICY_TYPES

### Community 54 - "Enable Analytics"
Cohesion: 0.12
Nodes (15): 1. Do you need to add or change Vercel Analytics and/or Vercel Speed Insights?, 2. Do you want Google Tag Manager?, A1. Install dependencies, B1. Install dependency, B2. Add environment variable, B3. Add GTM to `components/analytics/index.tsx`, Before you start, C1. Update `components/analytics/index.tsx` (+7 more)

### Community 55 - "product-info.tsx"
Cohesion: 0.21
Nodes (11): DropdownPanelProps, ColorPicker(), ColorPickerProps, OptionPicker(), OptionPickerProps, ProductInfoDescriptionProps, ProductInfoOptionsProps, Swatch() (+3 more)

### Community 56 - "gift-card-purchase-form.tsx"
Cohesion: 0.21
Nodes (13): ProfileContent(), ProfilePage(), ProfileSkeleton(), ProfileForm(), ProfileFormLabels, GiftCardPurchaseForm(), GiftCardPurchaseFormFallback(), TrackOrderForm() (+5 more)

### Community 57 - "config/types.ts"
Cohesion: 0.14
Nodes (13): Build with Vercel Shop, Copy and deployment defaults, Ground the work in source, Hydrogen ownership, Keep the Shopify boundary explicit, Model the route, Organize code by domain and execution context, Prevent blocking (+5 more)

### Community 58 - "products/[handle]/page.tsx"
Cohesion: 0.22
Nodes (14): buildProductMetadata(), generateMetadata(), ProductPage(), ProductPageContent(), ProductDetailSkeleton(), RecentlyViewedRecorder(), readRecentlyViewedProducts(), recordRecentlyViewedProduct() (+6 more)

### Community 59 - "package.json"
Cohesion: 0.13
Nodes (14): react-dom@19.3.1, @tailwindcss/turbopack@4.3.3, @tailwindcss/typography@0.5.20, @types/sanitize-html@2.16.2, engines, node, name, packageManager (+6 more)

### Community 60 - "agent-panel.tsx"
Cohesion: 0.15
Nodes (26): AgentButton(), AgentPanel(), AgentPanelProps, prepareAgentSession(), AgentPanel, FilterSheet(), MobileMenu(), MobileMenuList() (+18 more)

### Community 61 - "shopping-results.tsx"
Cohesion: 0.15
Nodes (19): AgentCartSummaryProps, AgentProductCardProps, AgentVariantPickerProps, CartConfirmation, hasCompleteVariants(), isAgentProduct(), ShoppingResults(), ShoppingResultsProps (+11 more)

### Community 62 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, @base-ui/react@1.9.0, botid@1.5.12, cn@0.5.1, eve@0.87.0, @gsap/react@^2.1.2, next@16.4.3, react@19.3.1 (+7 more)

### Community 63 - "proxy.ts"
Cohesion: 0.23
Nodes (12): createCustomerSessionManager(), forwardCustomerRefreshAttempt(), getCustomerRequestOrigin(), getRefinedCollectionPath(), isRefinedCollectionPath(), predictiveSearchHandlers, PRODUCT_FRAGMENT, QUERY_FRAGMENT (+4 more)

### Community 64 - "pages/[handle]/page.tsx"
Cohesion: 0.25
Nodes (10): generateMetadata(), generateStaticParams(), ShopifyPage(), ShopifyPageContent(), RichTextPage(), RichTextPageProps, RichTextPageSkeleton(), Prose() (+2 more)

### Community 65 - "product-price.tsx"
Cohesion: 0.26
Nodes (10): ComplementaryProducts(), ProductPrice(), ProductPriceProps, DiscountBadge(), DiscountBadgeProps, Price(), PriceProps, getDiscountPercent() (+2 more)

### Community 66 - "mega-panel.tsx"
Cohesion: 0.13
Nodes (22): 4. Wire the nav menu, Navigation, NavAccountFallback(), DropdownPanel(), hide(), onKey(), FooterAvoidance(), schedule() (+14 more)

### Community 67 - "Storefront Rendering and Data Architecture"
Cohesion: 0.17
Nodes (11): Architect media and third parties, Choose cache ownership deliberately, Define client and mutation boundaries, Design the dependency graph, Keep responsibilities in layers, Pass request-time work down to a resolved leaf, Reference implementation, Shape the shell and streaming boundaries (+3 more)

### Community 68 - "Vercel Shop GraphQL Integration Reference"
Cohesion: 0.20
Nodes (9): Choose cache behavior from the consumer, Completion checklist, Data flow, Deployment context versus copy locale, Documents, Invalidation, Operation integration, Ownership boundary (+1 more)

### Community 69 - "config/types.ts"
Cohesion: 0.26
Nodes (10): assertRequiredEnv(), resolveConfig(), withShopConfig(), NextConfigContext, NextConfigFactory, NextConfigInput, NextConfigPlugin, ShopConfig (+2 more)

### Community 70 - "collection-browse-provider.tsx"
Cohesion: 0.24
Nodes (10): BrowsePublicationContext, BrowsePublicationStore, BrowseStore(), BrowseStoreProps, CollectionBrowseFrame(), CollectionBrowseFrameProps, CollectionBrowseProvider(), CollectionBrowseProviderProps (+2 more)

### Community 71 - "footer/index.tsx"
Cohesion: 0.11
Nodes (20): 1. Add the menu operation, 1. Which menus do you want to fetch from Shopify?, 2. Cache the menu, 2. What are the Shopify menu handles?, 3. Refresh menus after edits, 5. Wire the footer menu, Before you start, Enable Shopify Menus (+12 more)

### Community 72 - "build-csv.mjs"
Cohesion: 0.08
Nodes (19): files, findings, root, sharedLinkFiles, sourceRoots, walk(), add(), cap() (+11 more)

### Community 73 - "collection-page.tsx"
Cohesion: 0.19
Nodes (17): CollectionActiveFilterCountBadge(), CollectionsSortSelect(), SORT_LABELS, BrowseFallback(), BrowseFallbackProps, BrowseToolbar(), BrowseToolbarProps, ToolbarLayout() (+9 more)

### Community 74 - "lib/product/types.ts"
Cohesion: 0.19
Nodes (13): BundleComponentsProps, BundleListItem, BundleParentsProps, BundleProductListProps, AgentOptionValue, Category, OptionValue, OptionValueState (+5 more)

### Community 75 - "dummy.ts"
Cohesion: 0.33
Nodes (8): DUMMY_PRODUCT_HANDLE, dummyProduct(), dummyVariant(), gallery, money(), VariantDef, variantDefs, variantFor()

### Community 76 - "[shard]/route.ts"
Cohesion: 0.36
Nodes (10): escapeXml(), GET(), renderShard(), renderStatic(), toAbsoluteUrl(), urlsetWrap(), xmlResponse(), escapeXml() (+2 more)

### Community 77 - "search/page.tsx"
Cohesion: 0.22
Nodes (16): generateMetadata(), getParam(), SearchAnalyticsTracker(), SearchBrowse(), SearchPage(), SearchParams, SearchQueryLabel(), SearchResultCount() (+8 more)

### Community 78 - "product/server.ts"
Cohesion: 0.19
Nodes (14): Preserve shell coherence, POST(), verifyWebhook(), generateStaticParams(), ProductCardProps, getProduct(), getSearchIndexProducts(), tagProducts() (+6 more)

### Community 79 - "customer/action.ts"
Cohesion: 0.12
Nodes (26): ADDRESS_ID, ADDRESS_INPUT, ADDRESS_VALUE, CREATE_ADDRESS_INPUT, mapUserErrors(), PROFILE_INPUT, UPDATE_ADDRESS_INPUT, UPPERCASE_FIELDS (+18 more)

### Community 80 - "@shopify/hydrogen"
Cohesion: 0.06
Nodes (57): BrowsePublication, BrowsePublisherProps, usePublishedFacets(), buildToggleHref(), CollectionFilterSidebar(), CollectionFilterSidebarProps, FilterBadge(), FilterBadgeProps (+49 more)

### Community 81 - "eve.ts"
Cohesion: 0.60
Nodes (3): anonymous, browserAuth(), isAgentInfoRequest()

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

### Community 90 - "auth/request.ts"
Cohesion: 0.33
Nodes (7): createSessionManager(), decryptSession(), encryptSession(), getSessionKey(), parseCookies(), readSession(), SessionData

### Community 91 - "Vercel Shop"
Cohesion: 0.29
Nodes (6): Documentation, Features, Getting Started, License, Skills, Vercel Shop

### Community 92 - "Product Detail Route Architecture"
Cohesion: 0.33
Nodes (5): Primary media, Product Detail Route Architecture, Recommendations and secondary content, Reference implementation, Variant interaction

### Community 93 - "storefront/server.ts"
Cohesion: 0.15
Nodes (14): ARTICLE_SUMMARY_FRAGMENT, BLOG_FRAGMENT, GET_BLOG_ARTICLE_QUERY, GET_BLOG_QUERY, fetchLocalizationCurrency(), GET_LOCALIZATION_CURRENCY_QUERY, customFetchApi(), getClient() (+6 more)

### Community 94 - "trackers.tsx"
Cohesion: 0.33
Nodes (8): CartViewedTracker(), CollectionViewedTracker(), isAnalyticsCart(), PageViewedTracker(), ProductViewedTracker(), SearchViewedTracker(), addAnalyticsDestination(), getAnalytics()

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

### Community 99 - "cart-page.tsx"
Cohesion: 0.42
Nodes (6): CartPage(), CartPageContent(), CartPageLayout(), CartPageLayoutProps, CartPageSkeleton(), useSuspenseCart

### Community 100 - "policies/[handle]/page.tsx"
Cohesion: 0.44
Nodes (7): generateMetadata(), generateStaticParams(), PolicyPage(), PolicyPageContent(), getShopPolicies(), getShopPolicy(), fetchShopPolicies()

### Community 101 - "Collection and Search Routes"
Cohesion: 0.33
Nodes (5): Collection and Search Routes, Images and pagination, Prefetch traffic, Reference implementation, Results and controls

### Community 102 - "representation/index.ts"
Cohesion: 0.28
Nodes (11): Step 9: Locale-aware Markdown negotiation, Markdown negotiation, getMarkdownMirrorPath(), getMarkdownPath(), getMarkdownRewritePath(), matches(), parseAccept(), prefersMarkdown() (+3 more)

### Community 103 - "markdown/product/index.ts"
Cohesion: 0.15
Nodes (19): GET(), GET(), GET(), GET(), GET(), describeCollection(), summarizeText(), collectionToMarkdown() (+11 more)

### Community 105 - "revalidate/route.ts"
Cohesion: 0.50
Nodes (3): isAuthorized(), POST(), REVALIDATE_TAGS

## Knowledge Gaps
- **3 isolated node(s):** `OPT_OUT_INSTRUMENTATION`, `npx`, `@shopify/dev-mcp`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 593 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@shopify/hydrogen` connect `proxy.ts` to `assertStorefrontOk`, `CommerceLocale`, `cart/server.ts`, `react`, `customer/server.ts`, `lib/product/index.ts`, `react`, `logging/server.ts`, `quick-shop.tsx`, `collections/types.ts`, `collections/index.ts`, `search-modal.tsx`, `transforms/product/index.ts`, `transforms/product/types.ts`, `products/server.ts`, `Money`, `config/index.ts`, `auth/server.ts`, `line-item.tsx`, `update-cart.ts`, `errors/server.ts`, `bottom-bar.tsx`, `operations/policies/server.ts`, `products/[handle]/page.tsx`, `package.json`, `dependencies`, `proxy.ts`, `mega-panel.tsx`, `config/types.ts`, `collection-browse-provider.tsx`, `collection-page.tsx`, `lib/product/types.ts`, `product/server.ts`, `customer/action.ts`, `@shopify/hydrogen`, `eve.ts`, `auth/request.ts`, `storefront/server.ts`, `trackers.tsx`, `markdown/product/index.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `Link()` (e.g. with `Next.js layer` and `Prefetch traffic`) actually correct?**
  _`Link()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `OPT_OUT_INSTRUMENTATION`, `npx`, `@shopify/dev-mcp` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `buildAlternates` be split into smaller, more focused modules?**
  _Cohesion score 0.10520487264673312 - nodes in this community are weakly interconnected._
- **Why does `react` connect `products/[handle]/page.tsx` to `lib/collections/server.ts`, `buildAlternates`, `about/page.tsx`, `product-card.tsx`, `app/layout.tsx`, `lib/cart/client.ts`, `cart/server.ts`, `Page`, `react`, `fitment.tsx`, `react`, `Button`, `quick-shop.tsx`, `product-media.tsx`, `proxy.ts`, `collections/index.ts`, `address-book.tsx`, `search-modal.tsx`, `[id]/page.tsx`, `Skeleton`, `auth/server.ts`, `icon.tsx`, `line-item.tsx`, `next`, `errors/server.ts`, `bottom-bar.tsx`, `product-info.tsx`, `gift-card-purchase-form.tsx`, `package.json`, `agent-panel.tsx`, `shopping-results.tsx`, `dependencies`, `pages/[handle]/page.tsx`, `product-price.tsx`, `mega-panel.tsx`, `collection-browse-provider.tsx`, `collection-page.tsx`, `search/page.tsx`, `customer/action.ts`, `@shopify/hydrogen`, `input-group.tsx`, `trackers.tsx`, `cart-page.tsx`, `policies/[handle]/page.tsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `product-card.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14482758620689656 - nodes in this community are weakly interconnected._
- **Why does `next` connect `buildAlternates` to `lib/collections/server.ts`, `about/page.tsx`, `product-card.tsx`, `app/layout.tsx`, `assertStorefrontOk`, `CommerceLocale`, `cart/server.ts`, `Page`, `react`, `fitment.tsx`, `react`, `collections/[handle]/page.tsx`, `Button`, `quick-shop.tsx`, `product-media.tsx`, `proxy.ts`, `search-modal.tsx`, `config/index.ts`, `[id]/page.tsx`, `Skeleton`, `auth/server.ts`, `line-item.tsx`, `next`, `bottom-bar.tsx`, `product-info.tsx`, `products/[handle]/page.tsx`, `package.json`, `agent-panel.tsx`, `shopping-results.tsx`, `dependencies`, `proxy.ts`, `pages/[handle]/page.tsx`, `product-price.tsx`, `mega-panel.tsx`, `config/types.ts`, `collection-browse-provider.tsx`, `footer/index.tsx`, `lib/product/types.ts`, `[shard]/route.ts`, `search/page.tsx`, `product/server.ts`, `customer/action.ts`, `trackers.tsx`, `cart-page.tsx`, `policies/[handle]/page.tsx`, `revalidate/route.ts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._