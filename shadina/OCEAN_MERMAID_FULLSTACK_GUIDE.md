# 🌊 Ocean Mermaid Theme - Full Stack Integration Guide

## ✅ System Status

### Frontend (React + Vite)
- **Status**: ✅ Running
- **Port**: 3000
- **URL**: http://localhost:3000
- **Theme**: Ocean Mermaid (Aqua, Turquoise, Teal, Sea Green, Coral, Lavender)
- **Framework**: React 18.3.1 + TypeScript + Vite 6.3.5

### Backend (Spring Boot)
- **Status**: ✅ Running
- **Port**: 8081
- **URL**: http://localhost:8081
- **Database**: H2 (In-Memory)
- **Framework**: Spring Boot 3.5.1 + Java 17

---

## 🎨 Ocean Mermaid Color Palette

### Primary Colors
- **Ocean Deep**: `#006B8F` - Deep ocean blue for primary actions
- **Ocean Medium**: `#0097B2` - Medium ocean blue
- **Ocean Bright**: `#00B4D8` - Bright ocean blue
- **Ocean Light**: `#90E0EF` - Light ocean for borders/highlights
- **Ocean Whisper**: `#CAF0F8` - Very light ocean for backgrounds

### Accent Colors
- **Aqua Vibrant**: `#06D6A0` - Vibrant aqua for success states
- **Turquoise Bright**: `#40E0D0` - Bright turquoise
- **Turquoise Calm**: `#48CAE4` - Calm turquoise
- **Teal Deep**: `#008080` - Deep teal
- **Teal Medium**: `#20B2AA` - Medium teal

### Sea Greens
- **Sea Green Vibrant**: `#3DDC84` - Vibrant sea green
- **Sea Green Soft**: `#7FDBBB` - Soft sea green
- **Sea Green Pastel**: `#B2F5D8` - Pastel sea green

### Magical Accents
- **Lavender Soft**: `#C5A3E0` - Soft lavender
- **Coral Pink**: `#FF9999` - Coral pink for highlights
- **Coral Soft**: `#FFCCCB` - Soft coral

### Dark Text (High Contrast)
- **Navy Deep**: `#001F3F` - Deep navy for headings
- **Charcoal Dark**: `#2C3E50` - Dark charcoal for body text
- **Slate Dark**: `#455A64` - Dark slate for secondary text

### Light Backgrounds
- **Pearl White**: `#F8FEFF` - Main page background
- **Shell Cream**: `#FFF9F5` - Card backgrounds
- **Mist Blue**: `#F0F9FF` - Subtle blue backgrounds

---

## 🔗 API Integration

### Environment Configuration
**File**: `.env`
```env
VITE_API_BASE_URL=http://localhost:8081/api
VITE_APP_ENV=development
```

### Current State
⚠️ **Frontend is using MOCK DATA**
- File: `src/lib/api.ts` contains mock implementations
- Ready for backend integration when needed

### Backend API Endpoints

#### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

#### Protected Endpoints (Require JWT)
```
GET  /api/users/profile
PUT  /api/users/profile
GET  /api/skills
POST /api/skills
GET  /api/jobs
POST /api/jobs
GET  /api/applications
POST /api/applications
```

---

## 🚀 Running the Full Stack

### Terminal 1: Frontend
```bash
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\SkillMitra React Frontend (4)\SkillMitra React Frontend (3)"
npm run dev
```
**Output**: Server running on http://localhost:3000

### Terminal 2: Backend  
```bash
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend"
mvn spring-boot:run
```
**Output**: Server running on http://localhost:8081

### ✅ Both Servers Currently Running!

---

## 🎨 Frontend Features (Ocean Mermaid Theme)

### Layout Component
**File**: `src/components/Layout.tsx`

