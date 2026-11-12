# Camp Tahquitz, April 23–26, 2027: event plan

Experimental bass and dubstep campout. Three days of music at The Bowl, afters at the K Lodge and The Dome until sunrise, everyone off site Monday.

The numbers in this plan come from one planning model. Open [`budget.html`](budget.html) to change any input and see every budget, what each partner is paid and your profit update.

## The planner

[`budget.html`](budget.html) is organised in nine sections. Profit, the ticket count that covers your commitments, people on site and your take stay pinned at the top.

| Section | What it holds |
|---|---|
| Overview | Tickets sold so far, the ticket count you are planning on, the artists' share, how every budget grows with sales, who gets what at each size, the scale stages with the step fund and the waitlist each step up needs, and the full profit and loss |
| Tickets | Ticket mix, every price tier, add-ons and card fees |
| Budgets | The buckets that grow with sales: each one's share of the surplus, floor, cap and what is committed |
| Artists | The minimum percent for headliners, direct support, 7:30 and daytime slots. The booking queue: each night slot's minimum, deposit and full fee, the tickets it adds to break-even, and the terms once an artist agrees |
| Production | One card per partner: minimum guarantee, per-ticket fee and the ticket count it starts at, the stage it comes in at, any profit share, and the places it is given at each stage |
| Crew | One row per role with people, fixed pay, the per-ticket rate and what each person earns, shifts each, shifts needed and coverage |
| Hard costs | The mandatory costs, each charged flat, per ticket, per ticket per day or per person, with the stage it starts and stops at |
| Pay tables | One printable page per artist, partner or crew role: tickets sold against what they are paid, with their terms in a sentence |
| Timeline | Dated tasks with an owner and a done box |

Partners, crew roles, budgets, hard costs, stages and timeline rows can all be added and removed.

**Saving.** Save plan stores the plan for everyone you share the page with. Changes you have not saved stay yours, so you can try a what-if without disturbing the saved plan. The copy in this repository saves in your browser only.

## The short version

1. **Break-even is 141 tickets.** That covers every hard cost, including the minimums for all nine 90-minute slots and $100 for each of the 12 paid crew. Reeguez Rocks sold 90, so the event has to sell about 55% more before anyone is ahead. It assumes 30% of buyers take Fri–Sun, 40% Sat–Sun and 30% Sunday only, which puts the average ticket at about $161 at a 285-ticket sell-out.
2. **Headliners are guaranteed 75% of their fee, because their names sell the tickets.** That is $6,200 of the $9,750 in minimums. It adds 12 tickets to the break-even compared with guaranteeing half.
3. **Most sales come late, so the artist deposits come from you first.** At 50% they are $4,875. The permit can wait: a Temporary Use Permit can be filed close to the event, once sales show which size you are running.
4. **Everyone is paid once, after the event, on the final ticket count.** Each artist and partner gets a one-page pay table from the planner: tickets sold on the left, their pay on the right.
5. **Three buckets share what is left after hard costs:** Artists 55%, Event 24% and you 21%.
6. **Crew pay is $100 each in the break-even, plus $1 each for every ticket sold above 141.** That is $110 each at 151 tickets, $244 at 285 and $353 at 394.
7. **Below break-even the loss is yours.** At 90 tickets it is about $6,800, and at 75 about $9,100.
8. **Above break-even, every artist rises from their minimum toward their full fee at the same pace.** Everyone is at their full fee by about 284 tickets.
9. **Neither production partner shares the profit.** Kinetic Desert has agreed to $2,000 plus $15 for every ticket above 75. Project Seismic is on $3,000 plus $10 for every ticket above 285.
10. **151 tickets is home base.** That is a sell-out under the permit line: artists receive about $10,100, you take about $140, and $645 is in the step fund.
11. **The step fund is not your profit.** Half of everything above break-even at the small size goes into it, along with any share that has nowhere to go. It pays for the step up. If you never step up, it is carried forward.
12. **Your take only ever rises with ticket sales.** The step past 151 tickets is sold as one block from a waitlist of 29. Nobody, you included, is paid less after a step.
13. **Plan two sizes this year.** At a 285-ticket sell-out artists receive their full $18,325, you take about $3,300 and $125 is in the step fund.
14. **The 500 size is a stretch.** Open its waitlist only if 285 has sold out by March 1. It needs a block of 69, and a 394-ticket sell-out pays you about $7,300.
15. **Stay on Stripe for the ticket site and list all-in prices.** The permit is a Temporary Use Permit, and tickets can go on sale before it is issued.
16. **Stagecoach is the same weekend (April 23–25) in Indio.** Porto-potties, generators and rental cars will be tight.

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

