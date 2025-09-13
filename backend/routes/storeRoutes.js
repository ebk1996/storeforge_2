const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// List all stores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stores');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a store
router.post('/', async (req, res) => {
  const { owner_id, name, subdomain, description, logo_url, theme } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO stores (owner_id, name, subdomain, description, logo_url, theme) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [owner_id, name, subdomain, description, logo_url, theme]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
