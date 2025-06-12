/**
 * Logger utility for debugging and error analysis.
 */
import fs from 'fs';
import path from 'path';

const logPath = path.join(process.cwd(), 'logs', 'debug.log');

export function logError(message) {
  const entry = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(logPath, entry);
}

export function analyzeLogLine(line) {
  if (line.includes('Content Security Policy')) {
    return 'CSP violation: external connection blocked. Update CSP to allow the domain.';
  }
  if (line.includes('Failed to fetch')) {
    return 'Network error: fetch failed, possibly due to CSP or connectivity issues.';
  }
  return 'Unknown error';
}

export function analyzeLogs(logs) {
  return logs.split('\n').filter(Boolean).map(analyzeLogLine);
}

export function checkCSP(html) {
  const match = html.match(
    /<meta[^>]*http-equiv="Content-Security-Policy"[^>]*content="([^"]+)"/i
  );
  if (!match) {
    logError('CSP meta tag missing');
    return false;
  }
  const policy = match[1];
  const allowed = /connect-src[^;]*https:\/\/jsonplaceholder\.typicode\.com/;
  if (!allowed.test(policy)) {
    logError('CSP missing jsonplaceholder domain');
    return false;
  }
  return true;
}
