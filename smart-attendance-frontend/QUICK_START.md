# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies

```bash
cd smart-attendance-frontend
npm install
```

This will install:
- React 19.2.0
- React DOM 19.2.0
- React Router DOM 7.1.3
- Axios 1.7.9
- Tailwind CSS (already configured)
- Vite (build tool)

### 2. Start Development Server

```bash
npm run dev
```

Open browser at: `http://localhost:5173`

---

## 📁 What You Have

### ✅ Complete Architecture
- 60+ files organized by feature
- All placeholder components created
- Service layer with mock APIs
- Utils and helpers ready
- Documentation complete

### 📂 Key Folders

```
src/
├── components/     # UI components (Button, Input, Modal, etc.)
├── pages/          # Route pages (Login, Dashboard, etc.)
├── services/       # API calls (mocked for now)
├── hooks/          # Custom hooks (useAuth, useCamera)
├── context/        # Global state (AuthContext)
├── routes/         # Route configuration
├── layouts/        # Page layouts
└── utils/          # Helpers, validators, constants
```

---

## 🎯 What to Build Next

### Phase 1: Common Components (Start Here!)

Build these components in order:

#### 1. Button Component
**File**: `src/components/common/Button.jsx`

**Requirements**:
- Variants: primary (green), secondary (white), danger (red)
- Sizes: small, medium, large
- Loading state with spinner
- Disabled state

**Example**:
```jsx
<Button variant="primary" size="medium">
  Mark Attendance
</Button>
```

#### 2. Input Component
**File**: `src/components/common/Input.jsx`

**Requirements**:
- Types: text, email, password
- Label and error message
- Validation feedback
- Icons (optional)

**Example**:
```jsx
<Input 
  label="Email" 
  type="email" 
  error="Invalid email"
/>
```

#### 3. Card Component
**File**: `src/components/common/Card.jsx`

**Requirements**:
- Rounded corners
- Soft shadow
- Padding
- UDS styling

#### 4. Loader Component
**File**: `src/components/common/Loader.jsx`

**Requirements**:
- Spinner with UDS green
- Full page and inline variants
- Size options

#### 5. Alert Component
**File**: `src/components/common/Alert.jsx`

**Requirements**:
- Types: success, error, warning, info
- Auto-dismiss option
- Close button

#### 6. Modal Component
**File**: `src/components/common/Modal.jsx`

**Requirements**:
- Backdrop overlay
- Close button
- Customizable content
- Responsive

---

### Phase 2: Authentication Pages

#### 1. Landing Page
**File**: `src/pages/public/Landing.jsx`

**Sections**:
- Hero with UDS branding
- System features
- Login/Register CTAs

#### 2. Login Page
**File**: `src/pages/public/Login.jsx`

**Features**:
- Email/password form
- Google OAuth button
- "Forgot password" link
- Validation

#### 3. Register Page
**File**: `src/pages/public/Register.jsx`

**Features**:
- Student registration form
- NO role selection (backend assigns)
- Email verification flow

---

### Phase 3: Student Features

#### 1. Student Dashboard
**File**: `src/pages/student/StudentDashboard.jsx`

**Shows**:
- Active sessions count
- Recent attendance
- Quick actions

#### 2. Face Capture
**File**: `src/components/student/FaceCapture.jsx`

**Features**:
- Camera preview
- Capture button
- Retake option
- Convert to base64

---

## 🎨 UDS Branding Guide

### Colors (Already in constants.js)

```javascript
import { COLORS } from '@/utils/constants';

// Use these colors:
COLORS.UDS_GREEN        // #006838 (primary)
COLORS.UDS_LIGHT_GREEN  // #4CAF50 (accent)
COLORS.WHITE            // #FFFFFF (secondary)
COLORS.GRAY             // #F5F5F5 (background)
COLORS.DARK             // #1A1A1A (text)
```

### Tailwind Classes

```jsx
// Primary button
className="bg-green-700 hover:bg-green-800 text-white"

// Card
className="bg-white rounded-lg shadow-md p-6"

// Input
className="border border-gray-300 rounded-md px-4 py-2"
```

---

## 🔧 Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 📚 Documentation Reference

- **ARCHITECTURE.md**: Detailed architecture explanation
- **FOLDER_STRUCTURE.md**: Complete folder tree
- **IMPLEMENTATION_PLAN.md**: Step-by-step implementation
- **PROJECT_SUMMARY.md**: Comprehensive project overview
- **README.md**: Project overview and setup

---

## 🎯 Development Tips

### 1. Start Small
Build one component at a time. Test in isolation before moving on.

### 2. Use Mock Data
All services are mocked. Focus on UI first, backend integration later.

### 3. Mobile-First
Design for mobile screens first, then scale up.

### 4. Follow the Structure
Every file has a comment explaining its purpose. Read them!

### 5. Use Barrel Exports
Import from index files for cleaner code:
```javascript
// Good
import { Button, Input } from '@/components/common';

// Avoid
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
```

---

## 🐛 Common Issues

### Issue: Module not found
**Solution**: Run `npm install` to install dependencies

### Issue: Tailwind styles not working
**Solution**: Check `index.css` has Tailwind imports:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Issue: Routes not working
**Solution**: Install React Router: `npm install react-router-dom`

---

## ✅ Checklist for Each Component

Before moving to the next component:

- [ ] Component renders without errors
- [ ] Props are properly typed/documented
- [ ] Responsive on mobile, tablet, desktop
- [ ] UDS branding applied (colors, fonts)
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Loading and error states handled
- [ ] Code is clean and commented

---

## 🎓 Academic Notes

### For Your Defense

**Be ready to explain**:
1. Why this folder structure?
2. How does authentication work?
3. How is security handled?
4. Why separate student and lecturer components?
5. How will backend integration work?

**Key points**:
- Frontend guards are UI-only (backend enforces security)
- Role assigned by backend (not frontend)
- Face recognition happens on backend
- Mobile-first responsive design
- Production-ready architecture

---

## 🚀 Ready to Code!

**Start with**: `src/components/common/Button.jsx`

**Test it in**: `src/App.jsx` (temporarily)

**Then move to**: Input → Card → Loader → Alert → Modal

**Good luck!** 🎉

---

## 📞 Need Help?

Refer to:
1. Component file comments (every file has purpose documented)
2. ARCHITECTURE.md (detailed architecture)
3. IMPLEMENTATION_PLAN.md (step-by-step guide)
4. PROJECT_SUMMARY.md (comprehensive overview)

**Everything you need is documented!** 📚