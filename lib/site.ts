/**
 * Brand, entity and navigation configuration.
 *
 * The licence, VAT and DAFZA numbers are deliberately left as `null`.
 * `isPlaceholder()` drives the amber "fill me in" treatment in the UI so
 * nothing unverified can reach a customer page by accident.
 */

export const SITE = {
  name: 'VeriGrade',
  legalName: 'VeriGrade Electronics FZ-LLC',
  shortLegal: 'VeriGrade Electronics',
  tagline: 'Proof over promise',
  descriptor: 'Verified refurbished phones and laptops',
  origin: 'Dubai Airport Freezone, United Arab Emirates',
  founded: 2026,
  email: 'sales@verigrade.ae',
  complianceEmail: 'compliance@verigrade.ae',
  phone: '+971 4 000 0000',
  phoneDisplay: '+971 4 000 0000',
  whatsapp: '+971500000000',
  addressLines: [
    'VeriGrade Electronics FZ-LLC',
    'Dubai Airport Freezone',
    'Dubai, United Arab Emirates',
  ],
  /** Base URL used for sitemap + canonical metadata. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://verigrade.ae',
} as const;

/**
 * Regulatory identifiers.
 *
 * These MUST be filled in with real, current values before the site is
 * published. We do not display an unverified licence number, and we do not
 * display a certification logo we cannot evidence — that is the whole point
 * of the company.
 */
export const REGISTRATIONS = {
  tradeLicence: null as string | null,
  vatNumber: null as string | null,
  dafzaLicense: null as string | null,
  importerOfRecord: null as string | null,
} as const;

export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || value.trim().length === 0;
}

/** Render a registration value, or a visible placeholder if unset. */
export function regValue(value: string | null | undefined): string {
  return isPlaceholder(value) ? 'PENDING — fill before launch' : (value as string);
}

export const GRADING_STANDARD = {
  version: '1.0',
  effective: '2026-01-01',
  nextReview: '2027-01-01',
  /** US Department of Commerce / NIST publication reference. */
  wipeStandard: 'NIST SP 800-88 Rev. 1',
  wipeMethod: 'Purge (logical), with verification read-back',
  lowestBatteryFloor: 80,
  testPointsPhone: 11,
  testPointsLaptop: 24,
  inspectionPointsCosmetic: 28,
  inspectionLux: 1000,
} as const;

export type NavItem = {
  href: string;
  label: string;
  /** Short label used in the mobile drawer on narrow screens. */
  short?: string;
};

export function navFor(base: string): NavItem[] {
  return [
    { href: `${base}/shop`, label: 'Shop' },
    { href: `${base}/phones`, label: 'Phones' },
    { href: `${base}/laptops`, label: 'Laptops' },
    { href: `${base}/tablets`, label: 'Tablets' },
    { href: `${base}/grading-standard`, label: 'Grading Standard' },
    { href: `${base}/why-verigrade`, label: 'Why VeriGrade' },
    { href: `${base}/assurance`, label: 'Quality Assurance' },
    { href: `${base}/certifications`, label: 'Certifications' },
  ];
}

export function footerNavFor(base: string): Record<string, NavItem[]> {
  return {
    Standards: [
      { href: `${base}/grading-standard`, label: 'Grading standard v1.0' },
      { href: `${base}/grading-standard#battery`, label: 'Battery measurement' },
      { href: `${base}/grading-standard#parts`, label: 'Parts provenance' },
      { href: `${base}/grading-standard#disputes`, label: 'Grade dispute process' },
      { href: `${base}/data-security`, label: 'Data destruction' },
      { href: `${base}/certifications`, label: 'Certificates & licences' },
    ],
    Quality: [
      { href: `${base}/assurance`, label: 'Quality assurance' },
      { href: `${base}/assurance#testing`, label: 'Test points & testing' },
      { href: `${base}/assurance#lot`, label: 'Lot-level control' },
      { href: `${base}/assurance#traceability`, label: 'Serial traceability' },
      { href: `${base}/assurance#limits`, label: 'Limits of our claims' },
      { href: `${base}/repair-standard`, label: 'The repair standard' },
      { href: `${base}/export-process`, label: 'Phone to your warehouse, step by step' },
    ],
    'Products & terms': [
      { href: `${base}/phones`, label: 'Refurbished phones' },
      { href: `${base}/laptops`, label: 'Refurbished laptops' },
      { href: `${base}/phones#grade-d`, label: 'Parts & Grade D' },
      { href: `${base}/warranty`, label: 'Warranty & returns' },
      { href: `${base}/returns`, label: 'Returns & repair turnaround' },
      { href: `${base}/repair-standard`, label: 'The repair standard' },
      { href: `${base}/ordering`, label: 'Ordering & payment' },
      { href: `${base}/shipping`, label: 'Shipping & Incoterms' },
      { href: `${base}/transit`, label: 'Transit to the USA & Canada' },
      { href: `${base}/export-process`, label: 'Phone to your warehouse, step by step' },
    ],
    Company: [
      { href: `${base}/about`, label: 'About & facility' },
      { href: `${base}/why-verigrade`, label: 'Why VeriGrade' },
      { href: `${base}/compliance`, label: 'Compliance' },
      { href: `${base}/faq`, label: 'FAQ' },
      { href: `${base}/contact`, label: 'Contact' },
      { href: `${base}/privacy`, label: 'Privacy' },
      { href: `${base}/terms`, label: 'Trading terms' },
    ],
  };
}
