import Link from 'next/link';
import Reveal from '@/components/Reveal';
import CertSample from '@/components/CertSample';
import { MarketStrip } from '@/components/market';
import {
  Button,
  Card,
  Callout,
  CtaBand,
  Eyebrow,
  FlowStep,
  HeroStats,
  SectionHead,
  StatRow,
  Step,
  TableWrap,
  Td,
  Th,
} from '@/components/ui';
import type { Country } from '@/lib/countries';
import { GRADING_STANDARD, SITE } from '@/lib/site';
import {
  SERVICE_CAPACITY,
  SERVICE_COMMERCIALS,
  SERVICE_LINES,
  SERVICE_METRICS,
  SERVICE_MODEL,
  SERVICE_ONBOARDING,
  SERVICE_STAGES,
  SERVICE_WHY,
} from '@/lib/service';

/**
 * Service-led homepage.
 *
 * Rendered for markets flagged `businessModel: 'service'` (currently `us` and
 * `ca`). The commercial proposition is inverted relative to the wholesale
 * home page: we are selling bench capacity applied to the visitor's own
 * inventory, so the hero leads with ownership and capacity rather than with
 * stock and price bands. Nothing here references a wholesale catalogue, a
 * per-unit price band or an availability count, because none of those are what
 * this offer is.
 */
