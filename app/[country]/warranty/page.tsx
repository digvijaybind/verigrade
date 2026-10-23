import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
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
  { href: '#summary', label: '1. The terms in one table' },
  { href: '#cover', label: '2. What is covered' },
  { href: '#not-covered', label: '3. What is not covered' },
  { href: '#doa', label: '4. DOA and transit windows' },
  { href: '#claims', label: '5. Making a claim' },
  { href: '#grade-claims', label: '6. Grade conformity claims' },
  { href: '#accidental', label: '7. Accidental damage cover' },
  { href: '#exclusions', label: '8. Grade D and AB' },
  { href: '#returns', label: '9. Returns and restocking' },
  { href: '#warranty-admin', label: '10. Administration' },
];

const WARRANTY_MONTHS = 12;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Warranty & returns',
    description: `VeriGrade warranty terms: ${WARRANTY_MONTHS} months on all grades A+ to C, conformity to the published grade warranted, data-destruction certificate honoured, IMEI replacement, and written terms on DOA windows and claims.`,
    alternates: { canonical: `/${country}/warranty` },
  };
}

export default async function WarrantyPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Warranty &amp; returns"
        lead={`${WARRANTY_MONTHS} months on every graded unit, with conformity to the published grade treated as part of the specification. Grade D carries no warranty, and that is the definition of the tier rather than an exception. These terms are stated once, here, and they do not change between the quotation and the invoice.`}
        meta={
          <>
            <Pill tone="ok">{WARRANTY_MONTHS} months, grades A+ to C</Pill>
            <Pill tone="ok">Grade conformity warranted</Pill>
            <Pill tone="info">IMEI replacement</Pill>
            <Pill tone="bad">Grade D excluded</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/warranty`, label: 'Warranty & returns' }]} />

              {/* ------------------------------------------- SUMMARY ----- */}
              <h2 id="summary">1. The terms in one table</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                This table is the warranty. If a figure appears anywhere else in a document from us and
                disagrees with this table, this table governs and we will correct the other document.
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
                    <Td strong>Warranty period, grades A+ to C</Td>
                    <Td>{WARRANTY_MONTHS} months from delivery.</Td>
                  </tr>
                  <tr>
                    <Td strong>Warranty period, Grade AB</Td>
                    <Td>{WARRANTY_MONTHS} months, functional only.</Td>
                  </tr>
                  <tr>
                    <Td strong>Warranty period, Grade D</Td>
                    <Td>
                      None. Grade D is sold as parts and is explicitly excluded. The grade report states
                      this on the unit.
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>DOA window</Td>
                    <Td>7 calendar days from delivery for dead-on-arrival claims.</Td>
                  </tr>
                  <tr>
                    <Td strong>Transit damage window</Td>
                    <Td>7 calendar days from delivery. Carrier claims must be raised within this window.</Td>
                  </tr>
                  <tr>
                    <Td strong>Covered</Td>
                    <Td>
                      Functional failure, battery falling below the published tier floor, non-conformity
                      to the assigned grade, activation locks we did not disclose, data found on a device
                      we certified, IMEI blacklisting attributable to us.
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Not covered</Td>
                    <Td>
                      Physical damage after delivery, liquid ingress after delivery, unauthorised repair or
                      modification, loss or theft, devices whose grade report has been altered, Grade D
                      functionality.
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Accidental damage</Td>
                    <Td>
                      Optional, priced separately, and the terms are set out in full in section 7. No
                      carve-outs in the small print.
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Remedy</Td>
                    <Td>
                      Repair, replacement with an equal or better grade, or credit at our option, at your
                      option within the first 30 days.
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Claim response time</Td>
                    <Td>Acknowledge within 2 working days. Decision within 10 working days of evidence.</Td>
                  </tr>
                  <tr>
                    <Td strong>Restocking on returns</Td>
                    <Td>
                      5% on non-defective returns within the DOA window; 0% on warranty replacements and
                      grade-conformity claims.
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="info" title="One number, everywhere">
                <p>
                  {WARRANTY_MONTHS} months appears on the homepage, on the{' '}
                  <Link href={`${base}/grading-standard`}>grading standard</Link>, on your proforma, on
                  your order confirmation and on your invoice. If a future revision changes it, this page
                  is versioned and the change is dated. You will never have to guess which figure
                  applies to your order.
                </p>
              </Callout>

              {/* ------------------------------------------- COVER ------- */}
              <h2 id="cover" style={{ marginTop: '3.5rem' }}>2. What is covered</h2>
              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Functional failure', `Any failure of a function listed in the published test points, at any point in the ${WARRANTY_MONTHS}-month term. We do not distinguish between a component failing in week three and one failing in week eleven.`],
                  ['Battery below tier floor', `A battery that falls below ${GRADING_STANDARD.lowestBatteryFloor}% design capacity, or below the specific floor published for the tier, is a warranty claim. This is measured the same way the standard specifies, and the method is in the standard.`],
                  ['Grade non-conformity', 'A unit that does not meet the published acceptance criteria for its assigned tier. Covered for the full term, whether or not the device functions.'],
                  ['Undisclosed activation lock', 'Screen lock, OS activation, BIOS or firmware password, or enterprise device lock we did not record on the report. If we graded it clean and it was not, that is our error and it is covered.'],
                  ['Residual data', 'Data recoverable from a device we certified as destroyed, in accordance with the published procedure. Our compliance address is the route for this and it is treated as a serious matter, because the failure mode is our error.'],
                  ['IMEI blacklisting', 'An IMEI we supplied becoming blacklisted for a reason attributable to our supply chain, replaced for the remainder of the warranty term.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="check">
                    {v}
                  </Card>
                ))}
              </div>

              {/* ------------------------------------------- NOT COVERED - */}
              <h2 id="not-covered" style={{ marginTop: '3.5rem' }}>3. What is not covered</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Exclusions are the part of a warranty that matters. These are the full list, not an
                extract.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Damage after delivery', 'Cracked displays, dropped devices, liquid ingress and impact damage occurring after the goods left our facility. This is not a defect; it is a physical event, and no supplier warrants against it at wholesale pricing. Accidental damage cover exists — see section 7.'],
                  ['Unauthorised intervention', 'Devices opened, repaired or modified by you or a third party, including screen replacement and battery replacement, whether or not the fault is related. We cannot warrant a device whose internals we have not seen.'],
                  ['Loss and theft', 'Loss or theft in your custody or in transit after carrier handover, including where we arranged the freight. Insured through your own policy or ours — see the shipping page.'],
                  ['Altered documentation', 'Devices accompanied by an altered, removed or incomplete grade report. A warranty on a documented product requires the document to be genuine and complete.'],
                  ['Software and configuration', 'Operating system faults caused by your own configuration, MDM enrolment, failed updates, or carrier provisioning. We warrant the hardware and the factory state we recorded.'],
                  ['Cosmetic expectation', 'A device that functions correctly but does not look as good as you expected is not a defect. It is a grade, and the grade is documented, which is why we warrant conformity to it rather than to an unstated ideal.'],
                ].map(([k, v]) => (
                  <Callout key={k} tone="bad" title={k}>
                    <p>{v}</p>
                  </Callout>
                ))}
              </div>

              {/* ------------------------------------------- DOA --------- */}
              <h2 id="doa" style={{ marginTop: '3.5rem' }}>4. DOA and transit windows</h2>
              <div className="prose">
                <p>
                  Dead-on-arrival claims are the most time-sensitive thing in this business. A claim raised
                  in month four is very difficult to evidence, because by then you cannot separate an
                  inbound fault from something that happened during your own handling, storage or
                  installation. We will investigate a late claim in good faith, but we ask you to raise
                  DOA and transit claims within the 7-day window so that both sides can establish the
                  facts.
                </p>
                <p>
                  The window runs from <b>delivery</b>, not from dispatch. If the units sat in your
                  warehouse for three weeks, the clock starts when they reached you.
                </p>
              </div>

              <KV
                items={[
                  { k: 'DOA window', v: '7 calendar days from delivery' },
                  { k: 'Transit damage', v: '7 calendar days from delivery; carrier claim raised within the same window' },
                  { k: 'Required evidence', v: 'Serial or IMEI, grade report reference, a description of the fault, and photographs or a short video where relevant' },
                  { k: 'Bulk DOA threshold', v: 'Where more than 5% of a consignment fails within the window, we treat it as a lot issue and inspect the lot, not just the units' },
                ]}
              />

              <Callout tone="warn" title="Do not power on a DOA unit">
                <p>
                  If a unit will not start, do not charge it repeatedly, do not attempt a reset, and do
                  not open it. Photograph the screen state and pack it as it arrived. A device that has
                  been repeatedly power-cycled after failure can lose diagnostic state, and that weakens
                  an otherwise straightforward claim.
                </p>
              </Callout>

              {/* ------------------------------------------- CLAIMS ------ */}
              <h2 id="claims" style={{ marginTop: '3.5rem' }}>5. Making a claim</h2>
              <div className="prose">
                <p>
                  The four steps below are the claim from your side. What happens to the device once it
                  reaches us &mdash; quarantine, intake verification, diagnosis, repair, a second data
                  purge, full re-test, re-grading, re-issued certificates and insured return &mdash; is
                  documented step by step on the{' '}
                  <Link href={`${base}/returns`}>returns and repair turnaround page</Link>. Read that
                  before you need it, so you know what evidence we are holding on your behalf.
                </p>
              </div>
              <div className="steps">
                <Step title="Notify us">
                  Email the claim to your account contact with serials, quantity, grade and a
                  description. Acknowledgement within 2 working days.
                </Step>
                <Step title="Evidence">
                  Send grade report references, photographs, and a fault description. For bulk lots, a
                  list rather than a photo album — the serials are what matter.
                </Step>
                <Step title="Decision">
                  Repair, replacement or credit. We will tell you which and why within 10 working days of
                  complete evidence, with the technician&rsquo;s assessment attached.
                </Step>
                <Step title="Collection">
                  For replacements we supply a prepaid return label or arrange a carrier pickup,
                  depending on volume. For credit, it is applied to the next invoice or refunded within
                  15 working days.
                </Step>
              </div>

              {/* --------------------------------------- GRADE CLAIMS ---- */}
              <h2 id="grade-claims" style={{ marginTop: '3.5rem' }}>
                6. Grade conformity claims
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                This is the claim type almost nobody in the market writes down, and it is the reason our
                warranty is longer than most.
              </p>

              <div className="prose">
                <p>
                  A grade-conformity claim says: <i>this unit was sold as Grade A and does not meet the
                  published acceptance criteria for Grade A.</i> It does not require the device to be
                  broken. A Grade A with a visible scratch, a replaced display, or a battery at 88% is a
                  valid claim, because Grade A means none of those things.
                </p>
                <p>
                  The criteria are{' '}
                  <Link href={`${base}/grading-standard`}>published on the grading standard page</Link>, so
                  there is no argument about what was promised. The criteria in force at the time of
                  order govern the claim, not a later revision of the standard.
                </p>
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Example</Th>
                    <Th scope="col">Claim?</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Sold Grade A, battery reads 86% on arrival</Td>
                    <Td>
                      <Pill tone="ok">Yes — below the A floor of 90%</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td>Sold Grade A, screen replaced and not disclosed</Td>
                    <Td>
                      <Pill tone="ok">Yes — A requires an original display</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td>Sold Grade B, works perfectly, looks like a Grade A</Td>
                    <Td>
                      <Pill tone="warn">Not a claim — B is what we warranted</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td>Sold Grade C, customer expected it to look new</Td>
                    <Td>
                      <Pill tone="warn">Not a claim — C is a documented grade</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td>Sold Grade A+, visible mark at 30 cm</Td>
                    <Td>
                      <Pill tone="ok">Yes — A+ allows no visible marks</Pill>
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="plain" title="Why we do this">
                <p>
                  A supplier that warrants only function has told you the device works. A supplier that
                  warrants the grade has told you what you are buying. The second is the claim you
                  actually need when a customer rejects a pallet.
                </p>
              </Callout>

              {/* ------------------------------------------- ACCIDENTAL - */}
              <h2 id="accidental" style={{ marginTop: '3.5rem' }}>7. Accidental damage cover</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Optional, priced per consignment, and available on graded stock only. Grade D cannot be
                insured against damage because it does not function.
              </p>

              <KV
                items={[
                  { k: 'What it covers', v: 'Screen breakage, accidental liquid ingress, and impact damage occurring in the period stated on the certificate of cover' },
                  { k: 'What it does not cover', v: 'Theft, loss, cosmetic wear, deliberate damage, and any damage arising from an unauthorised repair. There are no exclusions concealed in the small print, because there is no small print.' },
                  { k: 'How it is priced', v: 'Per consignment, as a percentage of invoice value, quoted at the point of order. The rate and the period appear on the cover note.' },
                  { k: 'Claims', v: 'Same process as section 5, with a damage description and photographs. Claims must be reported within the cover period.' },
                  { k: 'Excess', v: 'Stated on the certificate of cover. It is a fixed figure, not a percentage, and it is the same figure for every unit in the consignment.' },
                ]}
              />

              <Callout tone="info" title="A note on the bad market practice">
                <p>
                  Some suppliers advertise accidental damage cover in the headline and exclude it in the
                  terms. We would rather you did not buy it from us than discover that on the tenth unit.
                  If a claim is declined, you will get the specific exclusion that was applied, in
                  writing, with the certificate of cover attached so you can see whether the exclusion
                  existed when you bought.
                </p>
              </Callout>

              {/* ------------------------------------------- D/AB -------- */}
              <h2 id="exclusions" style={{ marginTop: '3.5rem' }}>
                8. Grade D and Grade AB
              </h2>
              <div className="grid grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
                <div className="prose">
                  <h3>Grade D — no warranty, by definition</h3>
                  <p>
                    Grade D units are sold as spare parts and component donors. They fail functional test
                    points; that is what the grade means. A warranty on non-functional goods would be a
                    warranty that pays out on the item working, which is not a warranty.
                  </p>
                  <p>
                    What you do get on Grade D: the fault category recorded per unit, the count, and
                    confirmation that data was destroyed and IMEIs screened. You do not get a claim if a
                    board is dead — you get a documented, accurately described dead board, which is what
                    you bought.
                  </p>
                </div>
                <div className="prose">
                  <h3>Grade AB — functional only</h3>
                  <p>
                    AB stock is functionally sound and cosmetically ungraded, so there is no cosmetic
                    criterion to warrant. The {WARRANTY_MONTHS}-month warranty applies to function
                    exactly as it does on B and C. Battery is stated at lot level, so it is not a
                    per-unit warranty item.
                  </p>
                  <p>
                    Sorting and re-grading an AB unit in your own facility is the expected use, and it is
                    where your margin is. Warranty claims on an AB unit follow the same process.
                  </p>
                </div>
              </div>

              {/* ------------------------------------------- RETURNS ---- */}
              <h2 id="returns" style={{ marginTop: '3.5rem' }}>9. Returns and restocking</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Situation</Th>
                    <Th scope="col" num>Restocking</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Warranty replacement or repair</Td>
                    <Td num mono>0%</Td>
                  </tr>
                  <tr>
                    <Td>Grade-conformity claim upheld</Td>
                    <Td num mono>0%</Td>
                  </tr>
                  <tr>
                    <Td>IMEI blacklisting claim upheld</Td>
                    <Td num mono>0%</Td>
                  </tr>
                  <tr>
                    <Td>Non-defective return within the 7-day DOA window</Td>
                    <Td num mono>5%</Td>
                  </tr>
                  <tr>
                    <Td>Non-defective return after the DOA window</Td>
                    <Td className="muted">By agreement, per consignment</Td>
                  </tr>
                  <tr>
                    <Td>Order cancelled before dispatch</Td>
                    <Td num mono>0%</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="plain" title="Where a return happens at your fault">
                <p>
                  If units come back damaged, or with a grade report that has been altered, or without
                  the accessories and packaging supplied, the return is charged to you at landed cost and
                  the units are re-graded. This is not punitive; re-grading is real work on a real
                  machine, and it is the reason the restocking fee exists.
                </p>
              </Callout>

              {/* ------------------------------------------- ADMIN ------- */}
              <h2 id="warranty-admin" style={{ marginTop: '3.5rem' }}>
                10. Administration
              </h2>
              <KV
                items={[
                  { k: 'Claim address', v: 'Your account contact, copied to compliance@verigrade.ae for any data or certificate matter' },
                  { k: 'Acknowledgement', v: 'Within 2 working days of a complete claim' },
                  { k: 'Decision', v: 'Within 10 working days of complete evidence' },
                  { k: 'Remedy options', v: 'Repair, replacement at equal or better grade, or credit. Your choice within the first 30 days, ours thereafter' },
                  { k: 'Credit terms', v: 'Applied to the next invoice, or refunded within 15 working days of approval' },
                  { k: 'Returned units', v: 'Graded again at no charge on warranty replacements, re-wiped, fully re-tested, and the new report supersedes the original. The full sequence is on the returns page' },
                  { k: 'Governing law', v: 'As set out in the trading terms, with the DIFC as the forum for commercial disputes' },
                  { k: 'Standard version', v: `Grading standard v${GRADING_STANDARD.version}, effective ${GRADING_STANDARD.effective}` },
                ]}
              />

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="The fastest way to test whether these terms are real is to make one claim on them."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Ordering & payment', href: `${base}/ordering` }}
                >
                  Buy a small mixed-grade trial. Grade it against the standard yourself. If we are wrong
                  about a unit, tell us — that is the most useful thing you can send us, and it is the
                  fastest route to a standing grade definition you can build a programme on.
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
