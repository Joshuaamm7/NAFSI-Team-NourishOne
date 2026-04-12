// Feature: foundation-setup, Property 4: Translation key parity and format
// **Validates: Requirements 3.7, 4.4**

import fc from 'fast-check';
import en from '../locales/en.json';
import es from '../locales/es.json';

const DOT_NOTATION_REGEX = /^[a-zA-Z]+(\.[a-zA-Z]+)+$/;

describe('Property 4: Translation key parity and format', () => {
  it('for any key in en.json, that key exists in es.json with a non-empty string value and matches dot-notation format', () => {
    const enKeys = Object.keys(en);

    fc.assert(
      fc.property(
        fc.constantFrom(...enKeys),
        (key) => {
          // Key exists in es.json
          expect(key in es).toBe(true);

          // Value in es.json is a non-empty string
          expect(typeof es[key]).toBe('string');
          expect(es[key].length).toBeGreaterThan(0);

          // Key matches dot-notation format
          expect(key).toMatch(DOT_NOTATION_REGEX);
        }
      ),
      { numRuns: 100 }
    );
  });
});
