# VoxBazaar Prototype

Prototype web: Landing (tenant) → Register ↔ Login. Vite + React + Tailwind v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di dist/
```

- Routing memakai hash (`#/`, `#/register`, `#/login`) jadi aman di GitHub Pages.
- Deploy otomatis: push ke `main`, lalu di repo buka Settings → Pages → Source: **GitHub Actions**.
- Foto hero: taruh file `public/hero.jpg` (otomatis tampil, kalau tidak ada muncul placeholder).
- Login demo: password `vox12345` berhasil; selain itu muncul error "attempts remaining".
- Semua form masih simulasi (belum ada backend).
