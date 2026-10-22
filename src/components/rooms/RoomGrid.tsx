'use client';

import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { RoomCard } from '@/components/rooms/RoomCard';
import type { AcType, Room } from '@/types';

type Filter = 'All' | AcType;

const FILTERS: readonly Filter[] = ['All', 'AC', 'Non-AC'];

const FILTER_LABELS: Record<Filter, string> = {
  All: 'All rooms',
  AC: 'AC',
  'Non-AC': 'Non-AC',
};

interface RoomsGridProps {
  rooms: readonly Room[];
}

export function RoomsGrid({ rooms }: RoomsGridProps) {
  const [filter, setFilter] = useState<Filter>('All');

  const counts = useMemo<Record<Filter, number>>(
    () => ({
      All: rooms.length,
      AC: rooms.filter((room) => room.acType === 'AC').length,
      'Non-AC': rooms.filter((room) => room.acType === 'Non-AC').length,
    }),
    [rooms],
  );

  // A filter is only useful when both kinds of room exist.
  const showFilter = counts.AC > 0 && counts['Non-AC'] > 0;
  const visibleRooms =
    filter === 'All' ? rooms : rooms.filter((room) => room.acType === filter);

  if (rooms.length === 0) {
    return (
      <p className="text-stone-600">
        Room details are being updated. Please contact us for availability and
        tariffs.
      </p>
    );
  }

  return (
    <div>
      {showFilter && (
        <div
          role="group"
          aria-label="Filter rooms by air conditioning"
          className="mb-8 flex flex-wrap gap-2"
        >
          {FILTERS.map((option) => (
            <Button
              key={option}
              size="md"
              variant={filter === option ? 'primary' : 'outline'}
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {FILTER_LABELS[option]} ({counts[option]})
            </Button>
          ))}
        </div>
      )}

      <p role="status" className="sr-only">
        Showing {visibleRooms.length} of {rooms.length} rooms
      </p>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleRooms.map((room, index) => (
          <li key={room.id}>
            <RoomCard room={room} headingAs="h2" priority={index === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}