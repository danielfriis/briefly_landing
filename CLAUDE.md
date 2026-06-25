# CLAUDE.md

Guidance for working in this repo (the marketing landing page for **briefing.fm**,
[briefing.fm](https://briefing.fm)). Built with Astro 5 + Tailwind CSS v4 — see
`README.md` for stack and commands.

## The "why" of the product

This is the heart of the pitch. Every piece of copy, every section, and every
visual on the landing page should serve it:

> We're bombarded with news every day — endless feeds, notifications, and noise
> no one could keep up with. **briefing.fm cuts through the noise for you**, surfacing
> only the most important headlines about the things you're **most curious about**,
> and delivers them as one short, calm podcast each morning.

The tension to hold throughout: **endless news in → one calm briefing out.**

Lead with this *why* (the problem it solves), not the *what* (the feature list).
Features — overnight AI research, radio-style scripts, private podcast feed,
saved links — are how the promise is delivered; they support the why, they don't
replace it.

### Voice & messaging

- **Tagline:** _Put down the feed. Press play._ — names the enemy (the endless
  feed / doomscroll) and the relief (just listen). Audio-native and ownable; avoid
  reverting to generic category lines like "news that matters" or "signal not noise."
- Calm, premium, and quiet — never breathless or hype-y. The aesthetic (warm
  cream neutrals — a paper-like off-white that reads as the calm antidote to a
  cold, glowing feed — near-black ink for crisp high-contrast type, one vivid
  orange accent used sparingly, an editorial serif — Noto Serif Oriya — for
  display headings, and generous whitespace) is itself part of the message: the antidote
  to noise. The shared design tokens live in `src/styles/global.css`. (They were
  previously kept in sync with the app's cool neutrals at
  `briefly/app/assets/tailwind/application.css`; the landing now intentionally
  runs *warm* — if you re-sync, carry the warm shift across rather than reverting.)
- Layout: a single calm column (`max-w-xl`) read top to bottom — one message
  per section, each paired with a single small, focused visual. The rhythm is a
  short story: full-screen hero (the relief of quitting the doomscroll) → "set
  it once" (follow topics) → "overnight" (we read the web) → "on your schedule"
  (press play whenever you want) → "wherever you listen" (podcast-app logos) →
  closing CTA → footer. Sections are separated by hairline `border-line` rules,
  not bands. Calm and linear — no grids, no side-by-sides.
- Centre the reader's curiosity ("the topics you're most curious about"), the
  overload problem, and the relief of cutting through it.

## What briefing.fm does (the feature set)

These are *how* the promise is delivered — keep them subordinate to the why, but
the landing copy should describe them accurately. Update this list when the
product gains or changes a capability.

- **Follow your curiosities** — choose presets (World news, Technology, Business
  & markets, …) or follow anything you're curious about; topics are researched
  fresh on the live web each night, never a fixed/pre-canned feed.
- **Overnight research → radio script** — AI reads across your topics, keeps only
  what's worth knowing, writes it into a tight script, and reads it back in a
  calm, natural voice. Each story keeps its source.
- **One curated briefing** — everything worth knowing, curated and compacted
  into a single daily listen. The value is curation + audio, not brevity:
  length varies with the day's news (often ~10–15 minutes), so don't pitch it as
  "short" or pin it to a fixed run time.
- **On your schedule** — you choose the exact delivery time and timezone; the
  briefing is waiting when you want it.
- **Save links for the morning** — drop any article, newsletter, or PDF into your
  next briefing; it's summarised alongside your followed topics.
- **Specials** — instantly generated briefings on one or more articles you share,
  produced on the spot and on demand (separate from the scheduled morning
  briefing). For when news breaks and tomorrow morning is too long to wait.
- **Private podcast feed** — a personal feed you add once to Apple Podcasts,
  Overcast, Pocket Casts, Spotify, or any RSS app; new briefings appear
  automatically each morning.
- **Private & yours alone** — topics and feed are private, secured by a secret
  link you can rotate at any time. No public profile, no social graph.
- **Pricing** — free during the beta; $9/month afterwards, with a 7-day free
  trial and no card needed to hear your first briefing.

## Design system

The shared tokens live in `src/styles/global.css` (`@theme`) and generate the
Tailwind utilities used across the page. Build new UI from these tokens rather
than ad-hoc values.

- **Colour — warm & paper-like.** Surfaces: `surface` `#fbf9f5` (warm cream page
  background), `surface-2` `#f2efe8` (secondary fills / chips), `elevated`
  `#ffffff` (cards & windows — crisp white pops on cream), `line` `#e8e3da`
  (hairline borders). Ink/text, high-contrast on cream: `ink-1` `#1c1815` →
  `ink-4` `#a8a193`. `ink-1`–`ink-3` pass WCAG AA on cream; **reserve `ink-4`
  for decorative / `aria-hidden` mock UI only** (it fails AA for real copy). A
  warm "stone" neutral ramp `palette-50…900` supplies the dark fills (primary
  buttons use `palette-800`). One vivid orange accent: `tint` `#ff4612` with a
  50–700 ramp — `tint-700` is the AA-safe accent for eyebrows/links on light,
  `tint` for fills, waveforms, and the play button.
- **Type.** Inter (body, `--font-sans`) + Noto Serif Oriya (display,
  `--font-display` / `.font-display`; its Latin subset is a refined,
  high-contrast editorial serif). Every serif display heading shares one
  line-height (1.15) and tight tracking (-0.021em) via `.font-display` — tuned
  toward palette.team's display system. The brand **wordmark is sans-serif**
  (Inter semibold "briefing.fm"); the serif is reserved for headings.
- **Layout & rhythm.** A single centered column (`main` at `max-w-xl`) with text
  held to `max-w-md`, one message per section, and generous whitespace.
  Sections are divided by hairline `border-line` rules (no bands). The header is
  sticky and transparent over the hero, frosting on scroll via
  `[data-site-header][data-scrolled]` (the only border appears once scrolled).
  The footer shares the page background — no band, no border.
- **Components.** Pill buttons (dark `palette-800` primary; hairline-bordered
  ghost), rounded cards (`rounded-2xl`) on `elevated` with `shadow-card` for the
  focused per-section mockups, hairline dividers (`border-line`), the animated
  hero scroll cue, visible `:focus-visible` rings in `tint`, and
  `prefers-reduced-motion` honoured (waveform). Aim for AA contrast and keep
  decorative mockups `aria-hidden`.
- **Mark — boom-box + sans wordmark.** The identity is a minimal Lucide
  "boom-box" mark (audio-native — it signals "press play") beside the sans-serif
  "briefing.fm" wordmark, shared via `src/components/Brand.astro` (header + footer).
  The mark is accent-orange, tying the logo to the play button and waveform. The
  app-icon / favicon (`public/logo.svg`, with `favicon.ico` + `apple-touch-icon.png`
  generated from it via `scripts/generate-favicon.mjs`) and OG card
  (`scripts/generate-og.mjs`) reuse the same orange boom-box outline on a white
  app-icon tile (a hairline `line` border defines the tile on light backgrounds) —
  identical to the navbar mark, just wrapped in the squircle.
- **Name — always `briefing.fm`, lowercase.** The product is branded with its
  domain: the wordmark, `<title>`, `og:site_name`, and OG card all read
  *briefing.fm* (never "Briefing"). Lowercase **briefing** on its own stays the
  common noun for an episode ("your morning briefing", "Today's Briefing" in the
  mock UI) — don't rename those. When the brand would fall at the start of a
  sentence, reword so it sits mid-sentence rather than capitalising it.

## Keep this file current

**If the product's why, positioning, tagline, or core messaging changes, update
this file in the same change.** It is the source of truth for the pitch — the
landing copy (`src/components/*.astro`), the page meta (`src/layouts/Layout.astro`),
and the social card (`scripts/generate-og.mjs` → `public/og.png`) should all stay
consistent with what's written here. When you touch the pitch, re-read this file
first, and leave it accurate for whoever comes next.
