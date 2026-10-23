/**
 * The VeriGrade Grading Standard, v1.0 — as implemented in code.
 *
 * Two independent axes, then a combined tier:
 *   cosmetic  : what the device looks like
 *   functional: whether it works, and how well the battery holds
 *
 * The combined tier is what the buyer buys. A device can look perfect and
 * still be graded B if the battery does not reach the tier floor — that is
 * the entire point of separating the axes.
 */

export type GradeCode = 'A+' | 'A' | 'B' | 'C' | 'AB' | 'D';

export type Grade = {
  code: GradeCode;
  name: string;
  /** Battery design-capacity floor, percent. `null` = not tier-applied. */
  batteryFloor: number | null;
  /** Battery ceiling, percent. `null` = no upper bound. */
  batteryCeiling: number | null;
  short: string;
  description: string;
  /** Bullet criteria shown on the grading page and product pages. */
  criteria: string[];
  /** Functional defects tolerated at this tier. `null` = none permitted. */
  functionalDefects: string | null;
  display: string;
  housing: string;
  /** Market positioning note. */
  positioning: string;
  cssClass: string;
  /** Warranty tier index used to look up cover. 0 = best. */
  tier: number;
};

export const GRADES: Grade[] = [
  {
    code: 'A+',
    name: 'Display reference',
    batteryFloor: 95,
    batteryCeiling: null,
    short: 'Factory appearance. Functions as new.',
    description:
      'Factory appearance with no visible marks at arm’s length. Original display, original housing, original camera modules. Functions as new in every tested category. Our highest tier and our smallest volume — treat availability as limited and confirm before you build a plan around it.',
    criteria: [
      'Zero visible marks at 1,000 lux at 30 cm, front, back and all four edges',
      'Original display, housing, camera modules and battery confirmed at intake',
      'All functional test points pass, no exceptions',
      'No prior repair history recorded on the asset',
    ],
    functionalDefects: null,
    display: 'Original only. Any replacement caps the device at A.',
    housing: 'Original only. Any replacement caps the device at A.',
    positioning:
      'Suited to retail shelf programmes and corporate refresh projects where the device is presented as near-new.',
    cssClass: 'grade-A-plus',
    tier: 0,
  },
  {
    code: 'A',
    name: 'Excellent',
    batteryFloor: 90,
    batteryCeiling: 100,
    short: 'Microscopic marks only. Fully functional, no defects.',
    description:
      'Microscopic marks that are not visible without inspection under the stated lighting. Original display and housing. Every functional test point passes. This is the tier most buyers mean when a seller says “excellent” — and the tier we are happy to put a number against.',
    criteria: [
      'Marks microscopic at 1,000 lux, visible only on close inspection',
      'No marks visible in normal use at arm’s length',
      'Original display and housing',
      'All functional test points pass, no exceptions',
    ],
    functionalDefects: null,
    display: 'Original only. Any replacement caps the device at B.',
    housing: 'Original. Minor scuffing permitted.',
    positioning: 'The default retail tier. The volume tier for premium resale.',
    cssClass: 'grade-A',
    tier: 1,
  },
  {
    code: 'B',
    name: 'Very good',
    batteryFloor: 85,
    batteryCeiling: 100,
    short: 'Light marks under direct light. No cracks, no defects.',
    description:
      'Light marks visible under direct light or on close inspection, but no cracks, chips or deformation. Display may be original or an OEM-grade replacement — parts status is stated per unit. Fully functional. This is our highest-volume tier and the one most import programmes run on.',
    criteria: [
      'Light marks visible under direct light at 1,000 lux',
      'No cracks, chips, or structural deformation on any edge',
      'One or more light scuffs on housing permitted',
      'All functional test points pass, no exceptions',
    ],
    functionalDefects: null,
    display: 'Original or OEM-grade replacement. Parts status disclosed on the grade report.',
    housing: 'Original, light scuffing. No replacement.',
    positioning:
      'The working volume tier. Best margin-to-cost ratio in the range and the usual entry point for a new import programme.',
    cssClass: 'grade-B',
    tier: 2,
  },
  {
    code: 'C',
    name: 'Good',
    batteryFloor: 80,
    batteryCeiling: 100,
    short: 'Visible wear. Fully functional.',
    description:
      'Visible wear — scratches, dents, possible display replacement, possible housing replacement. Fully functional with no functional defects. This is the natural entry tier for a local refurbisher or retailer who intends to re-condition and re-sell, and it is where most of the “Grade C means broken” confusion comes from: a VeriGrade C works perfectly.',
    criteria: [
      'Visible scratches or dents on front, back or edges',
      'Cracked or chipped display permitted if the device functions and touch is accurate',
      'Housing replacement permitted',
      'All functional test points pass, no exceptions',
    ],
    functionalDefects: null,
    display: 'Replacement permitted. Parts status disclosed. A device with a replaced display is flagged prominently.',
    housing: 'Replacement permitted. Parts status disclosed.',
    positioning:
      'For processors and retailers who re-condition locally. Not for direct sale as a premium device without further work.',
    cssClass: 'grade-C',
    tier: 3,
  },
  {
    code: 'AB',
    name: 'Raw / ungraded',
    batteryFloor: null,
    batteryCeiling: null,
    short: 'Tested and functional, cosmetically unsorted.',
    description:
      'Functionally tested and working, but cosmetically unsorted — we have not graded the appearance because that is your job or your processor’s. Sold by unit or by weight. The battery figure is stated per lot rather than per tier, and it is printed on the lot sheet, not implied.',
    criteria: [
      'All functional test points pass',
      'Cosmetic condition not assessed or not recorded',
      'Battery measured and reported at lot level, not tier level',
      'Sold by unit or by declared weight',
    ],
    functionalDefects: null,
    display: 'Unassessed. Stated as unsorted on the lot sheet.',
    housing: 'Unassessed.',
    positioning:
      'For processors who grade in-house and want to capture the full margin. Also the cheapest honest way to start a new import lane.',
    cssClass: 'grade-AB',
    tier: 4,
  },
  {
    code: 'D',
    name: 'Parts',
    batteryFloor: null,
    batteryCeiling: null,
    short: 'Non-functional. Spare parts and component reuse.',
    description:
      'Non-functional, or economically uneconomical to repair. Sold for spare parts, donor screens, batteries, cameras, speakers and mainboards. Grade D is never mixed into a graded lot — it is sorted, counted and documented separately, because mixing it into a pallet is how “some of my batch arrived broken” happens.',
    criteria: [
      'Does not pass one or more functional test points, or repair cost exceeds residual value',
      'Sorted by dominant fault: screen, battery, board, camera, water damage, other',
      'Sold as parts only. Not for resale as a working device.',
      'No warranty. Warranty terms explicitly exclude Grade D.',
    ],
    functionalDefects: 'Permitted and expected — this is the definition of the tier.',
    display: 'Not assessed. Fault category recorded instead.',
    housing: 'Not assessed.',
    positioning:
      'Genuinely useful for parts harvesting and component reuse, and honestly labelled so it cannot contaminate a graded shipment.',
    cssClass: 'grade-D',
    tier: 5,
  },
];

