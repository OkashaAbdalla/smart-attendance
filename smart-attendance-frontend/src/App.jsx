/**
 * App Component
 * Purpose: Root component with routing configuration
 * 
 * Features:
 *   - React Router setup
 *   - Route definitions
 *   - Global providers (ThemeProvider, AuthContext, etc.)
 * 
 * Note: Following architecture rules - this component only handles routing
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, ToastProvider, AuthProvider } from './context';
import { Landing, Login, Register, VerifyEmail } from './pages/public';
import { StudentDashboard, ActiveSessions, MarkAttendance, AttendanceHistory } from './pages/student';
import { LecturerDashboard, CreateSession, ManageSessions, ViewAttendance } from './pages/lecturer';
import { AdminDashboard, CreateLecturer, ManageLecturers } from './pages/admin';
import { ProtectedRoute } from './components/common';
import { ROUTES, ROLES } from './utils/constants';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Landing />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
          
          {/* Student Routes - Protected */}
          <Route path={ROUTES.STUDENT_DASHBOARD} element={<ProtectedRoute requiredRole={ROLES.STUDENT}><StudentDashboard /></ProtectedRoute>} />
          <Route path={ROUTES.ACTIVE_SESSIONS} element={<ProtectedRoute requiredRole={ROLES.STUDENT}><ActiveSessions /></ProtectedRoute>} />
          <Route path={`${ROUTES.MARK_ATTENDANCE}/:sessionId`} element={<ProtectedRoute requiredRole={ROLES.STUDENT}><MarkAttendance /></ProtectedRoute>} />
          <Route path={ROUTES.ATTENDANCE_HISTORY} element={<ProtectedRoute requiredRole={ROLES.STUDENT}><AttendanceHistory /></ProtectedRoute>} />
          
          {/* Lecturer Routes - Protected */}
          <Route path={ROUTES.LECTURER_DASHBOARD} element={<ProtectedRoute requiredRole={ROLES.LECTURER}><LecturerDashboard /></ProtectedRoute>} />
          <Route path={ROUTES.CREATE_SESSION} element={<ProtectedRoute requiredRole={ROLES.LECTURER}><CreateSession /></ProtectedRoute>} />
          <Route path={ROUTES.MANAGE_SESSIONS} element={<ProtectedRoute requiredRole={ROLES.LECTURER}><ManageSessions /></ProtectedRoute>} />
          <Route path={ROUTES.VIEW_ATTENDANCE} element={<ProtectedRoute requiredRole={ROLES.LECTURER}><ViewAttendance /></ProtectedRoute>} />
          
          {/* Admin Routes - Protected */}
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>} />
          <Route path={ROUTES.CREATE_LECTURER} element={<ProtectedRoute requiredRole={ROLES.ADMIN}><CreateLecturer /></ProtectedRoute>} />
          <Route path={ROUTES.MANAGE_LECTURERS} element={<ProtectedRoute requiredRole={ROLES.ADMIN}><ManageLecturers /></ProtectedRoute>} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </Router>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
