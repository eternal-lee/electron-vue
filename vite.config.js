import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import optimizer from 'vite-plugin-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 8089,
    host: true
  },
  plugins: [
    vue(),
    optimizer({
      electron: `const { ipcRenderer } = require('electron'); export { ipcRenderer }`
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
