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
import { GRADING_STANDARD } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#why', label: '1. Why this page exists' },
  { href: '#flow', label: '2. The turnaround at a glance' },
  { href: '#intake', label: '3. Intake and quarantine' },
  { href: '#diagnose', label: '4. Diagnosis' },
  { href: '#decide', label: '5. Repair, replace or downgrade' },
  { href: '#repair', label: '6. The repair itself' },
  { href: '#rewipe', label: '7. Data destruction again' },
  { href: '#retest', label: '8. Re-test' },
  { href: '#regrade', label: '9. Re-grading' },
  { href: '#docs', label: '10. Documents re-issued' },
  { href: '#pack', label: '11. Safe return packaging' },
  { href: '#dispatch', label: '12. Dispatch and insurance' },
  { href: '#refuse', label: '13. What we will not return' },
  { href: '#second', label: '14. If it fails again' },
  { href: '#timeline', label: '15. Timelines' },
  { href: '#retail', label: '16. For your retail customer' },
];

const WARRANTY_MONTHS = 12;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Returns & repair turnaround',
    description: `Every step a device takes from your claim to our bench and back: intake quarantine, diagnosis, repair, a second data purge, full re-test, re-grading, re-issued certificates, and insured return dispatch. ${WARRANTY_MONTHS}-month warranty, step by step.`,
    alternates: { canonical: `/${country}/returns` },
  };
}

