import type { GalleryImage } from '@/types';

/**
 * Gallery entries. Replace placeholder paths with real hotel
 * photographs in /public/images/gallery/. Add or remove entries freely.
 */
export const galleryConfig: GalleryImage[] = [
  {
    id: 'room-deluxe-ac',
    title: 'Deluxe AC Room',
    category: 'rooms',
    src: '/images/gallery/room-deluxe-ac.jpg',
    alt: 'Deluxe AC room at Adarsh Residency, Tirupati',
  },
  {
    id: 'room-standard',
    title: 'Standard Non-AC Room',
    category: 'rooms',
    src: '/images/gallery/room-standard.jpg',
    alt: 'Standard Non-AC room at Adarsh Residency, Tirupati',
  },
  {
    id: 'room-family',
    title: 'Executive Family AC Room',
    category: 'rooms',
    src: '/images/gallery/room-family.jpg',
    alt: 'Executive family AC room at Adarsh Residency, Tirupati',
  },
  {
    id: 'exterior-front',
    title: 'Hotel Front View',
    category: 'exterior',
    src: '/images/gallery/exterior-front.jpg',
    alt: 'Front view of Adarsh Residency building in Tirupati',
  },
  {
    id: 'exterior-entrance',
    title: 'Hotel Entrance',
    category: 'exterior',
    src: '/images/gallery/exterior-entrance.jpg',
    alt: 'Main entrance of Adarsh Residency, Tirupati',
  },
  {
    id: 'reception-desk',
    title: 'Reception Desk',
    category: 'reception',
    src: '/images/gallery/reception-desk.jpg',
    alt: 'Reception desk at Adarsh Residency, Tirupati',
  },
  {
    id: 'facility-parking',
    title: 'Parking Area',
    category: 'facilities',
    src: '/images/gallery/facility-parking.jpg',
    alt: 'Parking area at Adarsh Residency, Tirupati',
  },
  {
    id: 'facility-travel-desk',
    title: 'Travel Desk',
    category: 'facilities',
    src: '/images/gallery/facility-travel-desk.jpg',
    alt: 'Travel desk at Adarsh Residency, Tirupati',
  },
];