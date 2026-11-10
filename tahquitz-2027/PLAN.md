# Camp Tahquitz, April 23–26, 2027: event plan

Experimental bass and dubstep campout. Three days of music at The Bowl, afters at the K Lodge and The Dome until sunrise, everyone off site Monday.

The numbers in this plan come from one planning model. Open [`budget.html`](budget.html) to change any input and see every budget, the profit and each partner's share update.

## The planner

[`budget.html`](budget.html) is organised in eight sections. Profit, the ticket count that covers your commitments, people on site and your take stay pinned at the top.

| Section | What it holds |
|---|---|
| Overview | Tickets sold so far, the ticket count you are planning on, the artists' share, how every budget grows with sales, the scale stages and the full profit and loss |
| Tickets | Ticket mix, every price tier, add-ons and card fees |
| Budgets | Every budget that grows with sales: its share of the surplus, floor, cap and what is committed |
| Artists | All 24 slots: target fee, the budget each has right now, and a lock for when an artist agrees a price |
| Production | One card per partner: minimum guarantee, the stage and ticket count it comes in at, profit share, and the places it is given at each stage |
| Crew | One row per role with people, pay, shifts each, shifts needed and coverage |
| Hard costs | The mandatory costs, each charged flat, per ticket, per ticket per day or per person, with the stage it starts and stops at |
| Timeline | Dated tasks with an owner and a done box |

Partners, crew roles, budgets, hard costs, stages and timeline rows can all be added and removed.

**Saving.** Save plan stores the plan for everyone you share the page with. Changes you have not saved stay yours, so you can try a what-if without disturbing the saved plan. The copy in this repository saves in your browser only.

## The short version

1. **The budget now scales with sales.** Mandatory hard costs come off the top. Everything else, artists included, is a share of what sales leave over, so every budget grows with each ticket until you lock a price in.
2. **Hard costs and the budget floors are covered at 73 tickets.** Reeguez Rocks sold 90. Above 73, the plan makes money at every size as long as you do not lock in more than sales cover.
3. **With the starting shares, a 275-ticket sell-out gives artists about $18,400 and leaves $4,300 of profit.** At 200 tickets it is $10,600 and $2,300. At 141 it is $7,700 and $1,500.
4. **Locking is the only way to lose money.** Two $3,000 headliners locked today need 102 tickets to be covered. The top six slots, $13,000, need 176.
5. **Profit is the share you do not give away.** Artists take 58% of the surplus in the starting plan, which leaves 15% for you and Kinetic Desert. At 50% to artists your own take at a sell-out goes from $2,150 to $3,300.
6. **The 500 unlock is barely worth it on these shares.** Your take passes a 275-ticket sell-out only at 361 tickets, and at a full 384 it is about $2,400 against $2,150.
7. **Stay on Stripe for the ticket site and list all-in prices.** Card fees are a hard cost of about 3% of online sales.
8. **The permit is a Temporary Use Permit**, and tickets can go on sale before it is issued.
9. **The crew plan needs 12 ticket-only volunteers** on top of the 12 paid crew.
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
- **Show:** tickets sold by tier against the cap, money in by line, fees actually paid, costs against budget by category, how many tickets still stand between you and covering your commitments, and each partner's share once final.
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
2. **Mandatory hard costs come off first.** The venue fee, permits, insurance, medical, partner guarantees, The Dome, cabin rental, crew pay, groceries for crew and artists, site supplies and card fees. These are owed whatever sells.
3. **What is left is the surplus.** Every other budget takes a fixed share of it.
4. **The share nobody takes is the partners' profit**, split by parts as before.

A budget can also have a floor, which is the least the event can run on, and a cap. Floors count as committed from the start.

### The starting shares

| Budget | Share of the surplus | Floor |
|---|---|---|
| Artists | 58% | $1,800, which is 24 openers at $75 |
| Art, projection and lighting | 9.5% | $500, which is path lighting |
| Drinks for everyone | 7.5% | none |
| Reserve for surprises | 5.5% | none |
| Marketing and design | 2.5% | $250 |
| Artist hospitality and airport runs | 2% | $300 |
| **Partners' profit** | **15%** | |

