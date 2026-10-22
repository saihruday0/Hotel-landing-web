import type { Facility } from '@/types';

/**
 * Facilities shown on the site. Only add facilities confirmed by the
 * hotel (e.g. Wi-Fi, lift). `iconName` must match a Lucide icon name.
 */
export const facilitiesConfig: Facility[] = [
  {
    id: 'room-service',
    title: '24-Hour Room Service',
    description: 'Round-the-clock assistance so your needs are met at any hour.',
    iconName: 'Clock',
  },
  {
    id: 'laundry',
    title: 'In-House Laundry',
    description: 'Convenient laundry service for guests on longer stays.',
    iconName: 'Shirt',
  },
  {
    id: 'travel-desk',
    title: 'Travel Desk',
    description: 'Help with local travel arrangements and sightseeing in and around Tirupati.',
    iconName: 'Compass',
  },
  {
    id: 'television',
    title: 'Television',
    description: 'Television available in the rooms for your entertainment.',
    iconName: 'Tv',
  },
  {
    id: 'hot-cold-water',
    title: 'Hot & Cold Water',
    description: 'Hot and cold running water available for a comfortable stay.',
    iconName: 'ShowerHead',
  },
  {
    id: 'parking',
    title: 'Parking',
    description: 'Parking space available for guests arriving by vehicle.',
    iconName: 'Car',
  },
];