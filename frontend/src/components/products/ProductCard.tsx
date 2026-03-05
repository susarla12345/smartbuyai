import { memo, useCallback } from 'react';
import { Star, ExternalLink, Tag } from 'lucide-react';
import type { SearchResultItem } from '@shared/types';
import { STORE_LABELS } from '@/constants/shared';
import { formatPrice, calculateDiscount, truncateText } from '@/utils/format';
import { STORE_COLORS } from '@/constants/stores';

interface ProductCardProps {
  product: SearchResultItem;
  onViewDetails: (productId: string) => void;
}

export const ProductCard = memo(function ProductCard({
  product,
  onViewDetails,
}: ProductCardProps) {
  const discount = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : 0;

  const storeColor = STORE_COLORS[product.store] ?? '#6b7280';

  const handleViewDeal = useCallback(() => {
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
  }, [product.affiliateUrl]);

  const handleDetails = useCallback(() => {
    onViewDetails(product.productId);
  }, [product.productId, onViewDetails]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group animate-fade-in">
      <div
        className="relative aspect-square bg-gray-50 overflow-hidden cursor-pointer"
        onClick={handleDetails}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg">
            <Tag className="w-3 h-3" />
            {discount}% OFF
          </span>
        )}
        <span
          className="absolute top-3 right-3 px-2.5 py-1 text-white text-xs font-semibold rounded-lg"
          style={{ backgroundColor: storeColor }}
        >
          {STORE_LABELS[product.store]}
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3
          className="text-sm font-semibold text-gray-800 mb-2 cursor-pointer hover:text-primary-600 transition-colors leading-snug"
          onClick={handleDetails}
          title={product.title}
        >
          {truncateText(product.title, 60)}
        </h3>

        {product.rating != null && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-green-50 rounded">
              <Star className="w-3 h-3 text-green-600 fill-green-600" />
              <span className="text-xs font-semibold text-green-700">
                {product.rating.toFixed(1)}
              </span>
            </div>
            {product.reviewCount != null && (
              <span className="text-xs text-gray-400">
                ({product.reviewCount.toLocaleString('en-IN')} reviews)
              </span>
            )}
          </div>
        )}

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          onClick={handleViewDeal}
          className="
            w-full flex items-center justify-center gap-2
            py-2.5 px-4 rounded-xl text-sm font-semibold
            bg-gradient-to-r from-primary-500 to-primary-600
            hover:from-primary-600 hover:to-primary-700
            text-white shadow-sm hover:shadow transition-all duration-200
          "
        >
          View Deal
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
});
