import type { Room } from '@/types';

/**
 * Room categories. Prices and occupancy are PLACEHOLDERS and must be
 * confirmed with the hotel before publishing. Set `pricePerNight` to
 * `null` to hide a price. Add a new object to add a new category.
 */
export const roomsConfig: Room[] = [
  {
    id: 'standard-non-ac',
    title: 'Standard Non-AC Room',
    description:
      'A simple, clean and budget-friendly room, ideal for short stays and solo or couple travellers.',
    acType: 'Non-AC',
    occupancy: { adults: 2, children: 1 },
    amenities: ['Television', 'Hot & Cold Water', 'Attached Bathroom', 'Room Service'],
    pricePerNight: 1200,
    images: [
      '/images/rooms/standard-non-ac-1.jpg',
      '/images/rooms/standard-non-ac-2.jpg',
    ],
    featured: false,
  },
  {
    id: 'deluxe-ac',
    title: 'Deluxe AC Room',
    description:
      'A comfortable air-conditioned room with added space, suited to couples and small families.',
    acType: 'AC',
    occupancy: { adults: 2, children: 1 },
    amenities: [
      'Air Conditioning',
      'Television',
      'Hot & Cold Water',
      'Attached Bathroom',
      'Room Service',
    ],
    pricePerNight: 1800,
    images: [
      '/images/rooms/deluxe-ac-1.jpg',
      '/images/rooms/deluxe-ac-2.jpg',
    ],
    featured: true,
  },
  {
    id: 'executive-family-ac',
    title: 'Executive Family AC Room',
    description:
      'A spacious air-conditioned room designed for families and small groups travelling together.',
    acType: 'AC',
    occupancy: { adults: 4, children: 2 },
    amenities: [
      'Air Conditioning',
      'Television',
      'Hot & Cold Water',
      'Attached Bathroom',
      'Room Service',
      'Spacious Seating Area',
    ],
    pricePerNight: 2500,
    images: [
      '/images/rooms/executive-family-ac-1.jpg',
      '/images/rooms/executive-family-ac-2.jpg',
    ],
    featured: true,
  },
];