const db = require('../config/db');

const getAllStudents = async () => {
  const [rows] = await db.query('SELECT * FROM students');
  return rows;
};


const getStudentById = async (id) => {
    const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    return rows[0];
};
  

const createStudent = async (student) => {
    const { name, email, phone, department_id } = student;
    const [result] = await db.query(
        'INSERT INTO students (name, email, phone, department_id) VALUES (?, ?, ?, ?)',
        [name, email, phone, department_id]
    );
    return { id: result.insertId, ...student };
};

const updateStudent = async (id, student) => {
  const { name, email, phone, department_id } = student;
  const [result] = await db.query(
    'UPDATE students SET name = ?, email = ?, phone = ?, department_id = ? WHERE id = ?',
    [name, email, phone, department_id, id]
  );
  return result.affectedRows > 0;
};

const deleteStudent = async (id) => {
    // Delete related enrollments first
    await db.query('DELETE FROM enrollments WHERE student_id = ?', [id]);
  
    // Then delete the student
    const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
  

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
