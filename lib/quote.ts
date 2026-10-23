/**
 * Quote-request (RFQ) contract shared by the client form and the API route.
 *
 * The browser sends USD figures and a plain list of lines; the server rebuilds
 * the message and never trusts a total supplied by the client. Nothing here
 * talks to a payment provider — a quote request is the end of the transaction.
 */

import type { PriceMode } from './commerce';

export type QuoteLineInput = {
  slug: string;
  name: string;
  grade: string;
  storage: string;
  variant: string;
  qty: number;
};

export type QuoteInput = {
  market: string;
  mode: PriceMode;
  company: string;
  contact: string;
  email: string;
  phone: string;
  destination: string;
  incoterm: string;
  window: string;
  notes: string;
  docs: string[];
  lines: QuoteLineInput[];
};

export type QuoteResult = {
  ok: boolean;
  reference: string;
  delivered: boolean;
  channel: 'email' | 'webhook' | 'none';
  mailto?: string;
  whatsapp?: string;
  error?: string;
};

export const DOC_LABELS: Record<string, string> = {
  imei: 'Per-unit IMEI manifest',
  grade: 'Per-unit grade reports',
  ddc: 'Data-destruction certificates',
  coo: 'Certificate of origin',
  warranty: 'Transferable warranty certificate',
  packing: 'Packing list per carton',
  other: 'Other (see notes)',
};

export const INCOTERM_LABELS: Record<string, string> = {
  exw: 'EXW — ex works, Dubai',
  fob: 'FOB — free on board, Jebel Ali',
  cif: 'CIF — cost, insurance and freight',
  dap: 'DAP — delivered at place',
  ddp: 'DDP — delivered duty paid',
  unsure: 'Not sure — advise me',
};

export const WINDOW_LABELS: Record<string, string> = {
  urgent: 'Urgent — under 2 weeks',
  standard: 'Standard — 2 to 5 weeks',
  flexible: 'Flexible',
  ongoing: 'Ongoing / repeat supply',
};

const MAX_LINES = 60;
const MAX_QTY = 100000;

export function makeReference(now = new Date()): string {
  const stamp = now.toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VG-${stamp}-${rand}`;
}

/** Throws with a human-readable message on the first invalid field. */
export function validateQuote(input: unknown): QuoteInput {
  if (!input || typeof input !== 'object') throw new Error('Malformed request body.');
  const q = input as Partial<QuoteInput>;

  const str = (v: unknown, max = 500) =>
    typeof v === 'string' ? v.trim().slice(0, max) : '';

  const company = str(q.company, 160);
  const contact = str(q.contact, 120);
  const email = str(q.email, 200);
  const phone = str(q.phone, 60);
  const destination = str(q.destination, 80);
  const notes = str(q.notes, 4000);

  if (!company) throw new Error('Company name is required.');
  if (!contact) throw new Error('Contact name is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) throw new Error('A valid email is required.');
  if (!phone) throw new Error('A phone or WhatsApp number is required.');
  if (!destination) throw new Error('Destination country is required.');

  const mode: PriceMode = q.mode === 'retail' ? 'retail' : 'wholesale';
  const market = str(q.market, 4).toLowerCase() || 'ae';

  const docs = Array.isArray(q.docs)
    ? [...new Set(q.docs.filter((d): d is string => typeof d === 'string' && d in DOC_LABELS))]
    : [];

  const rawLines = Array.isArray(q.lines) ? q.lines : [];
  const lines: QuoteLineInput[] = rawLines
    .slice(0, MAX_LINES)
    .map((l) => {
      const line = (l ?? {}) as Partial<QuoteLineInput>;
      const qty = Math.floor(Number(line.qty));
      return {
        slug: str(line.slug, 120),
        name: str(line.name, 160),
        grade: str(line.grade, 8),
        storage: str(line.storage, 40),
        variant: str(line.variant, 60),
        qty: Number.isFinite(qty) ? Math.min(MAX_QTY, Math.max(1, qty)) : 0,
      };
    })
    .filter((l) => l.slug && l.name && l.qty > 0);

  const incoterm = str(q.incoterm, 20) || 'unsure';
  const window = str(q.window, 20) || 'flexible';

  return {
    market,
    mode,
    company,
    contact,
    email,
    phone,
    destination,
    incoterm: incoterm in INCOTERM_LABELS ? incoterm : 'unsure',
    window: window in WINDOW_LABELS ? window : 'flexible',
    notes,
    docs,
    lines,
  };
}

export function quoteSubject(q: QuoteInput, reference: string): string {
  const units = q.lines.reduce((n, l) => n + l.qty, 0);
  return `${reference} — ${q.mode === 'retail' ? 'Retail' : 'Wholesale'} quote request, ${units} unit${
    units === 1 ? '' : 's'
  } to ${q.destination}`;
}

/** Plain-text body, used for email, webhook payloads and the mailto fallback. */
export function quoteBody(q: QuoteInput, reference: string): string {
  const lines: string[] = [];
  lines.push(`Reference: ${reference}`);
  lines.push(`Pricing mode: ${q.mode}`);
  lines.push(`Market page: ${q.market}`);
  lines.push('');
  lines.push('BUYER');
  lines.push(`Company: ${q.company}`);
  lines.push(`Contact: ${q.contact}`);
  lines.push(`Email: ${q.email}`);
  lines.push(`Phone / WhatsApp: ${q.phone}`);
  lines.push(`Destination: ${q.destination}`);
  lines.push(`Incoterm: ${INCOTERM_LABELS[q.incoterm] ?? q.incoterm}`);
  lines.push(`Delivery window: ${WINDOW_LABELS[q.window] ?? q.window}`);
  lines.push('');
  lines.push(`LINES (${q.lines.length})`);
  if (q.lines.length === 0) {
    lines.push('(no itemised lines — see notes)');
  } else {
    q.lines.forEach((l, i) => {
      lines.push(
        `${i + 1}. ${l.name} — Grade ${l.grade}, ${l.storage}, ${l.variant} — ${l.qty} units [${l.slug}]`,
      );
    });
  }
  lines.push('');
  lines.push('DOCUMENTATION REQUESTED');
  lines.push(q.docs.length ? q.docs.map((d) => `- ${DOC_LABELS[d] ?? d}`).join('\n') : '- none specified');
  lines.push('');
  lines.push('NOTES');
  lines.push(q.notes || '(none)');
  lines.push('');
  lines.push('Prices are indicative and USD, ex-works Dubai. Firm pricing follows on a proforma.');
  return lines.join('\n');
}
