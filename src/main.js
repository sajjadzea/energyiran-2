/**
 * Entry point that checks CSP and fetches user data.
 */
import fs from 'fs';
import path from 'path';
import fetchUser from './services/api.js';
import { logError, checkCSP } from './utils/logger.js';
import renderDashboard from './components/Dashboard.js';

async function main() {
  try {
    const html = fs.readFileSync(path.join('public', 'index.html'), 'utf-8');
    if (!checkCSP(html)) {
      console.error('CSP configuration is incorrect.');
    }
    const user = await fetchUser(1);
    renderDashboard(user);
  } catch (err) {
    logError(`main failed: ${err.message}`);
  }
}

main();
