/**
 * Detects a place category from a location name by pattern matching.
 * Returns the i18n key for the category, or null if no match.
 *
 * Patterns are ordered longest-first so "Mobile Food Pantry" matches
 * before "Food Pantry".
 */

const CATEGORY_PATTERNS = [
  { pattern: /mobile food pantry/i, key: 'mobileFoodPantry' },
  { pattern: /pop-up/i, key: 'popUp' },
  { pattern: /food pantry/i, key: 'foodPantry' },
  { pattern: /food bank/i, key: 'foodBank' },
  { pattern: /food distribution/i, key: 'foodDistribution' },
  { pattern: /food closet/i, key: 'foodCloset' },
  { pattern: /food ministry/i, key: 'foodMinistry' },
  { pattern: /soup kitchen/i, key: 'soupKitchen' },
  { pattern: /community marketplace/i, key: 'communityMarketplace' },
  { pattern: /community center/i, key: 'communityCenter' },
  { pattern: /recreation center/i, key: 'recreationCenter' },
  { pattern: /senior center/i, key: 'seniorCenter' },
  { pattern: /salvation army/i, key: 'salvationArmy' },
  { pattern: /elementary school/i, key: 'school' },
  { pattern: /middle school/i, key: 'school' },
  { pattern: /high school/i, key: 'school' },
  { pattern: /residential site/i, key: 'residentialSite' },
  { pattern: /community site/i, key: 'communityCenter' },
  { pattern: /apartments?/i, key: 'apartments' },
  { pattern: /outreach/i, key: 'outreach' },
  { pattern: /church|baptist|methodist|catholic|episcopal|lutheran|sda|pentecost|tabernacle/i, key: 'church' },
];

/**
 * @param {string} name - Location name
 * @returns {string|null} - Translation key (e.g. 'foodPantry') or null
 */
export function detectPlaceCategory(name) {
  if (!name) return null;
  for (const { pattern, key } of CATEGORY_PATTERNS) {
    if (pattern.test(name)) return key;
  }
  return 'communityOrg';
}
