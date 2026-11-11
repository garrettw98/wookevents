# Camp Tahquitz, April 23–26, 2027: event plan

Experimental bass and dubstep campout. Three days of music at The Bowl, afters at the K Lodge and The Dome until sunrise, everyone off site Monday.

The numbers in this plan come from one planning model. Open [`budget.html`](budget.html) to change any input and see every budget, what each partner is paid and your profit update.

## The planner

[`budget.html`](budget.html) is organised in eight sections. Profit, the ticket count that covers your commitments, people on site and your take stay pinned at the top.

| Section | What it holds |
|---|---|
| Overview | Tickets sold so far, the ticket count you are planning on, the artists' share, how every budget grows with sales, who gets what at each size, the scale stages with the step fund and the waitlist each step up needs, and the full profit and loss |
| Tickets | Ticket mix, every price tier, add-ons and card fees |
| Budgets | Every budget that grows with sales: its share of the surplus, floor, cap and what is committed |
| Artists | The booking queue: each night slot's minimum, deposit and full fee, the ticket count at which sales cover it, and the terms once an artist agrees |
| Production | One card per partner: minimum guarantee, per-ticket fee and the ticket count it starts at, the stage it comes in at, any profit share, and the places it is given at each stage |
| Crew | One row per role with people, fixed pay, the per-ticket rate and what each person earns, shifts each, shifts needed and coverage |
| Hard costs | The mandatory costs, each charged flat, per ticket, per ticket per day or per person, with the stage it starts and stops at |
| Timeline | Dated tasks with an owner and a done box |

Partners, crew roles, budgets, hard costs, stages and timeline rows can all be added and removed.

**Saving.** Save plan stores the plan for everyone you share the page with. Changes you have not saved stay yours, so you can try a what-if without disturbing the saved plan. The copy in this repository saves in your browser only.

## The short version

1. **Break-even is 114 tickets.** That covers every hard cost, including the minimums for all nine 90-minute slots and $100 for each of the 12 paid crew. Reeguez Rocks sold 90, so the event has to sell about a quarter more before anyone is ahead.
2. **The nine artist minimums are hard costs: $7,675.** Those artists are announced with the ticket sales and their deposits are paid first, so the plan treats them as owed whatever sells.
3. **Most sales come late, so the artist deposits come from you first.** At 50% they are $3,838. The permit can wait: a Temporary Use Permit can be filed close to the event, once sales show which size you are running.
4. **Crew pay is $100 each in the break-even, plus $1 each for every ticket sold above 114.** That is $127 each at 141 tickets, $261 at 275 and $370 at 384.
5. **Below break-even the loss is yours.** At 90 tickets it is about $3,300, and at 75 about $6,000.
6. **Above break-even, every artist rises from their minimum toward their full fee at the same pace.** Everyone is at their full fee by about 263 tickets.
7. **A flat deal saves the rise.** A 10:30 headliner on a flat $1,500 costs nothing extra at low sales. At a 275-ticket sell-out it puts $1,500 more into the step fund, and at the 500 size it is $1,500 more for you.
8. **Neither production partner shares the profit.** Kinetic Desert has agreed to $2,000 plus $15 for every ticket above 75. Project Seismic is on $3,000 plus $10 for every ticket above 275.
9. **141 tickets is home base.** That is a sell-out under the permit line: artists receive about $8,900, you take about $460, and $2,188 is in the step fund.
10. **The step fund is not your profit.** Half of everything above break-even at the small size goes into it, along with any share that has nowhere to go. It pays for the step up. If you never step up, it is carried forward.
11. **Your take only ever rises with ticket sales.** A larger size is sold as one block from a waitlist: 22 buyers for the step past 141 tickets and 53 for the step past 275. Nobody, you included, is paid less after a step.
12. **At a 275-ticket sell-out artists receive their full $18,325, you take about $4,600 and $1,452 is in the step fund.** At a 384-ticket sell-out you take about $11,900.
13. **Stay on Stripe for the ticket site and list all-in prices.** The permit is a Temporary Use Permit, and tickets can go on sale before it is issued.
14. **Stagecoach is the same weekend (April 23–25) in Indio.** Porto-potties, generators and rental cars will be tight.

## Ticket site and payments

You are building your own site on AWS with Stripe, as you did for Reeguez Rocks, with QR tickets scanned at the gate for a wristband.

### What each way of paying costs

| Method | Fee | On a $195 ticket | On an $850 cabin |
|---|---|---|---|
| Card through Stripe, including Apple Pay, Google Pay and Link | 2.9% + 30¢ | $5.96 | $24.95 |
| Bank debit through Stripe (ACH) | 0.8%, capped at $5 | $1.56 | $5.00 |
| Stripe instant bank payment | 2.6% + 30¢ | $5.37 | $22.40 |
| Card through an interchange-plus processor such as Helcim | Card network cost + 0.5% + 25¢. Helcim says online averages under 2.5% | about $4.90 or less | about $21 or less |
| Card in person, Stripe Tap to Pay on a phone | 2.7% + 15¢ | $5.42 | |
| Klarna through Stripe | 5.99% + 30¢ | $11.98 | $51.22 |
| Cash at the gate | none | $0 | |

Stripe figures are from its pricing page. Stripe's hosted Checkout adds no fee.

### Recommendation

**Stay on Stripe.** You have a working integration and an account with payment history. Total fees at a sell-out are about $1,700. Moving to an interchange-plus processor would save roughly $300 on this event and means rebuilding the checkout on a new account. Revisit it when you are running at 500 or several events a year.

**Spend the effort on a smooth checkout.** One abandoned sale loses $195. The fee on a completed one is $6. Turn on Apple Pay, Google Pay and Link, and keep the purchase to one screen.

**Offer pay-by-bank on cabins and big orders.** It saves about $20 on a cabin and about $4 on a single ticket. The trade-offs:

- The money takes about four business days to arrive, and a payment can fail after the buyer thinks they are done.
- Third-party guides list a $4 fee for a failed payment and $1.50 for instant bank verification. Neither is on Stripe's pricing page, so check your account.
- Stop offering it about ten days before the event.

If 30% of sales went by bank, fees would drop by about $370.

**List all-in prices.** California's honest pricing law covers event tickets. The Attorney General's guidance says the listed price must be the full price, and that adding a percentage or variable service fee later in the purchase is not allowed. You can show a breakdown of what is inside the price, and you can offer discounts. That makes a "save $20 paying by bank" offer on cabins fine, and a "plus 3% card fee" line not.

**Things that quietly cost money:**

