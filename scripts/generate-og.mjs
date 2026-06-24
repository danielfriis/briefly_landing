// Generates the static Open Graph preview image (public/og.png).
//
// Re-run with `node scripts/generate-og.mjs` whenever the brand or
// tagline changes. Output is a 1200×630 PNG — the size social platforms
// (Facebook, LinkedIn, X, Slack, iMessage…) expect for link previews.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "../public/og.png");

const W = 1200;
const H = 630;
// Inter-like sans for the tagline; an editorial serif for the wordmark —
// mirrors the site's Inter + Newsreader pairing.
const sans = "Inter, Liberation Sans, DejaVu Sans, sans-serif";
const serif = "Newsreader, DejaVu Serif, Liberation Serif, Georgia, serif";

// Clean, centred brand card: the app-icon logo, the wordmark, and the
// tagline — nothing else competing for attention. Warm cream canvas,
// near-black ink, one vivid orange accent.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f2efe8"/>
      <stop offset="100%" stop-color="#fbf9f5"/>
    </linearGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff6ee"/>
      <stop offset="100%" stop-color="#ffe7d6"/>
    </linearGradient>
    <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ff6d3c"/>
      <stop offset="100%" stop-color="#ed3a0c"/>
    </linearGradient>
    <clipPath id="logo-sq"><rect width="64" height="64" rx="14"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- minimal rising-sun mark (matches logo.svg), centred above the wordmark -->
  <g transform="translate(553, 196) scale(1.5)">
    <rect width="64" height="64" rx="15" fill="url(#sky)"/>
    <path d="M17 40 a15 15 0 0 1 30 0 Z" fill="url(#hill)"/>
    <rect x="15.5" y="42.5" width="33" height="2.6" rx="1.3" fill="url(#hill)"/>
  </g>

  <!-- wordmark (serif) -->
  <text x="600" y="408" text-anchor="middle" font-family="${serif}" font-size="80" font-weight="600" fill="#1c1815" letter-spacing="-1">Briefing</text>

  <!-- tagline -->
  <text x="600" y="470" text-anchor="middle" font-family="${sans}" font-size="34" font-weight="500" fill="#726b61">Put down the feed. Press play.</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("Wrote", out);
