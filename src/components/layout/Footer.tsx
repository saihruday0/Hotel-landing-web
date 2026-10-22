import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { navItems } from '@/config/navigation';
import { hotelConfig } from '@/config/hotel';
import type { SocialLink } from '@/types';

const socialLabels: Record<SocialLink['platform'], string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'X (Twitter)',
  youtube: 'YouTube',
};

const initials = hotelConfig.name
  .split(' ')
  .map((word) => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

const linkClasses =
  'inline-flex min-h-11 items-center rounded-md text-stone-700 hover:text-teal-800 hover:underline ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700';

export function Footer() {
  const { name, tagLine, contact, location, bookingPlatforms, socialLinks } =
    hotelConfig;

  const address = (contact.address || location.address).trim();
  const phones = contact.phones.filter((p) => p.trim() !== '');
  const mapsUrl = location.hotelMapsUrl.trim();
  const platforms = bookingPlatforms.filter((p) => p.url.trim() !== '');
  const socials = (socialLinks ?? []).filter((s) => s.url.trim() !== '');

  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              {/* Logo placeholder: swap for <Image src="/logo/logo.svg" /> later */}
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-800 text-sm font-bold text-white"
              >
                {initials}
              </span>
              <span className="text-lg font-semibold text-stone-900">{name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-stone-600">
              {tagLine}
            </p>
            {mapsUrl && (
              <div className="mt-5">
                <Button
                  href={mapsUrl}
                  external
                  variant="outline"
                  leftIcon={<MapPin aria-hidden="true" className="h-5 w-5" />}
                >
                  Get Directions
                  <span className="sr-only"> (opens in a new tab)</span>
                </Button>
              </div>
            )}
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-stone-900">Quick links</h2>
            <ul className="mt-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.path} className={`${linkClasses} text-sm`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-stone-900">Contact</h2>
            <div className="mt-3 space-y-3 text-sm text-stone-700">
              {address && (
                <p className="flex items-start gap-2 leading-6">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-teal-800"
                  />
                  <span>{address}</span>
                </p>
              )}
              {phones.length > 0 && (
                <ul>
                  {phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                        className={`${linkClasses} gap-2`}
                      >
                        <Phone aria-hidden="true" className="h-4 w-4 text-teal-800" />
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Booking platforms + social: each block hides when empty */}
          {(platforms.length > 0 || socials.length > 0) && (
            <div className="space-y-8">
              {platforms.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-stone-900">
                    Book online
                  </h2>
                  <ul className="mt-3">
                    {platforms.map((platform) => (
                      <li key={platform.id}>
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${linkClasses} text-sm`}
                        >
                          {platform.name}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {socials.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-stone-900">Follow us</h2>
                  <ul className="mt-3">
                    {socials.map((social) => (
                      <li key={social.platform}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${linkClasses} text-sm`}
                        >
                          {socialLabels[social.platform]}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6 text-sm text-stone-600">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}