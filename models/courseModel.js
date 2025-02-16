const db = require('../config/db');

const getAllCourses = async () => {
  const [rows] = await db.query('SELECT * FROM courses');
  return rows;
};


const getCourseById = async (id) => {
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
};
  

const createCourse = async (course) => {
    const { name, code, department_id } = course;
    const [result] = await db.query(
        'INSERT INTO courses (name, code, department_id) VALUES (?, ?, ?)',
        [name, code, department_id]
    );
    return { id: result.insertId, ...course };
};

const updateCourse = async (id, course) => {
  const { name, code, department_id } = course;
  const [result] = await db.query(
    'UPDATE courses SET name = ?, code = ?,  department_id = ? WHERE id = ?',
    [name, code, department_id, id]
  );
  return result.affectedRows > 0;
};

const deleteCourse = async (id) => {
    const [result] = await db.query('DELETE FROM courses WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
  

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
