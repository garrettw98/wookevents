// Pure budget model. Shared verbatim by the page and by the node check.
// Ticket tiers fill in order; the last tier of each type takes every ticket after the earlier tiers sell out.
const DEFAULTS = {
  paid: 290, mixFull: 65, mixSat: 25,
  tiers: {
    full: [{ name: 'Presale', price: 169, qty: 50 }, { name: 'Tier 1', price: 189, qty: 60 }, { name: 'Tier 2', price: 209, qty: 50 }, { name: 'Final', price: 229, qty: 0 }],
    sat: [{ name: 'Tier 1', price: 139, qty: 20 }, { name: 'Tier 2', price: 155, qty: 30 }, { name: 'Final', price: 169, qty: 0 }],
    sun: [{ name: 'Tier 1', price: 79, qty: 15 }, { name: 'Final', price: 85, qty: 0 }],
  },
  carRate: 20, carSpots: 120, carComped: 24, pCar: 50,
  cabinsRented: 8, cabinCost: 250, cabinsSold: 6, pCabin: 850, otherPer: 10,
  unticketed: 60,
  venuePerDay: 10, domePer: 10, domeCap: 2000,
  permit: 3000, permitOver: 199, portos: 2500, portoOver: 350, hardCap: 500,
  kd: 2000, insurance: 750, chef: 1000, food: 2800, crewCount: 12, crewPay: 100,
  art: 3000, marketing: 750, ops: 1200, medicalPerDay: 600, medicalDays: 3, hospitality: 600, contingencyPct: 5,
  artists: [
    [75, 100, 150, 250, 400, 750, 1500, 3000],
    [75, 100, 200, 300, 500, 1000, 2000, 3000],
    [75, 100, 150, 200, 300, 600, 1250, 2250],
  ],
  kdShare: 50, psShare: 0, psGuarantee: 0,
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
  const onSite = s.paid + s.unticketed;
  const permit = onSite > s.permitOver ? s.permit : 0;
  const portos = onSite > s.portoOver ? s.portos : 0;
  const artistFees = s.artists.flat().reduce((a, b) => a + b, 0);
  const cabins = s.cabinsRented * s.cabinCost;
  const crew = s.crewCount * s.crewPay;
  const medical = s.medicalPerDay * s.medicalDays;
  const fixedBase = artistFees + s.hospitality + s.kd + s.psGuarantee + s.insurance + s.chef + s.food + crew
    + s.art + s.marketing + s.ops + medical + cabins + permit + portos;
  const contingency = fixedBase * s.contingencyPct / 100;
  const costs = fixedBase + contingency + venue + dome;
  const profit = revenue - costs;
  // Guarantees are paid on top of each partner's share. Profit and loss are both split.
  const kdShareAmt = profit * s.kdShare / 100;
  const psShareAmt = profit * s.psShare / 100;
  return { nFull, nSat, nSun, tFull, tSat, tSun, tickets, carSold, car, cabinRev, other, revenue, ticketDays, venue, dome,
    onSite, permit, portos, artistFees, cabins, crew, medical, contingency, costs, profit,
    kdShareAmt, kdTotal: s.kd + kdShareAmt, psShareAmt, psTotal: s.psGuarantee + psShareAmt, yours: profit - kdShareAmt - psShareAmt,
    avgTicket: s.paid ? tickets / s.paid : 0 };
}
function breakEven(s) {
  const max = Math.max(0, s.hardCap - s.unticketed);
  for (let n = 0; n <= max; n++) if (compute({ ...s, paid: n }).profit >= 0) return n;
  return null;
}
if (typeof module !== 'undefined') module.exports = { DEFAULTS, compute, breakEven };
