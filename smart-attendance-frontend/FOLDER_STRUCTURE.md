# Complete Folder Structure

```
smart-attendance-frontend/
│
├── node_modules/                    # Dependencies (auto-generated)
│
├── public/                          # Static assets
│   └── vite.svg                    # Vite logo
│
├── src/                            # Source code
│   │
│   ├── assets/                     # Static assets (images, logos, icons)
│   │   └── .gitkeep               # Placeholder for empty folder
│   │
│   ├── components/                 # Reusable UI components
│   │   │
│   │   ├── common/                # Shared components across all roles
│   │   │   ├── Alert.jsx         # Success/error/warning messages
│   │   │   ├── Button.jsx        # Reusable button with variants
│   │   │   ├── Card.jsx          # Content container
│   │   │   ├── Input.jsx         # Form input with validation
│   │   │   ├── Loader.jsx        # Loading spinner
│   │   │   ├── Modal.jsx         # Overlay dialogs
│   │   │   └── index.js          # Barrel export
│   │   │
│   │   ├── student/               # Student-specific components
│   │   │   ├── AttendanceHistoryTable.jsx  # Past attendance records
│   │   │   ├── FaceCapture.jsx             # Camera interface
│   │   │   ├── SessionCard.jsx             # Session display card
│   │   │   └── index.js                    # Barrel export
│   │   │
│   │   └── lecturer/              # Lecturer-specific components
│   │       ├── AttendanceReport.jsx  # Attendance records display
│   │       ├── SessionForm.jsx       # Create session form
│   │       ├── SessionList.jsx       # Manage sessions list
│   │       └── index.js              # Barrel export
│   │
│   ├── context/                    # React Context for global state
│   │   ├── AuthContext.jsx        # Authentication state management
│   │   └── index.js               # Barrel export
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.js             # Authentication hook
│   │   ├── useCamera.js           # Camera/webcam operations
│   │   ├── useRole.js             # Role-based logic
│   │   └── index.js               # Barrel export
│   │
│   ├── layouts/                    # Page layout wrappers
│   │   ├── LecturerLayout.jsx     # Layout for lecturer pages
│   │   ├── PublicLayout.jsx       # Layout for public pages
│   │   ├── StudentLayout.jsx      # Layout for student pages
│   │   └── index.js               # Barrel export
│   │
│   ├── pages/                      # Route-level page components
│   │   │
│   │   ├── public/                # Public pages (unauthenticated)
│   │   │   ├── Landing.jsx       # Landing/home page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Student registration
│   │   │   ├── VerifyEmail.jsx   # Email verification
│   │   │   └── index.js          # Barrel export
│   │   │
│   │   ├── student/               # Student pages (authenticated)
│   │   │   ├── ActiveSessions.jsx      # View active sessions
│   │   │   ├── AttendanceHistory.jsx   # View past attendance
│   │   │   ├── MarkAttendance.jsx      # Face capture for attendance
│   │   │   ├── StudentDashboard.jsx    # Student dashboard
│   │   │   └── index.js                # Barrel export
│   │   │
│   │   └── lecturer/              # Lecturer pages (authenticated)
│   │       ├── CreateSession.jsx       # Create attendance session
│   │       ├── LecturerDashboard.jsx   # Lecturer dashboard
│   │       ├── ManageSessions.jsx      # Manage sessions
│   │       ├── ViewAttendance.jsx      # View attendance records
│   │       └── index.js                # Barrel export
│   │
│   ├── routes/                     # Routing configuration
│   │   ├── AppRoutes.jsx          # Main route definitions
│   │   ├── ProtectedRoute.jsx     # Authentication guard
│   │   ├── RoleBasedRoute.jsx     # Role-based guard
│   │   └── index.js               # Barrel export
│   │
│   ├── services/                   # API service layer (mocked)
│   │   ├── api.js                 # Axios instance with interceptors
│   │   ├── attendanceService.js   # Attendance API calls
│   │   ├── authService.js         # Authentication API calls
│   │   ├── sessionService.js      # Session management API calls
│   │   └── index.js               # Barrel export
│   │
│   ├── utils/                      # Utility functions
│   │   ├── constants.js           # App constants (roles, routes, colors)
│   │   ├── helpers.js             # General helper functions
│   │   ├── tokenManager.js        # JWT token management
│   │   ├── validators.js          # Form validation functions
│   │   └── index.js               # Barrel export
│   │
│   ├── App.css                     # App-level styles
│   ├── App.jsx                     # Root component
│   ├── index.css                   # Global styles (Tailwind imports)
│   └── main.jsx                    # Application entry point
│
├── .gitignore                      # Git ignore rules
├── ARCHITECTURE.md                 # Architecture documentation (UPDATED)
├── eslint.config.js                # ESLint configuration
├── FOLDER_STRUCTURE.md             # This file
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Dependency lock file
├── PROJECT_STATUS.md               # Implementation status tracker (NEW)
├── README.md                       # Project documentation (UPDATED)
├── tailwind.config.js              # Tailwind CSS configuration
└── vite.config.js                  # Vite configuration
```

