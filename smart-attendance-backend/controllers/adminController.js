/**
 * Admin Controller (Under 130 lines)
 */

const User = require('../models/User');
const Session = require('../models/Session');
const Attendance = require('../models/Attendance');
const { sendEmail, emailTemplates } = require('../utils/sendEmail');

const LECTURER_EMAIL_DOMAINS = ['@uds.edu.gh', '@lecturer.uds.edu.gh', '@staff.uds.edu.gh'];

const createLecturer = async (req, res) => {
  try {
    const { fullName, email, staffId, department, tempPassword } = req.body;

    const isValidDomain = LECTURER_EMAIL_DOMAINS.some(domain => email.toLowerCase().endsWith(domain));
    if (!isValidDomain) {
      return res.status(400).json({ success: false, message: `Email must use: ${LECTURER_EMAIL_DOMAINS.join(', ')}` });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'Email already registered' });

    const staffIdExists = await User.findOne({ staffId });
    if (staffIdExists) return res.status(400).json({ success: false, message: 'Staff ID exists' });

    const lecturer = await User.create({
      fullName, email, staffId, department,
      password: tempPassword,
      role: 'lecturer',
      isVerified: true,
      isActive: true,
    });

    await sendEmail({
      to: email,
      subject: 'Welcome to UDS Attendance System',
      html: emailTemplates.lecturerWelcome(fullName, email, tempPassword),
    });

    res.status(201).json({ success: true, message: 'Lecturer created', lecturer: lecturer.getPublicProfile() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create lecturer' });
  }
};

const getLecturers = async (req, res) => {
  try {
    const lecturers = await User.find({ role: 'lecturer' }).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: lecturers.length, lecturers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get lecturers' });
  }
};

const updateLecturer = async (req, res) => {
  try {
    const { isActive } = req.body;
    const lecturer = await User.findById(req.params.id);

    if (!lecturer || lecturer.role !== 'lecturer') {
      return res.status(404).json({ success: false, message: 'Lecturer not found' });
    }

    lecturer.isActive = isActive;
    await lecturer.save();

    res.json({
      success: true,
      message: `Lecturer ${isActive ? 'activated' : 'deactivated'}`,
      lecturer: lecturer.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update lecturer' });
  }
};

const deleteLecturer = async (req, res) => {
  try {
    const lecturer = await User.findById(req.params.id);
    if (!lecturer || lecturer.role !== 'lecturer') {
      return res.status(404).json({ success: false, message: 'Lecturer not found' });
    }

    const sessions = await Session.find({ lecturerId: lecturer._id });
    const sessionIds = sessions.map(s => s._id);
    
    await Attendance.deleteMany({ sessionId: { $in: sessionIds } });
    await Session.deleteMany({ lecturerId: lecturer._id });
    await lecturer.deleteOne();

    res.json({ success: true, message: 'Lecturer deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete lecturer' });
  }
};

const getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalLecturers = await User.countDocuments({ role: 'lecturer' });
    const totalSessions = await Session.countDocuments();
    const activeSessions = await Session.countDocuments({ isActive: true, endTime: { $gt: new Date() } });
    const totalAttendance = await Attendance.countDocuments();

    res.json({
      success: true,
      stats: { totalStudents, totalLecturers, totalSessions, activeSessions, totalAttendance }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get stats' });
  }
};

module.exports = { createLecturer, getLecturers, updateLecturer, deleteLecturer, getStats };
