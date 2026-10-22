'use client';

import { useMemo, useState } from 'react';
import { galleryConfig } from '@/config/gallery';
import type { GalleryCategory } from '@/types';
import { GalleryImageView } from './GalleryImageView';
import { Lightbox } from './Lightbox';

type Filter = 'all' | GalleryCategory;

/**
 * `Record<GalleryCategory, …>` makes this exhaustive: adding a category to the
 * `GalleryCategory` type fails to compile until a label is added here.
 * Key order = tab order.
 */
const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  rooms: 'Rooms',
  exterior: 'Exterior',
  reception: 'Reception',
  common: 'Common',
  facilities: 'Facilities',
};

/** "All" plus only the categories that actually have photos, so no tab is ever empty. */
const FILTERS: readonly Filter[] = [
  'all',
  ...(Object.keys(CATEGORY_LABELS) as GalleryCategory[]).filter((category) =>
    galleryConfig.some((image) => image.category === category),
  ),
];

const HAS_MULTIPLE_CATEGORIES = FILTERS.length > 2;

const filterLabel = (filter: Filter): string =>
  filter === 'all' ? 'All' : CATEGORY_LABELS[filter];

export interface GalleryGridProps {
  /** Cap the number of thumbnails shown (used by the homepage preview). */
  limit?: number;
  /** Show the category filter buttons. Defaults to true. */
  showFilters?: boolean;
  className?: string;
}

export function GalleryGrid({
  limit,
  showFilters = true,
  className = '',
}: GalleryGridProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = useMemo(() => {
    const filtered =
      filter === 'all'
        ? galleryConfig
        : galleryConfig.filter((image) => image.category === filter);
    return limit === undefined ? filtered : filtered.slice(0, limit);
  }, [filter, limit]);

  // A capped preview of 6 reads best as 3 columns; the full gallery can use 4.
  const columns =
    limit === undefined ? 'lg:grid-cols-3 xl:grid-cols-4' : 'lg:grid-cols-3';

  const displayFilters = showFilters && HAS_MULTIPLE_CATEGORIES;

  return (
    <div className={className}>
      {displayFilters && (
        <>
          <div
            role="group"
            aria-label="Filter photos by category"
            className="mb-8 flex flex-wrap gap-2"
          >
            {FILTERS.map((item) => {
              const isActive = item === filter;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(item)}
                  className={
                    'inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium ' +
                    'transition-colors duration-200 motion-reduce:transition-none ' +
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
                    'focus-visible:outline-teal-700 ' +
                    (isActive
                      ? 'bg-teal-800 text-white'
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200')
                  }
                >
                  {filterLabel(item)}
                </button>
              );
            })}
          </div>
          <p role="status" className="sr-only">
            Showing {images.length} {images.length === 1 ? 'photo' : 'photos'}
            {filter === 'all' ? '' : ` in ${filterLabel(filter)}`}
          </p>
        </>
      )}

      {images.length === 0 ? (
        <p className="rounded-lg bg-stone-100 p-8 text-center text-stone-700">
          No photos in this category yet.
        </p>
      ) : (
        <ul
          role="list"
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${columns}`}
        >
          {images.map((image, index) => (
            <li key={image.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-haspopup="dialog"
                aria-label={`Open photo: ${image.title}`}
                className={
                  'group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-200 ' +
                  'text-left shadow-sm focus-visible:outline focus-visible:outline-2 ' +
                  'focus-visible:outline-offset-2 focus-visible:outline-teal-700'
                }
              >
                <GalleryImageView
                  src={image.src}
                  alt={image.alt}
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="absolute inset-x-0 bottom-0 bg-black/60 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 group-hover:bg-black/75 motion-reduce:transition-none">
                  {image.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox
        images={images}
        activeIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </div>
  );
}