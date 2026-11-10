// Pure budget model. Shared verbatim by the page and by the node check.
// Ticket tiers fill in order; the last tier of each type takes every ticket after the earlier tiers sell out.
// Guest lists and some costs step up when people on site pass 199 and 350.
const DEFAULTS = {
  paid: 275, mixFull: 65, mixSat: 25,
  tiers: {
    full: [{ name: 'Presale', price: 169, qty: 50 }, { name: 'Tier 1', price: 189, qty: 60 }, { name: 'Tier 2', price: 209, qty: 50 }, { name: 'Final', price: 229, qty: 0 }],
    sat: [{ name: 'Tier 1', price: 139, qty: 20 }, { name: 'Tier 2', price: 155, qty: 30 }, { name: 'Final', price: 169, qty: 0 }],
    sun: [{ name: 'Tier 1', price: 79, qty: 15 }, { name: 'Final', price: 85, qty: 0 }],
  },
  carRate: 20, carSpots: 120, carComped: 24, pCar: 50,
  cabinsRented: 8, cabinCost: 250, cabinsSold: 6, pCabin: 850, otherPer: 10,
  unticketed: 60, kdGuests1: 15, kdGuests2: 10, psGuests: 30,
  venuePerDay: 10, domePer: 10, domeCap: 2000,
  permit: 3000, permitOver: 199, portos: 2500, portoOver: 350, hardCap: 500, chef2: 1000, food500: 2500, ops500: 800, drinksPer: 3,
  kd: 2000, psGuarantee: 2000, insurance: 750, chef: 1000, food: 2800, crewCount: 12, crewPay: 100,
  art: 3000, marketing: 750, ops: 1200, medicalPerDay: 600, medicalDays: 3, hospitality: 600, contingencyPct: 5,
  procPct: 2.9, procFixed: 0.3, bankShare: 0, bankPct: 0.8,
  artists: [
    // Friday carries the most, then Saturday, then Sunday, to pull buyers toward the longer tickets.
    [75, 100, 200, 300, 500, 1000, 2000, 3000],
    [75, 100, 150, 250, 400, 750, 1500, 3000],
    [75, 100, 150, 200, 300, 600, 1250, 2250],
  ],
  kdShare: 50, psShare: 20,
};
function fillTiers(tiers, n) {
  let left = n, rev = 0;
  const sold = tiers.map((t, i) => {
    const q = i === tiers.length - 1 ? left : Math.min(left, t.qty);
    rev += q * t.price; left -= q;
    return q;
  });
  return { rev, sold, avg: n ? rev / n : 0 };
}
// Who is on site without a paid ticket. Level 1: up to 199 on site. Level 2: 200 to 350. Level 3: 351 to 500.
function people(s, paid) {
  let unt = s.unticketed, level = 1;
  if (paid + unt > s.permitOver) { unt += s.kdGuests1; level = 2; }
  if (paid + unt > s.portoOver) { unt += s.kdGuests2 + s.psGuests; level = 3; }
  return { unt, level, onSite: paid + unt };
}
function maxPaid(s, limit) {
  const cap = limit === undefined ? s.hardCap : limit;
  for (let n = cap; n >= 0; n--) if (people(s, n).onSite <= cap) return n;
  return 0;
}
function compute(s) {
  const nFull = s.paid * s.mixFull / 100;
  const nSat = s.paid * s.mixSat / 100;
  const nSun = Math.max(0, s.paid - nFull - nSat);
  const tFull = fillTiers(s.tiers.full, nFull), tSat = fillTiers(s.tiers.sat, nSat), tSun = fillTiers(s.tiers.sun, nSun);
  const tickets = tFull.rev + tSat.rev + tSun.rev;
  const carSold = Math.min(Math.max(0, s.carSpots - s.carComped), s.paid * s.carRate / 100);
  const car = carSold * s.pCar;
  const cabinRev = Math.min(s.cabinsSold, s.cabinsRented) * s.pCabin;
  const other = s.paid * s.otherPer;
  const revenue = tickets + car + cabinRev + other;
  const ticketDays = nFull * 3 + nSat * 2 + nSun;
  const venue = ticketDays * s.venuePerDay;
  const dome = Math.min(s.paid * s.domePer, s.domeCap);
  const { unt, level, onSite } = people(s, s.paid);
  const permit = level >= 2 ? s.permit : 0;
  const portos = level >= 3 ? s.portos : 0;
  // Above 350 a second chef comes in and the kitchen also feeds Project Seismic, Kinetic Desert's guests and all artists.
  const kitchen500 = level >= 3 ? s.chef2 + s.food500 : 0;
  const ops500 = level >= 3 ? s.ops500 : 0;
  const drinks = onSite * s.drinksPer;
  const psGuar = level >= 3 ? s.psGuarantee : 0;
  const artistFees = s.artists.flat().reduce((a, b) => a + b, 0);
  const cabins = s.cabinsRented * s.cabinCost;
  const crew = s.crewCount * s.crewPay;
  const medical = s.medicalPerDay * s.medicalDays;
  const fixedBase = artistFees + s.hospitality + s.kd + psGuar + s.insurance + s.chef + s.food + crew
    + s.art + s.marketing + s.ops + medical + cabins + permit + portos + kitchen500 + ops500 + drinks;
  const contingency = fixedBase * s.contingencyPct / 100;
  // Card and bank fees on what is sold through the site. The fixed card fee is counted once per ticket.
  const online = tickets + car + cabinRev;
  const bank = Math.min(100, s.bankShare) / 100;
  const processing = online * ((1 - bank) * s.procPct + bank * s.bankPct) / 100 + s.paid * (1 - bank) * s.procFixed;
  const costs = fixedBase + contingency + venue + dome + processing;
  const profit = revenue - costs;
  // Guarantees are paid on top of each share. Project Seismic joins above 350 on site and shares a profit
  // but not a loss. Kinetic Desert takes its share of whatever is left, profit or loss.
  const psShareAmt = level >= 3 ? Math.max(0, profit) * s.psShare / 100 : 0;
  const kdShareAmt = (profit - psShareAmt) * s.kdShare / 100;
  return { nFull, nSat, nSun, tFull, tSat, tSun, tickets, carSold, car, cabinRev, other, revenue, ticketDays, venue, dome,
    unt, level, onSite, permit, portos, kitchen500, ops500, drinks, psGuar, artistFees, cabins, crew, medical, contingency, processing, costs, profit,
    kdShareAmt, kdTotal: s.kd + kdShareAmt, psShareAmt, psTotal: psGuar + psShareAmt, yours: profit - kdShareAmt - psShareAmt,
    avgTicket: s.paid ? tickets / s.paid : 0 };
}
function breakEven(s) {
  const max = maxPaid(s);
  for (let n = 0; n <= max; n++) if (compute({ ...s, paid: n }).profit >= 0) return n;
  return null;
}
// Scale a fee grid to a new total, keeping its shape. Slots round to $25 and the remainder goes to the biggest slots.
function scaleFees(shape, target) {
  const flat = shape.flat();
  const sum = flat.reduce((a, b) => a + b, 0);
  if (!sum) return shape.map(d => d.slice());
  const out = flat.map(v => Math.round(v * target / sum / 25) * 25);
  let diff = Math.round((target - out.reduce((a, b) => a + b, 0)) / 25);
  const order = flat.map((v, i) => i).sort((a, b) => flat[b] - flat[a]);
  for (let i = 0; diff !== 0 && i < 10000; i++) {
    const idx = order[i % order.length], step = diff > 0 ? 25 : -25;
    if (out[idx] + step >= 0) { out[idx] += step; diff -= Math.sign(diff); }
  }
  const per = shape[0].length;
  return shape.map((d, j) => out.slice(j * per, j * per + per));
}
if (typeof module !== 'undefined') module.exports = { DEFAULTS, compute, breakEven, people, maxPaid, scaleFees };
