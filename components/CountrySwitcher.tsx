'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { COUNTRIES, COUNTRY_CODES, REGIONS, type CountryCode } from '@/lib/countries';

/**
 * Market switcher. Switching rewrites only the first path segment, so
 * /us/grading-standard -> /hk/grading-standard keeps the reader on the same
 * document. That is deliberate: the standard is the same document, but the
 * compliance framing and the trade notes are not.
 */
export default function CountrySwitcher({ current }: { current: CountryCode }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const swap = useCallback(
    (next: string) => {
      const parts = pathname.split('/');
      parts[1] = next;
      return parts.join('/') || `/${next}`;
    },
    [pathname],
  );

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const here = COUNTRIES[current];

  return (
    <div className="cswitch" ref={wrapRef}>
      <button
        type="button"
        className="cswitch-btn"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="cc">{here.iso}</span>
        <span>{here.shortName}</span>
        <span className="caret" aria-hidden="true">
          ▼
        </span>
      </button>

      <div className={open ? 'cswitch-panel open' : 'cswitch-panel'} role="dialog" aria-label="Choose your market">
        <h6>Select your market</h6>
        <div className="cswitch-grid">
          {COUNTRY_CODES.map((code) => {
            const c = COUNTRIES[code];
            return (
              <Link
                key={code}
                href={swap(code)}
                className="cswitch-opt"
                aria-current={code === current}
                onClick={() => setOpen(false)}
                hrefLang={c.locale}
              >
                <span className="cc">{c.iso}</span>
                <span>{c.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="cswitch-foot">
          <strong style={{ color: 'var(--ink)' }}>Browsing by region?</strong>{' '}
          {REGIONS.map((r, i) => (
            <span key={r.slug}>
              {i > 0 ? ' · ' : ''}
              <Link href={swap(r.slug)} onClick={() => setOpen(false)}>
                {r.name}
              </Link>
            </span>
          ))}
          <div style={{ marginTop: '.5rem' }}>
            Showing indicative prices in <strong style={{ color: 'var(--ink)' }}>{here.currency}</strong> at a
            planning rate. Firm figures are issued on a proforma.
          </div>
        </div>
      </div>
    </div>
  );
}
