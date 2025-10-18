# SkillMitra Backend

Spring Boot backend for SkillMitra project. Exposes REST APIs consumed by the React frontend.

Features:
- Spring Boot 3.2.x
- MySQL (JPA/Hibernate)
- JWT authentication
- Entities: User, Skill, Job, Application
- Endpoints for auth, skills, jobs, and applications

Run locally:

1. Create a MySQL database `skillmitra_db` and update credentials in `src/main/resources/application.properties`.
2. Build and run:

```powershell
mvn clean package -DskipTests
mvn spring-boot:run
```

Sample endpoints:
- POST /api/auth/register {name,email,phone,password,role}
- POST /api/auth/login {email,password} -> returns {token}
- CRUD /api/skills
- CRUD /api/jobs and /api/jobs/search
- POST /api/applications?jobId=&userId=

Notes:
- Replace `jwt.secret` in `application.properties` with a strong secret for production.
- Passwords are stored hashed using BCrypt.
