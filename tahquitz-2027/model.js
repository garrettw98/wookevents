// Pure budget model. Shared verbatim by the page and by the node check.
const DEFAULTS = {
  paid: 290, mixFull: 65, mixSat: 25,
  pFull: 195, pSat: 155, pSun: 82,
  carRate: 20, carSpots: 60, pCar: 50,
  cabinsRented: 8, cabinCost: 250, cabinsSold: 7, pCabin: 850, otherPer: 10,
  unticketed: 60,
  venuePerDay: 10, domePer: 10, domeCap: 2000,
  permit: 3000, permitOver: 199, portos: 2500, portoOver: 350, hardCap: 500,
  kd: 2000, insurance: 750, chef: 1000, food: 2500, crewCount: 12, crewPay: 100,
  art: 2500, marketing: 750, ops: 1200, medical: 600, travel: 1500, contingencyPct: 5,
  artists: [
    [75, 100, 150, 250, 400, 750, 1500, 3000],
    [75, 100, 200, 300, 500, 1000, 2000, 3000],
    [75, 100, 150, 200, 300, 600, 1250, 2250],
  ],
  kdShare: 50, recoup: false,
};
function compute(s) {
  const nFull = s.paid * s.mixFull / 100;
  const nSat = s.paid * s.mixSat / 100;
  const nSun = Math.max(0, s.paid - nFull - nSat);
  const tickets = nFull * s.pFull + nSat * s.pSat + nSun * s.pSun;
  const carSold = Math.min(s.carSpots, s.paid * s.carRate / 100);
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
  const fixedBase = artistFees + s.travel + s.kd + s.insurance + s.chef + s.food + crew
    + s.art + s.marketing + s.ops + s.medical + cabins + permit + portos;
  const contingency = fixedBase * s.contingencyPct / 100;
  const costs = fixedBase + contingency + venue + dome;
  const profit = revenue - costs;
  let kdShareAmt;
  if (s.recoup) kdShareAmt = Math.max(0, (profit + s.kd) * s.kdShare / 100 - s.kd);
  else kdShareAmt = Math.max(0, profit) * s.kdShare / 100;
  return { nFull, nSat, nSun, tickets, carSold, car, cabinRev, other, revenue, ticketDays, venue, dome,
    onSite, permit, portos, artistFees, cabins, crew, contingency, costs, profit,
    kdShareAmt, kdTotal: s.kd + kdShareAmt, yours: profit - kdShareAmt,
    avgTicket: s.paid ? tickets / s.paid : 0 };
}
function breakEven(s) {
  const max = Math.max(0, s.hardCap - s.unticketed);
  for (let n = 0; n <= max; n++) if (compute({ ...s, paid: n }).profit >= 0) return n;
  return null;
}
if (typeof module !== 'undefined') module.exports = { DEFAULTS, compute, breakEven };
