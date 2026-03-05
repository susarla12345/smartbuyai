import type { Store, SortOption, SearchFilters } from '@shared/types';

export const STORE_LABELS: Record<Store, string> = {
  amazon: 'Amazon',
  flipkart: 'Flipkart',
  myntra: 'Myntra',
  ajio: 'AJIO',
  croma: 'Croma',
  reliance_digital: 'Reliance Digital',
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popularity', label: 'Most Popular' },
];

export const DEFAULT_FILTERS: SearchFilters = {
  priceRange: [0, 500000],
  brands: [],
  stores: [],
  sortBy: 'relevance',
};
