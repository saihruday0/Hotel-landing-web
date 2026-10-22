'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number; // Delay in ms, e.g. 100, 200
  duration?: number; // Duration in ms, default 600ms
}

export function FadeIn({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 600,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Unobserve once revealed so it doesn't re-trigger
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up':
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0';
      case 'down':
        return isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0';
      case 'left':
        return isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0';
      case 'right':
        return isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0';
      case 'none':
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out transform will-change-[opacity,transform] ${getDirectionClasses()} ${className}`}
    >
      {children}
    </div>
  );
}