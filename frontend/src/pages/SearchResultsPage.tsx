import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Store, SearchFilters as FiltersType } from '@shared/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setQuery,
  setResults,
  setFilters,
  resetFilters,
  setLoading,
  setError,
  setSelectedProduct,
} from '@/store/slices/searchSlice';
import { useAiSearchMutation } from '@/store/api/searchApi';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFiltersPanel } from '@/components/filters/SearchFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyResults } from '@/components/common/EmptyResults';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { query, parsedQuery, results, filteredResults, filters, isLoading, error, selectedProductId } =
    useAppSelector((state) => state.search);

  const [triggerSearch] = useAiSearchMutation();

  const urlQuery = searchParams.get('q') ?? '';

  const performSearch = useCallback(
    async (q: string) => {
      dispatch(setQuery(q));
      dispatch(setLoading(true));
      dispatch(resetFilters());
      try {
        const response = await triggerSearch({ query: q }).unwrap();
        dispatch(
          setResults({
            results: response.results,
            parsedQuery: response.parsedQuery,
          }),
        );
      } catch (err: unknown) {
        const message =
          err && typeof err === 'object' && 'data' in err
            ? String((err as { data: { message?: string } }).data?.message ?? 'Search failed')
            : 'An unexpected error occurred. Please try again.';
        dispatch(setError(message));
      }
    },
    [dispatch, triggerSearch],
  );

  useEffect(() => {
    if (urlQuery && urlQuery !== query) {
      performSearch(urlQuery);
    }
  }, [urlQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNewSearch = useCallback(
    (q: string) => {
      navigate(`/search?q=${encodeURIComponent(q)}`, { replace: true });
      performSearch(q);
    },
    [navigate, performSearch],
  );

  const handleFiltersChange = useCallback(
    (updated: Partial<FiltersType>) => {
      dispatch(setFilters(updated));
    },
    [dispatch],
  );

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handleViewDetails = useCallback(
    (productId: string) => {
      dispatch(setSelectedProduct(productId));
    },
    [dispatch],
  );

  const handleCloseModal = useCallback(() => {
    dispatch(setSelectedProduct(null));
  }, [dispatch]);

  const availableBrands = useMemo(() => {
    const brands = new Set(results.map((r) => r.brand));
    return Array.from(brands).sort();
  }, [results]);

  const availableStores = useMemo(() => {
    const stores = new Set(results.map((r) => r.store));
    return Array.from(stores) as Store[];
  }, [results]);

  const selectedProduct = useMemo(
    () => (selectedProductId ? results.find((r) => r.productId === selectedProductId) : null),
    [selectedProductId, results],
  );

  const pricesForSelected = useMemo(
    () =>
      selectedProduct
        ? results.filter(
            (r) =>
              r.title.toLowerCase() === selectedProduct.title.toLowerCase() ||
              r.productId === selectedProduct.productId,
          )
        : [],
    [selectedProduct, results],
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar
          onSearch={handleNewSearch}
          isLoading={isLoading}
          initialValue={urlQuery}
          variant="compact"
        />
      </div>

      {isLoading && <LoadingState query={urlQuery} />}

      {error && !isLoading && (
        <ErrorState message={error} onRetry={() => performSearch(urlQuery)} />
      )}

      {!isLoading && !error && results.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6">
          <SearchFiltersPanel
            filters={filters}
            availableBrands={availableBrands}
            availableStores={availableStores}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
            resultCount={filteredResults.length}
          />
          <div className="flex-1">
            <ProductGrid products={filteredResults} onViewDetails={handleViewDetails} />
          </div>
        </div>
      )}

      {!isLoading && !error && results.length === 0 && query && (
        <EmptyResults
          query={query}
          parsedQuery={parsedQuery}
          onNewSearch={handleNewSearch}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          allPrices={pricesForSelected}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
