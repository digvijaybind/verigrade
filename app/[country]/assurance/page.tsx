import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  FlowStep,
  KV,
  PageHero,
  Pill,
  Step,
  TableWrap,
  Td,
  Th,
  Toc,
} from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { GRADING_STANDARD, REGISTRATIONS, SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#claim', label: '1. What we actually guarantee' },
  { href: '#pillars', label: '2. The six controls' },
  { href: '#pipeline', label: '3. Intake to dispatch' },
  { href: '#sourcing', label: '4. Sourcing controls' },
  { href: '#data', label: '5. Data destruction' },
  { href: '#testing', label: '6. Testing' },
  { href: '#grading', label: '7. Grading' },
  { href: '#documentation', label: '8. Documentation' },
  { href: '#lot', label: '9. Lot-level control' },
  { href: '#traceability', label: '10. Traceability' },
  { href: '#returns', label: '11. Returns and repair' },
  { href: '#metrics', label: '12. Metrics, including ours' },
  { href: '#third-party', label: '13. Third-party verification' },
  { href: '#limits', label: '14. The limits, stated' },
];

const WARRANTY_MONTHS = 12;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Quality assurance',
    description: `How VeriGrade controls quality: sourcing intake, ${GRADING_STANDARD.wipeStandard} data destruction, ${GRADING_STANDARD.testPointsPhone} phone and ${GRADING_STANDARD.testPointsLaptop} laptop test points, ${GRADING_STANDARD.inspectionPointsCosmetic} cosmetic inspection points, published grading, per-unit documentation, lot-level control and full traceability.`,
    alternates: { canonical: `/${country}/assurance` },
  };
}