I chose these so that a 275-ticket sell-out lands close to the plan you had: about $18,400 for artists, $3,200 for art and $2,150 for drinks, which keeps the doubled drinks budget. Change any share on the Budgets tab.

### What each ticket count buys

| Tickets sold | 90 | 141 | 200 | 275 | 384 |
|---|---|---|---|---|---|
| People on site | 148 | 199 | 275 | 350 | 500 |
| Money in | $20,835 | $30,500 | $42,110 | $57,980 | $81,916 |
| Mandatory hard costs | $15,450 | $17,541 | $24,073 | $26,447 | $38,721 |
| **Surplus to share** | **$5,385** | **$12,958** | **$18,037** | **$31,533** | **$43,195** |
| Artists | $3,270 | $7,663 | $10,608 | $18,436 | $25,200 |
| Art, projection and lighting | $741 | $1,460 | $1,943 | $3,225 | $4,333 |
| Drinks for everyone | $190 | $758 | $1,139 | $2,151 | $3,026 |
| Reserve for surprises | $139 | $556 | $835 | $1,578 | $2,219 |
| Marketing and design | $313 | $503 | $630 | $967 | $1,259 |
| Artist hospitality and airport runs | $351 | $502 | $604 | $874 | $1,107 |
| **Partners' profit** | **$380** | **$1,516** | **$2,278** | **$4,302** | **$6,052** |
| Your take | $190 | $758 | $1,139 | $2,151 | $2,421 |

At 200 tickets the next ticket brings in about $207. About $32 goes to hard costs, $102 to artists, $47 to the other budgets and $26 to profit.

The surplus drops where a stage begins. At 142 tickets the permit, the medical team and 15 more Kinetic Desert guests come in. At 276 the porto-potties, Project Seismic, the second chef and the extra groceries come in. A full 141 leaves more to share than 150 does.

### Artists: scale until locked

Each of the 24 slots has a target fee. Every open slot's budget is its target scaled to whatever the artist budget is right now, so the offer you can make rises as tickets sell.

| Slot | Target | Budget at 141 sold | At 200 | At 275 | At 384 |
|---|---|---|---|---|---|
| Friday 10:30 PM | $3,000 | $1,250 | $1,725 | $3,025 | $4,125 |
| Friday 9:00 PM | $2,000 | $825 | $1,150 | $2,000 | $2,750 |
| Friday 7:30 PM | $1,000 | $425 | $575 | $1,000 | $1,375 |
| Saturday 10:30 PM | $3,000 | $1,250 | $1,725 | $3,025 | $4,125 |
| Sunday 10:30 PM | $2,250 | $950 | $1,300 | $2,275 | $3,100 |

When an artist agrees a price, type the fee on the Artists tab and tick Locked. That fee is then fixed. The open slots share what is left, and keep growing with sales.

### What locking costs

Locked fees are the only part of this plan that can lose money, because they are owed even if sales stop.

| What is locked | Sales needed to cover every commitment | Sales at which the artists' own share covers it |
|---|---|---|
| Nothing | 73 | |
| Two $3,000 headliners | 102 | 122 |
| The top six slots, $13,000 | 176 | 224 |

The first number is the walk-away line: below it you would be paying for locked artists out of pocket. Between the two numbers, the locked fees are being paid out of profit and the other budgets' room. The planner shows both, and the top bar says how many tickets you still need.

### The catch, and how to work with it

Headliners have to be booked before most tickets sell. With 50 presale tickets nothing is covered yet, because hard costs alone need 73. So early locks are a bet on a forecast, and the plan cannot remove that. It can make the bet visible and small.

- **Enter tickets sold after every sales push.** The planner then shows what sales so far cover.
- **Lock in the order that sells tickets.** One headliner first, then the next once the covered-at number is behind you or close.
- **Hold instead of locking.** Ask artists to hold the date until a named day. A hold costs nothing.
- **Offer a guarantee plus a bonus.** For example $2,000 guaranteed and $500 more if 250 tickets sell. The artist's pay then keeps scaling after the lock. Enter the guarantee as the locked fee.
- **Pay deposits from ticket cash**, not ahead of it.
- **Commit other budgets late.** Art, drinks and marketing can wait until March and April, when sales are known. Enter each commitment on the Budgets tab as you make it.

### Making the rest scale

