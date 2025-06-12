import fs from 'fs';
import path from 'path';
import { logError } from '../../src/utils/logger.js';

describe('logger utility', () => {
  const logPath = path.join(process.cwd(), 'logs', 'debug.log');

  beforeEach(() => {
    if (fs.existsSync(logPath)) {
      fs.unlinkSync(logPath);
    }
  });

  it('writes error message to log file', async () => {
    const err = new Error('test failure');
    await logError(err, 'logger.test');
    const data = fs.readFileSync(logPath, 'utf8');
    expect(data).toMatch('test failure');
    expect(data).toMatch('logger.test');
  });
});
