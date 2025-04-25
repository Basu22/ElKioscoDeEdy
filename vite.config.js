import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // Escucha en todas las interfaces
    port: 5173,        // (opcional) Elegí un puerto si no querés el por defecto
    watch: {
      usePolling: true, // Útil si tienes problemas con la detección de cambios
    },
  },
})
