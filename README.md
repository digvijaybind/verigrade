# VeriGrade — website

Wholesale refurbished phones and laptops, Dubai. Multi-market Next.js site: 12 country
prefixes, 5 region pages, no client-side data fetching, everything statically prerendered.

- Framework: Next.js 15.5.26 (App Router), React 19, TypeScript 5.7 (strict)
- Styling: hand-written CSS in `app/globals.css` with per-country themes. No Tailwind, no UI kit.
- Node: `>=18.18` (developed on 22.14.0 / npm 10.9.2)
- `npm run build` prerenders 269 pages.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 -> redirects to /ae
npm run typecheck  # tsc --noEmit
npm run build && npm start
```

## Routing

There is no root page. `next.config.mjs` sends `/` to `/ae`, plus redirects for the bare
section paths that predate the country prefix (`/grading`, `/security`, `/certs`, `/warranty`,
`/contact`, `/quote`, `/shipping`).

Every page lives under `app/[country]/…`. `app/[country]/layout.tsx` validates the segment
against `COUNTRY_CODES`, calls `notFound()` on an unknown code, and sets `lang`, `dir`
(RTL for `sa` and `eg`) and the country theme.

| Prefix | Market | Language | Dir | Region |
| --- | --- | --- | --- | --- |
| `/ae` | UAE | Arabic + English | LTR | `gulf` |
| `/sa` | Saudi Arabia | Arabic | RTL | `gulf` |
| `/eg` | Egypt | Arabic | RTL | `africa` |
| `/ng` | Nigeria | English | LTR | `africa` |
| `/gh` | Ghana | English | LTR | `africa` |
| `/ke` | Kenya | English | LTR | `africa` |
| `/za` | South Africa | English | LTR | `africa` |
| `/us` | United States | English | LTR | `north-america` |
| `/ca` | Canada | English | LTR | `north-america` |
| `/hk` | Hong Kong | Traditional Chinese | LTR | `asia-pacific` |
| `/gb` | United Kingdom | English | LTR | `europe` |
| `/au` | Australia | English | LTR | `asia-pacific` |

## Page map

21 page templates × 12 countries + 12 region pages + `robots.txt` + `sitemap.xml` = 269.

| Route | File | What it does |
| --- | --- | --- |
| `/{cc}` | `app/[country]/page.tsx` | Localized hero, evidence strip, categories, grade ladder, catalogue teaser, process, FAQ teaser, CTA |
| `/{cc}/phones` | `app/[country]/phones/page.tsx` | Phone catalogue with client-side filters, model-level demand notes, trade guidance |
| `/{cc}/laptops` | `app/[country]/laptops/page.tsx` | Laptop catalogue, CPU/grade guidance, business-machine notes |
| `/{cc}/why-verigrade` | `…/why-verigrade/page.tsx` | The five checkable claims, sourcing, and the honest limits of each |
| `/{cc}/assurance` | `…/assurance/page.tsx` | Quality assurance: the six guarantees, the six controls, intake-to-dispatch flow, sourcing, testing, lot-level control, traceability, reported metrics, and the stated limits of every claim |
| `/{cc}/returns` | `…/returns/page.tsx` | Returns and repair turnaround — the 14-stage sequence from claim to insured return, including quarantine, root-cause diagnosis, the second data purge, full re-test, re-grading, re-issued certificates, safe return packaging, refusals, and second-failure escalation |
| `/{cc}/repair-standard` | `…/repair-standard/page.tsx` | The workmanship standard: what "world class" is replaced with, the repair guarantee, bench environment, ESD and dust discipline, instrument list with calibration, four technician tiers, the nine-step repair process, part provenance rules, board-level work, what we decline, rework and second failure, records, and the stated limits |
| `/{cc}/export-process` | `…/export-process/page.tsx` | The 16-step chain from phone arrival to the buyer's dock: workshop phase, packing phase, Dubai export phase, in-transit phase, and separate US and Canadian arrival phases. Includes 12 shipment-quality controls with the evidence for each, the packing specification, a who-does-what table, failure modes and claim windows, and the evidence pack |
| `/{cc}/grading-standard` | `…/grading-standard/page.tsx` | Six tiers, numeric criteria, battery floors, test points, version control |
| `/{cc}/data-security` | `…/data-security/page.tsx` | Wipe method, verification, certificate anatomy, and where the guarantee ends |
| `/{cc}/certifications` | `…/certifications/page.tsx` | Every scheme with an honest status, including the ones not held |
| `/{cc}/warranty` | `…/warranty/page.tsx` | 12-month terms, what is and is not covered, grade-conformity claims, RMA process |
| `/{cc}/ordering` | `…/ordering/page.tsx` | Order process, payment terms, MOQ, documentation, escalation |
| `/{cc}/shipping` | `…/shipping/page.tsx` | Incoterms, packing, dangerous goods, insurance, transit reality |
| `/{cc}/transit` | `…/transit/page.tsx` | Dubai → USA and Dubai → Canada lanes and transit times, post-repair dispatch, US and Canadian importer obligations, the document pack, customs entry, port-to-dock, the honest position on holding stock in North America, warranty returns on those lanes, and on-arrival acceptance |
| `/{cc}/compliance` | `…/compliance/page.tsx` | Buyer-side obligations and the pre-shipment checklist for the market in view |
| `/{cc}/about` | `…/about/page.tsx` | Company, facility, process, and registration status |
| `/{cc}/faq` | `…/faq/page.tsx` | Localized accordion FAQ |
| `/{cc}/contact` | `…/contact/page.tsx` | `QuoteForm`, entity details, direct contacts, response expectations |
| `/{cc}/privacy` | `…/privacy/page.tsx` | Privacy notice — **draft, needs counsel** |
| `/{cc}/terms` | `…/terms/page.tsx` | Wholesale trading terms — **draft, needs counsel** |
| `/{cc}/{region}` | `app/[country]/[region]/page.tsx` | Region overview: member markets, demand, documentation, logistics. Redirects to a member market if the host country is outside the region |
| `/robots.txt` | `app/robots.ts` | Allow all, disallow `/api/`, points at the sitemap |
| `/sitemap.xml` | `app/sitemap.ts` | All 264 URLs with `hreflang` alternates |
| 404 | `app/not-found.tsx` | Branded 404 with live nav; `noindex` |

## Data and components

| File | Contents |
| --- | --- |
| `lib/countries.ts` | 12 country configs + 5 regions: currency, locale, direction, languages, docs, demand, desk, headline, tags, theme. `countriesInRegion()`, `getRegion()`, `isCountryCode()` |
| `lib/grades.ts` | Six tiers, battery floors, per-tier criteria, test points, cosmetic defect glossary |
| `lib/catalogue.ts` | Phone and laptop models with indicative USD bands and per-model notes |
| `lib/site.ts` | Brand, entity, contact, navigation, `GRADING_STANDARD`, `REGISTRATIONS` |
| `components/ui.tsx` | `PageHero`, `Section`, `Card`, `Crumbs`, `Toc`, `TableWrap`, `Callout`, `KV`, `Pill`, `CtaBand`, `Step`, `Stat` |
| `components/market.tsx` | `MarketStrip`, `CountryCard`, `ComplianceList`, `DocList`, `Registrations` |
| `components/Header.tsx` / `Footer.tsx` / `CountrySwitcher.tsx` | Chrome; switcher keeps the current page path when the target market has it |
| `components/Catalogue.tsx` | `'use client'` filterable grid |
| `components/QuoteForm.tsx` | `'use client'` validated form — see below |
| `components/DeviceArt.tsx`, `CertSample.tsx`, `Icon.tsx`, `Reveal.tsx` | Inline SVG, no image assets |

## Environment variables

Only one, and only for canonical URLs.

| Variable | Required | Default | Used by |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | In production | `https://verigrade.ae` | `SITE.url` → canonical links, `openGraph.url`, `sitemap.xml`, `robots.txt` |

