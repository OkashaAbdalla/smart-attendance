
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout, FormInput } from '../../components/common';
import { ROUTES } from '../../utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with real authService.login(formData)
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(ROUTES.STUDENT_DASHBOARD);
    } catch (err) {
      setError('Invalid email or password');
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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Welcome Back</h2>
        <p className="text-gray-600 dark:text-gray-400 text-base">Sign in to access your attendance dashboard</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="student@uds.edu.gh"
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50"
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
