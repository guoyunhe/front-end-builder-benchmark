import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'APP_',
  root: './codebase',
  build: {
    outDir: 'dist/vite',
  },
  server: {
    open: true,
  },
  plugins: [react()],
});
