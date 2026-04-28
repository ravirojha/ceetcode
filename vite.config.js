import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Wandbox doesn't send CORS headers, so the browser can't call it
      // directly. The dev server proxies /wandbox/* to wandbox.org/api/*.
      '/wandbox': {
        target: 'https://wandbox.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wandbox/, '/api'),
      },
    },
  },
})
