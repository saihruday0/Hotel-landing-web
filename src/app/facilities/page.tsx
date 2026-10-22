import type { Metadata } from 'next';
import { Check, Info } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { facilitiesConfig } from '@/config/facilities';
import { hotelConfig } from '@/config/hotel';

const pageTitle = `Facilities | ${hotelConfig.name}, ${hotelConfig.locationName}`;
const pageDescription = `See the facilities available at ${hotelConfig.name} in ${hotelConfig.locationName}, and how to confirm them before you book.`;

export const metadata: Metadata = {
  // `absolute` keeps this title as written, even if the root layout uses a title template.
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/facilities' },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
  },
};

interface AdvisoryNote {
  title: string;
  body: string;
}

/**
 * Advisory notes come from general booking facts plus whatever is configured
 * (check-in/out times, policies). Nothing here is invented about the property.
 */
function buildAdvisoryNotes(): AdvisoryNote[] {
  const { contact, policies } = hotelConfig;

  const notes: AdvisoryNote[] = [
    {
      title: 'Confirm what matters to you',
      body: 'If a particular facility matters for your stay, ask us when you enquire so we can confirm it for your dates.',
    },
    {
      title: 'Tariffs and availability',
      body: 'Room availability and current tariffs are confirmed directly with the hotel. This website does not take payments or hold bookings, so please call or message us before you travel.',
    },
  ];

  const checkIn = contact.checkInTime.trim();
  const checkOut = contact.checkOutTime.trim();
  if (checkIn !== '' || checkOut !== '') {
    const parts: string[] = [];
    if (checkIn !== '') parts.push(`Check-in: ${checkIn}`);
    if (checkOut !== '') parts.push(`Check-out: ${checkOut}`);
    notes.push({ title: 'Check-in and check-out', body: parts.join('. ') + '.' });
  }

  for (const policy of policies ?? []) {
    notes.push({ title: policy.title, body: policy.description });
  }

  return notes;
}

export default function FacilitiesPage() {
  const advisoryNotes = buildAdvisoryNotes();

  return (
    <>
      <section
        aria-labelledby="facilities-page-heading"
        className="bg-stone-50 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1
              id="facilities-page-heading"
              className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl"
            >
              Facilities at {hotelConfig.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-700">
              Everything listed here has been confirmed by the hotel. Together
              they cover the basics of a comfortable stay in Tirupati.
            </p>
          </div>

          <h2 className="sr-only">Available facilities</h2>

          {facilitiesConfig.length === 0 ? (
            <p className="mt-10 rounded-xl border border-stone-200 bg-white p-6 text-stone-700">
              Facility details will be added soon. Please call or message us to
              ask about what is available.
            </p>
          ) : (
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {facilitiesConfig.map((facility) => (
                <li
                  key={facility.id}
                  className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-800">
                    <DynamicIcon
                      name={facility.iconName}
                      fallback={Check}
                      aria-hidden="true"
                      className="h-7 w-7"
                    />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-stone-900">
                    {facility.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-stone-700">
                    {facility.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section
        aria-labelledby="booking-notes-heading"
        className="bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="booking-notes-heading"
            className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl"
          >
            Before you book
          </h2>

          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {advisoryNotes.map((note) => (
              <li key={note.title} className="flex items-start gap-3">
                <Info
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 text-teal-800"
                />
                <div>
                  <h3 className="text-base font-semibold text-stone-900">
                    {note.title}
                  </h3>
                  <p className="mt-1 max-w-prose text-base leading-relaxed text-stone-700">
                    {note.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/#contact" size="lg">
              Book Your Stay
            </Button>
            <Button href="/rooms" variant="outline" size="lg">
              View Rooms &amp; Tariffs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}