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
import { GRADING_STANDARD, SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const WARRANTY_MONTHS = 12;

const TOC = [
  { href: '#how', label: '1. How an order runs' },
  { href: '#moq', label: '2. Minimums and lead times' },
  { href: '#proforma', label: '3. Proforma and payment' },
  { href: '#grading-mix', label: '4. Choosing a grade mix' },
  { href: '#first-order', label: '5. A first order' },
  { href: '#amend', label: '6. Amendments & cancellation' },
  { href: '#records', label: '7. What you get, every time' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Ordering & payment',
    description:
      'How ordering works with VeriGrade: MOQ from 5 units, mixed grades, proforma pricing from the Dubai entity, bank transfer terms, and the full document set issued with every consignment.',
    alternates: { canonical: `/${country}/ordering` },
  };
}

export default async function OrderingPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Trade terms"
        title="Ordering &amp; payment"
        lead="MOQ from 5 units, mixed grades and models in one shipment, priced on a proforma issued by the Dubai entity. Nothing about this page is unusual — the unusual part is that every figure on it is the figure that appears on your invoice."
        meta={
          <>
            <Pill tone="ok">MOQ from 5 units</Pill>
            <Pill tone="info">Mixed grades welcome</Pill>
            <Pill tone="neutral">EXW / FOB / CIF / DAP</Pill>
            <Pill tone="neutral">Bank transfer</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/ordering`, label: 'Ordering & payment' }]} />

              <h2 id="how">1. How an order runs</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Seven steps, and the same seven steps on every order. There is no expedited path that
                skips the documentation.
              </p>

              <div className="steps">
                <Step title="Enquiry">
                  Models, quantities and your grade preference — or simply &ldquo;advise&rdquo; and we
                  will propose a mix. Tell us the destination, because it changes the documentation set
                  and sometimes the model list.
                </Step>
                <Step title="Availability check">
                  We check the actual lot, not a stock figure from a system, and confirm what can be
                  filled. If a model you asked for is not available we say so here rather than after
                  payment.
                </Step>
                <Step title="Proforma">
                  Firm pricing, Incoterm with the named place, lead time, payment terms, and the
                  document list for your destination. Valid for a stated window, which is short where
                  the currency is volatile.
                </Step>
                <Step title="Payment">
                  Bank transfer to the account on the proforma, held in the invoicing entity name.
                  Terms become available after a completed first transaction.
                </Step>
                <Step title="Processing &amp; pre-dispatch">
                  Grading, manifest reconciliation, IMEI re-verification and documentation assembly.
                  On request we hold dispatch until you have seen photographs or video of your serials.
                </Step>
                <Step title="Dispatch">
                  Consolidated, grade-segregated packing, handed to the carrier with the document
                  pack. You receive the tracking reference and the full document set electronically
                  the same day.
                </Step>
                <Step title="Delivery and warranty start">
                  The {WARRANTY_MONTHS}-month warranty period runs from delivery, not from dispatch. DOA and transit
                  claims have a 7-day window from delivery.
                </Step>
              </div>

              <Callout tone="plain" title="The one thing that delays first orders most often">
                <p>
                  A bank transfer where the paying account name does not match the invoicing entity
                  name. It stops the payment, and it is entirely avoidable. Check it before you
                  instruct, and tell us the sending entity name if it has to differ.
                </p>
              </Callout>

              {/* ---------------------------------------- MOQ ----------- */}
              <h2 id="moq" style={{ marginTop: '3.5rem' }}>2. Minimums and lead times</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Item</Th>
                    <Th scope="col">Position</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>MOQ</Td>
                    <Td>5 units. Mixed models and grades within one shipment.</Td>
                  </tr>
                  <tr>
                    <Td strong>Dispatch, stock lines</Td>
                    <Td>3–7 working days from cleared payment.</Td>
                  </tr>
                  <tr>
                    <Td strong>Source-specific requests</Td>
                    <Td>Quoted individually. We will not commit to a date we have not checked.</Td>
                  </tr>
                  <tr>
                    <Td strong>A+ availability</Td>
                    <Td>Limited by nature. Confirm before building a plan around it.</Td>
                  </tr>
                  <tr>
                    <Td strong>Corporate laptop programmes</Td>
                    <Td>Quoted per specification, typically 2–6 weeks depending on volume.</Td>
                  </tr>
                  <tr>
                    <Td strong>Proforma validity</Td>
                    <Td>7 days, and shorter where the destination currency is volatile.</Td>
                  </tr>
                  <tr>
                    <Td strong>Consolidation</Td>
                    <Td>Available, with per-importer manifests and invoices.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="warn" title="On lead times and honesty">
                <p>
                  A supplier who quotes the same lead time for everything is not telling you anything.
                  A+ takes longer because there is less of it. A corporate laptop specification takes
                  longer because it has to be sourced to a configuration. A Grade D parts lot ships
                  fast because nothing is waiting on a cosmetic decision. If we quote a long date, that
                  is the date.
                </p>
              </Callout>

              {/* ---------------------------------------- PROFORMA ------ */}
              <h2 id="proforma" style={{ marginTop: '3.5rem' }}>3. Proforma and payment</h2>
              <KV
                items={[
                  { k: 'Proforma issued by', v: SITE.legalName },
                  { k: 'Payment method', v: 'Bank transfer (SWIFT / local transfer). No cards for wholesale.' },
                  { k: 'Account name', v: 'Must match the invoicing entity name exactly' },
                  { k: 'Currencies', v: 'AED, USD, SAR, EUR, GBP, CAD, HKD, AUD and others by arrangement' },
                  { k: 'Bank charges', v: 'Inbound charges borne by the buyer so the full invoice value is received' },
                  { k: 'First transaction', v: 'Payment in full against the proforma' },
                  { k: 'After the first transaction', v: 'Net terms available on request; typically 30 days, subject to history' },
                  { k: 'Price basis', v: 'Ex-works Dubai unless the proforma states otherwise, with the Incoterm and named place' },
                ]}
              />

              <div style={{ marginTop: '2rem' }}>
                <h3>What the proforma states, every time</h3>
                <div className="grid grid-2" style={{ gap: '1.2rem', marginTop: '1rem' }}>
                  {[
                    ['Line detail', 'Model, grade, storage or memory, quantity, unit price, line total. Configuration is specified, not summarised as an assorted line.'],
                    ['Incoterm', 'The term and the named place — Incoterms without a named place is not an Incoterm.'],
                    ['Lead time', 'Dispatch window, and the validity date of the pricing.'],
                    ['Payment terms', 'Amount due, due date, and the account details.'],
                    ['Document list', 'Exactly what will ship with the goods, for your destination.'],
                    ['Warranty', `The ${WARRANTY_MONTHS}-month figure, stated on the proforma so it is contractual before you pay.`],
                    ['Grade mix', 'Where the order is mixed, the per-grade quantities in writing.'],
                    ['Validity', 'The date the pricing expires. We re-quote rather than honour expired figures silently.'],
                  ].map(([k, v]) => (
                    <Card key={k} title={k} icon="file">
                      {v}
                    </Card>
                  ))}
                </div>
              </div>

              <Callout tone="info" title="Why the warranty is on the proforma">
                <p>
                  Because in several destination markets a written warranty on a consumer good creates
                  obligations for whoever passes it on. If the warranty first appears on our website and
                  nowhere else, your compliance team has nothing to hold. Putting it on the proforma
                  makes it part of the contract, and it is the same figure that appears on the invoice.
                </p>
              </Callout>

              {/* ---------------------------------------- GRADE MIX ----- */}
              <h2 id="grading-mix" style={{ marginTop: '3.5rem' }}>
                4. Choosing a grade mix
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Grade mix moves your price more than volume does. This is the trade-off per tier, and it
                is worth ten minutes of thought before you instruct.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Grade</Th>
                    <Th scope="col">Relative price</Th>
                    <Th scope="col">Who it suits</Th>
                    <Th scope="col">Main risk you carry</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>
                      <span className="badge grade-A-plus">A+</span>
                    </Td>
                    <Td>Highest</Td>
                    <Td>Retail shelf programmes, premium resale, operator channels</Td>
                    <Td>Availability. Volume is genuinely limited.</Td>
                  </tr>
                  <tr>
                    <Td>
                      <span className="badge grade-A">A</span>
                    </Td>
                    <Td>High</Td>
                    <Td>Retail and corporate refresh where presentation matters</Td>
                    <Td>Higher capital per unit for the same volume.</Td>
                  </tr>
                  <tr>
                    <Td>
                      <span className="badge grade-B">B</span>
                    </Td>
                    <Td>Mid</Td>
                    <Td>The general wholesale lane. Best margin-to-cost ratio in the range.</Td>
                    <Td>Cosmetic variation within the tier. Sell it as &ldquo;very good&rdquo; accurately.</Td>
                  </tr>
                  <tr>
                    <Td>
                      <span className="badge grade-C">C</span>
                    </Td>
                    <Td>Low</Td>
                    <Td>Local re-conditioners, refurbishers, trade-in arbitrage</Td>
                    <Td>Your rework cost and time. Not for direct sale as a premium device.</Td>
                  </tr>
                  <tr>
                    <Td>
                      <span className="badge grade-AB">AB</span>
                    </Td>
                    <Td>Lowest</Td>
                    <Td>Processors who grade in-house and want the full margin</Td>
                    <Td>All grading labour and grade risk sits with you.</Td>
                  </tr>
                  <tr>
                    <Td>
                      <span className="badge grade-D">D</span>
                    </Td>
                    <Td>Lowest, per unit</Td>
                    <Td>Parts harvesting, donor components, board recovery</Td>
                    <Td>No functional warranty. Judge on the fault breakdown, not the count.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="ok" title="If you are unsure, ask us to advise">
                <p>
                  Tell us the market, the channel and the target retail price, and we will propose a
                  mix. A B-led consignment with a C tail usually outperforms an A-heavy one at the same
                  capital, because the C units are where a re-conditioner&rsquo;s margin actually is.
                  We are not neutral about this — our AB volume depends on processors winning on it.
                </p>
              </Callout>

              {/* ---------------------------------------- FIRST ORDER --- */}
              <h2 id="first-order" style={{ marginTop: '3.5rem' }}>
                5. A first order
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                We are a new name, so a first transaction is a two-way assessment. This is what we
                suggest, and what we will provide.
              </p>

              <div className="grid grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
                <div className="prose">
                  <h3>What we will send before you pay</h3>
                  <ul>
                    <li className="small">Proforma with firm pricing and the named Incoterm</li>
                    <li className="small">Specimen grade report and destruction certificate</li>
                    <li className="small">Warranty summary, in the form your customer will see it</li>
                    <li className="small">Licence extract, VAT certificate and proof of address</li>
                    <li className="small">Two trade references, with contact details, on request</li>
                    <li className="small">Photographs of the specific lot, matched to serials</li>
                  </ul>
                  <h3>What we will do on our side</h3>
                  <ul>
                    <li className="small">
                      Grade against the published standard, with per-unit reports
                    </li>
                    <li className="small">Hold dispatch until the manifest reconciles to physical stock</li>
                    <li className="small">
                      Issue every document listed on the proforma, in {c.name}&rsquo;s expected
                      languages
                    </li>
                    <li className="small">Accept a grade-conformity claim without argument</li>
                  </ul>
                </div>
                <div className="prose">
                  <h3>What we will ask of you</h3>
                  <ul>
                    <li className="small">
                      Verify our entity independently — the DAFZA register is public
                    </li>
                    <li className="small">Grade a sample of what arrives against the standard</li>
                    <li className="small">
                      Tell us where the standard is ambiguous, because that is a defect in our document
                    </li>
                    <li className="small">
                      Tell us immediately if anything in the documentation does not match the goods
                    </li>
                  </ul>
                  <div style={{ marginTop: '1.4rem' }}>
                    <Callout tone="plain" title="A realistic note">
                      <p>
                        We are a 2026 company selling into markets with long-established suppliers. If
                        you have been burned by a documentation problem before, start small — a mixed
                        20-unit trial across grades is enough to test every claim on this website, and it
                        costs less than one container of regret.
                      </p>
                    </Callout>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------- AMEND --------- */}
              <h2 id="amend" style={{ marginTop: '3.5rem' }}>6. Amendments and cancellation</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Situation</Th>
                    <Th scope="col">Position</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Amend or cancel before dispatch</Td>
                    <Td>Accepted, no charge. Tell us as early as possible — after manifest assembly the stock is committed.</Td>
                  </tr>
                  <tr>
                    <Td>Amend after dispatch</Td>
                    <Td className="muted">Not possible. The goods are in transit and the documentation has been issued against them.</Td>
                  </tr>
                  <tr>
                    <Td>Quantity reduction after payment</Td>
                    <Td>Refund of the difference within 15 working days of the reduced invoice.</Td>
                  </tr>
                  <tr>
                    <Td>Failed payment</Td>
                    <Td>Stock is held for 7 days, then released. We will tell you if it is released.</Td>
                  </tr>
                  <tr>
                    <Td>Proforma expired</Td>
                    <Td>Re-quoted. We will not honour expired indicative pricing without saying so.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ---------------------------------------- RECORDS ------- */}
              <h2 id="records" style={{ marginTop: '3.5rem' }}>
                7. What you get, every time
              </h2>
              <div className="flow">
                {[
                  ['Per-unit IMEI / MEID manifest', 'Every serial in the consignment, listed. Not a sample, not a total.'],
                  ['Per-unit grade report', 'Grade, battery health, cycle count where applicable, parts status, network variant, and any functional defect recorded.'],
                  ['Data-destruction certificate', `One per serial. ${GRADING_STANDARD.wipeStandard} Purge, with read-back verification. `],
                  ['Packing list', 'Carton-level, reconciled to the manifest before dispatch.'],
                  ['Commercial invoice', 'True value, true condition, Incoterm and named place, issuing entity details.'],
                  ['Certificate of origin', 'Issued as standard.'],
                  ['Warranty summary', `The ${WARRANTY_MONTHS}-month terms in the form your retail customer will read.`],
                  ['Battery / DG declaration', 'Where lithium batteries ship by air, the dangerous-goods declaration.'],
                ].map(([t, d]) => (
                  <FlowStep key={t} title={t}>
                    {d}
                  </FlowStep>
                ))}
              </div>

              <Callout tone="plain" title="If a document is missing from a consignment">
                <p>
                  Tell us the shipment reference and we will reissue the full set. Do not attempt
                  clearance with an incomplete pack — the common outcome is a delay, a storage charge
                  and a demurrage bill, and none of that is recoverable from us once the container has
                  been held.
                </p>
              </Callout>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Send a model list. We will tell you what we can fill."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Shipping & Incoterms', href: `${base}/shipping` }}
                >
                  Quantities, models and grade preference — or say &ldquo;advise&rdquo;. Same-day quote
                  on standard requests, within 24 hours on source-specific specifications.
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
