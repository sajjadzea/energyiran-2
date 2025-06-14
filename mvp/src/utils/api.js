// api.js: توابع API برای React
/**
 * API Helpers
 * -------------------------------
 * Debug: logs fetch start and end.
 * Troubleshoot: prints errors and fallback message.
 * Performance optimization: simple fetch with minimal options.
 */
export async function fetchUser(token) {
  console.debug('API fetchUser start');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1', {
      headers,
    }); // performance: minimal fetch options
    console.debug('API fetchUser end');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    if (typeof document !== 'undefined') {
      // eslint-disable-next-line operator-linebreak
      document.body.innerHTML =
        '<div>ارتباط با سرور برقرار نشد. لطفا بعدا تلاش کنید.</div>';
    }
    throw err;
  }
}

export async function fetchDashboardData() {
  console.debug('API fetchDashboardData start');
  try {
    const res = await fetch('/api/dashboard/data.json');
    console.debug('API fetchDashboardData end');
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
}

export async function fetchGraphData() {
  console.debug('API fetchGraphData start');
  try {
    const res = await fetch('/api/graphs');
    console.debug('API fetchGraphData end');
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
}
// If data doesn’t load, verify API URL in api.js