**Stay on Stripe.** You have a working integration and an account with payment history. Total fees at a 285-ticket sell-out are about $1,600. Moving to an interchange-plus processor would save roughly $300 on this event and means rebuilding the checkout on a new account. Revisit it when you are running at 500 or several events a year.

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
- **Enforce the caps in code.** The site should stop sales at 151, 285 or 394 depending on the level you are operating at, and issue crew, artist and partner guest places as $0 tickets from the same system. Then the on-site count is always known.
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
2. **Mandatory hard costs come off first.** The venue fee, permits, insurance, medical, what the production partners are owed, the artist minimums, crew pay, cabin rental, the chef, groceries, site supplies and card fees. These are owed whatever sells.
3. **What is left is the surplus.** Three buckets share it: Artists, Event and you.
4. **Each size holds back a step fund.** At the small size, half of everything above the floors is held back from every bucket alike. Any share that has nowhere to go joins it, such as the artists' share once every artist is at their full fee. The fund pays for the step up. It is not your profit, and if the step is never taken it is carried forward.
5. **Your profit rises at its own share and never falls.** A larger size is sold as one block: buyers past a sell-out wait, uncharged, until enough are waiting that nobody is paid less after the step.
6. **Everyone is paid once, after the event, on the final ticket count.** Before the event only minimums and deposits go out.

### The three buckets

| Bucket | Share of the surplus | Floor |
|---|---|---|
| Artists, above their minimums | 55% | none: the minimums are already hard costs |
| Event: art, drinks, hospitality, marketing, reserve | 24% | $1,050 |
| **You** | **21%** | |

The Event floor is $500 of path lighting, $300 of artist hospitality and $250 of marketing. As a guide, split what is above the floor 9 parts art, 7 drinks, 4 reserve, 2 marketing and 2 hospitality.

Up to 151 tickets each bucket pays half its rate, because half of what is above the floors goes into the step fund.

### What each ticket count buys

| Tickets sold | 90 | 141 | 151 | 200 | 285 | 394 |
|---|---|---|---|---|---|---|
| People on site | 138 | 189 | 199 | 265 | 350 | 500 |
| Money in | $16,638 | $26,762 | $28,660 | $38,810 | $56,658 | $78,327 |
| Mandatory hard costs | $22,392 | $25,619 | $26,320 | $34,130 | $39,790 | $56,361 |
| **Surplus to share** | **−$5,754** | **$1,143** | **$2,340** | **$4,680** | **$16,868** | **$21,966** |
| Artists above their minimums | $0 | $25 | $355 | $1,996 | $8,575 | $8,575 |
| Event | $1,050 | $1,061 | $1,205 | $1,921 | $4,846 | $6,070 |
| Step fund, not counted in your profit |  | $46 | $645 |  | $125 |  |
| **Your profit** | **−$6,804** | **$10** | **$135** | **$762** | **$3,322** | **$7,321** |

From about 284 tickets every artist is at their full fee, and the artists' share goes into the step fund. At the 500 size there is no further step, so everything left is your profit. That is why your take climbs fastest there.

### Who gets what, at every size

For everyone but you these are payments, not profit after their own costs. Your column is profit or loss.

**Up to 199 on site, no permit**

| Tickets | Camp | Kinetic Desert | The Dome | Artists, all 24 sets | Each paid crew | Step fund | You |
|---|---|---|---|---|---|---|---|
| 50 | $2,250 | $2,000 | $500 | $9,750 | $100 |  | −$12,377 |
| 75 | $2,750 | $2,000 | $750 | $9,750 | $100 |  | −$9,138 |
| 90 | $3,300 | $2,225 | $900 | $9,750 | $100 |  | −$6,804 |
| 100 | $3,500 | $2,375 | $1,000 | $9,750 | $100 |  | −$5,600 |
| 125 | $4,000 | $2,750 | $1,250 | $9,750 | $100 |  | −$2,590 |
| **141, break-even** | $4,570 | $2,990 | $1,410 | $9,775 | $100 | $46 | **$10** |
| **151, sell-out** | $4,770 | $3,140 | $1,510 | $10,105 | $110 | $645 | **$135** |

**200 to 350 on site, with the permit and the medical team**

Tickets 152 to 179 are the waitlist. Nobody is charged and nothing changes for anyone until it is released.

| Tickets | Camp | Kinetic Desert | The Dome | Artists, all 24 sets | Each paid crew | Step fund | You |
|---|---|---|---|---|---|---|---|
| **180, released as a block** | $5,100 | $3,575 | $1,800 | $10,430 | $139 |  | **$260** |
| 200 | $5,500 | $3,875 | $2,000 | $11,746 | $159 |  | $762 |
| 225 | $6,250 | $4,250 | $2,000 | $13,846 | $184 |  | $1,564 |
| 250 | $6,750 | $4,625 | $2,000 | $15,629 | $209 |  | $2,245 |
| **285, sell-out** | $7,700 | $5,150 | $2,000 | $18,325 | $244 | $125 | **$3,322** |

