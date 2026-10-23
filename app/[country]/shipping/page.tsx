import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  KV,
  PageHero,
  Pill,
  Step,
  TableWrap,
  Td,
  Th,
  Toc,
} from '@/components/ui';
import { getCountry, isCountryCode } from '@/lib/countries';
import { SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const WARRANTY_MONTHS = 12;

const TOC = [
  { href: '#incoterms', label: '1. Incoterms' },
  { href: '#transit', label: '2. Transit times' },
  { href: '#packing', label: '3. Packing & segregation' },
  { href: '#dg', label: '4. Batteries & dangerous goods' },
  { href: '#insurance', label: '5. Insurance' },
  { href: '#local', label: '6. The local UAE lane' },
  { href: '#costs', label: '7. The costs people forget' },
  { href: '#on-delivery', label: '8. On delivery' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Shipping & Incoterms',
    description:
      'How refurbished consignments leave Dubai: EXW, FOB, CIF and DAP, air and sea, dangerous-goods documentation for lithium batteries, cargo insurance, packing and grade segregation.',
    alternates: { canonical: `/${country}/shipping` },
  };
}

export default async function ShippingPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Logistics"
        title="Shipping &amp; Incoterms"
        lead="Everything leaves Dubai, consolidated and grade-segregated, with the document pack assembled at the same time as the cartons. EXW is the default; FOB, CIF and DAP are quoted on request, and an Incoterm without a named place is not an Incoterm."
        meta={
          <>
            <Pill tone="ok">Air and sea</Pill>
            <Pill tone="info">IATA DG documentation</Pill>
            <Pill tone="neutral">Consolidation available</Pill>
            <Pill tone="neutral">Cargo insurance available</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/shipping`, label: 'Shipping & Incoterms' }]} />

              <h2 id="incoterms">1. Incoterms</h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Term</Th>
                    <Th scope="col">What we cover</Th>
                    <Th scope="col">What stops with you</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>EXW Dubai</Td>
                    <Td>Goods available at our facility, documentation complete.</Td>
                    <Td>Loading, freight, insurance, export clearance, everything onward.</Td>
                  </tr>
                  <tr>
                    <Td strong>FOB Dubai</Td>
                    <Td>Goods loaded on the vessel or aircraft, export clearance by us.</Td>
                    <Td>Freight, insurance, import clearance and delivery.</Td>
                  </tr>
                  <tr>
                    <Td strong>CIF</Td>
                    <Td>As FOB, plus freight and minimum insurance to the named port.</Td>
                    <Td>Import clearance, port charges, delivery inland.</Td>
                  </tr>
                  <tr>
                    <Td strong>DAP</Td>
                    <Td>Delivered to your named address, duty unpaid, import clearance by you.</Td>
                    <Td>Duty, taxes and any clearance cost in your market.</Td>
                  </tr>
                  <tr>
                    <Td strong>DDP</Td>
                    <Td>
                      Delivered, duty paid, clearance handled by our agent. Available on the West African
                      lane into Lagos and Tema.
                    </Td>
                    <Td>Nothing, but it is the term most sensitive to your local registration status.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="warn" title="DDP needs a conversation, not a click">
                <p>
                  DDP means we are paying your duty and your clearance agent is filing in your name. That
                  requires your import registration to be current and your entity details to be exactly
                  right, and a mismatch turns into a demurrage bill with your name on it. We will
                  quote DDP once we have those details in writing, and we will say so if a registration
                  is not ready.
                </p>
              </Callout>

              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '.8rem' }}>Our default, and why</h3>
                <div className="prose">
                  <p>
                    EXW Dubai is the default because it is the only term where the cost of each party is
                    unambiguous. Freight, insurance, duty and clearance are the buyer&rsquo;s decisions
                    based on the buyer&rsquo;s own arrangements, and we quote each of them separately so
                    a change in one does not silently move the others.
                  </p>
                  <p>
                    If you have a forwarder with a rate you have negotiated, quote FOB and let them
                    handle the rest. If you do not, ask for DAP and a landed estimate — not a freight
                    quote. The difference between those two numbers is usually where the real cost sits.
                  </p>
                </div>
              </div>

              {/* ---------------------------------------- TRANSIT ------- */}
              <h2 id="transit" style={{ marginTop: '3.5rem' }}>2. Transit times</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Indicative door-to-door from dispatch, excluding customs clearance time on arrival.
                Clearance can add materially and is not within anyone&rsquo;s control except yours.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Destination</Th>
                    <Th scope="col" num>Air</Th>
                    <Th scope="col" num>Sea</Th>
                    <Th scope="col">Note</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>United Arab Emirates</Td>
                    <Td num mono>1–2 days</Td>
                    <Td num mono>—</Td>
                    <Td>Road from Dubai or collection from the facility.</Td>
                  </tr>
                  <tr>
                    <Td>Saudi Arabia</Td>
                    <Td num mono>2–4 days</Td>
                    <Td num mono>—</Td>
                    <Td>Road to Riyadh or Jeddah is typically faster and cheaper than air.</Td>
                  </tr>
                  <tr>
                    <Td>Egypt</Td>
                    <Td num mono>3–5 days</Td>
                    <Td num mono>18–24 days</Td>
                    <Td>Alexandria is the main port. Air suits replenishment.</Td>
                  </tr>
                  <tr>
                    <Td>Nigeria</Td>
                    <Td num mono>4–6 days</Td>
                    <Td num mono>20–28 days</Td>
                    <Td>Lagos and Tema. DDP available.</Td>
                  </tr>
                  <tr>
                    <Td>Ghana</Td>
                    <Td num mono>5–7 days</Td>
                    <Td num mono>22–30 days</Td>
                    <Td>Tema port.</Td>
                  </tr>
                  <tr>
                    <Td>Kenya</Td>
                    <Td num mono>5–7 days</Td>
                    <Td num mono>22–30 days</Td>
                    <Td>Mombasa, then inland redistribution.</Td>
                  </tr>
                  <tr>
                    <Td>South Africa</Td>
                    <Td num mono>7–9 days</Td>
                    <Td num mono>22–30 days</Td>
                    <Td>Durban or Cape Town.</Td>
                  </tr>
                  <tr>
                    <Td>United Kingdom</Td>
                    <Td num mono>3–4 days</Td>
                    <Td num mono>20–26 days</Td>
                    <Td>Felixstowe, London Gateway or Southampton.</Td>
                  </tr>
                  <tr>
                    <Td>United States</Td>
                    <Td num mono>4–6 days</Td>
                    <Td num mono>28–38 days</Td>
                    <Td>East or Gulf coast. Section 301 exposure on some HTS lines.</Td>
                  </tr>
                  <tr>
                    <Td>Canada</Td>
                    <Td num mono>5–7 days</Td>
                    <Td num mono>28–38 days</Td>
                    <Td>Vancouver or Montreal. Provincial EPR sits with you.</Td>
                  </tr>
                  <tr>
                    <Td>Hong Kong</Td>
                    <Td num mono>1–2 days</Td>
                    <Td num mono>18–22 days</Td>
                    <Td>Free port, no duty on most goods.</Td>
                  </tr>
                  <tr>
                    <Td>Australia</Td>
                    <Td num mono>5–7 days</Td>
                    <Td num mono>24–30 days</Td>
                    <Td>Bio-security and border inspection can add time.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="plain" title="These are planning figures">
                <p>
                  Transit varies with carrier schedule, port congestion and season. We will give you a
                  written dispatch window and a carrier booking on the proforma. What we will not do is
                  quote a transit time as a guarantee, because nobody can.
                </p>
              </Callout>

              {/* ---------------------------------------- PACKING ------- */}
              <h2 id="packing" style={{ marginTop: '3.5rem' }}>3. Packing and segregation</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                How goods are packed is not cosmetic. It determines whether a container arrives in the
                condition it left in, and whether a claim is arguable.
              </p>

              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Grade-segregated cartons', 'One grade per carton, labelled on every side. No mixed-grade cartons in a graded consignment.'],
                  ['Model and variant labelled', 'Cartons carry model, storage or memory, grade, country of destination and a carton sequence number.'],
                  ['Battery state', 'Lithium cells shipped at the state of charge the destination regulations and carrier require, with the DG declaration.'],
                  ['Consolidation', 'Multiple models, buyers or destinations consolidated into one shipment, with per-importer manifests and invoices.'],
                  ['Padded and boxed', 'Devices individually sleeved, screens protected, chargers and cables bagged per unit where supplied.'],
                  ['Retained packaging', 'Original device boxes are packed separately and labelled, because the carton is worth money at retail.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="box">
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="info" title="Grade D and AB are packed apart, always">
                <p>
                  Grade D parts units and AB raw stock are packed, labelled and invoiced separately from
                  graded working stock, and stored in a separate area. It is a physical segregation
                  rather than a line on an invoice, which is the only reliable version of that control.
                </p>
              </Callout>

              {/* ---------------------------------------- DG ------------ */}
              <h2 id="dg" style={{ marginTop: '3.5rem' }}>
                4. Batteries and dangerous goods
              </h2>
              <div className="prose">
                <p>
                  Almost every consignment we ship contains lithium batteries, which makes this an air
                  freight question before it is a paperwork question. A consignment rejected at the
                  cargo terminal is expensive and it is entirely avoidable.
                </p>
              </div>

              <Step title="Packing to IATA rules">
                Cells and batteries packed, marked and documented to the dangerous-goods rules in force
                for the mode and route. Where a battery is shipped with equipment, the equipment is
                protected against accidental activation.
              </Step>
              <div style={{ height: '1.4rem' }} />
              <Step title="State of charge">
                Batteries shipped by air are offered at the state of charge the regulations and the
                carrier require. This is not a packaging preference; it is a condition of carriage.
              </Step>
              <div style={{ height: '1.4rem' }} />
              <Step title="Documentation">
                The dangerous-goods declaration ships with the consignment, in the document pack, with
                the airway bill or sea waybill reference. It is a required document for air, and it is
                not a formality that can be reconstructed at the terminal.
              </Step>
              <div style={{ height: '1.4rem' }} />
              <Step title="Damaged or recalled batteries">
                <p>
                  Restricted, damaged or recalled cells are screened out of graded stock and never
                  shipped. Where a device arrives with a swollen or damaged cell, it is routed to parts
                  and the fault is recorded.
                </p>
              </Step>

              <div style={{ marginTop: '2rem' }}>
                <Callout tone="warn" title="Tell us your forwarder early">
                  <p>
                    If your forwarder has carrier requirements — a specific label format, a house
                    consignment note, a nominated consolidator — tell us at the proforma stage. Building
                    the labels afterwards means rebuilding cartons, and that is a day you do not get
                    back.
                  </p>
                </Callout>
              </div>

              {/* ---------------------------------------- INSURANCE ----- */}
              <h2 id="insurance" style={{ marginTop: '3.5rem' }}>5. Insurance</h2>
              <KV
                items={[
                  { k: 'Available', v: 'Cargo insurance on a per-consignment or per-invoice basis' },
                  { k: 'Basis', v: 'Full invoice value plus freight, as a minimum' },
                  { k: 'Who arranges it', v: 'Either. We can quote it, or your forwarder places it' },
                  { k: 'CIF', v: 'Includes minimum cover as required by the term — usually insufficient for full replacement value' },
                  { k: 'Transit claims', v: 'Must be raised within 7 calendar days of delivery, or the carrier will not entertain them' },
                  { k: 'If we carry', v: 'Insurance is strongly recommended. Carrier liability on a sea leg is limited by convention and is rarely a full claim' },
                ]}
              />

              <Callout tone="plain" title="The transit-damage window is not negotiable with the carrier">
                <p>
                  Carriers require physical inspection and notification within a short window, usually
                  days. If a container is landed, unloaded, and the damage is found a week later after
                  restacking, the claim is very likely to be refused — regardless of whose fault the
                  damage was. Open the cartons, check the serials against the manifest, and photograph
                  any damage before it is moved.
                </p>
              </Callout>

              {/* ---------------------------------------- LOCAL --------- */}
              <h2 id="local" style={{ marginTop: '3.5rem' }}>6. The local UAE lane</h2>
              <div className="prose">
                <p>
                  If you are buying inside the UAE, this is the simplest lane we operate and the one we
                  would recommend for a first transaction. Domestic movement within the Emirates does
                  not attract duty.
                </p>
              </div>

              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                {[
                  ['Collect', 'Collect from the Dubai Airport Freezone facility at an agreed time. Inspect the lot before it leaves.'],
                  ['Road delivery', 'Delivered by road within the Emirates, on a scheduled run.'],
                  ['Inspect before dispatch', 'For first transactions we hold the consignment so you can attend, photograph, or send a representative.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="truck">
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="ok" title="Why we suggest starting here">
                <p>
                  It removes freight cost, removes transit risk, removes clearance from the equation,
                  and lets you verify the documentation against the physical goods before you have
                  committed to a model of working together. A first UAE transaction is a cheap way to
                  test every claim on this website.
                </p>
              </Callout>

              {/* ---------------------------------------- COSTS --------- */}
              <h2 id="costs" style={{ marginTop: '3.5rem' }}>
                7. The costs people forget
              </h2>
              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Cost</Th>
                    <Th scope="col">Why it surprises people</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Port handling and demurrage</Td>
                    <Td>Often larger than the ocean freight itself. Rises fast if documentation is incomplete.</Td>
                  </tr>
                  <tr>
                    <Td strong>Customs inspection</Td>
                    <Td>A percentage of consignments are inspected. It adds days and handling charges.</Td>
                  </tr>
                  <tr>
                    <Td strong>Pre-shipment inspection</Td>
                    <Td>Often mandatory for used electronics in several destination markets.</Td>
                  </tr>
                  <tr>
                    <Td strong>Import registration</Td>
                    <Td>EPR, type approval and producer-responsibility registrations all cost money and time before the first shipment.</Td>
                  </tr>
                  <tr>
                    <Td strong>Battery DG handling</Td>
                    <Td>Some carriers and terminals charge a specific dangerous-goods fee on top of freight.</Td>
                  </tr>
                  <tr>
                    <Td strong>Bonded storage</Td>
                    <Td>Cheap for a few days, expensive after a week. Relevant if you are consolidating across several arrival dates.</Td>
                  </tr>
                  <tr>
                    <Td strong>Duty on used goods</Td>
                    <Td>Valuation of used electronics is contested in several markets. Get your broker to confirm the treatment before the proforma.</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="info" title="Ask for a landed estimate">
                <p>
                  Not a freight quote. A landed estimate includes duty, taxes, port charges, handling,
                  clearance and inland delivery, so the number you model is the number you will actually
                  pay. It is also the only figure that lets you compare us properly against a supplier
                  quoting EXW.
                </p>
              </Callout>

              {/* ---------------------------------------- ON DELIVERY --- */}
              <h2 id="on-delivery" style={{ marginTop: '3.5rem' }}>8. On delivery</h2>
              <div className="steps">
                <Step title="Count and reconcile">
                  Check carton count against the packing list, then serials against the manifest. Do it
                  at the point of unloading if you can — a count after restacking is an argument.
                </Step>
                <Step title="Inspect within the window">
                  Open cartons, check condition against the grade, and photograph any transit damage
                  before it is moved. The transit and DOA window is 7 calendar days from delivery.
                </Step>
                <Step title="Raise transit claims immediately">
                  Notify the carrier and us. Late transit claims are the single most common avoidable
                  loss in this trade.
                </Step>
                <Step title="Grade a sample">
                  Grade a percentage of the consignment against the{' '}
                  <Link href={`${base}/grading-standard`}>published standard</Link>. If anything does
                  not match, that is a claim, and it is a fast one to make because you have the report
                  in your hand.
                </Step>
                <Step title="Raise DOA units without powering them on">
                  Photograph the screen state, pack as arrived, and send us the serials. Repeatedly
                  power-cycling a failed unit loses diagnostic state.
                </Step>
                <Step title="Start the warranty clock">
                  The {WARRANTY_MONTHS}-month warranty runs from delivery, not from dispatch. Record the
                  delivery date.
                </Step>
              </div>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Ask for a landed estimate, not a freight quote."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Ordering & payment', href: `${base}/ordering` }}
                >
                  Tell us the destination, the mode you prefer and the quantity, and we will price the
                  goods, the freight and the documents together. Where we can, we will tell you the
                  landed cost as well. For the long-haul lanes, the{' '}
                  <Link href={`${base}/transit`}>transit and lane page</Link> covers the US and Canada
                  in detail, and the{' '}
                  <Link href={`${base}/export-process`}>step-by-step export page</Link> sets out the
                  full chain from workshop to your dock including how shipment quality is controlled.
                </CtaBand>
              </div>
            </div>

            <Toc title="On this page" items={TOC} />
          </div>
        </div>
      </section>
    </>
  );
}
