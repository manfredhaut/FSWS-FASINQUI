import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 9001,
    strictPort: true,
    proxy: {
      '/api': {
        // AQUI ESTÁ O PULO DO GATO: Usamos a URL pública da Cloud Workstation
        target: 'https://3000-firebase-fsws-fasinqui-1767099304255.cluster-dwvm25yncracsxpd26rcd5ja3m.cloudworkstations.dev',
        changeOrigin: true,
        secure: false, // Importante para evitar erros de SSL no ambiente de dev
      }
    }
  }
});