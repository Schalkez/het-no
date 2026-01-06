import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: false,
        crawlLinks: true,
        // Only prerender public pages, exclude CSR-only routes
        filter: ({ path }) => !path.startsWith('/app') && !path.startsWith('/_auth'),
      },
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      {
        find: 'node:stream/web',
        replacement: resolve(__dirname, './src/lib/shims/node-stream.ts'),
      },
      { find: 'node:stream', replacement: resolve(__dirname, './src/lib/shims/node-stream.ts') },
      {
        find: 'node:async_hooks',
        replacement: resolve(__dirname, './src/lib/shims/node-stream.ts'),
      },
      { find: '@', replacement: resolve(__dirname, './src') },
    ],
  },
  define: {
    // Polyfill Buffer for client-side
    'global.Buffer': JSON.stringify(undefined),
  },
  optimizeDeps: {
    exclude: ['@tanstack/react-query'],
  },
})
