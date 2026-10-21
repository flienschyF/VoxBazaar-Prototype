# VoxBazaar — R1 dashboard integration QA checklist

Run `npm ci` and `npm run build` successfully before deploying. Then test in Chrome, Edge and at mobile width 390px / tablet 834px / desktop 1440px.

- [ ] Home, Products, Booths, Projects load and all details work.
- [ ] Product cards show prices and link to a digital Booth; Project cards show Showcase and no price.
- [ ] Vendor Studio dashboard loads and sidebar links work (mobile hamburger too).
- [ ] Products: search, filter, new, edit, publish/unpublish, confirm delete, CSV download.
- [ ] Projects: create, edit, delete; no price field.
- [ ] Booth appearance: modify title and description; refresh and see persisted local preview.
- [ ] Analytics: clearly marked illustration, not real telemetry.
- [ ] Orders: Release 2 placeholder clearly states no real orders.
- [ ] Admin: verify sample vendor with save decision; review moderation report; export CSV; manage demo categories.
- [ ] Audit: action appears after demo modification.
- [ ] Account: add product heart on public page, view on Wishlist, remove it.
- [ ] Notifications: mark one read; mark all read; filter unread.
- [ ] UI states: on `/studio` and `/admin`, choose Loading, Empty, Error, Offline, No permission; return to Default.
- [ ] Real login and admin access NOT misrepresented as secure or functional.
- [ ] Tab order, keyboard focus, labels, touch targets, no horizontal overflow at mobile widths.
- [ ] Refresh URLs such as `/#/admin/vendors` without 404.
- [ ] No console errors on navigation; public images loaded or show reasonable fallback.
- [ ] Browser `<title>` is just VoxBazaar.

## Known limitations

- A visual translation from 83 desktop Stitch screens and 130 mobile screens, not pixel-perfect reproduction of every Stitch screenshot.
- Public catalog uses sample JS data. Admin/Vendor demo records live only in browser localStorage and do not synchronize across visitors or devices.
- No backend authentication, authorization, file uploads, payment gateway, order service, analytics or server-side audit integrity.
- `npm ci` and full Vite build have to be run on the user's computer; network package installation was blocked in the artifact workspace. JavaScript/JSX files were independently syntax-checked with TypeScript's JSX parser.
