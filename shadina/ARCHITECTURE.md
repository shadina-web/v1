# 🏗️ SkillMitra Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                              │
│                     http://localhost:3000                           │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               │ HTTP Requests (with JWT Token)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Components: Login, Signup, Dashboard, Profile, Offers, etc.  │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
│                              │                                       │
│  ┌───────────────────────────▼───────────────────────────────────┐  │
│  │              API Services (src/services/)                     │  │
│  │  - authService    - offerService    - matchService           │  │
│  │  - userService    - requestService  - messageService         │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
│                              │                                       │
│  ┌───────────────────────────▼───────────────────────────────────┐  │
│  │         Axios Instance (api.config.ts)                        │  │
│  │  • Adds Authorization header                                 │  │
│  │  • Handles errors (401, 403, 404, 500)                       │  │
│  │  • Automatic token refresh                                   │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
└────────────────────────────────┬──────────────────────────────────────┘
                                 │
                                 │ REST API Calls
                                 │ (JSON)
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│              NODE.JS + EXPRESS BACKEND                              │
│                  http://localhost:5000                              │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    server.js (Entry Point)                    │  │
│  │  • CORS configuration                                         │  │
│  │  • Body parsing (JSON)                                        │  │
│  │  • Security (Helmet)                                          │  │
│  │  • Logging (Morgan)                                           │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
│                              │                                       │
│  ┌───────────────────────────▼───────────────────────────────────┐  │
│  │                    API ROUTES                                 │  │
│  │  /api/auth       /api/offers      /api/matches               │  │
│  │  /api/users      /api/requests    /api/messages              │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
│                              │                                       │
│  ┌───────────────────────────▼───────────────────────────────────┐  │
│  │              MIDDLEWARE (auth, validation, error)             │  │
│  │  • Verify JWT token                                           │  │
│  │  • Validate request data                                      │  │
│  │  • Handle errors                                              │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
│                              │                                       │
│  ┌───────────────────────────▼───────────────────────────────────┐  │
│  │                    CONTROLLERS                                │  │
│  │  auth.controller    offer.controller    match.controller     │  │
│  │  user.controller    request.controller  message.controller   │  │
│  │  • Business logic                                             │  │
│  │  • Request processing                                         │  │
│  │  • Response formatting                                        │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
│                              │                                       │
│  ┌───────────────────────────▼───────────────────────────────────┐  │
│  │              MONGOOSE MODELS (MongoDB ODM)                    │  │
│  │  User      Offer      Request      Match      Message         │  │
│  │  • Schema validation                                          │  │
│  │  • Business methods                                           │  │
│  │  • Indexes                                                    │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
└────────────────────────────────┬──────────────────────────────────────┘
                                 │
                                 │ MongoDB Queries
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      MONGODB DATABASE                               │
│                  mongodb://localhost:27017/skillmitra               │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                       Collections:                            │  │
│  │                                                               │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │  users   │  │  offers  │  │ requests │  │ matches  │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  │                                                               │  │
│  │  ┌──────────┐                                                │  │
│  │  │ messages │                                                │  │
│  │  └──────────┘                                                │  │
│  │                                                               │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Example: User Login

```
1. USER enters email & password
   ↓
2. FRONTEND: Login.tsx calls authService.login()
   ↓
3. API CONFIG: axios sends POST /api/auth/login
   ↓
4. BACKEND: Route → Middleware (validation) → Controller
   ↓
5. CONTROLLER: Find user, verify password (bcrypt)
   ↓
6. MONGOOSE: Query users collection
   ↓
7. MONGODB: Returns user document
   ↓
8. CONTROLLER: Generate JWT token
   ↓
9. BACKEND: Send response { user, token }
   ↓
10. API CONFIG: Save token to localStorage
   ↓
11. FRONTEND: Redirect to Dashboard
   ↓
12. USER sees Dashboard
```

---

## Authentication Flow

