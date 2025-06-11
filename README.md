# Sample Web Project

## Description
A minimal full-stack template with Express back end and React front end.

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
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   └── index.jsx
├── tests/ (server tests)
├── __tests__/ (frontend unit tests)
├── cypress/ (e2e tests)
└── server.js
```

## Usage
Run the React development server:
```bash
npm run dev
```
Run Express server only:
```bash
npm start
```
Build for production:
```bash
npm run build
```

## Running Tests
Unit tests:
```bash
npm test
```
End-to-end tests (headless):
```bash
npm run e2e --headless
```

## Troubleshooting
See [docs/troubleshooting.md](docs/troubleshooting.md) for common fixes, including Cypress Xvfb requirements.
