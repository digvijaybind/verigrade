import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_COUNTRY } from '@/lib/countries';
import { navFor } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const base = `/${DEFAULT_COUNTRY}`;

  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>That page is not here</h1>
        <p className="lead">
          Either it moved, or it never existed. Both are our problem rather than yours, so here is the
          way back to the parts of this site that carry the actual argument.
        </p>

        <div className="btn-row" style={{ marginTop: '2rem' }}>
          <Link className="btn btn--primary" href={base}>
            Home
          </Link>
          <Link className="btn btn--ghost" href={`${base}/phones`}>
            Phones
          </Link>
          <Link className="btn btn--ghost" href={`${base}/laptops`}>
            Laptops
          </Link>
          <Link className="btn btn--ghost" href={`${base}/contact`}>
            Contact
          </Link>
        </div>

        <div className="grid grid-2" style={{ marginTop: '3rem' }}>
          <div className="card">
            <h3>Standards &amp; evidence</h3>
            <ul style={{ paddingLeft: '1.05rem' }}>
              <li className="small">
                <Link href={`${base}/grading-standard`}>The grading standard</Link> — six tiers,
                numeric criteria, battery floors
              </li>
              <li className="small">
                <Link href={`${base}/assurance`}>Quality assurance</Link> — the six controls, testing
                and lot-level QA
              </li>
              <li className="small">
                <Link href={`${base}/repair-standard`}>The repair standard</Link> — bench, instruments,
                parts rules and the workmanship guarantee
              </li>
              <li className="small">
                <Link href={`${base}/export-process`}>Phone to your warehouse</Link> — the 16-step chain,
                step by step
              </li>
              <li className="small">
                <Link href={`${base}/data-security`}>Data destruction</Link> — method, verification and
                the limits of the guarantee
              </li>
              <li className="small">
                <Link href={`${base}/certifications`}>Certificates &amp; licences</Link> — every scheme
                with an honest status
              </li>
              <li className="small">
                <Link href={`${base}/why-verigrade`}>Why VeriGrade</Link> — the five checkable claims
              </li>
            </ul>
          </div>

          <div className="card">
            <h3>Trading &amp; after-sales</h3>
            <ul style={{ paddingLeft: '1.05rem' }}>
              {navFor(base).map((n) => (
                <li className="small" key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li className="small">
                <Link href={`${base}/warranty`}>Warranty &amp; returns</Link>
              </li>
              <li className="small">
                <Link href={`${base}/returns`}>Returns &amp; repair turnaround</Link>
              </li>
              <li className="small">
                <Link href={`${base}/ordering`}>Ordering &amp; payment</Link>
              </li>
              <li className="small">
                <Link href={`${base}/shipping`}>Shipping &amp; Incoterms</Link>
              </li>
              <li className="small">
                <Link href={`${base}/transit`}>Transit to the USA &amp; Canada</Link>
              </li>
              <li className="small">
                <Link href={`${base}/faq`}>FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
