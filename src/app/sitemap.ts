import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/site';



interface SitemapRoute {
  path: string;
  priority: number;
}

// Add a route here when you add a new public page.
const routes: SitemapRoute[] = [
  { path: '/', priority: 1 },
  { path: '/rooms', priority: 0.9 },
  { path: '/facilities', priority: 0.7 },
  { path: '/gallery', priority: 0.7 },
  { path: '/location', priority: 0.8 },
  { path: '/contact', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified is intentionally omitted: a build-time "now" would claim
  // every page changed on every deploy.
  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    priority,
  }));
}