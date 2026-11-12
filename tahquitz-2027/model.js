// Pure planning model, shared verbatim by the page and by the node check.
//
// How it scales:
//  1. The event grows through stages, each a limit on people on site. Partners, crew roles, groups and
//     hard costs each name the stage they start at (and optionally stop at).
//  2. Mandatory hard costs come off the top. What sales leave over is the surplus.
//  3. Every other budget is a share of that surplus, so it grows with each ticket sold. A budget can have
//     a floor (the least the event can run on) and a cap, and it never drops below what is already committed.
//  4. Every artist minimum is a hard cost: those artists are announced with the ticket sales and their deposits are
//     paid first, so break-even has to cover them. The artist budget then lifts every open slot from its minimum
//     toward its full fee, all at the same pace. An agreed slot is paid on its own terms: its minimum, plus a rate
//     per ticket above a ticket count, up to the full fee. A rate of 0 is a flat fee.
//  5. Cabins are rented as they sell. Crew pay is a hard cost: a fixed amount each, plus a rate per ticket sold
//     above a ticket count.
//  6. Stepping up a size never lowers a payment. At a larger size no budget, and no artist, gets less than it had
//     reached at the sell-out of the size before. The cost of the step comes out of the profit instead.
//  7. Each size holds back a step fund: a slice of everything above the floors, taken from every share alike,
//     plus any share that has nowhere to go (artists already at full fees, a capped budget). The fund pays for the
//     step up to the next size. It is not profit: if the step is never taken it is carried forward.
//     The profit grows at its own share like every other line and is never less than at the size before.
//  8. A larger size is sold as one block. Tickets past a size's sell-out go on a waitlist and nobody is charged
//     until the waitlist reaches the release count: the first count at which, with the fund spent on the step, nobody
//     is paid less than at the smaller size's sell-out, the organiser included.
//  9. Whatever share is not given to a budget is the profit, split by parts among the partners who hold a share.
const SCHEMA = 10;
// target is the full fee, min the minimum owed whatever sells, order the place in the booking queue.
// rate and above are the terms once agreed: rate per ticket sold above that many tickets.
const day = (targets, mins, orders) => targets.map((target, i) => ({ target, min: mins[i], order: orders[i], name: '', agreed: false, rate: 0, above: 0 }));
const DEFAULTS = {
  v: SCHEMA,
  stages: [
    // fund is the percent of the surplus above floors held back at this size to pay for the step to the next.
    // release is the ticket count at which the size is sold as a block; 0 lets the model set it.
    { name: 'Under the permit line', limit: 199, fund: 50 },
    { name: 'Camp facilities', limit: 350, fund: 0, release: 0 },
    { name: 'Stretch: porto-potties and a second stage', limit: 500, release: 0 },
  ],
  sold: 0, paid: 285, mixFull: 30, mixSat: 40,
  tiers: {
    full: [{ name: 'Presale', price: 189, qty: 25 }, { name: 'Tier 1', price: 209, qty: 60 }, { name: 'Tier 2', price: 239, qty: 50 }, { name: 'Final', price: 259, qty: 0 }],
    sat: [{ name: 'Tier 1', price: 145, qty: 20 }, { name: 'Tier 2', price: 160, qty: 30 }, { name: 'Final', price: 189, qty: 0 }],
    sun: [{ name: 'Tier 1', price: 85, qty: 15 }, { name: 'Final', price: 105, qty: 0 }],
  },
  // One 9-bed cabin sells per cabinPer tickets, up to cabinsMax. Cabins are rented only as they sell, plus cabinsHeld for artists and staff.
  addons: { carRate: 20, carSpots: 120, pCar: 50, cabinPer: 45, cabinsMax: 6, cabinsHeld: 2, cabinCost: 250, pCabin: 850, otherPer: 10 },
  proc: { pct: 2.9, fixed: 0.3, bankShare: 0, bankPct: 0.8 },
  // Full fees set the shape of the lineup: Friday carries the most, then Saturday, then Sunday.
  // Minimums are a percent of the full fee by slot: headliners (10:30) the most, because they sell the tickets,
  // then direct support (9:00) and the 7:30 slots. minPct holds those percents; each slot's own min is what counts.
  // The queue runs headliners first (Friday, Saturday, Sunday), then direct support, then the 7:30 slots.
  // Daytime slots have no minimum: they are paid from the artist budget once sales pass break-even.
  minPct: { head: 75, support: 50, opener: 50, day: 0 },
  slots: [
    day([75, 100, 200, 300, 500, 1000, 2000, 3000], [0, 0, 0, 0, 0, 500, 1000, 2250], [20, 20, 20, 20, 20, 7, 4, 1]),
    day([75, 100, 150, 250, 400, 750, 1500, 3000], [0, 0, 0, 0, 0, 375, 750, 2250], [20, 20, 20, 20, 20, 8, 5, 2]),
    day([75, 100, 150, 200, 300, 600, 1250, 2250], [0, 0, 0, 0, 0, 300, 625, 1700], [20, 20, 20, 20, 20, 9, 6, 3]),
  ],
  // The share of each minimum that is due up front, before the artist can be announced.
  depositPct: 50,
  // share is a percent of the surplus left after floors. committed is money already promised on that line.
  budgets: [
    { id: 'artists', name: 'Artists, above their minimums', share: 55, floor: 0, cap: 0, committed: 0 },
    // One bucket for everything else that grows with sales: art, drinks, hospitality, marketing and a reserve.
    { name: 'Event: art, drinks, hospitality, marketing, reserve', share: 24, floor: 1050, cap: 0, committed: 0 },
  ],
  // share is in parts: 2 / 2 / 1 means 40% / 40% / 20% among the partners active at that stage.
  // people is the number on site at each stage, crew and guest list together.
  partners: [
    { name: 'You', role: 'Organiser', you: true, from: 0, guarantee: 0, perTicket: 0, cap: 0, share: 2, sharesLoss: true, people: [1, 1, 1] },
    // Kinetic Desert: a guarantee for the crew, then a fee on every ticket past the point the event covers itself. No profit share.
    { name: 'Kinetic Desert', role: 'Production for The Bowl, the K Lodge and the main stage', from: 0, guarantee: 2000, perTicket: 15, feeAbove: 75, cap: 0, share: 0, sharesLoss: false, people: [4, 19, 29] },
    { name: 'The Dome', role: '24-foot dome with sound, decks, travel, setup and takedown', from: 0, guarantee: 0, perTicket: 10, feeAbove: 0, cap: 2000, share: 0, sharesLoss: false, people: [2, 2, 2] },
    // Project Seismic: rentals covered up front, then a fee on every ticket the bigger event adds. No profit share.
    { name: 'Project Seismic', role: 'Side stage at The Bowl with their own artists', from: 2, guarantee: 3000, perTicket: 10, feeAbove: 285, cap: 0, share: 0, sharesLoss: false, people: [0, 0, 30] },
  ],
  // pay is fixed and owed whatever sells. perTicket is paid to each person for every ticket sold above `above`.
  // Both are hard costs.
  // shifts is what each person works, need is how many shifts the job takes. Zero need means not shift-based.
  crew: [
    { name: 'Chef', people: 1, pay: 1000, perTicket: 0, above: 0, shifts: 0, need: 0, from: 0 },
    { name: 'Second chef', people: 1, pay: 1000, perTicket: 0, above: 0, shifts: 0, need: 0, from: 2 },
    { name: 'Setup and strike', people: 5, pay: 100, perTicket: 1, above: 141, shifts: 3, need: 16, from: 0 },
    { name: 'Runners: airport and errands', people: 3, pay: 100, perTicket: 1, above: 141, shifts: 3, need: 10, from: 0 },
    { name: 'Gate', people: 4, pay: 100, perTicket: 1, above: 141, shifts: 3, need: 12, from: 0 },
    { name: 'Second gate and parking', people: 3, pay: 0, perTicket: 0, above: 0, shifts: 3, need: 8, from: 0 },
    { name: 'Artist hospitality and check-in', people: 3, pay: 0, perTicket: 0, above: 0, shifts: 3, need: 9, from: 0 },
    { name: 'Informal security: K Lodge door and night rounds', people: 2, pay: 0, perTicket: 0, above: 0, shifts: 3, need: 6, from: 0 },
    { name: 'Kitchen help', people: 2, pay: 0, perTicket: 0, above: 0, shifts: 3, need: 6, from: 0 },
    { name: 'Site upkeep: trash, bathrooms, firewood', people: 2, pay: 0, perTicket: 0, above: 0, shifts: 3, need: 6, from: 0 },
  ],
  others: [
    { name: 'Artists and their guests, at the peak', people: 16, from: 0 },
    { name: 'Medical team', people: 2, from: 1 },
  ],
  // Mandatory hard costs only. basis: flat, ticket (per paid ticket), ticketday (per ticket per day), person (per person on site).
  // until is the last stage a row applies at; leave it out for a row that never stops.
  costs: [
    { name: 'Venue fee', amount: 10, basis: 'ticketday', from: 0, camp: true },
    { name: 'Permits', amount: 3000, basis: 'flat', from: 1 },
    { name: 'Porto-potties', amount: 2500, basis: 'flat', from: 2 },
    { name: 'Insurance', amount: 750, basis: 'flat', from: 0 },
    { name: 'Medical team, 3 days at $600', amount: 1800, basis: 'flat', from: 1 },
    { name: 'Venue medical rep, required without our own medic', amount: 500, basis: 'flat', from: 0, until: 0, camp: true },
    { name: 'Our own medical kit', amount: 200, basis: 'flat', from: 0, until: 0 },
    // Groceries and supplies are budgeted per ticket, so they grow with the event instead of jumping at each size.
    { name: 'Groceries for crew and artists', amount: 1350, basis: 'flat', from: 0 },
    { name: 'Groceries, per ticket sold', amount: 5.4, basis: 'ticket', from: 0 },
    { name: 'Groceries to feed partners and all artists', amount: 2000, basis: 'flat', from: 2 },
    { name: 'Site supplies', amount: 550, basis: 'flat', from: 0 },
    { name: 'Site supplies, per ticket sold', amount: 2.2, basis: 'ticket', from: 0 },
    { name: 'Site supplies for the second stage', amount: 400, basis: 'flat', from: 2 },
  ],
  timeline: [
    { date: '2026-11-13', task: 'Put the five permit questions to the county planner', owner: 'You', done: false },
    { date: '2026-11-20', task: 'Ask target artists for a full fee, the lowest minimum they would take, and whether they would take it flat', owner: 'You', done: false },
    { date: '2026-11-30', task: 'Kinetic Desert and Project Seismic deals in writing', owner: 'You', done: false },
    { date: '2026-12-01', task: 'Ticket site live. Alumni presale opens', owner: 'You', done: false },
    { date: '2026-12-15', task: 'Presale closes. Enter tickets sold and see what it covers', owner: 'You', done: false },
    { date: '2026-12-20', task: 'Agree the Friday headliner and pay the deposit before the first lineup', owner: 'You', done: false },
    { date: '2027-01-12', task: 'First lineup. Tier 1 and Sat–Sun tickets on sale', owner: 'You', done: false },
    { date: '2027-02-01', task: 'Update tickets sold. Agree the remaining night slots and pay their deposits before the full lineup', owner: 'You', done: false },
    { date: '2027-02-09', task: 'Full lineup. Art grants and merch pre-order open', owner: 'You', done: false },
    { date: '2027-03-01', task: 'Update tickets sold. Agree remaining artists and commit the event budget. Open the 500 waitlist only if the middle size has sold out', owner: 'You', done: false },
    { date: '2027-03-15', task: 'Waitlist deadline. Release it if it has reached the count for the next size', owner: 'You and Kinetic Desert', done: false },
    { date: '2027-03-16', task: 'If the waitlist was released: file the Temporary Use Permit and book the medical team. For 500, order porto-potties', owner: 'You', done: false },
    { date: '2027-03-23', task: 'Set times out. Sunday tickets on sale. Fire permit application in, if going past 199 on site', owner: 'You', done: false },
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
const agreedSlots = s => s.slots.flat().filter(x => x.agreed);
// What an agreed slot is paid at a ticket count: its minimum, plus its rate on every ticket above its threshold,
// never more than the full fee.
const dealPay = (x, n) => { const m = n0(x.min); return Math.min(Math.max(n0(x.target), m), m + n0(x.rate) * Math.max(0, n - n0(x.above))); };
// Shares `money` among the slots that are not agreed yet. Every slot already has its minimum, which is a hard cost.
// The money lifts each open slot toward its full fee in proportion to how far it has to go, so they all reach
// their full fee together. Nothing is paid past a full fee.
function rise(s, money) {
  const head = s.slots.flat().map(x => x.agreed ? 0 : Math.max(0, n0(x.target) - n0(x.min)));
  const H = sum(head), k = H > 0 ? Math.min(1, Math.max(0, money) / H) : 0;
  return { add: head.map(h => h * k), leftover: Math.max(0, money - H) };
}
// The ticket count at which each stage is released. A stage's own `release` if it has one, otherwise the first
// count at which the organiser's take is no lower than at the sell-out of the stage before.
// Stage 0 is always open. null means the stage never gets there, and it is then left ungated.
function releases(s, maxes) {
  const mx = maxes || s.stages.map((_, L) => maxPaid(s, L));
  const top = mx[mx.length - 1], raw = [], ctx = { maxes: mx, rel: [], held: {} };
  for (let n = 0; n <= top; n++) raw.push(compute({ ...s, paid: n, _ctx: ctx }));
  return s.stages.map((st, L) => {
    if (L === 0) return 0;
    const start = mx[L - 1] + 1, base = raw[mx[L - 1]];
    if (n0(st.release) > 0) return Math.max(start, Math.min(top, Math.round(n0(st.release))));
    for (let n = start; n <= top; n++) if (raw[n].yours >= base.yours - 0.005) return n;
    return null;
  });
}
// The tickets actually sold for a number of buyers: buyers past a sell-out wait until the next stage is released.
function soldFor(s, buyers, rel, maxes) {
  const mx = maxes || s.stages.map((_, L) => maxPaid(s, L));
  let n = buyers;
  for (let L = s.stages.length - 1; L >= 1; L--) { const start = mx[L - 1] + 1; if (rel[L] && n >= start && n < rel[L]) n = start - 1; }
  return n;
}
// Everything about the stages that is the same at every ticket count, worked out once.
function context(s) {
  const maxes = s.stages.map((_, L) => maxPaid(s, L));
  return { maxes, rel: releases(s, maxes), held: {} };
}
function compute(s) {
  const ctx = s._ctx || context(s), rel = ctx.rel;
  const buyers = n0(s.paid), paid = soldFor(s, buyers, rel, ctx.maxes);
  const nFull = paid * s.mixFull / 100, nSat = paid * s.mixSat / 100, nSun = Math.max(0, paid - nFull - nSat);
  const tFull = fillTiers(s.tiers.full, nFull), tSat = fillTiers(s.tiers.sat, nSat), tSun = fillTiers(s.tiers.sun, nSun);
  const tickets = tFull.rev + tSat.rev + tSun.rev;
  const { level, unt, onSite, over } = people(s, paid);
  const a = s.addons;
  const crewHead = headcount(s, level).crew;
  const carSold = Math.min(Math.max(0, n0(a.carSpots) - crewHead), paid * n0(a.carRate) / 100);
  const car = carSold * n0(a.pCar);
  const cabinsSold = Math.min(n0(a.cabinsMax), Math.floor(paid / Math.max(1, n0(a.cabinPer))));
  const cabinsRented = cabinsSold + n0(a.cabinsHeld);
  const cabinRev = cabinsSold * n0(a.pCabin), cabinCost = cabinsRented * n0(a.cabinCost);
  const other = paid * n0(a.otherPer);
  const revenue = tickets + car + cabinRev + other;
  const ticketDays = nFull * 3 + nSat * 2 + nSun;
  // Mandatory hard costs.
  const partnerRows = s.partners.map(p => {
    const active = on(p, level);
    const raw = active ? n0(p.perTicket) * Math.max(0, paid - n0(p.feeAbove)) : 0;
    return { active, guar: active ? n0(p.guarantee) : 0, fee: n0(p.cap) > 0 ? Math.min(raw, n0(p.cap)) : raw };
  });
  const crewRows = s.crew.map(c => {
    const active = on(c, level), each = active ? n0(c.perTicket) * Math.max(0, paid - n0(c.above)) : 0;
    return { active, pay: active ? n0(c.people) * n0(c.pay) : 0, fee: n0(c.people) * each, each: active ? n0(c.pay) + each : 0 };
  });
  const costRows = s.costs.map(c => {
    const active = on(c, level), amt = n0(c.amount);
    return { active, value: !active ? 0 : c.basis === 'ticket' ? amt * paid : c.basis === 'ticketday' ? amt * ticketDays : c.basis === 'person' ? amt * onSite : amt };
  });
  const online = tickets + car + cabinRev;
  const bank = Math.min(100, n0(s.proc.bankShare)) / 100;
  const processing = online * ((1 - bank) * n0(s.proc.pct) + bank * n0(s.proc.bankPct)) / 100 + paid * (1 - bank) * n0(s.proc.fixed);
  const guarantees = sum(partnerRows.map(p => p.guar)), partnerFees = sum(partnerRows.map(p => p.fee));
  const crewPay = sum(crewRows.map(c => c.pay)), crewFees = sum(crewRows.map(c => c.fee)), siteCosts = sum(costRows.map(c => c.value));
  const artistMin = sum(s.slots.flat().map(x => n0(x.min)));
  const hard = guarantees + partnerFees + crewPay + crewFees + siteCosts + cabinCost + artistMin + processing;
  // Budgets that grow with sales. Past a size step each is held at what it reached at the smaller size's sell-out.
  const heldAt = level > 0 ? ctx.maxes[level - 1] : null;
  const held = heldAt === null ? null : (ctx.held[level] || (ctx.held[level] = compute({ ...s, paid: heldAt, _ctx: ctx })));
  const surplus = revenue - hard;
  const floors = sum(s.budgets.map(b => n0(b.floor)));
  const free = surplus - floors;
  const shareTotal = sum(s.budgets.map(b => n0(b.share)));
  const fundPct = level < s.stages.length - 1 ? Math.min(100, Math.max(0, n0(s.stages[level].fund))) / 100 : 0;
  const budgetRows = s.budgets.map((b, i) => {
    const committed = b.id ? 0 : n0(b.committed);
    const hold = held && held.budgetRows[i] ? held.budgetRows[i].budget : 0;
    let scaled = n0(b.floor) + Math.max(0, free) * (1 - fundPct) * n0(b.share) / 100;
    if (n0(b.cap) > 0) scaled = Math.min(scaled, n0(b.cap));
    const budget = Math.max(scaled, committed, hold);
    return { scaled, committed, budget, hold, held: hold > Math.max(scaled, committed) + 0.5, over: Math.max(0, committed - scaled), left: budget - committed, must: Math.max(n0(b.floor), committed) };
  });
  // Artists: the minimums are already in the hard costs. The artist budget pays what is above them. Any per-ticket
  // rate you have agreed comes out of it first, and the rest lifts the open slots toward their full fees.
  // If the agreed rates come to more than the budget holds, the difference comes out of the profit.
  const ai = s.budgets.findIndex(b => b.id === 'artists');
  const flatSlots = s.slots.flat();
  const artistBudget = ai >= 0 ? Math.max(budgetRows[ai].scaled, budgetRows[ai].hold) : 0;
  const agreedExtra = sum(flatSlots.map(x => x.agreed ? dealPay(x, paid) - n0(x.min) : 0));
  const agreedMin = sum(flatSlots.map(x => x.agreed ? n0(x.min) : 0));
  // Open slots never get less than they had at the smaller size's sell-out, even while agreed rates keep growing.
  const up = rise(s, Math.max(artistBudget - agreedExtra, held ? held.riseUsed : 0));
  const pays = flatSlots.map((x, i) => x.agreed ? dealPay(x, paid) : n0(x.min) + up.add[i]);
  const artistPaid = sum(pays);
  if (ai >= 0) {
    const b = budgetRows[ai];
    b.committed = agreedExtra; b.budget = artistPaid - artistMin; b.over = Math.max(0, agreedExtra - b.scaled);
    b.left = b.budget - agreedExtra; b.must = Math.max(n0(s.budgets[ai].floor), agreedExtra);
  }
  const per = s.slots[0].length;
  const slotNow = s.slots.map((d, j) => pays.slice(j * per, j * per + per));
  const slotStatus = s.slots.map(d => d.map(x => x.agreed ? 'agreed' : 'open'));
  const spend = sum(budgetRows.map(b => b.budget));
  const mustSpend = sum(budgetRows.map(b => b.must));
  // The profit takes its own share at the same pace as every other line, and never less than it had reached at the
  // sell-out of the size before. What is left is the step fund. At the last size there is no step to fund, so
  // everything left is profit. Below break-even the whole shortfall is the loss.
  const left = surplus - spend;
  const ownProfit = Math.max(0, free) * (1 - fundPct) * Math.max(0, 100 - shareTotal) / 100;
  const profit = level >= s.stages.length - 1 ? left : Math.min(left, Math.max(ownProfit, held ? held.profit : -Infinity));
  const fund = Math.max(0, left - profit);
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
  return { paid, buyers, waitlist: buyers - paid, rel, fund, fundPct, nFull, nSat, nSun, tFull, tSat, tSun, tickets, carSold, car, cabinRev, other, revenue, ticketDays, online,
    level, unt, onSite, over, crewHead, partnerRows, crewRows, costRows, guarantees, partnerFees, crewPay, crewFees, siteCosts, processing, hard,
    riseUsed: sum(up.add), heldAt, heldCost: sum(budgetRows.map(b => Math.max(0, b.budget - Math.max(b.scaled, b.committed)))),
    cabinsSold, cabinsRented, cabinCost, artistMin, artistBudget, agreedExtra, agreedMin, artistPaid,
    campTotal: cabinCost + sum(s.costs.map((c, i) => c.camp ? costRows[i].value : 0)),
    surplus, floors, free, shareTotal, profitShare: 100 - shareTotal, budgetRows, spend, mustSpend, profit,
    agreedCount: agreedSlots(s).length, slotNow, slotStatus,
    yours: youIdx >= 0 ? partnerRows[youIdx].shareAmt : profit, avgTicket: paid ? tickets / paid : 0 };
}
// The plan at every ticket count that fits, computed once and reused by the charts and the checks.
function series(s) { const out = [], ctx = context(s); for (let n = 0, max = ctx.maxes[ctx.maxes.length - 1]; n <= max; n++) out.push(compute({ ...s, paid: n, _ctx: ctx })); return out; }
// The fewest tickets at which sales cover everything that cannot be backed out of:
// the hard costs (artist guarantees included), each budget's floor, and whatever is already committed.
function coveredAt(s, all) { const i = (all || series(s)).findIndex(r => r.surplus - r.mustSpend >= 0); return i < 0 ? null : i; }
// The fewest tickets at which one budget line's own share covers what is committed on it.
function lineCoveredAt(s, i, all) { const k = (all || series(s)).findIndex(r => r.budgetRows[i].scaled >= r.budgetRows[i].committed); return k < 0 ? null : k; }
// For a stage, the ticket count from which stepping into it beats selling out the stage before, for total profit
// and for the organiser's own take. null means it never does at this size.
function stagePaysFrom(s, level, all) {
  const a = all || series(s);
  if (level <= 0) return { profit: 0, yours: 0 };
  const base = a[maxPaid(s, level - 1)], start = stageStart(s, level);
  const find = f => { for (let n = start; n < a.length; n++) if (a[n].paid >= start && f(a[n]) >= f(base)) return n; return null; };
  return { profit: find(r => r.profit), yours: find(r => r.yours), whole: find(r => r.surplus) };
}
// Each partner's share of a profit at a stage, in percent.
function sharePct(s, level) {
  const parts = sum(s.partners.map(p => on(p, level) ? n0(p.share) : 0));
  return s.partners.map(p => on(p, level) && parts ? n0(p.share) / parts * 100 : 0);
}
if (typeof module !== 'undefined') module.exports = { SCHEMA, DEFAULTS, compute, series, coveredAt, lineCoveredAt, stagePaysFrom, releases, soldFor, people, maxPaid, stageStart, headcount, sharePct, dealPay, rise };
