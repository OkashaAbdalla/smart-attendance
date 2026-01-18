/**
 * Verify Email Page Component
 * Purpose: Email verification confirmation page
 * 
 * Features:
 *   - Verification success message
 *   - Resend verification email option
 *   - Redirect to login
 * 
 * Note: Shown after registration
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const VerifyEmail = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to={ROUTES.HOME} className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">UDS<span className="text-green-600 dark:text-green-400">Attendance</span></span>
          </Link>
        </div>

        {/* Verification Card */}
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-2xl text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check Your Email</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a verification link to your email address. Please click the link to verify your account.
          </p>

          <div className="space-y-3">
            <Link
              to={ROUTES.LOGIN}
              className="block w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
            >
              Go to Login
            </Link>

            <button className="w-full bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              Resend Email
            </button>
          </div>

          <p className="text-gray-500 dark:text-gray-500 text-sm mt-6">
            Didn't receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
