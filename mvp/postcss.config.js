// postcss.config.js: پیکربندی PostCSS و Tailwind
/**
 * PostCSS config
 * -------------------------------
 * Debug: none.
 * Troubleshoot: ensures plugins loaded correctly.
 * Performance optimization: minimal plugin list.
 */
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [tailwindcss, autoprefixer],
};
