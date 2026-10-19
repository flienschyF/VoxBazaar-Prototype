# VoxBazaar — Virtual Marketplace Prototype (R1)

**React + Vite · Responsive web · GitHub Pages compatible**

This repository is a working **interactive frontend demonstration** for the new VoxBazaar direction: independent makers open permanent digital booths, visitors explore Products and Projects, and products link visitors to booths. No events, venues, floor plans, check-in or checkout exist in this release.

## Start in VS Code

Requirements: Node.js 22+, npm.

```bash
npm ci
npm run dev
```

Open the local URL shown in your terminal (typically http://localhost:5173).

Run a production build:

```bash
npm run build
npm run preview
```

## Demo routes

The app uses hash-based routing. All of the following can be opened or refreshed on GitHub Pages:

| Page | Hash route |
|---|---|
| Homepage | `#/` |
| Products | `#/products` |
| Booths | `#/booths` |
| Projects | `#/projects` |
| Search | `#/search` |
| Product detail | `#/product/tenmoku-bowl` |
| Booth detail | `#/booth/kusuma-pottery` |
| Project detail | `#/project/indigo-revival` |
| Vendor onboarding sample | `#/sell` |
| Studio demo (local drafts) | `#/studio` |
| Account preview | `#/account` |

### State previews

The small **UI states** switcher at the lower-right provides developer/demo links for `default`, `loading`, `empty`, `error`, `offline`, and `no-permission` on the homepage and explore pages. These are **deliberate test state previews**, not real API failures. For example `#/products?state=error`.

## Deployment to GitHub Pages

This project **retains the existing** `.github/workflows/deploy.yml`. No separate `gh-pages` branch is needed.

1. Make a **backup** of your original repository folder.
2. Make a new working branch, then replace its `src/` directory and the other project files with these files (do **not** replace/delete the original `.git` directory).
3. Open the repository folder in VS Code, run `npm ci` and `npm run build`.
4. Use a new branch until you have checked the result:

   ```bash
   git switch -c marketplace-redesign
   git add .
   git commit -m "Build virtual marketplace R1 prototype"
   git push -u origin marketplace-redesign
   ```

5. On GitHub, open a Pull Request into `main`. Merge once reviewed; the existing GitHub Actions workflow deploys the `dist` build to GitHub Pages.
6. Under **Settings → Pages**, use **GitHub Actions** as the deployment source.

Expected site: https://flienschyf.github.io/VoxBazaar-Prototype/

## Source / scope

- Source: the original `VoxBazaar-GitHub` ZIP, Stitch desktop export (37 screens), and Stitch mobile export (130 screen variants).
- Design adaptation: brand primary blue `#1B63E0`, canvas `#F4F4F4`, white cards, Fraunces headings and Inter body. Built as **one responsive web codebase**, not two separate apps.
- Content: representative entries adapted and condensed from the Stitch examples. All vendor names, prices and descriptions are fictional demo content.
- Product vs Project: products have prices and **Visit Booth** links; projects show **Showcase**, with no price.
- No live backend, authentication, checkout, payment processing, vendor approval or user registration. The account page is illustrative only.
- Product-saving and draft creation use this browser's `localStorage`, not a shared database.
- Exported Stitch imagery uses `lh3.googleusercontent.com/aida-public/...` **remote URLs** in `src/data/stitchImages.json`. Images may need replacement with locally hosted, licensed media before a real launch; a plain placeholder displays if an image URL fails to load. Do not treat generated or sample imagery as licensed production assets.
- Old source pages that referred to the physical bazaar have been removed from this deliverable. Keep your original repository ZIP as the backup/reference. Do not restore event-management routes.
- Mobile pages and various state designs are **translated into shared React patterns**, not all 167 exported HTML screens implemented one-for-one. The desktop Vendor Studio and complete flows remain follow-up work.

## Recommended next development tasks

1. Replace external Stitch images with approved local assets.
2. Finish the Vendor Studio UI to match remaining desktop Stitch screens, once exported.
3. Add proper backend, validation, access controls and data persistence if proceeding beyond the prototype.
4. Run manual keyboard/screen-reader tests, mobile touch tests and automated WCAG audits. The code includes accessible patterns but is **not certified WCAG 2.2 AA**.
5. Confirm release-one features with stakeholders before commerce work (R2).
