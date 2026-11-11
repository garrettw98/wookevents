# Camp Tahquitz, April 23–26, 2027: event plan

Experimental bass and dubstep campout. Three days of music at The Bowl, afters at the K Lodge and The Dome until sunrise, everyone off site Monday.

The numbers in this plan come from one planning model. Open [`budget.html`](budget.html) to change any input and see every budget, what each partner is paid and your profit update.

## The planner

[`budget.html`](budget.html) is organised in eight sections. Profit, the ticket count that covers your commitments, people on site and your take stay pinned at the top.

| Section | What it holds |
|---|---|
| Overview | Tickets sold so far, the ticket count you are planning on, the artists' share, how every budget grows with sales, who gets what at each size, the scale stages and the full profit and loss |
| Tickets | Ticket mix, every price tier, add-ons and card fees |
| Budgets | Every budget that grows with sales: its share of the surplus, floor, cap and what is committed |
| Artists | The unlock ladder: the queue of slots, each one's minimum and full fee, the ticket count that unlocks it, and the terms once an artist agrees |
| Production | One card per partner: minimum guarantee, per-ticket fee and the ticket count it starts at, the stage it comes in at, any profit share, and the places it is given at each stage |
| Crew | One row per role with people, pay, shifts each, shifts needed and coverage |
| Hard costs | The mandatory costs, each charged flat, per ticket, per ticket per day or per person, with the stage it starts and stops at |
| Timeline | Dated tasks with an owner and a done box |

Partners, crew roles, budgets, hard costs, stages and timeline rows can all be added and removed.

**Saving.** Save plan stores the plan for everyone you share the page with. Changes you have not saved stay yours, so you can try a what-if without disturbing the saved plan. The copy in this repository saves in your browser only.

## The short version

1. **Hard costs and budget floors are covered at 57 tickets.** Reeguez Rocks sold 90. Above 57 every party comes out ahead, as long as you do not agree artist deals ahead of what sales cover.
2. **Mandatory hard costs come off the top, and everything else is a share of what is left.** Artists, art, drinks, crew stipends, marketing and the reserve all grow with each ticket.
3. **The artist budget builds up in order.** Friday's headliner unlocks first, at 75 tickets. Then Saturday's at 96 and Sunday's at 115, then the three direct supports, then the three 7:30 slots. All nine are unlocked by 198 tickets, and the daytime slots start to be paid from there.
4. **Unlocked slots keep rising** toward their full fee as tickets sell. Every artist is at their full fee by about 335 tickets, and what comes in after that is profit.
5. **An agreed artist is on a minimum plus a rate per ticket**, the same shape as the production partners. Agreeing a slot before sales have unlocked it is the only way to lose money.
6. **Neither production partner shares the profit.** Kinetic Desert is on $2,000 plus $15 for every ticket above 75. Project Seismic is on $3,000 plus $10 for every ticket above 275. The profit is yours, and so is any loss.
7. **141 tickets is home base.** That is a sell-out under the permit line, with five of the nine night slots unlocked. Stepping past it only pays from 175 tickets.
8. **At a 275-ticket sell-out artists receive about $18,000 and your profit is about $5,700.** At 141 tickets it is $7,500 and $2,000. At 90 it is $3,100 and $835.
9. **Stay on Stripe for the ticket site and list all-in prices.** The permit is a Temporary Use Permit, and tickets can go on sale before it is issued.
10. **Stagecoach is the same weekend (April 23–25) in Indio.** Porto-potties, generators and rental cars will be tight.

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
- **Deadline:** the sheet states none. You were told 90 days, which makes the last working day Friday, January 22.
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
2. The filing deadline for this year.
3. Whether the stage, truss and Dome need a separate structure permit or engineered plans.
4. Whether the application is routed to County Fire or you apply there yourself.
5. Whether the permit is needed at all below 200 people.

The camp itself sets no rules beyond the law and its bathroom capacity: 350 people on the existing facilities, up to 500 with porto-potties brought in.

## How the money scales

### The rule

1. **Money in.** Tickets, cabins, car camping, and merch, meals and vendors.
2. **Mandatory hard costs come off first.** The venue fee, permits, insurance, medical, what the production partners are owed, cabin rental, the chef, groceries for crew and artists, site supplies and card fees. These are owed whatever sells.
3. **What is left is the surplus.** Every other budget takes a fixed share of it.
4. **The share nobody takes is your profit.**

