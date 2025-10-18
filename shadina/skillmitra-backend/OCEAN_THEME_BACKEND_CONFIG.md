# 🌊 Ocean Mermaid Theme - Backend Configuration

## ✅ Backend Status: RUNNING

### Server Details
- **Framework**: Spring Boot 3.5.1
- **Java Version**: 17.0.16
- **Server Port**: 8081
- **Database**: H2 (In-Memory) - `jdbc:h2:mem:skillmitra`
- **H2 Console**: http://localhost:8081/h2-console
- **Base URL**: http://localhost:8081

---

## 🔐 Security Configuration

### CORS Setup
The backend is configured to accept requests from the ocean mermaid themed frontend:

**Allowed Origin**: `http://localhost:3000` (configured in `application.properties`)

**CORS Settings**:
- ✅ Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
- ✅ Allowed Headers: All (*)
- ✅ Credentials: Enabled
- ✅ Configuration Path: `/**` (all endpoints)

**File**: `src/main/java/com/skillmitra/security/SecurityConfig.java`

---

## 🗄️ Database Schema

### Tables Created:
1. **users**
   - Fields: id, email, name, password, phone, role
   - Unique constraints on: email, phone

2. **skills**
   - Fields: id, skill_name, description
   - Unique constraint on: skill_name

3. **jobs**
   - Fields: id, title, description, location, posted_by_id, skill_id
   - Foreign keys to: users, skills

4. **applications**
   - Fields: id, status, job_id, user_id
   - Foreign keys to: jobs, users

---

## 🔑 API Endpoints

### Authentication (Public)
- **POST** `/api/auth/register` - User registration
- **POST** `/api/auth/login` - User login (returns JWT token)

### Protected Endpoints (Require JWT)
All other endpoints require authentication via JWT token in the Authorization header.

### JWT Configuration
- **Secret**: Configured in `application.properties` (should be changed in production)
- **Expiration**: 86400000ms (24 hours)
- **Header Format**: `Authorization: Bearer <token>`

---

## 🎨 Frontend Integration

### Current Integration Points:
1. **Authentication Flow**:
   - Frontend sends login/register requests to `/api/auth/*`
   - Backend returns JWT token
   - Frontend stores token and uses for subsequent requests

2. **CORS Handling**:
   - Backend allows all requests from `http://localhost:3000`
   - Ocean mermaid themed frontend can make API calls without CORS issues

3. **API Base URL**:
   - Frontend should use: `http://localhost:8081/api`

---

## 🚀 Running the Backend

### Start Command:
```bash
cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend"
mvn spring-boot:run
```

### Current Status:
✅ **Server Running** on port 8081
✅ **Database Initialized** with schema
✅ **CORS Configured** for frontend (port 3000)
✅ **JWT Security** enabled
✅ **H2 Console** available
✅ **Live Reload** active on port 35729

---

## 📦 Dependencies

### Core:
- Spring Boot Web
- Spring Data JPA
- Spring Security
- JWT (jjwt 0.11.5)
- H2 Database
- Validation
- DevTools

### Build Tool:
- Maven 3.x
- Java 17

---

## 🌊 Ocean Theme Compatibility

The backend is **fully compatible** with the ocean mermaid themed frontend:

### ✅ Frontend Requirements Met:
1. **Authentication**: JWT-based auth supports Login/Signup pages
2. **User Management**: User profiles with name, email, phone
3. **Skills System**: Skills catalog for offers/requests
4. **Job Postings**: Job/service listings
5. **Applications**: Application tracking system

### 🎨 Theme-Agnostic:
The backend is UI-agnostic and works seamlessly with:
- ✅ Ocean Mermaid theme (current)
- ✅ Any future theme updates
- ✅ Mobile apps
- ✅ Third-party integrations

---

## 🔧 Configuration Files

### Main Configuration:
**File**: `src/main/resources/application.properties`

```properties
# Database
spring.datasource.url=jdbc:h2:mem:skillmitra
spring.datasource.username=sa
spring.datasource.password=

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.h2.console.enabled=true

# Server
server.port=8081

# JWT
jwt.secret=ChangeThisSecretInProductionToAStrongRandomValue
jwt.expiration-ms=86400000

# CORS
frontend.url=http://localhost:3000
```

---

## 📊 Current Data

### Initial Data Loaded:
- ✅ 3 Skills pre-loaded via DataLoader
- ✅ 1+ Test users created

### Access H2 Console:
1. Navigate to: http://localhost:8081/h2-console
2. JDBC URL: `jdbc:h2:mem:skillmitra`
3. Username: `sa`
4. Password: (empty)

---

## 🎯 Next Steps

### Optional Enhancements:
1. **Add Profile Pictures**: Support image uploads for user avatars
2. **Reviews System**: Add ratings/reviews for services
3. **Messaging**: Real-time chat between users
4. **Notifications**: Email/SMS notifications
5. **Payment Gateway**: Integration with payment services
6. **Location Services**: GPS-based matching
7. **Advanced Search**: Filters by skills, location, ratings

### Production Checklist:
- [ ] Change JWT secret to strong random value
- [ ] Replace H2 with MySQL/PostgreSQL
- [ ] Add proper logging
- [ ] Implement rate limiting
- [ ] Add API documentation (Swagger)
- [ ] Set up CI/CD pipeline
- [ ] Configure SSL/HTTPS
- [ ] Add monitoring (Prometheus/Grafana)

---

## 📝 Notes

- Backend is stateless (uses JWT, no sessions)
- All passwords are encrypted with BCrypt
- Database schema auto-updates on restart (development mode)
- DevTools enabled for hot reload during development
- CORS is permissive (development mode) - restrict in production

---

**Status**: ✅ Backend fully operational and integrated with Ocean Mermaid frontend
**Last Updated**: October 16, 2025
