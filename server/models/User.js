// models/User.js
const pool = require('../db/pool');

const createUser = async (name, email, password) => {
  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const createAdmin = async (name, email, password) => {
  const result = await pool.query(
    'INSERT INTO admins (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password]
  );
  return result.rows[0];
};

const getAdminByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail, createAdmin ,getAdminByEmail };