### The shares

| Budget | Share of the surplus | Floor |
|---|---|---|
| Artists | 55% | none: the budget builds up in the order below |
| Art, projection and lighting | 9% | $500, which is path lighting |
| Drinks for everyone | 7% | none |
| Crew stipends | 6% | none, and it stops at the $1,200 the crew are owed |
| Reserve for surprises | 4% | none |
| Marketing and design | 2% | $250 |
| Artist hospitality and airport runs | 2% | $300 |
| **Your profit** | **15%** | |

### What each ticket count buys

Nothing agreed with artists yet.

| Tickets sold | 90 | 120 | 141 | 200 | 275 | 384 |
|---|---|---|---|---|---|---|
| People on site | 148 | 178 | 199 | 275 | 350 | 500 |
| Money in | $18,835 | $24,820 | $29,993 | $43,410 | $62,230 | $87,256 |
| Mandatory hard costs | $12,217 | $13,906 | $15,367 | $24,286 | $28,370 | $44,401 |
| **Surplus to share** | **$6,618** | **$10,914** | **$14,626** | **$19,124** | **$33,860** | **$42,855** |
| Artists | $3,062 | $5,425 | $7,467 | $9,941 | $18,046 | $18,325 |
| Night slots unlocked, of 9 | 1 | 3 | 5 | 9 | 9 | 9 |
| Art, projection and lighting | $1,001 | $1,388 | $1,722 | $2,127 | $3,453 | $4,262 |
| Drinks for everyone | $390 | $690 | $950 | $1,265 | $2,297 | $2,926 |
| Crew stipends, of $1,200 owed | $334 | $592 | $815 | $1,084 | $1,200 | $1,200 |
| Reserve for surprises | $223 | $395 | $543 | $723 | $1,312 | $1,672 |
| Marketing and design | $361 | $447 | $522 | $611 | $906 | $1,086 |
| Artist hospitality and airport runs | $411 | $497 | $572 | $661 | $956 | $1,136 |
| **Your profit** | **$835** | **$1,480** | **$2,036** | **$2,711** | **$5,690** | **$12,247** |

At 384 every artist is already at their full fee, so the artist budget stops at $18,325 and the rest becomes profit. Raise the full fees or add acts if you would rather spend it on the lineup.

### Who gets what

| Tickets sold | 90 | 120 | 141 | 200 | 275 | 384 |
|---|---|---|---|---|---|---|
| Camp Tahquitz: venue fee, cabins, medical rep | $3,795 | $4,560 | $5,346 | $6,600 | $9,013 | $11,792 |
| Kinetic Desert | $2,225 | $2,675 | $2,990 | $3,875 | $5,000 | $6,635 |
| The Dome | $900 | $1,200 | $1,410 | $2,000 | $2,000 | $2,000 |
| Project Seismic | | | | | | $4,090 |
| Artists, all 24 sets | $3,062 | $5,425 | $7,467 | $9,941 | $18,046 | $18,325 |
| Crew and chefs | $1,334 | $1,592 | $1,815 | $2,084 | $2,200 | $3,200 |
| **You** | **$835** | **$1,480** | **$2,036** | **$2,711** | **$5,690** | **$12,247** |

Every row is positive from 57 tickets up. Your take passes $1,000 at about 98 tickets.

### The artist ladder

The artist budget fills the slots in a queue. Each of the nine 90-minute slots has a minimum, set at half its full fee, which is the usual deposit.

| Queue | Slot | Minimum | Full fee | Unlocks at | Paid at 141 tickets | At 275 |
|---|---|---|---|---|---|---|
| 1 | Friday 10:30 PM | $1,500 | $3,000 | 75 tickets | $2,300 | $2,975 |
| 2 | Saturday 10:30 PM | $1,500 | $3,000 | 96 | $1,925 | $2,950 |
| 3 | Sunday 10:30 PM | $1,125 | $2,250 | 115 | $1,300 | $2,200 |
| 4 | Friday 9:00 PM | $1,000 | $2,000 | 132 | $1,075 | $1,950 |
| 5 | Saturday 9:00 PM | $750 | $1,500 | 140 | $750 | $1,475 |
| 6 | Sunday 9:00 PM | $625 | $1,250 | 180 | saving | $1,225 |
| 7 | Friday 7:30 PM | $500 | $1,000 | 188 | | $975 |
| 8 | Saturday 7:30 PM | $375 | $750 | 193 | | $725 |
| 9 | Sunday 7:30 PM | $300 | $600 | 198 | | $575 |
| | 15 daytime slots | none | $75 to $500 | from 198 | | full from 235 |

