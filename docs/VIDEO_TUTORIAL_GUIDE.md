# VoxBazaar — Video Tutorial Guide (English UI, USD)

**Audience:** stakeholders, teammates and prototype reviewers.  
**Mode:** fictional sample data, no real accounts, sales or shared database.  
**Suggested length:** 5–7 minutes.

## Before recording

1. Run `npm run dev` and verify `npm run build` completes without errors.
2. Open `http://localhost:5173/#/` (or the published GitHub Pages URL, once deployed).
3. For a clean Vendor/Admin demonstration, open **Vendor Studio → Settings → Reset demo data** and confirm. This only resets demo dashboard data in this browser. Saved hearts/wishlist may need to be cleared individually.
4. Choose 1440px desktop for the main recording and briefly preview 390px mobile view in Chrome DevTools.
5. Hide personal browser bookmarks and notifications during recording.
6. Do not enter actual customer details or real payment information.

## Narration and click path

| Time | Navigate to | Show on screen | Suggested English narration |
|---|---|---|---|
| 0:00–0:35 | `#/` | Homepage, categories and hero | “Welcome to VoxBazaar, an online home for independent makers and handmade goods. Visitors can explore products, virtual booths and creative projects from anywhere.” |
| 0:35–1:20 | `#/products` | 31 sample items, category filters, USD pricing, sorting | “Every product has a clear price in US dollars and a Visit Booth action. Products shown here are fictional examples for demonstration.” |
| 1:20–1:55 | Click a Product and Visit Booth | Product detail → permanent vendor booth | “A booth is a maker’s digital storefront, not a physical rental space. Buyers can discover other items and creative stories from the maker.” |
| 1:55–2:25 | `#/projects` | Showcase cards without prices | “Projects are a separate format for sharing methods and stories. They are not items for sale, so they don’t show prices or checkout.” |
| 2:25–3:45 | `#/studio` and `#/studio/products` | Vendor Overview, item list, Add Product → Save | “The Vendor Studio helps makers prepare listings. Let’s enter a product such as ‘Handwoven Rattan Tray’, set its price to 34 dollars, and save a local draft.” |
| 3:45–4:20 | `#/studio/projects` and `#/studio/booth` | Project creation and booth customization | “Vendors can also document creative projects and customize the identity of their permanent digital booth.” |
| 4:20–4:55 | `#/studio/analytics` | Sample trend and USD finance preview | “Discovery metrics are illustrative. Revenue and payouts display $0.00 because payments are not enabled in Release 1.” |
| 4:55–5:45 | `#/admin` and `#/admin/vendors` | Admin dashboard, approval workflow | “The Admin Studio previews maker verification and content moderation. Decisions are stored only in this browser and do not affect real users.” |
| 5:45–6:15 | `#/admin/catalog` and `#/admin/reports` | Product vs project, moderation reports | “Admins can review example content and reports. Product entries have USD prices; projects remain showcases without prices.” |
| 6:15–6:50 | `#/account/wishlist`, mobile viewport | Saved products, navigation | “VoxBazaar is also designed for mobile browsing and accessible navigation. This remains an interactive frontend prototype rather than a live purchasing platform.” |

## Sample form content (copy-paste)

**Product example**
- Name: Handwoven Rattan Tray
- Category: Basketry
- Price (USD): `34.00`
- Description: A handwoven tray made from natural rattan, designed for everyday serving and storage.
- Visibility: `Draft` while demonstrating the editor.

**Project example**
- Title: Exploring Natural Fibre Weaving
- Theme: Basketry
- Story: This project documents how natural fibres are prepared, woven and finished to create durable everyday objects.

**Vendor booth example**
- Booth name: Anyam Studio
- Category: Basketry
- Location: Yogyakarta, Indonesia
- Story: Natural fibres and traditional patterns for modern homes.

## Accuracy reminders for the recording

- There is **no checkout**, payment gateway, shipping label, real order processing or actual USD revenue in R1.
- CSV export contains **sample local data**.
- Changes made in the Vendor Studio **do not currently publish to the public static product catalog** and are not shared with other visitors/devices.
- Admin views are **not permission-protected**. Never present them as secure live admin tooling.
- Photographs originate from externally hosted Stitch references and may require internet access.
- Avoid describing any ratings, reviews, inventory counts, visitors or purchase metrics as real.
- The USD prices are fictional examples, not a currency conversion from IDR, and not offers to sell actual goods.
