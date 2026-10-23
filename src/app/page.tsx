import type { Metadata } from 'next';

import { AboutSection } from '@/components/home/AboutSection';
import { ContactSection } from '@/components/home/ContactSection';
import { FacilitiesPreview } from '@/components/home/FacilitiesPreview';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { Hero } from '@/components/home/Hero';
import { LocationPreview } from '@/components/home/LocationPreview';
import { RoomsPreview } from '@/components/home/RoomsPreview';
import { hotelConfig } from '@/config/hotel';

const pageTitle = `${hotelConfig.name} | Hotel in ${hotelConfig.locationName}`;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: hotelConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: pageTitle,
    description: hotelConfig.description,
    type: 'website',
  },
};

export default function HomePage() {
  const { nearbyPlaces } = hotelConfig.location;

  return (
    <>
      <Hero />
      <AboutSection />
      <RoomsPreview />
      <FacilitiesPreview />
      <GalleryPreview />
      <LocationPreview />
      {nearbyPlaces.length > 0 && (
        <section
          aria-labelledby="nearby-heading"
          className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
        >
          <h2
            id="nearby-heading"
            className="text-2xl font-bold text-stone-400 sm:text-3xl"
          >
            Nearby Transport &amp; Attractions
          </h2>
          <ul className="mt-6 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
            {nearbyPlaces.map((place) => (
              <li
                key={place.name}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <span className="font-medium text-stone-900">{place.name}</span>
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
      <ContactSection />
    </>
  );
}