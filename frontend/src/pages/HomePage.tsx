import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { TrendingSearches } from '@/components/search/TrendingSearches';

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
            Compare prices from Amazon, Flipkart, Myntra and more — powered by AI.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} variant="hero" />

        <TrendingSearches onSelect={handleSearch} />
      </div>
    </div>
  );
}
