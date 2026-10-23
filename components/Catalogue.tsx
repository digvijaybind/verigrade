'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import DeviceArt from './DeviceArt';
import AddToQuote from './AddToQuote';
import { useCart } from './CartProvider';
import type { Product, Stock, DisplayProduct } from '@/lib/catalogue';
import type { GradeCode } from '@/lib/grades';
import { PRICE_MODE_META } from '@/lib/commerce';

export type { DisplayProduct } from '@/lib/catalogue';

type Props = {
  products: DisplayProduct[];
  categories: string[];
  storages: string[];
  variants: string[];
  variantLabel: string;
  grades: GradeCode[];
  quoteHref: string;
  base?: string;
  emptyHint: string;
  priceCaption: string;
};

const STOCK_LABEL: Record<Stock, string> = {
  in: 'In stock',
  low: 'Limited',
  out: 'On request',
};

export default function Catalogue({
  products,
  categories,
  storages,
  variants,
  variantLabel,
  grades,
  quoteHref,
  base: baseProp,
  emptyHint,
  priceCaption,
}: Props) {
  const { mode, setMode } = useCart();
  const base = baseProp ?? quoteHref.replace(/\/quote$/, '');
  const [category, setCategory] = useState('all');
  const [grade, setGrade] = useState('all');
  const [storage, setStorage] = useState('all');
  const [variant, setVariant] = useState('all');
  const [stock, setStock] = useState('all');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (grade !== 'all' && !p.grades.includes(grade as GradeCode)) return false;
      if (storage !== 'all' && !p.storage.includes(storage)) return false;
      if (variant !== 'all' && !p.variantAxis.values.includes(variant)) return false;
      if (stock === 'in' && p.stock !== 'in') return false;
      if (stock === 'low' && p.stock !== 'low' && p.stock !== 'in') return false;
      if (stock === 'out' && p.stock !== 'out') return false;
      if (term) {
        const hay = `${p.name} ${p.brand} ${p.category} ${p.summary} ${p.storage.join(' ')}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [products, category, grade, storage, variant, stock, q]);

  const reset = () => {
    setCategory('all');
    setGrade('all');
    setStorage('all');
    setVariant('all');
    setStock('all');
    setQ('');
  };

  const active =
    category !== 'all' ||
    grade !== 'all' ||
    storage !== 'all' ||
    variant !== 'all' ||
    stock !== 'all' ||
    q.trim() !== '';

  return (
    <>
      <div className="pricemode" role="group" aria-label="Pricing mode">
        <div>
          <strong>{PRICE_MODE_META[mode].label}</strong>
          <span className="pricemode-blurb">{PRICE_MODE_META[mode].blurb}</span>
        </div>
        <div className="seg" role="tablist" aria-label="Choose pricing">
          {(['wholesale', 'retail'] as const).map((m) => (
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

      <div className="filters">
        <div className="filter">
          <label htmlFor="f-q">Search</label>
          <input
            id="f-q"
            type="search"
            value={q}
            placeholder="Model or brand…"
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="filter">
          <label htmlFor="f-cat">Category</label>
          <select id="f-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="f-grade">Grade</label>
          <select id="f-grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="all">Any grade</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="f-storage">Storage</label>
          <select id="f-storage" value={storage} onChange={(e) => setStorage(e.target.value)}>
            <option value="all">Any</option>
            {storages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="f-variant">{variantLabel}</label>
          <select id="f-variant" value={variant} onChange={(e) => setVariant(e.target.value)}>
            <option value="all">Any</option>
            {variants.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label htmlFor="f-stock">Availability</label>
          <select id="f-stock" value={stock} onChange={(e) => setStock(e.target.value)}>
            <option value="all">Any</option>
            <option value="in">In stock</option>
            <option value="low">Limited</option>
            <option value="out">On request</option>
          </select>
        </div>

        {active ? (
          <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
            Clear filters
          </button>
        ) : null}

        <span className="filter-note">
          {filtered.length} of {products.length} models
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-note">
          <p>
            <strong>No models match those filters.</strong>
          </p>
          <p className="small" style={{ marginTop: '.4rem' }}>
            {emptyHint}
          </p>
          <button type="button" className="btn btn--ghost btn--sm" style={{ marginTop: '1rem' }} onClick={reset}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="prod-grid">
          {filtered.map((p) => {
            const activePrice = mode === 'wholesale' ? p.priceWholesale : p.priceRetail;
            const otherPrice = mode === 'wholesale' ? p.priceRetail : p.priceWholesale;
            const otherLabel = mode === 'wholesale' ? 'Retail' : 'Wholesale';
            return (
              <article className="prod" key={p.slug}>
                <div className="prod-fig">
                  <DeviceArt family={p.family} />
                  <span className="prod-tag">{p.category}</span>
                  <span className="grade-corner">
                    <span className={`badge ${p.stock === 'in' ? 'pill--ok' : p.stock === 'low' ? 'pill--warn' : ''}`}>
                      {STOCK_LABEL[p.stock]}
                    </span>
                  </span>
                </div>

                <div className="prod-body">
                  <div>
                    <h3 className="prod-title">
                      {base ? (
                        <Link href={`${base}/shop/${p.slug}`} className="prod-title-link">
                          {p.name}
                        </Link>
                      ) : (
                        p.name
                      )}
                    </h3>
                    <div className="prod-meta">
                      {p.releaseYear} · {p.storage.length} storage option{p.storage.length > 1 ? 's' : ''} ·{' '}
                      {p.variantAxis.values.length} {p.variantAxis.label.toLowerCase()} variant
                      {p.variantAxis.values.length > 1 ? 's' : ''}
                    </div>
                  </div>

                  <p className="small muted" style={{ margin: 0 }}>
                    {p.summary.length > 165 ? `${p.summary.slice(0, 165).trimEnd()}…` : p.summary}
                  </p>

                  <div className="prod-grades" aria-label="Grades available">
                    {p.grades.map((g) => (
                      <span key={g} className={`badge grade-${g.replace('+', '-plus')}`}>
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="prod-price">
                    <span className="prod-price-label">{PRICE_MODE_META[mode].short}</span>
                    <span className="prod-price-value">{activePrice}</span>
                    <span className="prod-price-other">
                      {otherLabel} {otherPrice}
                    </span>
                  </div>

                  <div className="prod-foot">
                    <div className="prod-moq">{priceCaption}</div>
                    <AddToQuote product={p} quoteHref={quoteHref} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
