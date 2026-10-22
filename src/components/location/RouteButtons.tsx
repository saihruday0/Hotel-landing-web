import { Bus, Navigation, TrainFront } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { hotelConfig } from '@/config/hotel';
import type { LocationConfig } from '@/types';

type RouteUrls = Pick<
  LocationConfig,
  'hotelMapsUrl' | 'railwayStationRouteUrl' | 'busStationRouteUrl'
>;

export interface RouteButtonsProps {
  /** Defaults to `hotelConfig.location`. Override only for tests/previews. */
  location?: RouteUrls;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/** An unconfigured URL is "" (or whitespace by mistake); both mean "hide". */
const isConfigured = (url: string): boolean => url.trim() !== '';

/**
 * Renders Get Directions / From Railway Station / From Bus Station buttons.
 * Each button appears only when its URL is configured. If none are
 * configured, nothing is rendered (no empty wrapper, no disabled buttons).
 * All links open in a new tab via Button's external handling.
 */
export function RouteButtons({
  location = hotelConfig.location,
  size = 'md',
  className,
}: RouteButtonsProps) {
  const { hotelMapsUrl, railwayStationRouteUrl, busStationRouteUrl } = location;

  const showDirections = isConfigured(hotelMapsUrl);
  const showRailway = isConfigured(railwayStationRouteUrl);
  const showBus = isConfigured(busStationRouteUrl);

  if (!showDirections && !showRailway && !showBus) return null;

  return (
    <div
      className={['flex flex-wrap gap-3', className ?? ''].filter(Boolean).join(' ')}
    >
      {showDirections && (
        <Button
          href={hotelMapsUrl.trim()}
          external
          size={size}
          variant="primary"
          leftIcon={<Navigation aria-hidden="true" className="h-5 w-5" />}
        >
          Get Directions
          <span className="sr-only"> (opens in a new tab)</span>
        </Button>
      )}

      {showRailway && (
        <Button
          href={railwayStationRouteUrl.trim()}
          external
          size={size}
          variant="outline"
          leftIcon={<TrainFront aria-hidden="true" className="h-5 w-5" />}
        >
          From Railway Station
          <span className="sr-only"> (opens in a new tab)</span>
        </Button>
      )}

      {showBus && (
        <Button
          href={busStationRouteUrl.trim()}
          external
          size={size}
          variant="outline"
          leftIcon={<Bus aria-hidden="true" className="h-5 w-5" />}
        >
          From Bus Station
          <span className="sr-only"> (opens in a new tab)</span>
        </Button>
      )}
    </div>
  );
}