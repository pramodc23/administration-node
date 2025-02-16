const db = require('../config/db');

const getAlldepartments = async () => {
  const [rows] = await db.query('SELECT * FROM departments');
  return rows;
};

const createDepartment = async (department) => {
    const { name } = department;
    const [result] = await db.query('INSERT INTO departments (name) VALUES (?)', [name]);
    return { id: result.insertId, ...department };
};


module.exports = {
    getAlldepartments,
    createDepartment
};
