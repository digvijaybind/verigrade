/**
 * B2B repair service configuration.
 *
 * VeriGrade runs two commercial models from one facility:
 *
 *  1. `wholesale` — we own the stock, refurbish it, grade it and sell graded units.
 *  2. `service`    — the buyer owns the devices. We repair, wipe, re-grade and
 *                    certify them, and return them. The buyer keeps the
 *                    inventory and the resale margin; we sell capacity.
 *
 * The US and Canada run model 2. This file is the source of truth for what that
 * service actually contains, and it is deliberately explicit about the parts we
 * do not do — a service menu that only lists strengths is a brochure.
 *
 * HONESTY RULES FOR THIS FILE
 *  - Turnaround figures are INDICATIVE BANDS, not commitments. Firm dates are
 *    issued on the proforma against a real intake manifest. See `capacityNote`.
 *  - No throughput number appears here. We do not publish a units-per-day figure
 *    we have not measured, so capacity is expressed as structure (tiers,
 *    stations, controls) plus a band. Anything numeric goes on the proforma.
 *  - Parts we supply are costed back to the buyer at replacement cost or better.
 *    We do not mark up parts and hide it in a labour rate.
 */

import { GRADING_STANDARD } from './site';

export const SERVICE_MODEL = {
  name: 'Bulk phone repair & refurbishment',
  version: '1.0',
  effective: '2026-01-01',
  /**
   * Ownership. This is the single most important thing to be unambiguous about,
   * so it is stated in the config and rendered in the hero.
   */
  ownership:
    'You keep title to your devices at every stage. Nothing we do converts your stock into our stock, and nothing in the contract lets us sell your inventory.',
  /** The commercial unit. */
  unit: 'Per device, per service line',
  minimumIntake: 'Pilot from 25 units. Production runs from 250 units per model family.',
} as const;

/**
 * Service lines. Each is a discrete, separately-priced unit of work.
 *
 * A buyer can take one line or several. They are written so a buyer can build
 * an exact scope, because "we do repairs" is not a scope.
 */
export type ServiceLine = {
  code: string;
  name: string;
  /** The commercial promise, in one sentence. */
  promise: string;
  /** What is physically done. */
  work: string[];
  /** What comes back with the unit. */
  returns: string[];
  /** Indicative turnaround band in working days. Not a commitment. */
  band: string;
  /** The thing most likely to surprise a buyer. Stated up front. */
  caveat: string;
};

