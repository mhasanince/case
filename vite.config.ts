import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  plugins: [react()],
});
