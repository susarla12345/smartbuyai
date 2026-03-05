"use strict";
// ─── Firestore Document Types ───
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FILTERS = exports.SORT_OPTIONS = exports.STORE_LABELS = void 0;
exports.STORE_LABELS = {
    amazon: 'Amazon',
    flipkart: 'Flipkart',
    myntra: 'Myntra',
    ajio: 'AJIO',
    croma: 'Croma',
    reliance_digital: 'Reliance Digital',
};
exports.SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popularity', label: 'Most Popular' },
];
exports.DEFAULT_FILTERS = {
    priceRange: [0, 500000],
    brands: [],
    stores: [],
    sortBy: 'relevance',
};
//# sourceMappingURL=index.js.map