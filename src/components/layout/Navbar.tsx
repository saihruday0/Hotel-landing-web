'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Menu, Phone, X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { bookingCta, navItems, type NavItem } from '@/config/navigation';
import { hotelConfig } from '@/config/hotel';

const initials = hotelConfig.name
  .split(' ')
  .map((word) => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();

const firstPhone = hotelConfig.contact.phones[0] ?? '';

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* ---------- Scroll state: shadow/blur + "back at top" reset ---------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (onHome && window.scrollY < 120) setActiveSection(null);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  /* ---------- Highlight the homepage section currently in view ---------- */
  useEffect(() => {
    if (!onHome) {
      setActiveSection(null);
      return;
    }
    const sections = navItems
      .map((item) => item.sectionId)
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  /* ---------- Close drawer on route change and when resizing to desktop ---------- */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* ---------- Drawer: scroll lock, focus, Escape, focus trap ---------- */
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeAndRestoreFocus = () => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  /* ---------- Hybrid navigation ---------- */
  // On "/": smooth-scroll to the section. Elsewhere: normal navigation.
  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
    sectionId: string | null,
  ) => {
    setMenuOpen(false);
    if (!onHome || !sectionId) return;

    const target = document.getElementById(sectionId);
    if (!target) return; // section not rendered: fall back to default hash jump

    e.preventDefault();
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    history.pushState(null, '', `#${sectionId}`);
  };

  const hrefFor = (item: NavItem) => {
    if (!onHome) return item.path;
    return item.sectionId ? `#${item.sectionId}` : '/';
  };

  const isActive = (item: NavItem) =>
    onHome
      ? item.sectionId === null
        ? activeSection === null
        : activeSection === item.sectionId
      : item.path === '/'
        ? false
        : pathname === item.path || pathname.startsWith(`${item.path}/`);

  const ctaHref = onHome ? `#${bookingCta.sectionId}` : `/#${bookingCta.sectionId}`;

  const linkClasses = (active: boolean) =>
    [
      'rounded-md px-3 py-2 text-sm font-medium transition-colors motion-reduce:transition-none',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700',
      active
        ? 'bg-teal-50 text-teal-800'
        : 'text-stone-700 hover:bg-stone-100 hover:text-teal-800',
    ].join(' ');

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 motion-reduce:transition-none',
          scrolled
            ? 'border-stone-200 bg-white/85 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-white',
        ].join(' ')}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            {/* Logo placeholder: swap for <Image src="/logo/logo.svg" /> later */}
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-800 text-sm font-bold text-white"
            >
              {initials}
            </span>
            <span className="text-lg font-semibold text-stone-900">
              {hotelConfig.name}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.label}>
                    <Link
                      href={hrefFor(item)}
                      onClick={(e) => handleClick(e, item.sectionId)}
                      aria-current={active ? (onHome ? 'location' : 'page') : undefined}
                      className={linkClasses(active)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button
                href={ctaHref}
                onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e, bookingCta.sectionId)}
              >
                {bookingCta.label}
              </Button>
            </div>

            {/* Mobile / tablet toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-stone-800 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 lg:hidden"
            >
              <Menu aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/*
        Drawer is a sibling of <header>, not a child: backdrop-filter on the
        header would otherwise become the containing block for `fixed`.
        `invisible` removes closed links from the tab order.
      */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        aria-hidden={!menuOpen}
        className={[
          'fixed inset-0 z-[60] transition-[visibility] duration-300 lg:hidden',
          menuOpen ? 'visible' : 'invisible',
        ].join(' ')}
      >
        <div
          aria-hidden="true"
          onClick={closeAndRestoreFocus}
          className={[
            'absolute inset-0 bg-stone-900/50 transition-opacity duration-300 motion-reduce:transition-none',
            menuOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />

        <div
          ref={panelRef}
          className={[
            'absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col bg-white shadow-xl',
            'transition-transform duration-300 ease-out motion-reduce:transition-none',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          <div className="flex h-16 items-center justify-between border-b border-stone-200 px-4">
            <span className="text-lg font-semibold text-stone-900">
              {hotelConfig.name}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={closeAndRestoreFocus}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-stone-800 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
            <ul>
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.label}>
                    <Link
                      href={hrefFor(item)}
                      onClick={(e) => handleClick(e, item.sectionId)}
                      aria-current={active ? (onHome ? 'location' : 'page') : undefined}
                      className={[
                        'flex min-h-12 items-center rounded-lg px-4 text-base font-medium',
                        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700',
                        active
                          ? 'bg-teal-50 text-teal-800'
                          : 'text-stone-800 hover:bg-stone-100',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-stone-200 p-4">
            <Button
              href={ctaHref}
              onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e, bookingCta.sectionId)}
              fullWidth
              size="lg"
            >
              {bookingCta.label}
            </Button>
            {firstPhone && (
              <Button
                href={`tel:${firstPhone.replace(/[^\d+]/g, '')}`}
                variant="outline"
                fullWidth
                size="lg"
                leftIcon={<Phone aria-hidden="true" className="h-5 w-5" />}
              >
                Call {firstPhone}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}