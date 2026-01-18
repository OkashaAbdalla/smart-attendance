/**
 * Dashboard Layout Component
 * Purpose: Shared layout for authenticated pages
 */

import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import ThemeSwitcher from '../components/common/ThemeSwitcher';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Clear auth state
    navigate(ROUTES.HOME);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={ROUTES.STUDENT_DASHBOARD} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white dark:bg-green-700 border-2 border-green-600 dark:border-transparent rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6 text-green-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">UDS<span className="text-green-600 dark:text-green-400">Attendance</span></span>
            </Link>

            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <button onClick={handleLogout} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
