# VoxBazaar Web Prototype

Frontend-only prototype for the VoxBazaar tenant/vendor and organizer journeys. Built with React, Vite, Tailwind CSS v4, and Lucide icons. No backend or real authentication provider is connected.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). To verify a production build:

```bash
npm run build
npm run preview
```

## Prototype flows

- Landing page → Register → Sign in → role-specific workspace → Sign out.
- Register as **Tenant / Vendor** or **Organizer**; registration data is stored in this browser's local storage.
- Demo tenant: `sarah@artisanbakery.com`
- Demo organizer: `alex@semiramis.events`
- Password for both demo accounts: `VoxDemo!2026`
- Google/Apple sign-in, password reset, and workspace actions are intentionally simulated.
- Hash routing (`#/`, `#/register`, `#/login`, `#/dashboard`) works with GitHub Pages.

## Publish to GitHub Pages

1. Push the project to a GitHub repository on the `main` branch.
2. In repository **Settings → Pages**, set the source to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds the app and deploys `dist/` on each push to `main`.

## Important

This is a demo only. Local storage is not secure authentication and must not be used for real user accounts or sensitive data. Replace it with a proper backend/auth provider before production use. The Figma link could not be fetched in this environment, so the implementation preserves the visual language and components in the supplied source files rather than claiming a pixel-perfect comparison.
