# 🎯 SkillMitra - Complete Integration Guide

A full-stack skill exchange platform built with **React** (Frontend), **Node.js + Express** (Backend), and **MongoDB** (Database).

---

## 🏗️ Project Structure

```
skillmitra/
├── SkillMitra React Frontend (3)/     # React Frontend
│   ├── src/
│   │   ├── components/                # Reusable components
│   │   ├── pages/                     # Page components
│   │   ├── services/                  # API service layer
│   │   ├── i18n/                      # Multilingual support
│   │   ├── lib/                       # Utilities
│   │   └── main.tsx                   # Entry point
│   ├── .env                           # Environment variables
│   └── package.json
│
├── skillmitra-backend-node/           # Node.js Backend
│   ├── src/
│   │   ├── models/                    # MongoDB schemas
│   │   ├── controllers/               # Request handlers
│   │   ├── routes/                    # API routes
│   │   ├── middleware/                # Auth & error handling
│   │   ├── config/                    # Database config
│   │   ├── scripts/                   # Seeding scripts
│   │   └── server.js                  # Entry point
│   ├── .env                           # Environment variables
│   └── package.json
│
└── skillmitra_database (1)/           # Database utilities
    └── migration scripts
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** >= 6.0 (running locally or cloud instance)

### 1. Install MongoDB

**Windows (Using Chocolatey):**
```powershell
choco install mongodb
```

**Or download from:** https://www.mongodb.com/try/download/community

**Start MongoDB:**
```powershell
mongod --dbpath C:\data\db
```

---

### 2. Backend Setup

```powershell
# Navigate to backend folder
cd "skillmitra-backend-node"

# Install dependencies
npm install

# Start MongoDB (if not running)
# In a separate terminal:
mongod

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

**Backend will run on:** `http://localhost:5000`

**API Health Check:** `http://localhost:5000/health`

---

### 3. Frontend Setup

```powershell
# Navigate to frontend folder
cd "SkillMitra React Frontend (3)"

# Install axios (if not already installed)
npm install axios

# Start the development server
npm run dev
```

**Frontend will run on:** `http://localhost:3000` (or auto-assigned port)

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-password` - Update password
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users` - Get all users (with filters)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update profile
- `GET /api/users/language-preference` - Get language
- `PUT /api/users/language-preference` - Update language
- `GET /api/users/stats` - Get user statistics

### Offers
- `GET /api/offers` - Get all offers (with filters)
- `GET /api/offers/:id` - Get offer by ID
- `POST /api/offers` - Create new offer
- `PUT /api/offers/:id` - Update offer
- `DELETE /api/offers/:id` - Delete offer
- `GET /api/offers/my/offers` - Get my offers
- `POST /api/offers/:id/interest` - Mark interest

### Requests
- `GET /api/requests` - Get all requests
- `GET /api/requests/:id` - Get request by ID
- `POST /api/requests` - Create new request
- `PUT /api/requests/:id` - Update request
- `DELETE /api/requests/:id` - Delete request
- `GET /api/requests/my/requests` - Get my requests
- `POST /api/requests/:id/respond` - Add response

### Matches
- `GET /api/matches` - Get my matches
- `GET /api/matches/:id` - Get match by ID
- `POST /api/matches` - Create match
- `PATCH /api/matches/:id/accept` - Accept match
- `PATCH /api/matches/:id/complete` - Complete match
- `POST /api/matches/:id/feedback` - Add feedback

### Messages
- `GET /api/messages/conversations` - Get all conversations
- `GET /api/messages/conversation/:userId` - Get conversation
- `POST /api/messages` - Send message
- `GET /api/messages/unread-count` - Get unread count
- `DELETE /api/messages/:id` - Delete message

---

## 🔑 Sample Login Credentials

After running `npm run seed`, use these credentials:

**User 1:**
- Email: `rajesh@example.com`
- Password: `password123`

**User 2:**
- Email: `priya@example.com`
- Password: `password123`

---

## 🌐 Environment Variables

### Backend (`.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skillmitra
JWT_SECRET=skillmitra-secret-key-2025-change-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=SkillMitra
VITE_APP_ENV=development
```

---

## 🔧 Frontend API Usage

### Example: Login

```typescript
import { authService } from '@/services';

