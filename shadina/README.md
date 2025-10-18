# SkillMitra - Rural Skills Exchange Platform

A comprehensive web platform connecting rural workers with service seekers, enabling skill exchange and employment opportunities.

## 🚀 Tech Stack

### Backend
- **Spring Boot 3.5.1** (Java 17)
- **H2 Database** (File-based, persistent)
- **Spring Security** with JWT authentication
- **Maven** for dependency management
- **Port**: 8082

### Frontend
- **React 18** with TypeScript
- **Vite 6.3.5** (Build tool)
- **Tailwind CSS** with Ocean Mermaid theme
- **React Router** for navigation
- **Shadcn UI** components
- **Port**: 3000

## 📋 Prerequisites

- **Java JDK 17** or higher
- **Maven 3.6+**
- **Node.js 18+** and npm
- **Git**

## ⚡ Quick Start

### 1. Clone the Repository
```powershell
git clone https://github.com/shadina-web/v1.git
cd v1/shadina
```

### 2. Start Backend (Terminal 1)
```powershell
cd skillmitra-backend
mvn spring-boot:run
```
✅ Backend runs on: **http://localhost:8082**

### 3. Start Frontend (Terminal 2)
```powershell
cd "SkillMitra React Frontend (4)/SkillMitra React Frontend (3)"
npm install
npm run dev
```
✅ Frontend runs on: **http://localhost:3000**

### 4. Access Application
Open **http://localhost:3000** in your browser

## 👤 Test Credentials

### Pre-loaded Users:

**Admin/Employer:**
- Email: `admin@skillmitra.com`
- Password: `admin123`
- Role: EMPLOYER

**Worker:**
- Email: `saniya@gmail.com`
- Password: `saniya123`
- Role: WORKER
- Skills: Plumbing, Electrical Work, Carpentry

## 🎯 Key Features

### ✨ User Features
- **Authentication** - Secure login/signup with JWT
- **Profile Management** - Update bio, skills, location, avatar
- **Multilingual** - Support for English, Hindi, Malayalam
- **Reviews & Ratings** - Star ratings and detailed reviews
- **Real-time Messaging** - Chat with other users
- **Smart Matching** - AI-powered skill matching

### 🔧 Worker Features
- **Skill Profiles** - Showcase multiple skills
- **Service Offers** - Create and manage service offerings
- **Availability Management** - Set working hours and days off
- **Job Applications** - Apply to service requests
- **Earnings Dashboard** - Track income and statistics

### 👥 Employer Features
- **Service Requests** - Post service requirements
- **Worker Discovery** - Browse and filter workers by skills
- **Booking System** - Schedule appointments
- **Payment Gateway** - Secure payment processing
- **Review Workers** - Rate and review completed services

## 📁 Project Structure

```
shadina/
├── skillmitra-backend/              # Spring Boot backend
│   ├── src/main/java/com/skillmitra/
│   │   ├── controller/              # REST API endpoints
│   │   ├── model/                   # JPA entities
│   │   ├── repository/              # Data access layer
│   │   ├── service/                 # Business logic
│   │   ├── security/                # JWT & auth config
│   │   └── dto/                     # Data transfer objects
│   ├── data/                        # H2 database files
│   └── pom.xml                      # Maven dependencies
│
├── SkillMitra React Frontend (4)/
│   └── SkillMitra React Frontend (3)/  # React app
│       ├── src/
│       │   ├── pages/               # Route pages
│       │   ├── components/          # Reusable components
│       │   ├── services/            # API clients
│       │   ├── i18n/                # Translations
│       │   └── utils/               # Helper functions
│       └── package.json             # npm dependencies
│
├── ARCHITECTURE.md                  # System architecture
├── QUICK_START.md                   # Getting started guide
└── README.md                        # This file
```

## 🛠️ Development

### Backend Commands
```powershell
# Build project
mvn clean install

# Run with hot reload
mvn spring-boot:run

# Run tests
mvn test

# Package as JAR
mvn package
```

### Frontend Commands
```powershell
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile` - Update profile (Protected)

### Workers
- `GET /api/workers` - Get all workers (Public)
- `GET /api/workers/{id}` - Get worker by ID (Public)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (Admin)

### Jobs/Offers
- `GET /api/offers` - Get all offers (Public)
- `POST /api/jobs` - Create job (Protected)
- `GET /api/jobs/{id}` - Get job details

## 🗄️ Database

### H2 Database Console
Access at: **http://localhost:8082/h2-console**

**Connection Settings:**
- JDBC URL: `jdbc:h2:file:./data/skillmitra`
- Username: `sa`
- Password: _(leave blank)_

### Pre-loaded Data
The database includes:
- 3 sample skills (Plumbing, Electrical Work, Carpentry)
- 2 test users (1 admin, 1 worker)
- Worker-skill associations

## 🎨 UI Theme

**Ocean Mermaid Theme** - A vibrant, professional design with:
- Ocean blue gradients
- Coral pink accents
- Turquoise highlights
- Navy deep tones
- Responsive and mobile-friendly

## 🌐 Multilingual Support

Supported languages:
- 🇬🇧 English (en)
- 🇮🇳 Hindi (hi)
- 🇮🇳 Malayalam (ml)

Switch languages using the language selector in the navigation bar.

## 🔒 Security

- JWT token-based authentication
- Password hashing with BCrypt
- CORS configuration for frontend-backend communication
- Protected routes requiring authentication
- Public browsing for offers and worker profiles

## 📱 Pages

- **Home** - Landing page with features
- **Login/Signup** - Authentication pages
- **Dashboard** - User statistics and activity
- **Profile** - User profile management
- **Offers** - Browse service offerings
- **Requests** - View service requests
- **Reviews** - Ratings and reviews system
- **Messages** - Real-time chat
- **Booking** - Appointment scheduling
- **Payment** - Payment gateway
- **Matching** - Smart skill matching

## 🚧 Troubleshooting

### Backend Issues
**Port 8082 already in use:**
```powershell
# Find process using port 8082
netstat -ano | findstr :8082
# Kill the process (replace PID)
Stop-Process -Id <PID> -Force
```

**Database not persisting:**
- Check `data/skillmitra.mv.db` file exists
- Ensure `spring.datasource.url` uses `jdbc:h2:file:./data/skillmitra`

### Frontend Issues
**Port 3000 already in use:**
```powershell
# Frontend will auto-switch to port 3001
# Or kill process on 3000
netstat -ano | findstr :3000
Stop-Process -Id <PID> -Force
```

**CORS errors:**
- Ensure backend is running on port 8082
- Check CORS configuration in `SecurityConfig.java`

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributors

SkillMitra Development Team

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for empowering rural communities**
