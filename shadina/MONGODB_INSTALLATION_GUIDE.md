# 🔧 MongoDB Setup - Complete Guide

## ⚠️ You Need MongoDB to Run the Backend

The error means MongoDB is not installed. Here are your options:

---

## ☁️ **OPTION 1: MongoDB Atlas (RECOMMENDED - No Installation)**

### ✅ Advantages:
- ✅ **No installation required**
- ✅ **Free forever** (512 MB storage)
- ✅ **Works from anywhere**
- ✅ **5-minute setup**
- ✅ **No local setup needed**

### 📋 Step-by-Step Setup:

#### 1. Create Account
- Go to: https://www.mongodb.com/cloud/atlas/register
- Sign up (use Google/GitHub for faster signup)

#### 2. Create Free Cluster
- Click **"Build a Database"**
- Choose **"M0 (Free)"** tier
- Select your region (closest to you)
- Click **"Create Cluster"** (takes 3-5 minutes)

#### 3. Create Database User
- Click **"Database Access"** (left sidebar)
- Click **"Add New Database User"**
- Authentication Method: **Password**
- Username: `skillmitra`
- Password: `skillmitra123` (or your choice - remember this!)
- Database User Privileges: **Read and write to any database**
- Click **"Add User"**

#### 4. Whitelist IP Address
- Click **"Network Access"** (left sidebar)
- Click **"Add IP Address"**
- Click **"Allow Access from Anywhere"**
  - This adds `0.0.0.0/0` (for development)
- Click **"Confirm"**

#### 5. Get Connection String
- Click **"Database"** (left sidebar)
- Click **"Connect"** on your cluster
- Choose **"Connect your application"**
- Copy the connection string (looks like):

```
mongodb+srv://skillmitra:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### 6. Update Your `.env` File

**File:** `skillmitra-backend-node/.env`

Replace this line:
```env
MONGODB_URI=mongodb://localhost:27017/skillmitra
```

With your Atlas connection string (replace `<password>` with your actual password):
```env
MONGODB_URI=mongodb+srv://skillmitra:skillmitra123@cluster0.xxxxx.mongodb.net/skillmitra?retryWrites=true&w=majority
```

#### 7. Restart Backend
```powershell
cd "skillmitra-backend-node"
npm run seed    # Populate database with sample data
npm run dev     # Start backend
```

✅ **Done! Your backend will now connect to MongoDB Atlas!**

---

## 💻 **OPTION 2: Install MongoDB Locally**

### Method A: Using Chocolatey (Package Manager)

**Step 1: Install Chocolatey** (if not installed)
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

**Step 2: Install MongoDB**
```powershell
# Run PowerShell as Administrator
choco install mongodb
```

**Step 3: Create Data Directory**
```powershell
mkdir C:\data\db
```

**Step 4: Start MongoDB**
```powershell
# Open a NEW PowerShell window (keep it open)
mongod --dbpath C:\data\db
```

**Step 5: Restart Backend**
```powershell
# In another PowerShell window
cd "skillmitra-backend-node"
npm run seed
npm run dev
```

---

### Method B: Manual Installation

**Step 1: Download MongoDB**
- Go to: https://www.mongodb.com/try/download/community
- Choose: **Windows x64**
- Download and run the installer

**Step 2: Install MongoDB**
- Run the `.msi` installer
- Choose **"Complete"** installation
- Install **MongoDB Compass** (optional GUI tool)

**Step 3: Add MongoDB to PATH** (if not done automatically)
```powershell
# Add to system PATH:
C:\Program Files\MongoDB\Server\7.0\bin
```

**Step 4: Create Data Directory**
```powershell
mkdir C:\data\db
```

**Step 5: Start MongoDB**
```powershell
# Open a NEW PowerShell window (keep it open)
mongod --dbpath C:\data\db
```

**Step 6: Restart Backend**
```powershell
# In another PowerShell window
cd "skillmitra-backend-node"
npm run seed
npm run dev
```

---

## 🎯 **Which Option Should I Choose?**

| Feature | Atlas (Cloud) | Local Install |
|---------|--------------|---------------|
| Setup Time | 5 minutes | 15-30 minutes |
| Installation | None | Required |
| Internet Required | Yes | No |
| Storage | 512 MB free | Unlimited |
| Best For | Quick start, Testing | Production, Large data |

**Recommendation:** Use **MongoDB Atlas** for now. It's the fastest way to get started!

---

## ✅ **Verify It's Working**

After setting up MongoDB (either option), you should see:

**In Backend Terminal:**
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net  (or localhost)
📂 Database: skillmitra
🚀 SkillMitra Backend Server Started!
📡 Server running on: http://localhost:5000
```

**Test Health Check:**
Open in browser: http://localhost:5000/health

Should return:
```json
{
  "status": "success",
  "message": "SkillMitra API is running"
}
```

---

## 🆘 **Still Having Issues?**

### Common Problems:

**Problem 1: "ECONNREFUSED"**
- **Atlas:** Check connection string is correct
- **Local:** Make sure `mongod` is running in another terminal

**Problem 2: "Authentication failed"**
- **Atlas:** Check username and password in connection string
- Create database user again if needed

**Problem 3: "Network timeout"**
- **Atlas:** Check IP whitelist (add 0.0.0.0/0)
- Check your internet connection

---

## 📞 **Need Help?**

1. Try **MongoDB Atlas first** (easiest option)
2. Read the error messages carefully
3. Check the backend terminal for detailed logs
4. Verify your connection string is correct

---

## 🚀 **Next Steps After MongoDB is Running**

1. **Seed the database:**
   ```powershell
   cd skillmitra-backend-node
   npm run seed
   ```

2. **Start backend:**
   ```powershell
   npm run dev
   ```

3. **Start frontend:**
   ```powershell
   cd "SkillMitra React Frontend (3)"
   npm run dev
   ```

4. **Login with sample credentials:**
   - Email: `rajesh@example.com`
   - Password: `password123`

---

**Let's get you up and running! 🎉**
