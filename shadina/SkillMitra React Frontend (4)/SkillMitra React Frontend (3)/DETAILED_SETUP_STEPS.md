# 🗺️ Google Maps Integration - Complete Setup Guide
## Detailed Step-by-Step Instructions (Beginner-Friendly)

---

## 📋 Table of Contents
1. [What You're About to Do](#what-youre-about-to-do)
2. [Prerequisites](#prerequisites)
3. [Step 1: Create Google Cloud Account](#step-1-create-google-cloud-account)
4. [Step 2: Create a New Project](#step-2-create-a-new-project)
5. [Step 3: Enable Billing (Free Tier)](#step-3-enable-billing-free-tier)
6. [Step 4: Enable Google Maps API](#step-4-enable-google-maps-api)
7. [Step 5: Create API Key](#step-5-create-api-key)
8. [Step 6: Secure Your API Key](#step-6-secure-your-api-key)
9. [Step 7: Add API Key to Your Project](#step-7-add-api-key-to-your-project)
10. [Step 8: Test Your Map](#step-8-test-your-map)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 What You're About to Do

You'll be setting up Google Maps to display a beautiful ocean-themed map showing workers across Thrissur district. This will take about **10-15 minutes** and is **completely free** for development and small-scale use.

**💰 Cost**: FREE! Google gives you $200 credit every month, which covers ~28,500 map loads.

---

## ✅ Prerequisites

Before starting, make sure you have:
- [ ] A Google account (Gmail)
- [ ] A credit/debit card (won't be charged, required only for verification)
- [ ] Your development server running (`npm run dev`)
- [ ] This project open in VS Code

---

## 🚀 Step 1: Create Google Cloud Account

### 1.1 Open Google Cloud Console
1. Open your web browser
2. Go to: **https://console.cloud.google.com**
3. Sign in with your Google account (or create one if you don't have it)

### 1.2 Accept Terms of Service
- You may see a "Terms of Service" page
- Read and click **"Agree and Continue"**

**✅ Checkpoint**: You should now see the Google Cloud Console dashboard

---

## 📁 Step 2: Create a New Project

### 2.1 Click on Project Selector
1. Look at the **top navigation bar**
2. Find the dropdown that says **"Select a project"** (near the top-left, next to "Google Cloud")
3. Click on it

### 2.2 Create New Project
1. In the popup, click **"NEW PROJECT"** (top-right corner)
2. Fill in the project details:
   - **Project name**: `SkillMitra-Maps` (or any name you like)
   - **Organization**: Leave as "No organization" (default)
   - **Location**: Leave as is
3. Click **"CREATE"**

### 2.3 Wait for Project Creation
- You'll see a notification: "Creating project..."
- This takes **10-30 seconds**
- When done, click **"SELECT PROJECT"** in the notification

**✅ Checkpoint**: The top bar should now show your project name "SkillMitra-Maps"

---

## 💳 Step 3: Enable Billing (Free Tier)

**⚠️ Important**: Google requires billing setup BUT you get **$200 FREE credit every month**. You won't be charged unless you exceed this (which is ~28,500 map loads/month).

### 3.1 Navigate to Billing
1. Click the **hamburger menu** (☰) in the top-left corner
2. Scroll down and click **"Billing"**
3. Click **"LINK A BILLING ACCOUNT"** or **"CREATE BILLING ACCOUNT"**

### 3.2 Set Up Billing Account
1. **Country**: Select your country (e.g., India)
2. Click **"Continue"**
3. **Account type**: 
   - Choose "Individual" (for personal use)
   - OR "Business" (if you're a registered business)
4. Fill in your details:
   - Name
   - Address
   - Phone number
5. Click **"Continue"**

### 3.3 Add Payment Method
1. Enter your **credit/debit card details**:
   - Card number
   - Expiry date
   - CVV
   - Cardholder name
2. Click **"START MY FREE TRIAL"**

**💡 What Happens Next?**
- Google may charge a small amount (₹2 or $1) for verification
- This will be **refunded immediately**
- You get **$300 credit for 90 days** as a new user
- After that, you get **$200 credit every month** for Maps API

**✅ Checkpoint**: You should see "Free trial activated" or "Billing account created"

---

## 🗺️ Step 4: Enable Google Maps API

### 4.1 Go to APIs & Services
1. Click the **hamburger menu** (☰) in the top-left
2. Hover over **"APIs & Services"**
3. Click **"Library"**

### 4.2 Search for Maps JavaScript API
1. In the search box, type: **"Maps JavaScript API"**
2. Click on **"Maps JavaScript API"** from the results
   - Look for the one with the Google Maps icon
   - Description: "Load maps on web pages using JavaScript"

### 4.3 Enable the API
1. Click the blue **"ENABLE"** button
2. Wait **5-10 seconds** while it enables
3. You'll be taken to the API dashboard

**✅ Checkpoint**: You should see "Maps JavaScript API" dashboard with a green checkmark or "API enabled" message

---

## 🔑 Step 5: Create API Key

### 5.1 Navigate to Credentials
1. On the left sidebar, click **"Credentials"**
2. Click the **"+ CREATE CREDENTIALS"** button (near the top)
3. Select **"API key"** from the dropdown

### 5.2 Copy Your API Key
1. A popup will appear showing your API key
2. It looks like: `AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. Click the **"COPY"** button (📋 icon)
4. **IMPORTANT**: Paste it somewhere safe temporarily (Notepad, Sticky Notes)

**⚠️ Don't close this popup yet!** We need to restrict the key in the next step.

---

## 🔒 Step 6: Secure Your API Key

**Why?** An unrestricted API key can be used by anyone, potentially using up your quota or causing charges.

### 6.1 Restrict the API Key
1. In the popup (from Step 5), click **"RESTRICT KEY"**
2. OR click **"EDIT API KEY"** if the popup closed

### 6.2 Set Application Restrictions
1. Under **"Application restrictions"**, select:
   - ✅ **"HTTP referrers (websites)"**

2. Click **"ADD AN ITEM"** under "Website restrictions"

3. Add these referrers (one at a time):
   ```
   http://localhost:3000/*
   ```
   Click **"ADD AN ITEM"** again and add:
   ```
   http://127.0.0.1:3000/*
   ```
   Click **"ADD AN ITEM"** again and add:
   ```
   http://localhost:5173/*
   ```
   (This is Vite's default port, just in case)

### 6.3 Set API Restrictions
1. Scroll down to **"API restrictions"**
2. Select **"Restrict key"**
3. From the dropdown, select:
   - ✅ **Maps JavaScript API**
4. Click **"OK"**

### 6.4 Save Your Changes
1. Scroll to the bottom
2. Click **"SAVE"**
3. Wait for the confirmation message: "API key saved"

**✅ Checkpoint**: Your API key is now restricted to only work on localhost (your development machine)

---

## 💻 Step 7: Add API Key to Your Project

### 7.1 Open the .env File
1. In **VS Code**, look at the left sidebar (File Explorer)
2. Find and open the file named **`.env`**
   - It's in the root folder: `SkillMitra React Frontend (3)/.env`
   - If you don't see it, press `Ctrl+P` and type `.env`

### 7.2 Replace the Placeholder
1. You should see this line:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
   ```

2. **Replace** `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual API key:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   (Use the key you copied in Step 5.2)

3. **Save the file**: Press `Ctrl+S`

**⚠️ Important Security Notes:**
- ✅ The `.env` file is in `.gitignore` (I already added it)
- ✅ This means your API key will NOT be committed to Git
- ✅ Never share your `.env` file or commit it to GitHub
- ✅ Keep your API key private!

### 7.3 Verify the .env File
Your complete `.env` file should now look like:
```env
VITE_API_BASE_URL=http://localhost:8081/api
VITE_APP_ENV=development
VITE_GOOGLE_MAPS_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**✅ Checkpoint**: `.env` file saved with your real API key

---

## 🎉 Step 8: Test Your Map

### 8.1 Restart the Development Server

**Why?** Vite only loads environment variables when it starts. Changes to `.env` require a restart.

#### Option A: Using VS Code Terminal
1. Look at the bottom panel in VS Code
2. Find the terminal where `npm run dev` is running
3. Press `Ctrl+C` to stop it
4. Wait for it to stop (you'll see the prompt return)
5. Type: `npm run dev` and press Enter
6. Wait for "Local: http://localhost:3000"

#### Option B: Using the Command Below
I can restart it for you:

### 8.2 Open the Map Page
1. Open your web browser
2. Go to: **http://localhost:3000/map**
3. Wait for the page to load (5-10 seconds on first load)

### 8.3 What You Should See ✨

**🎊 SUCCESS! If you see:**
- ✅ A map centered on Thrissur district, Kerala
- ✅ Ocean-themed colors (blue water, white landscape)
- ✅ Worker markers (colored pins/arrows)
- ✅ Filter dropdown at the top
- ✅ Worker cards on the right side
- ✅ Statistics showing "12 Workers Available"

**🎨 Ocean Theme Features:**
- Water: Soft aqua blue (`#90E0EF`)
- Landscape: Pearl white (`#F8FEFF`)
- Roads: Ocean whisper (`#CAF0F8`)
- Your location: Coral pink circle
- Worker markers: Ocean bright arrows (`#00B4D8`)

**🔧 Interactive Features:**
1. **Zoom in/out**: Use mouse wheel or +/- buttons
2. **Pan**: Click and drag the map
3. **Filter by skill**: Select from dropdown (e.g., "Plumber")
4. **Find nearby**: Toggle "Show Only Nearby Workers"
5. **Click markers**: View worker info window
6. **Contact workers**: Click "Contact" button in info window

### 8.4 Test the Features

Try these tests:

1. **Filter Test**:
   - Select "Plumber" from the skill dropdown
   - You should see only plumbers on the map
   - Worker count updates to "1 Worker Available"

2. **Nearby Test**:
   - Toggle "Show Only Nearby Workers"
   - Map shows workers within 10km radius
   - Count updates to show nearby workers only

3. **Marker Test**:
   - Click on a worker marker (arrow/pin)
   - Info window appears with worker details:
     - Name
     - Skill
     - Rating (stars)
     - "Contact" button

4. **Responsive Test**:
   - Resize your browser window
   - Layout should adapt (map on top for mobile, side-by-side for desktop)

**✅ Final Checkpoint**: All features working? **YOU'RE DONE!** 🎉

---

## 🚨 Troubleshooting

### Problem 1: "API Key Required" Error

**Symptoms**: You see a gray box or error message about API key

**Solutions**:
1. ✅ Check `.env` file has the correct API key (no extra spaces)
2. ✅ Make sure you restarted the dev server after editing `.env`
3. ✅ API key format: Should start with `AIzaSy`
4. ✅ Check for typos in the key

**How to fix**:
```bash
# Stop the server
Ctrl+C

# Restart
npm run dev
```

---

### Problem 2: "This page can't load Google Maps correctly"

**Symptoms**: Map loads but shows error overlay

**Possible Causes & Solutions**:

**A. Billing Not Enabled**
- Go back to Step 3
- Make sure billing account is linked to your project
- Check: Cloud Console → Billing → Make sure project is linked

**B. API Not Enabled**
- Go back to Step 4
- Make sure "Maps JavaScript API" shows as "Enabled"
- Try disabling and re-enabling it

**C. Wrong API Enabled**
- Make sure you enabled **"Maps JavaScript API"**, not just "Maps API"
- In Cloud Console → APIs & Services → Library
- Search for "Maps JavaScript API" specifically

---

### Problem 3: Map Loads but No Markers Appear

**Symptoms**: Map shows Thrissur but no worker pins

**Solutions**:
1. ✅ Check browser console for errors (F12 → Console tab)
2. ✅ Make sure sample data is loading
3. ✅ Try refreshing the page (F5)

**How to check**:
1. Press `F12` in browser
2. Go to **Console** tab
3. Look for errors (red text)
4. If you see errors, share them for help

---

### Problem 4: "RefererNotAllowedMapError"

**Symptoms**: Error message about referrer not allowed

**Cause**: API key restrictions don't include localhost

**Solution**:
1. Go to Google Cloud Console
2. Navigate to: APIs & Services → Credentials
3. Click on your API key name
4. Under "Application restrictions" → "Website restrictions"
5. Make sure you have:
   ```
   http://localhost:3000/*
   http://127.0.0.1:3000/*
   ```
6. Click **SAVE**
7. Wait 1-2 minutes for changes to propagate
8. Refresh your browser

---

### Problem 5: Map Shows Different Location

**Symptoms**: Map centers on wrong area (not Thrissur)

**Solution**:
- This shouldn't happen, but if it does:
- The code is set to center on: `10.5276°N, 76.2144°E` (Thrissur)
- Try clearing browser cache: `Ctrl+Shift+Delete`
- Hard refresh: `Ctrl+F5`

---

### Problem 6: Browser Doesn't Support Geolocation

**Symptoms**: "Show Only Nearby Workers" doesn't work

**Cause**: Browser blocked location permission

**Solution**:
1. Look for 🔒 or 🌐 icon in browser address bar
2. Click it
3. Set Location permission to **Allow**
4. Refresh page

**OR use test coordinates**: The app falls back to Thrissur center automatically

---

### Problem 7: Slow Map Loading

**Symptoms**: Map takes 10+ seconds to load

**Causes & Solutions**:

**A. Slow Internet**
- Wait a bit longer (first load always takes time)
- Google Maps API downloads ~500KB of JavaScript

**B. Too Many Browser Tabs**
- Close unnecessary tabs
- Refresh the map page

**C. Development Mode**
- This is normal in development
- Production builds will be faster

---

### Problem 8: Worker Cards Not Showing

**Symptoms**: Map loads, markers appear, but no worker list on the side

**Solutions**:
1. ✅ Check screen width: Worker list only shows on larger screens
2. ✅ Try making browser window wider (>1024px)
3. ✅ On mobile/tablet, scroll down below the map

**Responsive Behavior**:
- **Desktop** (>1024px): Map + Worker list side-by-side
- **Tablet** (768-1024px): Map on top, list below
- **Mobile** (<768px): Map on top, list below (stacked)

---

### Problem 9: "Quota Exceeded" Error

**Symptoms**: Error about API quota exceeded

**Cause**: Unlikely in development, but possible if you refreshed 100+ times

**Solution**:
1. Wait 24 hours (quota resets daily)
2. Check usage in Cloud Console:
   - APIs & Services → Dashboard
   - Click "Maps JavaScript API"
   - View quota usage

**Free Tier Limits**:
- 28,500 map loads per month (FREE with $200 credit)
- Dynamic maps: $7 per 1,000 loads (covered by credit)

---

### Problem 10: TypeScript Errors in VS Code

**Symptoms**: Red squiggly lines in code, errors about `import.meta.env`

**Cause**: Already fixed! I created `vite-env.d.ts`

**If still seeing errors**:
1. Close and reopen VS Code
2. Run: `npm run dev` (to trigger TypeScript check)
3. Check `vite-env.d.ts` exists in `src/` folder

---

## 🆘 Still Having Issues?

### Check These Common Mistakes:

1. **API Key Issues**:
   - [ ] Did you copy the ENTIRE key? (starts with `AIzaSy`, ~39 characters)
   - [ ] Are there extra spaces before/after the key in `.env`?
   - [ ] Did you save the `.env` file?
   - [ ] Did you restart the dev server?

2. **Google Cloud Setup**:
   - [ ] Is billing enabled?
   - [ ] Is "Maps JavaScript API" enabled (not just "Maps API")?
   - [ ] Is the API key restricted to `http://localhost:3000/*`?
   - [ ] Is the API key restricted to "Maps JavaScript API"?

3. **Browser Issues**:
   - [ ] Try a different browser (Chrome, Firefox, Edge)
   - [ ] Clear cache and cookies
   - [ ] Disable browser extensions (especially ad blockers)
   - [ ] Check browser console for errors (F12)

4. **Network Issues**:
   - [ ] Check internet connection
   - [ ] Try disabling VPN if using one
   - [ ] Check if firewall is blocking Google Maps

### Debug Commands:

Run these in VS Code terminal to check your setup:

```powershell
# Check if .env file exists and has content
Get-Content .env

# Check if dev server is running
Get-Process -Name node -ErrorAction SilentlyContinue

# Check if port 3000 is in use
netstat -ano | findstr :3000
```

---

## 🎓 Next Steps After Setup

Once your map is working, you can:

### 1. **Customize Map Appearance**
- Edit `src/components/LocationMap.tsx`
- Modify `mapStyles` array (lines 40-100)
- Change colors to match your theme

### 2. **Add More Workers**
- Edit `src/utils/locationData.ts`
- Add entries to `sampleWorkerLocations` array
- Use real coordinates from Google Maps

### 3. **Connect to Real Backend**
- Update `MapDemo.tsx` to fetch from API
- Replace sample data with real database queries
- See: `GOOGLE_MAPS_INTEGRATION.md` → "Backend Integration"

### 4. **Add More Features**
- Search/autocomplete for addresses
- Directions to worker locations
- Worker availability calendar
- Real-time location tracking

### 5. **Deploy to Production**
- Update API key restrictions to include your domain
- Add production URL to HTTP referrers
- Set up environment variables on hosting platform
- See: `HOW_TO_CREATE_GOOGLE_MAPS_API_KEY.md` → "Production Deployment"

---

## 📚 Additional Resources

### Documentation Files in This Project:
1. **`GOOGLE_MAPS_INTEGRATION.md`** - Complete technical reference
2. **`MAPS_QUICK_START.md`** - 5-minute quick setup
3. **`HOW_TO_CREATE_GOOGLE_MAPS_API_KEY.md`** - Detailed API key guide
4. **`DETAILED_SETUP_STEPS.md`** - This file (you are here!)

### External Links:
- [Google Cloud Console](https://console.cloud.google.com)
- [Google Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [React Google Maps API Docs](https://react-google-maps-api-docs.netlify.app/)

---

## ✅ Setup Checklist

Print this or keep it open while setting up:

- [ ] **Step 1**: Created Google Cloud account
- [ ] **Step 2**: Created project "SkillMitra-Maps"
- [ ] **Step 3**: Enabled billing (free trial activated)
- [ ] **Step 4**: Enabled "Maps JavaScript API"
- [ ] **Step 5**: Created API key (starts with `AIzaSy`)
- [ ] **Step 6**: Restricted API key:
  - [ ] Added `http://localhost:3000/*`
  - [ ] Added `http://127.0.0.1:3000/*`
  - [ ] Restricted to "Maps JavaScript API"
- [ ] **Step 7**: Added API key to `.env` file
- [ ] **Step 7**: Saved `.env` file (Ctrl+S)
- [ ] **Step 8**: Restarted dev server (Ctrl+C, then `npm run dev`)
- [ ] **Step 8**: Opened http://localhost:3000/map
- [ ] **Step 8**: Map loaded successfully with ocean theme
- [ ] **Step 8**: Workers markers visible
- [ ] **Step 8**: Filters working
- [ ] **Step 8**: Info windows working

---

## 🎊 Congratulations!

If you've made it this far and your map is working, **you've successfully integrated Google Maps with ocean mermaid theme!** 🌊🧜‍♀️

Your map now shows:
- ✨ Beautiful ocean-themed colors
- 📍 12 sample workers across Thrissur district
- 🔍 Interactive filters (by skill, by proximity)
- 📱 Responsive design (works on all devices)
- 🎨 Custom styled markers and info windows

**Need help?** Check the troubleshooting section above or review the other documentation files in this project.

---

**Document Version**: 1.0  
**Last Updated**: October 16, 2025  
**Estimated Setup Time**: 10-15 minutes  
**Difficulty**: Beginner-Friendly  
**Cost**: FREE (with $200 monthly credit)

---