**351 to 500 on site, the stretch: porto-potties and the second stage**

Tickets 286 to 353 are the waitlist.

| Tickets | Camp | Kinetic Desert | The Dome | Project Seismic | Artists, all 24 sets | Each paid crew | Step fund | You |
|---|---|---|---|---|---|---|---|---|
| **354, released as a block** | $9,080 | $6,185 | $2,000 | $3,690 | $18,325 | $313 |  | **$3,408** |
| 375 | $9,500 | $6,500 | $2,000 | $3,900 | $18,325 | $334 |  | $5,467 |
| **394, sell-out** | $9,880 | $6,785 | $2,000 | $4,090 | $18,325 | $353 |  | **$7,321** |

- **You are the only one who can lose money, and only below 141 tickets.** Everyone else is paid at every level.
- **Nobody is paid less after a step up, you included.** The step is paid from the fund and the waitlist block.
- **The step fund is not paid to anyone.** It is spent on the step, or carried forward if the event stays at that size.
- **Camp** is the venue fee plus cabin rental, plus the $500 medical rep at the small size only.
- **Not shown:** the chef is paid $1,000 at every level, with a second chef at $1,000 above 350 on site.

### One pay table each

The Pay tables tab of the planner prints one page per person: tickets sold on the left, what they are paid on the right, and their terms in one sentence.

- **Give it to each artist and partner when they agree.** It is the whole deal on one page.
- **Nothing moves during the sale.** Only the final ticket count matters, and it is read off the table after the event.
- **Everyone is on the same shape of deal:** an amount owed whatever sells, then more for each ticket above a count, up to a cap.

### The crew

Each of the 12 paid crew (setup and strike, runners, gate) gets **$100 whatever sells, plus $1 for every ticket sold above 141.** Both are hard costs, and the $100 is in the break-even.

| Tickets sold | 90 | 141 | 151 | 200 | 285 | 394 |
|---|---|---|---|---|---|---|
| Each crew member | $100 | $100 | $110 | $159 | $244 | $353 |
| All 12 | $1,200 | $1,200 | $1,320 | $1,908 | $2,928 | $4,236 |

I read your $1 a ticket as $1 to each crew member, counted from the break-even on. The rate and the ticket count it starts at are inputs on the Crew tab, one per role. The other readings:

| Reading | Break-even | Each at 151 | Each at 285 | Your take at 285 |
|---|---|---|---|---|
| **$1 each, on tickets above 141** | **141 tickets** | **$110** | **$244** | **$3,322** |
| $1 each, on every ticket from the first | 184 | $251 | $385 | $2,966 |
| $1 a ticket into one pot, split between the 12 | 142 | $113 | $124 | $3,625 |

### The artists

**The minimums.** Every minimum is a hard cost, so it is in the break-even. Headliners are guaranteed the most, because their names are what sell the tickets.

| Slot | Minimum, share of the full fee |
|---|---|
| Headliners, 10:30 PM | 75% |
| Direct support, 9:00 PM | 50% |
| 7:30 PM | 50% |
| Daytime | none: paid from break-even on |

These four percents are inputs on the Artists tab. Each slot's own minimum can still be typed over when a real quote comes in.

| Queue | Slot | Minimum | Deposit at 50% | Full fee | Minimums so far | Tickets it adds | Covered at |
|---|---|---|---|---|---|---|---|
| 1 | Friday 10:30 PM | $2,250 | $1,125 | $3,000 | $2,250 | +19 | 90 tickets |
| 2 | Saturday 10:30 PM | $2,250 | $1,125 | $3,000 | $4,500 | +13 | 103 |
| 3 | Sunday 10:30 PM | $1,700 | $850 | $2,250 | $6,200 | +15 | 118 |
| 4 | Friday 9:00 PM | $1,000 | $500 | $2,000 | $7,200 | +8 | 126 |
| 5 | Saturday 9:00 PM | $750 | $375 | $1,500 | $7,950 | +5 | 131 |
| 6 | Sunday 9:00 PM | $625 | $313 | $1,250 | $8,575 | +4 | 135 |
| 7 | Friday 7:30 PM | $500 | $250 | $1,000 | $9,075 | +1 | 136 |
| 8 | Saturday 7:30 PM | $375 | $188 | $750 | $9,450 | +3 | 139 |
| 9 | Sunday 7:30 PM | $300 | $150 | $600 | $9,750 | +2 | 141 |

