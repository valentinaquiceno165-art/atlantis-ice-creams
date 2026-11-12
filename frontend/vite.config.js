import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/atlantis-ice-creams/',
  server: {
    proxy: {
      '/api': {
        target: 'https://atlantis-ice-creams.onrender.com',
        changeOrigin: true,
        rewrite: (ruta) => ruta.replace(/^\/api/, ''),
      },
    },
  },
})


  
