# SkillMitra Backend - Multilingual Support API

## Language Preference Features

The backend now supports multilingual features to work with the i18next frontend implementation.

### Database Schema Update

The `users` table now includes a `preferred_language` column:

```sql
ALTER TABLE users ADD COLUMN preferred_language VARCHAR(2) DEFAULT 'en';
```

Supported language codes:
- `en` - English
- `hi` - Hindi (हिन्दी)
- `ml` - Malayalam (മലയാളം)

---

## API Endpoints

### 1. Get Language Preference

**Endpoint:** `GET /api/user/language-preference`

**Authorization:** Required (JWT Token)

**Response:**
```json
{
  "languageCode": "en"
}
```

**Usage:**
```javascript
const response = await fetch('http://localhost:8080/api/user/language-preference', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
console.log(data.languageCode); // "en", "hi", or "ml"
```

---

### 2. Update Language Preference

**Endpoint:** `PUT /api/user/language-preference`

**Authorization:** Required (JWT Token)

**Request Body:**
```json
{
  "languageCode": "hi"
}
```

**Validation:**
- `languageCode` must be one of: `en`, `hi`, `ml`
- Field is required and cannot be blank

**Response:**
```json
{
  "message": "Language preference updated successfully",
  "languageCode": "hi"
}
```

**Usage:**
```javascript
const response = await fetch('http://localhost:8080/api/user/language-preference', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ languageCode: 'ml' })
});
const data = await response.json();
```

---

### 3. Get User Profile

**Endpoint:** `GET /api/user/profile`

**Authorization:** Required (JWT Token)

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "role": "WORKER",
  "preferredLanguage": "en"
}
```

Note: Password is never sent in the response for security.

---

### 4. Register with Language Preference

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "SecurePass123",
  "role": "WORKER",
  "preferredLanguage": "ml"  // Optional: defaults to "en"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "role": "WORKER",
  "preferredLanguage": "ml"
}
```

---

## Frontend Integration

### Syncing with i18next

```javascript
import { useTranslation } from 'react-i18next';

// Get language preference on login
async function loadUserLanguage(token) {
  const response = await fetch('http://localhost:8080/api/user/language-preference', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const { languageCode } = await response.json();
  
  // Update i18next
  i18n.changeLanguage(languageCode);
  localStorage.setItem('preferredLanguage', languageCode);
}

// Save language preference when user changes it
async function saveLanguagePreference(languageCode, token) {
  await fetch('http://localhost:8080/api/user/language-preference', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ languageCode })
  });
}
```

### Updated LanguageSwitcher Component

```typescript
const changeLanguage = async (languageCode: string) => {
  // Update frontend immediately
  i18n.changeLanguage(languageCode);
  localStorage.setItem('preferredLanguage', languageCode);
  
  // Sync with backend
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      await fetch('http://localhost:8080/api/user/language-preference', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ languageCode })
      });
    } catch (error) {
      console.error('Failed to sync language preference:', error);
    }
  }
};
```

---

## Database Migration

If you're using an existing database, run this SQL migration:

```sql
-- Add preferred_language column to users table
ALTER TABLE users 
ADD COLUMN preferred_language VARCHAR(2) DEFAULT 'en';

-- Optional: Update existing users based on their location
UPDATE users 
SET preferred_language = 'ml' 
WHERE phone LIKE '0%' OR phone LIKE '91%'; -- Example: Kerala numbers
```

---

## Error Handling

### Validation Errors

**Invalid language code:**
```json
{
  "timestamp": "2025-10-17T05:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Language must be one of: en, hi, ml"
}
```

### Authentication Errors

**Missing or invalid token:**
```json
{
  "timestamp": "2025-10-17T05:30:00.000+00:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Full authentication is required"
}
```

---

## Testing

### Using cURL

```bash
# Register with language preference
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "password": "Password123",
    "role": "WORKER",
    "preferredLanguage": "hi"
  }'

# Get language preference
curl -X GET http://localhost:8080/api/user/language-preference \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Update language preference
curl -X PUT http://localhost:8080/api/user/language-preference \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"languageCode": "ml"}'

# Get user profile
curl -X GET http://localhost:8080/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Security Considerations

1. **Authentication Required**: All language preference endpoints require valid JWT authentication
2. **User Isolation**: Users can only view/update their own language preference
3. **Input Validation**: Language codes are validated against allowed values
4. **Password Protection**: User passwords are never included in API responses

---

## Configuration

Make sure your `application.properties` includes:

```properties
# CORS Configuration (adjust for production)
spring.web.cors.allowed-origins=http://localhost:3000,http://localhost:3001
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/skillmitra
spring.datasource.username=root
spring.datasource.password=yourpassword

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## Future Enhancements

1. **Content Translation**: Translate job descriptions, offers, and requests in the database
2. **Email Localization**: Send notification emails in user's preferred language
3. **SMS Localization**: Send SMS notifications in preferred language
4. **Admin Dashboard**: View language usage statistics
5. **Regional Settings**: Support for date/time formats based on language

---

## Support

For issues or questions:
- Check existing issues in the repository
- Create a new issue with detailed description
- Include API request/response examples
