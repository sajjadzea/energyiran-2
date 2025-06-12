// api.js: سرویس API برای دریافت داده‌ها با کش داخلی
/**
 * API Service
 * -------------------------------
 * Debug: Uses AbortController to handle request timeouts.
 * Troubleshoot: Catches network errors and provides fallback from cache.
 * Performance optimization: caches successful responses in-memory.
 */
import * as logger from '../utils/logger.js';

const cache = new Map();

function getFromStorage(key) {
  if (typeof localStorage !== 'undefined') {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
  }
  return cache.get(key);
}

function saveToStorage(key, data) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
  cache.set(key, data);
}

export async function fetchWithTimeout(url, opts = {}, timeout = 5000) {
  const cached = getFromStorage(url);
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    saveToStorage(url, data);
    return data;
  } catch (err) {
    clearTimeout(timer);
    logger.logError(err, 'api.js:fetchWithTimeout');
    if (cached) return cached;
    throw err;
  }
}

export async function getData(url, { timeout = 5000 } = {}) {
  return fetchWithTimeout(url, {}, timeout);
}