How it runs:

1. **Minimums unlock one at a time.** The budget saves toward the next minimum in the queue. "Unlocks at" is the ticket count at which sales have paid for it, so booking then carries no risk.
2. **Unlocked slots keep rising.** A quarter of every new artist dollar raises the slots already unlocked toward their full fees. The other three quarters save toward the next minimum.
3. **Daytime slots start once all nine minimums are unlocked.** They have no minimum, which suits friends who will play for a per-ticket payment after a ticket count.
4. **Nothing is paid past a full fee.** Every slot is at its full fee by about 335 tickets.

The gap between 140 and 180 is the stage step: the permit and medical team come in at 142 and the artist budget stands still until sales pass about 175.

The quarter is a setting. At 0 the nine minimums are all unlocked by 178 tickets and nobody rises until then. At a half, Friday's headliner is at the full $3,000 by 141 tickets and the ninth slot does not unlock until 237.

### Agreeing a deal

When an artist agrees, tick Agreed on their slot. The slot leaves the ladder and is paid on its own terms:

- **The minimum**, owed whatever sells.
- **A rate per ticket** on every ticket above a ticket count.
- **Never more than the full fee.**

The planner fills in terms that follow the ladder. For Friday's headliner that is $1,500, plus $6 a ticket above 75, up to $3,000. Change them to what you actually agreed, and set the rate to 0 if they take a flat minimum.

Agreed deals are paid from the artist budget first. If you agree more than the budget holds at that point, the difference comes out of your profit until sales catch up.

| Agreed before any sales | Minimums | Covered at | Your take at 60 tickets | At 90 | At 141 | At 275 |
|---|---|---|---|---|---|---|
| Nothing | $0 | 57 tickets | $82 | $835 | $2,036 | $5,690 |
| Friday headliner | $1,500 | 67 | −$1,116 | $835 | $2,036 | $5,711 |
| Friday and Saturday headliners | $3,000 | 77 | −$2,616 | $808 | $2,036 | $6,137 |
| All three headliners | $4,125 | 85 | −$3,741 | −$317 | $2,036 | $6,462 |
| Headliners and direct support | $6,500 | 98 | −$6,116 | −$2,692 | $2,036 | $7,202 |
| All nine night slots | $7,675 | 107 | −$7,291 | −$3,867 | $983 | $7,713 |

The planner also shows the deposits due on what you have agreed, at 50% of each minimum, beside the ticket money in so far.

### The production partners' deals

Both partners are on the same shape as the artists: a guarantee, then a fee on tickets past a threshold, and no share of the profit.

| Partner | Guarantee | Fee | Comes in |
|---|---|---|---|
| Kinetic Desert | $2,000 | $15 for every ticket above 75 | From the first ticket |
| Project Seismic | $3,000 | $10 for every ticket above 275 | Above 350 people on site |
| The Dome | none | $10 for every ticket, up to $2,000 | From the first ticket |

- **Kinetic Desert earns $2,225 at 90 tickets, $2,990 at 141, $5,000 at 275 and $6,635 at 384.**
- **They no longer share a loss**, and you keep all of the profit.
- **Worth knowing before you talk to them:** with the ladder capping artists at their full fees, a half share of the profit would now pay them more at most sizes: about $2,430 at 90 tickets, $3,090 at 141, $5,850 at 275 and $9,900 at 384. The fee pays more only around 200 tickets. What it offers them is certainty: it never depends on there being a profit, and they never share a loss.

### What changed to get the floor down

The floor was 90 tickets when I checked an earlier version against realistic cabin sales. Six changes brought it to 57.

