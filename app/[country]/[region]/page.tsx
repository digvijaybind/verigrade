import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ComplianceList, CountryCard } from '@/components/market';
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
import {
  COUNTRIES,
  countriesInRegion,
  getCountry,
  getRegion,
  isCountryCode,
  type RegionSlug,
} from '@/lib/countries';
import { GRADING_STANDARD, SITE } from '@/lib/site';

type Params = { country: string; region: string };
type Props = { params: Promise<Params> };

const REGION_ICONS: Record<RegionSlug, 'globe' | 'truck' | 'file' | 'cart' | 'recycle'> = {
  gulf: 'truck',
  africa: 'globe',
  'north-america': 'file',
  'asia-pacific': 'cart',
  europe: 'recycle',
};

export function generateStaticParams() {
  return Object.values(COUNTRIES).flatMap((c) => [{ country: c.code, region: c.region }]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, region } = await params;
  if (!isCountryCode(country)) return {};
  const r = getRegion(region);
  if (!r) return {};
  const c = getCountry(country);
  return {
    title: `${r.name} markets`,
    description: `${r.tagline} VeriGrade supplies ${r.name} from Dubai: ${countriesInRegion(r.slug)
      .map((x) => x.shortName)
      .join(', ')}. Documentation, compliance notes and market pricing.`,
    alternates: { canonical: `/${country}/${region}` },
  };
}

