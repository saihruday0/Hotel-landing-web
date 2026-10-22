import { BedDouble, Building2, Compass, Users, type LucideIcon } from 'lucide-react';

import { FallbackImage } from '@/components/ui/FallbackImage';
import { hotelConfig } from '@/config/hotel';
import { FadeIn } from '@/components/ui/FadeIn';

/** Path under /public. If the file is missing, a neutral panel is shown. */
const ABOUT_IMAGE = '/images/hotel/about.jpg';

interface Highlight {
  icon: LucideIcon;
  title: string;
  body: string;
}

/**
 * Only claims that are already stated in `hotelConfig.description`
 * (AC and Non-AC rooms, family-run, pilgrims/families/business travellers).
 * Room count, distances and landmarks are deliberately left out until verified.
 */
const highlights: Highlight[] = [
  {
    icon: BedDouble,
    title: 'AC and Non-AC rooms',
    body: 'Choose the room type that suits your budget and the length of your stay.',
  },
  {
    icon: Users,
    title: 'Family-run hospitality',
    body: 'Personal attention from a team that treats guests the way it would treat its own family.',
  },
  {
    icon: Compass,
    title: 'Welcome for every traveller',
    body: 'Pilgrims, families on holiday and business guests are all looked after.',
  },
];

/** Homepage Section 3: About the hotel. */
export function AboutSection() {
  const { name, locationName, description } = hotelConfig;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-20"
    >
      <FadeIn direction="up" delay={300}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100">
          <FallbackImage
            src={ABOUT_IMAGE}
            alt={`${name} in ${locationName}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            fallback={
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-stone-100 text-teal-800">
                <Building2 aria-hidden="true" className="h-12 w-12" />
                <span className="text-lg font-semibold text-stone-800">{name}</span>
              </div>
            }
          />
        </div>

        <div>
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
          >
            Welcome to {name}
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-stone-700">
            {description}
          </p>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-stone-700">
            Tirupati receives pilgrims and visitors throughout the year. Our aim is
            simple: a clean, comfortable room to rest in, and friendly help with the
            practical side of your visit.
          </p>

          <ul className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {highlights.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Icon aria-hidden="true" className="h-6 w-6 text-teal-800" />
                <h3 className="mt-3 text-base font-semibold text-stone-900">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-700">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  </section>
  );
}