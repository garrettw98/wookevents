// Writes the computed sections of PLAN.md from ../model.js, so every figure in them comes from the model.
// Run through update-plan.js, which also applies them. Output goes to src/.out/ (not committed).
const fs = require('fs');
const path = require('path');
const M = require('../model.js');
const OUT = path.join(__dirname, '.out');
fs.mkdirSync(OUT, { recursive: true });
const clone = o => JSON.parse(JSON.stringify(o));
const m = n => (n < 0 ? '−' : '') + '$' + Math.abs(Math.round(n)).toLocaleString('en-US');
const near = (n, step) => m(Math.round(n / step) * step);
const R = Math.round;
const run = mod => { const s = clone(M.DEFAULTS); if (mod) mod(s); const all = M.series(s); const mx = s.stages.map((_, L) => M.maxPaid(s, L)); return { s, all, be: M.coveredAt(s, all), rel: M.releases(s), mx }; };
const B = run();
const P = B.all[B.mx[1]];
const { s: S, all: A, be: BE, rel, mx } = B;
const [S0, S1, S2] = mx, R1 = rel[1], R2 = rel[2], W1 = R1 - S0, W2 = R2 - S1;
const fullTotal = S.slots.flat().reduce((a, x) => a + Math.max(x.target, x.min), 0);
const minTotal = S.slots.flat().reduce((a, x) => a + x.min, 0);
const fullAt = A.findIndex(r => r.artistPaid >= fullTotal - 0.5);
const each = r => r.crewRows[2].each;
const chefs = r => r.crewRows[0].pay + r.crewRows[1].pay;
const unt = L => M.headcount(S, L).total;
const dep = minTotal * S.depositPct / 100;
// ungated copy for the cost of each step
const raw = run(s => { s.stages[1].release = 1; s.stages[2].release = 1; }).all;
const step1 = raw[S0].surplus - raw[S0 + 1].surplus, step2 = raw[S1].surplus - raw[S1 + 1].surplus;
let perTicket = 0;
const cols = [90, BE, S0, 200, S1, S2];
const row = (label, f, bold) => `| ${bold ? '**' + label + '**' : label} | ${cols.map(n => { const v = f(A[n]); const t = typeof v === 'number' ? m(v) : v; return bold ? '**' + t + '**' : t; }).join(' | ')} |`;
const head = label => `| ${label} | ${cols.join(' | ')} |\n|---|${cols.map(() => '---').join('|')}|`;
const matrix = (lv, labels, seismic) => { const levels = [...new Set(lv)].filter(n => n >= 0 && n < A.length).sort((a, b) => a - b); return '| Tickets | Camp | Kinetic Desert | The Dome | ' + (seismic ? 'Project Seismic | ' : '') + 'Artists, all 24 sets | Each paid crew | Step fund | You |\n|---|---|---|---|' + (seismic ? '---|' : '') + '---|---|---|---|\n' +
  levels.map(n => { const r = A[n], b = labels[n] ? '**' : '';
    return '| ' + b + n + (labels[n] ? ', ' + labels[n] : '') + b + ' | ' + m(r.campTotal) + ' | ' + m(r.partnerRows[1].total) + ' | ' + m(r.partnerRows[2].total) + ' | ' + (seismic ? m(r.partnerRows[3].total) + ' | ' : '') + m(r.artistPaid) + ' | ' + m(each(r)) + ' | ' + (r.fund > 0.5 ? m(r.fund) : '') + ' | ' + b + m(r.yours) + b + ' |'; }).join('\n'); };
