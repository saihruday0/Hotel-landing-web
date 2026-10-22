'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;    // In milliseconds, e.g., 0, 150, 300
  duration?: number; // In milliseconds, default 700ms
}

export function FadeIn({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 700,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once it reveals, unobserve so it stays visible
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      {
        threshold: 0.1, // Fires when 10% of element is scrolled into view
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const el = domRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100';

    switch (direction) {
      case 'up':
        return 'translate-y-12 opacity-0';
      case 'down':
        return '-translate-y-12 opacity-0';
      case 'left':
        return 'translate-x-12 opacity-0';
      case 'right':
        return '-translate-x-12 opacity-0';
      case 'none':
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all cubic-bezier(0.16, 1, 0.3, 1) transform ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
}