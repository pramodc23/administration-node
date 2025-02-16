const studentModel = require('../models/studentModel');
const Joi = require('joi');

// Validation schema
const validateStudent = (student) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/),
    department_id: Joi.number().integer().required(),
  });
  return schema.validate(student);
};

const getAllStudents = async (req, res, next) => {
  try {
    const students = await studentModel.getAllStudents();
    res.json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
    try {
      const student = await studentModel.getStudentById(req.params.id);
      if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
      res.json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
};

const createStudent = async (req, res, next) => {
  try {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const newStudent = await studentModel.createStudent(req.body);
    res.status(201).json({ success: true, data: newStudent });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { error } = validateStudent(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const updated = await studentModel.updateStudent(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Student not found' });

    res.json({ success: true, message: 'Student updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
    try {
      const deleted = await studentModel.deleteStudent(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Student not found' });
  
      res.json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete student because they are enrolled in courses.',
        });
      }
      next(error);
    }
};
  

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
