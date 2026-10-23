import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  FlowStep,
  PageHero,
  Pill,
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
  { href: '#chain', label: '1. The chain in one view' },
  { href: '#phase-a', label: '2. Phase A — Workshop' },
  { href: '#phase-b', label: '3. Phase B — Packing' },
  { href: '#quality', label: '4. Shipment quality' },
  { href: '#phase-c', label: '5. Phase C — Dubai export' },
  { href: '#phase-d', label: '6. Phase D — In transit' },
  { href: '#us', label: '7. Phase E — USA arrival' },
  { href: '#canada', label: '8. Phase E — Canada arrival' },
  { href: '#responsibility', label: '9. Who does what' },
  { href: '#failures', label: '10. When it goes wrong' },
  { href: '#evidence', label: '11. The evidence pack' },
];

const CHAIN = [
  ['1', 'Intake and quarantine', 'A', 'Device received, serial read, condition photographed, separated from saleable stock'],
  ['2', 'IMEI and identifier screening', 'A', 'Identifier screened against blocklists and the report reconciled to the hardware'],
  ['3', 'Diagnostic and grading', 'A', `Full test list, cosmetic inspection at ${GRADING_STANDARD.inspectionLux} lux, grade assigned`],
  ['4', 'Refurbishment or repair', 'A', 'Work performed to the repair standard, parts recorded to provenance level'],
  ['5', 'Final QC, re-wipe, certify', 'A', 'Full re-test, data destruction with read-back, grade report and certificate issued'],
  ['6', 'Pre-dispatch hold check', 'B', 'Second inspector verifies the device against its own paperwork before packing'],
  ['7', 'Device-level packing', 'B', 'Battery isolated, immobilised, anti-static, accessory bag, retail box'],
  ['8', 'Carton build and marking', 'B', 'Cartons filled to the drop-tested fill ratio, weighed, sealed, marked'],
  ['9', 'Pallet or container build', 'B', 'Layered, strapped, shrink-wrapped, corner protected, photographed'],
  ['10', 'Freight booking', 'C', 'Mode, lane and sailing selected against the delivery date you need'],
  ['11', 'Export document pack', 'C', 'Invoice, packing list, origin, manifest, certificates, insurance, DG paperwork'],
  ['12', 'UAE export clearance', 'C', 'Licence check, export declaration lodged, cargo released for loading'],
  ['13', 'Loading and departure', 'D', 'Container sealed and seal number recorded, or ULD and airway bill handed to the carrier'],
  ['14', 'Import customs clearance', 'E', 'Entry filed in the destination country, duty and tax settled, cargo released'],
  ['15', 'Port or airport to your door', 'E', 'Customs broker to warehouse, or delivered to your nominated 3PL'],
  ['16', 'On-arrival acceptance', 'E', 'Cartons checked, serials reconciled, sample graded, discrepancies raised'],
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Phone to your warehouse, step by step',
    description: `The complete 16-step chain that takes a used phone from arrival in Dubai through refurbishment, packing, export customs, freight and import clearance to your warehouse in the USA or Canada — with the shipment quality controls, the packing specification, who owns each step, and the evidence pack you receive at the end.`,
    alternates: { canonical: `/${country}/export-process` },
  };
}

