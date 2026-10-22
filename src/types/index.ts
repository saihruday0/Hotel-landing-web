/**
 * Shared domain types for the Adarsh Residency website.
 *
 * Convention: any string field documented as "optional URL/text" uses an
 * empty string ("") to mean "not configured". Consuming components must
 * not render the related UI (button, link, section) when the value is "".
 */

/* ------------------------------ Rooms ------------------------------ */

export type AcType = 'AC' | 'Non-AC';

export interface RoomOccupancy {
  adults: number;
  children: number;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  acType: AcType;
  occupancy: RoomOccupancy;
  amenities: string[];
  /** `null` means the price is not published; hide the price UI. */
  pricePerNight: number | null;
  /** Paths under /public, e.g. "/images/rooms/deluxe-ac-1.jpg". */
  images: string[];
  featured: boolean;
}

/* ---------------------------- Facilities --------------------------- */

export interface Facility {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name, e.g. 'Tv', 'Wifi', 'Car', 'Clock', 'Shirt', 'Compass'. */
  iconName: string;
}

/* ----------------------------- Gallery ----------------------------- */

export type GalleryCategory =
  | 'rooms'
  | 'exterior'
  | 'reception'
  | 'common'
  | 'facilities';

export interface GalleryImage {
  id: string;
  title: string;
  category: GalleryCategory;
  src: string;
  alt: string;
}

/* ----------------------------- Location ---------------------------- */

export interface NearbyPlace {
  name: string;
  /** Only set when verified, e.g. "1.2 km". */
  distance?: string;
}

export interface LocationConfig {
  address: string;
  /** Optional URL: "" hides "Get Directions" and map links. */
  hotelMapsUrl: string;
  /** Optional URL: "" hides the "From Railway Station" button. */
  railwayStationRouteUrl: string;
  /** Optional URL: "" hides the "From Bus Station" button. */
  busStationRouteUrl: string;
  /** Optional URL: "" hides the embedded map. */
  mapEmbedUrl: string;
  nearbyPlaces: NearbyPlace[];
}

/* ------------------------------ Contact ---------------------------- */

export interface ContactConfig {
  /** Empty array hides click-to-call buttons. */
  phones: string[];
  /** Digits with country code, no "+" or spaces. "" hides the WhatsApp button. */
  whatsappNumber: string;
  address: string;
  /** "" hides the check-in line. */
  checkInTime: string;
  /** "" hides the check-out line. */
  checkOutTime: string;
  /** Pre-filled WhatsApp enquiry text. */
  defaultEnquiryMessage: string;
}

/* ------------------------- Booking platforms ----------------------- */

export interface BookingPlatform {
  id: string;
  name: string;
  /** "" hides this platform's button. If every URL is "", hide the whole section. */
  url: string;
}

/* ------------------------------ Hotel ------------------------------ */

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'youtube';
  url: string;
}

export interface HotelPolicy {
  title: string;
  description: string;
}

// Ensure HotelInfo includes them:
export interface HotelInfo {
  name: string;
  tagLine: string;
  locationName: string;
  description: string;
  contact: ContactConfig;
  location: LocationConfig;
  bookingPlatforms: BookingPlatform[];
  policies?: HotelPolicy[];
  socialLinks?: SocialLink[];
}