const handleLogin = async () => {
  try {
    const response = await authService.login({
      email: 'rajesh@example.com',
      password: 'password123'
    });
    
    console.log('User:', response.data.user);
    console.log('Token:', response.data.token);
    
    // Token is automatically saved to localStorage
    // Redirect to dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};
```

### Example: Get Offers

```typescript
import { offerService } from '@/services';

const fetchOffers = async () => {
  try {
    const response = await offerService.getOffers({
      page: 1,
      limit: 12,
      category: 'Programming',
      search: 'React'
    });
    
    console.log('Offers:', response.data.offers);
    console.log('Total:', response.pagination.total);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### Example: Create Offer

```typescript
import { offerService } from '@/services';

const createNewOffer = async () => {
  try {
    const response = await offerService.createOffer({
      title: 'Learn React.js',
      description: 'Teaching React fundamentals...',
      category: 'Programming',
      skillsOffered: ['React', 'JavaScript'],
      skillsWanted: ['Photography'],
      mode: 'Both'
    });
    
    console.log('Created:', response.data.offer);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

---

## 🧪 Testing the Integration

### 1. Start Backend
```powershell
cd skillmitra-backend-node
npm run dev
```

### 2. Start Frontend
```powershell
cd "SkillMitra React Frontend (3)"
npm run dev
```

### 3. Test Flow

1. **Register** a new user at `/signup`
2. **Login** at `/login`
3. **Create** an offer at `/offers`
4. **View** offers on the dashboard
5. **Update** profile at `/profile`
6. **Switch** language using the globe icon

---

## 🗄️ Database Models

### User
- name, email, password (hashed)
- phone, location, bio, avatar
- skills[], interests[]
- preferredLanguage (en/hi/ml)
- rating, reviewCount, totalExchanges

### Offer
- title, description, category
- skillsOffered[], skillsWanted[]
- mode (Online/Offline/Both)
- availability, duration
- status (active/paused/completed)

### Request
- title, description, category
- skillsWanted[], skillsOffered[]
- urgency (Low/Medium/High)
- status (open/in-progress/completed)

### Match
- user1, user2
- offer, request
- status (pending/accepted/completed)
- feedback, sessions[]

### Message
- sender, receiver
- content, messageType
- isRead, readAt

---

## 🔒 Authentication Flow

1. User registers → Password hashed with bcrypt
2. User logs in → JWT token generated
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Backend middleware verifies token
6. User data attached to request

---

## 🌍 Multilingual Support

**Supported Languages:**
- 🇬🇧 English (en)
- 🇮🇳 Hindi (hi)
- 🇮🇳 Malayalam (ml)

**Change Language:**
```typescript
import { userService } from '@/services';

await userService.updateLanguagePreference('hi');
```

Language preference is:
- Stored in MongoDB
- Synced across devices
- Applied to all UI text

---

## 📝 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
```powershell
# Start MongoDB service
mongod --dbpath C:\data\db
```

### Issue: "CORS Error"
**Solution:** Ensure backend `.env` has correct `CLIENT_URL`
```env
CLIENT_URL=http://localhost:3000
```

### Issue: "axios not found"
**Solution:**
```powershell
cd "SkillMitra React Frontend (3)"
npm install axios
```

### Issue: "Unauthorized 401"
**Solution:** Check if token exists in localStorage. If not, login again.

---

## 📦 Deployment

### Backend (Node.js)
- Deploy to: **Heroku**, **Railway**, **Render**, **DigitalOcean**
- Update `MONGODB_URI` to cloud MongoDB (MongoDB Atlas)
- Set `NODE_ENV=production`

### Frontend (React)
- Deploy to: **Vercel**, **Netlify**, **Cloudflare Pages**
- Update `VITE_API_URL` to production backend URL
- Run `npm run build` to create production build

---

## 🎨 Tech Stack

**Frontend:**
- React 18.3.1
- TypeScript
- Vite 6.3.5
- Axios (API calls)
- i18next (Multilingual)
- Leaflet.js (Maps)
- Radix UI (Components)
- Tailwind CSS

**Backend:**
- Node.js 18+
- Express 4.18
- MongoDB 6+
- Mongoose 8
- JWT (Authentication)
- bcryptjs (Password hashing)
- express-validator (Validation)

---

## 👥 Contributors

SkillMitra Team

---

## 📄 License

MIT License

---

## 🆘 Support

For issues or questions:
1. Check this README
2. Review API documentation
3. Check browser console for errors
4. Check backend terminal for logs

**Happy Skill Exchanging! 🎓✨**
