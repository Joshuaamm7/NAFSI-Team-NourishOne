// Feature: foundation-setup, Property 4: Translation key parity and format
// **Validates: Requirements 3.7, 4.4**

import fc from 'fast-check';
import en from '../locales/en.json';
import es from '../locales/es.json';

const DOT_NOTATION_REGEX = /^[a-zA-Z]+(\.[a-zA-Z]+)+$/;

/**
 * Flatten a nested object into dot-notation keys with string leaf values.
 * e.g. { gateway: { title: "X" } } → { "gateway.title": "X" }
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

const flatEn = flattenKeys(en);
const flatEs = flattenKeys(es);
const enKeys = Object.keys(flatEn);

describe('Property 4: Translation key parity and format', () => {
  it('for any key in en.json, that key exists in es.json with a non-empty string value and matches dot-notation format', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...enKeys),
        (key) => {
          // Key exists in es.json
          expect(key in flatEs).toBe(true);

          // Value in es.json is a non-empty string
          expect(typeof flatEs[key]).toBe('string');
          expect(flatEs[key].length).toBeGreaterThan(0);

          // Key matches dot-notation format
          expect(key).toMatch(DOT_NOTATION_REGEX);
        }
      ),
      { numRuns: 100 }
    );
  });
});
