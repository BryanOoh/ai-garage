# AI Garage

A Next.js site showcasing Bryan's AI side projects — starting with [PixelAgent](/pixelagent), a live-DOM annotation tool for vibe coders.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **CSS** — design tokens in `app/styles/` (no Tailwind)
- **Fonts** — [DM Sans](https://fonts.google.com/specimen/DM+Sans) (site-wide), [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) + [DM Mono](https://fonts.google.com/specimen/DM+Mono) (PixelAgent pages)

Design tokens live in `app/styles/tokens.css` (xAI-inspired canvas system with a Garage-specific light theme).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — set SITE_URL and GitHub URLs
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical / Open Graph base URL |
| `NEXT_PUBLIC_GITHUB_AI_GARAGE_URL` | This repo on GitHub |
| `NEXT_PUBLIC_GITHUB_PIXELAGENT_URL` | PixelAgent package repo |
| `NEXT_PUBLIC_PIXELAGENT_DOCS_URL` | Docs URL (omit until published) |
| `NEXT_PUBLIC_PIXELAGENT_PAGE_ENABLED` | Set to `true` to open `/pixelagent` (default: closed) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |

## Project structure

```
app/
  _components/     Shared UI (header, theme toggle)
  pixelagent/      Product landing page
  styles/          CSS modules by concern (tokens, garage, pixelagent)
lib/               Site config, theme helpers, metadata builders
```

## CI

GitHub Actions runs `lint` and `build` on push/PR to `main` (see `.github/workflows/ci.yml`).

## Deploy (Vercel)

1. Push this repo to GitHub and confirm the **CI** workflow passes on `main`.
2. Import the repo at [vercel.com/new](https://vercel.com/new) (Framework: **Next.js**).
3. Add environment variables (Production + Preview):

   | Variable | Example |
   |----------|---------|
   | `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` |
   | `NEXT_PUBLIC_GITHUB_AI_GARAGE_URL` | `https://github.com/bryanoh/ai-garage` |
   | `NEXT_PUBLIC_GITHUB_PIXELAGENT_URL` | `https://github.com/bryanoh/pixelagent` |

4. Deploy, then set `NEXT_PUBLIC_SITE_URL` to the final domain and **Redeploy** if the URL changed.

Pushes to `main` deploy to production; pull requests get preview URLs automatically.