| Part of the event | How it scales |
|---|---|
| Partners | A guarantee plus a share, coming in at a stage. Already scaling |
| Guest lists | Set per partner per stage. Already scaling |
| Crew | Each role starts at a stage. Add roles at a higher stage as the gate, parking and kitchen need them |
| Hard costs | Each starts and stops at a stage, and can be charged per ticket or per person |
| Food and drinks | Crew and artist groceries are a hard cost. Drinks and any meal for everyone are budgets that grow |
| Tickets | Price tiers rise as each sells out |
| A bigger event | Add a stage on the Overview tab with its limit, then set which partners, crew and hard costs start there |

Two things outside the planner would finish the job. The ticket site can write tickets sold into the plan, so nobody types it. And the financials page can show this same waterfall, which makes the split with partners and the room left for artists visible to everyone.

## What I assumed

Each of these is an input in the planner.

| Assumption | Value used | Why it matters |
|---|---|---|
| The budget shares | 58% artists, 9.5% art, 7.5% drinks, 5.5% reserve, 2.5% marketing, 2% hospitality | My starting split. It leaves 15% as profit |
| Which costs are mandatory | Venue, permits, insurance, medical, guarantees, The Dome, cabins, crew pay, groceries, site supplies, card fees | Anything you would rather scale can be moved to a budget |
| Crew, artists and their guests | 58 up to 199 on site, 60 above | The base that every limit is counted from. Venue reps never count |
| Card fees | 2.9% + 30¢, all sales by card | About 3% of online sales |
| Permits | $3,000 at 200 or more on site | Your ballpark. The one county figure I found is $2,108 |
| Extra cost above 350 | $2,500 porto-potties, $1,000 second chef, $2,500 more groceries, $800 supplies | The grocery and porto-potty figures are guesses |
| Car camping demand | One pass per five tickets | 95 of the 120 spots are for sale after 25 crew passes |
| Ticket mix | 65% Fri–Sun, 25% Sat–Sun, 10% Sunday | Drives average ticket price and the venue fee |
| Cabins sold | 6 of 8 | Two held for artists who stay on and for staff |
| Merch, meal plan and vendor income | $10 per ticket | Untested |

I could not verify current booking fees for Pando!, Chmura, Huck.Jorris or Ferrofluid.

## Capacity

Every limit is counted on people on site. Guest lists grow as the event does, so the number of tickets you can sell steps at each stage.

| People on site | Without a ticket | Tickets that fit | What switches on |
|---|---|---|---|
| Up to 199 | 58 | 141 | The base plan, with the venue's medical rep and your own kit |
| 200 to 350 | 75 | 275 | Permits, the medical team and 15 Kinetic Desert guests |
| 351 to 500 | 116 | 384 | Porto-potties, Project Seismic and their 30 places, 10 more Kinetic Desert guests, a second chef, more groceries and supplies |

**The 500 unlock.** The main stage moves to a larger area with Kinetic Desert's production, and The Bowl becomes a side stage run by Project Seismic with their own artists.

- **Their deal:** a $2,000 minimum, a profit share half the size of yours and Kinetic Desert's, and 30 guest-list places. That makes the split 40% you, 40% Kinetic Desert, 20% Project Seismic. They share a profit but not a loss.
- **What it costs:** about $8,800 more in hard costs, and 41 more places that cannot be sold.
- **What it does:** at a full 384 tickets the artist budget reaches about $25,200, against $18,400 at a 275 sell-out. Your own take is about $2,400 against $2,150, because your share drops from 50% to 40% of the profit.
- **When it pays you:** at 361 tickets or more. Below that you take home less than a 275-ticket sell-out gives you.

On the starting shares, the 500 unlock mostly buys a bigger lineup. If you want it to pay the partners more, lower the artists' share above 350 before deciding.

Afters still hold 145 people indoors (105 in the K Lodge, 40 in The Dome). At 500 on site that needs a third space, or a late slot on one of the two stages if the sound permit allows it.

## Tickets

### Price ladder

Tiers sell in order. Averages are at a 275-ticket sell-out. These are the prices buyers pay, with nothing added at checkout.

