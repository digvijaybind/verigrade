import type { MetadataRoute } from 'next';
import { COUNTRIES, REGIONS } from '@/lib/countries';
import { SITE } from '@/lib/site';
import { ALL_PRODUCTS } from '@/lib/catalogue';

/** Every page that exists under a market prefix, with its relative path. */
const PAGES: { path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changefreq: 'weekly' },
  { path: 'shop', priority: 0.95, changefreq: 'weekly' },
  { path: 'phones', priority: 0.9, changefreq: 'weekly' },
  { path: 'laptops', priority: 0.9, changefreq: 'weekly' },
  { path: 'tablets', priority: 0.9, changefreq: 'weekly' },
  { path: 'why-verigrade', priority: 0.9, changefreq: 'monthly' },
  { path: 'grading-standard', priority: 0.9, changefreq: 'monthly' },
  { path: 'data-security', priority: 0.8, changefreq: 'monthly' },
  { path: 'certifications', priority: 0.8, changefreq: 'weekly' },
  { path: 'assurance', priority: 0.9, changefreq: 'monthly' },
  { path: 'warranty', priority: 0.8, changefreq: 'monthly' },
  { path: 'returns', priority: 0.7, changefreq: 'monthly' },
  { path: 'repair-standard', priority: 0.7, changefreq: 'monthly' },
  { path: 'repair-services', priority: 0.7, changefreq: 'monthly' },
  { path: 'ordering', priority: 0.7, changefreq: 'monthly' },
  { path: 'shipping', priority: 0.7, changefreq: 'monthly' },
  { path: 'transit', priority: 0.7, changefreq: 'monthly' },
  { path: 'export-process', priority: 0.7, changefreq: 'monthly' },
  { path: 'compliance', priority: 0.6, changefreq: 'monthly' },
  { path: 'about', priority: 0.6, changefreq: 'monthly' },
  { path: 'faq', priority: 0.6, changefreq: 'monthly' },
  { path: 'contact', priority: 0.9, changefreq: 'monthly' },
  { path: 'privacy', priority: 0.2, changefreq: 'yearly' },
  { path: 'terms', priority: 0.2, changefreq: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, '');
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const country of Object.values(COUNTRIES)) {
    for (const page of PAGES) {
      entries.push({
        url: `${base}/${country.code}${page.path ? `/${page.path}` : ''}`,
        lastModified: now,
        changeFrequency: page.changefreq,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            Object.values(COUNTRIES).map((alt) => [
              alt.locale,
              `${base}/${alt.code}${page.path ? `/${page.path}` : ''}`,
            ]),
          ),
        },
      });
    }

    // Product detail pages for the models we actually supply into this market.
    for (const p of ALL_PRODUCTS) {
      if (!p.markets.includes(country.code)) continue;
      entries.push({
        url: `${base}/${country.code}/shop/${p.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            Object.values(COUNTRIES)
              .filter((alt) => p.markets.includes(alt.code))
              .map((alt) => [alt.locale, `${base}/${alt.code}/shop/${p.slug}`]),
          ),
        },
      });
    }

    // The region page for the market this country belongs to.
    const region = REGIONS.find((r) => r.slug === country.region);
    if (region) {
      entries.push({
        url: `${base}/${country.code}/${region.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(
            Object.values(COUNTRIES)
              .filter((alt) => alt.region === region.slug)
              .map((alt) => [alt.locale, `${base}/${alt.code}/${region.slug}`]),
          ),
        },
      });
    }
  }

  return entries;
}
