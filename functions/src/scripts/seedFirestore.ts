/**
 * Firestore seeding script.
 *
 * Run with: npx ts-node --project tsconfig.json src/scripts/seedFirestore.ts
 *
 * This inserts sample product + price documents so the app has real data to
 * query during development.  Replace with your own scraped / API-sourced data
 * for production.
 */
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

interface SeedProduct {
  title: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  prices: {
    store: string;
    price: number;
    originalPrice?: number;
    url: string;
    rating?: number;
    reviewCount?: number;
    inStock: boolean;
  }[];
}

const products: SeedProduct[] = [
  {
    title: 'ASUS TUF Gaming F15 Core i5 12th Gen - 16 GB/512 GB SSD - RTX 3050',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/h/o/g/-original-imaghxqnbgmfmfnq.jpeg',
    brand: 'ASUS',
    category: 'laptop',
    description: 'ASUS TUF Gaming F15, 15.6" FHD 144Hz, Intel Core i5-12500H, 16GB DDR4, 512GB SSD, NVIDIA GeForce RTX 3050',
    prices: [
      { store: 'flipkart', price: 62990, originalPrice: 82990, url: 'https://www.flipkart.com/asus-tuf-gaming-f15', rating: 4.3, reviewCount: 2847, inStock: true },
      { store: 'amazon', price: 64990, originalPrice: 82990, url: 'https://www.amazon.in/dp/B0C5KXYZ12', rating: 4.2, reviewCount: 1956, inStock: true },
      { store: 'croma', price: 66990, originalPrice: 82990, url: 'https://www.croma.com/asus-tuf-gaming-f15', rating: 4.1, reviewCount: 342, inStock: true },
    ],
  },
  {
    title: 'HP Victus Gaming Laptop 15 Core i5 12th Gen - 16GB/512GB SSD - GTX 1650',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/b/a/i/-original-imaghxqnxe2zfwgm.jpeg',
    brand: 'HP',
    category: 'laptop',
    description: 'HP Victus Gaming 15, Intel Core i5-12450H, 16GB RAM, 512GB SSD, NVIDIA GTX 1650 4GB',
    prices: [
      { store: 'amazon', price: 52990, originalPrice: 72510, url: 'https://www.amazon.in/dp/B0BXYZ1234', rating: 4.1, reviewCount: 3421, inStock: true },
      { store: 'flipkart', price: 54490, originalPrice: 72510, url: 'https://www.flipkart.com/hp-victus-gaming', rating: 4.0, reviewCount: 4112, inStock: true },
      { store: 'reliance_digital', price: 55990, originalPrice: 72510, url: 'https://www.reliancedigital.in/hp-victus', rating: 4.0, reviewCount: 189, inStock: true },
    ],
  },
  {
    title: 'Lenovo IdeaPad Gaming 3 Ryzen 5 6600H - 16GB/512GB SSD - RTX 3050',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/computer/s/g/n/-original-imagr2fzpczvjknz.jpeg',
    brand: 'Lenovo',
    category: 'laptop',
    description: 'Lenovo IdeaPad Gaming 3, 15.6" FHD 120Hz, AMD Ryzen 5 6600H, 16GB DDR5, 512GB SSD, RTX 3050',
    prices: [
      { store: 'amazon', price: 58990, originalPrice: 81290, url: 'https://www.amazon.in/dp/B0CXYZ5678', rating: 4.2, reviewCount: 2134, inStock: true },
      { store: 'flipkart', price: 57490, originalPrice: 81290, url: 'https://www.flipkart.com/lenovo-ideapad-gaming-3', rating: 4.3, reviewCount: 3567, inStock: true },
    ],
  },
  {
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/z/b/j/-original-imaghxqnfzzyyhgz.jpeg',
    brand: 'Sony',
    category: 'headphones',
    description: 'Sony WH-1000XM5, Industry-leading noise cancellation, 30hr battery, Multipoint connection',
    prices: [
      { store: 'amazon', price: 26990, originalPrice: 34990, url: 'https://www.amazon.in/dp/B09XS7JWHH', rating: 4.6, reviewCount: 8934, inStock: true },
      { store: 'flipkart', price: 27490, originalPrice: 34990, url: 'https://www.flipkart.com/sony-wh-1000xm5', rating: 4.5, reviewCount: 5678, inStock: true },
      { store: 'croma', price: 28990, originalPrice: 34990, url: 'https://www.croma.com/sony-wh1000xm5', rating: 4.5, reviewCount: 1234, inStock: true },
    ],
  },
  {
    title: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256 GB)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/g/i/z/-original-imagxqfzwswjfgzr.jpeg',
    brand: 'Samsung',
    category: 'smartphone',
    description: 'Samsung Galaxy S24 Ultra, 6.8" QHD+ Dynamic AMOLED, Snapdragon 8 Gen 3, 200MP Camera, S Pen',
    prices: [
      { store: 'amazon', price: 129999, originalPrice: 139999, url: 'https://www.amazon.in/dp/B0CS5XYZ90', rating: 4.5, reviewCount: 12345, inStock: true },
      { store: 'flipkart', price: 127999, originalPrice: 139999, url: 'https://www.flipkart.com/samsung-galaxy-s24-ultra', rating: 4.4, reviewCount: 15678, inStock: true },
    ],
  },
  {
    title: 'Apple iPhone 15 (Black, 128 GB)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/2/m/o/-original-imagtc5fz9spysq8.jpeg',
    brand: 'Apple',
    category: 'smartphone',
    description: 'Apple iPhone 15, 6.1" Super Retina XDR, A16 Bionic, 48MP Camera, USB-C',
    prices: [
      { store: 'amazon', price: 69490, originalPrice: 79900, url: 'https://www.amazon.in/dp/B0CHX1W1XY', rating: 4.6, reviewCount: 23456, inStock: true },
      { store: 'flipkart', price: 68999, originalPrice: 79900, url: 'https://www.flipkart.com/apple-iphone-15', rating: 4.5, reviewCount: 34567, inStock: true },
      { store: 'croma', price: 71990, originalPrice: 79900, url: 'https://www.croma.com/apple-iphone-15', rating: 4.6, reviewCount: 4567, inStock: true },
    ],
  },
  {
    title: 'boAt Airdopes 141 TWS Earbuds with 42H Playtime',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/v/e/k/-original-imaggzd8npxgjgfg.jpeg',
    brand: 'boAt',
    category: 'earbuds',
    description: 'boAt Airdopes 141, Bluetooth 5.1, 42H Total Playtime, ENx Noise Cancellation, IPX4',
    prices: [
      { store: 'amazon', price: 1099, originalPrice: 4490, url: 'https://www.amazon.in/dp/B09TPF45XY', rating: 4.1, reviewCount: 156789, inStock: true },
      { store: 'flipkart', price: 1199, originalPrice: 4490, url: 'https://www.flipkart.com/boat-airdopes-141', rating: 4.0, reviewCount: 234567, inStock: true },
    ],
  },
  {
    title: 'Nike Air Zoom Pegasus 40 Running Shoes',
    image: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e3fd0d51-2a9e-4e2e-8a4e-1b4e1b0d4ed5/air-zoom-pegasus-40-road-running-shoes-zLlC6h.png',
    brand: 'Nike',
    category: 'shoes',
    description: 'Nike Air Zoom Pegasus 40, responsive cushioning, breathable mesh, road running shoes',
    prices: [
      { store: 'amazon', price: 8995, originalPrice: 11495, url: 'https://www.amazon.in/dp/B0BXZ12345', rating: 4.4, reviewCount: 2345, inStock: true },
      { store: 'myntra', price: 8695, originalPrice: 11495, url: 'https://www.myntra.com/nike-pegasus-40', rating: 4.3, reviewCount: 3456, inStock: true },
      { store: 'ajio', price: 9195, originalPrice: 11495, url: 'https://www.ajio.com/nike-pegasus-40', rating: 4.3, reviewCount: 567, inStock: true },
    ],
  },
  {
    title: 'Apple Watch Series 9 GPS 41mm - Midnight Aluminium',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/f/i/p/-original-imagsx4qk3xxmhfr.jpeg',
    brand: 'Apple',
    category: 'smartwatch',
    description: 'Apple Watch Series 9, GPS, 41mm, Always-On Retina Display, S9 SiP, Blood Oxygen, ECG',
    prices: [
      { store: 'amazon', price: 37900, originalPrice: 41900, url: 'https://www.amazon.in/dp/B0CHXYZ345', rating: 4.6, reviewCount: 5678, inStock: true },
      { store: 'flipkart', price: 38490, originalPrice: 41900, url: 'https://www.flipkart.com/apple-watch-series-9', rating: 4.5, reviewCount: 4567, inStock: true },
      { store: 'croma', price: 39990, originalPrice: 41900, url: 'https://www.croma.com/apple-watch-series-9', rating: 4.5, reviewCount: 890, inStock: true },
    ],
  },
  {
    title: 'Samsung 1.5 Ton 5 Star Inverter Split AC (2024 Model)',
    image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/air-conditioner-new/v/0/0/-original-imagtc2fuzrxhk8g.jpeg',
    brand: 'Samsung',
    category: 'air_conditioner',
    description: 'Samsung 1.5 Ton 5 Star Wind-Free Inverter Split AC, AI Auto Cooling, Convertible 5-in-1',
    prices: [
      { store: 'amazon', price: 42990, originalPrice: 66990, url: 'https://www.amazon.in/dp/B0CXZ67890', rating: 4.3, reviewCount: 3456, inStock: true },
      { store: 'flipkart', price: 41490, originalPrice: 66990, url: 'https://www.flipkart.com/samsung-1-5-ton-5-star-ac', rating: 4.2, reviewCount: 5678, inStock: true },
      { store: 'reliance_digital', price: 43990, originalPrice: 66990, url: 'https://www.reliancedigital.in/samsung-ac', rating: 4.2, reviewCount: 234, inStock: true },
    ],
  },
];

async function seed() {
  const batch = db.batch();

  for (const product of products) {
    const productRef = db.collection('products').doc();
    batch.set(productRef, {
      title: product.title,
      image: product.image,
      brand: product.brand,
      category: product.category,
      description: product.description,
      createdAt: new Date().toISOString(),
    });

    for (const price of product.prices) {
      const priceRef = db.collection('prices').doc();
      batch.set(priceRef, {
        productId: productRef.id,
        store: price.store,
        price: price.price,
        originalPrice: price.originalPrice ?? null,
        affiliateUrl: price.url,
        rating: price.rating ?? null,
        reviewCount: price.reviewCount ?? null,
        inStock: price.inStock,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  await batch.commit();
  console.log(`Seeded ${products.length} products with prices to Firestore.`);
}

seed().catch(console.error);
