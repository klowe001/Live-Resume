# Product

## Register

brand

## Users

Primarily recruiters and hiring managers checking Kevin Lowe's background (BCG Principal, GenAI enablement lead for the New York office), often with his LinkedIn open in another tab. Secondary: prospective clients, BCG peers, and other builders. They decide within 60–90 seconds whether to read deeper or reach out, on a laptop in an office or on a phone between meetings. In 5 seconds they need who he is, his current title and company, what he's looking for, and how to reach him; in 60 seconds, the full career timeline.

## Product Purpose

A living resume that does what a PDF cannot: prove the claim. Kevin's pitch is "Strategist Who Builds" — a McKinsey-tier strategist who has crossed the chasm into shipping production code with agentic AI workflows. The site itself is the proof point. If the design feels like a built product (not a template, not a Squarespace), the thesis lands before the visitor reads a word. Success looks like: a recruiter gets the headline facts from the first screen, reconstructs the career from the timeline without cross-checking, and emails Kevin or opens his LinkedIn in the same session. Every fact must match LinkedIn exactly.

## Brand Personality

Three words: professional, approachable, impressive. The look is a magazine cover: a huge condensed masthead with Kevin's portrait layered in front, then a fast, plain résumé underneath. Copy is in third person ("Kevin writes the spec…"), plain and specific, with numbers wherever they exist. No slogans, no consultant filler, nothing that reads as AI-written. Not corporate consulting, not VC-tech, not portfolio cliché. The emotional goal is "this is actually really cool and nicely designed," earned by craft rather than decoration, with room for range (Le Cordon Bleu, a 3D-printed drone, a golf clip).

## Anti-references

- **Stripe / Linear / Vercel marketing sites** — the saturated dark-tech-product aesthetic. This site is not a SaaS pitch.
- **Squarespace / Notion templates** — generic portfolio scaffolding with stock imagery and identical card grids.
- **Consultant-corporate sites** (Bain, BCG official, McKinsey) — navy + gray + serif headings + safe.
- **Resume-as-card layouts** — the "personal site" cliché where every section is an identical bordered card with an icon + heading + paragraph.
- **Y-Combinator / dev portfolio dark mode** — neon-on-black, terminal aesthetic. The opposite of what we want.

## Design Principles

1. **The medium is the proof.** Every craft choice in this site (typography, motion, restraint) should silently demonstrate the thesis: "strategy and execution by the same brain." If the design feels considered, the bio is true.
2. **Cover, then résumé.** The first screen is a cover: masthead, portrait, and the recruiter's facts. Everything after it is built for scanning: dates beside titles, 17px body, no tiny caps, no decoration that slows reading.
3. **Headline facts first, depth one click away.** Order is Hero → Experience (with the career timeline) → Projects → How he works → Education → Life. The strongest proof stays visible; secondary bullets sit behind "N more".
4. **Warm restraint.** One paper palette, one ink, one warm accent. No second accent. No gradients on text. Color earns its place by being almost the only color.
5. **Show range without scattering.** The breadth claim ("strategy → code → pastry → drone") is core to the thesis but easy to mishandle as noise. Cluster, sequence, and gate breadth carefully so it reads as range, not randomness.

## Accessibility & Inclusion

Target: WCAG 2.1 AA on color contrast, keyboard navigation, and reduced motion. All text colors pass 4.5:1. Every interactive element gets a copper `:focus-visible` outline, there is a skip link, disclosures report `aria-expanded`, and the mobile menu lists every section. `prefers-reduced-motion` turns off the hero parallax, the portrait rise, and autoplay on the golf clip.
