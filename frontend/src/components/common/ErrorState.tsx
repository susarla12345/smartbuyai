import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
        <AlertCircle className="w-7 h-7 text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
      <p className="text-sm text-gray-400 text-center max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="
            flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
            bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors
          "
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
