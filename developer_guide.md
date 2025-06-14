# Developer Guide

This guide explains how to install dependencies, run unit tests with Jest, and troubleshoot common issues.

## Prerequisites
- **Node.js** 14 or newer
- **npm** (comes with Node.js)
- **Git** for cloning the repository

## Installation
1. Clone the repository and install dependencies:
   ```bash
   git clone <repository-url>
   cd <project-root>
   npm install
   ```
2. If the environment cannot reach the npm registry, consider:
   - Setting up an npm proxy or mirror (`npm config set registry <url>`).
   - Using a pre-populated cache (`npm ci --offline`).
   - Creating a separate build stage in Docker to run `npm ci` and copying the resulting `node_modules` directory into the final image.

## Running Tests
- **All tests**:
  ```bash
  npm test
  ```
- **Watch mode**:
  ```bash
  npm run test:watch
  ```
- **Coverage report**:
  ```bash
  npm run test:coverage
  ```
- **CI mode** (serial execution):
  ```bash
  npm run ci:test
  ```

### Installing Jest
If you see `jest: command not found`, install Jest as a development dependency:
```bash
npm install --save-dev jest
```
Running `npm install` at the project root also installs Jest and other required packages.

## Troubleshooting Tests
1. **Tests fail with `Cannot find module`**
   - Ensure `node_modules` exists and run `npm install` if not.
2. **Timeouts or hanging tests**
   - Increase Jest timeout using `jest.setTimeout` or check async code for unhandled promises.
3. **Network restrictions** during install
   - Use the caching or Docker strategies mentioned above.

## Project Structure (Testing)
```
project-root
├── tests/              # Root unit tests
│   └── unit/
├── backend/tests/      # Backend tests
└── developer_guide.md
```

Running `npm test` from the project root executes all Jest tests under `tests` and `backend/tests`.
