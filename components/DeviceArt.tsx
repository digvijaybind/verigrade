import type { Family } from '@/lib/catalogue';

/**
 * Inline device silhouettes. Deliberately abstract — a B2B wholesale site has
 * no business showing photography of stock it has not received yet, and a
 * generic line drawing reads as a placeholder rather than a promise.
 */
export default function DeviceArt({ family }: { family: Family }) {
  if (family === 'laptop') {
    return (
      <svg className="device-art" viewBox="0 0 160 120" role="img" aria-label="Laptop illustration">
        <rect x="34" y="18" width="92" height="58" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <rect x="40" y="24" width="80" height="46" rx="2" fill="currentColor" fillOpacity="0.35" />
        <path d="M20 84h120l-8 12H28z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M64 84h32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (family === 'tablet') {
    return (
      <svg className="device-art" viewBox="0 0 140 160" role="img" aria-label="Tablet illustration">
        <rect x="18" y="16" width="104" height="128" rx="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <rect x="26" y="26" width="88" height="104" rx="4" fill="currentColor" fillOpacity="0.3" />
        <circle cx="70" cy="138" r="3.4" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    );
  }

  return (
    <svg className="device-art" viewBox="0 0 120 160" role="img" aria-label="Phone illustration">
      <rect x="22" y="8" width="76" height="144" rx="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="29" y="20" width="62" height="116" rx="4" fill="currentColor" fillOpacity="0.3" />
      <path d="M52 14h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="145" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}
