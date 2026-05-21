# Design

## Visual Theme

Warm editorial print. The site looks like a glossy magazine print run: cream paper, deep ink, a single warm tan accent, and an Instrument Serif masthead. The energy is quiet confidence — not minimal-cold, not maximal-loud. Tactile, considered, slightly nostalgic. Whitespace is generous and asymmetric; numbered section markers (01, 02, …) anchor the rhythm. One section (Philosophy / "How I Think") inverts to dark ink-on-paper to break the cream monotony and signal the strategic core.

## Color Strategy

**Restrained.** Tinted neutrals carry the surface; a single warm accent appears in ≤10% of the visual weight — section numbers, marker dots, hover states, the italic word in the Hero. The accent never carries body text, never tints buttons by default, never appears as a gradient.

## Color Palette

All values defined as Tailwind theme tokens in `client/src/index.css`. Currently expressed in HSL; treat OKLCH conversions as future work when reworking the palette.

| Token | Value (HSL) | Role |
|---|---|---|
| `--color-paper` | `40 14% 97%` | Page background. Warm off-white, slightly yellow. The "paper" of the magazine. |
| `--color-ink` | `0 0% 8%` | Primary text and the inverted Philosophy section background. Near-black, very slightly warm. |
| `--color-warm` | `33 16% 89%` | Subtle dividers, card borders, skill chips, secondary surfaces. The "shadow on cream" tone. |
| `--color-accent` | `34 43% 64%` | The single warm tan accent. Section numbers, marker dots, hover, selection. |
| `--color-accent-dark` | `38 30% 45%` | Darker accent for text-on-paper where the lighter accent would fail contrast. |
| `--color-muted` | `0 0% 25%` | Body text where the full ink would be too heavy. Long-form paragraph color. |
| `--color-highlight` | `38 33% 94%` | Reserved highlight tone. Currently underused. |

**Prohibitions:** never `#fff`, never `#000`, never raw `amber-*` / `gray-*` from the default Tailwind palette in this codebase. Everything tints toward the warm hue. The inverted Philosophy section should use `paper` / `paper/80` / `paper/60` for text, not `white` — pure white reads cold against the warm ink.

## Typography

| Role | Family | Notes |
|---|---|---|
| Display & headings | **Instrument Serif** | Italic variant carries emphasis (the "Who Builds" in Hero, section numbers, "Beyond Work"). Weight 400 only — let the serif do the work, no bold. |
| Body & UI | **Manrope** | Sans-serif. Used for paragraphs, navigation, chips, buttons, labels. Weights 400 / 500 / 600 depending on role. |

**Scale anchors:**
- Hero `h1`: `text-6xl md:text-8xl lg:text-9xl` — the magazine masthead.
- Section `h2`: `text-4xl md:text-5xl` — anchored by an italic section number (`01`–`05`).
- Card / role `h3`: `text-2xl` (serif) for narrative cards; `text-base font-semibold` (sans) for role titles inside the timeline.
- Body: `text-sm` to `text-base` for paragraphs, `text-xs` for micro-labels and chips.
- Eyebrows: uppercase, `tracking-[0.15em]` or `tracking-widest`, `text-xs` or smaller.

**Line-height** is loose on body (`leading-relaxed`) and tight on display (`leading-[0.95]` on the Hero). Body lines should stay near 65–75ch via the `max-w-2xl` / `max-w-3xl` content widths already used.

## Motion

All motion routes through `client/src/lib/motion.ts` (`mobileMotion(isMobile)`), which exposes named presets: `fadeUp`, `heroFadeUp`, `navSlide`, `fadeX`, `expand`, `detailItem`, `bannerSpring`. Mobile cuts distances and durations roughly in half so scrolling feels snappy. Easing is Framer Motion's defaults; no bouncy springs except the consent banner.

