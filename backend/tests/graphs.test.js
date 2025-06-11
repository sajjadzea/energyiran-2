const request = require('supertest');
const app = require('../server');

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
