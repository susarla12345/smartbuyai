import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const FOOTER_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/contact', label: 'Contact' },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              SmartBuyAI
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {FOOTER_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SmartBuyAI. All rights reserved.
            We may earn a commission from affiliate links.
          </p>
        </div>
      </div>
    </footer>
  );
}
