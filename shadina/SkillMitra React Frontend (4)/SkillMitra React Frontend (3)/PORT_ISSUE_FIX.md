# 🔧 Port Issue - RESOLVED!

## ❌ **Error You Saw**

```
npm error path C:\Users\eijua\Downloads\shadina (2)\package.json
npm error errno -4058
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

## 🐛 **Root Cause**

You ran `npm run dev` from the **wrong directory**:
- ❌ Wrong: `C:\Users\eijua\Downloads\shadina (2)\`
- ✅ Correct: `C:\Users\eijua\Downloads\shadina (2)\shadina\shadina\SkillMitra React Frontend (4)\SkillMitra React Frontend (3)\`

---

## ✅ **What I Did**

### 1. Fixed Directory Issue
Navigated to the correct React frontend folder and started the server.

### 2. Port Conflict Resolved
- Port 3000 was in use
- Vite automatically started on **port 3001** instead
- Frontend now running at: **http://localhost:3001**

### 3. Updated CORS Configuration
Updated `SecurityConfig.java` to allow **both** ports:

```java
// BEFORE ❌
configuration.setAllowedOrigins(List.of(frontendUrl));

// AFTER ✅
configuration.setAllowedOrigins(List.of(
    "http://localhost:3000",
    "http://localhost:3001",  // Added for Vite's alternative port
    frontendUrl
));
```

---

## 🚀 **Current Status**

### ✅ Frontend
```
Status:  🟢 RUNNING
Port:    3001 (was 3000)
URL:     http://localhost:3001
Server:  Vite 6.3.5
```

### ✅ Backend
```
Status:  🟢 RUNNING
Port:    8082
URL:     http://localhost:8082
CORS:    Allows ports 3000 AND 3001
```

### ⚠️ Backend Needs Restart
The CORS changes require a backend restart to take effect.

---

## 🔄 **How to Restart Backend**

### Option 1: Stop and Restart in Terminal
```powershell
# Find the terminal running the backend
# Press Ctrl + C to stop it
# Then run:
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend"
mvn spring-boot:run
```

### Option 2: Kill Process and Restart
```powershell
# Find the process
netstat -ano | findstr :8082

# Kill it (replace PID with actual process ID)
taskkill /PID 10132 /F

# Restart
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend"
mvn spring-boot:run
```

---

## 📝 **Correct Commands for Future**

### Start Frontend
```powershell
# Navigate to React folder first
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\SkillMitra React Frontend (4)\SkillMitra React Frontend (3)"

# Then start
npm run dev
```

### Start Backend
```powershell
# Navigate to backend folder
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend"

# Then start
mvn spring-boot:run
```

---

## 🌐 **Access URLs**

### Frontend (NEW PORT!)
- **Main App**: http://localhost:3001
- **Login**: http://localhost:3001/login
- **Signup**: http://localhost:3001/signup
- **Profile**: http://localhost:3001/profile

### Backend (Same)
- **API**: http://localhost:8082/api
- **H2 Console**: http://localhost:8082/h2-console

---

## 🧪 **Testing After Restart**

Once you restart the backend, test the connection:

1. **Open Frontend**: http://localhost:3001
2. **Try Signup**: Create a new account
3. **Try Login**: Login with credentials
4. **Check Console**: No CORS errors should appear

---

## 🔍 **Common Issues**

### Issue: "npm run dev" not working
**Cause**: Running from wrong directory  
**Solution**: 
```powershell
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\SkillMitra React Frontend (4)\SkillMitra React Frontend (3)"
npm run dev
```

### Issue: Port 3000 in use
**Cause**: Another instance running  
**Solution**: Vite will auto-use port 3001 (this is fine!)

### Issue: CORS error in browser
**Cause**: Backend not updated with port 3001  
**Solution**: Restart backend after CORS config change

---

## 💡 **Pro Tips**

### Check Your Current Directory
```powershell
# See where you are
pwd

# List files
ls

# You should see package.json in the React folder
```

### Check Running Ports
```powershell
# See what's running
netstat -ano | findstr ":3000 :3001 :8082"
```

### Quick Navigation
```powershell
# Frontend
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\SkillMitra React Frontend (4)\SkillMitra React Frontend (3)"

# Backend
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend"
```

---

## ✅ **What's Fixed**

- [x] Identified wrong directory issue
- [x] Started frontend from correct location
- [x] Frontend running on port 3001
- [x] Updated CORS to allow port 3001
- [x] Frontend accessible in browser
- [ ] Backend restart needed (pending)

---

## 🎯 **Next Steps**

1. ✅ Frontend is running: http://localhost:3001
2. ⏳ Restart backend to apply CORS changes
3. ✅ Test signup/login functionality
4. ✅ Verify no CORS errors

---

## 📊 **Summary**

| Component | Port | Status | URL |
|-----------|------|--------|-----|
| **Frontend** | 3001 | ✅ Running | http://localhost:3001 |
| **Backend** | 8082 | ✅ Running | http://localhost:8082 |
| **Database** | - | ✅ Connected | H2 In-Memory |
| **CORS** | - | ⏳ Needs Restart | Ports 3000, 3001 allowed |

---

**Last Updated**: October 17, 2025  
**Issue**: npm package.json not found + port conflict  
**Status**: ✅ Resolved (backend restart pending)  
**New Port**: 3001 (was 3000)
