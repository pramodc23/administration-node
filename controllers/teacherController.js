const teacherModel = require('../models/teacherModel');
const Joi = require('joi');

// Validation schema
const validateTeacher = (teacher) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/),
    department_id: Joi.number().integer().required(),
  });
  return schema.validate(teacher);
};


const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await teacherModel.getAllTeachers();
    res.json({ success: true, data: teachers });
  } catch (error) {
    next(error);
  }
};


const getTeacherById = async (req, res, next) => {
    try {
      const teacher = await teacherModel.getTeacherById(req.params.id);
      if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' });
      res.json({ success: true, data: teacher });
    } catch (error) {
      next(error);
    }
  };


const createTeacher = async (req, res, next) => {
  try {
    const { error } = validateTeacher(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const newTeacher = await teacherModel.createTeacher(req.body);
    res.status(201).json({ success: true, data: newTeacher });
  } catch (error) {
    next(error);
  }
};

const updateTeacher = async (req, res, next) => {
  try {
    const { error } = validateTeacher(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const updated = await teacherModel.updateTeacher(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Teacher not found' });

    res.json({ success: true, message: 'Teacher updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteTeacher = async (req, res, next) => {
    try {
      const deleted = await teacherModel.deleteTeacher(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Teacher not found' });
  
      res.json({ success: true, message: 'Teacher deleted successfully' });
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete teacher because they are enrolled in courses.',
        });
      }
      next(error);
    }
};
  


module.exports = {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
};