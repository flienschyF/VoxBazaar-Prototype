# Stitch → React Integration Status

This delivery deliberately uses a **single responsive codebase** instead of treating every Stitch screen variation as a separate route. It is an **R1 integration starter**, not a complete reimplementation of all exported screens.

| Area | Current status | Remarks |
|---|---|---|
| Responsive homepage | Integrated | Craft-first content and desktop/mobile layouts |
| Product discovery | Integrated | Search, category filters, price sort, product card, demo states |
| Booth discovery | Integrated | Category/search and booth detail |
| Projects discovery | Integrated | Distinct showcase cards with no price |
| Product detail | Integrated | Visit Booth CTA, no cart/checkout |
| Booth detail | Integrated | Maker story, related products/projects |
| Project detail | Integrated | Project narrative, CTA to maker booth |
| Global search | Integrated | Filters products, booths and projects by keyword |
| UI states | R1 demo variants | Loading/empty/error/offline/no-permission preview for key public pages |
| Guest navigation | Integrated | Desktop header and mobile bottom tabs |
| Vendor onboarding | Simplified interactive demo | 3-step local draft, not original multi-screen production flow |
| Vendor Studio | Simplified interactive demo | Add/remove local product drafts; desktop D11 not finished in Stitch export |
| Account | Illustration only | No live auth or emailing |
| All other 130 mobile states | Pending | Visual reference only; do not assume implemented |
| Other 37 desktop pages | Pending | Not each independently ported |
| Payment, cart, orders | Out of scope | Release 2 only |
| Backend, database, permissions | Not included | GitHub Pages is static hosting |

**Assets:** `src/data/stitchImages.json` stores selected URLs appearing in the Stitch HTML. Replace them with approved self-hosted assets when preparing a production app.

**QA:** The JavaScript and JSX were syntax-transpiled successfully in the assistant environment. An actual Vite production build could **not** be completed there because npm package downloads were unavailable. Run `npm ci && npm run build` in VS Code before push, and address any environmental/tooling errors that arise.
