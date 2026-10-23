import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  Eyebrow,
  KV,
  PageHero,
  Pill,
  Placeholder,
  SectionHead,
  TableWrap,
  Td,
  Th,
  Toc,
} from '@/components/ui';
import { isCountryCode } from '@/lib/countries';
import { REGISTRATIONS, regValue, SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#principle', label: '1. The principle' },
  { href: '#certificates', label: '2. Certificate register' },
  { href: '#entity', label: '3. Legal entity & licences' },
  { href: '#marks', label: '4. Marks we do not use' },
  { href: '#how-to-check', label: '5. How to verify us' },
  { href: '#partners', label: '6. Partners & suppliers' },
];

/**
 * Certification status is deliberately honest.
 *
 * Nothing here claims a certificate we do not hold. Rows with a PENDING
 * placeholder render with a visible amber treatment so the page cannot be
 * published while a claim is still outstanding. That is the point of the
 * company, and it would be incoherent to fake this page.
 */

type CertRow = {
  area: string;
  scheme: string;
  status: 'held' | 'progress' | 'not-held';
  number?: string;
  certifier?: string;
  scope?: string;
  issued?: string;
  expiry?: string;
  register?: string;
  note: string;
};

const CERTIFICATES: CertRow[] = [
  {
    area: 'Quality management',
    scheme: 'ISO 9001',
    status: 'progress',
    certifier: 'Placeholder — accredited body to be appointed',
    scope: 'Grading, testing and dispatch of refurbished devices',
    note:
      'Target award before first commercial shipment. We would rather show this as in progress than display a logo we have not earned.',
  },
  {
    area: 'Information security',
    scheme: 'ISO/IEC 27001',
    status: 'progress',
    certifier: 'Placeholder — accredited body to be appointed',
    scope: 'Asset registration, data-destruction records and traceability system',
    note:
      'In progress. The data-destruction procedure is documented and audited internally today; the third-party certification is a separate exercise and we do not conflate the two.',
  },
  {
    area: 'Environmental management',
    scheme: 'ISO 14001',
    status: 'progress',
    certifier: 'Placeholder — accredited body to be appointed',
    scope: 'Waste routing for non-sellable and Grade D inventory',
    note:
      'In progress. Note what we do not claim: we hold no R2 or e-Stewards certification and therefore display no such logo.',
  },
  {
    area: 'Data handling, enterprise',
    scheme: 'ADISA member / Privacy Enhancing Technologies',
    status: 'progress',
    certifier: 'ADISA',
    scope: 'To be confirmed on application',
    note:
      'Application in progress. Membership is not certification and we will describe it accurately when it is granted.',
  },
  {
    area: 'Recycling & circularity, enterprise',
    scheme: 'R2v3 / e-Stewards',
    status: 'not-held',
    note:
      'Not held. Some competitors display an R2 or e-Stewards mark on refurbished handsets. Those schemes address electronics recycling and IT asset disposition, and a refurbisher should be able to produce the certificate number. If a supplier shows the logo, ask for the number and check it on the scheme’s own register.',
  },
  {
    area: 'Product conformity, UAE',
    scheme: 'ECAS / ESMA conformity for supplied chargers and power supplies',
    status: 'not-held',
    note:
      'Not held by us, because conformity attaches to the product and to the party placing it on the UAE market — which is the importer, not the upstream refurbisher. We supply the certificate references for the chargers in your lot. We do not display a conformity mark as though it were ours.',
  },
  {
    area: 'Telecom type approval, UAE',
    scheme: 'TDRA handset type approval',
    status: 'not-held',
    note:
      'Not applicable to us and not claimed. TDRA approves models and radio configurations for use in the UAE; it does not certify condition grades. We supply the model and type reference for your registration file. Calling a refurbished handset “TDRA approved” is a category error and we will not put it in a listing.',
  },
  {
    area: 'Battery transport',
    scheme: 'IATA / UN 38.3 lithium battery handling',
    status: 'held',
    certifier: 'Freight forwarder declaration, issued per consignment',
    scope: 'Air-freight packing and documentation for shipments containing lithium cells',
    note:
      'Supplied per consignment by the carrier handling the shipment, and the dangerous-goods declaration is included in your documentation pack. This is a transport requirement, not a quality certification.',
  },
];

const STATUS_META = {
  held: { tone: 'ok' as const, label: 'Held' },
  progress: { tone: 'warn' as const, label: 'In progress' },
  'not-held': { tone: 'bad' as const, label: 'Not held' },
};

