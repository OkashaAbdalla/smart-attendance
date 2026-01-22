/**
 * Email Service Configuration (Nodemailer)
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify email configuration (don't fail if not configured)
transporter.verify((error, success) => {
  if (error) {
    console.log('⚠️  Email service not configured (optional for testing)');
  } else {
    console.log('✅ Email service ready');
  }
});

module.exports = transporter;
