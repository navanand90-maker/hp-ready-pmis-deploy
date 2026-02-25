# HP-READY PMIS v2.0

**Unified Project Management Information System** for the Himachal Pradesh Recovery & Emergency Assistance for Development (HP-READY) World Bank-funded project.

## Agencies Covered
- **PWD** — Public Works Department
- **Jal Shakti** — Water Supply & Irrigation
- **DoE** — Department of Energy
- **Rural Dev.** — Department of Rural Development

## Features
- Executive Dashboard with KPIs, disbursement trends, risk alerts
- Project Management with intervention tracking and 8-stage journey view
- Procurement tracking using GoHP standard methods (NCB, e-Tender, GeM, etc.)
- Financial Management with corrected fund flow (WB → Treasury → Revenue Dept → Department → Vendors)
- M&E with results framework and automated reporting
- Safeguards & GRM dashboard
- Knowledge Management with case study documentation
- Downloadable progress reports with time-range filtering

## Quick Start (Local)

```bash
npm install
npm run dev
```

Open http://localhost:5173/hp-ready-pmis/

## Deploy to GitHub Pages

### Option A: Automatic (GitHub Actions — Recommended)

1. Create a new repository on GitHub named `hp-ready-pmis`
2. Push this code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HP-READY PMIS v2.0"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hp-ready-pmis.git
   git push -u origin main
   ```
3. Go to **Settings → Pages → Source → GitHub Actions**
4. The workflow will auto-deploy. Your site will be live at:
   `https://YOUR_USERNAME.github.io/hp-ready-pmis/`

### Option B: Manual (gh-pages branch)

```bash
npm install
npm run build
npm run deploy
```

Then go to **Settings → Pages → Source → Deploy from branch → gh-pages**

## Configuration

If your repo name is different from `hp-ready-pmis`, update the `base` path in `vite.config.js`:

```js
base: '/your-repo-name/',
```

## Tech Stack
- React 18
- Recharts (charts & data viz)
- Vite (build tool)
- GitHub Pages (hosting)

## Data Notice
All data shown is illustrative for demonstration purposes.
