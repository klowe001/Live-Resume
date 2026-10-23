---
title: "Designing a house assistant that feeds itself"
date: 2026-10-23
summary: "Twelve rolls of paper towels, and what it takes to build an assistant that collects its own data, shows up while I shop, and only keeps what it should."
topic: AI
---

Walking through the house, I notice we're almost out of paper towels. What I want to do takes five seconds. Say "add paper towels to the list, we probably need 12," and keep walking.

Everything after that sentence is the hard part. Where do we buy them? By when? And how does my wife know I already grabbed them, before she buys another 12?

My house assistant already handles the passive side. Every night Claude reads my Gmail, finds house-related purchases, service providers, and contracts, and writes them to a Supabase database we both reach through an MCP server and a small website. It reads my calendar too. I never type anything into it, and that's the feature I care about most.

Now I want it to cover the whole household, plus a workshop assistant for my new woodworking hobby that knows which clamps I own before I buy a duplicate. An assistant with half the data is worse than none, because you stop trusting it. These are the decisions I'm working through, with where I'm leaning on each.

## Capture: three inputs, zero forms

- Passive. Email receipts, the calendar, and eventually card transactions, swept on a schedule
- In the moment. Voice or text, whenever I notice something
- Confirmations. A yes or no question from the assistant when the passive data has a hole

For in-the-moment capture I want two doors. The first already exists. Open Claude, turn on Wispr Flow, and talk; the MCP server just needs an `add_to_list` tool. The second is a text message, because it works for my wife and me without opening an app.

I've been debating the Mac Mini route, with a dedicated Apple account and Claude driving iMessage. Several hundred dollars of hardware for a shopping list is hard to justify. A Twilio number runs a few dollars a month, and an incoming text hits a webhook that calls Claude and writes to the same database. The catch is that US carriers require A2P 10DLC registration even for a hobby number, so expect a round of paperwork before the first text goes through. I'm starting with Twilio and will buy the Mac Mini only if iMessage features (reactions, a family group thread) turn out to matter.

## Interpretation: ask one question, only when the answer changes the plan

"Add paper towels, we probably need 12" becomes a row with the item, a quantity of 12, who added it, and a status of open. Two fields are still blank, when we need them and where to buy them.

Where is easy. Paper towels show up at the grocery store, on Instacart, and at Home Depot, so the item gets tagged with every place that carries it.

When is the one worth asking about, and only sometimes. My rule is to ask a follow-up only when the answer changes what happens next. "Need these today, or next trip?" earns one text, because today means a nudge this afternoon and next trip means it waits. No reply defaults to next trip. Over time it should learn from history (paper towels are never an emergency in our house; wood glue in the middle of a glue-up is) and stop asking.

## Surfacing it while I shop, without tracking me

I don't want my location tracked all day. I also won't remember to check a list. The middle ground is to make the trip itself the trigger.

- I text "Going to Home Depot." The assistant replies with everything open that Home Depot plausibly carries, urgent items first, and marks those items as claimed by me
- For the few stores I visit most, an iPhone Shortcuts automation sends that same text when I arrive. The geofence lives on my phone, and the assistant only ever learns that I'm at Home Depot
- Before an Instacart order, "what do we need from the grocery store?" returns one list to work through

Claiming is how my wife's view shows "Kevin's getting these" before I've bought anything.

## Checking things off without a recap

After Home Depot I get in the car and drive. I'm not dictating a list of what I bought, and I'll forget half of it by dinner anyway. So check-offs have to come from data I'm already producing.

- Email receipts cover most of it. Home Depot emails an itemized receipt when you give it your email at checkout, and its Pro Xtra program keeps the purchase history, which makes it a loyalty program doing data capture on my behalf for once
- A card feed (Plaid, or the bank's own alert emails) tells the assistant a trip happened even when no receipt shows up
- Amazon is the hole. Its emails often skip the item details, and I suspect that's deliberate. The assistant matches an order to open list items when it can and asks when it can't
- The fallback is one question. "Saw a $43 Home Depot charge and no receipt. Did you get the paper towels and the wood glue?" Replying "yes" once I'm parked beats any recap

## Update frequency: people write instantly, sweeps can wait

Say I buy paper towels at noon and the nightly sweep marks them bought at 2 a.m. My wife checks the list at 3 p.m., sees paper towels still open, and picks up another 12. Now we own 24 rolls.

So the rule splits in two. Anything a person does (adding, claiming, checking off) writes to the database the moment it happens, and every surface reads from that one database. Background sweeps can stay nightly for things nobody is waiting on, like logging a contractor's invoice. Receipts are different. Gmail can push new mail to a webhook within seconds (the Gmail API's watch call with Pub/Sub), so "bought" can land minutes after checkout, and the claim from the store trip covers the gap.

## Surfaces: one database, thin windows

I don't think I need my own app yet. An app buys push notifications and a home-screen icon, and costs an App Store account plus maintenance forever. Text messages already push.

- Text for capture, store-trip lists, and the occasional question
- Claude, through the MCP server, for anything that needs reasoning, like "what do I still need for the bookshelf?"
- The website I already have, for browsing, editing, and fixing mistakes
- A wall tablet in the kitchen loses to the phone in my pocket. The workshop is the exception, where a cheap tablet showing the current project's cut list and parts earns its spot because my hands are covered in glue

## Trust: collect everything relevant, and prove it

The assistant only helps if it sees everything, and I only let it see everything if I trust what it keeps. The controls I'm building:

- An allowlist of what it may store (house purchases, service providers, contracts, house facts, household supplies, workshop tools and materials). Everything else it reads gets dropped
- A source link on every row, back to the email or text it came from, so any record can be audited in one click
- A review queue for anything it's unsure about, instead of a guess written straight into the table
- A weekly digest of what it stored, so drift shows up there before it shows up as a wrong answer

Then evals. I'm labeling a hundred real emails from my inbox as keep or skip by hand. Every time I change the prompt or swap models, I rerun the set and track two numbers. Precision (of what it stored, how much belonged there) is the trust number. Recall (of the real purchases, how many it caught) is the usefulness number. If precision drops, the change doesn't ship.

If you've built something like this, how are you capturing Amazon orders? That's the hole I haven't closed.
