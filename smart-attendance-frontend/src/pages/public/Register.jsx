/**
 * Register Page - Student registration with validation
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout, FormInput } from '../../components/common';
import { useToast, useAuthContext } from '../../context';
import { ROUTES } from '../../utils/constants';
import { validateRegisterForm } from '../../utils/registerHelpers';

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { register } = useAuthContext();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setLoading(true);

    try {
      const result = register(formData);
      
      if (result.success) {
        showToast('Registration successful! Please verify your email.', 'success');
        setTimeout(() => {
          navigate(ROUTES.VERIFY_EMAIL);
        }, 1000);
      }
    } catch (err) {
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Create Account</h2>
        <p className="text-gray-600 dark:text-gray-400 text-base">Join UDS Smart Attendance System</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" error={errors.fullName} required />
        <FormInput label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="CSC/0030/22" error={errors.studentId} required />
        <FormInput label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@uds.edu.gh" error={errors.email} required />
        <FormInput label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} required />
        <FormInput label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />

        <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
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
