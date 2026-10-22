import { galleryConfig } from '@/config/gallery';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Button } from '@/components/ui/Button';

const PREVIEW_COUNT = 6;

export function GalleryPreview() {
  // Follows the config convention: nothing configured means nothing rendered.
  if (galleryConfig.length === 0) return null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-20 bg-stone-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2
            id="gallery-heading"
            className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
          >
            Gallery
          </h2>
          <p className="mt-3 text-lg text-stone-700">
            See our rooms, reception and facilities before you arrive.
          </p>
        </div>

        <GalleryGrid limit={PREVIEW_COUNT} showFilters={false} />

        <div className="mt-10 flex justify-center">
          <Button href="/gallery" size="lg">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}