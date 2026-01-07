# taylor.rip

Personal site + 2026 daily progress tracker

## Sites

- **taylor.rip** - Main site
- **daily.taylor.rip** - Progress tracker

## Daily Tracker

Tracks 2026 progress:
- Git commits (GitHub API - fetches from all your repos)
- Weight (Google Sheets) with line chart

**Sheet ID:** `1R9Veg8OkP4DwxhV9L_Y-tZg3QrsOR1i6T7ZnRm2YP9g`

## Setup

```bash
cd my-app
npm install
npm run dev
```

Add to `.env.local` in my-app folder:
```
GOOGLE_SHEETS_API_KEY=your_key_here
```

## Sheet Format

Just Date and Weight columns:

| Date | Weight |
|------|--------|
| 2026-01-01 | 72.2 |
| 2026-01-02 | 73.1 |

Sheet must be public (Anyone with link can view)

## Deploy

Add API key to Vercel env variables, then:

```bash
cd my-app
vercel --prod
```

## Features

- Compact header with totals
- Weight line chart (kg)
- Calendar grid (commits + weight dots)
- Simple progress bars

## Docs

See [IOS_SHORTCUTS_GUIDE.md](IOS_SHORTCUTS_GUIDE.md) for auto-sync setup.
