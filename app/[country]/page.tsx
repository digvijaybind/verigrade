import Link from 'next/link';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import CertSample from '@/components/CertSample';
import Catalogue from '@/components/Catalogue';
import { MarketStrip } from '@/components/market';
import {
  Button,
  Card,
  Callout,
  CtaBand,
  Eyebrow,
  FlowStep,
  GradeLegend,
  HeroStats,
  SectionHead,
  StatRow,
  TableWrap,
  Td,
  Th,
} from '@/components/ui';
import { notFound } from 'next/navigation';
import { getCountry, isCountryCode } from '@/lib/countries';
import { GRADES } from '@/lib/grades';
import { displayProducts, filtersFor, productsForCountry } from '@/lib/catalogue';
import { GRADING_STANDARD, SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

export default async function HomePage({ params }: Props) {
  const { country: cc } = await params;
  if (!isCountryCode(cc)) notFound();
  const c = getCountry(cc);
  const base = `/${c.code}`;

  const phones = productsForCountry(c.code).filter((p) => p.family === 'phone');
  const phoneDisplay = displayProducts(phones, c);
  const phoneFilters = filtersFor(phones);

  const gradePreview = GRADES.map((g) => ({
    code: g.code,
    name: g.name,
    batteryFloor: g.batteryFloor,
    short: g.short,
  }));

  return (
    <>
      {/* ============================================ HERO ================ */}
      <section className="hero">
        <div className="container">
          <span className="hero-eyebrow">
            <span className="dot" />
            {SITE.origin} Â· Est. {SITE.founded}
          </span>
          <h1>{c.headline}</h1>
          <p className="lead">{c.brief}</p>
          <div className="btn-row">
            <Button href={`${base}/grading-standard`} tone="primary">
              Read the grading standard
            </Button>
            <Button href={`${base}/contact`} tone="onDark">
              Request a quote
            </Button>
            <span className="muted">No account needed. MOQ from 5 units.</span>
          </div>

          <HeroStats
            items={[
              { n: '6', l: 'Published grade tiers' },
              { n: `${GRADING_STANDARD.lowestBatteryFloor}%`, l: 'Lowest battery we sell as usable' },
              { n: '100%', l: 'Units shipped with a destruction certificate' },
              { n: '2 axes', l: 'Cosmetic and functional, graded separately' },
            ]}
          />
        </div>
      </section>

      <MarketStrip country={c} base={base} />

      {/* ============================================ TRUST STRIP ========= */}
      <div className="trustbar">
        <div className="container trustbar-inner">
          <span>
            <strong>Grading standard v{GRADING_STANDARD.version}</strong> â€” public, versioned, printable
          </span>
          <span>
            <strong>{GRADING_STANDARD.wipeStandard.split(' ').slice(0, 2).join(' ')}</strong> Purge with
            verification read
          </span>
          <span>
            <strong>IMEI / MDM</strong> cleared, guaranteed in writing
          </span>
          <span>
            <strong>Traceability</strong> certificate numbers on every unit
          </span>
        </div>
      </div>

      {/* ============================================ THE PROBLEM ========= */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Why we exist" title="The market tells you a lot of things it can't prove.">
            Buying refurbished stock into {c.name} means trusting a grade, a battery claim and a wipe
            claim made by a seller you have never met. Here is what usually happens, and what we
            changed.
          </SectionHead>

          <div className="grid grid-2">
            <Card title="â€œBattery 90%+â€ â€” measured how?" icon="clock" iconTone="warn">
              Some suppliers quote a design capacity. Some quote a reading taken seconds after boot. Some
              quote nothing at all. A <b>92%</b> figure is meaningless without a stated test protocol, a
              temperature and a charge state. We publish ours, and we floor it.
            </Card>

            <Card title="A wall of badges, zero certificate numbers" icon="shield" iconTone="danger">
              Plenty of suppliers display certification logos. Very few will give you the certificate
              number, the certifying body, the scope or the expiry date. A logo is an image. A number can
              be verified.{' '}
              <Link href={`${base}/certifications`}>See ours.</Link>
            </Card>

            <Card
              title="Nobody says how the data was destroyed"
              icon="lock"
              iconTone="warn"
            >
              There is no refurb programme anywhere â€” in the Gulf, in Europe or in North America â€” that
              publishes its data-destruction standard. Your customer's customer's photos, bank tokens and
              email may still be on that flash. We name the standard, name the tool, and print a
              certificate number.
            </Card>

            <Card title="The IMEI question nobody asks" icon="chip" iconTone="info">
              A device on a stolen-device blacklist is dead on every major network in {c.name} â€” and
              worthless to you. Almost no listing mentions IMEI status at all. We clear every IMEI and
              guarantee it survives our warranty period.
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================ DIFFERENTIATORS ===== */}
      <section className="section section--surface">
        <div className="container">
          <SectionHead
            eyebrow="The VeriGrade standard"
            title="Five things we publish that other wholesalers don't."
          >
            Each one is a document, not a claim. Each one can be checked before you pay.
          </SectionHead>

          <div className="grid grid-3">
            <Reveal>
              <Card num="01" title="A versioned grading standard" href={`${base}/grading-standard`}>
                Six tiers with numeric acceptance criteria, a stated measurement method for every
                dimension we assess, and a revision history. When the standard changes, the version on
                your paperwork changes with it.
              </Card>
            </Reveal>

            <Reveal delay={60}>
              <Card num="02" title="A named data-destruction standard" href={`${base}/data-security`}>
                {GRADING_STANDARD.wipeStandard} <i>Purge</i>, with a verification read-back recorded
                against each serial number. Wipe happens <i>before</i> functional testing, not after.
              </Card>
            </Reveal>

            <Reveal delay={120}>
              <Card num="03" title="Certificate numbers you can look up" href={`${base}/certifications`}>
                Every unit carries a printed and QR-linked certificate showing grade, battery reading,
                test date, technician ID and destruction status. Register links point at the certifier's
                own database, not ours.
              </Card>
            </Reveal>

            <Reveal>
              <Card num="04" title="We warrant the grade, not just the function" href={`${base}/warranty`}>
                If a unit arrives as an A and the published criteria for A are not met, that is a
                claimable defect in writing â€” even though the phone works perfectly. Almost every
                competitor's warranty is functional-only, which makes a mis-graded phone unclaimable.
              </Card>
            </Reveal>

            <Reveal delay={60}>
              <Card num="05" title="IMEI and MDM cleanliness, in writing" href={`${base}/why-verigrade#imei`}>
                Every IMEI is screened at intake and again before dispatch. If a unit is later
                blacklisted for a reason attributable to us, we replace it â€” for the whole warranty
                period, not just the first 90 days.
              </Card>
            </Reveal>

            <Reveal delay={120}>
              <div className="card" style={{ background: 'var(--ink)', borderColor: 'var(--ink)' }}>
                <span
                  className="card-num"
                  style={{ background: 'rgba(11,145,112,.18)', color: '#4BD6A8' }}
                >
                  06
                </span>
                <h3 style={{ color: '#fff' }}>Parts provenance, stated honestly</h3>
                <p style={{ color: '#9AA5B6' }}>
                  A large share of refurbished stock is functionally perfect but cannot be certified as
                  genuine â€” display, battery or camera modules replaced. We publish parts status per unit
                  rather than burying it in a footnote.
                </p>
                <p className="xs" style={{ marginTop: '.8rem' }}>
                  <Link href={`${base}/grading-standard#parts`} style={{ color: '#4BD6A8' }}>
                    Parts policy â†’
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================ GRADING PREVIEW ===== */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Grading at a glance" title="Six tiers. Every one with a number attached.">
            We grade <b>cosmetic condition</b> and <b>functional condition</b> on two separate axes,
            then combine them. A beautiful phone with a weak battery is not an A+. That is the whole
            point.
          </SectionHead>

          <GradeLegend grades={gradePreview} compact />

          <div className="btn-row" style={{ marginTop: '2.2rem' }}>
            <Button href={`${base}/grading-standard`} tone="dark">
              Full standard, criteria and measurement method
            </Button>
            <Button href={`${base}/grading-standard#battery`} tone="ghost">
              Battery measurement method
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================ CATEGORIES ========== */}
      <section className="section section--surface">
        <div className="container">
          <SectionHead eyebrow="What we stock" title="Three catalogues, one standard." />

          <div className="grid grid-3">
            <Card
              title="Refurbished phones"
              icon="phone"
              href={`${base}/phones`}
              footer={
                <div className="chip-row" style={{ marginTop: '.9rem' }}>
                  <span className="chip chip--brand">MOQ from 5</span>
                  <span className="chip">Mixed grades welcome</span>
                </div>
              }
            >
              iPhone 12 through 15, Samsung Galaxy S and A series, Google Pixel, plus selected Android
              and entry-tier lines. Graded on both axes, with battery capacity stated per unit.
            </Card>

            <Card
              title="Refurbished laptops"
              icon="laptop"
              iconTone="info"
              href={`${base}/laptops`}
              footer={
                <div className="chip-row" style={{ marginTop: '.9rem' }}>
                  <span className="chip chip--brand">Cycle counts published</span>
                  <span className="chip">Corporate off-lease</span>
                </div>
              }
            >
              Business-class machines from Lenovo ThinkPad, HP EliteBook, Dell Latitude and Apple
              MacBook. Same two axes, plus battery cycle count â€” which matters more than capacity on a
              five-year-old laptop.
            </Card>

            <Card
              title="Parts &amp; Grade D"
              icon="parts"
              iconTone="warn"
              href={`${base}/phones#grade-d`}
              footer={
                <div className="chip-row" style={{ marginTop: '.9rem' }}>
                  <span className="chip">Sorted by component</span>
                  <span className="chip">Lot pricing</span>
                </div>
              }
            >
              Non-functional units, donor screens, batteries, cameras and mainboards, sold separately
              and never mixed into graded stock. AB raw stock is available to processors who grade
              in-house.
            </Card>
          </div>

          {/* ---- Phone catalogue (incl. iPhone) ---- */}
          <div style={{ marginTop: '3.2rem' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '.6rem',
              }}
            >
              <h3 style={{ fontSize: '1.2rem' }}>Shop phones, including iPhone</h3>
              <Link href={`${base}/phones`} className="small">
                Full phones catalogue -&gt;
              </Link>
            </div>
            <p className="muted" style={{ marginBottom: '1.4rem' }}>
              Indicative bands in {c.currency}, ex-works Dubai. Add any model to your quote at wholesale
              or retail pricing; firm pricing is confirmed on a proforma against a confirmed grade mix
              and destination.
            </p>

            <Catalogue
              products={phoneDisplay}
              categories={phoneFilters.categories}
              storages={phoneFilters.storages}
              variants={phoneFilters.variants}
              variantLabel="Variant"
              grades={GRADES.map((g) => g.code)}
              quoteHref={`${base}/quote`}
              emptyHint="Try widening the grade or availability filter, or send us the models you want and we will tell you what we can actually fill."
              priceCaption={`Indicative, ex-works ${c.currency}`}
            />
          </div>
        </div>
      </section>

      {/* ============================================ DATA SECURITY ======= */}
      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Eyebrow>Data destruction</Eyebrow>
              <h2>The gap nobody else closes.</h2>
              <p className="lead" style={{ marginTop: '1rem' }}>
                We audited the published pages of the major North American and Gulf refurb programmes.
                Between them they disclose battery thresholds, grading definitions, warranty terms and
                disqualifying conditions. <b>Not one of them publishes a data-destruction
                standard.</b> In {c.name} that exposure is yours to carry, and it is the one thing that
                can end your relationship with a serious buyer.
              </p>

              <div className="flow" style={{ marginTop: '2rem' }}>
                <FlowStep title="Intake &amp; asset registration">
                  Serial, IMEI and model recorded against a unique asset ID before anything is opened.
                </FlowStep>
                <FlowStep title="Data destruction â€” before testing">
                  Activation lock removed where permitted, then {GRADING_STANDARD.wipeStandard} Purge.
                  Deliberately sequenced <i>before</i> functional test, so a device cannot be shelved and
                  later sold without having been wiped.
                </FlowStep>
                <FlowStep title="Verification read">
                  Each wiped volume is read back to confirm the purge held. Result recorded per serial,
                  with the tool name and version.
                </FlowStep>
                <FlowStep title="Grading &amp; certificate issue">
                  Cosmetic and functional axes scored, battery recorded, certificate number generated and
                  bound to the asset ID.
                </FlowStep>
              </div>

              <div className="btn-row" style={{ marginTop: '1.6rem' }}>
                <Button href={`${base}/data-security`} tone="dark">
                  Full data-security procedure
                </Button>
                <Button href={`${base}/faq#data`} tone="ghost">
                  Data destruction FAQ
                </Button>
              </div>
            </div>

            <aside>
              <div className="card" style={{ background: 'var(--ink)', borderColor: 'var(--ink)' }}>
                <Eyebrow>Specimen Â· redacted</Eyebrow>
                <h3 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '1.1rem' }}>
                  Data-destruction certificate
                </h3>
                <CertSample dark />
                <p className="xs" style={{ color: '#6B7789', marginTop: '1rem' }}>
                  The gap this fills, in one line: a serious buyer will ask for this document, and if
                  you cannot produce it, they will assume it did not happen.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================ TRANSPARENCY ======== */}
      <section className="section section--surface">
        <div className="container">
          <SectionHead
            eyebrow="The transparency pledge"
            title="What we publish, against what is normal."
          >
            Drawn from our audit of Gulf and North American published listings. â€œMarket normâ€ means
            what a buyer typically has to accept without being given evidence.
          </SectionHead>

          <TableWrap compare>
            <thead>
              <tr>
                <Th style={{ minWidth: 210 }}>Item</Th>
                <Th className="col-us" style={{ minWidth: 250 }}>
                  VeriGrade
                </Th>
                <Th style={{ minWidth: 250 }}>Typical market norm</Th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  'Grade definition',
                  'Versioned document, public, with measurement method',
                  'Adjectives: â€œexcellentâ€, â€œgoodâ€, â€œA gradeâ€, undefined',
                ],
                [
                  'Battery floor per grade',
                  'Published for every tier; 80% minimum to sell as usable',
                  'Usually none. A handful of sellers state a figure, rarely a method',
                ],
                [
                  'Battery test protocol',
                  'Stated: charge state, temperature, method, timing',
                  'Not disclosed',
                ],
                [
                  'Data-destruction standard',
                  'NIST SP 800-88 Purge, named tool, read-back verification',
                  'â€œWipedâ€ or â€œfactory resetâ€ with no standard named',
                ],
                [
                  'Certificate per unit',
                  'Yes â€” number, QR, technician, date, bound to serial',
                  'Per-lot paperwork, or a QR that resolves to a marketing page',
                ],
                [
                  'Certification register links',
                  'Link to the certifierâ€™s own database, with number, scope, expiry',
                  'Badge image with no resolvable number',
                ],
                [
                  'Trade licence & VAT number',
                  'Published in the footer of every page and on every invoice',
                  'Rarely shown before payment',
                ],
                [
                  'IMEI / MDM status',
                  'Checked at intake and pre-dispatch, guaranteed for the warranty term',
                  'Not addressed by most Gulf sellers',
                ],
                [
                  'Parts provenance',
                  'Stated per unit: original, OEM-grade, or aftermarket',
                  'â€œGenuine partsâ€ asserted, not graded or disclosed',
                ],
                [
                  'Warranty scope',
                  'Covers function and conformity to the published grade',
                  'Functional only â€” a mis-graded but working phone is unclaimable',
                ],
                [
                  'Warranty length',
                  'Same figure on site, contract and invoice. One number.',
                  'Frequently different on the site, the T&Cs and the quote',
                ],
                [
                  'Accidental damage cover',
                  'Optional, per shipment, same terms on the website and the policy',
                  'Frequently advertised, then excluded in the T&Cs',
                ],
              ].map(([item, us, norm]) => (
                <tr key={item}>
                  <Td strong>{item}</Td>
                  <Td us>{us}</Td>
                  <Td mid>{norm}</Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>

          <Callout tone="ok" title="And what we will never claim">
            <p>
              We will not call a refurbished phone â€œTDRA approvedâ€ â€” the UAE telecom regulator approves{' '}
              <i>models</i> for sale, not condition grades. We will not use an environmental or
              data-security logo we do not hold a current certificate for. We will not publish a stock
              count we have not counted. If a claim on this site cannot be evidenced, it will be
              removed, not softened.
            </p>
          </Callout>
        </div>
      </section>

      {/* ============================================ TRADING ============= */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '3.5rem', alignItems: 'start' }}>
            <div>
              <Eyebrow>Trading</Eyebrow>
              <h2>Built for importers, not for browsers.</h2>
              <p className="lead" style={{ marginTop: '1rem' }}>
                Our terms are written for buyers who are re-selling devices into {c.name} and who cannot
                afford a surprise at their own customer.
              </p>
              <ul style={{ marginTop: '1.6rem' }}>
                <li>
                  <b>MOQ from 5 units</b>, mixed grades and mixed models within a shipment. No pallet or
                  container minimum.
                </li>
                <li>
                  <b>Per-unit IMEI manifest</b> and grade report included with every export consignment.
                </li>
                <li>
                  <b>DOA acceptance window</b> â€” 7 days from delivery on arrival, with a defined
                  inspection protocol.
                </li>
                <li>
                  <b>Grade-mismatch claims</b> assessed against the published criteria, not against
                  opinion.
                </li>
                <li>
                  <b>One warranty figure</b> across site, contract and invoice, in writing.
                </li>
                <li>
                  <b>EXW, FOB, CIF, DAP and DDP</b> quoting available; origin documentation prepared
                  either way.
                </li>
              </ul>
              <div className="btn-row" style={{ marginTop: '1.8rem' }}>
                <Button href={`${base}/contact`} tone="primary">
                  Request a quote
                </Button>
                <Button href={`${base}/ordering`} tone="ghost">
                  Ordering &amp; payment terms
                </Button>
              </div>
            </div>

            <div>
              <Eyebrow>Your lane</Eyebrow>
              <h3 style={{ marginBottom: '1.2rem' }}>Shipping into {c.name}</h3>

              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1.1rem 1.3rem', borderBottom: '1px solid var(--line)' }}>
                  <h4>Incoterms quoted</h4>
                  <p className="small" style={{ color: 'var(--muted)' }}>
                    EXW Dubai, FOB Jebel Ali, CIF, DAP and DDP where we can serve the lane. Your broker
                    classifies the goods; we make the declared value and used status accurate.
                  </p>
                </div>
                <div style={{ padding: '1.1rem 1.3rem', borderBottom: '1px solid var(--line)' }}>
                  <h4>What moves in this market</h4>
                  <p className="small" style={{ color: 'var(--muted)' }}>
                    {c.demand.join(' Â· ')}
                  </p>
                </div>
                <div style={{ padding: '1.1rem 1.3rem' }}>
                  <h4>Documents with the shipment</h4>
                  <p className="small" style={{ color: 'var(--muted)' }}>
                    {c.docs.join(' Â· ')}
                  </p>
                </div>
              </div>

              <Callout tone="warn">
                <p>
                  <b>Sanctions screening applies to every order.</b> Named parties, end users and end use
                  are screened before dispatch and we decline orders we cannot clear. There is no
                  exception for cash or urgency.
                </p>
              </Callout>

              <p className="small muted" style={{ marginTop: '1rem' }}>
                <Link href={`${base}/compliance`}>
                  Read the full compliance position for {c.name} â†’
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ FACILITY =========== */}
      <section className="section section--ink">
        <div className="container">
          <SectionHead eyebrow="The operation" title="A facility built to produce evidence, not just boxes.">
            Grading claims are only as good as the process behind them. This is what the process
            actually is.
          </SectionHead>

          <StatRow
            items={[
              { n: '11', l: 'Functional test points per phone' },
              { n: '24', l: 'Functional test points per laptop' },
              { n: '28', l: 'Cosmetic inspection points at 1,000 lux' },
              { n: '0', l: 'Units dispatched without a certificate' },
            ]}
          />

          <div className="grid grid-3" style={{ marginTop: '3rem' }}>
            <div className="card card--ink">
              <h4>Inspection, not eyeballing</h4>
              <p>
                Cosmetic grading happens under a fixed 1,000&nbsp;lux inspection lamp at a fixed distance,
                with the criteria written into the standard. â€œLight marksâ€ is a measurement, not a mood.
              </p>
            </div>
            <div className="card card--ink">
              <h4>Wipe before test</h4>
              <p>
                Data destruction is sequenced ahead of functional testing. A device cannot be functionally
                tested, shelved, and later sold without having been wiped.
              </p>
            </div>
            <div className="card card--ink">
              <h4>One technician, one ID</h4>
              <p>
                Every grade and destruction record carries the technician&rsquo;s ID. If a grade is
                disputed, the record identifies who made the call, and they answer for it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ RESOURCES =========== */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Before you talk to us" title="Read it yourself first.">
            We would rather you evaluate the standard before you evaluate us.
          </SectionHead>
          <div className="grid grid-3">
            <Card
              title="The grading standard"
              icon="file"
              href={`${base}/grading-standard`}
            >
              All six tiers, per-dimension acceptance criteria, measurement method, and the dispute
              process.
            </Card>
            <Card
              title="Data destruction &amp; security"
              icon="lock"
              iconTone="info"
              href={`${base}/data-security`}
            >
              The named standard, the tool, the sequence, the certificate layout, and what we honestly
              cannot do.
            </Card>
            <Card
              title="Certifications &amp; legal entity"
              icon="award"
              iconTone="neutral"
              href={`${base}/certifications`}
            >
              Certificate numbers, certifying bodies, scope and expiry â€” plus our trade licence, VAT
              number and entity details.
            </Card>
          </div>

          <div style={{ marginTop: '3.5rem' }}>
            <CtaBand
              title="Send us a list. We will tell you what we can actually fill."
              primary={{ label: 'Request a quote', href: `${base}/contact` }}
              secondary={{ label: 'Read the FAQ', href: `${base}/faq` }}
            >
              Models, grades, quantities, destination. You will get a real answer on lead time and
              stock â€” including where we cannot meet your spec, rather than a quote that quietly changes
              later.
            </CtaBand>
          </div>
        </div>
      </section>
    </>
  );
}
