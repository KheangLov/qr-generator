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
      injectManifest: {
        globPatterns: [],
      },
      manifest: {
        name: 'QR Generator',
        short_name: 'QRG',
        description: 'Generate QR code',
        theme_color: '#ffffff',
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
      // workbox: {
      //   clientsClaim: true,
      //   sourcemap: true,
      //   cleanupOutdatedCaches: false,
      // }  
    }),
  ]
})
