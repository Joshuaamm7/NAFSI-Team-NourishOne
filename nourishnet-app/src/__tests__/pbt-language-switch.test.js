// Feature: foundation-setup, Property 5: Language switch updates all translations
// **Validates: Requirements 5.4**

import fc from 'fast-check';
import i18n from '../utils/i18n';
import enJson from '../locales/en.json';
import esJson from '../locales/es.json';

const translations = {
  en: enJson,
  es: esJson,
};

const supportedLanguages = ['en', 'es'];
const allKeys = Object.keys(enJson);

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
