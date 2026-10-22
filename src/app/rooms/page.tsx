import type { Metadata } from 'next';
import { Info } from 'lucide-react';

import { RoomsGrid } from '@/components/rooms/RoomGrid';
import { hotelConfig } from '@/config/hotel';
import { roomsConfig } from '@/config/rooms';

const pageTitle = `Rooms & Tariffs | ${hotelConfig.name}, ${hotelConfig.locationName}`;
const pageDescription = `Browse the room categories at ${hotelConfig.name}, ${hotelConfig.locationName}. See occupancy and amenities, then enquire on WhatsApp or by phone for tariffs and availability.`;

export const metadata: Metadata = {
  // `absolute` skips any title template set in the root layout.
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/rooms' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/rooms',
    type: 'website',
  },
};

/**
 * Advisory notes shown under the room grid.
 * TODO(verify with hotel): direct check-in and photo-ID wording below.
 * Check-in/out times come from `hotelConfig.contact` and only appear when set.
 */
function buildAdvisoryNotes(): string[] {
  const { checkInTime, checkOutTime } = hotelConfig.contact;
  const hasPrices = roomsConfig.some((room) => room.pricePerNight !== null);

  const notes: string[] = [
    'Direct check-in is available at the front desk. Please confirm availability before you travel.',
    'Every guest must show a valid photo ID at check-in.',
    hasPrices
      ? 'Tariffs are per night and may change. Confirm the current rate and availability when you enquire.'
      : 'Please confirm current tariffs and availability when you enquire.',
  ];

  const timings: string[] = [];
  if (checkInTime !== '') timings.push(`Check-in: ${checkInTime}.`);
  if (checkOutTime !== '') timings.push(`Check-out: ${checkOutTime}.`);
  if (timings.length > 0) notes.push(timings.join(' '));

  return notes;
}

export default function RoomsPage() {
  const advisoryNotes = buildAdvisoryNotes();

  return (
    <div>
      <header className="border-b border-stone-200 bg-stone-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Rooms &amp; Tariffs
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">
            {hotelConfig.name} has {roomsConfig.length} room{' '}
            {roomsConfig.length === 1 ? 'category' : 'categories'} in{' '}
            {hotelConfig.locationName}. Compare capacity and amenities, then
            message or call us for current tariffs and availability.
          </p>
        </div>
      </header>

      <section
        aria-label="Available rooms"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <RoomsGrid rooms={roomsConfig} />

        <aside
          aria-labelledby="booking-notes-heading"
          className="mt-12 rounded-2xl border border-teal-800/20 bg-teal-50 p-5 sm:p-6"
        >
          <div className="flex gap-3">
            <Info
              className="mt-0.5 h-5 w-5 shrink-0 text-teal-800"
              aria-hidden="true"
            />
            <div>
              <h2
                id="booking-notes-heading"
                className="text-base font-semibold text-stone-900"
              >
                Before you book
              </h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-700 marker:text-teal-800">
                {advisoryNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}