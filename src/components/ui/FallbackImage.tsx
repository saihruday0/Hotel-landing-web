'use client';

import Image, { type ImageProps } from 'next/image';
import { useState, type ReactNode } from 'react';

interface FallbackImageProps extends ImageProps {
  /** Rendered instead of the image if it fails to load (e.g. file not added yet). */
  fallback?: ReactNode;
}

/**
 * Thin wrapper around `next/image`. Photos are added to /public over time,
 * so a missing file should degrade to a clean placeholder, not a broken icon.
 */
export function FallbackImage({
  fallback = null,
  onError,
  ...imageProps
}: FallbackImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <Image
      {...imageProps}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}