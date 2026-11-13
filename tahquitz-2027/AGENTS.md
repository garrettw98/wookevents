# Tahquitz 2027

Planning files for an experimental bass and dubstep campout at Camp Tahquitz, Friday April 23 to Monday April 26, 2027. Music runs Friday to Sunday; everyone is off site Monday. The organiser owns this repository.

This folder was started fresh in November 2026. Everything else in the repository root (index.html, tools.html, FOLT.html, Forecasts/, Proposal.txt and so on) belongs to other projects. Leave it alone unless asked.

## Files

| File | What it is |
|---|---|
| `model.js` | The single source of truth. `DEFAULTS` holds every input; `compute()` and its helpers turn a ticket count into every payment. It runs in the browser and in Node. |
| `PLAN.md` | The written plan. Most of its figures are generated from the model. |
| `budget.html` | The interactive planner. **Built file: do not edit it directly.** |
| `pay-sheet.html` | One-page summary for artists and partners: the event, how the money moves, and every slot's pay at each size. **Built file.** |
| `src/planner-head.html`, `src/planner-body.html` | The planner's source: styles, markup and UI script. `/*MODEL*/` in the body marks where `model.js` is inlined. |
| `src/build.js` | Builds `budget.html`. |
| `src/plan-figures.js`, `src/update-plan.js` | Recompute the figures in `PLAN.md`. |
| `src/pay-sheet.js` | Builds `pay-sheet.html`. |
| `src/test-planner.js` | Drives `budget.html` in a headless browser. |
| `src/.out/` | Scratch output. Not committed. |

## After any change to the model or the page source

Run these from this folder:

```bash
node src/build.js
node src/update-plan.js
node src/pay-sheet.js
node src/test-planner.js
```

- **Node 18 or later** is all the first three need. They have no dependencies.
- **The test needs Playwright with Chromium:** `npm i -D playwright && npx playwright install chromium`. A healthy run ends with `errors []` and `phone checked`.
- **`update-plan.js` rewrites six whole sections of `PLAN.md`:** The short version, How the money scales, What I assumed, Capacity, Budget, and Questions that would change this plan. Their wording lives in `src/plan-figures.js`, so edit the wording there, not in `PLAN.md`, or the next run overwrites it. It also rewrites a handful of figure lines elsewhere (ticket price rows, average ticket, crew pay, drinks, art). Everything else in `PLAN.md` is hand-written and safe to edit directly.
- **A failed match stops the script.** If `update-plan.js` stops with "no match" or "lines in PLAN.md start with", a line it rewrites was edited by hand. Restore the line's start or update the script.

## Rules

- **Compute every figure from the model before writing it.** Never type a number into `PLAN.md` or a page by hand. If a sentence needs a new figure, add it to the generator.
- **The crew's $1 a ticket starts at break-even.** After a change that moves the break-even, set `above` on the three paid crew roles (Setup and strike, Runners, Gate) to the new break-even. Repeat until it stops moving, because the crew pay itself shifts the break-even.
- **Bump `SCHEMA` in `model.js` when the shape of `DEFAULTS` changes.** Saved plans with another schema are ignored, so an old saved plan cannot break the page.
- **Ticket prices are all-in.** California's SB 478 requires the listed price to include every mandatory fee.
- **Write plainly.** Use short, direct sentences and tables for comparisons, and name things the way the organiser does.

## How the model works

