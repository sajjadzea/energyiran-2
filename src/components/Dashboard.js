// Dashboard.js: کامپوننت داشبورد برای نمایش داده‌ها
/**
 * Dashboard Component
 * -------------------------------
 * Fetches and displays data from jsonplaceholder.
 * Debug: logs fetch process.
 * Troubleshoot: displays user-friendly error messages.
 * Performance optimization: relies on cached responses.
 */
import { getData } from '../services/api.js';
import { logDebug, logError } from '../utils/logger.js';

export default class Dashboard {
  constructor(root) {
    this.root = root;
    this.load();
  }

  async load() {
    logDebug('Dashboard: fetching posts');
    try {
      const posts = await getData('https://jsonplaceholder.typicode.com/posts');
      this.render(posts.slice(0, 5));
    } catch (err) {
      logError(err.message);
      this.root.innerHTML = '<p class="error">خطا در دریافت داده‌ها. لطفاً بعداً دوباره تلاش کنید.</p>';
    }
  }

  render(items) {
    this.root.innerHTML = '<h2>Posts</h2>';
    const ul = document.createElement('ul');
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.title;
      ul.appendChild(li);
    });
    this.root.appendChild(ul);
  }
}
