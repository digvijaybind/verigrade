import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MarketStrip } from '@/components/market';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  PageHero,
  Pill,
  StatRow,
  TableWrap,
  Td,
  Th,
  Toc,
} from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { GRADING_STANDARD as STD } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#summary', label: '1. The short version' },
  { href: '#grade-warranty', label: '2. We warrant the grade' },
  { href: '#data', label: '3. Data destruction' },
  { href: '#certificates', label: '4. Certificate numbers' },
  { href: '#imei', label: '5. The IMEI guarantee' },
  { href: '#parts', label: '6. Parts provenance' },
  { href: '#consistency', label: '7. One number, everywhere' },
  { href: '#not', label: '8. What we do not claim' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Why VeriGrade',
    description:
      'The specific, checkable reasons to buy refurbished phones and laptops from VeriGrade: a warranted grade, a named data-destruction standard, resolvable certificate numbers, a written IMEI guarantee and per-unit parts disclosure.',
    alternates: { canonical: `/${country}/why-verigrade` },
  };
}

export default async function WhyVeriGradePage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="The argument"
        title="Five things you can check before you pay"
        lead="Every supplier in this market will tell you their stock is tested, genuine and reliable. This page is not a list of adjectives. It is a list of specific, verifiable commitments, and how to test any of them — including on us."
        meta={
          <>
            <Pill tone="ok">Grade warranted</Pill>
            <Pill tone="ok">NIST 800-88 published</Pill>
            <Pill tone="ok">IMEI guaranteed</Pill>
            <Pill tone="neutral">All checkable pre-payment</Pill>
          </>
        }
      />

      <MarketStrip country={c} base={base} />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/why-verigrade`, label: 'Why VeriGrade' }]} />

              <h2 id="summary">1. The short version</h2>
              <div className="prose">
                <p>
                  Refurbished wholesale is a trust trade, not a price trade. The margin is thin enough
                  that the winner is whoever has fewest surprises after delivery, and the cost of a
                  surprise — a mis-graded pallet, an unlocked device that relocks in your customer&rsquo;s
                  hand, a previous owner&rsquo;s data on a phone you sold as clean — is far larger than the
                  margin you were chasing.
                </p>
                <p>
                  So we built the business around removing the five specific things that go wrong. Not
                  &ldquo;better quality&rdquo;. Five named problems, five documented answers.
                </p>
              </div>

              <StatRow
                items={[
                  { n: '0', l: 'Units dispatched without a destruction certificate' },
                  { n: '0', l: 'Unresolvable certification logos on this website' },
                  { n: '6', l: 'Grade tiers with published numeric criteria' },
                  { n: `${STD.lowestBatteryFloor}%`, l: 'Absolute minimum battery to sell as usable' },
                ]}
              />

              {/* ------------------------------------------ GRADE WARRANTY */}
              <h2 id="grade-warranty" style={{ marginTop: '3.5rem' }}>
                2. We warrant the grade, not just the function
              </h2>
              <div className="prose">
                <p>
                  This is the one that actually changes your position, so it is worth being precise about
                  what the market does today.
                </p>
                <p>
                  Almost every refurb warranty in this trade is <b>functional</b>: the device works, or it
                  is covered. A phone that arrives cosmetically worn and battery-down, but which switches
                  on, charges and passes a smoke test, satisfies a functional warranty completely. There
                  is nothing to claim, because nothing is broken.
                </p>
                <p>
                  Meanwhile the buyer paid for Grade A and received a Grade C. They cannot sell it as
                  Grade A, because the buyer&rsquo;s own customer will notice. They cannot claim it,
                  because it works. So they absorb it, or they argue, and either way the relationship
                  is worse than if the mis-grade had simply been a defect.
                </p>
              </div>

              <div style={{ margin: '1.6rem 0' }}>
                <Callout tone="ok" title="Our position">
                  <p>
                    If a unit does not meet the published acceptance criteria for its assigned tier, that
                    is a warranty claim — regardless of whether the device functions. The criteria are in
                    the{' '}
                    <Link href={`${base}/grading-standard`}>published standard</Link>. The dispute process
                    is written down before you need it, and the decision comes back with the criteria
                    applied and the technician&rsquo;s name on it.
                  </p>
                </Callout>
              </div>

              <TableWrap compare>
                <thead>
                  <tr>
                    <Th style={{ minWidth: 150 }} scope="col">Situation</Th>
                    <Th scope="col">Typical warranty</Th>
                    <Th className="col-us" scope="col">VeriGrade</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Unit dead on arrival</Td>
                    <Td>Covered</Td>
                    <Td us>Covered</Td>
                  </tr>
                  <tr>
                    <Td strong>Unit works, but is not the grade it was sold as</Td>
                    <Td className="muted">Not covered — nothing is broken</Td>
                    <Td us>Covered. Conformity to the published grade is part of the specification.</Td>
                  </tr>
                  <tr>
                    <Td strong>Battery below the stated tier floor</Td>
                    <Td className="muted">Not covered</Td>
                    <Td us>Covered. The floor is a published figure and the reading is on the report.</Td>
                  </tr>
                  <tr>
                    <Td strong>Parts status misdescribed</Td>
                    <Td className="muted">Not covered</Td>
                    <Td us>Covered. Parts status is a per-unit representation.</Td>
                  </tr>
                  <tr>
                    <Td strong>IMEI later blacklisted</Td>
                    <Td className="muted">Usually excluded</Td>
                    <Td us>Covered for the whole warranty term where attributable to us.</Td>
                  </tr>
                  <tr>
                    <Td strong>Prior owner&rsquo;s data recoverable</Td>
                    <Td className="muted">Not addressed at all</Td>
                    <Td us>Covered by the destruction certificate, and we honour it in writing.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ------------------------------------------ DATA --------- */}
              <h2 id="data" style={{ marginTop: '3.5rem' }}>
                3. A named data-destruction standard
              </h2>
              <div className="prose">
                <p>
                  We went through the published pages of the major Gulf and North American refurbishment
                  programmes and looked for one thing: <b>does anyone state their data-destruction
                  standard?</b>
                </p>
                <p>
                  Between them, those programmes publish battery thresholds, grading definitions, warranty
                  durations, disqualifying conditions and, in one case, a data-handling badge. Not one
                  publishes the standard, the method, the tool, or a per-unit reference. Some of the
                  better operations certainly wipe their devices. You simply cannot tell from outside,
                  which means you cannot rely on it, and you cannot show your own compliance officer.
                </p>
                <p>
                  We use {STD.wipeStandard} <b>Purge</b>, we do it{' '}
                  <b>before</b> functional testing, we read the wiped volume back to confirm, and we
                  issue a certificate per serial. The full procedure, the failure route, and an honest
                  list of what we <i>cannot</i> guarantee are on the{' '}
                  <Link href={`${base}/data-security`}>data security page</Link>.
                </p>
              </div>

              <div className="grid grid-2" style={{ gap: '1.2rem', marginTop: '1.6rem' }}>
                <Card title="Why before matters" icon="lock" iconTone="warn">
                  Test-then-wipe leaves a real window in which a tested, saleable-looking, unshelved-safe
                  device is in the building. Wipe-first closes it. It costs a few minutes of process
                  design and removes an entire category of risk.
                </Card>
                <Card title="Why a certificate matters" icon="doc" iconTone="info">
                  Because a serious buyer&rsquo;s compliance owner will ask for evidence, not assurance.
                  A number on the unit that resolves to a record is evidence. A paragraph in a policy
                  document is a promise.
                </Card>
              </div>

              {/* ------------------------------------------ CERTIFICATES - */}
              <h2 id="certificates" style={{ marginTop: '3.5rem' }}>
                4. Certificate numbers, and links that resolve
              </h2>
              <div className="prose">
                <p>
                  In our audit of Gulf suppliers, five sites carried certification badge walls and not one
                  would supply a certificate number, a certifier, a scope or an expiry date. One site in
                  the whole set published a trade licence and VAT number.
                </p>
                <p>
                  Our <Link href={`${base}/certifications`}>certifications page</Link> lists every scheme
                  with a status: held, in progress, or explicitly not held. Items in progress say so.
                  Items we do not hold — R2, e-Stewards, ECAS, anything telecom-regulatory — are listed
                  as <i>not held</i> with an explanation of why the claim would be wrong.
                </p>
                <p>
                  That page is deliberately unflattering to us in its current state, because it is not yet
                  true. It is also the page that makes every other claim on this site credible.
                </p>
              </div>

              <Callout tone="plain" title="The test you can run on us, or anyone else">
                <p>
                  Ask any supplier for the certificate number behind any logo they display, plus the
                  certifier, scope and expiry. Then look the number up on the certifier&rsquo;s own public
                  register. Five questions, thirty seconds, and you will know more than any sales
                  conversation tells you. Send us that email — we answer it in a day.
                </p>
              </Callout>

              {/* ------------------------------------------ IMEI --------- */}
              <h2 id="imei" style={{ marginTop: '3.5rem' }}>
                5. The IMEI guarantee
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The single most commercially destructive thing that can happen in this business, and the
                one least often written down.
              </p>

              <div className="prose">
                <p>
                  A handset financed on a plan and then lost or stolen gets flagged. A handset flagged
                  for non-payment gets flagged. A device on that blacklist is <b>permanently
                  unusable</b> on the major networks — not soft-locked, not recoverable, bricked at the
                  network level.
                </p>
                <p>
                  For you that means a customer pays, takes delivery, and finds a paperweight. It means
                  your supplier&rsquo;s word means nothing at the point you find out, because the blacklist
                  entry may predate their purchase. And critically: almost no Gulf wholesale listing
                  mentions IMEI status at all. Not one of the suppliers we examined publishes an IMEI
                  policy, and several do not publish per-unit IMEI lists.
                </p>
              </div>

              <div style={{ margin: '1.6rem 0' }}>
                <Callout tone="ok" title="What we commit to">
                  <p>
                    Every IMEI is screened at intake and again before dispatch. A flagged device is
                    quarantined and never graded — it is not sold with a warning label, it is not sold at
                    all. And if a unit we sold you is blacklisted later for a reason attributable to us,
                    we replace it <b>for the remainder of the warranty period</b>, not for a first 90
                    days.
                  </p>
                </Callout>
              </div>

              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                {[
                  ['At intake', 'Every serial registered and every IMEI screened before the device is graded. Flagged units leave the graded pipeline immediately.'],
                  ['Before dispatch', 'IMEI status re-verified as part of the pre-dispatch check. If a unit has been flagged since intake, it does not ship.'],
                  ['After delivery', 'If it is flagged later, and the cause traces to our supply chain, we replace it for the full warranty term. We do not ask you to prove the device was not tampered with beyond reasonable doubt.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="chip" iconTone="info">
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="warn" title="Ask every supplier this exact question">
                <p>
                  &ldquo;If I buy 200 units and three of those IMEIs turn out to be blacklisted four months
                  after delivery, what happens?&rdquo; The answer tells you whether they have ever had to
                  deal with it. If the answer is a paragraph about the warranty being &ldquo;subject to
                  terms&rdquo;, they have not thought about it.
                </p>
              </Callout>

              {/* ------------------------------------------ PARTS -------- */}
              <h2 id="parts" style={{ marginTop: '3.5rem' }}>
                6. Parts provenance, per unit
              </h2>
              <div className="prose">
                <p>
                  A substantial share of refurbished stock is functionally perfect and cannot honestly be
                  called all-original. Displays get replaced. Batteries get replaced. Cameras get replaced.
                  On devices that pair parts for a genuine-configuration check, any of those
                  replacements can make the device fail a manufacturer diagnostic in front of your
                  customer.
                </p>
                <p>
                  The market&rsquo;s answer is to say &ldquo;genuine parts&rdquo; across a mixed pallet and
                  leave it there. Our answer is a per-unit parts status on every grade report:
                  original, OEM-grade, or aftermarket — and a rule that aftermarket parts are never used
                  to lift a device into a higher tier.
                </p>
              </div>

              <Callout tone="plain" title="The trade-off we make deliberately">
                <p>
                  A device with a replaced display is graded C with the reason printed, even when it looks
                  perfect. That costs us the A/B sale. It buys you a unit that will not embarrass you in
                  front of a customer running a diagnostic, and a paper trail that survives a dispute.
                </p>
              </Callout>

              {/* ------------------------------------------ CONSISTENCY -- */}
              <h2 id="consistency" style={{ marginTop: '3.5rem' }}>
                7. One number, everywhere
              </h2>
              <div className="prose">
                <p>
                  A recurring finding in our audit was internal inconsistency: a 12-month warranty on the
                  homepage, 6 months in the terms, 3 months on the quote. And almost universally,
                  accidental damage cover advertised prominently and then excluded in the small print.
                </p>
                <p>
                  These are not fraud. They are usually carelessness under commercial pressure. They are
                  also, in a market where buyers compare suppliers on paper, extremely easy to exploit
                  against the buyer.
                </p>
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Our commitment</Th>
                    <Th scope="col">Where it appears</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Warranty period</Td>
                    <Td>Identical on this site, on the grading standard, on the proforma, and on the invoice.</Td>
                  </tr>
                  <tr>
                    <Td strong>Battery floors</Td>
                    <Td>Identical on the homepage, the grading standard, and every grade report.</Td>
                  </tr>
                  <tr>
                    <Td strong>Accidental damage</Td>
                    <Td>
                      Optional, and the terms are stated once, on the warranty page, with no carve-out in
                      the small print.
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>DOA window</Td>
                    <Td>Stated on the warranty page and on the order confirmation.</Td>
                  </tr>
                  <tr>
                    <Td strong>Certification status</Td>
                    <Td>Stated with a status and a date. Changes are published as version notes.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ------------------------------------------ NOT --------- */}
              <h2 id="not" style={{ marginTop: '3.5rem' }}>
                8. What we do not claim
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A differentiation page that only lists strengths is marketing. This is the other half.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['We do not claim the best prices', 'We are not the cheapest and we do not intend to be. The Gulf is full of cheaper stock and most of it is cheaper for a reason. If you want the bottom of the market, Grade AB and Grade D are the honest place to look.'],
                  ['We do not hold every certification', 'Not yet, and we say so on the certifications page rather than implying otherwise. The list of what we do not hold is as long as the list of what we do.'],
                  ['We do not describe refurbished handsets as regulator approved', 'Type approval is a model-level authorisation. Using it as a quality mark is a category error, and it will put the wrong reference in your compliance file.'],
                  ['We do not make sustainability claims', 'No e-waste or green mark, because we hold no such certificate. Circular economy arguments can be made honestly; logos cannot be borrowed.'],
                  ['We cannot guarantee cloud deletion', 'If a customer synced photos to a cloud account before the device reached us, that data was never on the device. We destroy what is on the device and we tell you exactly what that means.'],
                  ['We are a wholesaler, not a retailer', 'We do not run consumer sales, we do not ship to consumers, and our documentation assumes a business that is re-selling. If you are a consumer, we will point you to a retailer.'],
                ].map(([k, v]) => (
                  <Callout key={k} tone="bad" title={k}>
                    <p>{v}</p>
                  </Callout>
                ))}
              </div>

              <Callout tone="ok" title="The test of whether any of this is true">
                <p>
                  Do not take our word for any of it. Ask for the specimen pack, ask for the licence
                  extract, run the certificate-number check, and put the hardest question on the
                  <Link href={`${base}/certifications#how-to-check`}> certifications page</Link> to us.
                  A supplier who is comfortable being audited is a supplier you can build a programme
                  on.
                </p>
              </Callout>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Test all of this against us before you test it against the price."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Read the standard', href: `${base}/grading-standard` }}
                >
                  The grading standard, the data-security procedure and the certification register are
                  all public. Read them, then decide whether we are worth talking to.
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