- Section entrances: `fadeUp` (`opacity 0 → 1`, `y 30 → 0` desktop / `12 → 0` mobile).
- Hero stagger: `heroFadeUp(delay)` with progressively larger delays.
- Accordion / progressive disclosure: `expand` (`height 0 → auto`, `opacity 0 → 1`).
- Hover affordances: `transition-colors duration-300`, occasional `-translate-y-1` on cards.
- Reduced motion: globally honored via the `@media (prefers-reduced-motion: reduce)` rule in `index.css` and the `shouldReduceAnimations` flag in `AnimationContext`.

**Bans:** never animate layout properties (width / height directly), never bouncy springs on UI elements, never gradient-text animations.

## Layout

- Page max width: `max-w-7xl mx-auto` for every section.
- Page horizontal padding: `px-6` (constant across breakpoints).
- Vertical rhythm: `py-20` between sections (large), `py-16` for tighter sections (Skills, Footer).
- Section header pattern: italic accent-dark numeral (`01`–`05`), gap, serif heading, full-width `border-b border-warm` divider below the row.
- Grid breakpoints: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (Projects), `lg:grid-cols-4` (Skills), and a flex hero.
- Cards: sharp corners (no `rounded-*` on top-level cards), single-pixel `border border-warm`, `hover:border-accent`. No nested cards.
- Timeline (Experience): vertical `border-l border-warm`, accent dots at company markers, warm dots at role markers.

## Components & Patterns

| Component | Pattern |
|---|---|
| Section header | `01` italic accent + serif `h2` + `border-b border-warm pb-8 mb-16`. |
| Card | `border border-warm bg-paper hover:border-accent transition-all duration-300`. Sharp corners. |
| Chip / pill | `px-2.5 py-1 bg-warm/40 text-[11px] font-medium uppercase tracking-wide text-ink`. Used for skills and tech tags. |
| Eyebrow label | `text-xs font-semibold uppercase tracking-widest text-accent-dark`. |
| Progressive disclosure trigger | Text label + `ChevronDown` icon (Lucide), `rotate-180` on open. |
| Primary CTA | Filled `bg-ink text-paper` with `border-2 border-ink`. Inverts on hover. |
| Secondary CTA | Outlined `text-ink border-2 border-ink`. Fills on hover. |
| Timeline marker (company) | `w-3 h-3 rounded-full bg-accent` on `-left-[37px]`. |
| Timeline marker (role) | `w-2 h-2 rounded-full bg-accent` (first) or `bg-warm` (subsequent). |
| Image overlay | `bg-gradient-to-b from-ink/10 via-transparent to-ink/20` (was raw `amber-900/*`, now uses ink). |

## Iconography

[Lucide React](https://lucide.dev). Stroke width `1.5` throughout (`stroke-[1.5]`). Common sizes: `w-5 h-5` (UI), `w-6 h-6` (section accents), `w-8 h-8` (card icons). All progressive-disclosure triggers use the lucide `ChevronDown` (no unicode `▼`).

## Imagery

Personal photography from `attached_assets/` — Le Cordon Bleu pastries, skiing, golf video, drone build, travel advisor portrait. Treatment: object-cover crops, warm ink-tinted gradient overlay for atmospheric depth, no border-radius. The imagery is part of the breadth claim, never decorative.

## Anti-patterns (specific to this codebase)

- Side-stripe `border-l-2` colored accents on cards or expansion panels. Use a full border, a background tint, or nothing.
- `text-white` / `bg-white` / `border-white` in the Philosophy section. Use `text-paper` / `bg-paper/X` / `border-paper/X`.
- Raw `amber-*` / `gray-*` Tailwind classes anywhere. Always route through tokens.
- Unicode `▼` as a dropdown indicator. Use Lucide `ChevronDown`.
- `rounded-full` on standalone CTAs. The only legitimate `rounded-full` is on small timeline dots.
- Em dashes in copy. Use commas, colons, semicolons, or periods.
- Hard-coded focus removal without a `focus-visible` replacement.
