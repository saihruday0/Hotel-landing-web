/**
 * Main navigation, shared by Navbar and Footer.
 *
 * - `sectionId`: id of the homepage section ("" for Home itself).
 *   On "/" the Navbar scrolls to `#sectionId`.
 * - `path`: dedicated page, used on subpages and in the Footer.
 */
export interface NavItem {
  label: string;
  sectionId: string | null;
  path: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', sectionId: null, path: '/' },
  { label: 'Rooms', sectionId: 'rooms', path: '/rooms' },
  { label: 'Facilities', sectionId: 'facilities', path: '/facilities' },
  { label: 'Gallery', sectionId: 'gallery', path: '/gallery' },
  { label: 'Location', sectionId: 'location', path: '/location' },
  { label: 'Contact', sectionId: 'contact', path: '/contact' },
];

/** "Book Your Stay" always targets the homepage #contact section. */
export const bookingCta = {
  label: 'Book Your Stay',
  sectionId: 'contact',
} as const;