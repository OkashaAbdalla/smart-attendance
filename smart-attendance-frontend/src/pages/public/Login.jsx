/**
 * Login Page with Toast Notifications
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout, FormInput } from '../../components/common';
import { useToast, useAuthContext } from '../../context';
import { ROUTES } from '../../utils/constants';
import { validateLoginForm, getRoleRedirectPath } from '../../utils/loginHelpers';

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuthContext();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setLoading(true);

    try {
      const result = login(formData.email, formData.password);
      
      if (result.success) {
        showToast('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
          navigate(getRoleRedirectPath(result.user.role));
        }, 1000);
      }
    } catch (err) {
      showToast('Invalid email or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Welcome Back</h2>
        <p className="text-gray-600 dark:text-gray-400 text-base">Sign in to access your attendance dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="student@uds.edu.gh"
          error={errors.email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">Create one</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
