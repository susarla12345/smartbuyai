import { useState, useCallback, type FormEvent, type KeyboardEvent } from 'react';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import { SEARCH_PLACEHOLDER } from '@/constants/trending';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  initialValue?: string;
  variant?: 'hero' | 'compact';
}

export function SearchBar({
  onSearch,
  isLoading = false,
  initialValue = '',
  variant = 'hero',
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed && !isLoading) {
        onSearch(trimmed);
      }
    },
    [value, isLoading, onSearch],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const trimmed = value.trim();
        if (trimmed && !isLoading) {
          onSearch(trimmed);
        }
      }
    },
    [value, isLoading, onSearch],
  );

  const isHero = variant === 'hero';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`
          relative flex items-center bg-white border border-gray-200 
          shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-primary-300
          transition-all duration-200
          ${isHero ? 'rounded-2xl p-2' : 'rounded-xl p-1.5'}
        `}
      >
        <Search
          className={`
            text-gray-400 flex-shrink-0
            ${isHero ? 'w-5 h-5 ml-4' : 'w-4 h-4 ml-3'}
          `}
        />
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={SEARCH_PLACEHOLDER}
          rows={1}
          className={`
            flex-1 resize-none border-none outline-none bg-transparent
            text-gray-900 placeholder:text-gray-400
            ${isHero ? 'text-lg px-4 py-3' : 'text-sm px-3 py-2'}
          `}
        />
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className={`
            flex-shrink-0 flex items-center justify-center
            bg-gradient-to-r from-primary-500 to-primary-600
            hover:from-primary-600 hover:to-primary-700
            disabled:from-gray-300 disabled:to-gray-300
            text-white transition-all duration-200
            ${isHero ? 'rounded-xl w-12 h-12 mr-1' : 'rounded-lg w-9 h-9 mr-0.5'}
          `}
        >
          {isLoading ? (
            <Loader2 className={`animate-spin ${isHero ? 'w-5 h-5' : 'w-4 h-4'}`} />
          ) : (
            <ArrowRight className={isHero ? 'w-5 h-5' : 'w-4 h-4'} />
          )}
        </button>
      </div>
    </form>
  );
}
