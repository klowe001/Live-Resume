# Design

## Visual Theme

A magazine cover that turns into a résumé. The hero layers three planes: a huge condensed "STRATEGIST / WHO BUILDS" masthead in ink, Kevin's cut-out portrait in front of it (his head overlapping the bottom of the first line, the way a cover subject overlaps the masthead), and the facts a recruiter needs in front of both. Everything below the hero is plain and fast to scan: big condensed section heads, a career timeline, dates beside titles, body copy at 17px. Warm paper and ink, one copper accent, two ink bands (How he works, Contact) for rhythm.

## Color Strategy

**Restrained.** Tinted neutrals carry the page. Copper is the only accent and stays under about 10% of the surface: bullets, kickers, the active nav underline, the "Show more" toggles, and the "Demo, not memo." line on ink.

One exception: the career journey line takes each logo's own color for its stretch (BCG green, Pizza Hut and Silicon Labs red, Wharton navy, SMU blue), so a stretch reads as that place at a glance. Those colors live with the logos in `lib/career.ts` and appear nowhere else.

## Color Palette

Tokens live in `client/src/index.css` under `@theme inline`, written in OKLCH.

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--color-paper` | `oklch(0.97 0.007 80)` | Page background | |
| `--color-paper-deep` | `oklch(0.935 0.014 78)` | Tinted surfaces: the "Open to" line, education bands, image placeholders | |
| `--color-ink` | `oklch(0.2 0.008 60)` | Text, dark bands, primary buttons | 16.7:1 on paper |
| `--color-ink-soft` | `oklch(0.41 0.01 60)` | Secondary text | 8.1:1 on paper |
| `--color-line` | `oklch(0.87 0.013 75)` | Rules and dividers | |
| `--color-accent` | `oklch(0.5 0.1 48)` | Copper accent, focus rings | 5.7:1 on paper |
| `--color-accent-light` | `oklch(0.8 0.075 60)` | Copper on ink | 9.6:1 on ink |

Old names (`warm`, `muted`, `accent-dark`, `highlight`) are aliases kept for the shadcn kit. Never use `#fff`, `#000`, `white`, `black`, or raw Tailwind palette colors.

**`@theme inline` gotcha:** inline themes do not emit runtime CSS variables. In plain CSS read tokens with `--theme(--color-accent)`, and in class names use the generated utility (`ease-out-quart`, `text-accent`), never `var(--color-…)` or `ease-(--…)`.

## Typography

One family: **Archivo** (Google Fonts, variable `wdth` 62–125, `wght` 400–900). Contrast comes from width and weight, not a second typeface.

| Role | Setting | Where |
|---|---|---|
| Masthead | `type-masthead`: 62% width, weight 850, uppercase, line-height 0.84 | Hero, "Demo, not memo.", "Get in touch", 404 |
| Section head | `type-section`: 70% width, weight 800, sentence case, `clamp(3rem, 7vw, 5.5rem)` | Experience, Projects, How he works, Education, Life |
| Name | Normal width, weight 800, `clamp(2.5rem, 4.2vw, 3.75rem)`, tracking -0.035em | Hero h1 |
| Item titles | Normal width, weight 700–800, 20–48px | Companies, roles, projects |
| Body | 17px (`1.0625rem`), line-height 1.6 | Everywhere |
| Secondary | 15px minimum | Notes, tags, captions |

Measure stays under about 68ch. No text below 15px except timeline year labels. No uppercase outside the masthead style.

## Hero mechanics

- `--mast` (set inline on the hero) is the masthead font size: `clamp(4rem, min(contentWidth × 0.152, (88svh − 26rem) / 1.85), 12rem)`. Width keeps a lane free on the right for the portrait's head; height keeps the masthead clear of the facts.
- Line 1 is right-aligned, line 2 left-aligned, so the head overlaps only the bottom of "STRATEGIST" and "WHO BUILDS" stays fully readable.
- The facts start at `4.5rem + 3svh + 1.68 × --mast + 1.75rem`, so they always sit below the masthead.
- The portrait's top is pinned to `--mast × 0.46` below the masthead top and its bottom to the hero bottom; its width follows from the image's aspect ratio. Its center sits at 78% of the page box at every desktop width.
- Mobile stacks the masthead (20.5vw), then a square top crop of the portrait (66vw) whose head overlaps the bottom of line 2, faded at the bottom, then the facts. Name, title, "Open to", Email and LinkedIn all fit in a 390×844 first screen.

## Motion

- Hero depth on scroll (desktop, not reduced motion): masthead moves at 0.7× page speed and fades to 6% over the first 260px (so the facts stay readable as they slide over it), portrait at 0.9× with a 3% scale-up, the facts at full speed. Transform only.
- Portrait rises 24px on load; skipped under reduced motion.
- Disclosures open by transitioning `grid-template-rows` with `ease-out-quart`; closed panels are `inert`.
- Nav underline scales on `transform`. Consent banner slides with an ease-out, no spring.
- No scroll-triggered fade-ins. Content is visible the moment it renders, which also keeps the prerendered HTML honest.
- `prefers-reduced-motion` is honored globally in `index.css` and via `AnimationContext`.