- **The queue is the order to book and announce in.**
- **"Tickets it adds" is what that guarantee costs in sales.** Friday's headliner has to bring 19 more buyers to pay for the guarantee. Near break-even, every $140 of minimum is one more ticket.
- **"Covered at" is the break-even as it builds.** With no minimums at all the event would cover itself at 71 tickets. The last row is the break-even for the whole lineup.

Because most sales come late, the deposits go out before the tickets that cover them have sold. Treat the $4,875 as money you put in up front and get back from sales.

**How much to guarantee the headliners.** This is the biggest dial on the break-even.

| Headliner minimum | Fri / Sat / Sun | Break-even | Your loss at 90 tickets | Waitlist past 151 | Artists at 151 | You at 151 |
|---|---|---|---|---|---|---|
| 50% | $1,500 / $1,500 / $1,125 | 129 tickets | −$4,729 | 21 buyers | $8,600 | $353 |
| 60% | $1,800 / $1,800 / $1,350 | 135 tickets | −$5,554 | 24 buyers | $9,198 | $267 |
| **75%, the plan** | $2,250 / $2,250 / $1,700 | 141 tickets | −$6,804 | 29 buyers | $10,105 | $135 |
| 100% | $3,000 / $3,000 / $2,250 | 187 tickets | −$8,854 | 30 buyers | $11,800 | −$760 |

A full guarantee would not be covered at the small size at all: break-even would be past its 151-ticket sell-out.

**Making room for the guarantee.** Fri–Sun Presale and Tier 1 are now $10 higher, which is already in these figures. One more lever, not applied: guaranteeing the 7:30 slots 25% instead of half brings break-even to 136.

**The rise.** Past break-even, 55% of the surplus lifts every open slot from its minimum toward its full fee. Each slot rises in proportion to how far it has to go, so they all arrive together. Up to 151 tickets the rise runs at half pace, because half goes into the step fund.

| Tickets sold | 141 | 151 | 200 | 284 and up |
|---|---|---|---|---|
| Friday 10:30 PM, $2,250 minimum | $2,252 | $2,281 | $2,425 | $3,000 |
| Friday 9:00 PM, $1,000 minimum | $1,003 | $1,041 | $1,233 | $2,000 |
| Friday 6:00 PM, daytime, no minimum | $1 | $21 | $116 | $500 |

**Daytime slots** have no minimum, so they cost nothing below break-even. They are paid from 141 tickets on, which suits friends who will play for a per-ticket payment after a ticket count.

**Agreeing a deal.** When an artist agrees, tick Agreed on their slot. They are paid the minimum, plus a rate per ticket on every ticket above a ticket count, up to the full fee. The planner fills in a rate that follows the plan. Change it to what you actually agreed.

**A flat deal.** Set the rate to 0 and the artist is paid the minimum and nothing more. What they would have risen by goes to the other slots first. Once those are at their full fees it goes into the step fund, and at the 500 size it is yours.

| Deal | Step fund at 285 | Waitlist for the 500 size | Your take at 394 |
|---|---|---|---|
| Every slot rising to its full fee | $125 | 69 buyers | $7,321 |
| Friday's headliner flat at $2,250 | $875 | 63 | $8,071 |
| All three headliners flat at their minimums | $2,175 | 53 | $9,371 |

A flat deal does not move the break-even, because the minimum was already counted.

### The production partners' deals

Both partners are on the same shape as the artists and the crew: a guarantee, then a fee on tickets past a threshold, and no share of the profit.

| Partner | Guarantee | Fee | Comes in |
|---|---|---|---|
| Kinetic Desert, agreed | $2,000 | $15 for every ticket above 75 | From the first ticket |
| Project Seismic | $3,000 | $10 for every ticket above 285 | Above 350 people on site |
| The Dome | none | $10 for every ticket, up to $2,000 | From the first ticket |

Kinetic Desert earns $2,225 at 90 tickets, $3,140 at 151, $5,150 at 285 and $6,785 at 394. They do not share a loss, and you keep all of the profit.

### What sets the break-even

| Commitment | What it adds |
|---|---|
| Artist minimums for the nine night slots | $9,750, of which $6,200 is the three headliners. Without any minimums break-even would be 71 tickets |
| $100 for each of the 12 paid crew | $1,200, about 9 tickets |
| Cabins rented as they sell | One 9-bed cabin sells per 45 tickets, up to six. You rent what sells plus two for artists and staff |
| Groceries and supplies budgeted per ticket | $1,350 plus $5.40 a ticket for groceries, $550 plus $2.20 a ticket for supplies. They grow with the event instead of jumping at each size |

### 151 is home base, and how a step up works

A sell-out under the permit line is 151 tickets. Ticket 152 brings in the permit, the medical team and 15 more Kinetic Desert guests, about $4,000 at once.

