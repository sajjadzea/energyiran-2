// Dashboard.js: کامپوننت داشبورد برای نمایش داده‌ها
/**
 * Dashboard Component
 * -------------------------------
 * Fetches and displays data from jsonplaceholder.
 * Debug: logs fetch process.
 * Troubleshoot: displays user-friendly error messages.
 * Performance optimization: relies on cached responses.
 */
import { fetchWithTimeout } from '../services/api.js';
import { logDebug, logError } from '../utils/logger.js';

export default class Dashboard {
  constructor(root) {
    this.root = root;
    this.load();
  }

  async load() {
    logDebug('Dashboard: fetching posts');
    try {
      const posts = await fetchWithTimeout(
        'https://jsonplaceholder.typicode.com/posts',
        {},
        // eslint-disable-next-line comma-dangle
        5000
      );
      this.render(posts.slice(0, 5));
    } catch (err) {
      logError(err, 'Dashboard:load');
      if (this.root) {
        // eslint-disable-next-line operator-linebreak
        this.root.innerHTML =
          '<div>ارتباط با سرور برقرار نشد. لطفا بعدا تلاش کنید.</div>';
      }
    }
  }

  render(items) {
    this.root.innerHTML = '<h2>Posts</h2>';
    const table = document.createElement('table');
    table.style.width = '100%';
    const tbody = document.createElement('tbody');
    items.forEach((item) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.textContent = item.title;
      row.appendChild(cell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    this.root.appendChild(table);
  }
}
