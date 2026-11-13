// Builds pay-sheet.html, the one-page summary for artists and partners, from ../model.js.
// Usage: node src/pay-sheet.js [fragment-path]
// The optional fragment is the page without <html>/<head>/<body>, the form a claude.ai artifact expects.
const fs = require('fs');
const path = require('path');
const M = require('../model.js');
const s = JSON.parse(JSON.stringify(M.DEFAULTS));
const all = M.series(s);
const BE = M.coveredAt(s, all);
const mx = s.stages.map((_, L) => M.maxPaid(s, L));
const rel = M.releases(s);
const [S0, S1, S2] = mx;
const R = Math.round;
const money = n => (n < 0 ? '−$' : '$') + Math.abs(R(n)).toLocaleString('en-US');
const DAYS = ['Friday', 'Saturday', 'Sunday'];
const TIMES = ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:30 PM', '9:00 PM', '10:30 PM'];
const LEN = ['1 hr', '1 hr', '1 hr', '1 hr', '1 hr', '90 min', '90 min', '90 min'];
const ROLE = ['', '', '', '', '', 'Opener', 'Direct support', 'Headliner'];
const cols = [{ key: 'g', head: 'Guaranteed', sub: `up to break-even, ${BE} tickets` }, { n: S0, head: `${S0} tickets`, sub: 'sell-out, 199 on site', sell: true }, { n: 200, head: '200 tickets', sub: '' }, { n: 250, head: '250 tickets', sub: '' }, { n: S1, head: `${S1} tickets`, sub: 'sell-out, 350 on site', sell: true }, { n: S2, head: `${S2} tickets`, sub: 'sell-out, 500 on site', sell: true }];
const pay = (j, i, c) => c.key === 'g' ? s.slots[j][i].min : R(all[c.n].slotNow[j][i]);
// The artist total at each level must match the model to within rounding.
const totals = cols.map(c => s.slots.reduce((a, d, j) => a + d.reduce((b, _, i) => b + pay(j, i, c), 0), 0));
cols.forEach((c, k) => { if (c.n !== undefined && Math.abs(totals[k] - all[c.n].artistPaid) > 15) throw new Error('total mismatch at ' + c.n + ': ' + totals[k] + ' vs ' + all[c.n].artistPaid); });
const fullTotal = s.slots.flat().reduce((a, x) => a + Math.max(x.target, x.min), 0);
const fullAt = all.findIndex(r => r.artistPaid >= fullTotal - 0.5);

const payRows = s.slots.map((d, j) => {
  const rows = d.map((x, i) => `<tr${i === 5 ? ' class="night-start"' : ''}><th scope="row"><span class="time">${TIMES[i]}</span>${ROLE[i] ? `<span class="role">${ROLE[i]}</span>` : ''}</th><td class="len">${LEN[i]}</td>${cols.map(c => { const v = pay(j, i, c); return `<td class="${c.sell ? 'sell' : ''}${c.key === 'g' ? ' g' : ''}">${v ? money(v) : '<span class="nil">$0</span>'}</td>`; }).join('')}</tr>`).join('');
  const sub = cols.map(c => d.reduce((b, _, i) => b + pay(j, i, c), 0));
  return `<tbody><tr class="day"><th scope="rowgroup" colspan="${cols.length + 2}">${DAYS[j]}</th></tr>${rows}<tr class="subtotal"><th scope="row">${DAYS[j]} total</th><td></td>${sub.map((v, k) => `<td class="${cols[k].sell ? 'sell' : ''}">${money(v)}</td>`).join('')}</tr></tbody>`;
}).join('');
const payTable = `<table class="pay"><thead><tr><th scope="col" class="l">Set time</th><th scope="col" class="l">Length</th>${cols.map(c => `<th scope="col" class="${c.sell ? 'sell' : ''}${c.key === 'g' ? ' g' : ''}">${c.head}${c.sub ? `<small>${c.sub}</small>` : ''}</th>`).join('')}</tr></thead>${payRows}<tfoot><tr><th scope="row">All 24 sets</th><td></td>${totals.map((v, k) => `<td class="${cols[k].sell ? 'sell' : ''}">${money(v)}</td>`).join('')}</tr></tfoot></table>`;

