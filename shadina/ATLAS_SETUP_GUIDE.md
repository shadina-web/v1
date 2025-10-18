# 🎯 MongoDB Atlas Setup - Step by Step

## Follow These Steps:

### 1️⃣ Create MongoDB Atlas Account (2 minutes)
- Open: https://www.mongodb.com/cloud/atlas/register
- Click "Sign up" (use Google/GitHub for fastest signup)
- Verify your email if needed

### 2️⃣ Create a FREE Cluster (2 minutes)
- After login, click **"Build a Database"**
- Choose **"M0 FREE"** (no credit card required)
- Choose a cloud provider & region (any is fine)
- Cluster name: keep default or name it "SkillMitra"
- Click **"Create"** (takes 2-3 minutes to provision)

### 3️⃣ Create Database User (30 seconds)
- You'll see "Security Quickstart"
- Choose **"Username and Password"**
- Username: `skillmitra`
- Password: `skillmitra123` (or create your own - remember it!)
- Click **"Create User"**

### 4️⃣ Add Your IP Address (30 seconds)
- You'll see "Where would you like to connect from?"
- Click **"My Local Environment"**
- Click **"Add My Current IP Address"**
- OR click **"Add IP Address"** and enter `0.0.0.0/0` (allows from anywhere - good for development)
- Click **"Finish and Close"**

### 5️⃣ Get Connection String
- Click **"Database"** in left sidebar
- Click **"Connect"** button on your cluster
- Choose **"Drivers"**
- Select **"Node.js"** and latest version
- Copy the connection string (looks like this):

```
mongodb+srv://skillmitra:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6️⃣ Update Your Backend .env File

**IMPORTANT:** Replace `<password>` with your actual password!

If your password is `skillmitra123`, your connection string becomes:
```
mongodb+srv://skillmitra:skillmitra123@cluster0.xxxxx.mongodb.net/skillmitra?retryWrites=true&w=majority
```

---

## ✅ Once You Have Your Connection String:

### Update the .env file:

**File:** `skillmitra-backend-node/.env`

Replace this line:
```env
MONGODB_URI=mongodb://localhost:27017/skillmitra
```

With your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://skillmitra:skillmitra123@cluster0.xxxxx.mongodb.net/skillmitra?retryWrites=true&w=majority
```

### Then run the backend:
```powershell
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend-node"
npm run seed    # Populate database with sample data
npm run dev     # Start backend server
```

---

## 🎉 You'll Know It's Working When You See:

```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📂 Database: skillmitra
🚀 SkillMitra Backend Server Started!
📡 Server running on: http://localhost:5000
```

---

## 🆘 Need Help?

**Can't find the connection string?**
1. Go to https://cloud.mongodb.com
2. Click "Database" (left sidebar)
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the string

**Authentication failed?**
- Make sure you replaced `<password>` with your actual password
- No spaces or special characters that need encoding

**Network timeout?**
- Make sure you added `0.0.0.0/0` to IP whitelist
- Check your internet connection

---

## 📱 Quick Reference URLs:

- **MongoDB Atlas:** https://cloud.mongodb.com
- **Sign Up:** https://www.mongodb.com/cloud/atlas/register
- **Documentation:** https://docs.atlas.mongodb.com/getting-started/

---

**Ready? Let's set this up! Share your connection string once you have it, and I'll help you configure it!** 🚀
