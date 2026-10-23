import Link from 'next/link';
import Icon, { type IconName } from './Icon';
import { COUNTRIES, type Country, type CountryCode, type RegionSlug } from '@/lib/countries';

/* ------------------------------------------------------------ Market strip */

export function MarketStrip({
  country,
  base,
  showRegionLink = true,
}: {
  country: Country;
  base: string;
  showRegionLink?: boolean;
}) {
  return (
    <div className="mstrip">
      <div className="container mstrip-inner">
        <span className="cc">{country.iso}</span>
        <span>
          Pricing and trade notes for <b>{country.name}</b>
        </span>
        <span className="sep">·</span>
        <span>
          Currency <b>{country.currency}</b>
        </span>
        <span className="sep">·</span>
        <span>
          Documents in <b>{country.languages.join(' / ')}</b>
        </span>
        {showRegionLink ? (
          <>
            <span className="sep">·</span>
            <Link href={`${base}/${country.region}`} style={{ color: 'inherit' }}>
              View all {regionName(country.region)} markets →
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}

function regionName(slug: RegionSlug): string {
  return {
    gulf: 'Gulf & MENA',
    africa: 'African',
    'north-america': 'North American',
    'asia-pacific': 'Asia-Pacific',
    europe: 'European',
  }[slug];
}

/* -------------------------------------------------------------- Market brief */

export function MarketBrief({ country }: { country: Country }) {
  return (
    <>
      <p className="lead" style={{ maxWidth: '72ch' }}>
        {country.brief}
      </p>
      <div className="grid grid-2" style={{ marginTop: '2.2rem', gap: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '.9rem' }}>What moves in this market</h3>
          <ul>
            {country.demand.map((d) => (
              <li key={d} className="small">
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '.9rem' }}>Documents we prepare</h3>
          <ul>
            {country.docs.map((d) => (
              <li key={d} className="small">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="callout callout--plain" style={{ marginTop: '1.6rem' }}>
        <span className="callout-title">Import and duty</span>
        <p>{country.importNotes}</p>
      </div>
    </>
  );
}

/* -------------------------------------------------------- Compliance list -- */

export function ComplianceList({ country }: { country: Country }) {
  return (
    <>
      <div className="callout callout--warn" style={{ marginBottom: '1.6rem' }}>
        <span className="callout-title">Read this first</span>
        <p>
          These are the buyer-side obligations we flag for {country.name}. They change frequently and
          they sit with the party importing into {country.name} — not with us, and not with your
          freight forwarder. Treat this as a prompt to send to the right person in your organisation.
          We are not your legal adviser and we do not provide compliance opinions.
        </p>
      </div>

      <div className="grid" style={{ gap: '1rem' }}>
        {country.compliance.map((c) => (
          <div className="card" key={c.topic}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '.5rem' }}>{c.topic}</h3>
            <p style={{ marginBottom: c.note ? '.6rem' : 0 }}>{c.requirement}</p>
            {c.note ? (
              <p
                className="small"
                style={{ margin: 0, paddingTop: '.6rem', borderTop: '1px solid var(--line)', color: 'var(--muted-2)', fontStyle: 'italic' }}
              >
                {c.note}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

/* --------------------------------------------------------- Country cards -- */

export function CountryCard({ code, base }: { code: CountryCode; base: string }) {
  const c = COUNTRIES[code];
  return (
    <Link className="region-card" href={`${base}/${c.code}`}>
      <span className="rc-cc">
        {c.iso} · {c.currency}
      </span>
      <h3>{c.name}</h3>
      <p>{c.headline}</p>
      <span className="rc-list">
        {c.languages.join(' · ')}
        {c.rtl ? ' · RTL' : ''}
      </span>
    </Link>
  );
}

/* --------------------------------------------------------- Region cards --- */

export function RegionCard({
  slug,
  name,
  tagline,
  countries,
  base,
  icon,
}: {
  slug: RegionSlug;
  name: string;
  tagline: string;
  countries: CountryCode[];
  base: string;
  icon: IconName;
}) {
  return (
    <Link className="region-card" href={`${base}/${slug}`}>
      <span className="card-icon" style={{ marginBottom: '.4rem' }}>
        <Icon name={icon} />
      </span>
      <h3>{name}</h3>
      <p>{tagline}</p>
      <span className="rc-list">
        {countries.map((c) => COUNTRIES[c].shortName).join(' · ')}
      </span>
    </Link>
  );
}