// the booking queue
const slotLabel = (j, i) => ['Friday', 'Saturday', 'Sunday'][j] + ' ' + ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:30 PM', '9:00 PM', '10:30 PM'][i];
const queue = [];
S.slots.forEach((d, j) => d.forEach((x, i) => { if (x.min > 0) queue.push({ j, i, x }); }));
queue.sort((a, b) => a.x.order - b.x.order);
const coverAt = need => A.findIndex(c => c.surplus - c.mustSpend + c.artistMin - need >= 0);
let cum = 0, prevAt = coverAt(0);
const queueRows = queue.map((q, k) => { cum += q.x.min; const at = coverAt(cum); const add = at - prevAt; prevAt = at; return `| ${k + 1} | ${slotLabel(q.j, q.i)} | ${m(q.x.min)} | ${m(q.x.min * S.depositPct / 100)} | ${m(q.x.target)} | ${m(cum)} | +${add} | ${at}${k ? '' : ' tickets'} |`; });
const noMinBE = coverAt(0);
perTicket = minTotal / (BE - noMinBE);
// headliner minimum options
const headPct = f => s => s.slots.forEach(d => { d[7].min = R(d[7].target * f / 25) * 25; });
const headRows = [50, 60, 75, 100].map(p => { const v = run(headPct(p / 100)); const hm = v.s.slots.map(d => d[7].min); return `| ${p === 75 ? '**75%, the plan**' : p + '%'} | ${hm.map(m).join(' / ')} | ${v.be} tickets | ${m(v.all[90].yours)} | ${v.rel[1] - v.mx[0]} buyers | ${m(v.all[v.mx[0]].artistPaid)} | ${m(v.all[v.mx[0]].yours)} |`; });
const be50 = run(headPct(0.5)).be;
const early10 = s => { s.tiers.full[0].price += 10; s.tiers.full[1].price += 10; s.tiers.sat[0].price += 10; s.tiers.sat[1].price += 10; s.tiers.sun[0].price += 10; };
const beEarly = run(early10).be;
const beOpener = run(s => s.slots.forEach(d => { d[5].min = R(d[5].target * 0.25 / 25) * 25; })).be;
const beBoth = run(s => { early10(s); s.slots.forEach(d => { d[5].min = R(d[5].target * 0.25 / 25) * 25; }); }).be;
// flat deals
const flatCase = mod => { const v = run(mod); return { fund: v.all[S1].fund, block: v.rel[2] - v.mx[1], top: v.all[S2].yours }; };
const flat0 = flatCase(), flat1 = flatCase(s => { const x = s.slots[0][7]; x.agreed = true; x.rate = 0; }), flat3 = flatCase(s => s.slots.forEach(d => { d[7].agreed = true; d[7].rate = 0; }));
// fund dials
const fundRows = [0, 25, 50, 75].map(f => { const v = run(s => { s.stages[0].fund = f; }); const r = v.all[S0]; return `| ${f === 50 ? '**50%, the plan**' : f + '%'} | ${m(r.fund)} | ${m(r.artistPaid)} | ${m(r.yours)} | ${v.rel[1] - S0} buyers |`; });
const midRows = [0, 10, 25].map(f => { const v = run(s => { s.stages[1].fund = f; }); const r = v.all[S1]; return `| ${f === 0 ? '**0%, the plan**' : f + '%'} | ${m(r.fund)} | ${m(r.artistPaid)} | ${m(r.yours)} | ${v.rel[2] - S1} buyers |`; });
const permit = run(s => { s.costs.find(c => /Permit/.test(c.name)).amount = 2108; });
const ten = run(s => { for (const k of ['full', 'sat', 'sun']) s.tiers[k].forEach(x => x.price += 10); });
// crew readings
const crewA = run(s => s.crew.forEach(c => { if (c.perTicket) c.above = 0; }));
const crewC = run(s => s.crew.forEach(c => { if (c.perTicket) { c.perTicket = 1 / 12; c.above = 0; } }));
// Project Seismic
const ps = S.partners.findIndex(p => /Seismic/.test(p.name));
const psRow = mod => { const v = run(mod); const at = n => v.all[Math.min(n, v.all.length - 1)]; return { a: at(PSA).partnerRows[ps].total, b: at(PSB).partnerRows[ps].total, c: at(v.mx[2]).partnerRows[ps].total, you: at(v.mx[2]).yours, rel: v.rel[2], top: v.mx[2] }; };
const MID2 = Math.round((R2 + S2) / 2 / 5) * 5;
let PSA = 0, PSB = 0;
const psMods = [s => { s.partners[ps].perTicket = 0; }, null, s => { s.partners[ps].perTicket = 0; s.partners[ps].share = 2 / 9; }];
PSA = Math.max(...psMods.map(f => run(f).rel[2])); PSB = Math.round((PSA + S2) / 2);
const psFlat = psRow(psMods[0]), psRec = psRow(), psShare = psRow(psMods[2]), psGuest = psRow(s => { s.partners[ps].people = [0, 0, 20]; });
// artist share dial
const shareRows = [55, 50, 45].map(k => { const v = run(s => { s.budgets[0].share = k; }); const f = v.all.findIndex(r => r.artistPaid >= fullTotal - 0.5); return `| ${k}% | ${m(v.all[S0].artistPaid)} | ${m(v.all[S0].yours)} | ${m(v.all[200].yours)} | ${m(v.all[S1].yours)} | ${f < 0 || f > S1 ? 'not by ' + S1 : f + ' tickets'} |`; });
const pess = run(s => { s.addons.otherPer = 0; s.addons.carRate = 10; }).be;
const bank = run(s => { s.proc.bankShare = 30; }).all[S1].processing;
// profit and loss at the middle sell-out
const costLines = S.costs.map((c, i) => [c.name, P.costRows[i].value]).filter(x => x[1] > 0.5);
const grocer = costLines.filter(x => /Groceries/.test(x[0])).reduce((a, x) => a + x[1], 0), supplies = costLines.filter(x => /supplies/i.test(x[0])).reduce((a, x) => a + x[1], 0);
const otherCosts = costLines.filter(x => !/Groceries|supplies/i.test(x[0]));
const kd = S.partners[1], dome = S.partners[2];
const hardLines = [
  ['Artist minimums, 9 slots', P.artistMin],
  ...otherCosts.map(x => [x[0] === 'Venue fee' ? `Venue fee, ${R(P.ticketDays)} ticket-days at $10` : x[0], x[1]]),
  [`Kinetic Desert: ${m(kd.guarantee)} plus ${m(kd.perTicket)} on ${S1 - kd.feeAbove} tickets`, P.partnerRows[1].total],
  [`Crew: 12 at $100, plus $1 each on ${S1 - S.crew[2].above} tickets`, P.crewPay + P.crewFees - chefs(P)],
  ['Groceries for crew and artists', grocer], ['The Dome, at its cap', P.partnerRows[2].total], [`Cabin rental, ${P.cabinsRented} at ${m(S.addons.cabinCost)}`, P.cabinCost],
  ['Payment processing', P.processing], ['Site supplies: wristbands, signage, radios, trash, firewood', supplies], ['Chef', chefs(P)],
].sort((a, b) => b[1] - a[1]);
const hardSum = hardLines.reduce((a, x) => a + x[1], 0);
if (Math.abs(hardSum - P.hard) > 1) throw new Error('hard cost lines do not add up: ' + hardSum + ' vs ' + P.hard);
const ev = r => r.budgetRows[1].budget, evShare = (r, k) => 1050 * { art: 500 / 1050, drinks: 0, reserve: 0, marketing: 250 / 1050, hosp: 300 / 1050 }[k] + (ev(r) - 1050) * { art: 9, drinks: 7, reserve: 4, marketing: 2, hosp: 2 }[k] / 24;
const tierAvg = k => P[k].avg;
const nums = { mix: [S.mixFull, S.mixSat, 100 - S.mixFull - S.mixSat], fullSold: [R(A[S0].nFull), R(P.nFull), R(A[S2].nFull)], tiers: S.tiers, gap1: S.tiers.full[1].price - S.tiers.sat[0].price, BE, S0, S1, S2, R1, R2, W1, W2, fullAt, each: [S0, 200, S1, S2].map(n => R(each(A[n]))), proc: R(P.processing), bankSave: R(P.processing - bank), avg90: R(A[90].avgTicket), avgS1: R(P.avgTicket), tFull: R(tierAvg('tFull')), tSat: R(tierAvg('tSat')), tSun: R(tierAvg('tSun')),
  groc0: R(1350 + 5.4 * S0), groc1: R(1350 + 5.4 * S1), art: [200, S1, S2].map(n => R(evShare(A[n], 'art'))), drinks: [200, S1, S2].map(n => R(evShare(A[n], 'drinks'))), unt: [unt(0), unt(1), unt(2)], crewABe: crewA.be, pess, dep: R(dep), minTotal, fullTotal };

