import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' + hash routing = jalan di GitHub Pages tanpa konfigurasi tambahan
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] })
