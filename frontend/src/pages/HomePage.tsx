import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { TrendingSearches } from '@/components/search/TrendingSearches';
import { STORE_COLORS } from '@/constants/stores';
import type { Store } from '@shared/types';

const FEATURED_STORES: { name: string; key: Store }[] = [
  { name: 'Amazon', key: 'amazon' },
  { name: 'Flipkart', key: 'flipkart' },
  { name: 'Myntra', key: 'myntra' },
  { name: 'Ajio', key: 'ajio' },
  { name: 'Croma', key: 'croma' },
  { name: 'Reliance Digital', key: 'reliance_digital' },
];

export function HomePage() {
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (query: string) => {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    },
    [navigate],
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="w-full max-w-2xl -mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-primary-600">
              AI-Powered Product Discovery
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Find the{' '}
            <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              best deals
            </span>{' '}
            across India
          </h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto">
            Find the best products across Amazon, Flipkart, Myntra and more
            using AI search. Compare prices, read reviews, and shop smarter.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} variant="hero" />

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
            Comparing prices across
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {FEATURED_STORES.map(({ name, key }) => (
              <span
                key={key}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: STORE_COLORS[key] }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <TrendingSearches onSelect={handleSearch} />
      </div>
    </div>
  );
}
