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

## Keep this file current

**If the product's why, positioning, tagline, or core messaging changes, update
this file in the same change.** It is the source of truth for the pitch — the
landing copy (`src/components/*.astro`), the page meta (`src/layouts/Layout.astro`),
and the social card (`scripts/generate-og.mjs` → `public/og.png`) should all stay
consistent with what's written here. When you touch the pitch, re-read this file
first, and leave it accurate for whoever comes next.
