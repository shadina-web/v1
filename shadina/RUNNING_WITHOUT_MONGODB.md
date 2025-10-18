# SkillMitra Running Without MongoDB

✅ **Success!** Your application is now running using the Java Spring Boot backend with H2 in-memory database instead of MongoDB.

## 🚀 What's Running

### Backend: Java Spring Boot + H2 Database
- **URL**: http://localhost:8082
- **Technology**: Java 17, Spring Boot 3.5.1, H2 in-memory database
- **Status**: ✅ Running
- **Database**: H2 (in-memory, no installation required)
- **H2 Console**: http://localhost:8082/h2-console
  - JDBC URL: `jdbc:h2:mem:skillmitra`
  - Username: `sa`
  - Password: (empty)

### Frontend: React + Vite
- **URL**: http://localhost:3000
- **Technology**: React 18.3.1, TypeScript, Vite 6.3.5
- **Status**: ✅ Running
- **API Endpoint**: http://localhost:8082/api

## 📊 Database Schema (H2)

The following tables have been created automatically:
- **users** - User accounts with authentication
- **skills** - Skill listings
- **jobs** - Job/opportunity postings
- **applications** - Applications to jobs

## 🔌 Available API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890",
    "role": "USER"
  }
  ```

- `POST /api/auth/login` - Login and get JWT token
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Controllers Available
- **AuthController** - `/api/auth/*` - Registration, Login
- **UserController** - `/api/users/*` - User management
- **SkillController** - `/api/skills/*` - Skills CRUD
- **JobController** - `/api/jobs/*` - Jobs CRUD
- **ApplicationController** - `/api/applications/*` - Applications management

## 🧪 How to Test

### 1. Open the Frontend
Navigate to: http://localhost:3000

### 2. Check H2 Database Console
1. Go to: http://localhost:8082/h2-console
2. Use these credentials:
   - JDBC URL: `jdbc:h2:mem:skillmitra`
   - Username: `sa`
   - Password: (leave empty)
3. Click "Connect"
4. Browse tables and data

### 3. Test API Endpoints

**Using curl (PowerShell):**
```powershell
# Register a new user
curl -X POST http://localhost:8082/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\",\"phone\":\"+1234567890\",\"role\":\"USER\"}'

# Login
curl -X POST http://localhost:8082/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"test@example.com\",\"password\":\"password123\"}'
```

**Using Browser DevTools:**
1. Open http://localhost:3000
2. Open Browser Console (F12)
3. Try to register/login through the UI
4. Check console logs for API calls (they show 🌐 for requests and ✅ for responses)

## 📂 Project Files

### Backend Configuration
- **Main Application**: `skillmitra-backend/src/main/java/com/skillmitra/SkillmitraBackendApplication.java`
- **Application Properties**: `skillmitra-backend/src/main/resources/application.properties`
- **Controllers**: `skillmitra-backend/src/main/java/com/skillmitra/controller/`
- **Models**: `skillmitra-backend/src/main/java/com/skillmitra/model/`

### Frontend Configuration
- **Environment Config**: `SkillMitra React Frontend (3)/.env`
- **API Service**: `src/services/api.config.ts`
- **Pages**: `src/pages/`

## 🔄 Switching Between Databases

### Currently Using: H2 (In-Memory)
- ✅ No installation required
- ✅ Auto-starts with Spring Boot
- ⚠️ Data is lost when server stops (in-memory)

### To Use MongoDB (Node.js Backend)
1. Stop Java backend (Ctrl+C in terminal)
2. Setup MongoDB Atlas (see `ATLAS_SETUP_GUIDE.md`)
3. Update `skillmitra-backend-node/.env` with MongoDB connection string
4. Run Node.js backend: `npm run dev`
5. Update React `.env` to point to port 5000

### To Use MySQL (Production)
1. Install MySQL database
2. Create database: `skillmitra_db`
3. Update `skillmitra-backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/skillmitra_db
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```
4. Restart Spring Boot backend

## 🐛 Troubleshooting

### Backend won't start
- **Port 8082 in use**: Change port in terminal: `$env:SERVER_PORT=8083 ; mvn spring-boot:run`
- **Java not found**: Install Java 17 or higher
- **Maven errors**: Run `mvn clean install` first

### Frontend can't connect to backend
- Check `.env` file has: `VITE_API_URL=http://localhost:8082/api`
- Restart frontend: Stop (Ctrl+C) and run `npm run dev` again
- Check browser console for CORS errors (backend has CORS enabled for localhost:3000)

### H2 Console won't connect
- Make sure backend is running (check terminal for "Tomcat started on port 8082")
- Use exact JDBC URL: `jdbc:h2:mem:skillmitra`
- Leave password empty

## 📝 Next Steps

1. ✅ **Test the UI** - Open http://localhost:3000 and explore
2. ✅ **Register a User** - Create an account through the UI
3. ✅ **Login** - Test authentication
4. ✅ **Browse H2 Console** - View database tables and data
5. 🔄 **Add Sample Data** - Use H2 console to insert test data
6. 🔄 **Test All Features** - Try creating skills, jobs, applications

## 🎯 Current Status

| Component | Status | URL |
|-----------|--------|-----|
| Java Backend (H2) | ✅ Running | http://localhost:8082 |
| React Frontend | ✅ Running | http://localhost:3000 |
| H2 Database Console | ✅ Available | http://localhost:8082/h2-console |
| MongoDB (Node.js) | ⏸️ Not running | (Not needed currently) |

---

**🎉 Congratulations!** Your application is running without MongoDB using the Java Spring Boot backend with H2 database!
