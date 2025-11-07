import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteImageToAVIFPlugin } from 'vite-image-to-avif-plugin';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
    viteImageToAVIFPlugin({
      sourcePaths: ['public/img'],
      quality: 90, 
      outputDir: 'public/img', 
      preserveStructure: true, 
    }),
  ],
  build: {
    //ssr: true,
  },
  ssgOptions: {
    script: 'async defer',
    beastiesOptions: {
      preload: 'media',
    },
  },
});
