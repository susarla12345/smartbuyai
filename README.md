# SmartBuyAI

AI-powered product discovery and price comparison for Indian e-commerce — Amazon, Flipkart, Myntra, and more.

## Architecture

```
/smartbuyai
├── frontend/          React + Vite + TailwindCSS
├── functions/         Firebase Cloud Functions (Express)
├── shared/            Shared TypeScript types
├── firebase.json      Firebase configuration
├── firestore.rules    Firestore security rules
└── firestore.indexes.json
```

## Tech Stack

| Layer     | Technology                            |
| --------- | ------------------------------------- |
| Frontend  | React 19, TypeScript, Vite, Tailwind  |
| State     | Redux Toolkit + RTK Query             |
| Backend   | Firebase Cloud Functions (Node 20)    |
| AI        | OpenAI GPT-4o-mini                    |
| Database  | Cloud Firestore                       |
| Hosting   | Firebase Hosting                      |
| Affiliate | Cuelinks                              |

## Prerequisites

- Node.js 20+
- npm 10+
- Firebase CLI (`npm install -g firebase-tools`)
- OpenAI API key
- Cuelinks API key

## Setup

### 1. Clone and install

```bash
# Install frontend dependencies
cd frontend && npm install

# Install functions dependencies
cd ../functions && npm install
```

### 2. Configure environment

Set secrets for Firebase Cloud Functions:

```bash
firebase functions:secrets:set OPENAI_API_KEY
firebase functions:secrets:set CUELINKS_API_KEY
```

For local development, create `functions/.env`:

```
OPENAI_API_KEY=sk-your-key
CUELINKS_API_KEY=your-key
```

### 3. Seed Firestore (optional, for initial data)

```bash
cd functions
npx ts-node --project tsconfig.json src/scripts/seedFirestore.ts
```

### 4. Run locally

```bash
# Terminal 1: Start Firebase emulators
firebase emulators:start

# Terminal 2: Start frontend dev server
cd frontend && npm run dev
```

The app will be at `http://localhost:3000` with the API proxied to the emulators.

## API Endpoints

### POST /api/ai-search

Parse a natural language query and return product results.

```json
// Request
{ "query": "best gaming laptop under 1 lakh" }

// Response
{
  "parsedQuery": {
    "category": "laptop",
    "keywords": "gaming laptop",
    "maxPrice": 100000,
    "sortBy": "rating"
  },
  "results": [ ... ],
  "cached": false
}
```

### GET /api/products

Fetch products with structured filters.

```
GET /api/products?category=laptop&maxPrice=100000&sortBy=rating&page=1&limit=20
```

### POST /api/generate-affiliate-link

Convert a merchant URL to a Cuelinks affiliate URL.

```json
// Request
{ "url": "https://www.amazon.in/dp/B0123", "store": "amazon" }

// Response
{
  "affiliateUrl": "https://linksredirect.com/?cuel=xxx&url=...",
  "originalUrl": "https://www.amazon.in/dp/B0123"
}
```

## Firestore Collections

### `products`
| Field       | Type   |
| ----------- | ------ |
| title       | string |
| image       | string |
| brand       | string |
| category    | string |
| description | string |
| createdAt   | string |

### `prices`
| Field         | Type    |
| ------------- | ------- |
| productId     | string  |
| store         | string  |
| price         | number  |
| originalPrice | number  |
| affiliateUrl  | string  |
| rating        | number  |
| reviewCount   | number  |
| inStock       | boolean |
| updatedAt     | string  |

### `search_cache`
| Field       | Type   |
| ----------- | ------ |
| query       | string |
| parsedQuery | map    |
| results     | array  |
| createdAt   | string |
| expiresAt   | string |

## Deploy

```bash
# Build frontend
cd frontend && npm run build

# Deploy everything
firebase deploy

# Or deploy individually
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

The app will be live at your Firebase Hosting URL and can be connected to `smartbuyai.co.in` via Firebase Hosting custom domain settings.

## Cache Strategy

1. User submits a search query
2. Cloud Function checks `search_cache` collection for a matching non-expired entry
3. If cached — returns results immediately (cache TTL: 6 hours)
4. If not cached — calls OpenAI to parse intent, queries Firestore for products, stores result in cache, returns to client
