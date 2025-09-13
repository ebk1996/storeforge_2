const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');

describe('Store API Endpoints', () => {
  let testStoreId;
  let ownerId;

  afterAll(() => pool.end());

  test('Create user for store owner', async () => {
    const uniqueEmail = `storetestuser_${Date.now()}@storeforge.app`;
    const res = await request(app)
      .post('/api/users/signup')
      .send({ email: uniqueEmail, password: 'testpass' })
      .set('Accept', 'application/json');
    expect([201, 400]).toContain(res.statusCode);
    if (res.statusCode === 201) {
      ownerId = res.body.user.id;
    } else {
      // fallback: get user id from DB
      const dbRes = await pool.query('SELECT id FROM users WHERE email = $1', [uniqueEmail]);
      ownerId = dbRes.rows[0].id;
    }
    expect(ownerId).toBeDefined();
  });

  test('GET /api/stores should list stores', async () => {
    const res = await request(app).get('/api/stores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/stores should create a store', async () => {
    const res = await request(app)
      .post('/api/stores')
      .send({ owner_id: ownerId, name: 'Test Store', subdomain: `teststore_${Date.now()}`, description: 'A test store', logo_url: '', theme: JSON.stringify({ primary: '#000', secondary: '#fff', layout: 'grid' }) })
      .set('Accept', 'application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Store');
    testStoreId = res.body.id;
  });

  test('GET /api/stores should include new store', async () => {
    const res = await request(app).get('/api/stores');
    expect(res.body.some(s => s.id === testStoreId)).toBe(true);
  });
});
