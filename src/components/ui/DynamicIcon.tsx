'use client';

import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Building2,
  Camera,
  Car,
  Check,
  Clock,
  Coffee,
  Compass,
  ConciergeBell,
  Droplets,
  Fan,
  Flame,
  Hotel,
  KeyRound,
  Luggage,
  MapPin,
  ParkingCircle,
  Phone,
  ShieldCheck,
  Shirt,
  ShowerHead,
  Snowflake,
  Sofa,
  Sparkles,
  Tv,
  Users,
  Wifi,
  Zap,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

/**
 * Explicit registry instead of `import { icons } from 'lucide-react'`,
 * which would ship every Lucide icon to the browser. To support a new
 * icon in `facilities.ts`, import it above and add it here.
 */
const registry: Record<string, LucideIcon> = {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Building2,
  Camera,
  Car,
  Check,
  Clock,
  Coffee,
  Compass,
  ConciergeBell,
  Droplets,
  Fan,
  Flame,
  Hotel,
  KeyRound,
  Luggage,
  MapPin,
  ParkingCircle,
  Phone,
  ShieldCheck,
  Shirt,
  ShowerHead,
  Snowflake,
  Sofa,
  Sparkles,
  Tv,
  Users,
  Wifi,
  Zap,
};

// "Wifi", "wifi" and "WIFI" all resolve to the same icon.
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const lookup = new Map<string, LucideIcon>(
  Object.entries(registry).map(([key, icon]) => [normalize(key), icon]),
);

export interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  /** Lucide icon name, e.g. "Tv" or "ConciergeBell". */
  name: string;
}

export function DynamicIcon({
  name,
  ...props
}: DynamicIconProps) {
  const Icon = lookup.get(normalize(name)) ?? Check;

  if (process.env.NODE_ENV !== 'production' && !lookup.has(normalize(name))) {
    console.warn(
      `[DynamicIcon] Unknown icon "${name}". Add it to the registry in DynamicIcon.tsx.`,
    );
  }

  if (!Icon) return null;
  return <Icon {...props} />;
}