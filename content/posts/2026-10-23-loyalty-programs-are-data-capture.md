---
title: "Loyalty programs were always data capture programs"
date: 2026-10-23
summary: "The sign-in pays for the points. What years of loyalty work taught me about the data AI needs, and why I'm building the same thing for my house."
tldr: "Data capture is going to be critical to agentic AI success. That means non-intrusive ways of capturing data that add the absolute minimum. Additional workflow is super hard but equally important. I explore this in [the house assistant I'm building](/blog/2026-10-23-house-assistant-that-feeds-itself)."
topic: AI
---

When a retailer asks me why their loyalty program matters, I start with a receipt. Without a member number on it, a $140 basket is a $140 basket. With one, it's the third visit this month from someone who buys paint every spring, shops two stores, and hasn't opened the app since July.

That gap is most of the value. I've worked on five end-to-end loyalty redesigns for Fortune 500 retail, hospitality, and airline businesses, where members drive 50 to 70% of revenue. The points are what the business pays for the sign-in.

## Why the sign-in matters

A retailer can see plenty without you logging in. Card tokens, cookies, device IDs, the email you typed for an e-receipt. Stitching those into one person across a store, a website, and an app is possible, but it's slow and leaky, and it gets worse every time a browser tightens its privacy rules or you pay with a different card. (A whole industry of identity resolution vendors exists because this is hard.)

A member ID collapses all of that. You tell the business who you are, every time, in every channel, and you get points, status, or a free coffee in return. The business then sees what you browsed, bought, returned, and skipped, tied to one person. That's the trade, and good programs make it feel worth it.

## AI hits the same wall

Every assistant I've built runs into the same problem. The model is smart. It knows nothing about my situation unless something hands it the data.

Ask Claude or ChatGPT what to pick up at Home Depot and you get a generic list. Ask a system that knows what I bought last weekend, what's running low in the shop, and that someone already added paper towels to the list, and you get an answer.

So the hard part of personal AI looks a lot like the hard part of loyalty. You have to capture the data without asking the person to do work. Loyalty teams learned this the slow way. Every extra field on the sign-up form costs sign-ups, and every "scan your receipt" feature gets used by a sliver of members for about two weeks.

## Three lessons that carry over

1. Make capture a side effect. The best loyalty data comes from something the customer was already doing, like paying or ordering ahead. Ask for extra work and the data dries up
2. Pay for the data. Points are the payment in loyalty. For a personal assistant, the payment is a useful answer the first time you ask. If it's useless with partial data, nobody feeds it the rest
3. Earn trust with limits. Members accept a lot of tracking when the rules are clear, and they revolt when their data shows up somewhere they didn't expect. An agent reading your inbox lives under the same rule

## Where I'm taking this

I've been running this experiment on my own house. A Claude-based assistant reads my Gmail every night, pulls out anything house-related (purchases, service providers, contracts, and the peculiarities we keep discovering), and logs it to a Supabase database. My wife and I both reach it through an MCP server and a small website I built. It's been awesome so far.

Now I want to stretch it to cover the whole household, plus a workshop assistant for my new woodworking hobby (yes, another expensive hobby; I'm looking at you, golf and skiing). That puts me on the problem every loyalty team works on, capturing everything that matters without anyone doing data entry. I wrote up how I'm thinking about it in [a companion post](/blog/2026-10-23-house-assistant-that-feeds-itself).

Which loyalty program do you actually feel good about signing into, and why that one?
