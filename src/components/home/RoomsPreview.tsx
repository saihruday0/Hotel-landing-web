import { Button } from '@/components/ui/Button';
import { RoomCard } from '@/components/rooms/RoomCard';
import { roomsConfig } from '@/config/rooms';
import type { Room } from '@/types';

const PREVIEW_COUNT = 3;

/**
 * Featured rooms first; if fewer than PREVIEW_COUNT are featured, the
 * remaining slots are filled from the other rooms. Config order is kept.
 */
function selectPreviewRooms(rooms: readonly Room[]): Room[] {
  const featured = rooms.filter((room) => room.featured).slice(0, PREVIEW_COUNT);
  const fillers = rooms
    .filter((room) => !room.featured)
    .slice(0, PREVIEW_COUNT - featured.length);
  const selected = new Set<Room>([...featured, ...fillers]);
  return rooms.filter((room) => selected.has(room));
}

export function RoomsPreview() {
  const previewRooms = selectPreviewRooms(roomsConfig);

  if (previewRooms.length === 0) return null;

  return (
    <section
      id="rooms"
      aria-labelledby="rooms-heading"
      className="scroll-mt-20 bg-stone-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="rooms-heading"
            className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
          >
            Rooms &amp; Tariffs
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            Pick the room that suits your stay. Message or call us for current
            tariffs and availability.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewRooms.map((room) => (
            <li key={room.id}>
              <RoomCard room={room} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button href="/rooms" variant="outline" size="lg">
            View All Rooms &amp; Tariffs
          </Button>
        </div>
      </div>
    </section>
  );
}