import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE } from '@/lib/site';
import { COUNTRIES, COUNTRY_CODES } from '@/lib/countries';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.descriptor}, Dubai`,
    template: `%s · ${SITE.shortLegal}`,
  },
  description:
    'Wholesale refurbished phones and laptops from Dubai Airport Freezone. Published grading standard, stated battery-health floors, per-unit data-destruction certificates, and a written IMEI guarantee.',
  applicationName: SITE.name,
  keywords: [
    'refurbished phones wholesale',
    'used mobile phones dubai',
    'refurbished laptops wholesale',
    'graded phones dubai',
    'DAFZA electronics',
    'used iphone wholesale',
    'business laptop refurbishment dubai',
    'IMEI checked refurbished devices',
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.descriptor}`,
    description:
      'Published grading standard. Stated battery floors. Per-unit data-destruction certificates. A written IMEI guarantee.',
    url: SITE.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.descriptor}`,
    description:
      'Published grading standard. Stated battery floors. Per-unit data-destruction certificates.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    languages: Object.fromEntries([
      ...COUNTRY_CODES.map((c) => [COUNTRIES[c].locale, `/${c}`]),
      ['x-default', '/ae'],
    ]),
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0F1C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
