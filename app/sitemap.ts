import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nervsystems.com';
  const currentDate = new Date();

  // Define all routes
  const routes = [
    '',  // home
    '/about',
    '/privacy',
    '/terms',
    '/solutions/tak',
    '/solutions/nerv-centre',
  ];

  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add default locale routes (without prefix)
  routes.forEach(route => {
    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: currentDate,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  // Add localized routes for non-default locales
  locales.filter(locale => locale !== 'en').forEach(locale => {
    routes.forEach(route => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
