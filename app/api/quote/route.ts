import { NextResponse } from 'next/server';
import { SITE } from '@/lib/site';
import {
  makeReference,
  quoteBody,
  quoteSubject,
  validateQuote,
  type QuoteInput,
} from '@/lib/quote';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 64 * 1024;
const RATE_LIMIT = 8;
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best-effort, per-instance throttle. Not a substitute for an edge limiter, but
// it stops a naive double-submit or a trivial loop from emailing us 200 times.
const hits = new Map<string, { count: number; resetAt: number }>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function whatsappLink(q: QuoteInput, reference: string): string | undefined {
  const digits = SITE.whatsapp.replace(/[^\d]/g, '');
  if (!digits) return undefined;
  const text = `${reference}: ${q.mode} quote request, ${q.lines.reduce((n, l) => n + l.qty, 0)} units to ${q.destination}. ${q.company} / ${q.contact}.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

function mailtoLink(q: QuoteInput, subject: string, body: string): string | undefined {
  if (!SITE.email) return undefined;
  // Some mail clients truncate long mailto bodies; keep it useful, not complete.
  const trimmed = body.length > 1600 ? `${body.slice(0, 1600)}\n…(truncated)` : body;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(trimmed)}`;
}

async function deliverWebhook(
  url: string,
  token: string | undefined,
  payload: Record<string, unknown>,
): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function deliverEmail(
  apiKey: string,
  to: string,
  from: string,
  subject: string,
  body: string,
  replyTo: string,
): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        text: body,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many quote requests from this connection. Try again shortly.' },
      { status: 429 },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'Request too large.' }, { status: 413 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed JSON.' }, { status: 400 });
  }

  // Honeypot: a hidden field real people never fill. Accept, do not deliver.
  const honeypot = (parsed as { website?: unknown })?.website;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true, reference: makeReference(), delivered: false, channel: 'none' });
  }

  let quote: QuoteInput;
  try {
    quote = validateQuote(parsed);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid request.';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const reference = makeReference();
  const subject = quoteSubject(quote, reference);
  const body = quoteBody(quote, reference);

  const webhookUrl = process.env.QUOTE_WEBHOOK_URL;
  const webhookToken = process.env.QUOTE_WEBHOOK_TOKEN;
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL;
  const fromEmail = process.env.QUOTE_FROM_EMAIL || `${SITE.name} Quotes <${SITE.email}>`;

  let delivered = false;
  let channel: 'email' | 'webhook' | 'none' = 'none';

  if (webhookUrl) {
    delivered = await deliverWebhook(webhookUrl, webhookToken, {
      reference,
      subject,
      text: body,
      quote,
      receivedAt: new Date().toISOString(),
    });
    if (delivered) channel = 'webhook';
  }

  if (!delivered && resendKey && toEmail) {
    delivered = await deliverEmail(resendKey, toEmail, fromEmail, subject, body, quote.email);
    if (delivered) channel = 'email';
  }

  const result = {
    ok: true,
    reference,
    delivered,
    channel,
    mailto: delivered ? undefined : mailtoLink(quote, subject, body),
    whatsapp: whatsappLink(quote, reference),
  };

  return NextResponse.json(result);
}
