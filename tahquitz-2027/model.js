// Pure planning model, shared verbatim by the page and by the node check.
//
// How it scales:
//  1. The event grows through stages, each a limit on people on site. Partners, crew roles, groups and
//     hard costs each name the stage they start at (and optionally stop at).
//  2. Mandatory hard costs come off the top. What sales leave over is the surplus.
//  3. Every other budget is a share of that surplus, so it grows with each ticket sold. A budget can have
//     a floor (the least the event can run on) and a cap, and it never drops below what is already committed.
//  4. Artist slots share the artist budget in proportion to their target fees until a slot is locked at a price.
//  5. Whatever share is not given to a budget is the partners' profit, split by parts.
const SCHEMA = 4;
const T = (target) => ({ target, name: '', locked: false, fee: 0 });
const DEFAULTS = {
  v: SCHEMA,
  stages: [
    { name: 'Under the permit line', limit: 199 },
    { name: 'Camp facilities', limit: 350 },
    { name: 'With porto-potties and a second stage', limit: 500 },
  ],
  sold: 0, paid: 275, mixFull: 65, mixSat: 25,
  tiers: {
    full: [{ name: 'Presale', price: 169, qty: 50 }, { name: 'Tier 1', price: 189, qty: 60 }, { name: 'Tier 2', price: 209, qty: 50 }, { name: 'Final', price: 229, qty: 0 }],
    sat: [{ name: 'Tier 1', price: 139, qty: 20 }, { name: 'Tier 2', price: 155, qty: 30 }, { name: 'Final', price: 169, qty: 0 }],
    sun: [{ name: 'Tier 1', price: 79, qty: 15 }, { name: 'Final', price: 85, qty: 0 }],
  },
  addons: { carRate: 20, carSpots: 120, pCar: 50, cabinsSold: 6, pCabin: 850, otherPer: 10 },
  proc: { pct: 2.9, fixed: 0.3, bankShare: 0, bankPct: 0.8 },
  // Target fees set the shape of the lineup: Friday carries the most, then Saturday, then Sunday.
  // Each open slot's budget is its target scaled to whatever the artist budget currently is.
  slots: [
    [75, 100, 200, 300, 500, 1000, 2000, 3000].map(T),
    [75, 100, 150, 250, 400, 750, 1500, 3000].map(T),
    [75, 100, 150, 200, 300, 600, 1250, 2250].map(T),
  ],
  // share is a percent of the surplus left after floors. committed is money already promised on that line.
  budgets: [
    { id: 'artists', name: 'Artists', share: 58, floor: 1800, cap: 0, committed: 0 },
    { name: 'Art, projection and lighting', share: 9.5, floor: 500, cap: 0, committed: 0 },
    { name: 'Drinks for everyone', share: 7.5, floor: 0, cap: 0, committed: 0 },
    { name: 'Marketing and design', share: 2.5, floor: 250, cap: 0, committed: 0 },
    { name: 'Artist hospitality and airport runs', share: 2, floor: 300, cap: 0, committed: 0 },
    { name: 'Reserve for surprises', share: 5.5, floor: 0, cap: 0, committed: 0 },
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
    { name: 'Medical team', people: 2, from: 1 },
  ],
  // Mandatory hard costs only. basis: flat, ticket (per paid ticket), ticketday (per ticket per day), person (per person on site).
  // until is the last stage a row applies at; leave it out for a row that never stops.
  costs: [
    { name: 'Venue fee', amount: 10, basis: 'ticketday', from: 0 },
    { name: 'Cabin rental, 8 at $250', amount: 2000, basis: 'flat', from: 0 },
    { name: 'Permits', amount: 3000, basis: 'flat', from: 1 },
    { name: 'Porto-potties', amount: 2500, basis: 'flat', from: 2 },
    { name: 'Insurance', amount: 750, basis: 'flat', from: 0 },
    { name: 'Medical team, 3 days at $600', amount: 1800, basis: 'flat', from: 1 },
    { name: 'Venue medical rep, required without our own medic', amount: 500, basis: 'flat', from: 0, until: 0 },
    { name: 'Our own medical kit', amount: 200, basis: 'flat', from: 0, until: 0 },
    { name: 'Groceries for crew and artists', amount: 2800, basis: 'flat', from: 0 },
    { name: 'Extra groceries to feed partners and all artists', amount: 2500, basis: 'flat', from: 2 },
    { name: 'Site supplies', amount: 1200, basis: 'flat', from: 0 },
    { name: 'Extra site supplies', amount: 800, basis: 'flat', from: 2 },
  ],
  timeline: [
    { date: '2026-11-13', task: 'Put the five permit questions to the county planner', owner: 'You', done: false },
    { date: '2026-11-20', task: 'Ask target artists for quotes', owner: 'You', done: false },
    { date: '2026-11-30', task: 'Kinetic Desert and Project Seismic deals in writing', owner: 'You', done: false },
    { date: '2026-12-01', task: 'Ticket site live. Alumni presale opens', owner: 'You', done: false },
    { date: '2026-12-11', task: 'Submit the Temporary Use Permit application', owner: 'You', done: false },
    { date: '2026-12-15', task: 'Presale closes. Enter tickets sold and see what it covers', owner: 'You', done: false },
    { date: '2026-12-20', task: 'Lock the first artists that the plan covers', owner: 'You', done: false },
    { date: '2027-01-12', task: 'First lineup. Tier 1 and Sat–Sun tickets on sale', owner: 'You', done: false },
    { date: '2027-01-22', task: 'Last day to file the permit', owner: 'You', done: false },
    { date: '2027-02-01', task: 'Update tickets sold. Lock the next artists it covers', owner: 'You', done: false },
    { date: '2027-02-09', task: 'Full lineup. Art grants and merch pre-order open', owner: 'You', done: false },
    { date: '2027-03-01', task: 'Update tickets sold. Lock remaining artists and art spend', owner: 'You', done: false },
    { date: '2027-03-15', task: 'Decide on the 500 unlock. Order porto-potties', owner: 'You and Kinetic Desert', done: false },
    { date: '2027-03-23', task: 'Set times out. Sunday tickets on sale. Fire permit application in', owner: 'You', done: false },
    { date: '2027-04-09', task: 'Final ticket tier. Grocery and drinks order from the final budgets', owner: 'You', done: false },
    { date: '2027-04-21', task: 'Load-in begins', owner: 'Kinetic Desert', done: false },
    { date: '2027-04-23', task: 'Gates open at 10:00 AM', owner: 'Gate crew', done: false },
    { date: '2027-04-28', task: 'Production out by noon. Walk-through with the camp', owner: 'You', done: false },
  ],
};
const sum = a => a.reduce((x, y) => x + y, 0);
const n0 = v => Number(v) || 0;
// A row is active from its starting stage and, when it names a last stage, only up to that one.
const on = (row, level) => n0(row.from) <= level && (row.until === undefined || row.until === null || Number(row.until) < 0 || level <= Number(row.until));
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
const lockedSlots = s => s.slots.flat().filter(x => x.locked);
const lockedTotal = s => sum(lockedSlots(s).map(x => n0(x.fee)));
const committedOf = (s, b) => b.id === 'artists' ? lockedTotal(s) : n0(b.committed);
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
  // Mandatory hard costs.
  const partnerRows = s.partners.map(p => {
    const active = on(p, level);
    const raw = active ? n0(p.perTicket) * paid : 0;
    return { active, guar: active ? n0(p.guarantee) : 0, fee: n0(p.cap) > 0 ? Math.min(raw, n0(p.cap)) : raw };
  });
  const crewRows = s.crew.map(c => ({ active: on(c, level), pay: on(c, level) ? n0(c.people) * n0(c.pay) : 0 }));
  const costRows = s.costs.map(c => {
    const active = on(c, level), amt = n0(c.amount);
    return { active, value: !active ? 0 : c.basis === 'ticket' ? amt * paid : c.basis === 'ticketday' ? amt * ticketDays : c.basis === 'person' ? amt * onSite : amt };
  });
  const online = tickets + car + cabinRev;
  const bank = Math.min(100, n0(s.proc.bankShare)) / 100;
  const processing = online * ((1 - bank) * n0(s.proc.pct) + bank * n0(s.proc.bankPct)) / 100 + paid * (1 - bank) * n0(s.proc.fixed);
  const guarantees = sum(partnerRows.map(p => p.guar)), partnerFees = sum(partnerRows.map(p => p.fee));
  const crewPay = sum(crewRows.map(c => c.pay)), siteCosts = sum(costRows.map(c => c.value));
  const hard = guarantees + partnerFees + crewPay + siteCosts + processing;
  // Budgets that grow with sales.
  const surplus = revenue - hard;
  const floors = sum(s.budgets.map(b => n0(b.floor)));
  const free = surplus - floors;
  const shareTotal = sum(s.budgets.map(b => n0(b.share)));
  const budgetRows = s.budgets.map(b => {
    const committed = committedOf(s, b);
    let scaled = n0(b.floor) + Math.max(0, free) * n0(b.share) / 100;
    if (n0(b.cap) > 0) scaled = Math.min(scaled, n0(b.cap));
    const budget = Math.max(scaled, committed);
    return { scaled, committed, budget, over: Math.max(0, committed - scaled), left: budget - committed, must: Math.max(n0(b.floor), committed) };
  });
  const spend = sum(budgetRows.map(b => b.budget));
  const mustSpend = sum(budgetRows.map(b => b.must));
  const profit = surplus - spend;
  // Artist slots: locked slots keep their fee, open slots share what is left in proportion to their targets.
  const ai = s.budgets.findIndex(b => b.id === 'artists');
  const artistBudget = ai >= 0 ? budgetRows[ai].budget : 0;
  const locked = lockedTotal(s);
  const openTargets = sum(s.slots.flat().map(x => x.locked ? 0 : n0(x.target)));
  const factor = openTargets ? Math.max(0, artistBudget - locked) / openTargets : 0;
  const slotNow = s.slots.map(day => day.map(x => x.locked ? n0(x.fee) : n0(x.target) * factor));
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
  return { paid, nFull, nSat, nSun, tFull, tSat, tSun, tickets, carSold, car, cabinRev, other, revenue, ticketDays, online,
    level, unt, onSite, over, crewHead, partnerRows, crewRows, costRows, guarantees, partnerFees, crewPay, siteCosts, processing, hard,
    surplus, floors, free, shareTotal, profitShare: 100 - shareTotal, budgetRows, spend, mustSpend, profit,
    artistBudget, locked, lockedCount: lockedSlots(s).length, openTargets, factor, slotNow,
    yours: youIdx >= 0 ? partnerRows[youIdx].shareAmt : profit, avgTicket: paid ? tickets / paid : 0 };
}
// The fewest tickets at which sales cover everything that cannot be backed out of:
// the hard costs, each budget's floor, and whatever is already committed.
function coveredAt(s) {
  const max = maxPaid(s);
  for (let n = 0; n <= max; n++) { const r = compute({ ...s, paid: n }); if (r.surplus - r.mustSpend >= 0) return n; }
  return null;
}
// The fewest tickets at which one budget line's own share covers what is committed on it.
function lineCoveredAt(s, i) {
  const max = maxPaid(s);
  for (let n = 0; n <= max; n++) { const b = compute({ ...s, paid: n }).budgetRows[i]; if (b.scaled >= b.committed) return n; }
  return null;
}
// Each partner's share of a profit at a stage, in percent.
function sharePct(s, level) {
  const parts = sum(s.partners.map(p => on(p, level) ? n0(p.share) : 0));
  return s.partners.map(p => on(p, level) && parts ? n0(p.share) / parts * 100 : 0);
}
if (typeof module !== 'undefined') module.exports = { SCHEMA, DEFAULTS, compute, coveredAt, lineCoveredAt, people, maxPaid, stageStart, headcount, sharePct, lockedTotal };
