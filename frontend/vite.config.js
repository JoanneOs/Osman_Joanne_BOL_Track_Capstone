import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite default (different from backend)
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // my backend port
        changeOrigin: true,
        secure: false
      }
    }
  }
})