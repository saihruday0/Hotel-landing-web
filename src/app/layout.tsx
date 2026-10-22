import type { Metadata, Viewport } from 'next';
import { Questrial } from 'next/font/google';
import type { ReactNode } from 'react';

import './globals.css';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { HotelJsonLd } from '@/components/seo/HotelJsonLd';
import { hotelConfig } from '@/config/hotel';
import { cityFrom, siteUrl } from '@/lib/site';

const gothic = Questrial({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const { name, description, locationName } = hotelConfig;

/*
 * Canonical URLs are NOT set here on purpose: a canonical in the root layout
 * would be inherited by any page that does not define its own, pointing it at
 * the homepage. Each page exports its own `alternates.canonical`.
 *
 * openGraph is also replaced (not deep-merged) by page-level openGraph, so
 * pages that set it must repeat siteName/locale/type.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: name,
  title: {
    default: `${name} | Hotel in ${locationName}`,
    template: `%s | ${name} ${cityFrom(locationName)}`,
  },
  description,
  openGraph: {
    type: 'website',
    siteName: name,
    locale: 'en_IN',
    title: `${name} | Hotel in ${locationName}`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${name} | Hotel in ${locationName}`,
    description,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#115e59', // teal-800, matches the brand colour
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body
        className={`${gothic.className} flex min-h-screen flex-col bg-white text-stone-900 antialiased`}
      >
        <HotelJsonLd />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-teal-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-teal-700"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}