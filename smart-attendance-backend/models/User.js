/**
 * User Model
 * Supports: Student, Lecturer, Admin roles
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false, // Don't return password by default
  },
  role: {
    type: String,
    enum: ['student', 'lecturer', 'admin'],
    default: 'student',
  },
  // Student-specific fields
  studentId: {
    type: String,
    sparse: true, // Allow null for non-students
    trim: true,
  },
  // Lecturer-specific fields
  staffId: {
    type: String,
    sparse: true,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
  },
  // Verification
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  // Account status
  isActive: {
    type: Boolean,
    default: true,
  },
  // Face recognition (for students)
  faceEncoding: {
    type: [Number], // Array of numbers from face_recognition
    default: null,
  },
  hasFaceEnrolled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    role: this.role,
    studentId: this.studentId,
    staffId: this.staffId,
    department: this.department,
    isVerified: this.isVerified,
    isActive: this.isActive,
    hasFaceEnrolled: this.hasFaceEnrolled,
  };
};

module.exports = mongoose.model('User', userSchema);
