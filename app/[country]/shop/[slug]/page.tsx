import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeviceArt from '@/components/DeviceArt';
import AddToQuote from '@/components/AddToQuote';
import { Callout, Crumbs, GradeBadge, PageHero, Pill, TableWrap, Td, Th } from '@/components/ui';
import { convert, getCountry, isCountryCode } from '@/lib/countries';
import { GRADE_MAP } from '@/lib/grades';
import { retailBand } from '@/lib/commerce';
import {
  ALL_PRODUCTS,
  productBySlug,
  productsForCountry,
  type Product,
} from '@/lib/catalogue';

type Params = { country: string; slug: string };
type Props = { params: Promise<Params> };

const FAMILY_LABEL: Record<Product['family'], string> = {
  phone: 'Phones',
  laptop: 'Laptops',
  tablet: 'Tablets',
};

export async function generateStaticParams({ params }: { params: Partial<Params> }) {
  const list =
    params.country && isCountryCode(params.country)
      ? productsForCountry(params.country)
      : ALL_PRODUCTS;
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, slug } = await params;
  if (!isCountryCode(country)) return {};
  const p = productBySlug(slug);
  if (!p) return {};
  const c = getCountry(country);
  const desc = p.summary.length > 150 ? `${p.summary.slice(0, 147).trimEnd()}…` : p.summary;
  return {
    title: `${p.name} — refurbished, graded`,
    description: `${desc} Indicative ${c.currency} pricing into ${c.name}, ${p.releaseYear}, grades ${p.grades.join(', ')}.`,
    alternates: { canonical: `/${country}/shop/${p.slug}` },
    openGraph: { title: p.name, description: desc, url: `/${country}/shop/${p.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { country, slug } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const p = productBySlug(slug);
  if (!p || !p.markets.includes(c.code)) notFound();

  const base = `/${c.code}`;
  const wholesale = { from: p.from, to: p.to };
  const retail = retailBand(p.from, p.to, p.retailFrom, p.retailTo);
  const familyHref = `${base}/${p.family === 'phone' ? 'phones' : p.family === 'laptop' ? 'laptops' : 'tablets'}`;
  const stockLabel = p.stock === 'in' ? 'In stock' : p.stock === 'low' ? 'Limited availability' : 'On request';

  return (
    <>
      <PageHero
        eyebrow={`${FAMILY_LABEL[p.family]} · ${p.category}`}
        title={p.name}
        lead={p.summary}
        meta={
          <>
            <Pill tone={p.stock === 'in' ? 'ok' : p.stock === 'low' ? 'warn' : 'neutral'}>
              {stockLabel}
            </Pill>
            <Pill tone="info">Wholesale MOQ 5 · Retail MOQ 1</Pill>
            <Pill tone="neutral">{p.releaseYear}</Pill>
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <Link className="btn btn--ghost" href={`${base}/shop`}>
            Back to shop
          </Link>
          <Link className="btn btn--ghost" href={familyHref}>
            All {FAMILY_LABEL[p.family].toLowerCase()}
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <Crumbs
            base={base}
            trail={[
              { href: `${base}/shop`, label: 'Shop' },
              { href: familyHref, label: FAMILY_LABEL[p.family] },
              { href: `${base}/shop/${p.slug}`, label: p.name },
            ]}
          />

          <div className="grid grid-sidebar">
            <div>
              <div className="grid grid-2" style={{ alignItems: 'start', gap: '2rem' }}>
                <div className="prod-fig" style={{ borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}>
                  <DeviceArt family={p.family} />
                </div>

                <div>
                  <h2 style={{ fontSize: '1.05rem', marginBottom: '.8rem' }}>Pricing</h2>
                  <div className="price-pair">
                    <div className="price-box">
                      <span className="price-box-label">Wholesale</span>
                      <strong>
                        {convert(wholesale.from, c)} – {convert(wholesale.to, c)}
                      </strong>
                      <span className="price-box-note">Per unit, MOQ 5, ex-works Dubai</span>
                    </div>
                    <div className="price-box">
                      <span className="price-box-label">Retail</span>
                      <strong>
                        {convert(retail.from, c)} – {convert(retail.to, c)}
                      </strong>
                      <span className="price-box-note">Per unit, MOQ 1, ex-works Dubai</span>
                    </div>
                  </div>
                  <p className="small muted" style={{ marginTop: '.9rem' }}>
                    Indicative bands in {c.currency}. Firm pricing is issued on a proforma against a
                    confirmed quantity, grade mix and destination. Tax and freight are excluded.
                  </p>

                  <h2 style={{ fontSize: '1.05rem', margin: '1.6rem 0 .7rem' }}>Grades available</h2>
                  <div className="prod-grades">
                    {p.grades.map((g) => (
                      <GradeBadge key={g} code={g} />
                    ))}
                  </div>
                  <p className="small muted" style={{ marginTop: '.7rem' }}>
                    {p.grades
                      .map((g) => `${g}: ${GRADE_MAP[g]?.batteryFloor ?? '—'}% battery floor`)
                      .join(' · ')}
                  </p>

                  <div style={{ marginTop: '1.6rem' }}>
                    <AddToQuote product={p} quoteHref={`${base}/quote`} />
                  </div>
                </div>
              </div>

              <h2 id="specs" style={{ marginTop: '3rem' }}>
                Specification
              </h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Item</Th>
                    <Th>Detail</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>
                      <b>Storage options</b>
                    </Td>
                    <Td>{p.storage.join(', ')}</Td>
                  </tr>
                  <tr>
                    <Td>
                      <b>{p.variantAxis.label}</b>
                    </Td>
                    <Td>{p.variantAxis.values.join(', ')}</Td>
                  </tr>
                  {p.specs.map((s) => (
                    <tr key={s.k}>
                      <Td>
                        <b>{s.k}</b>
                      </Td>
                      <Td>{s.v}</Td>
                    </tr>
                  ))}
                  <tr>
                    <Td>
                      <b>Markets supplied</b>
                    </Td>
                    <Td>{p.markets.length} of 12</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {p.notes.length > 0 ? (
                <div style={{ marginTop: '2rem' }}>
                  <Callout tone="plain" title="Before you order">
                    <ul style={{ marginBottom: 0 }}>
                      {p.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </Callout>
                </div>
              ) : null}
            </div>

            <aside className="sidebar">
              <div className="side-card">
                <h3>Add to a quote</h3>
                <p className="small muted">
                  Pick a grade, storage and quantity above. The quote holds both pricing modes and is
                  confirmed on a proforma.
                </p>
                <Link className="btn btn--ghost btn--sm" href={`${base}/quote`}>
                  View quote
                </Link>
              </div>
              <div className="side-card">
                <h3>Need a different grade mix?</h3>
                <p className="small muted">
                  Mixed grades and models can travel in one shipment. Send the mix you want and we will
                  confirm what the lot can fill.
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