| Change | What it does |
|---|---|
| Cabins rented as they sell | One 9-bed cabin sells per 45 tickets, up to six. You rent what sells plus two for artists and staff, instead of all eight |
| Smaller grocery and supply orders at the small size | $2,000 and $800 up to 199 on site, $2,800 and $1,200 above |
| Crew stipends from a budget | The 12 crew stipends are paid from a 6% share. They pay 28% at 90 tickets, 68% at 141 and in full from about 212 |
| $10 on every ticket price | About $1,000 more at 100 tickets and $1,400 at 141 |
| Presale tier of 25 instead of 50 | About $500 more |
| No floor under the artist budget | The first artist dollars go to Friday's headliner. Daytime slots are paid once the night is funded |

### 141 is home base

A sell-out under the permit line is 141 tickets. At 142 the permit, the medical team, the larger grocery and supply orders and 15 more Kinetic Desert guests all come in, and the surplus drops by about $5,100.

- Selling 142 to 174 tickets leaves less profit than stopping at 141.
- Plan past 141 only when sales point beyond 175.
- The same thing happens at 276. That size pays from 332 tickets.

The permit has to be filed by January 22, so that is the date to decide whether you are planning past 141.

### Working with it

- **Enter tickets sold after every sales push.** The ladder shows which slots sales have unlocked and how many tickets the next one needs.
- **Book in queue order.** Friday's headliner first, so the name is on the poster while the rest unlocks.
- **Announce each unlock.** "Twenty more tickets unlocks Saturday's headliner" is a reason to buy now, and the ticket site could show it.
- **Ask for a hold** when a slot is not unlocked yet. A hold costs nothing.
- **Pay deposits from ticket cash**, not ahead of it.
- **Commit art, drinks and marketing late**, from the final figures.

## What I assumed

Each of these is an input in the planner.

| Assumption | Value used | Why it matters |
|---|---|---|
| The budget shares | 55% artists, 9% art, 7% drinks, 6% crew stipends, 4% reserve, 2% marketing, 2% hospitality | My split. It leaves 15% as your profit |
| Kinetic Desert's fee | $15 for every ticket above 75, on top of the $2,000 | My proposal. Not yet agreed with them |
| Artist minimums | Half the full fee for the nine 90-minute slots, none for daytime | Half is the usual deposit. A real quote replaces it |
| Raise share | 25% of each new artist dollar lifts slots already unlocked | My setting. The rest saves toward the next minimum |
| Cabin sales | One cabin per 45 tickets, up to six | My guess at how cabins track attendance. Six cabins hold about a fifth of a 275-ticket crowd |
| Small-event groceries and supplies | $2,000 and $800 | My estimate of what a crowd under 200 needs |
| Crew, artists and their guests | 58 up to 199 on site, 60 above | The base that every limit is counted from. Venue reps never count |
| Card fees | 2.9% + 30¢, all sales by card | About 3% of online sales |
| Permits | $3,000 at 200 or more on site | Your ballpark. The one county figure I found is $2,108 |
| Extra cost above 350 | $2,500 porto-potties, $1,000 second chef, $2,500 more groceries, $800 supplies | The grocery and porto-potty figures are guesses |
| Car camping demand | One pass per five tickets | 95 of the 120 spots are for sale after 25 crew passes |
| Ticket mix | 65% Fri–Sun, 25% Sat–Sun, 10% Sunday | Drives average ticket price and the venue fee |
| Merch, meal plan and vendor income | $10 per ticket | Untested. Without it and with half the car passes, the floor rises from 57 to 63 |

I could not verify current booking fees for Pando!, Chmura, Huck.Jorris or Ferrofluid.

## Capacity

Every limit is counted on people on site. Guest lists grow as the event does, so the number of tickets you can sell steps at each stage.

| People on site | Without a ticket | Tickets that fit | Worth stepping into from | What switches on |
|---|---|---|---|---|
| Up to 199 | 58 | 141 | 57 tickets cover it | The base plan, with the venue's medical rep and your own kit |
| 200 to 350 | 75 | 275 | 175 tickets | Permits, the medical team, larger grocery and supply orders, 15 Kinetic Desert guests |
| 351 to 500 | 116 | 384 | 332 tickets | Porto-potties, Project Seismic and their 30 places, 10 more Kinetic Desert guests, a second chef, more groceries and supplies |

### The 500 size and Project Seismic

The main stage moves to a larger area with Kinetic Desert's production, and The Bowl becomes a side stage run by Project Seismic with their own artists. They need about $3,000 for rentals.

Their deal: **$3,000 guaranteed, plus $10 for every ticket sold above 275, and no share of the profit.**