| Ticket | Presale | Tier 1 | Tier 2 | Final | Average at sell-out |
|---|---|---|---|---|---|
| Fri–Sun | $169 × 50 | $189 × 60 | $209 × 50 | $229 × the rest | $193 |
| Sat–Sun | none | $139 × 20 | $155 × 30 | $169 × the rest | $154 |
| Sunday only | none | none | $79 × 15 | $85 × the rest | $82 |

- Early tickets are the cheap ones, so the average is about $155 at 90 tickets and $172 at 275.
- The $40 gap between Fri–Sun and Sat–Sun is deliberately small. It makes Friday feel close to free, which pushes people to arrive Friday.
- Hold Sunday-only tickets until set times are out, about a month before.
- Each Fri–Sun ticket nets its price less the $30 venue fee and about $6 of card fees. The Dome fee is capped at $2,000, so it stops costing anything after the 200th ticket.
- Add single-day Friday or Saturday tickets only if sales are behind in March.

### Add-ons

| Add-on | Price | Notes |
|---|---|---|
| Car camping pass | $50 | 120 spots: 25 comped to crew and volunteers, 95 for sale |
| Whole cabin, 9 beds, three nights | $850 | About $94 a bed. Six for sale. Put them in the presale: nights will be near freezing |
| Hoodie or shirt pre-order | $60–$65 | Pre-order only, so there is no leftover stock |
| Meal plan | about $45 for three dinners | Cap it at 60. Ask Environmental Health about food permits first |
| Vendor spots | $200 flat | One coffee and breakfast vendor matters more than the fee |

### On-sale calendar

| Date | What happens |
|---|---|
| Dec 1–15 | Reeguez Rocks alumni presale: 50 Fri–Sun at $169, plus cabins. The first sales figure to enter in the planner |
| Jan 12 | First lineup announcement. Tier 1 opens, Sat–Sun tickets open |
| Feb 9 | Full lineup. Tier 2 opens when Tier 1 sells through |
| Mar 15 | Decision on the 500 unlock |
| Mar 23 | Set times out. Sunday-only tickets open |
| Apr 9 | Final tier |

The ticket site has to be live by December 1 for the presale.

## Budget

The plan at a 275-ticket sell-out, with the starting shares and nothing locked.

| Money in | |
|---|---|
| Tickets, 275 at a $172 average | $47,380 |
| Cabins, 6 at $850 | $5,100 |
| Car camping, 55 passes at $50 | $2,750 |
| Merch, meal plan, vendors | $2,750 |
| **Total in** | **$57,980** |

| Mandatory hard costs | |
|---|---|
| Venue fee, 701 ticket-days at $10 | $7,013 |
| Permits | $3,000 |
| Groceries for crew and artists | $2,800 |
| Crew pay: chef $1,000 and 12 crew at $100 | $2,200 |
| Kinetic Desert guarantee | $2,000 |
| The Dome, at its cap | $2,000 |
| Cabin rental, 8 at $250 for the event | $2,000 |
| Medical team, 3 days at $600 | $1,800 |
| Payment processing | $1,684 |
| Site supplies: wristbands, signage, radios, trash, firewood | $1,200 |
| Insurance | $750 |
| **Total hard costs** | **$26,447** |

**Surplus to share: $31,533.**

| Budgets that grow with sales | Share | At 275 tickets |
|---|---|---|
| Artists | 58% | $18,436 |
| Art, projection and lighting | 9.5% | $3,225 |
| Drinks for everyone | 7.5% | $2,151 |
| Reserve for surprises | 5.5% | $1,578 |
| Marketing and design | 2.5% | $967 |
| Artist hospitality and airport runs | 2% | $874 |
| **Total budgets** | **85%** | **$27,231** |

**Profit: $4,302.** That is $2,151 to you and $4,151 to Kinetic Desert including the guarantee.

### Moving the artists' share

| Artists' share | Artist budget at 275 | Profit at 275 | Your take at 275 | Your take at 384 |
|---|---|---|---|---|
| 58% | $18,436 | $4,302 | $2,151 | $2,421 |
| 50% | $16,142 | $6,597 | $3,299 | $3,712 |
| 40% | $13,273 | $9,465 | $4,733 | $5,326 |

## Artists

### The Bowl, each day, target fees

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

