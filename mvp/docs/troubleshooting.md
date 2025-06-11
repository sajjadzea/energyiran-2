# Troubleshooting

## Tailwind classes not applied
- Ensure `@tailwind` directives exist in `src/index.css`.
- Run `npm run dev` again after installing Tailwind to rebuild CSS.

## Vite server fails to start
- Check if another process uses the port and stop it or run `npm run dev -- --port=3001`.
- Delete `node_modules` and reinstall dependencies with `npm install`.

## React import issues
- Verify your import paths are correct and match file names.
- Restart the dev server if changes are not picked up.
