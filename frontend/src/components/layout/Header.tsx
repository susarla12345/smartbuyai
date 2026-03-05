import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            SmartBuyAI
          </span>
        </Link>

        {!isHome && (
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              New Search
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