**Two things pay for that step, and neither is your profit.**

1. **The step fund.** Half of everything above the floors at the small size is held back, from every bucket alike. At 151 tickets it holds $645.
2. **A waitlist block.** At 151 tickets the site sells out and switches to a waitlist. Buyers save a card and are not charged. When 29 are waiting they are all charged together and the event steps up at 180 tickets. If the list has not reached 29 by the deadline, nobody is charged and the event runs at 151.

| | Past 151 tickets | Past 285 tickets, the stretch |
|---|---|---|
| New cost at the step | about $4,000 | about $8,800 |
| Step fund at the sell-out | $645 | $125 |
| Waitlist needed | 29 buyers | 69 buyers |
| Sold together at | 180 tickets | 354 tickets |
| Artists before and after | $10,105 → $10,430 | $18,325 → $18,325 |
| Your take before and after | $135 → $260 | $3,322 → $3,408 |

**Your take never falls.** It rises at its own share with every ticket, at the same pace as the artists and the Event bucket, and a step is only taken when it leaves you at least where you were.

**If the event stays at 151 or 285,** the fund is not spent. It is carried forward: to the next event, or to whatever you decide at settlement. It is still money you control. The plan just does not count it as your take, so that your take cannot make a bigger event look worse.

**The fund size is your dial.** A bigger fund means a smaller waitlist block and a slower rise at the small size.

| Fund at the small size | In the fund at 151 | Artists at 151 | You at 151 | Waitlist needed |
|---|---|---|---|---|
| 0% | $0 | $10,459 | $271 | 30 buyers |
| 25% | $322 | $10,282 | $203 | 29 buyers |
| **50%, the plan** | $645 | $10,105 | $135 | 29 buyers |
| 75% | $967 | $9,927 | $68 | 27 buyers |

After the step everyone rises at the full rate: artists are at $11,746 at 200 tickets and you are at $762.

**The 500 size is a stretch.** Open its waitlist only if 285 has sold out by March 1. The step is funded by the artists' share once every artist is at their full fee, which leaves $125 in the fund at a sell-out and a block of 69. A fund at the middle size shrinks the block and slows the artists:

| Fund at the middle size | In the fund at 285 | Artists at 285 | You at 285 | Waitlist needed |
|---|---|---|---|---|
| **0%, the plan** | $125 | $18,325 | $3,322 | 69 buyers |
| 10% | $1,582 | $17,580 | $2,990 | 57 buyers |
| 25% | $3,955 | $16,275 | $2,491 | 39 buyers |

**Two things still not done that would shrink the blocks:**

- **Get the real permit fee.** I left it at your $3,000. At the county's listed $2,108 the blocks are 22 and 65 buyers.
- **Add $10 to every ticket.** The blocks are 22 and 53, and break-even is 135.

**On the ticket site.** Stripe can save a card without charging it and charge it later. My understanding is that there is no fee until the charge. A few saved cards will be declined when charged, so release when the list is a few over the count.

**Set the waitlist deadline at March 15.** County Fire asks for its application 30 days ahead, which is March 24, and the permit and the medical team need lead time with Stagecoach on the same weekend. Move it later if the county's turnaround and your vendors allow.

### Working with it

- **Enter tickets sold after every sales push.** The top bar shows how many tickets still stand between you and break-even, and the queue shows which minimums sales have covered.
- **Book in queue order.** Friday's headliner first, so the name is on the poster while the rest is confirmed.
- **Have the deposit money ready:** $1,125 for Friday's headliner and $4,875 for all nine. The permit is not an early cost. It is paid close to the event, and only if you go past 151 tickets.
- **Push for flat deals at the top.** Every headliner on a flat minimum is money that stays with the other artists and the step fund.
- **Hand out the pay table when a deal is agreed.**
- **Commit the Event bucket late**, from the final figures.

## What I assumed

Each of these is an input in the planner.

