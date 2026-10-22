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

/**
 * Section order follows spec.md. Each section owns its anchor id
 * (hero, about, rooms, facilities, gallery, location, contact), which the
 * navbar links to. Navbar and footer come from the root layout.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <RoomsPreview />
      <FacilitiesPreview />
      <GalleryPreview />
      <LocationPreview />
      <ContactSection />
    </>
  );
}