# VoxBazaar Frontend Prototype

React + Vite frontend-only prototype for Tenant/Vendor and Organizer. There is no backend. Account data, bazaar records, business profiles, and applications are stored in the current browser's localStorage; document selection, publishing, payment, messaging, and review actions are simulations only.

## Run locally

1. Install Node.js 22 or newer.
2. Open this project folder in VS Code.
3. In Terminal run:

   ```bash
   npm ci
   npm run dev
   ```

4. Open the local URL printed by Vite.

## Demo accounts

- Tenant / Vendor: `sarah@artisanbakery.com`
- Organizer: `alex@semiramis.events`
- Password for both: `VoxDemo!2026`

You can also create new Tenant or Organizer accounts from Sign Up. New accounts are stored locally in this browser.

## Main Tenant flow

1. Register or sign in as Tenant / Vendor.
2. Create or edit a business profile in **My Businesses**.
3. Open **Find a Bazaar** and choose a published bazaar.
4. Complete the 4-step application: business profile, products, operational requirements, and review/declaration.
5. Submit the application and track its status in **My Applications**.

## Main Organizer flow

1. Register or sign in as Organizer.
2. Open **Bazaars & Events** or click **Create Bazaar** on the dashboard.
3. Enter event name, slug, description, venue/address, event dates, registration dates, capacity, contact, category, branding colors, and required documents.
4. Save as draft, or satisfy the publish checklist and select **Save & publish**.
5. Review tenant submissions in **Applications** and update their statuses. Bazaar and application records are stored in localStorage so both roles can see changes in the same browser profile after signing in again.

## GitHub Pages

The `.github/workflows/deploy.yml` workflow builds and deploys the `dist` folder whenever code is pushed to `main`. In the repository's **Settings → Pages**, choose **GitHub Actions** as the deployment source. Keep `vite.config.js` set to `base: './'` and the entry path in `index.html` relative (`./src/main.jsx`).

## Included interactions

- Responsive tenant and organizer dashboards with sidebar navigation.
- Register/login role selection and demo accounts.
- Tenant business create/edit forms, search, and status badges.
- Bazaar create/edit, draft saving, validation, registration dates, capacity, brand color preview, required-document selection, and publish simulation.
- Four-step tenant bazaar application wizard and organizer application review/status changes.
- Existing Organizer Studio areas remain available: applications, booth map, vendors directory, compliance, financials, announcements, settings, workspace permissions, and profile controls.
- Hover, focus, active, disabled, toast, and modal states.

All sample people, event names, counts, fees, and statuses are illustrative. No real messages, payments, uploads, or external verification occur.
