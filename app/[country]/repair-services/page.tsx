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
  TableWrap,
  Td,
  Th,
  Toc,
} from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { GRADING_STANDARD, SITE } from '@/lib/site';
import {
  SERVICE_CAPACITY,
  SERVICE_COMMERCIALS,
  SERVICE_LIMITS,
  SERVICE_LINES,
  SERVICE_METRICS,
  SERVICE_MODEL,
  SERVICE_ONBOARDING,
  SERVICE_STAGES,
  SERVICE_TURNAROUND,
  SERVICE_WHY,
} from '@/lib/service';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#ownership', label: '1. What you keep' },
  { href: '#lines', label: '2. The service lines' },
  { href: '#stages', label: '3. How a batch runs' },
  { href: '#turnaround', label: '4. Turnaround and capacity' },
  { href: '#grade-uplift', label: '5. Grading your stock' },
  { href: '#commercials', label: '6. How it is priced' },
  { href: '#white-label', label: '7. White-label' },
  { href: '#onboarding', label: '8. Getting started' },
  { href: '#metrics', label: '9. Measure us on these' },
  { href: '#data', label: '10. Your data, your devices' },
  { href: '#limits', label: '11. What we do not do' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Bulk phone repair services',
    description: `B2B phone repair and refurbishment capacity for ${country.toUpperCase()}: screen, battery, board-level and grading services on your own devices. Per-unit pricing, published repair standard, per-unit certificates, an exception report on every return, and you keep title throughout.`,
    alternates: { canonical: `/${country}/repair-services` },
  };
}

