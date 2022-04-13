import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      srcDir: 'src',
      filename: 'sw.ts',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],  
      strategies: 'injectManifest',
      registerType: 'autoUpdate',
      injectManifest: {
        globPatterns: [],
      },
      manifest: {
        name: 'QR Generator',
        short_name: 'QR Generator',
        description: 'Generate QR code',
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        start_url: "/",
        lang: "en-US",
        orientation: "portrait-primary",
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      },
      workbox: {
        clientsClaim: true,
        sourcemap: true,
        cleanupOutdatedCaches: true,
        globPatterns: [],
        runtimeCaching: [
          {
            urlPattern: '/manifest.json',
            method: 'GET',
            handler: 'CacheFirst',
            // @ts-ignore
            strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: '/favicon.ico',
            method: 'GET',
            handler: 'CacheFirst',
            // @ts-ignore
            strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: '/*',
            method: 'GET',
            handler: 'CacheFirst',
            // @ts-ignore
            strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: '/pwa-192x192.png',
            method: 'GET',
            handler: 'CacheFirst',
            // @ts-ignore
            strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: '/src/main.ts',
            method: 'GET',
            handler: 'CacheFirst',
            // @ts-ignore
            strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
          },
        ]
      },
      devOptions: {
        enabled: true
      }
    }),
  ]
})
