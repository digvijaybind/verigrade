import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ComplianceList, MarketStrip } from '@/components/market';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  KV,
  PageHero,
  Pill,
  TableWrap,
  Td,
  Th,
  Toc,
} from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#scope', label: '1. What this page is' },
  { href: '#not-legal', label: '2. What this is not' },
  { href: '#market', label: '3. Obligations in your market' },
  { href: '#type-approval', label: '4. The type-approval error' },
  { href: '#declaration', label: '5. Accurate declaration' },
  { href: '#our-obligations', label: '6. Ours' },
  { href: '#checklist', label: '7. A pre-shipment checklist' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  const c = getCountry(country);
  return {
    title: 'Compliance',
    description: `Import and compliance considerations for buying refurbished electronics into ${c.name}, with the buyer-side obligations flagged, the type-approval distinction explained, and an accurate-declaration policy. Guidance, not legal advice.`,
    alternates: { canonical: `/${country}/compliance` },
  };
}

export default async function CompliancePage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Guidance"
        title="Compliance"
        lead="Importing used electronics involves real obligations, and they sit with you rather than with us. This page flags the ones that matter for your market, explains the distinction suppliers most often blur, and tells you exactly what we will and will not put on a document."
        meta={
          <>
            <Pill tone="warn">Not legal advice</Pill>
            <Pill tone="info">{c.name} obligations flagged</Pill>
            <Pill tone="neutral">Verify with your own counsel</Pill>
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <a className="btn btn--primary" href={`${base}/certifications`}>
            What we hold
          </a>
          <a className="btn btn--ghost" href={`${base}/data-security`}>
            Data destruction
          </a>
        </div>
      </PageHero>

      <MarketStrip country={c} base={base} />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/compliance`, label: 'Compliance' }]} />

              <h2 id="scope">1. What this page is</h2>
              <div className="prose">
                <p>
                  This page exists because the obligations on a refurbished-electronics import are easy
                  to underestimate and expensive to get wrong, and because a supplier who says nothing
                  about it leaves you carrying the whole exposure.
                </p>
                <p>
                  What it is: a list of the things that come up repeatedly in {c.name}, written in
                  plain language, so that you can take it to the person in your organisation who owns
                  this and ask the right questions before you commit to a shipment.
                </p>
                <p>
                  It is deliberately not a legal opinion, and it is not current to the last amendment.
                  These regimes change frequently, they differ by province, state or emirate in some
                  markets, and they are interpreted differently by different brokers. If a decision
                  depends on the answer, ask a qualified adviser in your market.
                </p>
              </div>

              <h2 id="not-legal" style={{ marginTop: '3rem' }}>
                2. What this is not
              </h2>
              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Not legal advice', 'We are a trading company, not a law firm, and we do not hold ourselves out as one. Nothing here is an opinion on the application of a regulation to your specific facts.'],
                  ['Not current to the last amendment', 'Requirements in this area change often. Where a rule has been amended recently, we say so, and we would rather flag a change than quote a rule that has moved.'],
                  ['Not a substitute for your broker', 'Your freight forwarder and customs broker will know the current classification, duty treatment and entry requirements for your entity. Use them.'],
                  ['Not a compliance service', 'We supply accurate documentation and the underlying technical and origin data. We do not file registrations, obtain approvals or act as your importer of record.'],
                ].map(([k, v]) => (
                  <Callout key={k} tone="plain" title={k}>
                    <p>{v}</p>
                  </Callout>
                ))}
              </div>

              {/* ---------------------------------------- MARKET ------- */}
              <h2 id="market" style={{ marginTop: '3.5rem' }}>3. Obligations in {c.name}</h2>
              <ComplianceList country={c} />

              <Callout tone="plain" title="The pattern behind these, across every market">
                <p>
                  Consumer disclosure, an importer registration of some kind, a radio type approval
                  held by the importer, and accurate customs declaration. The specifics change by market;
                  those four themes do not. If your compliance owner is being asked for the first time,
                  those are the four areas to brief them on.
                </p>
              </Callout>

              {/* ---------------------------------------- TYPE APPROVAL - */}
              <h2 id="type-approval" style={{ marginTop: '3.5rem' }}>
                4. The type-approval error
              </h2>
              <div className="prose">
                <p>
                  This one appears often enough to be worth its own section, because it is a
                  misunderstanding that creates a real problem in a compliance file.
                </p>
                <p>
                  <b>Type approval is model-level authorisation for radio use.</b> In every market on
                  this site there is a national authority that approves handset and radio equipment
                  models for use on local networks. That approval says something about the radio
                  configuration and nothing whatsoever about the condition of a specific device.
                </p>
                <p>
                  So the following statement is wrong, and we will not make it:{' '}
                  <i>&ldquo;Our refurbished iPhones are TDRA approved.&rdquo;</i> It is a category error
                  in the same way that calling a car &ldquo;road-certified&rdquo; because its model was
                  approved is an error. What we do instead is supply the model and type references on
                  every grade report, so the file your importer needs is complete and accurate.
                </p>
              </div>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                <Card title="What type approval is" icon="globe" iconTone="info">
                  A regulator&rsquo;s authorisation that a specific model and radio configuration may
                  be used on networks in that market. Held by the importer or the local responsible
                  party, not by the condition of any individual device.
                </Card>
                <Card title="What it is not" icon="alert" iconTone="warn">
                  It is not a quality mark, not a condition grade, and not a statement that a device
                  conforms to any refurbishment standard. Using it as one puts the wrong reference in
                  your file.
                </Card>
              </div>

              {/* ---------------------------------------- DECLARATION --- */}
              <h2 id="declaration" style={{ marginTop: '3.5rem' }}>5. Accurate declaration</h2>
              <div className="prose">
                <p>
                  Used goods must be declared as used goods, at a true value, with an accurate
                  description. Declaring refurbished handsets as new is not a grey area — in most
                  markets it is a serious misdeclaration, and the liability does not end at clearance.
                  It follows the goods.
                </p>
                <p>
                  We declare true value and true condition on every commercial invoice and certificate
                  of origin. We will not under-invoice to win a sale, and we will not support a
                  transshipment or end-use declaration that understates the final destination. If a
                  broker asks us to describe goods as something they are not, the answer is no, and it
                  is the same answer whatever the volume.
                </p>
              </div>

              <Callout tone="bad" title="Where misdeclaration bites you">
                <p>
                  Post-clearance audits, duty reassessment with retrospective liability, and — in some
                  markets — criminal exposure for the party that made the declaration. This is not a
                  theoretical risk to be balanced against a few percent of margin.
                </p>
              </Callout>

              {/* ---------------------------------------- OURS --------- */}
              <h2 id="our-obligations" style={{ marginTop: '3.5rem' }}>
                6. Our obligations, and how you can check them
              </h2>
              <KV
                items={[
                  { k: 'Entity licences', v: 'Trade licence, freezone licence and VAT registration, published on the certifications page with an honest status' },
                  { k: 'Accurate invoicing', v: 'True value, true condition, named Incoterm and named place on every invoice' },
                  { k: 'Export documentation', v: 'Certificate of origin, commercial invoice, packing list and dangerous-goods declaration where applicable' },
                  { k: 'Sanctions screening', v: 'Orders screened before dispatch, and a failed screen stops the order' },
                  { k: 'End-use accuracy', v: 'We will not support declarations that understate destination or end use' },
                  { k: 'Data handling', v: 'Per-unit destruction certificates under a published standard, with the limitations stated openly' },
                ]}
              />

              <div style={{ marginTop: '1.6rem' }}>
                <Callout tone="ok" title="What you can verify independently">
                  <p>
                    DAFZA&rsquo;s public company register, the UAE Federal Tax Authority VAT register,
                    the certificate register of any certifier we name, and the certificate number printed
                    on our{' '}
                    <Link href={`${base}/certifications`}>certifications page</Link>. We would rather you
                    checked all four than took our word for any of them.
                  </p>
                </Callout>
              </div>

              {/* ---------------------------------------- CHECKLIST ----- */}
              <h2 id="checklist" style={{ marginTop: '3.5rem' }}>
                7. A pre-shipment checklist
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Run this before you instruct a shipment, not after it is on a vessel. Most of it takes
                an hour with the right person in the room.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Check</Th>
                    <Th scope="col">Why</Th>
                    <Th scope="col">Owner</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Import registration current</Td>
                    <Td>EPR, type approval or equivalent. Without it the goods clear and then stop.</Td>
                    <Td>Your compliance owner</Td>
                  </tr>
                  <tr>
                    <Td strong>Duty treatment confirmed</Td>
                    <Td>Valuation of used electronics is contested in several markets.</Td>
                    <Td>Your broker</Td>
                  </tr>
                  <tr>
                    <Td strong>Model list checked against approved lists</Td>
                    <Td>A model not on the local approved list can attract import restrictions.</Td>
                    <Td>You, with us</Td>
                  </tr>
                  <tr>
                    <Td strong>Consumer labelling requirements</Td>
                    <Td>Condition disclosure and warranty information in the required languages.</Td>
                    <Td>Your compliance owner</Td>
                  </tr>
                  <tr>
                    <Td strong>Battery transport position</Td>
                    <Td>Air versus sea, and the state-of-charge requirements that apply.</Td>
                    <Td>Your forwarder, with us</Td>
                  </tr>
                  <tr>
                    <Td strong>Warranty pass-through</Td>
                    <Td>Whether a written warranty on your resale creates obligations you have checked.</Td>
                    <Td>Your compliance owner</Td>
                  </tr>
                  <tr>
                    <Td strong>Our entity verified</Td>
                    <Td>Register lookup, licence extract, VAT certificate.</Td>
                    <Td>Your procurement</Td>
                  </tr>
                  <tr>
                    <Td strong>Insurance basis confirmed</Td>
                    <Td>Full invoice value plus freight, and who places the policy.</Td>
                    <Td>Your logistics</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Send us your model list and your registration status, and we will flag anything that will stop it at clearance."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Read the FAQ', href: `${base}/faq` }}
                >
                  It costs nothing and it is the fastest way to find out whether your timeline is
                  realistic. Compliance questions are welcome at{' '}
                  <a href={`mailto:${SITE.complianceEmail}`}>{SITE.complianceEmail}</a>.
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