export const SERVICE_LINES: ServiceLine[] = [
  {
    code: 'SL-1',
    name: 'Screen replacement',
    promise:
      'Display assembly replaced and the touch layer fully mapped, so a screen that passes a visual check is not the only evidence it works.',
    work: [
      'Display assembly replaced at the tier the model requires',
      'True-colour, brightness-uniformity and full-surface touch mapping before the device is closed',
      'Colour and finish matched to the original where a donor is available, and the mismatch recorded where it is not',
      'Reassembly with new adhesive and a seal integrity check',
    ],
    returns: [
      'New grade report reflecting the parts fitted',
      'Data-destruction certificate re-issued after the open',
      'Full functional re-test, not only the display function',
    ],
    band: '3–6 working days',
    caveat:
      'An aftermarket display caps a unit at Grade C. We will not fit one and grade the device above that, because a cheap part in a high tier is the easiest margin fraud in this trade to commit.',
  },
  {
    code: 'SL-2',
    name: 'Battery replacement',
    promise:
      'Cell replaced and measured to the tier floor, with cycle count and design capacity recorded per unit rather than quoted as a range.',
    work: [
      'Cell replaced to the capacity floor required by the target tier',
      'Charge curve, maximum capacity and cycle count measured and recorded',
      'Thermal check under load, not just a voltage reading',
      'Old cell routed to hazardous handling, never to general waste',
    ],
    returns: [
      'Battery health figure bound to the serial, not a band',
      'Grade recalculated against the battery floor for the new tier',
      'Data-destruction certificate re-issued after the open',
    ],
    band: '2–4 working days',
    caveat:
      'A replacement battery does not reset the device grade on its own. If the cosmetic condition is Grade B, a new battery does not make it an A — it makes the Grade B defensible.',
  },
  {
    code: 'SL-3',
    name: 'Board-level repair',
    promise:
      'Micro-soldering and IC work in-house, because a board worked on by someone we cannot audit is a board we cannot warrant.',
    work: [
      'Symptom-to-component diagnosis: rail measurement, short detection, signal tracing, then a component decision',
      'Shielding and conformal coatings removed only after localisation, and restored afterwards',
      'Re-flow profiles verified per package type before any BGA or IC work',
      'Corrosion and liquid-damage neutralisation before component replacement',
    ],
    returns: [
      'Repair record naming the fault, the board-level action and the components fitted',
      'Load and thermal soak, plus a 48-hour post-repair re-test before the unit is graded',
      'Workmanship guarantee on the repair itself, separate from the device warranty',
    ],
    band: '7–15 working days',
    caveat:
      'Where a board needs several uncertain interventions to have a chance of working, we decline and convert the unit to parts with the fault category recorded. A board write-off is a better outcome for you than a device that keeps coming back.',
  },
  {
    code: 'SL-4',
    name: 'Data destruction & MDM unlock',
    promise:
      'Destruction sequenced BEFORE functional testing, so a device cannot be shelved and later sold without having been wiped.',
    work: [
      'Activation lock and MDM enrolment removed where we are authorised to do so',
      'Purge with verification read-back across OS, firmware, MDM and secure-element layers',
      'Wipe performed before functional test, not after',
      'Fresh certificate issued per serial; the prior certificate marked superseded, not deleted',
    ],
    returns: [
      'Per-serial destruction certificate with tool name and version',
      'MDM unlock status recorded per unit',
      'A clear list of any device we could not clear, with the reason',
    ],
    band: '1–3 working days',
    caveat:
      'We cannot remove an activation lock where the account holder has not authorised it, and we will not attempt to. Those units are returned untouched and flagged. If your backlog contains a lot of them, tell us before the intake so we can plan around it.',
  },
  {
    code: 'SL-5',
    name: 'Grading & certification',
    promise:
      'Your stock put on a published, versioned scale, so the grade is defensible to a buyer rather than asserted by you.',
    work: [
      `Full published test list — ${GRADING_STANDARD.testPointsPhone} points for a phone — plus battery measurement against the tier floor`,
      `Cosmetic inspection at ${GRADING_STANDARD.inspectionLux} lux across ${GRADING_STANDARD.inspectionPointsCosmetic} points, at a defined angle and distance`,
      'Individual defect enumeration rather than a summary adjective',
      'Parts provenance recorded per unit at its actual level',
    ],
    returns: [
      'Per-unit grade report on both axes, cosmetic and functional, separately scored',
      'Certificate number, QR-linked, bound to the serial and the technician ID',
      'Lot-level roll-up so you can see the shape of a whole intake, not just its units',
    ],
    band: '2–5 working days',
    caveat:
      'We grade what is in front of us. We do not grade to a target, and we will not lift a grade to hit a number you need for a buyer. If the intake will not make the grade, you would rather know before you sell it.',
  },
  {
    code: 'SL-6',
    name: 'White-label & consolidation',
    promise:
      'Graded and certified to your specification, under your brand and your certificate numbering, or consolidated into your existing lot.',
    work: [
      'Report layout, certificate numbering and condition language set to your specification and reviewed before the run',
      'Report and certificate issued in your brand, with our legal entity disclosed as the processor',
      'Consolidation with your own stock so one shipment covers repair and replenishment',
      'Delivery sequenced to your receiving schedule rather than ours',
    ],
    returns: [
      'Documents in your format, with our processing role stated on them',
      'A processor agreement covering custody, insurance and liability',
      'Delivery windows aligned to your dock schedule',
    ],
    band: 'Agreed per programme',
    caveat:
      'White-label does not extend our liability to your buyer relationship, and it does not let you publish a warranty longer than the one we can stand behind. We are named as the processor on the paperwork whether or not the report carries your brand.',
  },
];