// everyone at each size
const wl = [90, BE, S0, S1, S2];
const wlHead = { 90: 'what Reeguez Rocks sold', [BE]: 'break-even', [S0]: 'sell-out, 199 on site', [S1]: 'sell-out, 350 on site', [S2]: 'sell-out, 500 on site' };
const ps = s.partners.findIndex(p => /Seismic/.test(p.name));
const artistsAt = n => { const c = { n }; return s.slots.reduce((a, d, j) => a + d.reduce((b, _, i) => b + pay(j, i, c), 0), 0); };
const chefs = r => r.crewRows[0].pay + r.crewRows[1].pay;
const whoRows = [
  ['Camp Tahquitz', 'venue fee per ticket per day, cabins, medical rep', r => r.campTotal],
  ['Kinetic Desert', 'production: $2,000 plus $15 a ticket above 75', r => r.partnerRows[1].total],
  ['The Dome', '$10 a ticket, up to $2,000', r => r.partnerRows[2].total],
  ['Project Seismic', `side stage at 500: $3,000 plus $10 a ticket above ${s.partners[ps].feeAbove}`, r => r.partnerRows[ps].active ? r.partnerRows[ps].total : null],
  ['Artists, all 24 sets', 'the table above', r => artistsAt(r.paid)],
  ['Each of the 12 paid crew', `$100 plus $1 a ticket above ${s.crew[2].above}, a ticket and a car pass`, r => r.crewRows[2].each],
  ['Chefs', '$1,000 each, a second chef at 500', r => chefs(r)],
  ['The event itself', 'art, lighting, drinks, hospitality, marketing, reserve', r => r.budgetRows[1].budget],
  ['Step fund', 'held to pay for the next size up', r => r.fund > 0.5 ? r.fund : null],
  ['Organiser', 'what is left, and every loss below break-even', r => r.yours],
];
const whoTable = `<table class="who"><thead><tr><th scope="col" class="l">Who</th>${wl.map(n => `<th scope="col">${n} tickets<small>${wlHead[n]}</small></th>`).join('')}</tr></thead><tbody>${whoRows.map(([name, note, f], k) => `<tr${k === whoRows.length - 1 ? ' class="org"' : ''}><th scope="row">${name}<small>${note}</small></th>${wl.map(n => { const v = f(all[n]); return `<td${v !== null && v < 0 ? ' class="loss"' : ''}>${v === null ? '<span class="nil">–</span>' : money(v)}</td>`; }).join('')}</tr>`).join('')}</tbody></table>`;

// figures used in the prose
const minHead = s.slots.map(d => d[7].min), minTotal = s.slots.flat().reduce((a, x) => a + x.min, 0);
const dep = minTotal * s.depositPct / 100;
const T = s.tiers;
const P = all[S1];
const W1 = rel[1] - S0, W2 = rel[2] - S1;
const F = {
  BE, S0, S1, S2, R1: rel[1], R2: rel[2], W1, W2, fullAt, fullTotal: money(fullTotal), minTotal: money(minTotal), dep: money(dep),
  fund0: money(all[S0].fund), avg: money(P.avgTicket), mix: [s.mixFull, s.mixSat, 100 - s.mixFull - s.mixSat],
  pFull: money(T.full[0].price), pSat: money(T.sat[0].price), pSun: money(T.sun[0].price),
  loss90: money(-all[90].yours),
};
const facts = JSON.stringify(F);

