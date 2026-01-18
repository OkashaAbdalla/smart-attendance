/**
 * Authentication Service
 * Purpose: API calls for authentication operations
 * Endpoints (mocked for now):
 *   - register(userData): POST /auth/register
 *   - login(credentials): POST /auth/login
 *   - verifyEmail(token): POST /auth/verify-email
 *   - googleAuth(token): POST /auth/google
 *   - logout(): POST /auth/logout
 * Returns: Mock responses matching expected backend structure
 */

import apiClient from './api';

const authService = {
  // TODO: Implement mock API calls
  register: async (userData) => {
    // Mock implementation
    return { success: true, message: 'Registration successful' };
  },

  login: async (credentials) => {
    // Mock implementation
    return { 
      success: true, 
      token: 'mock-jwt-token',
      user: { id: '1', email: credentials.email, role: 'student' }
    };
  },

  verifyEmail: async (token) => {
    // Mock implementation
    return { success: true, message: 'Email verified' };
  },

  googleAuth: async (googleToken) => {
    // Mock implementation
    return { success: true, token: 'mock-jwt-token' };
  },

  logout: async () => {
    // Mock implementation
    return { success: true };
  },
};

export default authService;
