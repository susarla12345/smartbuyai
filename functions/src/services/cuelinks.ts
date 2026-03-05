import { CUELINKS_API_KEY } from '../config/env';
import type { Store } from '@shared/types';

const CUELINKS_BASE = 'https://linksredirect.com';

const STORE_SUBIDS: Record<Store, string> = {
  amazon: 'amazon_in',
  flipkart: 'flipkart',
  myntra: 'myntra',
  ajio: 'ajio',
  croma: 'croma',
  reliance_digital: 'reliance_digital',
};

export function generateCuelinksUrl(originalUrl: string, store?: Store): string {
  const apiKey = CUELINKS_API_KEY.value();
  if (!apiKey) {
    return originalUrl;
  }

  const encoded = encodeURIComponent(originalUrl);
  const subId = store ? STORE_SUBIDS[store] ?? '' : '';

  return `${CUELINKS_BASE}/?cuel=${apiKey}&url=${encoded}&subid=${subId}`;
}
