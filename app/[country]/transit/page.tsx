import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Callout,
  Card,
  Crumbs,
  CtaBand,
  FlowStep,
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
import { GRADING_STANDARD, SITE } from '@/lib/site';

type Params = { country: string };
type Props = { params: Promise<Params> };

const TOC = [
  { href: '#summary', label: '1. The lanes in one table' },
  { href: '#post-repair', label: '2. Dispatching a repaired unit' },
  { href: '#usa', label: '3. The USA lane' },
  { href: '#canada', label: '4. The Canada lane' },
  { href: '#us-ca-documents', label: '5. Documents for both' },
  { href: '#customs', label: '6. Customs and entry' },
  { href: '#last-mile', label: '7. Port to your dock' },
  { href: '#origin', label: '8. Shipping from inside the US/Canada' },
  { href: '#rma-transit', label: '9. Warranty work on those lanes' },
  { href: '#arrival', label: '10. On arrival' },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  if (!isCountryCode(country)) return {};
  return {
    title: 'Transit & shipping lanes',
    description: `How repaired and re-certified devices reach the United States and Canada from Dubai: lane options and transit times, the post-repair dispatch sequence, customs entry, dangerous-goods compliance, the document pack for both markets, and what to do about US or Canadian stock.`,
    alternates: { canonical: `/${country}/transit` },
  };
}

