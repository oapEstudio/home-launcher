import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
 // cacheDir: path.resolve(__dirname,'..','..','..','.vitecache'), 
  build: {
    outDir: 'build'
  }, 
  server: {
    watch: {
      // ignora la carpeta de cache para evitar file‑locks
      ignored: ['**/.vitecache/**']
    }
  },
  
})
