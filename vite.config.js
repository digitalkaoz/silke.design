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
      quality: 90, // Optional: Adjust AVIF quality (default is 80)
      outputDir: 'public/img', // Optional: Specify output directory (default is process.cwd())
      preserveStructure: true, // Optional: Maintain source directory structure in output (default is true)
    }),
  ],
  ssgOptions: {
    script: 'async',
    beastiesOptions: {
      preload: 'media',
    },
  },
});
