import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // Docker access allow
    port: 5173,
    watch: {
      usePolling: true   // Windows + Docker fix
    }
  }
})