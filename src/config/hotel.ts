import type { HotelInfo } from '@/types';

/**
 * Central hotel information. Edit values here; never in components.
 * Empty strings ("") and empty arrays mean "not configured yet" and
 * cause the related UI to be hidden.
 *
 * TODO (verify before publishing): address, phone numbers, WhatsApp
 * number, check-in/out times, Maps URLs, booking platform URLs.
 */
export const hotelConfig: HotelInfo = {
  name: 'Adarsh Residency',
  tagLine: 'Comfortable stays in the heart of Tirupati',
  locationName: 'Tirupati, Andhra Pradesh',
  description:
    'Adarsh Residency is a family-run hotel in Tirupati offering clean, comfortable AC and Non-AC rooms with warm hospitality for pilgrims, families and business travellers.',

  contact: {
    phones: [],
    whatsappNumber: '',
    address: '',
    checkInTime: '',
    checkOutTime: '',
    defaultEnquiryMessage:
      'Hello, I would like to enquire about room availability at Adarsh Residency, Tirupati.',
  },

  location: {
    address: '',
    hotelMapsUrl: '',
    railwayStationRouteUrl: '',
    busStationRouteUrl: '',
    mapEmbedUrl: '',
    nearbyPlaces: [],
  },

  bookingPlatforms: [
    { id: 'makemytrip', name: 'MakeMyTrip', url: '' },
    { id: 'goibibo', name: 'Goibibo', url: '' },
    { id: 'booking-com', name: 'Booking.com', url: '' },
    { id: 'agoda', name: 'Agoda', url: '' },
  ],
  policies: [],
  socialLinks: [],
};