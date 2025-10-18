# Profile Update Fix

## Problem
When trying to save/update a user profile, the operation failed with "Failed to save profile" error.

## Root Cause
The backend was missing the **PUT endpoint** for updating user profiles. The frontend was calling `PUT /api/user/profile` but the backend only had a GET endpoint.

Additionally, the `User` entity was missing several fields:
- `location` - user's village/city
- `bio` - user biography
- `avatar` - profile picture URL
- `skills` - list of skills offered
- `interests` - list of services needed

## Changes Made

### 1. Backend Changes

#### Created UpdateProfileRequest DTO
**File**: `src/main/java/com/skillmitra/dto/UpdateProfileRequest.java`
- Contains all profile fields that can be updated
- Includes proper getters and setters

#### Updated User Entity
**File**: `src/main/java/com/skillmitra/model/User.java`
- Added new fields:
  - `String location` - stored in users table
  - `String bio` - stored in users table (max 1000 chars)
  - `String avatar` - stored in users table
  - `List<String> skills` - stored in separate `user_skills` table
  - `List<String> interests` - stored in separate `user_interests` table
- Updated constructor and builder to support new fields
- Added getters and setters for all new fields

#### Updated UserService
**File**: `src/main/java/com/skillmitra/service/UserService.java`
- Added `updateProfile()` method that:
  - Takes user email and all profile fields
  - Updates only non-null fields
  - Saves and returns updated user

#### Updated UserController
**File**: `src/main/java/com/skillmitra/controller/UserController.java`
- Added `@PutMapping("/profile")` endpoint
- Accepts `UpdateProfileRequest` in request body
- Returns updated user data in standard response format:
  ```json
  {
    "message": "Profile updated successfully",
    "data": {
      "user": { ...updated user object... }
    }
  }
  ```

#### Updated DataLoader
**File**: `src/main/java/com/skillmitra/DataLoader.java`
- Updated seed data user creation to include new fields (set to null for default admin user)

### 2. Frontend Changes

#### Updated user.service.ts
**File**: `src/services/user.service.ts`
- Fixed endpoint from `/users/profile` to `/user/profile` (singular)
- Fixed `getUserById()` to use `/user/profile` endpoint
- Updated language preference endpoints to use `/user/` prefix
- Properly handles response structure with `response.data.data.user`

#### Updated Profile.tsx
**File**: `src/pages/Profile.tsx`
- Fixed `loadProfile()` to correctly parse response from backend
- Changed from `response.data.user` to just `data` (direct response)
- No changes needed to form handling - already correctly structured

## Database Schema Changes

### New Tables Created
1. **user_skills** - Many-to-many relationship
   - `user_id` (FK to users)
   - `skill` (string)

2. **user_interests** - Many-to-many relationship
   - `user_id` (FK to users)
   - `interest` (string)

### Updated users Table
- Added columns: `location`, `bio`, `avatar`

## API Endpoints

### GET /api/user/profile
- **Auth Required**: Yes (JWT token)
- **Returns**: User object without password
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "WORKER",
    "location": "Mumbai",
    "bio": "Experienced plumber",
    "avatar": null,
    "skills": ["Plumbing", "Electrical"],
    "interests": ["Carpentry"],
    "preferredLanguage": "en"
  }
  ```

### PUT /api/user/profile
- **Auth Required**: Yes (JWT token)
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "phone": "1234567890",
    "location": "Mumbai",
    "bio": "Experienced plumber with 10 years experience",
    "skills": ["Plumbing", "Electrical"],
    "interests": ["Carpentry"],
    "preferredLanguage": "en"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Profile updated successfully",
    "data": {
      "user": { ...updated user object... }
    }
  }
  ```

## Testing

1. **Start both servers**:
   - Backend: `cd skillmitra-backend && mvn spring-boot:run` (port 8082)
   - Frontend: `cd "SkillMitra React Frontend (3)" && npm run dev` (port 3000)

2. **Create a new user**:
   - Navigate to http://localhost:3000/signup
   - Fill in required fields (name, email, phone, password, role)
   - Click "Create Account"

3. **Login**:
   - Navigate to http://localhost:3000/login
   - Enter credentials
   - Should redirect to home page with JWT token stored

4. **Update Profile**:
   - Navigate to http://localhost:3000/profile
   - Profile should load with current user data
   - Update any fields (name, village, phone, bio)
   - Add skills offered and services needed
   - Click "Update Profile" (or "Create Profile" for first time)
   - Should see success toast: "Profile updated successfully!"
   - Profile data should reload with updated values

5. **Verify in Database**:
   - Open H2 Console: http://localhost:8082/h2-console
   - JDBC URL: `jdbc:h2:mem:skillmitra`
   - Username: `sa`, Password: (empty)
   - Check tables:
     - `SELECT * FROM USERS` - see updated fields
     - `SELECT * FROM USER_SKILLS` - see skills
     - `SELECT * FROM USER_INTERESTS` - see interests

## Status
✅ **FIXED** - Profile creation and updates now working correctly!

## Related Files
- Backend:
  - `UserController.java` - Added PUT endpoint
  - `UserService.java` - Added updateProfile method
  - `User.java` - Added new fields
  - `UpdateProfileRequest.java` - New DTO
  - `DataLoader.java` - Updated seed data
  
- Frontend:
  - `user.service.ts` - Fixed endpoints
  - `Profile.tsx` - Fixed response handling

## Notes
- User skills and interests are stored as separate table entries for flexibility
- All profile fields except name, phone, and password can be null
- The endpoint uses the authenticated user's email from JWT token
- No need to pass user ID - determined from authentication context
