const request = require('supertest');
const app = require('../../server');

// If test times out, increase Jest timeout or check connection
describe('POST /login', () => {
  it('responds with a token', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', password: 'secret' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
