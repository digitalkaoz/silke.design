import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [react({
    babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
  }), tailwindcss(),
    ViteImageOptimizer(),],
  ssgOptions: {
    script: 'async',
    beastiesOptions: {
      preload: 'media',
    },
  },
});
