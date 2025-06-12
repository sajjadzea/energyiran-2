# Sample Web Project

## Description
A minimal web project template featuring a simple HTML, CSS, and JavaScript setup. Ideal for quick prototypes or learning purposes.

## Prerequisites
- [Node.js](https://nodejs.org/) 14 or higher
- npm package manager (comes with Node.js)
- Git

## Installation
```bash
git clone <repository-url>
cd <project-root>
npm install
```

## Project Structure
```
project-root
├── README.md
├── .gitignore
├── src/
│   ├── index.html
│   └── app.js
├── styles/
│   └── main.css
├── scripts/
│   └── build.sh
└── docs/
    └── setup-guide.md
```

## Usage
Run the development server:
```bash
npm start
```
Build optimized assets:
```bash
npm run build -- --minify
```

### Testing
```bash
npm install
npm test
```
- اجرای همه تست‌ها: `npm test`
- حالت واچ: `npm run test:watch`
- پوشش کد: `npm run test:coverage`

## Troubleshooting
1. **Dependencies failing to install**: Ensure you are connected to the internet and using a recent Node.js version. Delete `node_modules` and run `npm install` again.
2. **Port already in use**: If the development server fails to start, another process may be using the default port. Stop the conflicting process or run `npm start -- --port=3001` to specify a different port.
3. **Permission denied on scripts**: If `scripts/build.sh` cannot execute, run `chmod +x scripts/build.sh` to make it executable.

## Performance Optimization
- Minify assets and remove unused dependencies.
- Consider lazy-loading heavy modules and compressing images.
- Use `npm run build -- --minify` to generate a smaller production bundle.

## Running Tests
- Run all tests: `npm test`
- Watch mode: `npm run test:watch`
- Generate coverage report: `npm run test:coverage`
- CI mode: `npm run ci:test`

### Running Cypress E2E Tests
- **Locally with Chrome**:
  ```bash
  npm run e2e
  ```
- **In CI (Electron)**:
  ```bash
  npm run e2e:ci
  ```
- **In CI with Chrome** (if you prefer):
  ```bash
  npm run e2e:chrome
  ```

## License
MIT License
