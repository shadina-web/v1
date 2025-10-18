# 🗺️ Quick Start: Google Maps Setup

## ⚡ 5-Minute Setup Guide

### Step 1: Get Your API Key (2 minutes)

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select a project
3. Go to **APIs & Services** → **Credentials**
4. Click **+ CREATE CREDENTIALS** → **API Key**
5. Copy the API key

### Step 2: Enable Required APIs (1 minute)

1. Go to **APIs & Services** → **Library**
2. Search and enable:
   - **Maps JavaScript API**
   - **Geocoding API** (optional)

### Step 3: Configure Your Project (1 minute)

Open `.env` file in project root:

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSy... # Paste your API key here
```

### Step 4: Restart Server (1 minute)

```bash
# Stop the server (Ctrl+C in terminal)
npm run dev
```

### Step 5: View the Map! 

Navigate to: **http://localhost:3000/map**

---

## ✅ What You'll See

🗺️ **Interactive map** of Thrissur district  
📍 **12 sample workers** with markers  
🎨 **Ocean mermaid theme** styling  
🔍 **Filter by skill** dropdown  
📡 **Nearby workers** toggle  
📱 **Fully responsive** design  

---

## 🎯 Test the Features

### 1. **View Worker Info**
Click any worker marker → See info window with details

### 2. **Filter by Skill**
Use dropdown → Select "Plumber" → See only plumbers

### 3. **Find Nearby Workers**
Click "Show Nearby Only" → See workers within 10km

### 4. **Pan and Zoom**
Drag map, use +/- buttons → Explore Thrissur

### 5. **Mobile Test**
Open on phone → Pinch to zoom, swipe to pan

---

## 🚨 Troubleshooting

**Map shows "API Key Required"?**  
→ Add API key to `.env` and restart server

**Map shows gray screen?**  
→ Enable "Maps JavaScript API" in Google Cloud

**Billing error?**  
→ Set up billing in Google Cloud (free tier available)

**Still having issues?**  
→ Check browser console for errors (F12)

---

## 📚 Full Documentation

See `GOOGLE_MAPS_INTEGRATION.md` for:
- Complete feature list
- Component API reference
- Customization guide
- Security best practices
- Production deployment

---

## 🌊 Ocean Theme Features

✅ Custom map colors matching ocean mermaid theme  
✅ Coral pink user location marker  
✅ Ocean blue worker markers  
✅ Themed info windows  
✅ Pearl white card backgrounds  
✅ Navy deep text for readability  

---

**Ready to use!** 🎉  
**Demo**: http://localhost:3000/map  
**Theme**: Ocean Mermaid 🌊✨
