import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'apple-icon.png',
        'icon.svg',
        'icon-dark-32x32.png',
        'icon-light-32x32.png',
      ],
      manifest: {
        name: 'See Date',
        short_name: 'See Date',
        description: 'Multi-calendar holidays viewer.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: 'apple-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'icon-dark-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'icon-light-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
})
