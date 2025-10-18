# SkillMitra Backend - Node.js + Express + MongoDB

Complete REST API for the SkillMitra skill exchange platform.

## 🚀 Quick Start

```powershell
# Install dependencies
npm install

# Start MongoDB (in separate terminal)
mongod --dbpath C:\data\db

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

Server runs on: **http://localhost:5000**

## 📡 API Documentation

### Health Check
```
GET /health
```

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/update-password` - Update password (Protected)
- `POST /api/auth/logout` - Logout (Protected)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update profile (Protected)
- `GET /api/users/language-preference` - Get language (Protected)
- `PUT /api/users/language-preference` - Update language (Protected)

### Offers
- `GET /api/offers` - Get all offers
- `GET /api/offers/:id` - Get offer by ID
- `POST /api/offers` - Create offer (Protected)
- `PUT /api/offers/:id` - Update offer (Protected)
- `DELETE /api/offers/:id` - Delete offer (Protected)
- `GET /api/offers/my/offers` - Get my offers (Protected)
- `POST /api/offers/:id/interest` - Mark interest (Protected)

### Requests
- `GET /api/requests` - Get all requests
- `GET /api/requests/:id` - Get request by ID
- `POST /api/requests` - Create request (Protected)
- `PUT /api/requests/:id` - Update request (Protected)
- `DELETE /api/requests/:id` - Delete request (Protected)
- `GET /api/requests/my/requests` - Get my requests (Protected)
- `POST /api/requests/:id/respond` - Add response (Protected)

### Matches
- `GET /api/matches` - Get my matches (Protected)
- `GET /api/matches/:id` - Get match by ID (Protected)
- `POST /api/matches` - Create match (Protected)
- `PATCH /api/matches/:id/accept` - Accept match (Protected)
- `PATCH /api/matches/:id/complete` - Complete match (Protected)
- `POST /api/matches/:id/feedback` - Add feedback (Protected)

### Messages
- `GET /api/messages/conversations` - Get conversations (Protected)
- `GET /api/messages/conversation/:userId` - Get conversation (Protected)
- `POST /api/messages` - Send message (Protected)
- `GET /api/messages/unread-count` - Get unread count (Protected)

## 🗄️ Database Models

### User
- Authentication (email, password)
- Profile (name, bio, avatar, location)
- Skills & Interests
- Language preference (en/hi/ml)
- Statistics (rating, reviews, exchanges)

### Offer
- Title, description, category
- Skills offered/wanted
- Mode (Online/Offline/Both)
- Availability & duration
- Status management

### Request
- Title, description, category
- Skills wanted/offered
- Urgency level
- Status tracking
- Responses

### Match
- User pairing
- Associated offer/request
- Status workflow
- Feedback system
- Session tracking

### Message
- Sender/receiver
- Content & attachments
- Read status
- Conversation threading

## 🔒 Authentication

Uses JWT (JSON Web Tokens) for authentication.

**Headers for protected routes:**
```
Authorization: Bearer <token>
```

**Token stored in localStorage after login/register**

## 🌐 Environment Variables

Create `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/skillmitra
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

## 📦 Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Validation
- **cors** - CORS handling
- **helmet** - Security
- **morgan** - Logging

## 🧪 Sample Data

Run `npm run seed` to populate database with:
- 5 sample users
- 3 skill offers
- 2 skill requests

**Sample login:**
- Email: rajesh@example.com
- Password: password123

## 📁 Project Structure

```
src/
├── models/          # MongoDB schemas
├── controllers/     # Request handlers
├── routes/          # API routes
├── middleware/      # Auth & validation
├── config/          # Database config
├── scripts/         # Utilities & seeding
└── server.js        # Entry point
```

## 🛠️ Development

```powershell
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Seed database
npm run seed
```

## 📝 API Response Format

**Success:**
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "status": "error",
  "message": "Error description"
}
```

## 🔍 Error Handling

- **400** - Bad Request (validation errors)
- **401** - Unauthorized (invalid/missing token)
- **403** - Forbidden (no permission)
- **404** - Not Found
- **500** - Server Error

## 👥 Team

SkillMitra Development Team

## 📄 License

MIT
