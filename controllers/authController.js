const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const login = async (req, res, next) => {
  //try {
    const { email, password, role } = req.body;

    // Validate role
    if (!['admin', 'teacher', 'student'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role provided' });
    }
    // Find user in the appropriate table
    const user = await userModel.findUserByEmail(email, role);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, token });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = { login };
