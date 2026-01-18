# Quick Reference Guide

**For**: Developers working on Smart Attendance System Frontend  
**Last Updated**: January 16, 2026

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install required packages
npm install react-router-dom axios

# Start development server
npm run dev
```

---

## 📁 Where Do I Add...?

### A New Component
```
Common (reusable):     src/components/common/
Student-specific:      src/components/student/
Lecturer-specific:     src/components/lecturer/
```

### A New Page
```
Public page:           src/pages/public/
Student page:          src/pages/student/
Lecturer page:         src/pages/lecturer/
```

### A New API Call
```
1. Define endpoint:    src/utils/constants.js (API_ENDPOINTS)
2. Implement call:     src/services/ (appropriate service file)
```

### A New Route
```
1. Define path:        src/utils/constants.js (ROUTES)
2. Add route:          src/routes/AppRoutes.jsx
```

### A New Constant
```
Add to:                src/utils/constants.js
```

### A New Utility Function
```
Add to:                src/utils/helpers.js
```

### A New Validation Rule
```
Add to:                src/utils/validators.js
```

---

## 🎨 Design System Quick Reference

### Colors
```javascript
import { COLORS } from '@/utils/constants';

// Primary
COLORS.PRIMARY          // #006838 - UDS Green
COLORS.PRIMARY_LIGHT    // #4CAF50 - Light green
COLORS.PRIMARY_DARK     // #004d29 - Dark green

// Accent
COLORS.ACCENT           // #1E40AF - University blue
COLORS.ACCENT_LIGHT     // #3B82F6 - Light blue

// Semantic
COLORS.SUCCESS          // #10B981 - Success
COLORS.ERROR            // #EF4444 - Error
COLORS.WARNING          // #F59E0B - Warning
COLORS.INFO             // #3B82F6 - Info

// Neutrals
COLORS.WHITE            // #FFFFFF
COLORS.GRAY_LIGHT       // #F5F5F5
COLORS.GRAY             // #9CA3AF
COLORS.GRAY_DARK        // #4B5563
COLORS.DARK             // #1A1A1A
```

### Tailwind Classes
```css
/* Buttons */
Primary:   bg-green-700 text-white rounded hover:bg-green-800
Secondary: bg-white text-green-700 border border-green-700 rounded

/* Cards */
bg-white rounded-lg shadow-md p-6 border border-gray-200

/* Inputs */
border border-gray-300 rounded px-4 py-2 
focus:border-green-700 focus:ring-2 focus:ring-green-200
```

---

## 🔐 Security Rules

### ❌ NEVER Do This
```javascript
// Don't let users select roles
<select name="role">
  <option value="student">Student</option>
</select>

// Don't call APIs directly from components
const MyComponent = () => {
  axios.get('/api/data');
};

// Don't trust frontend role checks for security
if (user.role === 'admin') {
  // Show admin features
}
```

### ✅ ALWAYS Do This
```javascript
// Roles come from backend
const { user } = useAuth(); // role from JWT token

// Use services for API calls
import { authService } from '@/services';
const data = await authService.login(credentials);

// Frontend checks are UX only
// Backend validates on every request
```

---

## 📋 Architecture Rules

### Components
```javascript
// ✅ Pure UI, receive data via props
const SessionCard = ({ session, onJoin }) => {
  return <div onClick={() => onJoin(session.id)}>...</div>;
};

// ❌ No API calls, no business logic
```

### Pages
```javascript
// ✅ Orchestrate UI, use services
const Dashboard = () => {
  const sessions = await sessionService.getActive();
  return <SessionList sessions={sessions} />;
};

// ❌ Don't call APIs directly
```

### Services
```javascript
// ✅ Handle all HTTP communication
export const sessionService = {
  getActive: async () => {
    return apiClient.get('/sessions/active');
  }
};

// ❌ No UI logic
```

### Hooks
```javascript
// ✅ Return logic, not JSX
const useCamera = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  return { isStreaming, startCamera, stopCamera };
};