export default async function AssurancePage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="Quality assurance"
        lead="Not a claim about being careful. A description of the controls, who performs them, what they produce, and where they stop. Every claim on this website traces back to something on this page, and anything we cannot evidence is not made."
        meta={
          <>
            <Pill tone="ok">Per-unit evidence</Pill>
            <Pill tone="ok">Published standard</Pill>
            <Pill tone="ok">Lot-level control</Pill>
            <Pill tone="warn">Honest about limits</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/assurance`, label: 'Quality assurance' }]} />

              {/* ------------------------------------------------ CLAIM - */}
              <h2 id="claim">1. What we actually guarantee</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Six promises. Each one is verifiable from documents that ship with the goods, and each
                one has a defined failure mode. A guarantee with no failure mode is a slogan.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Promise</Th>
                    <Th scope="col">Evidence that ships with the unit</Th>
                    <Th scope="col">If we get it wrong</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>The unit matches its grade</Td>
                    <Td>Per-unit grade report with numeric criteria, battery reading and parts disclosure</Td>
                    <Td>Grade-conformity claim for the full {WARRANTY_MONTHS}-month term</Td>
                  </tr>
                  <tr>
                    <Td strong>The listed functions work</Td>
                    <Td>Test-point results on the report, {GRADING_STANDARD.testPointsPhone} on phones, {GRADING_STANDARD.testPointsLaptop} on laptops</Td>
                    <Td>Repair, replacement or credit</Td>
                  </tr>
                  <tr>
                    <Td strong>The data is gone</Td>
                    <Td>Per-serial destruction certificate with a verification reference</Td>
                    <Td>Full credit and the unit destroyed, not returned</Td>
                  </tr>
                  <tr>
                    <Td strong>The IMEI is clean</Td>
                    <Td>IMEI on the manifest, screened before despatch</Td>
                    <Td>Replacement for the remaining term</Td>
                  </tr>
                  <tr>
                    <Td strong>What we replaced is disclosed</Td>
                    <Td>Parts section of the grade report: original, OEM or aftermarket, stated plainly</Td>
                    <Td>Non-conformity to grade, and a claim</Td>
                  </tr>
                  <tr>
                    <Td strong>Nothing undisclosed is locked</Td>
                    <Td>Activation, OS, BIOS and enterprise-lock check recorded on the report</Td>
                    <Td>Covered as our error for the full term</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="info" title="How to use this page in a supplier audit">
                <p>
                  Treat every row above as a control you can test. Order a small trial lot, sample it
                  against the <Link href={`${base}/grading-standard`}>published criteria</Link>, and
                  check the documentation against the devices in your hand. Suppliers who dislike that
                  exercise are the reason this industry has a reputation problem. If you find a
                  discrepancy, send it to <a href={`mailto:${SITE.complianceEmail}`}>{SITE.complianceEmail}</a>{' '}
                  and you will get a specific answer rather than a general one.
                </p>
              </Callout>

              {/* ----------------------------------------------- PILLARS */}
              <h2 id="pillars" style={{ marginTop: '3.5rem' }}>2. The six controls</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Quality is not a single inspection. It is a chain, and the chain is only as strong as its
                weakest link &mdash; which is why each control below has its own evidence.
              </p>

              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                <Card
                  title="Sourcing intake"
                  icon="file"
                  href={`${base}/assurance#sourcing`}
                >
                  Lot provenance, financial and carrier checks, and quarantine on arrival. No lot is bought
                  on a seller&rsquo;s description alone.
                </Card>
                <Card
                  title="Data destruction"
                  icon="lock"
                  href={`${base}/data-security`}
                >
                  {GRADING_STANDARD.wipeStandard} Purge before testing, read-back verified, certified per
                  serial, and repeated in full after any repair.
                </Card>
                <Card
                  title="Functional testing"
                  icon="chip"
                  href={`${base}/assurance#testing`}
                >
                  {GRADING_STANDARD.testPointsPhone} phone and {GRADING_STANDARD.testPointsLaptop}{' '}
                  laptop test points, all of them, every unit, not a sample.
                </Card>
                <Card
                  title="Cosmetic grading"
                  icon="award"
                  href={`${base}/grading-standard`}
                >
                  {GRADING_STANDARD.inspectionPointsCosmetic} inspection points at{' '}
                  {GRADING_STANDARD.inspectionLux} lux against published numeric criteria.
                </Card>
                <Card
                  title="Documentation"
                  icon="doc"
                  href={`${base}/assurance#documentation`}
                >
                  Per-unit report, destruction certificate, IMEI manifest, and documents in the language
                  the destination requires.
                </Card>
                <Card
                  title="After-sales control"
                  icon="shield"
                  href={`${base}/returns`}
                >
                  {WARRANTY_MONTHS} months, grade conformity warranted, and a published repair turnaround
                  sequence you can audit.
                </Card>
              </div>

              {/* ----------------------------------------------- PIPELINE */}
              <h2 id="pipeline" style={{ marginTop: '3.5rem' }}>3. Intake to dispatch</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                The order these happen in is not a detail. Data destruction precedes testing so a device
                is never powered up holding somebody&rsquo;s data, and quarantine precedes both.
              </p>

              <div className="flow">
                <FlowStep title="1. Lot received and quarantined">
                  Provenance recorded, financial and carrier checks run, lot segregated from saleable
                  stock.
                </FlowStep>
                <FlowStep title="2. Data destruction">
                  {GRADING_STANDARD.wipeStandard} Purge, then verification read-back. A unit that fails
                  here is destroyed, not tested.
                </FlowStep>
                <FlowStep title="3. Functional triage">
                  Dead, damaged or locked units pulled out here, before they consume inspection and repair
                  capacity.
                </FlowStep>
                <FlowStep title="4. Repair">
                  Component-level work with recorded part provenance, drawn from the tested donor pool.
                </FlowStep>
                <FlowStep title="5. Full functional test">
                  Every test point in the standard, every unit, results recorded per point.
                </FlowStep>
                <FlowStep title="6. Cosmetic inspection">
                  {GRADING_STANDARD.inspectionPointsCosmetic} points at {GRADING_STANDARD.inspectionLux} lux,
                  graded against published criteria.
                </FlowStep>
                <FlowStep title="7. Battery measurement">
                  Cycle count and maximum capacity, measured on the specified instrument and method, checked
                  against the tier floor.
                </FlowStep>
                <FlowStep title="8. Grade assignment">
                  The tier is determined by the recorded evidence, never by target yield or by what a
                  customer asked for.
                </FlowStep>
                <FlowStep title="9. Documentation pack">
                  Grade report, destruction certificate, IMEI manifest, warranty summary &mdash; per serial.
                </FlowStep>
                <FlowStep title="10. Packing and despatch">
                  Graded separately, labelled, dangerous-goods compliant where required, and reconciled
                  against the manifest before the carton is sealed.
                </FlowStep>
              </div>

              {/* ----------------------------------------------- SOURCING */}
              <h2 id="sourcing" style={{ marginTop: '3.5rem' }}>4. Sourcing controls</h2>
              <div className="prose">
                <p>
                  Most defects arrive at the front door, not the bench. A lot of water-damaged phones sold
                  as working stock, or devices still under a carrier finance plan, cannot be fixed
                  downstream. So the first control is refusing the lot, and it is applied before anything
                  is opened.
                </p>
              </div>

              <div className="steps">
                <Step title="Provenance recorded">
                  Source, lot reference and acquisition date against every serial range. A lot we cannot
                  trace is a lot we do not buy.
                </Step>
                <Step title="Financial and legal screen">
                  Devices with an outstanding financed balance or an unresolved insurance claim are
                  excluded. We do not want to be the reason a finance provider is still chasing the
                  previous owner.
                </Step>
                <Step title="Carrier and network check">
                  Lock status, blacklist status and network variant recorded before purchase where the
                  seller&rsquo;s jurisdiction allows it.
                </Step>
                <Step title="Quarantine on arrival">
                  No unit from an incoming lot is plugged in, graded or shelved with sellable stock before
                  triage is complete.
                </Step>
                <Step title="Supplier standing">
                  Sources are re-audited, and a source that repeatedly delivers misdescribed stock is
                  removed rather than warned.
                </Step>
              </div>

              {/* ----------------------------------------------- DATA --- */}
              <h2 id="data" style={{ marginTop: '3.5rem' }}>5. Data destruction</h2>
              <div className="prose">
                <p>
                  The full procedure, the layers it covers and the limits of what a certificate can mean
                  are documented separately on the{' '}
                  <Link href={`${base}/data-security`}>data security page</Link>, because it is the
                  subject that deserves its own page rather than a paragraph. In summary, and in the order
                  it happens:
                </p>
              </div>

              <KV
                items={[
                  { k: 'Method', v: `${GRADING_STANDARD.wipeMethod}, referenced to ${GRADING_STANDARD.wipeStandard}` },
                  { k: 'Position in the flow', v: 'Before functional testing. A device is never powered up while it still holds another person&rsquo;s data' },
                  { k: 'Verification', v: 'Read-back across the storage, not an exit code. An exit code reports success; a read-back reports the state' },
                  { k: 'Additional layers', v: 'OS and firmware accounts, activation locks, MDM enrolment, secure elements, bootloader and baseband state' },
                  { k: 'Certificate', v: 'One per serial, with a verification reference, listing the method, the date and the operator' },
                  { k: 'After a repair', v: 'Repeated in full, because opening a device invalidates the assumption that the first purge held' },
                  { k: 'On failure', v: 'Unit destroyed under witness, destruction record issued, full credit. It never returns to stock' },
                ]}
              />

              {/* ----------------------------------------------- TESTING */}
              <h2 id="testing" style={{ marginTop: '3.5rem' }}>6. Testing</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Every unit, every test point. Sampling is a cost decision that other suppliers make; it is
                not one we make on graded stock.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                <Card title={`Phones — ${GRADING_STANDARD.testPointsPhone} test points`} icon="phone">
                  Power on and restart behaviour; charging in and out with measured current; every button,
                  switch and haptic; all cameras with autofocus and video; microphone, earpiece and both
                  speakers; every sensor including biometric authentication; display touch mapped across
                  the full surface and at the edges; brightness and colour; all radios including Wi-Fi,
                  Bluetooth, cellular, GPS and NFC; network variant against the report; and the presence of
                  any residual lock.
                </Card>
                <Card title={`Laptops — ${GRADING_STANDARD.testPointsLaptop} test points`} icon="laptop">
                  Cold boot to desktop; sleep, wake and hibernation; every port including USB-C, HDMI and
                  SD; display, backlight and panel uniformity; keyboard matrix tested row by row; touchpad
                  and pointing device; audio in and out; camera and microphone; Wi-Fi and Bluetooth;
                  storage health, capacity and SMART data; memory verification; battery charge curve and
                  cycle count; fan, thermals and throttling under load; and BIOS, firmware password and
                  secure-boot state.
                </Card>
              </div>

              <div className="grid grid-2" style={{ gap: '1.2rem', marginTop: '1.2rem' }}>
                <Card title="Battery measurement, and why the method matters" icon="battery">
                  Battery health is only comparable if it is measured the same way every time. We record
                  cycle count and maximum capacity against design capacity, on a fixed instrument with a
                  stated method, after a defined charge cycle. Two suppliers quoting &ldquo;90% health&rdquo;
                  measured on different instruments and different protocols can be reporting numbers two
                  years apart, which is why a vague battery figure is not accepted as evidence in a
                  grade dispute.
                </Card>
                <Card title="What a failed test point does" icon="alert">
                  The unit is diverted, not downgraded in place. It goes to repair, and if it cannot be
                  made to pass the full list it is re-graded to a lower tier or converted to parts with the
                  fault category recorded. A unit that fails a test point is never sold as if it had passed
                  &mdash; and the report shows which points were run, not just a pass mark.
                </Card>
              </div>

              {/* ----------------------------------------------- GRADING */}
              <h2 id="grading" style={{ marginTop: '3.5rem' }}>7. Grading</h2>
              <div className="prose">
                <p>
                  The grading standard is published in full on its own page, because a grade that is not
                  published is not a specification. The criteria are numeric where a number is meaningful,
                  the inspection conditions are fixed at {GRADING_STANDARD.inspectionLux} lux across{' '}
                  {GRADING_STANDARD.inspectionPointsCosmetic} inspection points, and battery floors are set
                  per tier. Version {GRADING_STANDARD.version} took effect{' '}
                  {GRADING_STANDARD.effective} and is next reviewed {GRADING_STANDARD.nextReview}.
                </p>
                <p>
                  The criteria in force at the date of your order govern any claim you make, even if the
                  standard has since been revised. That is written into the standard itself, and it is
                  the difference between a version-controlled document and a marketing page.
                </p>
              </div>

              <Callout tone="plain" title="The one rule that matters most">
                <p>
                  The grade is determined by the recorded evidence, not by the yield the lot needs to hit.
                  There is no target output per intake and no pressure on the inspector to place a
                  borderline unit in a higher tier. If a unit lands between two tiers, it lands in the
                  lower one, and the reason is written on the report.
                </p>
              </Callout>

              {/* ----------------------------------------------- DOCS --- */}
              <h2 id="documentation" style={{ marginTop: '3.5rem' }}>
                8. Documentation
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Documentation is not a pack thrown in at the end. It is generated from the same record the
                inspector wrote, which is why it agrees with the device.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Per-unit grade report', 'Grade, battery health and cycle count, every function tested, every part replaced with its provenance, and every defect recorded against the cosmetic inspection.'],
                  ['Data-destruction certificate', 'Per serial. Method, standard referenced, verification result, date and operator, with a reference you can quote in an audit.'],
                  ['IMEI / MEID manifest', 'Every serial in the consignment, screened before despatch, matching the grade reports one-to-one.'],
                  ['Warranty summary', `The ${WARRANTY_MONTHS}-month terms in wording your retail customer can read, identical to the warranty page. No carve-outs in the small print.`],
                  ['Commercial paperwork', 'Invoice, packing list, certificate of origin, Incoterm and named place, and a dangerous-goods declaration where the mode requires it.'],
                  ['Language versions', 'Arabic, French and Traditional Chinese inserts where the destination market requires them, prepared as part of the order rather than on request.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="doc">
                    {v}
                </Card>
                ))}
              </div>

              {/* ----------------------------------------------- LOT ---- */}
              <h2 id="lot" style={{ marginTop: '3.5rem' }}>9. Lot-level control</h2>
              <div className="prose">
                <p>
                  Per-unit controls do not tell you whether a lot as a whole is sound. That needs a
                  separate control, because a lot can pass unit-by-unit and still be systematically
                  skewed &mdash; a supplier with a screen-replacement habit, or a batch of batteries from
                  one ageing cell lot.
                </p>
              </div>

              <div className="steps">
                <Step title="Lot identity">
                  Every consignment carries a lot reference, and the lot is traceable back through
                  sourcing, intake, repair and grading. When you raise a claim, the lot reference tells us
                  whether to look at one unit or the whole lot.
                </Step>
                <Step title="Distribution monitoring">
                  Battery health, grade mix and failure categories are tracked per lot. A lot drifting
                  outside its expected distribution is held for review before further shipments.
                </Step>
                <Step title="Bulk-failure trigger">
                  Where more than 5% of a consignment fails within the DOA window, the whole lot is
                  inspected rather than only the returned units, and you are told that we have done so.
                </Step>
                <Step title="Corrective action">
                  A lot failure produces a written corrective action: what was found, the root cause, what
                  changed &mdash; sourcing, parts, process, inspection or the standard itself &mdash; and
                  what it means for stock you have already received.
                </Step>
                <Step title="Feedback into the standard">
                  Recurring failure patterns become dated revisions of the grading standard. Changes are
                  published, not quietly applied.
                </Step>
              </div>

              <Callout tone="warn" title="Where more than 5% fails in the DOA window">
                <p>
                  We treat it as a lot issue, inspect the lot, and tell you. We will also tell you what we
                  found even where the finding is uncomfortable. A supplier that investigates only the
                  units that come back is optimising for the claim count rather than for your business.
                </p>
              </Callout>

              {/* ----------------------------------------------- TRACE - */}
              <h2 id="traceability" style={{ marginTop: '3.5rem' }}>
                10. Traceability — one serial, one record
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A serial number is only useful if it resolves to a history. Ours does, and the record
                accumulates rather than being overwritten.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Record</Th>
                    <Th scope="col">Created at</Th>
                    <Th scope="col">Retained</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Sourcing and lot provenance</Td>
                    <Td>Lot acquisition</Td>
                    <Td>Life of the business, for audit</Td>
                  </tr>
                  <tr>
                    <Td>Data-destruction record, first pass</Td>
                    <Td>Intake, before testing</Td>
                    <Td>Life of the business; re-issued after repair</Td>
                  </tr>
                  <tr>
                    <Td>Repair actions and parts fitted</Td>
                    <Td>Bench</Td>
                    <Td>Life of the business</Td>
                  </tr>
                  <tr>
                    <Td>Full test-point results</Td>
                    <Td>Post-repair testing</Td>
                    <Td>Life of the business</Td>
                  </tr>
                  <tr>
                    <Td>Cosmetic inspection and grade decision</Td>
                    <Td>Grading bench, with the reason if a unit landed between tiers</Td>
                    <Td>Life of the business</Td>
                  </tr>
                  <tr>
                    <Td>Issued grade report</Td>
                    <Td>Despatch</Td>
                    <Td>Superseded reports retained, never deleted</Td>
                  </tr>
                  <tr>
                    <Td>Claim and return history</Td>
                    <Td>Warranty event</Td>
                    <Td>Full {WARRANTY_MONTHS}-month term and beyond, for pattern analysis</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ----------------------------------------------- RETURNS */}
              <h2 id="returns" style={{ marginTop: '3.5rem' }}>
                11. Returns and repair
              </h2>
              <div className="prose">
                <p>
                  After-sales is where a quality system either holds or does not. The full sequence &mdash;
                  quarantine on arrival, intake verification against the report, root-cause diagnosis,
                  repair or replacement decision, a <b>second</b> data purge, full re-test, re-grading,
                  re-issued documentation, insured return &mdash; is documented step by step on the{' '}
                  <Link href={`${base}/returns`}>returns and repair turnaround page</Link>.
                </p>
                <p>
                  The controls worth restating here: a returned unit is quarantined before anyone opens
                  it; a grade can be revised down but never promoted above what was originally sold; the
                  data purge is repeated because opening a device invalidates the first one; and a device
                  that cannot be proven clean is destroyed under witness and credited, not returned.
                </p>
              </div>

              {/* ----------------------------------------------- METRICS */}
              <h2 id="metrics" style={{ marginTop: '3.5rem' }}>
                12. Metrics, including the ones that do not flatter us
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Quality claims backed by numbers are checkable. Here is what we will report to a
                prospective account, and what we will not claim until the data supports it.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['We will report', `Claim rate per grade, DOA rate per lot, mean turnaround from claim approval to return dispatch, repeat-claim rate by model, and the share of units in each grade. Reported per account, on request, at whatever volume you have bought — including when it is unflattering.`],
                  ['We publish per unit', 'Every test-point result, every cosmetic finding, every part fitted, both battery readings where two exist, the grade, and the reason for a between-tier decision.'],
                  ['We do not claim', 'A DOA rate. We do not have a figure we are prepared to put in writing for this business, and we will not invent one to complete the row. We will give you the measured rate for the stock you have actually bought, which is the only number that means anything for your risk.'],
                  ['We do not claim', 'Certification. We hold no e-waste, environmental or recycler certification, we display no logo we cannot evidence, and the <Link href={`${base}/certifications`}>certifications page</Link> states the status of every scheme honestly — including the ones we do not hold.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon={k === 'We will report' ? 'check' : 'info'}>
                    {v}
                  </Card>
                ))}
              </div>

              {/* ----------------------------------------------- THIRD - */}
              <h2 id="third-party" style={{ marginTop: '3.5rem' }}>
                13. Third-party verification
              </h2>
              <div className="prose">
                <p>
                  We would rather a third party checked this than ask you to take our word for it. The
                  <Link href={`${base}/certifications`}> certifications page</Link> lists every scheme
                  with an honest status. In summary: the grading standard is a published document with
                  numbered criteria, not a registered standard; the data-destruction procedure is
                  referenced to {GRADING_STANDARD.wipeStandard}; the certificates we issue are our own,
                  traceable to our own records; and no accreditation body has audited this facility.
                </p>
              </div>

              <KV
                items={[
                  { k: 'Grading standard', v: `Published, versioned, dated, and internally audited. Not accredited by an external standards body — we say so rather than implying otherwise` },
                  { k: 'Data destruction', v: `Method referenced to ${GRADING_STANDARD.wipeStandard}. The procedure is ours; the standard is not a certification of us` },
                  { k: 'Issued certificates', v: 'VeriGrade certificates, verifiable against our records by serial. The specimen on the certifications page is marked as a specimen for exactly that reason' },
                  { k: 'Registrations', v: `Trade licence, VAT and freezone licence numbers appear on the about page once issued. Until then they are shown as pending, and no number is displayed that we cannot evidence` },
                  { k: 'Customer audits', v: 'Facility and process audits welcome for prospective accounts and existing ones. We would rather be audited than believed' },
                ]}
              />

              <Callout tone="bad" title="What is not verified, in one place">
                <p>
                  No third-party product certification. No environmental or recycler accreditation. No
                  published DOA figure. No audited facilities claim. No accreditation of our grading
                  standard by any external body.{' '}
                  {REGISTRATIONS.tradeLicence === null &&
                    'Trade licence, VAT and freezone registrations are pending publication and are not displayed.'}{' '}
                  Everything claimed on this site is either evidenced by a document that ships with the
                  goods, or it is not claimed.
                </p>
              </Callout>

              {/* ----------------------------------------------- LIMITS */}
              <h2 id="limits" style={{ marginTop: '3.5rem' }}>
                14. The limits, stated plainly
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A quality page that only lists strengths is marketing. These are the genuine limits, and
                they are limits of method rather than of intent.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['A certificate is not a forensic guarantee', 'A verified wipe is evidence that the procedure was performed and passed at that moment. It cannot guarantee that a sophisticated extraction tool run by a forensic lab years later would find nothing on flash storage we do not control. The procedure is a strong control, not an absolute.'],
                  ['Cosmetic grading has a resolution', `Our inspection resolves visible marks at ${GRADING_STANDARD.inspectionLux} lux across ${GRADING_STANDARD.inspectionPointsCosmetic} points under a defined viewing distance. A mark that requires magnification to see is below the resolution of the standard. The standard defines this so a dispute is about the definition, not about eyesight.`],
                  ['Battery figures decay', 'A battery percentage is a reading at a moment in time. It falls as the unit is used, and the warranty covers a fall below the tier floor measured by the specified method &mdash; not a promise that the percentage will hold.'],
                  ['IMEI status can change after despatch', 'We screen every IMEI before despatch and guarantee the status at that point. An IMEI can be blacklisted afterwards by a subsequent insurance or finance claim, which is outside any supplier&rsquo;s control. We replace where the cause is attributable to our supply chain.'],
                  ['We do not warrant your market access', 'Import duties, radio type approvals, consumer disclosure rules and EPR obligations are yours as the importer. We flag them per market on the <Link href={`${base}/compliance`}>compliance page</Link>, but we do not give legal advice and we cannot warrant them.'],
                  ['Yield is a business pressure we manage, not deny', 'A wholesaler wants to sell every unit that arrives. That pressure is real, and it is exactly why the grade is decided by recorded evidence, why borderline units go down a tier, and why the standard is published and versioned. Judge us on whether the reports survive your own audit.'],
                ].map(([k, v]) => (
                  <Callout key={k} tone="plain" title={k}>
                    <p>{v}</p>
                  </Callout>
                ))}
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="The fastest way to evaluate this page is to test it against stock we sold you."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Grading standard', href: `${base}/grading-standard` }}
                >
                  Order a trial lot, sample it against the published criteria, and check the paperwork
                  against the devices. If anything does not reconcile, tell us &mdash; a supplier audit you
                  run yourself is worth more than any claim on this page. Also worth reading:{' '}
                  <Link href={`${base}/returns`}>returns and repair turnaround</Link>,{' '}
                  <Link href={`${base}/data-security`}>data security</Link> and{' '}
                  <Link href={`${base}/certifications`}>certifications</Link>.
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
