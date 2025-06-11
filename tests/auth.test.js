const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const app = require('../server');
// If test times out, check server connection or increase Jest timeout

// If this test fails, check that server.js exports the Express app correctly
describe('POST /login', () => {
  it('responds with a token', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', password: 'secret' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
