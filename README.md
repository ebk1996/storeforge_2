
# StoreForge — E‑commerce Store Generator

Spin up a store in minutes: create a store, add products, pick a theme, preview, then export a static storefront ready for any host.

## Quickstart
```bash
npm i
npm run dev
```
Open http://localhost:5173

## Features
- Multi‑store, multi‑user (local‑first) via `zustand` + `localStorage`
- Products CRUD, theme editor (colors/layout)
- Live preview
- One‑click Export to static bundle (index.html, styles.css, app.js, data.json) using `jszip`
- No backend required

## Ship it
Export the .zip and deploy to Netlify/Vercel/GitHub Pages/S3/Cloudflare Pages.
