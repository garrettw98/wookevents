# Camp Tahquitz, April 23–26, 2027: event plan

Experimental bass and dubstep campout. Three days of music at The Bowl, afters at the K Lodge and The Dome until sunrise, everyone off site Monday.

The numbers in this plan come from one planning model. Open [`budget.html`](budget.html) to change any input and see profit, break-even and each partner's share update.

## The planner

[`budget.html`](budget.html) is organised in seven sections, with profit, break-even, people on site and your take pinned at the top.

| Section | What it holds |
|---|---|
| Overview | Ticket and artist-budget sliders, the profit chart, the scale stages, what moves break-even, and the full profit and loss |
| Tickets | Ticket mix, every price tier, add-ons and card fees |
| Artists | The artist budget slider and the fee for each of the 24 slots |
| Production | One card per partner: minimum guarantee, the stage and ticket count it comes in at, profit share, and the places it is given at each stage. Partners can be added |
| Crew | One row per role with people, pay, shifts each, shifts needed and coverage. Roles can be added |
| Costs | One row per cost, charged flat, per ticket, per ticket per day or per person on site, with the stage it starts at. Costs can be added |
| Timeline | Dated tasks with an owner and a done box |

**Scale stages** are what make it work beyond this event. Each stage is a limit on people on site (199, 350, 500, and you can add more). Every partner, crew role and cost names the stage it starts at, so guest lists and costs switch on as the event grows and the planner works out how many tickets fit.

**Saving.** Save plan stores the plan for everyone you share the page with. Changes you have not saved stay yours, so you can try a what-if without disturbing the saved plan. The copy in this repository saves in your browser only.

## The short version

1. **The 350 plan sells out at 275 tickets, and the full lineup breaks even at 249.** That is 91% sold before anyone makes a dollar, with about $4,700 of profit at a sell-out. Three things moved it: Kinetic Desert's 15 extra guests take 15 sellable places, card fees are your cost, and drinks for everyone add about $2,200.
2. **Reeguez Rocks sold 90.** If the full plan sells 90 again, the loss is about $19,900, or $10,000 each for you and Kinetic Desert.
3. **Site costs alone are covered by about 91 tickets.** Everything above that is the lineup. Each $1,000 of artist cost adds about six tickets to break-even.
4. **Let the alumni presale set the artist budget.** A leaner lineup at $11,300 breaks even at 206 tickets and makes about $12,100 at a sell-out.
5. **Stay on Stripe for the ticket site.** Card fees come to about $1,700 at a sell-out, 3% of online sales. The cheaper options save a few hundred dollars at most. Pay-by-bank is worth offering on cabins.
6. **California requires all-in prices.** The listed ticket price has to include every mandatory fee, so a processing fee cannot be added at checkout.
7. **The 500 unlock pays you once 334 tickets sell, and the upside is thin.** It adds about $9,200 of fixed cost, including a second chef and feeding the partners' people. With 116 on guest lists and crew, 384 tickets fit. At 384 sold the event makes about $15,000: $6,000 to you, $8,000 to Kinetic Desert and $5,000 to Project Seismic.
8. **Staying under 199 on site does not work.** Only 141 tickets fit, and even the leaner lineup loses about $4,300 with all of them sold.
9. **The crew plan is short by more than half.** Twelve ticket-only volunteers close the gap.
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
- **Show:** tickets sold by tier against the cap, money in by line, fees actually paid, costs against budget by category, progress to break-even, and each partner's share once final.
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

## What Reeguez Rocks changes

Ninety tickets proved the location. Every version of this event that pays real headliners needs at least twice that crowd. The ladder below is priced for this lineup, not for that one.

| Artist budget | Break-even | At 90 sold | At 150 | At 200 | At 275 |
|---|---|---|---|---|---|
| None | 91 | −$68 | $4,052 | $11,579 | $24,603 |
| Leaner, $11,300 | 206 | −$12,563 | −$8,443 | −$916 | $12,108 |
| Full, $18,325 | 249 | −$19,939 | −$15,819 | −$8,292 | $4,732 |

Profit and loss are both split 50/50 with Kinetic Desert, so your side is half of each figure. The artist budget slider on the budget page moves between these and anything in between.

**The leaner lineup** keeps all 24 sets and the same shape, with smaller numbers at the top:

| Time | Fri | Sat | Sun |
|---|---|---|---|
| 2:00–6:00 PM, five sets | $700 | $650 | $600 |
| 7:30 PM | $600 | $500 | $400 |
| 9:00 PM | $1,100 | $1,000 | $750 |
| 10:30 PM | $2,000 | $1,750 | $1,250 |
| **Day total** | **$4,400** | **$3,900** | **$3,000** |
| Share of budget | 39% | 35% | 27% |

**Decision points:**

