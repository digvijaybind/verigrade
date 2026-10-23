import { notFound } from 'next/navigation';
import CertSample from '@/components/CertSample';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  Eyebrow,
  FlowStep,
  PageHero,
  Pill,
  SectionHead,
  TableWrap,
  Td,
  Th,
  Toc,
} from '@/components/ui';
import { isCountryCode } from '@/lib/countries';
import { GRADING_STANDARD, SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#problem', label: '1. The gap' },
  { href: '#standard', label: '2. The named standard' },
  { href: '#sequence', label: '3. Sequence' },
  { href: '#locks', label: '4. Activation locks & MDM' },
  { href: '#certificate', label: '5. The certificate' },
  { href: '#failures', label: '6. What we do when it fails' },
  { href: '#limits', label: '7. What we cannot do' },
  { href: '#retention', label: '8. Retention & access' },
];

export default async function DataSecurityPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const base = `/${country}`;

  return (
    <>
      <PageHero
        eyebrow="Data security"
        title="The standard nobody in this industry publishes"
        lead="There is no consumer or wholesale refurbishment programme — in the Gulf, in Europe, or in North America — that publishes its data-destruction standard. We do. And we put a certificate number on every single unit."
        meta={
          <>
            <Pill tone="ok">{GRADING_STANDARD.wipeStandard}</Pill>
            <Pill tone="info">Purge, not factory reset</Pill>
            <Pill tone="neutral">Per-unit certificate</Pill>
            <Pill tone="warn">Wipe before test</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/data-security`, label: 'Data Security' }]} />

              {/* ------------------------------------------- PROBLEM -------- */}
              <div className="prose" id="problem">
                <h2>1. The gap, stated plainly</h2>
                <p>
                  You are about to buy used phones. Somewhere in that batch is a device whose previous
                  owner had a bank app installed, a company email account open, a photo library, and
                  possibly an authenticated session on a service that pays out money.
                </p>
                <p>
                  A factory reset is not a data-destruction method. It is an operating-system command,
                  and on flash storage it typically writes a flag rather than overwriting the data. The
                  content usually survives, and it is recoverable with ordinary tooling. A serious buyer
                  in a jurisdiction with a privacy regulator — which now includes Kenya, Canada, the
                  United Kingdom, Australia and, increasingly, the Gulf — will eventually ask what you
                  did about it.
                </p>
              </div>

              <div style={{ display: 'grid', gap: '1rem', margin: '1.6rem 0 2.4rem' }}>
                <Callout tone="bad" title="What the market does instead">
                  <p>
                    A typical listing says &ldquo;factory reset&rdquo;, &ldquo;wiped&rdquo;, or nothing at
                    all. A QR code on the box may resolve to a marketing page rather than a certificate.
                    Some of the better programmes publish a badge for data handling. None of them publish
                    the standard, the method, the tool, or a resolvable per-unit reference.
                  </p>
                </Callout>
                <Callout tone="ok" title="What we publish">
                  <p>
                    The standard, the method, the tool and version, the sequence, the per-unit certificate
                    field list, the failure route, and the limits of what we are able to guarantee. All of
                    it, on this page, before you buy anything.
                  </p>
                </Callout>
              </div>

              {/* ------------------------------------------- STANDARD ------ */}
              <h2 id="standard" style={{ marginTop: '2.4rem' }}>
                2. The named standard
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                We use{' '}
                <b>{GRADING_STANDARD.wipeStandard}</b>, applying the <b>Purge</b> method. Purge is the
                middle of three sanitisation levels in that guidance — above <i>Clear</i>, below{' '}
                <i>Destroy</i>. It is the correct choice for flash storage that will be reused, and it is
                the level at which a verification read-back is meaningful.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th style={{ minWidth: 130 }} scope="col">
                      Level
                    </Th>
                    <Th scope="col">What it does</Th>
                    <Th scope="col">Appropriate for</Th>
                    <Th scope="col">Our use</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Clear</Td>
                    <Td>Overwrites all readable areas, including normally inaccessible ones.</Td>
                    <Td>Conventional magnetic media in equipment you will not resell.</Td>
                    <Td>
                      <span className="muted">Not sufficient for resold flash</span>
                    </Td>
                  </tr>
                  <tr>
                    <Td strong us>
                      Purge
                    </Td>
                    <Td>
                      Resets the media to its factory state using the manufacturer&rsquo;s supported
                      mechanism, so the data becomes unrecoverable through normal access.
                    </Td>
                    <Td>Flash storage in devices that will be resold or redeployed.</Td>
                    <Td>
                      <Pill tone="ok">This is our method</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Destroy</Td>
                    <Td>
                      Physical or cryptographic destruction making recovery infeasible regardless of
                      tooling.
                    </Td>
                    <Td>Media that must be destroyed rather than reused.</Td>
                    <Td>
                      <span className="muted">Applied to Grade D where instructed</span>
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <div className="grid grid-2" style={{ gap: '1.4rem', marginTop: '1.6rem' }}>
                <Card title="Why not Destroy?" icon="lock" iconTone="info">
                  A destroyed device has no resale value. For most of the stock we handle, Purge
                  combined with a verification read is the correct engineering trade-off — and it is the
                  level recognised by enterprise IT asset-disposal frameworks.
                </Card>
                <Card title="Why we verify" icon="check" iconTone="warn">
                  Because a purge command that fails is silent. A read-back confirms the media no longer
                  returns the previous owner&rsquo;s data. We record the result per serial, not per batch,
                  so a single failure is traceable to a single device.
                </Card>
              </div>

              {/* ------------------------------------------- SEQUENCE ----- */}
              <h2 id="sequence" style={{ marginTop: '3.5rem' }}>
                3. Sequence
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Wipe happens <b>before</b> functional testing. That ordering is deliberate and it is the
                single most important control in this document — test-first leaves an unavoidable window
                in which a wiped-looking, tested, shelved device could leave the building un-wiped.
              </p>

              <div className="flow">
                {[
                  {
                    t: '1 · Intake and asset registration',
                    d: 'Serial, IMEI/MEID, model and storage recorded against a unique asset ID. The device is logged in on receipt. Nothing is opened, powered or tested before this exists.',
                  },
                  {
                    t: '2 · Activation lock assessment',
                    d: 'Whether an activation or MDM lock is present is determined and recorded. Where a lock cannot be removed lawfully or technically, the device is routed to the locked holding area and never enters graded stock. See section 4.',
                  },
                  {
                    t: '3 · Data destruction — Purge',
                    d: `The ${GRADING_STANDARD.wipeStandard} Purge method is applied using the device&rsquo;s supported erase mechanism. Tool name and version are recorded against the asset.`,
                  },
                  {
                    t: '4 · Verification read',
                    d: 'The wiped volume is read back to confirm the previous owner’s data is no longer retrievable. Result recorded per serial as pass or fail. A failure stops the device — it does not get a warning label.',
                  },
                  {
                    t: '5 · IMEI and blacklist screening',
                    d: 'IMEI screened against blacklist sources. A flagged device is quarantined and never graded.',
                  },
                  {
                    t: '6 · Functional testing',
                    d: 'Only now does the device power on. All 11 or 24 test points run. This is deliberately late in the sequence.',
                  },
                  {
                    t: '7 · Cosmetic grading',
                    d: 'Cosmetic assessment under the standard’s fixed lighting and distance, by a named technician.',
                  },
                  {
                    t: '8 · Combined tier and certificate issue',
                    d: 'Axes combined per the standard, battery recorded, certificate numbers generated for both the destruction record and the grade report, and both bound to the asset ID.',
                  },
                  {
                    t: '9 · Pre-dispatch re-verification',
                    d: 'Certificate numbers and IMEI status re-checked before the consignment leaves. A mismatch between the physical unit and its paperwork stops dispatch.',
                  },
                ].map((s) => (
                  <FlowStep key={s.t} title={s.t}>
                    {s.d}
                  </FlowStep>
                ))}
              </div>

              <Callout tone="ok" title="The control in one sentence">
                <p>
                  There is no point in the process at which a device is shelved in saleable condition
                  before it has been wiped. That is the entire reason for the ordering.
                </p>
              </Callout>

              {/* ------------------------------------------- LOCKS -------- */}
              <h2 id="locks" style={{ marginTop: '3.5rem' }}>
                4. Activation locks and MDM
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A device with a live activation lock is not a refurbished device. It is a device that
                will lock itself again the moment it reaches a network. These are separated at intake
                and never enter graded stock.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th style={{ minWidth: 170 }} scope="col">
                      State at intake
                    </Th>
                    <Th scope="col">Action</Th>
                    <Th scope="col">Grade outcome</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>No lock</Td>
                    <Td>Proceeds to purge.</Td>
                    <Td>
                      <Pill tone="ok">Enters grading</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Screen lock only</Td>
                    <Td>
                      Device is enabled, erased at the system level and returned to setup. No prior-owner
                      account is associated.
                    </Td>
                    <Td>
                      <Pill tone="ok">Enters grading</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>MDM / carrier lock, removable</Td>
                    <Td>
                      Where the original account holder is the counterparty to the purchase, removal is
                      attempted. Result recorded either way.
                    </Td>
                    <Td>
                      <Pill tone="ok">Enters grading if removed</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>MDM / carrier lock, not removable</Td>
                    <Td>
                      Routed to the locked holding area. Not sold as a working device. Sold only as a parts
                      unit if the buyer asks for it and accepts the description.
                    </Td>
                    <Td>
                      <Pill tone="bad">Locked stock only</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Enterprise MDM, ownership verifiable</Td>
                    <Td>
                      Re-enrolment released by the releasing organisation. We require written release from
                      the entity that owns the fleet.
                    </Td>
                    <Td>
                      <Pill tone="info">Enters grading on written release</Pill>
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="warn" title="Where we stop">
                <p>
                  We do not attempt to bypass an activation lock, and we will not supply tooling or
                  guidance that does. A locked device is a locked device. If a supplier offers you
                  grade-B units with &ldquo;clean IMEI&rdquo; obtained by other means, that is a different
                  conversation and a different risk profile.
                </p>
              </Callout>

              {/* ------------------------------------------- CERTIFICATE -- */}
              <h2 id="certificate" style={{ marginTop: '3.5rem' }}>
                5. The certificate
              </h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                One certificate per unit, generated after the verification read and bound to the asset
                ID. It travels with the device and its number is printed on the grade report.
              </p>

              <div className="grid grid-sidebar" style={{ gap: '2.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Fields on every certificate</h3>
                  <div className="grid grid-2" style={{ gap: '1rem' }}>
                    {[
                      ['Certificate number', 'Unique and resolvable against our register.'],
                      ['Asset ID and serial', 'Bound to the physical unit; transfers with it.'],
                      ['Standard and revision', 'The named standard and its revision.'],
                      ['Method and level', 'Purge, with the sanitisation level stated.'],
                      ['Tool and version', 'The specific tool build used.'],
                      ['Operator ID', 'The individual, not the department.'],
                      ['Timestamp', 'When the purge was issued.'],
                      ['Verification result', 'Read-back pass or fail, per serial.'],
                    ].map(([k, v]) => (
                      <div className="card" key={k} style={{ padding: '1.05rem 1.15rem' }}>
                        <h4 style={{ fontSize: '.9rem', marginBottom: '.3rem' }}>{k}</h4>
                        <p className="small" style={{ margin: 0 }}>
                          {v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Eyebrow>Specimen · redacted</Eyebrow>
                  <div style={{ marginTop: '.9rem' }}>
                    <CertSample />
                  </div>
                  <p className="small muted" style={{ marginTop: '1rem' }}>
                    A full specimen pack — destruction certificate, grade report, packing list, invoice
                    and warranty summary — ships with your first order so your compliance owner can
                    review the paperwork before the second consignment.
                  </p>
                </div>
              </div>

              {/* ------------------------------------------- FAILURES ----- */}
              <h2 id="failures" style={{ marginTop: '3.5rem' }}>
                6. What we do when it fails
              </h2>
              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                <Card title="Purge verification fails" icon="alert" iconTone="danger">
                  The device is stopped at the point of test. It does not enter grading, it is not
                  labelled, and it is not sold as a working device. It goes to a destructive route or to
                  the parts tier with the reason recorded.
                </Card>
                <Card title="Certificate number does not match the unit" icon="search" iconTone="warn">
                  Dispatch stops. The unit is re-registered, re-certified and re-graded if its physical
                  condition has changed. We do &ldquo;correct it on the next shipment&rdquo; — that is how a
                  paperwork system quietly stops being true.
                </Card>
                <Card title="Evidence is lost" icon="file" iconTone="bad">
                  If we cannot evidence destruction for a unit, we will not claim that we performed it.
                  The unit is downgraded to the status we can actually defend, and the gap is recorded on
                  the report rather than left blank.
                </Card>
              </div>

              {/* ------------------------------------------- LIMITS ------ */}
              <h2 id="limits" style={{ marginTop: '3.5rem' }}>
                7. What we cannot do
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Published on purpose. A security claim you cannot bound is not a security claim.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  [
                    'We cannot guarantee what a previous owner uploaded to a cloud service',
                    'If a customer synced photos to iCloud, Google Photos or OneDrive before the device came to us, that data was never on the device. The certificate covers the device, not the account.',
                  ],
                  [
                    'We cannot delete an account at the provider',
                    'We can remove the association from the handset. Only the account holder can delete the account itself. If your customer needs that, they need the previous owner.',
                  ],
                  [
                    'We cannot recover data for a previous owner',
                    'No backup, no export, no exception. The data is gone by design.',
                  ],
                  [
                    'We cannot break a firmware activation lock',
                    'Not attempted, not offered, not facilitated. See section 4.',
                  ],
                  [
                    'We cannot certify a device we did not process',
                    'No certificate is issued for stock that has not passed through the sequence in section 3. If there is no certificate, the destruction did not happen here.',
                  ],
                  [
                    'We cannot defend a certificate we did not issue',
                    'If you are handed a destruction certificate by another supplier, we can review the layout but we cannot verify the claim. Ask for the register link.',
                  ],
                ].map(([k, v]) => (
                  <Callout key={k} tone="plain" title={k}>
                    <p>{v}</p>
                  </Callout>
                ))}
              </div>

              {/* ------------------------------------------- RETENTION --- */}
              <h2 id="retention" style={{ marginTop: '3.5rem' }}>
                8. Retention and access
              </h2>
              <div className="grid grid-2" style={{ gap: '1.6rem', alignItems: 'start' }}>
                <div className="card">
                  <h4 style={{ marginBottom: '.8rem' }}>How long we keep destruction records</h4>
                  <ul style={{ paddingLeft: '1.05rem' }}>
                    <li className="small">
                      Destruction and grade records are retained for the duration of our trading relationship
                      plus the statutory period applicable to the transaction.
                    </li>
                    <li className="small">
                      Records are keyed to the asset ID, not to a customer name, so the destruction record
                      contains no personal data of the previous owner.
                    </li>
                    <li className="small">
                      Records are not shared with third parties except where a law enforcement or
                      regulatory request requires it, or where a buyer needs the certificate for their own
                      compliance file.
                    </li>
                  </ul>
                </div>
                <div className="card">
                  <h4 style={{ marginBottom: '.8rem' }}>How to request a copy</h4>
                  <p className="small" style={{ marginBottom: '.8rem' }}>
                    Send us the certificate number or the unit serial and we will provide the full
                    destruction record. We will also provide it to a law enforcement agency, a
                    regulator, or a data subject making a legitimate request, without requiring you to be
                    the buyer.
                  </p>
                  <a className="btn btn--ghost btn--sm" href={`mailto:${SITE.complianceEmail}`}>
                    {SITE.complianceEmail}
                  </a>
                </div>
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Send the standard to your compliance owner before you send us a purchase order."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'See the grading standard', href: `${base}/grading-standard` }}
                >
                  The most useful first conversation is usually technical rather than commercial. If
                  your data-protection or IT-security lead has questions, answer them here rather than
                  after the container has landed.
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
