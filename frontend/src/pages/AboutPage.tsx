import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Search } from 'lucide-react';

const FEATURES = [
  {
    icon: Search,
    title: 'AI-Powered Search',
    description:
      'Our intelligent search engine understands natural language queries and finds the best products across multiple stores.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Comparisons',
    description:
      'We aggregate prices from top retailers so you can compare and find the best deal — all in one place.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Get instant results powered by cutting-edge AI, saving you hours of manual searching.',
  },
] as const;

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About SmartBuyAI</h1>

      <p className="text-lg text-gray-600 mb-8">
        SmartBuyAI is an AI-powered product discovery platform that helps you
        find the best deals across the internet. We compare prices, reviews, and
        availability from multiple retailers so you can make smarter purchasing
        decisions — faster.
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">What We Do</h2>

      <div className="grid gap-6 mb-12">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm"
          >
            <div className="w-10 h-10 shrink-0 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>

      <p className="text-gray-600 mb-6">
        We believe online shopping should be simple, transparent, and fair. Our
        mission is to empower consumers with the information they need to make
        the best purchase decisions, while connecting them with trusted
        retailers.
      </p>

      <p className="text-gray-600 mb-8">
        SmartBuyAI may earn a commission when you purchase through links on our
        site. This helps us keep the service free and does not affect the price
        you pay.
      </p>

      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
      >
        Get in Touch
      </Link>
    </div>
  );
}
