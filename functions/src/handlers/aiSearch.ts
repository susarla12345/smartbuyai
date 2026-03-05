import type { Request, Response } from 'express';
import { parseSearchQuery } from '../services/openai';
import { searchProducts } from '../services/productSearch';
import { getCachedResults, setCachedResults } from '../services/cache';

export async function aiSearchHandler(req: Request, res: Response): Promise<void> {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Query parameter is required',
        statusCode: 400,
      });
      return;
    }

    const trimmedQuery = query.trim();

    const cached = await getCachedResults(trimmedQuery);
    if (cached) {
      res.json({
        parsedQuery: cached.parsedQuery,
        results: cached.results,
        cached: true,
      });
      return;
    }

    const parsedQuery = await parseSearchQuery(trimmedQuery);
    const results = await searchProducts(parsedQuery);

    if (results.length > 0) {
      await setCachedResults(trimmedQuery, parsedQuery, results).catch((err) =>
        console.error('Failed to cache results:', err),
      );
    }

    res.json({
      parsedQuery,
      results,
      cached: false,
    });
  } catch (error) {
    console.error('AI Search error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({
      error: 'Internal Server Error',
      message,
      statusCode: 500,
    });
  }
}
