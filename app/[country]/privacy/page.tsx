import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Callout, Crumbs, KV, PageHero, Pill, TableWrap, Td, Th, Toc } from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const LAST_UPDATED = '2026-01-15';

const TOC = [
  { href: '#who', label: '1. Who we are' },
  { href: '#what-we-collect', label: '2. What we collect' },
  { href: '#basis', label: '3. Why we hold it' },
  { href: '#sharing', label: '4. Who we share it with' },
  { href: '#transfers', label: '5. Cross-border transfers' },
  { href: '#retention', label: '6. How long we keep it' },
  { href: '#your-rights', label: '7. Your rights' },
  { href: '#cookies', label: '8. Cookies' },
  { href: '#device-data', label: '9. Device data' },
  { href: '#security', label: '10. Security' },
  { href: '#contact-dpo', label: '11. Contact' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Privacy notice',
    description:
      'How VeriGrade Electronics FZ-LLC handles business contact data, enquiry data, website analytics and device data — including the limits of our data-destruction guarantee.',
    alternates: { canonical: `/${country}/privacy` },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy notice"
        lead={`How ${SITE.legalName} handles personal data, in the plainest terms we can manage. This notice covers this website, our quotation process and our trading relationship. Last updated ${LAST_UPDATED}.`}
        meta={
          <>
            <Pill tone="neutral">Last updated {LAST_UPDATED}</Pill>
            <Pill tone="info">B2B only — no consumer sales</Pill>
            <Pill tone="neutral">No data resale, ever</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/privacy`, label: 'Privacy' }]} />

              <h2 id="who">1. Who we are</h2>
              <div className="prose">
                <p>
                  {SITE.legalName}, a company registered in the {SITE.origin}, is the data controller
                  for personal data handled through this website and in connection with our supply of
                  goods and services. We act as a <b>controller</b> for enquiry and trading data, and as
                  a <b>processor</b> in limited circumstances where we handle device data on behalf of a
                  source or a client.
                </p>
                <p>
                  We are a business-to-business supplier. We do not sell to consumers, and we do not
                  maintain a consumer marketing list.
                </p>
              </div>

              <KV
                items={[
                  { k: 'Controller', v: SITE.legalName },
                  { k: 'Registered', v: SITE.origin },
                  { k: 'Privacy enquiries', v: SITE.complianceEmail },
                  { k: 'Data protection framework', v: 'UAE Federal Decree-Law No. 45 of 2021, and GDPR where it applies to you as a data subject in the EU/UK' },
                ]}
              />

              <h2 id="what-we-collect" style={{ marginTop: '3rem' }}>2. What we collect</h2>
              <h3>From you</h3>
              <ul>
                <li className="small">
                  <b>Enquiry data</b> — company name, your name, email, telephone or WhatsApp, and the
                  content of your enquiry: models, quantities, destination, grade preference and notes.
                </li>
                <li className="small">
                  <b>Trading data</b> — company registration and VAT details, importer registrations,
                  addresses, contacts, purchase order references, invoices, delivery addresses,
                  consignment records and correspondence.
                </li>
                <li className="small">
                  <b>Account and technical data</b> — if you use the website, standard server logs
                  including IP address, user agent, requested URL and timestamp.
                </li>
              </ul>

              <h3>From the devices we process</h3>
              <ul>
                <li className="small">
                  <b>Device identifiers</b> — serial number, IMEI or MEID, hardware model, network
                  variant.
                </li>
                <li className="small">
                  <b>Condition and test data</b> — cosmetic inspection results, functional test
                  results, battery health and cycle count, parts status.
                </li>
                <li className="small">
                  <b>Data-destruction evidence</b> — the certificate reference, the method applied, the
                  verification result and the date.
                </li>
              </ul>

              <Callout tone="warn" title="We do not want the contents, and we do not keep them">
                <p>
                  We do not read, retain, copy or process the personal content of a device. We destroy
                  it, verify the destruction, and record evidence that we did. If a device arrives with
                  data we could not destroy, we isolate it and it does not enter graded stock — we will
                  tell you and agree the disposition with you in writing.
                </p>
              </Callout>

              <h2 id="basis" style={{ marginTop: '3rem' }}>3. Why we hold it</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Data</Th>
                    <Th scope="col">Basis</Th>
                    <Th scope="col">Retention</Th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ['Enquiry data', 'Performance of a contract at your request, or taking steps prior to entering one (Art. 6(1)(b) GDPR)', 'Retained 24 months from last contact, then deleted.'],
                      ['Quotations and proformas', 'Performance of a contract; legal obligation for accounting records', 'Proformas 6 years; accounting records per UAE retention requirements.'],
                      ['Invoices and shipping records', 'Legal obligation, and customs and tax requirements', '6 years, or longer where a destination market requires it.'],
                      ['Warranty and claim records', 'Performance of a contract, and defence of legal claims', 'Warranty term plus 2 years.'],
                      ['Certificate and audit records', 'Legal obligation; demonstrating conformity to a published standard', '7 years.'],
                      ['Server logs', 'Legitimate interest in operating and securing the website', '30 days, then aggregated or deleted.'],
                      ['Device data-destruction evidence', 'Legal obligation; demonstrating compliance in the chain of supply', '7 years, or the period required by the destination market.'],
                    ] as const
                  ).map((r) => (
                    <tr key={r[0]}>
                      <Td strong>{r[0]}</Td>
                      <Td>{r[1]}</Td>
                      <Td>{r[2]}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <h2 id="sharing" style={{ marginTop: '3rem' }}>4. Who we share it with</h2>
              <div className="prose">
                <p>
                  We share personal data only with the categories of recipient below, and only where it
                  is necessary for the purpose stated.
                </p>
              </div>
              <ul>
                <li className="small">
                  <b>Freight forwarders and carriers</b> — consignee and contact details required to
                  move the goods, and the dangerous-goods information required for the shipment.
                </li>
                <li className="small">
                  <b>Customs authorities and agents</b> — where required for export, transit or import
                  documentation, and sanctions screening.
                </li>
                <li className="small">
                  <b>Certification and inspection bodies</b> — where a scheme we participate in requires
                  an audit submission.
                </li>
                <li className="small">
                  <b>Payment and banking institutions</b> — for the execution of the payment
                  transaction.
                </li>
                <li className="small">
                  <b>Professional advisers and authorities</b> — auditors, legal advisers, regulators
                  and law enforcement where we are obliged or permitted to disclose.
                </li>
                <li className="small">
                  <b>Our website hosting and analytics providers</b> — as processors, under contract.
                </li>
              </ul>

              <Callout tone="bad" title="What we do not do">
                <p>
                  We do not sell, rent or trade personal data. We do not add enquiry contacts to a
                  marketing list. We do not share one buyer&rsquo;s data, pricing or volumes with
                  another. We do not disclose the identity of a client or a source in any public
                  document, including certificates and case studies.
                </p>
              </Callout>

              <h2 id="transfers" style={{ marginTop: '3rem' }}>5. Cross-border transfers</h2>
              <div className="prose">
                <p>
                  We are established in the United Arab Emirates and our data is held there. Shipping
                  goods to you necessarily involves sharing the consignee information in your country
                  with the carrier and, where relevant, with customs authorities. Those transfers are
                  necessary for the performance of our contract with you.
                </p>
                <p>
                  Where a recipient is outside the UAE or the EEA, we rely on an appropriate safeguard —
                  standard contractual clauses, an adequacy decision, or the transfer being necessary for
                  the performance of the contract. We do not use a processor outside those frameworks
                  without one.
                </p>
              </div>

              <h2 id="retention" style={{ marginTop: '3rem' }}>6. How long we keep it</h2>
              <div className="prose">
                <p>
                  We keep trading and certificate records because we are required to, and because a
                  warranty claim or a customs audit can arrive years after a shipment. The periods are
                  set out in the table in section 3. When a period ends, the data is deleted or
                  irreversibly anonymised.
                </p>
                <p>
                  Device-level destruction evidence is retained longer than most trading records on
                  purpose: it is the evidence a buyer&rsquo;s compliance owner may need years later, and
                  a certificate that has been deleted is not evidence of anything.
                </p>
              </div>

              <h2 id="your-rights" style={{ marginTop: '3rem' }}>7. Your rights</h2>
              <div className="prose">
                <p>
                  Subject to the law that applies to you, you may have the right to access the personal
                  data we hold about you, to have it corrected, erased or restricted, to object to or
                  restrict certain processing, to receive it in a portable form, and to object to
                  processing based on legitimate interests. Where processing is based on consent, you
                  may withdraw it at any time.
                </p>
                <p>
                  Some of this does not apply in the same way to a purely contractual business
                  relationship, and we may be obliged to retain records we would otherwise delete. If
                  we cannot comply with a request, we will tell you why.
                </p>
              </div>

              <KV
                items={[
                  { k: 'How to make a request', v: `Email ${SITE.complianceEmail} from the business email address registered with us` },
                  { k: 'Identity verification', v: 'We will confirm which entity and which individual you are before disclosing anything' },
                  { k: 'Response time', v: 'Within 30 days, extendable by 60 days for complex requests with notice' },
                  { k: 'Complaints', v: `To ${SITE.complianceEmail}, or to the competent data protection authority in your jurisdiction` },
                ]}
              />

              <h2 id="cookies" style={{ marginTop: '3rem' }}>8. Cookies</h2>
              <div className="prose">
                <p>
                  This site uses only the cookies and storage necessary to make it work — your country
                  and language selection, and anonymous, aggregated analytics to tell us which pages are
                  useful. We do not run advertising cookies, we do not build cross-site profiles, and we
                  do not run third-party advertising trackers.
                </p>
                <p>
                  If analytics are enabled at all, they are configured to record no personal data and
                  to respect any browser signal sent to us. The country selector stores a single
                  preference in your browser so the site opens in the right market next time.
                </p>
              </div>

              <h2 id="device-data" style={{ marginTop: '3rem' }}>
                9. Device data, and the limits of our guarantee
              </h2>
              <div className="prose">
                <p>
                  This is the part buyers ask about most, and the part where a privacy notice is most
                  likely to overstate what a supplier can actually do. So here is the honest version.
                </p>
              </div>

              <Callout tone="ok" title="What we do">
                <p>
                  We apply a documented, published data-destruction method to every device before
                  testing, verify the destruction by reading the target volume back, and issue a
                  certificate per serial. The evidence is retained for seven years.
                </p>
              </Callout>

              <Callout tone="bad" title="What we cannot do, and what nobody can">
                <p>
                  We cannot delete data that was never on the device. If the previous owner synced
                  photos, messages, files or authentication tokens to a cloud account, that data is not
                  on the handset and no wipe reaches it. We also cannot guarantee that a failed device
                  can be wiped at all, and we do not sell one as though we had. Full detail, including
                  the failure routes and the categories we exclude, is on the{' '}
                  <Link href={`${base}/data-security`}>data security page</Link>. We would rather state
                  the limit here than have a certificate relied upon for more than it means.
                </p>
              </Callout>

              <h2 id="security" style={{ marginTop: '3rem' }}>10. Security</h2>
              <ul>
                <li className="small">
                  Access to trading and device data is restricted to personnel who need it for their
                  role, and is reviewed on a defined cycle.
                </li>
                <li className="small">
                  The website is served over TLS. Administrative access requires multi-factor
                  authentication.
                </li>
                <li className="small">
                  Device data is not retained beyond the evidence needed to demonstrate destruction —
                  we do not keep a copy of anything we destroy, which is the point.
                </li>
                <li className="small">
                  Documented processes for data-destruction, grade dispute handling and certificate
                  issuance, and a data incident procedure with a defined notification path.
                </li>
              </ul>

              <p className="muted small" style={{ marginTop: '1.2rem' }}>
                A precise technical security description is available on request for buyers with a
                supplier security review process. We would rather provide the real document than a
                summary written for a website.
              </p>

              <h2 id="contact-dpo" style={{ marginTop: '3rem' }}>11. Contact</h2>
              <KV
                items={[
                  { k: 'Privacy and compliance', v: SITE.complianceEmail },
                  { k: 'Sales', v: SITE.email },
                  { k: 'Controller', v: `${SITE.legalName}, ${SITE.addressLines.join(', ')}` },
                  { k: 'Effective', v: LAST_UPDATED },
                ]}
              />

              <div style={{ marginTop: '2.4rem' }}>
                <Callout tone="plain" title="This notice is a summary, not a substitute">
                  <p>
                    It is written to be read, which is not always compatible with being a complete
                    article of association with the law. If you need a full data processing agreement,
                    annexes, a sub-processor list or a completed standard contractual clauses package for
                    a supplier onboarding process, ask{' '}
                    <a href={`mailto:${SITE.complianceEmail}`}>{SITE.complianceEmail}</a> and we will
                    send the real document.
                  </p>
                </Callout>
              </div>
            </div>

            <Toc title="On this page" items={TOC} />
          </div>
        </div>
      </section>
    </>
  );
}