/** Stages a device passes through, and who owns each. Shown as a service map. */
export const SERVICE_STAGES = [
  { n: 1, name: 'Manifest intake', detail: 'You send a manifest. We reconcile every serial against it and quarantine discrepancies before anything is opened.' },
  { n: 2, name: 'Diagnostics', detail: 'Full test list and diagnostic on every unit, so the fault is diagnosed rather than guessed at and the repairability is known before we quote.' },
  { n: 3, name: 'Quoted scope', detail: 'Per-unit scope and cost, with a written quote. Nothing is worked on before you approve it, and declined units are returned as they arrived.' },
  { n: 4, name: 'Repair', detail: 'Work performed at the tier it requires, in-house, with instruments that are on a calibration schedule.' },
  { n: 5, name: 'Wipe & verify', detail: 'Data destruction repeated after the open, with read-back verification, because an opened device cannot be assumed to still be clean.' },
  { n: 6, name: 'Full re-test', detail: 'Every test point, not only the one that failed, plus a battery measurement against the tier floor.' },
  { n: 7, name: 'Re-grade', detail: 'Cosmetic inspection at 1,000 lux. A grade can go down. It is never promoted above what was sold, and the reason is written on the report.' },
  { n: 8, name: 'Certified return', detail: 'New grade report, new destruction certificate, repair record, exception report, and a return manifest that reconciles to what you sent.' },
];

/** Indicative turnaround bands by batch size. Not commitments. */
export const SERVICE_TURNAROUND = [
  { size: 'Pilot (25–250 units)', band: '5–10 working days', note: 'Deliberately slow lanes. A pilot exists to find the faults in your stock, so nothing is rushed and the exception list is worth reading.' },
  { size: 'Production (250–2,000 units)', band: '10–20 working days', note: 'Steady-state line running. Quoted per model family so a mixed intake does not hold the whole batch.' },
  { size: 'Programme (2,000+ units)', band: 'Agreed, with scheduled runs', note: 'Reserved capacity, scheduled intake windows, and a standing exception report. The right structure for a carrier or a national retailer.' },
];

/** Commercial model. Stated plainly because it is where service contracts go wrong. */
export const SERVICE_COMMERCIALS = {
  pricing: 'Per unit, per service line. No bundled rate that hides what was actually done.',
  parts: 'Parts are costed back to you at replacement cost or better, itemised per unit. Parts we hold and use on your stock remain yours, on your inventory, at cost.',
  tooling: 'No tooling, fixture or software licence fee. If we ever need one, it goes in the quote before the work, not in an invoice afterwards.',
  minimums: 'Pilot from 25 units. Production from 250 per model family. Board-level work quoted individually because the fault distribution is the unknown.',
  payment: 'Proforma on approval, balance against the return manifest. Net terms on request for programme accounts after a first paid run.',
  currency: 'Quoted in USD or AED. Firm figures on the proforma; indicative planning rates on this site are not a quote.',
  liability: 'Custody of your devices is ours from carrier handover to return dispatch, and insured to full replacement value in both directions. The 12-month workmanship guarantee travels with the unit back to you.',
} as const;

/** Why a buyer chooses a repair house over in-house. The honest version. */
export const SERVICE_WHY = [
  {
    title: 'Board-level capability is the expensive one to build',
    body: 'Micro-soldering, re-flow profiling, thermal imaging and the diagnostic software to support them. It is a specialism, it is slow to get right, and it is the capability most repair houses outsource. Ours is in-house, because a board worked on by someone we cannot audit is a board we cannot warrant.',
  },
  {
    title: 'Certification is a process, not a template',
    body: 'A certificate with a resolvable number, bound to a serial and a technician, generated by the same record that produced the grade. Assembling that back-office properly is unglamorous and it is the whole reason a buyer keeps coming back.',
  },
  {
    title: 'Escaping your own backlogs',
    body: 'A carrier return backlog or a trade-in intake at 800 units a week is a staffing problem, not a process problem. It needs bench capacity you can turn on and off, with a return manifest rather than a favours-based arrangement.',
  },
  {
    title: 'The grading argument stops at a published standard',
    body: 'When you pass a warranty to a consumer, the grade has to be defensible. An adjective is not. A versioned standard with numeric criteria and a measurement method is — which is why a mis-graded but working phone is a claimable defect on our warranty and usually is not on anyone else’s.',
  },
];

