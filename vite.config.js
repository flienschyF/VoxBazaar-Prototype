import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Hash URL routing + relative asset base work on GitHub Pages project sites.
// The existing GitHub Actions workflow will deploy dist/ on pushes to main.
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] })
