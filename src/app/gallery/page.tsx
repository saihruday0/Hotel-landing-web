import type { Metadata } from 'next';
import { galleryConfig } from '@/config/gallery';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

const title = 'Photo Gallery | Adarsh Residency, Tirupati';
const description =
  'Browse photos of the rooms, exterior, reception and facilities at Adarsh Residency in Tirupati.';

// Prefer an exterior shot for link previews; fall back to the first photo.
const ogImage =
  galleryConfig.find((image) => image.category === 'exterior') ??
  galleryConfig[0];

export const metadata: Metadata = {
  // `absolute` keeps this title intact even if the root layout defines a title template.
  title: { absolute: title },
  description,
  // Relative URLs resolve against `metadataBase`, which must be set in the root layout.
  alternates: { canonical: '/gallery' },
  openGraph: {
    title,
    description,
    url: '/gallery',
    siteName: 'Adarsh Residency',
    type: 'website',
    locale: 'en_IN',
    // Page-level openGraph replaces the layout's, so images must be restated here.
    ...(ogImage ? { images: [{ url: ogImage.src, alt: ogImage.alt }] } : {}),
  },
};

export default function GalleryPage() {
  return (
    <div>
      <header className="border-b border-stone-200 bg-stone-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Photo Gallery
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-stone-700">
            Take a look around Adarsh Residency before you arrive. Browse
            photographs of our rooms, exterior, reception and facilities in
            Tirupati, or filter by category.
          </p>
        </div>
      </header>

      <section
        aria-label="Hotel photographs"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        <GalleryGrid />
      </section>
    </div>
  );
}