/** What we do not do. Published because the first call-out always finds it. */
export const SERVICE_LIMITS = [
  {
    title: 'We do not take title, and we do not sell your stock',
    body: 'Your devices remain yours at every stage, in our custody and back in yours. We have no arrangement under which we resell your inventory, and if we ever wanted one you would want to know before the first intake rather than after.',
  },
  {
    title: 'We do not grade to a target',
    body: 'If an intake will not make the grade your buyer requires, we report that rather than grade toward it. This will occasionally cost you a unit we could have passed, and it is the only way a grade means anything when your own customer checks it.',
  },
  {
    title: 'We are not local, and we will not pretend to be',
    body: 'There is no US or Canadian facility, no domestic repair loop, and no local turnaround. Devices go to Dubai and come back. That is the largest single limitation of this model in your market, and we would rather you priced it in from the start.',
  },
  {
    title: 'No claim is accepted on sight',
    body: 'Claims are diagnosed. A unit that fails after we worked on it is a defect in our process and is repaired, replaced or credited. A unit that fails from a pre-existing fault is yours to decide on, with the diagnostic evidence to inform it. Both sides get the record, not just the outcome.',
  },
];

/** Onboarding. The first three steps, so a buyer knows what onboarding costs in effort. */
export const SERVICE_ONBOARDING = [
  { step: '01', title: 'Send a manifest', body: 'Serials, model, storage, and the service lines you want quoted. A spreadsheet is fine. If you do not have reliable serials, say so — that is worth knowing before we quote, because it changes the whole approach.' },
  { step: '02', title: 'Get a per-unit quote', body: 'We diagnose a sample and quote per unit per line, with the exception categories named. You see the fault distribution on your actual stock before you commit, which is usually the most useful thing in the whole process.' },
  { step: '03', title: 'Ship the pilot', body: '25 to 250 units, insured, with a manifest. We return the units, the certificates, and an exception report. You grade a sample against the published criteria before you scale anything.' },
  { step: '04', title: 'Scale to a programme', body: 'Reserved capacity, scheduled intake windows, net terms if a first paid run has gone well, and a standing exception report. Rolling intakes rather than one-off shipments, because that is how repair economics actually work at volume.' },
];

/** What a buyer should measure us on. Deliberately the hard metrics. */
export const SERVICE_METRICS = [
  { metric: 'First-time pass rate', def: 'Units that cleared the full re-test on the first attempt, as a share of units worked on. Anything less than a high-90s figure on screen and battery means the diagnosis was weak, not the parts.' },
  { metric: 'Exception rate by fault category', def: 'The share of units we could not hold to grade, broken down by reason. This is the number that tells you the truth about an intake, and we report it on every return whether it flatters us or not.' },
  { metric: 'Turnaround adherence', def: 'Share of units returned inside the quoted band. A house that quotes optimistically and misses will discover that on the units you care about most.' },
  { metric: 'Grade reproducibility', def: 'Whether our grade on a unit matches the grade your own inspector assigns to the same unit, against the same standard. This is the one that matters if you are passing the grade to a consumer, and it is the one nobody publishes.' },
];

/**
 * Capacity. We publish structure, not throughput.
 *
 * A units-per-day figure is the number a buyer will hold us to, and we will not
 * publish one we have not measured against a real, staffed line. So capacity is
 * expressed as what determines it, and the firm figure is issued per programme
 * on the proforma. `pending` fields render through the placeholder treatment.
 */
export const SERVICE_CAPACITY = {
  structure: [
    { label: 'Work tiers', value: '4', note: 'Component, assembly, board, structural. The tier decides who touches the unit and what verification follows.' },
    { label: 'Board-level', value: 'In-house', note: 'Micro-soldering, BGA re-work, rail and short repair. Not subcontracted, and not subcontracted quietly either.' },
    { label: 'Test points per phone', value: `${GRADING_STANDARD.testPointsPhone}`, note: 'Plus battery measurement against the tier floor.' },
    { label: 'Cosmetic inspection points', value: `${GRADING_STANDARD.inspectionPointsCosmetic}`, note: `At ${GRADING_STANDARD.inspectionLux} lux, at a defined angle and distance. The light level is measured, not assumed.` },
    { label: 'Per-unit evidence', value: '100%', note: 'Grade report, destruction certificate, repair record where applicable. No exceptions.' },
    { label: 'Turnaround', value: 'Quoted per batch', note: 'Firm dates on the proforma against a real manifest. Indicative bands on the site are planning figures, not commitments.' },
  ],
  pending: [
    'Units per day per tier, at a stated staffing assumption',
    'Monthly intake ceiling by model family',
    'Parts stock holding and replenishment lead time',
  ],
  capacityNote:
    'We would rather give you a firm capacity figure on a proforma than a large number on a website. If the number matters to your decision, ask for it in the quote and hold us to it there — that is the document it belongs in.',
} as const;
