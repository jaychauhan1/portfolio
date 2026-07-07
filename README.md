# Houston Night Quest — Interactive Portfolio

Walkable pixel-art portfolio inspired by RPG exploration. Built with **Phaser 4**, **React**, and **TypeScript**, deployed free on **Vercel**.

## Live

**GitHub:** [github.com/jaychauhan1/portfolio](https://github.com/jaychauhan1/portfolio)

**Deploy:** Connect the repo to [Vercel](https://vercel.com) (Hobby / free) — import `jaychauhan1/portfolio`, no env vars needed. Your site will be live at `portfolio.vercel.app` or similar.

## Features

- **Houston at night** — explore a top-down map to discover resume sections
- **Agora Coffee** — spawn zone with contact info
- **Margiela / Diptyque aesthetic** — cream panels, serif typography, numbered sections
- **Ambient music** — generative night-drive pad (no copyrighted tracks)
- **Mobile fallback** — scrollable resume in portrait mode
- **Basketball court Easter egg** — hidden alley leads to skills box score

## Controls

| Input | Action |
|-------|--------|
| WASD / Arrow keys | Move |
| E | Interact with zone |
| ESC | Close panel |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub (`jaychauhan1/portfolio`)
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the repo — Vercel auto-detects Vite
4. Deploy — no environment variables needed

### GitHub Pages (alternative)

```bash
npm run build
# Deploy dist/ to gh-pages branch
```

## Project structure

```
src/
├── game/           # Phaser scenes, map, textures
├── components/     # React overlays, music, mobile fallback
├── data/           # resume.json content
└── types/          # TypeScript types
```

## Content

Resume content lives in `src/data/resume.json`. Update this file to refresh site content without touching game code.

## License

MIT — personal portfolio project.
