# Sample Web Project

## Description
A full-stack project using an Express API and React frontend.

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
Copy `.env.example` to `.env` and adjust database credentials if needed.

## Project Structure
```
project-root
├── README.md
├── backend/
├── mvp/
├── scripts/
└── docs/
```

## Usage
Run the development server (the React dashboard is built automatically):
```bash
npm start
```
To build the React app manually use:
```bash
npm --prefix mvp run build
```

Verify the API endpoints are reachable:
- `GET /api/dashboard/data.json` should return dashboard metrics in JSON format.

## Testing
- Install: `npm install`
- Run all tests: `npm test`
- Watch mode: `npm run test:watch`
- Coverage: `npm run test:coverage`

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
- In CI, use `--runInBand` to avoid concurrency issues
- Keep tests fast and isolated; mock external services
- If `jest` is not found, run `npm install --save-dev jest`

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

## Release
Run `npm run release` to publish using semantic-release.

## اجرای Docker Compose
برای اجرا کردن تمام سرویس‌ها به صورت محلی از Docker Compose استفاده کنید:
```bash
docker-compose up --build
```
کانتینر Node روی پورت `10000` در دسترس خواهد بود و پایگاه‌های داده PostgreSQL و MongoDB نیز اجرا می‌شوند.

## دسترسی به API
پس از راه‌اندازی، آدرس پایه API عبارت است از:
```
http://localhost:10000
```
مسیرهای مهم:
- `POST /register` – ثبت‌نام کاربر
- `POST /login` – دریافت توکن
- `GET /admin-only` – فقط برای نقش admin
- `GET /api/graphs` – بازیابی گراف
- `POST /api/upload` – آپلود فایل
- `GET /api/dashboard/data.json` – داده‌های داشبورد

## مسیرهای اصلی پروژه
```
project-root
├── backend/      # کد Node و API
├── mvp/          # کد React
├── data/         # داده‌های نمونه
├── docs/         # مستندات
└── scripts/      # اسکریپت‌های کمکی
```