| Assumption | Value used | Why it matters |
|---|---|---|
| The three buckets | 55% artists, 24% event, which leaves 21% as your profit | My split |
| Headliner minimums | 75% of the full fee: $2,250, $2,250, $1,700 | My placeholder until quotes come in. At half the fee break-even is 129, at the full fee 187 |
| Other artist minimums | Half the full fee for the 9:00 and 7:30 slots, none for daytime | All nine night-slot minimums are hard costs |
| Artist deposits | 50% of the minimum, paid before the artist is announced | The usual booking term. It is cash you need before the first lineup |
| Kinetic Desert's fee | $15 for every ticket above 75, on top of the $2,000 | Agreed with Kinetic Desert |
| Crew pay | $100 each for the 12 paid crew, plus $1 each for every ticket above 141 | The $100 is in the break-even. Counting the $1 from the first ticket would put break-even at 184 |
| Step fund | Half of everything above the floors at the small size, plus any share with nowhere to go. Not counted as your profit, and carried forward if the step is never taken | Your choice. A bigger fund means a smaller waitlist block and a slower rise at the small size |
| People without a ticket | 48 up to 199 on site, 65 up to 350, 106 up to 500 | Ten fewer than before: I took them from the artists' guest list. Each place is one more ticket you can sell. Venue reps never count |
| Groceries and supplies | $1,350 plus $5.40 a ticket, and $550 plus $2.20 a ticket | My estimate, set so the totals match the old figures at a sell-out |
| Ticket prices | Fri–Sun $189 / $209 / $239 / $259. Sat–Sun $145 / $160 / $189. Sunday $85 / $105 | Untested |
| Cabin sales | One cabin per 45 tickets, up to six | My guess at how cabins track attendance |
| Card fees | 2.9% + 30¢, all sales by card | About 3% of online sales |
| Permits | $3,000 at 200 or more on site | Your ballpark. The one county figure I found is $2,108 |
| Extra cost above 350 | $2,500 porto-potties, $1,000 second chef, $2,000 more groceries, $400 supplies, $3,000 for Project Seismic | The grocery and porto-potty figures are guesses |
| Car camping demand | One pass per five tickets | 95 of the 120 spots are for sale after 25 crew passes |
| Ticket mix | 30% Fri–Sun, 40% Sat–Sun, 30% Sunday only | Your expected spread. It drives the average ticket price and the venue fee. At 65 / 25 / 10 break-even would be 124 |
| Merch, meal plan and vendor income | $10 per ticket | Untested. Without it and with half the car passes, break-even rises from 141 to 194 |

I could not verify current booking fees for Pando!, Chmura, Huck.Jorris or Ferrofluid.

## Capacity

Every limit is counted on people on site. Guest lists grow as the event does, so the number of tickets you can sell steps at each stage.

| People on site | Without a ticket | Tickets that fit | Opens at | What switches on |
|---|---|---|---|---|
| Up to 199 | 48 | 151 | 141 tickets cover it | The base plan, with the venue's medical rep and your own kit |
| 200 to 350 | 65 | 285 | 180 tickets, as a block of 29 | Permits, the medical team, 15 Kinetic Desert guests |
| 351 to 500, the stretch | 106 | 394 | 354 tickets, as a block of 69 | Porto-potties, Project Seismic and their 30 places, 10 more Kinetic Desert guests, a second chef, food for partners and all artists |

Ten places came off the artists' guest list, which is why each size now fits ten more tickets.

### The 500 size and Project Seismic

Treat this as a stretch for year one: open its waitlist only if 285 has sold out by March 1.

The main stage moves to a larger area with Kinetic Desert's production, and The Bowl becomes a side stage run by Project Seismic with their own artists. They need about $3,000 for rentals.

Their deal: **$3,000 guaranteed, plus $10 for every ticket sold above 285, and no share of the profit.**

| Deal | They earn at 354 / 374 / 394 tickets | You at 394 | Released at |
|---|---|---|---|
| $3,000 flat | $3,000 / $3,000 / $3,000 | $8,150 | 349 tickets |
| **$3,000 plus $10 a ticket above 285** | **$3,690 / $3,890 / $4,090** | **$7,321** | **354** |
| $3,000 plus 10% of profit | $3,394 / $3,605 / $3,815 | $7,335 | 352 |

- **Their rentals are covered for certain.**
- **Their upside is tied to the tickets the bigger event adds**, which is the thing they are there to help sell.
- **There is no loss-sharing to argue about**, because they have no share.

Their guest list is 30. Cutting it to 20 would free ten tickets and add about $1,000 to your take at a sell-out.

Your take at the 500 size is $3,408 at 354 tickets, $5,467 at 375 and $7,321 at 394.

The 500 size costs about $8,800 more at the step, and 41 more places that cannot be sold. Afters still hold 145 people indoors, so at 500 on site that needs a third space or a late slot on one of the two stages.

## Tickets

### Price ladder

Tiers sell in order. Averages are at a 285-ticket sell-out. These are the prices buyers pay, with nothing added at checkout.

| Ticket | Presale | Tier 1 | Tier 2 | Final | Average at sell-out |
|---|---|---|---|---|---|
| Fri–Sun | $189 × 25 | $209 × 60 | $239 × 50 | $259 × the rest | $203 |
| Sat–Sun | none | $145 × 20 | $160 × 30 | $189 × the rest | $174 |
| Sunday only | none | none | $85 × 15 | $105 × the rest | $101 |