**Theme Elements**:
- ✅ Pearl white page background
- ✅ Ocean gradient header (teal → deep ocean blue)
- ✅ Aqua gradient logo icon
- ✅ Shell cream dropdown menus
- ✅ Teal gradient user avatar
- ✅ Coral pink gradient Sign Up button
- ✅ Ocean gradient footer
- ✅ Dark navy/charcoal text throughout

**Features**:
- Multi-language support (English, Malayalam, Hindi)
- Responsive navigation
- User authentication state
- Protected routes

### Home Page
**File**: `src/pages/Home.tsx`

**Theme Elements**:
- ✅ Magical gradient hero section
- ✅ Ocean-themed feature cards
- ✅ Gradient stats section (ocean/aqua/teal/coral)
- ✅ Platform features with ocean gradients
- ✅ Coral gradient CTA section

**Sections**:
1. Hero with ocean gradient background
2. 3 feature cards (Offer Skills, Find Services, Build Reputation)
3. Stats section (5,000+ workers, 12,000+ services)
4. 6 platform feature cards
5. Call-to-action section

### Color System
**File**: `src/colors.css`

**Contains**:
- 50+ CSS custom properties for ocean colors
- 100+ utility classes (backgrounds, text, borders, shadows)
- Pre-built components:
  - `.btn-ocean-primary` - Ocean gradient primary button
  - `.btn-ocean-secondary` - Aqua gradient secondary button
  - `.btn-ocean-coral` - Coral gradient accent button
  - `.card-ocean` - Ocean-themed cards
  - `.badge-ocean-*` - Various badge styles
- 6 gradient definitions
- Shadow system (ocean-soft, ocean-medium, ocean-glow, ocean-large)

---

## 🔐 Authentication Flow

### Current State (Mock)
1. User enters phone number
2. Frontend validates
3. Mock login (no actual backend call)
4. Token stored in localStorage

### Ready for Integration
1. User submits login form
2. POST to `/api/auth/login` with credentials
3. Backend validates and returns JWT
4. Frontend stores JWT in localStorage
5. JWT sent in Authorization header for protected routes

**Example Integration**:
```typescript
// In src/lib/api.ts (when ready)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async login(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.user;
}
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

### Ocean Theme Responsiveness
- ✅ Mobile: Stacked cards, collapsed nav, full-width buttons
- ✅ Tablet: 2-column grids, visible nav
- ✅ Desktop: 3-column grids, centered nav with logo
- ✅ All gradients and colors scale beautifully

---

## 🗂️ Project Structure

```
shadina/
├── skillmitra-backend/                    # Spring Boot Backend
│   ├── src/main/java/com/skillmitra/
│   │   ├── controller/                    # REST Controllers
│   │   ├── model/                         # JPA Entities
│   │   ├── repository/                    # Data Repositories
│   │   ├── service/                       # Business Logic
│   │   ├── security/                      # JWT & Security
│   │   └── dto/                           # Data Transfer Objects
│   ├── src/main/resources/
│   │   └── application.properties         # Backend Config
│   └── pom.xml                            # Maven Dependencies
│
└── SkillMitra React Frontend (3)/         # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Layout.tsx                 # 🌊 Ocean Theme Layout
    │   │   ├── Sidebar.tsx
    │   │   └── ui/                        # Shadcn components
    │   ├── pages/
    │   │   ├── Home.tsx                   # 🌊 Ocean Theme Home
    │   │   ├── Login.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── Offers.tsx
    │   │   ├── Requests.tsx
    │   │   └── Profile.tsx
    │   ├── lib/
    │   │   ├── api.ts                     # API Layer (Mock)
    │   │   └── types.ts                   # TypeScript Types
    │   ├── utils/
    │   │   └── auth.ts                    # Auth Utilities
    │   ├── colors.css                     # 🌊 Ocean Color System
    │   └── index.css                      # Global Styles
    ├── .env                               # Environment Variables
    ├── package.json
    └── vite.config.ts
