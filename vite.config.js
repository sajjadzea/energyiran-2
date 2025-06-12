import { defineConfig } from 'vite';
import { resolve } from 'path';

// vite.config.js: Vite configuration with CSP headers
export default defineConfig({
  root: resolve(__dirname, 'public'),
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        mvp: resolve(__dirname, 'mvp/index.html'),
      },
    },
  },
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; connect-src 'self' https://jsonplaceholder.typicode.com;",
    },
  },
});
