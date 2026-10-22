/**
 * Site-wide URL helpers.
 *
 * Set NEXT_PUBLIC_SITE_URL in your hosting environment (e.g.
 * "https://www.your-domain.com"). The fallback is for local development
 * only, so make sure the variable is set in production, otherwise canonical
 * URLs and the sitemap will point at localhost.
 */

const DEV_FALLBACK_URL = 'http://localhost:3000';

function normalizeSiteUrl(raw: string | undefined): string {
  const value = (raw ?? '').trim();
  if (value === '') return DEV_FALLBACK_URL;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, '');
}

/** Origin without a trailing slash, e.g. "https://www.example.com". */
export const siteUrl: string = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path: string = '/'): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/** "Tirupati, Andhra Pradesh" -> "Tirupati". Falls back to the full string. */
export function cityFrom(locationName: string): string {
  const [first] = locationName.split(',');
  const city = first?.trim();
  return city ? city : locationName;
}