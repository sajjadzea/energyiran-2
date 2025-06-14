const request = require('supertest');
const app = require('../../server');

const fs = require('fs');
const path = require('path');

describe('GET /api/graphs', () => {
  it('returns graph data from files', async () => {
    const loginRes = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', password: 'secret' });
    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/graphs')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nodes');
    expect(res.body).toHaveProperty('links');
    expect(Array.isArray(res.body.nodes)).toBe(true);
    expect(Array.isArray(res.body.links)).toBe(true);

    const nodesPath = path.join(__dirname, '../../data/graph/nodes.json');
    const linksPath = path.join(__dirname, '../../data/graph/links.json');
    const nodes = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));
    const links = JSON.parse(fs.readFileSync(linksPath, 'utf8'));
    expect(res.body.nodes).toEqual(nodes);
    expect(res.body.links).toEqual(links);
  });
});
