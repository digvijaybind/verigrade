import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  PageHero,
  Pill,
  Toc,
} from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { GRADES, PHONE_TEST_POINTS } from '@/lib/grades';
import { GRADING_STANDARD, SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#ordering', label: '1. Ordering & MOQ' },
  { href: '#grading', label: '2. Grading' },
  { href: '#battery', label: '3. Battery' },
  { href: '#data', label: '4. Data & privacy' },
  { href: '#warranty', label: '5. Warranty & claims' },
  { href: '#shipping', label: '6. Shipping & Incoterms' },
  { href: '#payment', label: '7. Payment' },
  { href: '#compliance', label: '8. Compliance & documentation' },
  { href: '#sourcing', label: '9. Sourcing & models' },
];

type FaqItem = { q: string; a: React.ReactNode };

function faqFor(base: string): Record<string, FaqItem[]> {
  return {
  ordering: [
    {
      q: 'What is the minimum order?',
      a: (
        <>
          <b>MOQ is 5 units.</b> Mixed models and mixed grades within one shipment. There is no
          pallet or container minimum. Larger programmes are quoted per consignment, and the price per
          unit improves with volume and with grade discipline rather than with volume alone.
        </>
      ),
    },
    {
      q: 'Can I buy a single model line?',
      a: (
        <>
          Yes. If a model line is available, you can order five units of it. Availability is lot
          dependent, so a model being on the catalogue today does not guarantee it next week — we will
          tell you honestly rather than take the order and disappoint you.
        </>
      ),
    },
    {
      q: 'How do I get pricing?',
      a: (
        <>
          Through the <Link href={`${base}/contact`}>quote form</Link>. The bands on the catalogue pages are
          indicative planning figures in your currency, ex-works. Firm pricing is issued on a proforma
          against a confirmed quantity, grade mix and destination. The number that matters is the one
          on the proforma, and it is the same number on the invoice.
        </>
      ),
    },
    {
      q: 'How long does a quote take?',
      a: (
        <>
          Same working day for standard requests, and within 24 hours for source-specific or
          corporate laptop specifications. If we cannot meet your date, we will say so in the first
          reply rather than after you have made plans.
        </>
      ),
    },
    {
      q: 'Can I see the goods before paying?',
      a: (
        <>
          On a first transaction, yes — we can arrange a pre-shipment inspection at the Dubai
          facility, or a photo and video set of your specific serials, and we will hold dispatch until
          you have reviewed it. For an established account we supply the full per-unit documentation
          set as standard.
        </>
      ),
    },
    {
      q: 'Do you sell to consumers?',
      a: (
        <>
          No. VeriGrade is a wholesale business and our documentation assumes a commercial buyer who
          will re-sell. If you are a consumer looking to buy a refurbished device, we will point you to
          a retailer rather than sell to you on wholesale terms.
        </>
      ),
    },
  ],

  grading: [
    {
      q: 'What does the grade actually mean?',
      a: (
        <>
          Six tiers — A+, A, B, C, AB and D — resolved from two independent axes: <b>cosmetic
          condition</b> and <b>functional condition including battery</b>. The combined tier is what
          you buy. A device can look perfect and still be a B if the battery does not reach the tier
          floor. The full criteria are on the{' '}
          <Link href={`${base}/grading-standard`}>grading standard page</Link>.
        </>
      ),
    },
    {
      q: 'Why are there two axes?',
      a: (
        <>
          Because grading only the cosmetic side is how a Grade A arrives with an 82% battery. Keeping
          the axes separate means the report tells you what the device looks like <i>and</i> what it
          will do, and it means a device cannot be sold into a tier on appearance alone.
        </>
      ),
    },
    {
      q: 'Is the grading standard the same for phones and laptops?',
      a: (
        <>
          The two axes and the tier structure are the same. The test methods differ:{' '}
          {PHONE_TEST_POINTS.length} test points on a handset and{' '}
          {GRADING_STANDARD.testPointsLaptop} on a laptop, because a laptop has failure modes a phone
          does not — thermal throttling, sustained-load battery drain, firmware locks and parts pairing.
        </>
      ),
    },
    {
      q: 'Can you grade to my standard instead?',
      a: (
        <>
          Not as the default. Our standard is published precisely so that it is stable, and a
          bespoke standard defeats that. What we can do is supply the underlying per-unit data —
          cosmetic observations, test results, battery figures, parts status — so your own team can
          apply your own grading. That is usually what a serious processor actually wants.
        </>
      ),
    },
    {
      q: 'What is Grade AB, and when should I buy it?',
      a: (
        <>
          AB is functionally tested and working, but cosmetically ungraded. Buy it if you have
          grading capacity in-house and want to capture the full margin. Do not buy it if you intend
          to sell the units straight through — you would be selling ungraded stock to a customer who
          expects a graded one. The trade-off is set out on the{' '}
          <Link href={`${base}/phones#ab`}>phones page</Link>.
        </>
      ),
    },
    {
      q: 'What is Grade D, and will it contaminate my pallet?',
      a: (
        <>
          Grade D is non-functional stock, sold for spare parts and component reuse. It is sorted by
          dominant fault, counted, documented, packed separately and invoiced separately. It is never
          mixed into a graded lot — that is a physical control in our storage, not just a term on an
          invoice. It carries no warranty, because the tier is defined by non-function.
        </>
      ),
    },
    {
      q: 'Will the grade I receive match the grade I ordered?',
      a: (
        <>
          That is warranted, not hoped for. If a unit does not meet the published acceptance criteria
          for its assigned tier, it is a warranty claim regardless of whether the device works. It is
          the single strongest commercial term we offer, and it is the reason our warranty is longer
          than most in this market.
        </>
      ),
    },
  ],

  battery: [
    {
      q: 'How is battery health measured?',
      a: (
        <>
          Read from the device&rsquo;s own battery management system as a percentage of the
          manufacturer&rsquo;s design capacity, with the device fully charged, held at ambient
          temperature for at least 15 minutes, in a 20–25 °C band. Cycle count is recorded at the
          same time and reported alongside. Readings taken outside the temperature band are re-taken,
          not adjusted.
        </>
      ),
    },
    {
      q: 'What are the battery floors?',
      a: (
        <>
          A+ ≥ 95%, A ≥ 90%, B ≥ 85%, C ≥ 80% of design capacity. AB is stated per lot, not per tier.
          D is not applicable. Below {GRADING_STANDARD.lowestBatteryFloor}% a device is not sold by us
          as working in any tier — it goes to Grade D with the fault recorded, or it is offered as a
          parts unit.
        </>
      ),
    },
    {
      q: 'What happens if a device misses its floor?',
      a: (
        <>
          It is re-graded down, not sold at the tier it looks like. If a B-cosmetic device has an 82%
          battery it becomes a C. This is the rule that separates a real grade from a photograph.
        </>
      ),
    },
    {
      q: 'Is a replaced battery sold as original?',
      a: (
        <>
          No. A battery replaced to reach a tier is recorded as a replaced part on the grade report,
          and the post-replacement health reading is published. Original, OEM-grade and aftermarket are
          three distinct statuses on every report, and aftermarket is never used to lift a device into
          a higher tier.
        </>
      ),
    },
    {
      q: 'Does battery health decay after delivery?',
      a: (
        <>
          Yes, and every lithium cell does. A floor is a threshold at the point of sale, not a
          guarantee of capacity in two years. What we warrant is that the reading on the report is
          accurate and that the unit met the tier floor when it shipped. Warranty terms on battery
          are on the <Link href={`${base}/warranty`}>warranty page</Link>.
        </>
      ),
    },
    {
      q: 'Why publish cycle count on laptops?',
      a: (
        <>
          Because capacity percentage is close to meaningless on its own for an older machine. A 92%
          cell that has done 1,100 full cycles will not serve an all-day buyer the way an 88% cell that
          has done 240 cycles will. Publishing both lets you grade the battery on what actually
          predicts customer satisfaction.
        </>
      ),
    },
  ],

  data: [
    {
      q: 'How is data destroyed?',
      a: (
        <>
          <b>{GRADING_STANDARD.wipeStandard}</b> <b>Purge</b> (logical), with verification
          read-back — which means the wipe is confirmed by reading the target volume, not assumed from
          a command&rsquo;s exit code. It is applied <b>before</b> functional testing, and a certificate
          is issued per serial. The full procedure is on the{' '}
          <Link href={`${base}/data-security`}>data security page</Link>.
        </>
      ),
    },
    {
      q: 'Do I get evidence for every unit?',
      a: (
        <>
          Yes. A destruction certificate per serial, shipped with the per-unit manifest, grade reports,
          packing list and invoice. No graded unit leaves this facility without one — that is a
          statement about our process, and it is checkable on any consignment you receive.
        </>
      ),
    },
    {
      q: 'Can you guarantee the previous owner’s cloud data is gone?',
      a: (
        <>
          <b>No, and nobody honestly can.</b> If a customer synced photos, messages or files to a cloud
          account before the device reached us, that data was never on the device and no wipe can reach
          it. What we can do is destroy what is on the device, verify it, document it, and tell you
          precisely where the boundary of the guarantee sits. The{' '}
          <Link href="/data-security#limits">limitations section</Link> is the part you should read
          before relying on any certificate, ours or anyone else&rsquo;s.
        </>
      ),
    },
    {
      q: 'What if data is found on a device you certified?',
      a: (
        <>
          That is a warranty claim under the published terms, and it is handled through the compliance
          address rather than the sales one. It is treated as a serious matter because the failure mode
          is our error and the exposure is your customer&rsquo;s privacy. Contact{' '}
          {SITE.complianceEmail}.
        </>
      ),
    },
    {
      q: 'What about activation locks and device locks?',
      a: (
        <>
          Screen and OS activation locks are removed and verified by read-back. BIOS and firmware
          passwords are removed where technically possible; where they are not, the unit is downgraded
          and the reason printed on the report. Enterprise MDM locks are released only on written
          authorisation from the entity that owns the fleet. Any lock we did not disclose and that
          affects the device&rsquo;s usability is a warranty claim.
        </>
      ),
    },
    {
      q: 'Is the destruction standard certified?',
      a: (
        <>
          We use a published standard, {GRADING_STANDARD.wipeStandard}, and we publish our method and
          verification step. We do not hold a third-party data-destruction certification such as R2 or
          e-Stewards, and the <Link href={`${base}/certifications`}>certifications register</Link> says so
          explicitly rather than implying otherwise. A named, documented, verified method is what we
          can evidence today; a badge we cannot evidence is not worth printing.
        </>
      ),
    },
  ],

  warranty: [
    {
      q: 'How long is the warranty?',
      a: (
        <>
          <b>12 months from delivery on all grades A+ to C</b>, and on AB for function. Grade D has no
          warranty, which is the definition of the tier. The same figure appears on this site, on the
          standard, on your proforma and on your invoice — inconsistency between those documents is
          the easiest way for a supplier to lose a claim.
        </>
      ),
    },
    {
      q: 'What does it actually cover?',
      a: (
        <>
          Functional failure; battery falling below the published tier floor; <b>non-conformity to the
          assigned grade</b>; undisclosed activation locks; recoverable data on a device we certified;
          and IMEI blacklisting attributable to our supply chain. The full list and the full exclusion
          list are on the <Link href={`${base}/warranty`}>warranty page</Link>.
        </>
      ),
    },
    {
      q: 'What is the DOA window?',
      a: (
        <>
          7 calendar days from delivery for dead-on-arrival and transit damage claims. Carrier claims
          have to be raised in the same window. Evidence needed: serials, grade report references, a
          fault description, and photographs or a short video where relevant.
        </>
      ),
    },
    {
      q: 'Is accidental damage covered?',
      a: (
        <>
          Not by default. It is available as optional cover priced per consignment, on graded stock
          only, with a fixed excess stated on a certificate of cover. We would rather you did not buy
          it than discover the exclusions later — the terms are written out in full, and if a claim is
          declined you get the specific exclusion that was applied.
        </>
      ),
    },
    {
      q: 'How fast do you settle claims?',
      a: (
        <>
          Acknowledgement within 2 working days of a complete claim, and a decision within 10 working
          days of complete evidence, with the technician&rsquo;s assessment attached. Remedy is
          repair, replacement at equal or better grade, or credit — your choice within the first 30
          days, ours thereafter.
        </>
      ),
    },
    {
      q: 'What is the restocking fee on a return?',
      a: (
        <>
          5% on non-defective returns inside the DOA window, and <b>0% on warranty replacements and
          upheld grade-conformity claims</b>. Where units come back damaged or with altered paperwork,
          the return is re-graded and charged at landed cost — that is real work on a real machine, and
          it is what the fee funds.
        </>
      ),
    },
  ],

  shipping: [
    {
      q: 'Which Incoterms do you quote?',
      a: (
        <>
          EXW Dubai as the default, plus FOB, CIF and DAP. DDP into Lagos and Tema is available on
          the West African lane, which is usually where the real cost advantage sits. The Incoterm and
          the named place are stated on the proforma and repeated on the commercial invoice.
        </>
      ),
    },
    {
      q: 'How long does dispatch take?',
      a: (
        <>
          Stock lines 3–7 working days from confirmed payment. Source-specific requests are quoted
          individually. Transit time is separate and depends on mode and destination — ask for the
          landed estimate, not just the freight quote, because port handling and clearing costs are
          often larger than the freight.
        </>
      ),
    },
    {
      q: 'Can you ship by air?',
      a: (
        <>
          Yes, and for replenishment lots air is usually the right answer. Lithium batteries shipped by
          air are packed and documented to IATA dangerous-goods rules, and we supply the DG
          declaration with the consignment.
        </>
      ),
    },
    {
      q: 'Who arranges freight and insurance?',
      a: (
        <>
          Either. We quote against your forwarder if you have one, or arrange and consolidate through
          ours. Insurance is available and, where we arrange the carriage, cargo insurance is
          recommended for the full invoice value — transit cover ends at carrier handover unless you
          hold the policy.
        </>
      ),
    },
    {
      q: 'Do you consolidate?',
      a: (
        <>
          Yes. If you are splitting a container across importers, or combining several models into
          one consignment, we consolidate at the facility and issue per-importer manifests and invoices
          so each clearance is self-contained.
        </>
      ),
    },
    {
      q: 'What about the UAE local lane?',
      a: (
        <>
          Orders for UAE customers can be collected from the Dubai warehouse, or delivered by road
          within the Emirates. Orders can be inspected and re-graded on site before they leave, which
          is the most convenient way to start a first transaction with us.
        </>
      ),
    },
  ],

  payment: [
    {
      q: 'What are the payment terms?',
      a: (
        <>
          Bank transfer against a proforma for a first transaction, and net terms available after a
          first transaction is completed satisfactorily. The proforma is issued from the Dubai entity,
          so the paying account must match the invoicing entity name exactly — this is the single most
          common cause of a delayed first shipment.
        </>
      ),
    },
    {
      q: 'Do you accept credit card?',
      a: (
        <>
          Not for wholesale orders. Cards and finance facilities are available to us as suppliers, not
          to us as a payment method from buyers, and pretending otherwise creates a compliance problem
          for both sides.
        </>
      ),
    },
    {
      q: 'What currency will I be invoiced in?',
      a: (
        <>
          The currency of your proforma: AED, SAR, USD, CAD, GBP, HKD or AUD are all routine. The
          catalogue pages show indicative figures in your local currency for planning, but the proforma
          currency governs and the FX rate is fixed at order confirmation.
        </>
      ),
    },
    {
      q: 'Are bank charges my responsibility?',
      a: (
        <>
          Yes. Inbound SWIFT charges should be borne by the buyer so the full invoice value is
          received. Where an intermediary bank deducts fees, the order remains unpaid until the
          shortfall is cleared — worth checking before you instruct the payment.
        </>
      ),
    },
  ],

  compliance: [
    {
      q: 'Do you provide certificates of origin?',
      a: (
        <>
          Yes, as standard, along with the commercial invoice, packing list, per-unit IMEI manifest,
          grade reports and destruction certificates. Pre-shipment inspection documentation and
          certificates for batteries or chargers are prepared on request.
        </>
      ),
    },
    {
      q: 'Can you help with my country’s import requirements?',
      a: (
        <>
          We can give you the underlying data — manufacturer, model, origin, quantities, materials,
          weight, WEEE category — because that is what registrations and declarations are built from.
          We cannot give you compliance advice or handle your clearance: registrations, type approvals,
          EPR and producer-responsibility duties sit with the party importing into your market, and
          they change. The <Link href={`${base}/compliance`}>compliance page</Link> flags the specific items for
          your country so you can route them to the right person.
        </>
      ),
    },
    {
      q: 'Are your devices regulator approved?',
      a: (
        <>
          No, and that is a category error worth correcting. Type approval — TDRA, the Saudi
              Communications Commission, NCC, ICASA, ACMA and so on — is a <b>model-level
          authorisation</b> for radio use. It says nothing about condition, and it is not a quality
          mark. We supply the model and type references your registration file needs. We will not
          describe a refurbished handset as &ldquo;approved&rdquo;.
        </>
      ),
    },
    {
      q: 'What certifications do you hold?',
      a: (
        <>
          The honest answer is on the <Link href={`${base}/certifications`}>certifications register</Link>, which
          lists every scheme with a status — held, in progress, or explicitly not held. We hold no
          third-party e-waste, R2 or e-Stewards certification and we display no logo we cannot evidence
          on a certifier&rsquo;s public register.
        </>
      ),
    },
    {
      q: 'Can I verify your company independently?',
      a: (
        <>
          Yes, and you should. DAFZA maintains a public company register, and a licence extract, VAT
          certificate and proof of address are available on request for a first transaction. Our
          registrations are listed on the <Link href="/certifications#entity">entity section</Link> of
          the certifications page, with anything unverified shown as pending rather than omitted.
        </>
      ),
    },
    {
      q: 'Will you support a declaration that understates value or condition?',
      a: (
        <>
          No. We declare true value and true condition, including the used status of the goods. A
          misdeclaration creates liability for you at clearance and after delivery, and it is not a
          commercial service we offer at any margin.
        </>
      ),
    },
  ],

  sourcing: [
    {
      q: 'Where does your stock come from?',
      a: (
        <>
          Trade-in programmes, corporate off-lease and carrier returns, processed by us. We grade
          everything ourselves to our own standard regardless of how it arrived, and we record the
          source internally because it tells us how a device will age. Source details are not published
          per unit because that is commercially sensitive to the programme, but the grade does not
          depend on it.
        </>
      ),
    },
    {
      q: 'Can you source a model that is not on the catalogue?',
      a: (
        <>
          Often, yes — it depends on the model and the volume. Send the specification and quantity and
          we will tell you honestly whether it can be sourced and on what timeline. We would rather
          decline than take an order we cannot fill.
        </>
      ),
    },
    {
      q: 'What if a model is not available into my country?',
      a: (
        <>
          The catalogue pages list the lines we do not currently supply into your market, and why the
          list changes. It is usually carrier or approval lists, or lot availability, rather than a
          commercial decision. Ask us anyway; availability is lot dependent.
        </>
      ),
    },
    {
      q: 'Do you take consignments or trade-ins?',
      a: (
        <>
          Trade-ins are something we can discuss case by case — a small trade-in against a purchase
          needs enough supply behind it to make the numbers work. Consignment is not something we offer,
          because the documentation model we run depends on owning the grading decision.
        </>
      ),
    },
    {
      q: 'Do you have a physical sample I can inspect?',
      a: (
        <>
          In Dubai, yes — a pre-shipment inspection at the facility is available on request, and for
          established accounts we will ship an evaluation lot. Anywhere else, we will photograph and
          video the specific serials in your consignment and hold dispatch until you have seen them.
        </>
      ),
    },
  ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'FAQ',
    description:
      'Straight answers on ordering, grading, battery measurement, data destruction, warranty claims, Incoterms, payment terms and import compliance for refurbished phone and laptop wholesale.',
    alternates: { canonical: `/${country}/faq` },
  };
}

export default async function FaqPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;
  const FAQ = faqFor(base);

  return (
    <>
      <PageHero
        eyebrow="Straight answers"
        title="Frequently asked questions"
        lead="The questions buyers actually ask, answered without hedging. Where the honest answer is &ldquo;no&rdquo; or &ldquo;it depends&rdquo;, that is what it says."
        meta={
          <>
            <Pill tone="neutral">{Object.keys(FAQ).length} topics</Pill>
            <Pill tone="info">Answers specific to {c.name}</Pill>
            <Pill tone="neutral">No sales framing</Pill>
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <a className="btn btn--primary" href={`${base}/contact`}>
            Ask something else
          </a>
          <a className="btn btn--ghost" href={`${base}/grading-standard`}>
            The grading standard
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/faq`, label: 'FAQ' }]} />

              {Object.entries(FAQ).map(([slug, items], si) => {
                const heading: Record<string, string> = {
                  ordering: '1. Ordering and minimums',
                  grading: '2. Grading',
                  battery: '3. Battery',
                  data: '4. Data and privacy',
                  warranty: '5. Warranty and claims',
                  shipping: '6. Shipping and Incoterms',
                  payment: '7. Payment',
                  compliance: '8. Compliance and documentation',
                  sourcing: '9. Sourcing and models',
                };
                return (
                  <section key={slug} style={{ marginBottom: si === Object.keys(FAQ).length - 1 ? 0 : '3rem' }}>
                    <h2 id={slug} style={{ marginBottom: '.4rem' }}>
                      {heading[slug]}
                    </h2>
                    <p className="muted small" style={{ marginBottom: '1.2rem' }}>
                      {items.length} question{items.length > 1 ? 's' : ''}
                    </p>
                    <div style={{ display: 'grid', gap: '.6rem' }}>
                      {items.map((it) => (
                        <details className="acc" key={it.q}>
                          <summary>{it.q}</summary>
                          <div className="acc-body">
                            <p>{it.a}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                );
              })}

              <div style={{ marginTop: '3rem' }}>
                <Callout tone="plain" title="A question this page does not answer">
                  <p>
                    Ask it directly. We would rather answer an awkward question now than have it
                    surface after a consignment is on a vessel. Email{' '}
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use the{' '}
                    <Link href={`${base}/contact`}>quote form</Link>.
                  </p>
                </Callout>
              </div>

              <div className="grid grid-2" style={{ gap: '1.2rem', marginTop: '2rem' }}>
                <Card title="Grade tiers at a glance" icon="award" href={`${base}/grading-standard`}>
                  Six tiers from {GRADES[0].code} to {GRADES[GRADES.length - 1].code}, with the
                  criteria, the battery floors and the parts rules for each.
                </Card>
                <Card
                  title="What we hold, and what we do not"
                  icon="shield"
                  href={`${base}/certifications`}
                >
                  Every certification scheme with an honest status, including the ones we do not hold.
                </Card>
              </div>

              <div style={{ marginTop: '3rem' }}>
                <CtaBand
                  title="The quickest way to an answer is to send us a model list."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Warranty terms', href: `${base}/warranty` }}
                >
                  Quantities, models and your grade preference — or simply &ldquo;advise&rdquo; and
                  we will propose a mix. You will get a straight answer on availability, including the
                  models we cannot supply that week.
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
