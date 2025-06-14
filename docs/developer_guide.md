# Developer Guide

## Getting Started
1. Install Node.js, PostgreSQL, MongoDB, and Docker.
2. Clone this repository and install dependencies:
```bash
git clone <repository-url>
cd <project-root>
npm install
```

## Environment Setup
Copy `.env.example` to `.env` and set environment variables for database, JWT secret, and any API keys.

## Running Locally
Start the backend and frontend:
```bash
# Backend
npm run dev
# Frontend
npm start
```

## Directory Layout
```
project-root
├── src/
├── js/
├── data/
├── docs/
└── tests/
```

## Testing
Run all tests:
```bash
npm test
```
Watch mode:
```bash
npm run test:watch
```
Generate coverage:
```bash
npm run test:coverage
```

## Debugging
Enable verbose logging:
```bash
DEBUG=app:* npm run dev
```
Check your PostgreSQL and MongoDB instances for schema issues.

## Deployment
Build containers and deploy:
```bash
docker-compose build
docker-compose up
```
Push to Heroku/Railway using their CLI tools.

## Troubleshooting
1. **Missing migrations** – run migration scripts before starting the app.
2. **CORS errors** – ensure `cors()` middleware is enabled.
3. **Build failures** – check lint errors.

## Performance Tips
- Lint and format code regularly.
- Use code-splitting with React dynamic imports.
- Minify assets before deployment.

```bash
# DEBUG: If server fails to start, run `npm run lint` and fix errors
```
