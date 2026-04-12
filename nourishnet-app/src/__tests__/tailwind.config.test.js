const config = require('../../tailwind.config.js');

const extend = config.theme.extend;
const colors = extend.colors;

const EXPECTED_SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

describe('Tailwind config — Design tokens', () => {
  describe('Color palettes', () => {
    test('primary palette has shades 50–900', () => {
      const keys = Object.keys(colors.primary);
      expect(keys.length).toBeGreaterThanOrEqual(5);
      EXPECTED_SHADES.forEach(shade => {
        expect(colors.primary).toHaveProperty(shade);
      });
    });

    test('warm palette has shades 50–900', () => {
      const keys = Object.keys(colors.warm);
      expect(keys.length).toBeGreaterThanOrEqual(5);
      EXPECTED_SHADES.forEach(shade => {
        expect(colors.warm).toHaveProperty(shade);
      });
    });

    test('neutral palette has shades 50–900', () => {
      const keys = Object.keys(colors.neutral);
      expect(keys.length).toBeGreaterThanOrEqual(5);
      EXPECTED_SHADES.forEach(shade => {
        expect(colors.neutral).toHaveProperty(shade);
      });
    });
  });

  describe('Semantic colors', () => {
    test('success, warning, and danger are defined', () => {
      expect(colors.success).toBeDefined();
      expect(colors.warning).toBeDefined();
      expect(colors.danger).toBeDefined();
    });
  });

  describe('Custom shadows', () => {
    test('boxShadow.soft is a non-empty string', () => {
      expect(typeof extend.boxShadow.soft).toBe('string');
      expect(extend.boxShadow.soft.length).toBeGreaterThan(0);
    });

    test('boxShadow.hover is a non-empty string', () => {
      expect(typeof extend.boxShadow.hover).toBe('string');
      expect(extend.boxShadow.hover.length).toBeGreaterThan(0);
    });
  });

  describe('Custom border radius', () => {
    test('borderRadius.card is defined', () => {
      expect(extend.borderRadius.card).toBeDefined();
    });
  });

  describe('Config structure', () => {
    test('uses theme.extend pattern (not direct override)', () => {
      expect(config.theme).toHaveProperty('extend');
      expect(config.theme.extend).toHaveProperty('colors');
    });
  });
});
