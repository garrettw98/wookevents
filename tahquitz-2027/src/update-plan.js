// Recomputes the figures in PLAN.md from ../model.js.
// Usage: node src/update-plan.js
// 1. plan-figures.js writes six whole sections (The short version, How the money scales, What I assumed, Capacity,
//    Budget, Questions that would change this plan). Their wording lives in plan-figures.js; edit it there, not in PLAN.md.
// 2. A few lines elsewhere carry figures too. They are rewritten below, found by how each line starts.
// Every other line of PLAN.md is left as it is.
const fs = require('fs');
const path = require('path');
require('./plan-figures.js');
const planPath = path.join(__dirname, '..', 'PLAN.md');
const OUT = path.join(__dirname, '.out');
const N = JSON.parse(fs.readFileSync(path.join(OUT, 'plan-figures.json'), 'utf8'));
const sec = fs.readFileSync(path.join(OUT, 'plan-sections.md'), 'utf8');
const m = n => (n < 0 ? '−' : '') + '$' + Math.abs(Math.round(n)).toLocaleString('en-US');
const near = (n, step) => m(Math.round(n / step) * step);

const repl = {};
for (const chunk of sec.split(/^@@@ /m).slice(1)) { const nl = chunk.indexOf('\n'); repl[chunk.slice(0, nl).trim()] = chunk.slice(nl + 1).trim() + '\n'; }
const seen = new Set();
let t = fs.readFileSync(planPath, 'utf8').split(/^(?=## )/m).map(p => {
  const mm = p.match(/^## (.+)\n/);
  if (mm && repl[mm[1].trim()]) { seen.add(mm[1].trim()); return repl[mm[1].trim()] + '\n'; }
  return p;
}).join('');
for (const k of Object.keys(repl)) if (!seen.has(k)) throw new Error('PLAN.md has no section called: ' + k);

const re = (r, b) => { if (!r.test(t)) throw new Error('no match in PLAN.md: ' + r); t = t.replace(r, () => b); };
const repLine = (startsWith, b) => { const lines = t.split('\n'); const hits = lines.map((l, i) => l.startsWith(startsWith) ? i : -1).filter(i => i >= 0); if (hits.length !== 1) throw new Error(hits.length + ' lines in PLAN.md start with: ' + startsWith.slice(0, 60)); lines[hits[0]] = b; t = lines.join('\n'); };
const T = N.tiers, p = (k, i) => '$' + T[k][i].price;
re(/Total fees at a \d+-ticket sell-out are about \$[\d,]+\./, `Total fees at a ${N.S1}-ticket sell-out are about ${near(N.proc, 100)}.`);
re(/If 30% of sales went by bank, fees would drop by about \$[\d,]+\./, `If 30% of sales went by bank, fees would drop by about ${near(N.bankSave, 10)}.`);
re(/stop sales at \d+, \d+ or \d+ depending/, `stop sales at ${N.S0}, ${N.S1} or ${N.S2} depending`);
re(/Averages are at a \d+-ticket sell-out\./, `Averages are at a ${N.S1}-ticket sell-out.`);
repLine('| Fri–Sun | ', `| Fri–Sun | ${p('full', 0)} × ${T.full[0].qty} | ${p('full', 1)} × ${T.full[1].qty} | ${p('full', 2)} × ${T.full[2].qty} | ${p('full', 3)} × the rest | ${m(N.tFull)} |`);
repLine('| Sat–Sun | none | ', `| Sat–Sun | none | ${p('sat', 0)} × ${T.sat[0].qty} | ${p('sat', 1)} × ${T.sat[1].qty} | ${p('sat', 2)} × the rest | ${m(N.tSat)} |`);
repLine('| Sunday only | none | none | ', `| Sunday only | none | none | ${p('sun', 0)} × ${T.sun[0].qty} | ${p('sun', 1)} × the rest | ${m(N.tSun)} |`);
repLine('- Early tickets are the cheap ones,', `- Early tickets are the cheap ones, so the average is about ${m(N.avg90)} at 90 tickets and ${m(N.avgS1)} at ${N.S1}.`);
re(/reaches this total at about \d+ tickets, where every artist is at their full fee\./, `reaches this total at about ${N.fullAt} tickets, where every artist is at their full fee.`);
repLine('**Pay.** Each of the 12 paid crew', `**Pay.** Each of the 12 paid crew gets $100 whatever sells, which is part of the break-even, plus $1 for every ticket sold above ${N.BE}. That is ${m(N.each[0])} each at ${N.S0} tickets, ${m(N.each[1])} at 200, ${m(N.each[2])} at a ${N.S1}-ticket sell-out and ${m(N.each[3])} at ${N.S2}. Every crew member gets a ticket and a car pass at any size.`);
repLine('**Drinks.**', `**Drinks.** Bulk seltzers and other drinks for everyone come out of the Event bucket. At 7 parts in 24 that is about ${near(N.drinks[0], 100)} at 200 tickets, ${near(N.drinks[1], 100)} at a ${N.S1}-ticket sell-out and ${near(N.drinks[2], 100)} at ${N.S2}. Buy late, from the final figure. I assumed this means everyone on site, at every size, and non-alcoholic. If the drinks are hard seltzers for ticket buyers, check the licensing first: my understanding is that California can treat alcohol included with paid admission as a sale.`);
repLine('This comes out of the Event bucket.', `This comes out of the Event bucket. At 9 parts in 24, with the $500 floor for path lighting, it is about ${near(N.art[0], 100)} at 200 tickets, ${near(N.art[1], 100)} at a ${N.S1}-ticket sell-out and ${near(N.art[2], 100)} at ${N.S2}. The split below is for $3,000, in the order to spend it as the money comes in.`);
fs.writeFileSync(planPath, t);
console.log('PLAN.md updated:', [...seen].join(' | '));
