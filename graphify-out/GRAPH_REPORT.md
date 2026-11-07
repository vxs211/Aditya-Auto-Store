# Graph Report - Aditya Store Shopify  (2026-11-06)

## Corpus Check
- 340 files · ~114,222 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 3, .woff2 3, .example 1)

## Summary
- 1958 nodes · 5736 edges · 116 communities (99 shown, 17 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 124 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `38af32af`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filters-client.tsx
- react
- search/page.tsx
- product/server.ts
- app/layout.tsx
- [shard]/route.ts
- shopping-results.tsx
- representation/index.ts
- Teardown: paragontwowheeleraccessories.com
- @shopify/hydrogen
- Link
- product-detail-section.tsx
- customer/server.ts
- lib/product/index.ts
- next
- collection-page.tsx
- collections/[handle]/page.tsx
- lib/product/types.ts
- errors/server.ts
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
- collections/index.ts
- link.tsx
- [id]/page.tsx
- catalog.ts
- Skeleton
- gift-card-purchase-form.tsx
- browse.tsx
- customer/action.ts
- compilerOptions
- cart/server.ts
- [slug]/page.tsx
- components.json
- address-book.tsx
- cart-bridge.tsx
- lucide-react
- Vercel Shop
- bottom-bar.tsx
- .oxlintrc.json
- Shopify setup
- tasks
- money/index.ts
- Enable Analytics
- product-info.tsx
- mcp/server.ts
- config/types.ts
- package.json
- dependencies
- update-cart.ts
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
- sort-select.tsx
- bundle-components.tsx
- Vercel Shop GraphQL Integration Reference
- getNumericShopifyId
- google-reviews.tsx
- cart.tsx
- lib/customer/types.ts
- fetchSearchIndexProducts
- operations/policies/server.ts
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
- cart/page.tsx
- eve.ts
- interface
- Integrate Shopify GraphQL
- shopify-dev-mcp
- runtime
- ai@7.0.157
- @base-ui/react
- class-variance-authority
- gsap
- @gsap/react@^2.1.2
- lenis
- oxfmt@0.75.0
- oxlint@1.90.0
- sanitize-html
- streamdown
- @tailwindcss/turbopack@4.3.3
- @tailwindcss/typography@0.5.20
- turbo@2.11.10
- @types/node@26.6.6
- @types/react@19.3.0
- @types/sanitize-html@2.16.2
- @vercel/speed-insights

## God Nodes (most connected - your core abstractions)
1. `Link()` - 110 edges
2. `react` - 105 edges
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

## Communities (116 total, 17 thin omitted)

### Community 0 - "filters-client.tsx"
Cohesion: 0.06
Nodes (54): BrowsePublication, BrowsePublisherProps, usePublishedFacets(), buildToggleHref(), CollectionFilterSidebar(), CollectionFilterSidebarProps, FilterBadge(), FilterBadgeProps (+46 more)

### Community 1 - "react"
Cohesion: 0.10
Nodes (32): Spacing, INFRASTRUCTURE, metadata, MISSION_POINTS, RANGE, REASONS, STATS, VALUES (+24 more)

### Community 2 - "search/page.tsx"
Cohesion: 0.10
Nodes (40): BlogArticlePage(), BlogArticlePageContent(), generateMetadata(), BlogPage(), BlogPageContent(), generateMetadata(), generateMetadata(), generateMetadata() (+32 more)

### Community 3 - "product/server.ts"
Cohesion: 0.10
Nodes (37): generateStaticParams(), AgentProductCard(), MissingData(), ProductCard(), ProductCardContent(), ProductCardImage(), ProductCardImageContainer(), ProductCardImageProps (+29 more)

### Community 4 - "app/layout.tsx"
Cohesion: 0.07
Nodes (31): ensureStatic, geistSans, inter, michroma, origin, RootLayout(), viewport, ActionBar() (+23 more)

### Community 5 - "[shard]/route.ts"
Cohesion: 0.10
Nodes (35): generateStaticParams(), generateStaticParams(), generateStaticParams(), escapeXml(), GET(), renderShard(), renderStatic(), toAbsoluteUrl() (+27 more)

### Community 6 - "shopping-results.tsx"
Cohesion: 0.11
Nodes (36): AgentCartSummaryProps, AgentProductCardProps, AgentVariantPicker(), AgentVariantPickerProps, CartConfirmation, hasCompleteVariants(), isAgentProduct(), ShoppingResults() (+28 more)

### Community 7 - "representation/index.ts"
Cohesion: 0.11
Nodes (27): Step 9: Locale-aware Markdown negotiation, Markdown negotiation, GET(), GET(), GET(), GET(), describeCollection(), collectionToMarkdown() (+19 more)

### Community 8 - "Teardown: paragontwowheeleraccessories.com"
Cohesion: 0.05
Nodes (38): 10. Search — a centred modal, 11. Content pages, 12. Blog, 13. Apps, integrations, and tracking, 14. Design system, 15. SEO, 16. User flows, 17. What not to copy (+30 more)

### Community 9 - "@shopify/hydrogen"
Cohesion: 0.14
Nodes (30): AgentCartSummary(), CartPageContent(), CartPageLayout(), CartPageLayoutProps, DiscountForm(), DiscountFormProps, CartLineForm(), CartLineFormProps (+22 more)

### Community 10 - "Link"
Cohesion: 0.21
Nodes (32): AboutPage(), SignInFailedPage(), ContactPage(), NotFoundError(), PopularBrands(), ShopifyNotFoundRedirect(), HomePage(), metadata (+24 more)

### Community 11 - "product-detail-section.tsx"
Cohesion: 0.14
Nodes (28): Preserve shell coherence, Product page (Phase 4, partial), BuyButtons(), BuyButtonsProps, PurchaseOptions(), BuyWithShopLogo(), BuyButtonsFallback(), ProductDetailSkeleton() (+20 more)

### Community 12 - "customer/server.ts"
Cohesion: 0.12
Nodes (26): ADDRESS_FRAGMENT, CUSTOMER_PROFILE_FRAGMENT, ORDER_FRAGMENT, ORDER_SUMMARY_FRAGMENT, CUSTOMER_ADDRESS_CREATE_MUTATION, CUSTOMER_ADDRESS_DELETE_MUTATION, CUSTOMER_ADDRESS_UPDATE_MUTATION, CUSTOMER_UPDATE_MUTATION (+18 more)

### Community 13 - "lib/product/index.ts"
Cohesion: 0.12
Nodes (25): buildProductMetadata(), generateMetadata(), ProductPage(), ProductPageContent(), CollectionViewedTracker(), ProductViewedTracker(), SearchViewedTracker(), ProductDetailSection() (+17 more)

### Community 14 - "next"
Cohesion: 0.12
Nodes (14): metadata, FAQ_SCHEMA, FAQS, metadata, GET(), metadata, Section, SECTIONS (+6 more)

### Community 15 - "collection-page.tsx"
Cohesion: 0.14
Nodes (23): Next.js layer, AllProductsLayout(), CollectionHandleLayout(), CollectionHandleLayoutContent(), generateStaticParams(), CollectionBrowseBoundaryProps, CollectionDetailSkeleton(), CollectionHeader() (+15 more)

### Community 16 - "collections/[handle]/page.tsx"
Cohesion: 0.15
Nodes (25): Keep the default view static, RangePictures(), AllProductsPage(), generateMetadata(), generateMetadata(), RefinedAllProductsPage(), RefinedAllProductsResults(), CollectionPage() (+17 more)

### Community 17 - "lib/product/types.ts"
Cohesion: 0.17
Nodes (19): PurchaseOptionsProps, ProductOpenGraph(), ProductOpenGraphProps, RecentlyViewedRecorder(), ProductSchemaData, ProductSchemaProps, OrderLineItem, Image (+11 more)

### Community 18 - "errors/server.ts"
Cohesion: 0.11
Nodes (18): register(), customerAccountFetch(), isCustomerAccountUnauthorized(), CustomerAccountFetchOptions, CustomerAccountVariables, isTransientError(), TRANSIENT_ERROR_CODES, COLLECTION_FIELDS_FRAGMENT (+10 more)

### Community 19 - "quick-shop.tsx"
Cohesion: 0.13
Nodes (25): Motion (GSAP), QuickShop(), changeOpen(), closeForCart(), load(), resolveSelection(), retrySelection(), selectVariant() (+17 more)

### Community 20 - "lib/collections/server.ts"
Cohesion: 0.17
Nodes (23): CollectionCardProps, FitmentLayoutProps, getCollections(), getCollectionsListing(), tagCollections(), Collection, CollectionFitment, CollectionWithThumbnail (+15 more)

### Community 21 - "Step-by-step"
Cohesion: 0.08
Nodes (25): A. There must be no `app/layout.tsx` above `app/[locale]/`, B. Carry `ensureStatic` and give `locale` static params, C. Keep request reads behind Suspense, Cache Components compatibility — read this first, Create the locale source of truth, D. `setRequestLocale` is not used, E. Keep the template `Link`, Enable i18n (next-intl, no Markets) (+17 more)

### Community 22 - "Enable Shopify Markets"
Cohesion: 0.08
Nodes (25): 10. Strategy-specific SEO and sitemap behavior, 11. Verification, 1. Ask for routing and locales, 2. Make regional locales the source of truth, 4. Configure routing, 5. Move page routes under `app/[locale]/`, 6. Resolve locale from the root param, 7. Extend the proxy (+17 more)

### Community 23 - "product-media.tsx"
Cohesion: 0.15
Nodes (22): Lightbox(), LightboxContext, LightboxTrigger(), Carousel(), ColorImageGrid(), Grid(), GridItem(), LAZY_IMAGE_PROPS (+14 more)

### Community 24 - "proxy.ts"
Cohesion: 0.14
Nodes (20): createCustomerSessionManager(), createSessionManager(), decryptSession(), encryptSession(), forwardCustomerRefreshAttempt(), getCustomerRequestOrigin(), getSessionKey(), parseCookies() (+12 more)

### Community 25 - "Headless Shopify Storefront — Project Brief"
Cohesion: 0.09
Nodes (22): 1. Open questions (need answers before build), 2. Goals, 3. Non-goals (v1), 4. Architecture, 5. The content-editing tradeoff — read this, 6. Scope — full store, v1, 7. Phases, 8. Risks (+14 more)

### Community 26 - "agent-panel.tsx"
Cohesion: 0.18
Nodes (15): AgentButton(), AgentPanel(), AgentPanelProps, prepareAgentSession(), ChatMessage(), linkSafety, Markdown, AgentPanel (+7 more)

### Community 27 - "blogs/server.ts"
Cohesion: 0.19
Nodes (15): ArticleCard(), ArticleCardProps, ArticlePageProps, BlogIndexProps, Blog, BlogArticle, ARTICLE_SUMMARY_FRAGMENT, BLOG_FRAGMENT (+7 more)

### Community 28 - "search-modal.tsx"
Cohesion: 0.13
Nodes (18): LoadingSkeleton(), ProductResult(), SearchDialogContent(), handleKeyDown(), navigateToActiveItem(), SearchModal(), SearchTrigger(), SuggestionChip() (+10 more)

### Community 29 - "transforms/product/index.ts"
Cohesion: 0.15
Nodes (22): Category, OptionValue, fetchProductRecommendations(), fetchProductWithVariants(), extractMediaFromProduct(), hasUniformPriceRange(), transformBundleComponent(), transformCategory() (+14 more)

### Community 30 - "transforms/product/types.ts"
Cohesion: 0.15
Nodes (18): BUNDLE_COMPONENT_VARIANT_FRAGMENT, BUNDLE_RELATIONSHIPS_FRAGMENT, FILTERABLE_PRODUCT_CARD_FRAGMENT, PRODUCT_CARD_FRAGMENT, PRODUCT_FRAGMENT, PRODUCT_WITH_VARIANTS_FRAGMENT, TAXONOMY_CATEGORY_FRAGMENT, PRODUCT_VARIANT_FRAGMENT (+10 more)

### Community 31 - "products/server.ts"
Cohesion: 0.11
Nodes (21): decodeShopifyId(), COLLECTION_PRODUCTS_QUERY, fetchProductsByIds(), GET_PRODUCT_BY_HANDLE_QUERY, GET_PRODUCT_BY_HANDLE_WITH_BUNDLES_QUERY, GET_PRODUCT_VARIANT_BY_SELECTED_OPTIONS_QUERY, GET_PRODUCT_VARIANT_QUERY, GET_PRODUCT_VARIANT_WITH_BUNDLES_QUERY (+13 more)

### Community 32 - "3. Build phases"
Cohesion: 0.09
Nodes (22): 0.1 Brand system (binding), 0.2 Decision: retail store, single pieces or bulk, 0. Business details, 1. What makes this store work, 2.1 Brand → model hierarchy, 2.2 Editable marketing content — metaobjects, 2. Data model in Shopify, 3. Build phases (+14 more)

### Community 33 - "collections/index.ts"
Cohesion: 0.16
Nodes (18): Collection and Search Routes, Images and pagination, One browse store for collections and search, Prefetch traffic, Reference implementation, Results and controls, InfiniteProductGrid(), InfiniteProductGridProps (+10 more)

### Community 34 - "link.tsx"
Cohesion: 0.12
Nodes (17): AccountError(), RootError(), AccountTab, ErrorBoundaryContent(), assignRef(), cancelSettleIntent(), canUpgrade(), Connection (+9 more)

### Community 35 - "[id]/page.tsx"
Cohesion: 0.24
Nodes (17): OrderDetailContent(), OrderDetailPage(), OrderDetailSkeleton(), OrderLineItemRow(), SummaryRow(), OrdersContent(), OrdersPage(), OrdersSkeleton() (+9 more)

### Community 36 - "catalog.ts"
Cohesion: 0.23
Nodes (12): matchingProducts(), productHandleSchema, productOptionsSchema, toModelProduct(), toModelProductDetails(), toModelProducts(), DESTINATIONS, toAgentProduct() (+4 more)

### Community 37 - "Skeleton"
Cohesion: 0.19
Nodes (13): AccountGate(), AccountLabel(), AccountLabelSkeleton(), AccountLayout(), SidebarSkeleton(), ACCOUNT_LINKS, AccountMobileTabs(), MobileTabsClient() (+5 more)

### Community 38 - "gift-card-purchase-form.tsx"
Cohesion: 0.22
Nodes (12): ProfileForm(), ProfileFormLabels, useCartDrawer(), GiftCardPurchaseForm(), GiftCardPurchaseFormFallback(), TrackOrderForm(), Input(), Label() (+4 more)

### Community 39 - "browse.tsx"
Cohesion: 0.19
Nodes (18): Browse(), BrowseProps, BrowseResultsFallback(), BrowseResultsGrid(), BrowseResultsGridProps, CollectionResultsProps, StreamedResultsGrid(), CollectionActiveFilterCountBadge() (+10 more)

### Community 40 - "customer/action.ts"
Cohesion: 0.17
Nodes (19): ADDRESS_ID, ADDRESS_INPUT, ADDRESS_VALUE, buildAddressInput(), CREATE_ADDRESS_INPUT, createAddressAction(), mapUserErrors(), PROFILE_INPUT (+11 more)

### Community 41 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 42 - "cart/server.ts"
Cohesion: 0.22
Nodes (14): POST(), createCustomerRequestContext(), cartHandlers, createCustomerCartHandlers(), createEmptyCart(), getCartById(), getCartData(), getCartIdFromCookie() (+6 more)

### Community 43 - "[slug]/page.tsx"
Cohesion: 0.23
Nodes (13): GuidesPage(), metadata, Posts(), generateMetadata(), GuideContent(), GuidePage(), BlogThumb(), formatPostDate() (+5 more)

### Community 44 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 45 - "address-book.tsx"
Cohesion: 0.26
Nodes (16): AddressBook(), AddressForm(), DeleteDialog(), FormState, REQUIRED_FIELDS, TEXT_FIELDS, toFormValues(), Dialog() (+8 more)

### Community 46 - "cart-bridge.tsx"
Cohesion: 0.21
Nodes (13): AgentCartBridge(), CartRefresh, listeners, setAgentCartPending(), getCartMutationResult(), isCartMutation(), completedOutput(), isSettledToolPart() (+5 more)

### Community 47 - "lucide-react"
Cohesion: 0.25
Nodes (14): CartUI(), CartNotifications(), CartCountBadge(), CartOverlay(), CartOverlayProps, FilterSheet(), Sheet(), SheetClose() (+6 more)

### Community 48 - "Vercel Shop"
Cohesion: 0.12
Nodes (16): Cart, Code Style, Comments, Customer accounts, Describe the product, not the change, Environment files, Files, GraphQL (+8 more)

### Community 49 - "bottom-bar.tsx"
Cohesion: 0.21
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

### Community 53 - "money/index.ts"
Cohesion: 0.17
Nodes (9): formatCatalogMoney(), toCatalogCandidate(), agentProfile, agentProfileUrl(), SearchState, searchStateSchema, currencyDigits(), fromMinorUnits() (+1 more)

### Community 54 - "Enable Analytics"
Cohesion: 0.12
Nodes (15): 1. Do you need to add or change Vercel Analytics and/or Vercel Speed Insights?, 2. Do you want Google Tag Manager?, A1. Install dependencies, B1. Install dependency, B2. Add environment variable, B3. Add GTM to `components/analytics/index.tsx`, Before you start, C1. Update `components/analytics/index.tsx` (+7 more)

### Community 55 - "product-info.tsx"
Cohesion: 0.23
Nodes (11): ColorPicker(), ColorPickerProps, OptionPicker(), OptionPickerProps, ProductInfoDescriptionProps, ProductInfoOptions(), ProductInfoOptionsProps, Swatch() (+3 more)

### Community 56 - "mcp/server.ts"
Cohesion: 0.18
Nodes (12): Eve layer, CatalogMoney, CatalogProduct, CatalogSearchResult, CatalogVariant, callShopifyMcpTool(), rpcPayload(), rpcResponseSchema (+4 more)

### Community 57 - "config/types.ts"
Cohesion: 0.21
Nodes (12): Shop Agent boundaries, 3. Install next-intl and migrate copy, assertRequiredEnv(), resolveConfig(), withShopConfig(), NextConfigContext, NextConfigFactory, NextConfigInput (+4 more)

### Community 58 - "package.json"
Cohesion: 0.13
Nodes (14): tailwindcss@4.3.3, tw-animate-css@1.4.0, typescript@7.0.2, @vercel/analytics@2.0.1, engines, node, name, packageManager (+6 more)

### Community 59 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, babel-plugin-react-compiler@1.0.0, botid@1.5.12, cn@0.5.1, eve@0.87.0, lucide-react@1.65.0, next@16.4.3, react@19.3.1 (+7 more)

### Community 60 - "update-cart.ts"
Cohesion: 0.25
Nodes (11): cartHandlers, getCart(), getSessionCartId(), mutateCart(), CartChange, changeDiscountCodes(), changeLineOptions(), changeSchema (+3 more)

### Community 61 - "auth/server.ts"
Cohesion: 0.31
Nodes (13): Boundary rules, SendSignedInCustomerOn(), getHydrogenCustomerSession(), getCustomerAccessToken, getReadonlyCustomerSessionManager, getReadonlyRequestContext, getRequestedPath(), isCustomerLoggedIn (+5 more)

### Community 62 - "operations/pages/server.ts"
Cohesion: 0.23
Nodes (9): Keep the Shopify boundary explicit, ContentPage, SearchParamsInput, SEO, EMBED_DOMAINS, sanitizeShopifyHtml(), SHOPIFY_HTML_OPTIONS, fetchPage() (+1 more)

### Community 63 - "mobile-menu.tsx"
Cohesion: 0.38
Nodes (11): FaqPage(), MobileMenu(), MobileMenuList(), NestedItems(), FIXED_PANELS, ProductAccordions(), Accordion(), AccordionContent() (+3 more)

### Community 64 - "Enable Shopify Menus"
Cohesion: 0.17
Nodes (12): 1. Add the menu operation, 1. Which menus do you want to fetch from Shopify?, 2. Cache the menu, 2. What are the Shopify menu handles?, 3. Refresh menus after edits, 4. Wire the nav menu, 5. Wire the footer menu, Before you start (+4 more)

### Community 65 - "storefront/server.ts"
Cohesion: 0.22
Nodes (11): Documents, CommerceLocale, fetchLocalizationCurrency(), GET_LOCALIZATION_CURRENCY_QUERY, createRequestStorefrontClient(), customFetchApi(), getClient(), operationName() (+3 more)

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
Cohesion: 0.32
Nodes (9): AddressesContent(), AddressesPage(), AddressesSkeleton(), ProfileContent(), ProfilePage(), ProfileSkeleton(), AccountPageHeader(), fetchCustomerAddresses() (+1 more)

### Community 70 - "collection-browse-provider.tsx"
Cohesion: 0.24
Nodes (10): BrowsePublicationContext, BrowsePublicationStore, BrowseStore(), BrowseStoreProps, CollectionBrowseFrame(), CollectionBrowseFrameProps, CollectionBrowseProvider(), CollectionBrowseProviderProps (+2 more)

### Community 71 - "footer/index.tsx"
Cohesion: 0.24
Nodes (10): Footer(), FooterLink, FooterList(), QUICK_LINKS, TRUST, PLATFORM_LABELS, SocialIcon(), SocialLink (+2 more)

### Community 72 - "audit-storefront.mjs"
Cohesion: 0.18
Nodes (6): files, findings, root, sharedLinkFiles, sourceRoots, walk()

### Community 73 - "sort-select.tsx"
Cohesion: 0.33
Nodes (8): CollectionsSortSelect(), SORT_LABELS, SelectContent(), SelectItem(), SelectScrollDownButton(), SelectScrollUpButton(), SelectTrigger(), SORT_VALUES

### Community 74 - "bundle-components.tsx"
Cohesion: 0.29
Nodes (10): BundleComponents(), BundleComponentsProps, BundleListItem, BundleParents(), BundleParentsProps, BundleProductList(), BundleProductListProps, BundleRelationships() (+2 more)

### Community 75 - "Vercel Shop GraphQL Integration Reference"
Cohesion: 0.20
Nodes (9): Choose cache behavior from the consumer, Completion checklist, Data flow, Deployment context versus copy locale, Invalidation, Key Vercel Shop files, Operation integration, Ownership boundary (+1 more)

### Community 76 - "getNumericShopifyId"
Cohesion: 0.29
Nodes (6): isAuthorized(), POST(), REVALIDATE_TAGS, POST(), verifyWebhook(), getNumericShopifyId()

### Community 77 - "google-reviews.tsx"
Cohesion: 0.24
Nodes (5): GoogleG(), Stars(), ReviewCarousel(), GOOGLE_REVIEWS, GoogleReview

### Community 78 - "cart.tsx"
Cohesion: 0.36
Nodes (7): CartIcon(), CartIconClient(), CartIconClientProps, prepareCheckoutAction(), handleCheckout(), getCart(), withFallback()

### Community 79 - "lib/customer/types.ts"
Cohesion: 0.27
Nodes (8): AccountActionResult, CustomerAddress, CustomerAddressInput, CustomerOrder, CustomerOrdersPage, CustomerOrderSummary, CustomerProfile, PageInfo

### Community 80 - "fetchSearchIndexProducts"
Cohesion: 0.31
Nodes (9): fetchSearchResults(), buildSearchQuery(), fetchCollectionProducts(), fetchSearchFacets(), fetchSearchIndexProducts(), toCollectionSort(), toSearchSort(), toStorefrontFilters() (+1 more)

### Community 81 - "operations/policies/server.ts"
Cohesion: 0.33
Nodes (5): ShopPolicy, SHOP_POLICY_FRAGMENT, fetchPolicyAnswers(), GET_SHOP_POLICIES_QUERY, POLICY_TYPES

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
Cohesion: 0.57
Nodes (5): Navigation, NavAccount(), NavAccountFallback(), Nav(), modelDisplayName()

### Community 91 - "Vercel Shop"
Cohesion: 0.29
Nodes (6): Documentation, Features, Getting Started, License, Skills, Vercel Shop

### Community 92 - "Product Detail Route Architecture"
Cohesion: 0.33
Nodes (5): Primary media, Product Detail Route Architecture, Recommendations and secondary content, Reference implementation, Variant interaction

### Community 93 - "cart/page.tsx"
Cohesion: 0.47
Nodes (4): CartPage(), CartViewedTracker(), isAnalyticsCart(), CartPageSkeleton()

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

## Knowledge Gaps
- **3 isolated node(s):** `npx`, `@shopify/dev-mcp`, `OPT_OUT_INSTRUMENTATION`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 559 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filters-client.tsx`, `search/page.tsx`, `product/server.ts`, `app/layout.tsx`, `shopping-results.tsx`, `@shopify/hydrogen`, `Link`, `product-detail-section.tsx`, `customer/server.ts`, `lib/product/index.ts`, `next`, `collection-page.tsx`, `lib/product/types.ts`, `quick-shop.tsx`, `product-media.tsx`, `agent-panel.tsx`, `search-modal.tsx`, `collections/index.ts`, `link.tsx`, `[id]/page.tsx`, `Skeleton`, `gift-card-purchase-form.tsx`, `browse.tsx`, `cart/server.ts`, `[slug]/page.tsx`, `address-book.tsx`, `cart-bridge.tsx`, `lucide-react`, `bottom-bar.tsx`, `product-info.tsx`, `package.json`, `dependencies`, `auth/server.ts`, `mobile-menu.tsx`, `mega-panel.tsx`, `addresses/page.tsx`, `collection-browse-provider.tsx`, `sort-select.tsx`, `google-reviews.tsx`, `input-group.tsx`, `nav/index.tsx`, `cart/page.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `Link()` (e.g. with `Next.js layer` and `Prefetch traffic`) actually correct?**
  _`Link()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `npx`, `@shopify/dev-mcp`, `OPT_OUT_INSTRUMENTATION` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filters-client.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.060814383923849816 - nodes in this community are weakly interconnected._
- **Why does `@shopify/hydrogen` connect `@shopify/hydrogen` to `filters-client.tsx`, `product/server.ts`, `app/layout.tsx`, `[shard]/route.ts`, `representation/index.ts`, `Link`, `customer/server.ts`, `lib/product/index.ts`, `lib/product/types.ts`, `errors/server.ts`, `quick-shop.tsx`, `lib/collections/server.ts`, `proxy.ts`, `blogs/server.ts`, `search-modal.tsx`, `transforms/product/index.ts`, `transforms/product/types.ts`, `products/server.ts`, `collections/index.ts`, `catalog.ts`, `cart/server.ts`, `bottom-bar.tsx`, `money/index.ts`, `config/types.ts`, `package.json`, `dependencies`, `update-cart.ts`, `auth/server.ts`, `operations/pages/server.ts`, `storefront/server.ts`, `collection-browse-provider.tsx`, `sort-select.tsx`, `lib/customer/types.ts`, `operations/policies/server.ts`, `nav/index.tsx`, `eve.ts`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.10106382978723404 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `react`, `search/page.tsx`, `product/server.ts`, `app/layout.tsx`, `[shard]/route.ts`, `shopping-results.tsx`, `@shopify/hydrogen`, `Link`, `product-detail-section.tsx`, `lib/product/index.ts`, `collection-page.tsx`, `collections/[handle]/page.tsx`, `quick-shop.tsx`, `lib/collections/server.ts`, `product-media.tsx`, `proxy.ts`, `agent-panel.tsx`, `blogs/server.ts`, `search-modal.tsx`, `link.tsx`, `[id]/page.tsx`, `Skeleton`, `customer/action.ts`, `cart/server.ts`, `[slug]/page.tsx`, `lucide-react`, `bottom-bar.tsx`, `product-info.tsx`, `config/types.ts`, `package.json`, `dependencies`, `auth/server.ts`, `operations/pages/server.ts`, `mega-panel.tsx`, `collection-browse-provider.tsx`, `footer/index.tsx`, `bundle-components.tsx`, `getNumericShopifyId`, `nav/index.tsx`, `cart/page.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._