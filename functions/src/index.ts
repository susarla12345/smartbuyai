import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';
import { aiSearchHandler } from './handlers/aiSearch';
import { productsHandler } from './handlers/products';
import { generateAffiliateLinkHandler } from './handlers/affiliateLink';

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post('/api/ai-search', aiSearchHandler);
app.get('/api/products', productsHandler);
app.post('/api/generate-affiliate-link', generateAffiliateLinkHandler);

export const api = onRequest(
  { region: 'asia-south1', memory: '512MiB', timeoutSeconds: 60, invoker: 'public' },
  app,
);
