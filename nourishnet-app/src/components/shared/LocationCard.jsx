import React from 'react';
import { useTranslation } from 'react-i18next';
import { detectPlaceCategory } from '../../utils/placeCategory';
import { translateHours } from '../../utils/translateHours';

const HEALTH_BADGES = [
  { key: 'halal', emoji: '🥩' },
  { key: 'vegan', emoji: '🌱' },
  { key: 'vegetarian', emoji: '🥬' },
  { key: 'noBeef', emoji: '🚫🐄' },
  { key: 'lowGI', emoji: '📉' },
  { key: 'freshProduce', emoji: '🥦' },
  { key: 'dairyFree', emoji: '🥛' },
];

/**
 * Renders a location entry with address, hours, health badges, and contact info.
 */
function LocationCard({ location }) {
  const { t, i18n } = useTranslation();
  if (!location) return null;

  const { name, address, phone, website, hours, foodTypes, healthAttributes, distance } = location;

  const isNonEnglish = i18n.language !== 'en';
  const categoryKey = isNonEnglish ? detectPlaceCategory(name) : null;

  const street = address?.street ?? '';
  const city = address?.city ?? '';
  const state = address?.state ?? '';
  const zip = address?.zip ?? '';
  const addressLine = [street, city, state, zip].filter(Boolean).join(', ');

  const activeBadges = HEALTH_BADGES.filter(
    (b) => healthAttributes && healthAttributes[b.key]
  );

  return (
    <div className="rounded-2xl shadow-soft bg-white border border-neutral-100 p-4 hover:shadow-hover transition-shadow" data-testid="location-card">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">{name ?? t('common.unknownLocation')}</h3>
          {categoryKey && (
            <p className="text-xs text-neutral-400 mt-0.5">
              🏷️ {t(`placeCategory.${categoryKey}`)}
            </p>
          )}
        </div>
        {typeof distance === 'number' && distance < Infinity && (
          <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-full whitespace-nowrap font-medium">
            {distance.toFixed(1)} mi
          </span>
        )}
      </div>

      {addressLine && <p className="text-neutral-500 text-sm mt-1">{addressLine}</p>}
      {hours && <p className="text-neutral-400 text-sm mt-1">🕐 {translateHours(hours, t, i18n.language)}</p>}

      {/* Health attribute badges */}
      {activeBadges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {activeBadges.map((badge) => (
            <span
              key={badge.key}
              className="inline-flex items-center gap-1 text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"
            >
              <span aria-hidden="true">{badge.emoji}</span>
              {t(`filter.${badge.key}`)}
            </span>
          ))}
        </div>
      )}

      {/* Food types */}
      {Array.isArray(foodTypes) && foodTypes.length > 0 && (
        <p className="text-sm text-neutral-500 mt-2">
          🍽️ {foodTypes.map((ft) => t(`foodType.${ft.toLowerCase()}`, ft)).join(', ')}
        </p>
      )}

      {/* Contact */}
      <div className="flex items-center gap-4 mt-2">
        {phone && (
          <a href={`tel:${phone}`} className="text-sm text-primary-600 hover:underline">
            📞 {phone}
          </a>
        )}
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline">
            🔗 {t('common.website')}
          </a>
        )}
      </div>
    </div>
  );
}

export default LocationCard;
