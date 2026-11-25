import { Link } from "@/components/ui/link";
import { buildProductUrl } from "@/lib/product";
import type { ProductCard as ProductCardType } from "@/lib/product/types";

import {
  ProductCardContent,
  ProductCardImageContainer,
  ProductCardPrice,
  ProductCard as ProductCardRoot,
  ProductCardSkeleton,
  ProductCardTitle,
} from "./components";
import { ProductImageCarousel } from "./image-carousel";
import { QuickShop } from "./quick-shop";
import { ProductCardRating } from "./rating";

export interface ProductCardProps {
  loading?: "eager" | "lazy";
  outOfStockText?: string;
  product: ProductCardType;
  quickShopText?: string;
}

export function ProductCard({ loading, outOfStockText, product, quickShopText }: ProductCardProps) {
  const href = buildProductUrl(product.handle, product.defaultVariantSelectedOptions ?? []);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.featuredImage
        ? [product.featuredImage]
        : [];
  const alt = product.featuredImage?.altText || product.title;
  // The link is stretched rather than wrapping the card so Quick Shop isn't a button inside an anchor.
  return (
    <ProductCardRoot>
      <ProductCardImageContainer>
        <ProductImageCarousel
          alt={alt}
          images={images}
          loading={loading}
          outOfStock={!product.availableForSale}
          outOfStockText={outOfStockText}
        >
          {quickShopText && product.availableForSale && !product.isGiftCard ? (
            <QuickShop
              handle={product.handle}
              href={href}
              image={product.featuredImage?.url ?? null}
              label={quickShopText}
              title={product.title}
            />
          ) : null}
        </ProductImageCarousel>
        <ProductCardContent>
          <ProductCardRating productId={product.id} />
          <ProductCardTitle>
            <Link href={href} className="after:absolute after:inset-0">
              {product.title}
            </Link>
          </ProductCardTitle>
          <ProductCardPrice
            amount={product.price.amount}
            currencyCode={product.price.currencyCode}
            maxAmount={product.maxPrice.amount}
            compareAtAmount={product.compareAtPrice?.amount}
            compareAtCurrencyCode={product.compareAtPrice?.currencyCode}
          />
        </ProductCardContent>
      </ProductCardImageContainer>
    </ProductCardRoot>
  );
}

export { ProductCardSkeleton };
