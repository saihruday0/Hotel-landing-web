import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  ExternalLink,
  LogIn,
  LogOut,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { hotelConfig } from '@/config/hotel';
import { cityFrom } from '@/lib/site';

/* ------------------------------ Metadata ------------------------------ */

const { name, locationName } = hotelConfig;
const city = cityFrom(locationName);

const pageDescription = `Contact ${name} in ${locationName}: reach the hotel, find directions and see booking options.`;

export const metadata: Metadata = {
  title: 'Contact & Booking',
  description: pageDescription,
  // Relative values resolve against metadataBase set in the root layout.
  alternates: { canonical: '/contact' },
  // openGraph replaces the layout's object (shallow merge), so repeat shared fields.
  openGraph: {
    type: 'website',
    siteName: name,
    locale: 'en_IN',
    title: `Contact & Booking | ${name} ${city}`,
    description: pageDescription,
    url: '/contact',
  },
};

/* ------------------------------ Helpers ------------------------------- */

const cardClasses = 'rounded-2xl border border-stone-200 bg-white p-6 shadow-sm';

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-800"
    >
      {children}
    </span>
  );
}

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-semibold text-stone-900">
      {children}
    </h2>
  );
}

/* -------------------------------- Page -------------------------------- */

export default function ContactPage() {
  const { contact, location, bookingPlatforms, policies } = hotelConfig;

  /* Normalise config once; every empty value hides its UI. */
  const phones = contact.phones.map((p) => p.trim()).filter((p) => p !== '');

  const whatsappDigits = contact.whatsappNumber.replace(/\D/g, '');
  const enquiryMessage = contact.defaultEnquiryMessage.trim();
  const whatsappUrl =
    whatsappDigits === ''
      ? ''
      : `https://wa.me/${whatsappDigits}${
          enquiryMessage === '' ? '' : `?text=${encodeURIComponent(enquiryMessage)}`
        }`;

  const address = (contact.address.trim() || location.address.trim()).trim();
  const mapsUrl = location.hotelMapsUrl.trim();
  const railwayUrl = location.railwayStationRouteUrl.trim();
  const busUrl = location.busStationRouteUrl.trim();

  const checkIn = contact.checkInTime.trim();
  const checkOut = contact.checkOutTime.trim();

  const policyItems = (policies ?? []).filter(
    (p) => p.title.trim() !== '' && p.description.trim() !== '',
  );
  const platforms = bookingPlatforms.filter((p) => p.url.trim() !== '');
  const nearbyPlaces = location.nearbyPlaces.filter((p) => p.name.trim() !== '');

  const hasPhone = phones.length > 0;
  const hasWhatsapp = whatsappUrl !== '';
  const hasLocationCard = address !== '' || mapsUrl !== '';
  const hasContactCards = hasPhone || hasWhatsapp || hasLocationCard;

  const hasStayTimes = checkIn !== '' || checkOut !== '';
  const hasStaySection = hasStayTimes || policyItems.length > 0;
  const hasDirections =
    mapsUrl !== '' || railwayUrl !== '' || busUrl !== '' || nearbyPlaces.length > 0;

  return (
    <div className="bg-stone-50">
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* ------------------------------ Header ------------------------------ */}
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
            Contact &amp; Booking
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-700">
            Get in touch with {name} in {city} directly, or book through one of
            our partner platforms.
          </p>
        </header>

        {/* ------------------------- Direct contact cards ------------------------- */}
        <section aria-labelledby="reach-heading">
          <SectionHeading id="reach-heading">Reach us directly</SectionHeading>

          {hasContactCards ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hasPhone && (
                <article className={cardClasses}>
                  <div className="flex items-center gap-3">
                    <IconBadge>
                      <Phone className="h-5 w-5" />
                    </IconBadge>
                    <h3 className="text-lg font-semibold text-stone-900">Call</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-stone-600">
                    Speak to the front desk about rooms and availability.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {phones.map((phone, index) => (
                      <li key={phone}>
                        <Button
                          href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                          variant={index === 0 ? 'primary' : 'outline'}
                          fullWidth
                          leftIcon={<Phone aria-hidden="true" className="h-5 w-5" />}
                        >
                          Call {phone}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </article>
              )}

              {hasWhatsapp && (
                <article className={cardClasses}>
                  <div className="flex items-center gap-3">
                    <IconBadge>
                      <MessageCircle className="h-5 w-5" />
                    </IconBadge>
                    <h3 className="text-lg font-semibold text-stone-900">WhatsApp</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-stone-600">
                    Send an enquiry on WhatsApp. A ready-to-send message opens
                    in the app.
                  </p>
                  <div className="mt-5">
                    <Button
                      href={whatsappUrl}
                      external
                      fullWidth
                      leftIcon={
                        <MessageCircle aria-hidden="true" className="h-5 w-5" />
                      }
                    >
                      Chat on WhatsApp
                      <span className="sr-only"> (opens in a new tab)</span>
                    </Button>
                  </div>
                </article>
              )}

              {hasLocationCard && (
                <article className={cardClasses}>
                  <div className="flex items-center gap-3">
                    <IconBadge>
                      <MapPin className="h-5 w-5" />
                    </IconBadge>
                    <h3 className="text-lg font-semibold text-stone-900">Visit</h3>
                  </div>
                  {address !== '' && (
                    <address className="mt-4 whitespace-pre-line text-sm not-italic leading-6 text-stone-700">
                      {address}
                    </address>
                  )}
                  {mapsUrl !== '' && (
                    <div className="mt-5">
                      <Button
                        href={mapsUrl}
                        external
                        variant="outline"
                        fullWidth
                        leftIcon={
                          <Navigation aria-hidden="true" className="h-5 w-5" />
                        }
                      >
                        Get Directions
                        <span className="sr-only"> (opens in a new tab)</span>
                      </Button>
                    </div>
                  )}
                </article>
              )}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white p-6 text-sm leading-6 text-stone-700">
              Contact details will be published here soon.
            </p>
          )}
        </section>

        {/* ---------------------- External booking platforms ---------------------- */}
        {platforms.length > 0 && (
          <section aria-labelledby="book-heading">
            <SectionHeading id="book-heading">Book online</SectionHeading>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-700">
              You can also reserve through these platforms. Your booking is
              completed on the partner&apos;s website.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {platforms.map((platform) => (
                <li key={platform.id}>
                  <Button
                    href={platform.url.trim()}
                    external
                    variant="outline"
                    rightIcon={
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    }
                  >
                    {platform.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ------------------------- Check-in & policies ------------------------- */}
        {hasStaySection && (
          <section aria-labelledby="stay-heading">
            <SectionHeading id="stay-heading">Check-in &amp; policies</SectionHeading>

            {hasStayTimes && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
                {checkIn !== '' && (
                  <article className={cardClasses}>
                    <div className="flex items-center gap-3">
                      <IconBadge>
                        <LogIn className="h-5 w-5" />
                      </IconBadge>
                      <h3 className="text-lg font-semibold text-stone-900">
                        Check-in
                      </h3>
                    </div>
                    <p className="mt-4 text-base font-medium text-stone-800">
                      {checkIn}
                    </p>
                  </article>
                )}
                {checkOut !== '' && (
                  <article className={cardClasses}>
                    <div className="flex items-center gap-3">
                      <IconBadge>
                        <LogOut className="h-5 w-5" />
                      </IconBadge>
                      <h3 className="text-lg font-semibold text-stone-900">
                        Check-out
                      </h3>
                    </div>
                    <p className="mt-4 text-base font-medium text-stone-800">
                      {checkOut}
                    </p>
                  </article>
                )}
              </div>
            )}

            {policyItems.length > 0 && (
              <ul className="mt-6 grid gap-6 md:grid-cols-2">
                {policyItems.map((policy) => (
                  <li key={policy.title}>
                    <article className={`${cardClasses} h-full`}>
                      <h3 className="text-lg font-semibold text-stone-900">
                        {policy.title}
                      </h3>
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-stone-700">
                        {policy.description}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* --------------------------- Directions summary --------------------------- */}
        {hasDirections && (
          <section aria-labelledby="directions-heading">
            <SectionHeading id="directions-heading">Getting here</SectionHeading>
            <div className={`${cardClasses} mt-6`}>
              {(mapsUrl !== '' || railwayUrl !== '' || busUrl !== '') && (
                <>
                  <p className="max-w-2xl text-sm leading-6 text-stone-700">
                    Google Maps shows the live route, distance and travel time.
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {mapsUrl !== '' && (
                      <li>
                        <Button
                          href={mapsUrl}
                          external
                          leftIcon={
                            <Navigation aria-hidden="true" className="h-5 w-5" />
                          }
                        >
                          Get Directions
                          <span className="sr-only"> (opens in a new tab)</span>
                        </Button>
                      </li>
                    )}
                    {railwayUrl !== '' && (
                      <li>
                        <Button href={railwayUrl} external variant="outline">
                          From Railway Station
                          <span className="sr-only"> (opens in a new tab)</span>
                        </Button>
                      </li>
                    )}
                    {busUrl !== '' && (
                      <li>
                        <Button href={busUrl} external variant="outline">
                          From Bus Station
                          <span className="sr-only"> (opens in a new tab)</span>
                        </Button>
                      </li>
                    )}
                  </ul>
                </>
              )}

              {nearbyPlaces.length > 0 && (
                <div className={mapsUrl !== '' || railwayUrl !== '' || busUrl !== '' ? 'mt-6' : ''}>
                  <h3 className="text-base font-semibold text-stone-900">
                    Nearby places
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-stone-700">
                    {nearbyPlaces.map((place) => (
                      <li key={place.name}>
                        {place.name}
                        {place.distance && place.distance.trim() !== '' && (
                          <span className="text-stone-600"> ({place.distance})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <Button href="/location" variant="secondary">
                  View location page
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}