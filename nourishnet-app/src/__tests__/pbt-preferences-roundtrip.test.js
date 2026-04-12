// Feature: foundation-setup, Property 7: User preferences localStorage round-trip
// **Validates: Requirements 12.1, 12.2**

import fc from 'fast-check';
import { savePreferences, getPreferences, DEFAULT_PREFS } from '../utils/preferences';

beforeEach(() => {
  localStorage.clear();
});

const userPrefsArb = fc.record({
  language: fc.constantFrom('en', 'es'),
  role: fc.constantFrom('family', 'donor', 'volunteer', null),
  dietary_tags: fc.array(
    fc.constantFrom('Halal', 'Vegan', 'Vegetarian', 'Dairy-Free', 'Gluten-Free', 'Low-GI', 'Kosher'),
    { maxLength: 5 }
  ),
  household_size: fc.oneof(fc.constant(null), fc.integer({ min: 1, max: 20 })),
});

describe('Property 7: User preferences localStorage round-trip', () => {
  it('for any valid UserPreferences object, saving and reading back produces an equivalent object with all required fields', () => {
    fc.assert(
      fc.property(userPrefsArb, (prefs) => {
        localStorage.clear();

        savePreferences(prefs);
        const result = getPreferences();

        // Verify deep equality
        expect(result).toEqual(prefs);

        // Verify all required fields are present
        expect(result).toHaveProperty('language');
        expect(result).toHaveProperty('role');
        expect(result).toHaveProperty('dietary_tags');
        expect(result).toHaveProperty('household_size');
      }),
      { numRuns: 100 }
    );
  });
});
