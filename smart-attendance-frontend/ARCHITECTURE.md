# Smart Attendance System - Frontend Architecture

## 🎯 Architecture Overview

This document defines the **production-grade architecture** for the Smart Attendance System frontend. Every architectural decision is made with scalability, security, and maintainability in mind.

### Core Principle: Separation of Concerns

```
┌─────────────────────────────────────────────────────────────┐
│                         PAGES                                │
│  (Route-level components, orchestrate UI flow)              │
│  ❌ Never call APIs directly                                 │
│  ✅ Use services for data operations                         │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                      COMPONENTS                              │
│  (Pure UI, reusable, presentational)                        │
│  ❌ No business logic                                        │
│  ❌ No API calls                                             │
│  ✅ Receive data via props                                   │
│  ✅ Emit events via callbacks                                │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                       SERVICES                               │
│  (API communication layer)                                   │
│  ✅ All HTTP requests                                        │
│  ✅ Data transformation                                      │
│  ✅ Error handling                                           │
│  ❌ No UI logic                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    BACKEND API                               │
│  (Node.js + Express + MongoDB)                              │
│  ⚠️ NOT IMPLEMENTED YET                                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 📋 ARCHITECTURE RULES (MANDATORY)

### 1. Pages Never Call APIs Directly
```javascript
// ❌ BAD: Page calling API directly
const StudentDashboard = () => {
  const fetchSessions = async () => {
    const response = await axios.get('/api/sessions');
  };
};

// ✅ GOOD: Page using service
import { sessionService } from '@/services';

const StudentDashboard = () => {
  const fetchSessions = async () => {
    const sessions = await sessionService.getActiveSessions();
  };
};
```

### 2. Components Are Pure UI Only
```javascript
// ❌ BAD: Component with business logic
const SessionCard = ({ sessionId }) => {
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    fetch(`/api/sessions/${sessionId}`).then(/* ... */);
  }, []);
};

// ✅ GOOD: Component receives data via props
const SessionCard = ({ session, onJoin }) => {
  return (
    <div>
      <h3>{session.courseName}</h3>
      <button onClick={() => onJoin(session.id)}>Join</button>
    </div>
  );
};
```

### 3. Services Handle All HTTP Communication
```javascript
// ✅ Service layer abstracts API calls
export const sessionService = {
  getActiveSessions: async () => {
    // Mock for now, real API call later
    return mockSessions;
  },
  
  createSession: async (sessionData) => {
    // Will be: return apiClient.post('/sessions', sessionData);
    return mockResponse;
  },
};
```

### 4. Context Manages Auth State Only
```javascript
// ✅ AuthContext: Global auth state
const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

// ❌ Don't put everything in context
// Use local state for component-specific data
```

### 5. Hooks Encapsulate Logic, Not UI
```javascript
// ✅ Hook returns logic, not JSX
const useCamera = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  
  const startCamera = async () => {
    // Camera logic
  };
  
  return { isStreaming, startCamera };
};

// ❌ Hooks should not return JSX
```

### 6. Routes Handle Access Control Only
```javascript
// ✅ Route guards check authentication/authorization
<ProtectedRoute>
  <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
    <StudentDashboard />
  </RoleBasedRoute>
</ProtectedRoute>