| Deal | They earn at 300 / 350 / 384 tickets | You at 384 | Pays you from |
|---|---|---|---|
| $3,000 flat | $3,000 / $3,000 / $3,000 | $13,075 | 329 tickets |
| **$3,000 plus $10 a ticket above 275** | **$3,250 / $3,750 / $4,090** | **$12,247** | **332** |
| $3,000 plus 10% of profit | $3,459 / $3,836 / $4,307 | $11,768 | 336 |

- **Their rentals are covered for certain.**
- **Their upside is tied to the tickets the bigger event adds**, which is the thing they are there to help sell.
- **There is no loss-sharing to argue about**, because they have no share.

Their guest list is 30. Cutting it to 20 would free ten tickets and add about $1,300 to your take at a sell-out.

Your take at the 500 size is $4,537 at 300 tickets, $7,791 at 350 and $12,247 at 384. It is large at the top because every artist is already at their full fee by about 335 tickets.

The 500 size costs about $9,800 more in hard costs before the per-ticket fees, and 41 more places that cannot be sold. Afters still hold 145 people indoors, so at 500 on site that needs a third space or a late slot on one of the two stages.

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
| Mar 15 | Decision on the 500 unlock |
| Mar 23 | Set times out. Sunday-only tickets open |
| Apr 9 | Final tier |

The ticket site has to be live by December 1 for the presale.

## Budget

The plan at a 275-ticket sell-out, with nothing agreed with artists yet.

| Money in | |
|---|---|
| Tickets, 275 at a $188 average | $51,630 |
| Cabins, 6 at $850 | $5,100 |
| Car camping, 55 passes at $50 | $2,750 |
| Merch, meal plan, vendors | $2,750 |
| **Total in** | **$62,230** |

| Mandatory hard costs | |
|---|---|
| Venue fee, 701 ticket-days at $10 | $7,013 |
| Kinetic Desert: $2,000 plus $15 on 200 tickets | $5,000 |
| Permits | $3,000 |
| Groceries for crew and artists | $2,800 |
| The Dome, at its cap | $2,000 |
| Cabin rental, 8 at $250 | $2,000 |
| Payment processing | $1,807 |
| Medical team, 3 days at $600 | $1,800 |
| Site supplies: wristbands, signage, radios, trash, firewood | $1,200 |
| Chef | $1,000 |
| Insurance | $750 |
| **Total hard costs** | **$28,370** |

**Surplus to share: $33,860.**

| Budgets that grow with sales | Share | At 275 tickets |
|---|---|---|
| Artists | 55% | $18,046 |
| Art, projection and lighting | 9% | $3,453 |
| Drinks for everyone | 7% | $2,297 |
| Reserve for surprises | 4% | $1,312 |
| Crew stipends | 6%, capped | $1,200 |
| Artist hospitality and airport runs | 2% | $956 |
| Marketing and design | 2% | $906 |
| **Total budgets** | | **$28,170** |

**Profit: $5,690, all yours.**

### Moving the artists' share

| Artists' share | Artists at 141 | Your take at 141 | Artists at 275 | Your take at 275 | All nine night slots unlocked by |
|---|---|---|---|---|---|
| 55% | $7,467 | $2,036 | $18,046 | $5,690 | 198 tickets |
| 50% | $6,788 | $2,715 | $16,405 | $7,331 | 209 |
| 45% | $6,109 | $3,394 | $14,765 | $8,971 | 221 |

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

