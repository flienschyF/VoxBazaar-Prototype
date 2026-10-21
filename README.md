# VoxBazaar — Responsive Marketplace Prototype

React + Vite + public GitHub Pages demo. Based on your previously deployed R1 repository, the complete 83-screen Stitch desktop design archive, and the earlier Stitch mobile export.

**This is a prototype, not a live marketplace.** Products, booths, vendor applications, moderation records and reports are sample data. Vendor and Admin tools currently store changes only in the current browser using `localStorage`. This project does not authenticate or authorize real users, process purchases, or verify documents.

## Update — English interface, USD and more demo content

- Every public and dashboard price is presented in **USD ($)**, including the vendor product editor and the sample admin catalog.
- Public data now contains **31 fictional products, 8 vendor booths and 9 creative projects**. Vendor Studio starts with **6 Anyam Studio product examples**.
- Admin Studio sample catalog includes the full public sample products and projects (in a **separate local-only moderation copy**).
- The Finance preview uses **$0.00** for revenue and payouts because **checkout is not part of Release 1**.
- The code intentionally uses a new localStorage key to avoid silently reinterpreting previously entered IDR values as USD.
- Video narration and example data: `docs/VIDEO_TUTORIAL_GUIDE.md`.
- Windows instructions that avoid switching away from your existing branch: `docs/UPDATE_GUIDE_WINDOWS.md`.
- **The product examples use made-up USD prices, not real exchange rates or actual inventory.**

## Cara memasang ke repository GitHub LAMA (Windows / VS Code)

1. **Jangan hapus `.git`** di folder `VoxBazaar-GitHub`. Backup folder project jika belum.
2. Buka VS Code pada `VoxBazaar-GitHub`.
3. Buka terminal; gunakan branch `dashboard-integration` yang sudah kamu buat (jangan jalankan `git switch main` untuk update ini):

   ```powershell
   git branch --show-current
   git status -sb
   ```

   Lanjutkan ketika statusnya aman dan branch aktif adalah `dashboard-integration`. Jika ada uncommitted changes, backup/commit dahulu.
4. Ekstrak ZIP ini. Untuk **PATCH**, salin seluruh isi ZIP ke root `VoxBazaar-GitHub` dan pilih *Replace* bila diminta. Untuk **FULL**, backup dahulu lalu ganti folder `src` lama dengan `src` baru, kemudian salin `docs`, `.github`, dan file konfigurasi. **Jangan pernah menyalin, menghapus atau menimpa `.git`.**
5. Di terminal:

   ```powershell
   npm ci
   npm run dev
   ```

6. Buka `http://localhost:5173/` lalu periksa:
   - `http://localhost:5173/#/` — public homepage
   - `http://localhost:5173/#/studio` — Vendor Studio
   - `http://localhost:5173/#/studio/products` — product manager
   - `http://localhost:5173/#/studio/projects` — project manager
   - `http://localhost:5173/#/studio/analytics` — sample analytics
   - `http://localhost:5173/#/admin` — Admin Studio
   - `http://localhost:5173/#/admin/vendors` — vendor review
   - `http://localhost:5173/#/admin/reports` — report moderation
   - `http://localhost:5173/#/account` — Account hub
   - `http://localhost:5173/#/account/notifications` — notifications

7. Test responsive in Chrome DevTools at widths **390px, 834px, 1440px**. Test keyboard navigation, search, form fields, and empty/error states.
8. Check production build:

   ```powershell
   npm run build
   ```

   **If the build fails, do not push/merge.** Read the terminal error first.
9. Commit, push, and PR:

   ```powershell
   git add .
   git commit -m "Integrate VoxBazaar Stitch dashboards"
   git push -u origin dashboard-integration
   ```

   Open GitHub, create PR `dashboard-integration` → `main`, review it, merge only after tests pass, and wait for Actions deployment.

## Struktur kode: ubah di mana?

| Tujuan | File |
|---|---|
| Mengubah routing layar | `src/App.jsx` |
| Header/footer dan nav pengunjung | `src/components/Layout.jsx` |
| Homepage, Products, Booths, Projects dan search | `src/pages/Marketplace.jsx` |
| Detail produk, booth dan proyek | `src/pages/Details.jsx` |
| Vendor onboarding R1 | `src/pages/PrototypeTools.jsx` (`SellPage`) |
| Vendor Studio: Overview, CRUD Produk/Projects, Booth, Analytics, Orders placeholder, Settings | `src/dashboard/VendorPages.jsx` |
| Admin Studio: Overview, Vendors, Catalog, Reports, Categories, Audit, Settings | `src/dashboard/AdminPages.jsx` |
| Dashboard sidebar, header, badges, dialog, simulated UI states | `src/dashboard/DashboardShell.jsx` |
| Local data, persistence, CSV export | `src/dashboard/DemoStore.jsx` |
| Buyer Account, wishlist, notifications, future orders | `src/dashboard/AccountPages.jsx` |
| Dashboard styling + responsive | `src/dashboard/dashboard.css` |
| Public page styling | `src/index.css` |
| Static public catalog & photos | `src/data/catalog.js`, `src/data/stitchImages.json` |
| Brand tab title | `index.html` (`<title>VoxBazaar</title>`) |
| Deployment | `.github/workflows/deploy.yml`, `vite.config.js` |

## Important notes

- All dashboard sample actions are **local-only**. Editing sample products **does not** edit the public homepage (which still uses curated static sample data).
- `Products` = price and Visit Booth CTA. `Projects` = showcase with no price.
- No active checkout, payments, shipping, verification of ID documents or real order fulfillment in Release 1.
- `/admin` is accessible to visitors in this demo; **it must be protected by real authentication and server-enforced RBAC** before production.
- All 83 Stitch desktop designs are documented in `docs/STITCH_COVERAGE.md`. 14 useful Stitch screenshot references are in `docs/stitch-desktop-reference/`. These are **visual references, not imported interactive code**.
- Photographs in the current sample catalog reference externally hosted Stitch image URLs. The UI has a fallback if an image cannot be loaded.
- UI is responsive, but pixel-identical fidelity and WCAG AA compliance require manual browser/device audits; they are not certified by this ZIP.
- GitHub Pages uses hash routes (`#/studio/...`) intentionally to avoid page-refresh 404 errors.
