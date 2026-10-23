import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Catalogue from '@/components/Catalogue';
import { MarketBrief, MarketStrip } from '@/components/market';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  PageHero,
  Pill,
  TableWrap,
  Td,
  Th,
  Toc,
} from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { GRADES } from '@/lib/grades';
import { GRADING_STANDARD } from '@/lib/site';
import { PHONES, categoriesFor, displayProducts, storagesFor, variantsFor } from '@/lib/catalogue';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#catalogue', label: '1. Catalogue' },
  { href: '#market', label: '2. What moves in your market' },
  { href: '#battery', label: '3. Battery, published per unit' },
  { href: '#variants', label: '4. Read this before quoting' },
  { href: '#grade-d', label: '5. Parts & Grade D' },
  { href: '#ab', label: '6. AB raw stock' },
  { href: '#ordering', label: '7. Ordering notes' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  const c = getCountry(country);
  return {
    title: 'Refurbished phones — wholesale',
    description: `Wholesale refurbished phones from Dubai into ${c.name}. iPhone, Samsung Galaxy and Pixel, graded A+ to D with published battery floors, per-unit IMEI manifest and data-destruction certificates. Indicative ${c.currency} pricing.`,
    alternates: { canonical: `/${country}/phones` },
  };
}

export default async function PhonesPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  // Only models we actually supply into this market.
  const available = PHONES.filter((p) => p.markets.includes(c.code));
  const excluded = PHONES.filter((p) => !p.markets.includes(c.code));

  const display = displayProducts(available, c);

  return (
    <>
      <PageHero
        eyebrow="Wholesale catalogue"
        title="Refurbished phones"
        lead={`Graded A+ to D against a published standard, with battery health stated per unit and a data-destruction certificate for every device. MOQ from 5 units, mixed grades and models in one shipment. Supplying ${c.name}.`}
        meta={
          <>
            <Pill tone="ok">MOQ from 5 units</Pill>
            <Pill tone="info">{available.length} model lines</Pill>
            <Pill tone="neutral">Graded A+ → D</Pill>
            <Pill tone="warn">IMEI screened</Pill>
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <a className="btn btn--primary" href={`${base}/contact`}>
            Request a quote
          </a>
          <a className="btn btn--ghost" href={`${base}/grading-standard`}>
            The grading standard
          </a>
          <a className="btn btn--ghost" href={`${base}/laptops`}>
            Laptops →
          </a>
        </div>
      </PageHero>

      <MarketStrip country={c} base={base} />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/phones`, label: 'Phones' }]} />

              {/* ------------------------------------------ CATALOGUE ---- */}
              <h2 id="catalogue">1. Catalogue</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Prices are <b>indicative wholesale bands in {c.currency}, ex-works Dubai</b>, shown so
                you can size a programme. Firm pricing is issued on a proforma against a confirmed
                quantity, grade mix and destination — grade mix moves the number far more than volume
                does.
              </p>

              <div id="catalogue-list">
                <Catalogue
                  products={display}
                  categories={categoriesFor('phone')}
                  storages={storagesFor('phone')}
                  variants={variantsFor('phone')}
                  variantLabel="Variant"
                  grades={GRADES.map((g) => g.code)}
                  quoteHref={`${base}/quote`}
                  emptyHint="Try widening the grade or availability filter, or send us the models you want and we will tell you what we can actually fill."
                  priceCaption={`Indicative, ex-works · ${c.currency}`}
                />
              </div>

              {excluded.length > 0 ? (
                <Callout tone="plain" title={`${excluded.length} model line${excluded.length > 1 ? 's are' : ' is'} not supplied into ${c.name}`}>
                  <p style={{ marginBottom: '.7rem' }}>
                    {excluded.map((p) => p.name).join(' · ')}
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    We would rather say so than let you find out at customs. If you need one of these,
                    ask — availability changes with the source lot and we may be able to source it
                    specifically.
                  </p>
                </Callout>
              ) : null}

              {/* ------------------------------------------ MARKET ------- */}
              <h2 id="market" style={{ marginTop: '3.5rem' }}>
                2. What moves in {c.name}
              </h2>
              <MarketBrief country={c} />

              {/* ------------------------------------------ BATTERY ------ */}
              <h2 id="battery" style={{ marginTop: '3.5rem' }}>
                3. Battery, published per unit
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A battery percentage without a method is a marketing number. Ours is read from the
                device&rsquo;s battery management system as a percentage of manufacturer design
                capacity, under stated conditions, and printed on the grade report with the cycle count.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Tier</Th>
                    <Th scope="col" num>
                      Design capacity floor
                    </Th>
                    <Th scope="col">What this means commercially</Th>
                  </tr>
                </thead>
                <tbody>
                  {GRADES.filter((g) => g.batteryFloor !== null).map((g) => (
                    <tr key={g.code}>
                      <Td>
                        <span className={`badge ${g.cssClass}`}>{g.code}</span> {g.name}
                      </Td>
                      <Td num mono>
                        ≥ {g.batteryFloor}%
                      </Td>
                      <Td>{g.positioning}</Td>
                    </tr>
                  ))}
                  <tr>
                    <Td>
                      <span className="badge grade-AB">AB</span> Raw
                    </Td>
                    <Td num mono>
                      Per lot
                    </Td>
                    <Td>
                      Stated on the lot sheet. We will not imply a tier floor on stock we have not graded
                      cosmetically.
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <div style={{ marginTop: '1.6rem' }}>
                <Callout tone="warn" title="Below 80%">
                  <p>
                    A device below {GRADING_STANDARD.lowestBatteryFloor}% design capacity is not sold by
                    us as a working device in any tier. It goes to Grade D with the fault recorded, or it
                    is offered to you as a parts unit. This is stricter than most of the market and it
                    protects your reputation at the retail end — a phone that dies in a customer&rsquo;s
                    hand is a return and a bad review, not a sale.
                  </p>
                </Callout>
              </div>

              {/* ------------------------------------------ VARIANTS ---- */}
              <h2 id="variants" style={{ marginTop: '3.5rem' }}>
                4. Read this before you quote a customer
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Four details cause more post-delivery friction than grading does. All four are printed
                on the grade report.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  [
                    'Network variant',
                    'A 5G handset is not usable on some Gulf and African networks. We print 5G or 4G on every report. Do not let your sales team promise a variant we have not specified.',
                  ],
                  [
                    'Storage capacity',
                    'Storage is a spec, not a grade. We sell matched storage across a grade, and we will not quietly substitute capacity. If a lot is short on a tier, the lot sheet says so.',
                  ],
                  [
                    'Parts status and pairing',
                    'A device with a replaced display may not pass your customer’s own genuine-parts check. It is graded C with the reason printed. Sell it as a working device with a replaced screen, not as a premium device.',
                  ],
                  [
                    'Software and region state',
                    'ROM region, carrier lock and activation state are recorded. Regional software support status is a commercial decision on your side, and we will give you the facts to make it.',
                  ],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="info" iconTone="info">
                    {v}
                  </Card>
                ))}
              </div>

              {/* ------------------------------------------ GRADE D ------ */}
              <h2 id="grade-d" style={{ marginTop: '3.5rem' }}>
                5. Parts and Grade D
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Non-functional units and donor components are a legitimate business, and mixing them into
                a graded pallet is how a container arrives with an unknown failure rate. We sort them,
                count them and document them separately.
              </p>

              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                {[
                  ['Sorted by dominant fault', 'Screen, battery, board, camera, water damage, other. You know what you are buying before it lands.'],
                  ['Never mixed', 'Grade D is packed separately, labelled separately and invoiced separately. No exceptions.'],
                  ['No warranty, stated clearly', 'Grade D carries no functional warranty, because the definition of the tier is that it does not work. The grade report says so on the unit.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="parts" iconTone="warn">
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="plain" title="If a supplier mixes grades in a mixed pallet">
                <p>
                  Ask for the grade manifest: a per-unit list showing the grade of every serial in the
                  consignment. If there is no manifest, then nobody knows what is in the container — and
                  the first shipment you sell through will teach you what you actually received. We
                  provide the manifest as standard.
                </p>
              </Callout>

              {/* ------------------------------------------ AB ----------- */}
              <h2 id="ab" style={{ marginTop: '3.5rem' }}>
                6. AB raw stock
              </h2>
              <div className="grid grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
                <div className="prose">
                  <p>
                    AB stock is functionally tested, functionally sound, and cosmetically unsorted. It is
                    the cheapest honest way for a processor to start a new line, because the grading work
                    is already done and the margin stays with you.
                  </p>
                  <p>
                    We sell AB by unit or by declared weight. The battery figure is stated at lot level
                    and printed on the lot sheet, because applying a cosmetic-tier floor to ungraded stock
                    would be a fiction.
                  </p>
                  <p>
                    The trade-off is straightforward and we will state it plainly: you take on the grading
                    labour and the grade risk, and you keep the margin. Some processors do better with AB
                    than with graded stock. Some do not, and it depends entirely on your labour cost and
                    your ability to move volume quickly.
                  </p>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <Card title="What you get" icon="check">
                    <ul style={{ paddingLeft: '1.05rem' }}>
                      <li className="small">All functional test points passed</li>
                      <li className="small">Data destroyed and certificate issued</li>
                      <li className="small">IMEI screened</li>
                      <li className="small">Per-unit serial list</li>
                      <li className="small">Lot-level battery figure</li>
                    </ul>
                  </Card>
                  <Card title="What you take on" icon="alert" iconTone="warn">
                    <ul style={{ paddingLeft: '1.05rem' }}>
                      <li className="small">Cosmetic sorting labour</li>
                      <li className="small">Grade risk on your own output</li>
                      <li className="small">Rework and parts consumption</li>
                      <li className="small">A longer route to margin</li>
                    </ul>
                  </Card>
                </div>
              </div>

              {/* ------------------------------------------ ORDERING ----- */}
              <h2 id="ordering" style={{ marginTop: '3.5rem' }}>
                7. Ordering notes
              </h2>
              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                {[
                  ['MOQ from 5 units', 'Mixed grades and models within one shipment. No pallet or container minimum.'],
                  ['Lead time', 'Stock lines ship in 3–7 working days. Source-specific requests quoted individually.'],
                  ['Payment', 'Bank transfer, with terms available after a first transaction. See the ordering page.'],
                  ['Indicative pricing', 'Bands on this page are planning figures. Firm pricing is on the proforma.'],
                  ['Documentation', 'Per-unit IMEI manifest, grade reports, destruction certificates, packing list, invoice.'],
                  ['Warranty', 'Uniform across all grades A+ to C, with Grade D explicitly excluded.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="file">
                    {v}
                  </Card>
                ))}
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title={`Send us a model list and we will tell you what we can fill into ${c.name}.`}
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Ordering & payment terms', href: `${base}/ordering` }}
                >
                  Include quantities and your grade preference — or say &ldquo;advise&rdquo; and we will
                  propose a mix. You will get a straight answer on availability, including the models we
                  cannot supply on a given week.
                </CtaBand>
              </div>
            </div>

            <Toc title="On this page" items={TOC} />
          </div>
        </div>
      </section>
    </>
  );
}