export default async function CertificationsPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const base = `/${country}`;

  return (
    <>
      <PageHero
        eyebrow="Evidence"
        title="Certificate numbers, or nothing"
        lead="A certification logo is an image. A certificate number can be looked up on the issuing body's own register, by anyone, without asking us. This page is the second half of the company."
        meta={
          <>
            <Pill tone="ok">Register links provided</Pill>
            <Pill tone="warn">In-progress items shown as in progress</Pill>
            <Pill tone="neutral">No unevidenced marks</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/certifications`, label: 'Certifications' }]} />

              <div className="prose" id="principle">
                <h2>1. The principle</h2>
                <p>
                  In our audit of Gulf refurbishment suppliers, the most common pattern was a row of
                  certification logos with no number, no certifier, no scope and no expiry. Five of the
                  sites carried badge walls. Not one would give you a resolvable reference.
                </p>
                <p>
                  A logo is worth nothing in a dispute. A certificate number is worth everything,
                  because it can be verified independently. So the rule here is simple:{' '}
                  <b>if we cannot evidence it, we do not display it</b> — and if it is in progress, we
                  say that instead of implying otherwise.
                </p>
              </div>

              <Callout tone="plain" title="What that means when you read the table below">
                <p>
                  You will see several items marked <b>in progress</b> and several marked{' '}
                  <b>not held</b>. A less scrupulous site would either omit those rows or show a badge
                  anyway. We think the honest version is more useful: it tells you exactly what is
                  backed today and what is on the way, and it gives you the vocabulary to ask anyone
                  else the same question.
                </p>
              </Callout>

              {/* --------------------------------------- CERT REGISTER ---- */}
              <h2 id="certificates" style={{ marginTop: '3rem' }}>
                2. Certificate register
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Status as at the date of this page. Where a number exists, the register link points at
                the issuing body&rsquo;s own database.
              </p>

              <div style={{ display: 'grid', gap: '1.1rem' }}>
                {CERTIFICATES.map((c) => {
                  const meta = STATUS_META[c.status];
                  return (
                    <article
                      className="card"
                      key={c.area + c.scheme}
                      style={
                        c.status === 'not-held'
                          ? { borderStyle: 'dashed' }
                          : c.status === 'progress'
                            ? { borderColor: 'var(--warn)' }
                            : { borderColor: 'var(--brand)' }
                      }
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: '1rem',
                          flexWrap: 'wrap',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: '260px' }}>
                          <div
                            style={{
                              display: 'flex',
                              gap: '.6rem',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              marginBottom: '.5rem',
                            }}
                          >
                            <h3 style={{ fontSize: '1.08rem' }}>{c.scheme}</h3>
                            <Pill tone={meta.tone}>{meta.label}</Pill>
                          </div>
                          <p className="small" style={{ color: 'var(--muted)', marginBottom: '.9rem' }}>
                            <b style={{ color: 'var(--ink)' }}>Area:</b> {c.area}
                            {c.scope ? (
                              <>
                                {' '}
                                · <b style={{ color: 'var(--ink)' }}>Scope:</b> {c.scope}
                              </>
                            ) : null}
                          </p>

                          <TableWrap>
                            <tbody>
                              {c.status === 'held' ? (
                                <>
                                  <tr>
                                    <Td strong mono>
                                      Number
                                    </Td>
                                    <Td mono>{c.number ?? <Placeholder>CERT-NO-PENDING</Placeholder>}</Td>
                                  </tr>
                                  <tr>
                                    <Td strong>Certifier</Td>
                                    <Td>{c.certifier ?? '—'}</Td>
                                  </tr>
                                  <tr>
                                    <Td strong>Issued / expires</Td>
                                    <Td mono>
                                      {c.issued ?? <Placeholder>YYYY-MM-DD</Placeholder>} →{' '}
                                      {c.expiry ?? <Placeholder>YYYY-MM-DD</Placeholder>}
                                    </Td>
                                  </tr>
                                  {c.register ? (
                                    <tr>
                                      <Td strong>Register</Td>
                                      <Td>
                                        <a href={c.register} rel="noreferrer noopener" target="_blank">
                                          Verify independently ↗
                                        </a>
                                      </Td>
                                    </tr>
                                  ) : null}
                                </>
                              ) : c.status === 'progress' ? (
                                <>
                                  <tr>
                                    <Td strong>Certifier</Td>
                                    <Td>{c.certifier ?? <Placeholder>BODY-PENDING</Placeholder>}</Td>
                                  </tr>
                                  <tr>
                                    <Td strong>Target</Td>
                                    <Td mono>
                                      <Placeholder>QUARTER-PENDING</Placeholder>
                                    </Td>
                                  </tr>
                                </>
                              ) : (
                                <tr>
                                  <Td strong>Status</Td>
                                  <Td>
                                    No application made. We do not display this mark and we do not
                                    describe ourselves as certified against it.
                                  </Td>
                                </tr>
                              )}
                            </tbody>
                          </TableWrap>

                          <p
                            className="small"
                            style={{
                              marginTop: '.9rem',
                              paddingTop: '.8rem',
                              borderTop: '1px solid var(--line)',
                              color: 'var(--muted)',
                            }}
                          >
                            {c.note}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <Callout tone="bad" title="A practical test you can run on any supplier, including us" >
                <p>
                  Pick any certification mark a supplier displays. Ask for the certificate number, the
                  certifying body, the scope, the issue date and the expiry date. Then look the number up
                  on the certifying body&rsquo;s own register. If any of the five answers is missing, or
                  the number does not resolve, the logo is decoration. Send us that same email — we will
                  answer it in a day.
                </p>
              </Callout>

              {/* --------------------------------------- ENTITY ----------- */}
              <h2 id="entity" style={{ marginTop: '3.5rem' }}>
                3. Legal entity and licences
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The other half of verification is being able to establish who you are wiring money to.
                That information is below and in the footer of every page.
              </p>

              <div className="entity">
                <h4>Registered particulars</h4>
                <div className="kv">
                  <div className="kv-row">
                    <dt>Registered name</dt>
                    <dd>{SITE.legalName}</dd>
                  </div>
                  <div className="kv-row">
                    <dt>Trading name</dt>
                    <dd>{SITE.name}</dd>
                  </div>
                  <div className="kv-row">
                    <dt>Free zone</dt>
                    <dd>Dubai Airport Freezone Authority, Dubai, UAE</dd>
                  </div>
                  <div className="kv-row">
                    <dt>Licence number</dt>
                    <dd>
                      <Placeholder>{regValue(REGISTRATIONS.dafzaLicense)}</Placeholder>
                    </dd>
                  </div>
                  <div className="kv-row">
                    <dt>Trade licence</dt>
                    <dd>
                      <Placeholder>{regValue(REGISTRATIONS.tradeLicence)}</Placeholder>
                    </dd>
                  </div>
                  <div className="kv-row">
                    <dt>VAT registration</dt>
                    <dd>
                      <Placeholder>{regValue(REGISTRATIONS.vatNumber)}</Placeholder>
                    </dd>
                  </div>
                  <div className="kv-row">
                    <dt>Registered address</dt>
                    <dd>{SITE.addressLines.join(', ')}</dd>
                  </div>
                  <div className="kv-row">
                    <dt>Sales</dt>
                    <dd>{SITE.email}</dd>
                  </div>
                  <div className="kv-row">
                    <dt>Compliance &amp; data</dt>
                    <dd>{SITE.complianceEmail}</dd>
                  </div>
                </div>
              </div>

              <Callout tone="warn" title="Why these fields are still pending">
                <p>
                  The registrations have not been issued yet. Rather than printing placeholder numbers
                  that look real, we leave them visibly pending. <b>This page must be completed before
                  the site is published.</b> A site that displays a plausible-looking licence number it
                  cannot produce on request has destroyed the only thing it was built on.
                </p>
              </Callout>

              <div style={{ marginTop: '2rem' }}>
                <Card title="What we will send you before your first order" icon="doc" iconTone="info">
                  <p style={{ marginBottom: '.8rem' }}>
                    So that you do not have to take our word for any of it:
                  </p>
                  <ul style={{ paddingLeft: '1.05rem' }}>
                    <li className="small">Extract of the trade licence, dated within 30 days</li>
                    <li className="small">VAT registration certificate</li>
                    <li className="small">Free zone licence</li>
                    <li className="small">Certificate of incorporation</li>
                    <li className="small">Bank account details matching the legal entity name exactly</li>
                    <li className="small">Two trade references, with contact details, on request</li>
                    <li className="small">Beneficial-ownership declaration on request</li>
                  </ul>
                </Card>
              </div>

              {/* --------------------------------------- MARKS ----------- */}
              <h2 id="marks" style={{ marginTop: '3.5rem' }}>
                4. Marks we do not use
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                These claims appear constantly in this market. We do not make them, and it is worth
                knowing why.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  [
                    '“TDRA approved” on a refurbished phone',
                    'TDRA approves handset models and radio configurations for use in the UAE. It does not certify condition. Calling a graded handset “TDRA approved” misrepresents a type approval as a quality mark, and your local compliance file ends up with the wrong reference.',
                  ],
                  [
                    '“ESMA certified” on a mobile phone',
                    'ESMA conformity applies to specific regulated electrical and safety categories. A handset is not in that category. The claim is simply wrong, and we have seen it in listings.',
                  ],
                  [
                    'R2 or e-Stewards on a refurbished handset',
                    'Those schemes address electronics recycling and IT asset disposition. If a refurbisher displays the mark, ask for the number and check the scheme register. We hold neither and display neither.',
                  ],
                  [
                    '“100% genuine parts” across a mixed pallet',
                    'A meaningful share of refurbished stock has a replaced display, battery or camera module, and a meaningful share of that cannot pass a genuine-parts diagnostic. The honest statement is per-unit parts status, which is what we publish.',
                  ],
                  [
                    '“Fully tested” with no test list',
                    'Testing is a claim about coverage, not about effort. We publish the actual test points — 11 for a phone, 24 for a laptop — so you can see what was and was not checked.',
                  ],
                  [
                    'A guarantee longer than the parts supply',
                    'A 24-month warranty on a device whose mainboard we may not hold is a promise we cannot keep. Our warranty period is set by what we can actually source, and it is the same number everywhere.',
                  ],
                ].map(([k, v]) => (
                  <Callout key={k} tone="bad" title={k}>
                    <p>{v}</p>
                  </Callout>
                ))}
              </div>

              {/* --------------------------------------- CHECK ----------- */}
              <h2 id="how-to-check" style={{ marginTop: '3.5rem' }}>
                5. How to verify us
              </h2>
              <div className="steps">
                {[
                  {
                    t: 'Ask for the licence numbers and match them to the entity name',
                    d: 'The name on the bank account must match the legal entity name exactly. A personal account, or a trading name with no registered entity behind it, is the single most common red flag in this trade.',
                  },
                  {
                    t: 'Look the free zone licence up on the authority’s own register',
                    d: 'DAFZA publishes company details. You do not need to ask us, and you do not need to take our word for anything.',
                  },
                  {
                    t: 'Ask for a certificate number and check the issuing body’s register',
                    d: 'For anything marked “held” above. For anything marked “in progress”, ask what the target date is and hold us to it.',
                  },
                  {
                    t: 'Request a specimen pack before you commit',
                    d: 'Grade report, destruction certificate, invoice, packing list, warranty summary. Any supplier who will not send these before a first order is telling you something.',
                  },
                  {
                    t: 'Test us on the hardest question',
                    d: 'Ask what happens to a Grade A that arrives as a Grade C, or what a certificate looks like when destruction verification fails. If the answer is vague, the process does not exist.',
                  },
                ].map((s) => (
                  <div className="step" key={s.t}>
                    <div>
                      <h4>{s.t}</h4>
                      <p>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* --------------------------------------- PARTNERS ------- */}
              <h2 id="partners" style={{ marginTop: '3.5rem' }}>
                6. Partners and suppliers
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                We buy from a small number of named sources, most of them corporate off-lease and
                trade-in programmes. We do not buy from open auctions, which is worth knowing: auction
                stock is where the mis-grading and the missing-serial problems come from.
              </p>

              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                {[
                  ['Corporate off-lease', 'Enterprise and public-sector device return programmes. Volume, consistent grading inputs, good documentation culture.'],
                  ['Carrier and retailer trade-in', 'Consumer trade-in flows. Wide grade spread, strong parts supply, higher incoming variance.'],
                  ['Distributor stock, named origin', 'Pallets from established importers with paperwork we can verify before acceptance.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="truck">
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="plain" title="We do not buy from open auction">
                <p>
                  Auction lots are the primary source of serial-number mismatches, tampered batteries,
                  and grade inflation. They are also the cheapest stock available, which is exactly why
                  they are everywhere. If you need a price at that level, ask us about AB raw and Grade D
                  — we will tell you honestly where that grade can and cannot be used.
                </p>
              </Callout>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Check us the way we would check a supplier."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Read the grading standard', href: `${base}/grading-standard` }}
                >
                  Ask for the licence extract, a specimen pack, and the answer to the hardest question in
                  section 5. If any of it is slow or vague, that is information too.
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
