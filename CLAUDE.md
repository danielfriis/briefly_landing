# CLAUDE.md

Guidance for working in this repo (the marketing landing page for **Briefing**,
[briefing.fm](https://briefing.fm)). Built with Astro 5 + Tailwind CSS v4 — see
`README.md` for stack and commands.

## The "why" of the product

This is the heart of the pitch. Every piece of copy, every section, and every
visual on the landing page should serve it:

> We're bombarded with news every day — endless feeds, notifications, and noise
> no one could keep up with. **Briefing cuts through the noise for you**, surfacing
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
  orange accent used sparingly, an editorial serif — Newsreader — for display
  headings, and generous whitespace) is itself part of the message: the antidote
  to noise. The shared design tokens live in `src/styles/global.css`. (They were
  previously kept in sync with the app's cool neutrals at
  `briefly/app/assets/tailwind/application.css`; the landing now intentionally
  runs *warm* — if you re-sync, carry the warm shift across rather than reverting.)
- Layout: a wide, contained shell (`max-w-6xl`) with text held to a comfortable
  measure, full-bleed product mockups, and a clear section rhythm (sticky header →
  hero → "listen anywhere" band → how-it-works → radio showcase → feature grid →
  pricing → FAQ → closing CTA → footer). Reach for breadth and structure, not a
  single narrow column.
- Centre the reader's curiosity ("the topics you're most curious about"), the
  overload problem, and the relief of cutting through it.

## What Briefing does (the feature set)

These are *how* the promise is delivered — keep them subordinate to the why, but
the landing copy should describe them accurately. Update this list when the
product gains or changes a capability.

- **Follow your curiosities** — choose presets (World news, Technology, Business
  & markets, …) or follow anything you're curious about; topics are researched
  fresh on the live web each night, never a fixed/pre-canned feed.
- **Overnight research → radio script** — AI reads across your topics, keeps only
  what's worth knowing, writes it into a tight script, and reads it back in a
  calm, natural voice. Each story keeps its source.
- **One short morning briefing** — delivered daily, usually ~5–10 minutes.
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
  `tint` for fills, the rotating hero word, waveforms, and `hero-glow`.
- **Type.** Inter (body, `--font-sans`) + Newsreader serif (display,
  `--font-display` / `.font-display`). Every serif display heading shares one
  line-height (1.1) and tight tracking via `.font-display`. The brand wordmark
  is the serif "Briefing".
- **Layout & rhythm.** A wide contained shell (`max-w-6xl`) with text held to
  `max-w-2xl`/`max-w-3xl`, full-bleed product mockups, and generous whitespace
  between sections. The header is sticky and transparent over the hero, frosting
  on scroll via `[data-site-header][data-scrolled]` (the only border appears once
  scrolled). The footer shares the page background — no band, no border.
- **Components.** Pill buttons (dark `palette-800` primary; hairline-bordered
  ghost), rounded cards (`rounded-2xl`/`rounded-3xl`) on `elevated` with
  `shadow-card`, hairline dividers (`border-line`), the warm `hero-glow` behind
  product imagery, native `<details>` FAQ accordions, visible `:focus-visible`
  rings in `tint`, and `prefers-reduced-motion` honoured (waveform + rotating
  word). Aim for AA contrast and keep decorative mockups `aria-hidden`.
- **Mark — wordmark-led.** The serif "Briefing" is the identity. The icon is a
  minimal rising-sun mark (`public/logo.svg`) used only for the favicon / app
  icon / OG card (`scripts/generate-og.mjs`).

## Keep this file current

**If the product's why, positioning, tagline, or core messaging changes, update
this file in the same change.** It is the source of truth for the pitch — the
landing copy (`src/components/*.astro`), the page meta (`src/layouts/Layout.astro`),
and the social card (`scripts/generate-og.mjs` → `public/og.png`) should all stay
consistent with what's written here. When you touch the pitch, re-read this file
first, and leave it accurate for whoever comes next.
