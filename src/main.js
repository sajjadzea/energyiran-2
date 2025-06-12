/**
 * Main entry
 * -------------------------------
 * Debug: sets up global console logging.
 * Troubleshoot: ensures Dashboard mounts after DOM is ready.
 * Performance optimization: minimal DOM queries.
 */
import Dashboard from './components/Dashboard.js';
import { setupConsoleLogging, logDebug, logError } from './utils/logger.js';

document.addEventListener('DOMContentLoaded', () => {
  setupConsoleLogging();
  logDebug('Main: DOMContentLoaded');
  const root = document.getElementById('app');
  if (root) {
    try {
      new Dashboard(root); // eslint-disable-line no-new
    } catch (err) {
      logError(err.message);
      root.innerHTML = '<p>Loading failed</p>';
    }
  }
});
