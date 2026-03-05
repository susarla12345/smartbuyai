// ─── Firestore Document Types ───

export interface Product {
  id: string;
  title: string;
  image: string;
  brand: string;
  category: string;
  description?: string;
  createdAt: string;
}

export interface Price {
  id: string;
  productId: string;
  store: Store;
  price: number;
  originalPrice?: number;
  affiliateUrl: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  updatedAt: string;
}

export interface SearchCache {
  id: string;
  query: string;
  parsedQuery: ParsedSearchQuery;
  results: SearchResultItem[];
  createdAt: string;
  expiresAt: string;
}

// ─── Search Types ───

export interface ParsedSearchQuery {
  category: string;
  keywords: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sortBy: SortOption;
}

export interface SearchResultItem {
  productId: string;
  title: string;
  image: string;
  brand: string;
  category: string;
  description?: string;
  store: Store;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  affiliateUrl: string;
  inStock: boolean;
}

// ─── API Request / Response Types ───

export interface AISearchRequest {
  query: string;
}

export interface AISearchResponse {
  parsedQuery: ParsedSearchQuery;
  results: SearchResultItem[];
  cached: boolean;
}

export interface ProductsQueryParams {
  category?: string;
  keywords?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  store?: Store;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  results: SearchResultItem[];
  total: number;
  page: number;
  limit: number;
}

export interface GenerateAffiliateLinkRequest {
  url: string;
  store: Store;
}

export interface GenerateAffiliateLinkResponse {
  affiliateUrl: string;
  originalUrl: string;
}

export interface APIError {
  error: string;
  message: string;
  statusCode: number;
}

// ─── Enums / Unions ───

export type Store = 'amazon' | 'flipkart' | 'myntra' | 'ajio' | 'croma' | 'reliance_digital';

export type SortOption = 'relevance' | 'price_low' | 'price_high' | 'rating' | 'popularity';

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

// ─── Filter Types ───

export interface SearchFilters {
  priceRange: [number, number];
  brands: string[];
  stores: Store[];
  sortBy: SortOption;
}

export const DEFAULT_FILTERS: SearchFilters = {
  priceRange: [0, 500000],
  brands: [],
  stores: [],
  sortBy: 'relevance',
};

// ─── Trending Searches ───

export interface TrendingSearch {
  query: string;
  icon: string;
  category: string;
}
