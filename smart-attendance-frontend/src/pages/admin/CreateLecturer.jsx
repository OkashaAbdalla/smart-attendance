/**
 * Create Lecturer Page (Admin)
 * Purpose: Admin form to create new lecturer accounts
 * Security: Only accessible by admin role
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { FormInput } from '../../components/common';
import { ROUTES, LECTURER_EMAIL_DOMAINS } from '../../utils/constants';

const CreateLecturer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    staffId: '',
    department: '',
    tempPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return LECTURER_EMAIL_DOMAINS.some(domain => email.toLowerCase().endsWith(domain));
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8).toUpperCase();
    setFormData({ ...formData, tempPassword: password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(formData.email)) {
      setError(`Email must use university domain (${LECTURER_EMAIL_DOMAINS.join(', ')})`);
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with real API call to create lecturer
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(`Lecturer account created successfully! Credentials sent to ${formData.email}`);
      
      // Reset form
      setTimeout(() => {
        setFormData({ fullName: '', email: '', staffId: '', department: '', tempPassword: '' });
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError('Failed to create lecturer account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Create Lecturer Account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Add a new lecturer to the system</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-500 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-500 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Dr. John Mensah"
              required
            />

            <FormInput
              label="Staff ID"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              placeholder="STAFF/001/2020"
              required
            />

            <FormInput
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Computer Science"
              required
            />

            <FormInput
              label="University Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="lecturer@uds.edu.gh"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Temporary Password
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="tempPassword"
                  value={formData.tempPassword}
                  onChange={handleChange}
                  placeholder="Click generate or enter manually"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={generatePassword}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  Generate
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Lecturer will be required to change password on first login
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Lecturer Account'}
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}
                className="px-6 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateLecturer;