// ❌ Don't return JSX
```

---

## 🔄 Mock Data Pattern

### Current (Mock)
```javascript
export const authService = {
  login: async (credentials) => {
    // Mock response
    return {
      token: 'mock_jwt_token',
      user: { id: 1, role: 'student' }
    };
  }
};
```

### Future (Real)
```javascript
export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  }
};
```

---

## 🎯 Common Tasks

### Add a New Student Feature

1. **Create Component** (if needed)
   ```
   src/components/student/MyFeature.jsx
   ```

2. **Create Page** (if needed)
   ```
   src/pages/student/MyFeaturePage.jsx
   ```

3. **Add Route**
   ```javascript
   // src/utils/constants.js
   ROUTES.MY_FEATURE: '/student/my-feature'
   
   // src/routes/AppRoutes.jsx
   <Route path={ROUTES.MY_FEATURE} element={<MyFeaturePage />} />
   ```

4. **Add Service Method** (if API needed)
   ```javascript
   // src/services/myService.js
   export const myService = {
     getData: async () => {
       // Mock for now
       return mockData;
     }
   };
   ```

### Add a New API Endpoint

1. **Define in Constants**
   ```javascript
   // src/utils/constants.js
   API_ENDPOINTS.MY_FEATURE = {
     GET_DATA: '/my-feature/data',
   };
   ```

2. **Implement in Service**
   ```javascript
   // src/services/myService.js
   import apiClient from './api';
   import { API_ENDPOINTS } from '@/utils/constants';
   
   export const myService = {
     getData: async () => {
       // Mock for now
       return mockData;
       
       // Real implementation later:
       // return apiClient.get(API_ENDPOINTS.MY_FEATURE.GET_DATA);
     }
   };
   ```

### Protect a Route

```javascript
// src/routes/AppRoutes.jsx
import { ProtectedRoute, RoleBasedRoute } from '@/routes';
import { ROLES } from '@/utils/constants';

<ProtectedRoute>
  <RoleBasedRoute allowedRoles={[ROLES.STUDENT]}>
    <StudentDashboard />
  </RoleBasedRoute>
</ProtectedRoute>
```

---

## 🐛 Common Mistakes

### Mistake 1: API Calls in Components
```javascript
// ❌ Wrong
const MyComponent = () => {
  useEffect(() => {
    axios.get('/api/data');
  }, []);
};

// ✅ Correct
const MyComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await myService.getData();
    };
    fetchData();
  }, []);
};
```

### Mistake 2: Business Logic in Components
```javascript
// ❌ Wrong
const SessionCard = ({ sessionId }) => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    sessionService.getById(sessionId).then(setSession);
  }, []);
};

// ✅ Correct
const SessionCard = ({ session }) => {
  return <div>{session.name}</div>;
};

// Parent fetches data
const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    sessionService.getAll().then(setSessions);
  }, []);
  
  return sessions.map(s => <SessionCard session={s} />);
};
```

### Mistake 3: Hardcoded Values
```javascript
// ❌ Wrong
<Link to="/student/dashboard">Dashboard</Link>

// ✅ Correct
import { ROUTES } from '@/utils/constants';
<Link to={ROUTES.STUDENT_DASHBOARD}>Dashboard</Link>
```

---

## 📚 Documentation Quick Links

- **Setup & Overview**: [README.md](./README.md)
- **Architecture Rules**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Folder Structure**: [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)
- **Project Status**: [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **Refinement Summary**: [REFINEMENT_SUMMARY.md](./REFINEMENT_SUMMARY.md)

---

## 🎓 Before You Code

1. ✅ Read ARCHITECTURE.md (understand the rules)
2. ✅ Check FOLDER_STRUCTURE.md (know where files go)
3. ✅ Review existing similar code (follow patterns)
4. ✅ Use constants from utils/constants.js (no hardcoding)
5. ✅ Add comments explaining your code
6. ✅ Follow the separation of concerns

---

## 🚨 When in Doubt

1. **Check existing code** - Look for similar implementations
2. **Read ARCHITECTURE.md** - Review the rules
3. **Ask before deviating** - Don't break established patterns
4. **Document your decisions** - Add comments explaining why

---

## ✅ Code Quality Checklist

Before committing:
- [ ] No API calls in components
- [ ] No business logic in components
- [ ] Used constants instead of hardcoded values
- [ ] Added comments explaining purpose
- [ ] Followed naming conventions
- [ ] Used appropriate service for API calls
- [ ] Tested with mock data
- [ ] Responsive design (mobile-first)
- [ ] UDS branding colors used
- [ ] No console.log statements left

---

**Remember**: This is a production-grade academic project. Code quality matters!