- **Refunds.** Stripe keeps the original fee when you refund. Build ticket transfers so a buyer who cannot come passes the ticket on, and the QR is reissued.
- **Disputes.** $15 each, plus $15 to contest one, returned if you win. A clear name on the card statement, an emailed receipt and your scan log are the evidence.
- **Payment plans.** Build your own two-payment option. Two card charges cost one extra 30¢. Klarna costs twice the card rate.
- **Instant payouts** cost 1.5%. Standard payouts are free.
- **Stripe Tax** costs 0.5% per transaction. My understanding is that California does not tax admission but does tax merchandise, so ask the state tax agency or an accountant before paying for it.

**At the gate.** Cash is free. Tap to Pay on a phone needs no hardware but does need signal.

### Build notes

- **Waitlist at a sell-out.** When the current size sells out, switch to a waitlist that saves a card without charging it, and charge the whole list together when you release the next size.
- **Enforce the caps in code.** The site should stop sales at 141, 275 or 384 depending on the level you are operating at, and issue crew, artist and partner guest places as $0 tickets from the same system. Then the on-site count is always known.
- **Tier inventory.** Use conditional writes so two buyers cannot take the last ticket in a tier, and release held tickets when a checkout session expires.
- **Issue tickets from Stripe's webhook**, verified and safe to receive twice. Do not issue from the browser redirect.
- **Scanner.** Keep what worked at Reeguez Rocks. Make sure it still scans with no signal, from a list synced beforehand.
- **Add-ons after purchase.** Car camping, cabins, merch and the meal plan should be addable to an existing order.

### Financials page

- **Source of truth:** Stripe's balance transactions give gross, fee and net for every charge. Sync them to your database and the page never needs hand entry for income.
- **Show:** tickets sold by tier against the cap, money in by line, fees actually paid, costs against budget by category, how many tickets still stand between you and covering your commitments, and what each partner is paid.
- **Decide before launch:** whether individual artist fees are shown or only the category total. Artist contracts often expect the fee to stay private.
- The categories in the budget model can be the budget column, so plan and actuals line up.

## Permits

### What the county told you, and what the code says

You were told the camp's existing approval covers the gathering itself, and that this event needs a Temporary Use Permit for the temporary structures and sound.

The county's development code supports that. Section 84.25.030 exempts "events on sites already approved for public assembly" from needing a temporary use permit. The heavier Temporary Special Event Permit attaches to events that are not exempt.

### The Temporary Use Permit

From the county's Temporary Use Permit information sheet, revised June 4, 2025:

- **What to submit:** a letter of intent describing the temporary use, a site plan, supporting material such as drawings and pictures, and bond paperwork if a bond is required.
- **How it runs:** you apply through the county's EZOP portal and are invoiced once the application is complete. A planner reviews it and may route it to other agencies, then approves it "as quickly as possible" once the standards are met.
- **Standards:** access, heights, parking, setbacks, signs and utilities, plus removal of everything and restoration of the site. The county can ask for a performance bond.
- **Deadline:** the sheet states none, and you can file close to the event. That lets you decide on real sales whether you need the permit at all. Ask the planner how long they take to issue one and work back from that.
- **Ticket sales:** tickets can go on sale before the permit is issued. The sheet has no hold on sales or advertising, and the county confirmed that to you last year.
- **Fee:** the 2025–26 county fee schedule lists a Major Temporary Use Permit at a flat $2,108. I could not find the minor fee or the 2026–27 figure. Your $3,000 ballpark is a reasonable budget until the county quotes it.

### What may still be separate

These come from other agencies' own pages, so ask whether the Temporary Use Permit covers them.

- **County Fire.** Its special event page says a fire permit is needed for an outdoor public assembly of 200 or more, and for any tent over 400 square feet. A 24-foot dome is about 452 square feet. Applications go in at least 30 days ahead.
- **A Temporary Structure Permit from Building and Safety.** The county's sheet covers temporary non-residential structures used for assembly, says it is approved only after Planning approves the Temporary Use Permit, and asks for engineered plans. Whether a stage and truss fall under it is a question for the planner. Have Kinetic Desert's dimensions and heights ready.
- **Environmental Health.** Only if food is sold or served to attendees: vendors, the meal plan, a brunch for everyone.
- **Noise.** The county standard for sound heard at a residence is 55 dB(A) from 7:00 AM to 10:00 PM and 45 dB(A) overnight. You have run sound on this property and found it is not an issue at the property line, which is where it counts. A permit for sound may still come with hours, so state the midnight outdoor cut-off in the letter of intent.

### Questions left for the planner

Land Use Services, 909.387.8311.

1. Which type of Temporary Use Permit this is, and the fee.
2. How long before the event the application should go in.
3. Whether the stage, truss and Dome need a separate structure permit or engineered plans.
4. Whether the application is routed to County Fire or you apply there yourself.
5. Whether the permit is needed at all below 200 people.

The camp itself sets no rules beyond the law and its bathroom capacity: 350 people on the existing facilities, up to 500 with porto-potties brought in.

## How the money scales

### The rule

1. **Money in.** Tickets, cabins, car camping, and merch, meals and vendors.
2. **Mandatory hard costs come off first.** The venue fee, permits, insurance, medical, what the production partners are owed, the artist minimums, crew pay, cabin rental, the chef, groceries for crew and artists, site supplies and card fees. These are owed whatever sells.
3. **What is left is the surplus.** Every other budget takes a fixed share of it.
4. **The share nobody takes is your profit.**
5. **Each size holds back a step fund.** At the small size, half of everything above the floors is held back from every share alike. Any share that has nowhere to go joins it, such as the artists' share once every artist is at their full fee. The fund pays for the step up. It is not your profit, and if the step is never taken it is carried forward.
6. **Your profit rises at its own share, like every other line, and never falls.** A larger size is sold as one block: buyers past a sell-out wait, uncharged, until enough are waiting that nobody is paid less after the step.

### The shares

| Budget | Share of the surplus | Floor |
|---|---|---|
| Artists, above their minimums | 55% | none: the minimums are already hard costs |
| Art, projection and lighting | 9% | $500, which is path lighting |
| Drinks for everyone | 7% | none |
| Reserve for surprises | 4% | none |
| Marketing and design | 2% | $250 |
| Artist hospitality and airport runs | 2% | $300 |
| **Your profit** | **21%** | |

Crew pay used to be a 6% share. It is now a hard cost, and that 6% is part of your profit.

Up to 141 tickets each share pays half its rate, because half of what is above the floors goes into the step fund.

### What each ticket count buys

