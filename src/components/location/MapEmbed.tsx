import { MapPin } from 'lucide-react';

import { hotelConfig } from '@/config/hotel';
import type { LocationConfig } from '@/types';

type MapEmbedLocation = Pick<LocationConfig, 'address' | 'mapEmbedUrl'>;

export interface MapEmbedProps {
  /** Defaults to `hotelConfig.location`. Override only for tests/previews. */
  location?: MapEmbedLocation;
  /** `compact` is shorter, for the homepage preview. */
  variant?: 'compact' | 'full';
  className?: string;
}

const heights: Record<NonNullable<MapEmbedProps['variant']>, string> = {
  compact: 'h-64 sm:h-72 lg:h-80',
  full: 'h-80 sm:h-[26rem] lg:h-[32rem]',
};

/**
 * Responsive Google Maps embed.
 * - `mapEmbedUrl` configured: renders a lazy-loaded iframe.
 * - `mapEmbedUrl` empty: renders an accessible placeholder with the address
 *   (when configured) instead of a broken frame.
 */
export function MapEmbed({
  location = hotelConfig.location,
  variant = 'full',
  className,
}: MapEmbedProps) {
  const embedUrl = location.mapEmbedUrl.trim();
  const address = location.address.trim();

  const wrapper = [
    'w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100',
    heights[variant],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  // Only https embeds are allowed; anything else is treated as unconfigured.
  if (embedUrl.startsWith('https://')) {
    return (
      <div className={wrapper}>
        <iframe
          src={embedUrl}
          title={`Map showing the location of ${hotelConfig.name}`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Map placeholder"
      className={[
        wrapper,
        'flex flex-col items-center justify-center gap-3 p-6 text-center',
      ].join(' ')}
    >
      <MapPin aria-hidden="true" className="h-10 w-10 text-teal-800" />
      {address && (
        <p className="max-w-md text-base font-medium text-stone-900">{address}</p>
      )}
      <p className="max-w-md text-sm text-stone-700">
        The interactive map will load here once the hotel&apos;s map coordinates
        are configured.
      </p>
    </div>
  );
}