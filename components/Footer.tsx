import Link from 'next/link';
import { Logo } from './Header';
import { footerNavFor, REGISTRATIONS, regValue, SITE } from '@/lib/site';
import type { CountryCode } from '@/lib/countries';

export default function Footer({ country }: { country: CountryCode }) {
  const base = `/${country}`;
  const groups = footerNavFor(base);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              <Logo size={30} />
              <span>{SITE.name}</span>
            </div>
            <p style={{ maxWidth: '38ch' }}>
              Wholesale refurbished phones and laptops from Dubai Airport Freezone. Published grading
              standard, stated battery floors, per-unit data-destruction certificates, and a written
              IMEI guarantee.
            </p>
            <div className="chip-row" style={{ marginTop: '1.1rem' }}>
              <span className="chip" style={chipDark}>Grading standard v1.0</span>
              <span className="chip" style={chipDark}>DAFZA</span>
              <span className="chip" style={chipDark}>B2B wholesale</span>
            </div>
          </div>

          {Object.entries(groups).map(([heading, items]) => (
            <div className="footer-col" key={heading}>
              <h5>{heading}</h5>
              <ul>
                {items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>
            © {SITE.founded}–present {SITE.legalName}. All rights reserved.
          </span>
          <span className="mono">
            Trade licence {regValue(REGISTRATIONS.tradeLicence)} · VAT {regValue(REGISTRATIONS.vatNumber)} · DAFZA{' '}
            {regValue(REGISTRATIONS.dafzaLicense)}
          </span>
        </div>
        <div className="footer-bottom" style={{ paddingTop: '.6rem', borderTop: 0 }}>
          <span>
            Registrations shown as pending are not yet issued. We do not display a licence number or a
            certification mark we cannot evidence.
          </span>
        </div>
      </div>
    </footer>
  );
}

const chipDark: React.CSSProperties = {
  background: 'rgba(255,255,255,.07)',
  borderColor: 'rgba(255,255,255,.14)',
  color: '#C6CEDA',
};