## Layout

- `page` utility: `max-width: 80rem`, gutter `clamp(1rem, 4vw, 3.5rem)`. Every section uses it, so left edges line up.
- Section rhythm: `py-20 md:py-28`. Experience and Education have no bottom padding because another paper section follows and its rule already marks the break; their last entry drops its own bottom padding too, so the gap is just the next section's top padding. Each section opens with `SectionHeading` (rule above, condensed head left, optional intro right).
- Experience and Education use a printed-CV grid: logo and name in a left column (3 of 12), detail on the right (9 of 12).
- Section order: Hero, Experience (with Career at a glance), Projects, How he works (ink), Education, Life, Contact (ink).

## Components

| Component | File | Notes |
|---|---|---|
| Nav | `nav.tsx` | Skip link, active-section underline via IntersectionObserver, LinkedIn button, full-screen mobile menu. Labels match section headings. |
| Hero | `hero.tsx` | Three layers described above. Logos: BCG, Pizza Hut, Silicon Labs, Wharton, SMU. |
| Career timeline | `career-timeline.tsx` | Journey chart (lg+): years along the bottom, an unlabeled rising line for experience, each stretch in that brand's color (Wharton drawn over BCG for the leave). Dots pin linked labels (logo, role, years); promotions marked on the BCG stretch. List with brand dots below lg. Data (`stops`, `milestones`) in `lib/career.ts`. |
| Experience / Education | `experience.tsx`, `education.tsx` | Data in `lib/career.ts`. Dates beside titles, in ink. Top highlights visible, the rest behind `Disclosure`. |
| Disclosure | `disclosure.tsx` | "N more" / "Show less", `aria-expanded`, grid-rows transition. |
| Projects | `projects.tsx` | Two featured rows (image and text alternate sides), then a compact row. Only links look clickable. |
| How he works | `how-he-works.tsx` | Ink band. One headline principle with its proof, two short principles. |
| Life | `life.tsx` | Baking grid (strip on phones), then skiing, golf video, travel. Video plays only on screen, with a pause button. |
| Footer | `footer.tsx` | Restates the ask; email as the primary button; Cookie settings reopens the consent banner. |
| Contact constants | `lib/contact.ts` | Email, LinkedIn, GitHub, and the "open to" sentence used in the hero and footer. |

Buttons: square corners, `border border-ink`, filled ink for primary, outline for secondary, inverting on hover. External links carry Lucide `ArrowUpRight`.

## Imagery

- Originals stay in `attached_assets/`. Web versions live in `attached_assets/web/` and are built by `script/optimize-media.py` (WebP via Pillow, golf clip to MP4 via ffmpeg).
- The hero portrait comes from `attached_assets/headshot.png`, a waist-up shot that is already cut out: `python3 script/optimize-media.py --portrait attached_assets/headshot.png --erode 0`. A photo with a background needs `swift script/cutout.swift <photo> <tmp>.png` first (macOS 14+, Apple Vision). If the new image has different proportions, update its width, height, and `lg:aspect-[…]` in `hero.tsx`.
- Logos come from `attached_assets/web/logos/`, made transparent by `python3 script/optimize-media.py --logos` (color-to-alpha against white, for light backgrounds only). Don't rely on `mix-blend-multiply` to hide white logo backgrounds: it stops working inside an isolated stacking context such as the hero.
- Logos never share one fixed height: a square mark at a wordmark's height looks half the size. Size them with `logoHeight()` / `logoScale()` in `lib/career.ts`, which gives squarer marks (SMU, Pizza Hut) up to 1.6× the height of wide ones (BCG, Wharton). The hero shows employers on one line and schools on the next.
- No gradient overlays on photos. No hover zoom. Every image has specific alt text, and every image tag carries width and height.

## Voice

Third person throughout the visible page ("Kevin writes the spec…", "His wife is a former Rockette."). Résumé bullets stay subject-free. Plain, specific, numbers where they exist. No slogans, no em dashes.

## Anti-patterns (specific to this codebase)

- Instrument Serif, italic accent words, numbered section markers (01–05), roman-numeral dates, and "Scroll" cues. These read as AI-generated and were removed on purpose.
- Tiny uppercase letter-spaced labels and uppercase chips.
- Hover lift, shadow, or zoom on anything that is not a link.
- Icon + heading + paragraph cards.
- Side-stripe borders, gradient text, glassmorphism.
- `var(--color-…)` in class names or CSS (see the `@theme inline` gotcha).
- Animating `width`, `height`, `top`, `left`, or `right`.
