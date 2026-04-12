import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPreferences, savePreferences } from '../../utils/preferences';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

/**
 * Renders language selector buttons. Active language is visually highlighted.
 * Persists selection to localStorage via savePreferences.
 */
function LanguageToggle() {
  const { i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState(() => {
    return getPreferences().language || i18n.language || 'en';
  });

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    savePreferences({ language: lang });
    setActiveLang(lang);
  };

  return (
    <div className="flex gap-1" role="group" aria-label="Language selector">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => handleChange(code)}
          aria-pressed={activeLang === code}
          className={`px-2 py-1 text-sm rounded font-medium transition-colors ${
            activeLang === code
              ? 'bg-primary-600 text-white font-bold'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default LanguageToggle;
