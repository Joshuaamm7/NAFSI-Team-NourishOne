import { DEFAULT_PREFS, getPreferences, savePreferences } from './preferences';

const STORAGE_KEY = 'nourishnet_prefs';

beforeEach(() => {
  localStorage.clear();
});

describe('DEFAULT_PREFS', () => {
  it('has the correct shape and default values', () => {
    expect(DEFAULT_PREFS).toEqual({
      language: 'en',
      role: null,
      dietary_tags: [],
      household_size: null,
    });
  });
});

describe('getPreferences', () => {
  it('returns defaults when nothing is stored', () => {
    expect(getPreferences()).toEqual(DEFAULT_PREFS);
  });

  it('returns a new object each call (no shared reference)', () => {
    const a = getPreferences();
    const b = getPreferences();
    expect(a).not.toBe(b);
  });

  it('merges saved values with defaults', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ language: 'es' }));
    expect(getPreferences()).toEqual({
      language: 'es',
      role: null,
      dietary_tags: [],
      household_size: null,
    });
  });

  it('returns defaults for invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json!!!');
    expect(getPreferences()).toEqual(DEFAULT_PREFS);
  });

  it('fills in missing fields from defaults', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ role: 'donor' }));
    const prefs = getPreferences();
    expect(prefs.language).toBe('en');
    expect(prefs.role).toBe('donor');
    expect(prefs.dietary_tags).toEqual([]);
    expect(prefs.household_size).toBeNull();
  });
});

describe('savePreferences', () => {
  it('saves prefs to localStorage', () => {
    savePreferences({ language: 'es' });
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored.language).toBe('es');
  });

  it('merges with existing preferences', () => {
    savePreferences({ language: 'es' });
    savePreferences({ role: 'volunteer' });
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored.language).toBe('es');
    expect(stored.role).toBe('volunteer');
  });

  it('overwrites a field when saving a new value', () => {
    savePreferences({ language: 'es' });
    savePreferences({ language: 'zh' });
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored.language).toBe('zh');
  });

  it('does not crash when localStorage is unavailable', () => {
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = () => { throw new Error('quota exceeded'); };
    expect(() => savePreferences({ language: 'es' })).not.toThrow();
    Storage.prototype.setItem = orig;
  });
});
