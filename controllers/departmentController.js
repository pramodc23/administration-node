const departmentModel = require('../models/departmentModel');

const getAllDepartments = async (req, res, next) => {
    try {
        const departments = await departmentModel.getAlldepartments();
        res.json({ success: true, data: departments });
    } catch (error) {
        next(error);
    }
};

const createDepartment = async (req, res, next) => {
  try {
    const newDepartment = await departmentModel.createDepartment(req.body);
    res.status(201).json({ success: true, data: newDepartment });
  } catch (error) {
    next(error);
  }
};
  

module.exports = {
    getAllDepartments,
    createDepartment
};
