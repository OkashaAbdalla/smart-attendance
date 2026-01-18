/**
 * Form Validation Utilities
 * Purpose: Reusable validation functions for forms
 */

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
    errors: {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
    },
  };
};

// Student ID validation (customize based on UDS format)
export const validateStudentId = (studentId) => {
  // Example: UDS student ID format (adjust as needed)
  const studentIdRegex = /^[A-Z0-9]{8,12}$/;
  return studentIdRegex.test(studentId);
};

// Required field validation
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

// Time validation (end time must be after start time)
export const validateTimeRange = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return end > start;
};
