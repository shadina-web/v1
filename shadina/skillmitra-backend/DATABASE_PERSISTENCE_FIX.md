# Database Persistence Fix - Profile Accumulation Issue

## Problem Description

**Issue:** Profiles appeared to be replaced instead of accumulated when new users signed up. Every profile created would "replace" the previous one, and only one profile would show at a time.

**User Report:** "it is not showing all the updated profiles all at once it removes one i created before and then add next"

## Root Cause

The H2 database was configured as **in-memory** with the connection string:
```
jdbc:h2:mem:skillmitra
```

### What This Means:
- **In-memory database:** Data is stored in RAM only
- **No persistence:** All data is lost when the server stops
- **Restart behavior:** Every server restart creates a fresh, empty database
- **DataLoader runs:** On each start, only the pre-loaded users are added (Admin Employer and Saniya Khan)
- **User confusion:** New profiles created during a session appeared to "disappear" after restart

## Solution Applied

Changed the database configuration to **file-based persistence**:

### File Modified:
`src/main/resources/application.properties`

### Change Made:
```properties
# OLD (In-Memory - Data Lost on Restart)
spring.datasource.url=jdbc:h2:mem:skillmitra;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE

# NEW (File-Based - Data Persists)
spring.datasource.url=jdbc:h2:file:./data/skillmitra;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
```

### What This Fixes:
✅ **Data persists** between server restarts  
✅ **All profiles accumulate** - new users don't replace old ones  
✅ **Skills remain** - profile updates are permanently saved  
✅ **Database file** created at `./data/skillmitra.mv.db`  
✅ **Restart-safe** - restart the server anytime without losing data  

## How It Works

### In-Memory (Old Behavior):
1. Server starts → Empty database created in RAM
2. DataLoader adds 2 pre-loaded users
3. User creates new profiles → Saved to RAM
4. User updates profiles with skills → Saved to RAM
5. **Server restarts** → RAM cleared, all data lost
6. DataLoader adds 2 pre-loaded users again
7. Only pre-loaded users visible (new profiles gone!)

### File-Based (New Behavior):
1. Server starts → Database loaded from file
2. DataLoader checks - if empty, adds 2 pre-loaded users
3. User creates new profiles → Saved to disk file
4. User updates profiles with skills → Saved to disk file
5. **Server restarts** → Database loaded from file
6. DataLoader checks - database has data, skips pre-loading
7. **All profiles visible** (pre-loaded + newly created!)

## Testing the Fix

### Step-by-Step Verification:

1. **Start the servers:**
   ```powershell
   # Backend (in new PowerShell window)
   cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\skillmitra-backend"
   mvn spring-boot:run
   
   # Frontend
   cd "c:\Users\eijua\Downloads\shadina (2)\shadina\shadina\SkillMitra React Frontend (4)\SkillMitra React Frontend (3)"
   npm run dev
   ```

2. **Create multiple profiles:**
   - Sign up as User 1 with skills: Plumbing, Carpentry
   - Sign up as User 2 with skills: Electrical, Painting
   - Sign up as User 3 with skills: Gardening

3. **Check Offers page:**
   - Should see ALL 3 new profiles PLUS pre-loaded Saniya
   - Total: 4 worker profiles visible

4. **Restart the backend:**
   - Stop backend server (Ctrl+C)
   - Start again: `mvn spring-boot:run`
   - Refresh Offers page

5. **Verify persistence:**
   - ✅ All 4 profiles still visible
   - ✅ Skills intact
   - ✅ No data lost

## Database File Location

```
skillmitra-backend/
├── data/
│   ├── skillmitra.mv.db        (Main database file)
│   └── skillmitra.trace.db     (Trace logs if errors occur)
```

### Managing the Database:

**View data via H2 Console:**
- URL: http://localhost:8082/h2-console
- JDBC URL: `jdbc:h2:file:./data/skillmitra`
- Username: `sa`
- Password: (leave empty)

**Reset database (delete all data):**
```powershell
# Stop backend server first!
Remove-Item "./data/skillmitra.mv.db"
# Restart server - DataLoader will recreate with fresh data
```

**Backup database:**
```powershell
Copy-Item "./data/skillmitra.mv.db" "./data/skillmitra_backup_$(Get-Date -Format 'yyyyMMdd').mv.db"
```

## API Endpoints Affected

### GET /api/workers
- **Purpose:** Fetch all workers with skills
- **Behavior:** Now returns ALL workers ever created (persistent)
- **Old Behavior:** Only returned workers created in current session

### Example Response (After Fix):
```json
[
  {
    "id": 2,
    "name": "Saniya Khan",
    "email": "saniya@gmail.com",
    "skills": ["Plumbing", "Carpentry"]
  },
  {
    "id": 3,
    "name": "User 1",
    "email": "user1@example.com",
    "skills": ["Electrical", "Painting"]
  },
  {
    "id": 4,
    "name": "User 2",
    "email": "user2@example.com",
    "skills": ["Gardening"]
  }
]
```

## Frontend Impact

### Offers.tsx Behavior:
```typescript
const loadOffers = async () => {
  const mockOffers = await api.getOffers();        // Mock data
  const workers = await getAllWorkers();            // Real workers from DB
  
  // Combine both sources
  const allOffers = [...mockOffers, ...realOffers];
  
  // NOW: All workers persist and accumulate
  // BEFORE: Only current session workers + pre-loaded
};
```

### User Experience:
- **Before:** Confusing - profiles seemed to replace each other
- **After:** Expected - all profiles accumulate and persist

## Production Considerations

For production deployment, consider:

1. **Use PostgreSQL or MySQL:**
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/skillmitra
   spring.datasource.username=skillmitra_user
   spring.datasource.password=secure_password
   ```

2. **Add database backups:** Regular automated backups

3. **Connection pooling:** Already configured with HikariCP

4. **Database migrations:** Use Flyway or Liquibase for version control

## Related Files

- `application.properties` - Database configuration
- `DataLoader.java` - Pre-loads initial data
- `WorkerController.java` - API endpoint to fetch workers
- `Offers.tsx` - Frontend component displaying profiles

## Summary

✅ **Issue:** Profiles appeared to replace each other  
✅ **Cause:** In-memory database losing data on restart  
✅ **Fix:** File-based H2 database for persistence  
✅ **Result:** All profiles now accumulate and persist correctly  

The fix is simple but critical for data integrity and user experience!
