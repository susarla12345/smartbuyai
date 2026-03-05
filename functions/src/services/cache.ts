import * as admin from 'firebase-admin';
import type { SearchResultItem, ParsedSearchQuery } from '@shared/types';

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

interface CacheEntry {
  query: string;
  parsedQuery: ParsedSearchQuery;
  results: SearchResultItem[];
  createdAt: string;
  expiresAt: string;
}

function normalizeQuery(query: string): string {
  return query.toLowerCase().trim().replace(/\s+/g, ' ');
}

export async function getCachedResults(
  query: string,
): Promise<{ parsedQuery: ParsedSearchQuery; results: SearchResultItem[] } | null> {
  const db = admin.firestore();
  const normalized = normalizeQuery(query);

  const snapshot = await db
    .collection('search_cache')
    .where('query', '==', normalized)
    .where('expiresAt', '>', new Date().toISOString())
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0].data() as CacheEntry;
  return {
    parsedQuery: doc.parsedQuery,
    results: doc.results,
  };
}

export async function setCachedResults(
  query: string,
  parsedQuery: ParsedSearchQuery,
  results: SearchResultItem[],
): Promise<void> {
  const db = admin.firestore();
  const normalized = normalizeQuery(query);
  const now = new Date();

  const entry: CacheEntry = {
    query: normalized,
    parsedQuery,
    results,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CACHE_TTL_MS).toISOString(),
  };

  await db.collection('search_cache').add(entry);
}
