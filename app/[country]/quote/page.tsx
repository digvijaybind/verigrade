import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import QuoteCart from '@/components/QuoteCart';
import { Callout, Card, Crumbs, PageHero, Pill } from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  const c = getCountry(country);
  return {
    title: 'Your quote',
    description: `Build an itemised quote for refurbished phones, laptops and tablets into ${c.name}. Wholesale from 5 units or single-unit retail, priced ex-works Dubai and confirmed on a proforma.`,
    alternates: { canonical: `/${country}/quote` },
    robots: { index: false, follow: true },
  };
}

const STEPS = [
  {
    title: 'Add models',
    body: 'Pick grade, storage, variant and quantity from the catalogue. The basket keeps wholesale and retail pricing side by side.',
  },
  {
    title: 'Send the request',
    body: 'We receive the itemised list with your destination and Incoterm. No card details, no account, no checkout.',
  },
  {
    title: 'Get a proforma',
    body: 'We confirm grade mix, availability and firm pricing, then issue a proforma with the document list for your market.',
  },
];

export default async function QuotePage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Quote cart"
        title="Review and request your quote"
        lead={`An itemised request, not a card checkout. Prices are indicative bands in ${c.currency} ex-works Dubai; firm pricing follows on a proforma once we confirm the grade mix, availability and destination.`}
        meta={
          <>
            <Pill tone="ok">No payment taken online</Pill>
            <Pill tone="info">Wholesale MOQ 5 · Retail MOQ 1</Pill>
            <Pill tone="neutral">Reply within 1 business day</Pill>
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <Link className="btn btn--primary" href={`${base}/shop`}>
            Keep browsing the shop
          </Link>
          <Link className="btn btn--ghost" href={`${base}/contact`}>
            Full quote form
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <Crumbs base={base} trail={[{ href: `${base}/quote`, label: 'Quote' }]} />

          <div className="grid grid-sidebar">
            <div>
              <h2 id="basket">1. Your basket</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Switch between wholesale and retail pricing at any time. Wholesale has a minimum of 5
                units per line; retail starts at one. Anything you add stays on this device until you
                send it or empty the quote.
              </p>

              <QuoteCart homeCountry={c.code} />

              <h2 id="how" style={{ marginTop: '3rem' }}>
                2. How this works
              </h2>
              <div className="grid grid-3" style={{ marginTop: '1.2rem' }}>
                {STEPS.map((s, i) => (
                  <Card key={s.title} title={s.title} num={String(i + 1)}>
                    <p className="small muted" style={{ margin: 0 }}>
                      {s.body}
                    </p>
                  </Card>
                ))}
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Callout tone="plain" title="What we will not do">
                  <p style={{ marginBottom: '.7rem' }}>
                    We will not confirm a price we cannot hold to. If a model is short, the grade mix you
                    asked for is not available, or the destination needs documentation we cannot supply,
                    we say so in the reply rather than bury it in a proforma.
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    Prices exclude freight, insurance, duties and taxes unless your Incoterm says
                    otherwise. Refurbished devices are not new, and the proforma states that.
                  </p>
                </Callout>
              </div>
            </div>

            <aside className="sidebar">
              <div className="side-card">
                <h3>Need a human?</h3>
                <p className="small muted">
                  If the basket is the wrong shape for what you need, email the list instead. Same
                  inbox, same one-business-day reply.
                </p>
                <a className="btn btn--ghost btn--sm" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </div>

              <div className="side-card">
                <h3>Direct lines</h3>
                <ul className="side-list">
                  <li>
                    <Link href={`${base}/phones`}>Phones catalogue</Link>
                  </li>
                  <li>
                    <Link href={`${base}/laptops`}>Laptops catalogue</Link>
                  </li>
                  <li>
                    <Link href={`${base}/tablets`}>Tablets catalogue</Link>
                  </li>
                  <li>
                    <Link href={`${base}/grading-standard`}>The grading standard</Link>
                  </li>
                  <li>
                    <Link href={`${base}/export-process`}>Export process</Link>
                  </li>
                </ul>
              </div>

              <div className="side-card">
                <h3>MOQ at a glance</h3>
                <p className="small muted" style={{ marginBottom: 0 }}>
                  Wholesale: 5 units per line, mixed models and grades in one shipment. Retail: 1 unit.
                  Both are indicative until the proforma.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
