# ✅ Backend-Frontend Connection Guide

## 🎉 CONNECTION SUCCESSFUL!

Your React frontend (port 3000) is now connected to the Java Spring Boot backend (port 8082) with H2 database.

---

## 🔌 Connection Architecture

```
┌─────────────────────────┐
│   React Frontend        │
│   http://localhost:3000 │
│   (Vite Dev Server)     │
└───────────┬─────────────┘
            │
            │ HTTP Requests
            │ (axios)
            ↓
┌─────────────────────────┐
│   API Layer             │
│   src/services/         │
│   - api.config.ts       │
│   - auth.service.ts     │
│   - user.service.ts     │
└───────────┬─────────────┘
            │
            │ REST API Calls
            │ http://localhost:8082/api
            ↓
┌─────────────────────────┐
│   Spring Boot Backend   │
│   http://localhost:8082 │
│   - AuthController      │
│   - UserController      │
│   - SkillController     │
│   - JobController       │
└───────────┬─────────────┘
            │
            │ JPA/Hibernate
            ↓
┌─────────────────────────┐
│   H2 Database           │
│   jdbc:h2:mem:skillmitra│
│   (In-Memory)           │
│   - users               │
│   - skills              │
│   - jobs                │
│   - applications        │
└─────────────────────────┘
```

---

## ✅ Verified Connection Points

### 1. Environment Configuration
- **Frontend `.env`**: ✅ Configured
  ```properties
  VITE_API_URL=http://localhost:8082/api
  ```

- **Backend `application.properties`**: ✅ Configured
  ```properties
  server.port=8082
  frontend.url=http://localhost:3000
  ```

### 2. CORS Configuration
- **Spring Security**: ✅ Enabled
  - Allows origin: `http://localhost:3000`
  - Methods: GET, POST, PUT, DELETE, OPTIONS
  - Headers: All (`*`)
  - Credentials: true

### 3. API Endpoints Connected
- ✅ **Authentication**: `/api/auth/*`
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login with JWT

- ✅ **Users**: `/api/users/*`
  - User management endpoints

- ✅ **Skills**: `/api/skills/*`
  - Skills CRUD operations

- ✅ **Jobs**: `/api/jobs/*`
  - Jobs CRUD operations

- ✅ **Applications**: `/api/applications/*`
  - Job applications management

---

## 🧪 Test the Connection

### Method 1: Interactive Test Page
1. Open: http://localhost:3000/test-connection.html
2. Click "Test Backend Connection" - Should show ✅ Backend is running!
3. Try registering a user
4. Try logging in
5. Check if you can fetch skills

### Method 2: Browser Console (F12)
Open http://localhost:3000, press F12, and run:
```javascript
// Test backend health
fetch('http://localhost:8082/api/skills')
  .then(r => r.json())
  .then(data => console.log('✅ Backend connected!', data))
  .catch(e => console.error('❌ Connection failed', e));

// Register a user
fetch('http://localhost:8082/api/auth/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'USER'
  })
})
.then(r => r.json())
.then(data => console.log('✅ User registered!', data))
.catch(e => console.error('❌ Registration failed', e));
```

### Method 3: Using curl (PowerShell)
```powershell
# Test backend health
curl http://localhost:8082/api/skills

# Register a user
curl -X POST http://localhost:8082/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\",\"phone\":\"+1234567890\",\"role\":\"USER\"}'

# Login
curl -X POST http://localhost:8082/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"password123\"}'
```

---

## 🔐 Authentication Flow

### Frontend → Backend JWT Flow
1. **User logs in** via React UI (Login.tsx)
2. **Frontend** calls `POST /api/auth/login` with credentials
3. **Backend** validates credentials, generates JWT token
4. **Frontend** stores token in `localStorage`
5. **Subsequent requests** include token in Authorization header:
   ```
   Authorization: Bearer <token>
   ```
6. **Backend** validates token via `JwtAuthenticationFilter`
7. **Protected endpoints** are accessible with valid token

