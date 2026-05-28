# Anti-Goon — Next.js

1:1 port of the original static site (`../anti-goon-website`) into Next.js 14
(App Router). Visuals, animations, and interactive behavior are byte-identical
because the same `styles.css` and `script.js` are reused unchanged:

- `app/globals.css` — verbatim copy of the original `styles.css`.
- `public/script.js` — verbatim copy of the original `script.js`, loaded via
  `next/script` with `strategy="afterInteractive"` so its top-level DOM
  queries run after hydration.
- `app/page.js` — original `index.html` body translated to JSX.

## Run

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Build

```bash
npm run build
npm run start
```
