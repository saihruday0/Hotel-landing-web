'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '@/types';
import { GalleryImageView } from './GalleryImageView';

export interface LightboxProps {
  /** The images currently in play (already filtered by category). */
  images: readonly GalleryImage[];
  /** Index into `images`, or `null` when the lightbox is closed. */
  activeIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const controlClasses =
  'absolute z-10 inline-flex h-11 w-11 items-center justify-center rounded-full ' +
  'bg-black/50 text-white transition-colors duration-200 hover:bg-black/70 ' +
  'motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-white';

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onIndexChange,
}: LightboxProps) {
  if (activeIndex === null || typeof document === 'undefined') return null;
  const image = images[activeIndex];
  if (!image) return null;

  return createPortal(
    <LightboxDialog
      image={image}
      index={activeIndex}
      count={images.length}
      onClose={onClose}
      onIndexChange={onIndexChange}
    />,
    document.body,
  );
}

interface LightboxDialogProps {
  image: GalleryImage;
  index: number;
  count: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

function LightboxDialog({
  image,
  index,
  count,
  onClose,
  onIndexChange,
}: LightboxDialogProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const canNavigate = count > 1;

  const goBy = (delta: number) => onIndexChange((index + delta + count) % count);

  // Move focus into the dialog on open; hand it back to the opener on close.
  useEffect(() => {
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeButtonRef.current?.focus();
    return () => {
      opener?.focus();
    };
  }, []);

  // Lock background scroll, compensating for the scrollbar to avoid layout shift.
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  // Keyboard: Escape closes, arrows cycle, Tab is trapped inside the dialog.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
        case 'ArrowLeft':
          if (count > 1) {
            event.preventDefault();
            onIndexChange((index - 1 + count) % count);
          }
          break;
        case 'ArrowRight':
          if (count > 1) {
            event.preventDefault();
            onIndexChange((index + 1) % count);
          }
          break;
        case 'Tab': {
          const container = containerRef.current;
          if (!container) break;
          const focusable =
            container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (!first || !last) break;
          const active = document.activeElement;
          if (!container.contains(active)) {
            event.preventDefault();
            first.focus();
          } else if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [index, count, onClose, onIndexChange]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex flex-col overscroll-contain bg-stone-950/95 text-white"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start === null || end === undefined || !canNavigate) return;
        const delta = end - start;
        if (Math.abs(delta) > 50) goBy(delta < 0 ? 1 : -1);
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className={`${controlClasses} right-3 top-3 sm:right-5 sm:top-5`}
      >
        <X aria-hidden="true" className="h-5 w-5" />
      </button>

      {canNavigate && (
        <>
          <button
            type="button"
            onClick={() => goBy(-1)}
            aria-label="Previous photo"
            className={`${controlClasses} left-2 top-1/2 -translate-y-1/2 sm:left-5`}
          >
            <ChevronLeft aria-hidden="true" className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => goBy(1)}
            aria-label="Next photo"
            className={`${controlClasses} right-2 top-1/2 -translate-y-1/2 sm:right-5`}
          >
            <ChevronRight aria-hidden="true" className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Clicking the empty space around the photo dismisses the lightbox. */}
      <div
        role="presentation"
        className="flex flex-1 items-center justify-center px-4 py-20 sm:px-20"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <figure className="flex w-full max-w-5xl flex-col items-center gap-3">
          <div className="relative h-[60dvh] w-full sm:h-[72dvh]">
            <GalleryImageView
              key={image.id}
              src={image.src}
              alt={image.alt}
              fit="contain"
              quality={85}
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
          <figcaption aria-live="polite" className="text-center">
            <span className="block text-base font-semibold">{image.title}</span>
            <span className="block text-sm text-stone-300">
              {index + 1} of {count}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}