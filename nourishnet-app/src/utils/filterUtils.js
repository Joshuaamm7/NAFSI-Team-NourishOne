/**
 * Filter utilities for NourishNet location data.
 * Supports dietary/health attribute filtering, text search, and distance-based filtering.
 */

/**
 * All available dietary/health filter keys matching the healthAttributes schema.
 */
export const DIETARY_FILTERS = [
  { key: 'halal', label: 'Halal', emoji: '🥩' },
  { key: 'vegan', label: 'Vegan', emoji: '🌱' },
  { key: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
  { key: 'noBeef', label: 'No Beef', emoji: '🚫🐄' },
  { key: 'lowGI', label: 'Low GI', emoji: '📉' },
  { key: 'freshProduce', label: 'Fresh Produce', emoji: '🥦' },
  { key: 'dairyFree', label: 'Dairy Free', emoji: '🥛' },
];

/**
 * Filter locations by active dietary/health attribute tags.
 * Uses AND logic — location must match ALL active filters.
 * @param {Array} locations
 * @param {string[]} activeTags - keys from healthAttributes (e.g. ['halal', 'vegan'])
 * @returns {Array}
 */
export function filterByDietary(locations, activeTags) {
  if (!activeTags || activeTags.length === 0) return locations;
  return locations.filter((loc) => {
    if (!loc.healthAttributes) return false;
    return activeTags.every((tag) => loc.healthAttributes[tag] === true);
  });
}

/**
 * Filter locations by text search query.
 * Matches against name, address fields, foodTypes, and tags.
 * @param {Array} locations
 * @param {string} query
 * @returns {Array}
 */
export function filterBySearch(locations, query) {
  if (!query || !query.trim()) return locations;
  const q = query.toLowerCase().trim();
  return locations.filter((loc) => {
    const name = (loc.name || '').toLowerCase();
    const street = (loc.address?.street || '').toLowerCase();
    const city = (loc.address?.city || '').toLowerCase();
    const foodTypes = (loc.foodTypes || []).join(' ').toLowerCase();
    const tags = (loc.tags || []).join(' ').toLowerCase();
    return (
      name.includes(q) ||
      street.includes(q) ||
      city.includes(q) ||
      foodTypes.includes(q) ||
      tags.includes(q)
    );
  });
}

/**
 * Calculate distance in miles between two lat/lng points using Haversine formula.
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @returns {number} distance in miles
 */
export function getDistanceMiles(lat1, lng1, lat2, lng2) {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Filter locations within a given radius (miles) from a reference point.
 * @param {Array} locations
 * @param {{ lat: number, lng: number }} origin
 * @param {number} radiusMiles
 * @returns {Array} locations with added `distance` property, sorted by distance
 */
export function filterByDistance(locations, origin, radiusMiles) {
  if (!origin || typeof origin.lat !== 'number' || typeof origin.lng !== 'number') {
    return locations;
  }
  return locations
    .map((loc) => ({
      ...loc,
      distance:
        typeof loc.lat === 'number' && typeof loc.lng === 'number'
          ? getDistanceMiles(origin.lat, origin.lng, loc.lat, loc.lng)
          : Infinity,
    }))
    .filter((loc) => loc.distance <= radiusMiles)
    .sort((a, b) => a.distance - b.distance);
}

/**
 * Apply all filters in sequence: search → dietary → distance.
 * @param {Array} locations
 * @param {{ search?: string, dietaryTags?: string[], origin?: { lat: number, lng: number }, radiusMiles?: number }} filters
 * @returns {Array}
 */
export function applyFilters(locations, filters = {}) {
  let result = locations;
  if (filters.search) {
    result = filterBySearch(result, filters.search);
  }
  if (filters.dietaryTags && filters.dietaryTags.length > 0) {
    result = filterByDietary(result, filters.dietaryTags);
  }
  if (filters.origin && filters.radiusMiles) {
    result = filterByDistance(result, filters.origin, filters.radiusMiles);
  }
  return result;
}
