import type { Request, Response } from 'express';
import { searchProducts } from '../services/productSearch';
import type { ParsedSearchQuery, SortOption } from '@shared/types';

export async function productsHandler(req: Request, res: Response): Promise<void> {
  try {
    const {
      category,
      keywords,
      minPrice,
      maxPrice,
      brand,
      sortBy,
      page = '1',
      limit = '20',
    } = req.query;

    const parsedQuery: ParsedSearchQuery = {
      category: (category as string) ?? 'general',
      keywords: (keywords as string) ?? '',
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      brand: (brand as string) ?? undefined,
      sortBy: ((sortBy as string) ?? 'relevance') as SortOption,
    };

    const allResults = await searchProducts(parsedQuery);

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const start = (pageNum - 1) * limitNum;
    const paginatedResults = allResults.slice(start, start + limitNum);

    res.json({
      results: paginatedResults,
      total: allResults.length,
      page: pageNum,
      limit: limitNum,
    });
  } catch (error) {
    console.error('Products handler error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({
      error: 'Internal Server Error',
      message,
      statusCode: 500,
    });
  }
}
