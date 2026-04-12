/**
 * Density-based urgency calculation utilities for food pantry locations.
 * Computes urgency levels based on how many other pantries are nearby —
 * fewer nearby pantries means the area is underserved (higher urgency).
 */

const EARTH_RADIUS_MILES = 3958.8;
const NEARBY_RADIUS_MILES = 2;

/**
 * Calculates the distance in miles between two coordinates using the Haversine formula.
 *
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @returns {number} Distance in miles
 */
export function haversineDistance(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_MILES * c;
}

/**
 * Maps a nearby-pantry count to an urgency level (1–5).
 *   0–1 nearby → Level 5 (Critical)
 *   2–3 nearby → Level 4 (High)
 *   4–5 nearby → Level 3 (Elevated)
 *   6–8 nearby → Level 2 (Moderate)
 *   9+  nearby → Level 1 (Low)
 *
 * @param {number} nearbyCount
 * @returns {number} Urgency level 1–5
 */
export function getUrgencyLevel(nearbyCount) {
  if (nearbyCount <= 1) return 5;
  if (nearbyCount <= 3) return 4;
  if (nearbyCount <= 5) return 3;
  if (nearbyCount <= 8) return 2;
  return 1;
}

/**
 * Computes density-based urgency levels for each location.
 * Counts how many other pantries are within a 2-mile radius, then maps
 * that count to an urgency level.
 *
 * @param {Array<Object>} locations - Location records with lat, lng, and name
 * @returns {Array<{lat: number, lng: number, name: string, urgencyLevel: number, nearbyCount: number}>}
 */
export function computeUrgencyLevels(locations) {
  if (!Array.isArray(locations)) return [];

  const valid = locations.filter(
    (loc) =>
      loc &&
      typeof loc.lat === 'number' && Number.isFinite(loc.lat) &&
      typeof loc.lng === 'number' && Number.isFinite(loc.lng)
  );

  return valid.map((loc) => {
    const nearbyCount = valid.filter(
      (other) =>
        other !== loc &&
        haversineDistance(loc.lat, loc.lng, other.lat, other.lng) <= NEARBY_RADIUS_MILES
    ).length;

    return {
      lat: loc.lat,
      lng: loc.lng,
      name: loc.name || 'Unknown',
      urgencyLevel: getUrgencyLevel(nearbyCount),
      nearbyCount,
    };
  });
}
