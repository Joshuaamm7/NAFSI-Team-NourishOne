// Feature: foundation-setup, Property 5: Language switch updates all translations
// **Validates: Requirements 5.4**

import fc from 'fast-check';
import i18n from '../utils/i18n';
import enJson from '../locales/en.json';
import esJson from '../locales/es.json';

/**
 * Flatten a nested object into dot-notation keys with string leaf values.
 */
function flattenKeys(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenKeys(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

const translations = {
  en: flattenKeys(enJson),
  es: flattenKeys(esJson),
};

const supportedLanguages = ['en', 'es'];
const allKeys = Object.keys(translations.en);

describe('Property 5: Language switch updates all translations', () => {
  it('for any supported language and any i18n key, after changeLanguage(lang), t(key) returns the value from that language\'s translation file', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...supportedLanguages),
        fc.constantFrom(...allKeys),
        async (lang, key) => {
          await i18n.changeLanguage(lang);
          const result = i18n.t(key);
          expect(result).toBe(translations[lang][key]);
        }
      ),
      { numRuns: 100 }
    );
  });
});