| Tickets sold | 90 | 114 | 120 | 141 | 200 | 275 | 384 |
|---|---|---|---|---|---|---|---|
| People on site | 148 | 172 | 178 | 199 | 275 | 350 | 500 |
| Money in | $18,835 | $23,623 | $24,820 | $29,993 | $43,410 | $62,230 | $87,256 |
| Mandatory hard costs | $21,092 | $22,443 | $22,853 | $24,566 | $34,193 | $39,177 | $56,516 |
| **Surplus to share** | **−$2,257** | **$1,180** | **$1,967** | **$5,427** | **$9,217** | **$23,053** | **$30,740** |
| Artists above their minimums | $0 | $36 | $252 | $1,204 | $4,492 | $10,650 | $10,650 |
| Art, projection and lighting | $500 | $506 | $541 | $697 | $1,235 | $2,480 | $3,172 |
| Drinks for everyone | $0 | $5 | $32 | $153 | $572 | $1,540 | $2,078 |
| Reserve for surprises | $0 | $3 | $18 | $88 | $327 | $880 | $1,188 |
| Marketing and design | $250 | $251 | $259 | $294 | $413 | $690 | $844 |
| Artist hospitality and airport runs | $300 | $301 | $309 | $344 | $463 | $740 | $894 |
| **Your profit** | **−$3,307** | **$14** | **$96** | **$460** | **$1,715** | **$4,621** | **$11,914** |
| Step fund, not counted in your profit |  | $65 | $459 | $2,188 |  | $1,452 |  |

From about 263 tickets every artist is at their full fee, and the artists' share goes into the step fund. At the 500 size there is no further step, so everything left is your profit. That is why your take climbs fastest there.

### Who gets what, at every size

For everyone but you these are payments, not profit after their own costs. Your column is profit or loss.

**Up to 199 on site, no permit**

| Tickets | Camp | Kinetic Desert | The Dome | Artists, all 24 sets | Each paid crew | Step fund | You |
|---|---|---|---|---|---|---|---|
| 50 | $2,525 | $2,000 | $500 | $7,675 | $100 |  | −$9,869 |
| 75 | $3,163 | $2,000 | $750 | $7,675 | $100 |  | −$6,011 |
| 90 | $3,795 | $2,225 | $900 | $7,675 | $100 |  | −$3,307 |
| 100 | $4,050 | $2,375 | $1,000 | $7,675 | $100 |  | −$1,875 |
| **114, break-even** | $4,407 | $2,585 | $1,140 | $7,711 | $100 | $65 | **$14** |
| 125 | $4,688 | $2,750 | $1,250 | $8,108 | $111 | $787 | $165 |
| **141, sell-out** | $5,346 | $2,990 | $1,410 | $8,879 | $127 | $2,188 | **$460** |

**200 to 350 on site, with the permit and the medical team**

Tickets 142 to 162 are the waitlist. Nobody is charged and nothing changes for anyone until it is released.

| Tickets | Camp | Kinetic Desert | The Dome | Artists, all 24 sets | Each paid crew | Step fund | You |
|---|---|---|---|---|---|---|---|
| **163, released as a block** | $5,407 | $3,320 | $1,630 | $8,912 | $149 |  | **$472** |
| 178 | $5,789 | $3,545 | $1,780 | $10,103 | $164 |  | $927 |
| 200 | $6,600 | $3,875 | $2,000 | $12,167 | $186 |  | $1,715 |
| 225 | $7,488 | $4,250 | $2,000 | $14,773 | $211 |  | $2,710 |
| 250 | $8,125 | $4,625 | $2,000 | $17,117 | $236 |  | $3,605 |
| **275, sell-out** | $9,013 | $5,000 | $2,000 | $18,325 | $261 | $1,452 | **$4,621** |

**351 to 500 on site, with porto-potties and the second stage**

Tickets 276 to 327 are the waitlist.

| Tickets | Camp | Kinetic Desert | The Dome | Project Seismic | Artists, all 24 sets | Each paid crew | Step fund | You |
|---|---|---|---|---|---|---|---|---|
| **328, released as a block** | $10,364 | $5,795 | $2,000 | $3,530 | $18,325 | $314 |  | **$4,775** |
| 350 | $10,925 | $6,125 | $2,000 | $3,750 | $18,325 | $336 |  | $7,769 |
| **384, sell-out** | $11,792 | $6,635 | $2,000 | $4,090 | $18,325 | $370 |  | **$11,914** |

- **You are the only one who can lose money, and only below 114 tickets.** Everyone else is paid at every level.
- **Nobody is paid less after a step up, you included.** The step is paid from the fund and the waitlist block.
- **The step fund is not paid to anyone.** It is spent on the step, or carried forward if the event stays at that size.
- **Camp** is the venue fee plus cabin rental, plus the $500 medical rep at the small size only.
- **Not shown:** the chef is paid $1,000 at every level, with a second chef at $1,000 above 350 on site.

### The crew

Each of the 12 paid crew (setup and strike, runners, gate) gets **$100 whatever sells, plus $1 for every ticket sold above 114.** Both are hard costs, and the $100 is in the break-even.

| Tickets sold | 90 | 114 | 120 | 141 | 200 | 275 | 384 |
|---|---|---|---|---|---|---|---|
| Each crew member | $100 | $100 | $106 | $127 | $186 | $261 | $370 |
| All 12 | $1,200 | $1,200 | $1,272 | $1,524 | $2,232 | $3,132 | $4,440 |

I read your $1 a ticket as $1 to each crew member, counted from the break-even on. The rate and the ticket count it starts at are inputs on the Crew tab, one per role. The other readings:

| Reading | Break-even | Each at 141 | Each at 275 | Your take at 275 |
|---|---|---|---|---|
| **$1 each, on tickets above 114** | **114 tickets** | **$127** | **$261** | **$4,621** |
| $1 each, on every ticket from the first | 124 | $241 | $375 | $4,333 |
| $1 a ticket into one pot, split between the 12 | 114 | $112 | $123 | $4,969 |

### The artists

**The minimums.** Each of the nine 90-minute slots has a minimum, set at half its full fee. All nine are hard costs.

