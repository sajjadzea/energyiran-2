// tailwind.config.js: تنظیمات Tailwind CSS
/**
 * Tailwind config
 * -------------------------------
 * Debug: none.
 * Troubleshoot: ensure content paths are correct.
 * Performance optimization: tree-shaking via content array.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
