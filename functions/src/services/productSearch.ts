import * as admin from 'firebase-admin';
import type { ParsedSearchQuery, SearchResultItem, Store } from '@shared/types';
import { generateCuelinksUrl } from './cuelinks';

export async function searchProducts(
  parsedQuery: ParsedSearchQuery,
): Promise<SearchResultItem[]> {
  const db = admin.firestore();

  let productsRef: admin.firestore.Query = db.collection('products');

  if (parsedQuery.category && parsedQuery.category !== 'general') {
    productsRef = productsRef.where('category', '==', parsedQuery.category);
  }

  if (parsedQuery.brand) {
    productsRef = productsRef.where('brand', '==', parsedQuery.brand);
  }

  const productsSnap = await productsRef.limit(50).get();

  if (productsSnap.empty) {
    return [];
  }

  const productIds = productsSnap.docs.map((doc) => doc.id);
  const results: SearchResultItem[] = [];

  const batchSize = 10;
  for (let i = 0; i < productIds.length; i += batchSize) {
    const batch = productIds.slice(i, i + batchSize);
    const pricesSnap = await db
      .collection('prices')
      .where('productId', 'in', batch)
      .get();

    for (const priceDoc of pricesSnap.docs) {
      const price = priceDoc.data();
      const productDoc = productsSnap.docs.find((d) => d.id === price.productId);
      if (!productDoc) continue;

      const product = productDoc.data();
      const priceValue = price.price as number;

      if (parsedQuery.minPrice && priceValue < parsedQuery.minPrice) continue;
      if (parsedQuery.maxPrice && priceValue > parsedQuery.maxPrice) continue;

      const affiliateUrl = generateCuelinksUrl(
        price.affiliateUrl ?? price.url ?? '',
        price.store as Store,
      );

      results.push({
        productId: productDoc.id,
        title: product.title,
        image: product.image,
        brand: product.brand,
        category: product.category,
        description: product.description ?? undefined,
        store: price.store as Store,
        price: priceValue,
        originalPrice: price.originalPrice ?? undefined,
        rating: price.rating ?? undefined,
        reviewCount: price.reviewCount ?? undefined,
        affiliateUrl,
        inStock: price.inStock !== false,
      });
    }
  }

  switch (parsedQuery.sortBy) {
    case 'price_low':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    default:
      break;
  }

  return results;
}
