import { memo, useCallback, useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { SearchFilters as SearchFiltersType, Store } from '@shared/types';
import { STORE_LABELS, SORT_OPTIONS } from '@/constants/shared';
import { formatPrice } from '@/utils/format';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  availableBrands: string[];
  availableStores: Store[];
  onFiltersChange: (filters: Partial<SearchFiltersType>) => void;
  onReset: () => void;
  resultCount: number;
}

export const SearchFiltersPanel = memo(function SearchFiltersPanel({
  filters,
  availableBrands,
  availableStores,
  onFiltersChange,
  onReset,
  resultCount,
}: SearchFiltersProps) {
  const hasActiveFilters = useMemo(
    () =>
      filters.brands.length > 0 ||
      filters.stores.length > 0 ||
      filters.priceRange[0] > 0 ||
      filters.priceRange[1] < 500000 ||
      filters.sortBy !== 'relevance',
    [filters],
  );

  const handleBrandToggle = useCallback(
    (brand: string) => {
      const brands = filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand];
      onFiltersChange({ brands });
    },
    [filters.brands, onFiltersChange],
  );

  const handleStoreToggle = useCallback(
    (store: Store) => {
      const stores = filters.stores.includes(store)
        ? filters.stores.filter((s) => s !== store)
        : [...filters.stores, store];
      onFiltersChange({ stores });
    },
    [filters.stores, onFiltersChange],
  );

  const handleMinPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value) || 0;
      onFiltersChange({ priceRange: [val, filters.priceRange[1]] });
    },
    [filters.priceRange, onFiltersChange],
  );

  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value) || 500000;
      onFiltersChange({ priceRange: [filters.priceRange[0], val] });
    },
    [filters.priceRange, onFiltersChange],
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFiltersChange({ sortBy: e.target.value as SearchFiltersType['sortBy'] });
    },
    [onFiltersChange],
  );

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary-500" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          )}
        </div>

        <p className="text-xs text-gray-400 mb-5">
          {resultCount} product{resultCount !== 1 ? 's' : ''} found
        </p>

        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-300 transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={handleMinPriceChange}
              placeholder="Min"
              min={0}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-300 transition-colors"
            />
            <span className="text-gray-300">–</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={handleMaxPriceChange}
              placeholder="Max"
              min={0}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-300 transition-colors"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {formatPrice(filters.priceRange[0])} – {formatPrice(filters.priceRange[1])}
          </p>
        </div>

        {availableStores.length > 0 && (
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Store
            </label>
            <div className="space-y-1.5">
              {availableStores.map((store) => (
                <label
                  key={store}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.stores.includes(store)}
                    onChange={() => handleStoreToggle(store)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {STORE_LABELS[store]}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {availableBrands.length > 0 && (
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Brand
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
});
