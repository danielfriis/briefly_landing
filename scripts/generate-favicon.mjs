// Generates favicon assets from the radio (boom-box) logo in public/logo.svg.
//
// Re-run with `npm run favicon` whenever the logo changes. logo.svg stays the
// single source of truth — the crisp, scalable icon modern browsers prefer —
// and this script renders the raster fallbacks every other surface still needs:
//   - public/favicon.ico         16/32/48 px, PNG-encoded — the classic file
//                                browsers, bookmarks, and search results fetch
//   - public/apple-touch-icon.png 180 px, iOS / iPadOS home-screen icon
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = resolve(__dirname, "../public");
const svg = readFileSync(resolve(pub, "logo.svg"));

// Render the logo to a square PNG buffer. Transparent corners (the squircle) are
// kept for the .ico; the Apple icon flattens onto the white tile colour so iOS,
// which masks its own rounding, gets a full-bleed white square with no seam.
const png = (size, background) => {
  let pipe = sharp(svg).resize(size, size, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (background) pipe = pipe.flatten({ background });
  return pipe.png().toBuffer();
};

// Pack PNG buffers into a single .ico (PNG-encoded entries — supported by every
// modern browser and Windows Vista+). All fields are little-endian.
function pngsToIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(images.length, 4); // image count

  const entries = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;
  images.forEach(({ size, data }, i) => {
    const e = 16 * i;
    entries.writeUInt8(size >= 256 ? 0 : size, e); // width  (0 = 256)
    entries.writeUInt8(size >= 256 ? 0 : size, e + 1); // height (0 = 256)
    entries.writeUInt8(0, e + 2); // palette colors
    entries.writeUInt8(0, e + 3); // reserved
    entries.writeUInt16LE(1, e + 4); // color planes
    entries.writeUInt16LE(32, e + 6); // bits per pixel
    entries.writeUInt32LE(data.length, e + 8); // bytes of PNG data
    entries.writeUInt32LE(offset, e + 12); // offset to PNG data
    offset += data.length;
  });

  return Buffer.concat([header, entries, ...images.map((i) => i.data)]);
}

const ico = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, data: await png(size) })),
);
writeFileSync(resolve(pub, "favicon.ico"), pngsToIco(ico));
console.log("Wrote", resolve(pub, "favicon.ico"));

writeFileSync(resolve(pub, "apple-touch-icon.png"), await png(180, "#ffffff"));
console.log("Wrote", resolve(pub, "apple-touch-icon.png"));
