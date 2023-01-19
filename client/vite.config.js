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
    host: true,
  },
  plugins: [react()],
});
