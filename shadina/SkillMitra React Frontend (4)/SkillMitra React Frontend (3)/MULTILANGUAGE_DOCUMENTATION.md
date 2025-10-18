# 🌍 Multi-Language Support Documentation

## Overview
SkillMitra now supports **3 languages**: English, Hindi (हिन्दी), and Malayalam (മലയാളം) with seamless switching without page reload.

---

## 📚 Features Implemented

### ✅ Core Features
- **3 Languages**: English (default), Hindi, Malayalam
- **Real-time switching**: No page reload required
- **Persistent preference**: Language choice saved in localStorage
- **Auto-detection**: Detects browser language on first visit
- **Fallback system**: Defaults to English if translation missing
- **i18n library**: Using react-i18next (industry standard)
- **Type-safe**: Full TypeScript support

### ✅ UI Components
- **Language Switcher**: Dropdown in navbar with Globe icon
- **Visual indicators**: Checkmark shows current language
- **Native names**: Shows language names in native script
- **Mobile-friendly**: Compact view on small screens
- **Accessible**: Keyboard navigation support

### ✅ Supported Pages
- ✅ **Home Page**: Hero, features, stats, CTA sections
- ✅ **Layout/Navbar**: Navigation items, menus
- 🔄 **Dashboard**: (Ready for translation - add keys)
- 🔄 **Offers**: (Ready for translation - add keys)
- 🔄 **Requests**: (Ready for translation - add keys)
- 🔄 **Profile**: (Ready for translation - add keys)
- 🔄 **Messages**: (Ready for translation - add keys)

---

## 📁 File Structure

```
src/
├── i18n/
│   ├── config.ts              # i18n configuration
│   └── locales/
│       ├── en.json            # English translations
│       ├── hi.json            # Hindi translations
│       └── ml.json            # Malayalam translations
├── components/
│   └── LanguageSwitcher.tsx   # Language dropdown component
├── main.tsx                   # i18n initialization
└── pages/
    └── Home.tsx               # Updated with translations
```

---

## 🚀 How to Use

### For Users
1. **Find the language selector** in the top-right corner of the navbar (Globe icon)
2. **Click on it** to open the dropdown
3. **Select your preferred language**:
   - English
   - हिन्दी (Hindi)
   - മലയാളം (Malayalam)
4. **Page updates instantly** - no reload needed!
5. **Your choice is saved** - same language on next visit

### For Developers

#### 1. Using Translations in Components

