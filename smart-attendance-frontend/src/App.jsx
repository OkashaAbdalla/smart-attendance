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
import { ThemeProvider } from './context';
import { Landing, Login, Register, VerifyEmail } from './pages/public';
import { StudentDashboard, ActiveSessions, MarkAttendance } from './pages/student';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Landing />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />
          
          {/* Student Routes - TODO: Add authentication protection */}
          <Route path={ROUTES.STUDENT_DASHBOARD} element={<StudentDashboard />} />
          <Route path={ROUTES.ACTIVE_SESSIONS} element={<ActiveSessions />} />
          <Route path={`${ROUTES.MARK_ATTENDANCE}/:sessionId`} element={<MarkAttendance />} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
