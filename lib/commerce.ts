/**
 * Commerce model for the quote-cart shop.
 *
 * This site does not take card payments. It takes an itemised *quote request*
 * (RFQ): the buyer builds a basket, we price it against a confirmed grade mix
 * and destination, and reply with a proforma. That is how refurbished-electronics
 * trade actually works, and it avoids holding a card gateway against inventory
 * that is graded per unit.
 *
 * Prices are indicative USD bands, ex-works Dubai. Two commercial modes share
 * the same catalogue:
 *
 *   wholesale  trade buyers, MOQ 5, the published band.
 *   retail     smaller buyers, MOQ 1, an indicative uplift over wholesale.
 *
 * The uplift is explicit and overridable per product, rather than a silently
 * different number. Anything shown in the UI is labelled indicative; firm
 * pricing only exists on a proforma.
 */

import type { Family } from './catalogue';
import type { GradeCode } from './grades';

export type PriceMode = 'wholesale' | 'retail';

/** Indicative retail uplift over the wholesale band. Override per product. */
export const RETAIL_UPLIFT = 1.35;

export const MOQ: Record<PriceMode, number> = {
  wholesale: 5,
  retail: 1,
};

export const PRICE_MODE_META: Record<
  PriceMode,
  { label: string; short: string; blurb: string }
> = {
  wholesale: {
    label: 'Wholesale / trade',
    short: 'Wholesale',
    blurb: 'Trade pricing, minimum 5 units per line. Firm price on proforma.',
  },
  retail: {
    label: 'Retail / small buyer',
    short: 'Retail',
    blurb: 'Single units and small lots. Indicative retail price, taxes excluded.',
  },
};

export type PriceBand = { from: number; to: number };

export type LinePricing = {
  wholesale: PriceBand;
  retail: PriceBand;
};

export type CartLine = {
  /** Stable identity: same device + grade + storage + variant merges. */
  key: string;
  slug: string;
  name: string;
  family: Family;
  grade: GradeCode;
  storage: string;
  variant: string;
  qty: number;
  pricing: LinePricing;
  wholesaleMoq: number;
  retailMoq: number;
};

export type CartTotals = {
  units: number;
  lineCount: number;
  from: number;
  to: number;
};

export function retailBand(
  from: number,
  to: number,
  overrideFrom?: number,
  overrideTo?: number,
): PriceBand {
  return {
    from: overrideFrom ?? Math.round(from * RETAIL_UPLIFT),
    to: overrideTo ?? Math.round(to * RETAIL_UPLIFT),
  };
}

export function lineKey(slug: string, grade: string, storage: string, variant: string): string {
  return [slug, grade, storage, variant].map((s) => s.trim().toLowerCase()).join('::');
}

export function moqFor(mode: PriceMode, line?: Pick<CartLine, 'wholesaleMoq' | 'retailMoq'>): number {
  if (!line) return MOQ[mode];
  return mode === 'wholesale' ? line.wholesaleMoq : line.retailMoq;
}

export function bandFor(line: CartLine, mode: PriceMode): PriceBand {
  return line.pricing[mode];
}

export function clampQty(value: number, min: number, max = 100000): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

export function lineTotal(line: CartLine, mode: PriceMode): PriceBand {
  const band = bandFor(line, mode);
  return { from: band.from * line.qty, to: band.to * line.qty };
}

export function cartTotals(lines: CartLine[], mode: PriceMode): CartTotals {
  return lines.reduce<CartTotals>(
    (acc, line) => {
      const t = lineTotal(line, mode);
      return {
        units: acc.units + line.qty,
        lineCount: acc.lineCount + 1,
        from: acc.from + t.from,
        to: acc.to + t.to,
      };
    },
    { units: 0, lineCount: 0, from: 0, to: 0 },
  );
}

/** Lines that fall below the MOQ for the active mode — surfaced, never hidden. */
export function linesBelowMoq(lines: CartLine[], mode: PriceMode): CartLine[] {
  return lines.filter((l) => l.qty < moqFor(mode, l));
}

export function isPriceMode(value: string): value is PriceMode {
  return value === 'wholesale' || value === 'retail';
}

/** The subset of a catalogue Product needed to price it. */
export type PricedProduct = {
  from: number;
  to: number;
  retailFrom?: number;
  retailTo?: number;
  wholesaleMoq?: number;
  retailMoq?: number;
};

export function pricingForProduct(p: PricedProduct): LinePricing {
  return {
    wholesale: { from: p.from, to: p.to },
    retail: retailBand(p.from, p.to, p.retailFrom, p.retailTo),
  };
}

export function buildLine(
  p: PricedProduct & { slug: string; name: string; family: Family },
  opts: { grade: GradeCode; storage: string; variant: string },
): Omit<CartLine, 'key'> {
  return {
    slug: p.slug,
    name: p.name,
    family: p.family,
    grade: opts.grade,
    storage: opts.storage,
    variant: opts.variant,
    qty: 0,
    pricing: pricingForProduct(p),
    wholesaleMoq: p.wholesaleMoq ?? MOQ.wholesale,
    retailMoq: p.retailMoq ?? MOQ.retail,
  };
}