// ❌ Don't put business logic in route components
```

---

## 🤔 Why This Architecture?

### Scalability
- **Easy to add features**: New components don't affect existing ones
- **Team collaboration**: Multiple developers can work without conflicts
- **Code reusability**: Components and services are modular

### Maintainability
- **Clear responsibilities**: Each layer has a single purpose
- **Easy debugging**: Know exactly where to look for issues
- **Refactoring safety**: Changes in one layer don't break others

### Testability
- **Isolated units**: Components, services, and hooks can be tested independently
- **Mock-friendly**: Service layer makes mocking APIs trivial
- **Predictable**: Pure components are easy to test

### Security
- **Backend enforcement**: Frontend guards are UX only
- **Token management**: Centralized in tokenManager utility
- **Role validation**: Backend validates on every API call

---

## 🔐 Authentication Flow (Frontend)

```
1. User submits login credentials
2. authService.login() called (mocked for now)
3. Mock JWT token received
4. Token stored in localStorage (tokenManager)
5. User data stored in AuthContext
6. User redirected to role-based dashboard
7. All subsequent API calls include JWT in headers (via interceptor)
```

---

## ⚠️ FRONTEND-FIRST DEVELOPMENT RULES

### Backend Status: NOT IMPLEMENTED YET

This frontend is designed to work **independently** during development:

1. **API Services Use Placeholder URLs**
   ```javascript
   // src/services/api.js
   const BASE_URL = 'http://localhost:5000/api'; // PLACEHOLDER
   ```

2. **Services Return Mocked Responses**
   ```javascript
   // src/services/authService.js
   export const authService = {
     login: async (credentials) => {
       // TODO: Replace with real API call
       return {
         token: 'mock_jwt_token',
         user: { id: 1, role: 'student', name: 'John Doe' }
       };
     }
   };
   ```

3. **UI Must Be Functional Without Backend**
   - All pages should render with mock data
   - Forms should validate and show feedback
   - Navigation should work completely
   - Camera capture should work (just not send to backend)

4. **When Backend Is Ready**
   - Update `BASE_URL` in `src/services/api.js`
   - Replace mock implementations in service files
   - Implement real JWT token handling
   - Add refresh token logic

### Development Workflow
```
Phase 1: Build UI with mock data ← WE ARE HERE
Phase 2: Implement backend API
Phase 3: Connect frontend to backend
Phase 4: Integrate Python face recognition
```

---

## 🔒 ROLE & SECURITY CLARIFICATION

### Critical Security Rules

#### 1. Roles Are NEVER Selected on Frontend
```javascript
// ❌ NEVER DO THIS
<select name="role">
  <option value="student">Student</option>
  <option value="lecturer">Lecturer</option>
</select>

// ✅ Roles come from backend
// Backend assigns role during registration
// Frontend receives role from JWT token claims
```

#### 2. Role Assignment Logic (Backend)
- **Students**: Auto-assigned `role: 'student'` during registration
- **Lecturers**: Created by admin or authorized email domain
- **Frontend**: Only displays UI based on role, never assigns it

#### 3. RoleBasedRoute Security
```javascript
// src/utils/constants.js
export const ROLES = {
  STUDENT: 'student',
  LECTURER: 'lecturer',
};

// RoleBasedRoute must:
// ✅ Block URL access manually typed by users
// ✅ Redirect unauthorized roles safely
// ✅ Get role from JWT token (decoded by backend)
// ❌ Never trust role from localStorage directly
```

#### 4. Frontend vs Backend Security
| Security Check | Frontend | Backend |
|----------------|----------|---------|
| Role validation | ✅ UX only | ✅ Enforced |
| Token validation | ✅ Check exists | ✅ Verify signature |
| API authorization | ❌ Not possible | ✅ Every request |
| Data access | ❌ Can be bypassed | ✅ Enforced |

**Key Principle**: Frontend security is for **user experience**, backend security is for **actual protection**.

---

## 🔑 GOOGLE AUTHENTICATION CLARIFICATION

### Google Sign-In Flow

**Important**: Google Sign-In is for **SIGN IN**, not **SIGN UP**

```
┌─────────────────────────────────────────────────────────────┐
│                    GOOGLE AUTH FLOW                          │
└─────────────────────────────────────────────────────────────┘

1. User clicks "Sign in with Google"
   ↓
2. Google OAuth popup opens
   ↓
3. User authorizes app
   ↓
4. Frontend receives Google token
   ↓
5. Frontend sends Google token to backend
   ↓
6. Backend validates Google token
   ↓
7. Backend checks if user exists:
   
   IF USER EXISTS:
   ├─ Return JWT token
   └─ Frontend stores token and redirects
   
   IF NEW USER:
   ├─ Create new account
   ├─ Assign role (student by default)
   ├─ Generate JWT token
   └─ Return JWT to frontend
   ↓
8. Frontend only consumes the JWT token
   ↓
9. User redirected to dashboard
```

### Frontend Responsibility
```javascript
// Frontend only:
// 1. Trigger Google OAuth popup
// 2. Receive Google token
// 3. Send to backend
// 4. Store JWT response
// 5. Redirect user