```
┌──────────────┐
│   Register   │ → Hash password → Save to DB → Generate JWT
└──────────────┘

┌──────────────┐
│    Login     │ → Verify password → Generate JWT → Send to frontend
└──────────────┘

┌──────────────┐
│ API Request  │ → Extract JWT from header → Verify JWT → Attach user to req
└──────────────┘

┌──────────────┐
│   Logout     │ → Clear token from localStorage (frontend)
└──────────────┘
```

---

## API Request Flow (Protected Route)

```
Frontend
  ↓
  axios.get('/api/users/profile')
  ↓
  [Interceptor adds: Authorization: Bearer <token>]
  ↓
Backend
  ↓
  Route: /api/users/profile
  ↓
  Middleware: protect()
    • Extract token from Authorization header
    • Verify token with JWT_SECRET
    • Find user by decoded ID
    • Attach user to req.user
  ↓
  Controller: getProfile(req, res)
    • Access req.user (authenticated user)
    • Fetch data
    • Send response
  ↓
  Response sent to frontend
  ↓
  [Interceptor handles errors if any]
  ↓
Frontend receives data
```

---

## Database Collections Relationships

```
┌──────────────┐
│    users     │
└──────┬───────┘
       │ 1
       │
       │ N
┌──────▼───────┐     ┌──────────────┐
│   offers     │     │   requests   │
└──────┬───────┘     └──────┬───────┘
       │                    │
       │ referenced in      │ referenced in
       │                    │
       ▼                    ▼
┌─────────────────────────────┐
│          matches            │
│  (links user1 ↔ user2)      │
└─────────────────────────────┘

┌──────────────┐
│    users     │
└──────┬───────┘
       │
       │ sender/receiver
       │
       ▼
┌──────────────┐
│   messages   │
│ (conversation │
│  threading)   │
└──────────────┘
```

---

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│          PRESENTATION LAYER             │
│  React + TypeScript + Tailwind CSS      │
│  (User Interface)                       │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│          SERVICE LAYER                  │
│  Axios API Services                     │
│  (API Communication)                    │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│          APPLICATION LAYER              │
│  Express.js + Middleware                │
│  (Business Logic)                       │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│          DATA ACCESS LAYER              │
│  Mongoose ODM                           │
│  (Database Operations)                  │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│          DATABASE LAYER                 │
│  MongoDB                                │
│  (Data Storage)                         │
└─────────────────────────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────┐
│           FRONTEND                      │
│  • Input validation                     │
│  • XSS prevention (React escaping)      │
│  • Token storage (localStorage)         │
└───────────────┬─────────────────────────┘
                │
                │ HTTPS (in production)
                │
┌───────────────▼─────────────────────────┐
│           BACKEND                       │
│  • CORS configuration                   │
│  • Helmet (security headers)            │
│  • JWT token verification               │
│  • bcrypt password hashing              │
│  • express-validator (input sanitization)│
│  • Protected routes middleware          │
└───────────────┬─────────────────────────┘
                │
                │ Secure connection
                │
┌───────────────▼─────────────────────────┐
│           DATABASE                      │
│  • Mongoose schema validation           │
│  • Indexes for performance              │
│  • No SQL injection (Mongoose ORM)      │
└─────────────────────────────────────────┘
```

---

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────┐
│        Frontend (Vercel/Netlify)        │
│     https://skillmitra.vercel.app       │
└───────────────┬─────────────────────────┘
                │
                │ API Calls
                │
┌───────────────▼─────────────────────────┐
│      Backend (Railway/Render)           │
│     https://api.skillmitra.com          │
└───────────────┬─────────────────────────┘
                │
                │ Database Connection
                │
┌───────────────▼─────────────────────────┐
│      MongoDB Atlas (Cloud)              │
│   mongodb+srv://cluster.mongodb.net     │
└─────────────────────────────────────────┘
```

---

This architecture provides:
✅ **Separation of Concerns** - Clear layer boundaries
✅ **Scalability** - Can scale each layer independently
✅ **Security** - Multiple security layers
✅ **Maintainability** - Modular code structure
✅ **Testability** - Each layer can be tested independently
