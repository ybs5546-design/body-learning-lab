import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({root:'student-web',base:'./',plugins:[react()],build:{outDir:'../docs',emptyOutDir:true}});