// Backend decides:
// - Create account or not
// - Assign role
// - Generate JWT
```

---

## 🐍 PYTHON INTEGRATION EXPECTATION

### Face Recognition Architecture

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   FRONTEND   │      │   BACKEND    │      │    PYTHON    │
│   (React)    │─────▶│  (Node.js)   │─────▶│   SERVICE    │
└──────────────┘      └──────────────┘      └──────────────┘
     │                      │                      │
     │ 1. Capture image     │                      │
     │ 2. Convert to base64 │                      │
     │ 3. Send to backend   │                      │
     │                      │ 4. Forward image     │
     │                      │ 5. Request match     │
     │                      │                      │ 6. Detect face
     │                      │                      │ 7. Encode face
     │                      │                      │ 8. Match encoding
     │                      │                      │ 9. Calculate confidence
     │                      │◀─────────────────────│
     │                      │ 10. Receive score    │
     │                      │ 11. Validate threshold
     │                      │ 12. Create record    │
     │◀─────────────────────│                      │
     │ 13. Show result      │                      │
```

### Frontend Responsibilities
- **Capture**: Access webcam, capture image
- **Convert**: Image to base64 string
- **Send**: POST to backend API with image data
- **Display**: Show success/error based on response

### Python Service Responsibilities (Backend)
- **Face Detection**: Detect face in image
- **Face Encoding**: Generate face embedding vector
- **Face Matching**: Compare with stored encodings
- **Confidence Score**: Return match confidence (0-1)
- **Liveness Detection**: Optional anti-spoofing

### Integration Points

#### FaceCapture.jsx
```javascript
// TODO: Send captured image to Python face-recognition service
const handleCapture = async () => {
  const imageBase64 = await captureImage();
  
  // Send to backend (which forwards to Python)
  const result = await attendanceService.markAttendance({
    sessionId,
    imageData: imageBase64
  });
  
  // Python service returns: { success, confidence, message }
};
```

#### useCamera.js
```javascript
// TODO: Send to Python face-recognition service via backend API
const captureImage = () => {
  // 1. Draw video frame to canvas
  // 2. Convert canvas to base64
  // 3. Return base64 string
  // Backend will forward to Python service
};
```

---

## 🎨 UDS DESIGN SYSTEM

### Brand Identity
**University for Development Studies (UDS)**  
**Computer Science Society (CSS)**

### Color Palette

#### Primary Colors
- **UDS Green**: `#006838` - Main brand color (from UDS CSS logo)
  - Use for: Primary buttons, headers, active states
- **University Blue**: `#1E40AF` - Accent color (from UDS CSS logo)
  - Use for: Links, secondary actions, highlights

#### Semantic Colors
- **Success**: `#10B981` - Attendance marked, session created
- **Error**: `#EF4444` - Failed verification, errors
- **Warning**: `#F59E0B` - Session ending soon, warnings
- **Info**: `#3B82F6` - Informational messages

#### Neutrals
- **White**: `#FFFFFF` - Backgrounds, cards
- **Gray Light**: `#F5F5F5` - Subtle backgrounds
- **Gray**: `#9CA3AF` - Borders, disabled states
- **Gray Dark**: `#4B5563` - Secondary text
- **Dark**: `#1A1A1A` - Primary text

### Typography
- **Font Family**: Inter, Poppins, system fonts
- **Headings**: Bold, UDS Green or Dark
- **Body**: Regular, Dark or Gray Dark
- **Captions**: Small, Gray

### Design Principles

#### 1. Clean
- Minimal clutter
- Clear visual hierarchy
- Generous whitespace
- Focused content

#### 2. Modern
- Contemporary UI patterns
- Smooth animations
- Rounded corners (8px cards, 4px buttons)
- Soft shadows

#### 3. Accessible
- WCAG 2.1 AA compliant
- High contrast ratios
- Clear focus states
- Screen reader friendly

#### 4. Professional
- Academic credibility
- Consistent branding
- Polished interactions
- Error prevention

#### 5. Mobile-First
- Optimized for phones
- Touch-friendly targets (min 44px)
- Responsive layouts
- Fast loading

### Component Styling

