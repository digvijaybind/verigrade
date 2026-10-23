import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import QuoteForm from '@/components/QuoteForm';
import {
  Callout,
  Card,
  Crumbs,
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
import { GRADES } from '@/lib/grades';
import { GRADING_STANDARD, REGISTRATIONS, SITE, isPlaceholder, regValue } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#form', label: '1. Request a quote' },
  { href: '#what-to-send', label: '2. What to send' },
  { href: '#what-happens', label: '3. What happens next' },
  { href: '#direct', label: '4. Direct contact' },
  { href: '#entity', label: '5. Entity details' },
  { href: '#response', label: '6. Response times' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Contact & quote request',
    description: `Request wholesale pricing on refurbished phones and laptops into ${getCountry(country).name} from Dubai. Same-day quotes on standard requests, with entity details and document requirements taken up front.`,
    alternates: { canonical: `/${country}/contact` },
  };
}

export default async function ContactPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  const gradeOptions = GRADES.map((g) => `${g.code} — ${g.name}`);

  return (
    <>
      <PageHero
        eyebrow="Get a price"
        title="Request a quote"
        lead="Send models and quantities and you will get firm pricing on a proforma, with the document list for your destination. If you are not sure of the grade, say so — we will propose a mix rather than guess, and we will tell you if a model cannot be supplied."
        meta={
          <>
            <Pill tone="ok">Same-day quote on standard requests</Pill>
            <Pill tone="info">No account needed to start</Pill>
            <Pill tone="neutral">No marketing list</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/contact`, label: 'Contact' }]} />

              <h2 id="form">1. Request a quote</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Everything on this form is there because it changes the price or the document set. The
                fields that take thirty seconds to fill in are the ones that save a week of email.
              </p>

              <Suspense fallback={<div className="empty-note">Loading the request form…</div>}>
                <QuoteForm
                  homeCountry={c.code}
                  gradeOptions={gradeOptions}
                  defaultGrade="advise"
                  defaultModel=""
                />
              </Suspense>

              {/* ---------------------------------------- WHAT TO SEND - */}
              <h2 id="what-to-send" style={{ marginTop: '3.5rem' }}>2. What to send</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">If you have this</Th>
                    <Th scope="col">Send it</Th>
                    <Th scope="col">Why it matters</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Model list with quantities</Td>
                    <Td>One line per model with a grade preference or &ldquo;advise&rdquo;.</Td>
                    <Td>It is the only thing we cannot quote without.</Td>
                  </tr>
                  <tr>
                    <Td strong>Import registration status</Td>
                    <Td>EPR / producer-responsibility registration, type approval, or a note that you are still arranging them.</Td>
                    <Td>Determines whether DDP is possible and whether your timeline is realistic.</Td>
                  </tr>
                  <tr>
                    <Td strong>Required documents</Td>
                    <Td>What your broker and your retail channel require.</Td>
                    <Td>Some of these take weeks to obtain. Better to know now.</Td>
                  </tr>
                  <tr>
                    <Td strong>Labelling requirements</Td>
                    <Td>Language, barcode, carton format, retailer-specific inserts.</Td>
                    <Td>Labels are printed before dispatch, not after.</Td>
                  </tr>
                  <tr>
                    <Td strong>Forwarder details</Td>
                    <Td>Carrier, label format, house consignment note, nominated consolidator.</Td>
                    <Td>Avoids rebuilding cartons at the terminal.</Td>
                  </tr>
                  <tr>
                    <Td strong>Target retail price</Td>
                    <Td>If you are comfortable sharing it.</Td>
                    <Td>Lets us propose a grade mix that actually hits your margin.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="plain" title="If you send nothing but a model list">
                <p>
                  That is genuinely fine. We will come back with availability, an indicative band in
                  {` ${c.currency}`}, and the questions that would change the price. Most conversations
                  start exactly that way.
                </p>
              </Callout>

              {/* ---------------------------------------- HAPPENS ------- */}
              <h2 id="what-happens" style={{ marginTop: '3.5rem' }}>3. What happens next</h2>
              <div className="steps">
                <Step title="We check the actual lot">
                  Availability against real stock, not a system figure. If a model cannot be filled we
                  say so in the first reply.
                </Step>
                <Step title="We ask the questions that move the price">
                  Grade mix, Incoterm, destination and documentation. Two or three questions, not a
                  questionnaire.
                </Step>
                <Step title="Proforma issued">
                  Firm pricing, named Incoterm, lead time, payment terms, the document list for your
                  destination, and the warranty figure stated contractually.
                </Step>
                <Step title="You verify us, we verify you">
                  Entity check both ways before payment. It protects you and it protects us, and it is
                  faster than a dispute later.
                </Step>
                <Step title="Dispatch with the full document pack">
                  Every document listed on the proforma, assembled at the same time as the cartons.
                </Step>
              </div>

              <Callout tone="warn" title="Sanctions and end-use screening">
                <p>
                  Orders are screened against sanctions and end-use restrictions before dispatch, and a
                  failed screen stops the order regardless of who placed it. This is not a formality and
                  it is not negotiable. If your end use is unusual, describe it — an unexplained one is
                  the thing that causes delays.
                </p>
              </Callout>

              {/* ---------------------------------------- DIRECT -------- */}
              <h2 id="direct" style={{ marginTop: '3.5rem' }}>4. Direct contact</h2>
              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Sales & quotes', SITE.email, 'mail', 'Pricing, availability, documentation, proformas.'],
                  ['Compliance & certificates', SITE.complianceEmail, 'shield', 'Certificates, licences, data-destruction evidence, audit requests.'],
                  ['Telephone', SITE.phoneDisplay, 'tel', 'Dubai business hours, Sunday to Thursday.'],
                  ['WhatsApp', SITE.whatsapp, 'whatsapp', 'Fastest for availability questions and small enquiries.'],
                ].map(([k, v, icon, d]) => (
                  <Card key={k} title={k} icon={icon as 'mail'}>
                    <a
                      href={
                        v === SITE.phoneDisplay
                          ? `tel:${SITE.phone.replace(/\s/g, '')}`
                          : v === SITE.whatsapp
                            ? `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`
                            : `mailto:${v}`
                      }
                      className="strong"
                      style={{ color: 'var(--brand)', display: 'block', marginBottom: '.35rem' }}
                    >
                      {v}
                    </a>
                    <span className="small muted">{d}</span>
                  </Card>
                ))}
              </div>

              <Callout tone="info" title="Three addresses, three purposes">
                <p>
                  Sales for price and availability. Compliance for anything that will end up in your
                  audit file. General for everything else. Routing a certificate request to sales is the
                  most common cause of a slow compliance answer, and it is entirely avoidable.
                </p>
              </Callout>

              {/* ---------------------------------------- ENTITY -------- */}
              <h2 id="entity" style={{ marginTop: '3.5rem' }}>5. Entity details</h2>
              <div className="prose">
                <p>
                  These are the details that should appear on a proforma, and the ones to check against
                  a bank payment instruction. If the paying account name does not match the entity
                  below, the payment will be held.
                </p>
              </div>

              <KV
                items={[
                  { k: 'Legal entity', v: SITE.legalName },
                  { k: 'Registered address', v: SITE.addressLines.join(', ') },
                  { k: 'Sales email', v: SITE.email },
                  { k: 'Compliance email', v: SITE.complianceEmail },
                  { k: 'Telephone', v: SITE.phoneDisplay },
                  { k: 'Grading standard', v: `v${GRADING_STANDARD.version} (effective ${GRADING_STANDARD.effective})` },
                  { k: 'Default Incoterm', v: 'EXW Dubai' },
                  { k: 'Payment', v: 'Bank transfer, account in the invoicing entity name' },
                ]}
              />

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Registration</Th>
                    <Th scope="col">Value</Th>
                    <Th scope="col">Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ['Trade licence', REGISTRATIONS.tradeLicence],
                      ['VAT number', REGISTRATIONS.vatNumber],
                      ['DAFZA licence', REGISTRATIONS.dafzaLicense],
                    ] as const
                  ).map(([label, value]) => (
                    <tr key={label}>
                      <Td strong>{label}</Td>
                      <Td mono>{regValue(value)}</Td>
                      <Td>
                        {isPlaceholder(value) ? (
                          <Pill tone="warn">Pending — verify independently</Pill>
                        ) : (
                          <Pill tone="ok">Published</Pill>
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <Callout tone="warn" title="Verify us before you pay, not after">
                <p>
                  DAFZA maintains a public company register, and a licence extract, VAT certificate and
                  proof of address are supplied on request for a first transaction. If a registration on
                  this page reads as pending, that is deliberate — it is not a number we have not read
                  off a document. Please verify the entity independently regardless of what is
                  published here.
                </p>
              </Callout>

              {/* ---------------------------------------- RESPONSE ------ */}
              <h2 id="response" style={{ marginTop: '3.5rem' }}>6. Response times</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Request</Th>
                    <Th scope="col">Response</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>Standard quote request</Td>
                    <Td>Same working day</Td>
                  </tr>
                  <tr>
                    <Td>Source-specific or corporate laptop specification</Td>
                    <Td>Within 24 hours</Td>
                  </tr>
                  <tr>
                    <Td>Certificate or licence verification request</Td>
                    <Td>Within 1 working day, to the compliance address</Td>
                  </tr>
                  <tr>
                    <Td>Warranty claim acknowledgement</Td>
                    <Td>Within 2 working days of a complete claim</Td>
                  </tr>
                  <tr>
                    <Td>Warranty claim decision</Td>
                    <Td>Within 10 working days of complete evidence</Td>
                  </tr>
                  <tr>
                    <Td>Data or certificate concern</Td>
                    <Td>Same working day acknowledgement, treated as priority</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <div style={{ marginTop: '2.4rem' }}>
                <Card title="Not ready to send an enquiry?" icon="doc">
                  <p style={{ marginBottom: '.8rem' }}>
                    Read the{' '}
                    <Link href={`${base}/grading-standard`}>grading standard</Link> and the{' '}
                    <Link href={`${base}/data-security`}>data-destruction procedure</Link> first. Both
                    are public, and both are the fastest way to judge whether we are worth talking to.
                  </p>
                  <span className="small muted">
                    <Icon name="check" size={15} /> No obligation, no account, no marketing list.
                  </span>
                </Card>
              </div>
            </div>

            <Toc title="On this page" items={TOC} />
          </div>
        </div>
      </section>
    </>
  );
}