export const GRADE_MAP: Record<GradeCode, Grade> = GRADES.reduce(
  (acc, g) => {
    acc[g.code] = g;
    return acc;
  },
  {} as Record<GradeCode, Grade>,
);

export function gradeOf(code: string): Grade {
  return GRADE_MAP[code as GradeCode] ?? GRADE_MAP.B;
}

/* ------------------------------------------------ functional test points -- */

export const PHONE_TEST_POINTS = [
  'Power on, boot to OS',
  'Charging — current draw within range',
  'Battery health — design capacity percentage',
  'Battery cycle count recorded',
  'Display — touch accuracy across full surface',
  'Display — dead pixels, uniformity, backlight',
  'Front and rear cameras — capture, focus, stabilisation',
  'Microphone and speaker — both paths, distortion check',
  'Connectivity — Wi-Fi, Bluetooth, cellular signal',
  'Buttons, switches, ports, microphones — mechanical',
  'Biometric — fingerprint or face, and activation-lock state',
];

export const LAPTOP_TEST_POINTS = [
  'Power on to OS from cold and from sleep',
  'Charging — adapter acceptance and battery charge rate',
  'Battery — design capacity and full charge cycle count',
  'Battery — charge/discharge health under load',
  'Display — panel uniformity, dead pixels, backlight bleed',
  'Display — hinge rigidity and lid mechanism',
  'Keyboard — every key, including function row',
  'Trackpad and pointing device',
  'Audio — speakers, microphone, headphone jack',
  'Camera and microphone array',
  'Wi-Fi, Bluetooth, and wired networking',
  'USB, Thunderbolt / USB-C, HDMI, card reader, docking',
  'Storage — SMART health, write/verify pass, capacity check',
  'Memory — full read/write verification',
  'Graphics — sustained load test, thermal throttling check',
  'Cooling — fan curve, temperature under sustained load',
  'Battery health under sustained load (drain rate)',
  'Screen, webcam and privacy shutter behaviour',
  'Ports — mechanical condition and data pass-through',
  'Operating system install state and activation lock',
  'Firmware / BIOS state and TPM presence',
  'Chassis, lid, base — dents, cracks, flex',
  'Keyboard layout, trackpad click, palm rest wear',
  'Weight-grade verification against declared model',
];

