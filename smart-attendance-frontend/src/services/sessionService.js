/**
 * Session Service (Lecturer)
 * Purpose: API calls for session management
 * Endpoints (mocked for now):
 *   - createSession(sessionData): POST /sessions/create
 *   - activateSession(sessionId): PUT /sessions/:id/activate
 *   - deactivateSession(sessionId): PUT /sessions/:id/deactivate
 *   - getSessions(): GET /sessions
 *   - getAttendees(sessionId): GET /sessions/:id/attendees
 * Returns: Mock responses matching expected backend structure
 */

import apiClient from './api';

const sessionService = {
  // TODO: Implement mock API calls
  createSession: async (sessionData) => {
    // Mock implementation
    return { 
      success: true, 
      message: 'Session created successfully',
      sessionId: 'mock-session-id' 
    };
  },

  activateSession: async (sessionId) => {
    // Mock implementation
    return { success: true, message: 'Session activated' };
  },

  deactivateSession: async (sessionId) => {
    // Mock implementation
    return { success: true, message: 'Session deactivated' };
  },

  getSessions: async () => {
    // Mock implementation
    return { success: true, sessions: [] };
  },

  getAttendees: async (sessionId) => {
    // Mock implementation
    return { success: true, attendees: [] };
  },
};

export default sessionService;
