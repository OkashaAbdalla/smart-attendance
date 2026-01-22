/**
 * Admin Routes
 * /api/admin/*
 */

const express = require('express');
const router = express.Router();
const {
  createLecturer,
  getLecturers,
  updateLecturer,
  deleteLecturer,
  getStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { validationRules, validate } = require('../utils/validators');

// All routes are protected and admin-only
router.use(protect);
router.use(authorize('admin'));

// Lecturer management
router.post('/lecturers', validationRules.createLecturer, validate, createLecturer);
router.get('/lecturers', getLecturers);
router.put('/lecturers/:id', updateLecturer);
router.delete('/lecturers/:id', deleteLecturer);

// System statistics
router.get('/stats', getStats);

module.exports = router;
