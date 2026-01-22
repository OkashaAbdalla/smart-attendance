/**
 * Authentication Controller (Under 130 lines)
 */

const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendEmail, emailTemplates } = require('../utils/sendEmail');

const register = async (req, res) => {
  try {
    const { fullName, email, studentId, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const studentIdExists = await User.findOne({ studentId });
    if (studentIdExists) {
      return res.status(400).json({ success: false, message: 'Student ID already registered' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      fullName, email, studentId, password, role: 'student', verificationToken,
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendEmail({
      to: email,
      subject: 'Verify Your Email - UDS Attendance',
      html: emailTemplates.verification(fullName, verificationLink),
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email.',
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account deactivated' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user: user.getPublicProfile() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get user data' });
  }
};

const logout = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = { register, login, verifyEmail, getMe, logout };