#### Buttons
```css
Primary: bg-green-700 text-white rounded hover:bg-green-800
Secondary: bg-white text-green-700 border-green-700 rounded
Danger: bg-red-600 text-white rounded hover:bg-red-700
```

#### Cards
```css
bg-white rounded-lg shadow-md p-6 border border-gray-200
```

#### Inputs
```css
border border-gray-300 rounded px-4 py-2 focus:border-green-700 focus:ring-2 focus:ring-green-200
```

---

## 📱 Responsive Design Strategy

### Breakpoints (Tailwind CSS)
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
- Base styles for mobile
- Use Tailwind responsive prefixes (sm:, md:, lg:)
- Hamburger menu for navigation on mobile

---

## 🧩 Key Components

### Student Components
- **SessionCard**: Display active session with CTA
- **FaceCapture**: Camera interface for attendance marking
- **AttendanceHistoryTable**: Past attendance records

### Lecturer Components
- **SessionForm**: Create new attendance session
- **SessionList**: Manage created sessions
- **AttendanceReport**: View attendance records

### Common Components
- **Button**: Reusable with variants (primary, secondary, danger)
- **Input**: Form input with validation feedback
- **Modal**: Overlay dialogs
- **Loader**: Loading spinner
- **Alert**: Success/error messages
- **Card**: Content container

---

## 🔄 Data Flow

```
User Action → Component → Service → API (mocked) → Response → Context/State → UI Update
```

### Example: Mark Attendance
```
1. Student clicks "Mark Attendance"
2. MarkAttendance page renders FaceCapture component
3. useCamera hook accesses webcam
4. Student captures image
5. Image converted to base64
6. attendanceService.markAttendance() called
7. Mock response returned
8. Success/error alert displayed
9. Redirect to dashboard
```

---

## 🚀 Future Integration Points

### Backend Integration
- Replace mock services with real API calls
- Update BASE_URL in api.js
- Handle real JWT tokens
- Implement refresh token logic

### Python Face Recognition
- Backend will handle face recognition
- Frontend only sends image data
- Receives confidence score in response

### Additional Features
- Real-time session updates (WebSockets)
- Push notifications
- Offline support (PWA)
- Analytics dashboard

---

## 🧪 Testing Strategy (Future)

### Unit Tests
- Component rendering
- Utility functions
- Validation logic

### Integration Tests
- User flows (login, mark attendance)
- API service calls
- Route protection

### E2E Tests
- Complete user journeys
- Cross-browser testing
- Mobile responsiveness

---

## 📦 Dependencies

### Core
- React 19.2.0
- React Router (to be installed)
- Axios (to be installed)

### Styling
- Tailwind CSS (configured)

### Development
- Vite (build tool)
- ESLint (code quality)

---

## 🎓 Academic Defense Points

### Why This Architecture?
1. **Scalability**: Easy to add new features/roles
2. **Maintainability**: Clear separation of concerns
3. **Testability**: Isolated components and services
4. **Security**: Role-based access, JWT handling
5. **Best Practices**: Industry-standard React patterns

### Design Decisions
1. **Context API over Redux**: Simpler for this scale
2. **Axios over Fetch**: Better error handling, interceptors
3. **Barrel Exports**: Cleaner imports
4. **Mock Services**: Frontend development without backend dependency
5. **Mobile-First**: University students use phones primarily

---

## ✅ Ready for Implementation

This architecture provides:
- Clear structure for team collaboration
- Easy backend integration later
- Scalable for future features
- Production-ready patterns
- Defensible design decisions for academic evaluation

---

## 📊 IMPLEMENTATION STATUS

### ✅ Implemented Now (Scaffolding Phase)
- [x] Folder structure
- [x] Architecture documentation
- [x] Constants and design system
- [x] File organization
- [x] Documentation standards

### 🔄 Placeholder (Mock Implementation)
- [ ] API service layer (mocked responses)
- [ ] Authentication flow (mock JWT)
- [ ] Component implementations (TODO comments)
- [ ] Hook implementations (TODO comments)
- [ ] Route guards (structure only)