```typescript
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

#### 2. Adding New Translations

**Step 1**: Add keys to `src/i18n/locales/en.json`
```json
{
  "my_section": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

**Step 2**: Add Hindi translation to `src/i18n/locales/hi.json`
```json
{
  "my_section": {
    "title": "मेरा शीर्षक",
    "description": "मेरा विवरण"
  }
}
```

**Step 3**: Add Malayalam translation to `src/i18n/locales/ml.json`
```json
{
  "my_section": {
    "title": "എന്റെ ശീർഷകം",
    "description": "എന്റെ വിവരണം"
  }
}
```

**Step 4**: Use in component
```typescript
<h1>{t('my_section.title')}</h1>
<p>{t('my_section.description')}</p>
```

#### 3. Changing Language Programmatically

```typescript
import { useTranslation } from 'react-i18next';

export function MyComponent() {
  const { i18n } = useTranslation();
  
  const switchToHindi = () => {
    i18n.changeLanguage('hi');
  };
  
  const switchToMalayalam = () => {
    i18n.changeLanguage('ml');
  };
  
  return (
    <div>
      <button onClick={switchToHindi}>हिन्दी</button>
      <button onClick={switchToMalayalam}>മലയാളം</button>
    </div>
  );
}
```

#### 4. Getting Current Language

```typescript
const { i18n } = useTranslation();
const currentLanguage = i18n.language; // 'en' | 'hi' | 'ml'
```

---

## 🗂️ Translation Keys Reference

### Navigation
```
nav.home
nav.dashboard
nav.offers
nav.requests
nav.messages
nav.profile
nav.login
nav.signup
nav.logout
```

### Hero Section
```
hero.badge
hero.subtitle
hero.skilled_services
hero.cta_find_workers
hero.cta_browse
hero.join_text
hero.skilled_workers
```

### Features
```
features.why_choose
features.tagline
features.offer_skills.title
features.offer_skills.description
features.offer_skills.button
features.find_services.title
features.find_services.description
features.find_services.button
features.build_reputation.title
features.build_reputation.description
features.build_reputation.button
```

### Stats
```
stats.active_workers
stats.services_listed
stats.projects_completed
stats.average_rating
```

### Platform Features
```
platform.title
platform.subtitle
platform.dashboard.title
platform.dashboard.description
platform.dashboard.button
platform.messaging.title
platform.messaging.description
platform.messaging.button
platform.booking.title
platform.booking.description
platform.booking.button
platform.payments.title
platform.payments.description
platform.payments.button
platform.reviews.title
platform.reviews.description
platform.reviews.button
platform.search.title
platform.search.description
platform.search.button
```

### CTA Section
```
cta.title
cta.description
cta.get_started
cta.explore_services
```

### Language Selector
```
language.select
language.english
language.hindi
language.malayalam
```

### Common
```
common.contact
common.view_profile
common.rating
common.close
common.save
common.cancel
common.loading
common.error
common.success
```

---

## 🎨 Language Switcher Component

The `<LanguageSwitcher />` component provides:

- **Dropdown menu** with native language names
- **Current language indicator** (checkmark)
- **Globe icon** for easy recognition
- **Responsive design**:
  - Desktop: Shows full native name (e.g., "മലയാളം")
  - Mobile: Shows language code (e.g., "ML")
- **Ocean theme styling** matching your app

### Usage
```typescript
import { LanguageSwitcher } from './components/LanguageSwitcher';

<LanguageSwitcher />
```

---

## 🔧 Configuration

### i18n Config (`src/i18n/config.ts`)

```typescript
i18n
  .use(LanguageDetector) // Auto-detect browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',     // Default language
    lng: 'en',             // Initial language
    debug: false,          // Set true for debugging
    
    detection: {
      order: ['localStorage', 'navigator'], // Check localStorage first
      caches: ['localStorage']              // Save to localStorage
    }
  });
```

### Supported Languages
```typescript
const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];
```

---

## 📱 Right-to-Left (RTL) Support

Currently, all three languages use **LTR (Left-to-Right)** writing:
- ✅ English: LTR
- ✅ Hindi (Devanagari): LTR
- ✅ Malayalam: LTR

**Note**: If you add Arabic/Urdu in future, you'll need RTL support:

```typescript
// In i18n config
i18n.on('languageChanged', (lng) => {
  const rtlLanguages = ['ar', 'ur', 'he'];
  const dir = rtlLanguages.includes(lng) ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
});
```

---

## 🌐 Adding More Languages

Want to add Tamil, Telugu, or Kannada? Follow these steps:

### Step 1: Create Translation File
Create `src/i18n/locales/ta.json` (for Tamil):
```json
{
  "app_name": "ஸ்கில்மித்ரா",
  "nav": {
    "home": "முகப்பு",
    ...
  }
}
```

### Step 2: Update Config
Add to `src/i18n/config.ts`:
```typescript
import taTranslations from './locales/ta.json';

const resources = {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations },
  ml: { translation: mlTranslations },
  ta: { translation: taTranslations }, // Add Tamil
};
```

### Step 3: Update Language Switcher
Add to `src/components/LanguageSwitcher.tsx`:
```typescript
const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }, // Add Tamil
];
```

---

## 🔍 Translation API Integration (Optional)

Want automatic translations? Integrate Google Translate API:

### Step 1: Install axios
```bash
npm install axios
```

### Step 2: Create Translation Service
```typescript
// src/services/translation.ts
import axios from 'axios';

export async function translateText(
  text: string, 
  targetLang: string
): Promise<string> {
  const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
  const url = `https://translation.googleapis.com/language/translate/v2`;
  
  const response = await axios.post(url, {
    q: text,
    target: targetLang,
    key: API_KEY
  });
  
  return response.data.data.translations[0].translatedText;
}
```

### Step 3: Use in Components
```typescript
const fallbackTranslation = await translateText(
  'English text here',
  i18n.language
);
```

**Note**: Google Translate API is paid. Free tier: $10/month = ~500K characters.

---

## 📊 Best Practices

### ✅ DO:
- Use translation keys for ALL user-facing text
- Keep keys organized by section (nav, hero, features, etc.)
- Test in all 3 languages before deploying
- Use native language names in switcher
- Save language preference to localStorage
- Provide fallback to English

### ❌ DON'T:
- Hard-code text in JSX (always use `t()`)
- Mix languages in one component
- Forget to translate error messages
- Use automatic translations for production
- Change translation keys (breaks existing translations)

---

## 🐛 Troubleshooting

### Problem: Translations not loading
**Solution**: Check if JSON files are imported correctly in `config.ts`

### Problem: Language doesn't persist
**Solution**: Check localStorage permissions in browser

### Problem: Some text still in English
**Solution**: That text isn't translated yet - add keys to all 3 JSON files

### Problem: TypeScript errors with translation keys
**Solution**: Keys are type-safe. Make sure key exists in `en.json`

### Problem: Console errors "Cannot find module"
**Solution**: Create missing JSON files or check import paths

---

## 📈 Future Enhancements

### Planned Features:
- [ ] **Date/Time localization** (moment.js or date-fns)
- [ ] **Number formatting** (Indian numbering vs Western)
- [ ] **Currency formatting** (₹ vs $)
- [ ] **Pluralization support** (1 worker vs 2 workers)
- [ ] **Gender-based translations** (Hindi/Malayalam grammar)
- [ ] **Regional dialects** (Kerala Malayalam vs Tamil Nadu Malayalam)
- [ ] **Voice input** for language selection
- [ ] **Translation coverage report** (% translated per language)

---

## 📚 Resources

### Documentation:
- [react-i18next docs](https://react.i18next.com/)
- [i18next docs](https://www.i18next.com/)
- [Language detection plugin](https://github.com/i18next/i18next-browser-languageDetector)

### Translation Tools:
- [Google Translate](https://translate.google.com/)
- [Microsoft Translator](https://www.bing.com/translator)
- [DeepL](https://www.deepl.com/translator) (best quality)
- [Crowdin](https://crowdin.com/) (collaborative translation)

### Malayalam/Hindi Resources:
- [Malayalam Unicode Chart](http://www.unicode.org/charts/PDF/U0D00.pdf)
- [Devanagari Unicode Chart](http://www.unicode.org/charts/PDF/U0900.pdf)
- [Kerala IT Mission](https://www.itmission.kerala.gov.in/)

---

## ✅ Testing Checklist

Before deploying, test:

- [ ] Language switcher appears in navbar
- [ ] All 3 languages selectable
- [ ] Page updates without reload
- [ ] Language persists after page refresh
- [ ] Mobile view works (compact switcher)
- [ ] All translated sections display correctly
- [ ] No console errors
- [ ] Malayalam script renders properly
- [ ] Hindi Devanagari renders properly
- [ ] Fallback to English works for missing keys

---

## 🎯 Current Translation Coverage

| Section | English | Hindi | Malayalam |
|---------|---------|-------|-----------|
| Navigation | ✅ 100% | ✅ 100% | ✅ 100% |
| Hero | ✅ 100% | ✅ 100% | ✅ 100% |
| Features | ✅ 100% | ✅ 100% | ✅ 100% |
| Stats | ✅ 100% | ✅ 100% | ✅ 100% |
| Platform | ✅ 100% | ✅ 100% | ✅ 100% |
| CTA | ✅ 100% | ✅ 100% | ✅ 100% |
| Common | ✅ 100% | ✅ 100% | ✅ 100% |
| Dashboard | ⏸️ 0% | ⏸️ 0% | ⏸️ 0% |
| Profile | ⏸️ 0% | ⏸️ 0% | ⏸️ 0% |
| Offers | ⏸️ 0% | ⏸️ 0% | ⏸️ 0% |
| Requests | ⏸️ 0% | ⏸️ 0% | ⏸️ 0% |

**Overall Coverage**: ~40% (Home page + Layout complete)

---

## 🤝 Contributing Translations

Want to improve translations? Follow this process:

1. **Fork the repo**
2. **Edit JSON files** in `src/i18n/locales/`
3. **Test locally** with `npm run dev`
4. **Submit pull request** with description
5. **Get review** from native speaker
6. **Merge** after approval

**Translation Guidelines**:
- Keep tone professional but friendly
- Maintain consistency with existing terms
- Preserve placeholder variables like `{name}`
- Test with actual UI to verify fit
- Consider cultural context (Kerala-specific for Malayalam)

---

## 📞 Support

Need help with translations?

- **File an issue**: [GitHub Issues](#)
- **Email**: support@skillmitra.com
- **Community**: [Discord Server](#)
- **Documentation**: This file!

---

**Last Updated**: October 16, 2025  
**Version**: 1.0.0  
**Languages**: English, Hindi, Malayalam  
**Library**: react-i18next v13+  
**Status**: ✅ Production Ready

---

*Happy translating! 🌍🎉*
