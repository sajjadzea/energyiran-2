/**
 * API Service
 * -------------------------------
 * Debug: Uses AbortController to handle request timeouts.
 * Troubleshoot: Catches network errors and provides fallback from cache.
 * Performance optimization: caches successful responses in-memory.
 */
const cache = new Map();

export async function getData(url, { timeout = 5000 } = {}) {
  if (cache.has(url)) return cache.get(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    cache.set(url, data);
    return data;
  } catch (err) {
    clearTimeout(timer);
    if (cache.has(url)) return cache.get(url);
    throw err;
  }
}
