import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CountryCard } from '@/components/market';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  KV,
  PageHero,
  Pill,
  StatRow,
  Step,
  TableWrap,
  Td,
  Th,
  Toc,
} from '@/components/ui';
import { COUNTRIES, getCountry, isCountryCode } from '@/lib/countries';
import { GRADING_STANDARD, REGISTRATIONS, SITE, isPlaceholder, regValue } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#position', label: '1. Where we are' },
  { href: '#why', label: '2. Why we exist' },
  { href: '#process', label: '3. The process, end to end' },
  { href: '#facility', label: '4. The facility' },
  { href: '#entity', label: '5. Entity and registrations' },
  { href: '#governance', label: '6. How the standard is governed' },
  { href: '#markets', label: '7. Where we supply' },
  { href: '#honest', label: '8. What we are not yet' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'About VeriGrade',
    description:
      'VeriGrade Electronics FZ-LLC is a Dubai Airport Freezone wholesaler of verified refurbished phones and laptops, built around a published grading standard, a named data-destruction method and per-unit evidence.',
    alternates: { canonical: `/${country}/about` },
  };
}

export default async function AboutPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="The company"
        title="About VeriGrade"
        lead="A Dubai freezone wholesaler built around one idea: in this trade, the documentation is the product. The devices matter, but the reason a customer comes back is that the paperwork is true."
        meta={
          <>
            <Pill tone="neutral">{SITE.legalName}</Pill>
            <Pill tone="neutral">{SITE.origin}</Pill>
            <Pill tone="info">Standard v{GRADING_STANDARD.version}</Pill>
            <Pill tone="neutral">Wholesale only</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/about`, label: 'About' }]} />

              <h2 id="position">1. Where we are</h2>
              <div className="prose">
                <p>
                  We are based in the <b>Dubai Airport Freezone</b>, which is the right location for this
                  business for reasons that are practical rather than romantic. Dubai is an air and sea
                  hub with bonded storage, which means goods can sit with us, be inspected, re-graded
                  and consolidated before they move. It is also a jurisdiction where the legal and
                  commercial framework for international trade is mature enough that a buyer four
                  time zones away can rely on the paperwork.
                </p>
                <p>
                  We are a <b>wholesaler</b>. We do not run a consumer storefront, we do not ship to
                  consumers, and our documentation assumes a business that will re-sell what it buys.
                  That is a deliberate constraint, because it keeps us focused on the part of the chain
                  where the documentation actually gets built.
                </p>
              </div>

              <KV
                items={[
                  { k: 'Legal entity', v: SITE.legalName },
                  { k: 'Registered in', v: SITE.origin },
                  { k: 'Trading as', v: SITE.name },
                  { k: 'Business model', v: 'Wholesale and B2B only. No consumer sales.' },
                  { k: 'Product scope', v: 'Refurbished phones, laptops, parts and non-functional units' },
                  { k: 'Standard version', v: `v${GRADING_STANDARD.version}, effective ${GRADING_STANDARD.effective}, next review ${GRADING_STANDARD.nextReview}` },
                ]}
              />

              {/* ---------------------------------------- WHY ----------- */}
              <h2 id="why" style={{ marginTop: '3.5rem' }}>2. Why we exist</h2>
              <div className="prose">
                <p>
                  We came out of an audit, not out of a business plan. We examined the published
                  websites of the major refurbishment programmes in this region and North America, and
                  we asked a narrow set of questions:
                </p>
                <ul>
                  <li>Does anyone publish their grading criteria, with numbers?</li>
                  <li>Does anyone state their data-destruction standard?</li>
                  <li>Does anyone publish certificate numbers they can evidence?</li>
                  <li>Does anyone have an IMEI policy?</li>
                  <li>Does anyone disclose parts per unit?</li>
                </ul>
                <p>
                  The answers were partial, in one case each. Not because the operators are dishonest —
                  most of them clearly test their devices and clearly wipe them — but because none of the
                  evidence is published, and a buyer has no way to verify any of it from outside.
                </p>
                <p>
                  That gap is the whole business. If we publish the criteria, name the standard, print
                  the certificate numbers, guarantee the IMEI and disclose parts per unit, then we are
                  not competing on the same axis as the suppliers we surveyed. We are removing the
                  uncertainty that costs a buyer money after delivery.
                </p>
              </div>

              <Callout tone="ok" title="The whole strategy, in one sentence">
                <p>
                  Sell the same devices, but make every claim about them checkable, and then warrant
                  the claims rather than the marketing.
                </p>
              </Callout>

              {/* ---------------------------------------- PROCESS -------- */}
              <h2 id="process" style={{ marginTop: '3.5rem' }}>3. The process, end to end</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                The order of these steps is deliberate. Data destruction comes before testing, and
                grading comes last, because a test result from an unwiped device is worthless.
              </p>

              <div className="steps">
                <Step title="Intake and registration">
                  Every serial is registered and every IMEI is screened before anything else happens. A
                  device flagged at this point leaves the graded pipeline immediately and is never
                  graded, labelled or sold into a graded consignment.
                </Step>
                <Step title="Data destruction">
                  {GRADING_STANDARD.wipeMethod}, following{' '}
                  {GRADING_STANDARD.wipeStandard}, applied before functional testing. The wiped volume
                  is read back to confirm, and a certificate is raised per serial. Full procedure and
                  its honest limitations are on the{' '}
                  <Link href={`${base}/data-security`}>data security page</Link>.
                </Step>
                <Step title="Functional testing">
                  {GRADING_STANDARD.testPointsPhone} test points on a handset,{' '}
                  {GRADING_STANDARD.testPointsLaptop} on a laptop — including sustained-load and
                  thermal checks on machines, and battery cycle count alongside capacity. Every point
                  is recorded as pass or fail, not as a summary.
                </Step>
                <Step title="Cosmetic inspection">
                  {GRADING_STANDARD.inspectionPointsCosmetic} inspection points at{' '}
                  {GRADING_STANDARD.inspectionLux} lux, across six defined dimensions, with the
                  lighting and distance stated so the result is reproducible by your own team.
                </Step>
                <Step title="Grading and reporting">
                  The two axes are resolved into a tier, the battery floor is applied, parts status is
                  recorded, and a per-unit grade report is produced. If a device does not reach the
                  floor for its cosmetic tier, it is re-graded down rather than sold at the tier it
                  looks like.
                </Step>
                <Step title="Packing and documentation">
                  Grade-separated packing, per-unit manifest, destruction certificates, packing list,
                  commercial invoice, certificate of origin, and the warranty summary. The paperwork is
                  assembled at the same time as the packing, not afterwards.
                </Step>
                <Step title="Pre-dispatch verification">
                  IMEI status re-verified, manifest reconciled against physical stock, and the
                  certificate set checked against the serial list. A consignment does not leave until
                  this reconciles.
                </Step>
              </div>

              {/* ---------------------------------------- FACILITY ------- */}
              <h2 id="facility" style={{ marginTop: '3.5rem' }}>4. The facility</h2>
              <div className="prose">
                <p>
                  We process in a bonded freezone facility in Dubai Airport Freezone. We describe the
                  setup here rather than in photographs, because a facility tour tells you less than
                  the process does — but the specifics matter when you are deciding whether a supplier
                  can hold your stock.
                </p>
              </div>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Intake and quarantine', 'Incoming stock is segregated by source and by date pending processing. A unit in quarantine is neither graded nor counted as available stock.'],
                  ['Data-destruction bench', 'Wipe and read-back verification happen at a dedicated bench, separate from the testing bench, so the two processes cannot be conflated in the record.'],
                  ['Inspection conditions', 'Cosmetic inspection at a fixed 1,000 lux with a calibrated lamp and a marked 30 cm working distance. Consistency here is what makes the grade reproducible at your end.'],
                  ['Graded storage', 'Stock is stored by grade and model, segregated from AB and Grade D. Grade D is never held in the same aisle as graded stock, which is a physical control, not a promise.'],
                  ['Dispatch preparation', 'Consolidation and manifest assembly happen in one area, so a consignment is checked against its paperwork as it is built rather than afterwards.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="building">
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="plain" title="Visits">
                <p>
                  Serious buyers are welcome to visit, and a pre-shipment inspection at the facility
                  before dispatch is available on request. If you cannot visit, we will photograph and
                  video the specific units in your consignment against their serials, and we will hold
                  dispatch until you have seen the footage.
                </p>
              </Callout>

              {/* ---------------------------------------- ENTITY -------- */}
              <h2 id="entity" style={{ marginTop: '3.5rem' }}>
                5. Entity and registrations
              </h2>
              <div className="prose">
                <p>
                  A trading entity that will not publish its registrations is asking you to rely on
                  email. Ours are published on the{' '}
                  <Link href={`${base}/certifications`}>certifications and licences page</Link>, and the
                  values below are the live ones used across this site. Where a value is not yet
                  available, it is shown as pending rather than omitted — a missing number and an
                  unverified number are different problems, and only one of them is a lie.
                </p>
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Item</Th>
                    <Th scope="col">Value</Th>
                    <Th scope="col">Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ['Trade licence', REGISTRATIONS.tradeLicence],
                      ['VAT registration', REGISTRATIONS.vatNumber],
                      ['DAFZA licence', REGISTRATIONS.dafzaLicense],
                      ['Importer of record', REGISTRATIONS.importerOfRecord],
                    ] as const
                  ).map(([label, value]) => (
                    <tr key={label}>
                      <Td strong>{label}</Td>
                      <Td mono>{regValue(value)}</Td>
                      <Td>
                        {isPlaceholder(value) ? (
                          <Pill tone="warn">Pending verification</Pill>
                        ) : (
                          <Pill tone="ok">Published</Pill>
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              <Callout tone="warn" title="What a pending value means">
                <p>
                  It means the number exists and has not yet been published here, or it means the
                  registration is in progress. In either case you should not proceed on a first
                  transaction without verifying the entity independently — DAFZA maintains a public
                  company register, and a licence extract is available on request. We would rather show
                  a gap than fill it with a number we have not read off a document.
                </p>
              </Callout>

              {/* ---------------------------------------- GOVERNANCE ---- */}
              <h2 id="governance" style={{ marginTop: '3.5rem' }}>
                6. How the grading standard is governed
              </h2>
              <div className="prose">
                <p>
                  A standard is only useful if it changes the way a dispute is settled. So the rules
                  about the standard are written down too:
                </p>
                <ul>
                  <li>
                    The standard is versioned. The version in force is printed on every grade report,
                    so a claim is always assessed against the criteria that applied on the day.
                  </li>
                  <li>
                    A revision never applies retroactively to goods already shipped. The criteria at
                    the time of order govern.
                  </li>
                  <li>
                    Every change is dated and published, including the reason for it. A silent revision
                    to a standard is a standard you cannot rely on.
                  </li>
                  <li>
                    Customer feedback changes it. If your team finds a criterion ambiguous in practice,
                    that is a defect in the standard and we would rather hear about it.
                  </li>
                </ul>
              </div>

              <KV
                items={[
                  { k: 'Current version', v: `v${GRADING_STANDARD.version}` },
                  { k: 'Effective', v: GRADING_STANDARD.effective },
                  { k: 'Next scheduled review', v: GRADING_STANDARD.nextReview },
                  { k: 'Wipe standard', v: `${GRADING_STANDARD.wipeStandard} — ${GRADING_STANDARD.wipeMethod}` },
                  { k: 'Retrospective changes', v: 'None. Criteria in force at order date govern.' },
                  { k: 'Change notice', v: 'Published on the grading standard page with the reason for the change' },
                ]}
              />

              {/* ---------------------------------------- MARKETS ------- */}
              <h2 id="markets" style={{ marginTop: '3.5rem' }}>7. Where we supply</h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                Twelve markets, five regions. Each has its own currency, documentation set and
                compliance flags, because a consignment for Lagos is not the same commercial object as
                one for Ontario.
              </p>

              <div className="grid grid-3" style={{ gap: '1rem' }}>
                {Object.values(COUNTRIES).map((ct) => (
                  <CountryCard key={ct.code} code={ct.code} base={base} />
                ))}
              </div>

              {/* ---------------------------------------- HONEST -------- */}
              <h2 id="honest" style={{ marginTop: '3.5rem' }}>
                8. What we are not yet
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                An about page that only lists strengths is advertising. This is the current state of
                the business, stated plainly, so you can decide whether to depend on us.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['We are a young company', 'VeriGrade was established in 2026 and we are a new name in a market with long-established operators. Treat our claims as claims and verify them on a first trial consignment. The standard and the documentation are the reason to try us, not our age.'],
                  ['We are not the cheapest', 'If your buying decision is purely landed cost per unit, there are cheaper suppliers and several of them are good. We are more expensive because of what we document and warrant. That only pays off if documentation problems are costing you money today.'],
                  ['We hold no third-party certifications yet', 'No R2, no e-Stewards, no ECAS, no telecom regulatory approval. The register on the certifications page lists every scheme with an honest status, including the ones we do not hold. We would rather be judged on evidence than on logos.'],
                  ['Our volumes are still modest', 'A+ supply is limited and we say so. On larger corporate laptop programmes we may not always be the best fit, and we will tell you when that is the case rather than quote for it.'],
                  ['We cannot guarantee your clearance', 'Import requirements, registrations and duties are in your market, in your name, and they change. We supply accurate documentation and the underlying data. We are not your customs broker and we do not give compliance opinions.'],
                ].map(([k, v]) => (
                  <Callout key={k} tone="plain" title={k}>
                    <p>{v}</p>
                  </Callout>
                ))}
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <StatRow
                  items={[
                    { n: '2026', l: 'Established, Dubai Airport Freezone' },
                    { n: '12', l: 'Markets supplied, five regions' },
                    { n: `${GRADING_STANDARD.testPointsPhone} / ${GRADING_STANDARD.testPointsLaptop}`, l: 'Functional test points, phone and laptop' },
                    { n: '100%', l: 'Of graded units shipped with a destruction certificate' },
                  ]}
                />
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Start with a small mixed-grade consignment and grade it against our standard yourself."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Read the standard', href: `${base}/grading-standard` }}
                >
                  If we are wrong about a unit, tell us. A supplier whose first customer is willing to
                  audit them is a better long-term arrangement for both of us than one that is not.
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