export default async function TransitPage({ params }: Props) {
  const { country } = await params;
  if (!isCountryCode(country)) notFound();
  const c = getCountry(country);
  const base = `/${c.code}`;

  return (
    <>
      <PageHero
        eyebrow="Logistics"
        title="Transit & shipping lanes"
        lead="Where the goods physically are matters less than where the paperwork says they are. This page covers the two long-haul lanes we get asked about most — Dubai to the United States, and Dubai to Canada — including what changes when a unit has been through repair, what your broker needs from us, and how the customs treatment of a repaired device differs from an untouched one."
        meta={
          <>
            <Pill tone="info">Dubai → United States</Pill>
            <Pill tone="info">Dubai → Canada</Pill>
            <Pill tone="ok">Full document pack</Pill>
            <Pill tone="warn">Repaired = declared as repaired</Pill>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-sidebar">
            <div>
              <Crumbs base={base} trail={[{ href: `${base}/transit`, label: 'Transit & shipping lanes' }]} />

              {/* --------------------------------------------- SUMMARY --- */}
              <h2 id="summary">1. The lanes in one table</h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                Indicative door-to-door on the standard lanes, ex-works Dubai, and excluding customs
                clearance and duty. Anything faster is air and costs more than sea; anything cheaper is
                consolidation and takes longer.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Lane</Th>
                    <Th scope="col" num>Air</Th>
                    <Th scope="col" num>Sea LCL</Th>
                    <Th scope="col" num>Sea FCL</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Dubai → United States (East Coast)</Td>
                    <Td num mono>4–6 days</Td>
                    <Td num mono>22–30 days</Td>
                    <Td num mono>18–24 days</Td>
                  </tr>
                  <tr>
                    <Td strong>Dubai → United States (West Coast)</Td>
                    <Td num mono>5–7 days</Td>
                    <Td num mono>26–34 days</Td>
                    <Td num mono>22–28 days</Td>
                  </tr>
                  <tr>
                    <Td strong>Dubai → Canada (Vancouver / Prince Rupert)</Td>
                    <Td num mono>6–8 days</Td>
                    <Td num mono>24–32 days</Td>
                    <Td num mono>20–26 days</Td>
                  </tr>
                  <tr>
                    <Td strong>Dubai → Canada (Montreal, Atlantic)</Td>
                    <Td num mono>7–9 days</Td>
                    <Td num mono>28–36 days</Td>
                    <Td num mono>24–30 days</Td>
                  </tr>
                  <tr>
                    <Td strong>Dubai → United Kingdom / Europe</Td>
                    <Td num mono>4–6 days</Td>
                    <Td num mono>20–28 days</Td>
                    <Td num mono>16–22 days</Td>
                  </tr>
                  <tr>
                    <Td strong>Dubai → Gulf, by road</Td>
                    <Td num mono>1–3 days</Td>
                    <Td className="muted">Not applicable</Td>
                    <Td className="muted">Not applicable</Td>
                  </tr>
                </tbody>
              </TableWrap>

              <Callout tone="info" title="Air freight is not a shipping decision, it is a cashflow one">
                <p>
                  Air on a full consignment of graded stock is rarely economical against sea once the
                  goods value is high enough. It becomes the right answer when a lot is late, when you
                  have committed to a promotional window, or when a single consignment of A-grade units
                  is the margin in the quarter. We will tell you which case you are in rather than
                  defaulting to the fastest lane.
                </p>
              </Callout>

              {/* ------------------------------------------- POST-REPAIR - */}
              <h2 id="post-repair" style={{ marginTop: '3.5rem' }}>
                2. Dispatching a repaired unit
              </h2>
              <p className="muted" style={{ marginBottom: '1.6rem' }}>
                A unit coming back from repair is not the same consignment you bought. It has been
                opened, repaired, re-wiped, re-tested and re-certified, and on a long-haul lane those
                differences change what you have to declare. This is the sequence we follow, and it is
                the same on every lane.
              </p>

              <div className="flow">
                <FlowStep title="1. Repair sign-off">
                  The unit has passed the full re-test, the re-grade is decided, and the second data
                  purge has been verified.
                </FlowStep>
                <FlowStep title="2. Disclosure check">
                  Confirmed that the documentation declares the unit as repaired or refurbished, and
                  that the grade report shows the parts fitted since the original refurbishment.
                </FlowStep>
                <FlowStep title="3. Classification check">
                  We tell you, in writing, whether the unit still ships under the same commodity
                  description and tariff classification as the original consignment or whether the
                  repair has changed it. Your broker decides, but you should not be surprised.
                </FlowStep>
                <FlowStep title="4. Serial reconciliation">
                  The returning serials are matched to the original consignment record, so the customs
                  paperwork, the packing list and the grade reports all reconcile one-to-one.
                </FlowStep>
                <FlowStep title="5. Repack to long-haul standard">
                  Battery isolated, terminals covered, device immobilised, new outer carton, document
                  wallet sealed outside the device packaging, and the repaired-unit marking applied.
                </FlowStep>
                <FlowStep title="6. Dangerous-goods re-check">
                  Because a repair means the device was opened, the packing is re-checked against the
                  dangerous-goods rules for the chosen mode before the carton is sealed. No exceptions.
                </FlowStep>
                <FlowStep title="7. Commercial pack rebuilt">
                  A fresh commercial invoice and packing list for the returning units only, cross-
                  referenced to the original proforma and the RMA number.
                </FlowStep>
                <FlowStep title="8. Insurance aligned">
                  The consignment is insured on the returning units, and the certificate of cover names
                  the carrier, the consignee and the RMA reference.
                </FlowStep>
              </div>

              <Callout tone="warn" title="The declaration is the part that gets consignments held">
                <p>
                  A repaired device is still a used device. On the long-haul lanes the ports that matter
                  are strict about condition, and an invoice that says &ldquo;phones&rdquo; when the
                  carton contains repaired handsets is an avoidable problem. Our invoices carry the
                  condition, the grade, the repair history and the disclosure status. If your broker
                  needs anything reworded for entry, ask &mdash; and if the wording would misstate the
                  goods, we will decline the change.
                </p>
              </Callout>

              {/* ---------------------------------------------- USA ----- */}
              <h2 id="usa" style={{ marginTop: '3.5rem' }}>3. The United States lane</h2>
              <div className="prose">
                <p>
                  North America is a disclosure market rather than a price market, so the practical
                  constraint on this lane is paperwork accuracy rather than freight cost. The
                  commercial treatment of used electronics is set by the classification your broker
                  applies to the entered goods, and the consumer treatment is set by the Federal Trade
                  Commission&rsquo;s rules on how a refurbished device is represented. Both are yours as
                  the importer. What follows is what we supply, and where we stop.
                </p>
              </div>

              <KV
                items={[
                  { k: 'Origin', v: 'Dubai Airport Freezone. Export documentation prepared by our forwarder; certificates of origin issued as standard' },
                  { k: 'Air departure', v: 'Dubai International (DXB), with Dubai World Central (DWC) as an alternative for freight uplift' },
                  { k: 'Air destinations', v: 'New York (JFK/EWR), Chicago (ORD), Atlanta (ATL), Los Angeles (LAX), and Miami as the entry point for Latin America onward' },
                  { k: 'Sea departure', v: `Jebel Ali, typically via a transshipment hub. Ocean bookings require the security filing to be lodged before lading, so leave time for it` },
                  { k: 'Sea destinations', v: 'Newark / New York, Savannah, Houston, and Long Beach / Oakland on the Pacific' },
                  { k: 'Delivery term', v: 'EXW Dubai as standard. FOB, CIF and DAP quoted. DDP available where you have nominated a US importer of record' },
                  { k: 'Consolidation', v: 'LCL for trial and mid-size orders, FCL from roughly a 20-foot equivalent of graded stock. A partial container is cheaper per unit and slower per unit' },
                  { k: 'Incoterm on the repaired return', v: 'The same term as the original consignment unless we agree otherwise at the point of the claim. We do not quietly improve the term on a return' },
                ]}
              />

              <h3>What the US importer needs to handle</h3>
              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['Customs entry and classification', 'The tariff classification of used handsets, laptops and spare parts, the duty assessment on entered value, and any additional tariffs your broker identifies for the current rate of general note. Confirm each with a licensed broker rather than taking a rate from a supplier.'],
                  ['Entry filing on ocean', 'Ocean imports require advance security filing data before the goods are loaded. Your broker lodges it; you must give them the data early enough, and that constraint is a common cause of missed sailings.'],
                  ['De minimis does not apply', 'Commercial goods are not eligible for the low-value duty relief that applies to personal shipments. On a wholesale consignment, duty and any applicable taxes are assessed on the full entered value from the first unit.'],
                  ['Refurbished disclosure', 'A device sold or represented as refurbished must be disclosed as such, in the listing and the advertising, before the consumer buys. Unqualified &ldquo;new&rdquo; or &ldquo;available&rdquo; language on a refurbished unit is the classic deceptive-advertising exposure.'],
                  ['Written warranty obligations', 'A written warranty on a consumer good carries federal and state obligations, including making the terms available before sale and providing repair or refund. Because you pass our warranty on, that obligation transfers with it.'],
                  ['State-level obligations', 'Producer-responsibility, covered-device and take-back duties vary by state and are amended often. Registration or marking duties are the importer&rsquo;s; this is a local compliance question rather than a shipping one.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="file">
                    {v}
                  </Card>
                ))}
              </div>

              {/* ------------------------------------------- CANADA ----- */}
              <h2 id="canada" style={{ marginTop: '3.5rem' }}>4. The Canada lane</h2>
              <div className="prose">
                <p>
                  Canada adds two things the United States does not: consumer information generally has to
                  be available in both English and French, and provincial producer-responsibility
                  registration sits with the party placing electronics on the market. We prepare the
                  bilingual documentation. The registration is yours.
                </p>
              </div>

              <KV
                items={[
                  { k: 'Origin', v: 'Dubai Airport Freezone, as for every lane. No Canadian origin, and no Canadian facility' },
                  { k: 'Air destinations', v: 'Toronto (YYZ), Montreal (YUL), Calgary (YYC), Vancouver (YVR)' },
                  { k: 'Sea destinations', v: 'Vancouver and Prince Rupert on the Pacific, Montreal and Halifax on the Atlantic. West-coast entry is usually faster to your warehouse' },
                  { k: 'Transit logic', v: 'Vancouver for western Canada, Montreal for Quebec and the east, and expect a rail or trucking leg from the port to your door' },
                  { k: 'Taxes', v: 'GST applies on the entered value, and HST applies in participating provinces. Registered importers can recover it; the rate and the recovery position are your broker&rsquo;s and your accountant&rsquo;s call, not ours' },
                  { k: 'Commercial accounting', v: 'CBSA requires commercial importers to be set up for accounting and reporting on their entries. This is an importer registration task, and it must be in place before the first shipment' },
                  { k: 'Bilingual documentation', v: 'English and French grade inserts and warranty summaries prepared as standard for Canadian consignments, with a French-language proforma available on request' },
                  { k: 'Provincial obligations', v: 'Ontario and several other provinces operate producer-responsibility regimes for covered electronics, with registration, reporting and stewardship duties on producers and importers' },
                ]}
              />

              <Callout tone="plain" title="Ontario is the one to get right first">
                <p>
                  If Ontario is your volume market, the producer-responsibility registration is the item
                  most likely to delay your programme, because it is a registration rather than a document
                  we can send you. Start it before the first shipment, not after. We supply the data your
                  registration needs &mdash; units by category, weight, and place of sale &mdash; but we
                  cannot hold the registration on your behalf.
                </p>
              </Callout>

              {/* ------------------------------------- US/CA DOCUMENTS */}
              <h2 id="us-ca-documents" style={{ marginTop: '3.5rem' }}>
                5. Documents for both markets
              </h2>
              <p className="muted" style={{ marginBottom: '1.4rem' }}>
                The document pack is the same on every lane. It is assembled from the same record the
                inspector wrote, so it reconciles with the goods rather than being assembled separately
                for the paperwork.
              </p>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">Document</Th>
                    <Th scope="col">Purpose</Th>
                    <Th scope="col">Market note</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td strong>Commercial invoice</Td>
                    <Td>Entry, duty assessment, and your accounts payable</Td>
                    <Td>Declares condition, grade, and repaired-unit status. True value, true condition</Td>
                  </tr>
                  <tr>
                    <Td strong>Packing list</Td>
                    <Td>Reconciliation against the manifest and the grade reports</Td>
                    <Td>One line per serial, reconciled one-to-one</Td>
                  </tr>
                  <tr>
                    <Td strong>Certificate of origin</Td>
                    <Td>Preferential origin support where a claim is available</Td>
                    <Td>Issued as standard. Confirm with your broker whether your lane qualifies</Td>
                  </tr>
                  <tr>
                    <Td strong>IMEI / MEID manifest</Td>
                    <Td>Serial-level traceability and the record of screened identifiers</Td>
                    <Td>Matches the grade reports one-to-one</Td>
                  </tr>
                  <tr>
                    <Td strong>Grade reports</Td>
                    <Td>The product specification, and the evidence for any grade claim</Td>
                    <Td>Per unit. Discloses condition, parts and recorded defects</Td>
                  </tr>
                  <tr>
                    <Td strong>Destruction certificates</Td>
                    <Td>Evidence that data on a used device was destroyed</Td>
                    <Td>
                      Per serial. Re-issued after any repair, and the certificate set is the private-data
                      argument most resellers ask us for
                    </Td>
                  </tr>
                  <tr>
                    <Td strong>Warranty summary</Td>
                    <Td>The written warranty the buyer&rsquo;s retail customer receives</Td>
                    <Td>Uniform wording. Bilingual for Canada</Td>
                  </tr>
                  <tr>
                    <Td strong>Dangerous-goods declaration</Td>
                    <Td>Lithium-battery compliance for air movement</Td>
                    <Td>Required on every air consignment containing batteries</Td>
                  </tr>
                  <tr>
                    <Td strong>Insurance certificate</Td>
                    <Td>Cargo cover for the declared value</Td>
                    <Td>Covers invoice value plus freight where arranged</Td>
                  </tr>
                  <tr>
                    <Td strong>Bilingual inserts</Td>
                    <Td>Consumer information in both official languages</Td>
                    <Td>French for Canada. Arabic and Traditional Chinese for other lanes on request</Td>
                  </tr>
                </tbody>
              </TableWrap>

              {/* --------------------------------------------- CUSTOMS - */}
              <h2 id="customs" style={{ marginTop: '3.5rem' }}>6. Customs and entry</h2>
              <div className="steps">
                <Step title="Classification first">
                  Agree the tariff classification and the condition declaration with your broker before
                  the goods are offered, not after they arrive. Classification drives duty, and duty is
                  assessed on the entered value of used goods.
                </Step>
                <Step title="Entry filing, ocean only">
                  For sea freight the importer must provide the security filing data early enough to be
                  lodged before loading. This is a scheduling constraint, not paperwork you can fix at
                  destination, and it is the most common cause of a missed sailing.
                </Step>
                <Step title="Values that reconcile">
                  Invoice value, packing list, manifest and grade reports all agree. We declare accurately
                  and we will never under-invoice &mdash; that is a customs liability for you, and
                  permanent exclusion is a much worse outcome than the duty.
                </Step>
                <Step title="Duty and tax payment">
                  Duty on entry, or the deferment or bonded arrangements your broker sets up if you
                  regularly import. Taxes are collected in the destination market, and recovery is a
                  question for your own structure.
                </Step>
                <Step title="Marks, labels and condition at inspection">
                  The cartons, the serial labelling, and the condition statement all need to be consistent.
                  We mark every carton with the consignment, the RMA where relevant, and the grade band.
                </Step>
                <Step title="Records you will need later">
                  Keep the entry documents, the invoice, the grade reports and the destruction
                  certificates together per consignment. They are what you need for an audit, for an EPR
                  reporting cycle, and for any consumer claim.
                </Step>
              </div>

              {/* -------------------------------------------- LAST ML - */}
              <h2 id="last-mile" style={{ marginTop: '3.5rem' }}>7. Port to your dock</h2>
              <div className="prose">
                <p>
                  The port-to-warehouse leg is the part that most often goes wrong, and it is almost never
                  the carrier&rsquo;s fault. Container damage in a stacking yard, detention charges accruing
                  at the terminal, and a delivery appointment you did not know you needed are all ordinary
                  consequences of importing by sea, and all of them are cheaper to plan than to absorb.
                </p>
              </div>

              <div className="grid grid-3" style={{ gap: '1.2rem' }}>
                <Card title="Before the vessel arrives" icon="clock">
                  Book your customs broker and your drayage slot in advance. Ask the terminal about
                  free-time limits, because a container held past them starts accruing demurrage and
                  storage, and that bill is often larger than the freight.
                </Card>
                <Card title="On discharge" icon="box">
                  Inspect the container before it leaves the terminal where you can. Check for water
                  ingress, crushed corners, and cartons that have shifted. Photograph damage before
                  signing, because the signature is your chance to note it.
                </Card>
                <Card title="Break-bulk and air cargo" icon="truck">
                  Air and LCL cargo is palletised and shrink-wrapped by the consolidator. Ask for the
                  wrapping standard you expect, and check the pallet on arrival rather than trusting that
                  it is intact.
                </Card>
              </div>

              <Callout tone="warn" title="Ask for a landed estimate, not a freight quote">
                <p>
                  Freight is the visible number and it is rarely the largest one. A realistic landed
                  figure for a sea consignment into the US or Canada includes freight, fuel and security
                  surcharges, terminal handling, documentation fees, duty on the entered value, drayage,
                  detention risk, and insurance. We will quote the freight, name the forwarder, and tell
                  you which of the other costs are fixed and which depend on how quickly you clear. What we
                  will not do is quote a door-to-door number we cannot control, because that is how a
                  buyer ends up with a surprise invoice and a damaged lot.
                </p>
              </Callout>

              {/* ---------------------------------------------- ORIGIN - */}
              <h2 id="origin" style={{ marginTop: '3.5rem' }}>
                8. Shipping from inside the US or Canada
              </h2>
              <div className="prose">
                <p>
                  You asked how we would send from the US or Canada, so here is the honest answer rather
                  than the convenient one: <b>every consignment leaves from Dubai.</b> We do not hold
                  inventory in the United States or Canada, we do not operate a repair facility in either
                  market, and we will not describe a forwarder&rsquo;s warehouse as ours.
                </p>
                <p>
                  That is a real limitation for North American buyers, and it has three practical
                  consequences you should weigh before you commit to a programme with us. We set them out
                  because you will find them out anyway on the first container.
                </p>
              </div>

              <TableWrap>
                <thead>
                  <tr>
                    <Th scope="col">What you may have expected</Th>
                    <Th scope="col">What actually happens</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td>A US or Canadian stock point a few hours from your warehouse</Td>
                    <Td>
                      No. Goods are in Dubai until you order, and then they are in transit. Replenishment
                      on a sea lane is a 20&ndash;30 day commitment; on air, 4&ndash;9 days. Plan inventory
                      on that basis.
                    </Td>
                  </tr>
                  <tr>
                    <Td>Domestic warranty repairs inside the US</Td>
                    <Td>
                      Not available. Warranty returns go back to Dubai, which is the single biggest reason
                      a North American warranty claim is slow, and the reason we consolidate claims and
                      ship insured rather than expecting a local turnaround.
                    </Td>
                  </tr>
                  <tr>
                    <Td>US or Canadian origin on the paperwork</Td>
                    <Td>
                      Never arranged, and we will not paper goods as another origin. Goods are exported
                      from the UAE and entered as UAE-origin used electronics. Any structure that requires
                      a different origin of record is a conversation with your own counsel and forwarder.
                    </Td>
                  </tr>
                </tbody>
              </TableWrap>

              <h3>What you can arrange yourself, and how we support it</h3>
              <div className="grid grid-2" style={{ gap: '1.2rem' }}>
                {[
                  ['A US or Canadian 3PL warehouse you nominate', 'Many buyers use a third-party logistics warehouse to hold stock close to their customers. We will ship to it, mark the cartons, and supply the documentation your warehouse needs for onward despatch. We do not operate it, we do not stock in it, and we do not warrant goods held there &mdash; the risk sits with whoever holds the inventory.'],
                  ['A bonded or FTZ facility', 'If your structure needs goods held in bond before entry, or re-exported rather than entered, your forwarder arranges the facility and we ship to it on your instruction with the correct documentation.'],
                  ['An importer of record', 'If you do not have a US entity, several routes work &mdash; DDP through an importer of record, DDP with a courier that will clear commercial goods, or your own broker with a customs bond. We will supply the paperwork, and we will not pretend to be your importer of record.'],
                  ['Consolidation with a US-bound buyer', 'If you are buying for onward resale into the US or Canada, we can consolidate your units with another buyer&rsquo;s on the same sailing. Manifests and invoices stay per-importer while the freight is shared, which is the usual way smaller buyers make sea economics work.'],
                ].map(([k, v]) => (
                  <Card key={k} title={k} icon="globe">
                    {v}
                  </Card>
                ))}
              </div>

              <Callout tone="bad" title="What we will not do, on any lane">
                <p>
                  We will not describe a partner&rsquo;s warehouse as ours, paper UAE goods as
                  another origin, or instruct a courier to under-declare a value to get a consignment
                  through. Every one of those would be a lie on a document that a regulator and your
                  customer&rsquo;s compliance team can both read, and none of them is worth the duty saved.
                </p>
              </Callout>

              {/* -------------------------------------------- RMA TRANSIT */}
              <h2 id="rma-transit" style={{ marginTop: '3.5rem' }}>
                9. Warranty work on these lanes
              </h2>
              <div className="prose">
                <p>
                  This is the part of the North American proposition that buyers discover late, so here it
                  is early: a warranty claim on a unit in the United States or Canada means the device
                  travels to Dubai and back. That is a long loop, and no amount of good intentions changes
                  the geography. What we do is make the loop predictable, evidenced and insured rather
                  than fast.
                </p>
              </div>

              <KV
                items={[
                  { k: 'Return leg, air', v: 'Paid by us where the claim is upheld, and we book it on your consignment reference' },
                  { k: 'Typical total elapsed', v: 'Decision to return delivery, typically 15–25 working days including the diagnosis and the return transit' },
                  { k: 'Consolidation', v: 'Claims are batched per consignee so you receive one shipment, not one parcel per unit' },
                  { k: 'Insurance', v: 'The returning leg is insured to the full replacement value' },
                  { k: 'What you receive back', v: 'A repaired or replacement unit, re-wiped, fully re-tested, re-graded, and re-certified with a fresh document pack and a new warranty start date' },
                  { k: 'If a second repair fails', v: 'Escalated, and the outcome is a replacement at an equal or better grade or a full credit &mdash; your choice, not a third repair' },
                  { k: 'The uncomfortable option', v: 'If the round trip is not commercially sensible for the unit, we will tell you that, and we will offer a credit or a local parts purchase instead of pretending the return makes sense' },
                ]}
              />

              <Callout tone="info" title="The practical way to reduce warranty friction">
                <p>
                  Order a mixed-grade trial, not a single tier. A first consignment that spreads across
                  grades gives you the real DOA rate for the models you actually sell, before you commit to
                  a sea lane. It also means a problem found on a small lot is a small lot to replace. The
                  sequence after a claim is documented in full on the{' '}
                  <Link href={`${base}/returns`}>returns and repair turnaround page</Link>, and the
                  workmanship behind the repair is on the{' '}
                  <Link href={`${base}/repair-standard`}>repair standard</Link>.
                </p>
              </Callout>

              {/* --------------------------------------------- ARRIVAL - */}
              <h2 id="arrival" style={{ marginTop: '3.5rem' }}>10. On arrival</h2>
              <div className="steps">
                <Step title="Check the cartons before the seal is broken">
                  Note any damage on the carrier&rsquo;s paperwork and photograph it. Damage noted at
                  delivery is recoverable; damage noted afterwards is an argument.
                </Step>
                <Step title="Count before you open anything">
                  Cartons against the packing list, and the packing list against the manifest. A shortfall
                  found at the dock is a clean claim.
                </Step>
                <Step title="Sample, do not inspect everything">
                  Pull a sample per grade and per model and grade it against the published criteria. A full
                  inspection of a mixed pallet is not practical and we do not expect it &mdash; a
                  statistically sensible sample is, and we will help you design one.
                </Step>
                <Step title="Reconcile the documentation">
                  Grade reports to serials to cartons. If the pack does not reconcile, stop and tell us
                  before the consignment is sold onward &mdash; after it has been resold the conversation
                  is much harder.
                </Step>
                <Step title="Raise anything non-conforming immediately">
                  Dead-on-arrival and transit damage claims run on a 7-day window from delivery. Raise them
                  early with photographs and the serials; the terms are on the{' '}
                  <Link href={`${base}/warranty`}>warranty page</Link>.
                </Step>
              </div>

              <Callout tone="plain" title="One thing worth doing on every first consignment">
                <p>
                  Photograph a random selection of units against their grade reports before anything goes
                  to your customers, and keep the photographs. It does two things: it tells us within a
                  week if our grading is off in a direction we cannot see from inside, and it gives your
                  own team an internal reference. Buyers who do this on consignment one tend to be the
                  buyers who are still ordering on consignment twenty.
                </p>
              </Callout>

              <div style={{ marginTop: '3.5rem' }}>
                <CtaBand
                  title="Tell us the destination, the volume and the model mix, and we will price the goods, the freight and the documents together."
                  primary={{ label: 'Request a quote', href: `${base}/contact` }}
                  secondary={{ label: 'Shipping & Incoterms', href: `${base}/shipping` }}
                >
                  For a US or Canadian lane we will name the forwarder we would use, give you the transit
                  assumption, and list every document your broker will ask for before we ship &mdash; so
                  the clearance does not become your problem on arrival. Questions on classification or
                  disclosure go to <a href={`mailto:${SITE.complianceEmail}`}>{SITE.complianceEmail}</a>.
                  Read next:{' '}
                  <Link href={`${base}/compliance`}>market compliance</Link>,{' '}
                  <Link href={`${base}/assurance`}>quality assurance</Link> and the full{' '}
                  <Link href={`${base}/export-process`}>16-step export chain</Link>.
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
