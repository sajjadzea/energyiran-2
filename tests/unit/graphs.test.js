import request from 'supertest';
import app from '../../server.js';

// If this test times out, increase Jest timeout via jest.setTimeout
// Ensure authentication flow returns a token before requesting graphs

describe('GET /api/graphs', () => {
  it('returns graph data', async () => {
    const res = await request(app).get('/api/graphs');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nodes');
    expect(res.body).toHaveProperty('links');
    expect(Array.isArray(res.body.nodes)).toBe(true);
    expect(Array.isArray(res.body.links)).toBe(true);
  });
});
