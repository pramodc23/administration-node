const db = require('../config/db');

const getAllTeachers = async () => {
  const [rows] = await db.query('SELECT * FROM faculty');
  return rows;
};

const getTeacherById = async (id) => {
    const [rows] = await db.query('SELECT * FROM faculty WHERE id = ?', [id]);
    return rows[0];
};
  

const createTeacher = async (teacher) => {
    const { name, email, phone, department_id } = teacher;
    const [result] = await db.query(
        'INSERT INTO faculty (name, email, phone, department_id) VALUES (?, ?, ?, ?)',
        [name, email, phone, department_id]
    );
    return { id: result.insertId, ...teacher };
};

const updateTeacher = async (id, teacher) => {
  const { name, email, phone, department_id } = teacher;
  const [result] = await db.query(
    'UPDATE faculty SET name = ?, email = ?, phone = ?, department_id = ? WHERE id = ?',
    [name, email, phone, department_id, id]
  );
  return result.affectedRows > 0;
};

const deleteTeacher = async (id) => {
    // Delete related enrollments first
    //await db.query('DELETE FROM enrollments WHERE student_id = ?', [id]);
  
    // Then delete the teacher
    const [result] = await db.query('DELETE FROM faculty WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
  


module.exports = {  
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
}