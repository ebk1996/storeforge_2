const pool = require('../config/db');

describe('PostgreSQL DB config', () => {
  afterAll(() => pool.end());

  test('should connect and list tables', async () => {
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    expect(res.rows.map(r=>r.table_name)).toEqual(expect.arrayContaining(['users', 'stores']));
  });

  test('should have seeded demo user', async () => {
    const res = await pool.query("SELECT * FROM users WHERE email='demo@storeforge.app'");
    expect(res.rows.length).toBeGreaterThan(0);
  });
});
