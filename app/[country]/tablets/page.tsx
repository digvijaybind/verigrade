import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Catalogue from '@/components/Catalogue';
import { Callout, Card, Crumbs, PageHero, Pill, TableWrap, Td, Th } from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { GRADES } from '@/lib/grades';
import {
  TABLETS,
  categoriesFor,
  displayProducts,
  storagesFor,
  variantsFor,
} from '@/lib/catalogue';

type Params = { country: string };
type Props = { params: Promise<Params> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  const c = getCountry(country);
  return {
    title: 'Refurbished tablets — wholesale',
    description: `Graded refurbished tablets supplied into ${c.name} from Dubai. iPad and Galaxy Tab lines with battery floors, activation-lock removal and per-unit reports. Indicative ${c.currency} pricing.`,
    alternates: { canonical: `/${country}/tablets` },
  };
}

const TABLET_CHECKS = [
  {
    k: 'Display and digitiser',
    v: 'Full touch map across the panel, no dead zones, and a check for aftermarket glass or digitiser replacement.',
  },
  {
    k: 'Battery',
    v: 'Cycle count and design-capacity reading recorded per unit. Grade A floor is 85% of design capacity.',
  },
  {
    k: 'Activation and account locks',
    v: 'iCloud activation lock and Google/Samsung account locks removed and verified before the unit is listed.',
  },
  {
    k: 'Connectivity',
    v: 'Wi-Fi, Bluetooth and, on cellular SKUs, SIM detection and data session tested.',
  },
  {
    k: 'Cameras and audio',
    v: 'Front and rear capture, speaker and microphone checked, with focus and image-sensor faults rejected.',
  },
  {
    k: 'Housing and ports',
    v: 'Charge port, buttons and housing inspected under the same cosmetic standard used for phones.',
  },
];

export default async function TabletsPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  const available = TABLETS.filter((p) => p.markets.includes(c.code));
  const excluded = TABLETS.filter((p) => !p.markets.includes(c.code));
  const display = displayProducts(available, c);

  return (
    <>
      <PageHero
        eyebrow="Wholesale catalogue"
        title="Refurbished tablets"
        lead={`Graded tablets on the same standard as our phones, with battery health stated per unit and activation locks removed and verified. Mixed models and grades in one shipment. Supplying ${c.name}.`}
        meta={
          <>
            <Pill tone="ok">Wholesale MOQ 5 · Retail MOQ 1</Pill>
            <Pill tone="info">{available.length} model lines</Pill>
            <Pill tone="neutral">Graded A+ to D</Pill>
            <Pill tone="warn">Locks verified removed</Pill>
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <Link className="btn btn--primary" href={`${base}/quote`}>
            Add to a quote
          </Link>
          <Link className="btn btn--ghost" href={`${base}/grading-standard`}>
            The grading standard
          </Link>
          <Link className="btn btn--ghost" href={`${base}/phones`}>
            Phones →
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/tablets`, label: 'Tablets' }]} />

              <h2 id="catalogue">1. Catalogue</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Prices are <b>indicative bands in {c.currency}, ex-works Dubai</b>. Firm pricing is
                issued on a proforma against a confirmed quantity, grade mix and destination. Cellular
                and Wi-Fi variants are priced separately because the split is the most common source of
                a dispute on tablets.
              </p>

              <Catalogue
                products={display}
                categories={categoriesFor('tablet')}
                storages={storagesFor('tablet')}
                variants={variantsFor('tablet')}
                variantLabel="Connectivity"
                grades={GRADES.map((g) => g.code)}
                quoteHref={`${base}/quote`}
                emptyHint="Try widening the grade or availability filter, or send us the models you want and we will tell you what we can actually fill."
                priceCaption={`Indicative, ex-works ${c.currency}`}
              />

              {excluded.length > 0 ? (
                <div style={{ marginTop: '2rem' }}>
                  <Callout
                    tone="plain"
                    title={`${excluded.length} model line${excluded.length > 1 ? 's are' : ' is'} not supplied into ${c.name}`}
                  >
                    <p style={{ marginBottom: '.7rem' }}>{excluded.map((p) => p.name).join(' · ')}</p>
                    <p style={{ marginBottom: 0 }}>
                      We would rather say so than let you find out at customs. If you need one of these,
                      ask — availability changes with the source lot and we may be able to source it
                      specifically.
                    </p>
                  </Callout>
                </div>
              ) : null}

              <h2 id="testing" style={{ marginTop: '3rem' }}>
                2. What we check on a tablet
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A tablet fails differently from a phone: the panel is the expensive part, and an
                aftermarket digitiser is easy to miss on a photograph. These are the points that decide
                the grade.
              </p>
              <TableWrap>
                <thead>
                  <tr>
                    <Th>Check</Th>
                    <Th>What is measured</Th>
                  </tr>
                </thead>
                <tbody>
                  {TABLET_CHECKS.map((row) => (
                    <tr key={row.k}>
                      <Td>
                        <b>{row.k}</b>
                      </Td>
                      <Td>{row.v}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <div className="grid grid-2" style={{ marginTop: '2rem' }}>
                <Card title="Why tablets, not just phones" icon="chip">
                  <p className="small muted" style={{ marginBottom: 0 }}>
                    Tablets carry a higher value per unit than mid-range phones and are often bought in
                    education and corporate batches. That makes lot-level traceability more valuable, not
                    less, and it is why every tablet leaves with a per-unit report.
                  </p>
                </Card>
                <Card title="Accessories are not included" icon="box" iconTone="warn">
                  <p className="small muted" style={{ marginBottom: 0 }}>
                    Pencils, keyboards and cases are not part of the unit price unless the proforma says
                    so. If you need them, put it in the notes and we will quote them separately.
                  </p>
                </Card>
              </div>
            </div>

            <aside className="sidebar">
              <div className="side-card">
                <h3>Buying at volume?</h3>
                <p className="small muted">
                  Send the grade mix and destination. We confirm what the lot can actually fill rather
                  than quoting to the catalogue.
                </p>
                <Link className="btn btn--ghost btn--sm" href={`${base}/contact`}>
                  Talk to sales
                </Link>
              </div>
              <div className="side-card">
                <h3>Related</h3>
                <ul className="side-list">
                  <li>
                    <Link href={`${base}/phones`}>Phones catalogue</Link>
                  </li>
                  <li>
                    <Link href={`${base}/laptops`}>Laptops catalogue</Link>
                  </li>
                  <li>
                    <Link href={`${base}/assurance`}>Quality assurance</Link>
                  </li>
                  <li>
                    <Link href={`${base}/data-security`}>Data destruction</Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