| Queue | Slot | Minimum | Deposit at 50% | Full fee | Minimums so far | Covered at |
|---|---|---|---|---|---|---|
| 1 | Friday 10:30 PM | $1,500 | $750 | $3,000 | $1,500 | 74 tickets |
| 2 | Saturday 10:30 PM | $1,500 | $750 | $3,000 | $3,000 | 85 |
| 3 | Sunday 10:30 PM | $1,125 | $563 | $2,250 | $4,125 | 90 |
| 4 | Friday 9:00 PM | $1,000 | $500 | $2,000 | $5,125 | 96 |
| 5 | Saturday 9:00 PM | $750 | $375 | $1,500 | $5,875 | 101 |
| 6 | Sunday 9:00 PM | $625 | $313 | $1,250 | $6,500 | 105 |
| 7 | Friday 7:30 PM | $500 | $250 | $1,000 | $7,000 | 109 |
| 8 | Saturday 7:30 PM | $375 | $188 | $750 | $7,375 | 111 |
| 9 | Sunday 7:30 PM | $300 | $150 | $600 | $7,675 | 114 |

The queue is the order to book and announce in. "Covered at" is the ticket count at which sales pay for the other hard costs plus every minimum down to that row. The last row is the break-even for the whole lineup.

Because most sales come late, the deposits go out before the tickets that cover them have sold. Treat the $3,838 as money you put in up front and get back from sales.

**The rise.** Past break-even, 55% of the surplus lifts every open slot from its minimum toward its full fee. Each slot rises in proportion to how far it has to go, so they all arrive together. Up to 141 tickets the rise runs at half pace, because half goes into the step fund. It catches up after the step.

| Tickets sold | 114 | 120 | 141 | 200 | 263 and up |
|---|---|---|---|---|---|
| Friday 10:30 PM, $1,500 minimum | $1,505 | $1,536 | $1,670 | $2,133 | $3,000 |
| Friday 9:00 PM, $1,000 minimum | $1,003 | $1,024 | $1,113 | $1,422 | $2,000 |
| Friday 6:00 PM, daytime, no minimum | $2 | $12 | $57 | $211 | $500 |

**Daytime slots** have no minimum, so they cost nothing below break-even. They are paid from 114 tickets on, which suits friends who will play for a per-ticket payment after a ticket count.

**Agreeing a deal.** When an artist agrees, tick Agreed on their slot. They are paid the minimum, plus a rate per ticket on every ticket above a ticket count, up to the full fee. The planner fills in a rate that follows the plan. Change it to what you actually agreed.

**A flat deal.** Set the rate to 0 and the artist is paid the minimum and nothing more. What they would have risen by goes to the other slots first. Once those are at their full fees it goes into the step fund, and at the 500 size it is yours.

| Deal | Step fund at 275 | Waitlist for the 500 size | Your take at 384 |
|---|---|---|---|
| Every slot rising to its full fee | $1,452 | 53 buyers | $11,914 |
| Friday's headliner on a flat $1,500 | $2,952 | 43 | $13,414 |
| All three headliners flat at their minimums | $5,577 | 27 | $16,039 |

A flat deal does not move the break-even, because the minimum was already counted. It only changes what happens above it.

**What moves the break-even** is the size of the minimums. At 40% of each full fee instead of half, break-even is about 103 tickets.

### The production partners' deals

Both partners are on the same shape as the artists and the crew: a guarantee, then a fee on tickets past a threshold, and no share of the profit.

| Partner | Guarantee | Fee | Comes in |
|---|---|---|---|
| Kinetic Desert, agreed | $2,000 | $15 for every ticket above 75 | From the first ticket |
| Project Seismic | $3,000 | $10 for every ticket above 275 | Above 350 people on site |
| The Dome | none | $10 for every ticket, up to $2,000 | From the first ticket |

Kinetic Desert earns $2,225 at 90 tickets, $2,990 at 141, $5,000 at 275 and $6,635 at 384. They do not share a loss, and you keep all of the profit.

### What sets the break-even

| Commitment | What it adds |
|---|---|
| Artist minimums for the nine night slots | $7,675, the largest single commitment |
| $100 for each of the 12 paid crew | $1,200, which moves break-even from 105 tickets to 114 |
| Cabins rented as they sell | One 9-bed cabin sells per 45 tickets, up to six. You rent what sells plus two for artists and staff |
| Smaller grocery and supply orders at the small size | $2,000 and $800 up to 199 on site, $2,800 and $1,200 above |

### 141 is home base, and how a step up works

A sell-out under the permit line is 141 tickets. Ticket 142 brings in the permit, the medical team, the larger grocery and supply orders and 15 more Kinetic Desert guests, about $5,200 at once.

**Two things pay for that step, and neither is your profit.**

1. **The step fund.** Half of everything above the floors at the small size is held back, from every share alike. At 141 tickets it holds $2,188.
2. **A waitlist block.** At 141 tickets the site sells out and switches to a waitlist. Buyers save a card and are not charged. When 22 are waiting they are all charged together and the event steps up at 163 tickets. If the list has not reached 22 by the deadline, nobody is charged and the event runs at 141.

| | Past 141 tickets | Past 275 tickets |
|---|---|---|
| New cost at the step | about $5,200 | about $9,600 |
| Step fund at the sell-out | $2,188 | $1,452 |
| Waitlist needed | 22 buyers | 53 buyers |
| Sold together at | 163 tickets | 328 tickets |
| Artists before and after | $8,879 → $8,912 | $18,325 → $18,325 |
| Your take before and after | $460 → $472 | $4,621 → $4,775 |

**Your take never falls.** It rises at its own share with every ticket, at the same pace as the artists and the budgets, and a step is only taken when it leaves you at least where you were. Stepping up no longer costs you anything you had.

**If the event stays at 141 or 275,** the fund is not spent. It is carried forward: to the next event, or to whatever you decide at settlement. It is still money you control. The plan just does not count it as your take, so that your take cannot make a bigger event look worse.

**The fund size is your dial.** A bigger fund means a smaller waitlist block and a slower rise at the small size.

| Fund at the small size | In the fund at 141 | Artists at 141 | You at 141 | Waitlist needed |
|---|---|---|---|---|
| 0% | $0 | $10,082 | $919 | 37 buyers |
| 25% | $1,094 | $9,480 | $689 | 30 buyers |
| **50%, the plan** | $2,188 | $8,879 | $460 | 22 buyers |
| 75% | $3,283 | $8,277 | $230 | 15 buyers |
| 100% | $4,377 | $7,675 | $0 | 7 buyers |

After the step everyone rises at the full rate: artists are at $10,103 by 178 tickets and $12,167 at 200, and you are at $927 and $1,715.

**The step past 275 is funded by the artists' share** once every artist is at their full fee, which leaves $1,452 in the fund at a sell-out and a block of 53. A fund at the middle size shrinks the block and slows the artists:

| Fund at the middle size | In the fund at 275 | Artists at 275 | You at 275 | Waitlist needed |
|---|---|---|---|---|
| **0%, the plan** | $1,452 | $18,325 | $4,621 | 53 buyers |
| 10% | $2,442 | $18,325 | $4,159 | 46 buyers |
| 25% | $5,501 | $16,751 | $3,465 | 27 buyers |

