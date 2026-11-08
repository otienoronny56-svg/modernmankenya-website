import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { ALL_OCCASIONS_LIST } from '@/data/occasionsData';
import { BESPOKE_CATEGORIES } from '@/data/mockData';

const BASE_URL = 'https://www.modernmanke.com';

function getProductSlugs(): string[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'custom_products.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const products = JSON.parse(data);
      if (Array.isArray(products)) {
        return products.map((p) => p.slug).filter(Boolean);
      }
    }
  } catch (err) {
    console.warn('Sitemap products read error:', err);
  }
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // 1. Core Static Brand Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/book-appointment`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/occasions`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/the-craft`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ready-to-wear`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/alterations`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/services/gift-vouchers`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/returns`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Dynamic Occasion Pages
  const occasionRoutes: MetadataRoute.Sitemap = ALL_OCCASIONS_LIST.map((occ) => ({
    url: `${BASE_URL}/occasions/${occ.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Dynamic Bespoke Category Pages
  const bespokeRoutes: MetadataRoute.Sitemap = BESPOKE_CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/bespoke/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Dynamic Ready-to-Wear Products
  const productSlugs = getProductSlugs();
  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE_URL}/ready-to-wear/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...occasionRoutes, ...bespokeRoutes, ...productRoutes];
}
