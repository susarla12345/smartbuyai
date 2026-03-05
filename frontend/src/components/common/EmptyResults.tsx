import { memo } from 'react';
import { SearchX, ArrowRight } from 'lucide-react';
import type { ParsedSearchQuery } from '@shared/types';
import { formatPrice } from '@/utils/format';

interface EmptyResultsProps {
  query: string;
  parsedQuery: ParsedSearchQuery | null;
  onNewSearch: (query: string) => void;
}

const SUGGESTIONS = [
  'best laptop under 50000',
  'wireless earbuds under 3000',
  'running shoes for men',
  'smartwatch under 10000',
];

export const EmptyResults = memo(function EmptyResults({
  query,
  parsedQuery,
  onNewSearch,
}: EmptyResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        <SearchX className="w-7 h-7 text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No products found for "{query}"
      </h3>

      {parsedQuery && (
        <div className="mt-2 mb-6 bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm max-w-md w-full">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            AI understood your search as
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg font-medium">
              {parsedQuery.keywords}
            </span>
            {parsedQuery.category && parsedQuery.category !== 'general' && (
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg">
                in {parsedQuery.category}
              </span>
            )}
            {parsedQuery.maxPrice && (
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg">
                under {formatPrice(parsedQuery.maxPrice)}
              </span>
            )}
            {parsedQuery.minPrice && (
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg">
                above {formatPrice(parsedQuery.minPrice)}
              </span>
            )}
            {parsedQuery.brand && (
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg">
                brand: {parsedQuery.brand}
              </span>
            )}
          </div>
        </div>
      )}

      <p className="text-sm text-gray-400 mb-8 text-center max-w-sm">
        We couldn't find matching products right now. Our catalog is growing — try one of
        these popular searches:
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onNewSearch(suggestion)}
            className="
              flex items-center gap-1.5 px-4 py-2 rounded-full
              bg-white border border-gray-200 text-sm text-gray-600
              hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50
              shadow-sm hover:shadow transition-all duration-200
            "
          >
            {suggestion}
            <ArrowRight className="w-3 h-3" />
          </button>
        ))}
      </div>
    </div>
  );
});
