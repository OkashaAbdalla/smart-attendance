/**
 * Application Constants
 * Purpose: Centralized constants for the application
 * 
 * IMPORTANT NOTES:
 * - Roles are NEVER selected by users on frontend
 * - Roles are assigned by backend and come from JWT token claims
 * - Frontend role checks are UI-only; backend enforces real security
 */

// ========================================
// USER ROLES
// ========================================
// These roles are assigned by the backend only
// Students: Auto-assigned during registration
// Lecturers: Created by admin or authorized email domain
export const ROLES = {
  STUDENT: 'student',
  LECTURER: 'lecturer',
  ADMIN: 'admin', // Future use
};

// ========================================
// ROUTE PATHS
// ========================================
// Frontend route definitions
// Used in React Router and navigation
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  
  // Student routes
  STUDENT_DASHBOARD: '/student/dashboard',
  ACTIVE_SESSIONS: '/student/sessions',
  MARK_ATTENDANCE: '/student/mark-attendance',
  ATTENDANCE_HISTORY: '/student/history',
  
  // Lecturer routes
  LECTURER_DASHBOARD: '/lecturer/dashboard',
  CREATE_SESSION: '/lecturer/create-session',
  MANAGE_SESSIONS: '/lecturer/sessions',
  VIEW_ATTENDANCE: '/lecturer/attendance',
};

// ========================================
// API ENDPOINTS
// ========================================
// Backend API endpoint structure (for reference)
// Used in service layer for API calls
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    VERIFY_EMAIL: '/auth/verify-email',
    GOOGLE_AUTH: '/auth/google',
    LOGOUT: '/auth/logout',
  },
  ATTENDANCE: {
    MARK: '/attendance/mark',
    HISTORY: '/attendance/history',
    SESSIONS: '/attendance/sessions',
  },
  SESSIONS: {
    CREATE: '/sessions/create',
    ACTIVATE: '/sessions/:id/activate',
    DEACTIVATE: '/sessions/:id/deactivate',
    LIST: '/sessions',
    ATTENDEES: '/sessions/:id/attendees',
  },
};

// ========================================
// UDS DESIGN SYSTEM
// ========================================
// University for Development Studies (UDS) Branding
// Computer Science Society (CSS) Identity

// Color Palette
export const COLORS = {
  // Primary: University Green (from UDS CSS logo)
  PRIMARY: '#006838',           // UDS Green - main brand color
  PRIMARY_LIGHT: '#4CAF50',     // Light green for hover states
  PRIMARY_DARK: '#004d29',      // Dark green for active states
  
  // Accent: University Blue (from UDS CSS logo)
  ACCENT: '#1E40AF',            // University blue
  ACCENT_LIGHT: '#3B82F6',      // Light blue for highlights
  
  // Neutrals
  WHITE: '#FFFFFF',             // Background, cards
  GRAY_LIGHT: '#F5F5F5',        // Subtle backgrounds
  GRAY: '#9CA3AF',              // Borders, disabled states
  GRAY_DARK: '#4B5563',         // Secondary text
  DARK: '#1A1A1A',              // Primary text
  
  // Semantic Colors
  SUCCESS: '#10B981',           // Success messages
  ERROR: '#EF4444',             // Error messages
  WARNING: '#F59E0B',           // Warning messages
  INFO: '#3B82F6',              // Info messages
};

// Design System Principles
export const DESIGN_SYSTEM = {
  // Typography
  FONT_FAMILY: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  
  // Style Goals
  STYLE: {
    CLEAN: 'Minimal clutter, clear hierarchy',
    MODERN: 'Contemporary UI patterns',
    ACCESSIBLE: 'WCAG 2.1 AA compliant',
    PROFESSIONAL: 'Academic system credibility',
    MOBILE_FIRST: 'Optimized for mobile devices',
  },
  
  // Spacing Scale (Tailwind-compatible)
  SPACING: {
    XS: '0.25rem',   // 4px
    SM: '0.5rem',    // 8px
    MD: '1rem',      // 16px
    LG: '1.5rem',    // 24px
    XL: '2rem',      // 32px
    '2XL': '3rem',   // 48px
  },
  
  // Border Radius
  RADIUS: {
    SM: '0.25rem',   // 4px - buttons, inputs
    MD: '0.5rem',    // 8px - cards
    LG: '0.75rem',   // 12px - modals
    FULL: '9999px',  // Circular
  },
};

// ========================================
// FACE RECOGNITION CONFIGURATION
// ========================================
// Note: Face recognition is handled by Python backend service
// Frontend only captures and sends image data
export const FACE_RECOGNITION = {
  MIN_CONFIDENCE: 0.6,              // Minimum acceptable match confidence
  RECOMMENDED_CONFIDENCE: 0.7,      // Recommended threshold for production
  IMAGE_FORMAT: 'image/jpeg',       // Captured image format
  IMAGE_QUALITY: 0.9,               // JPEG quality (0-1)
  MAX_IMAGE_SIZE: 5 * 1024 * 1024,  // 5MB max file size
};

// ========================================
// LOCAL STORAGE KEYS
// ========================================
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',         // JWT access token
  REFRESH_TOKEN: 'refresh_token',   // JWT refresh token (future)
  USER_DATA: 'user_data',           // User profile data
};

// ========================================
// GOOGLE AUTHENTICATION
// ========================================
// Google Sign-In is for SIGN IN only, NOT sign up
// Flow:
// 1. User clicks "Sign in with Google"
// 2. Google OAuth popup
// 3. Backend receives Google token
// 4. Backend checks if user exists:
//    - If exists: Return JWT token
//    - If new: Create account, assign role, return JWT
// 5. Frontend only consumes the JWT token
export const GOOGLE_AUTH = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
  SCOPES: 'profile email',
};
