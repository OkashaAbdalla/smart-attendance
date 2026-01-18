/**
 * Register Page Component
 * Purpose: Student registration page
 * 
 * Features:
 *   - Registration form with validation
 *   - Error handling
 * 
 * Note: Role is auto-assigned by backend (student)
 * Architecture: Uses FormInput and AuthLayout components
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout, FormInput } from '../../components/common';
import { ROUTES } from '../../utils/constants';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with real authService.register(formData)
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(ROUTES.VERIFY_EMAIL);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Create Account</h2>
        <p className="text-gray-600 dark:text-gray-400 text-base">Join UDS Smart Attendance System</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
        <FormInput label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="CSC/0030/22" required />
        <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@uds.edu.gh" required />
        <FormInput label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
        <FormInput label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
