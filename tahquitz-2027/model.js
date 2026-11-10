// Pure planning model, shared verbatim by the page and by the node check.
// The event grows through stages, each a limit on people on site. Partners, crew roles, other people and
// costs each name the stage they start at, so guest lists and costs switch on as the event scales.
const SCHEMA = 3;
const DEFAULTS = {
  v: SCHEMA,
  stages: [
    { name: 'Under the permit line', limit: 199 },
    { name: 'Camp facilities', limit: 350 },
    { name: 'With porto-potties and a second stage', limit: 500 },
  ],
  paid: 275, mixFull: 65, mixSat: 25,
  tiers: {
    full: [{ name: 'Presale', price: 169, qty: 50 }, { name: 'Tier 1', price: 189, qty: 60 }, { name: 'Tier 2', price: 209, qty: 50 }, { name: 'Final', price: 229, qty: 0 }],
    sat: [{ name: 'Tier 1', price: 139, qty: 20 }, { name: 'Tier 2', price: 155, qty: 30 }, { name: 'Final', price: 169, qty: 0 }],
    sun: [{ name: 'Tier 1', price: 79, qty: 15 }, { name: 'Final', price: 85, qty: 0 }],
  },
  addons: { carRate: 20, carSpots: 120, pCar: 50, cabinsSold: 6, pCabin: 850, otherPer: 10 },
  proc: { pct: 2.9, fixed: 0.3, bankShare: 0, bankPct: 0.8 },
  contingencyPct: 5,
  // Friday carries the most, then Saturday, then Sunday, to pull buyers toward the longer tickets.
  artists: [
    [75, 100, 200, 300, 500, 1000, 2000, 3000],
    [75, 100, 150, 250, 400, 750, 1500, 3000],
    [75, 100, 150, 200, 300, 600, 1250, 2250],
  ],
  // share is in parts: 2 / 2 / 1 means 40% / 40% / 20% among the partners active at that stage.
  // people is the number on site at each stage, crew and guest list together.
  partners: [
    { name: 'You', role: 'Organiser', you: true, from: 0, guarantee: 0, perTicket: 0, cap: 0, share: 2, sharesLoss: true, people: [1, 1, 1] },
    { name: 'Kinetic Desert', role: 'Production for The Bowl, the K Lodge and the main stage', from: 0, guarantee: 2000, perTicket: 0, cap: 0, share: 2, sharesLoss: true, people: [4, 19, 29] },
    { name: 'The Dome', role: '24-foot dome with sound, decks, travel, setup and takedown', from: 0, guarantee: 0, perTicket: 10, cap: 2000, share: 0, sharesLoss: false, people: [2, 2, 2] },
    { name: 'Project Seismic', role: 'Side stage at The Bowl with their own artists', from: 2, guarantee: 2000, perTicket: 0, cap: 0, share: 1, sharesLoss: false, people: [0, 0, 30] },
  ],
  // shifts is what each person works, need is how many shifts the job takes. Zero need means not shift-based.
  crew: [
    { name: 'Chef', people: 1, pay: 1000, shifts: 0, need: 0, from: 0 },
    { name: 'Second chef', people: 1, pay: 1000, shifts: 0, need: 0, from: 2 },
    { name: 'Setup and strike', people: 5, pay: 100, shifts: 3, need: 16, from: 0 },
    { name: 'Runners: airport and errands', people: 3, pay: 100, shifts: 3, need: 10, from: 0 },
    { name: 'Gate', people: 4, pay: 100, shifts: 3, need: 12, from: 0 },
    { name: 'Second gate and parking', people: 3, pay: 0, shifts: 3, need: 8, from: 0 },
    { name: 'Artist hospitality and check-in', people: 3, pay: 0, shifts: 3, need: 9, from: 0 },
    { name: 'Informal security: K Lodge door and night rounds', people: 2, pay: 0, shifts: 3, need: 6, from: 0 },
    { name: 'Kitchen help', people: 2, pay: 0, shifts: 3, need: 6, from: 0 },
    { name: 'Site upkeep: trash, bathrooms, firewood', people: 2, pay: 0, shifts: 3, need: 6, from: 0 },
  ],
  others: [
    { name: 'Artists and their guests, at the peak', people: 26, from: 0 },
    { name: 'Medical team', people: 2, from: 0 },
  ],
  // basis: flat, ticket (per paid ticket), ticketday (per ticket per day), person (per person on site)
  costs: [
    { name: 'Venue fee', amount: 10, basis: 'ticketday', from: 0 },
    { name: 'Cabin rental, 8 at $250', amount: 2000, basis: 'flat', from: 0 },
    { name: 'Permits', amount: 3000, basis: 'flat', from: 1 },
    { name: 'Porto-potties', amount: 2500, basis: 'flat', from: 2 },
    { name: 'Insurance', amount: 750, basis: 'flat', from: 0 },
    { name: 'Medical team, 3 days at $600', amount: 1800, basis: 'flat', from: 0 },
    { name: 'Groceries', amount: 2800, basis: 'flat', from: 0 },
    { name: 'Extra groceries to feed partners and all artists', amount: 2500, basis: 'flat', from: 2 },
    { name: 'Drinks for everyone', amount: 6, basis: 'person', from: 0 },
    { name: 'Art, projection and lighting', amount: 3000, basis: 'flat', from: 0 },
    { name: 'Marketing and design', amount: 750, basis: 'flat', from: 0 },
    { name: 'Site supplies', amount: 1200, basis: 'flat', from: 0 },
    { name: 'Extra site supplies', amount: 800, basis: 'flat', from: 2 },
    { name: 'Artist hospitality and airport runs', amount: 600, basis: 'flat', from: 0 },
  ],
  timeline: [
    { date: '2026-11-13', task: 'Put the five permit questions to the county planner', owner: 'You', done: false },
    { date: '2026-11-20', task: 'Ask target artists for quotes', owner: 'You', done: false },
    { date: '2026-11-30', task: 'Kinetic Desert and Project Seismic deals in writing', owner: 'You', done: false },
    { date: '2026-12-01', task: 'Ticket site live. Alumni presale opens', owner: 'You', done: false },
    { date: '2026-12-11', task: 'Submit the Temporary Use Permit application', owner: 'You', done: false },
    { date: '2026-12-15', task: 'Presale closes. Set the artist budget from the result', owner: 'You', done: false },
    { date: '2026-12-20', task: 'Send artist offers and pay deposits', owner: 'You', done: false },
    { date: '2027-01-12', task: 'First lineup. Tier 1 and Sat–Sun tickets on sale', owner: 'You', done: false },
    { date: '2027-01-22', task: 'Last day to file the permit', owner: 'You', done: false },
    { date: '2027-02-01', task: 'Decide the Sunday closer', owner: 'You', done: false },
    { date: '2027-02-09', task: 'Full lineup. Art grants and merch pre-order open', owner: 'You', done: false },
    { date: '2027-03-01', task: 'Decide on a headliner upgrade', owner: 'You', done: false },
    { date: '2027-03-15', task: 'Decide on the 500 unlock. Order porto-potties', owner: 'You and Kinetic Desert', done: false },
    { date: '2027-03-23', task: 'Set times out. Sunday tickets on sale. Fire permit application in', owner: 'You', done: false },
    { date: '2027-04-09', task: 'Final ticket tier. Grocery order. Shift schedule out', owner: 'You', done: false },
    { date: '2027-04-21', task: 'Load-in begins', owner: 'Kinetic Desert', done: false },
    { date: '2027-04-23', task: 'Gates open at 10:00 AM', owner: 'Gate crew', done: false },
    { date: '2027-04-28', task: 'Production out by noon. Walk-through with the camp', owner: 'You', done: false },
  ],
};
const sum = a => a.reduce((x, y) => x + y, 0);
const n0 = v => Number(v) || 0;
const on = (row, level) => n0(row.from) <= level;
function fillTiers(tiers, n) {
  let left = n, rev = 0;
  const sold = tiers.map((t, i) => {
    const q = i === tiers.length - 1 ? left : Math.min(left, n0(t.qty));
    rev += q * n0(t.price); left -= q;
    return q;
  });
  return { rev, sold, avg: n ? rev / n : 0 };
}
function headcount(s, level) {
  const partners = sum(s.partners.map(p => n0(p.people[Math.min(level, p.people.length - 1)])));
  const crew = sum(s.crew.map(c => on(c, level) ? n0(c.people) : 0));
  const others = sum(s.others.map(o => on(o, level) ? n0(o.people) : 0));
  return { partners, crew, others, total: partners + crew + others };
}
// The stage the event is at for a given number of paid tickets, and who is on site.
function people(s, paid) {
  const last = s.stages.length - 1;
  let level = 0;
  while (level < last && paid + headcount(s, level).total > n0(s.stages[level].limit)) level++;
  const unt = headcount(s, level).total;
  return { level, unt, onSite: paid + unt, over: paid + unt > n0(s.stages[last].limit) };
}
// The most paid tickets that fit at a stage (the last stage when none is given).
function maxPaid(s, level) {
  const L = level === undefined ? s.stages.length - 1 : level;
  const limit = n0(s.stages[L].limit);
  for (let n = limit; n >= 0; n--) { const p = people(s, n); if (p.level <= L && p.onSite <= limit) return n; }
  return 0;
}
// The first paid ticket at which a stage begins.
function stageStart(s, level) { return level <= 0 ? 0 : maxPaid(s, level - 1) + 1; }
function compute(s) {
  const paid = n0(s.paid);
  const nFull = paid * s.mixFull / 100, nSat = paid * s.mixSat / 100, nSun = Math.max(0, paid - nFull - nSat);
  const tFull = fillTiers(s.tiers.full, nFull), tSat = fillTiers(s.tiers.sat, nSat), tSun = fillTiers(s.tiers.sun, nSun);
  const tickets = tFull.rev + tSat.rev + tSun.rev;
  const { level, unt, onSite, over } = people(s, paid);
  const a = s.addons;
  const crewHead = headcount(s, level).crew;
  const carSold = Math.min(Math.max(0, n0(a.carSpots) - crewHead), paid * n0(a.carRate) / 100);
  const car = carSold * n0(a.pCar);
  const cabinRev = n0(a.cabinsSold) * n0(a.pCabin);
  const other = paid * n0(a.otherPer);
  const revenue = tickets + car + cabinRev + other;
  const ticketDays = nFull * 3 + nSat * 2 + nSun;
  const artistFees = sum(s.artists.flat().map(n0));
  const partnerRows = s.partners.map(p => {
    const active = on(p, level);
    const guar = active ? n0(p.guarantee) : 0;
    const raw = active ? n0(p.perTicket) * paid : 0;
    return { active, guar, fee: n0(p.cap) > 0 ? Math.min(raw, n0(p.cap)) : raw };
  });
  const crewRows = s.crew.map(c => ({ active: on(c, level), pay: on(c, level) ? n0(c.people) * n0(c.pay) : 0 }));
  const costRows = s.costs.map(c => {
    const active = on(c, level), amt = n0(c.amount);
    const variable = c.basis === 'ticket' || c.basis === 'ticketday';
    const value = !active ? 0 : c.basis === 'ticket' ? amt * paid : c.basis === 'ticketday' ? amt * ticketDays : c.basis === 'person' ? amt * onSite : amt;
    return { active, variable, value };
  });
  const guarantees = sum(partnerRows.map(p => p.guar)), partnerFees = sum(partnerRows.map(p => p.fee));
  const crewPay = sum(crewRows.map(c => c.pay));
  const fixedCosts = sum(costRows.map(c => c.variable ? 0 : c.value)), variableCosts = sum(costRows.map(c => c.variable ? c.value : 0));
  // Contingency covers everything that does not move ticket by ticket.
  const fixedBase = artistFees + guarantees + crewPay + fixedCosts;
  const contingency = fixedBase * n0(s.contingencyPct) / 100;
  const online = tickets + car + cabinRev;
  const bank = Math.min(100, n0(s.proc.bankShare)) / 100;
  const processing = online * ((1 - bank) * n0(s.proc.pct) + bank * n0(s.proc.bankPct)) / 100 + paid * (1 - bank) * n0(s.proc.fixed);
  const costs = fixedBase + contingency + partnerFees + variableCosts + processing;
  const profit = revenue - costs;
  // A profit is split by parts among active partners. A loss is split among those who agreed to share one.
  const inPool = (p, i) => partnerRows[i].active && n0(p.share) > 0 && (profit >= 0 || p.sharesLoss);
  const parts = sum(s.partners.map((p, i) => inPool(p, i) ? n0(p.share) : 0));
  const youIdx = s.partners.findIndex(p => p.you);
  s.partners.forEach((p, i) => {
    const r = partnerRows[i];
    r.pct = inPool(p, i) && parts ? n0(p.share) / parts * 100 : 0;
    r.shareAmt = profit * r.pct / 100;
    if (!parts && i === youIdx) r.shareAmt = profit;
    r.total = r.guar + r.fee + r.shareAmt;
  });
  return { paid, nFull, nSat, nSun, tFull, tSat, tSun, tickets, carSold, car, cabinRev, other, revenue, ticketDays,
    level, unt, onSite, over, crewHead, artistFees, partnerRows, crewRows, costRows, guarantees, partnerFees, crewPay,
    fixedCosts, variableCosts, contingency, processing, online, costs, profit,
    yours: youIdx >= 0 ? partnerRows[youIdx].shareAmt : profit, avgTicket: paid ? tickets / paid : 0 };
}
function breakEven(s) {
  const max = maxPaid(s);
  for (let n = 0; n <= max; n++) if (compute({ ...s, paid: n }).profit >= 0) return n;
  return null;
}
// Each partner's share of a profit at a stage, in percent.
function sharePct(s, level) {
  const parts = sum(s.partners.map(p => on(p, level) ? n0(p.share) : 0));
  return s.partners.map(p => on(p, level) && parts ? n0(p.share) / parts * 100 : 0);
}
// Scale a fee grid to a new total, keeping its shape. Slots round to $25 and the remainder goes to the biggest slots.
function scaleFees(shape, target) {
  const flat = shape.flat().map(n0);
  const total = sum(flat);
  if (!total) return shape.map(d => d.slice());
  const out = flat.map(v => Math.round(v * target / total / 25) * 25);
  let diff = Math.round((target - sum(out)) / 25);
  const order = flat.map((v, i) => i).sort((x, y) => flat[y] - flat[x]);
  for (let i = 0; diff !== 0 && i < 10000; i++) {
    const idx = order[i % order.length], step = diff > 0 ? 25 : -25;
    if (out[idx] + step >= 0) { out[idx] += step; diff -= Math.sign(diff); }
  }
  const per = shape[0].length;
  return shape.map((d, j) => out.slice(j * per, j * per + per));
}
if (typeof module !== 'undefined') module.exports = { SCHEMA, DEFAULTS, compute, breakEven, people, maxPaid, stageStart, headcount, sharePct, scaleFees };
