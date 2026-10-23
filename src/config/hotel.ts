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
    whatsappNumber: '99494 88288',
    address: '14-3-303A, Dr Mahal Rd, opp. Second Choultry, near Railway Station, Ashok Nagar, Tirupati, Andhra Pradesh 517501',
    checkInTime: '12:00 pm',
    checkOutTime: '12:00 pm',
    defaultEnquiryMessage:
      'Hello, I would like to enquire about room availability at Adarsh Residency, Tirupati.',
  },

  location: {
    address: '14-3-303A, Dr Mahal Rd, opp. Second Choultry, near Railway Station, Ashok Nagar, Tirupati, Andhra Pradesh 517501',
    hotelMapsUrl: 'https://www.google.com/maps/place/Adarsh+Residency/@13.6272694,79.4240448,17z/data=!3m1!4b1!4m9!3m8!1s0x3a4d4b60e3acca19:0x4d35b2877459ec78!5m2!4m1!1i2!8m2!3d13.6272694!4d79.4240448!16s%2Fg%2F1ptyl813d?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D',
    railwayStationRouteUrl: 'https://www.google.com/maps/dir/TPTY+Railway+Station+PF+6,+JCG9%2BWH3,+Royal+Nagar,+Tirupati,+Andhra+Pradesh+517501/Adarsh+Residency,+14-3-303A,+Dr+Mahal+Rd,+opp.+Second+Choultry,+near+Railway+Station,+Ashok+Nagar,+Tirupati,+Andhra+Pradesh+517501/@13.6271459,79.4201966,18z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x3a4d4b84931e564f:0x5ef1481ad3a0b4a2!2m2!1d79.4189265!2d13.6272662!1m5!1m1!1s0x3a4d4b60e3acca19:0x4d35b2877459ec78!2m2!1d79.4240448!2d13.6272694!3e9?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D',
    busStationRouteUrl: 'https://www.google.com/maps/dir/Bus+Stand,+11,+Tata+Nagar,+Tirupati,+Andhra+Pradesh+517501/Adarsh+Residency,+14-3-303A,+Dr+Mahal+Rd,+opp.+Second+Choultry,+near+Railway+Station,+Ashok+Nagar,+Tirupati,+Andhra+Pradesh+517501/@13.6281895,79.4240257,17.75z/data=!4m14!4m13!1m5!1m1!1s0x3a4d4ba7ee131aad:0x70ada4efb3e809aa!2m2!1d79.4261608!2d13.6289521!1m5!1m1!1s0x3a4d4b60e3acca19:0x4d35b2877459ec78!2m2!1d79.4240448!2d13.6272694!3e2?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.500852122392!2d79.42404479999999!3d13.627269400000012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b60e3acca19%3A0x4d35b2877459ec78!2sAdarsh%20Residency!5e0!3m2!1sen!2sin!4v1792693079849!5m2!1sen!2sin',
    nearbyPlaces: [
      { name: 'Tirupati Railway Station', distance: '550 m' },
      { name: 'Tirupati Bus Station', distance: '400 m' },
      { name: 'Govindaraja Cholutries', distance: '200 m' },
    ],
  },

  bookingPlatforms: [
    { id: 'makemytrip', name: 'MakeMyTrip', url: 'https://www.makemytrip.com/hotels/adarsh_residency-details-tirupati.html' },
    { id: 'goibibo', name: 'Goibibo', url: 'https://www.goibibo.com/hotels/adarsh-residency-hotel-in-tirupati-4668990928892819590/' },
    { id: 'Justdial', name: 'Justdial', url: 'https://www.justdial.com/Tirupati/Adarsh-Residency-Opposite-Ttd-2Nd-Choultry-Ashok-Nagar/9999PX877-X877-130823180305-B9L5_BZDET' },
  ],
  policies: [],
  socialLinks: [],
};