import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Callout, Crumbs, KV, PageHero, Pill, TableWrap, Td, Th, Toc } from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { GRADING_STANDARD, SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const EFFECTIVE = '2026-01-15';
const WARRANTY_MONTHS = 12;

const TOC = [
  { href: '#parties', label: '1. Parties and application' },
  { href: '#definitions', label: '2. Definitions' },
  { href: '#goods', label: '3. The goods' },
  { href: '#grade-standard', label: '4. Grade as specification' },
  { href: '#risk-title', label: '5. Risk and title' },
  { href: '#price', label: '6. Price and payment' },
  { href: '#delivery', label: '7. Delivery and Incoterms' },
  { href: '#inspection', label: '8. Inspection and claims' },
  { href: '#warranty-terms', label: '9. Warranty' },
  { href: '#data', label: '10. Data destruction' },
  { href: '#liability', label: '11. Liability' },
  { href: '#ip', label: '12. Confidentiality and IP' },
  { href: '#compliance-both', label: '13. Compliance, both ways' },
  { href: '#force', label: '14. Force majeure' },
  { href: '#law', label: '15. Governing law' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Trading terms',
    description:
      'VeriGrade Electronics FZ-LLC wholesale trading terms: grade as contractual specification, Incoterms and risk transfer, payment, inspection and claims windows, warranty, data-destruction evidence, liability and governing law.',
    alternates: { canonical: `/${country}/terms` },
  };
}

export default async function TermsPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Trading terms"
        lead={`The commercial terms on which ${SITE.legalName} supplies wholesale goods. These are written to be read before they are signed, and the warranty terms here are the same {WARRANTY_MONTHS}-month figure that appears on the website, on your proforma and on your invoice.`}
        meta={
          <>
            <Pill tone="neutral">Effective {EFFECTIVE}</Pill>
            <Pill tone="info">Governing law: UAE / DIFC</Pill>
            <Pill tone="neutral">B2B supply only</Pill>
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <a className="btn btn--primary" href={`${base}/contact`}>
            Request a quote
          </a>
          <a className="btn btn--ghost" href={`${base}/warranty`}>
            Warranty in full
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/terms`, label: 'Trading terms' }]} />

              <div style={{ marginBottom: '2rem' }}>
                <Callout tone="warn" title="Read this before relying on it">
                  <p>
                    These terms are written for readability and they are not a substitute for a
                    negotiated contract. Where a signed contract, a proforma or a purchase order
                    contains different terms, those terms prevail over this page. If a clause here is
                    unclear or commercially wrong for your business, raise it with us before you order
                    — we would rather negotiate it than have a dispute about it.
                  </p>
                </Callout>
              </div>

              <h2 id="parties">1. Parties and application</h2>
              <div className="prose">
                <p>
                  These terms apply to all supply of goods by {SITE.legalName} to a business buyer,
                  wherever the buyer is established. By placing an order, accepting a proforma or
                  accepting delivery, the buyer accepts them.
                </p>
                <p>
                  These terms do not apply to consumers. We do not supply consumers, and any sale to a
                  consumer is void of this contract.
                </p>
              </div>

              <h2 id="definitions" style={{ marginTop: '2.6rem' }}>2. Definitions</h2>
              <KV
                items={[
                  { k: 'Goods', v: 'The devices, parts and accessories supplied under a proforma or order' },
                  { k: 'Grade', v: `A tier under the VeriGrade Grading Standard v${GRADING_STANDARD.version}` },
                  { k: 'Grade Report', v: 'The per-unit document recording the assigned grade, battery health, cycle count where applicable, parts status and any recorded defect' },
                  { k: 'Destruction Certificate', v: `Per-unit evidence of data destruction under ${GRADING_STANDARD.wipeStandard}` },
                  { k: 'Proforma', v: 'Our offer, stating the goods, price, Incoterm with the named place, lead time, payment terms and document list' },
                  { k: 'Delivery', v: 'The point at which risk passes, as defined by the agreed Incoterm' },
                  { k: 'Working Day', v: 'A day other than a Friday, Saturday or public holiday in the Emirate of Dubai' },
                ]}
              />

              <h2 id="goods" style={{ marginTop: '2.6rem' }}>3. The goods</h2>
              <div className="prose">
                <p>
                  Goods are sold <b>as described in the Grade Report</b>, in the condition described
                  there. We sell refurbished goods, and nothing on this website or in any document we
                  issue should be read as a representation that goods are new.
                </p>
                <p>
                  We may substitute a model or configuration where the specified line is unavailable,
                  provided the substitute is of equal or better grade and specification, the substitution
                  is disclosed on the proforma or in writing before dispatch, and you may reject it with
                  a full refund of that line.
                </p>
                <p>
                  Bulk tolerance applies to graded consignments. Quantities may vary by up to 5% within
                  each grade line to reflect lot composition, with the price adjusted on the invoice to
                  the quantity actually shipped. This is the normal practice of the trade and it is
                  disclosed here rather than buried.
                </p>
              </div>

              <h2 id="grade-standard" style={{ marginTop: '2.6rem' }}>
                4. Grade as contractual specification
              </h2>
              <div className="prose">
                <p>
                  <b>The Grade Report forms part of the contract of sale.</b> The grade is not
                  marketing copy; it is a specification, and the published acceptance criteria for the
                  assigned tier are incorporated into this contract by reference.
                </p>
                <p>
                  The version of the standard in force <b>at the date of order</b> governs any claim.
                  A later revision does not apply retroactively, and we will not re-grade goods already
                  shipped under an earlier version.
                </p>
              </div>

              <Callout tone="ok" title="What this entitles you to">
                <p>
                  If goods do not meet the acceptance criteria for their assigned grade, that is a
                  breach of this contract and a warranty claim, whether or not the goods function. The
                  remedies are in <Link href={`${base}/warranty`}>section 9</Link> and on the warranty
                  page.
                </p>
              </Callout>

              <div className="prose" style={{ marginTop: '1.4rem' }}>
                <p>
                  In the event of any inconsistency between the grade summary and the recorded test
                  results, <b>the recorded test result prevails</b> and the summary is corrected. We
                  would rather correct a report than defend it.
                </p>
              </div>

              <h2 id="risk-title" style={{ marginTop: '2.6rem' }}>5. Risk and title</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Incoterm</Th>
                    <Th scope="col">Risk passes</Th>
                    <Th scope="col">Title</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>EXW</Td>
                    <Td>When the goods are placed at your disposal at our facility.</Td>
                    <Td>On payment in full.</Td>
                  </tr>
                  <tr>
                    <Td strong>FOB</Td>
                    <Td>When the goods are on board the vessel or aircraft.</Td>
                    <Td>On payment in full.</Td>
                  </tr>
                  <tr>
                    <Td strong>CIF</Td>
                    <Td>On board the vessel or aircraft. Note this is earlier than arrival.</Td>
                    <Td>On payment in full.</Td>
                  </tr>
                  <tr>
                    <Td strong>DAP</Td>
                    <Td>When the goods are placed at your disposal at the named place.</Td>
                    <Td>On payment in full.</Td>
                  </tr>
                  <tr>
                    <Td strong>DDP</Td>
                    <Td>On arrival at the named place, ready for unloading.</Td>
                    <Td>On payment in full.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <div className="prose" style={{ marginTop: '1.2rem' }}>
                <p>
                  Title remains with us until payment is received in full, whatever the Incoterm. We
                  may withhold shipment where payment is outstanding. Under CIF, risk passes at the
                  port of loading, which is worth checking against your insurance — the voyage is long
                  and the risk is yours.
                </p>
              </div>

              <h2 id="price" style={{ marginTop: '2.6rem' }}>6. Price and payment</h2>
              <KV
                items={[
                  { k: 'Basis', v: 'The price stated on the proforma, in the stated currency, ex-works Dubai unless the Incoterm says otherwise' },
                  { k: 'Validity', v: 'For the period stated on the proforma. Indicative prices shown on this website are not an offer' },
                  { k: 'Payment method', v: 'Bank transfer. Cards are not accepted for wholesale' },
                  { k: 'Account name', v: 'Must match the invoicing entity exactly. We may reject a payment that does not' },
                  { k: 'Bank charges', v: 'Inbound charges are borne by the buyer. Short payments remain outstanding' },
                  { k: 'First transaction', v: 'Payment in full against the proforma' },
                  { k: 'Subsequent terms', v: 'Net terms by agreement, typically 30 days, subject to trading history' },
                  { k: 'Taxes', v: 'As applicable in the UAE. Destination duties and taxes are the buyer’s responsibility under EXW, FOB, CIF and DAP' },
                  { k: 'Cancellation', v: 'Free before dispatch. After manifest assembly, stock is committed' },
                ]}
              />

              <h2 id="delivery" style={{ marginTop: '2.6rem' }}>7. Delivery and Incoterms</h2>
              <div className="prose">
                <p>
                  Delivery dates on a proforma are estimates of dispatch, not promises of arrival.
                  We will notify you of dispatch with the tracking reference and the document pack.
                  Risk in transit is as set out in section 5.
                </p>
                <p>
                  If consignments are to be split across destinations or importers, we consolidate at
                  our facility and issue per-importer manifests and invoices. Each importer&rsquo;s
                  documentation is self-contained, and no consignment relies on another for clearance.
                </p>
              </div>

              <h2 id="inspection" style={{ marginTop: '2.6rem' }}>
                8. Inspection and claims
              </h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Claim type</Th>
                    <Th scope="col">Window</Th>
                    <Th scope="col">From</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Short delivery or missing serial</Td>
                    <Td className="muted">7 calendar days</Td>
                    <Td>Delivery</Td>
                  </tr>
                  <tr>
                    <Td>Transit damage</Td>
                    <Td className="muted">7 calendar days</Td>
                    <Td>Delivery</Td>
                  </tr>
                  <tr>
                    <Td>Dead on arrival</Td>
                    <Td className="muted">7 calendar days</Td>
                    <Td>Delivery</Td>
                  </tr>
                  <tr>
                    <Td>Grade non-conformity</Td>
                    <Td>Warranty term, subject to reasonable inspection</Td>
                    <Td>Delivery</Td>
                  </tr>
                  <tr>
                    <Td>Missing or unissued destruction certificate</Td>
                    <Td className="muted">7 calendar days</Td>
                    <Td>Delivery</Td>
                  </tr>
                  <tr>
                    <Td>Other warranty claim</Td>
                    <Td>{WARRANTY_MONTHS} months</Td>
                    <Td>Delivery</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <div className="prose" style={{ marginTop: '1.2rem' }}>
                <p>
                  Claims must be raised with the serials, the Grade Report references, a description of
                  the fault and, where relevant, photographs or a short video. We acknowledge within 2
                  working days of a complete claim and decide within 10 working days of complete
                  evidence. <b>Transit damage must be notified to the carrier within the same
                  window</b>; claims are frequently refused by carriers where notification is late.
                </p>
                <p>
                  Devices that are dead on arrival should not be repeatedly power-cycled, reset or
                  opened before being returned, as this destroys diagnostic state and can defeat a
                  claim that would otherwise be straightforward.
                </p>
              </div>

              <h2 id="warranty-terms" style={{ marginTop: '2.6rem' }}>
                9. Warranty
              </h2>
              <div className="prose">
                <p>
                  We warrant the goods for <b>{WARRANTY_MONTHS} months from delivery</b> on all grades
                  A+ to C, and on grade AB for function. Grade D is sold as parts, is not warranted for
                  function, and this is stated on its Grade Report.
                </p>
              </div>

              <h3>Covered</h3>
              <ul>
                <li className="small">Functional failure of a tested function during the warranty term.</li>
                <li className="small">
                  Battery falling below the published floor for the tier, or below{' '}
                  {GRADING_STANDARD.lowestBatteryFloor}% design capacity, measured by the published
                  method.
                </li>
                <li className="small">Non-conformity to the assigned grade, per section 4.</li>
                <li className="small">
                  Activation, OS, BIOS or firmware locks, or parts status, that we did not disclose on
                  the Grade Report.
                </li>
                <li className="small">
                  Personal data recoverable from a device for which we issued a Destruction Certificate,
                  in accordance with the published procedure.
                </li>
                <li className="small">
                  IMEI blacklisting attributable to our supply chain, replaced for the remainder of the
                  warranty term.
                </li>
              </ul>

              <h3>Not covered</h3>
              <ul>
                <li className="small">
                  Physical or liquid damage occurring after delivery, including in your custody.
                </li>
                <li className="small">
                  Unauthorised opening, repair, modification or re-grading by you or a third party.
                </li>
                <li className="small">Loss or theft after delivery.</li>
                <li className="small">Grade D functionality.</li>
                <li className="small">
                  Devices accompanied by an altered, removed or incomplete Grade Report.
                </li>
                <li className="small">
                  Software faults arising from your configuration, enrolment, provisioning or updates.
                </li>
              </ul>

              <h3>Remedies</h3>
              <div className="prose">
                <p>
                  Repair, replacement with goods of equal or better grade, or credit, at your option
                  within the first 30 days of the claim and at our option thereafter. A claim on a lot
                  where more than 5% of units fail is treated as a lot issue and we inspect the lot.
                </p>
              </div>

              <Callout tone="plain" title="Transfer of the warranty">
                <p>
                  The warranty is assignable to a purchaser of the goods from you, which is what makes it
                  useful in a resale channel. It is not assignable where the goods are bought for
                  re-export without your compliance owner having checked the obligations that
                  transferring a written warranty creates in the destination market.
                </p>
              </Callout>

              <h2 id="data" style={{ marginTop: '2.6rem' }}>10. Data destruction</h2>
              <div className="prose">
                <p>
                  We warrant that we apply the data-destruction method described on the{' '}
                  <Link href={`${base}/data-security`}>data security page</Link> to every unit before
                  functional testing, that we verify the destruction by read-back, and that we issue a
                  Destruction Certificate per serial.
                </p>
                <p>
                  <b>The warranty is limited to the device.</b> We do not warrant that data which was
                  never stored on the device, including data held in a cloud account associated with
                  the device, has been deleted. We do not warrant the destruction of data on a device
                  that was not successfully wiped, and no such device is sold as though it had been.
                  Where a unit could not be wiped it is isolated, excluded from graded stock, and the
                  facts are disclosed to you.
                </p>
              </div>

              <h2 id="liability" style={{ marginTop: '2.6rem' }}>11. Liability</h2>
              <div className="prose">
                <p>
                  Nothing in these terms limits liability for death or personal injury caused by
                  negligence, for fraud or fraudulent misrepresentation, or for anything else that
                  cannot lawfully be limited.
                </p>
                <p>
                  Subject to that, our total aggregate liability arising from or in connection with a
                  consignment is limited to the invoice value of the consignment in question. Neither
                  party is liable for indirect or consequential loss, loss of profit, loss of business
                  opportunity or loss of goodwill, save in respect of our liability under the warranty of
                  grade, our liability for data, or a party&rsquo;s payment obligations.
                </p>
              </div>

              <Callout tone="plain" title="A note on why the carve-outs are there">
                <p>
                  The carve-out for grade conformity is deliberate. A grade-conformity failure is a
                  breach of what we actually sold, not a defect discovered later, and capping it below
                  the value of the goods would make the warranty on the{' '}
                  <Link href={`${base}/why-verigrade`}>Why VeriGrade</Link> page meaningless.
                </p>
              </Callout>

              <h2 id="ip" style={{ marginTop: '2.6rem' }}>12. Confidentiality and intellectual property</h2>
              <div className="prose">
                <p>
                  Each party keeps confidential the other&rsquo;s commercial information, pricing,
                  volumes and supplier identities, and uses it only for the purpose of performing this
                  contract. This obligation survives termination by three years, and indefinitely for
                  information that is a trade secret.
                </p>
                <p>
                  All intellectual property in the Grading Standard, the grade report format, the
                  certificate formats and this website remains ours. You may reproduce the Grade Report
                  and the warranty summary for the purpose of re-selling the goods, and you may reference
                  us as a supplier. You may not alter a grade report, which is both a breach of this
                  contract and a matter we will report to the relevant authority.
                </p>
              </div>

              <h2 id="compliance-both" style={{ marginTop: '2.6rem' }}>
                13. Compliance obligations, both ways
              </h2>
              <ul>
                <li className="small">
                  <b>You warrant</b> that you are authorised to trade, that your import registrations
                  and approvals are current where required, and that your intended end use is lawful in
                  the destination market.
                </li>
                <li className="small">
                  <b>You warrant</b> that you will not resell, export or re-export the goods in
                  breach of sanctions, export control or end-use restrictions.
                </li>
                <li className="small">
                  <b>You indemnify us</b> against penalties, seizure, storage or demurrage charges
                  arising from your breach of those warranties or from inaccurate information you
                  provide in order documentation.
                </li>
                <li className="small">
                  <b>We warrant</b> that we hold the entity licences we say we hold, that our invoices
                  declare true value and true condition, and that we screen orders against sanctions
                  before dispatch.
                </li>
                <li className="small">
                  <b>Either party may terminate</b> immediately where the other breaches these
                  obligations, and a failed sanctions screen stops the order regardless of who placed
                  it.
                </li>
              </ul>

              <h2 id="force" style={{ marginTop: '2.6rem' }}>14. Force majeure</h2>
              <div className="prose">
                <p>
                  Neither party is liable for failure to perform caused by an event beyond its
                  reasonable control, including natural disaster, war, civil disturbance, epidemic,
                  port or airspace closure, embargo, sanctions change, carrier failure, industrial action
                  and government action. Where a shipment is delayed beyond 60 days by such an event,
                  either party may terminate the affected order and we will refund any amount paid for
                  goods not shipped.
                </p>
              </div>

              <h2 id="law" style={{ marginTop: '2.6rem' }}>15. Governing law and disputes</h2>
              <KV
                items={[
                  { k: 'Governing law', v: 'The laws of the Dubai International Financial Centre (DIFC), and the DIFC Courts have exclusive jurisdiction' },
                  { k: 'Escalation', v: 'Commercial disputes are raised with the account contact first, then a director on each side' },
                  { k: 'Arbitration', v: 'Available by agreement. Costs are shared unless the outcome is one-sided' },
                  { k: 'Language', v: 'English. Arabic and other language documents are provided for convenience, and the English version prevails in any inconsistency' },
                  { k: 'Entire agreement', v: 'These terms, the proforma and the Grade Reports form the entire agreement' },
                  { k: 'Variation', v: 'Only in writing signed by both parties. The version in force at order date governs' },
                ]}
              />

              <div style={{ marginTop: '2.4rem' }}>
                <Callout tone="ok" title="A closing observation">
                  <p>
                    Most of this page is unremarkable and that is the intention. The unusual thing about
                    VeriGrade is not our legal framework — it is that our grade, our warranty figure and
                    our data-destruction evidence are all written down and therefore arguable. Every
                    other supplier in this market offers you the same goods with a promise. Check us on
                    the things we have committed to, and if we fail one of them, tell us.
                  </p>
                </Callout>
              </div>

              <p className="muted small" style={{ marginTop: '2rem' }}>
                {SITE.legalName} · {SITE.addressLines.join(', ')} · {SITE.email} · Terms effective{' '}
                {EFFECTIVE} · Grading Standard v{GRADING_STANDARD.version}
              </p>
            </div>

            <Toc title="On this page" items={TOC} />
          </div>
        </div>
      </section>
    </>
  );
}
