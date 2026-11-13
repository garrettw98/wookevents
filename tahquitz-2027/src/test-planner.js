// Drives budget.html in a headless browser: reads the top bar, the stages, the booking queue and the pay tables,
// changes a few inputs, saves and reloads, then checks every tab at phone width for sideways scrolling.
// Usage: node src/test-planner.js   (needs Playwright with Chromium: npm i -D playwright && npx playwright install chromium)
// It prints what it reads, and ends with 'errors []' and 'phone checked' when the page is healthy.
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
(async () => {
  const file = 'file://' + path.resolve(process.argv[2] || path.join(__dirname, '..', 'budget.html')), out = process.argv[3] || path.join(__dirname, '.out');
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'light' });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(String(e.stack || e)));
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(file); await p.waitForTimeout(700);
  const flat = async sel => (await p.locator(sel).innerText()).replace(/\s*\n+\s*/g, ' | ').replace(/\t+/g, ' ; ');
  const setPaid = async n => { await p.evaluate(v => { const e = document.getElementById('f-paid'); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, n); await p.waitForTimeout(250); };
  console.log('start   ', await flat('.verdict'));
  console.log('stages  ', await flat('#stages tbody'));
  console.log('steps   ', await flat('#note-steps'));
  console.log('who     ', await flat('#who'));
  await p.click('.tabs a[href="#budgets"]'); console.log('budgets ', await flat('#budgets tbody'), '|', await flat('#note-budgets'));
  await p.click('.tabs a[href="#artists"]');
  console.log('queue   ', await flat('#ladder'));
  console.log('facts   ', await flat('#artist-facts'));
  await p.locator('#f-minPct-head').fill('100'); await p.waitForTimeout(300);
  console.log('head100 ', 'mins', await p.locator('#slot-0-7-min').inputValue(), await p.locator('#slot-1-7-min').inputValue(), await p.locator('#slot-2-7-min').inputValue(), '|', await flat('.verdict'));
  await p.locator('#f-minPct-head').fill('75'); await p.waitForTimeout(300);
  console.log('head75  ', 'mins', await p.locator('#slot-2-7-min').inputValue(), '|', (await flat('.verdict')).slice(0, 160));
  await p.click('.tabs a[href="#pay"]');
  for (const label of ['Kinetic Desert', 'Friday 10:30 PM', 'You']) {
    const v = await p.locator('#pay-who option').evaluateAll((os, l) => (os.find(o => o.textContent.includes(l)) || {}).value, label);
    await p.selectOption('#pay-who', v); await p.waitForTimeout(250);
    console.log('pay     ', await flat('#pay-title'), '|', await flat('#pay-terms'), '|', (await flat('#pay-table tbody')).slice(0, 700));
  }
  const crewOpt = await p.locator('#pay-who option').evaluateAll(os => (os.find(o => o.textContent.includes('Gate')) || {}).value);
  await p.selectOption('#pay-who', crewOpt); await p.waitForTimeout(250);
  console.log('pay     ', await flat('#pay-title'), '|', await flat('#pay-terms'), '|', (await flat('#pay-table tbody')).slice(0, 300));
  await p.screenshot({ path: out + '/v13-pay.png', fullPage: true });
  await p.click('.tabs a[href="#overview"]');
  await setPaid(160); console.log('at 160  ', (await flat('.verdict')).slice(0, 260));
  await p.click('#btn-save'); await p.waitForTimeout(200); await p.reload(); await p.waitForTimeout(700);
  console.log('reloaded', (await flat('.verdict')).slice(0, 120));
  await p.click('#btn-reset'); await p.click('#btn-reset'); await p.waitForTimeout(300);
  console.log('reset   ', (await flat('.verdict')).slice(0, 120));
  console.log('errors', JSON.stringify(errs));
  await ctx.close();
  const ph = await b.newPage({ viewport: { width: 400, height: 800 }, colorScheme: 'dark' });
  for (const t of ['overview', 'tickets', 'budgets', 'artists', 'production', 'crew', 'hardcosts', 'pay', 'timeline']) {
    await ph.goto(file + '#' + t); await ph.waitForTimeout(250);
    const o = await ph.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o) console.log('phone overflow', t, o);
  }
  await ph.goto(file + '#pay'); await ph.waitForTimeout(250); await ph.screenshot({ path: out + '/v13-pay-phone.png' });
  console.log('phone checked');
  await b.close();
})();
