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
import { PARTS_PROVENANCE } from '@/lib/grades';
import { GRADING_STANDARD } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#meaning', label: '1. What we mean by it' },
  { href: '#guarantee', label: '2. The repair guarantee' },
  { href: '#environment', label: '3. The bench environment' },
  { href: '#instrument', label: '4. Instruments and calibration' },
  { href: '#capability', label: '5. Technician capability' },
  { href: '#process', label: '6. The repair process' },
  { href: '#parts', label: '7. Part standards' },
  { href: '#board', label: '8. Board-level work' },
  { href: '#post-repair', label: '9. What happens after the repair' },
  { href: '#will-not', label: '10. What we will not repair' },
  { href: '#rework', label: '11. Rework and second failure' },
  { href: '#records', label: '12. Records and audit' },
  { href: '#limits', label: '13. The limits, stated' },
];

const WARRANTY_MONTHS = 12;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'The repair standard',
    description: `The written standard every VeriGrade repair is performed to: bench environment, ESD and dust discipline, instruments and calibration, technician capability, board-level work, part provenance and colour matching, the repair guarantee, rework on second failure, records, and an honest account of what we will not repair.`,
    alternates: { canonical: `/${country}/repair-standard` },
  };
}

export default async function RepairStandardPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Workmanship"
        title="The repair standard"
        lead="World class is an adjective, so this page does not use it as evidence. Instead: a written standard, with defined conditions, defined instruments, defined part rules, a defined guarantee on the workmanship, and a record of every repair against the serial. Read it, and hold us to it."
        meta={
          <>
            <Pill tone="ok">Written, dated, versioned</Pill>
            <Pill tone="ok">Guarantee on workmanship</Pill>
            <Pill tone="ok">Board-level in-house</Pill>
            <Pill tone="warn">No accreditation claimed</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/repair-standard`, label: 'The repair standard' }]} />

              {/* --------------------------------------------- MEANING -- */}
              <h2 id="meaning">1. What we mean by it</h2>
              <div className="prose">
                <p>
                  Every refurbisher claims a quality standard. Almost none of them publish it, because a
                  published standard is a thing a customer can hold you to. So the test we set for
                  ourselves is simple: could a competent auditor take this page, walk into the workshop,
                  and confirm or contradict what is written here? If a claim on this page cannot be
                  checked by someone walking the floor, it does not belong on this page.
                </p>
                <p>
                  Three things follow from that, and they are worth knowing before you read the detail.
                  First, this is our own standard. It is not accredited by any external body, and we do
                  not imply otherwise anywhere on this website. Second, it is versioned and dated like the{' '}
                  <Link href={`${base}/grading-standard`}>grading standard</Link>, so a claim is always
                  judged against the revision in force when the device was repaired. Third, the parts of
                  it that are most likely to be fudged by a supplier &mdash; what a part actually is, and
                  what a repair guarantee actually covers &mdash; are the parts written out in full with
                  no room to read them generously.
                </p>
              </div>

              <Callout tone="plain" title="Repair is where most refurbishment quality is won or lost">
                <p>
                  A device that passes every test point without needing a repair is straightforward. A
                  device that has had its display replaced, its battery replaced and its charging port
                  reworked is where wear, sloppy workmanship and undisclosed parts enter the supply chain
                  &mdash; and it is exactly the device a buyer&rsquo;s customer will be most disappointed
                  by. The controls below exist for that device, not for the easy one.
                </p>
              </Callout>

              {/* -------------------------------------------- GUARANTEE - */}
              <h2 id="guarantee" style={{ marginTop: '3.5rem' }}>2. The repair guarantee</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A repair guarantee is a different promise from a device warranty, and the two are easily
                confused. This is the repair guarantee on its own.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Term</Th>
                    <Th scope="col">Position</Th>
                  </tr>
                </thead>
                  <tbody>
                    <tr>
                      <Td strong>Scope</Td>
                      <Td>
                        The workmanship performed by us on that device: the repair, the parts fitted, the
                        reassembly, and the fact that the device passed the full test list afterwards.
                      </Td>
                    </tr>
                    <tr>
                      <Td strong>Duration</Td>
                      <Td>
                        The same {WARRANTY_MONTHS} months as the device warranty, running from delivery of
                        the repaired unit. The repair does not get a shorter term than the device it is in.
                      </Td>
                    </tr>
                    <tr>
                      <Td strong>Runs alongside the device warranty</Td>
                      <Td>
                        It is not a substitute for it. The device warranty covers the device; the repair
                        guarantee covers our work on it. A part we fitted failing is covered by both, and
                        a pre-existing fault reappearing is covered by the first.
                      </Td>
                    </tr>
                    <tr>
                      <Td strong>Remedy for a failed repair</Td>
                      <Td>
                        The repair is redone. If it cannot be made to hold, you choose a replacement at an
                        equal or better grade or a full credit &mdash; your choice within the first 30 days,
                        ours after that, and never a third attempt at the same repair.
                      </Td>
                    </tr>
                    <tr>
                      <Td strong>No separate excess</Td>
                      <Td>
                        There is no excess, no parts fee and no labour fee on a warranty repair. Parts for
                        an upheld claim are supplied at no cost.
                      </Td>
                    </tr>
                    <tr>
                      <Td strong>Returns to Dubai</Td>
                      <Td>
                        We pay the return leg on an upheld claim, insured, on every lane including the
                        long-haul ones. The turn-around cost is ours, which is the only way a
                        {WARRANTY_MONTHS}-month warranty means anything outside the UAE.
                      </Td>
                    </tr>
                    <tr>
                      <Td strong>Evidence required</Td>
                      <Td>
                        The serial and the original repair record. If the device&rsquo;s history has been
                        separated from it &mdash; a serial we cannot resolve &mdash; the guarantee is
                        suspended, not waived, and is reinstated the moment the record is produced.
                      </Td>
                    </tr>
                    <tr>
                      <Td strong>Interaction with a re-grade</Td>
                      <Td>
                        A repair that leaves a cosmetic or functional trace is re-graded, the price
                        adjusted, and the warranty continues on the new grade. The guarantee is not
                        weakened by a re-grade; the new grade is simply the new specification.
                      </Td>
                    </tr>
                  </tbody>
                </TableWrap>

              <Callout tone="ok" title="The guarantee is on the record, not on the promise">
                <p>
                  Every repair we perform creates a record against the serial: what failed, what was
                  done, which parts were fitted, which technician did it, what was tested afterwards and
                  what the result was. That record is what the guarantee is enforced against, which is
                  also why it survives the loss of a piece of paper &mdash; you are not relying on the
                  buyer&rsquo;s filing system to remember what happened to a unit twenty months ago.
                </p>
              </Callout>

              {/* ------------------------------------------- ENVIRONMENT */}
              <h2 id="environment" style={{ marginTop: '3.5rem' }}>
                3. The bench environment
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Environmental control is not a premium feature. It is the difference between a repair that
                holds and one that fails three months later in a customer&rsquo;s pocket, because
                microscopic contamination and uncontrolled humidity produce the failures that present as
                &ldquo;intermittent&rdquo; &mdash; the hardest fault to diagnose and the easiest to
                be wrongly blamed on.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['ESD control', 'Grounding at the bench, wrist straps verified on a schedule, and grounded handling of boards and exposed connectors. A static event is silent and it is the most common cause of a part that tests fine and fails later.'],
                  ['Dust and particulate control', 'Filtered air at the bench and a defined cleaning procedure before reassembly. A display replaced in a dusty bay is a display with a shortened life, and the fault will be attributed to the part rather than to the bench.'],
                  ['Temperature and humidity', 'The workshop is conditioned, and boards are allowed to reach ambient before power-up. Solder joints and adhesives are temperature-sensitive, and a bench that swings in temperature produces workmanship that varies by shift.'],
                  ['Segregated areas', 'Incoming, in-repair, awaiting-parts, quarantined, re-wiped and ready-to-ship are physically separate. A device is never worked on in a shared queue with saleable stock, and a quarantined device is never returned to a saleable shelf.'],
                  ['Battery handling', 'Cells removed, isolated and stored separately during screen and enclosure work, and never stacked or compressed. Damaged or swollen cells go to hazardous storage, not to a repair queue.'],
                  ['Traceable work areas', 'Each repair bay is a known place. If a device needs to come back for a second look, the technician who worked on it is identifiable, and the history is recoverable.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="shield">
                    {v}
                </Card>
                ))}
              </div>

              {/* ------------------------------------------ INSTRUMENT - */}
              <h2 id="instrument" style={{ marginTop: '3.5rem' }}>
                4. Instruments and calibration
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A reading from an uncalibrated instrument is a guess with a number attached. These are the
                instruments the standard depends on, and what each is used for.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Instrument</Th>
                    <Th scope="col">Used for</Th>
                    <Th scope="col">Calibration discipline</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Battery analysis</Td>
                    <Td>Cycle count, maximum capacity against design capacity, and charge curve</Td>
                    <Td>
                      On a fixed schedule, with the method specified in the standard. Battery health is
                      the most commonly disputed number in this trade, so the instrument and the method
                      are named rather than assumed
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Diagnostic software</Td>
                    <Td>Per-model fault codes, board-level self-tests, no-POST and POST sequences</Td>
                    <Td>Current versions per model family, updated on release</Td>
                  </tr>
                  <tr>
                    <Td strong>Thermal imaging</Td>
                    <Td>Heat-soak testing, thermal-paste condition, short detection under load</Td>
                    <Td>Function-checked against a reference before use</Td>
                  </tr>
                  <tr>
                    <Td strong>Microscope / borescope</Td>
                    <Td>Board inspection, connector and port condition, corrosion assessment, display assembly detail</Td>
                    <Td>Optically checked; the tool most responsible for finding the actual fault instead of replacing the obvious part</Td>
                  </tr>
                  <tr>
                    <Td strong>Multimeter</Td>
                    <Td>Continuity, short, rail voltage, charging current</Td>
                    <Td>Calibrated on a schedule</Td>
                  </tr>
                  <tr>
                    <Td strong>Re-flow / re-ball station</Td>
                    <Td>BGA and IC re-work, connector re-balling</Td>
                    <Td>
                      Profile verification for each package type. An unprofiled re-flow is how a board gets
                      damaged and nobody finds out for a month
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Display test rig</Td>
                    <Td>Full-surface touch mapping, true-colour rendering, brightness uniformity, dead-pixel inspection</Td>
                    <Td>Checked before each display fitting session</Td>
                  </tr>
                  <tr>
                    <Td strong>Lux meter</Td>
                    <Td>
                      The {GRADING_STANDARD.inspectionLux} lux condition for cosmetic inspection
                    </Td>
                    <Td>
                      Because the grading standard is defined at a light level, the light level is
                      measured rather than assumed
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>IMEI / serial reader</Td>
                    <Td>Serial capture at intake, at grading, at despatch and on return</Td>
                    <Td>
                      The control that makes substitution visible. Read from the hardware, never copied
                      from paperwork
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="info" title="Why the light meter matters more than it sounds">
                <p>
                  A grading standard that specifies a condition is only meaningful if the condition is
                  reproducible. &ldquo;Under normal light&rdquo; is not a condition. {GRADING_STANDARD.inspectionLux}{' '}
                  lux at a defined angle and distance is a condition, and it is why two suppliers can
                  disagree about a scratch and both be right.
                </p>
              </Callout>

              {/* ------------------------------------------- CAPABILITY - */}
              <h2 id="capability" style={{ marginTop: '3.5rem' }}>5. Technician capability</h2>
              <div className="prose">
                <p>
                  No refurbisher staffs a bench with one skill level. The work is tiered by risk, and the
                  tier decides who touches the device and what verification follows.
                </p>
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Work tier</Th>
                    <Th scope="col">Examples</Th>
                    <Th scope="col">Who performs it</Th>
                    <Th scope="col">Verification</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Tier 1 — Component</Td>
                    <Td>Screen, battery, charging port, flex cables, speakers, cameras, buttons</Td>
                    <Td>Trained bench technician</Td>
                    <Td>Full functional test plus display rig and battery measurement</Td>
                  </tr>
                  <tr>
                    <Td strong>Tier 2 — Assembly</Td>
                    <Td>Enclosure, frame, housing, water-damage treatment and board cleaning</Td>
                    <Td>Senior technician</Td>
                    <Td>
                      Full functional test, thermal check, and a mandatory re-grade because assembly work
                      leaves a cosmetic trace
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Tier 3 — Board</Td>
                    <Td>Micro-soldering, BGA re-work, rail and short repair, charging IC, audio and power-management circuits</Td>
                    <Td>Board-level specialist, in-house</Td>
                    <Td>
                      Board-level functional test, load and thermal soak, and a 48-hour post-repair
                      re-test before the unit is graded
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Tier 4 — Structural</Td>
                    <Td>Frame deformation, liquid-damage reconstruction, housing replacement on premium models</Td>
                    <Td>Specialist, with a second technician&rsquo;s sign-off</Td>
                    <Td>
                      Two-person review of the finished device, because a structurally repaired device
                      that looks right but flexes will fail later
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <KV
                items={[
                  { k: 'Training', v: 'Induction on the standard, then supervised bench work, then a sign-off against a documented competency list before independent work' },
                  { k: 'Escalation', v: 'A technician stops and escalates rather than attempting work outside their tier. An escalation is recorded, not treated as a failure' },
                  { k: 'Second opinion', v: 'Tier 3 and Tier 4 work carries a second signature. Tier 1 and Tier 2 work is peer-checked where the fault is ambiguous' },
                  { k: 'Records', v: 'Technician identity and date are attached to every repair, so a repeat failure on the same unit reaches the same person or their colleagues' },
                ]}
              />

              {/* --------------------------------------------- PROCESS - */}
              <h2 id="process" style={{ marginTop: '3.5rem' }}>6. The repair process</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                No repair begins until the fault is understood and the outcome is known. The order is the
                control.
              </p>

              <div className="flow">
                <FlowStep title="1. Quarantine and intake">
                  The device is separated from saleable stock and its arrival state is recorded, including
                  photographs and the serial read from the hardware.
                </FlowStep>
                <FlowStep title="2. Full diagnostic">
                  Not the reported symptom. The diagnostic establishes a root cause, and where the reported
                  symptom and the root cause differ, the root cause governs.
                </FlowStep>
                <FlowStep title="3. Repairability assessment">
                  Can it be made to hold, economically, with a part we will stand behind? If not, it moves
                  to a replacement, a re-grade or parts &mdash; and you are told before any work starts.
                </FlowStep>
                <FlowStep title="4. Part sourcing and matching">
                  The part is drawn from the tested donor pool, its provenance recorded, and colour and
                  specification matched to the original before fitting.
                </FlowStep>
                <FlowStep title="5. The repair">
                  Performed at the tier the work requires, with the instruments in section 4, in the
                  conditions in section 3.
                </FlowStep>
                <FlowStep title="6. Data destruction again">
                  The full wipe and read-back verification repeated, because the device has been opened.
                </FlowStep>
                <FlowStep title="7. Full functional test">
                  Every test point in the standard, not only the one that failed, plus battery measurement
                  against the tier floor.
                </FlowStep>
                <FlowStep title="8. Re-grade">
                  Cosmetic inspection under the same published conditions. A grade can go down; it cannot
                  be promoted above what was sold.
                </FlowStep>
                <FlowStep title="9. Record and re-certify">
                  Repair record, new grade report, new destruction certificate, new warranty start date.
                </FlowStep>
              </div>

              <Callout tone="warn" title="The step that is always skipped, and always causes the next claim">
                <p>
                  Step 6. A device that has been opened is a device whose previous data destruction can no
                  longer be assumed to have held, and the assumption is exactly where a privacy exposure
                  would appear. We repeat the full wipe with read-back verification and issue a fresh
                  certificate every time, with no exceptions for &ldquo;it was only a screen&rdquo;.
                </p>
              </Callout>

              {/* ---------------------------------------------- PARTS --- */}
              <h2 id="parts" style={{ marginTop: '3.5rem' }}>7. Part standards</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The part is the repair. An excellent technician with a bad part produces a bad device, and
                the buyer&rsquo;s customer cannot tell the difference.
              </p>

              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                {PARTS_PROVENANCE.levels.map((l) => (
                  <Card key={l.level} title={l.level} icon="parts">
                    <p style={{ marginBottom: '.7rem' }}>{l.meaning}</p>
                    <p className="small muted">{l.disclosure}</p>
                  </Card>
                ))}
              </div>

              <Callout tone="plain" title="The rule that aftermarket parts exist to satisfy">
                <p>{PARTS_PROVENANCE.pairing}</p>
              </Callout>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Part category</Th>
                    <Th scope="col">Acceptance rule</Th>
                    <Th scope="col">Matching</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Display assemblies</Td>
                    <Td>OEM or OEM-grade on A+ and A. Colour, brightness and touch mapped before fitting</Td>
                    <Td>
                      Colour-matched to the original housing where a donor is available. Where it is not,
                      the mismatch is recorded and the unit is graded accordingly
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Batteries</Td>
                    <Td>
                      Cells meeting the tier capacity floor, with cycle count recorded per unit. No
                      battery is fitted that would put the device below its own grade floor
                    </Td>
                    <Td>Capacity and cycle count are part of the grade, not an afterthought</Td>
                  </tr>
                  <tr>
                    <Td strong>Charging ports and flexes</Td>
                    <Td>OEM or OEM-grade</Td>
                    <Td>Must clear the charging-current test point at rated specification, not merely detect a charger</Td>
                  </tr>
                  <tr>
                    <Td strong>Cameras</Td>
                    <Td>
                      OEM where available; OEM-grade with autofocus and stabilisation verified where not
                    </Td>
                    <Td>Verified individually. A camera that focuses and produces a blurred image has failed</Td>
                  </tr>
                  <tr>
                    <Td strong>Enclosures and frames</Td>
                    <Td>Original or OEM-grade; aftermarket only on Grade C and below</Td>
                    <Td>Finish and colour matched; structural integrity checked where a frame was replaced</Td>
                  </tr>
                  <tr>
                    <Td strong>Board components</Td>
                    <Td>OEM specification for rails, charging IC, power management and audio</Td>
                    <Td>
                      Not part-matched on appearance. A board repair is verified electrically and
                      thermally, not visually
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="bad" title="Where we draw a hard line">
                <p>
                  Aftermarket parts are never used to lift a device into a higher grade. A unit that needed
                  an aftermarket display to pass is a Grade C, with the reason printed on the report. That
                  rule costs us yield and it is the single clearest signal of whether a supplier&rsquo;s
                  grading can be trusted, because a cheap part in a high tier is the easiest margin fraud in
                  this trade to commit.
                </p>
              </Callout>

              {/* ---------------------------------------------- BOARD --- */}
              <h2 id="board" style={{ marginTop: '3.5rem' }}>8. Board-level work</h2>
              <div className="prose">
                <p>
                  Board-level repair is in-house. It is the most expensive capability to maintain and the
                  least economical to outsource, and the reason is control rather than cost: micro-soldering
                  is irreversible, and a board that has been worked on by someone we cannot audit is a
                  board we cannot warrant.
                </p>
              </div>

              <div className="steps">
                <Step title="Symptom to component, in that order">
                  Rail measurements, short detection, signal tracing, and only then a component decision.
                  Replacing the reported component is not a diagnosis.
                </Step>
                <Step title="Under-bass first">
                  Board shielding and conformal coatings removed only after the failure is localised, and
                  restored afterwards. A board left open is a board that collects contamination.
                </Step>
                <Step title="Thermal profile verification">
                  Re-flow profiles verified per package type before any BGA or IC work. Heat damage from a
                  wrong profile is invisible immediately and irreversible over a month.
                </Step>
                <Step title="Corrosion and liquid-damage treatment">
                  Board cleaning and corrosion neutralisation before any component work, because a corroded
                  joint that looks dry will fail again weeks later.
                </Step>
                <Step title="Load and soak before grading">
                  Thermal soak under sustained load, and a 48-hour post-repair re-test. Intermittent faults
                  pass a single functional test; they do not survive being run.
                </Step>
                <Step title="Record the repair, not just the outcome">
                  The fault, the board-level action, the components fitted, and the reason. A future
                  technician inheriting a second failure needs to know what was already done here.
                </Step>
              </div>

              <Callout tone="warn" title="Where the economics stop">
                <p>
                  A board repair is only attempted when the expected result is a device that passes the
                  standard reliably. If a board needs multiple uncertain interventions to have a chance of
                  working, it is converted to parts with the fault category recorded, and the units are
                  documented for what they actually are. We would rather write off a board than sell a
                  device that fails in someone else&rsquo;s customer&rsquo;s hand.
                </p>
              </Callout>

              {/* ------------------------------------------ POST-REPAIR */}
              <h2 id="post-repair" style={{ marginTop: '3.5rem' }}>
                9. What happens after the repair
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The post-repair sequence is where a good repair becomes a resellable product. It is set
                out in full, stage by stage, on the{' '}
                <Link href={`${base}/returns`}>returns and repair turnaround page</Link>, and the controls
                behind it are on the <Link href={`${base}/assurance`}>assurance page</Link>. The four that
                matter most are restated here:
              </p>

              <div className="grid grid-4" style={{ gap: '1.2rem' }}>
                {[
                  ['Re-wiped', `${GRADING_STANDARD.wipeMethod} to ${GRADING_STANDARD.wipeStandard}, with read-back verification across OS, firmware, MDM and secure-element layers. A fresh certificate is issued; the original is marked superseded rather than deleted.`],
                  ['Re-tested in full', `All ${GRADING_STANDARD.testPointsPhone} phone or ${GRADING_STANDARD.testPointsLaptop} laptop test points, plus battery measurement against the tier floor and against the reading taken before the repair.`],
                  ['Re-graded', `Cosmetic inspection at ${GRADING_STANDARD.inspectionLux} lux across ${GRADING_STANDARD.inspectionPointsCosmetic} points. The grade can be revised down. It is never promoted above the tier originally sold, and the reason for any change is written on the report.`],
                  ['Re-certified', 'New grade report, new destruction certificate, new repair record and a fresh warranty start date, all travelling in the same consignment as the device so the paperwork cannot be separated in transit.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="check">
                    {v}
                </Card>
                ))}
              </div>

              <Callout tone="ok" title="The practical result for a buyer">
                <p>
                  A repaired unit arrives as a documented, freshly certified, freshly warranted device
                  that can go straight back into saleable stock without your technician opening it. The
                  repair history is on the paperwork, which is also the disclosure your retail customer is
                  entitled to &mdash; so the repair improves the product rather than creating a problem for
                  you downstream.
                </p>
              </Callout>

              {/* --------------------------------------------- WILL NOT - */}
              <h2 id="will-not" style={{ marginTop: '3.5rem' }}>10. What we will not repair</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A standard that only lists what we do is marketing. These are the repairs we decline, with
                the reasoning, so that you are not waiting two weeks to find out.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Situation</Th>
                    <Th scope="col">Decision</Th>
                    <Th scope="col">Reasoning</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Swollen, punctured or thermally abused cell</Td>
                    <Td>Not repaired. Hazardous storage, documented, destroyed</Td>
                    <Td>A compromised cell is a safety event, not a repair. No technique makes it safe to return, and no price makes it acceptable to ship.</Td>
                  </tr>
                  <tr>
                    <Td strong>Advanced liquid ingress on a premium model</Td>
                    <Td>
                      Assessed, then quoted rather than claimed. Almost always re-graded
                    </Td>
                    <Td>
                      Corrosion under the shield can be present and dormant. We clean and test, but a
                      water-damage device is a Grade C at best and we will not represent otherwise.
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Structural frame deformation on a premium model</Td>
                    <Td>Declined, converted to parts</Td>
                    <Td>A straightened frame returns to shape under pressure, and the failure appears as a display or touch fault later. We will not build that into a device we are grading.</Td>
                  </tr>
                  <tr>
                    <Td strong>Board requiring several uncertain interventions</Td>
                    <Td>Declined, converted to parts with the fault category recorded</Td>
                    <Td>Beyond the point where the expected outcome is a device that passes reliably. See section 8.</Td>
                  </tr>
                  <tr>
                    <Td strong>Missing or damaged flex with no donor available</Td>
                    <Td>Declined, converted to parts or re-graded down</Td>
                    <Td>Fitting a part we cannot source to specification would put an undisclosed component into a graded device.</Td>
                  </tr>
                  <tr>
                    <Td strong>IMEI mismatch at intake</Td>
                    <Td>Claim paused, device not worked on</Td>
                    <Td>Until the IMEI reconciles with the report, we cannot establish that we are holding the device the warranty was written for. See the <Link href={`${base}/returns`}>returns page</Link>.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ---------------------------------------------- REWORK -- */}
              <h2 id="rework" style={{ marginTop: '3.5rem' }}>11. Rework and second failure</h2>
              <div className="prose">
                <p>
                  A repair that fails is a defect in our process, not in your stock. There is no second
                  round of the same repair, and there is no argument that the claim has now fallen outside
                  warranty &mdash; the unit came back to us, we re-wiped it, re-tested it and re-certified
                  it, and the clock is running again.
                </p>
              </div>

              <div className="steps">
                <Step title="Automatic escalation">
                  A second failure on the same unit within 90 days of a return bypasses the standard
                  decision path and reaches a senior technician and the commercial lead together.
                </Step>
                <Step title="Escalate the cause, not the part">
                  If a display fails twice, we examine the connector, the flex routing and the frame
                  pressure. If a board fails twice, we examine what was masked on the first repair. A
                  repeated part replacement without that is how a device ends up back with you three times.
                </Step>
                <Step title="Replacement or full credit">
                  If a second repair is not defensible, you choose an equal or better grade, or a full
                  credit. No further diagnosis cycle and no argument about which is more convenient for us.
                </Step>
                <Step title="Pattern feedback">
                  Repeated failures are a signal about parts, suppliers or process rather than about one
                  unit. Where the pattern is clear, the parts specification, the test list or a dated
                  revision of the standard changes &mdash; and existing customers are told, because it
                  affects stock they already hold.
                </Step>
              </div>

              {/* ---------------------------------------------- RECORDS - */}
              <h2 id="records" style={{ marginTop: '3.5rem' }}>12. Records and audit</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Every claim made on this page is backed by a record that exists before the device leaves
                the bench. That is what makes it auditable rather than merely stated.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Record</Th>
                    <Th scope="col">Created at</Th>
                    <Th scope="col">What it lets you check</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Intake record and photographs</Td>
                    <Td>Return arrival</Td>
                    <Td>That the device arrived in the condition claimed, and that it is the device the report describes</Td>
                  </tr>
                  <tr>
                    <Td>Diagnostic and root cause</Td>
                    <Td>Diagnosis</Td>
                    <Td>That the fault was diagnosed rather than guessed at, and whether it was actually a warranty fault</Td>
                  </tr>
                  <tr>
                    <Td>Parts record</Td>
                    <Td>Fitting</Td>
                    <Td>Exactly which part was fitted and at what provenance level, per serial</Td>
                  </tr>
                  <tr>
                    <Td>Technician and sign-off</Td>
                    <Td>Repair and review</Td>
                    <Td>Who did the work, at which tier, and who checked it</Td>
                  </tr>
                  <tr>
                    <Td>Re-wipe certificate</Td>
                    <Td>Post-repair</Td>
                    <Td>That data destruction was repeated after the device was opened, and verified</Td>
                  </tr>
                  <tr>
                    <Td>Full re-test result</Td>
                    <Td>Post-repair</Td>
                    <Td>That the whole test list was run, not just the failed function</Td>
                  </tr>
                  <tr>
                    <Td>Re-grade report</Td>
                    <Td>Grading</Td>
                    <Td>The resulting tier, the reason for any change, and that it was not promoted</Td>
                  </tr>
                  <tr>
                    <Td>Warranty certificate</Td>
                    <Td>Despatch</Td>
                    <Td>That the {WARRANTY_MONTHS}-month term starts on delivery of the repaired unit, on uniform wording</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="info" title="You are welcome to ask for all of it">
                <p>
                  For an account, the repair records behind any consignment are available on request, and
                  facility and process visits are welcome for prospective accounts. If a buyer&rsquo;s own
                  audit finds a discrepancy between this page and the workshop, that is the most useful
                  thing that can happen to us, and we would rather it reached us than a customer.
                </p>
              </Callout>

              {/* ---------------------------------------------- LIMITS -- */}
              <h2 id="limits" style={{ marginTop: '3.5rem' }}>13. The limits, stated</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The genuine limits of everything on this page. A standard that only states strengths is a
                brochure.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Not accredited', 'This is our own written standard. No external body has audited this facility, and no accreditation of our repair capability exists. We state that here rather than leaving a reader to assume otherwise.'],
                  ['A process commitment, not a measured outcome', 'The controls on this page are what we commit to doing. Whether a given repair succeeded is established per device by the re-test and recorded on the report, not by this document. A standard describes method; it does not guarantee outcome.'],
                  ['Repaired devices remain repaired devices', 'A repaired unit is re-graded, and it is a repaired unit. In most markets that carries a disclosure obligation on your retail listing, and a customer who expects a new device will be disappointed no matter how good the repair was.'],
                  ['Cosmetic limits of matching', 'Where a donor part cannot be colour- and finish-matched to the original, we record the discrepancy rather than conceal it, and the unit is graded accordingly. Perfect matching is not always available.'],
                  ['No repair survives everything', 'A device that has had board-level work can still fail. The guarantee covers our work and the full re-test period, and the honest position is that a repaired board is a more complex device than an untouched one, even when the work is done properly.'],
                  ['The economic boundary', 'We decline repairs where the expected result is not a device that passes reliably. That boundary is a commercial judgement as well as a technical one, and a device converted to parts with a recorded fault category is a better outcome for you than a device that keeps coming back.'],
                ].map(([k, v]) => (
                  <Callout key={k} tone="plain" title={k}>
                    <p>{v}</p>
                  </Callout>
                ))}
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Break one on purpose and see whether the standard survives contact with a real repair."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Returns & repair turnaround', href: `${base}/returns` }}
                >
                  Order a small trial lot, raise a claim, and ask for the repair record behind it. Then
                  read the{' '}
                  <Link href={`${base}/warranty`}>warranty terms</Link> and check that the sequence you
                  receive matches the sequence we published. Related:{' '}
                  <Link href={`${base}/grading-standard`}>the grading standard</Link> and{' '}
                  <Link href={`${base}/assurance`}>quality assurance</Link>.
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
