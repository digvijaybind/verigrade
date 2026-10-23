import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  Eyebrow,
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
import {
  BATTERY_RULES,
  COSMETIC_DIMENSIONS,
  GRADES,
  LAPTOP_TEST_POINTS,
  PARTS_PROVENANCE,
  PHONE_TEST_POINTS,
} from '@/lib/grades';
import { GRADING_STANDARD } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#tiers', label: '1. The six tiers' },
  { href: '#cosmetic', label: '2. Cosmetic criteria', sub: true },
  { href: '#functional', label: '3. Functional test points', sub: true },
  { href: '#battery', label: '4. Battery measurement' },
  { href: '#combination', label: '5. How the two axes combine' },
  { href: '#parts', label: '6. Parts provenance' },
  { href: '#disputes', label: '7. Grade dispute process' },
  { href: '#certificates', label: '8. What appears on a grade report' },
  { href: '#versions', label: '9. Version history' },
  { href: '#exclusions', label: '10. What this standard is not' },
];

export default async function GradingStandardPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const base = `/${country}`;

  return (
    <>
      <PageHero
        eyebrow={`Standard v${GRADING_STANDARD.version}`}
        title="The VeriGrade Grading Standard"
        lead="A published, versioned, measurable definition of condition. Every figure below is contractual: if a unit does not meet the criteria for its assigned tier, that is a warranty claim — not a matter of opinion."
        meta={
          <>
            <Pill tone="ok">Effective {GRADING_STANDARD.effective}</Pill>
            <Pill tone="info">Next review {GRADING_STANDARD.nextReview}</Pill>
            <Pill tone="neutral">{GRADES.length} tiers</Pill>
            <Pill tone="warn">Printable / PDF</Pill>
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <a className="btn btn--primary" href="#tiers">
            Jump to the tiers
          </a>
          <a className="btn btn--ghost" href={`${base}/data-security`}>
            Data-destruction standard
          </a>
          <a className="btn btn--ghost" href={`${base}/certifications`}>
            Certificates
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/grading-standard`, label: 'Grading Standard' }]} />

              {/* ---------------------------------------------- INTRO ------ */}
              <div className="prose">
                <p>
                  Most suppliers grade a device by looking at it. Some grade it with a checklist nobody
                  outside the company has read. Both approaches fail the same way: the buyer cannot
                  predict what they will receive, and when they do not get it, they have no ground to
                  stand on.
                </p>
                <p>
                  This standard fixes three things. <b>What we measure</b>, <b>how we measure
                  it</b>, and <b>what the number means</b>. It is public. You are welcome to hold us to
                  it, and the <a href="#disputes">dispute process</a> is written down before you need
                  it.
                </p>
              </div>

              <div className="callout callout--ok" style={{ margin: '1.6rem 0' }}>
                <span className="callout-title">The one thing to understand</span>
                <p>
                  We grade on <b>two independent axes</b> — cosmetic condition and functional
                  condition — and then combine them. A phone that looks untouched but holds 78% of its
                  design capacity is not a B. It is not sellable as a working device in our range at
                  all, and we will not sell it as one.
                </p>
              </div>

              {/* ---------------------------------------------- TIERS ------ */}
              <h2 id="tiers" style={{ marginTop: '3rem' }}>
                1. The six tiers
              </h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Battery floors are the minimum design-capacity percentage permitted at each tier. A
                device below its tier floor is re-graded down, not sold at the tier it resembles.
              </p>

              <div className="table-wrap">
                <table>
                  <caption>
                    Summary. Full acceptance criteria for each tier follow in the detail blocks below.
                  </caption>
                  <thead>
                    <tr>
                      <Th scope="col">Tier</Th>
                      <Th scope="col">Name</Th>
                      <Th scope="col">Battery floor</Th>
                      <Th scope="col">In one line</Th>
                      <Th scope="col">Warranty</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {GRADES.map((g) => (
                      <tr key={g.code}>
                        <Td>
                          <span className={`badge ${g.cssClass}`}>{g.code}</span>
                        </Td>
                        <Td strong>{g.name}</Td>
                        <Td mono>
                          {g.batteryFloor === null ? (
                            <span className="muted">{g.code === 'AB' ? 'Per-lot figure' : 'n/a'}</span>
                          ) : (
                            `≥ ${g.batteryFloor}%`
                          )}
                        </Td>
                        <Td>{g.short}</Td>
                        <Td>
                          {g.code === 'D' ? (
                            <span className="muted">None</span>
                          ) : (
                            <span className="muted">Full standard</span>
                          )}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'grid', gap: '1.2rem', marginTop: '2rem' }}>
                {GRADES.map((g) => (
                  <article
                    className="card"
                    key={g.code}
                    style={
                      g.code === 'A+'
                        ? { borderColor: 'var(--accent)' }
                        : g.code === 'D'
                          ? { borderColor: 'var(--danger)' }
                          : undefined
                    }
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        className={`badge ${g.cssClass}`}
                        style={{ fontSize: '.9rem', padding: '.35rem .6rem' }}
                      >
                        {g.code}
                      </span>
                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <h3 style={{ marginBottom: '.5rem' }}>{g.name}</h3>
                        <p style={{ marginBottom: '1rem' }}>{g.description}</p>

                        <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                          <div>
                            <h4 style={{ fontSize: '.8rem', marginBottom: '.5rem', color: 'var(--muted)' }}>
                              ACCEPTANCE CRITERIA
                            </h4>
                            <ul style={{ paddingLeft: '1.05rem' }}>
                              {g.criteria.map((cr) => (
                                <li key={cr} className="small">
                                  {cr}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 style={{ fontSize: '.8rem', marginBottom: '.5rem', color: 'var(--muted)' }}>
                              DISPLAY
                            </h4>
                            <p className="small" style={{ marginBottom: '.8rem' }}>{g.display}</p>
                            <h4 style={{ fontSize: '.8rem', marginBottom: '.5rem', color: 'var(--muted)' }}>
                              HOUSING
                            </h4>
                            <p className="small" style={{ marginBottom: '.8rem' }}>{g.housing}</p>
                            <h4 style={{ fontSize: '.8rem', marginBottom: '.5rem', color: 'var(--muted)' }}>
                              FUNCTIONAL DEFECTS
                            </h4>
                            <p className="small">
                              {g.functionalDefects ?? 'None permitted.'}
                            </p>
                          </div>
                        </div>

                        <p
                          className="small"
                          style={{
                            marginTop: '1rem',
                            paddingTop: '.9rem',
                            borderTop: '1px solid var(--line)',
                            color: 'var(--muted-2)',
                          }}
                        >
                          <b style={{ color: 'var(--ink)' }}>Where it fits:</b> {g.positioning}
                        </p>
                      </div>
                      <div style={{ textAlign: 'center', minWidth: '80px' }}>
                        <div
                          style={{
                            fontFamily: 'var(--mono)',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: 'var(--ink)',
                          }}
                        >
                          {g.batteryFloor === null ? '—' : `${g.batteryFloor}%`}
                        </div>
                        <div
                          className="xs muted"
                          style={{ fontFamily: 'var(--mono)', letterSpacing: '.06em' }}
                        >
                          {g.batteryFloor === null ? 'NOT TIERED' : 'FLOOR'}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* ---------------------------------------------- COSMETIC --- */}
              <h2 id="cosmetic" style={{ marginTop: '3.5rem' }}>
                2. Cosmetic criteria
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Six dimensions, each assessed under the same lighting and distance. The method column is
                not advisory — it is the procedure, and it does not change between batches.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th style={{ minWidth: 130 }} scope="col">
                      Dimension
                    </Th>
                    <Th style={{ minWidth: 150 }} scope="col">
                      Method
                    </Th>
                    <Th scope="col">A+</Th>
                    <Th scope="col">A</Th>
                    <Th scope="col">B</Th>
                    <Th scope="col">C</Th>
                    <Th scope="col">D</Th>
                  </tr>
                </thead>
                <tbody>
                  {COSMETIC_DIMENSIONS.map((d) => (
                    <tr key={d.dimension}>
                      <Td strong>{d.dimension}</Td>
                      <Td mono className="muted">
                        {d.method}
                      </Td>
                      <Td>{d.Aplus}</Td>
                      <Td>{d.A}</Td>
                      <Td>{d.B}</Td>
                      <Td>{d.C}</Td>
                      <Td>{d.D}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <Callout tone="plain" title="Why the method column exists">
                <p>
                  “Light marks” means nothing without a light level and a distance. Two inspectors
                  standing the same device under a phone torch in a warehouse aisle will disagree by a
                  full tier. Fixing the method is what makes the grade reproducible — and reproducible
                  is what makes it enforceable.
                </p>
              </Callout>

              {/* ---------------------------------------------- FUNCTIONAL - */}
              <h2 id="functional" style={{ marginTop: '3.5rem' }}>
                3. Functional test points
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Every unit is tested against the full list for its category. A failure is recorded, and
                the recorded result — not the summary grade — is what appears on the report.
              </p>

              <div className="grid grid-2" style={{ gap: '1.6rem' }}>
                <div className="card">
                  <h4 style={{ marginBottom: '.9rem' }}>
                    Phones — {PHONE_TEST_POINTS.length} points
                  </h4>
                  <ol style={{ paddingLeft: '1.2rem' }}>
                    {PHONE_TEST_POINTS.map((t) => (
                      <li key={t} className="small">
                        {t}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="card">
                  <h4 style={{ marginBottom: '.9rem' }}>
                    Laptops — {LAPTOP_TEST_POINTS.length} points
                  </h4>
                  <ol style={{ paddingLeft: '1.2rem' }}>
                    {LAPTOP_TEST_POINTS.map((t) => (
                      <li key={t} className="small">
                        {t}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* ---------------------------------------------- BATTERY ---- */}
              <h2 id="battery" style={{ marginTop: '3.5rem' }}>
                4. Battery measurement
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                {BATTERY_RULES.measurement}
              </p>

              <div className="grid grid-2" style={{ gap: '1.6rem', alignItems: 'start' }}>
                <div className="card">
                  <h4 style={{ marginBottom: '.9rem' }}>Test conditions</h4>
                  <ul style={{ paddingLeft: '1.05rem' }}>
                    {BATTERY_RULES.conditions.map((c) => (
                      <li key={c} className="small">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p
                    className="small"
                    style={{
                      marginTop: '1rem',
                      padding: '.8rem 1rem',
                      background: 'var(--surface)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--mono)',
                      fontSize: '.8rem',
                    }}
                  >
                    {BATTERY_RULES.floors}
                  </p>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <Callout tone="warn" title="Below the floor">
                    <p>{BATTERY_RULES.belowFloor}</p>
                  </Callout>
                  <Callout tone="info" title="Replaced batteries">
                    <p>{BATTERY_RULES.replacement}</p>
                  </Callout>
                  <Callout tone="plain" title="Laptops: read the cycle count too">
                    <p>{BATTERY_RULES.laptopNote}</p>
                  </Callout>
                </div>
              </div>

              {/* ---------------------------------------------- COMBINE ---- */}
              <h2 id="combination" style={{ marginTop: '3.5rem' }}>
                5. How the two axes combine
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Cosmetic condition sets the ceiling. Functional condition and battery health can lower
                it, never raise it. This is the rule that stops a good-looking phone with a tired cell
                from being sold as a good phone.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Cosmetic</Th>
                    <Th scope="col">Battery ≥ tier floor</Th>
                    <Th scope="col">Battery below floor</Th>
                    <Th scope="col">Any functional failure</Th>
                  </tr>
                </thead>
                <tbody>
                  {GRADES.filter((g) => g.code !== 'AB' && g.code !== 'D').map((g) => (
                    <tr key={g.code}>
                      <Td strong>
                        <span className={`badge ${g.cssClass}`}>{g.code}</span> {g.name}
                      </Td>
                      <Td>
                        <span className="pill pill--ok">
                          <span className="dot" />
                          {g.code}
                        </span>
                      </Td>
                      <Td>
                        <span className="pill pill--warn">
                          <span className="dot" />
                          Down one tier
                        </span>
                      </Td>
                      <Td>
                        <span className="pill pill--bad">
                          <span className="dot" />
                          Down two tiers
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <Callout tone="info" title="Worked example">
                <p>
                  An iPhone graded cosmetically A+, reading 88% design capacity with all functional
                  points passing. The cosmetic tier is A+. 88% clears the B floor (85%) but not the A
                  floor (90%). The unit ships as <b>Grade B</b>, and the grade report says so, with the
                  reading that put it there. Nobody has to take anyone&rsquo;s word for it.
                </p>
              </Callout>

              {/* ---------------------------------------------- PARTS ------ */}
              <h2 id="parts" style={{ marginTop: '3.5rem' }}>
                6. Parts provenance
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                {PARTS_PROVENANCE.statement}
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th style={{ minWidth: 150 }} scope="col">
                      Level
                    </Th>
                    <Th scope="col">What it means</Th>
                    <Th scope="col">How we disclose it</Th>
                  </tr>
                </thead>
                <tbody>
                  {PARTS_PROVENANCE.levels.map((l) => (
                    <tr key={l.level}>
                      <Td strong>{l.level}</Td>
                      <Td>{l.meaning}</Td>
                      <Td>{l.disclosure}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <Callout tone="warn" title="Parts pairing — the honest problem" >
                <p>{PARTS_PROVENANCE.pairing}</p>
              </Callout>

              {/* ---------------------------------------------- DISPUTES --- */}
              <h2 id="disputes" style={{ marginTop: '3.5rem' }}>
                7. Grade dispute process
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Written before you need it, and deliberately procedural. The point is to remove the
                argument, not to win it.
              </p>

              <div className="steps">
                {[
                  {
                    t: 'Raise it inside the acceptance window',
                    d: 'Within the DOA window defined in your order confirmation. Send us the certificate number, the unit serial, and photographs taken under the same lighting conditions the standard specifies.',
                  },
                  {
                    t: 'We assess against the criteria, not against your opinion',
                    d: 'Our grading team applies the criteria in this document to your evidence. A working phone that does not meet the published criteria for its tier is a grade mismatch even if you are perfectly happy with it.',
                  },
                  {
                    t: 'Named decision, in writing',
                    d: 'You receive the decision, the criteria applied, the evidence relied on, and the ID of the technician who made it. Disagreement is escalated to the technical lead, not to a mailbox.',
                  },
                  {
                    t: 'Remedy',
                    d: 'Credit, replacement, or an agreed return to Dubai at our cost. The remedy is your choice within the options we offer; the escalation route is not optional on our side.',
                  },
                ].map((s, i) => (
                  <div className="step" key={s.t}>
                    <div>
                      <h4>{s.t}</h4>
                      <p>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ---------------------------------------------- REPORTS ---- */}
              <h2 id="certificates" style={{ marginTop: '3.5rem' }}>
                8. What appears on a grade report
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                One report per unit, printable, screenshot-friendly, and sufficient for your own
                consumer-law disclosure obligations.
              </p>

              <div className="grid grid-2" style={{ gap: '1.4rem' }}>
                {[
                  ['Certificate number', 'Unique, printed, and resolvable against our register.'],
                  ['Asset ID and serial', 'Bound to the physical unit. Transfers with the device.'],
                  ['Model and configuration', 'Including storage, colour and network variant.'],
                  ['Cosmetic tier', 'With the per-dimension result for every criterion assessed.'],
                  ['Functional tier', 'With the pass/fail result for all 11 or 24 test points.'],
                  ['Battery health', 'Design-capacity percentage, cycle count, and test conditions.'],
                  ['Parts status', 'Original, OEM-grade or aftermarket — per unit, per part.'],
                  ['Data-destruction reference', 'The certificate number from the wipe record.'],
                  ['Test date and technician ID', 'Named individual, not a department.'],
                  ['Warranty tier and period', 'The same period printed on your invoice.'],
                ].map(([k, v]) => (
                  <div className="card" key={k} style={{ padding: '1.2rem 1.3rem' }}>
                    <h4 style={{ fontSize: '.95rem', marginBottom: '.35rem' }}>{k}</h4>
                    <p className="small" style={{ margin: 0 }}>
                      {v}
                    </p>
                  </div>
                ))}
              </div>

              <p className="small muted" style={{ marginTop: '1.2rem' }}>
                Sample report: <Placeholder>VG-RPT-000000</Placeholder> — a redacted specimen is
                available on request, and a full sample pack ships with the first order.
              </p>

              {/* ---------------------------------------------- VERSIONS --- */}
              <h2 id="versions" style={{ marginTop: '3.5rem' }}>
                9. Version history
              </h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Version</Th>
                    <Th scope="col">Effective</Th>
                    <Th scope="col">Change</Th>
                    <Th scope="col">Status</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td mono strong>
                      v{GRADING_STANDARD.version}
                    </Td>
                    <Td mono>{GRADING_STANDARD.effective}</Td>
                    <Td>First published issue. Six tiers, two axes, battery floors A+ 95 / A 90 / B 85 / C 80.</Td>
                    <Td>
                      <Pill tone="ok">In force</Pill>
                    </Td>
                  </tr>
                  <tr>
                    <Td mono>v1.1</Td>
                    <Td mono>Planned</Td>
                    <Td>
                      Planned additions: quantified display brightness deviation, and a numeric tolerance
                      for bezel alignment. Not yet in force — do not quote criteria that are not published.
                    </Td>
                    <Td>
                      <Pill tone="warn">Draft</Pill>
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* ---------------------------------------------- EXCLUSIONS - */}
              <h2 id="exclusions" style={{ marginTop: '3.5rem' }}>
                10. What this standard is not
              </h2>
              <div className="grid grid-2" style={{ gap: '1.4rem' }}>
                <Callout tone="bad" title="It is not a certification of authenticity">
                  <p>
                    Grading speaks to condition. A graded device may be functionally perfect and still
                    fail a manufacturer&rsquo;s genuine-parts diagnostics. Where that applies we grade it C
                    and print the reason, because selling you an A that fails your buyer&rsquo;s own check
                    is worse than telling you the truth up front.
                  </p>
                </Callout>
                <Callout tone="bad" title="It is not a regulatory approval">
                  <p>
                    No grading standard can confer type approval, safety conformity or market access. In
                    the UAE that sits with TDRA for radio models and ECAS for power supplies. In other
                    markets it sits with your own regulator. We supply the model and type references;
                    the authorisation is yours to hold.
                  </p>
                </Callout>
                <Callout tone="bad" title="It is not a sustainability claim">
                  <p>
                    Circular economy positioning is a real commercial argument and also a compliance
                    minefield. We hold no e-waste or &ldquo;green&rdquo; certification and display no such
                    logo. Anyone who puts an environmental mark on a device without holding the
                    underlying certificate is making a claim they cannot defend.
                  </p>
                </Callout>
                <Callout tone="bad" title="It is not a substitute for your own inspection">
                  <p>
                    Our standard is unusually specific, and specific beats vague. It is still an inbound
                    grade applied in our facility by our technicians. The 7-day DOA acceptance window
                    exists because a second set of eyes on arrival is good business, not an insult.
                  </p>
                </Callout>
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Read it, challenge it, then order against it."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Certifications', href: `${base}/certifications` }}
                >
                  If something here does not make commercial sense for how you sell, tell us. A standard
                  that does not survive contact with a real sales channel is a badly written standard.
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
