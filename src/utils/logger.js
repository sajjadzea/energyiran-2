/**
 * Logger Utility
 * -------------------------------
 * Debug: Writes timestamped logs for troubleshooting.
 * Troubleshoot: Handles file write errors gracefully.
 * Performance optimization: minimal synchronous operations.
 */
import { appendFile } from 'fs/promises';
import path from 'path';

function getCallerLocation() {
  const err = new Error();
  const stackLine = err.stack?.split('\n')[3] || '';
  const match = stackLine.match(/\(?([^():]+):(\d+):(\d+)\)?/);
  return match ? `${match[1]}:${match[2]}` : 'unknown';
}

const logFile = path.join(process.cwd(), 'logs', 'debug.log');

function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  const location = getCallerLocation();
  return `[${timestamp}] ${level.toUpperCase()} (${location}): ${message}\n`;
}

export async function writeLog(level, message) {
  try {
    await appendFile(logFile, formatMessage(level, message));
  } catch (err) {
    // Troubleshoot: log file permissions or missing directory
    console.error('Log write failed', err);
  }
}

export const logDebug = (message) => writeLog('debug', message);
export const logError = (message) => writeLog('error', message);

export function setupConsoleLogging() {
  ['log', 'error', 'warn'].forEach((method) => {
    const original = console[method];
    console[method] = (...args) => {
      writeLog(method, args.join(' '));
      original.apply(console, args);
    };
  });
}
