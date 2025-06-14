import request from 'supertest';
import app from '../../backend/server.js';

describe('GET /api/dashboard/data.json', () => {
  it('returns dashboard metrics', async () => {
    const res = await request(app).get('/api/dashboard/data.json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('kpis');
  });
});
