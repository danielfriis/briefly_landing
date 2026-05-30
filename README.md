# briefly_landing

The static marketing landing page for **Morning Brief** (briefly) —
_save it now, hear it in the morning._

## What this is

A single, self-contained static page. No build step, no dependencies:

- `index.html` — page markup
- `styles.css` — all styling (warm, minimal, stone palette)
- `favicon.svg` — site icon

## Develop / preview

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Because it's fully static, it can be hosted anywhere — GitHub Pages,
Netlify, Cloudflare Pages, S3, etc. Point the host at the repository root.

The call-to-action links assume the app lives at `https://app.briefly.sh`;
update those URLs in `index.html` if the app domain differs.
