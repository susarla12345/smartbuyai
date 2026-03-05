import { memo } from 'react';
import { TrendingUp } from 'lucide-react';
import { TRENDING_SEARCHES } from '@/constants/trending';

interface TrendingSearchesProps {
  onSelect: (query: string) => void;
}

export const TrendingSearches = memo(function TrendingSearches({
  onSelect,
}: TrendingSearchesProps) {
  return (
    <div className="mt-10 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-primary-500" />
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Trending Searches
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {TRENDING_SEARCHES.map((item) => (
          <button
            key={item.query}
            onClick={() => onSelect(item.query)}
            className="
              flex items-center gap-2 px-4 py-2.5
              bg-white border border-gray-200 rounded-full
              text-sm text-gray-700 hover:text-primary-600
              hover:border-primary-200 hover:bg-primary-50
              shadow-sm hover:shadow transition-all duration-200
            "
          >
            <span>{item.icon}</span>
            <span>{item.query}</span>
          </button>
        ))}
      </div>
    </div>
  );
});