**Other ways to make the blocks smaller:**

- **Get the real permit fee.** At the county's listed $2,108 the blocks are 16 and 49 buyers.
- **Add $10 to every ticket.** The blocks are 16 and 41, and artists get $9,255 at 141 tickets. This is the only lever that brings in new money, if it does not cost you sales.
- **Both together:** 10 and 38 buyers.

**On the ticket site.** Stripe can save a card without charging it and charge it later. My understanding is that there is no fee until the charge. A few saved cards will be declined when charged, so release when the list is a few over the count.

**Set the waitlist deadline at March 15.** County Fire asks for its application 30 days ahead, which is March 24, and the permit, porto-potties and medical team all need lead time with Stagecoach on the same weekend. Move it later if the county's turnaround and your vendors allow.

### Working with it

- **Enter tickets sold after every sales push.** The top bar shows how many tickets still stand between you and break-even, and the queue shows which minimums sales have covered.
- **Book in queue order.** Friday's headliner first, so the name is on the poster while the rest is confirmed.
- **Have the deposit money ready:** $750 for Friday's headliner and $3,838 for all nine. The permit is not an early cost. It is paid close to the event, and only if you go past 141 tickets.
- **Push for flat deals at the top.** Every headliner on a flat minimum is money that stays with the other artists and with you.
- **Commit art, drinks and marketing late**, from the final figures.

## What I assumed

Each of these is an input in the planner.

| Assumption | Value used | Why it matters |
|---|---|---|
| The budget shares | 55% artists, 9% art, 7% drinks, 4% reserve, 2% marketing, 2% hospitality | My split. It leaves 21% as your profit |
| Kinetic Desert's fee | $15 for every ticket above 75, on top of the $2,000 | Agreed with Kinetic Desert |
| Crew pay | $100 each for the 12 paid crew, plus $1 each for every ticket above 114 | The $100 is in the break-even. Counting the $1 from the first ticket would put break-even at 124 |
| Step fund | Half of everything above the floors at the small size, plus any share with nowhere to go. Not counted as your profit, and carried forward if the step is never taken | Your choice. A bigger fund means a smaller waitlist block and a slower rise at the small size |
| Artist minimums | Half the full fee for the nine 90-minute slots, none for daytime. All nine are hard costs | They set the break-even. A real quote replaces each one |
| Artist deposits | 50% of the minimum, paid before the artist is announced | The usual booking term. It is cash you need before the first lineup |
| Cabin sales | One cabin per 45 tickets, up to six | My guess at how cabins track attendance. Six cabins hold about a fifth of a 275-ticket crowd |
| Small-event groceries and supplies | $2,000 and $800 | My estimate of what a crowd under 200 needs |
| Crew, artists and their guests | 58 up to 199 on site, 60 above | The base that every limit is counted from. Venue reps never count |
| Card fees | 2.9% + 30¢, all sales by card | About 3% of online sales |
| Permits | $3,000 at 200 or more on site | Your ballpark. The one county figure I found is $2,108 |
| Extra cost above 350 | $2,500 porto-potties, $1,000 second chef, $2,500 more groceries, $800 supplies | The grocery and porto-potty figures are guesses |
| Car camping demand | One pass per five tickets | 95 of the 120 spots are for sale after 25 crew passes |
| Ticket mix | 65% Fri–Sun, 25% Sat–Sun, 10% Sunday | Drives average ticket price and the venue fee |
| Merch, meal plan and vendor income | $10 per ticket | Untested. Without it and with half the car passes, break-even rises from 114 to 128 |

I could not verify current booking fees for Pando!, Chmura, Huck.Jorris or Ferrofluid.

## Capacity

Every limit is counted on people on site. Guest lists grow as the event does, so the number of tickets you can sell steps at each stage.

| People on site | Without a ticket | Tickets that fit | Sold as a block at | What switches on |
|---|---|---|---|---|
| Up to 199 | 58 | 141 | 114 tickets cover it | The base plan, with the venue's medical rep and your own kit |
| 200 to 350 | 75 | 275 | 163 tickets | Permits, the medical team, larger grocery and supply orders, 15 Kinetic Desert guests |
| 351 to 500 | 116 | 384 | 328 tickets | Porto-potties, Project Seismic and their 30 places, 10 more Kinetic Desert guests, a second chef, more groceries and supplies |

### The 500 size and Project Seismic

The main stage moves to a larger area with Kinetic Desert's production, and The Bowl becomes a side stage run by Project Seismic with their own artists. They need about $3,000 for rentals.

Their deal: **$3,000 guaranteed, plus $10 for every ticket sold above 275, and no share of the profit.**

| Deal | They earn at 340 / 360 / 384 tickets | You at 384 | Released at |
|---|---|---|---|
| $3,000 flat | $3,000 / $3,000 / $3,000 | $12,743 | 324 tickets |
| **$3,000 plus $10 a ticket above 275** | **$3,650 / $3,850 / $4,090** | **$11,914** | **328** |
| $3,000 plus 10% of profit | $3,704 / $3,963 / $4,274 | $11,469 | 327 |

- **Their rentals are covered for certain.**
- **Their upside is tied to the tickets the bigger event adds**, which is the thing they are there to help sell.
- **There is no loss-sharing to argue about**, because they have no share.

Their guest list is 30. Cutting it to 20 would free ten tickets and add about $1,200 to your take at a sell-out.

Your take at the 500 size is $4,775 at 328 tickets, $7,769 at 350 and $11,914 at 384.

The 500 size costs about $0 more in hard costs before the per-ticket fees, and 41 more places that cannot be sold. Afters still hold 145 people indoors, so at 500 on site that needs a third space or a late slot on one of the two stages.

## Tickets

### Price ladder

Tiers sell in order. Averages are at a 275-ticket sell-out. These are the prices buyers pay, with nothing added at checkout.

| Ticket | Presale | Tier 1 | Tier 2 | Final | Average at sell-out |
|---|---|---|---|---|---|
| Fri–Sun | $179 × 25 | $199 × 60 | $219 × 50 | $239 × the rest | $212 |
| Sat–Sun | none | $149 × 20 | $165 × 30 | $179 × the rest | $164 |
| Sunday only | none | none | $89 × 15 | $95 × the rest | $92 |

