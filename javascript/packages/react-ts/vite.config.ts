import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// const cacheDir = path.resolve(__dirname, "..", "..", "node_modules", ".vite");

// https://vitejs.dev/config/
export default defineConfig({
  // cacheDir,
  resolve:{
    alias:{
      '@': path.resolve(__dirname,'./src'),
    }
  },
  plugins: [react()],
})