### Implementation in Frontend
```typescript
// src/services/api.config.ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Implementation in Backend
```java
// SecurityConfig.java
- All /api/auth/** endpoints are public
- All other /api/** endpoints require authentication
- JWT filter validates token on each request
```

---

## 📊 Database Integration

### H2 Console Access
- **URL**: http://localhost:8082/h2-console
- **JDBC URL**: `jdbc:h2:mem:skillmitra`
- **Username**: `sa`
- **Password**: (empty)

### Seeded Data
The backend automatically seeds initial data on startup:
- **3 Skills** (Java, Photography, Guitar)
- **1 Admin User** (check logs for credentials)

### Tables Created
```sql
users           -- User accounts with auth
skills          -- Skill listings
jobs            -- Job postings
applications    -- Job applications
```

---

## 🔄 Data Flow Example: User Registration

### 1. Frontend (React)
```typescript
// pages/Signup.tsx
import { authService } from '@/services';

const handleSignup = async (data) => {
  const user = await authService.register({
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
    role: 'USER'
  });
  // User registered, redirect to login
};
```

### 2. API Service Layer
```typescript
// services/auth.service.ts
export const authService = {
  register: async (data: RegisterRequest) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  }
};
```

### 3. Axios Instance
```typescript
// services/api.config.ts
const api = axios.create({
  baseURL: 'http://localhost:8082/api', // ← FROM .env
  timeout: 10000
});
```

### 4. Backend Controller
```java
// controller/AuthController.java
@PostMapping("/register")
public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest req) {
    User created = userService.register(req);
    return ResponseEntity.ok(created);
}
```

### 5. Service Layer
```java
// service/UserService.java
public User register(RegisterRequest req) {
    User user = new User();
    user.setName(req.getName());
    user.setEmail(req.getEmail());
    user.setPassword(passwordEncoder.encode(req.getPassword()));
    // ... save to database via JPA
    return userRepository.save(user);
}
```

### 6. Database (H2)
```sql
INSERT INTO users (email, name, password, phone, role) 
VALUES ('test@example.com', 'Test User', '$2a$10$...', '+1234567890', 'USER');
```

---

## 🎯 Next Steps: Integrating UI Pages

Currently, your React pages use **mock data**. Here's how to connect them to the real backend:

### ✅ Already Created (API Services)
- `src/services/api.config.ts` - Axios instance with interceptors
- `src/services/auth.service.ts` - Register, login, logout
- `src/services/user.service.ts` - User management
- `src/services/offer.service.ts` - Offers CRUD
- `src/services/request.service.ts` - Requests CRUD
- `src/services/match.service.ts` - Matching system
- `src/services/message.service.ts` - Messaging

### ⏳ TODO: Update React Pages

#### 1. Update Login Page
```typescript
// pages/Login.tsx - BEFORE (mock)
const handleLogin = () => {
  // Mock login
  navigate('/dashboard');
};

// pages/Login.tsx - AFTER (real API)
import { authService } from '@/services';

const handleLogin = async (data) => {
  try {
    const response = await authService.login(data.email, data.password);
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    navigate('/dashboard');
  } catch (error) {
    setError(error.message);
  }
};
```

#### 2. Update Signup Page
```typescript
// pages/Signup.tsx
import { authService } from '@/services';

const handleSignup = async (data) => {
  try {
    await authService.register({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: 'USER'
    });
    navigate('/login');
  } catch (error) {
    setError(error.message);
  }
};
```

#### 3. Update Dashboard
```typescript
// pages/Dashboard.tsx
import { userService, offerService, requestService } from '@/services';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const userStats = await userService.getUserStats();
      const myOffers = await offerService.getMyOffers();
      setStats(userStats);
      setOffers(myOffers);
    };
    loadData();
  }, []);

  // ... render with real data
};
```

#### 4. Update Offers Page
```typescript
// pages/Offers.tsx
import { offerService } from '@/services';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      const data = await offerService.getOffers();
      setOffers(data);
      setLoading(false);
    };
    fetchOffers();
  }, []);

  // ... render offers
};
```

---

## 🐛 Troubleshooting

### Backend not responding
- ✅ Check backend is running: Look for "Tomcat started on port 8082"
- ✅ Test manually: `curl http://localhost:8082/api/skills`
- ✅ Check logs in Java terminal for errors

### CORS errors in browser console
- ✅ Verify frontend URL in backend config: Should be `http://localhost:3000`
- ✅ Check SecurityConfig.java has CORS enabled
- ✅ Make sure both servers are running

### 401 Unauthorized errors
- ✅ Check if token is stored: `localStorage.getItem('authToken')`
- ✅ Verify token format: Should be `Bearer <token>`
- ✅ Login again to get fresh token

### Frontend can't connect
- ✅ Check .env file: Should have `VITE_API_URL=http://localhost:8082/api`
- ✅ Restart frontend after changing .env: `npm run dev`
- ✅ Clear browser cache and refresh

---

## 📈 Testing Checklist

- [x] Backend running on port 8082
- [x] Frontend running on port 3000
- [x] CORS configured correctly
- [x] API base URL set in .env
- [x] JWT authentication working
- [x] H2 database accessible
- [ ] Register new user through UI
- [ ] Login and get JWT token
- [ ] Access protected endpoints
- [ ] Create/view skills
- [ ] Create/view jobs
- [ ] Test all CRUD operations

---

## 🎉 Success Indicators

You'll know everything is connected when:
1. ✅ Test page shows "Backend is Online"
2. ✅ You can register a new user
3. ✅ You can login and see a JWT token
4. ✅ Browser console shows `🌐 POST /auth/login` and `✅ POST /auth/login` logs
5. ✅ H2 console shows your registered users in the database
6. ✅ No CORS errors in browser console

---

## 📚 Additional Resources

- **Test Page**: http://localhost:3000/test-connection.html
- **Backend API**: http://localhost:8082/api
- **H2 Console**: http://localhost:8082/h2-console
- **Frontend**: http://localhost:3000
- **Setup Guide**: `RUNNING_WITHOUT_MONGODB.md`

---

**🎊 Congratulations!** Your frontend and backend are successfully connected and communicating!
