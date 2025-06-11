const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const app = require('../server');
// If test fails, ensure authentication token is provided

// If this test fails, check that server.js exports the Express app correctly
describe('GET /api/graphs', () => {
  it('returns graph data', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', password: 'secret' });
    const token = loginRes.body.token;
    const res = await request(app)
      .get('/api/graphs')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