export default async function ExportProcessPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Operations"
        title="Phone to your warehouse, step by step"
        lead="Sixteen steps, five phases, one document pack. This is the actual sequence a used phone follows between arriving at our door in Dubai and being available to sell from your dock in the United States or Canada. Nothing here is a summary of a process; it is the process, written so you can hold us to it and so your broker knows what to expect."
        meta={
          <>
            <Pill tone="ok">16 documented steps</Pill>
            <Pill tone="info">Dubai → USA / Canada</Pill>
            <Pill tone="ok">Evidence at every handover</Pill>
            <Pill tone="warn">Lanes, duties and times are indicative</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/export-process`, label: 'Export process' }]} />

              {/* ---------------------------------------------- CHAIN --- */}
              <h2 id="chain">1. The chain in one view</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Five phases. Phases A and B are ours and are where the product is built. Phases C and D
                are ours and the forwarder&rsquo;s, where the consignment is made legal and moved. Phase E
                is shared with your broker, and it is the phase where most import problems are actually
                created, which is why it is broken out separately.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col" num>#</Th>
                    <Th scope="col">Step</Th>
                    <Th scope="col">Phase</Th>
                    <Th scope="col">What happens</Th>
                  </tr>
                </thead>
                <tbody>
                  {CHAIN.map(([n, step, phase, what]) => (
                    <tr key={n}>
                      <Td num mono strong>{n}</Td>
                      <Td strong>{step}</Td>
                      <Td>
                        <Pill tone={phase === 'A' ? 'ok' : phase === 'B' ? 'info' : phase === 'D' ? 'neutral' : 'warn'}>
                          {phase}
                        </Pill>
                      </Td>
                      <Td>{what}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <Callout tone="info" title="Who this page is for">
                <p>
                  Three audiences, one process. Your <b>buyer</b> should read phases A and B, because that
                  is the product you are buying. Your <b>broker</b> should read phases C and E, because
                  that is everything they need to file an entry. Your <b>logistics team</b> should read
                  phase D, because that is where a delivery date is won or lost. We publish all of it
                  because a process you cannot see is a process you have to trust, and we would rather you
                  checked it.
                </p>
              </Callout>

              {/* -------------------------------------------- PHASE A --- */}
              <h2 id="phase-a" style={{ marginTop: '3.5rem' }}>
                2. Phase A — In the workshop, Dubai
              </h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Five steps, and none of them can be skipped or reordered. This is where the product is
                made. The controls behind them are set out in full on the{' '}
                <Link href={`${base}/assurance`}>assurance page</Link> and the{' '}
                <Link href={`${base}/repair-standard`}>repair standard</Link>.
              </p>

              <div className="flow">
                <FlowStep title="1. Intake and quarantine">
                  The device is weighed, counted and photographed on arrival, the serial is read from the
                  hardware, and the unit is moved into a segregated intake area. It does not enter saleable
                  stock at any point during this step, and it cannot be picked by mistake.
                </FlowStep>
                <FlowStep title="2. IMEI and identifier screening">
                  The identifier is screened against the blocklists and internal records that apply, and
                  reconciled to the report it arrived with. A device whose identifier cannot be resolved is
                  held at this step, not repaired, and not shipped.
                </FlowStep>
                <FlowStep title="3. Diagnostic and grading">
                  The full published test list is run, and the cosmetic inspection is performed at{' '}
                  {GRADING_STANDARD.inspectionLux} lux across {GRADING_STANDARD.inspectionPointsCosmetic}{' '}
                  points. A grade is assigned, and defects are recorded individually rather than summarised
                  as &ldquo;fair&rdquo;.
                </FlowStep>
                <FlowStep title="4. Refurbishment or repair">
                  Work that is needed is performed to the repair standard, at the technician tier the work
                  requires. Every part fitted is recorded to its provenance level, because a device that
                  needed an aftermarket part to pass is not eligible for the tier it would otherwise be.
                </FlowStep>
                <FlowStep title="5. Final QC, re-wipe and certification">
                  The full test list runs again. Data destruction is performed to{' '}
                  {GRADING_STANDARD.wipeStandard} using {GRADING_STANDARD.wipeMethod}, with read-back
                  verification. The grade is confirmed, the grade report and destruction certificate are
                  issued against the serial, and only then does the device become saleable.
                </FlowStep>
              </div>

              <Callout tone="ok" title="The output of Phase A is a device with a paper trail">
                <p>
                  By the end of step 5 a single device carries its own evidence: a grade report, a data
                  destruction certificate, a battery reading, a defect list, and — if it was repaired — a
                  repair record naming the parts and the technician. That is what the rest of the chain
                  moves, and it is why nothing in phases B to E is a matter of memory.
                </p>
              </Callout>

              {/* -------------------------------------------- PHASE B --- */}
              <h2 id="phase-b" style={{ marginTop: '3.5rem' }}>
                3. Phase B — Packing and shipment quality
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                This is the phase your question is really about, so it is the one we have specified in
                most detail. Product quality and shipment quality are different problems: a perfectly
                graded device still arrives broken if it was packed badly, and no warranty fixes that
                quickly enough to matter.
              </p>

              <div className="flow">
                <FlowStep title="6. Pre-dispatch hold check">
                  A second inspector, who did not perform the grading, verifies each device against its
                  own paperwork before it is packed: serial, grade, battery reading, destruction
                  certificate, and the physical condition against the report. A discrepancy here sends
                  the device back to step 5 rather than into a carton.
                </FlowStep>
                <FlowStep title="7. Device-level packing">
                  Battery isolated and terminals covered, device immobilised so nothing moves inside the
                  box, anti-static protection for exposed contacts, accessories in a separate bag so they
                  cannot scratch the device, and the retail box and insert included.
                </FlowStep>
                <FlowStep title="8. Carton build and marking">
                  Cartons are filled to a fixed ratio — not packed to the brim, and not half empty —
                  because both extremes are what produce transit damage. Cartons are weighed, sealed with
                  security tape, and marked with the consignment reference, the RMA where relevant, the
                  grade band, and the handling marks for the mode.
                </FlowStep>
                <FlowStep title="9. Pallet or container build">
                  Layered so weight is even, strapped, shrink-wrapped, corner-protected, and blocked or
                  braced for sea. The build is photographed before it is closed, which is the evidence
                  that the load was built to standard rather than to the driver&rsquo;s convenience.
                </FlowStep>
              </div>

              <Callout tone="warn" title="The fill-ratio rule, and why it is written down">
                <p>
                  An over-filled carton is the most common cause of crushed devices in a sea container, and
                  an under-filled carton is the most common cause of movement and scuffing. Both are
                  avoidable with a number, which is why the fill ratio is a specification and not a
                  judgement. It is the same reason the pre-dispatch hold check is done by a second person:
                  the person who packed a device at the end of a long shift is the person least likely to
                  notice that something is wrong with it.
                </p>
              </Callout>

              {/* ------------------------------------------- QUALITY ---- */}
              <h2 id="quality" style={{ marginTop: '3.5rem' }}>
                4. How shipment quality is given, controlled and evidenced
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Twelve controls, each with the evidence that proves it happened. This is the answer to
                &ldquo;how do I know the shipment will arrive properly&rdquo;: you do not take our word for
                it, you check the record, and the record is attached to the consignment.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Control</Th>
                    <Th scope="col">What it prevents</Th>
                    <Th scope="col">Evidence you receive</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Second-inspector hold check</Td>
                    <Td>A wrong or damaged unit entering the consignment</Td>
                    <Td>Signed release note per device batch, referencing the inspector</Td>
                  </tr>
                  <tr>
                    <Td strong>Serial-level packing list</Td>
                    <Td>Devices going missing in the chain, and disputes about which units you received</Td>
                    <Td>Packing list with one line per serial, reconciled to the manifest</Td>
                  </tr>
                  <tr>
                    <Td strong>Battery isolation and terminal protection</Td>
                    <Td>Abuse during a short circuit, which is the catastrophic version of transit damage</Td>
                    <Td>Declared on the packing list and on the dangerous-goods paperwork</Td>
                  </tr>
                  <tr>
                    <Td strong>Device immobilisation inside the box</Td>
                    <Td>Internal movement, screen and camera damage that looks like a manufacturing fault</Td>
                    <Td>Packing specification on file, applied to every unit</Td>
                  </tr>
                  <tr>
                    <Td strong>Fixed carton fill ratio</Td>
                    <Td>Crushed cartons and movement damage in transit</Td>
                    <Td>Carton weights recorded at build</Td>
                  </tr>
                  <tr>
                    <Td strong>Security tape and numbered seals</Td>
                    <Td>Undetected tampering or pilferage between the workshop and the port</Td>
                    <Td>Seal numbers on the shipping instruction and on the bill of lading</Td>
                  </tr>
                  <tr>
                    <Td strong>Pre-load build photography</Td>
                    <Td>Disputes about how the cargo was presented for loading</Td>
                    <Td>Photographs of the finished load, sent before departure</Td>
                  </tr>
                  <tr>
                    <Td strong>Dangerous-goods re-check at packing</Td>
                    <Td>Air consignments refused at the airport, which is expensive and time-critical</Td>
                    <Td>DG declaration and the packing standard recorded against the booking</Td>
                  </tr>
                  <tr>
                    <Td strong>Moisture and contamination protection</Td>
                    <Td>Container condensation, which is a genuine and common sea-lane risk in electronics</Td>
                    <Td>Desiccant and barrier liner specified for the mode and the season</Td>
                  </tr>
                  <tr>
                    <Td strong>Bracing and weight distribution</Td>
                    <Td>Load shift in transit, the single largest cause of sea-freight damage</Td>
                    <Td>Bracing declared on the loading plan; build photo before closing</Td>
                  </tr>
                  <tr>
                    <Td strong>Cargo insurance on declared value</Td>
                    <Td>An uninsured loss that has to be written off</Td>
                    <Td>Certificate of cover naming the carrier, consignee and value</Td>
                  </tr>
                  <tr>
                    <Td strong>Seal number recorded at load</Td>
                    <Td>Undetected container break-in, and the argument about whether it happened</Td>
                    <Td>Seal number on the bill of lading, verified against our copy at destination</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="bad" title="What we will not do to protect a consignment">
                <p>
                  We will not under-declare a value, omit a serial to make a count reconcile, remove a
                  damaged unit from the documentation and hope nobody notices, or describe a partner&rsquo;s
                  handling as a guarantee of ours. Every one of those converts an insured, documented loss
                  into an uninsured, undocumented one — and the second kind of loss is the one that ends a
                  trading relationship.
                </p>
              </Callout>

              {/* ------------------------------------------- PACKING ---- */}
              <h3 style={{ marginTop: '2.4rem' }}>Packing specification</h3>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Layer</Th>
                    <Th scope="col">Specification</Th>
                    <Th scope="col">Purpose</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Device</Td>
                    <Td>Battery isolated, terminals covered, immobilised in the retail box with the insert seated</Td>
                    <Td>No internal movement, no load on the screen, no exposed contacts</Td>
                  </tr>
                  <tr>
                    <Td strong>Retail box</Td>
                    <Td>Device and accessories bagged separately; no accessory loose against the device</Td>
                    <Td>Prevents accessory-induced cosmetic damage in its own packaging</Td>
                  </tr>
                  <tr>
                    <Td strong>Shipping carton</Td>
                    <Td>Devices upright where the design allows, filled to the specified ratio, no voids at the corners</Td>
                    <Td>Compresses the failure modes that cause transit claims</Td>
                  </tr>
                  <tr>
                    <Td strong>Carton closure</Td>
                    <Td>Security tape across the seam, consignment marked on two faces, weight and grade band shown</Td>
                    <Td>Tamper evidence and identification from any side in a container or a pallet stack</Td>
                  </tr>
                  <tr>
                    <Td strong>Pallet</Td>
                    <Td>Even layering, strapping, corner protection, shrink-wrap, blocking and bracing for sea</Td>
                    <Td>Load integrity; the difference between insured and uninsured damage</Td>
                  </tr>
                  <tr>
                    <Td strong>Moisture</Td>
                    <Td>Barrier liner and desiccant for sea and for monsoon-season uplifts</Td>
                    <Td>Condensation is a real risk on a long sea lane and it is invisible until it has happened</Td>
                  </tr>
                  <tr>
                    <Td strong>Documents</Td>
                    <Td>Sealed wallet outside the device packaging, referenced to the consignment</Td>
                    <Td>Paperwork cannot be separated from the goods in transit</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ------------------------------------------- PHASE C ---- */}
              <h2 id="phase-c" style={{ marginTop: '3.5rem' }}>
                5. Phase C — Dubai export
              </h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Three steps that turn a pallet of graded devices into a lawful export. Your broker does
                not need to be involved in any of them, because all of this happens in the UAE — but your
                broker does need their output, which is why step 11 produces a pack built to be filed.
              </p>

              <div className="flow">
                <FlowStep title="10. Freight booking and mode selection">
                  Mode, lane and sailing are selected against the date you need, not against the cheapest
                  rate. We tell you when air is the right answer and when consolidation is, and we name
                  the forwarder. Ocean bookings require the security filing data before lading, so the
                  booking is made with that lead time built in.
                </FlowStep>
                <FlowStep title="11. Export document pack assembled">
                  Commercial invoice, packing list, certificate of origin, IMEI/MEID manifest, grade
                  reports, destruction certificates, warranty summaries, dangerous-goods declaration and
                  insurance certificate — assembled from the same records the workshop created, so the
                  documents and the goods reconcile by construction. Bilingual inserts are added for Canada.
                </FlowStep>
                <FlowStep title="12. UAE export clearance">
                  Export documentation is lodged, the export declaration is filed, and the consignment is
                  released for loading. The licence position is confirmed before this step, not after. A
                  consignment that cannot be lawfully exported is stopped here, at our cost, rather than
                  at a port in another country at yours.
                </FlowStep>
              </div>

              <Callout tone="info" title="Why the pack is built from the workshop records">
                <p>
                  A document pack assembled separately from the goods is a document pack that will
                  eventually disagree with the goods. Ours is generated from the same records that
                  produced the grade reports, so the serial on the certificate, the serial on the packing
                  list and the serial on the device are the same string by construction. When a broker
                  queries a line, the answer is a lookup rather than an investigation.
                </p>
              </Callout>

              {/* ------------------------------------------- PHASE D ---- */}
              <h2 id="phase-d" style={{ marginTop: '3.5rem' }}>
                6. Phase D — In transit
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                One step, and it is the least controlled part of the chain, because for most of this
                journey the cargo belongs to a carrier. What we control is the handover in and the
                handover out.
              </p>

              <div className="flow">
                <FlowStep title="13. Loading, departure and tracking">
                  The container is sealed and the seal number recorded, or the ULD and airway bill are
                  handed to the carrier. Seal numbers go onto the bill of lading so the container can be
                  verified as unopened at destination. Tracking references are sent to you on departure
                  and at each milestone, and the moment anything deviates from the booking — a roll, a
                  delay, a re-route — you hear it from us rather than from a tracking page.
                </FlowStep>
              </div>

              <Callout tone="warn" title="A lithium battery changes the mode decision">
                <p>
                  Every device here contains a lithium-ion cell, which constrains the routing, the packing
                  and the paperwork rather than simply adding a label. It is why air and sea are both
                  viable and both need different declarations, and it is the reason we re-check packing
                  against the specific mode at step 8 instead of assuming a carton built for one is fine
                  for the other. It is also why damaged or swollen cells are never shipped at all.
                </p>
              </Callout>

              {/* ------------------------------------------- PHASE US --- */}
              <h2 id="us" style={{ marginTop: '3.5rem' }}>
                7. Phase E — Arrival in the United States
              </h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Three steps, and the first of them is not ours. It is the step most often underestimated.
              </p>

              <div className="flow">
                <FlowStep title="14. US import customs clearance">
                  Your broker files the entry. The declaration states the goods as used, the condition as
                  graded, and any repaired units as repaired. Duty is assessed on the entered value —
                  commercial shipments do not benefit from the low-value relief that applies to personal
                  ones. Ocean entries require the security filing data to have been lodged before loading,
                  which is why we need your broker involved before the container sails, not after it
                  lands.
                </FlowStep>
                <FlowStep title="15. Port to your warehouse">
                  Broker to your door, or delivered to a 3PL warehouse you nominate. We hold no US stock, so
                  there is no domestic leg on our side — the consignment moves once, from our facility to
                  yours. We will supply the documentation your warehouse needs to receive and onward-dispatch
                  the stock.
                </FlowStep>
                <FlowStep title="16. On-arrival acceptance">
                  Check the cartons before the seal is broken and photograph any damage. Count cartons
                  against the packing list and the packing list against the manifest. Reconcile serials to
                  grade reports. Pull a sample per model and per grade and grade it against the published
                  criteria. Raise anything non-conforming within the claim window, with photographs and
                  serials, because that is recoverable and an argument three weeks later is not.
                </FlowStep>
              </div>

              {/* ----------------------------------------- PHASE CA ----- */}
              <h2 id="canada" style={{ marginTop: '3.5rem' }}>
                8. Phase E — Arrival in Canada
              </h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                The same three steps, with two Canadian differences that are worth planning rather than
                discovering.
              </p>

              <div className="flow">
                <FlowStep title="14. Canadian import clearance">
                  Your broker files with CBSA. The commercial importer must be set up for accounting and
                  reporting before the first shipment — that is a registration task, not a document, and
                  it is the item most likely to delay a first programme. GST applies on the entered
                  value, with HST in participating provinces, and recovery depends on your own structure.
                </FlowStep>
                <FlowStep title="14b. Bilingual consumer information">
                  Consumer information generally has to be available in English and French. We prepare
                  bilingual grade inserts and warranty summaries as standard for Canadian consignments, and
                  a French-language proforma is available on request. This is a supply-side document
                  problem, which is why it sits here.
                </FlowStep>
                <FlowStep title="15. Port to your warehouse">
                  West-coast entry through Vancouver is usually faster to a Canadian warehouse than an
                  Atlantic entry, and Montreal is the right choice for Quebec and the east. Expect a rail
                  or trucking leg from the port, and book it before the vessel arrives.
                </FlowStep>
                <FlowStep title="16. On-arrival acceptance">
                  The same acceptance sequence as the US lane, plus the provincial producer-responsibility
                  position. Ontario in particular operates a registration and reporting regime for covered
                  electronics, and that registration sits with the party placing the goods on the market.
                  We supply the data it needs; we cannot hold it on your behalf.
                </FlowStep>
              </div>

              <Callout tone="plain" title="One thing to do on every first consignment">
                <p>
                  Photograph a random selection of units against their grade reports before anything goes
                  to your customers, and keep the photographs. It tells us within a week if our grading is
                  off in a direction we cannot see from inside our own workshop, and it gives your team an
                  internal reference to train against. Buyers who do this on consignment one tend to be
                  the buyers still ordering on consignment twenty.
                </p>
              </Callout>

              {/* --------------------------------------- RESPONSIBILITY - */}
              <h2 id="responsibility" style={{ marginTop: '3.5rem' }}>9. Who does what</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The single most useful thing on this page for avoiding a dispute later. Every step has an
                owner, and where the owner is not us, saying so plainly is part of the sale.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Phase</Th>
                    <Th scope="col">Owner</Th>
                    <Th scope="col">What that party is responsible for</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>A — Workshop</Td>
                    <Td>VeriGrade</Td>
                    <Td>
                      Product quality, grading, data destruction, certification, and the accuracy of the
                      record the whole chain depends on
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>B — Packing</Td>
                    <Td>VeriGrade</Td>
                    <Td>Shipment quality: packing specification, second-inspector hold check, load build, and the photographic evidence</Td>
                  </tr>
                  <tr>
                    <Td strong>C — Export</Td>
                    <Td>VeriGrade and our forwarder</Td>
                    <Td>Booking, export documentation, UAE export clearance, and releasing a lawful consignment</Td>
                  </tr>
                  <tr>
                    <Td strong>D — In transit</Td>
                    <Td>Carrier, insured by VeriGrade</Td>
                    <Td>
                      Physical carriage. The handover in and out is ours; the journey belongs to the carrier.
                      Cargo cover is arranged by us
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>E — Arrival</Td>
                    <Td>Your broker, your warehouse</Td>
                    <Td>
                      Import entry, duty and tax settlement, classification decisions, importer
                      registrations, EPR and producer-responsibility obligations, and the delivery
                      appointment
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="bad" title="The three things people expect us to own that we do not">
                <p>
                  <b>1. Import duty and tax.</b> Once the goods are entered in the USA or Canada, the
                  liability is the importer&rsquo;s, which on a first shipment without a US or Canadian
                  entity means an importer of record. <b>2. Producer-responsibility and EPR
                  registration.</b> These sit with the party placing electronics on the market, and they
                  are registrations rather than documents, so they cannot be handled by a supplier.
                  <b> 3. Local warranty turnaround.</b> Every warranty return from North America travels to
                  Dubai, which makes claims slow and is the single biggest structural limitation of our
                  proposition in those markets. We make the loop predictable and insured rather than fast,
                  because pretending otherwise would be the easiest lie to tell and the most expensive one
                  to have been caught telling.
                </p>
              </Callout>

              {/* ------------------------------------------- FAILURES --- */}
              <h2 id="failures" style={{ marginTop: '3.5rem' }}>
                10. When it goes wrong
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Freight fails sometimes. What determines whether a failure costs you a unit or costs you a
                season is whether the evidence exists and whether anyone raised it on the day. These are
                the failure modes, the window, and what we do.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Failure</Th>
                    <Th scope="col">Claim window</Th>
                    <Th scope="col">What we do</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Crate or carton damage found at delivery</Td>
                    <Td>Noted on the carrier&rsquo;s paperwork before signing</Td>
                    <Td>Photograph, record, notify us and the carrier immediately. Damage noted at delivery is recoverable; damage noted afterwards is an argument</Td>
                  </tr>
                  <tr>
                    <Td strong>Short delivery against the packing list</Td>
                    <Td>7 days from delivery</Td>
                    <Td>Reconcile the manifest, the bill of lading and the seal record, then replace or credit. A shortfall found at the dock is a clean claim</Td>
                  </tr>
                  <tr>
                    <Td strong>Seal broken or broken on arrival</Td>
                    <Td>Before breaking the seal</Td>
                    <Td>Do not open. Photograph the seal, notify the carrier and us, and we claim against the seal record rather than arguing about what might be missing</Td>
                  </tr>
                  <tr>
                    <Td strong>Dead on arrival</Td>
                    <Td>7 days from delivery</Td>
                    <Td>Diagnostic, and a repair, replacement or credit per the <Link href={`${base}/warranty`}>warranty terms</Link>. Tested on arrival because a unit that failed in transit is not a manufacturing fault</Td>
                  </tr>
                  <tr>
                    <Td strong>Grade does not match the report</Td>
                    <Td>Within the warranty term</Td>
                    <Td>Sample-based review against the published criteria, and a correction to the grading method if we are wrong. Grade disputes are handled on the{' '}
                      <Link href={`${base}/grading-standard`}>grading standard</Link></Td>
                  </tr>
                  <tr>
                    <Td strong>Customs hold or examination at destination</Td>
                    <Td>Not time-limited, but document-driven</Td>
                    <Td>We respond with documentation the same day. The most common cause is a
                    classification or condition description the broker did not expect, which is why we
                    agree it before the goods are offered</Td>
                  </tr>
                  <tr>
                    <Td strong>Transit delay, roll or missed sailing</Td>
                    <Td>Continuous</Td>
                    <Td>You are told as soon as we know, with the revised options and their cost
                    consequences, so the commercial decision stays yours</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ------------------------------------------- EVIDENCE --- */}
              <h2 id="evidence" style={{ marginTop: '3.5rem' }}>
                11. The evidence pack
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Everything below travels with the consignment or is sent to you on departure. It is the
                answer to &ldquo;how do I know what I received is what you graded&rdquo;, and it is
                assembled per consignment rather than per batch.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Per unit', 'Grade report with individual defects, battery reading against the tier floor, data destruction certificate, IMEI/MEID, and the warranty certificate with its start date'],
                  ['Per consignment', 'Commercial invoice declaring condition and grade, packing list with one line per serial, IMEI/MEID manifest, insurance certificate, and the seal record'],
                  ['Per shipment event', 'Pre-departure load photograph, container or ULD seal number, bill of lading or airway bill, and milestone tracking updates'],
                  ['Per repair', 'Repair record naming the fault, the parts fitted at their provenance level, the technician and the reviewer, and the post-repair re-test result'],
                  ['For Canada', 'Bilingual grade inserts and warranty summary, and a French-language proforma on request'],
                  ['On request', 'The full records behind a consignment for your own audit, and facility and process visits for prospective accounts'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="doc">
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="ok" title="The end of the chain">
                <p>
                  Step 16 is the only step in this process that we do not perform, and it is the only one
                  that proves the other fifteen worked. A device arriving in your warehouse that matches
                  its grade report, arrives intact, and carries paperwork that reconciles to the manifest
                  is the definition of a shipment that went well. Everything on this page exists to make
                  that outcome ordinary rather than lucky.
                </p>
              </Callout>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Give us a destination, a volume and a model mix, and we will run all sixteen steps against your actual lane."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Transit & shipping lanes', href: `${base}/transit` }}
                >
                  We will come back with the freight assumption, the forwarder we would use, the document
                  list your broker will ask for, and the packing specification applied to your grade mix.
                  Related: the <Link href={`${base}/shipping`}>shipping and Incoterms terms</Link>, the{' '}
                  <Link href={`${base}/returns`}>returns and repair turnaround</Link>, and{' '}
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
