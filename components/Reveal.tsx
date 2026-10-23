'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Fades content in on first view. No-ops when IntersectionObserver is absent
 *  or the reader prefers reduced motion. */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={shown ? 'reveal in' : 'reveal'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
