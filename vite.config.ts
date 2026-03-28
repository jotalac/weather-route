import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: 'weather-route',
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,webm}'],
      },

      manifest: {
        name: 'Weather Route',
        short_name: 'WeatherRoute',
        description: 'Display weather on your route',
        theme_color: '#2e566f',
        background_color: '#141a1f',
        display: 'standalone',
        icons: [
          { src: '/favicon.ico', sizes: '32x32', type: 'image/x-icon', purpose: 'any' },
          { src: '/icons/logo_big.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/logo_small.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
