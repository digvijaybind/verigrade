'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import Icon from './Icon';
import { COUNTRIES, COUNTRY_CODES, type CountryCode } from '@/lib/countries';
import { DOC_LABELS, INCOTERM_LABELS, WINDOW_LABELS, type QuoteResult } from '@/lib/quote';
import { SITE } from '@/lib/site';

type Props = {
  homeCountry: CountryCode;
  gradeOptions: string[];
  defaultGrade: string;
  defaultModel: string;
};

export default function QuoteForm({ homeCountry, gradeOptions, defaultGrade, defaultModel }: Props) {
  const params = useSearchParams();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState('');
  const [model, setModel] = useState(defaultModel);

  useEffect(() => {
    const q = params.get('model');
    if (q) setModel(q);
  }, [params]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const docs = data.getAll('docs').map(String);
    const destination = String(data.get('destination') ?? homeCountry);
    const grade = String(data.get('grade') ?? 'advise');

    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          market: homeCountry,
          mode: 'wholesale',
          company: data.get('company'),
          contact: data.get('contact'),
          email: data.get('email'),
          phone: data.get('phone'),
          destination,
          incoterm: data.get('incoterm'),
          window: data.get('window'),
          website: data.get('website'),
          docs,
          lines: [],
          notes: [
            'Models and quantities:',
            String(data.get('models') ?? ''),
            '',
            `Preferred grade mix: ${grade}`,
            `Documentation: ${docs.map((d) => DOC_LABELS[d] ?? d).join(', ') || 'none specified'}`,
            `Incoterm: ${INCOTERM_LABELS[String(data.get('incoterm') ?? '')] ?? data.get('incoterm')}`,
            `Delivery window: ${WINDOW_LABELS[String(data.get('window') ?? '')] ?? data.get('window')}`,
            '',
            `Notes: ${String(data.get('notes') ?? '')}`,
          ].join('\n'),
        }),
      });
      const payload = (await res.json()) as QuoteResult & { error?: string };
      if (!res.ok || !payload.ok) {
        setError(payload.error || 'The request could not be sent. Email or WhatsApp us instead.');
        setSending(false);
        return;
      }
      setResult(payload);
      setSent(true);
      setSending(false);
      form.reset();
      setModel('');
    } catch {
      setError('Network error. Email or WhatsApp us instead.');
      setSending(false);
    }
  };

  return (
    <>
      {sent && result ? (
        <div className="form-ok" id="quote-ok" role="status">
          <strong>Request captured.</strong> Reference <b>{result.reference}</b>.{' '}
          {result.delivered ? (
            <>We reply within one business day.</>
          ) : (
            <>
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

      <form className="form" onSubmit={onSubmit} noValidate>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hp-field"
        />
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="q-company">
              Company name <span className="req">*</span>
            </label>
            <input id="q-company" name="company" type="text" required autoComplete="organization" />
          </div>
          <div className="form-field">
            <label htmlFor="q-contact">
              Your name <span className="req">*</span>
            </label>
            <input id="q-contact" name="contact" type="text" required autoComplete="name" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="q-email">
              Email <span className="req">*</span>
            </label>
            <input id="q-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="form-field">
            <label htmlFor="q-phone">
              WhatsApp / phone <span className="req">*</span>
            </label>
            <input id="q-phone" name="phone" type="tel" required autoComplete="tel" />
            <span className="hint">Include your country code. WhatsApp is fastest.</span>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="q-dest">
              Destination country <span className="req">*</span>
            </label>
            <select id="q-dest" name="destination" required defaultValue={homeCountry}>
              {COUNTRY_CODES.map((c) => (
                <option key={c} value={c}>
                  {COUNTRIES[c].name}
                </option>
              ))}
              <option value="other">Other — specify in notes</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="q-incoterm">
              Preferred Incoterm
            </label>
            <select id="q-incoterm" name="incoterm" defaultValue="fob">
              <option value="exw">EXW — ex works, Dubai</option>
              <option value="fob">FOB — free on board, Jebel Ali</option>
              <option value="cif">CIF — cost, insurance and freight</option>
              <option value="dap">DAP — delivered at place</option>
              <option value="ddp">DDP — delivered duty paid</option>
              <option value="unsure">Not sure — advise me</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="q-model">
            Models and quantities <span className="req">*</span>
          </label>
          <textarea
            id="q-model"
            name="models"
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder={'iPhone 13 — 200 units, Grade A/B mix\nGalaxy A54 — 300 units, Grade B\nThinkPad T14 Gen 3 — 60 units, Grade A'}
          />
          <span className="hint">
            One model per line with quantity. If you are not sure of the grade, say so — we will
            propose a mix rather than guess.
          </span>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="q-grade">Preferred grade mix</label>
            <select id="q-grade" name="grade" defaultValue={defaultGrade}>
              <option value="advise">Advise me on the mix</option>
              {gradeOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="q-window">Required delivery window</label>
            <select id="q-window" name="window" defaultValue="flexible">
              <option value="urgent">Urgent — under 2 weeks</option>
              <option value="standard">Standard — 2 to 5 weeks</option>
              <option value="flexible">Flexible</option>
              <option value="ongoing">Ongoing / repeat supply</option>
            </select>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="q-notes">
            Anything specific
          </label>
          <textarea
            id="q-notes"
            name="notes"
            placeholder={
              'Imperative: your importer registration status, required documentation, carton and labelling requirements, target retail channel, or anything you need us to confirm before quoting.'
            }
          />
        </div>

        <div className="form-field">
          <label htmlFor="q-docs">Documentation required with shipment</label>
          <select id="q-docs" name="docs" multiple size={6} style={{ minHeight: 130 }}>
            <option value="imei" defaultChecked>
              Per-unit IMEI manifest
            </option>
            <option value="grade" defaultChecked>
              Per-unit grade reports
            </option>
            <option value="ddc" defaultChecked>
              Data-destruction certificates
            </option>
            <option value="coo">Certificate of origin</option>
            <option value="warranty">Transferable warranty certificate</option>
            <option value="packing">Packing list per carton</option>
            <option value="other">Other — see notes</option>
          </select>
          <span className="hint">Hold Ctrl / Cmd to select more than one.</span>
        </div>

        <div className="form-field">
          <label style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start', fontWeight: 500 }}>
            <input type="checkbox" required style={{ width: 'auto', marginTop: '.3rem' }} />
            <span className="small">
              I confirm I am authorised to trade, and I understand that orders are screened against
              sanctions and end-use restrictions before dispatch.{' '}
              <span className="req">*</span>
            </span>
          </label>
        </div>

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="btn-row">
          <button className="btn btn--primary" type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Send request'} <Icon name="arrow" size={17} />
          </button>
          <a className="btn btn--ghost" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>

        <p className="form-note">
          We reply to quote requests within one business day. We do not add you to a marketing list
          and we do not share your details.
        </p>
      </form>
    </>
  );
}
