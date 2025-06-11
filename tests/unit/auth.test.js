import request from 'supertest';
import app from '../../server.js';

// If this test times out, increase Jest timeout via jest.setTimeout
// If test fails with 404, verify that server.js exports the Express app

describe('POST /login', () => {
  it('should return 200 and a token', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
