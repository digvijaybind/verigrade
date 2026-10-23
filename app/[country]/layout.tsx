import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartProvider';
import { COUNTRIES, isCountryCode, COUNTRY_CODES, DEFAULT_COUNTRY } from '@/lib/countries';
import { SITE } from '@/lib/site';

type Params = { country: string };
type Props = { children: React.ReactNode; params: Promise<Params> };

export async function generateStaticParams() {
  // Pre-render every market. Nested pages inherit these, so one call here
  // covers the whole site: 12 markets x 17 pages + region landings.
  return COUNTRY_CODES.map((country) => ({ country }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  const c = COUNTRIES[country];
  return {
    title: `${c.name} — ${SITE.descriptor}`,
    description: c.headline,
    alternates: {
      canonical: `/${country}`,
      languages: {
        [c.locale]: `/${country}`,
        'x-default': '/ae',
      },
    },
    openGraph: {
      title: `${SITE.name} — ${c.name}`,
      description: c.headline,
      url: `/${country}`,
    },
  };
}

export default async function CountryLayout({ children, params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();

  const c = COUNTRIES[country];

  return (
    <div data-country={country} dir={c.rtl ? 'rtl' : 'ltr'} lang={c.locale}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <CartProvider>
        <Header country={country} />
        <main id="main">{children}</main>
        <Footer country={country} />
      </CartProvider>
    </div>
  );
}
