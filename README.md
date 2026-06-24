# briefly_landing

The marketing landing page for **Briefing** ([briefing.fm](https://briefing.fm)) —
_the news that matters, without the noise._

Built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).

## Stack

- **Astro 5** — static site generation, component-based `.astro` files
- **Tailwind CSS v4** — via the `@tailwindcss/vite` plugin (no `tailwind.config.js`; theme tokens live in `src/styles/global.css`)
- **Inter Variable** — self-hosted through `@fontsource-variable/inter`

## Project structure

```
src/
  components/    Header, Hero, HowItWorks, Features, CTA, Footer
  layouts/       Layout.astro   (html shell + <head> meta)
  pages/         index.astro    (assembles the components)
  styles/        global.css     (Tailwind import + theme tokens + waveform keyframes)
  config.ts      shared brand + app URLs
scripts/
  generate-og.mjs               (renders the social preview image)
public/
  favicon.svg
  og.png                        (1200×630 Open Graph / Twitter card image)
```

## Social preview (Open Graph)

`src/layouts/Layout.astro` sets the Open Graph + Twitter card meta so links
to the site render a rich preview. The card image lives at `public/og.png`
and is generated from the brand palette:

```bash
npm run og       # rewrites public/og.png from scripts/generate-og.mjs
```

Re-run it after changing the brand or tagline, then rebuild.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # outputs static files to dist/
npm run preview  # serve the production build locally
```

## Deploy

`npm run build` produces a fully static `dist/` — host it anywhere
(GitHub Pages, Netlify, Cloudflare Pages, S3, …).

The call-to-action links live in `src/config.ts` and assume the app is at
`https://app.briefing.fm`; update `appUrl` / `signUp` / `signIn` there if the
app domain differs.
