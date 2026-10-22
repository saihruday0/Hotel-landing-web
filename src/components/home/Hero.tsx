import { Button } from '@/components/ui/Button';
import { FallbackImage } from '@/components/ui/FallbackImage';
import { hotelConfig } from '@/config/hotel';

/** Path under /public. If the file is missing, the dark teal backdrop shows instead. */
const HERO_IMAGE = '/images/hotel/hero.jpg';

/**
 * One restrained page-load reveal for the headline block. It is wrapped in
 * `prefers-reduced-motion: no-preference`, so it never runs for people who
 * have asked for less motion.
 */
const heroMotionCss = `
@keyframes hero-rise {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: no-preference) {
  .hero-rise { animation: hero-rise 0.7s ease-out both; }
}
`;

/** Homepage Section 2: Hero. */
export function Hero() {
  const { name, tagLine, locationName, description } = hotelConfig;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[34rem] items-center overflow-hidden bg-gradient-to-br from-teal-900 to-stone-950 sm:min-h-[38rem] lg:min-h-[42rem]"
    >
      <style>{heroMotionCss}</style>

      {/* Decorative backdrop: the heading already names the hotel. */}
      <FallbackImage
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/85 via-stone-950/60 to-stone-950/25"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="hero-rise max-w-2xl">
          <p className="text-base font-medium text-teal-100">{locationName}</p>
          <h1
            id="hero-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {name}
          </h1>
          <p className="mt-4 text-xl font-medium text-stone-100 sm:text-2xl">
            {tagLine}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-200 sm:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" size="lg">
              Book Your Stay
            </Button>
            <Button href="#rooms" variant="secondary" size="lg">
              View Rooms
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}