const html = `<title>Tahquitz 2027 Pay Sheet</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap">
<style>
/* Layout: one reading column on granite paper; the pay table is the centrepiece, sell-out columns lit like lanterns. */
:root {
  --bg: #eef1ed; --surface: #fbfcfa; --ink: #16211c; --ink-2: #4b5b53; --ink-3: #6f7d75; --rule: #d3dbd5; --rule-2: #e3e9e4;
  --pine: #1d5a43; --pine-soft: #dcebe3; --lantern: #b7780c; --lantern-soft: #f6ead0; --loss: #ad3328;
  --display: "Bricolage Grotesque", "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
  --body: "Public Sans", "Helvetica Neue", Arial, sans-serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #0e1512; --surface: #151f1a; --ink: #e5ece8; --ink-2: #a9b8b0; --ink-3: #85958d; --rule: #2b3a33; --rule-2: #1f2b25;
  --pine: #6cc59d; --pine-soft: #1b3329; --lantern: #e7b04b; --lantern-soft: #2e2512; --loss: #ec8578; color-scheme: dark } }
:root[data-theme="dark"] {
  --bg: #0e1512; --surface: #151f1a; --ink: #e5ece8; --ink-2: #a9b8b0; --ink-3: #85958d; --rule: #2b3a33; --rule-2: #1f2b25;
  --pine: #6cc59d; --pine-soft: #1b3329; --lantern: #e7b04b; --lantern-soft: #2e2512; --loss: #ec8578; color-scheme: dark }
body { background: var(--bg); color: var(--ink); font-family: var(--body); font-size: 15px; line-height: 1.55; }
.page { max-width: 1040px; margin: 0 auto; padding-block: 40px 56px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); display: grid; gap: 40px; }
h1, h2, h3 { font-family: var(--display); line-height: 1.1; margin: 0; text-wrap: balance; }
h1 { font-size: clamp(36px, 6vw, 60px); font-weight: 800; letter-spacing: -0.02em; }
h2 { font-size: 26px; font-weight: 700; letter-spacing: -0.01em; }
h3 { font-size: 17px; font-weight: 700; }
p { margin: 0; max-width: 68ch; }
.eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--pine); }
.muted { color: var(--ink-2); }
section { display: grid; gap: 16px; min-width: 0; }
header.top { display: grid; gap: 14px; }
.lede { font-size: 19px; line-height: 1.5; color: var(--ink-2); max-width: 60ch; }
.facts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1px; background: var(--rule); border: 1px solid var(--rule); border-radius: 10px; overflow: hidden; margin-top: 6px; }
.facts div { background: var(--surface); padding: 14px 16px; display: grid; gap: 2px; align-content: start; }
.facts b { font-family: var(--display); font-size: 22px; font-weight: 700; font-variant-numeric: tabular-nums; }
.facts span { font-size: 13px; color: var(--ink-2); }
.two { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 32px; align-items: start; }
.two > * { min-width: 0; }
ul.list, ol.steps { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
ul.list li { padding-left: 18px; position: relative; }
ul.list li::before { content: ""; position: absolute; left: 2px; top: 0.62em; width: 6px; height: 6px; border-radius: 50%; background: var(--pine); }
ol.steps { counter-reset: s; gap: 14px; }
ol.steps li { counter-increment: s; display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 12px; align-items: start; }
ol.steps li::before { content: counter(s); font-family: var(--display); font-weight: 800; font-size: 18px; color: var(--pine); background: var(--pine-soft); border-radius: 8px; height: 34px; display: grid; place-items: center; }
ol.steps b { display: block; }
/* the Bowl's day, 2 PM to midnight in half hours */
.dayline { overflow-x: auto; }
.strip { min-width: 640px; display: grid; grid-template-columns: repeat(20, minmax(0, 1fr)); gap: 3px; }
.strip div { border-radius: 6px; padding: 8px 6px; font-size: 12px; line-height: 1.25; background: var(--pine-soft); color: var(--ink); }
.strip div b { display: block; font-variant-numeric: tabular-nums; }
.strip .night { background: var(--pine); color: var(--surface); }
.strip .sun { background: repeating-linear-gradient(135deg, var(--lantern-soft) 0 6px, transparent 6px 12px); border: 1px dashed var(--lantern); color: var(--ink-2); }
.ticks { min-width: 640px; display: grid; grid-template-columns: repeat(10, minmax(0, 1fr)); font-size: 11px; color: var(--ink-3); margin-top: 4px; font-variant-numeric: tabular-nums; }
.afters { font-size: 13px; color: var(--ink-2); margin-top: 8px; }
/* sizes */
.sizes { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr); gap: 10px; align-items: stretch; }
.size { background: var(--surface); border: 1px solid var(--rule); border-radius: 10px; padding: 14px 16px; display: grid; gap: 4px; align-content: start; }
.size b { font-family: var(--display); font-size: 24px; font-variant-numeric: tabular-nums; }
.size .k { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); font-weight: 600; }
.size p { font-size: 13px; color: var(--ink-2); }
.size.stretch { border-style: dashed; }
.arrow { display: grid; place-items: center; text-align: center; font-size: 12px; color: var(--lantern); font-weight: 600; max-width: 110px; }
.arrow span { display: block; font-size: 20px; line-height: 1; }
/* tables */
.tablewrap { overflow-x: auto; background: var(--surface); border: 1px solid var(--rule); border-radius: 12px; }
table { border-collapse: collapse; width: 100%; font-variant-numeric: tabular-nums; }
th, td { padding: 7px 12px; text-align: right; white-space: nowrap; }
thead th { font-size: 12px; font-weight: 700; color: var(--ink); vertical-align: bottom; border-bottom: 1px solid var(--rule); padding-top: 12px; }
thead th small { display: block; font-weight: 500; color: var(--ink-3); font-size: 11px; letter-spacing: 0.01em; }
th.l, tbody th, tfoot th { text-align: left; }
tbody td, tbody th { border-bottom: 1px solid var(--rule-2); font-size: 14px; }
.pay tbody th { font-weight: 500; }
.pay .time { display: inline-block; min-width: 68px; }
.pay .role { font-size: 12px; color: var(--ink-3); margin-left: 6px; }
.pay .len { color: var(--ink-3); font-size: 13px; text-align: left; }
.pay tr.day th { font-family: var(--display); font-size: 16px; font-weight: 700; color: var(--pine); padding-top: 16px; border-bottom: 1px solid var(--rule); text-align: left; }
.pay tr.night-start th, .pay tr.night-start td { border-top: 1px dashed var(--rule); }
.pay tr.subtotal th, .pay tr.subtotal td { font-weight: 700; border-bottom: 0; }
.pay tfoot th, .pay tfoot td { font-family: var(--display); font-weight: 700; font-size: 16px; border-top: 2px solid var(--ink); padding-block: 12px; }
td.g, th.g { background: var(--pine-soft); }
td.sell, th.sell { background: var(--lantern-soft); }
.nil { color: var(--ink-3); }
.who tbody th { font-weight: 600; }
.who tbody th small { display: block; font-weight: 400; color: var(--ink-3); font-size: 12px; white-space: normal; max-width: 34ch; }
.who td { vertical-align: top; }
.who tr.org th, .who tr.org td { border-top: 2px solid var(--ink); font-weight: 700; }
td.loss { color: var(--loss); }
.note { font-size: 13px; color: var(--ink-2); max-width: 80ch; }
.key { display: flex; flex-wrap: wrap; gap: 14px; font-size: 12px; color: var(--ink-2); }
.key span { display: inline-flex; align-items: center; gap: 6px; }
.key i { width: 14px; height: 14px; border-radius: 3px; display: inline-block; border: 1px solid var(--rule); }
footer { font-size: 12px; color: var(--ink-3); border-top: 1px solid var(--rule); padding-top: 16px; display: grid; gap: 6px; }
@media (max-width: 820px) {
  .two { grid-template-columns: minmax(0, 1fr); }
  .facts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sizes { grid-template-columns: minmax(0, 1fr); }
  .arrow { max-width: none; grid-auto-flow: column; gap: 8px; justify-content: start; padding-left: 16px; }
  .arrow span { transform: rotate(90deg); }
}
@media print {
  body { font-size: 10px; background: #fff; color: #000; }
  .page { padding: 0; gap: 14px; max-width: none; }
  h1 { font-size: 26px; } h2 { font-size: 15px; } .lede { font-size: 11px; }
  th, td { padding: 2px 6px; } tbody td, tbody th { font-size: 9.5px; }
  .tablewrap { border: 0; overflow: visible; }
  .dayline, .strip, .ticks { min-width: 0; }
}
</style>

<div class="page">
  <header class="top">
    <div class="eyebrow">Camp Tahquitz · Friday April 23 to Monday April 26, 2027</div>
    <h1>Tahquitz 2027</h1>
    <p class="lede">A three-day experimental bass and dubstep campout in the mountains. One main stage at The Bowl, afters in the K Lodge and The Dome until sunrise, and a pay plan built so that every ticket sold raises what the artists, the crew and the partners take home.</p>
    <div class="facts" role="list">
      <div role="listitem"><b>24 sets</b><span>Eight a day at The Bowl, Friday to Sunday</span></div>
      <div role="listitem"><b>${F.BE} tickets</b><span>Break-even, with every guarantee paid</span></div>
      <div role="listitem"><b>${F.S0} · ${F.S1} · ${F.S2}</b><span>Tickets at each sell-out: 199, 350 and 500 on site</span></div>
      <div role="listitem"><b>${F.fullTotal}</b><span>All 24 full fees, reached at ${F.fullAt} tickets</span></div>
    </div>
  </header>

  <section class="two">
    <div style="display:grid;gap:14px">
      <h2>The weekend</h2>
      <p>Three days of music at The Bowl from 2:00 PM to midnight, with a sunset changeover at 7:00 when the stage switches to its night look. Five one-hour daytime sets lead into three 90-minute night sets. Friday carries the biggest lineup, then Saturday, then Sunday.</p>
    </div>
    <div style="display:grid;gap:14px">
      <h2>What every artist gets</h2>
      <ul class="list">
        <li>A fee that rises with ticket sales, shown in the table below.</li>
        <li>The night slots are guaranteed whatever sells: headliners ${s.minPct.head}% of their full fee, the 9:00 and 7:30 slots ${s.minPct.support}%. Half of the guarantee is paid as a deposit before the name is announced.</li>
        <li>A room in the K Lodge apartment on the night you play one of the top three slots, and a bed in a shared cabin if you stay longer.</li>
        <li>Meals for your whole stay, and rides to and from Ontario or Palm Springs airport. You book your own flight.</li>
        <li>A guest for every artist playing 7:30 or later.</li>
      </ul>
      <p class="note">Production is by Kinetic Desert. Tickets are all-in: Fri–Sun from ${F.pFull}, Sat–Sun from ${F.pSat} and Sunday from ${F.pSun}.</p>
    </div>
  </section>

  <section aria-label="The Bowl, one day">
    <div class="dayline" aria-label="The Bowl, one day, 2 PM to midnight">
      <div class="strip">
        <div style="grid-column: span 2"><b>2:00</b>1 hr</div>
        <div style="grid-column: span 2"><b>3:00</b>1 hr</div>
        <div style="grid-column: span 2"><b>4:00</b>1 hr</div>
        <div style="grid-column: span 2"><b>5:00</b>1 hr</div>
        <div style="grid-column: span 2"><b>6:00</b>1 hr</div>
        <div class="sun" style="grid-column: span 1"><b>7:00</b>sunset</div>
        <div class="night" style="grid-column: span 3"><b>7:30</b>Opener · 90 min</div>
        <div class="night" style="grid-column: span 3"><b>9:00</b>Direct support · 90 min</div>
        <div class="night" style="grid-column: span 3"><b>10:30</b>Headliner · 90 min</div>
      </div>
      <div class="ticks"><span>2 PM</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11 PM</span></div>
      <p class="afters">After midnight: the K Lodge (105 people) and The Dome (40) run open sign-up afters until just past sunrise.</p>
    </div>
  </section>

  <section>
    <h2>How the money moves</h2>
    <ol class="steps">
      <li><div><b>Fixed costs and guarantees come first.</b><span class="muted">The venue, production, insurance, food, crew pay and the ${F.minTotal} of artist guarantees are owed whatever sells. Covering all of it takes ${F.BE} tickets. Below that the organiser carries the loss, and every guarantee is still paid in full.</span></div></li>
      <li><div><b>Everything above break-even is shared in fixed parts.</b><span class="muted">55% lifts the artists, 24% goes into the event itself (art, lighting, drinks, hospitality, marketing and a reserve) and 21% is the organiser's. The crew get $1 each for every ticket past break-even, and the production partners earn per ticket from the start.</span></div></li>
      <li><div><b>All artists rise together.</b><span class="muted">Every slot moves from its guarantee toward its full fee at the same pace, so no one is left behind while another is paid out. Daytime sets have no guarantee and are paid from break-even on. Every slot reaches its full fee at about ${F.fullAt} tickets.</span></div></li>
      <li><div><b>The event only grows when growing costs no one anything.</b><span class="muted">Each bigger size adds costs at once: permits, a medical team, porto-potties and a second stage. So the next size is sold as one block from a waitlist, and buyers are charged only when the block is full. A step fund, held back from what is above break-even at the small size, pays part of the cost. After a step, nobody is paid less than before it, the organiser included.</span></div></li>
      <li><div><b>One settlement, in the open.</b><span class="muted">Deposits go out before the announcement. Everything else is paid once, after the event, on the final ticket count, using the table below. Sales and costs are shown on the event's financials page.</span></div></li>
    </ol>
  </section>

  <section>
    <h2>Three sizes, one block at a time</h2>
    <div class="sizes">
      <div class="size"><span class="k">Up to 199 on site</span><b>${F.S0} tickets</b><p>On the camp's own facilities. Break-even at ${F.BE}. At the sell-out, ${F.fund0} is held in the step fund.</p></div>
      <div class="arrow"><span>→</span>${F.W1} on the waitlist</div>
      <div class="size"><span class="k">Up to 350 on site</span><b>${F.S1} tickets</b><p>Adds the permit and the medical team. Opens at ${F.R1} tickets, when ${F.W1} buyers are waiting. Every artist is at full fee by its sell-out.</p></div>
      <div class="arrow"><span>→</span>${F.W2} on the waitlist</div>
      <div class="size stretch"><span class="k">Up to 500 on site · stretch</span><b>${F.S2} tickets</b><p>Adds porto-potties and a side stage at The Bowl run by Project Seismic. Opens at ${F.R2} tickets, only if ${F.S1} sell out by March 1.</p></div>
    </div>
  </section>

  <section>
    <h2>Artist pay at every size</h2>
    <p class="muted">What each set is paid at the final ticket count. Between a sell-out and the next block, buyers are on the waitlist and nothing changes.</p>
    <div class="key"><span><i style="background:var(--pine-soft)"></i>Guaranteed, paid whatever sells</span><span><i style="background:var(--lantern-soft)"></i>Sell-out of each size</span></div>
    <div class="tablewrap">${payTable}</div>
    <p class="note">The ${F.S1} and ${F.S2} columns are each set's full fee: past about ${F.fullAt} tickets the artists' share has reached every full fee, and more sales go to the next size and the other lines. Figures are rounded to the dollar and assume ${F.mix[0]}% of buyers take Fri–Sun, ${F.mix[1]}% Sat–Sun and ${F.mix[2]}% Sunday only. An artist who agrees different terms (a flat fee, or a rate per ticket) is paid on those terms.</p>
  </section>

  <section>
    <h2>Everyone, at each size</h2>
    <p class="muted">Payments to each party, alongside the organiser's result. At 90 tickets, the size of last year's Reeguez Rocks, every guarantee is still paid and the organiser covers a ${F.loss90} loss.</p>
    <div class="tablewrap">${whoTable}</div>
  </section>

  <footer>
    <span>These are planned figures from the Tahquitz 2027 planner, not signed agreements. Artist names, full fees and guarantees will be updated as quotes come in.</span>
    <span>Ticket counts are paid tickets. Each size also counts crew, artists, partners and guests on site, which is why 199 on site holds ${F.S0} tickets.</span>
  </footer>
</div>
`;
const cut = html.indexOf('<div class="page">');
const standalone = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>body{margin:0}[hidden]{display:none!important}</style>\n' + html.slice(0, cut) + '</head>\n<body>\n' + html.slice(cut) + '</body>\n</html>\n';
fs.writeFileSync(path.join(__dirname, '..', 'pay-sheet.html'), standalone);
const fragment = process.argv[2];
if (fragment) { fs.mkdirSync(path.dirname(fragment), { recursive: true }); fs.writeFileSync(fragment, html); }
console.log('built pay-sheet.html | artists in all at each column:', totals.map(money).join(' / '));
