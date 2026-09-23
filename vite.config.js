import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The forms post to a relative /api/... path. In production the site and
// Django sit behind the same domain, so that path resolves on its own; in
// development this proxy stands in for that, which keeps the frontend free of
// API host config and avoids CORS entirely. `vite preview` gets the same
// treatment so the built site can be tested against the real backend.
const apiProxy = {
  '/api': {
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
  },
}

export default defineConfig({
  plugins: [react()],
  server: { open: true, proxy: apiProxy },
  preview: { proxy: apiProxy },
})
