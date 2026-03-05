import { memo } from 'react';
import type { SearchResultItem } from '@shared/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: SearchResultItem[];
  onViewDetails: (productId: string) => void;
}

export const ProductGrid = memo(function ProductGrid({
  products,
  onViewDetails,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">No products found matching your filters.</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard
          key={`${product.productId}-${product.store}`}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
});
