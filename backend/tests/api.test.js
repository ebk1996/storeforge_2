const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  test('POST /api/users/signup should create user', async () => {
    const uniqueEmail = `testuser_${Date.now()}@storeforge.app`;
    const res = await request(app)
      .post('/api/users/signup')
      .send({ email: uniqueEmail, password: 'testpass' })
      .set('Accept', 'application/json');
    expect([201, 400]).toContain(res.statusCode);
    if (res.statusCode === 201) {
      expect(res.body.user.email).toBe(uniqueEmail);
    } else {
      expect(res.body.message).toMatch(/User already exists/);
    }
  });
});
