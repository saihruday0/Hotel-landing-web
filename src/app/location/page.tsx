import type { Metadata } from 'next';
import { Clock, Compass, MapPin, Phone, Route } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { MapEmbed } from '@/components/location/MapEmbed';
import { RouteButtons } from '@/components/location/RouteButtons';
import { hotelConfig } from '@/config/hotel';

const PAGE_PATH = '/location';
const PAGE_TITLE = `Location & Directions | ${hotelConfig.name}, Tirupati`;
const PAGE_DESCRIPTION = `Find ${hotelConfig.name} in ${hotelConfig.locationName}. View the address, open directions in Google Maps, and plan your arrival from the railway station or bus station.`;

// Relative canonical/OG URLs resolve against `metadataBase`, which must be
// set once in `src/app/layout.tsx`.
export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: hotelConfig.name,
    locale: 'en_IN',
    type: 'website',
  },
};

interface Tip {
  icon: LucideIcon;
  title: string;
  text: string;
}

// General arrival advice only: no distances, fares or transport facts that
// would need verification.
const travelTips: Tip[] = [
  {
    icon: Route,
    title: 'Use the route buttons',
    text: 'Open the route from the railway station or bus station in Google Maps to see the current distance and travel time.',
  },
  {
    icon: Clock,
    title: 'Allow extra time in busy seasons',
    text: 'Tirupati sees heavy pilgrim traffic during festivals and weekends, so allow extra time for the journey.',
  },
  {
    icon: Phone,
    title: 'Call if you are unsure',
    text: 'If you cannot find the entrance or your arrival is delayed, call the hotel and the staff will guide you.',
  },
  {
    icon: Compass,
    title: 'Share the address with your driver',
    text: 'Show the address on this page to your taxi or auto driver so they can find the hotel easily.',
  },
];

export default function LocationPage() {
  const { location } = hotelConfig;
  const address = location.address.trim();
  const hasNearbyPlaces = location.nearbyPlaces.length > 0;

  return (
    <main id="main-content">
      <header className="bg-teal-900 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-100">
            {hotelConfig.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
            Location &amp; Directions
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-teal-50">
            Everything you need to reach us in {hotelConfig.locationName}.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section aria-labelledby="address-heading">
          <h2
            id="address-heading"
            className="text-2xl font-bold text-stone-900 sm:text-3xl"
          >
            Our Address
          </h2>
          <div className="mt-4 flex items-start gap-3">
            <MapPin
              aria-hidden="true"
              className="mt-1 h-6 w-6 shrink-0 text-teal-800"
            />
            <address className="text-lg not-italic text-stone-800">
              <span className="block font-semibold">{hotelConfig.name}</span>
              {address || 'Address will be added soon.'}
            </address>
          </div>
          <RouteButtons className="mt-6" size="lg" />
        </section>

        <section aria-labelledby="map-heading">
          <h2
            id="map-heading"
            className="mb-4 text-2xl font-bold text-stone-900 sm:text-3xl"
          >
            Map
          </h2>
          <MapEmbed variant="full" />
        </section>

        <section aria-labelledby="tips-heading">
          <h2
            id="tips-heading"
            className="text-2xl font-bold text-stone-900 sm:text-3xl"
          >
            Travel Tips for Pilgrims
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {travelTips.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex gap-4 rounded-xl border border-stone-200 bg-white p-5"
              >
                <Icon
                  aria-hidden="true"
                  className="mt-0.5 h-6 w-6 shrink-0 text-teal-800"
                />
                <div>
                  <h3 className="font-semibold text-stone-900">{title}</h3>
                  <p className="mt-1 text-stone-700">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {hasNearbyPlaces && (
          <section aria-labelledby="nearby-heading">
            <h2
              id="nearby-heading"
              className="text-2xl font-bold text-stone-900 sm:text-3xl"
            >
              Nearby Transport &amp; Attractions
            </h2>
            <ul className="mt-6 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
              {location.nearbyPlaces.map((place) => (
                <li
                  key={place.name}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <span className="font-medium text-stone-900">
                    {place.name}
                  </span>
                  {place.distance && (
                    <span className="shrink-0 text-sm text-stone-700">
                      {place.distance}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}