export default async function RepairServicesPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow={c.businessModel === 'service' ? 'Contract manufacturing' : 'B2B service'}
        title="Bulk phone repair, on your own devices"
        lead="You own the phones. We repair them, wipe them, grade them and certify them, and they come back to you. This is capacity, not inventory: we do not take title, we do not resell your stock, and we are paid per unit for work we can evidence. Board-level repair is in-house. Every unit leaves with a published grade, a per-unit certificate and an exception report."
        meta={
          <>
            <Pill tone="ok">You keep title throughout</Pill>
            <Pill tone="ok">Board-level in-house</Pill>
            <Pill tone="ok">Per-unit certificates</Pill>
            <Pill tone="info">Pilot from 25 units</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/repair-services`, label: 'Repair services' }]} />

              {/* ------------------------------------------ OWNERSHIP --- */}
              <h2 id="ownership">1. What you keep</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Ownership is the thing service contracts most often leave ambiguous, so it is the first
                thing on this page rather than a clause.
              </p>

              <Callout tone="ok" title="Title never moves">
                <p>{SERVICE_MODEL.ownership}</p>
              </Callout>

              <div className="grid grid-2" style={{ gap: '1.2rem', marginTop: '1.4rem' }}>
                {[
                  ['We hold your devices in custody, not ownership', 'From carrier handover to return dispatch, the devices are in our custody and insured to full replacement value in both directions. Custody is a responsibility; title is yours throughout, and the distinction is written into the agreement rather than assumed.'],
                  ['Parts stay on your inventory', 'Any part we fit stays with your unit and stays on your books. Parts are costed back at replacement cost or better, itemised per unit. We do not hold a parts float against your name or quietly charge it into a labour rate.'],
                  ['No resale rights of any kind', 'There is no clause giving us the right to sell, hire out, or retain your inventory. If a unit is damaged beyond economic repair we tell you and return it or dispose of it on your written instruction — the decision is yours, not a default in our favour.'],
                  ['Your customer data is handled as a processor', 'Devices arrive with data on them. We wipe to a published standard, we do not retain copies, we do not image your data for our own diagnostics, and we process it under a written processor obligation. We will sign your data processing terms.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="lock">
                    {v}
                  </Card>
                ))}
              </div>

              {/* ----------------------------------------------- LINES --- */}
              <h2 id="lines" style={{ marginTop: '3.5rem' }}>2. The service lines</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Six discrete units of work, priced per unit per line. Take one or take all six — the
                point of writing them separately is that you are never paying a bundled rate that hides
                what was actually done. The caveat under each line is the thing most likely to surprise
                you, so it is stated before you order rather than discovered afterwards.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {SERVICE_LINES.map((l) => (
                  <div className="card" key={l.code}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '1rem',
                        marginBottom: '.7rem',
                      }}
                    >
                      <span className="card-num" style={{ margin: 0 }}>{l.code}</span>
                      <span className="pill pill--neutral">
                        <span className="dot" />
                        {l.band}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.1rem' }}>{l.name}</h3>
                    <p style={{ marginBottom: '1rem' }}>{l.promise}</p>

                    <div style={{ marginBottom: '1rem' }}>
                      <h4 className="small" style={{ textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)', marginBottom: '.5rem' }}>
                        What we do
                      </h4>
                      <ul className="small" style={{ paddingLeft: '1.05rem', color: 'var(--ink-2)' }}>
                        {l.work.map((w) => (
                          <li key={w} style={{ marginBottom: '.35rem' }}>{w}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <h4 className="small" style={{ textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)', marginBottom: '.5rem' }}>
                        What comes back
                      </h4>
                      <ul className="small" style={{ paddingLeft: '1.05rem', color: 'var(--ink-2)' }}>
                        {l.returns.map((r) => (
                          <li key={r} style={{ marginBottom: '.35rem' }}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    <Callout tone="warn" title="Worth knowing first">
                      <p className="small">{l.caveat}</p>
                    </Callout>
                  </div>
                ))}
              </div>

              {/* ---------------------------------------------- STAGES --- */}
              <h2 id="stages" style={{ marginTop: '3.5rem' }}>3. How a batch runs</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Eight stages, and two of them exist specifically to stop you paying for work you did not
                want. The sequence is the same for a 25-unit pilot and a 5,000-unit programme, which is
                what makes a pilot worth running.
              </p>

              <div className="flow">
                {SERVICE_STAGES.map((s) => (
                  <FlowStep key={s.n} title={`${s.n}. ${s.name}`}>
                    {s.detail}
                  </FlowStep>
                ))}
              </div>

              <Callout tone="ok" title="Stage 3 is the one that protects you">
                <p>
                  Nothing is worked on before you approve a per-unit scope. A diagnostics pass produces a
                  per-unit quote with the fault categories named, and the units you decline come back as
                  they arrived. On a large intake with a mixed fault distribution this is the stage that
                  stops a small repair programme turning into a large surprise invoice — and it is the
                  stage most repair houses skip, because diagnosing properly costs time they would rather
                  spend on parts.
                </p>
              </Callout>

              {/* ------------------------------------------ TURNAROUND -- */}
              <h2 id="turnaround" style={{ marginTop: '3.5rem' }}>
                4. Turnaround and capacity
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Bands by batch size, because turnaround is a function of volume and queue depth rather
                than a single number.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Batch size</Th>
                    <Th scope="col">Indicative band</Th>
                    <Th scope="col">What that means</Th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICE_TURNAROUND.map((t) => (
                    <tr key={t.size}>
                      <Td strong>{t.size}</Td>
                      <Td mono>{t.band}</Td>
                      <Td>{t.note}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <Callout tone="warn" title="These are planning figures, not commitments">
                <p>
                  The bands above tell you the order of magnitude so you can decide whether a repair
                  programme is viable at all. They are not a promise, and no band is a commitment until
                  it is on the proforma against a real manifest. The reason is simple: turnaround on a
                  repair line is set by the fault distribution in your stock, and nobody can quote that
                  accurately from a model list. We diagnose first, then commit.
                </p>
              </Callout>

              <h3 style={{ marginTop: '2.4rem' }}>Capacity, described honestly</h3>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A units-per-day figure is the number a buyer will hold us to, so we will not publish one
                we have not measured against a staffed line. What we publish instead is the structure
                that determines it.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">What determines our capacity</Th>
                    <Th scope="col">Position</Th>
                    <Th scope="col">Detail</Th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICE_CAPACITY.structure.map((s) => (
                    <tr key={s.label}>
                      <Td strong>{s.label}</Td>
                      <Td mono>{s.value}</Td>
                      <Td>{s.note}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <Callout tone="plain" title="The numbers we are not publishing yet">
                <p>
                  {SERVICE_CAPACITY.pending.join(' · ')}. These are operational figures that need to be
                  measured against a real staffed line before they mean anything, and a company that
                  publishes an unmeasured throughput number has not decided what kind of company it is.{' '}
                  {SERVICE_CAPACITY.capacityNote}
                </p>
              </Callout>

              {/* ----------------------------------------- GRADE UPLIFT -- */}
              <h2 id="grade-uplift" style={{ marginTop: '3.5rem' }}>
                5. Putting your stock on a defensible grade
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The service most requested by North American buyers, and the one where a supplier is most
                tempted to be helpful in a way that costs you later.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {SERVICE_WHY.map((w) => (
                  <Card key={w.title} title={w.title} icon="check">
                    {w.body}
                  </Card>
                ))}
              </div>

              <h3 style={{ marginTop: '2.4rem' }}>What uplift is and is not possible</h3>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Starting condition</Th>
                    <Th scope="col">Work applied</Th>
                    <Th scope="col">Realistic outcome</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Grade C — cosmetic</Td>
                    <Td>Enclosure or frame work</Td>
                    <Td>
                      Often a real uplift, because cosmetic condition is what caps the grade. Expect the
                      result to still be limited by functional condition
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Grade C — functional</Td>
                    <Td>Battery, port, flex, speaker</Td>
                    <Td>
                      Frequently an uplift to B, occasionally to A. This is the case where repair
                      genuinely creates saleable retail stock
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Grade B — cosmetic</Td>
                    <Td>Screen replacement, battery</Td>
                    <Td>
                      B to A is possible but conditional. Cosmetic condition is not fixed by a screen
                      swap, and we will not lift a grade that the back of the device does not support
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Grade B — OEM screen already fitted</Td>
                    <Td>None required</Td>
                    <Td>
                      Already an A on that axis. Grading it accurately is more valuable than repairing it
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Non-functional</Td>
                    <Td>Board-level attempt</Td>
                    <Td>
                      Unpredictable by nature. Roughly the only category where an uplift case is a real
                      gamble, and it is quoted individually
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="bad" title="The line we will not cross">
                <p>
                  We will not fit an aftermarket part and grade the unit above the tier that part
                  supports. A device that needed an aftermarket display is a Grade C, with the reason
                  printed on the report. It costs us yield on every lot, it is the easiest margin fraud
                  in this trade to commit, and if your customer later opens the device and finds it, the
                  cost lands on your buyer rather than on us. If a target grade requires it, the answer is
                  a genuine part or a different grade.
                </p>
              </Callout>

              {/* ----------------------------------------- COMMERCIALS --- */}
              <h2 id="commercials" style={{ marginTop: '3.5rem' }}>6. How it is priced</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The commercial model, stated in full, because this is where service agreements in this
                trade tend to hide margin and a buyer only finds out at month three.
              </p>

              <KV
                items={[
                  { k: 'Pricing', v: SERVICE_COMMERCIALS.pricing },
                  { k: 'Parts', v: SERVICE_COMMERCIALS.parts },
                  { k: 'Tooling and licences', v: SERVICE_COMMERCIALS.tooling },
                  { k: 'Minimums', v: SERVICE_COMMERCIALS.minimums },
                  { k: 'Payment', v: SERVICE_COMMERCIALS.payment },
                  { k: 'Currency', v: SERVICE_COMMERCIALS.currency },
                  { k: 'Custody and liability', v: SERVICE_COMMERCIALS.liability },
                ]}
              />

              <Callout tone="ok" title="What you are actually buying">
                <p>
                  Not a refurbished phone. A documented, certified, sellable version of a phone you
                  already own. The resale margin, the customer relationship and the inventory stay with
                  you throughout. What you are buying is bench capacity, a published standard applied
                  consistently, and the evidence to defend a grade to somebody who is checking.
                </p>
              </Callout>

              {/* ----------------------------------------- WHITE LABEL --- */}
              <h2 id="white-label" style={{ marginTop: '3.5rem' }}>
                7. White-label and consolidation
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Available, and structured so that a buyer who wants their own brand on the paperwork is
                not quietly buying unverifiable documents.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                <Card title="Your format, our processing role stated" icon="doc">
                  Report layout, certificate numbering and condition language set to your specification
                  and reviewed with you before the run. We are named as the processor on the paperwork
                  whether or not the report carries your brand, and we do not issue a certificate in
                  your name that implies we are you.
                </Card>
                <Card title="Consolidated with your own stock" icon="box">
                  Repair output consolidated into your existing replenishment shipment, so one delivery
                  covers both the units we fixed and the units you bought. Delivery sequenced to your
                  receiving schedule rather than ours.
                </Card>
                <Card title="A processor agreement, not a vague NDA" icon="file">
                  Custody, insurance, liability, data handling, and audit rights written down. If you have
                  a compliance team, they can read it, and we will redline it.
                </Card>
                <Card title="Your warranty, our capability behind it" icon="shield">
                  You may set the consumer warranty you offer, subject to the workmanship guarantee we can
                  actually stand behind. We will not let you publish a longer term on our repairs than we
                  will honour if they fail.
                </Card>
              </div>

              {/* ------------------------------------------ ONBOARDING -- */}
              <h2 id="onboarding" style={{ marginTop: '3.5rem' }}>8. Getting started</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Four steps. The pilot is not a formality — it is where the fault distribution in your
                stock becomes visible, and that is the single most useful number in the whole
                relationship.
              </p>

              <div className="grid grid-4" style={{ gap: '1.2rem' }}>
                {SERVICE_ONBOARDING.map((o) => (
                  <Card key={o.step} num={o.step} title={o.title}>
                    {o.body}
                  </Card>
                ))}
              </div>

              {/* --------------------------------------------- METRICS --- */}
              <h2 id="metrics" style={{ marginTop: '3.5rem' }}>
                9. Measure us on these four, not on price
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Any repair house can quote a low per-unit price. These are the metrics that tell you
                whether a relationship will survive contact with your own customer, and we publish them
                on every return whether they flatter us or not.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Metric</Th>
                    <Th scope="col">What it actually measures</Th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICE_METRICS.map((m) => (
                    <tr key={m.metric}>
                      <Td strong>{m.metric}</Td>
                      <Td>{m.def}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <Callout tone="plain" title="The one metric nobody publishes">
                <p>
                  Grade reproducibility. Whether our grade on a unit matches the grade your own inspector
                  assigns to the same unit, measured against the same standard, is the only number that
                  tells you whether passing our grade to a consumer is safe. Ask for it. Run the test
                  yourself on a pilot. A supplier who will not let you check their grade is telling you
                  something, and it is not about quality.
                </p>
              </Callout>

              {/* ------------------------------------------------ DATA --- */}
              <h2 id="data" style={{ marginTop: '3.5rem' }}>
                10. Your data and your devices
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Devices arrive with data on them, so this is not a theoretical concern on a repair intake.
                It is a queue of other people&rsquo;s photos, banking tokens and email.
              </p>

              <div className="flow">
                <FlowStep title="Wipe before test, not after">
                  {`Data destruction to ${GRADING_STANDARD.wipeStandard} using ${GRADING_STANDARD.wipeMethod}, sequenced before functional testing, so a device cannot be shelved and later sold without having been wiped.`}
                </FlowStep>
                <FlowStep title="Repeat it after every open">
                  The full wipe and read-back verification is repeated after any repair, because a device
                  that has been opened can no longer be assumed to still be clean. This is the step that
                  is always skipped, and it is where a privacy exposure would actually appear.
                </FlowStep>
                <FlowStep title="Read-back verification, per serial">
                  Every wiped volume is read back to confirm the purge held, across OS, firmware, MDM and
                  secure-element layers. Result recorded against the serial with the tool name and version.
                </FlowStep>
                <FlowStep title="A certificate you can hand to a customer">
                  Per-serial destruction certificate, QR-linked, suitable for your compliance file. A fresh
                  certificate is issued after every repair and the original is marked superseded rather than
                  deleted.
                </FlowStep>
                <FlowStep title="We do not retain your data">
                  No copies, no images kept for our own diagnostics, no analysis of content. We process
                  under a written processor obligation and we will sign your data processing terms.
                </FlowStep>
              </div>

              <Callout tone="info" title="The honest limit on activation locks">
                <p>
                  We remove activation locks and MDM enrolment only where we are authorised to do so. Where
                  the account holder has not authorised it, we do not attempt it — those units return
                  untouched and flagged, and the list comes back to you so you can chase the account holder.
                  If a large share of your intake is in that category, tell us before the manifest so we can
                  plan the batch around it rather than discovering it halfway through.
                </p>
              </Callout>

              {/* ---------------------------------------------- LIMITS --- */}
              <h2 id="limits" style={{ marginTop: '3.5rem' }}>
                11. What we do not do
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The first call-out always finds these, so here they are first.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {SERVICE_LIMITS.map((l) => (
                  <Callout key={l.title} tone="bad" title={l.title}>
                    <p>{l.body}</p>
                  </Callout>
                ))}
              </div>

              <Callout tone="warn" title="The North America distance problem, stated once more">
                <p>
                  There is no US or Canadian facility and no local repair loop, so a warranty repair on a
                  device you placed with a customer means a return to Dubai and back. That is the single
                  biggest structural limitation of this model in your market, and it is why we consolidate
                  claims, ship insured, and quote a realistic 15&ndash;25 working day elapsed turnaround
                  rather than a domestic one. The{' '}
                  <Link href={`${base}/transit`}>transit page</Link> sets out the lanes, and the{' '}
                  <Link href={`${base}/export-process`}>step-by-step export chain</Link> shows exactly what
                  happens to a device between the bench and your dock.
                </p>
              </Callout>

              {/* -------------------------------------------- RELATED --- */}
              <h2 style={{ marginTop: '3.5rem' }}>The standards behind the service</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                A service contract is only as good as the documents underneath it. These are all public,
                versioned and printable, and you do not have to take any of them on trust — you can hold a
                pilot against them.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  { t: 'The repair standard', h: `${base}/repair-standard`, b: 'Bench conditions, instrument calibration, technician tiers, part acceptance, the nine-step repair process, and the 12-month workmanship guarantee on our work.' },
                  { t: 'The grading standard', h: `${base}/grading-standard`, b: `Six tiers, numeric acceptance criteria, ${GRADING_STANDARD.inspectionPointsCosmetic} cosmetic inspection points at ${GRADING_STANDARD.inspectionLux} lux, battery floors, and the dispute process.` },
                  { t: 'Data destruction', h: `${base}/data-security`, b: `${GRADING_STANDARD.wipeStandard} ${GRADING_STANDARD.wipeMethod}, the sequence, the certificate layout, and exactly what we cannot do.` },
                  { t: 'Quality assurance', h: `${base}/assurance`, b: 'The six controls, intake-to-dispatch flow, lot-level QA, serial traceability, and the stated limits of every claim we make.' },
                ].map((l) => (
                  <Card key={l.t} title={l.t} icon="file" href={l.h}>
                    {l.b}
                  </Card>
                ))}
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Send us a manifest. We will diagnose a sample and quote per unit before you commit to anything."
                  primary={{ label: 'Request a service quote', href: `${base}/contact` }}
                  secondary={{ label: 'Read the repair standard', href: `${base}/repair-standard` }}
                >
                  Serials, model, storage, and the service lines you want priced. You will get a per-unit
                  quote with the fault categories named, a realistic turnaround band for your volume, and a
                  plain statement of anything on that manifest we cannot fix. Start with a pilot from 25
                  units — {SERVICE_MODEL.minimumIntake} Questions on data handling or custody go to{' '}
                  <a href={`mailto:${SITE.complianceEmail}`}>{SITE.complianceEmail}</a>. Read next:{' '}
                  <Link href={`${base}/transit`}>transit to the USA &amp; Canada</Link> and{' '}
                  <Link href={`${base}/warranty`}>the workmanship guarantee</Link>.
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