## 📊 File Count Summary

- **Total Files**: 60+
- **Components**: 12 (6 common, 3 student, 3 lecturer)
- **Pages**: 11 (4 public, 4 student, 4 lecturer)
- **Layouts**: 3
- **Hooks**: 3
- **Services**: 4
- **Utils**: 4
- **Routes**: 3

## 🎯 Key Organizational Principles

### 1. **Separation by Concern**
- Components: UI only
- Services: API calls
- Utils: Helper functions
- Context: Global state

### 2. **Role-Based Organization**
- Common: Shared across all roles
- Student: Student-specific features
- Lecturer: Lecturer-specific features

### 3. **Barrel Exports**
- Each folder has `index.js` for clean imports
- Example: `import { Button, Input } from '@/components/common'`

### 4. **Scalability**
- Easy to add new components
- Clear where new files belong
- Minimal coupling between modules

## 🔍 Finding Files

### "Where do I add...?"

**A new reusable button variant?**
→ `src/components/common/Button.jsx`

**A student-specific feature?**
→ `src/components/student/` or `src/pages/student/`

**A new API endpoint?**
→ `src/services/` (create new service or add to existing)

**A validation function?**
→ `src/utils/validators.js`

**A new route?**
→ `src/routes/AppRoutes.jsx`

**A global constant?**
→ `src/utils/constants.js`

## 🎓 Academic Defense Points

### Why This Structure?

1. **Scalability**: Easy to add features without restructuring
2. **Maintainability**: Clear where each file belongs
3. **Collaboration**: Multiple developers can work without conflicts
4. **Best Practices**: Industry-standard React organization
5. **Testability**: Isolated components and services

### Design Decisions

1. **Barrel Exports**: Cleaner imports, easier refactoring
2. **Role-Based Folders**: Clear separation of concerns
3. **Service Layer**: API abstraction for easy backend swap
4. **Utils Folder**: Reusable logic separate from UI
5. **Layouts**: Consistent page structure across roles

### Security Architecture

1. **Role Assignment**: Backend only, never frontend
2. **Route Guards**: UX convenience, not security
3. **Token Management**: Centralized in utils
4. **API Layer**: Single point for request/response handling

---

## 📚 Documentation Files

### Core Documentation
- **README.md**: Project overview, setup, and quick start
- **ARCHITECTURE.md**: Detailed architecture rules and principles
- **FOLDER_STRUCTURE.md**: This file - complete folder tree
- **PROJECT_STATUS.md**: Implementation status and roadmap

### What Each Document Covers

#### README.md
- Project overview and goals
- Technology stack
- Setup instructions
- UDS branding guidelines
- Quick reference for features

#### ARCHITECTURE.md
- Architecture principles and rules
- Separation of concerns
- Security clarifications
- Python integration expectations
- Design system details
- Academic defense guide

#### FOLDER_STRUCTURE.md (This File)
- Complete folder tree
- File count summary
- Organizational principles
- "Where do I add...?" guide

#### PROJECT_STATUS.md
- Implementation status
- What's completed vs planned
- Next steps and timeline
- Quality checklist
- Stakeholder communication

---

This structure is production-ready and suitable for a final-year BSc Computer Science project.