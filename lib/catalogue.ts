/**
 * Catalogue data.
 *
 * Prices are INDICATIVE WHOLESALE BANDS in USD, ex-works Dubai, and are shown
 * converted into the visitor's currency for orientation only. Firm pricing is
 * issued on a proforma against a confirmed quantity, grade mix and destination.
 *
 * Model lines are limited to lines we can actually identify and grade. We do
 * not list a product we cannot receive, test and describe.
 */

import type { CountryCode } from './countries';
import type { GradeCode } from './grades';
import { convert, type Country } from './countries';
import { retailBand } from './commerce';

export type Family = 'phone' | 'laptop' | 'tablet';

export type Stock = 'in' | 'low' | 'out';

export type Spec = { k: string; v: string };

export type Product = {
  slug: string;
  name: string;
  family: Family;
  brand: string;
  category: string;
  releaseYear: number;
  grades: GradeCode[];
  /** Storage (phones) or storage configuration (laptops). */
  storage: string[];
  /** Additional axis shown on the listing. RAM for laptops, display size band for phones. */
  variantAxis: { label: string; values: string[] };
  markets: CountryCode[];
  stock: Stock;
  /** Indicative band, USD per unit, ex-works. */
  from: number;
  to: number;
  /**
   * Optional explicit retail band. When absent the shop derives an indicative
   * retail price from the wholesale band (see `lib/commerce.ts`). Products that
   * have a real retail reference should set these instead of relying on the
   * uplift, so the number is published rather than calculated.
   */
  retailFrom?: number;
  retailTo?: number;
  /** Per-product MOQ overrides. Defaults come from `lib/commerce.ts`. */
  wholesaleMoq?: number;
  retailMoq?: number;
  summary: string;
  specs: Spec[];
  notes: string[];
  featured?: boolean;
};

const ALL: CountryCode[] = [
  'ae', 'sa', 'eg', 'ng', 'gh', 'ke', 'za', 'us', 'ca', 'hk', 'gb', 'au',
];

/* ============================================================== PHONES == */

