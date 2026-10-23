import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Catalogue from '@/components/Catalogue';
import { Callout, Crumbs, PageHero, Pill } from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { GRADES } from '@/lib/grades';
import { displayProducts, filtersFor, productsForCountry } from '@/lib/catalogue';

type Params = { country: string };
type Props = { params: Promise<Params> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  const c = getCountry(country);
  return {
    title: 'Shop refurbished phones, laptops and tablets',
    description: `One catalogue of graded refurbished phones, laptops and tablets supplied into ${c.name}. Wholesale from 5 units or single-unit retail, with indicative ${c.currency} pricing ex-works Dubai.`,
    alternates: { canonical: `/${country}/shop` },
  };
}

export default async function ShopPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  const available = productsForCountry(c.code);
  const display = displayProducts(available, c);
  const { categories, storages, variants } = filtersFor(available);

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Every model we supply, in one place"
        lead={`Phones, laptops and tablets, filtered by grade, storage and availability. Build a quote in wholesale or retail pricing. Prices are indicative bands in ${c.currency}, ex-works Dubai, and firm pricing is confirmed on a proforma.`}
        meta={
          <>
            <Pill tone="ok">{available.length} model lines</Pill>
            <Pill tone="info">Wholesale MOQ 5 · Retail MOQ 1</Pill>
            <Pill tone="neutral">Graded A+ to D</Pill>
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <Link className="btn btn--primary" href={`${base}/quote`}>
            Review your quote
          </Link>
          <Link className="btn btn--ghost" href={`${base}/grading-standard`}>
            The grading standard
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <Crumbs base={base} trail={[{ href: `${base}/shop`, label: 'Shop' }]} />

          <div className="grid grid-sidebar">
            <div>
              <h2 id="catalogue">Catalogue</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Mixed models and grades can travel in one shipment. Availability is a planning signal,
                not a reservation — we confirm the lot on the proforma. If a model is not listed for{' '}
                {c.name}, ask anyway; sourcing changes with the lot.
              </p>

              <Catalogue
                products={display}
                categories={categories}
                storages={storages}
                variants={variants}
                variantLabel="Variant"
                grades={GRADES.map((g) => g.code)}
                quoteHref={`${base}/quote`}
                emptyHint="Try widening the grade or availability filter, or send us the models you want and we will tell you what we can actually fill."
                priceCaption={`Indicative, ex-works ${c.currency}`}
              />

              <div style={{ marginTop: '2.4rem' }}>
                <Callout tone="plain" title="One cart, two prices">
                  <p style={{ marginBottom: 0 }}>
                    The same basket is priced twice: a trade band with a 5-unit minimum per line, and a
                    retail band from a single unit. Switch modes on the catalogue or in the quote and
                    nothing you have added is lost.
                  </p>
                </Callout>
              </div>
            </div>

            <aside className="sidebar">
              <div className="side-card">
                <h3>Shop by family</h3>
                <ul className="side-list">
                  <li>
                    <Link href={`${base}/phones`}>Phones</Link>
                  </li>
                  <li>
                    <Link href={`${base}/laptops`}>Laptops</Link>
                  </li>
                  <li>
                    <Link href={`${base}/tablets`}>Tablets</Link>
                  </li>
                </ul>
              </div>
              <div className="side-card">
                <h3>Buying at volume?</h3>
                <p className="small muted">
                  Wholesale lines start at five units. Send the grade mix and destination and we will
                  confirm what the lot can actually fill.
                </p>
                <Link className="btn btn--ghost btn--sm" href={`${base}/contact`}>
                  Talk to sales
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
