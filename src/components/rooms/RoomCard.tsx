'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import {
  Baby,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Fan,
  MessageCircle,
  Phone,
  Snowflake,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { hotelConfig } from '@/config/hotel';
import { getEnquiryLinks } from '@/lib/contact';
import type { ContactConfig, Room } from '@/types';

export interface RoomCardProps {
  room: Room;
  /** Defaults to `hotelConfig.contact`. */
  contact?: ContactConfig;
  /** Defaults to `hotelConfig.name`. */
  hotelName?: string;
  /** Use "h2" when the card sits directly under the page's h1. */
  headingAs?: 'h2' | 'h3';
  /** Set on above-the-fold cards to preload the first image. */
  priority?: boolean;
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const plural = (count: number, one: string, many: string): string =>
  `${count} ${count === 1 ? one : many}`;

const IMAGE_SIZES = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

function AcBadge({ acType }: { acType: Room['acType'] }) {
  const isAc = acType === 'AC';
  const Icon = isAc ? Snowflake : Fan;

  return (
    <span
      className={
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ' +
        (isAc ? 'bg-teal-50 text-teal-900' : 'bg-stone-100 text-stone-800')
      }
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {acType}
    </span>
  );
}

export function RoomCard({
  room,
  contact = hotelConfig.contact,
  hotelName = hotelConfig.name,
  headingAs: Heading = 'h3',
  priority = false,
}: RoomCardProps) {
  const headingId = useId();
  const [imageIndex, setImageIndex] = useState(0);
  const [failedSrcs, setFailedSrcs] = useState<ReadonlySet<string>>(new Set());

  const totalImages = room.images.length;
  const currentSrc = room.images[imageIndex];
  const visibleSrc =
    currentSrc !== undefined && !failedSrcs.has(currentSrc) ? currentSrc : null;

  const markFailed = (src: string): void =>
    setFailedSrcs((prev) => new Set(prev).add(src));

  const step = (delta: number): void =>
    setImageIndex((i) => (i + delta + totalImages) % totalImages);

  const { whatsappHref, callHref } = getEnquiryLinks(
    room.title,
    contact,
    hotelName,
  );
  const callLabel = whatsappHref !== null ? 'Call' : 'Call to enquire';

  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white"
    >
      {/* Image area keeps a fixed ratio so the grid never jumps. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        {visibleSrc !== null ? (
          <Image
            key={visibleSrc}
            src={visibleSrc}
            alt={`${room.title}, photo ${imageIndex + 1} of ${totalImages}`}
            fill
            sizes={IMAGE_SIZES}
            priority={priority && imageIndex === 0}
            className="object-cover"
            onError={() => markFailed(visibleSrc)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-stone-500">
            <BedDouble className="h-10 w-10" aria-hidden="true" />
            <span className="text-sm">Photos coming soon</span>
          </div>
        )}

        {totalImages > 1 && (
          <>
            <div className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={`Previous photo of ${room.title}`}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-stone-900 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 motion-reduce:transition-none"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={`Next photo of ${room.title}`}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-stone-900 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 motion-reduce:transition-none"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <span
              aria-live="polite"
              aria-atomic="true"
              className="absolute bottom-2 right-2 rounded-full bg-stone-900/75 px-2.5 py-1 text-xs font-medium text-white"
            >
              <span className="sr-only">Photo </span>
              {imageIndex + 1} / {totalImages}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <Heading
            id={headingId}
            className="text-xl font-semibold leading-snug text-stone-900"
          >
            {room.title}
          </Heading>
          <AcBadge acType={room.acType} />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          {room.description}
        </p>

        <ul aria-label="Occupancy" className="mt-4 flex flex-wrap gap-2">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-800">
            <Users className="h-4 w-4" aria-hidden="true" />
            {plural(room.occupancy.adults, 'Adult', 'Adults')}
          </li>
          {room.occupancy.children > 0 && (
            <li className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-800">
              <Baby className="h-4 w-4" aria-hidden="true" />
              {plural(room.occupancy.children, 'Child', 'Children')}
            </li>
          )}
        </ul>

        {room.amenities.length > 0 && (
          <ul aria-label="Amenities" className="mt-4 flex flex-wrap gap-2">
            {room.amenities.map((amenity) => (
              <li
                key={amenity}
                className="rounded-md border border-stone-200 px-2.5 py-1 text-xs text-stone-700"
              >
                {amenity}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto border-t border-stone-200 pt-4 sm:mt-6">
          {room.pricePerNight !== null ? (
            <p className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold text-stone-900">
                {inr.format(room.pricePerNight)}
              </span>
              <span className="text-sm text-stone-600">per night</span>
            </p>
          ) : (
            <p className="text-sm font-medium text-stone-700">
              Contact for tariffs
            </p>
          )}

          {(whatsappHref !== null || callHref !== null) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {whatsappHref !== null && (
                <Button
                  href={whatsappHref}
                  aria-label={`Enquire via WhatsApp about ${room.title}`}
                  leftIcon={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
                  className="min-w-[12rem] flex-1"
                >
                  Enquire via WhatsApp
                </Button>
              )}
              {callHref !== null && (
                <Button
                  href={callHref}
                  variant={whatsappHref !== null ? 'outline' : 'primary'}
                  aria-label={`${callLabel} about ${room.title}`}
                  leftIcon={<Phone className="h-5 w-5" aria-hidden="true" />}
                  className={whatsappHref !== null ? '' : 'flex-1'}
                >
                  {callLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}