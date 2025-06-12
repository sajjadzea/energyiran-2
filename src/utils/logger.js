/**
 * Logger Utility
 * -------------------------------
 * Debug: Writes timestamped logs for troubleshooting.
 * Troubleshoot: Handles file write errors gracefully.
 * Performance optimization: minimal synchronous operations.
 */
import path from 'path';

function getCallerLocation() {
  const err = new Error();
  const stackLine = err.stack?.split('\n')[3] || '';
  const match = stackLine.match(/\(?([^():]+):(\d+):(\d+)\)?/);
  return match ? `${match[1]}:${match[2]}` : 'unknown';
}

function getErrorLocation(error) {
  const line = error?.stack?.split('\n')[1] || '';
  const match = line.match(/\(?([^():]+):(\d+):(\d+)\)?/);
  return match ? `${match[1]}:${match[2]}` : null;
}

const logFile = path.join(process.cwd(), 'logs', 'debug.log');

async function appendToFile(message) {
  if (typeof window !== 'undefined') return;
  try {
    const fs = await import('fs/promises');
    await fs.mkdir(path.dirname(logFile), { recursive: true });
    await fs.appendFile(logFile, message);
  } catch (err) {
    console.error('Log write failed', err);
  }
}

function formatMessage(level, message, location = getCallerLocation()) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${level.toUpperCase()} (${location}): ${message}\n`;
}

export async function writeLog(level, message, location) {
  await appendToFile(formatMessage(level, message, location));
}

export async function logDebug(message, source) {
  const stack = new Error().stack?.split('\n').slice(1).join('\n') || '';
  const loc = source || getCallerLocation();
  console.debug(formatMessage('debug', message, loc).trim());
  return writeLog('debug', `${message}\n${stack}`, loc);
}

export async function logError(error, source) {
  const msg = error instanceof Error ? error.message : String(error);
  const stack =
    (error instanceof Error ? error.stack : new Error().stack)
      ?.split('\n')
      .slice(1)
      .join('\n') || '';
  const loc = source || getErrorLocation(error) || getCallerLocation();
  console.error(formatMessage('error', msg, loc).trim());
  return writeLog('error', `${msg}\n${stack}`, loc);
}

export function setupConsoleLogging() {
  ['log', 'error', 'warn'].forEach((method) => {
    const original = console[method];
    console[method] = (...args) => {
      writeLog(method, args.join(' '));
      original.apply(console, args);
    };
  });
}
