import { MapPin } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { MapEmbed } from '@/components/location/MapEmbed';
import { RouteButtons } from '@/components/location/RouteButtons';
import { hotelConfig } from '@/config/hotel';

/** Homepage Section 7: Location preview. Data comes from `hotelConfig.location`. */
export function LocationPreview() {
  const { location } = hotelConfig;
  const address = location.address.trim();

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="scroll-mt-20 bg-stone-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Find us
          </p>
          <h2
            id="location-heading"
            className="mt-2 text-3xl font-bold text-stone-900 sm:text-4xl"
          >
            Location &amp; Getting Here
          </h2>
          <p className="mt-3 text-lg text-stone-700">
            Plan your arrival in {hotelConfig.locationName}.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-1 h-6 w-6 shrink-0 text-teal-800"
              />
              <div>
                <h3 className="text-lg font-semibold text-stone-900">
                  {hotelConfig.name}
                </h3>
                <address className="mt-1 not-italic text-stone-700">
                  {address || 'Address will be added soon.'}
                </address>
              </div>
            </div>

            <RouteButtons />

            <div>
              <Button
                href="/location"
                variant="secondary"
                rightIcon={<span aria-hidden="true">&rarr;</span>}
              >
                View Full Location Details
              </Button>
            </div>
          </div>

          <MapEmbed variant="compact" />
        </div>
      </div>
    </section>
  );
}