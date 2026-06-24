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
// Inter-like sans for both the wordmark and the tagline — mirrors the site's
// sans-serif "Briefing" lockup (the editorial serif is reserved for headings).
const sans = "Inter, Liberation Sans, DejaVu Sans, sans-serif";

// Clean, centred brand card: the boom-box app mark, the sans wordmark, and
// the tagline — nothing else competing for attention. Warm cream canvas,
// near-black ink, one vivid orange accent.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f2efe8"/>
      <stop offset="100%" stop-color="#fbf9f5"/>
    </linearGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#241f19"/>
      <stop offset="100%" stop-color="#15110d"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- boom-box app mark (matches logo.svg), centred above the wordmark -->
  <g transform="translate(552, 196) scale(1.5)">
    <rect width="64" height="64" rx="15" fill="url(#tile)"/>
    <g transform="translate(8,8) scale(2)" fill="none" stroke="#fbf9f5" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
      <path d="M8 8v1"/><path d="M12 8v1"/><path d="M16 8v1"/>
      <rect width="20" height="12" x="2" y="9" rx="2"/>
      <circle cx="8" cy="15" r="2"/>
      <circle cx="16" cy="15" r="2"/>
    </g>
    <g transform="translate(8,8) scale(2)">
      <circle cx="8" cy="15" r="1" fill="#ff4612"/>
      <circle cx="16" cy="15" r="1" fill="#ff4612"/>
    </g>
  </g>

  <!-- wordmark (sans-serif) -->
  <text x="600" y="408" text-anchor="middle" font-family="${sans}" font-size="78" font-weight="700" fill="#1c1815" letter-spacing="-3">Briefing</text>

  <!-- tagline -->
  <text x="600" y="470" text-anchor="middle" font-family="${sans}" font-size="34" font-weight="500" fill="#726b61">Put down the feed. Press play.</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("Wrote", out);
