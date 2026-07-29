import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            // Ensure Set-Cookie headers from backend are usable by the browser on localhost
            const setCookies = proxyRes.headers['set-cookie'];
            if (setCookies) {
              proxyRes.headers['set-cookie'] = setCookies.map((cookie: string) =>
                cookie
                  .replace(/; secure/gi, '')
                  .replace(/; samesite=none/gi, '; samesite=lax')
              );
            }
          });
        },
      }
    }
  }
})