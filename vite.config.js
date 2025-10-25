import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      overlay: false // Disables the error overlay if needed
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
})