- Fri–Sun carries the increases: Presale and Tier 1 are $10 higher than before and the later tiers $20 higher. Those are the tickets the headliners sell, and they pay for the higher guarantees.
- Sat–Sun and Sunday tickets came down a little, by $4 to $10.
- Early tickets are the cheap ones, so the average is about $146 at 90 tickets and $161 at 285.
- **The plan expects 30% of buyers to take Fri–Sun, 40% Sat–Sun and 30% Sunday only.** At that spread a 285-ticket sell-out sells only about 86 Fri–Sun tickets, which barely gets past Presale and Tier 1. The $239 and $259 tiers are mostly reached at the 500 size. Enter the real split from the presale on the Overview tab.
- **Sunday-only timing needs a decision.** The calendar below opens Sunday-only tickets on March 23, when set times are out. With 30% of sales expected to be Sunday only, that puts almost a third of sales after the March 15 waitlist deadline. Either open them with the full lineup on February 9, or move the waitlist deadline later.
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
| Dec 1–15 | Reeguez Rocks alumni presale: 25 Fri–Sun at $189, then $209, plus cabins. The first sales figure to enter in the planner |
| Jan 12 | First lineup announcement. Tier 1 opens, Sat–Sun tickets open |
| Feb 9 | Full lineup. Tier 2 opens when Tier 1 sells through |
| Mar 1 | Open the waitlist for the 500 size only if 285 has sold out |
| Mar 15 | Waitlist deadline. Release it if it has reached the count for the next size |
| Mar 23 | Set times out. Sunday-only tickets open |
| Apr 9 | Final tier |

The ticket site has to be live by December 1 for the presale.

## Budget

The plan at a 285-ticket sell-out, with every artist at their full fee.

| Money in | |
|---|---|
| Tickets, 285 at a $161 average | $45,858 |
| Cabins, 6 at $850 | $5,100 |
| Car camping, 57 passes at $50 | $2,850 |
| Merch, meal plan, vendors | $2,850 |
| **Total in** | **$56,658** |

| Mandatory hard costs | |
|---|---|
| Artist minimums, 9 slots | $9,750 |
| Venue fee, 570 ticket-days at $10 | $5,700 |
| Kinetic Desert: $2,000 plus $15 on 210 tickets | $5,150 |
| Permits | $3,000 |
| Crew: 12 at $100, plus $1 each on 144 tickets | $2,928 |
| Groceries for crew and artists | $2,889 |
| The Dome, at its cap | $2,000 |
| Cabin rental, 8 at $250 | $2,000 |
| Medical team, 3 days at $600 | $1,800 |
| Payment processing | $1,646 |
| Site supplies: wristbands, signage, radios, trash, firewood | $1,177 |
| Chef | $1,000 |
| Insurance | $750 |
| **Total hard costs** | **$39,790** |

**Surplus to share: $16,868.**

| Bucket | Share | At 285 tickets |
|---|---|---|
| Artists, above their minimums | 55% | $8,575, which takes every slot to its full fee |
| Event: art, drinks, hospitality, marketing, reserve | 24% | $4,846 |
| **Total** | | **$13,421** |

**Step fund: $125.** This is the part of the artists' share left over once every artist is at their full fee. It pays for the step to the 500 size, or is carried forward.

**Profit: $3,322, all yours.** Artists receive $18,325 in all.

A guide to the Event bucket at this size: about $1,900 for art, projection and lighting, $1,100 for drinks, $600 in reserve, $550 for marketing and $600 for artist hospitality.

### Moving the artists' share

A lower share slows the rise and leaves you more in the middle.

| Artists' share | Artists in all at 151 | Your take at 151 | Your take at 200 | Your take at 285 | Everyone at full fee from |
|---|---|---|---|---|---|
| 55% | $10,105 | $135 | $762 | $3,322 | 284 tickets |
| 50% | $10,072 | $168 | $944 | $4,113 | not by 285 |
| 45% | $10,040 | $200 | $1,125 | $4,904 | not by 285 |

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

