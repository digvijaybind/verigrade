import Link from 'next/link';
import type { ReactNode, ElementType, CSSProperties } from 'react';
import Icon, { type IconName } from './Icon';
import { gradeOf } from '@/lib/grades';

/* ------------------------------------------------------------- Eyebrow -- */

export function Eyebrow({
  children,
  muted,
}: {
  children: ReactNode;
  muted?: boolean;
}) {
  return <span className={muted ? 'eyebrow eyebrow--muted' : 'eyebrow'}>{children}</span>;
}

/* ---------------------------------------------------------- SectionHead -- */

export function SectionHead({
  eyebrow,
  title,
  children,
  center,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div className={center ? 'section-head center' : 'section-head'}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag>{title}</Tag>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- Page --- */

export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
        {meta ? <div className="page-meta">{meta}</div> : null}
        {children}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Card --- */

export function Card({
  title,
  children,
  icon,
  iconTone = 'brand',
  num,
  href,
  footer,
  as: Tag = 'div',
}: {
  title?: ReactNode;
  children?: ReactNode;
  icon?: IconName;
  iconTone?: 'brand' | 'info' | 'warn' | 'danger' | 'bad' | 'neutral';
  num?: string;
  href?: string;
  footer?: ReactNode;
  as?: ElementType;
}) {
  const toneClass =
    iconTone === 'brand' ? '' : ` card-icon--${iconTone}`;
  const body = (
    <>
      {num ? <span className="card-num">{num}</span> : null}
      {icon ? (
        <span className={`card-icon${toneClass}`}>
          <Icon name={icon} />
        </span>
      ) : null}
      {title ? <h3>{title}</h3> : null}
      {children}
      {footer}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="card card-link card--hover">
        {body}
      </Link>
    );
  }

  return <Tag className="card">{body}</Tag>;
}

/* ------------------------------------------------------------- Callout --- */

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warn' | 'bad' | 'ok' | 'plain';
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className={`callout callout--${tone}`}>
      {title ? <span className="callout-title">{title}</span> : null}
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- Button --- */

export function Button({
  href,
  children,
  tone = 'primary',
  size,
  block,
  icon,
  type = 'button',
  onClick,
  name,
  value,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  tone?: 'primary' | 'dark' | 'ghost' | 'onDark';
  size?: 'sm';
  block?: boolean;
  icon?: IconName;
  type?: 'button' | 'submit';
  onClick?: () => void;
  name?: string;
  value?: string;
  disabled?: boolean;
}) {
  const cls = [
    'btn',
    `btn--${tone}`,
    size === 'sm' ? 'btn--sm' : '',
    block ? 'btn--block' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      {children}
      {icon ? <Icon name={icon} size={17} /> : null}
    </>
  );

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel');
    if (external) {
      return (
        <a className={cls} href={href}>
          {inner}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={cls} type={type} onClick={onClick} name={name} value={value} disabled={disabled}>
      {inner}
    </button>
  );
}

/* --------------------------------------------------------------- Pills --- */

export function Pill({
  tone = 'neutral',
  children,
}: {
  tone?: 'ok' | 'warn' | 'info' | 'bad' | 'neutral';
  children: ReactNode;
}) {
  return (
    <span className={`pill pill--${tone}`}>
      <span className="dot" />
      {children}
    </span>
  );
}

export function Chip({ children, brand }: { children: ReactNode; brand?: boolean }) {
  return <span className={brand ? 'chip chip--brand' : 'chip'}>{children}</span>;
}

export function GradeBadge({ code }: { code: string }) {
  const g = gradeOf(code);
  return <span className={`badge ${g.cssClass}`}>{g.code}</span>;
}

export function GradeSet({ codes }: { codes: string[] }) {
  return (
    <span className="prod-grades">
      {codes.map((c) => (
        <GradeBadge key={c} code={c} />
      ))}
    </span>
  );
}

/* -------------------------------------------------------------- Tables --- */

export function TableWrap({
  children,
  caption,
  compare,
}: {
  children: ReactNode;
  caption?: string;
  compare?: boolean;
}) {
  return (
    <div className="table-wrap">
      <table className={compare ? 'compare' : undefined}>
        {caption ? <caption>{caption}</caption> : null}
        {children}
      </table>
    </div>
  );
}

export function Th({
  children,
  num,
  group,
  className,
  scope,
  style,
}: {
  children?: ReactNode;
  num?: boolean;
  group?: boolean;
  className?: string;
  scope?: 'col' | 'row';
  style?: CSSProperties;
}) {
  return (
    <th
      className={[num ? 'num' : '', group ? 'group' : '', className ?? ''].filter(Boolean).join(' ')}
      scope={scope}
      style={style}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  num,
  mono,
  strong,
  us,
  mid,
  scope,
  className,
  style,
}: {
  children?: ReactNode;
  num?: boolean;
  mono?: boolean;
  strong?: boolean;
  us?: boolean;
  mid?: boolean;
  scope?: 'row' | 'col';
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <td
      className={[
        num ? 'num' : '',
        mono ? 't-mono' : '',
        strong ? 't-strong' : '',
        us ? 'col-us' : '',
        mid ? 't-mid' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      scope={scope}
      style={style}
    >
      {children}
    </td>
  );
}

/* ------------------------------------------------------- Definition list -- */

export function KV({ items }: { items: { k: ReactNode; v: ReactNode }[] }) {
  return (
    <dl className="kv">
      {items.map((it, i) => (
        <div className="kv-row" key={i}>
          <dt>{it.k}</dt>
          <dd>{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DlRow({ k, v }: { k: ReactNode; v: ReactNode }) {
  return (
    <div className="kv-row">
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}

/* --------------------------------------------------------------- Steps --- */

export function Step({
  title,
  children,
  onDark,
}: {
  title: ReactNode;
  children?: ReactNode;
  onDark?: boolean;
}) {
  return (
    <div className={onDark ? 'step step--ink' : 'step'}>
      <div>
        <h4>{title}</h4>
        {children ? <p>{children}</p> : null}
      </div>
    </div>
  );
}

export function FlowStep({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <div className="flow-step">
      <div>
        <h4>{title}</h4>
        {children ? <p>{children}</p> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ CTA band --- */

export function CtaBand({
  title,
  children,
  primary = { label: 'Request a quote', href: '#' },
  secondary,
}: {
  title: ReactNode;
  children?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="cta-band">
      <div>
        <h2>{title}</h2>
        {children ? <p>{children}</p> : null}
      </div>
      <div className="btn-row">
        <Button href={primary.href} tone="primary">
          {primary.label}
        </Button>
        {secondary ? (
          <Button href={secondary.href} tone="onDark">
            {secondary.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Stats --- */

export function StatRow({ items }: { items: { n: ReactNode; l: ReactNode }[] }) {
  return (
    <div className="stat-row">
      {items.map((s, i) => (
        <div className="stat" key={i}>
          <span className="n">{s.n}</span>
          <span className="l">{s.l}</span>
        </div>
      ))}
    </div>
  );
}

export function HeroStats({ items }: { items: { n: string; l: string }[] }) {
  return (
    <div className="hero-stats">
      {items.map((s, i) => (
        <div className="hero-stat" key={i}>
          <span className="n">{s.n}</span>
          <span className="l">{s.l}</span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- Grades --- */

export function GradeLegend({ grades, compact }: { grades: { code: string; name: string; batteryFloor: number | null; short: string }[]; compact?: boolean }) {
  return (
    <div className="grade-legend">
      {grades.map((g) => {
        const full = gradeOf(g.code);
        return (
          <div
            key={g.code}
            className={`grade-row${g.code === 'A+' ? ' grade-row--ap' : ''}${g.code === 'D' ? ' grade-row--d' : ''}`}
          >
            <span className={`g ${full.cssClass}`}>{g.code}</span>
            <div>
              <h4>{g.name}</h4>
              <p>{compact ? g.short : full.description}</p>
            </div>
            <div className="floor">
              <b>{g.batteryFloor === null ? 'n/a' : `≥ ${g.batteryFloor}%`}</b>
              {g.batteryFloor === null ? 'Not tier-applied' : 'Design capacity'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------------------------------- TOC (aside) -- */

export function Toc({ title, items }: { title?: string; items: { href: string; label: string; sub?: boolean }[] }) {
  return (
    <nav className="toc" aria-label="On this page">
      {title ? <div className="toc-title">{title}</div> : null}
      <ul>
        {items.map((it, i) => (
          <li key={it.href} className={it.sub ? 'sub' : undefined}>
            <a href={it.href}>{it.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------- Placeholder - */

export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="ph">{children}</span>;
}

/* ---------------------------------------------------------- Breadcrumbs --- */

export function Crumbs({
  base,
  trail,
}: {
  base: string;
  trail: { href: string; label: string }[];
}) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link href={base}>Home</Link>
      {trail.map((t) => (
        <span key={t.href}>
          <span aria-hidden="true">/</span>
          {t.href ? <Link href={t.href}>{t.label}</Link> : <span>{t.label}</span>}
        </span>
      ))}
    </nav>
  );
}
