import { hotelConfig } from '@/config/hotel';
import { absoluteUrl } from '@/lib/site';

/* ---------------------- Schema.org shapes (subset) ---------------------- */

interface PostalAddressLd {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality?: string;
  addressRegion?: string;
  addressCountry: string;
}

interface GeoCoordinatesLd {
  '@type': 'GeoCoordinates';
  latitude: number;
  longitude: number;
}

interface ContactPointLd {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
}

interface HotelLd {
  '@context': 'https://schema.org';
  '@type': 'Hotel';
  '@id': string;
  name: string;
  description: string;
  url: string;
  slogan?: string;
  address?: PostalAddressLd;
  geo?: GeoCoordinatesLd;
  telephone?: string;
  contactPoint?: ContactPointLd[];
  checkinTime?: string;
  checkoutTime?: string;
  hasMap?: string;
  sameAs?: string[];
}

/* ------------------------------- Helpers ------------------------------- */

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * Converts free text such as "12:00 PM", "2 pm" or "14:00" to the ISO 8601
 * time Schema.org expects ("14:00:00"). Returns undefined for anything
 * ambiguous (e.g. "24 hours", "noon", "12"), so no invalid value is emitted.
 */
function toSchemaTime(raw: string): string | undefined {
  const match = /^(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?$/i.exec(raw.trim());
  if (!match) return undefined;

  const hourText = match[1];
  const minuteText = match[2];
  const meridiem = match[3]?.toLowerCase();
  if (hourText === undefined) return undefined;
  if (minuteText === undefined && meridiem === undefined) return undefined;

  let hour = Number(hourText);
  const minute = Number(minuteText ?? '0');
  if (minute > 59) return undefined;

  if (meridiem !== undefined) {
    if (hour < 1 || hour > 12) return undefined;
    hour = (hour % 12) + (meridiem.startsWith('p') ? 12 : 0);
  } else if (hour > 23) {
    return undefined;
  }

  return `${pad(hour)}:${pad(minute)}:00`;
}

function isValidCoordinate(value: number, limit: number): boolean {
  return Number.isFinite(value) && Math.abs(value) <= limit;
}

function buildHotelJsonLd(): HotelLd {
  const { name, tagLine, description, locationName, contact, location, socialLinks } =
    hotelConfig;

  const ld: HotelLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${absoluteUrl('/')}#hotel`,
    name,
    description,
    url: absoluteUrl('/'),
  };

  if (tagLine.trim() !== '') ld.slogan = tagLine.trim();

  /* Address: only when configured. Locality/region come from locationName. */
  const streetAddress = (contact.address || location.address).trim();
  if (streetAddress !== '') {
    const [locality, region] = locationName
      .split(',')
      .map((part) => part.trim())
      .filter((part) => part !== '');

    const address: PostalAddressLd = {
      '@type': 'PostalAddress',
      streetAddress,
      addressCountry: 'IN',
    };
    if (locality) address.addressLocality = locality;
    if (region) address.addressRegion = region;
    ld.address = address;
  }

  /* Geo: only when verified coordinates are configured. */
  const geo = location.geo;
  if (
    geo &&
    isValidCoordinate(geo.latitude, 90) &&
    isValidCoordinate(geo.longitude, 180)
  ) {
    ld.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    };
  }

  /* Phones */
  const phones = contact.phones.map((p) => p.trim()).filter((p) => p !== '');
  const [primaryPhone] = phones;
  if (primaryPhone) {
    ld.telephone = primaryPhone;
    ld.contactPoint = phones.map((telephone) => ({
      '@type': 'ContactPoint' as const,
      telephone,
      contactType: 'reservations',
    }));
  }

  /* Check-in / check-out: only when they parse to a valid time. */
  const checkin = toSchemaTime(contact.checkInTime);
  const checkout = toSchemaTime(contact.checkOutTime);
  if (checkin) ld.checkinTime = checkin;
  if (checkout) ld.checkoutTime = checkout;

  /* Map link */
  const mapsUrl = location.hotelMapsUrl.trim();
  if (mapsUrl !== '') ld.hasMap = mapsUrl;

  /* Social profiles */
  const sameAs = (socialLinks ?? [])
    .map((link) => link.url.trim())
    .filter((url) => url !== '');
  if (sameAs.length > 0) ld.sameAs = sameAs;

  return ld;
}

/* ------------------------------ Component ------------------------------ */

/** Server component: renders Hotel structured data as JSON-LD. */
export function HotelJsonLd() {
  // Escaping "<" prevents a config value from closing the script tag early.
  const json = JSON.stringify(buildHotelJsonLd()).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}