Total: $18,325 across 24 sets. These are targets, reached at about a 275-ticket sell-out on the starting shares. Each open slot's budget is its target scaled to the artist budget at the time, as described under [How the money scales](#how-the-money-scales).

**The 7:00 gap.** One-hour sets from 2:00 to 7:30 leave half an hour over. I put it at 7:00, when the sun is going down (sunset is around 7:25 PM that weekend). Use it to switch the stage to its night look and for one short shared moment each day. The alternative is to make 6:00–7:30 a single 90-minute sunset set.

**Friday carries the most money, then Saturday, then Sunday.** A strong Friday is what makes someone buy the Fri–Sun ticket instead of arriving Saturday, and the longer ticket is worth $40 more to you. The artist budget slider keeps these day shares at any total. Every ticket type includes Sunday, so the Sunday headliner sells almost no extra tickets. Its job is to keep people on site. A one-time back-to-back from two acts already there from Friday or Saturday, at $750–$1,000 extra each, does that without a new booking.

**What each artist gets.** The fee, a room in the K Lodge apartment on the night they play one of the top three slots, a bed in a shared cabin if they stay longer, meals for their whole stay, and rides to and from Ontario or Palm Springs. They book their own flights.

**Choosing from quotes.** You are collecting quotes and picking who fits. Compare each quote with the slot's budget on the Artists tab. When you agree a price, enter it as the locked fee and tick Locked, and the top bar shows how many tickets cover it.

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
- The six sold cabins bring in $5,100 against $2,000 of rental for all eight. Budget firewood for all eight.
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

## Kitchen

One chef at $1,000 and $2,800 of groceries covers about 590 meals from Wednesday to Wednesday: roughly 16 people for the four build and strike days, about 45 a day during the event, and artists who stay past their night.

The chef will need the six kitchen-help shifts above. Extras in order of value: the 60-person meal plan, then Monday brunch for everyone.

**Above 350 on site** a second chef comes in at $1,000 and the kitchen also feeds Project Seismic's 30, Kinetic Desert's 25 guests and every artist for the whole weekend. I budgeted $2,500 more in groceries for that: about 70 more people a day, three days, at the same cost per meal. Two chefs feeding around 115 people will need more than one kitchen helper per meal, so add volunteer shifts.

**Drinks.** Bulk seltzers and other drinks for everyone, now a budget that grows with sales: about $1,100 at 200 tickets, $2,150 at a 275-ticket sell-out and $3,000 at 384. Buy late, from the final figure. I assumed this means everyone on site, at every size, and non-alcoholic. If the drinks are hard seltzers for ticket buyers, check the licensing first: my understanding is that California can treat alcohol included with paid admission as a sale.

## Art, projection and lighting

This budget grows with sales: a $500 floor for path lighting, about $1,900 at 200 tickets and about $3,200 at a 275-ticket sell-out. The split below is for $3,000, in the order to spend it as the budget fills.

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
| Mid-December | Enter presale sales. Lock the first artist the plan can carry, and ask the others to hold |
| Jan 12 | First lineup. Tier 1 and Sat–Sun tickets open |
| Jan 22 | Last day to file, by the 90 days you were given. Treat it as a backstop |
| Feb 1 | Enter sales. Lock the next artists the plan covers |
| Feb 9 | Full lineup. Art grants and merch pre-order open |
| Mar 1 | Enter sales. Lock the remaining artists and commit the art budget |
| Mar 15 | 500 decision. Order porto-potties |
| Mar 23 | Set times. Sunday-only tickets. Fire permit application in by now at the latest |
| Apr 9 | Final tier. Grocery and drinks order from the final budgets. Shift schedule |
| Apr 21 | Load-in |

## Questions that would change this plan

1. **Are the shares right?** 58% to artists leaves 15% as profit. That is the main dial in the plan.
2. **Is anything I called mandatory really optional?** Groceries, cabin rental and crew pay are the ones to look at. Anything optional can become a budget that grows.
3. **Will artists take a hold, or a guarantee plus a bonus?** Either one lets their pay keep scaling after you commit.
4. **Whether County Fire and a structure permit are separate applications.**
5. **Who the drinks are for, and whether any are alcoholic.** Hard seltzers given to ticket buyers may count as a sale under California's alcohol rules.

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
