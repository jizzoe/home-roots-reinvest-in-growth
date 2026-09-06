import { execFileSync } from 'node:child_process';
import { mkdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const imageDir = join(root, 'images');
mkdirSync(imageDir, { recursive: true });
for (const path of [imageDir]) rmSync(path, { recursive: true, force: true });
mkdirSync(imageDir, { recursive: true });

// All names, business details, transaction identifiers, and values are invented.
// Values are supplied separately as ground truth; images intentionally vary in
// capture quality to exercise mobile receipt OCR rather than visual design.
const receipts = [
  ['ht-01-mache-thermal','ht','HTG','thermal_market','readable','MACHE BOIS-VERNA','18/08/2026','Diri 2kg|Lwil 1L|Pwa nwa','1450.00','TOTAL POU PEYE'],
  ['ht-02-boutik-handwritten','ht','HTG','handwritten_shop','readable','BOUTIK TI LOU','20/08/2026','Pen|Ze 12|Lèt','785','MONTAN'],
  ['ht-03-restoran-thermal','ht','HTG','thermal_restaurant','readable','KAY MANJE MARI','21/08/2026','Diri kole|Poul fri|Ji sitwon','1125.50','TOTAL'],
  ['ht-04-famasi-thermal','ht','HTG','thermal_pharmacy','readable','FAMASI LAVI','22/08/2026','Savon|Pansman|Vitamin','960.00','TOTAL POU PEYE'],
  ['ht-05-gazoline-thermal','ht','HTG','thermal_fuel','readable','PONP GAZ KANAPE VE','23/08/2026','Gazolin 4.20 gal','2380','MONTAN TOTAL'],
  ['ht-06-legim-handwritten','ht','HTG','handwritten_market','readable','MADAN SONA - MACHE','23/08/2026','Tomat|Zonyon|Bannann','675','TOTAL POU PEYE'],
  ['ht-07-transpo-handwritten','ht','HTG','handwritten_transport','readable','TAP-TAP DELMAS','24/08/2026','Vwayaj Delmas - Kafou','150.00','MONTAN'],
  ['ht-08-materyo-printed','ht','HTG','printed_hardware','readable','KOMES WÒCH','24/08/2026','Klou 2 lb|Penti blan','3265.75','TOTAL'],
  ['ht-09-telefòn-thermal','ht','HTG','thermal_mobile_topup','readable','KONEKTE LAKAY','25/08/2026','Rechaj telefòn','500','TOTAL POU PEYE'],
  ['ht-10-boulanje-thermal','ht','HTG','thermal_bakery','readable','BOULANJRI BON GOU','26/08/2026','Pen bè|Pate|Kafe','420.00','TOTAL'],
  ['ht-11-lekol-handwritten','ht','HTG','handwritten_school','readable','LEKÒL ESPWA','26/08/2026','Kaye|Kreyon|Fotokopi','1310','MONTAN TOTAL'],
  ['ht-12-koutiryè-handwritten','ht','HTG','handwritten_service','readable','ATELYE MIREY','27/08/2026','Koud inifòm','4500.00','TOTAL POU PEYE'],
  ['ht-13-mache-kase','ht','HTG','creased_thermal_market','readable','MACHE LARIVYÈ','27/08/2026','Manje bèt|Mayi|Dlo','2890','TOTAL'],
  ['ht-14-pwason-lowlight','ht','HTG','low_light_handwritten','readable','PWASON FRE SÈL','28/08/2026','Pwason|Sitwon|Sèl','1875.00','MONTAN'],
  ['ht-15-devis-doub','ht','HTG','dual_currency_thermal','readable','KAY ECHANJ','28/08/2026','Batri solè','125.00 USD / 16,500 HTG',null],
  ['ht-16-otèl-devis','ht','HTG','dual_currency_handwritten','readable','OTÈL LALIN','29/08/2026','Yon nuit','45 USD / 5,950 Gdes',null],
  ['ht-17-tach-bouyi','ht','HTG','unreadable_thermal','unreadable','KIOSK RIVAJ','29/08/2026','Atik pa lizib','???',null],
  ['ht-18-koupe','ht','HTG','partial_cut_handwritten','unreadable','BOUTIK KACHE','30/08/2026','Atik pa lizib','???',null],
  ['fr-01-epicerie-thermal','fr','HTG','thermal_grocery','readable','EPICERIE BELLE VUE','18/08/2026','Riz|Huile|Haricots','1750,00','MONTANT TOTAL'],
  ['fr-02-quincaillerie-printed','fr','HTG','printed_hardware','readable','QUINCAILLERIE SOLEIL','19/08/2026','Ciment|Clous|Gants','4825.50','NET A PAYER'],
  ['fr-03-clinique-handwritten','fr','HTG','handwritten_clinic','readable','CLINIQUE ESPERANCE','21/08/2026','Consultation','2500','MONTANT'],
  ['fr-04-librairie-thermal','fr','HTG','thermal_stationery','readable','LIBRAIRIE LA PLUME','22/08/2026','Cahier|Stylo|Enveloppes','895.00','TOTAL A PAYER'],
  ['fr-05-laverie-lowlight','fr','HTG','low_light_thermal','readable','LAVERIE PROPRETE','25/08/2026','Lavage et sechage','1800','SOMME'],
  ['us-01-grocery-thermal','en-US','USD','thermal_grocery','readable','SUNRISE GROCER','08/18/2026','Milk|Eggs|Rice','24.67','TOTAL'],
  ['us-02-fuel-thermal','en-US','USD','thermal_fuel','readable','MILESTONE FUEL','08/19/2026','Regular 8.120 gal','29.45','AMOUNT DUE'],
  ['us-03-cafe-handwritten','en-US','USD','handwritten_cafe','readable','LILA CAFE','08/20/2026','Coffee|Bagel|Tip','11.50','TOTAL'],
  ['us-04-hardware-printed','en-US','USD','printed_hardware','readable','RIVER TOOL SUPPLY','08/22/2026','Brush|Tape|Screws','37.18','BALANCE DUE'],
  ['us-05-crumpled-pharmacy','en-US','USD','creased_thermal_pharmacy','readable','OAK PHARMACY','08/24/2026','Soap|Bandages','16.24','TOTAL'],
  ['gb-01-market-thermal','en-GB','GBP','thermal_grocery','readable','MARKET STREET FOODS','18/08/2026','Tea|Biscuits|Apples','£12.64','TOTAL'],
  ['gb-02-petrol-thermal','en-GB','GBP','thermal_fuel','readable','NORTHWAY PETROL','19/08/2026','Unleaded 19.3L','£31.24','AMOUNT DUE'],
  ['gb-03-cafe-handwritten','en-GB','GBP','handwritten_cafe','readable','THE KETTLE ROOM','21/08/2026','Tea|Scone|Service','£8.75','TOTAL'],
  ['gb-04-trades-printed','en-GB','GBP','partial_cut_printed','readable','BRIDGE BUILDERS LTD','23/08/2026','Timber|Fixings','£148.20','TOTAL'],
].map(([id,locale,currency,kind,readability,merchant,date,items,total,anchor]) => ({ id,locale,currency,kind,readability,merchant,date,items:items.split('|'),total,anchor }));

function esc(value) { return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
function moneyToCentimes(total, currency) {
  if (!total || total.includes('USD')) return null;
  const normalized = total.replace(/[£$]/g,'').replace(/,/g,'.');
  const [whole, decimal=''] = normalized.split('.');
  return Number(whole.replace(/[^0-9]/g,'')) * 100 + Number((decimal + '00').slice(0,2));
}
function dateToIso(date, locale) {
  const [first, second, year] = date.split('/');
  const [day, month] = locale === 'en-US' ? [second, first] : [first, second];
  return `${year}-${month}-${day}`;
}
function receiptSvg(r, i) {
  const handwritten = r.kind.includes('handwritten');
  const lowLight = r.kind.includes('low_light');
  const creased = r.kind.includes('creased');
  const partial = r.kind.includes('partial');
  const unreadable = r.readability === 'unreadable';
  const paper = handwritten ? '#fff8e9' : '#f7f1db';
  const font = handwritten ? 'cursive' : 'monospace';
  const lineItems = r.items.map((item,index) => `<text x="96" y="${430 + index*48}" class="item">${esc(item)}</text><text x="450" y="${430 + index*48}" class="item" text-anchor="end">${index === r.items.length-1 ? r.total : (i*7 + index*93 + 160)+'.00'}</text>`).join('');
  const receipt = `<g transform="translate(173 85) rotate(${((i%5)-2)*1.2} 250 600)" filter="${lowLight?'url(#dim)':''}">
    <rect x="0" y="0" width="520" height="1130" rx="3" fill="${paper}" stroke="#d3c6a8"/>
    <path d="M0 0h520v15l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7l-13 -7l-13 7z" fill="#e4d6b7"/>
    <text x="260" y="95" class="merchant" text-anchor="middle">${esc(r.merchant)}</text>
    <text x="260" y="135" class="small" text-anchor="middle">${r.locale === 'ht' ? 'RESI / MÈSI ANPIL' : r.locale === 'fr' ? 'REÇU DE VENTE' : 'SALES RECEIPT'}</text>
    <line x1="54" y1="170" x2="466" y2="170" class="rule"/>
    <text x="62" y="215" class="small">${r.locale === 'ht' ? 'Dat' : r.locale === 'fr' ? 'Date' : 'Date'}: ${esc(r.date)}</text>
    <text x="62" y="255" class="small">${r.locale === 'ht' ? 'Resi' : r.locale === 'fr' ? 'Reçu' : 'Receipt'} #: S-${String(4200+i*37)}</text>
    <text x="62" y="325" class="head">${r.locale === 'ht' ? 'ATIK' : r.locale === 'fr' ? 'ARTICLE' : 'ITEM'}</text><text x="450" y="325" class="head" text-anchor="end">${r.locale === 'ht' ? 'PRI' : r.locale === 'fr' ? 'PRIX' : 'PRICE'}</text>
    <line x1="54" y1="348" x2="466" y2="348" class="rule"/>
    ${lineItems}
    <line x1="54" y1="${510 + r.items.length*48}" x2="466" y2="${510 + r.items.length*48}" class="rule"/>
    ${r.anchor ? `<text x="62" y="${570 + r.items.length*48}" class="total">${esc(r.anchor)}</text><text x="455" y="${610 + r.items.length*48}" class="total" text-anchor="end">${esc(r.total)} ${r.currency === 'HTG' ? 'Gdes' : ''}</text>` : '<text x="260" y="730" class="small" text-anchor="middle">IMAGE TACHÉE / PA LIZIB</text>'}
    <text x="260" y="1010" class="small" text-anchor="middle">${r.currency} · PAIEMENT REÇU</text>
    <text x="260" y="1055" class="small" text-anchor="middle">MÈSI / MERCI / THANK YOU</text>
    ${creased ? '<path d="M20 320 L500 770" stroke="#c7b78f" stroke-width="7" opacity=".36"/><path d="M500 320 L20 770" stroke="#d8c9a4" stroke-width="5" opacity=".33"/>' : ''}
    ${unreadable ? '<rect x="0" y="0" width="520" height="1130" fill="#786d59" opacity=".45" filter="url(#blur)"/><path d="M0 600 Q220 510 520 650 L520 810 Q240 720 0 840Z" fill="#d8ccb4" opacity=".7"/>' : ''}
  </g>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1400" viewBox="0 0 900 1400">
<defs><filter id="dim"><feColorMatrix values="0.52 0 0 0 0 0 0.52 0 0 0 0 0 0.52 0 0 0 0 0 .8 0"/></filter><filter id="blur"><feGaussianBlur stdDeviation="8"/></filter><filter id="shadow"><feGaussianBlur stdDeviation="10"/></filter></defs>
<style>.merchant{font:700 ${handwritten?34:29}px ${font};fill:#28221d}.small{font:${handwritten?24:18}px ${font};fill:#40382e}.head{font:700 ${handwritten?24:19}px ${font};fill:#33291f}.item{font:${handwritten?27:21}px ${font};fill:#30271e}.total{font:700 ${handwritten?31:25}px ${font};fill:#201a14}.rule{stroke:#776c5b;stroke-width:2;stroke-dasharray:5 5}</style>
<rect width="900" height="1400" fill="${lowLight?'#1b1c1e':'#59615b'}"/><rect x="125" y="72" width="650" height="1215" rx="40" fill="#10110f" opacity=".34" filter="url(#shadow)"/>
${receipt}${partial?'<rect x="0" y="1080" width="900" height="320" fill="#59615b"/>':''}
</svg>`;
}

const manifest = { schema_version: 1, generated_at: '2026-09-05', source_policy: 'Synthetic only. No real-person, participant, or third-party financial data. Do not treat the images as commercial records.', corpus: receipts.map((r) => ({
  file: `images/${r.id}.png`, label_file: `labels/${r.id}.json`, ...r,
  ground_truth: { merchant: r.merchant, date_iso: r.readability === 'readable' ? dateToIso(r.date, r.locale) : null, amount_centimes: r.readability === 'readable' ? moneyToCentimes(r.total, r.currency) : null, currency_displayed: r.currency, human_readable: r.readability === 'readable', amount_expected_blank: !r.anchor, notes: r.anchor ? undefined : 'Dual-currency or unreadable case: amount should be blank for M1.' }
}))};

mkdirSync(join(root, 'labels'), { recursive: true });
for (const [i, r] of receipts.entries()) {
  const svgPath = join(imageDir, `${r.id}.svg`);
  const pngPath = join(imageDir, `${r.id}.png`);
  writeFileSync(svgPath, receiptSvg(r, i));
  // Quick Look is the locally available SVG rasterizer on the project machine.
  // It writes <source>.png, which is renamed to the stable corpus filename.
  execFileSync('qlmanage', ['-t', '-s', '900', '-o', imageDir, svgPath], { stdio: 'ignore' });
  renameSync(`${svgPath}.png`, pngPath);
  rmSync(svgPath);
  writeFileSync(join(root, 'labels', `${r.id}.json`), JSON.stringify(manifest.corpus[i], null, 2) + '\n');
}
writeFileSync(join(root, 'corpus-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
