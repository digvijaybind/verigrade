'use client';

/**
 * Inline "add to quote" control on a catalogue card.
 *
 * Collapsed by default so the grid stays scannable; opens a small panel for the
 * three things a quote actually needs — grade, storage and quantity. The MOQ
 * follows the active pricing mode, so a retail buyer is not blocked by the
 * trade minimum and a trade buyer is not accidentally quoted one unit.
 */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { useCart } from './CartProvider';
import { buildLine, moqFor, PRICE_MODE_META } from '@/lib/commerce';
import type { Product } from '@/lib/catalogue';
import type { GradeCode } from '@/lib/grades';

type Props = {
  product: Product;
  quoteHref: string;
};

export default function AddToQuote({ product, quoteHref }: Props) {
  const { add, mode, lines } = useCart();
  const moq = moqFor(mode);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState<GradeCode>(product.grades[0]);
  const [storage, setStorage] = useState(product.storage[0] ?? '');
  const [variant, setVariant] = useState(product.variantAxis.values[0] ?? '');
  const [qty, setQty] = useState(moq);
  const [justAdded, setJustAdded] = useState(false);

  const lineQtyInCart = useMemo(() => {
    const key = [product.slug, grade, storage, variant]
      .map((s) => s.trim().toLowerCase())
      .join('::');
    return lines.find((l) => l.key === key)?.qty ?? 0;
  }, [lines, product.slug, grade, storage, variant]);

  const step = (delta: number) => {
    setQty((q) => Math.max(moq, q + delta));
  };

  const submit = () => {
    add(buildLine(product, { grade, storage, variant }), Math.max(moq, qty));
    setJustAdded(true);
    setOpen(false);
    window.setTimeout(() => setJustAdded(false), 2200);
  };

  if (!open) {
    return (
      <div className="atq-collapsed">
        <button
          type="button"
          className="btn btn--dark btn--sm"
          onClick={() => {
            setQty(Math.max(moq, qty));
            setOpen(true);
          }}
          aria-expanded={false}
        >
          Add to quote <Icon name="plus" size={15} />
        </button>
        {lineQtyInCart > 0 ? (
          <span className="atq-incart" aria-live="polite">
            {lineQtyInCart} in quote
          </span>
        ) : null}
        {justAdded && !lineQtyInCart ? (
          <span className="atq-incart" aria-live="polite">
            Added
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className="atq-panel" role="group" aria-label={`Add ${product.name} to quote`}>
      <div className="atq-grid">
        <label className="atq-field">
          <span>Grade</span>
          <select value={grade} onChange={(e) => setGrade(e.target.value as GradeCode)}>
            {product.grades.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
        </label>

        <label className="atq-field">
          <span>Storage</span>
          <select value={storage} onChange={(e) => setStorage(e.target.value)}>
            {product.storage.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="atq-field">
          <span>{product.variantAxis.label}</span>
          <select value={variant} onChange={(e) => setVariant(e.target.value)}>
            {product.variantAxis.values.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>

        <div className="atq-field">
          <span>
            Quantity <em className="atq-moq">MOQ {moq}</em>
          </span>
          <div className="stepper">
            <button type="button" onClick={() => step(-moq)} aria-label="Decrease quantity">
              −
            </button>
            <input
              type="number"
              inputMode="numeric"
              min={moq}
              value={qty}
              onChange={(e) => setQty(Math.max(moq, Number(e.target.value) || moq))}
              aria-label="Quantity"
            />
            <button type="button" onClick={() => step(moq)} aria-label="Increase quantity">
              +
            </button>
          </div>
        </div>
      </div>

      <p className="atq-note">
        {PRICE_MODE_META[mode].short} pricing · MOQ {moq}. Prices confirmed on proforma.
      </p>

      <div className="btn-row atq-actions">
        <button type="button" className="btn btn--primary btn--sm" onClick={submit}>
          Add {qty} to quote <Icon name="plus" size={15} />
        </button>
        <Link className="btn btn--ghost btn--sm" href={quoteHref}>
          View quote
        </Link>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
