const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

router.use(authenticate, authorize(['admin']));

router.get('/', departmentController.getAllDepartments);
router.post('/', departmentController.createDepartment);

module.exports = router;