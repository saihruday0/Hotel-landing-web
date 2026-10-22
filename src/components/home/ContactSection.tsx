'use client';

import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { hotelConfig } from '@/config/hotel';

const newTabHint = <span className="sr-only"> (opens in a new tab)</span>;

/** "+91 98765 43210" -> "tel:+919876543210" */
function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** `digits` is the country-code number with no "+" or spaces (see ContactConfig). */
function toWhatsAppHref(digits: string, message: string): string {
  const base = `https://wa.me/${digits}`;
  const text = message.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Homepage Section 8: Contact & Booking. Every block hides itself when its data is empty. */
export function ContactSection() {
  const { contact, location, bookingPlatforms } = hotelConfig;

  const phones = contact.phones.map((phone) => phone.trim()).filter(Boolean);
  const whatsappDigits = contact.whatsappNumber.replace(/\D/g, '');
  const address = contact.address.trim() || location.address.trim();
  const mapsUrl = location.hotelMapsUrl.trim();
  const checkIn = contact.checkInTime.trim();
  const checkOut = contact.checkOutTime.trim();
  const platforms = bookingPlatforms.filter((platform) => platform.url.trim() !== '');

  const hasDirectContact = phones.length > 0 || whatsappDigits !== '';
  const hasVisitInfo =
    address !== '' || mapsUrl !== '' || checkIn !== '' || checkOut !== '';
  const hasPlatforms = platforms.length > 0;
  const hasAnything = hasDirectContact || hasVisitInfo || hasPlatforms;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
          >
            Contact &amp; Booking
          </h2>
          <p className="mt-3 text-lg text-stone-700">
            Call or message us to check room availability and current tariffs.
          </p>
        </div>

        {!hasAnything && (
          <p className="rounded-xl border border-stone-200 bg-stone-50 p-6 text-stone-700">
            Contact details will be added soon.
          </p>
        )}

        {(hasDirectContact || hasVisitInfo) && (
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            {hasDirectContact && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-stone-900">
                  Call or message us
                </h3>
                <p className="mt-2 text-stone-700">
                  Speak to the hotel directly for room availability and current
                  tariffs.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {phones.map((phone) => (
                    <Button
                      key={phone}
                      href={toTelHref(phone)}
                      size="lg"
                      className="w-full sm:w-auto"
                      leftIcon={<Phone aria-hidden="true" className="h-5 w-5" />}
                    >
                      Call {phone}
                    </Button>
                  ))}

                  {whatsappDigits !== '' && (
                    <Button
                      href={toWhatsAppHref(whatsappDigits, contact.defaultEnquiryMessage)}
                      external
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto"
                      leftIcon={
                        <MessageCircle aria-hidden="true" className="h-5 w-5" />
                      }
                    >
                      WhatsApp Enquiry
                      {newTabHint}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {hasVisitInfo && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-stone-900">Visit us</h3>

                <div className="mt-4 flex flex-col gap-4">
                  {address !== '' && (
                    <div className="flex items-start gap-3">
                      <MapPin
                        aria-hidden="true"
                        className="mt-1 h-5 w-5 shrink-0 text-teal-800"
                      />
                      <address className="not-italic text-stone-700">
                        <span className="font-semibold text-stone-900">
                          {hotelConfig.name}
                        </span>
                        <br />
                        {address}
                      </address>
                    </div>
                  )}

                  {(checkIn !== '' || checkOut !== '') && (
                    <div className="flex items-start gap-3">
                      <Clock
                        aria-hidden="true"
                        className="mt-1 h-5 w-5 shrink-0 text-teal-800"
                      />
                      <div className="text-stone-700">
                        {checkIn !== '' && <p>Check-in: {checkIn}</p>}
                        {checkOut !== '' && <p>Check-out: {checkOut}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {mapsUrl !== '' && (
                  <div className="mt-6">
                    <Button
                      href={mapsUrl}
                      external
                      variant="outline"
                      leftIcon={<MapPin aria-hidden="true" className="h-5 w-5" />}
                    >
                      Get Directions
                      {newTabHint}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {hasPlatforms && (
          <div className={hasDirectContact || hasVisitInfo ? 'mt-10' : ''}>
            <h3 className="text-xl font-semibold text-stone-900">
              Prefer to book online?
            </h3>
            <p className="mt-2 max-w-2xl text-stone-700">
              You can also find us on these booking platforms. Payment and
              confirmation are handled on the platform you choose.
            </p>

            <ul className="mt-5 flex flex-wrap gap-3">
              {platforms.map((platform) => (
                <li key={platform.id}>
                  <Button
                    href={platform.url.trim()}
                    external
                    variant="secondary"
                    rightIcon={<ExternalLink aria-hidden="true" className="h-4 w-4" />}
                  >
                    {platform.name}
                    {newTabHint}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}