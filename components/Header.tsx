'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CountrySwitcher from './CountrySwitcher';
import Icon from './Icon';
import { useCart } from './CartProvider';
import { navFor, SITE } from '@/lib/site';
import type { CountryCode } from '@/lib/countries';

export default function Header({ country }: { country: CountryCode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const base = `/${country}`;
  const nav = navFor(base);
  const { count, hydrated } = useCart();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="marketbar">
        <div className="container marketbar-inner">
          <span className="mb-note">
            <b>{SITE.shortLegal}</b> · {SITE.origin}
          </span>
          <div className="mb-right">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <CountrySwitcher current={country} />
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href={base}>
            <Logo />
            <span className="brand-text">
              <span className="brand-name">{SITE.name}</span>
              <span className="brand-sub">Electronics FZ-LLC</span>
            </span>
          </Link>

          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>

          <nav className={open ? 'nav open' : 'nav'} id="nav" aria-label="Main">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link className="nav-cta" href={`${base}/quote`}>
              Request a Quote
            </Link>
          </nav>

          <Link
            className="header-cart"
            href={`${base}/quote`}
            aria-label={
              hydrated && count > 0 ? `Quote cart, ${count} unit${count === 1 ? '' : 's'}` : 'Quote cart'
            }
          >
            <Icon name="cart" size={19} />
            <span className="header-cart-label">Quote</span>
            {hydrated && count > 0 ? <span className="header-cart-count">{count}</span> : null}
          </Link>
        </div>
      </header>
    </>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={`${SITE.name} logo`}>
      <defs>
        <linearGradient id="vgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0E9170" />
          <stop offset="1" stopColor="#0A0F1C" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#vgGrad)" />
      <path
        d="M32 12 L49 18 V31.5 C49 41.5 41.5 48.6 32 52 C22.5 48.6 15 41.5 15 31.5 V18 Z"
        fill="none"
        stroke="#ffffff"
        strokeOpacity=".92"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M23.5 31.5 L29.5 37.5 L41 25"
        fill="none"
        stroke="#4BD6A8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="22" y="42.6" width="5" height="3.2" rx="1.2" fill="#ffffff" fillOpacity=".95" />
      <rect x="29.5" y="42.6" width="5" height="3.2" rx="1.2" fill="#ffffff" fillOpacity=".62" />
      <rect x="37" y="42.6" width="5" height="3.2" rx="1.2" fill="#ffffff" fillOpacity=".34" />
    </svg>
  );
}