Total: $18,325 across 24 sets. These are full fees. What artists are actually paid follows sales, as described under [How the money scales](#how-the-money-scales), and reaches this total at about 335 tickets, where every artist is at their full fee.

**The 7:00 gap.** One-hour sets from 2:00 to 7:30 leave half an hour over. I put it at 7:00, when the sun is going down (sunset is around 7:25 PM that weekend). Use it to switch the stage to its night look and for one short shared moment each day. The alternative is to make 6:00–7:30 a single 90-minute sunset set.

**Friday carries the most money, then Saturday, then Sunday.** A strong Friday is what makes someone buy the Fri–Sun ticket instead of arriving Saturday, and the longer ticket is worth $40 more to you. The artist budget slider keeps these day shares at any total. Every ticket type includes Sunday, so the Sunday headliner sells almost no extra tickets. Its job is to keep people on site. A one-time back-to-back from two acts already there from Friday or Saturday, at $750–$1,000 extra each, does that without a new booking.

**What each artist gets.** The fee, a room in the K Lodge apartment on the night they play one of the top three slots, a bed in a shared cabin if they stay longer, meals for their whole stay, and rides to and from Ontario or Palm Springs. They book their own flights.

**Choosing from quotes.** Ask each artist for two numbers: their full fee, and the least they would take as a minimum. Enter both on the Artists tab. The ladder shows the ticket count at which sales unlock that slot. When they agree, tick Agreed and set the per-ticket rate you settled on, or 0 for a flat minimum.

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

**Stipends.** The 12 crew stipends of $100 are paid from the crew stipend budget, which grows with sales. They pay 28% at 90 tickets, 68% at 141 and in full from about 212. Every crew member gets a ticket and a car pass at any size. If the $100 is a promise, move it to fixed pay on the Crew tab.

## Kitchen

One chef at $1,000 and $2,800 of groceries ($2,000 at 199 or fewer on site) covers about 590 meals from Wednesday to Wednesday: roughly 16 people for the four build and strike days, about 45 a day during the event, and artists who stay past their night.

The chef will need the six kitchen-help shifts above. Extras in order of value: the 60-person meal plan, then Monday brunch for everyone.

**Above 350 on site** a second chef comes in at $1,000 and the kitchen also feeds Project Seismic's 30, Kinetic Desert's 25 guests and every artist for the whole weekend. I budgeted $2,500 more in groceries for that: about 70 more people a day, three days, at the same cost per meal. Two chefs feeding around 115 people will need more than one kitchen helper per meal, so add volunteer shifts.

**Drinks.** Bulk seltzers and other drinks for everyone, now a budget that grows with sales: about $1,300 at 200 tickets, $2,300 at a 275-ticket sell-out and $2,900 at 384. Buy late, from the final figure. I assumed this means everyone on site, at every size, and non-alcoholic. If the drinks are hard seltzers for ticket buyers, check the licensing first: my understanding is that California can treat alcohol included with paid admission as a sale.

## Art, projection and lighting

This budget grows with sales: a $500 floor for path lighting, about $2,100 at 200 tickets and about $3,500 at a 275-ticket sell-out. The split below is for $3,000, in the order to spend it as the budget fills.

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
| This week | Put the five questions to the county planner. Ask your target artists for quotes. Start the ticket site |
| November | Kinetic Desert and Project Seismic deals in writing. Stage, truss and Dome dimensions. Draft the letter of intent and site plan |
| Dec 1–15 | Alumni presale on the new site |
| By Dec 11 | Submit the Temporary Use Permit application |
| Mid-December | Enter presale sales. Agree the first headliner guarantees the plan covers, and ask the others to hold |
| Jan 12 | First lineup. Tier 1 and Sat–Sun tickets open |
| Jan 22 | Last day to file the permit. Decide by now whether you are planning past 141 tickets |
| Feb 1 | Enter sales. Agree the next artists the plan covers |
| Feb 9 | Full lineup. Art grants and merch pre-order open |
| Mar 1 | Enter sales. Agree the remaining artists and commit the art budget |
| Mar 15 | 500 decision. Order porto-potties |
| Mar 23 | Set times. Sunday-only tickets. Fire permit application in by now at the latest |
| Apr 9 | Final tier. Grocery and drinks order from the final budgets. Shift schedule |
| Apr 21 | Load-in |

## Questions that would change this plan

1. **Will Kinetic Desert take $2,000 plus $15 a ticket above 75** in place of the profit share? Under the ladder a half share would pay them more at most sizes, so they may ask for a higher rate.
2. **Are the minimums right at half the full fee?** A lower minimum unlocks sooner. A higher one is easier to get an artist to accept.
3. **Is the queue order right?** I put all three headliners ahead of any direct support, as you described. Friday's support could come before Sunday's headliner if Friday matters more.
4. **Does The Dome have a minimum?** It earns $900 at 90 tickets for travel and setup.
5. **Does the venue have a minimum rental** below some ticket count?
6. **Will the crew accept a stipend that scales?** If the $100 is a promise, move it back to fixed pay on the Crew tab. The floor rises from 57 to 65.
7. **Will flown-in headliners take a minimum of half their fee** when they pay their own flights?
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
