const enrollmentModel = require('../models/enrollmentModel');
const Joi = require('joi');

// Validation schema
// const validateStudent = (student) => {
//   const schema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     phone: Joi.string().pattern(/^\d{10}$/),
//     department_id: Joi.number().integer().required(),
//   });
//   return schema.validate(student);
// };

const getAllEnrollments = async (req, res, next) => {
  //res.json(result);
  //console.log(result);
  //process.exit();
  try {
    const enrollments = await enrollmentModel.getAllEnrollments();
    res.json({ success: true, data: enrollments });
  } catch (error) {
    next(error);
  }
};

const getEnrollmentById = async (req, res, next) => {  
    try {
      const enrollment = await enrollmentModel.getEnrollmentById(req.params.id);
      if (!enrollment) return res.status(404).json({ success: false, message: 'Enrollment not found' });
      res.json({ success: true, data: enrollment });
    } catch (error) {
      next(error);
    }
};

const createEnrollment = async (req, res, next) => {
  try{      
    const newEnrollment = await enrollmentModel.createenrollment(req.body);
    res.status(201).json({ success: true, data: newEnrollment });
  }catch (error){
    next(error);
  }
};

const updateEnrollment = async (req, res, next) => {
  try { 
    const updated = await enrollmentModel.updateEnrollment(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Enrollment not found' });

    res.json({ success: true, message: 'Enrollment updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteEnrollment = async (req, res, next) => {
  try {
    const deleted = await enrollmentModel.deleteEnrollment(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Enrollment not found' });
    res.json({ success: true, message: 'Enrollment deleted successfully' });
  } catch (error) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete enrollment because they are enrolled in courses.',
      });
    }
    next(error);
  }
};
  

module.exports = {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
