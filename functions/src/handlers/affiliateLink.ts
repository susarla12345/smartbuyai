import type { Request, Response } from 'express';
import { generateCuelinksUrl } from '../services/cuelinks';
import type { Store } from '@shared/types';

export async function generateAffiliateLinkHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { url, store } = req.body;

    if (!url || typeof url !== 'string') {
      res.status(400).json({
        error: 'Bad Request',
        message: 'URL parameter is required',
        statusCode: 400,
      });
      return;
    }

    const affiliateUrl = generateCuelinksUrl(url, store as Store | undefined);

    res.json({
      affiliateUrl,
      originalUrl: url,
    });
  } catch (error) {
    console.error('Affiliate link error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({
      error: 'Internal Server Error',
      message,
      statusCode: 500,
    });
  }
}