- **Stages are limits on people on site:** 199, 350 and 500. The tickets that fit at a stage are the limit minus everyone there without a ticket (crew, artists and guests, partners' places, the medical team). Venue staff never count. Partners, crew roles, other groups and hard costs each have `from`, the stage they start at, and some have `until`.
- **Hard costs are owed whatever sells.** They are:
  - the venue fee of $10 per ticket per day;
  - partner guarantees and per-ticket fees;
  - crew fixed pay, plus $1 a ticket above `above`;
  - permits, medical and porto-potties, by stage;
  - groceries and supplies, a flat amount plus a per-ticket amount;
  - cabins, rented as they sell plus two held back;
  - card fees of 2.9% + 30¢;
  - every artist minimum.
- **Break-even is the first ticket count that covers the hard costs and the budget floors.** In the code this is `coveredAt()`, and the planner shows it as "Commitments covered at".
- **What is above the floors is shared by `budgets`:** Artists 55% (above their minimums), Event 24% (art, drinks, hospitality, marketing, reserve; floor $1,050). The remaining 21% is the organiser's profit.
- **Each artist slot has three settings:** `target` (full fee), `min` (guarantee, a hard cost) and `order` (place in the booking queue). Open slots rise from `min` toward `target` all at the same pace (`rise()`). An agreed slot is paid its minimum plus `rate` for every ticket above `above`, capped at its full fee. A rate of 0 is a flat fee. `minPct` holds the guarantee percent per tier for the planner's controls.
- **The step fund is not profit.** `stage.fund` percent of what is above the floors is held back at that size, from every share alike. Any share with nowhere to go joins it. It pays for the step to the next size and is carried forward if the step never happens.
- **Bigger sizes open as a block from a waitlist.** A bigger size opens at the first count where nobody, the organiser included, is paid less than at the smaller size's sell-out (`releases()`). `stage.release` overrides that count. Between a sell-out and the release, extra buyers are on the waitlist (`soldFor()`).
- **No payment ever falls as tickets rise.** Budgets, artists and profit are held at the previous size's sell-out level until their own share catches up.
- **Saving:** opened as a file, the planner saves to the browser's localStorage under `tahquitz-2027-plan`.

## Decisions the organiser has made

Do not reopen these without asking.

**Venue and permits**
- Capacity is counted as people on site. Up to 199 needs no permit, the camp's own facilities hold 350, and 500 needs porto-potties. The camp sets no rules beyond the law.
- The venue fee is $10 per ticket per day the ticket covers, not charged on crew, artists or Monday.
- The county said only a Temporary Use Permit is needed. It can be filed close to the event, and tickets can go on sale before it is issued. Budget $3,000 until the county quotes it.

**Stages and schedule**
- The Bowl runs until midnight Friday to Sunday. Afters run in the K Lodge (105 people) and The Dome (40) until just past sunrise.
- At 500, the main stage moves to a larger area and The Bowl becomes a side stage run by Project Seismic with their own artists.
- Each day at The Bowl: one-hour sets from 2:00, a sunset changeover at 7:00, then 90-minute sets at 7:30, 9:00 and 10:30.

**Tickets**
- Three ticket types: Fri–Sun, Sat–Sun and Sunday only. Expected spread: 30% / 40% / 30%.
- Prices: Fri–Sun $189 / $209 / $239 / $259, Sat–Sun $145 / $160 / $189, Sunday $85 / $105.
- Car camping: $50, 120 passes.
- Reeguez Rocks (October 2026, same venue) sold 90 tickets. Do not base pricing on it.
- The ticket site is the organiser's own: serverless on AWS, Stripe, QR codes scanned for wristbands at the gate, and a public financials page.

**Partners**
- Kinetic Desert, owned by Travis, does production. Their deal is agreed: $2,000 plus $15 a ticket above 75, no profit share. They get 4 guest places, 15 more above 199 on site and 10 more above 350.
- The Dome: $10 a ticket, up to $2,000.
- Project Seismic comes in at 500 only: $3,000 plus $10 a ticket above the middle sell-out (285), no share of profit or loss, 30 guest places.

**Artists**
- Artist minimums are hard costs. Those artists are announced with ticket sales, and their deposits (50% of the minimum) are paid before they are announced.
- Headliners are guaranteed more because they sell the tickets: 75% as a placeholder. The 9:00 and 7:30 slots get 50%; daytime slots get nothing.
- Friday carries the most money, then Saturday, then Sunday.
- A 10:30 artist may take a flat $1,500.
- Artists book their own flights. They get meals, rides from Ontario or Palm Springs, and lodging: the K Lodge apartment for each night's top three, and a shared cabin if they stay longer. Each artist playing 7:30 or later gets one guest.

**Lodging, food and crew**
- Lodging: 8 cabins at $250 each for the whole event. Cabins sell to guests at $850.
- Chef: $1,000. Above 350 a second chef comes in, and the kitchen also feeds Project Seismic, Kinetic Desert's guests and crew, and every artist. Bulk drinks for everyone.
- Crew: 4 from Kinetic Desert, plus 8 crew and 4 gate staff. The 12 are paid $100 each in the break-even, plus $1 a ticket after break-even, and get a ticket and a car pass. Each works three 3-hour shifts. Gates are open 10 AM to 10 PM.

**Insurance and medical**
- Insurance: $750.
- Above 199 on site, a medical team at $600 a day from Friday 10 AM to Monday 10 AM. They count toward people on site.
- At 199 or fewer, a $500 venue medical rep plus a $200 kit kept at The Bowl's cabin, with the organiser leading on it.

**How the money works**
- Three buckets share what is above the floors: artists, the event, and the organiser.
- The organiser's take must never fall as tickets rise.
- Step fund: 50% at the small size, kept out of profit.
- Bigger sizes open as waitlist blocks. The 500 size is a stretch: open its waitlist only if 285 have sold by March 1.
- Groceries and supplies are budgeted per ticket.
- Everyone is settled once, after the event, on the final ticket count, using each person's pay table.

**Rejected**
- Planning for 500 from day one (break-even 229).
- Artist minimums at 40%.
- Cutting Kinetic Desert's guest places.

## Open questions

- **Sunday-only on-sale date.** The calendar opens them on March 23, after the March 15 waitlist deadline, and they are expected to be 30% of sales. Either open them on February 9 or move the deadline.
- **Friday versus Sunday.** With the 30/40/30 spread, Friday's headliner plays to the smallest crowd. Should money move from Friday toward Sunday?
- **Daytime pay.** Daytime sets earn $3 to $21 at a 151-ticket sell-out.
- **The 500 size.** Artist pay does not rise there, because every full fee is reached at about 284 tickets.
- **Inputs still to confirm:** real headliner quotes, the real permit fee and how long the county takes to issue it, whether The Dome or the venue has a minimum, whether County Fire and structure permits are separate, and whether the drinks include alcohol.

## Outside this repository

- **claude.ai copies.** The planner and the pay sheet were also published as claude.ai pages. They will not be updated from here, so treat the files in this folder as the current versions.
- **Privacy.** This repository is public, so everything in this folder can be read by anyone, including artist fees and guarantees.
