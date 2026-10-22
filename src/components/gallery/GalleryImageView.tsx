'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

interface GalleryImageViewProps {
  src: string;
  alt: string;
  sizes: string;
  /** `cover` crops to fill (thumbnails); `contain` shows the whole photo (lightbox). */
  fit?: 'cover' | 'contain';
  quality?: number;
  /** Extra classes for the <img> itself (e.g. hover transforms). */
  className?: string;
}

/**
 * Fills its nearest positioned parent (the parent must be `relative` and sized).
 * Renders an accessible placeholder when `src` is empty or the image fails to load.
 */
export function GalleryImageView({
  src,
  alt,
  sizes,
  fit = 'cover',
  quality,
  className = '',
}: GalleryImageViewProps) {
  // Track the src that failed (rather than a boolean) so a new src retries automatically.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // onError can fire before hydration attaches the handler; catch that case here.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailedSrc(src);
    }
  }, [src]);

  if (src.trim() === '' || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={`${alt} (photo unavailable)`}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-200 p-4 text-center text-stone-600"
      >
        <ImageOff aria-hidden="true" className="h-8 w-8" />
        <span className="text-sm font-medium">Photo unavailable</span>
      </div>
    );
  }

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      loading="lazy"
      onError={() => setFailedSrc(src)}
      className={`${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`.trim()}
    />
  );
}