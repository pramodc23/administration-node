const db = require('../config/db');

// Find user by email in the respective table
const findUserByEmail = async (email, role) => {
  let query;
  if (role === 'teacher') {
    query = 'SELECT * FROM teachers WHERE email = ?';
  } else if (role === 'student') {
    query = 'SELECT * FROM students WHERE email = ?';
  } else if (role === 'admin') {
    query = 'SELECT * FROM users WHERE email = ?';
  } else {
    throw new Error('Invalid role');
  }

  const [rows] = await db.query(query, [email]);
  return rows[0];
};

module.exports = { findUserByEmail };
