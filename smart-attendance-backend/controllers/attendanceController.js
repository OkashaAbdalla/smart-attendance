/**
 * Attendance Controller (Under 130 lines)
 */

const Attendance = require('../models/Attendance');
const Session = require('../models/Session');
const User = require('../models/User');

const markAttendance = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findById(sessionId);

    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    if (!session.isActive) return res.status(400).json({ success: false, message: 'Session not active' });
    if (session.isExpired()) return res.status(400).json({ success: false, message: 'Session expired' });

    const existingAttendance = await Attendance.findOne({ sessionId, studentId: req.user._id });
    if (existingAttendance) {
      return res.status(400).json({ success: false, message: 'Attendance already marked' });
    }

    const timeDiff = (new Date() - session.startTime) / 60000;
    let status = 'present';
    if (timeDiff > 15 && timeDiff <= 30) status = 'late';
    else if (timeDiff > 30) status = 'absent';

    const attendance = await Attendance.create({
      sessionId,
      studentId: req.user._id,
      studentName: req.user.fullName,
      studentIdNumber: req.user.studentId,
      status,
      markedBy: 'student',
    });

    session.totalAttendees += 1;
    await session.save();

    res.status(201).json({ success: true, message: 'Attendance marked', attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to mark attendance' });
  }
};

const getAttendanceHistory = async (req, res) => {
  try {
    const records = await Attendance.find({ studentId: req.user._id })
      .populate('sessionId', 'courseName courseCode startTime')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: records.length, records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get history' });
  }
};

const getSessionAttendees = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId);

    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    if (session.lecturerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const attendees = await Attendance.find({ sessionId })
      .populate('studentId', 'fullName email studentId')
      .sort({ timeMarked: 1 });

    const stats = {
      total: attendees.length,
      present: attendees.filter(a => a.status === 'present').length,
      late: attendees.filter(a => a.status === 'late').length,
      absent: attendees.filter(a => a.status === 'absent').length,
    };

    res.json({ success: true, stats, attendees });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get attendees' });
  }
};

const exportAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId);

    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    if (session.lecturerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const attendees = await Attendance.find({ sessionId })
      .populate('studentId', 'fullName email studentId')
      .sort({ timeMarked: 1 });

    let csv = 'Student Name,Student ID,Email,Time Marked,Status,Confidence\n';
    attendees.forEach(record => {
      const student = record.studentId;
      const conf = record.confidence ? (record.confidence * 100).toFixed(0) + '%' : 'N/A';
      csv += `"${record.studentName}","${record.studentIdNumber}","${student.email}","${record.timeMarked.toLocaleString()}","${record.status}","${conf}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="attendance_${session.courseCode}_${Date.now()}.csv"`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to export' });
  }
};

const enrollFace = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.hasFaceEnrolled = true;
    await user.save();
    res.json({ success: true, message: 'Face enrolled (placeholder for Python integration)' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to enroll face' });
  }
};

module.exports = { markAttendance, getAttendanceHistory, getSessionAttendees, exportAttendance, enrollFace };
