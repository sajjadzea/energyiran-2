import { defineConfig } from 'vite';
import path from 'path';

// vite.config.js: Vite configuration with CSP headers
export default defineConfig({
  root: 'public',
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; connect-src 'self' https://jsonplaceholder.typicode.com;",
    },
  },
  preview: {
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; connect-src 'self' https://jsonplaceholder.typicode.com;",
    },
  },
});
