const db = require('../config/db');

const getAllEnrollments  = async () => {
  const [rows] = await db.query("SELECT en.id,en.student_id,s.name,en.course_id,c.name FROM `enrollments` en LEFT join students s ON en.student_id = s.id LEFT join courses c ON en.course_id = c.id");
  return rows;
};


const getEnrollmentById = async (id) => {
    const [rows] = await db.query('SELECT en.id,en.student_id,s.name as student_name,en.course_id,c.name as course_name FROM `enrollments` en LEFT join students s ON en.student_id = s.id LEFT join courses c ON en.course_id = c.id  WHERE en.id = ?', [id]);
    return rows[0];
};
  

const createenrollment = async (enroll) => {
  const {course_id,student_id} = enroll;
  const [result] = await db.query(
    'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)',
    [student_id, course_id]
  );
  return { id: result.insertId, ...enroll };
};


const updateEnrollment = async (id, enroll) => {
  const { student_id, course_id } = enroll;
  const [result] = await db.query(
    'UPDATE enrollments SET student_id = ?, course_id = ? WHERE id = ?',
    [student_id, course_id, id]
  );
  return result.affectedRows > 0;
};

const deleteEnrollment = async (id) => {  
    const [result] = await db.query('DELETE FROM enrollments WHERE id = ?', [id]);
    return result.affectedRows > 0;
};
  

module.exports = {
  getAllEnrollments,   
  getEnrollmentById,   
  createenrollment,
  updateEnrollment, 
  deleteEnrollment,
};