| When | Signal | Decision |
|---|---|---|
| Dec 15 | Alumni presale: 50 Fri–Sun tickets at $169, sold before any lineup | Sold out: book the full curve. Under 25: book the leaner curve |
| Feb 1 | Three weeks after the first lineup announcement | Under 110 sold: close Sunday with a back-to-back from acts already on site |
| Mar 1 | 150 or more sold on the leaner lineup | Add a $3,000 name as a late headline announcement |
| Mar 15 | Sales on pace for 334 or more | Unlock 500 |

## What I assumed

Each of these is an input in the budget model.

| Assumption | Value used | Why it matters |
|---|---|---|
| Crew, artists and their guests | 58 up to 199 on site, 60 above | The base that every limit is counted from. The two extra are the medical team |
| Medical at 199 or fewer | $500 venue medical rep and $200 for your own kit | Replaces the $1,800 medical team. Venue reps never count toward people on site. Your own medical team does |
| Card fees | 2.9% + 30¢, all sales by card | About $1,700 at a sell-out, and eight tickets on break-even |
| Permits | $3,000, charged at 200 or more on site | Your ballpark. The one county figure I found is $2,108 |
| Extra cost above 350 | $2,500 porto-potties, $1,000 second chef, $2,500 more groceries, $800 supplies | The grocery and porto-potty figures are guesses. Get a porto-potty quote early because of Stagecoach |
| Drinks for everyone | $6 per person on site, at every size | Double my first guess, at your request. About $2,100 at 350 people and $3,000 at 500 |
| Car camping demand | One pass per five tickets | 95 of the 120 spots are for sale after 25 crew passes. Selling all 95 adds about $2,000 |
| Ticket mix | 65% Fri–Sun, 25% Sat–Sun, 10% Sunday | Drives average ticket price and the venue fee |
| Cabins sold | 6 of 8 | Two held for artists who stay on and for staff. Selling a seventh moves break-even to 245 |
| Merch, meal plan and vendor income | $10 per ticket | Untested. At 0, break-even rises to 264 |

I could not verify current booking fees for Pando!, Chmura, Huck.Jorris or Ferrofluid, so no slot below is assigned to a named artist on the basis of price.

## Capacity

Every limit is counted on people on site. Guest lists grow as the event does, so the number of tickets you can sell steps at each level.

| People on site | Without a ticket | Tickets that fit | Added cost |
|---|---|---|---|
| Up to 199 | 58 | 141 | Venue medical rep and your own kit, $700 |
| 200 to 350 | 75: adds 15 Kinetic Desert guests and the 2-person medical team | 275 | Permits, and the $1,800 medical team in place of the venue's rep |
| 351 to 500 | 116: adds 10 more Kinetic Desert guests, 30 for Project Seismic and the second chef | 384 | Porto-potties, Project Seismic's guarantee, a second chef, more groceries and supplies |

Kinetic Desert's 15 guests at the 350 level take the place of 15 tickets. If the event sells out, that is about $2,800 of profit. If it does not sell out, they cost nothing.

**The 500 unlock.** The main stage moves to a larger area with Kinetic Desert's production, and The Bowl becomes a side stage run by Project Seismic with their own artists.

- **Their deal:** a $2,000 minimum, a profit share half the size of yours and Kinetic Desert's, and 30 guest-list places for crew, artists and friends. That makes the split 40% you, 40% Kinetic Desert, 20% Project Seismic.
- **What it costs:** about $9,200 more in fixed costs, and 40 more places that cannot be sold. The costs are porto-potties, Project Seismic's guarantee, a second chef, groceries to feed Project Seismic's people, Kinetic Desert's guests and all artists, and more supplies.
- **When it pays:** the event itself is back in profit at 302 tickets. Your own take passes what a 275-ticket sell-out of the 350 plan gives you at 334 tickets. The same number holds for Kinetic Desert.
- **How much it pays:** at a full 384 your take is about $6,000, against $2,400 for a 275-ticket sell-out. That is $3,600 more for selling 109 more tickets.
- **If it loses money:** Project Seismic does not share a loss, so it falls on you and Kinetic Desert 50/50 and their $2,000 is still owed. They would only take on losses in exchange for a larger share.
- **Kinetic Desert's guarantee** stays at $2,000.

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
| Dec 1–15 | Reeguez Rocks alumni presale: 50 Fri–Sun at $169, plus cabins. Pays artist deposits and sets the artist budget |
| Jan 12 | First lineup announcement. Tier 1 opens, Sat–Sun tickets open |
| Feb 9 | Full lineup. Tier 2 opens when Tier 1 sells through |
| Mar 15 | Decision on the 500 unlock |
| Mar 23 | Set times out. Sunday-only tickets open |
| Apr 9 | Final tier |

The ticket site has to be live by December 1 for the presale.

## Budget

The 350 plan with the full lineup, at a sell-out of 275 paid tickets.

| Money in | |
|---|---|
| Tickets, 275 at a $172 average | $47,380 |
| Cabins, 6 at $850 | $5,100 |
| Car camping, 55 passes at $50 | $2,750 |
| Merch, meal plan, vendors | $2,750 |
| **Total in** | **$57,980** |

