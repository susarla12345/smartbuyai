import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  SearchResultItem,
  SearchFilters,
  ParsedSearchQuery,
} from '@shared/types';
import { DEFAULT_FILTERS } from '@/constants/shared';

interface SearchState {
  query: string;
  parsedQuery: ParsedSearchQuery | null;
  results: SearchResultItem[];
  filteredResults: SearchResultItem[];
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
  selectedProductId: string | null;
}

const initialState: SearchState = {
  query: '',
  parsedQuery: null,
  results: [],
  filteredResults: [],
  filters: DEFAULT_FILTERS,
  isLoading: false,
  error: null,
  selectedProductId: null,
};

function applyFilters(results: SearchResultItem[], filters: SearchFilters): SearchResultItem[] {
  let filtered = [...results];

  const [minPrice, maxPrice] = filters.priceRange;
  filtered = filtered.filter((r) => r.price >= minPrice && r.price <= maxPrice);

  if (filters.brands.length > 0) {
    filtered = filtered.filter((r) =>
      filters.brands.some((b) => r.brand.toLowerCase() === b.toLowerCase()),
    );
  }

  if (filters.stores.length > 0) {
    filtered = filtered.filter((r) => filters.stores.includes(r.store));
  }

  switch (filters.sortBy) {
    case 'price_low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    default:
      break;
  }

  return filtered;
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setResults(
      state,
      action: PayloadAction<{ results: SearchResultItem[]; parsedQuery: ParsedSearchQuery }>,
    ) {
      state.results = action.payload.results;
      state.parsedQuery = action.payload.parsedQuery;
      state.filteredResults = applyFilters(action.payload.results, state.filters);
      state.isLoading = false;
      state.error = null;
    },
    setFilters(state, action: PayloadAction<Partial<SearchFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredResults = applyFilters(state.results, state.filters);
    },
    resetFilters(state) {
      state.filters = DEFAULT_FILTERS;
      state.filteredResults = applyFilters(state.results, DEFAULT_FILTERS);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSelectedProduct(state, action: PayloadAction<string | null>) {
      state.selectedProductId = action.payload;
    },
    clearSearch(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setQuery,
  setResults,
  setFilters,
  resetFilters,
  setLoading,
  setError,
  setSelectedProduct,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
