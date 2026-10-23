/**
 * Country / market configuration.
 *
 * Every market carries its own accent colour, currency, language requirement,
 * landed-cost notes and buyer-side compliance flags. Pages read from here so a
 * new market is a data change, not a code change.
 *
 * IMPORTANT — two honesty rules baked into this file:
 *  1. `fx` is an indicative planning rate. Final figures are confirmed on the
 *     proforma invoice. Never present a converted number as a firm quote.
 *  2. `compliance` items are things a buyer's compliance team should confirm.
 *     They change frequently. We are not their legal adviser and we say so on
 *     the page.
 */

export type CountryCode =
  | 'ae' | 'sa' | 'eg' | 'ng' | 'gh' | 'ke' | 'za' | 'us' | 'ca' | 'hk' | 'gb' | 'au';

export type RegionSlug = 'gulf' | 'africa' | 'north-america' | 'asia-pacific' | 'europe';

export type ComplianceItem = {
  topic: string;
  requirement: string;
  note?: string;
};

export type Country = {
  code: CountryCode;
  /** ISO 3166-1 alpha-2, uppercase. */
  iso: string;
  name: string;
  shortName: string;
  region: RegionSlug;
  currency: string;
  currencyName: string;
  /** Indicative USD conversion rate. Planning only. */
  fx: number;
  locale: string;
  /** Right-to-left rendering. */
  rtl?: boolean;
  /** Languages required on consumer-facing documentation in this market. */
  languages: string[];
  /** Market-size positioning line used in headers. */
  headline: string;
  /** One-paragraph market brief used on region pages. */
  brief: string;
  /** Typical demand notes — what actually moves in this market. */
  demand: string[];
  /** Documentation we can prepare for the buyer. */
  docs: string[];
  /** Buyer-side compliance flags. */
  compliance: ComplianceItem[];
  /** Import / duty notes. */
  importNotes: string;
  /** Translation status of this locale. */
  translationStatus: 'complete' | 'in-progress';
  /** Whether we run a local-language desk. */
  localDesk?: string;
  /**
   * Which commercial model this market's pages lead with.
   *
   * - `wholesale` (default): we own the stock, refurbish it, and sell graded units.
   * - `service`: the buyer owns the devices. We repair, wipe, re-grade and certify
   *   them as a service, and the site sells capacity rather than inventory.
   *
   * The US and Canada run `service`. Everything else is unchanged.
   */
  businessModel?: 'wholesale' | 'service';
};

export const REGIONS: {
  slug: RegionSlug;
  name: string;
  tagline: string;
  blurb: string;
}[] = [
  {
    slug: 'gulf',
    name: 'Gulf & MENA',
    tagline: 'Our home market. Shortest lead times, easiest logistics.',
    blurb:
      'Land-and-carry UAE and Saudi Arabia are our strongest lanes. Regional buyers can collect from the Dubai warehouse, or we deliver by road. Arabic documentation is prepared on request, and we can invoice in AED or SAR.',
  },
  {
    slug: 'africa',
    name: 'Africa',
    tagline: 'The volume lane. Air, sea, and DDP where we can.',
    blurb:
      'West, East, North and Southern Africa are where the volume sits. We ship air for replenishment lots and sea for containers, and we prepare origin, conformity and pre-shipment documentation for destination clearance.',
  },
  {
    slug: 'north-america',
    name: 'North America',
    tagline: 'High compliance bar. We meet the paperwork first.',
    blurb:
      'The US and Canada are not price markets, they are documentation markets. Consumer disclosure rules and provincial producer-responsibility regimes mean your resale floor is set by paperwork, not by margin. We ship the evidence with the goods.',
  },
  {
    slug: 'asia-pacific',
    name: 'Asia-Pacific',
    tagline: 'Hong Kong and Australia. Two very different rulebooks.',
    blurb:
      'Hong Kong has its own waste-electrical regime and a Traditional Chinese documentation expectation. Australia runs a supplier registration model and state-level e-waste duties. We prepare market-specific cartons, labels and manifests.',
  },
  {
    slug: 'europe',
    name: 'Europe',
    tagline: 'Single market entry, strictest WEEE obligations.',
    blurb:
      'The UK is a straightforward lane with WEEE obligations sitting with the party placing equipment on the market. We quote EXW and DAP, declare used status accurately, and supply the documentation your WEEE registration needs.',
  },
];

