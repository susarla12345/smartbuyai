import { memo, useCallback, useEffect } from 'react';
import { X, Star, ExternalLink, Tag, ShoppingCart } from 'lucide-react';
import type { SearchResultItem } from '@shared/types';
import { STORE_LABELS } from '@/constants/shared';
import { formatPrice, calculateDiscount } from '@/utils/format';
import { STORE_COLORS } from '@/constants/stores';

interface ProductDetailModalProps {
  product: SearchResultItem;
  allPrices: SearchResultItem[];
  onClose: () => void;
}

export const ProductDetailModal = memo(function ProductDetailModal({
  product,
  allPrices,
  onClose,
}: ProductDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const discount = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : 0;

  const sortedPrices = [...allPrices].sort((a, b) => a.price - b.price);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-gray-900 truncate pr-4">
            {product.title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-72 object-contain"
              />
            </div>

            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                {product.brand}
              </p>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {product.description ?? product.title}
              </p>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {discount > 0 && (
                <div className="flex items-center gap-1 text-red-500 text-sm font-medium mb-4">
                  <Tag className="w-3.5 h-3.5" />
                  {discount}% off
                </div>
              )}

              {product.rating != null && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-lg">
                    <Star className="w-4 h-4 text-green-600 fill-green-600" />
                    <span className="text-sm font-semibold text-green-700">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  {product.reviewCount != null && (
                    <span className="text-sm text-gray-400">
                      {product.reviewCount.toLocaleString('en-IN')} reviews
                    </span>
                  )}
                </div>
              )}

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                  bg-gradient-to-r from-primary-500 to-primary-600
                  hover:from-primary-600 hover:to-primary-700
                  text-white shadow-md hover:shadow-lg transition-all duration-200
                "
              >
                <ShoppingCart className="w-4 h-4" />
                Buy on {STORE_LABELS[product.store]}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {sortedPrices.length > 1 && (
            <div className="mt-8">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Price Comparison Across Stores
              </h3>
              <div className="space-y-3">
                {sortedPrices.map((item) => {
                  const isLowest = item.price === sortedPrices[0].price;
                  const storeColor = STORE_COLORS[item.store] ?? '#6b7280';
                  return (
                    <div
                      key={`${item.productId}-${item.store}`}
                      className={`
                        flex items-center justify-between p-4 rounded-xl border transition-colors
                        ${isLowest ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: storeColor }}
                        />
                        <span className="font-medium text-gray-800">
                          {STORE_LABELS[item.store]}
                        </span>
                        {isLowest && (
                          <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                            LOWEST
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-900">
                          {formatPrice(item.price)}
                        </span>
                        <a
                          href={item.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold
                            bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors
                          "
                        >
                          View Deal
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
