'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Icon from './Icon';
import { useCart } from './CartProvider';
import {
  MOQ,
  PRICE_MODE_META,
  bandFor,
  cartTotals,
  lineTotal,
  linesBelowMoq,
  moqFor,
  type PriceMode,
} from '@/lib/commerce';
import {
  COUNTRIES,
  COUNTRY_CODES,
  convert,
  getCountry,
  type CountryCode,
} from '@/lib/countries';
import {
  DOC_LABELS,
  INCOTERM_LABELS,
  WINDOW_LABELS,
  type QuoteResult,
} from '@/lib/quote';

type Props = { homeCountry: CountryCode };

const DOC_DEFAULT = new Set(['imei', 'grade', 'ddc']);

export default function QuoteCart({ homeCountry }: Props) {
  const { lines, mode, hydrated, setMode, setQty, remove, clear } = useCart();
  const c = getCountry(homeCountry);
  const base = `/${homeCountry}`;

  const [docs, setDocs] = useState<string[]>([...DOC_DEFAULT]);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setResult(null);
    setState('idle');
  }, []);

  const below = useMemo(() => linesBelowMoq(lines, mode), [lines, mode]);
  const totals = useMemo(() => cartTotals(lines, mode), [lines, mode]);
  const blocked = mode === 'wholesale' && below.length > 0;

  const toggleDoc = (key: string) => {
    setDocs((prev) => (prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]));
  };

  const raiseToMoq = (key: string) => {
    const line = lines.find((l) => l.key === key);
    if (!line) return;
    setQty(key, moqFor(mode, line));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (blocked) return;
    if (lines.length === 0 && !form.notes.value.trim()) {
      form.notes.focus();
      setError('Add at least one model, or describe what you need in the notes.');
      setState('error');
      return;
    }

    setState('sending');
    setError('');

    const payload = {
      market: homeCountry,
      mode,
      company: form.company.value,
      contact: form.contact.value,
      email: form.email.value,
      phone: form.phone.value,
      destination: form.destination.value,
      incoterm: form.incoterm.value,
      window: form.window.value,
      notes: form.notes.value,
      website: form.website.value,
      docs,
      lines: lines.map((l) => ({
        slug: l.slug,
        name: l.name,
        grade: l.grade,
        storage: l.storage,
        variant: l.variant,
        qty: l.qty,
      })),
    };

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as QuoteResult & { error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || 'The request could not be sent. Try email or WhatsApp below.');
        setState('error');
        return;
      }
      setResult(data);
      setState('sent');
      clear();
      form.reset();
    } catch {
      setError('Network error. You can send the same request by email or WhatsApp below.');
      setState('error');
    }
  };

  return (
    <>
      <div className="pricemode" role="group" aria-label="Pricing mode">
        <div>
          <strong>{PRICE_MODE_META[mode].label}</strong>
          <span className="pricemode-blurb">{PRICE_MODE_META[mode].blurb}</span>
        </div>
        <div className="seg" role="tablist" aria-label="Choose pricing">
          {(['wholesale', 'retail'] as const).map((m: PriceMode) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              className={mode === m ? 'seg-btn is-on' : 'seg-btn'}
              onClick={() => setMode(m)}
            >
              {PRICE_MODE_META[m].short}
            </button>
          ))}
        </div>
      </div>

      {state === 'sent' && result ? (
        <div className="form-ok" role="status">
          <strong>Quote request received.</strong> Reference <b>{result.reference}</b>.
          {result.delivered ? (
            <> We will reply within one business day with a proforma.</>
          ) : (
            <>
              {' '}
              This site has no mail provider configured yet, so nothing was transmitted. Send the same
              reference to us directly:
              <span className="btn-row" style={{ marginTop: '.9rem' }}>
                {result.mailto ? (
                  <a className="btn btn--primary btn--sm" href={result.mailto}>
                    <Icon name="mail" size={16} /> Email the request
                  </a>
                ) : null}
                {result.whatsapp ? (
                  <a
                    className="btn btn--ghost btn--sm"
                    href={result.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="whatsapp" size={16} /> WhatsApp
                  </a>
                ) : null}
              </span>
            </>
          )}
        </div>
      ) : null}

      {!hydrated ? (
        <div className="cart-panel">
          <p className="muted">Loading your quote…</p>
        </div>
      ) : (
      <div className="cart-panel">
        <div className="cart-head">
          <h2 className="cart-title">
            Your quote <span className="cart-count">{totals.units} units</span>
          </h2>
          {lines.length > 0 ? (
            <button type="button" className="btn btn--ghost btn--sm" onClick={clear}>
              Empty quote
            </button>
          ) : null}
        </div>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <p>
              <strong>Your quote is empty.</strong> Add models from the catalogue, or describe what
              you need in the form below.
            </p>
            <div className="btn-row">
              <Link className="btn btn--primary btn--sm" href={`${base}/shop`}>
                Browse the shop
              </Link>
              <Link className="btn btn--ghost btn--sm" href={`${base}/phones`}>
                Phones
              </Link>
              <Link className="btn btn--ghost btn--sm" href={`${base}/laptops`}>
                Laptops
              </Link>
              <Link className="btn btn--ghost btn--sm" href={`${base}/tablets`}>
                Tablets
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {lines.map((l) => {
                const min = moqFor(mode, l);
                const unit = bandFor(l, mode);
                const tot = lineTotal(l, mode);
                const short = l.qty < min;
                return (
                  <div className="cart-line" key={l.key}>
                    <div className="cart-line-main">
                      <span className="cart-line-name">{l.name}</span>
                      <span className="cart-line-meta">
                        Grade {l.grade} · {l.storage} · {l.variant}
                      </span>
                      {short ? (
                        <span className="cart-line-warn">
                          Below {mode} MOQ of {min}.{' '}
                          <button type="button" className="linkish" onClick={() => raiseToMoq(l.key)}>
                            Set to {min}
                          </button>
                        </span>
                      ) : null}
                    </div>

                    <div className="cart-line-qty">
                      <div className="stepper stepper--sm">
                        <button
                          type="button"
                          onClick={() => setQty(l.key, l.qty - 1)}
                          aria-label={`Decrease ${l.name}`}
                          disabled={l.qty <= 1}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          inputMode="numeric"
                          min={1}
                          value={l.qty}
                          onChange={(e) => setQty(l.key, Number(e.target.value) || 1)}
                          aria-label={`Quantity for ${l.name}`}
                        />
                        <button
                          type="button"
                          onClick={() => setQty(l.key, l.qty + 1)}
                          aria-label={`Increase ${l.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-line-price">
                      <span className="cart-line-each">
                        {convert(unit.from, c)}–{convert(unit.to, c)} each
                      </span>
                      <span className="cart-line-total">
                        {convert(tot.from, c)}–{convert(tot.to, c)}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="cart-line-remove"
                      onClick={() => remove(l.key)}
                      aria-label={`Remove ${l.name}`}
                    >
                      <Icon name="close" size={16} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="cart-total">
              <div>
                <span className="small muted">
                  Indicative {PRICE_MODE_META[mode].short.toLowerCase()} pricing, {c.currency}, ex-works
                  Dubai. Tax and freight excluded.
                </span>
              </div>
              <div className="cart-total-figure">
                <span className="cart-total-label">Estimate</span>
                <strong>
                  {convert(totals.from, c)}–{convert(totals.to, c)}
                </strong>
                <span className="small muted">
                  ${' '}
                  {totals.from.toLocaleString('en-US')}–${totals.to.toLocaleString('en-US')} USD
                </span>
              </div>
            </div>

            {blocked ? (
              <p className="cart-block">
                Wholesale pricing has a minimum of {MOQ.wholesale} units per line. Raise the lines above
                or switch to retail pricing.
              </p>
            ) : null}
          </>
        )}
      </div>
      )}

      <form className="form cart-form" onSubmit={onSubmit} noValidate>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hp-field"
        />

        <h2 id="details">Your details</h2>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="qc-company">
              Company name <span className="req">*</span>
            </label>
            <input id="qc-company" name="company" type="text" required autoComplete="organization" />
          </div>
          <div className="form-field">
            <label htmlFor="qc-contact">
              Your name <span className="req">*</span>
            </label>
            <input id="qc-contact" name="contact" type="text" required autoComplete="name" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="qc-email">
              Email <span className="req">*</span>
            </label>
            <input id="qc-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="form-field">
            <label htmlFor="qc-phone">
              WhatsApp / phone <span className="req">*</span>
            </label>
            <input id="qc-phone" name="phone" type="tel" required autoComplete="tel" />
            <span className="hint">Include your country code. WhatsApp is fastest.</span>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="qc-dest">
              Destination country <span className="req">*</span>
            </label>
            <select id="qc-dest" name="destination" required defaultValue={homeCountry}>
              {COUNTRY_CODES.map((code) => (
                <option key={code} value={code}>
                  {COUNTRIES[code].name}
                </option>
              ))}
              <option value="other">Other — specify in notes</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="qc-incoterm">Preferred Incoterm</label>
            <select id="qc-incoterm" name="incoterm" defaultValue="fob">
              {Object.entries(INCOTERM_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="qc-window">Required delivery window</label>
          <select id="qc-window" name="window" defaultValue="flexible">
            {Object.entries(WINDOW_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="qc-notes">
            Anything specific{' '}
            {lines.length === 0 ? <span className="req">*</span> : null}
          </label>
          <textarea
            id="qc-notes"
            name="notes"
            placeholder={
              'Grade mix you want, target retail channel, importer registration, carton and labelling requirements, or models not in the catalogue.'
            }
          />
        </div>

        <fieldset className="form-field docs-field">
          <legend>Documentation required with shipment</legend>
          <div className="docs-grid">
            {Object.entries(DOC_LABELS).map(([key, label]) => (
              <label key={key} className="doc-check">
                <input
                  type="checkbox"
                  checked={docs.includes(key)}
                  onChange={() => toggleDoc(key)}
                  value={key}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-field">
          <label className="consent">
            <input type="checkbox" required />
            <span className="small">
              I confirm I am authorised to trade, and I understand that orders are screened against
              sanctions and end-use restrictions before dispatch. <span className="req">*</span>
            </span>
          </label>
        </div>

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="btn-row">
          <button className="btn btn--primary" type="submit" disabled={state === 'sending' || blocked}>
            {state === 'sending' ? 'Sending…' : 'Send quote request'}{' '}
            <Icon name="arrow" size={17} />
          </button>
          <a className="btn btn--ghost" href={`/${homeCountry}/contact`}>
            Prefer the full form?
          </a>
        </div>

        <p className="form-note">
          We reply within one business day. Prices are indicative until confirmed on a proforma. We do
          not add you to a marketing list.
        </p>
      </form>
    </>
  );
}