export const COUNTRIES: Record<CountryCode, Country> = {
  /* ---------------------------------------------------------------- UAE -- */
  ae: {
    code: 'ae',
    iso: 'AE',
    name: 'United Arab Emirates',
    shortName: 'UAE',
    region: 'gulf',
    currency: 'AED',
    currencyName: 'UAE dirham',
    fx: 3.6725,
    locale: 'en-AE',
    languages: ['Arabic', 'English'],
    headline: 'Same-city trade. Collect from the DAFZA warehouse, or we deliver by road.',
    brief:
      'We are physically in the UAE, which makes the local lane the least risky part of this business. Orders can be collected, inspected and re-graded on site before they leave. We invoice in AED, issue compliant tax invoices, and can hand over against a proforma within 24 hours.',
    demand: [
      'iPhone 12–15 across all storage tiers',
      'Galaxy S series and A-series mid-range',
      'Business-class laptops for corporate resale',
      'Grade AB raw stock for local processors',
    ],
    docs: [
      'Proforma and commercial invoice',
      'Certificate of origin',
      'Per-unit IMEI manifest',
      'Data-destruction certificates',
      'VeriGrade inspection report',
    ],
    compliance: [
      {
        topic: 'Consumer disclosure',
        requirement:
          'Condition and grade must be described accurately in Arabic and English. Misleading condition claims are a consumer-protection issue, not just a warranty dispute.',
      },
      {
        topic: 'Telecom type approval',
        requirement:
          'TDRA approves handset models and radio configurations for use in the UAE. It does not certify condition grades. We supply the model/type reference on the grade report so your local registration file is complete.',
        note: 'We never describe a refurbished device as "TDRA approved" — that is a category error.',
      },
      {
        topic: 'Electrical conformity',
        requirement:
          'Chargers and power supplies supplied into the UAE may need ECAS/ESMA conformity. Our stock ships with original or certified third-party chargers; the certificate is listed on the unit paperwork.',
      },
      {
        topic: 'Customs valuation',
        requirement:
          'Used goods must be declared accurately. Declaring refurbished handsets as new is a serious misdeclaration and creates liability for you at clearance and after.',
      },
    ],
    importNotes:
      'Domestic movement within the UAE does not attract duty. Re-export from the free zone does. Ask for the FOB value and the re-export treatment explicitly on the invoice.',
    translationStatus: 'complete',
  },

  /* -------------------------------------------------------------- Saudi -- */
  sa: {
    code: 'sa',
    iso: 'SA',
    name: 'Saudi Arabia',
    shortName: 'Saudi Arabia',
    region: 'gulf',
    currency: 'SAR',
    currencyName: 'Saudi riyal',
    fx: 3.75,
    locale: 'ar-SA',
    rtl: true,
    languages: ['Arabic', 'English'],
    headline: 'Road freight from Dubai. Arabic documentation prepared on request.',
    brief:
      'A close, fast lane with real volume in the mid-range Android and older iPhone segments. We prepare Arabic-language carton labels and a bilingual proforma, and quote EXW or DAP Riyadh and Jeddah. SABER and product-conformity steps are the importer’s responsibility; we supply the underlying technical and origin data.',
    demand: [
      'Galaxy A-series and S-series',
      'iPhone 11–14, storage-varied',
      'Mid-range Windows laptops for SME resale',
      'Mixed-grade pallets for local refurbishers',
    ],
    docs: [
      'Bilingual proforma (AR/EN)',
      'Commercial invoice and packing list',
      'Certificate of origin',
      'IMEI manifest and grade reports',
      'Arabic carton labelling',
    ],
    compliance: [
      {
        topic: 'Product conformity',
        requirement:
          'Certain consumer electronics require conformity assessment under SABER. This sits with the Saudi importer. We provide the manufacturer, model and origin data needed to complete the file.',
      },
      {
        topic: 'Arabic labelling',
        requirement:
          'Consumer-facing grade descriptions and warranty summaries should be available in Arabic. We print bilingual grade and warranty inserts.',
      },
      {
        topic: 'Communications equipment',
        requirement:
          'Handset models are regulated by the Communications, Space & Transport Commission. We supply type/model references; the importer holds the authorisation.',
      },
    ],
    importNotes:
      'Saudi customs duty and VAT apply on the CIF value. Zakat and withholding can also apply on import — your broker will confirm the treatment for your entity type.',
    translationStatus: 'in-progress',
    localDesk: 'Arabic documentation prepared on request',
  },

  /* -------------------------------------------------------------- Egypt -- */
  eg: {
    code: 'eg',
    iso: 'EG',
    name: 'Egypt',
    shortName: 'Egypt',
    region: 'africa',
    currency: 'EGP',
    currencyName: 'Egyptian pound',
    fx: 48.6,
    locale: 'ar-EG',
    rtl: true,
    languages: ['Arabic', 'English'],
    headline: 'North Africa lane. Sea to Alexandria, or air for replenishment lots.',
    brief:
      'Egypt is a price-sensitive volume market with strong demand for mid-range Android and pre-owned iPhone. Air freight is competitive for replenishment; sea suits container volumes. Arabic labelling and a bilingual invoice are standard, and the local regulatory import step is the importer’s to complete.',
    demand: [
      'iPhone 11–13',
      'Samsung and Xiaomi mid-range',
      'Entry and mid-tier laptops',
      'Grade C stock for local refurbishment',
    ],
    docs: [
      'Bilingual proforma (AR/EN)',
      'Commercial invoice and packing list',
      'Certificate of origin',
      'IMEI manifest',
      'Arabic carton labelling',
    ],
    compliance: [
      {
        topic: 'Import registration',
        requirement:
          'Telecoms equipment imports are subject to the national regulator’s registration. The importer handles registration; we supply model, type and conformity data.',
      },
      {
        topic: 'Arabic consumer information',
        requirement:
          'Warranty and condition information should be supplied in Arabic. Bilingual grade inserts are available on all lots.',
      },
      {
        topic: 'Restricted goods',
        requirement:
          'Certain older radio equipment and batteries are restricted. Our product list is screened against destination restrictions before dispatch.',
      },
    ],
    importNotes:
      'Duty, VAT and a range of fees apply. Certain used electronics have specific valuation treatment — confirm with your broker before the proforma is issued.',
    translationStatus: 'in-progress',
    localDesk: 'Arabic documentation prepared on request',
  },

  /* ------------------------------------------------------------ Nigeria -- */
  ng: {
    code: 'ng',
    iso: 'NG',
    name: 'Nigeria',
    shortName: 'Nigeria',
    region: 'africa',
    currency: 'NGN',
    currencyName: 'Nigerian naira',
    fx: 1540,
    locale: 'en-NG',
    languages: ['English'],
    headline: 'Our largest West African lane. Air and sea, DDP available into Lagos.',
    brief:
      'Nigeria is the deepest refurbished-phone market in West Africa and the reason VeriGrade exists. Reconditioners buy by the pallet and sell by the unit, so documentation quality decides whether the container is worth shipping. DDP into Lagos and Tema is available, which is usually where the real cost advantage sits.',
    demand: [
      'iPhone 11–15 — very high volume',
      'iPhone X / XS / XR clearance',
      'Samsung Galaxy S and A series',
      'Tecno, Infinix, Itel entry Android',
      'HP, Dell and Lenovo business laptops',
    ],
    docs: [
      'Proforma and commercial invoice',
      'Certificate of origin',
      'Full IMEI manifest (mandatory for customs)',
      'Per-unit grade reports',
      'Data-destruction certificates',
      'Form EINV / shipping documents as required by your broker',
    ],
    compliance: [
      {
        topic: 'IMEI and NCC registration',
        requirement:
          'Telecoms equipment must be type-approved and the importer must hold the relevant approval. IMEI data is required at clearance — we supply a per-unit manifest as standard.',
        note: 'A device that is not on the national approved list will attract import restrictions. Confirm the list before you commit to a model.',
      },
      {
        topic: 'Standards conformity',
        requirement:
          'A conformity assessment (SONCAP-equivalent route) may be required for regulated goods. This is the importer’s step; we provide the technical data.',
      },
      {
        topic: 'Battery and air freight',
        requirement:
          'Lithium batteries shipped by air must be packed and documented to IATA dangerous-goods rules. We ship compliant-packed and supply the DG declaration.',
      },
    ],
    importNotes:
      'Landed cost depends heavily on FX access and the duty regime in force. We quote EXW, FOB, CIF and DDP Lagos so you can model each route. Rates on this page are indicative and confirmed on the proforma.',
    translationStatus: 'complete',
  },

  /* -------------------------------------------------------------- Ghana -- */
  gh: {
    code: 'gh',
    iso: 'GH',
    name: 'Ghana',
    shortName: 'Ghana',
    region: 'africa',
    currency: 'GHS',
    currencyName: 'Ghanaian cedi',
    fx: 15.4,
    locale: 'en-GH',
    languages: ['English'],
    headline: 'Sea and air into Tema. Clean manifests, fast clearance support.',
    brief:
      'Ghana is a smaller market than Nigeria but a disciplined one, and Tema is a genuine gateway for the sub-region. We ship the same documentation set we ship to Lagos, and we support consolidation if you are splitting a container across importers.',
    demand: [
      'iPhone 11–14',
      'Samsung Galaxy A and S series',
      'Used business laptops',
      'Grade B and C for local refurbishment',
    ],
    docs: [
      'Proforma and commercial invoice',
      'Certificate of origin',
      'IMEI manifest',
      'Grade reports and destruction certificates',
    ],
    compliance: [
      {
        topic: 'Conformity assessment',
        requirement:
          'Ghana operates a conformity assessment regime for regulated imports, managed through approved inspection providers. The importer initiates it.',
      },
      {
        topic: 'Environmental levy',
        requirement:
          'Ghana levies on certain waste and electronic imports. The rate and classification should be confirmed with your broker before the proforma is issued.',
      },
      {
        topic: 'Telecom approval',
        requirement:
          'Handset models must be approved by the national regulator. Confirm the approved list per model before you commit volume.',
      },
    ],
    importNotes:
      'Duty, VAT and levies apply on CIF. We provide the full declared value breakdown so your broker can classify accurately.',
    translationStatus: 'complete',
  },

  /* -------------------------------------------------------------- Kenya -- */
  ke: {
    code: 'ke',
    iso: 'KE',
    name: 'Kenya',
    shortName: 'Kenya',
    region: 'africa',
    currency: 'KES',
    currencyName: 'Kenyan shilling',
    fx: 129,
    locale: 'en-KE',
    languages: ['English', 'Swahili'],
    headline: 'East African hub. Air to Mombasa and Nairobi, sea to Mombasa.',
    brief:
      'Kenya is the East African hub — a lot bought in Mombasa is redistributed inland and onward. Air freight keeps replenishment fast; sea moves the pallet volume. Swahili is widely used alongside English in consumer documentation and we supply bilingual inserts on request.',
    demand: [
      'iPhone 11–14',
      'Samsung and Tecno mid-range',
      'Business laptops for SME resale',
      'Grade C working stock',
    ],
    docs: [
      'Proforma and commercial invoice',
      'Certificate of origin',
      'IMEI manifest',
      'Grade reports and destruction certificates',
      'Bilingual EN/SW inserts on request',
    ],
    compliance: [
      {
        topic: 'Type approval',
        requirement:
          'Telecoms equipment requires type approval from the national regulator. The importer holds the authorisation; confirm the approved model list before ordering.',
      },
      {
        topic: 'E-waste and EPR',
        requirement:
          'Kenya has introduced e-waste management rules placing duties on producers and importers of electrical and electronic equipment. Your local compliance owner should confirm the current obligations and any registration required.',
        note: 'Regulations in this area have been amended recently. Treat this as a prompt to check, not as a statement of the rule.',
      },
      {
        topic: 'Transit and re-export',
        requirement:
          'Kenya is a common transit point for the wider East African Common Market. Declare the true end use and destination — we will not support transshipment declarations that understate the destination.',
      },
    ],
    importNotes:
      'Duty is assessed on CIF value. EAC common external tariff applies across the region. Mombasa port handling and clearing costs are material — ask for a landed estimate, not just a freight quote.',
    translationStatus: 'complete',
  },

  /* ------------------------------------------------------- South Africa -- */
  za: {
    code: 'za',
    iso: 'ZA',
    name: 'South Africa',
    shortName: 'South Africa',
    region: 'africa',
    currency: 'ZAR',
    currencyName: 'South African rand',
    fx: 18.4,
    locale: 'en-ZA',
    languages: ['English', 'Afrikaans'],
    headline: 'Durban and Cape Town. Sea lanes, with a warranty regime that expects a paper trail.',
    brief:
      'South African buyers want documentation more than most, because the consumer-protection and warranty position at retail is enforced. If you are supplying a retailer, they will ask for a warranty that a consumer can actually claim against. Ours is written, uniform, and transferable with the resale.',
    demand: [
      'iPhone 12–15',
      'Samsung Galaxy S series',
      'HP EliteBook, Lenovo ThinkPad, Dell Latitude',
      'Grade A/B for retail channels',
    ],
    docs: [
      'Proforma and commercial invoice',
      'Certificate of origin',
      'IMEI manifest',
      'Grade reports and destruction certificates',
      'Written warranty certificate, transferable',
    ],
    compliance: [
      {
        topic: 'Consumer warranty disclosure',
        requirement:
          'South African consumer law is strict about warranty representation. The warranty supplied with the goods must match what is advertised. Ours is one figure, stated identically on this site, on the contract and on the invoice.',
        note: 'A warranty you cannot evidence at point of sale is a regulatory problem for you, not for us.',
      },
      {
        topic: 'Electronics and ICASA',
        requirement:
          'Radio equipment requires type approval from the national regulator. The importer is responsible. We provide model and type references.',
      },
      {
        topic: 'Waste and e-waste',
        requirement:
          'Extended producer responsibility obligations apply to the party placing equipment on the local market. Confirm current national requirements with your compliance owner.',
      },
    ],
    importNotes:
      'Duty, VAT and levies apply on CIF. The rand is volatile, so we quote validity windows tightly and recommend confirming FX at order placement.',
    translationStatus: 'complete',
  },

  /* ---------------------------------------------------------------- US -- */
  us: {
    code: 'us',
    iso: 'US',
    name: 'United States',
    shortName: 'United States',
    region: 'north-america',
    currency: 'USD',
    currencyName: 'US dollar',
    fx: 1,
    locale: 'en-US',
    languages: ['English', 'Spanish'],
    businessModel: 'service',
    headline: 'Bulk phone repair and refurbishment capacity for US resellers, retailers and carriers.',
    brief:
      'You own the devices. We repair, wipe, re-grade and certify them. VeriGrade operates a high-volume phone refurbishment line in Dubai and we sell that capacity to North American businesses that already have stock and need it put right, documented and sellable — without taking ownership of the inventory. Every unit comes back with a published grade, a per-unit certificate, and a return manifest your compliance team can reconcile.',
    demand: [
      'iPhone 11–15 screen, battery and port repair at volume',
      'Trade-in and carrier return-backlog processing',
      'Grade-C uplift to retail grade',
      'Data destruction and MDM unlock for resale lots',
      'Board-level repair where a screen swap would not hold',
      'White-label grading for retailers and refurb resellers',
    ],
    docs: [
      'Per-unit repair record naming parts and technician',
      'Per-unit grade report with battery health',
      'Data-destruction certificates, re-issued after every open',
      'IMEI/MEID manifest reconciled to the serials you sent',
      'Consolidated commercial invoice and return packing list',
      'Exception report for units we could not hold to grade',
    ],
    compliance: [
      {
        topic: 'FTC disclosure of refurbished status',
        requirement:
          'Devices sold as refurbished or used must be disclosed as such, in the listing and in the advertising, before the consumer buys. Unqualified “available”, “new” or “like new” representations on a refurbished unit are a deceptive-advertising risk.',
        note: 'Your resale listing must disclose condition in the same language and prominence as the price. We format our grade report to be screenshot-friendly for that purpose.',
      },
      {
        topic: 'Magnuson-Moss / state warranty law',
        requirement:
          'A written warranty on a consumer good triggers federal and state warranty obligations, including disclosure of terms and availability of repair or refund. If you pass our warranty to a consumer, that obligation transfers with it.',
        note: 'This is exactly why our warranty length is identical on the website, the contract and the invoice. Inconsistency is the single easiest thing to lose a claim on.',
      },
      {
        topic: 'Battery and hazardous materials',
        requirement:
          'Lithium batteries shipped by air are subject to IATA and DOT dangerous-goods rules, including state-of-charge limits and packaging. We ship compliant-packed and provide the declaration.',
      },
      {
        topic: 'State e-waste and EPR laws',
        requirement:
          'Many states impose producer-responsibility and covered-device obligations on the party selling covered devices into the state. Registration, marking or take-back duties vary by state and change often.',
        note: 'This is your local compliance question, not ours. Flag it to the right person before you ship into a new state.',
      },
      {
        topic: 'IMEI and carrier blacklisting',
        requirement:
          'Devices financed or lost are blocked by US carriers. A blacklist flag makes the device permanently unusable. This is why we clear and guarantee IMEI status rather than treating it as a formality.',
      },
    ],
    importNotes:
      'Duty is assessed on entered value and varies by HTS classification. Section 301 tariffs can apply to certain categories — confirm the current treatment for each HTS code with your customs broker. We declare accurately and never under-invoice.',
    translationStatus: 'complete',
  },

  /* ------------------------------------------------------------ Canada -- */
  ca: {
    code: 'ca',
    iso: 'CA',
    name: 'Canada',
    shortName: 'Canada',
    region: 'north-america',
    currency: 'CAD',
    currencyName: 'Canadian dollar',
    fx: 1.36,
    locale: 'en-CA',
    languages: ['English', 'French'],
    businessModel: 'service',
    headline: 'Bulk phone repair capacity for Canada, with bilingual output and provincial EPR data.',
    brief:
      'Canadian resellers and retailers have the same problem as their US counterparts — stock that needs repair, certifying and grading to a published standard — plus bilingual consumer documentation and provincial producer-responsibility registration. We process your devices in Dubai, return them re-graded and re-certified, and supply the unit, weight and category data your provincial registration and reporting need. The registration itself stays with the importer, because it has to.',
    demand: [
      'iPhone 11–15 repair at volume',
      'Grade-C uplift to A/B retail grade',
      'Bilingual grade inserts and warranty summaries',
      'Data destruction certificates for resale lots',
      'Ontario and Quebec EPR reporting data',
      'White-label grading for refurb resellers',
    ],
    docs: [
      'Per-unit repair record and grade report',
      'Bilingual (EN/FR) grade inserts and warranty summaries',
      'Data-destruction certificates, re-issued after every open',
      'IMEI manifest reconciled to the serials you sent',
      'EPR reporting dataset: units, weight, category, province of sale',
      'Exception report for units we could not hold to grade',
    ],
    compliance: [
      {
        topic: 'Bilingual labelling',
        requirement:
          'Consumer-facing product and warranty information is generally required in both English and French. We prepare bilingual grade and warranty inserts, and can issue a French-language proforma.',
        note: 'Quebec has additional language requirements for commercial documentation. Confirm scope for your specific channel.',
      },
      {
        topic: 'Provincial producer responsibility and e-waste',
        requirement:
          'Ontario and several other provinces operate producer-responsibility regimes for covered electronics, with registration, reporting and stewardship obligations on producers and importers.',
        note: 'Obligations and covered categories differ by province and are amended regularly. Confirm current requirements with your provincial compliance owner before first shipment.',
      },
      {
        topic: 'Privacy and data handling',
        requirement:
          'If a device arrives with a previous owner’s accounts, cloud data or a Find-My / activation lock, you inherit a privacy exposure. PIPEDA applies federally and provincial equivalents add stricter obligations in Quebec.',
        note: 'This is the strongest commercial argument for per-unit destruction certificates in the Canadian market.',
      },
      {
        topic: 'Competition Bureau advertising',
        requirement:
          'Representations about product quality, grading and warranty must be accurate and supportable. The Competition Bureau actively examines environmental and “green” claims.',
        note: 'We hold no e-waste or “green” certification and do not display one. Do not add a logo you have not licensed.',
      },
    ],
    importNotes:
      'Duty and GST/HST apply on entered value. GST is recoverable for registered importers. We provide the full value breakdown for your broker’s classification.',
    translationStatus: 'complete',
  },

  /* ------------------------------------------------- Hong Kong SAR ------ */
  hk: {
    code: 'hk',
    iso: 'HK',
    name: 'Hong Kong SAR',
    shortName: 'Hong Kong',
    region: 'asia-pacific',
    currency: 'HKD',
    currencyName: 'Hong Kong dollar',
    fx: 7.81,
    locale: 'zh-HK',
    languages: ['Traditional Chinese', 'English'],
    headline: 'Re-export gateway into mainland China. Traditional Chinese documentation as standard.',
    brief:
      'Hong Kong is less a destination than a re-export hub, which makes the documentation set the whole game. Buyers here are typically shipping onward into mainland China, so what matters is a clean, accurate, bilingual-enough set of papers that survives customs on both legs. We prepare Traditional Chinese cartons, labels and proformas as standard on Hong Kong orders.',
    demand: [
      'iPhone 12–15, high volume',
      'Samsung and Xiaomi mid-to-high range',
      'Business laptops for mainland enterprise resale',
      'Grade A/B for retail distribution',
    ],
    docs: [
      'Bilingual proforma (繁體中文 / English)',
      'Commercial invoice and packing list',
      'Certificate of origin',
      'IMEI manifest',
      'Grade reports and destruction certificates',
      'Traditional Chinese carton and warranty labelling',
    ],
    compliance: [
      {
        topic: 'Waste electrical and electronic equipment regime',
        requirement:
          'Hong Kong operates a producer-responsibility regime for waste electrical and electronic equipment. Registration, reporting and possibly labelling obligations apply to the party supplying equipment into the market.',
        note: 'The regime has been subject to amendment. Confirm the current obligations, including any labelling requirement, with your local compliance owner.',
      },
      {
        topic: 'RoHS and product safety',
        requirement:
          'Electrical and electronic products placed on the Hong Kong market may be subject to RoHS and general product-safety requirements. Our chargers and power supplies are documented; the compliance holder is the party placing them on the market.',
      },
      {
        topic: 'Re-export and end use',
        requirement:
          'Where a consignment is re-exported onward, the declared end use and destination must be accurate. We will not support a declaration that understates the final destination.',
      },
      {
        topic: 'Description and labelling language',
        requirement:
          'Descriptions and grade statements intended for Hong Kong customers should be in Traditional Chinese and English. We produce both on cartons, inserts and proformas for this lane.',
      },
    ],
    importNotes:
      'Hong Kong is a free port with no customs duty on most goods, but transaction documentation and the description of goods still matter for onward clearance. There is no VAT or GST. Declare the true value and true condition.',
    translationStatus: 'complete',
    localDesk: 'Traditional Chinese documentation as standard',
  },

  /* ------------------------------------------------------------ UK ----- */
  gb: {
    code: 'gb',
    iso: 'GB',
    name: 'United Kingdom',
    shortName: 'United Kingdom',
    region: 'europe',
    currency: 'GBP',
    currencyName: 'Pound sterling',
    fx: 0.79,
    locale: 'en-GB',
    languages: ['English'],
    headline: 'WEEE obligations sit with whoever places the device on the UK market.',
    brief:
      'The UK lane is straightforward commercially, but WEEE producer obligations are the thing to get right. Whoever first places equipment on the UK market carries the duty, and it does not disappear because the goods were imported. We give you the weight, material and category data your registration and reporting need.',
    demand: [
      'iPhone 12–15',
      'Samsung Galaxy and Google Pixel',
      'Business laptops, high Grade A share',
      'Grade B for trade-in arbitrage',
    ],
    docs: [
      'Proforma and commercial invoice',
      'Certificate of origin',
      'IMEI manifest',
      'Grade reports and destruction certificates',
      'WEEE category and material data per unit',
    ],
    compliance: [
      {
        topic: 'WEEE producer responsibility',
        requirement:
          'Producers placing electrical and electronic equipment on the UK market have registration and reporting obligations. These sit with the party placing the equipment on the market, not the manufacturer.',
        note: 'We supply the data you need for registration and reporting. The obligation is yours and cannot be transferred by contract.',
      },
      {
        topic: 'UKCA and product conformity',
        requirement:
          'Product conformity marking requirements apply to certain equipment. Confirm which apply to the specific models and power supply you are placing on the market.',
      },
      {
        topic: 'UK GDPR',
        requirement:
          'The UK GDPR and Data Protection Act apply to the personal data on second-hand devices. Per-unit data-destruction evidence is the practical way to demonstrate compliance in the chain.',
      },
    ],
    importNotes:
      'Import VAT and duty apply on the customs value. We quote EXW, DAP and DDP. Accurate used-goods declaration matters — misdeclaration is a criminal offence and creates liability after the sale.',
    translationStatus: 'complete',
  },

  /* --------------------------------------------------------- Australia -- */
  au: {
    code: 'au',
    iso: 'AU',
    name: 'Australia',
    shortName: 'Australia',
    region: 'asia-pacific',
    currency: 'AUD',
    currencyName: 'Australian dollar',
    fx: 1.52,
    locale: 'en-AU',
    languages: ['English'],
    headline: 'A registration-driven market. AEOFRS numbers and state e-waste duties.',
    brief:
      'Australia is the most documentation-intensive market on this site relative to its size. Supplier registration, electrical-equipment safety registration and state-level e-waste obligations all sit with the party placing the goods on the Australian market. The upside is that serious buyers pay properly for a supplier who can hand over the paperwork without arguing.',
    demand: [
      'iPhone 12–15',
      'Samsung Galaxy S series',
      'ThinkPad / EliteBook / Latitude laptops',
      'Grade A/B only — consumer expectations are high',
    ],
    docs: [
      'Proforma and commercial invoice',
      'Certificate of origin',
      'IMEI manifest',
      'Grade reports and destruction certificates',
      'Equipment category and compliance data per unit',
    ],
    compliance: [
      {
        topic: 'Electrical equipment safety registration',
        requirement:
          'Certain electrical and electronic equipment placed on the Australian market must be registered, and the responsible supplier must hold a registration number that can be checked.',
        note: 'The registration number must be verifiable. A logo without a number is worse than no logo — it invites the question you cannot answer.',
      },
      {
        topic: 'State and territory e-waste duties',
        requirement:
          'Producer-responsibility schemes operate at state and territory level for covered electronic equipment, with funding contributions and reporting obligations on importers placing equipment on the market.',
        note: 'Coverage and rates change. Confirm the current position for the state or territory you are shipping into.',
      },
      {
        topic: 'Australian Consumer Law',
        requirement:
          'Goods supplied in trade must be of acceptable quality and must match any description or sample. A grade description is a representation, and it has to hold.',
        note: 'Again: this is why the published criteria are contractual for us, not marketing copy.',
      },
    ],
    importNotes:
      'Duty, GST and import processing charges apply. Bio-security and border inspection can add cost and time. We declare accurately and provide the documentation your broker needs up front.',
    translationStatus: 'complete',
  },
};

/* ------------------------------------------------------------- helpers -- */

export const DEFAULT_COUNTRY: CountryCode = 'ae';

export const COUNTRY_CODES = Object.keys(COUNTRIES) as CountryCode[];

export function isCountryCode(value: string): value is CountryCode {
  return Object.prototype.hasOwnProperty.call(COUNTRIES, value);
}

export function getCountry(code: string): Country {
  return COUNTRIES[isCountryCode(code) ? code : DEFAULT_COUNTRY];
}

export function countriesInRegion(region: RegionSlug): Country[] {
  return COUNTRY_CODES.map((c) => COUNTRIES[c]).filter((c) => c.region === region);
}

export function getRegion(slug: string) {
  return REGIONS.find((r) => r.slug === slug);
}

/** Format an indicative USD amount in the target currency. */
export function convert(amountUsd: number, country: Country): string {
  const value = amountUsd * country.fx;
  return formatLocal(value, country);
}

export function formatLocal(value: number, country: Country): string {
  const fractionDigits = country.fx < 10 ? 0 : 0;
  return new Intl.NumberFormat(country.locale.replace('-CA', '-CA'), {
    style: 'currency',
    currency: country.currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/** Format a plain number with thousands separators. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
