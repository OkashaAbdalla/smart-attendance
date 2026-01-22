/**
 * Email Sending Utility
 */

const transporter = require('../config/email');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"UDS Attendance System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    return { success: false, error: error.message };
  }
};

// Email templates
const emailTemplates = {
  verification: (name, verificationLink) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #006838; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .button { display: inline-block; padding: 12px 30px; background: #006838; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>UDS Smart Attendance System</h1>
        </div>
        <div class="content">
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for registering with UDS Smart Attendance System.</p>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${verificationLink}" class="button">Verify Email</a>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #006838;">${verificationLink}</p>
          <p>This link will expire in 24 hours.</p>
        </div>
        <div class="footer">
          <p>University for Development Studies</p>
          <p>If you didn't create this account, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  lecturerWelcome: (name, email, tempPassword) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #006838; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .credentials { background: white; padding: 15px; border-left: 4px solid #006838; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>UDS Smart Attendance System</h1>
        </div>
        <div class="content">
          <h2>Welcome, ${name}!</h2>
          <p>Your lecturer account has been created by the system administrator.</p>
          <div class="credentials">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Temporary Password:</strong> ${tempPassword}</p>
          </div>
          <p><strong>Important:</strong> Please change your password after your first login.</p>
          <p>You can now log in and start creating attendance sessions for your classes.</p>
        </div>
        <div class="footer">
          <p>University for Development Studies</p>
          <p>For support, contact the system administrator.</p>
        </div>
      </div>
    </body>
    </html>
  `,
};

module.exports = { sendEmail, emailTemplates };
