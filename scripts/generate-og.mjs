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
const font = "Liberation Sans, DejaVu Sans, sans-serif";

// Clean, centred brand card: the app-icon logo, the wordmark, and the
// tagline — nothing else competing for attention.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff1e7"/>
      <stop offset="100%" stop-color="#fff8f2"/>
    </linearGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffd9c2"/>
      <stop offset="100%" stop-color="#fff4ea"/>
    </linearGradient>
    <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fb9168"/>
      <stop offset="100%" stop-color="#d4502d"/>
    </linearGradient>
    <clipPath id="logo-sq"><rect width="64" height="64" rx="14"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- app-icon logo (scaled from logo.svg), centred -->
  <g transform="translate(548, 188) scale(1.6)">
    <rect width="64" height="64" rx="14" fill="url(#sky)"/>
    <path d="M0 41.25 Q32 31.25 64 41.25 L64 64 L0 64 Z" fill="url(#hill)" clip-path="url(#logo-sq)"/>
  </g>

  <!-- wordmark -->
  <text x="600" y="408" text-anchor="middle" font-family="${font}" font-size="76" font-weight="700" fill="#3a1f15" letter-spacing="-1.5">Briefing</text>

  <!-- tagline -->
  <text x="600" y="470" text-anchor="middle" font-family="${font}" font-size="34" font-weight="500" fill="#97604a">The news that matters, without the noise.</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("Wrote", out);
