import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config/env';
import type { ParsedSearchQuery } from '@shared/types';

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    client = new OpenAI({ apiKey: OPENAI_API_KEY.value() });
  }
  return client;
}

const SYSTEM_PROMPT = `You are a product search query parser for Indian e-commerce.
Given a natural language search query, extract structured search parameters.

Return ONLY valid JSON with these fields:
- category (string): product category (e.g., "laptop", "smartphone", "earbuds", "shoes", "watch")
- keywords (string): refined search keywords
- minPrice (number | null): minimum price in INR
- maxPrice (number | null): maximum price in INR  
- brand (string | null): specific brand if mentioned
- sortBy (string): one of "relevance", "price_low", "price_high", "rating", "popularity"

Price conversion rules:
- "under X" means maxPrice = X
- "above X" or "over X" means minPrice = X
- "between X and Y" means minPrice = X, maxPrice = Y
- "lakh" = 100000, "k" = 1000, "thousand" = 1000

Examples:
"best gaming laptop under 1 lakh" → {"category":"laptop","keywords":"gaming laptop","minPrice":null,"maxPrice":100000,"brand":null,"sortBy":"rating"}
"Samsung phone between 15000 and 25000" → {"category":"smartphone","keywords":"Samsung phone","minPrice":15000,"maxPrice":25000,"brand":"Samsung","sortBy":"relevance"}`;

export async function parseSearchQuery(query: string): Promise<ParsedSearchQuery> {
  const openai = getClient();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: query },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.1,
    max_tokens: 200,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI returned empty response');
  }

  const parsed = JSON.parse(content);

  return {
    category: parsed.category ?? 'general',
    keywords: parsed.keywords ?? query,
    minPrice: parsed.minPrice ?? undefined,
    maxPrice: parsed.maxPrice ?? undefined,
    brand: parsed.brand ?? undefined,
    sortBy: parsed.sortBy ?? 'relevance',
  };
}
