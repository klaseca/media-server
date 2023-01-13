import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { aliases } from './viteResolveAlias';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      ...aliases,
    },
  },
  server: {
    proxy: {
      '^/(?!@vite/client|src.+|@react-refresh|node_modules.+|@id.+).+': {
        target: 'http://localhost:3232',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
