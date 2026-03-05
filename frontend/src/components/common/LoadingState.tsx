import { Loader2, Sparkles } from 'lucide-react';

interface LoadingStateProps {
  query: string;
}

export function LoadingState({ query }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-primary-500 animate-pulse-soft" />
        </div>
        <Loader2 className="absolute -top-2 -right-2 w-6 h-6 text-primary-500 animate-spin" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Searching with AI
      </h3>
      <p className="text-sm text-gray-400 text-center max-w-md">
        Analyzing your query <span className="font-medium text-gray-600">"{query}"</span> and
        comparing prices across stores...
      </p>
    </div>
  );
}