export default async function RegionPage({ params }: Props) {
  const { country, region } = await params;
  if (!isCountryCode(country)) notFound();
  const r = getRegion(region);
  if (!r) notFound();

  const members = countriesInRegion(r.slug);

  // Keep the URL honest: /ae/gulf should not render for a country outside the Gulf.
  const host = getCountry(country);
  if (host.region !== r.slug) redirect(`/${members[0].code}/${r.slug}`);

  const base = `/${host.code}`;

  return (
    <>
      <PageHero
        eyebrow="Region"
        title={r.name}
        lead={r.tagline}
        meta={
          <>
            <Pill tone="info">{members.length} markets</Pill>
            {members.map((m) => (
              <Pill key={m.code} tone="neutral">
                {m.iso} · {m.currency}
              </Pill>
            ))}
          </>
        }
      >
        <div className="btn-row" style={{ marginTop: '1.8rem' }}>
          <a className="btn btn--primary" href={`${base}/contact`}>
            Request a quote
          </a>
          <a className="btn btn--ghost" href={`${base}/phones`}>
            Refurbished phones
          </a>
          <a className="btn btn--ghost" href={`${base}/laptops`}>
            Refurbished laptops
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/${r.slug}`, label: r.name }]} />

              <div className="prose">
                <p>{r.blurb}</p>
              </div>

              {/* ---------------------------------------- COUNTRIES ----- */}
              <h2 id="markets">Markets in this region</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Every market has its own currency, documentation set, labelling expectations and
                compliance flags. Select one to see them in detail — the pricing and trade notes change
                accordingly.
              </p>

              <div className="grid grid-3" style={{ gap: '1rem' }}>
                {members.map((m) => (
                  <CountryCard key={m.code} code={m.code} base={base} />
                ))}
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Market</Th>
                    <Th scope="col">Currency</Th>
                    <Th scope="col">Documents</Th>
                    <Th scope="col">Label</Th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.code}>
                      <Td strong>
                        <Link href={`/${m.code}`}>{m.shortName}</Link>
                      </Td>
                      <Td mono>{m.currency}</Td>
                      <Td>{m.docs.length} standard</Td>
                      <Td>
                        {m.languages.join(' / ')}
                        {m.rtl ? ' · RTL' : ''}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrap>

              {/* ---------------------------------------- DEMAND -------- */}
              <h2 id="demand" style={{ marginTop: '3.5rem' }}>What moves here</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The models that actually clear in this region, per market. Volume follows the model
                list, not the other way round.
              </p>

              <div className="grid grid-2" style={{ gap: '1.4rem' }}>
                {members.map((m) => (
                  <Card
                    key={m.code}
                    title={
                      <>
                        {m.iso} · {m.shortName}
                      </>
                    }
                    icon="globe"
                    href={`/${m.code}`}
                  >
                    <ul style={{ paddingLeft: '1.05rem', marginBottom: '.8rem' }}>
                      {m.demand.map((d) => (
                        <li key={d} className="small">
                          {d}
                        </li>
                      ))}
                    </ul>
                    <span className="small muted">{m.headline}</span>
                  </Card>
                ))}
              </div>

              {/* ---------------------------------------- DOCS ----------- */}
              <h2 id="docs" style={{ marginTop: '3.5rem' }}>
                Documentation for this region
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Issued with every consignment, in addition to the market-specific language and
                labelling requirements for each destination.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Per-unit IMEI / MEID manifest', 'Every serial in the consignment. Not a sample and not a total.'],
                  ['Per-unit grade report', 'Grade, battery health, cycle count where applicable, parts status, network variant, recorded defects.'],
                  ['Data-destruction certificates', `One per serial. ${GRADING_STANDARD.wipeStandard} Purge with read-back verification.`],
                  ['Commercial invoice & packing list', 'True value, true condition, named Incoterm and named place.'],
                  ['Certificate of origin', 'Issued as standard.'],
                  ['Written warranty summary', 'The 12-month terms in the form your retail customer will read.'],
                  ['Dangerous-goods declaration', 'Where lithium batteries ship by air.'],
                  ['Bilingual inserts', 'Arabic, French or Traditional Chinese where the destination requires them.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="file">
                    {v}
                  </Card>
                ))}
              </div>

              {/* ---------------------------------------- COMPLIANCE ----- */}
              <h2 id="compliance" style={{ marginTop: '3.5rem' }}>
                Compliance flags in {host.shortName}
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                These are the buyer-side obligations we flag for the market you are currently viewing.
                They sit with the importer, they change, and they are not legal advice.
              </p>
              <ComplianceList country={host} />

              <div style={{ marginTop: '2rem' }}>
                <Callout tone="ok" title="Region-wide patterns">
                  <p>
                    Across this region the recurring themes are the same four: consumer disclosure
                    obligations, an importer registration of some kind, a radio type approval held by
                    the importer, and accurate customs declaration. The specifics differ by country,
                    and the{' '}
                    <Link href={`${base}/compliance`}>compliance page</Link> sets them out for the
                    market you are in.
                  </p>
                </Callout>
              </div>

              {/* ---------------------------------------- LOGISTICS ----- */}
              <h2 id="logistics" style={{ marginTop: '3.5rem' }}>Logistics into this region</h2>
              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                {[
                  [
                    'Air for replenishment',
                    'Replenishment lots move best by air. Lithium batteries are packed and documented to IATA dangerous-goods rules, with the declaration in the document pack.',
                  ],
                  [
                    'Sea for volume',
                    'Containers for pallet volumes. Watch port handling and demurrage — they are usually larger than the freight itself. Ask for a landed estimate, not a freight quote.',
                  ],
                  [
                    'Road where it makes sense',
                    'Within the Gulf, road freight from Dubai is faster and cheaper than air, and orders can be collected from the facility.',
                  ],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="truck" iconTone="info">
                    {v}
                  </Card>
                ))}
              </div>

              <KV
                items={[
                  { k: 'Default Incoterm', v: 'EXW Dubai' },
                  { k: 'Also quoted', v: 'FOB, CIF, DAP. DDP available on the West African lane into Lagos and Tema' },
                  { k: 'Dispatch, stock lines', v: '3–7 working days from cleared payment' },
                  { k: 'Consolidation', v: 'Available, with per-importer manifests and invoices' },
                  { k: 'Insurance', v: 'Cargo insurance available; recommended for full invoice value plus freight' },
                  { k: 'Warranty', v: '12 months from delivery, grades A+ to C, conformity to the published grade warranted' },
                ]}
              />

              {/* ---------------------------------------- CROSS LINK ---- */}
              <h2 id="standards" style={{ marginTop: '3.5rem' }}>
                The standards behind every consignment
              </h2>
              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                <Card
                  title={`Grading standard v${GRADING_STANDARD.version}`}
                  icon="award"
                  href={`${base}/grading-standard`}
                >
                  Six tiers, numeric criteria, and battery floors published per tier. The version in
                  force at order date governs a claim.
                </Card>
                <Card
                  title="Data destruction"
                  icon="lock"
                  href={`${base}/data-security`}
                >
                  {GRADING_STANDARD.wipeStandard} Purge, applied before testing, verified by read-back,
                  certified per serial — with the limits of the guarantee stated openly.
                </Card>
                <Card
                  title="Certificates & licences"
                  icon="shield"
                  href={`${base}/certifications`}
                >
                  Every scheme with an honest status, including the ones we do not hold, and the
                  numbers you can check on a certifier&rsquo;s own register.
                </Card>
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title={`Tell us the destination and the quantity, and we will price the goods, the freight and the documents together.`}
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Shipping & Incoterms', href: `${base}/shipping` }}
                >
                  Regional desks prepare documentation in Arabic, French and Traditional Chinese where
                  the destination requires it —{' '}
                  {members.find((m) => m.localDesk)?.localDesk ??
                    'ask us what we prepare for your market'}. Compliance questions to{' '}
                  <a href={`mailto:${SITE.complianceEmail}`}>{SITE.complianceEmail}</a>.
                </CtaBand>
              </div>
            </div>

            <Toc
              title="On this page"
              items={[
                { href: '#markets', label: '1. Markets' },
                { href: '#demand', label: '2. What moves here' },
                { href: '#docs', label: '3. Documentation' },
                { href: '#compliance', label: '4. Compliance flags' },
                { href: '#logistics', label: '5. Logistics' },
                { href: '#standards', label: '6. Standards' },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