```

---

## 🎯 Ocean Theme Components

### Buttons
```tsx
<Button className="btn-ocean-primary">Ocean Primary</Button>
<Button className="btn-ocean-secondary">Ocean Secondary</Button>
<Button className="btn-ocean-coral">Coral Accent</Button>
<Button className="btn-ocean-outline">Ocean Outline</Button>
```

### Cards
```tsx
<Card className="card-ocean">Ocean Card</Card>
<Card className="card-ocean-gradient">Gradient Card</Card>
<Card className="card-ocean-pearl">Pearl Card</Card>
```

### Badges
```tsx
<Badge className="badge-ocean-success">Success</Badge>
<Badge className="badge-ocean-warning">Warning</Badge>
<Badge className="badge-ocean-info">Info</Badge>
```

### Text Colors
```tsx
<h1 className="text-navy-deep">Navy Heading</h1>
<p className="text-charcoal-dark">Charcoal Body</p>
<span className="text-ocean-deep">Ocean Link</span>
```

### Backgrounds
```tsx
<div className="bg-pearl-white">Pearl Background</div>
<div className="bg-shell-cream">Shell Cream Background</div>
<div className="bg-gradient-ocean">Ocean Gradient</div>
<div className="bg-gradient-magical">Magical Gradient</div>
```

---

## 🔧 Configuration Files

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:8081/api
VITE_APP_ENV=development
```

### Backend `application.properties`
```properties
server.port=8081
frontend.url=http://localhost:3000
jwt.secret=ChangeThisSecretInProductionToAStrongRandomValue
jwt.expiration-ms=86400000
```

---

## 🐛 Troubleshooting

### Frontend Issues

**Issue**: Colors not showing
- ✅ Check `colors.css` is imported in `index.css`
- ✅ Verify Tailwind config includes custom colors
- ✅ Clear browser cache

**Issue**: API calls failing
- ✅ Check backend is running on port 8081
- ✅ Verify CORS configuration in `SecurityConfig.java`
- ✅ Check `.env` file has correct API URL

### Backend Issues

**Issue**: Port 8081 already in use
- Stop other Java processes: `taskkill /F /IM java.exe`
- Or change port in `application.properties`

**Issue**: Database errors
- H2 database is in-memory, data resets on restart
- Check H2 console at http://localhost:8081/h2-console

---

## 📊 Current Features

### ✅ Implemented (Frontend)
- Ocean Mermaid themed Layout
- Ocean Mermaid themed Home page
- Authentication UI (Login/Signup)
- Mock data for Offers/Requests
- Responsive design
- Multi-language support
- Dark text on light backgrounds (accessibility)

### ✅ Implemented (Backend)
- User registration/login
- JWT authentication
- CORS configuration
- H2 database
- Skills management
- Jobs/Applications
- RESTful API

### 🔄 Pending Integration
- Connect frontend API calls to real backend
- File upload for profile pictures
- Real-time messaging
- Payment gateway
- Reviews/Ratings system

---

## 🚀 Next Steps

### To Connect Frontend to Backend:

1. **Update** `src/lib/api.ts` to use real API endpoints
2. **Add** Authorization headers with JWT tokens
3. **Test** authentication flow end-to-end
4. **Implement** error handling and loading states
5. **Add** toast notifications for API responses

### Example Code:
```typescript
// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const api = {
  async getOffers(): Promise<Offer[]> {
    const response = await fetch(`${API_BASE_URL}/offers`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }
};
```

---

## 📝 Documentation Links

- **Frontend Docs**: `README.md`
- **Backend Docs**: `OCEAN_THEME_BACKEND_CONFIG.md`
- **Color System**: `colors.css` (inline documentation)
- **API Types**: `src/lib/types.ts`

---

**Status**: ✅ Full stack running with Ocean Mermaid theme
**Last Updated**: October 16, 2025
**Theme**: Calm, Fresh, Magical Underwater Aesthetic 🌊✨