- Every price is $10 higher than the first ladder, and the presale tier is 25 tickets instead of 50. Both matter most at low sales, where nearly every ticket is an early one.
- Early tickets are the cheap ones, so the average is about $170 at 90 tickets and $188 at 275.
- The $40 gap between Fri–Sun and Sat–Sun is deliberately small. It makes Friday feel close to free, which pushes people to arrive Friday.
- Hold Sunday-only tickets until set times are out, about a month before.
- Each Fri–Sun ticket nets its price less the $30 venue fee and about $6 of card fees. The Dome fee is capped at $2,000, so it stops costing anything after the 200th ticket.
- Add single-day Friday or Saturday tickets only if sales are behind in March.

### Add-ons

| Add-on | Price | Notes |
|---|---|---|
| Car camping pass | $50 | 120 spots: 25 comped to crew and volunteers, 95 for sale |
| Whole cabin, 9 beds, three nights | $850 | About $94 a bed. Up to six for sale, rented from the camp only as they sell. Put them in the presale: nights will be near freezing |
| Hoodie or shirt pre-order | $60–$65 | Pre-order only, so there is no leftover stock |
| Meal plan | about $45 for three dinners | Cap it at 60. Ask Environmental Health about food permits first |
| Vendor spots | $200 flat | One coffee and breakfast vendor matters more than the fee |

### On-sale calendar

| Date | What happens |
|---|---|
| Dec 1–15 | Reeguez Rocks alumni presale: 25 Fri–Sun at $179, then $199, plus cabins. The first sales figure to enter in the planner |
| Jan 12 | First lineup announcement. Tier 1 opens, Sat–Sun tickets open |
| Feb 9 | Full lineup. Tier 2 opens when Tier 1 sells through |
| Mar 15 | Waitlist deadline. Release it if it has reached the count for the next size |
| Mar 23 | Set times out. Sunday-only tickets open |
| Apr 9 | Final tier |

The ticket site has to be live by December 1 for the presale.

## Budget

The plan at a 275-ticket sell-out, with every artist at their full fee.

| Money in | |
|---|---|
| Tickets, 275 at a $188 average | $51,630 |
| Cabins, 6 at $850 | $5,100 |
| Car camping, 55 passes at $50 | $2,750 |
| Merch, meal plan, vendors | $2,750 |
| **Total in** | **$62,230** |

| Mandatory hard costs | |
|---|---|
| Artist minimums, 9 slots | $7,675 |
| Venue fee, 701 ticket-days at $10 | $7,013 |
| Kinetic Desert: $2,000 plus $15 on 200 tickets | $5,000 |
| Crew: 12 at $100, plus $1 each on 161 tickets | $3,132 |
| Permits | $3,000 |
| Groceries for crew and artists | $2,800 |
| The Dome, at its cap | $2,000 |
| Cabin rental, 8 at $250 | $2,000 |
| Payment processing | $1,807 |
| Medical team, 3 days at $600 | $1,800 |
| Site supplies: wristbands, signage, radios, trash, firewood | $1,200 |
| Chef | $1,000 |
| Insurance | $750 |
| **Total hard costs** | **$39,177** |

**Surplus to share: $23,053.**

| Budgets that grow with sales | Share | At 275 tickets |
|---|---|---|
| Artists, above their minimums | 55% | $10,650, which takes every slot to its full fee |
| Art, projection and lighting | 9% | $2,480 |
| Drinks for everyone | 7% | $1,540 |
| Reserve for surprises | 4% | $880 |
| Artist hospitality and airport runs | 2% | $740 |
| Marketing and design | 2% | $690 |
| **Total budgets** | | **$16,981** |

**Step fund: $1,452.** This is the part of the artists' share left over once every artist is at their full fee. It pays for the step to the 500 size, or is carried forward.

**Profit: $4,621, all yours.** Artists receive $18,325 in all.

### Moving the artists' share

A lower share slows the rise and leaves you more in the middle. Below about 50% the artists no longer reach their full fees at a 275-ticket sell-out.

| Artists' share | Artists in all at 141 | Your take at 141 | Your take at 200 | Your take at 275 | Everyone at full fee from |
|---|---|---|---|---|---|
| 55% | $8,879 | $460 | $1,715 | $4,621 | 263 tickets |
| 50% | $8,769 | $569 | $2,123 | $5,721 | 271 |
| 45% | $8,660 | $678 | $2,532 | $6,821 | 347, past this size |

## Artists

### The Bowl, each day, full fees

| Time | Length | Fri | Sat | Sun |
|---|---|---|---|---|
| 2:00 PM | 1 hr | $75 | $75 | $75 |
| 3:00 PM | 1 hr | $100 | $100 | $100 |
| 4:00 PM | 1 hr | $200 | $150 | $150 |
| 5:00 PM | 1 hr | $300 | $250 | $200 |
| 6:00 PM | 1 hr | $500 | $400 | $300 |
| 7:00 PM | 30 min | Sunset changeover | | |
| 7:30 PM | 1.5 hr | $1,000 | $750 | $600 |
| 9:00 PM | 1.5 hr | $2,000 | $1,500 | $1,250 |
| 10:30 PM | 1.5 hr | $3,000 | $3,000 | $2,250 |
| **Day total** | | **$7,175** | **$6,225** | **$4,925** |
| Share of budget | | 39% | 34% | 27% |