export const PHONES: Product[] = [
  {
    slug: 'apple-iphone-15',
    name: 'Apple iPhone 15',
    family: 'phone',
    brand: 'Apple',
    category: 'Apple iPhone',
    releaseYear: 2023,
    grades: ['A+', 'A', 'B', 'C', 'AB', 'D'],
    storage: ['128GB', '256GB', '512GB'],
    variantAxis: { label: 'Display', values: ['6.1"', '6.7" Pro'] },
    markets: ALL,
    stock: 'in',
    from: 285,
    to: 640,
    summary:
      'The highest-demand line in the range and the one most import programmes standardise on. Strong A and B availability across all storage tiers; AB raw stock is consistent enough to plan a container around.',
    specs: [
      { k: 'Display', v: '6.1" Super Retina XDR, 2000 nits' },
      { k: 'Chip', v: 'A16 Bionic' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Active-lock screen', v: 'Fully removed and verified' },
      { k: 'Pairing', v: 'True Tone, Face ID and original parts pairing checked' },
    ],
    notes: [
      'Devices with a replaced display cannot pass the original-parts pairing check and are graded C with the reason printed.',
      'Facial-ID failures are functional defects and cap the device at C.',
    ],
    featured: true,
  },
  {
    slug: 'apple-iphone-14',
    name: 'Apple iPhone 14',
    family: 'phone',
    brand: 'Apple',
    category: 'Apple iPhone',
    releaseYear: 2022,
    grades: ['A+', 'A', 'B', 'C', 'AB', 'D'],
    storage: ['128GB', '256GB', '512GB'],
    variantAxis: { label: 'Display', values: ['6.1"', '6.7" Pro Max'] },
    markets: ALL,
    stock: 'in',
    from: 240,
    to: 560,
    summary:
      'The dependable middle of the Apple range. Best volume-to-price relationship in the catalogue and the line most refurbishers buy in mixed-grade pallets.',
    specs: [
      { k: 'Display', v: '6.1" Super Retina XDR, 1200 nits' },
      { k: 'Chip', v: 'A15 Bionic' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Active-lock screen', v: 'Fully removed and verified' },
      { k: 'Pairing', v: 'True Tone, Face ID and original parts pairing checked' },
    ],
    notes: ['Carrier-locked units are MDM-checked and unlocked where the original account permits.'],
    featured: true,
  },
  {
    slug: 'apple-iphone-13',
    name: 'Apple iPhone 13',
    family: 'phone',
    brand: 'Apple',
    category: 'Apple iPhone',
    releaseYear: 2021,
    grades: ['A', 'B', 'C', 'AB', 'D'],
    storage: ['128GB', '256GB', '512GB'],
    variantAxis: { label: 'Display', values: ['6.1"', '6.5" Pro Max'] },
    markets: ALL,
    stock: 'in',
    from: 200,
    to: 470,
    summary:
      'Very deep supply and the easiest line to fill a mixed pallet with. Grade A is hard to find on the Pro Max — expect B as the volume tier on that variant.',
    specs: [
      { k: 'Display', v: '6.1" Super Retina XDR, 1200 nits' },
      { k: 'Chip', v: 'A15 Bionic' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Active-lock screen', v: 'Fully removed and verified' },
      { k: 'Pairing', v: 'True Tone, Face ID and original parts pairing checked' },
    ],
    notes: ['Battery health on this line is the main source of grade spread — we publish the figure, we do not average it.'],
    featured: true,
  },
  {
    slug: 'apple-iphone-12',
    name: 'Apple iPhone 12',
    family: 'phone',
    brand: 'Apple',
    category: 'Apple iPhone',
    releaseYear: 2020,
    grades: ['A', 'B', 'C', 'AB', 'D'],
    storage: ['64GB', '128GB', '256GB'],
    variantAxis: { label: 'Display', values: ['6.1"', '6.7" Pro Max'] },
    markets: ALL,
    stock: 'in',
    from: 155,
    to: 380,
    summary:
      'The clearance line. Consistent supply, wide storage spread, and the usual entry point for a first import consignment.',
    specs: [
      { k: 'Display', v: '6.1" Super Retina XDR, 1200 nits' },
      { k: 'Chip', v: 'A14 Bionic' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Active-lock screen', v: 'Fully removed and verified' },
      { k: 'Pairing', v: 'True Tone, Face ID and original parts pairing checked' },
    ],
    notes: ['5G variants are noted on the grade report. Bands are not verified per unit unless requested.'],
  },
  {
    slug: 'apple-iphone-11',
    name: 'Apple iPhone 11',
    family: 'phone',
    brand: 'Apple',
    category: 'Apple iPhone',
    releaseYear: 2019,
    grades: ['B', 'C', 'AB', 'D'],
    storage: ['64GB', '128GB', '256GB'],
    variantAxis: { label: 'Display', values: ['6.1"'] },
    markets: ['ae', 'sa', 'eg', 'ng', 'gh', 'ke', 'za'],
    stock: 'low',
    from: 110,
    to: 300,
    summary:
      'Cleared from the US, Canada, UK and Australia lanes — we are not restocking it. Deep Grade C supply remains and it still moves in West Africa. Not supplied to North America, Hong Kong, Europe or Australia lanes.',
    specs: [
      { k: 'Display', v: '6.1" Liquid Retina HD, 625 nits' },
      { k: 'Chip', v: 'A13 Bionic' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Active-lock screen', v: 'Fully removed and verified' },
    ],
    notes: [
      'We are winding this line down rather than restocking it. Expect declining availability and no restock commitment.',
    ],
  },
  {
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    family: 'phone',
    brand: 'Samsung',
    category: 'Samsung Galaxy',
    releaseYear: 2024,
    grades: ['A+', 'A', 'B', 'C', 'AB'],
    storage: ['256GB', '512GB', '1TB'],
    variantAxis: { label: 'Network', values: ['5G', '4G'] },
    markets: ALL,
    stock: 'in',
    from: 430,
    to: 890,
    summary:
      'Flagship-tier supply for buyers moving premium Android. Note the network variant: 5G units are not usable on some Gulf and African networks, and we flag the variant on the grade report rather than leaving you to discover it.',
    specs: [
      { k: 'Display', v: '6.8" QHD+ AMOLED, 120Hz' },
      { k: 'S-Pen', v: 'Tested where present' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Network variant', v: 'Printed on every grade report' },
    ],
    notes: [
      'Network variant is the single most common source of buyer complaint on this line. We print it on the report; we do not treat it as a detail.',
    ],
    featured: true,
  },
  {
    slug: 'samsung-galaxy-s23',
    name: 'Samsung Galaxy S23',
    family: 'phone',
    brand: 'Samsung',
    category: 'Samsung Galaxy',
    releaseYear: 2023,
    grades: ['A', 'B', 'C', 'AB'],
    storage: ['128GB', '256GB', '512GB'],
    variantAxis: { label: 'Network', values: ['5G', '4G'] },
    markets: ALL,
    stock: 'in',
    from: 190,
    to: 480,
    summary:
      'The premium Android workhorse. Consistent A and B supply across storage tiers.',
    specs: [
      { k: 'Display', v: '6.1" FHD+ AMOLED, 120Hz' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Network variant', v: 'Printed on every grade report' },
    ],
    notes: ['Network variant printed on the grade report.'],
  },
  {
    slug: 'samsung-galaxy-a54',
    name: 'Samsung Galaxy A54',
    family: 'phone',
    brand: 'Samsung',
    category: 'Samsung Galaxy',
    releaseYear: 2023,
    grades: ['A', 'B', 'C', 'AB', 'D'],
    storage: ['128GB', '256GB'],
    variantAxis: { label: 'Network', values: ['5G', '4G'] },
    markets: ['ae', 'sa', 'eg', 'ng', 'gh', 'ke', 'za', 'hk'],
    stock: 'in',
    from: 110,
    to: 290,
    summary:
      'The highest-volume mid-range Android line in the catalogue and the one with the most consistent supply. Strong fit for West African and Gulf retail channels.',
    specs: [
      { k: 'Display', v: '6.4" FHD+ Super AMOLED, 120Hz' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Network variant', v: 'Printed on every grade report' },
    ],
    notes: ['Not supplied to the US, Canada, UK or Australia lanes — model availability in those markets should be confirmed before you build a plan on it.'],
    featured: true,
  },
  {
    slug: 'samsung-galaxy-a15',
    name: 'Samsung Galaxy A15',
    family: 'phone',
    brand: 'Samsung',
    category: 'Samsung Galaxy',
    releaseYear: 2024,
    grades: ['A', 'B', 'C', 'AB'],
    storage: ['128GB', '256GB'],
    variantAxis: { label: 'Network', values: ['4G'] },
    markets: ['ae', 'sa', 'eg', 'ng', 'gh', 'ke', 'za'],
    stock: 'in',
    from: 75,
    to: 190,
    summary:
      'Entry-tier volume line. Built for price-led retail programmes and prepaid bundles.',
    specs: [
      { k: 'Display', v: '6.5" FHD+ Super AMOLED, 90Hz' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Network', v: '4G variants' },
    ],
    notes: ['4G only. Not supplied to North America, Hong Kong or Australia lanes.'],
  },
  {
    slug: 'google-pixel-8',
    name: 'Google Pixel 8',
    family: 'phone',
    brand: 'Google',
    category: 'Google Pixel',
    releaseYear: 2023,
    grades: ['A+', 'A', 'B', 'C', 'AB'],
    storage: ['128GB', '256GB'],
    variantAxis: { label: 'Network', values: ['5G', '4G'] },
    markets: ['ae', 'sa', 'eg', 'ng', 'ke', 'za', 'us', 'ca', 'hk', 'gb', 'au'],
    stock: 'low',
    from: 220,
    to: 560,
    summary:
      'Strong demand where Google services are expected to work without region friction. Network variant matters more than usual on this line and is printed on every report.',
    specs: [
      { k: 'Display', v: '6.2" OLED, 120Hz' },
      { k: 'Tensor', v: 'G3' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Network variant', v: 'Printed on every grade report' },
    ],
    notes: ['Region-activation state is tested and recorded. Software support status is the buyer’s call, not ours.'],
  },
  {
    slug: 'google-pixel-7a',
    name: 'Google Pixel 7a',
    family: 'phone',
    brand: 'Google',
    category: 'Google Pixel',
    releaseYear: 2023,
    grades: ['A', 'B', 'C', 'AB'],
    storage: ['128GB', '256GB'],
    variantAxis: { label: 'Network', values: ['5G', '4G'] },
    markets: ['ae', 'sa', 'eg', 'ng', 'ke', 'za', 'gb', 'au'],
    stock: 'in',
    from: 160,
    to: 400,
    summary:
      'Good supply of clean Grade A and B units. Popular where a mid-range device with reliable software is wanted.',
    specs: [
      { k: 'Display', v: '6.1" OLED, 90Hz' },
      { k: 'Tensor', v: 'G2' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Network variant', v: 'Printed on every grade report' },
    ],
    notes: ['Not supplied to the US or Canada lanes — confirm model availability there before planning volume.'],
  },
  {
    slug: 'xiaomi-redmi-note-13',
    name: 'Xiaomi Redmi Note 13',
    family: 'phone',
    brand: 'Xiaomi',
    category: 'Xiaomi',
    releaseYear: 2024,
    grades: ['A', 'B', 'C', 'AB'],
    storage: ['128GB', '256GB', '512GB'],
    variantAxis: { label: 'Network', values: ['4G'] },
    markets: ['ae', 'sa', 'eg', 'ng', 'gh', 'ke'],
    stock: 'in',
    from: 70,
    to: 210,
    summary:
      'Value-tier volume line with the widest storage spread in the catalogue. Suits prepaid and entry retail programmes.',
    specs: [
      { k: 'Display', v: '6.67" AMOLED, 120Hz' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Network', v: '4G variants' },
    ],
    notes: ['4G only. Regional software / ROM status printed on the report.'],
  },
];

/* ============================================================= LAPTOPS == */

export const LAPTOPS: Product[] = [
  {
    slug: 'lenovo-thinkpad-t14-gen-3',
    name: 'Lenovo ThinkPad T14 Gen 3',
    family: 'laptop',
    brand: 'Lenovo',
    category: 'Lenovo ThinkPad',
    releaseYear: 2022,
    grades: ['A+', 'A', 'B', 'C', 'AB', 'D'],
    storage: ['256GB', '512GB', '1TB'],
    variantAxis: { label: 'Memory', values: ['16GB', '32GB'] },
    markets: ALL,
    stock: 'in',
    from: 280,
    to: 640,
    summary:
      'The corporate off-lease staple. Cycle count published alongside battery capacity, because on a five-year-old machine the cycle count tells you more than the percentage does.',
    specs: [
      { k: 'Processor', v: 'Intel Core i5 / i7 12th gen' },
      { k: 'Battery', v: 'Health % and full charge cycle count published' },
      { k: 'Charger', v: 'Original or certified 65W USB-C, documented' },
      { k: 'Active-lock screen', v: 'Fully removed and verified' },
      { k: 'Functional test points', v: '24' },
    ],
    notes: [
      'BIOS passwords and firmware-level locks are removed or, where not possible, the unit is downgraded and the reason printed.',
    ],
    featured: true,
  },
  {
    slug: 'lenovo-thinkpad-x1-carbon-gen-10',
    name: 'Lenovo ThinkPad X1 Carbon Gen 10',
    family: 'laptop',
    brand: 'Lenovo',
    category: 'Lenovo ThinkPad',
    releaseYear: 2022,
    grades: ['A+', 'A', 'B', 'C', 'AB'],
    storage: ['512GB', '1TB', '2TB'],
    variantAxis: { label: 'Memory', values: ['16GB', '32GB'] },
    markets: ['ae', 'sa', 'ng', 'ke', 'za', 'us', 'ca', 'hk', 'gb', 'au'],
    stock: 'low',
    from: 460,
    to: 1050,
    summary:
      'Premium corporate line. Supply is limited and heavily Grade A weighted. We would rather quote a short lead time than sell you a mis-graded X1.',
    specs: [
      { k: 'Processor', v: 'Intel Core i7 12th gen' },
      { k: 'Chassis', v: 'Carbon fibre — cosmetic grading is stricter on this line' },
      { k: 'Battery', v: 'Health % and cycle count published' },
      { k: 'Functional test points', v: '24' },
    ],
    notes: ['Not supplied to Egypt, Ghana or Australia lanes. Confirm availability before promising a date.'],
  },
  {
    slug: 'hp-elitebook-840-g8',
    name: 'HP EliteBook 840 G8',
    family: 'laptop',
    brand: 'HP',
    category: 'HP EliteBook',
    releaseYear: 2021,
    grades: ['A', 'B', 'C', 'AB', 'D'],
    storage: ['256GB', '512GB', '1TB'],
    variantAxis: { label: 'Memory', values: ['16GB', '32GB'] },
    markets: ALL,
    stock: 'in',
    from: 210,
    to: 520,
    summary:
      'Very deep supply in every grade. The safest corporate line to build a first laptop programme on, because availability is rarely the constraint.',
    specs: [
      { k: 'Processor', v: 'Intel Core i5 / i7 11th gen' },
      { k: 'Battery', v: 'Health % and cycle count published' },
      { k: 'Charger', v: 'Original or certified, documented' },
      { k: 'Functional test points', v: '24' },
    ],
    notes: ['Firmware-level locks removed where possible; exceptions printed on the report.'],
    featured: true,
  },
  {
    slug: 'hp-elitebook-840-g9',
    name: 'HP EliteBook 840 G9',
    family: 'laptop',
    brand: 'HP',
    category: 'HP EliteBook',
    releaseYear: 2022,
    grades: ['A+', 'A', 'B', 'C', 'AB'],
    storage: ['512GB', '1TB'],
    variantAxis: { label: 'Memory', values: ['16GB', '32GB'] },
    markets: ['ae', 'sa', 'ng', 'ke', 'za', 'us', 'ca', 'hk', 'gb', 'au'],
    stock: 'in',
    from: 300,
    to: 700,
    summary:
      'Newer corporate generation with better battery life out of the box. Good fit for corporate refresh projects.',
    specs: [
      { k: 'Processor', v: 'Intel Core i5 / i7 12th gen' },
      { k: 'Battery', v: 'Health % and cycle count published' },
      { k: 'Functional test points', v: '24' },
    ],
    notes: ['Not supplied to Egypt or Ghana lanes.'],
  },
  {
    slug: 'dell-latitude-5420',
    name: 'Dell Latitude 5420',
    family: 'laptop',
    brand: 'Dell',
    category: 'Dell Latitude',
    releaseYear: 2021,
    grades: ['A', 'B', 'C', 'AB', 'D'],
    storage: ['256GB', '512GB', '1TB'],
    variantAxis: { label: 'Memory', values: ['16GB', '32GB'] },
    markets: ALL,
    stock: 'in',
    from: 190,
    to: 480,
    summary:
      'Consistent corporate stock with a wide grade spread. Popular for SME resale and field-force refresh.',
    specs: [
      { k: 'Processor', v: 'Intel Core i5 / i7 11th gen' },
      { k: 'Battery', v: 'Health % and cycle count published' },
      { k: 'Functional test points', v: '24' },
    ],
    notes: ['Firmware-level locks removed where possible; exceptions printed on the report.'],
  },
  {
    slug: 'apple-macbook-air-m2',
    name: 'Apple MacBook Air M2',
    family: 'laptop',
    brand: 'Apple',
    category: 'Apple MacBook',
    releaseYear: 2022,
    grades: ['A+', 'A', 'B', 'C', 'AB'],
    storage: ['256GB', '512GB'],
    variantAxis: { label: 'Memory', values: ['8GB', '16GB', '24GB'] },
    markets: ['ae', 'sa', 'eg', 'ng', 'gh', 'ke', 'za', 'us', 'ca', 'hk', 'gb', 'au'],
    stock: 'in',
    from: 520,
    to: 1180,
    summary:
      'The premium end of our laptop range. Activation lock and the Apple Silicon firmware activation are tested and recorded — the latter is the single most common failure we see on this line.',
    specs: [
      { k: 'Chip', v: 'Apple M2' },
      { k: 'Display', v: '13.6" Liquid Retina' },
      { k: 'Battery', v: 'Health % and cycle count published' },
      { k: 'Firmware activation', v: 'Tested and recorded per unit' },
      { k: 'Functional test points', v: '24' },
    ],
    notes: [
      'Devices with a replaced display, top case or battery cannot pass Apple’s genuine-parts diagnostics. Those units are graded C with the reason printed, not passed off as A.',
    ],
    featured: true,
  },
  {
    slug: 'apple-macbook-pro-14-m2',
    name: 'Apple MacBook Pro 14" M2 Pro',
    family: 'laptop',
    brand: 'Apple',
    category: 'Apple MacBook',
    releaseYear: 2023,
    grades: ['A+', 'A', 'B', 'C'],
    storage: ['512GB', '1TB', '2TB'],
    variantAxis: { label: 'Chip', values: ['M2 Pro', 'M2 Max'] },
    markets: ['ae', 'sa', 'ng', 'ke', 'za', 'us', 'ca', 'hk', 'gb', 'au'],
    stock: 'low',
    from: 980,
    to: 2150,
    summary:
      'High value per unit, so traceability matters more here than anywhere else. Every unit ships with a per-serial destruction certificate and a firmware-activation result.',
    specs: [
      { k: 'Chip', v: 'M2 Pro / M2 Max' },
      { k: 'Display', v: '14.2" Liquid Retina XDR' },
      { k: 'Battery', v: 'Health % and cycle count published' },
      { k: 'Firmware activation', v: 'Tested and recorded per unit' },
      { k: 'Functional test points', v: '24' },
    ],
    notes: ['Limited supply. Not supplied to Egypt, Ghana or Australia lanes.'],
  },
];

/* ============================================================= TABLETS == */

export const TABLETS: Product[] = [
  {
    slug: 'apple-ipad-10th-gen',
    name: 'Apple iPad (10th generation)',
    family: 'tablet',
    brand: 'Apple',
    category: 'Apple iPad',
    releaseYear: 2022,
    grades: ['A+', 'A', 'B', 'C', 'AB', 'D'],
    storage: ['64GB', '256GB'],
    variantAxis: { label: 'Connectivity', values: ['Wi-Fi', 'Wi-Fi + Cellular'] },
    markets: ALL,
    stock: 'in',
    from: 205,
    to: 420,
    summary:
      'The volume education and resale tablet. Deep supply in A and B, and the line most buyers start a tablet programme with because availability is rarely the constraint.',
    specs: [
      { k: 'Display', v: '10.9" Liquid Retina' },
      { k: 'Chip', v: 'A14 Bionic' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Activation lock', v: 'Removed and verified per unit' },
    ],
    notes: [
      'Cellular variants are listed separately — do not plan a mixed pallet on the assumed split.',
      'Pencil and keyboard accessories are not included unless stated on the proforma.',
    ],
    featured: true,
  },
  {
    slug: 'apple-ipad-air-m1',
    name: 'Apple iPad Air (M1)',
    family: 'tablet',
    brand: 'Apple',
    category: 'Apple iPad',
    releaseYear: 2022,
    grades: ['A+', 'A', 'B', 'C', 'AB'],
    storage: ['64GB', '256GB'],
    variantAxis: { label: 'Connectivity', values: ['Wi-Fi', 'Wi-Fi + Cellular'] },
    markets: ALL,
    stock: 'in',
    from: 300,
    to: 620,
    summary:
      'The mid-premium Apple tablet. Strong demand where a lighter device with desktop-class performance is wanted, and clean A supply is realistic to plan around.',
    specs: [
      { k: 'Display', v: '10.9" Liquid Retina' },
      { k: 'Chip', v: 'Apple M1' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Activation lock', v: 'Removed and verified per unit' },
    ],
    notes: ['Genuine-parts pairing is checked on display and battery replacements.'],
  },
  {
    slug: 'apple-ipad-pro-11-m2',
    name: 'Apple iPad Pro 11" (M2)',
    family: 'tablet',
    brand: 'Apple',
    category: 'Apple iPad',
    releaseYear: 2022,
    grades: ['A+', 'A', 'B', 'C'],
    storage: ['128GB', '256GB', '512GB'],
    variantAxis: { label: 'Connectivity', values: ['Wi-Fi', 'Wi-Fi + Cellular'] },
    markets: ['ae', 'sa', 'ng', 'ke', 'za', 'us', 'ca', 'hk', 'gb', 'au'],
    stock: 'low',
    from: 560,
    to: 1120,
    summary:
      'High value per unit, so traceability matters more than on the rest of the tablet range. Limited supply and Grade A weighted.',
    specs: [
      { k: 'Display', v: '11" Liquid Retina XDR' },
      { k: 'Chip', v: 'Apple M2' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Activation lock', v: 'Removed and verified per unit' },
    ],
    notes: ['Not supplied to Egypt or Ghana lanes. Confirm availability before promising a date.'],
  },
  {
    slug: 'samsung-galaxy-tab-s9',
    name: 'Samsung Galaxy Tab S9',
    family: 'tablet',
    brand: 'Samsung',
    category: 'Samsung Galaxy Tab',
    releaseYear: 2023,
    grades: ['A+', 'A', 'B', 'C', 'AB'],
    storage: ['128GB', '256GB', '512GB'],
    variantAxis: { label: 'Connectivity', values: ['Wi-Fi', '5G'] },
    markets: ['ae', 'sa', 'eg', 'ng', 'gh', 'ke', 'za', 'hk', 'gb', 'au'],
    stock: 'in',
    from: 320,
    to: 680,
    summary:
      'The premium Android tablet. Network variant is flagged on the report, because the 5G split is the most common source of buyer complaint on this line.',
    specs: [
      { k: 'Display', v: '11" Dynamic AMOLED 2X, 120Hz' },
      { k: 'Chip', v: 'Snapdragon 8 Gen 2' },
      { k: 'Battery health floor at Grade B', v: '85%' },
      { k: 'Network variant', v: 'Printed on every grade report' },
    ],
    notes: ['Not supplied to US or Canada lanes — confirm model availability there before planning volume.'],
    featured: true,
  },
];

/* --------------------------------------------------------- accessors --- */

export const ALL_PRODUCTS: Product[] = [...PHONES, ...LAPTOPS, ...TABLETS];

export function productsForFamily(family: Family): Product[] {
  return ALL_PRODUCTS.filter((p) => p.family === family);
}

export function productsForCountry(country: CountryCode): Product[] {
  return ALL_PRODUCTS.filter((p) => p.markets.includes(country));
}

export function featuredFor(family: Family): Product[] {
  return productsForFamily(family).filter((p) => p.featured);
}

/** Brands present in a family's catalogue, alphabetised — used for filters. */
export function brandsFor(family: Family): string[] {
  return Array.from(new Set(productsForFamily(family).map((p) => p.brand))).sort();
}

export function storagesFor(family: Family): string[] {
  const set = new Set<string>();
  productsForFamily(family).forEach((p) => p.storage.forEach((s) => set.add(s)));
  return Array.from(set);
}

export function variantsFor(family: Family): string[] {
  const set = new Set<string>();
  productsForFamily(family).forEach((p) => p.variantAxis.values.forEach((v) => set.add(v)));
  return Array.from(set);
}

export function categoriesFor(family: Family): string[] {
  return Array.from(new Set(productsForFamily(family).map((p) => p.category)));
}

export function productBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

/** Filter option lists derived from any product set (e.g. a whole-market shop). */
export function filtersFor(products: Product[]): {
  categories: string[];
  storages: string[];
  variants: string[];
} {
  const categories = new Set<string>();
  const storages = new Set<string>();
  const variants = new Set<string>();
  products.forEach((p) => {
    categories.add(p.category);
    p.storage.forEach((s) => storages.add(s));
    p.variantAxis.values.forEach((v) => variants.add(v));
  });
  return {
    categories: Array.from(categories),
    storages: Array.from(storages),
    variants: Array.from(variants),
  };
}

/** A product plus both price labels already localised for one market. */
export type DisplayProduct = Product & {
  priceWholesale: string;
  priceRetail: string;
};

/**
 * Localise a product's wholesale and retail bands for one market.
 *
 * Kept server-side so the client grid receives plain strings and does not need
 * the full country table in its bundle. The retail band is derived from the
 * wholesale band unless the product publishes its own (see `retailFrom`).
 */
export function displayProducts(products: Product[], c: Country): DisplayProduct[] {
  return products.map((p) => {
    const r = retailBand(p.from, p.to, p.retailFrom, p.retailTo);
    return {
      ...p,
      priceWholesale: `${convert(p.from, c)} – ${convert(p.to, c)}`,
      priceRetail: `${convert(r.from, c)} – ${convert(r.to, c)}`,
    };
  });
}
