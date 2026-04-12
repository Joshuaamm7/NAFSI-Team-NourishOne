// Feature: foundation-setup, Property 6: Language preference persistence round-trip
// **Validates: Requirements 5.7**

import fc from 'fast-check';
import { savePreferences, getPreferences } from '../utils/preferences';

const STORAGE_KEY = 'nourishnet_prefs';

beforeEach(() => {
  localStorage.clear();
});

describe('Property 6: Language preference persistence round-trip', () => {
  it('for any supported language code, saving it persists to localStorage such that reading nourishnet_prefs.language returns the same code', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('en', 'es'),
        (lang) => {
          localStorage.clear();

          savePreferences({ language: lang });

          // Verify via getPreferences()
          const prefs = getPreferences();
          expect(prefs.language).toBe(lang);

          // Verify by directly reading localStorage
          const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
          expect(raw.language).toBe(lang);
        }
      ),
      { numRuns: 100 }
    );
  });
});