### 🔮 Planned for Backend Phase
- [ ] Real API endpoints
- [ ] JWT token validation
- [ ] Database operations
- [ ] Python face recognition integration
- [ ] Email verification service
- [ ] Google OAuth backend
- [ ] Session management
- [ ] Attendance record creation

### 🎯 Next Steps (UI Implementation Phase)
1. Install dependencies (react-router-dom, axios)
2. Implement common components (Button, Input, Card, Modal)
3. Build authentication pages (Login, Register)
4. Create student dashboard and face capture UI
5. Build lecturer dashboard and session management
6. Add responsive styling with Tailwind
7. Test all user flows with mock data

---

## 🚫 REMOVE AMBIGUITY

### What Is Implemented?
- **Folder structure**: ✅ Complete
- **Documentation**: ✅ Complete
- **Constants**: ✅ Complete
- **File stubs**: ✅ Created with TODO comments

### What Is Placeholder?
- **Components**: 📝 Stub files with documentation
- **Services**: 📝 Mock implementations
- **Hooks**: 📝 Structure defined, logic pending
- **Routes**: 📝 Guards defined, implementation pending

### What Is Planned?
- **Backend API**: 🔮 Node.js + Express + MongoDB
- **Python Service**: 🔮 Face recognition microservice
- **Real Authentication**: 🔮 JWT validation, refresh tokens
- **Database**: 🔮 MongoDB with Mongoose

### No Guessing, No Assumptions
Every file clearly states:
- ✅ What it does
- ❌ What it doesn't do
- 📝 What needs to be implemented
- 🔮 What depends on backend

---

## 🎓 ACADEMIC DEFENSE GUIDE

### Architecture Questions

**Q: Why separate services from components?**  
A: Separation of concerns. Components focus on UI, services handle data. This makes testing easier and allows backend changes without touching UI.

**Q: Why Context API instead of Redux?**  
A: For this scale, Context API is sufficient. It's simpler, has less boilerplate, and is built into React. We can migrate to Redux/Zustand if state complexity grows.

**Q: Why mock data during development?**  
A: Allows frontend and backend teams to work in parallel. Frontend can build and test UI without waiting for backend APIs.

**Q: How do you ensure security?**  
A: Frontend guards are UX only. Real security is enforced by backend on every API call. JWT tokens are validated server-side, roles are assigned by backend only.

**Q: Why mobile-first design?**  
A: University students primarily use mobile phones. Mobile-first ensures the most common use case is optimized first.

### Design Decisions

**Q: Why this folder structure?**  
A: Industry standard React organization. Clear separation by feature (student/lecturer) and concern (components/services/utils). Easy for new developers to navigate.

**Q: Why Tailwind CSS?**  
A: Utility-first approach speeds development. Consistent design system. Small bundle size. Easy to customize for UDS branding.

**Q: Why separate layouts?**  
A: Different user roles need different navigation and structure. Layouts provide consistent wrapper without duplicating code.

---

## 📚 FOR NEW DEVELOPERS

### Where to Code?

**Adding a new student feature?**
1. Component: `src/components/student/`
2. Page: `src/pages/student/`
3. Service: `src/services/` (add method to existing service)

**Adding a new API endpoint?**
1. Define in: `src/utils/constants.js` (API_ENDPOINTS)
2. Implement in: `src/services/` (appropriate service file)

**Adding a new route?**
1. Define path in: `src/utils/constants.js` (ROUTES)
2. Add route in: `src/routes/AppRoutes.jsx`

**Adding a reusable component?**
1. Common: `src/components/common/`
2. Role-specific: `src/components/student/` or `src/components/lecturer/`

### Where NOT to Code?

**❌ Don't put API calls in components**
- Use services instead

**❌ Don't put business logic in pages**
- Use hooks or services

**❌ Don't put UI in hooks**
- Hooks return logic, components render UI

**❌ Don't hardcode values**
- Use constants from `src/utils/constants.js`

### Why Decisions Were Made?

Every architectural decision is documented in this file. If you're unsure:
1. Read this ARCHITECTURE.md
2. Check file header comments
3. Look at similar existing code
4. Ask before deviating from patterns

---

**Last Updated**: January 2026  
**Status**: Architecture Complete, Ready for UI Implementation  
**Next Phase**: Component Implementation with Mock Data
