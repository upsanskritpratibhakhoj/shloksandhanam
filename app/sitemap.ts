import { MetadataRoute } from 'next';
import { SHLOKA_DATABASE } from '../data/shlokaDatabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://shlok.upsanskritpratibhakhoj.com';

  // Construct search paths across all database elements matching the exact array index key
  const targetDirectoryUrls = SHLOKA_DATABASE.map((_, index) => ({
    url: `${baseUrl}/shlokas/${index}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...targetDirectoryUrls,
  ];
}