/* -------------------------------------------------- cosmetic criteria ----- */

export const COSMETIC_DIMENSIONS = [
  {
    dimension: 'Front glass',
    method: `1,000 lux inspection lamp, 30 cm, normal viewing angle`,
    Aplus: 'No marks.',
    A: 'Microscopic marks only.',
    B: 'Light scratches. No cracks or chips.',
    C: 'Visible scratching, chips or a cracked but functional panel.',
    D: 'Cracked, shattered or non-functional.',
  },
  {
    dimension: 'Rear housing',
    method: '1,000 lux, rotated through full coverage',
    Aplus: 'No marks.',
    A: 'Microscopic marks only.',
    B: 'Light scuffs, no deformation.',
    C: 'Deep scratches, dents or dents at edges.',
    D: 'Split housing, missing panels, structural damage.',
  },
  {
    dimension: 'Edges & corners',
    method: 'Full perimeter inspection, 1,000 lux',
    Aplus: 'No marks.',
    A: 'Microscopic wear only.',
    B: 'Minor scuffing, no exposed metal.',
    C: 'Exposed metal, small dents.',
    D: 'Bent or broken frame.',
  },
  {
    dimension: 'Camera bump & lenses',
    method: 'Lens-by-lens inspection under magnification',
    Aplus: 'Glass pristine.',
    A: 'No marks visible to the naked eye.',
    B: 'Fine dust in the housing, lenses clear.',
    C: 'Scratched lens cover, housing scuffed.',
    D: 'Cracked lens cover or broken module.',
  },
  {
    dimension: 'Buttons, ports & grilles',
    method: 'Mechanical operation plus visual',
    Aplus: 'Perfect.',
    A: 'Minor cosmetic wear, fully responsive.',
    B: 'Visible wear, fully responsive.',
    C: 'Worn but responsive; port debris cleared at intake.',
    D: 'Non-responsive or damaged.',
  },
  {
    dimension: 'Port & device labelling',
    method: 'Legibility check against OEM reference',
    Aplus: 'Fully legible.',
    A: 'Fully legible.',
    B: 'Partially worn, model still identifiable.',
    C: 'Heavily worn, model identifiable by other means.',
    D: 'Illegible, model unverifiable — routed to unidentifiable holding.',
  },
];

/* -------------------------------------------------------- battery rules --- */

export const BATTERY_RULES = {
  measurement:
    'Health reporting is read from the device battery management system, expressed as a percentage of the original design capacity declared by the manufacturer.',
  conditions: [
    'Device fully charged to 100% and held at ambient temperature for a minimum of 15 minutes before reading.',
    'Ambient temperature 20–25 °C. Readings taken outside this band are re-taken, not adjusted.',
    'Reading taken from the battery management system, not inferred from charge time.',
    'Cycle count recorded alongside the health percentage and reported with it.',
  ],
  floors: 'A+ ≥ 95% · A ≥ 90% · B ≥ 85% · C ≥ 80% · AB stated per lot · D not applicable.',
  belowFloor:
    'A device whose battery health falls below the floor for its measured cosmetic tier is re-graded down, not sold at the tier it looks like. This is the rule that separates us from a seller who grades the cover and ignores the cell.',
  replacement:
    'A battery replaced to reach a tier is recorded as a replaced part on the grade report, and the post-replacement health reading is published. We do not sell a replaced battery as “original”.',
  laptopNote:
    'On laptops we publish cycle count alongside capacity percentage. Capacity alone is misleading on a five-year-old machine: a 92% cell with 1,100 cycles will not serve an all-day buyer the way a 88% cell with 240 cycles will.',
};

export const PARTS_PROVENANCE = {
  levels: [
    {
      level: 'Original / OEM',
      meaning: 'Manufacturer-supplied part fitted at or before first sale.',
      disclosure: 'No disclosure flag on the grade report.',
    },
    {
      level: 'OEM-grade',
      meaning:
        'Third-party part manufactured to original specification. Meets our functional test points and is fit for resale in the grade shown.',
      disclosure: 'Disclosed on the grade report and on the carton. Parts status shown on the product listing.',
    },
    {
      level: 'Aftermarket',
      meaning:
        'Budget replacement part. Functional at the time of sale. Fitted only on Grade C and below, never above.',
      disclosure: 'Disclosed on the grade report. Never used to lift a device into a higher grade.',
    },
  ],
  pairing:
    'Where a device pairs parts (display, battery, camera) for a genuine-configuration check on the original operating system, a replaced part can prevent that check from passing. The affected device is graded C and the reason is printed on the report. We would rather sell you a C with an honest reason than an A that fails the buyer’s own check.',
  statement:
    'Parts status is published per unit. It is not buried in a footnote and it is not summarised as “genuine parts” across a mixed pallet.',
};
