import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 border border-ocean-whisper rounded-full transition-colors"
      >
        <Globe className="size-4" />
        <span className="hidden md:inline">{currentLanguage.nativeName}</span>
        <span className="md:hidden">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-ocean-light shadow-ocean-medium rounded-xl overflow-hidden z-[9999]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-ocean-whisper transition-colors text-left"
            >
              <span className="flex items-center gap-2">
                <span className="font-medium text-navy-deep">{language.nativeName}</span>
                <span className="text-xs text-charcoal-medium">({language.name})</span>
              </span>
              {i18n.language === language.code && (
                <Check className="size-4 text-ocean-deep" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
