const request = require('supertest');
const app = require('../server');

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
