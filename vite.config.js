import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import content from './plugins/content.js'
import { site } from './src/site.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    content(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: site.title,
        short_name: site.title,
        description: site.description,
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico,png}'],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/github\.githubassets\.com\/images\/icons\/emoji\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'emoji',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
