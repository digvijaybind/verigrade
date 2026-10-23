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
import { GRADES, LAPTOP_TEST_POINTS } from '@/lib/grades';
import { LAPTOPS, categoriesFor, displayProducts, storagesFor, variantsFor } from '@/lib/catalogue';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#catalogue', label: '1. Catalogue' },
  { href: '#battery', label: '2. Why cycle count matters' },
  { href: '#tests', label: '3. The 24 test points' },
  { href: '#locks', label: '4. Firmware & activation locks' },
  { href: '#pairing', label: '5. Parts pairing on MacBooks' },
  { href: '#channels', label: '6. Corporate resale' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  const c = getCountry(country);
  return {
    title: 'Refurbished laptops — wholesale',
    description: `Wholesale refurbished business laptops from Dubai into ${c.name}. ThinkPad, EliteBook, Latitude and MacBook, graded A+ to D with published battery health and cycle count. Indicative ${c.currency} pricing.`,
    alternates: { canonical: `/${country}/laptops` },
  };
}

export default async function LaptopsPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  const available = LAPTOPS.filter((p) => p.markets.includes(c.code));
  const excluded = LAPTOPS.filter((p) => !p.markets.includes(c.code));

  const display = displayProducts(available, c);

  return (
    <>
      <PageHero
        eyebrow="Wholesale catalogue"
        title="Refurbished laptops"
        lead={`Business-class machines graded on the same two axes as our phones, with battery cycle count published alongside capacity. Corporate off-lease supply with 24 functional test points per unit. Supplying ${c.name}.`}
        meta={
          <>
            <Pill tone="ok">Cycle counts published</Pill>
            <Pill tone="info">{LAPTOP_TEST_POINTS.length} test points</Pill>
            <Pill tone="neutral">Corporate off-lease</Pill>
            <Pill tone="warn">Charger documented</Pill>
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
          <a className="btn btn--ghost" href={`${base}/phones`}>
            ← Phones
          </a>
        </div>
      </PageHero>

      <MarketStrip country={c} base={base} />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/laptops`, label: 'Laptops' }]} />

              <h2 id="catalogue">1. Catalogue</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Indicative wholesale bands in <b>{c.currency}, ex-works Dubai</b>. Configuration
                (memory, storage) moves price more than grade does on this category, so the bands below
                are wide by design. Send us the exact specification and we will price it.
              </p>

              <Catalogue
                products={display}
                categories={categoriesFor('laptop')}
                storages={storagesFor('laptop')}
                variants={variantsFor('laptop')}
                variantLabel="Memory"
                grades={GRADES.map((g) => g.code)}
                quoteHref={`${base}/quote`}
                emptyHint="Corporate laptop stock changes weekly. Tell us the model and specification you need and we will tell you whether it can be sourced."
                priceCaption={`Indicative, ex-works · ${c.currency}`}
              />

              {excluded.length > 0 ? (
                <Callout tone="plain" title={`${excluded.length} line${excluded.length > 1 ? 's are' : ' is'} not supplied into ${c.name}`}>
                  <p style={{ marginBottom: 0 }}>
                    {excluded.map((p) => p.name).join(' · ')} — ask us anyway; availability is lot
                    dependent.
                  </p>
                </Callout>
              ) : null}

              {/* ------------------------------------- BATTERY ----------- */}
              <h2 id="battery" style={{ marginTop: '3.5rem' }}>2. Why cycle count matters more than capacity</h2>
              <div className="prose">
                <p>
                  On a phone, a two-year-old battery at 92% is close enough to new that the number tells
                  you most of what you need. On a laptop it does not. A 92% cell that has completed 1,100
                  full cycles will not serve an all-day working buyer. An 88% cell that has completed 240
                  cycles will.
                </p>
                <p>
                  Capacity is the easy number to publish and it is close to meaningless on its own. So we
                  publish both, every time, and the grade report carries the figure that actually predicts
                  whether the customer will be satisfied.
                </p>
              </div>

              <TableWrap>
                <caption>
                  Illustrative comparison at a similar stated capacity. Real figures are published per
                  unit on the grade report.
                </caption>
                <thead>
                  <tr>
                    <Th scope="col">Health %</Th>
                    <Th scope="col" num>Full charge cycles</Th>
                    <Th scope="col">Realistic expectation</Th>
                    <Th scope="col">Grading effect</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td mono>94%</Td>
                    <Td num mono>180</Td>
                    <Td>Close to new. Full-day use, no caveats.</Td>
                    <Td>
                      <Pill tone="ok">Supports A+</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td mono>92%</Td>
                    <Td num mono>1,100</Td>
                    <Td>Understated. Expect reduced runtime under sustained load.</Td>
                    <Td>
                      <Pill tone="warn">Capped below tier</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td mono>88%</Td>
                    <Td num mono>240</Td>
                    <Td>Genuinely good. Full-day use, mild degradation.</Td>
                    <Td>
                      <Pill tone="ok">Supports A / B</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td mono>85%</Td>
                    <Td num mono>2,400</Td>
                    <Td>Cell at end of economic life regardless of the percentage.</Td>
                    <Td>
                      <Pill tone="bad">C</Pill>
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="info" title="The rule we apply">
                <p>
                  A high cycle count can cap a laptop below what its capacity percentage alone would
                  suggest, exactly as a low battery caps a phone. Both figures appear on the report, and
                  the grade reflects the worse of the two.
                </p>
              </Callout>

              {/* ------------------------------------- TESTS ------------ */}
              <h2 id="tests" style={{ marginTop: '3.5rem' }}>3. The {LAPTOP_TEST_POINTS.length} test points</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A laptop is a harder thing to test than a phone, and &ldquo;fully tested&rdquo; usually
                means &ldquo;it turned on&rdquo;. These are the points we run on every unit.
              </p>
              <div className="card">
                <ol style={{ paddingLeft: '1.3rem', columns: 2, columnGap: '2.5rem' }}>
                  {LAPTOP_TEST_POINTS.map((t) => (
                    <li key={t} className="small" style={{ breakInside: 'avoid' }}>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>

              <Callout tone="plain" title="The two that catch people out">
                <p>
                  <b>Sustained-load battery drain</b> and <b>thermal throttling under load</b>. Both pass
                  on a cold machine and both fail after twenty minutes of real work. A machine that
                  throttles badly will be returned by your customer and you will not see the reason
                  written anywhere.
                </p>
              </Callout>

              {/* ------------------------------------- LOCKS ------------- */}
              <h2 id="locks" style={{ marginTop: '3.5rem' }}>4. Firmware and activation locks</h2>
              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Screen and OS activation', 'Removed at processing. Verified by read-back before grading. Devices that cannot be cleared are routed out of graded stock.'],
                  ['BIOS / firmware password', 'Removed where technically possible. Where it is not, the unit is downgraded and the reason is printed on the report. We do not sell it as clean.'],
                  ['Enterprise MDM', 'Released on written authorisation from the entity that owns the fleet. We require the release, we do not infer ownership.'],
                  ['Apple firmware activation', 'Tested and recorded per unit on MacBooks. This is the most common failure on that line and it is not visible without testing.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="lock" iconTone="warn">
                    {v}
                  </Card>
                ))}
              </div>

              {/* ------------------------------------- PAIRING ---------- */}
              <h2 id="pairing" style={{ marginTop: '3.5rem' }}>5. Parts pairing on MacBooks</h2>
              <div className="prose">
                <p>
                  Apple&rsquo;s genuine-parts diagnostics check whether the display, top case and battery
                  match the configuration the machine shipped with. A MacBook with a replaced display or
                  a third-party battery will fail that check even though it is fast, healthy and
                  cosmetically near-perfect.
                </p>
                <p>
                  We could grade those machines A on appearance. We do not, because your customer&rsquo;s
                  technician will run the diagnostic in front of them and the grade will be the least of
                  the problems. Those units are graded <b>C</b>, and the report says exactly which part
                  was replaced and why the machine is where it is.
                </p>
              </div>

              <Callout tone="warn" title="Tell your sales team this before they sell it">
                <p>
                  A Grade C MacBook from us is not a faulty MacBook. It is a working MacBook with a
                  non-original part, honestly graded. That is a sellable product at a real price — it is
                  just not a premium one, and it has to be described accurately to your customer in
                  markets with consumer disclosure obligations.
                </p>
              </Callout>

              {/* ------------------------------------- CHANNELS --------- */}
              <h2 id="channels" style={{ marginTop: '3.5rem' }}>6. Corporate resale and ITAD</h2>
              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                {[
                  ['Corporate refresh', 'Consistent Grade A supply from named off-lease programmes, with the per-unit report your asset team needs for the file.'],
                  ['SME resale', 'Grade B and C with published battery figures. The volume tier, and the one that moves fastest on price.'],
                  ['Trade-in arbitrage', 'Grade AB and C. Sort it yourself and keep the spread — see the AB section on the phones page.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="laptop" iconTone="info">
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="ok" title="What makes a corporate buyer come back">
                <p>
                  Not price. A consistent definition of Grade A, a report their asset manager can put in a
                  file, and a warranty figure that does not change between the quotation and the invoice.
                  Those three things are harder to find than a cheap pallet, and they are why our
                  corporate customers reorder.
                </p>
              </Callout>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Send your specification and we will price it line by line."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Warranty & returns', href: `${base}/warranty` }}
                >
                  Model, processor, memory, storage, and the grade you need. If we can meet it, you will
                  get a date. If we cannot, you will get that in writing too.
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
