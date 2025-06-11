const request = require('supertest');
const app = require('../server');

// If this test fails, check that server.js exports the Express app correctly
describe('GET /api/graphs', () => {
  it('returns graph data', async () => {
    const res = await request(app).get('/api/graphs');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
