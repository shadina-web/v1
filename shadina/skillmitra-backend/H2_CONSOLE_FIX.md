# 🔧 H2 Database Connection Fix

## ❌ Error You're Seeing:
```
Database "C:/Users/eijua/test" not found, either pre-create it or 
allow remote database creation (not recommended in secure environments) 
[90149-232]
```

## ✅ Solution:

This error occurs when you try to connect to H2 Console with the **wrong JDBC URL**.

---

## 📝 Correct H2 Console Login

### Step 1: Open H2 Console
```
URL: http://localhost:8082/h2-console
```

### Step 2: Use These EXACT Settings:

| Setting | Value |
|---------|-------|
| **Saved Settings** | Generic H2 (Embedded) |
| **Driver Class** | org.h2.Driver |
| **JDBC URL** | `jdbc:h2:mem:skillmitra` |
| **User Name** | `sa` |
| **Password** | (leave empty) |

### Step 3: Click "Connect"

---

## ⚠️ Common Mistakes:

### ❌ WRONG:
```
jdbc:h2:~/test
jdbc:h2:file:C:/Users/eijua/test
jdbc:h2:C:/Users/eijua/test
```

### ✅ CORRECT:
```
jdbc:h2:mem:skillmitra
```

---

## 📊 What Each Part Means:

- `jdbc:h2:` - H2 database driver
- `mem:` - **In-memory database** (not saved to file)
- `skillmitra` - Database name

---

## 🔍 How to Find the Correct JDBC URL:

### Method 1: Check Backend Logs
When backend starts, you'll see:
```
HikariPool-1 - Starting...
HikariPool-1 - Added connection conn0: url=jdbc:h2:mem:skillmitra user=SA
HikariPool-1 - Start completed.
H2 console available at '/h2-console'
```

### Method 2: Check application.properties
```properties
spring.datasource.url=jdbc:h2:mem:skillmitra
```

---

## 📸 Visual Guide:

### H2 Console Login Screen Should Look Like:

```
┌─────────────────────────────────────────────────┐
│  H2 Console                                     │
├─────────────────────────────────────────────────┤
│                                                 │
│  Saved Settings:  [Generic H2 (Embedded)  ▼]   │
│                                                 │
│  Setting Name:    [Generic H2 (Embedded)     ]  │
│                                                 │
│  Driver Class:    [org.h2.Driver             ]  │
│                                                 │
│  JDBC URL:        [jdbc:h2:mem:skillmitra    ]  │  ← IMPORTANT!
│                                                 │
│  User Name:       [sa                        ]  │
│                                                 │
│  Password:        [                          ]  │  ← Leave empty
│                                                 │
│  [Test Connection]  [Connect]                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🧪 Test the Connection:

### Step 1: Click "Test Connection" button
**Expected**: "Test successful"

### Step 2: Click "Connect" button
**Expected**: Opens SQL console

### Step 3: Run a test query:
```sql
SELECT * FROM users;
```

**Expected**: Shows all registered users

---

## 🐛 Still Getting Errors?

### Error: "Database 'skillmitra' not found"
**Solution**: Make sure backend is running first!
```bash
cd skillmitra-backend
mvn spring-boot:run
```
Wait for: "Tomcat started on port 8082"

### Error: "Connection refused"
**Solution**: Backend not running or wrong port
- Check: http://localhost:8082/h2-console (not 8080 or 8081)
- Verify backend port in application.properties: `server.port=8082`

### Error: "Wrong user or password"
**Solution**: 
- Username must be: `sa` (lowercase)
- Password must be: empty (no password)

---

## 💾 Understanding Database Types:

### In-Memory Database (Current Setup)
```
JDBC URL: jdbc:h2:mem:skillmitra

✅ Pros:
- Fast
- No file management
- Auto-creates tables
- Perfect for development

❌ Cons:
- Data lost when backend restarts
- Not for production
```

### File-Based Database (For Persistence)
```
JDBC URL: jdbc:h2:file:./data/skillmitra

✅ Pros:
- Data persists after restart
- Good for testing
- No external DB needed

❌ Cons:
- Slightly slower
- Need to manage files
```

To switch to file-based, edit `application.properties`:
```properties
spring.datasource.url=jdbc:h2:file:./data/skillmitra
```

---

## 📋 Quick Commands:

### Check Backend is Running:
```powershell
netstat -ano | findstr :8082
```

### Access H2 Console:
```
http://localhost:8082/h2-console
```

### View All Tables:
```sql
SHOW TABLES;
```

### View Users:
```sql
SELECT * FROM users;
```

### View Skills:
```sql
SELECT * FROM skills;
```

### Count Records:
```sql
SELECT COUNT(*) FROM users;
```

---

## ✅ Correct Connection Summary:

1. **Open**: http://localhost:8082/h2-console
2. **JDBC URL**: `jdbc:h2:mem:skillmitra`
3. **Username**: `sa`
4. **Password**: (empty)
5. **Click**: Connect

That's it! You should now see the database console.

---

## 🎯 Expected Result:

After connecting, you should see:
- Left sidebar: Tables list (USERS, SKILLS, JOBS, APPLICATIONS)
- Main area: SQL query editor
- Bottom: Query results area

Try this query:
```sql
SELECT id, name, email, phone, location 
FROM users 
ORDER BY created_at DESC;
```

This will show all registered users with their latest information!

---

**Last Updated**: October 17, 2025  
**Database**: H2 In-Memory (jdbc:h2:mem:skillmitra)  
**Console**: http://localhost:8082/h2-console
