# ⚠️ MongoDB Not Running

## The backend cannot connect to MongoDB. You have two options:

---

## Option 1: Install and Run MongoDB Locally (Recommended)

### Step 1: Install MongoDB

**Using Chocolatey (easiest):**
```powershell
# Open PowerShell as Administrator
choco install mongodb

# Or download manually from:
# https://www.mongodb.com/try/download/community
```

### Step 2: Create Data Directory
```powershell
mkdir C:\data\db
```

### Step 3: Start MongoDB
```powershell
# Open a NEW PowerShell window and run:
mongod --dbpath C:\data\db
```

Keep this window open! MongoDB will run here.

### Step 4: Restart Backend
```powershell
# In another PowerShell window:
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend-node"
npm run seed    # Populate database with sample data
npm run dev     # Start backend
```

---

## Option 2: Use MongoDB Atlas (Cloud - No Local Install)

### Step 1: Create Free MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 tier)
4. Create a database user with password
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string

### Step 2: Update Backend .env File

Edit: `skillmitra-backend-node/.env`

Replace:
```env
MONGODB_URI=mongodb://localhost:27017/skillmitra
```

With your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/skillmitra?retryWrites=true&w=majority
```

### Step 3: Restart Backend
```powershell
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend-node"
npm run seed    # Populate database
npm run dev     # Start backend
```

---

## Quick Check: Is MongoDB Installed?

```powershell
# Check if MongoDB is installed
mongod --version

# If you see version info, MongoDB is installed
# If you get an error, you need to install it
```

---

## After MongoDB is Running

You should see in the backend terminal:
```
✅ MongoDB Connected: localhost
📂 Database: skillmitra
🚀 SkillMitra Backend Server Started!
📡 Server running on: http://localhost:5000
```

Then you can run the frontend:
```powershell
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\SkillMitra React Frontend (4)\SkillMitra React Frontend (3)"
npm run dev
```

---

## Need Help?

Read the full guide in `QUICK_START.md`
