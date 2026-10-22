import { Button } from '@/components/ui/Button';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { facilitiesConfig } from '@/config/facilities';

const PREVIEW_COUNT = 6;

/** Homepage Section 5: Facilities. Only items present in `facilitiesConfig` are shown. */
export function FacilitiesPreview() {
  // Follows the config convention: nothing configured means nothing rendered.
  if (facilitiesConfig.length === 0) return null;

  const facilities = facilitiesConfig.slice(0, PREVIEW_COUNT);

  return (
    <section
      id="facilities"
      aria-labelledby="facilities-heading"
      className="scroll-mt-20 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <h2
            id="facilities-heading"
            className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"
          >
            Facilities
          </h2>
          <p className="mt-3 text-lg text-stone-700">
            The essentials for a comfortable stay in Tirupati.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <li
              key={facility.id}
              className="flex items-start gap-4 rounded-xl border border-stone-200 bg-stone-50 p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-800">
                <DynamicIcon
                  name={facility.iconName}
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </span>
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  {facility.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-700">
                  {facility.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button href="/facilities" variant="outline" size="lg">
            View All Facilities
          </Button>
        </div>
      </div>
    </section>
  );
}