Total: $18,325 across 24 sets. These are full fees. What artists are actually paid follows sales, as described under [How the money scales](#how-the-money-scales), and reaches this total at about 284 tickets, where every artist is at their full fee.

**The 7:00 gap.** One-hour sets from 2:00 to 7:30 leave half an hour over. I put it at 7:00, when the sun is going down (sunset is around 7:25 PM that weekend). Use it to switch the stage to its night look and for one short shared moment each day. The alternative is to make 6:00–7:30 a single 90-minute sunset set.

**Friday carries the most money, then Saturday, then Sunday.** A strong Friday is what makes someone buy the Fri–Sun ticket instead of arriving Saturday, and the longer ticket is worth $64 or more to you. The artist budget slider keeps these day shares at any total. At the expected spread, though, only 30% of buyers are there on Friday and 70% on Saturday, while everyone is there on Sunday. Friday's $3,000 headliner plays to about 86 ticket holders at a 285-ticket sell-out, and Sunday's lineup is now what sells the 30% who buy Sunday only. If that spread holds in the presale, consider moving money from Friday toward Sunday.

**What each artist gets.** The fee, a room in the K Lodge apartment on the night they play one of the top three slots, a bed in a shared cabin if they stay longer, meals for their whole stay, and rides to and from Ontario or Palm Springs. They book their own flights.

**Choosing from quotes.** Ask each artist for two numbers: their full fee, and the least they would take as a guarantee. Ask whether they would take that guarantee flat. Enter both on the Artists tab and the break-even at the top moves with them. When they agree, tick Agreed, set the per-ticket rate you settled on (0 for a flat fee) and print their pay table from the Pay tables tab.

**Guest list.** One guest for each artist playing 7:30 or later, and none for daytime artists: 9 guests instead of 33. That is where the ten extra tickets at each size come from. A daytime artist's guest can buy a ticket at the Presale price.

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

That leaves 37 shifts uncovered. Twelve volunteers on your existing trade (three shifts for a full ticket, no $100) cover 36. They are already counted among the people without a ticket. Nine top-slot acts arriving and leaving could mean 18 airport runs, so ask artists to pick one airport and land in batches.

**Pay.** Each of the 12 paid crew gets $100 whatever sells, which is part of the break-even, plus $1 for every ticket sold above 141. That is $110 each at 151 tickets, $159 at 200, $244 at a 285-ticket sell-out and $353 at 394. Every crew member gets a ticket and a car pass at any size.

## Kitchen

One chef at $1,000 and about $2,900 of groceries at a 285-ticket event (about $2,200 at 151) covers about 590 meals from Wednesday to Wednesday: roughly 16 people for the four build and strike days, about 45 a day during the event, and artists who stay past their night.

The chef will need the six kitchen-help shifts above. Extras in order of value: the 60-person meal plan, then Monday brunch for everyone.

**Above 350 on site** a second chef comes in at $1,000 and the kitchen also feeds Project Seismic's 30, Kinetic Desert's 25 guests and every artist for the whole weekend. I budgeted $2,000 more in groceries for that: about 70 more people a day, three days, at the same cost per meal. Two chefs feeding around 115 people will need more than one kitchen helper per meal, so add volunteer shifts.

**Drinks.** Bulk seltzers and other drinks for everyone come out of the Event bucket. At 7 parts in 24 that is about $300 at 200 tickets, $1,100 at a 285-ticket sell-out and $1,500 at 394. Buy late, from the final figure. I assumed this means everyone on site, at every size, and non-alcoholic. If the drinks are hard seltzers for ticket buyers, check the licensing first: my understanding is that California can treat alcohol included with paid admission as a sale.

## Art, projection and lighting

This comes out of the Event bucket. At 9 parts in 24, with the $500 floor for path lighting, it is about $800 at 200 tickets, $1,900 at a 285-ticket sell-out and $2,400 at 394. The split below is for $3,000, in the order to spend it as the money comes in.

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
| Mar 1 | Enter sales. Agree the daytime artists and commit the Event bucket. Open the waitlist for the 500 size only if 285 has sold out |
| Mar 15 | Waitlist deadline. If it has reached the count, charge it and step up: file the Temporary Use Permit, and book the medical team. For 500, order porto-potties |
| Mar 23 | Set times. Sunday-only tickets. Fire permit application in by now at the latest, if going past 199 on site |
| Apr 9 | Final tier. Grocery and drinks order from the final budgets. Shift schedule |
| Apr 21 | Load-in |

## Questions that would change this plan

1. **What will the headliners actually ask to be guaranteed?** I used 75% of the fee. Near break-even, every $140 of guarantee is one more ticket to sell.
2. **Which ten places come off the list of people without a ticket?** I took them from the artists' guest list: one guest for each artist playing 7:30 or later, none for daytime.
3. **Is the crew's $1 a ticket paid to each crew member, and from which ticket?** I counted it for each of the 12, on tickets above 141. From the first ticket, break-even is 184.
4. **What is the real permit fee, and how long does the county take to issue it?** At the listed $2,108 the waitlist block is 22 instead of 29. The turnaround sets how late the waitlist can run.
5. **Will headliners take a flat fee?** It does not change break-even, and above it the money stays with the other artists and the step fund.
6. **Does The Dome have a minimum?** It earns $900 at 90 tickets for travel and setup.
7. **Does the venue have a minimum rental** below some ticket count?
8. **Whether County Fire and a structure permit are separate applications.**
9. **Who the drinks are for, and whether any are alcoholic.**

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