Set it to the real origin before deploying, or every canonical and the sitemap will point at the
placeholder domain.

## Wiring up the quote form

`components/QuoteForm.tsx` currently validates in the browser, then shows a success panel. **No
request leaves the browser.** The success copy says so, and the privacy notice must not claim
otherwise until this is built.

To make it real:

1. Add `app/api/quote/route.ts` accepting `POST` JSON.
2. Validate server-side — never trust the client. Honeypot field, rate limit, and length caps.
3. Forward to a transactional provider (Postmark, Resend, SES) or a CRM (HubSpot), or both.
4. Replace the `setSent(true)` branch in `onSubmit` with a `fetch` and handle failure states
   (retry, offline, spam rejection).
5. Update the privacy notice to describe the new processor, its location and its retention.

The form posts these fields: company, contact name, email, phone, WhatsApp, country, model,
grade, quantity, monthly volume, destination port, Incoterm, notes, and consent.

## Deployment

Any Node host that runs `next start`. Vercel works with no configuration.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain npm run build
```

Post-build checks:

- `curl -I https://your-domain/` → 307 to `/ae`
- `curl https://your-domain/sitemap.xml` → 264 URLs, correct origin
- `curl https://your-domain/robots.txt` → sitemap line
- `curl -I https://your-domain/sa` → 200, `dir="rtl"` in the markup
- `curl -I https://your-domain/xx` → 404
- `curl -I https://your-domain/ae/africa` → 307 to `/ng/africa`
- `curl -I https://your-domain/zz` → 404, `noindex`

