import type { TrendingSearch } from '@shared/types';

export const TRENDING_SEARCHES: TrendingSearch[] = [
  { query: 'best laptop under 50000', icon: '💻', category: 'Electronics' },
  { query: 'best wireless earbuds under 3000', icon: '🎧', category: 'Audio' },
  { query: 'best smartphone under 20000', icon: '📱', category: 'Mobiles' },
  { query: 'running shoes for men under 5000', icon: '👟', category: 'Footwear' },
  { query: 'best smartwatch under 10000', icon: '⌚', category: 'Wearables' },
  { query: 'best gaming mouse under 2000', icon: '🖱️', category: 'Accessories' },
  { query: 'best air purifier under 15000', icon: '🌬️', category: 'Home' },
  { query: 'best mechanical keyboard under 5000', icon: '⌨️', category: 'Accessories' },
];

export const SEARCH_PLACEHOLDER = "Search products like 'best laptop under 80000'";
