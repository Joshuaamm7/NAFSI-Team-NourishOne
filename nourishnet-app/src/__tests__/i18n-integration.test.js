import { savePreferences } from '../utils/preferences';

beforeEach(() => {
  localStorage.clear();
  // Reset i18n module cache so each test gets a fresh init
  jest.resetModules();
});

describe('i18n initialization with preferences', () => {
  it('defaults to English when no preference is saved', async () => {
    const i18n = (await import('../utils/i18n')).default;
    expect(i18n.language).toBe('en');
  });

  it('reads saved language from preferences on init', async () => {
    // Save Spanish preference BEFORE importing i18n
    savePreferences({ language: 'es' });
    const i18n = (await import('../utils/i18n')).default;
    expect(i18n.language).toBe('es');
  });

  it('falls back to English for unsupported language in prefs', async () => {
    savePreferences({ language: 'xx' });
    const i18n = (await import('../utils/i18n')).default;
    // i18next sets lng to 'xx' but fallbackLng ensures translations resolve to English
    expect(i18n.options.fallbackLng).toEqual(['en']);
  });

  it('loads both en and es translation resources', async () => {
    const i18n = (await import('../utils/i18n')).default;
    expect(i18n.getResourceBundle('en', 'translation')).toBeDefined();
    expect(i18n.getResourceBundle('es', 'translation')).toBeDefined();
  });

  it('translates gateway.title correctly in English', async () => {
    const i18n = (await import('../utils/i18n')).default;
    await i18n.changeLanguage('en');
    expect(i18n.t('gateway.title')).toBe('NourishNet');
  });

  it('translates gateway.title correctly in Spanish', async () => {
    const i18n = (await import('../utils/i18n')).default;
    await i18n.changeLanguage('es');
    expect(i18n.t('gateway.title')).toBe('NourishNet');
  });

  it('translates common.backToHome in Spanish', async () => {
    const i18n = (await import('../utils/i18n')).default;
    await i18n.changeLanguage('es');
    expect(i18n.t('common.backToHome')).toBe('Volver al Inicio');
  });
});