Set a security header set at the proxy: `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security: max-age=63072000`.

## Launch blockers

Do not publish until these are resolved. The site is written to make them impossible to miss —
`REGISTRATIONS` values are `null` and render an amber "PENDING — fill before launch" treatment —
but that only helps if someone reads the page before it goes live.

**Verified numbers (hard blockers)**

- [ ] Trade licence number and issuing freezone — `REGISTRATIONS.tradeLicence` in `lib/site.ts`
- [ ] VAT registration number — `REGISTRATIONS.vatNumber`
- [ ] DAFZA licence number — `REGISTRATIONS.dafzaLicense`
- [ ] Importer of record for each destination market
- [ ] `SITE.phone`, `SITE.whatsapp`, `SITE.email`, `SITE.complianceEmail` — the phone and
      WhatsApp are placeholders (`+971 4 000 0000`, `+971500000000`)
- [ ] `NEXT_PUBLIC_SITE_URL` and the real domain, with DNS and TLS in place
- [ ] Banking details and payment-processor account

**Content and legal**

- [ ] `app/[country]/privacy/page.tsx` — reviewed by counsel
- [ ] `app/[country]/terms/page.tsx` — reviewed by counsel, in particular warranty, liability
      cap, Incoterms, governing law and jurisdiction
- [ ] Warranty terms confirmed against what operations will actually honour
- [ ] Incoterms table confirmed against live forwarder rates
- [ ] Dangerous-goods packing description confirmed by the freight forwarder
- [ ] Every compliance flag on the 12 market pages confirmed by someone who knows that market
- [ ] `certifications` page: any scheme claimed must have a certificate number a customer can
      verify on the certifier's own register. Delete the row if there is no number.

**Technical**

- [ ] Quote form endpoint built (above) and the privacy notice updated to match
- [ ] Analytics and Search Console if wanted
- [ ] Real product photography, replacing the inline SVG device art
- [ ] `npm audit` reviewed to completion — the earlier run exceeded a 180s timeout and the
      result is unknown. `next@15.5.26` is pinned specifically to clear CVE-2025-66478; do not
      downgrade.
- [ ] Accessibility pass with a real screen reader and keyboard-only navigation
- [ ] Real-user test of the `mobile menu`, the country switcher and the catalogue filters

## Research

Source material for the positioning, the compliance flags and the market demand notes is in
`../research`:

- `00-README.md` — index
- `06-gtm-differentiator-spec.md` — positioning brief this site is written against
- Dubai / Canada / USA competitor and compliance research

Research notes worth remembering: SGK has no public website; the Gulf-arm relationship with SAGO
is unconfirmed and only the shared employee name is supported; no reliable public benchmark was
found for refurb DOA rates or wholesale margin. Nothing in those files is presented on the site as
fact unless it is.
