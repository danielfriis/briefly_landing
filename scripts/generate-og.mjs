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

// Echo the podcast waveform from the landing hero as a quiet bottom accent.
const bars = Array.from({ length: 48 }, (_, i) => {
  const h = 12 + Math.round(46 * Math.abs(Math.sin(i * 1.27)));
  const x = 96 + i * 14;
  return `<rect x="${x}" y="${566 - h}" width="6" height="${h}" rx="3" fill="#fb9168" opacity="0.9"/>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff1e7"/>
      <stop offset="100%" stop-color="#fff8f2"/>
    </linearGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffd5bd"/>
      <stop offset="100%" stop-color="#fff4ea"/>
    </linearGradient>
    <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fb9168"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- brand: sunrise mark (scaled from favicon.svg) + wordmark -->
  <g transform="translate(96, 88) scale(1.5)">
    <rect width="64" height="64" rx="14" fill="url(#sky)"/>
    <circle cx="32" cy="40" r="13" fill="url(#sun)"/>
    <g stroke="#f97316" stroke-width="2.5" stroke-linecap="round">
      <path d="M32 16v5"/>
      <path d="M15 26l3.5 3.5"/>
      <path d="M49 26l-3.5 3.5"/>
    </g>
    <rect x="10" y="40" width="44" height="3" rx="1.5" fill="#d4502d"/>
  </g>
  <text x="206" y="148" font-family="${font}" font-size="58" font-weight="700" fill="#3a1f15">Recap</text>

  <!-- headline -->
  <text x="96" y="320" font-family="${font}" font-size="78" font-weight="700" fill="#3a1f15" letter-spacing="-1.5">Today&#8217;s news,</text>
  <text x="96" y="408" font-family="${font}" font-size="78" font-weight="700" fill="#3a1f15" letter-spacing="-1.5">recapped tomorrow.</text>

  <!-- subhead -->
  <text x="98" y="470" font-family="${font}" font-size="34" font-weight="500" fill="#97604a">Wake up to an AI-summarised podcast of the links you saved.</text>

  <!-- waveform accent + url -->
  ${bars}
  <text x="1104" y="556" text-anchor="end" font-family="${font}" font-size="30" font-weight="600" fill="#c79680">recap.am</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("Wrote", out);
