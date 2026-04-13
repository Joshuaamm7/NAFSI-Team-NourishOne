/**
 * Translates hours strings by replacing English day names, abbreviations,
 * and common phrases with their translated equivalents.
 * Times (e.g. "8:00 AM") are kept as-is.
 *
 * @param {string} hours - The English hours string from location data
 * @param {function} t - The i18next t() function
 * @param {string} lang - Current language code
 * @returns {string} Translated hours string
 */
export function translateHours(hours, t, lang) {
  if (!hours || lang === 'en') return hours;

  let result = hours;

  // Order matters: replace longer tokens first to avoid partial matches
  const tokens = [
    // Full day names
    ['Monday', t('hours.monday')],
    ['Tuesday', t('hours.tuesday')],
    ['Wednesday', t('hours.wednesday')],
    ['Thursday', t('hours.thursday')],
    ['Friday', t('hours.friday')],
    ['Saturday', t('hours.saturday')],
    ['Saturdays', t('hours.saturdays')],
    ['Sunday', t('hours.sunday')],
    // Abbreviated day names
    ['Mon', t('hours.mon')],
    ['Tue', t('hours.tue')],
    ['Wed', t('hours.wed')],
    ['Thu', t('hours.thu')],
    ['Fri', t('hours.fri')],
    ['Sat', t('hours.sat')],
    ['Sun', t('hours.sun')],
    // Common phrases
    ['Daily', t('hours.daily')],
    ['Every other', t('hours.everyOther')],
    ['Every', t('hours.every')],
    ['of each month', t('hours.ofEachMonth')],
    ['of the month', t('hours.ofTheMonth')],
    ['by appointment only', t('hours.byAppointmentOnly')],
    ['by appointment', t('hours.byAppointment')],
    ['until supplies last', t('hours.untilSuppliesLast')],
    ['Contact for hours', t('hours.contactForHours')],
    ['Community Pantry', t('hours.communityPantry')],
    ['Meal Kitchen', t('hours.mealKitchen')],
    ['Pantry', t('hours.pantry')],
    // Ordinals
    ['1st', t('hours.1st')],
    ['2nd', t('hours.2nd')],
    ['3rd', t('hours.3rd')],
    ['4th', t('hours.4th')],
    // Connectors
    ['and', t('hours.and')],
    ['from', t('hours.from')],
  ];

  for (const [en, translated] of tokens) {
    // Use word-boundary-aware replacement to avoid partial matches
    // e.g. "Mon" shouldn't match inside "Monday" (already replaced)
    const regex = new RegExp(`\\b${en}\\b`, 'g');
    result = result.replace(regex, translated);
  }

  return result;
}
