const request = require('supertest');
process.env.JWT_SECRET = 'testsecret';
const app = require('../server');

describe('auth flow', () => {
  it('registers then logs in', async () => {
    const register = await request(app)
      .post('/register')
      .send({ email: 'user@example.com', password: 'secret', roles: ['admin'] });
    expect(register.statusCode).toBe(201);

    const res = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', password: 'secret' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