const out = `@@@ The short version
## The short version

1. **Break-even is ${BE} tickets.** That covers every hard cost, including the minimums for all nine 90-minute slots and $100 for each of the 12 paid crew. Reeguez Rocks sold 90, so the event has to sell about ${R((BE / 90 - 1) * 20) * 5}% more before anyone is ahead. It assumes ${S.mixFull}% of buyers take Fri–Sun, ${S.mixSat}% Sat–Sun and ${100 - S.mixFull - S.mixSat}% Sunday only, which puts the average ticket at about ${m(P.avgTicket)} at a ${S1}-ticket sell-out.
2. **Headliners are guaranteed 75% of their fee, because their names sell the tickets.** That is ${m(S.slots.reduce((a, d) => a + d[7].min, 0))} of the ${m(minTotal)} in minimums. It adds ${BE - be50} tickets to the break-even compared with guaranteeing half.
3. **Most sales come late, so the artist deposits come from you first.** At 50% they are ${m(dep)}. The permit can wait: a Temporary Use Permit can be filed close to the event, once sales show which size you are running.
4. **Everyone is paid once, after the event, on the final ticket count.** Each artist and partner gets a one-page pay table from the planner: tickets sold on the left, their pay on the right.
5. **Three buckets share what is left after hard costs:** Artists 55%, Event 24% and you 21%.
6. **Crew pay is $100 each in the break-even, plus $1 each for every ticket sold above ${S.crew[2].above}.** That is ${m(each(A[S0]))} each at ${S0} tickets, ${m(each(A[S1]))} at ${S1} and ${m(each(A[S2]))} at ${S2}.
7. **Below break-even the loss is yours.** At 90 tickets it is about ${near(-A[90].yours, 100)}, and at 75 about ${near(-A[75].yours, 100)}.
8. **Above break-even, every artist rises from their minimum toward their full fee at the same pace.** Everyone is at their full fee by about ${fullAt} tickets.
9. **Neither production partner shares the profit.** Kinetic Desert has agreed to $2,000 plus $15 for every ticket above 75. Project Seismic is on $3,000 plus $10 for every ticket above ${S.partners[ps].feeAbove}.
10. **${S0} tickets is home base.** That is a sell-out under the permit line: artists receive about ${near(A[S0].artistPaid, 100)}, you take about ${near(A[S0].yours, 10)}, and ${m(A[S0].fund)} is in the step fund.
11. **The step fund is not your profit.** Half of everything above break-even at the small size goes into it, along with any share that has nowhere to go. It pays for the step up. If you never step up, it is carried forward.
12. **Your take only ever rises with ticket sales.** The step past ${S0} tickets is sold as one block from a waitlist of ${W1}. Nobody, you included, is paid less after a step.
13. **Plan two sizes this year.** At a ${S1}-ticket sell-out artists receive their full ${m(fullTotal)}, you take about ${near(P.yours, 100)} and ${m(P.fund)} is in the step fund.
14. **The 500 size is a stretch.** Open its waitlist only if ${S1} has sold out by March 1. It needs a block of ${W2}, and a ${S2}-ticket sell-out pays you about ${near(A[S2].yours, 100)}.
15. **Stay on Stripe for the ticket site and list all-in prices.** The permit is a Temporary Use Permit, and tickets can go on sale before it is issued.
16. **Stagecoach is the same weekend (April 23–25) in Indio.** Porto-potties, generators and rental cars will be tight.

@@@ How the money scales
## How the money scales

### The rule

1. **Money in.** Tickets, cabins, car camping, and merch, meals and vendors.
2. **Mandatory hard costs come off first.** The venue fee, permits, insurance, medical, what the production partners are owed, the artist minimums, crew pay, cabin rental, the chef, groceries, site supplies and card fees. These are owed whatever sells.
3. **What is left is the surplus.** Three buckets share it: Artists, Event and you.
4. **Each size holds back a step fund.** At the small size, half of everything above the floors is held back from every bucket alike. Any share that has nowhere to go joins it, such as the artists' share once every artist is at their full fee. The fund pays for the step up. It is not your profit, and if the step is never taken it is carried forward.
5. **Your profit rises at its own share and never falls.** A larger size is sold as one block: buyers past a sell-out wait, uncharged, until enough are waiting that nobody is paid less after the step.
6. **Everyone is paid once, after the event, on the final ticket count.** Before the event only minimums and deposits go out.

### The three buckets

| Bucket | Share of the surplus | Floor |
|---|---|---|
| Artists, above their minimums | 55% | none: the minimums are already hard costs |
| Event: art, drinks, hospitality, marketing, reserve | 24% | $1,050 |
| **You** | **21%** | |

The Event floor is $500 of path lighting, $300 of artist hospitality and $250 of marketing. As a guide, split what is above the floor 9 parts art, 7 drinks, 4 reserve, 2 marketing and 2 hospitality.

Up to ${S0} tickets each bucket pays half its rate, because half of what is above the floors goes into the step fund.

### What each ticket count buys

${head('Tickets sold')}
${row('People on site', c => String(c.onSite))}
${row('Money in', c => c.revenue)}
${row('Mandatory hard costs', c => c.hard)}
${row('Surplus to share', c => c.surplus, true)}
${row('Artists above their minimums', c => c.budgetRows[0].budget)}
${row('Event', c => c.budgetRows[1].budget)}
${row('Step fund, not counted in your profit', c => c.fund > 0.5 ? c.fund : '')}
${row('Your profit', c => c.yours, true)}

From about ${fullAt} tickets every artist is at their full fee, and the artists' share goes into the step fund. At the 500 size there is no further step, so everything left is your profit. That is why your take climbs fastest there.

### Who gets what, at every size

For everyone but you these are payments, not profit after their own costs. Your column is profit or loss.

**Up to 199 on site, no permit**

${matrix([50, 75, 90, 100, 125, BE, S0], { [BE]: 'break-even', [S0]: 'sell-out' })}

**200 to 350 on site, with the permit and the medical team**

Tickets ${S0 + 1} to ${R1 - 1} are the waitlist. Nobody is charged and nothing changes for anyone until it is released.

${matrix([R1, 200, 225, 250, S1], { [R1]: 'released as a block', [S1]: 'sell-out' })}

**351 to 500 on site, the stretch: porto-potties and the second stage**

Tickets ${S1 + 1} to ${R2 - 1} are the waitlist.

${matrix([R2, MID2, S2], { [R2]: 'released as a block', [S2]: 'sell-out' }, true)}

- **You are the only one who can lose money, and only below ${BE} tickets.** Everyone else is paid at every level.
- **Nobody is paid less after a step up, you included.** The step is paid from the fund and the waitlist block.
- **The step fund is not paid to anyone.** It is spent on the step, or carried forward if the event stays at that size.
- **Camp** is the venue fee plus cabin rental, plus the $500 medical rep at the small size only.
- **Not shown:** the chef is paid $1,000 at every level, with a second chef at $1,000 above 350 on site.

### One pay table each

The Pay tables tab of the planner prints one page per person: tickets sold on the left, what they are paid on the right, and their terms in one sentence.

- **Give it to each artist and partner when they agree.** It is the whole deal on one page.
- **Nothing moves during the sale.** Only the final ticket count matters, and it is read off the table after the event.
- **Everyone is on the same shape of deal:** an amount owed whatever sells, then more for each ticket above a count, up to a cap.

### The crew

Each of the 12 paid crew (setup and strike, runners, gate) gets **$100 whatever sells, plus $1 for every ticket sold above ${S.crew[2].above}.** Both are hard costs, and the $100 is in the break-even.

${head('Tickets sold')}
${row('Each crew member', c => each(c))}
${row('All 12', c => c.crewPay + c.crewFees - chefs(c))}

I read your $1 a ticket as $1 to each crew member, counted from the break-even on. The rate and the ticket count it starts at are inputs on the Crew tab, one per role. The other readings:

| Reading | Break-even | Each at ${S0} | Each at ${S1} | Your take at ${S1} |
|---|---|---|---|---|
| **$1 each, on tickets above ${S.crew[2].above}** | **${BE} tickets** | **${m(each(A[S0]))}** | **${m(each(A[S1]))}** | **${m(A[S1].yours)}** |
| $1 each, on every ticket from the first | ${crewA.be} | ${m(each(crewA.all[S0]))} | ${m(each(crewA.all[S1]))} | ${m(crewA.all[S1].yours)} |
| $1 a ticket into one pot, split between the 12 | ${crewC.be} | ${m(each(crewC.all[S0]))} | ${m(each(crewC.all[S1]))} | ${m(crewC.all[S1].yours)} |

### The artists

**The minimums.** Every minimum is a hard cost, so it is in the break-even. Headliners are guaranteed the most, because their names are what sell the tickets.

| Slot | Minimum, share of the full fee |
|---|---|
| Headliners, 10:30 PM | ${S.minPct.head}% |
| Direct support, 9:00 PM | ${S.minPct.support}% |
| 7:30 PM | ${S.minPct.opener}% |
| Daytime | none: paid from break-even on |

These four percents are inputs on the Artists tab. Each slot's own minimum can still be typed over when a real quote comes in.

| Queue | Slot | Minimum | Deposit at 50% | Full fee | Minimums so far | Tickets it adds | Covered at |
|---|---|---|---|---|---|---|---|
${queueRows.join('\n')}

- **The queue is the order to book and announce in.**
- **"Tickets it adds" is what that guarantee costs in sales.** Friday's headliner has to bring ${coverAt(queue[0].x.min) - noMinBE} more buyers to pay for the guarantee. Near break-even, every ${near(perTicket, 5)} of minimum is one more ticket.
- **"Covered at" is the break-even as it builds.** With no minimums at all the event would cover itself at ${noMinBE} tickets. The last row is the break-even for the whole lineup.

Because most sales come late, the deposits go out before the tickets that cover them have sold. Treat the ${m(dep)} as money you put in up front and get back from sales.

**How much to guarantee the headliners.** This is the biggest dial on the break-even.

| Headliner minimum | Fri / Sat / Sun | Break-even | Your loss at 90 tickets | Waitlist past ${S0} | Artists at ${S0} | You at ${S0} |
|---|---|---|---|---|---|---|
${headRows.join('\n')}

${(() => { const b = run(headPct(1)).be; return b === null || b > S0 ? `A full guarantee would not be covered at the small size at all: break-even would be past its ${S0}-ticket sell-out.` : `A full guarantee leaves very little room at the small size: break-even would be only ${S0 - b} tickets under the ${S0}-ticket sell-out.`; })()}

**Making room for the guarantee.** Fri–Sun Presale and Tier 1 are now $10 higher, which is already in these figures. One more lever, not applied: guaranteeing the 7:30 slots 25% instead of half brings break-even to ${beOpener}.

**The rise.** Past break-even, 55% of the surplus lifts every open slot from its minimum toward its full fee. Each slot rises in proportion to how far it has to go, so they all arrive together. Up to ${S0} tickets the rise runs at half pace, because half goes into the step fund.

| Tickets sold | ${BE} | ${S0} | 200 | ${fullAt} and up |
|---|---|---|---|---|
| Friday 10:30 PM, ${m(S.slots[0][7].min)} minimum | ${m(A[BE].slotNow[0][7])} | ${m(A[S0].slotNow[0][7])} | ${m(A[200].slotNow[0][7])} | ${m(S.slots[0][7].target)} |
| Friday 9:00 PM, ${m(S.slots[0][6].min)} minimum | ${m(A[BE].slotNow[0][6])} | ${m(A[S0].slotNow[0][6])} | ${m(A[200].slotNow[0][6])} | ${m(S.slots[0][6].target)} |
| Friday 6:00 PM, daytime, no minimum | ${m(A[BE].slotNow[0][4])} | ${m(A[S0].slotNow[0][4])} | ${m(A[200].slotNow[0][4])} | ${m(S.slots[0][4].target)} |

**Daytime slots** have no minimum, so they cost nothing below break-even. They are paid from ${BE} tickets on, which suits friends who will play for a per-ticket payment after a ticket count.

**Agreeing a deal.** When an artist agrees, tick Agreed on their slot. They are paid the minimum, plus a rate per ticket on every ticket above a ticket count, up to the full fee. The planner fills in a rate that follows the plan. Change it to what you actually agreed.

**A flat deal.** Set the rate to 0 and the artist is paid the minimum and nothing more. What they would have risen by goes to the other slots first. Once those are at their full fees it goes into the step fund, and at the 500 size it is yours.

| Deal | Step fund at ${S1} | Waitlist for the 500 size | Your take at ${S2} |
|---|---|---|---|
| Every slot rising to its full fee | ${m(flat0.fund)} | ${flat0.block} buyers | ${m(flat0.top)} |
| Friday's headliner flat at ${m(S.slots[0][7].min)} | ${m(flat1.fund)} | ${flat1.block} | ${m(flat1.top)} |
| All three headliners flat at their minimums | ${m(flat3.fund)} | ${flat3.block} | ${m(flat3.top)} |

A flat deal does not move the break-even, because the minimum was already counted.

### The production partners' deals

Both partners are on the same shape as the artists and the crew: a guarantee, then a fee on tickets past a threshold, and no share of the profit.

| Partner | Guarantee | Fee | Comes in |
|---|---|---|---|
| Kinetic Desert, agreed | $2,000 | $15 for every ticket above 75 | From the first ticket |
| Project Seismic | $3,000 | $10 for every ticket above ${S.partners[ps].feeAbove} | Above 350 people on site |
| The Dome | none | $10 for every ticket, up to $2,000 | From the first ticket |

Kinetic Desert earns ${m(A[90].partnerRows[1].total)} at 90 tickets, ${m(A[S0].partnerRows[1].total)} at ${S0}, ${m(A[S1].partnerRows[1].total)} at ${S1} and ${m(A[S2].partnerRows[1].total)} at ${S2}. They do not share a loss, and you keep all of the profit.

### What sets the break-even

| Commitment | What it adds |
|---|---|
| Artist minimums for the nine night slots | ${m(minTotal)}, of which ${m(S.slots.reduce((a, d) => a + d[7].min, 0))} is the three headliners. Without any minimums break-even would be ${noMinBE} tickets |
| $100 for each of the 12 paid crew | $1,200, about ${R(1200 / perTicket)} tickets |
| Cabins rented as they sell | One 9-bed cabin sells per 45 tickets, up to six. You rent what sells plus two for artists and staff |
| Groceries and supplies budgeted per ticket | $1,350 plus $5.40 a ticket for groceries, $550 plus $2.20 a ticket for supplies. They grow with the event instead of jumping at each size |

### ${S0} is home base, and how a step up works

A sell-out under the permit line is ${S0} tickets. Ticket ${S0 + 1} brings in the permit, the medical team and 15 more Kinetic Desert guests, about ${near(step1, 100)} at once.

**Two things pay for that step, and neither is your profit.**

1. **The step fund.** Half of everything above the floors at the small size is held back, from every bucket alike. At ${S0} tickets it holds ${m(A[S0].fund)}.
2. **A waitlist block.** At ${S0} tickets the site sells out and switches to a waitlist. Buyers save a card and are not charged. When ${W1} are waiting they are all charged together and the event steps up at ${R1} tickets. If the list has not reached ${W1} by the deadline, nobody is charged and the event runs at ${S0}.

| | Past ${S0} tickets | Past ${S1} tickets, the stretch |
|---|---|---|
| New cost at the step | about ${near(step1, 100)} | about ${near(step2, 100)} |
| Step fund at the sell-out | ${m(A[S0].fund)} | ${m(A[S1].fund)} |
| Waitlist needed | ${W1} buyers | ${W2} buyers |
| Sold together at | ${R1} tickets | ${R2} tickets |
| Artists before and after | ${m(A[S0].artistPaid)} → ${m(A[R1].artistPaid)} | ${m(A[S1].artistPaid)} → ${m(A[R2].artistPaid)} |
| Your take before and after | ${m(A[S0].yours)} → ${m(A[R1].yours)} | ${m(A[S1].yours)} → ${m(A[R2].yours)} |

**Your take never falls.** It rises at its own share with every ticket, at the same pace as the artists and the Event bucket, and a step is only taken when it leaves you at least where you were.

**If the event stays at ${S0} or ${S1},** the fund is not spent. It is carried forward: to the next event, or to whatever you decide at settlement. It is still money you control. The plan just does not count it as your take, so that your take cannot make a bigger event look worse.

**The fund size is your dial.** A bigger fund means a smaller waitlist block and a slower rise at the small size.

| Fund at the small size | In the fund at ${S0} | Artists at ${S0} | You at ${S0} | Waitlist needed |
|---|---|---|---|---|
${fundRows.join('\n')}

After the step everyone rises at the full rate: artists are at ${m(A[200].artistPaid)} at 200 tickets and you are at ${m(A[200].yours)}.

**The 500 size is a stretch.** Open its waitlist only if ${S1} has sold out by March 1. The step is funded by the artists' share once every artist is at their full fee, which leaves ${m(A[S1].fund)} in the fund at a sell-out and a block of ${W2}. A fund at the middle size shrinks the block and slows the artists:

| Fund at the middle size | In the fund at ${S1} | Artists at ${S1} | You at ${S1} | Waitlist needed |
|---|---|---|---|---|
${midRows.join('\n')}

**Two things still not done that would shrink the blocks:**

- **Get the real permit fee.** I left it at your $3,000. At the county's listed $2,108 the blocks are ${permit.rel[1] - S0} and ${permit.rel[2] - S1} buyers.
- **Add $10 to every ticket.** The blocks are ${ten.rel[1] - ten.mx[0]} and ${ten.rel[2] - ten.mx[1]}, and break-even is ${ten.be}.

**On the ticket site.** Stripe can save a card without charging it and charge it later. My understanding is that there is no fee until the charge. A few saved cards will be declined when charged, so release when the list is a few over the count.

**Set the waitlist deadline at March 15.** County Fire asks for its application 30 days ahead, which is March 24, and the permit and the medical team need lead time with Stagecoach on the same weekend. Move it later if the county's turnaround and your vendors allow.

### Working with it

- **Enter tickets sold after every sales push.** The top bar shows how many tickets still stand between you and break-even, and the queue shows which minimums sales have covered.
- **Book in queue order.** Friday's headliner first, so the name is on the poster while the rest is confirmed.
- **Have the deposit money ready:** ${m(queue[0].x.min * S.depositPct / 100)} for Friday's headliner and ${m(dep)} for all nine. The permit is not an early cost. It is paid close to the event, and only if you go past ${S0} tickets.
- **Push for flat deals at the top.** Every headliner on a flat minimum is money that stays with the other artists and the step fund.
- **Hand out the pay table when a deal is agreed.**
- **Commit the Event bucket late**, from the final figures.

@@@ What I assumed
## What I assumed

Each of these is an input in the planner.

| Assumption | Value used | Why it matters |
|---|---|---|
| The three buckets | 55% artists, 24% event, which leaves 21% as your profit | My split |
| Headliner minimums | 75% of the full fee: ${S.slots.map(d => m(d[7].min)).join(', ')} | My placeholder until quotes come in. At half the fee break-even is ${be50}, at the full fee ${run(headPct(1)).be} |
| Other artist minimums | Half the full fee for the 9:00 and 7:30 slots, none for daytime | All nine night-slot minimums are hard costs |
| Artist deposits | 50% of the minimum, paid before the artist is announced | The usual booking term. It is cash you need before the first lineup |
| Kinetic Desert's fee | $15 for every ticket above 75, on top of the $2,000 | Agreed with Kinetic Desert |
| Crew pay | $100 each for the 12 paid crew, plus $1 each for every ticket above ${S.crew[2].above} | The $100 is in the break-even. Counting the $1 from the first ticket would put break-even at ${crewA.be} |
| Step fund | Half of everything above the floors at the small size, plus any share with nowhere to go. Not counted as your profit, and carried forward if the step is never taken | Your choice. A bigger fund means a smaller waitlist block and a slower rise at the small size |
| People without a ticket | ${unt(0)} up to 199 on site, ${unt(1)} up to 350, ${unt(2)} up to 500 | Ten fewer than before: I took them from the artists' guest list. Each place is one more ticket you can sell. Venue reps never count |
| Groceries and supplies | $1,350 plus $5.40 a ticket, and $550 plus $2.20 a ticket | My estimate, set so the totals match the old figures at a sell-out |
| Ticket prices | Fri–Sun ${S.tiers.full.map(x => m(x.price)).join(' / ')}. Sat–Sun ${S.tiers.sat.map(x => m(x.price)).join(' / ')}. Sunday ${S.tiers.sun.map(x => m(x.price)).join(' / ')} | Untested |
| Cabin sales | One cabin per 45 tickets, up to six | My guess at how cabins track attendance |
| Card fees | 2.9% + 30¢, all sales by card | About 3% of online sales |
| Permits | $3,000 at 200 or more on site | Your ballpark. The one county figure I found is $2,108 |
| Extra cost above 350 | $2,500 porto-potties, $1,000 second chef, $2,000 more groceries, $400 supplies, $3,000 for Project Seismic | The grocery and porto-potty figures are guesses |
| Car camping demand | One pass per five tickets | 95 of the 120 spots are for sale after 25 crew passes |
| Ticket mix | ${S.mixFull}% Fri–Sun, ${S.mixSat}% Sat–Sun, ${100 - S.mixFull - S.mixSat}% Sunday only | Your expected spread. It drives the average ticket price and the venue fee. At 65 / 25 / 10 break-even would be ${run(s => { s.mixFull = 65; s.mixSat = 25; }).be} |
| Merch, meal plan and vendor income | $10 per ticket | Untested. Without it and with half the car passes, break-even rises from ${BE} to ${pess} |

I could not verify current booking fees for Pando!, Chmura, Huck.Jorris or Ferrofluid.

@@@ Capacity
## Capacity

Every limit is counted on people on site. Guest lists grow as the event does, so the number of tickets you can sell steps at each stage.

| People on site | Without a ticket | Tickets that fit | Opens at | What switches on |
|---|---|---|---|---|
| Up to 199 | ${unt(0)} | ${S0} | ${BE} tickets cover it | The base plan, with the venue's medical rep and your own kit |
| 200 to 350 | ${unt(1)} | ${S1} | ${R1} tickets, as a block of ${W1} | Permits, the medical team, 15 Kinetic Desert guests |
| 351 to 500, the stretch | ${unt(2)} | ${S2} | ${R2} tickets, as a block of ${W2} | Porto-potties, Project Seismic and their 30 places, 10 more Kinetic Desert guests, a second chef, food for partners and all artists |

Ten places came off the artists' guest list, which is why each size now fits ten more tickets.

### The 500 size and Project Seismic

Treat this as a stretch for year one: open its waitlist only if ${S1} has sold out by March 1.

The main stage moves to a larger area with Kinetic Desert's production, and The Bowl becomes a side stage run by Project Seismic with their own artists. They need about $3,000 for rentals.

Their deal: **$3,000 guaranteed, plus $10 for every ticket sold above ${S.partners[ps].feeAbove}, and no share of the profit.**

| Deal | They earn at ${PSA} / ${PSB} / ${S2} tickets | You at ${S2} | Released at |
|---|---|---|---|
| $3,000 flat | ${m(psFlat.a)} / ${m(psFlat.b)} / ${m(psFlat.c)} | ${m(psFlat.you)} | ${psFlat.rel} tickets |
| **$3,000 plus $10 a ticket above ${S.partners[ps].feeAbove}** | **${m(psRec.a)} / ${m(psRec.b)} / ${m(psRec.c)}** | **${m(psRec.you)}** | **${psRec.rel}** |
| $3,000 plus 10% of profit | ${m(psShare.a)} / ${m(psShare.b)} / ${m(psShare.c)} | ${m(psShare.you)} | ${psShare.rel} |

- **Their rentals are covered for certain.**
- **Their upside is tied to the tickets the bigger event adds**, which is the thing they are there to help sell.
- **There is no loss-sharing to argue about**, because they have no share.

Their guest list is 30. Cutting it to 20 would free ten tickets and add about ${near(psGuest.you - psRec.you, 100)} to your take at a sell-out.

Your take at the 500 size is ${m(A[R2].yours)} at ${R2} tickets, ${m(A[MID2].yours)} at ${MID2} and ${m(A[S2].yours)} at ${S2}.

The 500 size costs about ${near(step2, 100)} more at the step, and ${unt(2) - unt(1)} more places that cannot be sold. Afters still hold 145 people indoors, so at 500 on site that needs a third space or a late slot on one of the two stages.

@@@ Budget
## Budget

The plan at a ${S1}-ticket sell-out, with every artist at their full fee.

| Money in | |
|---|---|
| Tickets, ${S1} at a ${m(P.avgTicket)} average | ${m(P.tickets)} |
| Cabins, ${P.cabinsSold} at ${m(S.addons.pCabin)} | ${m(P.cabinRev)} |
| Car camping, ${R(P.carSold)} passes at ${m(S.addons.pCar)} | ${m(P.car)} |
| Merch, meal plan, vendors | ${m(P.other)} |
| **Total in** | **${m(P.revenue)}** |

| Mandatory hard costs | |
|---|---|
${hardLines.map(x => `| ${x[0]} | ${m(x[1])} |`).join('\n')}
| **Total hard costs** | **${m(P.hard)}** |

**Surplus to share: ${m(P.surplus)}.**

| Bucket | Share | At ${S1} tickets |
|---|---|---|
| Artists, above their minimums | 55% | ${m(P.budgetRows[0].budget)}, which takes every slot to its full fee |
| Event: art, drinks, hospitality, marketing, reserve | 24% | ${m(P.budgetRows[1].budget)} |
| **Total** | | **${m(P.spend)}** |

**Step fund: ${m(P.fund)}.** This is the part of the artists' share left over once every artist is at their full fee. It pays for the step to the 500 size, or is carried forward.

**Profit: ${m(P.yours)}, all yours.** Artists receive ${m(fullTotal)} in all.

A guide to the Event bucket at this size: about ${near(evShare(P, 'art'), 100)} for art, projection and lighting, ${near(evShare(P, 'drinks'), 100)} for drinks, ${near(evShare(P, 'reserve'), 100)} in reserve, ${near(evShare(P, 'marketing'), 50)} for marketing and ${near(evShare(P, 'hosp'), 50)} for artist hospitality.

### Moving the artists' share

A lower share slows the rise and leaves you more in the middle.

| Artists' share | Artists in all at ${S0} | Your take at ${S0} | Your take at 200 | Your take at ${S1} | Everyone at full fee from |
|---|---|---|---|---|---|
${shareRows.join('\n')}

@@@ Questions that would change this plan
## Questions that would change this plan

1. **What will the headliners actually ask to be guaranteed?** I used 75% of the fee. Near break-even, every ${near(perTicket, 5)} of guarantee is one more ticket to sell.
2. **Which ten places come off the list of people without a ticket?** I took them from the artists' guest list: one guest for each artist playing 7:30 or later, none for daytime.
3. **Is the crew's $1 a ticket paid to each crew member, and from which ticket?** I counted it for each of the 12, on tickets above ${S.crew[2].above}. From the first ticket, break-even is ${crewA.be}.
4. **What is the real permit fee, and how long does the county take to issue it?** At the listed $2,108 the waitlist block is ${permit.rel[1] - S0} instead of ${W1}. The turnaround sets how late the waitlist can run.
5. **Will headliners take a flat fee?** It does not change break-even, and above it the money stays with the other artists and the step fund.
6. **Does The Dome have a minimum?** It earns $900 at 90 tickets for travel and setup.
7. **Does the venue have a minimum rental** below some ticket count?
8. **Whether County Fire and a structure permit are separate applications.**
9. **Who the drinks are for, and whether any are alcoholic.**
`;
fs.writeFileSync(path.join(OUT, 'plan-sections.md'), out);
fs.writeFileSync(path.join(OUT, 'plan-figures.json'), JSON.stringify(nums, null, 1));
console.log('plan sections computed: break-even', nums.BE, '| sell-outs', nums.S0, nums.S1, nums.S2);
