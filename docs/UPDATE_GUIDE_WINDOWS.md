# Update VoxBazaar on Windows / VS Code

You are already on the `dashboard-integration` branch. **Do not switch to `main` while updating**, especially if OneDrive previously locked folders during a branch switch.

## 1. Check Git

Open `VoxBazaar-GitHub` in VS Code:

```powershell
git branch --show-current
git status -sb
```

Expected branch: `dashboard-integration`. If there are important unsaved modifications, back up or commit them before copying files.

## 2. Copy this ZIP's content

1. Extract the **PATCH** archive.
2. Open its inner folder named `VoxBazaar-Update`.
3. Copy everything **inside** it (`src`, `docs`, `index.html`, `README.md`, etc.).
4. Paste into your existing local `VoxBazaar-GitHub` folder and **Replace** the matching files.
5. **Do not delete** the whole `src` folder and never delete `.git`, `node_modules` or `dist` manually.
6. If OneDrive interferes with file replacement, pause sync temporarily and close programs keeping those files open.

## 3. Test

```powershell
npm ci
npm run dev
```

Open:

- `http://localhost:5173/#/` — Homepage
- `http://localhost:5173/#/products` — 31 sample products priced in USD
- `http://localhost:5173/#/booths` — 8 fictional booths
- `http://localhost:5173/#/projects` — 9 showcases without prices
- `http://localhost:5173/#/studio/products` — Vendor sample products & editor, USD input
- `http://localhost:5173/#/studio/analytics` — sample metrics and USD finance preview
- `http://localhost:5173/#/admin/catalog` — Admin content list

Run:

```powershell
npm run build
```

Do not push/merge if the build fails.

## 4. Push changes to current branch

```powershell
git add .
git commit -m "Use English and USD, expand VoxBazaar demo content"
git push -u origin dashboard-integration
```

If the branch already has an open Pull Request, the push updates it automatically; otherwise create a PR from `dashboard-integration` to `main`. Merge only after reviewing the build and browser behavior.

## 5. Existing sample data / currency note

To prevent old IDR values from silently appearing as dollars, the new Vendor/Admin dashboard uses a **new localStorage namespace** (`voxbazaar-dashboard-r2-usd-v1`). Previous saved browser demo data is not erased but will not automatically appear in the USD demo. The project contains **fictional USD sample prices**; it does not calculate a live exchange rate.

## 6. Where to edit

- Sample products, booths, projects & dollar prices: `src/data/catalog.js`
- Dashboard sample data & persisted records: `src/dashboard/DemoStore.jsx`
- Vendor forms, prices & analytics: `src/dashboard/VendorPages.jsx`
- Admin dashboard/catalog: `src/dashboard/AdminPages.jsx`
- Homepage featured product count: `src/pages/Marketplace.jsx`
- UI CSS: `src/index.css` / `src/dashboard/dashboard.css`
