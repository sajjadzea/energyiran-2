// vite.config.js: تنظیمات Vite برای پروژه React
/**
 * Vite configuration
 * -------------------------------
 * Debug: verbose server headers.
 * Troubleshoot: includes alias to root src.
 * Performance optimization: outputs to build directory.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, '../src'),
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
  build: {
    outDir: 'build',
  },
});