Total: $18,325 across 24 sets. These are full fees. What artists are actually paid follows sales, as described under [How the money scales](#how-the-money-scales), and reaches this total at about 263 tickets, where every artist is at their full fee.

**The 7:00 gap.** One-hour sets from 2:00 to 7:30 leave half an hour over. I put it at 7:00, when the sun is going down (sunset is around 7:25 PM that weekend). Use it to switch the stage to its night look and for one short shared moment each day. The alternative is to make 6:00–7:30 a single 90-minute sunset set.

**Friday carries the most money, then Saturday, then Sunday.** A strong Friday is what makes someone buy the Fri–Sun ticket instead of arriving Saturday, and the longer ticket is worth $40 more to you. The artist budget slider keeps these day shares at any total. Every ticket type includes Sunday, so the Sunday headliner sells almost no extra tickets. Its job is to keep people on site. A one-time back-to-back from two acts already there from Friday or Saturday, at $750–$1,000 extra each, does that without a new booking.

**What each artist gets.** The fee, a room in the K Lodge apartment on the night they play one of the top three slots, a bed in a shared cabin if they stay longer, meals for their whole stay, and rides to and from Ontario or Palm Springs. They book their own flights.

**Choosing from quotes.** Ask each artist for two numbers: their full fee, and the least they would take as a minimum. Ask whether they would take that minimum flat. Enter both on the Artists tab and the break-even at the top moves with them. When they agree, tick Agreed and set the per-ticket rate you settled on, or 0 for a flat fee.

**Guest list.** One guest for daytime artists and two for 7:30 and later comes to 33 guests, already inside the 60.

### Afters

Midnight to just past sunrise (about 6:05 AM), all three nights. No booked artists.

- **K Lodge, 105 people:** the loud room. Bowl artists, back-to-backs.
- **The Dome, 40 people:** deep, slow and strange. Lean into the plush interior.
- **A third space with no sound system:** fire pit or tea lounge near the K Lodge. With 145 indoor spots for up to 350 people, the overflow needs somewhere warm to sit.

Give each room a host each night and a sign-up board that opens at 10:00 PM, with 45-minute slots. Put a crew member on the K Lodge door with a counter.

## Flow of the event

### The week

| Day | What happens |
|---|---|
| Wed Apr 21 | Kinetic Desert loads in and builds The Bowl. Core crew and chef arrive. Kitchen stocked |
| Thu Apr 22 | K Lodge build. The Dome arrives. Path lighting, signage and art go in. Sound check at dusk. Walk every path after dark |
| Fri Apr 23 | Gates and medical team from 10:00 AM. Music 2:00 PM to sunrise |
| Sat Apr 24 | Gates 10:00 AM. Music 2:00 PM to sunrise |
| Sun Apr 25 | Gates 10:00 AM. Music 2:00 PM to sunrise |
| Mon Apr 26 | Music ends about 6:30 AM. Coffee and farewell brunch 9:00–11:00. Medical team leaves at 10:00. Cabins out by 11:00, campers by 1:00 PM. Strike begins |
| Tue Apr 27 | Strike. The Dome leaves. Site sweep |
| Wed Apr 28 | Production out by noon. Walk-through with the camp |

The medical team is on site for the event itself. The two build days and two strike days, when crew are lifting and climbing, have no cover, so name a first-aider on the crew for those.

### Each day

| Time | What happens |
|---|---|
| 6:30–11:00 AM | Quiet hours. No amplified sound |
| 10:00 AM | Gates open. Coffee |
| 11:00 AM–1:30 PM | Daytime programme: yoga or a sound bath in The Dome, a production workshop from one of the artists in the K Lodge, a hike. The apartment turns over for that night's artists |
| 2:00–7:00 PM | Five 1-hour sets at The Bowl |
| 7:00 PM | Sunset changeover |
| 7:30 PM–midnight | Three 90-minute sets |
| 10:00 PM | Gates close. Afters sign-up boards open |
| Midnight | Bowl sound off. Lit path to the K Lodge and The Dome |
| Midnight–6:30 AM | Afters |

**The midnight move** is the riskiest ten minutes of each night: up to 350 people leave an amphitheater on a mountainside in the dark and the cold at the same time. Light that path first. Start both afters rooms at 11:45 so there is music when people arrive.

**Keeping people Sunday night.** Announce the Sunday closer as a one-off, and make Monday brunch the meal you serve everyone if the budget allows (about $900 for 300 people). It also means fewer people drive down the mountain tired at 1:00 AM.

## Lodging

| Space | Beds | Who |
|---|---|---|
| K Lodge apartment | 6 twins in 3 rooms | That night's 7:30, 9:00 and 10:30 acts, one room each. Rotates daily |
| Bowl cabin with the queen room | Queen, full, twin | Kinetic Desert, you and the chef share the two Bowl cabins, beside the main stage |
| Bowl cabin with two bunk sets | 2 full, 2 twin | As above |
| Rented cabin 8 | 9 twins | Artists who stay past their night, the medical team, Dome crew |
| Rented cabin 7 | 9 twins | Held for overflow. Release it for sale in late March if artist stays do not need it |
| Rented cabins 1–6 | 54 twins | Sold to attendees at $850 a cabin |

- The apartment shares a wall with the afters room, which runs until sunrise. Tell artists that when you offer it.
- By Sunday night up to six acts and their guests could have moved out of the apartment and want a bed. That is why two cabins are held back.
- Cabins are rented as they sell. Each sold cabin brings in $850 against $250 of rental, and two more are rented for artists and staff at any size. Ask the camp how late a cabin can be added.
- Budget firewood for every rented cabin.
- Partner guest lists are not housed in this table. Agree with Kinetic Desert and Project Seismic that their guests camp.

## Crew and gate

**Gate.** 10:00 AM to 10:00 PM for three days is 12 three-hour shifts. Four gate crew at three shifts each is exactly 12, which means one person alone at the gate all weekend, including Friday afternoon when most cars arrive.

**General crew.** Eight people at three shifts each is 24 shifts. My estimate of what the event needs:

| Job | Shifts |
|---|---|
| Setup on Wednesday and Thursday | 8 |
| Strike on Monday and Tuesday | 8 |
| Airport runs to Ontario and Palm Springs, about three hours each | 10 |
| Second person at the gate, Friday afternoon and Saturday morning | 5 |
| Parking direction on Friday | 3 |
| Artist check-in and hospitality at The Bowl | 6 |
| K Lodge door, midnight to 6:00 AM | 6 |
| Kitchen help for the chef | 6 |
| Trash, bathrooms and firewood rounds | 6 |
| Apartment turnover between nights | 3 |
| **Total** | **61** |

That leaves 37 shifts uncovered. Twelve volunteers on your existing trade (three shifts for a full ticket, no $100) cover 36. They are already counted in the 60. Nine top-slot acts arriving and leaving could mean 18 airport runs, so ask artists to pick one airport and land in batches.

**Pay.** Each of the 12 paid crew gets $100 whatever sells, which is part of the break-even, plus $1 for every ticket sold above 114. That is $127 each at 141 tickets, $186 at 200, $261 at a 275-ticket sell-out and $370 at 384. Every crew member gets a ticket and a car pass at any size.

## Kitchen

One chef at $1,000 and $2,800 of groceries ($2,000 at 199 or fewer on site) covers about 590 meals from Wednesday to Wednesday: roughly 16 people for the four build and strike days, about 45 a day during the event, and artists who stay past their night.

The chef will need the six kitchen-help shifts above. Extras in order of value: the 60-person meal plan, then Monday brunch for everyone.

**Above 350 on site** a second chef comes in at $1,000 and the kitchen also feeds Project Seismic's 30, Kinetic Desert's 25 guests and every artist for the whole weekend. I budgeted $2,500 more in groceries for that: about 70 more people a day, three days, at the same cost per meal. Two chefs feeding around 115 people will need more than one kitchen helper per meal, so add volunteer shifts.

**Drinks.** Bulk seltzers and other drinks for everyone, now a budget that grows with sales: about $600 at 200 tickets, $1,500 at a 275-ticket sell-out and $2,100 at 384. Buy late, from the final figure. I assumed this means everyone on site, at every size, and non-alcoholic. If the drinks are hard seltzers for ticket buyers, check the licensing first: my understanding is that California can treat alcohol included with paid admission as a sale.

## Art, projection and lighting

This budget grows with sales: a $500 floor for path lighting, about $1,200 at 200 tickets, $2,500 at a 275-ticket sell-out and $3,200 at 384. The split below is for $3,000, in the order to spend it as the budget fills.

| Item | Budget |
|---|---|
| Projection: two projectors plus stipends for two visual artists, on the K Lodge exterior or the trees around The Bowl | $900 |
| Five small installation grants at $150, each with a ticket | $750 |
| Path lighting between The Bowl, K Lodge, The Dome, camping and parking | $500 |
| Tree and ambient lighting beyond Kinetic Desert's stage rig | $450 |
| Fire and tea lounge: rugs, lanterns, seating | $200 |
| Hand-painted signs and wayfinding | $200 |

If the budget has to shrink, path lighting is the one line to keep whole.

## Weather and safety

- **Cold.** The council lists the camp at 6,500 feet. Expect nights near freezing, and late-April snow is possible. You have October there for comparison. Tell ticket buyers plainly what to pack.
- **Rain or snow at The Bowl.** There is no covered space for 350 people. The K Lodge holds 105. Decide the bad-weather plan and the refund terms before tickets go on sale.
- **Medical above 199 on site.** Your own medical team at $600 a day, from Friday 10:00 AM to Monday 10:00 AM. The nearest hospital is a long drive down Highway 38, so agree with the team where an ambulance meets you and who calls. Add naloxone and a harm-reduction table.
- **Medical at 199 or fewer.** No medical team. The venue requires its own medical rep when you bring no medic, for a $500 fee, and that rep only handles real emergencies. Everything short of that is yours, so the budget has $200 for your own kit. The kit lives at the cabin by The Bowl. You lead on it, with other crew helping to get it where it is needed and use it. Tell every crew member where it is and who to call, and put that on the crew sheet.
- **Insurance.** Confirm the $3M/$1M policy can name the camp and, if asked, the county, covers overnight camping, and says what it does about alcohol people bring.
- **Fire.** Ask the camp what the forest's April fire rules allow for fire pits and fire performance.
- **Stagecoach.** Reserve porto-potties, generators, light towers and radios on a refundable hold now.

## Between now and April

| When | What |
|---|---|
| This week | Put the five questions to the county planner. Ask your target artists for a full fee, their lowest minimum and whether they would take it flat. Start the ticket site |
| November | Kinetic Desert's agreed deal and Project Seismic's deal in writing. Stage, truss and Dome dimensions. Draft the letter of intent and site plan |
| Dec 1–15 | Alumni presale on the new site |
| Mid-December | Enter presale sales. Agree Friday's headliner and pay the deposit, so the name is on the first lineup. Agree the others in queue order as cash allows |
| Jan 12 | First lineup. Tier 1 and Sat–Sun tickets open |
| Feb 1 | Enter sales. Agree the remaining night slots and pay their deposits before the full lineup |
| Feb 9 | Full lineup. Art grants and merch pre-order open |
| Mar 1 | Enter sales. Agree the daytime artists and commit the art budget |
| Mar 15 | Waitlist deadline. If it has reached the count, charge it and step up: file the Temporary Use Permit, book the medical team, and order porto-potties for 500 |
| Mar 23 | Set times. Sunday-only tickets. Fire permit application in by now at the latest, if going past 199 on site |
| Apr 9 | Final tier. Grocery and drinks order from the final budgets. Shift schedule |
| Apr 21 | Load-in |

## Questions that would change this plan

1. **Is the crew's $1 a ticket paid to each crew member, and from which ticket?** I counted it for each of the 12, on tickets above 114. From the first ticket, break-even is 124.
2. **What is the real permit fee, and how long does the county take to issue it?** At the listed $2,108 the waitlist block is 16 instead of 22. The turnaround sets how late the waitlist can run.
3. **Will headliners take a flat minimum?** It does not change break-even, and it is worth $1,500 to you at a sell-out for each $3,000 slot.
4. **Will flown-in headliners take half their fee as the minimum** when they pay their own flights?
5. **Does The Dome have a minimum?** It earns $900 at 90 tickets for travel and setup.
6. **Does the venue have a minimum rental** below some ticket count?
7. **Whether County Fire and a structure permit are separate applications.**
8. **Who the drinks are for, and whether any are alcoholic.**

## Sources

- [Stripe pricing](https://stripe.com/pricing)
- [Helcim pricing](https://www.helcim.com/pricing/)
- [California Attorney General, SB 478 frequently asked questions](https://oag.ca.gov/system/files/attachments/press-docs/SB%20478%20FAQ%20(B).pdf)
- [San Bernardino County Temporary Use Permit information sheet, revised June 4, 2025](https://lus.sbcounty.gov/wp-content/uploads/sites/48/Temporary-Use-Permit-Information-Sheet-1.pdf)
- [County Development Code Chapter 84.25, temporary structures and uses](https://gocodebook.com/library/us/ca/san-bernardino-county-zoning/chapter-84.25-temporary-structures-and-uses)
- [County Temporary Structure Permit information sheet](https://lus.sbcounty.gov/wp-content/uploads/sites/48/BandS/Handouts/Temporary-Structure-Permit-Checklist.pdf)
- [County EZOP page for the Temporary Use Permit](https://wp.sbcounty.gov/ezop/permits/temporary-use-permit/)
- [County Planning master fee schedule, 2025–26](https://lus.sbcounty.gov/wp-content/uploads/sites/48/Planning-Master-Fee-Schedule-25-26.pdf)
- [County Temporary Special Event Permit information sheet, for comparison](https://lus.sbcounty.gov/wp-content/uploads/sites/48/Temporary-Special-Event-Permit-Information-Sheet.pdf)
- [San Bernardino County Fire special event permits](https://sbcfire.org/ofm/specialeventpermits/)
- [County noise standards, as quoted in a county-hosted noise report](https://lus.sbcounty.gov/wp-content/uploads/sites/48/Appendix-H-Noise-Report.pdf)
- [Long Beach Area Council on Camp Tahquitz](https://www.tahquitz.org/council)
- [Pollstar on Stagecoach 2027 dates](https://news.pollstar.com/2026/06/16/2027-stagecoach-to-take-place-april-23-25/)
