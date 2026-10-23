import { GRADING_STANDARD, SITE } from '@/lib/site';

/**
 * Specimen data-destruction certificate. Redacted: serial numbers shortened,
 * address omitted. This is the layout a buyer receives per unit.
 */
export default function CertSample({ dark = false }: { dark?: boolean }) {
  const row = 'DDC-2026-004182';
  const fields: [string, string, boolean?][] = [
    ['Certificate no.', row],
    ['Issued', '2026-03-11'],
    ['Asset ID', 'VG-88213-A'],
    ['Standard', `${GRADING_STANDARD.wipeStandard}`],
    ['Method', GRADING_STANDARD.wipeMethod],
    ['Tool', 'MDM erase + verify read'],
    ['Tool version', 'MDM-Erase 4.2'],
    ['Verified', 'Yes — read-back pass'],
    ['Model', 'Redacted for specimen'],
    ['Serial', '••••••••••42'],
    ['Result', 'PURGE VERIFIED'],
    ['Technician ID', 'VG-T-118'],
  ];

  return (
    <div
      className="cert"
      style={
        dark
          ? { background: '#0F1626', borderColor: 'rgba(255,255,255,.18)' }
          : undefined
      }
    >
      <div
        className="cert-head"
        style={dark ? { background: 'rgba(255,255,255,.06)' } : undefined}
      >
        <span>
          {SITE.shortLegal} · Data Destruction Certificate
        </span>
        <span
          className="cert-mark"
          style={dark ? { borderColor: '#6B7789', color: '#6B7789' } : undefined}
        >
          VG
          <br />
          VG
        </span>
      </div>

      <div className="cert-body">
        <div
          className="cert-grid"
          style={dark ? { background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.1)' } : undefined}
        >
          {fields.map(([k, v, accent]) => (
            <div
              className="cert-field"
              key={k}
              style={dark ? { background: '#0F1626' } : undefined}
            >
              <span className="k" style={dark ? { color: '#6B7789' } : undefined}>
                {k}
              </span>
              <span
                className="v"
                style={
                  dark
                    ? { color: accent ? '#4BD6A8' : '#C6CEDA' }
                    : accent
                      ? { color: 'var(--brand)' }
                      : undefined
                }
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="cert-foot"
        style={dark ? { borderColor: 'rgba(255,255,255,.14)', color: '#6B7789' } : undefined}
      >
        Specimen only. Serial and asset identifiers are shortened and the model is withheld. A real
        certificate is generated per serial, bound to that unit&rsquo;s grade report, and issued
        before dispatch. Destruction is sequenced <b>before</b> functional testing, not after.
      </div>
    </div>
  );
}
