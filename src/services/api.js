/**
 * API service with caching and timeout support.
 */
import { logError } from '../utils/logger.js';

const cache = new Map();

export default async function fetchUser(id, timeout = 5000) {
  const key = `user-${id}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        signal: controller.signal,
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    cache.set(key, data);
    return data;
  } catch (err) {
    logError(`fetchUser failed: ${err.message}`);
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
