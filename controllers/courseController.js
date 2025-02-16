const courseModel = require('../models/courseModel');
const Joi = require('joi');

// Validation schema
const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/),
    department_id: Joi.number().integer().required(),
  });
  return schema.validate(course);
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.getAllCourses();
    res.json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
    try {
      const course = await courseModel.getCourseById(req.params.id);
      if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
      res.json({ success: true, data: course });
    } catch (error) {
      next(error);
    }
};

const createCourse = async (req, res, next) => {
  try {
    // const { error } = validateCourse(req.body);
    // if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const newCourse = await courseModel.createCourse(req.body);
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const updated = await courseModel.updateCourse(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Course not found' });

    res.json({ success: true, message: 'Course updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
    try {
      const deleted = await courseModel.deleteCourse(req.params.id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Course not found' });
  
      res.json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete course because they are enrolled in courses.',
        });
      }
      next(error);
    }
};
  

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
