/**
 * Authentication Context
 * Purpose: Global state management for authentication
 * Provides:
 *   - user: Current user object (id, email, role, name)
 *   - isAuthenticated: Boolean authentication status
 *   - login: Function to handle login
 *   - logout: Function to handle logout
 *   - register: Function to handle registration
 * Storage: JWT token in localStorage
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, ROLES } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem('user_role');
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');

    if (token && userRole) {
      setUser({
        email: userEmail,
        role: userRole,
        name: userName,
      });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // TODO: Replace with real API call
    // For now, detect role from email
    let role = ROLES.STUDENT;
    if (email.toLowerCase().includes('admin')) {
      role = ROLES.ADMIN;
    } else if (email.toLowerCase().includes('lecturer') || email.toLowerCase().includes('staff')) {
      role = ROLES.LECTURER;
    }

    const userData = {
      email,
      role,
      name: email.split('@')[0],
    };

    // Store in localStorage
    localStorage.setItem('auth_token', 'mock-jwt-token');
    localStorage.setItem('user_role', role);
    localStorage.setItem('user_email', email);
    localStorage.setItem('user_name', userData.name);

    setUser(userData);
    setIsAuthenticated(true);

    return { success: true, user: userData };
  };

  const register = (userData) => {
    // TODO: Replace with real API call
    const newUser = {
      email: userData.email,
      role: ROLES.STUDENT,
      name: userData.fullName,
    };

    return { success: true, user: newUser };
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');

    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