export default async function ReturnsPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="After-sales"
        title="How a device comes back to you"
        lead="A warranty is only worth the process behind it. This is the actual sequence a unit goes through after you raise a claim — quarantine, diagnosis, repair, a second data purge, a full re-test, a re-grade, fresh certificates, and an insured return. Written down, so you can hold us to it."
        meta={
          <>
            <Pill tone="ok">Claim acknowledged in 2 working days</Pill>
            <Pill tone="ok">Decision in 10 working days</Pill>
            <Pill tone="info">Re-wiped and re-certified</Pill>
            <Pill tone="info">Insured return</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/returns`, label: 'Returns & repair turnaround' }]} />

              {/* ------------------------------------------------ WHY --- */}
              <h2 id="why">1. Why this page exists</h2>
              <div className="prose">
                <p>
                  Almost every refurbished supplier in this market will honour a warranty for a
                  functioning device. Very few will tell you what happens to the device on the way back
                  through the workshop, and that is where your next customer&rsquo;s problems are created.
                </p>
                <p>
                  A unit that comes back from a repair without a second data purge is a liability you
                  inherit. A unit that comes back re-tested only on the part that failed is a device
                  with an unknown state. A unit that comes back in a bubble wrap bag with no
                  documentation is stock you cannot resell without re-checking it yourself, which erases
                  the entire reason for buying wholesale.
                </p>
                <p>
                  So this is the process, in order, with the boring operational detail left in. If we
                  deviate from it, that is a non-conformance on our side and you should tell us. The
                  terms behind this process are on the{' '}
                  <Link href={`${base}/warranty`}>warranty page</Link>; the quality system behind it is on
                  the <Link href={`${base}/assurance`}>assurance page</Link>.
                </p>
              </div>

              {/* ------------------------------------------------ FLOW -- */}
              <h2 id="flow" style={{ marginTop: '3.5rem' }}>
                2. The turnaround at a glance
              </h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Fourteen stages from your email to your dock. Stages 1&ndash;2 are administrative, 3&ndash;6
                are the workshop, and 7&ndash;14 exist so the unit is resellable the moment it lands
                rather than needing your own bench time.
              </p>

              <div className="flow">
                <FlowStep title="1. Claim logged">
                  Serial, grade report and fault recorded against your account and the unit&rsquo;s
                  original consignment.
                </FlowStep>
                <FlowStep title="2. Return authorised">
                  RMA number issued, carrier and label arranged, packing instructions sent with the
                  unit&rsquo;s own IMEI.
                </FlowStep>
                <FlowStep title="3. Intake and quarantine">
                  The unit goes into quarantine, physically separated from saleable stock, before anyone
                  opens it.
                </FlowStep>
                <FlowStep title="4. Intake verification">
                  Photographs of arrival condition, accessories counted, IMEI re-read and matched to the
                  report.
                </FlowStep>
                <FlowStep title="5. Fault diagnosis">
                  Full diagnostic, not just the reported symptom. Root cause recorded, not just the failed
                  part.
                </FlowStep>
                <FlowStep title="6. Repair decision">
                  Repair, replace, re-grade down, or convert to parts — decided on evidence and confirmed
                  to you before work starts.
                </FlowStep>
                <FlowStep title="7. The repair">
                  Component-level work with recorded part provenance. Parts from the tested donor pool, not
                  ungraded stock.
                </FlowStep>
                <FlowStep title="8. Data destruction again">
                  A second full purge and read-back verification, because a repair means the device was
                  opened.
                </FlowStep>
                <FlowStep title="9. Full re-test">
                  Every functional test point, not only the failed one. Battery re-measured against the tier
                  floor.
                </FlowStep>
                <FlowStep title="10. Re-grade">
                  Cosmetic re-inspection under the same lux and angles. A grade can go down, never up.
                </FlowStep>
                <FlowStep title="11. Documents re-issued">
                  New grade report, new destruction certificate, new warranty start date. The old report is
                  marked superseded.
                </FlowStep>
                <FlowStep title="12. Safe return packing">
                  Anti-static where applicable, battery isolation, accessories bagged, documentation
                  sealed outside the device.
                </FlowStep>
                <FlowStep title="13. Insured dispatch">
                  Tracked and insured to the full replacement value, dangerous-goods compliant, with the
                  document pack in the same consignment.
                </FlowStep>
                <FlowStep title="14. Reconciliation">
                  Credit note or replacement invoiced, claim closed in writing, and the failure fed back
                  into the grading standard.
                </FlowStep>
              </div>

              {/* ------------------------------------------------ INTAKE */}
              <h2 id="intake" style={{ marginTop: '3.5rem' }}>3. Intake and quarantine</h2>
              <div className="prose">
                <p>
                  The moment a returned unit crosses our threshold it is quarantined. Not inspected, not
                  plugged in, not shelved with sellable stock &mdash; <b>quarantined</b>. It goes into a
                  segregated area with its own tooling and its own bin, so a device that turns out to be
                  carrying an infection, a swollen battery, or somebody&rsquo;s data can never contaminate
                  saleable inventory.
                </p>
                <p>
                  This is the single most important control on this page, and it exists because the
                  alternative is a small but real chance of a firmware-level problem or a private-data
                  problem moving back out into the supply chain under a VeriGrade certificate. It has
                  happened in this industry. It will not happen in ours.
                </p>
              </div>

              <Callout tone="warn" title="Two intake outcomes that end the process immediately">
                <p>
                  A unit that arrives with a <b>swollen or punctured battery</b>, or one that shows
                  <b> liquid ingress</b>, is not quarantined for repair. It is moved to the hazardous
                  storage area, photographed, and you are notified the same working day. We do not
                  attempt a repair on a compromised cell, and we do not return a device in a condition
                  that would be unsafe on your warehouse racking or in your courier network.
                </p>
              </Callout>

              <h3>Intake verification, before a technician touches it</h3>
              <div className="steps">
                <Step title="Arrival photographs">
                  All six sides, screen lit where it will light, and any damage visible on arrival. Time
                  stamped. These become the first entry in the unit&rsquo;s permanent record.
                </Step>
                <Step title="IMEI or serial re-read">
                  Read from the hardware, not copied from your paperwork, and matched against the grade
                  report. A mismatch stops the claim &mdash; it is the strongest single piece of
                  anti-fraud evidence we have, and it protects you from receiving a substituted unit.
                </Step>
                <Step title="Accessories and packaging">
                  Counted against the original packing list. Missing accessories are recorded, because
                  access point loss is a functional defect for a phone, not a cosmetic one.
                </Step>
                <Step title="Reported condition compared to the report">
                  If the device arrives visibly worse than the grade it was sold as, that is recorded as
                  a handling issue on your side and the repair may be charged. If it arrives visibly
                  <i> better</i>, it is re-graded up for the remaining term.
                </Step>
                <Step title="Battery health read">
                  Cycle count and maximum capacity captured at intake, so a decline that happened in
                  transit is not later attributed to the repair.
                </Step>
              </div>

              {/* ------------------------------------------------ DIAG -- */}
              <h2 id="diagnose" style={{ marginTop: '3.5rem' }}>4. Diagnosis</h2>
              <div className="prose">
                <p>
                  The reported symptom is treated as a starting point, not the diagnosis. A phone that
                  will not charge is frequently a charging-port flex, a corroded connector or a
                  battery-management fault &mdash; not a dead battery. Replacing the battery in that case
                  returns the device to you in three weeks, and it fails again in three more.
                </p>
                <p>
                  So a technician runs the full diagnostic, works back to a root cause, and records both.
                  The root cause, the evidence, and the reasoning are attached to the claim and sent to
                  you with the decision. If the honest answer is &ldquo;this is not a warranty fault, this
                  is damage after delivery&rdquo;, you get that answer with the evidence attached rather
                  than a bare refusal &mdash; and you get the right to dispute it on the same terms as
                  any other claim.
                </p>
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Reported symptom</Th>
                    <Th scope="col">Common actual root causes</Th>
                    <Th scope="col">What we check first</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Will not charge</Td>
                    <Td>Charging flex, corroded port, failed charge IC, genuinely dead cell</Td>
                    <Td>Port continuity and corrosion before condemning a battery</Td>
                  </tr>
                  <tr>
                    <Td>Random restarts</Td>
                    <Td>Failed battery, thermal paste breakdown, storage wear, OS corruption</Td>
                    <Td>Error log retention, then cell health, then clean OS install</Td>
                  </tr>
                  <tr>
                    <Td>No signal</Td>
                    <Td>Antenna flex, baseband, wrong network variant, carrier lock</Td>
                    <Td>Variant against the report, then RF path, then IMEI status</Td>
                  </tr>
                  <tr>
                    <Td>Touch dead in an area</Td>
                    <Td>Digitiser failure, display connector corrosion, board-side damage</Td>
                    <Td>Differentiate digitiser from display &mdash; they are different parts and different prices</Td>
                  </tr>
                  <tr>
                    <Td>Laptop will not power on</Td>
                    <Td>DC jack, battery pack, RAM seating, board failure, firmware lock</Td>
                    <Td>No-POST diagnostics before any board-level work</Td>
                  </tr>
                  <tr>
                    <Td>Battery drains fast</Td>
                    <Td>Cell wear, background app, degraded OS, failing battery management</Td>
                    <Td>Cycle count and maximum capacity against the intake reading</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ----------------------------------------------- DECIDE -- */}
              <h2 id="decide" style={{ marginTop: '3.5rem' }}>
                5. Repair, replace, re-grade, or parts
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Once root cause is established, one of four outcomes is chosen. Your consent is sought
                before any work that costs money on a non-warranty fault, and the decision is recorded
                with the reason.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Repair', 'Root cause is identified, the repair is economic, and the result can be verified against the full test list. The normal outcome for a genuine warranty fault. The unit comes back with a fresh report and a new warranty start date.'],
                  ['Replace', 'The repair would not hold, the parts pipeline cannot match the original finish, or turnaround would exceed what is fair to you. You receive an equal or better grade, not a downgrade sold as a repair.'],
                  ['Re-grade down', 'The device is sound and the fault is resolved, but the repair has left a cosmetic or functional trace &mdash; a replaced display on a Grade A, a casing scuff from the bench. The unit is re-graded to the tier it now honestly meets, the price is adjusted, and the warranty continues on the new grade.'],
                  ['Convert to parts', 'The board is not economically repairable. Rather than absorbing the cost, we credit you at the Grade D parts rate, ship the unit as a documented component donor, and close the warranty claim. You are not asked to absorb a repair that could not have worked.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon={k === 'Convert to parts' ? 'parts' : 'recycle'}>
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="ok" title="A re-grade is not a penalty">
                <p>
                  If we re-grade a unit down, the warranty does not restart at zero and the difference is
                  credited. We would rather ship you an honestly described Grade B than a Grade A with a
                  dent you find later. Re-grading is recorded on the new report, and the original grade
                  remains visible in the record so the full history is auditable.
                </p>
              </Callout>

              {/* ----------------------------------------------- REPAIR - */}
              <h2 id="repair" style={{ marginTop: '3.5rem' }}>6. The repair itself</h2>
              <div className="prose">
                <p>
                  Repairs are done on the bench by technicians, not through a drop-down menu. The
                  controls that matter to you are the same ones that matter to us: the part used, who
                  fitted it, what was replaced, and what was found underneath.
                </p>
              </div>

              <KV
                items={[
                  { k: 'Part provenance', v: 'Every component drawn from the tested donor pool, with its own source and test history. Original, OEM, or aftermarket is stated explicitly on the report &mdash; never left ambiguous' },
                  { k: 'Parts suitability', v: 'A donor screen is colour- and brightness-matched before fitting. A mismatched panel is a cosmetic non-conformity to the assigned grade, and it is graded as one' },
                  { k: 'Work record', v: 'Technician, date, parts fitted, actions taken, and anything found that was not the reported fault &mdash; all retained against the serial' },
                  { k: 'Board-level work', v: 'Performed in-house only, on boards that pass a post-repair stress test. Micro-soldering is not outsourced' },
                  { k: 'Water-damage units', v: 'Corrosion treatment and board cleaning before any functional test, and almost always re-graded down afterwards. We will tell you before shipping them back' },
                  { k: 'Cosmetic matching', v: 'Bezel, frame and housing matched to the original finish where possible; where it is not possible, the discrepancy is recorded rather than hidden' },
                ]}
              />

              {/* ----------------------------------------------- REWIPE - */}
              <h2 id="rewipe" style={{ marginTop: '3.5rem' }}>
                7. Data destruction again
              </h2>
              <div className="prose">
                <p>
                  This is the stage most suppliers skip, and it is the reason a returned unit is often
                  more dangerous than the one that left. Your customer&rsquo;s device came back to us. It
                  had their accounts, their files, their authentication tokens. A repair means the device
                  was opened, and once a device is opened, the previous destruction cannot be assumed to
                  have held.
                </p>
                <p>
                  So the full procedure runs a second time:{' '}
                  {GRADING_STANDARD.wipeMethod} to {GRADING_STANDARD.wipeStandard}, followed by a
                  read-back verification across the storage, a check for OS and firmware-level accounts,
                  MDM enrolment profiles, and hardware-bound activation locks. Only then is the device
                  re-sealed and re-graded.
                </p>
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Layer</Th>
                    <Th scope="col">What is checked after repair</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>User partition</Td>
                    <Td>Re-purged to the standard, then verified by read-back, not by an exit code</Td>
                  </tr>
                  <tr>
                    <Td>OS &amp; firmware accounts</Td>
                    <Td>Activation lock, iCloud or Google lock, Mi account, Samsung account, FRP &mdash; all cleared or the unit is held</Td>
                  </tr>
                  <tr>
                    <Td>Enterprise enrolment</Td>
                    <Td>MDM enrolment records, DEP and ABR enrolment state, remote-management locks removed</Td>
                  </tr>
                  <tr>
                    <Td>Secure elements</Td>
                    <Td>Secure Enclave, TEE and key store state; biometric enrolments wiped</Td>
                  </tr>
                  <tr>
                    <Td>Firmware-level</Td>
                    <Td>DFU or recovery partition state, bootloader lock state, baseband and RF calibration</Td>
                  </tr>
                  <tr>
                    <Td>Verdict</Td>
                    <Td>
                      Pass &rarr; new certificate issued. Fail &rarr; the unit is quarantined and
                      destroyed, and you are credited. It does not go back into stock, ever
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="bad" title="A device that fails verification is destroyed, not returned">
                <p>
                  If a returned unit cannot be proven clean after repair, it is destroyed under witness and
                  a destruction record is issued to you. You get a full credit. We do not sell a device
                  that failed our own data-destruction check, and we do not return it to a customer who
                  did not ask for that risk.
                </p>
              </Callout>

              {/* ----------------------------------------------- RETEST - */}
              <h2 id="retest" style={{ marginTop: '3.5rem' }}>8. Full re-test, not a spot check</h2>
              <div className="prose">
                <p>
                  The repaired function is re-tested, and then everything else is re-tested as well. This
                  is deliberate: a repair involves disassembly, and disassembly can introduce a new fault
                  that has nothing to do with the original complaint. A device that passes only the repair
                  test is a device with an unknown state, and you should refuse to accept it.
                </p>
              </div>

              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                <Card title={`${GRADING_STANDARD.testPointsPhone} phone test points`} icon="phone">
                  Power on, charging in and out, all buttons and switches, all four cameras and autofocus,
                  microphone and speakers, all sensors including Face ID or fingerprint, display touch
                  across the full surface, all radios including Wi-Fi, Bluetooth, cellular and NFC, plus
                  the network variant against the report.
                </Card>
                <Card title={`${GRADING_STANDARD.testPointsLaptop} laptop test points`} icon="laptop">
                  Cold boot to desktop, sleep and wake, all ports, display and backlight, keyboard matrix
                  row by row, touchpad and pointing device, audio in and out, camera, microphone, Wi-Fi and
                  Bluetooth, storage health and capacity, memory, battery charge curve, fan and thermals,
                  and the firmware password and BIOS state.
                </Card>
                <Card title="Battery, every time" icon="battery">
                  Cycle count and maximum capacity re-measured on the same instrument and method specified
                  in the standard, and compared against the tier floor and against the intake reading. A
                  cell that has fallen below its floor after a repair is a new claim, not a rounding
                  error.
                </Card>
              </div>

              {/* ----------------------------------------------- REGRADE - */}
              <h2 id="regrade" style={{ marginTop: '3.5rem' }}>9. Re-grading</h2>
              <div className="prose">
                <p>
                  The unit goes back on the cosmetic bench under the same conditions as an incoming unit:
                  the same {GRADING_STANDARD.inspectionPointsCosmetic} inspection points at{' '}
                  {GRADING_STANDARD.inspectionLux} lux, the same angles, the same distance convention. The
                  new grade is assigned against the same{' '}
                  <Link href={`${base}/grading-standard`}>published criteria</Link> as the original.
                </p>
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Rule</Th>
                    <Th scope="col">Position</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Direction of travel</Td>
                    <Td>
                      A re-graded unit can move <b>down</b> a tier or stay at its tier. It cannot be
                      promoted above the tier originally sold, even if it now looks better, because the
                      warranty you hold was written against the original specification.
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Reason recorded</Td>
                    <Td>The specific finding that changed the tier: replaced display, casing mismatch, new scratch, battery now below floor.</Td>
                  </tr>
                  <tr>
                    <Td strong>Warranty treatment</Td>
                    <Td>
                      {WARRANTY_MONTHS} months restarts on the new grade if the unit is replaced, and
                      continues on the new grade if it is repaired in place.
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Price adjustment</Td>
                    <Td>Credited to you automatically with the re-grade. You do not have to ask.</Td>
                  </tr>
                  <tr>
                    <Td strong>History</Td>
                    <Td>Original grade, original report and every subsequent report are retained. Nothing is overwritten.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ----------------------------------------------- DOCS --- */}
              <h2 id="docs" style={{ marginTop: '3.5rem' }}>10. Documents re-issued</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A repaired unit is never returned under its old paperwork. Each of these is re-issued and
                travels in the same consignment as the device.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['New grade report', 'New grade, new battery reading, complete parts disclosure including the part just fitted, the recorded defects, and the original grade shown as superseded.'],
                  ['New data-destruction certificate', 'Fresh certificate for the second purge, with its own verification reference and date. The first certificate is marked superseded, not deleted.'],
                  ['Updated warranty certificate', `A ${WARRANTY_MONTHS}-month term from the return delivery date, on the new grade, in the same uniform wording as your original. No renegotiated terms on a claim.`],
                  ['Repair record', 'The diagnosis, the root cause, the parts fitted, the technician, and the full re-test result. Shared with you in full, not summarised.'],
                  ['Superseded-document note', 'A single page listing which documents the unit now carries and which have been withdrawn, so nothing in your file is orphaned.'],
                  ['Credit note or replacement invoice', 'Raised against the claim, referencing the RMA, with the restocking position stated. No 5% on a warranty claim.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="doc">
                    {v}
                  </Card>
                ))}
              </div>

              {/* ----------------------------------------------- PACK --- */}
              <h2 id="pack" style={{ marginTop: '3.5rem' }}>11. Safe return packaging</h2>
              <div className="prose">
                <p>
                  The unit is packed to survive the return leg, because a replacement that arrives broken
                  is worse than no replacement at all &mdash; it is a second claim, a second outage for
                  your customer, and a lesson learned badly.
                </p>
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Element</Th>
                    <Th scope="col">Specification</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Device protection</Td>
                    <Td>Screen and glass protected, device immobilised so no pressure reaches the display, anti-static bagging for boards and exposed contacts</Td>
                  </tr>
                  <tr>
                    <Td strong>Battery isolation</Td>
                    <Td>Cell isolated where the design allows, terminals covered, and never shipped at a high state of charge by air</Td>
                  </tr>
                  <tr>
                    <Td strong>Moisture</Td>
                    <Td>Desiccant in the outer carton on any unit that has been opened, and in every water-damage case</Td>
                  </tr>
                  <tr>
                    <Td strong>Accessories</Td>
                    <Td>Bagged separately from the device so a cable cannot scratch it in transit, and counted against the packing list</Td>
                  </tr>
                  <tr>
                    <Td strong>Documentation</Td>
                    <Td>Sealed in a document wallet outside the device packaging, so it cannot be separated in a depot or a customs inspection</Td>
                  </tr>
                  <tr>
                    <Td strong>Labelling</Td>
                    <Td>RMA number on every carton and on the device label, plus a DO NOT RESELL / REPAIRED UNIT marking consistent with the grade</Td>
                  </tr>
                  <tr>
                    <Td strong>Outward carton</Td>
                    <Td>New outer carton for every returned unit. We do not reuse a carton that has already been through a courier network</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="info" title="The reason for the DO NOT RESELL label">
                <p>
                  A returned unit is not the same product you bought. It has been opened, repaired and
                  re-certified, and in most markets that is a disclosure obligation on your retail
                  listing, not just an internal preference. The label exists so the repaired unit cannot
                  be shelved alongside untouched stock by mistake &mdash; which is how a repaired device
                  quietly acquires a fresh price.
                </p>
              </Callout>

              {/* ----------------------------------------------- DISPATCH */}
              <h2 id="dispatch" style={{ marginTop: '3.5rem' }}>12. Dispatch and insurance</h2>
              <KV
                items={[
                  { k: 'Insured value', v: 'Full replacement value: the new grade, not the depreciated value of the faulty unit' },
                  { k: 'Tracking', v: 'Tracked and monitored, with the RMA reference as the consignment reference so the carrier and our warehouse can be reconciled' },
                  { k: 'Dangerous goods', v: 'Lithium-battery compliant packing and a dangerous-goods declaration on every air movement, with the state-of-charge limit respected' },
                  { k: 'Consolidation', v: 'Multiple claims are consolidated into a single consignment to the same consignee, with per-RMA manifests and a per-unit document pack' },
                  { k: 'Delivery window', v: 'Stated on the dispatch notice. If we miss it, you are told before you ask, with a revised date' },
                  { k: 'Signature', v: 'Signature required on high-value returns so a unit cannot be signed for by someone who did not expect it' },
                  { k: 'On arrival', v: 'Check the RMA against the label and the document pack before signing off. A mismatch is a carrier claim and we start it for you' },
                ]}
              />

              {/* ----------------------------------------------- REFUSE - */}
              <h2 id="refuse" style={{ marginTop: '3.5rem' }}>
                13. What we will not accept back, and why
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A small number of situations cannot be handled as a warranty repair. Saying so up front is
                fairer than a refusal after a three-week transit.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Situation</Th>
                    <Th scope="col">What happens</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Swollen, punctured or thermally abused battery</Td>
                    <Td>Hazardous storage, not quarantine. Photographed, same-day notification, no repair attempted. The device is not returned.</Td>
                  </tr>
                  <tr>
                    <Td>Liquid ingress after delivery</Td>
                    <Td>Not a warranty fault. We will still assess it and quote a repair, but it is a paid repair and the unit will be re-graded down.</Td>
                  </tr>
                  <tr>
                    <Td>Third-party repair already performed</Td>
                    <Td>Assessment only. We cannot warrant internals we did not open, so the outcome is a quote rather than a claim, with the evidence for that position given to you.</Td>
                  </tr>
                  <tr>
                    <Td>Grade report removed or altered</Td>
                    <Td>Claim paused pending evidence of provenance. If the serial is not in our system, there is no warranty to honour and we will say so plainly.</Td>
                  </tr>
                  <tr>
                    <Td>IMEI mismatch on the returned unit</Td>
                    <Td>Claim declined and the substitution flagged. The IMEI we supplied remains warranted; the substitute does not enter our system.</Td>
                  </tr>
                  <tr>
                    <Td>Lost or stolen in your custody</Td>
                    <Td>A claim, not a return. Handled under the insurance route on the <Link href={`${base}/shipping`}>shipping page</Link>.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ----------------------------------------------- SECOND - */}
              <h2 id="second" style={{ marginTop: '3.5rem' }}>
                14. If it fails again
              </h2>
              <div className="prose">
                <p>
                  A repair that fails is a defect in our process, not in your stock. There is no second
                  round of the same repair and no argument about whether the claim is now &ldquo;outside
                  warranty&rdquo; &mdash; the unit came back to us and we set the clock again.
                </p>
              </div>

              <div className="steps">
                <Step title="Automatic escalation">
                  A second failure on the same unit within 90 days of a return bypasses the standard
                  decision path and goes to a senior technician and the commercial lead together.
                </Step>
                <Step title="Root-cause escalation, not symptom escalation">
                  We go further than the failed part. If a display fails twice, we examine the connector,
                  the flex routing and the frame pressure that may be causing the repeated failure.
                </Step>
                <Step title="Replacement or full credit, immediately">
                  If a second repair is not defensible, you choose a replacement at an equal or better
                  grade or a full credit. No further diagnosis cycle.
                </Step>
                <Step title="Feed back into the standard">
                  Repeated failures are a grading-standard signal. Where a fault pattern appears often
                  enough, the acceptance criteria, the parts specification or the test list change in a
                  dated revision of the standard &mdash; and you are told, because it affects future
                  stock.
                </Step>
              </div>

              {/* ----------------------------------------------- TIMELINE */}
              <h2 id="timeline" style={{ marginTop: '3.5rem' }}>15. Timelines</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Stage</Th>
                    <Th scope="col" num>
                      Target
                    </Th>
                    <Th scope="col">Measured from</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Claim acknowledged</Td>
                    <Td num mono>2 working days</Td>
                    <Td>Complete claim received</Td>
                  </tr>
                  <tr>
                    <Td>RMA and label issued</Td>
                    <Td num mono>2 working days</Td>
                    <Td>Claim acknowledged</Td>
                  </tr>
                  <tr>
                    <Td>Diagnosis and decision</Td>
                    <Td num mono>10 working days</Td>
                    <Td>Unit received and verified at intake</Td>
                  </tr>
                  <tr>
                    <Td>Repair completed</Td>
                    <Td num mono>5&ndash;10 working days</Td>
                    <Td>Decision approved and parts available</Td>
                  </tr>
                  <tr>
                    <Td>Re-wipe, re-test, re-grade, re-certify</Td>
                    <Td num mono>2 working days</Td>
                    <Td>Repair complete</Td>
                  </tr>
                  <tr>
                    <Td>Return dispatched</Td>
                    <Td num mono>1 working day</Td>
                    <Td>Documentation pack complete</Td>
                  </tr>
                  <tr>
                    <Td>Decision-to-door, typical</Td>
                    <Td num mono>15&ndash;25 working days</Td>
                    <Td>Approval of the repair decision</Td>
                  </tr>
                  <tr>
                    <Td>Credit note or refund</Td>
                    <Td num mono>15 working days</Td>
                    <Td>Claim approved</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="plain" title="Where the time actually goes">
                <p>
                  Not the repair. The repair is rarely the constraint. The two things that extend these
                  figures are parts availability for a specific colour or configuration, and your
                  approval of a re-grade or a parts conversion. Both are held at the decision stage with
                  a named contact chasing them, not left in a queue.
                </p>
              </Callout>

              {/* ----------------------------------------------- RETAIL - */}
              <h2 id="retail" style={{ marginTop: '3.5rem' }}>
                16. For your retail customer
              </h2>
              <div className="prose">
                <p>
                  If you are reselling to end users, the last part of this process is yours, and it is the
                  part most often handled badly. A device that has been repaired and returned to you
                  carries a fresh report and a fresh warranty start date, and in most of the markets we
                  serve it must be disclosed as a repaired or refurbished unit at the point of sale.
                </p>
                <p>
                  The practical sequence is short: take the unit out of saleable stock, log the new grade
                  report reference against your own inventory record, disclose the repair, and hand the
                  customer the {WARRANTY_MONTHS}-month warranty certificate that came back with it. Your
                  customer gets a warranty that starts when they take delivery, not when the original
                  consignment landed &mdash; which is a genuine advantage over buying stock with a
                  partially elapsed term.
                </p>
              </div>

              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                <Card title="Your customer gets" icon="check">
                  A {WARRANTY_MONTHS}-month warranty starting at their delivery date, a grade they can be
                  shown in writing, and a per-unit destruction certificate covering the repair as well as
                  the original refurbishment.
                </Card>
                <Card title="You get" icon="doc">
                  A traceable history from intake to return, no unit re-checked on your bench before it
                  goes back on sale, and a claim process you can put in your own customer terms without
                  inventing it.
                </Card>
                <Card title="Both of you avoid" icon="shield">
                  A data exposure on a device that was opened, an undocumented repair discovered at resale,
                  and a warranty period that quietly expired while the unit sat in your warehouse.
                </Card>
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Buy a small trial lot, break it on purpose, and watch this process run."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Warranty terms', href: `${base}/warranty` }}
                >
                  The only honest way to evaluate a warranty is to claim on it. Take a mixed-grade trial
                  order, raise a claim on a unit, and hold us to the sequence above &mdash; including the
                  second data purge. If we skip a step, tell us, and we will fix the process rather than
                  the argument. Related:{' '}
                  <Link href={`${base}/assurance`}>quality assurance</Link> and{' '}
                  <Link href={`${base}/compliance`}>market compliance</Link>.
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