| Money out | |
|---|---|
| Artist fees, 24 sets | $18,325 |
| Venue fee, 701 ticket-days at $10 | $7,013 |
| Chef $1,000 and groceries $2,800 | $3,800 |
| Drinks for everyone, 350 people at $6 | $2,100 |
| Permits | $3,000 |
| Art, projection and lighting | $3,000 |
| Kinetic Desert guarantee | $2,000 |
| The Dome, at its cap | $2,000 |
| Cabin rental, 8 at $250 for the event | $2,000 |
| Medical team, 3 days at $600 | $1,800 |
| Payment processing | $1,684 |
| Crew and gate pay, 12 at $100 | $1,200 |
| Site supplies: wristbands, signage, radios, trash, firewood | $1,200 |
| Insurance | $750 |
| Marketing and design | $750 |
| Artist hospitality and airport runs | $600 |
| Contingency, 5% of fixed costs | $2,026 |
| **Total out** | **$53,248** |

**Profit: $4,732.** That is $2,366 to you and $4,366 to Kinetic Desert including the guarantee. Artists book their own flights, so there is no flight line.

### How the result moves with sales

| Paid tickets | Share of 275 | Result | Your half |
|---|---|---|---|
| 90 | 33% | −$19,939 | −$9,969 |
| 141 | 51% | −$12,687 | −$6,343 |
| 175 | 64% | −$12,177 | −$6,088 |
| 200 | 73% | −$8,292 | −$4,146 |
| 225 | 82% | −$4,072 | −$2,036 |
| 250 | 91% | $197 | $98 |
| 275 | 100% | $4,732 | $2,366 |

With the 500 unlock, 116 unticketed people and Project Seismic's deal:

| Paid tickets | People on site | Result | You, 40% | Kinetic Desert | Project Seismic |
|---|---|---|---|---|---|
| 300 | 416 | −$231 | −$115 | $1,885 | $2,000 |
| 325 | 441 | $4,305 | $1,722 | $3,722 | $2,861 |
| 350 | 466 | $8,840 | $3,536 | $5,536 | $3,768 |
| 384 | 500 | $15,009 | $6,003 | $8,003 | $5,002 |

Both partners' columns include their $2,000 guarantee.

## Artists

### The Bowl, each day, full lineup

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

Total: $18,325 across 24 sets.

**The 7:00 gap.** One-hour sets from 2:00 to 7:30 leave half an hour over. I put it at 7:00, when the sun is going down (sunset is around 7:25 PM that weekend). Use it to switch the stage to its night look and for one short shared moment each day. The alternative is to make 6:00–7:30 a single 90-minute sunset set.

**Friday carries the most money, then Saturday, then Sunday.** A strong Friday is what makes someone buy the Fri–Sun ticket instead of arriving Saturday, and the longer ticket is worth $40 more to you. The artist budget slider keeps these day shares at any total. Every ticket type includes Sunday, so the Sunday headliner sells almost no extra tickets. Its job is to keep people on site. A one-time back-to-back from two acts already there from Friday or Saturday, at $750–$1,000 extra each, does that without a new booking.

**What each artist gets.** The fee, a room in the K Lodge apartment on the night they play one of the top three slots, a bed in a shared cabin if they stay longer, meals for their whole stay, and rides to and from Ontario or Palm Springs. They book their own flights.

**Choosing from quotes.** You are collecting quotes and picking who fits. As a guide to slots: $2,500 and up plays 10:30, $1,500–$2,000 plays 9:00, $750–$1,000 plays 7:30. Enter each quote in the fee grid on the budget page to see break-even move.

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

**Drinks.** Bulk seltzers and other drinks for everyone, budgeted at $6 per person on site: $2,100 at 350 people and $3,000 at 500. I assumed this means everyone on site, at every size, and non-alcoholic. If the drinks are hard seltzers for ticket buyers, check the licensing first: my understanding is that California can treat alcohol included with paid admission as a sale.

## Art, projection and lighting

$3,000.

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
| Mid-December | Set the artist budget from the presale result. Choose from the quotes, send offers and pay deposits |
| Jan 12 | First lineup. Tier 1 and Sat–Sun tickets open |
| Jan 22 | Last day to file, by the 90 days you were given. Treat it as a backstop |
| Feb 1 | Sunday decision |
| Feb 9 | Full lineup. Art grants and merch pre-order open |
| Mar 1 | Headliner upgrade decision |
| Mar 15 | 500 decision. Order porto-potties |
| Mar 23 | Set times. Sunday-only tickets. Fire permit application in by now at the latest |
| Apr 9 | Final tier. Grocery order. Shift schedule |
| Apr 21 | Load-in |

## Questions that would change this plan

1. **Whether County Fire and a structure permit are separate applications.** They add lead time and possibly engineered plans.
2. **Artist quotes.** Enter each one in the fee grid on the budget page.
3. **How the alumni presale sells.** It sets the artist budget: about $18,300 if it sells out, about $11,300 if it sells under 25.
4. **Who the drinks are for, and whether any are alcoholic.** I assumed everyone on site and non-alcoholic, at $6 a head.

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
