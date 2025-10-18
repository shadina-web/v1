# 🔑 How to Create Your Google Maps API Key

## Step-by-Step Guide

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create or Select a Project
- Click the project dropdown at the top
- Click **"NEW PROJECT"**
- Enter project name: `SkillMitra` or any name
- Click **"CREATE"**

### 3. Enable Billing (Required for Maps)
- Go to **Billing** in the left menu
- Link a billing account (Google provides $200 free credit monthly)
- You won't be charged unless you exceed the free tier

### 4. Enable Maps JavaScript API
- Go to **APIs & Services** → **Library**
- Search for **"Maps JavaScript API"**
- Click on it and click **"ENABLE"**

### 5. Create API Key
- Go to **APIs & Services** → **Credentials**
- Click **"+ CREATE CREDENTIALS"**
- Select **"API Key"**
- Your API key will be created (looks like: `AIzaSyC...`)
- Click **"COPY"** to copy it

### 6. Restrict Your API Key (Recommended for Security)

#### Application Restrictions:
- Click **"Edit API Key"** (pencil icon)
- Under **"Application restrictions"**, select **"HTTP referrers (web sites)"**
- Add these referrers:
  ```
  http://localhost:3000/*
  http://localhost:5173/*
  https://yourdomain.com/*
  ```

#### API Restrictions:
- Under **"API restrictions"**, select **"Restrict key"**
- Check only:
  - Maps JavaScript API
  - Geocoding API (optional)
- Click **"SAVE"**

### 7. Add to Your Project

Open the `.env` file in your project root and paste your key:

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyC_YOUR_ACTUAL_KEY_HERE
```

### 8. Restart Your Development Server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### 9. Test the Map

Visit: http://localhost:3000/map

---

## 🆓 Free Tier Details

Google Maps provides generous free usage:

- **$200 free credit per month**
- **Maps JavaScript API**: $7 per 1,000 loads
- **Free tier covers**: ~28,500 map loads per month
- **For SkillMitra**: More than enough for development and moderate production use

---

## 🔒 Security Best Practices

### DO:
✅ Store API key in `.env` file  
✅ Add `.env` to `.gitignore`  
✅ Restrict API key to specific domains  
✅ Restrict to only needed APIs  
✅ Monitor usage in Google Cloud Console  

### DON'T:
❌ Commit API key to Git/GitHub  
❌ Share API key publicly  
❌ Use unrestricted API keys in production  
❌ Expose API key in client-side code (we use env vars)  

---

## 🚨 Troubleshooting

### "This page can't load Google Maps correctly"
**Cause**: API key missing or invalid  
**Solution**: Check `.env` file has correct key and restart server

### "Maps JavaScript API has not been used in project..."
**Cause**: API not enabled  
**Solution**: Go to Google Cloud Console → Enable "Maps JavaScript API"

### "This API project is not authorized to use this API"
**Cause**: API restriction too strict  
**Solution**: Check API key restrictions include "Maps JavaScript API"

### "The provided API key is invalid"
**Cause**: Wrong key or typo  
**Solution**: Copy key again from Google Cloud Console

### "Billing has not been enabled"
**Cause**: No billing account linked  
**Solution**: Add billing account (free tier still applies)

---

## 📊 Monitor Usage

### Check Usage Statistics:
1. Go to Google Cloud Console
2. Navigate to **APIs & Services** → **Dashboard**
3. Click **"Maps JavaScript API"**
4. View usage graphs and metrics

### Set Budget Alerts:
1. Go to **Billing** → **Budgets & alerts**
2. Create budget alert (e.g., $10/month)
3. Get notified before charges occur

---

## 🌐 Production Deployment

### For Vercel:
```bash
# Add environment variable in Vercel dashboard
VITE_GOOGLE_MAPS_API_KEY=your_production_key
```

### For Netlify:
```bash
# Add in Site settings → Build & deploy → Environment
VITE_GOOGLE_MAPS_API_KEY=your_production_key
```

### For Custom Server:
```bash
# Add to server environment
export VITE_GOOGLE_MAPS_API_KEY=your_production_key
```

**Important**: Use different API keys for development and production!

---

## 📝 Quick Checklist

- [ ] Created Google Cloud project
- [ ] Enabled billing
- [ ] Enabled Maps JavaScript API
- [ ] Created API key
- [ ] Copied API key
- [ ] Restricted API key (HTTP referrers + API restrictions)
- [ ] Added key to `.env` file
- [ ] Restarted development server
- [ ] Tested map at http://localhost:3000/map
- [ ] Verified API key is in `.gitignore`

---

## 🎯 What You Should See

Once configured correctly:

✅ Interactive map of Thrissur district  
✅ Ocean mermaid theme colors  
✅ Worker markers (blue arrows)  
✅ User location marker (coral pink circle)  
✅ Filter by skill dropdown  
✅ Nearby workers toggle  
✅ Clickable markers with info windows  

---

## 💰 Cost Estimate

For SkillMitra usage:

| Scenario | Monthly Loads | Cost |
|----------|---------------|------|
| Development | ~500 | **FREE** ($0) |
| Small Launch | ~5,000 | **FREE** ($0) |
| Growing | ~20,000 | **FREE** ($0) |
| Popular | ~50,000 | ~$150 ($200 credit = FREE) |
| Very Popular | ~100,000 | ~$500 ($300 after credit) |

**Note**: First $200/month is FREE with billing enabled!

---

## 🔗 Useful Links

- [Google Cloud Console](https://console.cloud.google.com/)
- [Maps JavaScript API Docs](https://developers.google.com/maps/documentation/javascript)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
- [Free Tier Details](https://cloud.google.com/maps-platform/pricing)

---

## 📧 Need Help?

**Google Cloud Support**: https://cloud.google.com/support  
**Maps Platform Support**: https://developers.google.com/maps/support

---

**Current Status**: Waiting for your API key  
**Next Step**: Follow steps above to create your key  
**Time Required**: 5-10 minutes  

🔑 Once you have your key, add it to `.env` and restart the server!