export default function ServiceHome({ c, base }: { c: Country; base: string }) {
  return (
    <>
      {/* ============================================ HERO ================ */}
      <section className="hero">
        <div className="container">
          <span className="hero-eyebrow">
            <span className="dot" />
            Contract repair &amp; refurbishment · {SITE.origin}
          </span>
          <h1>Your phones. Our bench. Certified output.</h1>
          <p className="lead">
            VeriGrade is a bulk phone repair and refurbishment house in Dubai. You keep ownership of
            your devices; we repair, wipe, grade and certify them at volume and hand them back. Board-level
            work is in-house, every unit leaves with a published grade and a per-unit certificate, and
            every return comes with an exception report telling you exactly what we could not fix.
          </p>
          <div className="btn-row">
            <Button href={`${base}/repair-services`} tone="primary">
              See the service &amp; pricing model
            </Button>
            <Button href={`${base}/contact`} tone="onDark">
              Send us a manifest
            </Button>
            <span className="muted">
              {SERVICE_MODEL.minimumIntake} No tooling fee, no lock-in.
            </span>
          </div>

          <HeroStats
            items={[
              { n: '6', l: 'Discrete service lines, priced separately' },
              { n: '4', l: 'Technician work tiers, board-level in-house' },
              { n: `${GRADING_STANDARD.testPointsPhone}`, l: 'Functional test points per phone, every time' },
              { n: '0', l: 'Units returned without a certificate' },
            ]}
          />
        </div>
      </section>

      <MarketStrip country={c} base={base} />

      {/* ============================================ OWNERSHIP ======== */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Start with the commercial model"
            title="This is a service contract, not a supply deal."
          >
            Almost every repair house in this trade is vague about the one thing that decides whether a
            relationship is safe: who owns the devices while they are on the bench, and whether the
            supplier might end up selling your stock. We put it in the first screen instead of a clause.
          </SectionHead>

          <div className="grid grid-sidebar">
            <div>
              <div className="flow">
                <FlowStep title="You send us a manifest of your own devices">
                  Serials, model, storage, and the service lines you want. Title does not move. It has not
                  moved at any point and it will not.
                </FlowStep>
                <FlowStep title="We diagnose, then quote per unit — before any work">
                  Nothing is opened or repaired until you approve a per-unit scope with the fault
                  categories named. This is the step most houses skip, and it is the step that stops a
                  repair programme becoming a surprise invoice.
                </FlowStep>
                <FlowStep title="Repair at the tier the work requires">
                  Four work tiers, from component swap to board-level micro-soldering. Escalation is
                  expected and recorded, not treated as a failure by the technician.
                </FlowStep>
                <FlowStep title="Wipe, full re-test, re-grade, certify">
                  Data destruction repeated after the open, the full test list re-run rather than just the
                  failed function, a fresh cosmetic inspection at {GRADING_STANDARD.inspectionLux} lux, and
                  a new certificate bound to the serial.
                </FlowStep>
                <FlowStep title="Back to you, with an exception report">
                  Your devices, your resale margin, your customer relationship — plus a report of every
                  unit we could not hold to grade, broken down by fault category. Whether that flatters us
                  or not.
                </FlowStep>
              </div>

              <Callout tone="ok" title="Title never moves">
                <p>{SERVICE_MODEL.ownership}</p>
              </Callout>
            </div>

            <aside>
              <div className="card" style={{ background: 'var(--ink)', borderColor: 'var(--ink)' }}>
                <Eyebrow>Specimen · redacted</Eyebrow>
                <h3 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '1.1rem' }}>
                  Per-unit certificate
                </h3>
                <CertSample dark />
                <p className="xs" style={{ color: '#6B7789', marginTop: '1rem' }}>
                  Every unit we return carries one of these, in your format if you want it in your format.
                  It is generated from the same record that produced the grade, so it cannot drift out of
                  sync with the device it describes.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================ SERVICE LINES ==== */}
      <section className="section section--surface">
        <div className="container">
          <SectionHead
            eyebrow="What you can order"
            title="Six service lines. Priced per unit, per line."
          >
            Nothing bundled. You are never paying a rate that hides whether the screen was genuinely
            replaced or a flex cable was reseated, and the caveat under each line is the thing most likely
            to surprise you — stated before you order rather than discovered on the return.
          </SectionHead>

          <div className="grid grid-3">
            {SERVICE_LINES.map((l, i) => (
              <Reveal key={l.code} delay={(i % 3) * 60}>
                <Card num={l.code} title={l.name} href={`${base}/repair-services#lines`}>
                  {l.promise}
                  <div className="chip-row" style={{ marginTop: '.9rem' }}>
                    <span className="chip chip--brand">{l.band}</span>
                    <span className="chip">per unit</span>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="btn-row" style={{ marginTop: '2.4rem' }}>
            <Button href={`${base}/repair-services#lines`} tone="dark">
              Full scope of every line
            </Button>
            <Button href={`${base}/repair-standard`} tone="ghost">
              The repair standard behind it
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================ CAPACITY ========= */}
      <section className="section section--ink">
        <div className="container">
          <SectionHead
            eyebrow="Capacity"
            title="We publish the structure, not a throughput number we have not measured."
          >
            A units-per-day figure is the number a buyer will hold us to, and an unmeasured one is worse
            than no number at all. So here is what actually determines our capacity, and the firm figure
            goes on your proforma where it belongs.
          </SectionHead>

          <StatRow
            items={[
              { n: '4', l: 'Work tiers, each with its own verification' },
              { n: 'In-house', l: 'Board-level micro-soldering, never subcontracted' },
              { n: `${GRADING_STANDARD.inspectionPointsCosmetic}`, l: `Cosmetic points at ${GRADING_STANDARD.inspectionLux} lux` },
              { n: '100%', l: 'Units returned with a per-unit certificate' },
            ]}
          />

          <div style={{ marginTop: '2.6rem' }}>
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
                    <Td strong style={{ color: '#fff' }}>{s.label}</Td>
                    <Td mono style={{ color: '#4BD6A8' }}>{s.value}</Td>
                    <Td style={{ color: '#A8B2C2' }}>{s.note}</Td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          </div>

          <Callout tone="plain" title="Ask for the throughput figure in the quote">
            <p style={{ color: '#A8B2C2' }}>
              {SERVICE_CAPACITY.pending.join(' · ')}. We would rather give you a firm number on a
              proforma against a real manifest than a large one on a website. If capacity is the deciding
              factor for you, put it in the quote and hold us to it there.
            </p>
          </Callout>
        </div>
      </section>

      {/* ============================================ WHY US ============ */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why send us your stock"
            title="Four reasons a buyer outsources this rather than building it."
          >
            In-house repair is entirely reasonable at low volume. The difficulty is the specialisms, the
            back-office behind the certificates, and the backlog that arrives the week you need it gone.
          </SectionHead>

          <div className="grid grid-2">
            {SERVICE_WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 2) * 60}>
                <Card num={`0${i + 1}`} title={w.title} icon="check">
                  {w.body}
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-2" style={{ gap: '1.4rem', marginTop: '1.6rem', alignItems: 'start' }}>
            <Callout tone="warn" title="The distance problem, stated plainly">
              <p>
                There is no US or Canadian facility and no local repair loop. Devices travel to Dubai and
                come back, and a warranty repair means a round trip. That is the largest structural
                limitation of this model in {c.name}, and we would rather you priced it in from the start
                than discovered it on your first claim. What we do is make the loop predictable, batched
                and insured rather than fast, and quote a realistic 15&ndash;25 working day elapsed
                turnaround instead of a domestic one.
              </p>
            </Callout>

            <Callout tone="info" title="The compliance advantage of using a processor">
              <p>
                When you pass a warranty to a consumer, the grade and the data-destruction claim both have
                to be defensible. Working through a documented processor means the evidence chain is
                somebody else's problem to maintain and yours to download. That is not glamorous, and it is
                the reason serious buyers in {c.name} use a repair house rather than a trader.
              </p>
            </Callout>
          </div>
        </div>
      </section>

      {/* ============================================ PROCESS ========== */}
      <section className="section section--surface">
        <div className="container">
          <SectionHead
            eyebrow="How a batch runs"
            title="Eight stages, identical whether it is 25 units or 25,000."
          >
            That is the point of the pilot. If a 25-unit run behaves like a production run, scaling is a
            quantity decision rather than a risk.
          </SectionHead>

          <div className="steps">
            {SERVICE_STAGES.map((s) => (
              <div className="step" key={s.n}>
                <div>
                  <h4>
                    {s.n}. {s.name}
                  </h4>
                  <p>{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ METRICS ========== */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="How to hold us to it"
            title="Four metrics. We report all four on every return."
          >
            Any repair house can quote a low per-unit price. These are the numbers that tell you whether
            the relationship survives contact with your own customer.
          </SectionHead>

          <TableWrap compare>
            <thead>
              <tr>
                <Th style={{ minWidth: 220 }}>Metric</Th>
                <Th className="col-us" style={{ minWidth: 260 }}>
                  What it actually measures
                </Th>
                <Th style={{ minWidth: 240 }}>Why it matters to you</Th>
              </tr>
            </thead>
            <tbody>
              {SERVICE_METRICS.map((m) => (
                <tr key={m.metric}>
                  <Td strong>{m.metric}</Td>
                  <Td us>{m.def}</Td>
                  <Td mid>
                    {m.metric === 'First-time pass rate'
                      ? 'A weak number means the diagnosis was rushed, and you will pay for it twice.'
                      : m.metric === 'Exception rate by fault category'
                        ? 'The single most honest number in the relationship. It tells you what your stock actually is.'
                        : m.metric === 'Turnaround adherence'
                          ? 'The quote is worthless if the units you care about always arrive last.'
                          : 'The only number that tells you whether passing our grade to a consumer is safe.'}
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>

          <Callout tone="plain" title="Ask to run the reproducibility test yourself">
            <p>
              Take a sample from your first return, grade it against our published standard with your own
              inspector, and compare. If our grade matches, you have something you can defend to a consumer
              and to a regulator. If it does not, you have found out on 25 units instead of after a
              quarter. A supplier who will not let you check their grading is telling you something, and it
              is not about quality.
            </p>
          </Callout>
        </div>
      </section>

      {/* ============================================ COMMERCIALS ======= */}
      <section className="section section--surface">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '3.5rem', alignItems: 'start' }}>
            <div>
              <Eyebrow>Commercials</Eyebrow>
              <h2>How it is priced, in full.</h2>
              <p className="lead" style={{ marginTop: '1rem' }}>
                Service agreements in this trade tend to hide margin in a bundled rate and surface it at
                month three. So here is the whole model.
              </p>

              <div style={{ marginTop: '1.8rem' }}>
                <TableWrap>
                  <tbody>
                    {[
                      ['Pricing', SERVICE_COMMERCIALS.pricing],
                      ['Parts', SERVICE_COMMERCIALS.parts],
                      ['Tooling', SERVICE_COMMERCIALS.tooling],
                      ['Minimums', SERVICE_COMMERCIALS.minimums],
                      ['Payment', SERVICE_COMMERCIALS.payment],
                      ['Currency', SERVICE_COMMERCIALS.currency],
                      ['Custody & liability', SERVICE_COMMERCIALS.liability],
                    ].map(([k, v]) => (
                      <tr key={k}>
                        <Td strong style={{ width: 190, verticalAlign: 'top' }}>{k}</Td>
                        <Td>{v}</Td>
                      </tr>
                    ))}
                  </tbody>
                </TableWrap>
              </div>
            </div>

            <div>
              <Eyebrow>Getting started</Eyebrow>
              <h3 style={{ marginBottom: '1.2rem' }}>Four steps to a production programme</h3>

              <div className="grid" style={{ gap: '1.1rem' }}>
                {SERVICE_ONBOARDING.map((o) => (
                  <div className="card" key={o.step} style={{ padding: '1.2rem 1.3rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                      <span className="card-num" style={{ margin: 0 }}>{o.step}</span>
                      <div>
                        <h4 style={{ marginBottom: '.35rem' }}>{o.title}</h4>
                        <p className="small muted" style={{ margin: 0 }}>{o.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Callout tone="warn" title="Turnaround bands are planning figures">
                <p>
                  Indicative bands by batch size are on the{' '}
                  <Link href={`${base}/repair-services#turnaround`}>services page</Link>, and they are
                  deliberately not commitments. Turnaround is set by the fault distribution in your stock,
                  and nobody can quote that accurately from a model list. We diagnose first, then commit in
                  writing.
                </p>
              </Callout>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ DOCUMENTATION ==== */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What comes back"
            title="Documents your compliance team can actually use."
          >
            Assembled per return from the same records the bench created, so the serial on the certificate,
            the serial on the manifest and the serial on the device are the same string by construction.
          </SectionHead>

          <div className="grid grid-3">
            <Card title="Per-unit repair record" icon="doc">
              The fault, the root cause, the parts fitted at their provenance level, the technician and the
              reviewer, and the post-repair re-test result. A future technician inheriting a second failure
              on the same unit can see what was already done.
            </Card>
            <Card title="Per-unit grade report" icon="file">
              Cosmetic and functional scored on two separate axes, individual defects enumerated rather than
              summarised, battery figure bound to the serial, and the parts record attached. Format it to
              your specification if you are white-labelling.
            </Card>
            <Card title="Data-destruction certificate" icon="lock">
              {`${GRADING_STANDARD.wipeStandard} ${GRADING_STANDARD.wipeMethod}, re-issued after every open because an opened device cannot be assumed to still be clean. Read-back verified across OS, firmware, MDM and secure-element layers.`}
            </Card>
            <Card title="Exception report" icon="alert" iconTone="warn">
              Every unit we could not hold to grade, broken down by fault category, with the reason and
              the disposition — repaired, re-graded down, converted to parts, or declined. Sent whether it
              flatters us or not, because a house that only reports good news is not reporting.
            </Card>
            <Card title="Return manifest" icon="box">
              Reconciles one-to-one against the serials you sent us, so the round trip is auditable rather
              than approximate. This is the document your own reconciliation process will ask for first.
            </Card>
            <Card title="EPR &amp; category data" icon="balance">
              {c.code === 'ca'
                ? 'Units, weight, category and province of sale, formatted for the provincial producer-responsibility reporting your registration needs.'
                : 'Units, weight, category and state of sale, so the producer-responsibility data your state registrations need is already assembled rather than something you compile by hand.'}
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================ RESOURCES ========= */}
      <section className="section section--surface">
        <div className="container">
          <SectionHead eyebrow="Read it yourself first" title="The standard is public. Check it before you send us anything.">
            A pilot is a small commitment. A pilot against an unread standard is a much bigger one.
          </SectionHead>
          <div className="grid grid-4">
            <Card title="The repair standard" icon="parts" href={`${base}/repair-standard`}>
              Bench conditions, instruments and calibration, technician tiers, part acceptance rules, and
              the 12-month workmanship guarantee on our own work.
            </Card>
            <Card title="The grading standard" icon="file" href={`${base}/grading-standard`}>
              Six tiers with numeric criteria and measurement methods, battery floors, and the dispute
              process you can use against us.
            </Card>
            <Card title="Repair services" icon="chip" href={`${base}/repair-services`}>
              Full scope of all six lines, turnaround bands, commercials, white-label terms, and the four
              metrics we report on every return.
            </Card>
            <Card title="How devices reach you" icon="globe" href={`${base}/export-process`}>
              The 16-step chain from bench to your dock, and the 12 shipment-quality controls that keep a
              consignment of your stock intact.
            </Card>
          </div>

          <div style={{ marginTop: '3.5rem' }}>
            <CtaBand
              title="Send us a manifest and we will diagnose a sample before you commit to anything."
              primary={{ label: 'Request a service quote', href: `${base}/contact` }}
              secondary={{ label: 'Read the repair standard', href: `${base}/repair-standard` }}
            >
              Serials, model, storage, and the service lines you want priced. You will get a per-unit
              quote with fault categories named, a realistic turnaround band for your volume, and a plain
              statement of anything we cannot fix on that stock. Questions on custody, data handling or
              white-label terms go to{' '}
              <a href={`mailto:${SITE.complianceEmail}`}>{SITE.complianceEmail}</a>. Also worth reading:{' '}
              <Link href={`${base}/transit`}>transit to {c.name}</Link> and{' '}
              <Link href={`${base}/warranty`}>the workmanship guarantee</Link>.
            </CtaBand>
          </div>
        </div>
      </section>
    </>
  );
}
