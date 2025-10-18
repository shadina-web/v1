# 🚀 SkillMitra - Quick Start Guide

## Step 1: Start MongoDB

Open a **new PowerShell terminal** and run:

```powershell
# Start MongoDB server
mongod --dbpath C:\data\db
```

> **Note:** If the data directory doesn't exist, create it first:
> ```powershell
> mkdir C:\data\db
> ```

Keep this terminal running!

---

## Step 2: Start Backend Server

Open a **new PowerShell terminal** and run:

```powershell
# Navigate to backend folder
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend-node"

# Seed the database with sample data (only once)
npm run seed

# Start the backend server
npm run dev
```

You should see:
```
=================================================
🚀 SkillMitra Backend Server Started!
=================================================
📡 Server running on: http://localhost:5000
🌍 Environment: development
🎯 Client URL: http://localhost:3000
📊 Health check: http://localhost:5000/health
=================================================
```

Keep this terminal running!

---

## Step 3: Start Frontend

Open a **new PowerShell terminal** and run:

```powershell
# Navigate to frontend folder
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\SkillMitra React Frontend (4)\SkillMitra React Frontend (3)"

# Start the frontend
npm run dev
```

The React app will start at: **http://localhost:3000**

---

## Step 4: Test the Integration

1. **Open your browser** → `http://localhost:3000`

2. **Login with sample credentials:**
   - Email: `rajesh@example.com`
   - Password: `password123`

3. **Test features:**
   - View offers
   - Create new offer
   - Update profile
   - Switch language (globe icon)
   - Send messages

---

## 📋 Sample Users (from seeding)

| Name | Email | Password | Skills |
|------|-------|----------|--------|
| Rajesh Kumar | rajesh@example.com | password123 | JavaScript, React, Node.js |
| Priya Sharma | priya@example.com | password123 | Photography, Photo Editing |
| Arun Menon | arun@example.com | password123 | Guitar, Music Theory |
| Meera Das | meera@example.com | password123 | Yoga, Meditation, Fitness |
| Vikram Nair | vikram@example.com | password123 | Graphic Design, UI/UX |

---

## 🔍 Verify Everything is Working

### Check Backend Health
Open: http://localhost:5000/health

Should return:
```json
{
  "status": "success",
  "message": "SkillMitra API is running",
  "timestamp": "2025-10-17T...",
  "environment": "development"
}
```

### Check Frontend
Open: http://localhost:3000

Should load the SkillMitra homepage

### Check MongoDB Connection
In the backend terminal, you should see:
```
✅ MongoDB Connected: localhost
📂 Database: skillmitra
```

---

## ❌ Troubleshooting

### Problem: MongoDB won't start
**Solution:**
```powershell
# Make sure data directory exists
mkdir C:\data\db

# Try starting MongoDB again
mongod --dbpath C:\data\db
```

### Problem: Port 5000 already in use
**Solution:**
```powershell
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Or change port in backend/.env
PORT=5001
```

### Problem: Frontend can't connect to backend
**Solution:** Check `.env` file in frontend folder:
```env
VITE_API_URL=http://localhost:5000/api
```

### Problem: CORS errors
**Solution:** Check `CLIENT_URL` in backend `.env`:
```env
CLIENT_URL=http://localhost:3000
```

---

## 🎯 What's Next?

Now that everything is running, you can:

1. **Explore the API** using the services in `src/services/`
2. **Update pages** to connect to real backend
3. **Test authentication** flow
4. **Create offers and requests**
5. **Match with other users**
6. **Send messages**

---

## 📁 Terminal Summary

You should have **3 terminals running**:

1. **MongoDB** → `mongod --dbpath C:\data\db`
2. **Backend** → `npm run dev` (in skillmitra-backend-node)
3. **Frontend** → `npm run dev` (in SkillMitra React Frontend (3))

---

## 🛠️ Development Workflow

```powershell
# Terminal 1: MongoDB
mongod --dbpath C:\data\db

# Terminal 2: Backend
cd skillmitra-backend-node
npm run dev

# Terminal 3: Frontend
cd "SkillMitra React Frontend (3)"
npm run dev
```

**All set! Start building! 🎉**
